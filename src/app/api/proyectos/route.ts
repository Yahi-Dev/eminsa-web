import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { requireAdminRole } from '@/lib/auth-middleware';
import { slugify } from '@/lib/utils/slugify';

const VALID_DIVISIONES = ['MTN', 'RST', 'EIC', 'SRV'];
const MAX_LIMIT = 100;

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const publicadoParam = searchParams.get('publicado');
    const division = searchParams.get('division');
    const destacado = searchParams.get('destacado');

    // Auto-publish any scheduled proyectos whose time has passed
    if (publicadoParam === 'true') {
      await prisma.proyecto.updateMany({
        where: { publicado: false, scheduledAt: { lte: new Date() } },
        data: { publicado: true },
      });
    }

    const where: Record<string, unknown> = {};
    // publicado=all → no filter (admin use); publicado=false → drafts only; default → published only
    if (publicadoParam === 'all') {
      // No publicado filter — return everything
    } else if (publicadoParam === 'false') {
      where.publicado = false;
    } else if (publicadoParam === 'true') {
      where.publicado = true;
    }
    if (division && VALID_DIVISIONES.includes(division)) where.division = division;
    if (destacado === 'true') where.destacado = true;

    const limitParam = parseInt(searchParams.get('limit') ?? '50', 10);
    const limit = Number.isFinite(limitParam) && limitParam > 0 ? Math.min(limitParam, MAX_LIMIT) : 50;

    const proyectos = await prisma.proyecto.findMany({
      where,
      orderBy: { createdAt: 'desc' },
      take: limit,
      select: {
        id: true,
        slug: true,
        titulo: true,
        cliente: true,
        division: true,
        resumen: true,
        imagen: true,
        ubicacion: true,
        capacidad: true,
        anio: true,
        publicado: true,
        destacado: true,
        scheduledAt: true,
        createdAt: true,
        updatedAt: true,
      },
    });

    return NextResponse.json({ success: true, proyectos });
  } catch (error) {
    console.error('Error fetching proyectos:', error);
    return NextResponse.json({ success: false, message: 'Error interno' }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  const auth = await requireAdminRole(request);
  if ('error' in auth) return auth.error;

  try {
    const body = await request.json();
    const { titulo, cliente, division, resumen, descripcion, imagen, imagenes, ubicacion, capacidad, anio, publicado, destacado, scheduledAt } = body;

    if (!titulo?.trim()) {
      return NextResponse.json({ success: false, message: 'El título es requerido' }, { status: 400 });
    }
    if (!division?.trim()) {
      return NextResponse.json({ success: false, message: 'La división es requerida' }, { status: 400 });
    }
    if (!resumen?.trim()) {
      return NextResponse.json({ success: false, message: 'El resumen es requerido' }, { status: 400 });
    }

    let slug = body.slug?.trim() ? slugify(body.slug.trim()) : slugify(titulo.trim());
    const existing = await prisma.proyecto.findUnique({ where: { slug } });
    if (existing) slug = `${slug}-${Date.now()}`;

    const scheduledDate = !publicado && scheduledAt ? new Date(scheduledAt) : null;

    const proyecto = await prisma.proyecto.create({
      data: {
        slug,
        titulo: titulo.trim().substring(0, 200),
        cliente: cliente?.trim() || null,
        division: division.trim(),
        resumen: resumen.trim(),
        descripcion: descripcion?.trim() || null,
        imagen: imagen || null,
        imagenes: imagenes || null,
        ubicacion: ubicacion?.trim() || null,
        capacidad: capacidad?.trim() || null,
        anio: anio ? parseInt(String(anio), 10) : null,
        publicado: publicado ?? false,
        destacado: destacado ?? false,
        scheduledAt: scheduledDate,
      },
    });

    return NextResponse.json({ success: true, proyecto }, { status: 201 });
  } catch (error) {
    console.error('Error creating proyecto:', error);
    return NextResponse.json({ success: false, message: 'Error interno' }, { status: 500 });
  }
}
