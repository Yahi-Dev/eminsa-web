import { NextRequest, NextResponse } from 'next/server';

import {
  validateContactForm,
  createErrorResponse,
  createSuccessResponse,
  getClientIp,
  isDisposableEmail
} from '@/features/contact/schema/contact-validation';
import { sendContactEmails } from '@/lib/email/email-service';
import { ApiResponse } from '@/features/contact';

// ── Rate limiting (same pattern as /api/cotizaciones) ──
const rateLimitMap = new Map<string, { count: number; resetAt: number }>();
const RATE_LIMIT_MAX = 5;
const RATE_LIMIT_WINDOW_MS = 10 * 60 * 1000;

function checkRateLimit(ip: string): boolean {
  const now = Date.now();
  // cleanup expired
  for (const [k, v] of rateLimitMap.entries()) {
    if (now > v.resetAt) rateLimitMap.delete(k);
  }
  const entry = rateLimitMap.get(ip);
  if (!entry || now > entry.resetAt) {
    rateLimitMap.set(ip, { count: 1, resetAt: now + RATE_LIMIT_WINDOW_MS });
    return true;
  }
  if (entry.count >= RATE_LIMIT_MAX) return false;
  entry.count += 1;
  return true;
}

/**
 * POST /api/contact
 * Endpoint para procesar solicitudes de contacto
 */
export async function POST(request: NextRequest): Promise<NextResponse<ApiResponse>> {
  try {
    // Rate limit check
    const clientIpForLimit = getClientIp(request.headers) || 'unknown';
    if (!checkRateLimit(clientIpForLimit)) {
      return NextResponse.json(
        createErrorResponse('Demasiadas solicitudes. Intenta de nuevo en unos minutos.'),
        { status: 429 }
      );
    }

    // Obtener datos del formulario
    let formData;
    try {
      formData = await request.json();
    } catch {
      return NextResponse.json(
        createErrorResponse('El cuerpo de la solicitud debe ser JSON válido'),
        { status: 400 }
      );
    }

    // Validar datos
    const validation = validateContactForm(formData);
    if (!validation.valid) {
      return NextResponse.json(
        createErrorResponse('Los datos del formulario no son válidos', validation.errors),
        { status: 400 }
      );
    }

    const validatedData = validation.data!;

    // Validar email de disposable
    if (isDisposableEmail(validatedData.email)) {
      return NextResponse.json(
        createErrorResponse('No se aceptan direcciones de email temporales'),
        { status: 400 }
      );
    }

    const clientIp = getClientIp(request.headers);

    // Enviar emails
    try {
      await sendContactEmails(validatedData, clientIp);
    } catch (emailError) {
      console.error('Contact email send failed:', process.env.NODE_ENV === 'development' ? emailError : '');

      // No exponemos los detalles del error al cliente por seguridad
      return NextResponse.json(
        createErrorResponse(
          'Hubo un problema al enviar tu solicitud. Por favor intenta de nuevo más tarde.'
        ),
        { status: 500 }
      );
    }

    // Respuesta exitosa
    return NextResponse.json(
      createSuccessResponse(
        'Tu solicitud ha sido enviada exitosamente. Nos pondremos en contacto contigo pronto.'
      ),
      { status: 200 }
    );
  } catch (error) {
    console.error('Contact API error:', process.env.NODE_ENV === 'development' ? error : '');

    return NextResponse.json(
      createErrorResponse(
        'Ocurrió un error inesperado. Por favor intenta de nuevo más tarde.'
      ),
      { status: 500 }
    );
  }
}

/**
 * GET /api/contact
 * Endpoint de información
 */
export async function GET(): Promise<NextResponse<ApiResponse>> {
  return NextResponse.json(
    {
      success: true,
      message: 'Usa POST para enviar un formulario de contacto',
      data: {
        endpoint: '/api/contact',
        method: 'POST',
        required_fields: ['nombre', 'email', 'telefono', 'mensaje'],
        optional_fields: ['empresa', 'identificacion', 'direccion', 'tipoConsulta', 'categoria'],
      },
    },
    { status: 200 }
  );
}