import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { requireAuth } from '@/lib/auth-middleware';

export async function GET(request: NextRequest) {
  const auth = await requireAuth(request);
  if ('error' in auth) return auth.error;

  try {
    const { searchParams } = new URL(request.url);
    const unidad = searchParams.get('unidad');
    const page = parseInt(searchParams.get('page') ?? '1', 10);
    const limit = parseInt(searchParams.get('limit') ?? '20', 10);
    const skip = (page - 1) * limit;

    const where = unidad ? { unidad } : {};

    const [cotizaciones, total] = await Promise.all([
      prisma.cotizacion.findMany({
        where,
        orderBy: { createdAt: 'desc' },
        skip,
        take: limit,
      }),
      prisma.cotizacion.count({ where }),
    ]);

    return NextResponse.json({
      success: true,
      cotizaciones,
      total,
      page,
      totalPages: Math.ceil(total / limit),
    });
  } catch (error) {
    console.error('Error fetching cotizaciones:', error);
    return NextResponse.json({ success: false, message: 'Error interno' }, { status: 500 });
  }
}
