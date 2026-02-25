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
    const isNumeric = /^\d+$/.test(id);
    const proyecto = await prisma.proyecto.findFirst({
      where: isNumeric ? { id: parseInt(id, 10) } : { slug: id },
    });

    if (!proyecto) {
      return NextResponse.json({ success: false, message: 'Proyecto no encontrado' }, { status: 404 });
    }

    return NextResponse.json({ success: true, proyecto });
  } catch (error) {
    console.error('Error fetching proyecto:', error);
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
    const { titulo, cliente, division, resumen, descripcion, imagen, imagenes, ubicacion, capacidad, anio, publicado, destacado } = body;

    const data: Record<string, unknown> = {};
    if (titulo !== undefined) { data.titulo = titulo.trim().substring(0, 200); if (body.slug === undefined) data.slug = slugify(titulo.trim()); }
    if (body.slug !== undefined) data.slug = slugify(body.slug.trim());
    if (cliente !== undefined) data.cliente = cliente?.trim() || null;
    if (division !== undefined) data.division = division.trim();
    if (resumen !== undefined) data.resumen = resumen.trim();
    if (descripcion !== undefined) data.descripcion = descripcion?.trim() || null;
    if (imagen !== undefined) data.imagen = imagen || null;
    if (imagenes !== undefined) data.imagenes = imagenes || null;
    if (ubicacion !== undefined) data.ubicacion = ubicacion?.trim() || null;
    if (capacidad !== undefined) data.capacidad = capacidad?.trim() || null;
    if (anio !== undefined) data.anio = anio ? parseInt(String(anio), 10) : null;
    if (publicado !== undefined) data.publicado = publicado;
    if (destacado !== undefined) data.destacado = destacado;

    const proyecto = await prisma.proyecto.update({
      where: { id: parseInt(id, 10) },
      data,
    });

    return NextResponse.json({ success: true, proyecto });
  } catch (error) {
    console.error('Error updating proyecto:', error);
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
    await prisma.proyecto.delete({ where: { id: parseInt(id, 10) } });
    return NextResponse.json({ success: true, message: 'Proyecto eliminado' });
  } catch (error) {
    console.error('Error deleting proyecto:', error);
    return NextResponse.json({ success: false, message: 'Error interno' }, { status: 500 });
  }
}
