import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { requireAuth } from '@/lib/auth-middleware';
import { slugify } from '@/lib/utils/slugify';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const publicadoParam = searchParams.get('publicado');
    const division = searchParams.get('division');
    const categoria = searchParams.get('categoria');
    const destacado = searchParams.get('destacado');

    // Auto-publish any scheduled noticias whose time has passed
    if (publicadoParam === 'true') {
      await prisma.noticia.updateMany({
        where: { publicado: false, scheduledAt: { lte: new Date() } },
        data: { publicado: true },
      });
    }

    const where: Record<string, unknown> = {};
    if (publicadoParam === 'true') where.publicado = true;
    if (division) where.division = division;
    if (categoria) where.categoria = categoria;
    if (destacado === 'true') where.destacado = true;

    const noticias = await prisma.noticia.findMany({
      where,
      orderBy: { createdAt: 'desc' },
      select: {
        id: true,
        slug: true,
        titulo: true,
        resumen: true,
        imagen: true,
        categoria: true,
        division: true,
        autor: true,
        publicado: true,
        destacado: true,
        scheduledAt: true,
        createdAt: true,
        updatedAt: true,
      },
    });

    return NextResponse.json({ success: true, noticias });
  } catch (error) {
    console.error('Error fetching noticias:', error);
    return NextResponse.json({ success: false, message: 'Error interno' }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  const auth = await requireAuth(request);
  if ('error' in auth) return auth.error;

  try {
    const body = await request.json();
    const { titulo, resumen, contenido, imagen, imagenes, categoria, division, autor, publicado, destacado, scheduledAt } = body;

    if (!titulo?.trim()) {
      return NextResponse.json({ success: false, message: 'El título es requerido' }, { status: 400 });
    }
    if (!resumen?.trim()) {
      return NextResponse.json({ success: false, message: 'El resumen es requerido' }, { status: 400 });
    }
    if (!contenido?.trim()) {
      return NextResponse.json({ success: false, message: 'El contenido es requerido' }, { status: 400 });
    }

    let slug = body.slug?.trim() ? slugify(body.slug.trim()) : slugify(titulo.trim());
    const existing = await prisma.noticia.findUnique({ where: { slug } });
    if (existing) slug = `${slug}-${Date.now()}`;

    const scheduledDate = !publicado && scheduledAt ? new Date(scheduledAt) : null;

    const noticia = await prisma.noticia.create({
      data: {
        slug,
        titulo: titulo.trim().substring(0, 200),
        resumen: resumen.trim(),
        contenido: contenido.trim(),
        imagen: imagen || null,
        imagenes: imagenes || null,
        categoria: categoria?.trim() || null,
        division: division?.trim() || null,
        autor: autor?.trim() || null,
        publicado: publicado ?? false,
        destacado: destacado ?? false,
        scheduledAt: scheduledDate,
      },
    });

    return NextResponse.json({ success: true, noticia }, { status: 201 });
  } catch (error) {
    console.error('Error creating noticia:', error);
    return NextResponse.json({ success: false, message: 'Error interno' }, { status: 500 });
  }
}
