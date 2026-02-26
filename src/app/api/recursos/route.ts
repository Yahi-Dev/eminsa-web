import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { requireAuth } from '@/lib/auth-middleware';

const VALID_DIVISIONES = ['MTN', 'RST', 'EIC', 'SRV'] as const;
const VALID_TIPOS = ['pdf', 'doc', 'xls', 'img', 'link'] as const;

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const division = searchParams.get('division');
    const activoParam = searchParams.get('activo');
    const tipo = searchParams.get('tipo');

    const where: Record<string, unknown> = {};
    if (division) where.division = division;
    if (activoParam === 'true') where.activo = true;
    if (activoParam === 'false') where.activo = false;
    if (tipo) where.tipo = tipo;

    const recursos = await prisma.recurso.findMany({
      where,
      orderBy: { createdAt: 'desc' },
    });

    return NextResponse.json({ success: true, recursos });
  } catch (error) {
    console.error('Error fetching recursos:', error);
    return NextResponse.json({ success: false, message: 'Error interno' }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  const auth = await requireAuth(request);
  if ('error' in auth) return auth.error;

  try {
    const body = await request.json();
    const { nombre, descripcion, division, tipo, archivo, nombreArchivo, activo } = body;

    if (!nombre?.trim()) {
      return NextResponse.json({ success: false, message: 'El nombre es requerido' }, { status: 400 });
    }
    if (!division || !VALID_DIVISIONES.includes(division)) {
      return NextResponse.json({ success: false, message: 'División inválida (MTN|RST|EIC|SRV)' }, { status: 400 });
    }
    if (!tipo || !VALID_TIPOS.includes(tipo)) {
      return NextResponse.json({ success: false, message: 'Tipo inválido (pdf|doc|xls|img|link)' }, { status: 400 });
    }

    const recurso = await prisma.recurso.create({
      data: {
        nombre: nombre.trim().substring(0, 200),
        descripcion: descripcion?.trim().substring(0, 500) || null,
        division,
        tipo,
        archivo: archivo || null,
        nombreArchivo: nombreArchivo?.trim() || null,
        activo: activo ?? true,
      },
    });

    return NextResponse.json({ success: true, recurso }, { status: 201 });
  } catch (error) {
    console.error('Error creating recurso:', error);
    return NextResponse.json({ success: false, message: 'Error interno' }, { status: 500 });
  }
}
