import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { requireAuth } from '@/lib/auth-middleware';

export async function GET(request: NextRequest) {
  const auth = await requireAuth(request);
  if ('error' in auth) return auth.error;

  try {
    const [
      noticiasTotal,
      noticiasPublicadas,
      proyectosTotal,
      proyectosPublicados,
      recursosTotal,
      recursosActivos,
    ] = await Promise.all([
      prisma.noticia.count(),
      prisma.noticia.count({ where: { publicado: true } }),
      prisma.proyecto.count(),
      prisma.proyecto.count({ where: { publicado: true } }),
      prisma.recurso.count(),
      prisma.recurso.count({ where: { activo: true } }),
    ]);

    return NextResponse.json({
      success: true,
      noticias: { total: noticiasTotal, publicadas: noticiasPublicadas },
      proyectos: { total: proyectosTotal, publicados: proyectosPublicados },
      recursos: { total: recursosTotal, activos: recursosActivos },
    });
  } catch (error) {
    console.error('Error fetching admin stats:', error);
    return NextResponse.json({ success: false, message: 'Error interno' }, { status: 500 });
  }
}
