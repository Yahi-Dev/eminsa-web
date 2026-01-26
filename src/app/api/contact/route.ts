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

/**
 * POST /api/contact
 * Endpoint para procesar solicitudes de contacto
 */
export async function POST(request: NextRequest): Promise<NextResponse<ApiResponse>> {
  try {
    // Validar que sea una solicitud POST
    if (request.method !== 'POST') {
      return NextResponse.json(
        createErrorResponse('Método no permitido'),
        { status: 405 }
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

    console.log('Datos recibidos en API:', JSON.stringify(formData, null, 2));
    console.log('Transformadores recibidos:', formData.transformadores?.length || 0);

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

    // Rate limiting simple
    const clientIp = getClientIp(request.headers);

    // Aquí podrías implementar rate limiting más sofisticado
    console.log(`Contact form submission from IP: ${clientIp}`);

    // Enviar emails
    try {
      await sendContactEmails(validatedData, clientIp);
    } catch (emailError) {
      console.error('Error sending emails:', emailError);

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
    console.error('Unexpected error in contact API:', error);

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