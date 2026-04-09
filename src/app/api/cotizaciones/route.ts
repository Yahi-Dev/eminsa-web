import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { sendCotizacionEmails } from '@/lib/email/email-service';

const VALID_UNITS = ['MTN', 'RST', 'EIC', 'SRV'] as const;
type UnidadType = (typeof VALID_UNITS)[number];

// Input limits
const LIMITS = {
  nombre: 100,
  empresa: 100,
  email: 255,
  telefono: 30,
  detallesJsonMaxBytes: 20000,
};

// Simple in-memory rate limiter: max 5 requests per IP per 10 minutes
const rateLimitMap = new Map<string, { count: number; resetAt: number }>();
const RATE_LIMIT_MAX = 5;
const RATE_LIMIT_WINDOW_MS = 10 * 60 * 1000; // 10 minutes
const CLEANUP_INTERVAL_MS = 15 * 60 * 1000; // Cleanup expired entries every 15 min

// Periodically remove expired entries to prevent memory leak
let lastCleanup = Date.now();

function cleanupExpiredEntries(now: number) {
  if (now - lastCleanup < CLEANUP_INTERVAL_MS) return;
  lastCleanup = now;
  for (const [ip, entry] of rateLimitMap.entries()) {
    if (now > entry.resetAt) rateLimitMap.delete(ip);
  }
}

function checkRateLimit(ip: string): boolean {
  const now = Date.now();
  cleanupExpiredEntries(now);

  const entry = rateLimitMap.get(ip);

  if (!entry || now > entry.resetAt) {
    rateLimitMap.set(ip, { count: 1, resetAt: now + RATE_LIMIT_WINDOW_MS });
    return true; // allowed
  }

  if (entry.count >= RATE_LIMIT_MAX) {
    return false; // blocked
  }

  entry.count += 1;
  return true; // allowed
}

// Strict IP validation for rate limiting
const IPV4_REGEX = /^(\d{1,3}\.){3}\d{1,3}$/;
const IPV6_REGEX = /^([0-9a-fA-F]{0,4}:){2,7}[0-9a-fA-F]{0,4}$/;

function isValidIp(ip: string): boolean {
  if (IPV4_REGEX.test(ip)) {
    return ip.split('.').every(n => parseInt(n) <= 255);
  }
  return IPV6_REGEX.test(ip);
}

function getClientIp(headers: Headers): string {
  const forwarded = headers.get('x-forwarded-for')?.split(',')[0].trim() ?? '';
  if (forwarded && isValidIp(forwarded)) return forwarded;

  const realIp = headers.get('x-real-ip')?.trim() ?? '';
  if (realIp && isValidIp(realIp)) return realIp;

  return 'unknown';
}

function sanitize(value: unknown, maxLen: number): string {
  if (typeof value !== 'string') return '';
  return value.trim().slice(0, maxLen);
}

async function generateCodigo(unidad: UnidadType): Promise<string> {
  const now = new Date();
  const yy = String(now.getFullYear()).slice(2);
  const mm = String(now.getMonth() + 1).padStart(2, '0');
  const yearMonth = `${yy}${mm}`;
  const prefix = `${unidad}-${yearMonth}`;

  // Find the highest existing sequence number to avoid race condition duplicates
  const latest = await prisma.cotizacion.findFirst({
    where: { codigo: { startsWith: prefix } },
    orderBy: { codigo: 'desc' },
    select: { codigo: true },
  });

  let nextSeq = 1;
  if (latest?.codigo) {
    const parts = latest.codigo.split('-');
    const lastSeq = parseInt(parts[parts.length - 1], 10);
    if (Number.isFinite(lastSeq)) nextSeq = lastSeq + 1;
  }

  return `${prefix}-${String(nextSeq).padStart(3, '0')}`;
}

