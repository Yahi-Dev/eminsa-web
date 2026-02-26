import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { sendCotizacionEmails } from '@/lib/email/email-service';

const VALID_UNITS = ['MTN', 'RST', 'EIC', 'SRV'] as const;
type UnidadType = (typeof VALID_UNITS)[number];

function getClientIp(headers: Headers): string {
  return (
    headers.get('x-forwarded-for')?.split(',')[0].trim() ||
    headers.get('x-real-ip') ||
    'unknown'
  );
}

async function generateCodigo(unidad: UnidadType): Promise<string> {
  const now = new Date();
  const yy = String(now.getFullYear()).slice(2);
  const mm = String(now.getMonth() + 1).padStart(2, '0');
  const yearMonth = `${yy}${mm}`;
  const prefix = `${unidad}-${yearMonth}`;

  const count = await prisma.cotizacion.count({
    where: {
      codigo: { startsWith: prefix },
    },
  });

  const seq = String(count + 1).padStart(3, '0');
  return `${prefix}-${seq}`;
}

export async function POST(request: NextRequest) {
  try {
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

    // Validations
    if (!unidad || !VALID_UNITS.includes(unidad as UnidadType)) {
      return NextResponse.json(
        { success: false, message: 'Unidad de negocio inválida' },
        { status: 400 }
      );
    }
    if (!nombre?.trim()) {
      return NextResponse.json({ success: false, message: 'El nombre es requerido' }, { status: 400 });
    }
    if (!email?.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return NextResponse.json({ success: false, message: 'Email inválido' }, { status: 400 });
    }
    if (!telefono?.trim()) {
      return NextResponse.json({ success: false, message: 'El teléfono es requerido' }, { status: 400 });
    }

    const codigo = await generateCodigo(unidad as UnidadType);

    const cotizacion = await prisma.cotizacion.create({
      data: {
        codigo,
        unidad,
        nombre: nombre.trim(),
        empresa: empresa?.trim() || null,
        email: email.trim().toLowerCase(),
        telefono: telefono.trim(),
        urgente: urgente ?? false,
        detalles: (detalles as object) ?? {},
      },
    });

    const clientIp = getClientIp(request.headers);
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
