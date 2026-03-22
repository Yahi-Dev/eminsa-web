import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { requireAdminRole } from "@/lib/auth-middleware";

const VALID_DIVISIONES = ['MTN', 'RST', 'EIC', 'SRV'] as const;
const VALID_TIPOS = ['pdf', 'doc', 'xls', 'img', 'link'] as const;

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const recurso = await prisma.recurso.findFirst({
      where: { id: parseInt(id, 10) },
    });

    if (!recurso) {
      return NextResponse.json({ success: false, message: 'Recurso no encontrado' }, { status: 404 });
    }

    return NextResponse.json({ success: true, recurso });
  } catch (error) {
    console.error('Error fetching recurso:', error);
    return NextResponse.json({ success: false, message: 'Error interno' }, { status: 500 });
  }
}

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const auth = await requireAdminRole(request);
  if ('error' in auth) return auth.error;

  try {
    const { id } = await params;
    const body = await request.json();
    const { nombre, descripcion, division, tipo, archivo, nombreArchivo, activo } = body;

    const data: Record<string, unknown> = {};
    if (nombre !== undefined) data.nombre = nombre.trim().substring(0, 200);
    if (descripcion !== undefined) data.descripcion = descripcion?.trim().substring(0, 500) || null;
    if (division !== undefined) {
      if (!VALID_DIVISIONES.includes(division)) {
        return NextResponse.json({ success: false, message: 'División inválida (MTN|RST|EIC|SRV)' }, { status: 400 });
      }
      data.division = division;
    }
    if (tipo !== undefined) {
      if (!VALID_TIPOS.includes(tipo)) {
        return NextResponse.json({ success: false, message: 'Tipo inválido (pdf|doc|xls|img|link)' }, { status: 400 });
      }
      data.tipo = tipo;
    }
    if (archivo !== undefined) data.archivo = archivo || null;
    if (nombreArchivo !== undefined) data.nombreArchivo = nombreArchivo?.trim() || null;
    if (activo !== undefined) data.activo = activo;

    const recurso = await prisma.recurso.update({
      where: { id: parseInt(id, 10) },
      data,
    });

    return NextResponse.json({ success: true, recurso });
  } catch (error) {
    console.error('Error updating recurso:', error);
    return NextResponse.json({ success: false, message: 'Error interno' }, { status: 500 });
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const auth = await requireAdminRole(request);
  if ('error' in auth) return auth.error;

  try {
    const { id } = await params;
    await prisma.recurso.delete({ where: { id: parseInt(id, 10) } });
    return NextResponse.json({ success: true, message: 'Recurso eliminado' });
  } catch (error) {
    console.error('Error deleting recurso:', error);
    return NextResponse.json({ success: false, message: 'Error interno' }, { status: 500 });
  }
}
