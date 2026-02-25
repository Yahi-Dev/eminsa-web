import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { requireAuth } from '@/lib/auth-middleware';
import { slugify } from '@/lib/utils/slugify';

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    // Support both numeric ID and slug
    const isNumeric = /^\d+$/.test(id);
    const noticia = await prisma.noticia.findFirst({
      where: isNumeric ? { id: parseInt(id, 10) } : { slug: id },
    });

    if (!noticia) {
      return NextResponse.json({ success: false, message: 'Noticia no encontrada' }, { status: 404 });
    }

    return NextResponse.json({ success: true, noticia });
  } catch (error) {
    console.error('Error fetching noticia:', error);
    return NextResponse.json({ success: false, message: 'Error interno' }, { status: 500 });
  }
}

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const auth = await requireAuth(request);
  if ('error' in auth) return auth.error;

  try {
    const { id } = await params;
    const body = await request.json();
    const { titulo, resumen, contenido, imagen, imagenes, categoria, division, autor, publicado, destacado } = body;

    const data: Record<string, unknown> = {};
    if (titulo !== undefined) {
      data.titulo = titulo.trim().substring(0, 200);
      if (body.slug === undefined) data.slug = slugify(titulo.trim());
    }
    if (body.slug !== undefined) data.slug = slugify(body.slug.trim()) || slugify(titulo?.trim() || '');
    if (resumen !== undefined) data.resumen = resumen.trim();
    if (contenido !== undefined) data.contenido = contenido.trim();
    if (imagen !== undefined) data.imagen = imagen || null;
    if (imagenes !== undefined) data.imagenes = imagenes || null;
    if (categoria !== undefined) data.categoria = categoria?.trim() || null;
    if (division !== undefined) data.division = division?.trim() || null;
    if (autor !== undefined) data.autor = autor?.trim() || null;
    if (publicado !== undefined) data.publicado = publicado;
    if (destacado !== undefined) data.destacado = destacado;

    const noticia = await prisma.noticia.update({
      where: { id: parseInt(id, 10) },
      data,
    });

    return NextResponse.json({ success: true, noticia });
  } catch (error) {
    console.error('Error updating noticia:', error);
    return NextResponse.json({ success: false, message: 'Error interno' }, { status: 500 });
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const auth = await requireAuth(request);
  if ('error' in auth) return auth.error;

  try {
    const { id } = await params;
    await prisma.noticia.delete({ where: { id: parseInt(id, 10) } });
    return NextResponse.json({ success: true, message: 'Noticia eliminada' });
  } catch (error) {
    console.error('Error deleting noticia:', error);
    return NextResponse.json({ success: false, message: 'Error interno' }, { status: 500 });
  }
}
