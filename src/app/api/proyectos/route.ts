import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { requireAuth } from '@/lib/auth-middleware';
import { slugify } from '@/lib/utils/slugify';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const publicadoParam = searchParams.get('publicado');
    const division = searchParams.get('division');
    const destacado = searchParams.get('destacado');

    const where: Record<string, unknown> = {};
    if (publicadoParam === 'true') where.publicado = true;
    if (division) where.division = division;
    if (destacado === 'true') where.destacado = true;

    const proyectos = await prisma.proyecto.findMany({
      where,
      orderBy: { createdAt: 'desc' },
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
  const auth = await requireAuth(request);
  if ('error' in auth) return auth.error;

  try {
    const body = await request.json();
    const { titulo, cliente, division, resumen, descripcion, imagen, imagenes, ubicacion, capacidad, anio, publicado, destacado } = body;

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
      },
    });

    return NextResponse.json({ success: true, proyecto }, { status: 201 });
  } catch (error) {
    console.error('Error creating proyecto:', error);
    return NextResponse.json({ success: false, message: 'Error interno' }, { status: 500 });
  }
}
