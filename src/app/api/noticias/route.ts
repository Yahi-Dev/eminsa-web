import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { requireAdminRole } from '@/lib/auth-middleware';
import { slugify } from '@/lib/utils/slugify';

const VALID_DIVISIONES = ['MTN', 'RST', 'EIC', 'SRV'];
const VALID_CATEGORIAS = ['noticia', 'comunicado', 'evento', 'blog'];
const MAX_LIMIT = 100;

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
    // Public API defaults to published-only. Only show unpublished if explicitly
    // requested with publicado=false (admin use — still requires auth on write endpoints)
    if (publicadoParam === 'false') {
      where.publicado = false;
    } else {
      // Default: only published content
      where.publicado = true;
    }
    // Whitelist-validate query params to prevent injection
    if (division && VALID_DIVISIONES.includes(division)) where.division = division;
    if (categoria && VALID_CATEGORIAS.includes(categoria)) where.categoria = categoria;
    if (destacado === 'true') where.destacado = true;

    const limitParam = parseInt(searchParams.get('limit') ?? '50', 10);
    const limit = Number.isFinite(limitParam) && limitParam > 0 ? Math.min(limitParam, MAX_LIMIT) : 50;

    const noticias = await prisma.noticia.findMany({
      where,
      orderBy: { createdAt: 'desc' },
      take: limit,
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
  const auth = await requireAdminRole(request);
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

    // Validate imagen URL if provided — only allow Cloudinary URLs to prevent SSRF
    if (imagen && typeof imagen === 'string') {
      try {
        const url = new URL(imagen);
        if (!['https:'].includes(url.protocol) || !url.hostname.endsWith('cloudinary.com')) {
          return NextResponse.json({ success: false, message: 'URL de imagen no válida' }, { status: 400 });
        }
      } catch {
        return NextResponse.json({ success: false, message: 'URL de imagen mal formada' }, { status: 400 });
      }
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