export async function POST(request: NextRequest) {
  try {
    const clientIp = getClientIp(request.headers);

    // Rate limiting
    if (!checkRateLimit(clientIp)) {
      return NextResponse.json(
        { success: false, message: 'Demasiadas solicitudes. Inténtelo más tarde.' },
        { status: 429 }
      );
    }

    let body: Record<string, unknown>;
    try {
      body = await request.json();
    } catch {
      return NextResponse.json({ success: false, message: 'JSON inválido' }, { status: 400 });
    }

    const { unidad, nombre, empresa, email, telefono, urgente, detalles } = body as {
      unidad: string;
      nombre: string;
      empresa?: string;
      email: string;
      telefono: string;
      urgente?: boolean;
      detalles?: Record<string, unknown>;
    };

    // Validate unidad
    if (!unidad || !VALID_UNITS.includes(unidad as UnidadType)) {
      return NextResponse.json(
        { success: false, message: 'Unidad de negocio inválida' },
        { status: 400 }
      );
    }

    // Validate and sanitize required fields
    const cleanNombre = sanitize(nombre, LIMITS.nombre);
    const cleanEmail = sanitize(email, LIMITS.email).toLowerCase();
    const cleanTelefono = sanitize(telefono, LIMITS.telefono);
    const cleanEmpresa = empresa ? sanitize(empresa, LIMITS.empresa) : null;

    if (!cleanNombre) {
      return NextResponse.json({ success: false, message: 'El nombre es requerido' }, { status: 400 });
    }
    if (!cleanEmail || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(cleanEmail)) {
      return NextResponse.json({ success: false, message: 'Email inválido' }, { status: 400 });
    }
    if (!cleanTelefono || !/^[\d+\s\-().]+$/.test(cleanTelefono)) {
      return NextResponse.json({ success: false, message: 'Teléfono inválido' }, { status: 400 });
    }

    // Validate urgente is boolean
    const cleanUrgente = urgente === true;

    // Validate detalles: must be a plain object and not too large
    let cleanDetalles: Record<string, unknown> = {};
    if (detalles !== undefined) {
      if (typeof detalles !== 'object' || Array.isArray(detalles)) {
        return NextResponse.json({ success: false, message: 'Detalles inválidos' }, { status: 400 });
      }
      const detallesJson = JSON.stringify(detalles);
      if (detallesJson.length > LIMITS.detallesJsonMaxBytes) {
        return NextResponse.json({ success: false, message: 'Los detalles exceden el tamaño permitido' }, { status: 400 });
      }
      cleanDetalles = detalles;
    }

    const codigo = await generateCodigo(unidad as UnidadType);

    const cotizacion = await prisma.cotizacion.create({
      data: {
        codigo,
        unidad,
        nombre: cleanNombre,
        empresa: cleanEmpresa || null,
        email: cleanEmail,
        telefono: cleanTelefono,
        urgente: cleanUrgente,
        detalles: cleanDetalles as object,
      },
    });

    try {
      await sendCotizacionEmails(
        {
          codigo,
          unidad: unidad as UnidadType,
          nombre: cotizacion.nombre,
          empresa: cotizacion.empresa ?? undefined,
          email: cotizacion.email,
          telefono: cotizacion.telefono,
          urgente: cotizacion.urgente,
          detalles: (cotizacion.detalles as Record<string, unknown>) ?? {},
        },
        clientIp
      );
    } catch (emailError) {
      console.error('Error enviando emails de cotización:', emailError);
      // Don't fail the request if email fails — record is already saved
    }

    return NextResponse.json({ success: true, codigo }, { status: 201 });
  } catch (error) {
    console.error('Error en /api/cotizaciones:', error);
    return NextResponse.json(
      { success: false, message: 'Error interno del servidor' },
      { status: 500 }
    );
  }
}

export async function GET() {
  return NextResponse.json(
    {
      success: true,
      message: 'Usa POST para crear una cotización',
      fields: ['unidad (MTN|RST|EIC|SRV)', 'nombre', 'email', 'telefono', 'empresa?', 'urgente?', 'detalles?'],
    },
    { status: 200 }
  );
}
