import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { requireAdminRole } from "@/lib/auth-middleware";

export async function GET(request: NextRequest) {
  const auth = await requireAdminRole(request);
  if ('error' in auth) return auth.error;

  try {
    const grouped = await prisma.cotizacion.groupBy({
      by: ['unidad'],
      _count: { id: true },
    });

    const counts: Record<string, number> = { MTN: 0, RST: 0, EIC: 0, SRV: 0 };
    let total = 0;

    for (const row of grouped) {
      counts[row.unidad] = row._count.id;
      total += row._count.id;
    }

    return NextResponse.json({ success: true, total, ...counts }, { status: 200 });
  } catch (error) {
    console.error('Error fetching cotizacion stats:', error);
    return NextResponse.json({ success: false, message: 'Error interno' }, { status: 500 });
  }
}
