import { z } from 'zod';
import type { ContactFormData, ApiResponse } from '@/lib/types-contact';

// Esquema de validación para el formulario de contacto
export const contactFormSchema = z.object({
  nombre: z
    .string()
    .min(2, 'El nombre debe tener al menos 2 caracteres')
    .max(100, 'El nombre no puede exceder 100 caracteres')
    .trim(),
  empresa: z
    .string()
    .max(100, 'El nombre de la empresa no puede exceder 100 caracteres')
    .trim()
    .optional()
    .or(z.literal('')),
  email: z
    .string()
    .email('Por favor ingresa un email válido')
    .max(255, 'El email no puede exceder 255 caracteres')
    .toLowerCase()
    .trim(),
  telefono: z
    .string()
    .min(7, 'El teléfono debe tener al menos 7 dígitos')
    .max(20, 'El teléfono no puede exceder 20 caracteres')
    .regex(/^[\d+\s\-().]+$/, 'El teléfono contiene caracteres inválidos')
    .trim(),
  tipoConsulta: z
    .enum(['productos', 'servicios', ''])
    .optional()
    .or(z.literal('')),
  categoria: z
    .string()
    .max(50, 'La categoría no puede exceder 50 caracteres')
    .trim()
    .optional()
    .or(z.literal('')),
  mensaje: z
    .string()
    .min(10, 'El mensaje debe tener al menos 10 caracteres')
    .max(5000, 'El mensaje no puede exceder 5000 caracteres')
    .trim(),
  reCaptchaToken: z.string().optional(),
});

export type ContactFormSchema = z.infer<typeof contactFormSchema>;

/**
 * Valida los datos del formulario de contacto
 */
export function validateContactForm(data: unknown): {
  valid: boolean;
  data?: ContactFormData;
  errors?: Record<string, string>;
} {
  try {
    const validated = contactFormSchema.parse(data);

    const formData: ContactFormData = {
      nombre: validated.nombre,
      empresa: validated.empresa && validated.empresa !== '' ? validated.empresa : undefined,
      email: validated.email,
      telefono: validated.telefono,
      tipoServicio: validated.tipoServicio && validated.tipoServicio !== '' ? validated.tipoServicio : undefined,
      mensaje: validated.mensaje,
      reCaptchaToken: validated.reCaptchaToken,
    };

    return {
      valid: true,
      data: formData,
    };
  } catch (error) {
    if (error instanceof z.ZodError) {
      const errors: Record<string, string> = {};
      error.errors.forEach((err) => {
        const path = err.path.join('.');
        errors[path] = err.message;
      });
      return {
        valid: false,
        errors,
      };
    }

    return {
      valid: false,
      errors: {
        general: 'Error de validación desconocido',
      },
    };
  }
}

/**
 * Crea una respuesta de error formateada
 */
export function createErrorResponse(
  message: string,
  errors?: Record<string, string>
): ApiResponse {
  return {
    success: false,
    message,
    errors,
  };
}

/**
 * Crea una respuesta de éxito formateada
 */
export function createSuccessResponse(
  message: string,
  data?: any
): ApiResponse {
  return {
    success: true,
    message,
    data,
  };
}

/**
 * Sanitiza strings para prevenir inyección de HTML
 */
export function sanitizeString(str: string): string {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#x27;')
    .replace(/\//g, '&#x2F;');
}

/**
 * Valida si un email es de un dominio de disposable email
 */
export function isDisposableEmail(email: string): boolean {
  const disposableDomains = [
    'tempmail.com',
    'throwaway.email',
    '10minutemail.com',
    'guerrillamail.com',
    'mailinator.com',
    'temp-mail.org',
    'maildrop.cc',
  ];

  const domain = email.split('@')[1];
  return disposableDomains.includes(domain);
}

/**
 * Obtiene la IP del cliente desde los headers de la solicitud
 */
export function getClientIp(headers: Headers): string | undefined {
  const forwardedFor = headers.get('x-forwarded-for');
  const ip = headers.get('x-real-ip');

  if (forwardedFor) {
    return forwardedFor.split(',')[0].trim();
  }

  return ip || undefined;
}
