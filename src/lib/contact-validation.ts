import { z } from 'zod';
import type { ContactFormData, ApiResponse } from '@/lib/types-contact';

// Interfaz para el resultado de validación
interface ValidationResult {
  valid: boolean;
  errors?: Record<string, string>;
  data?: ContactFormData;
}

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
  identificacion: z
    .string()
    .min(9, 'La identificación debe tener al menos 9 caracteres')
    .max(13, 'La identificación no puede exceder 13 caracteres')
    .regex(
      /^(\d{9}|\d{3}-\d{7}-\d{1})$/,
      'Formato inválido. Use: 123456789 (RNC) o 000-0000000-0 (cédula)'
    )
    .transform((val) => {
      // Asegurar formato consistente
      const clean = val.replace(/\D/g, '');
      if (clean.length === 9) return clean; // RNC sin guiones
      if (clean.length === 11) return clean.replace(/(\d{3})(\d{7})(\d{1})/, '$1-$2-$3'); // Cédula formateada
      return val;
    })
    .optional()
    .or(z.literal('')),
  direccion: z
    .string()
    .min(5, 'La dirección debe tener al menos 5 caracteres')
    .max(130, 'La dirección no puede exceder 130 caracteres')
    .trim()
    .optional()
    .or(z.literal('')),
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
export function validateContactForm(data: unknown): ValidationResult {
  try {
    // Asegurar que data sea un objeto
    if (!data || typeof data !== 'object') {
      return {
        valid: false,
        errors: { general: 'Los datos del formulario son inválidos' },
      };
    }

    const formData = data as Record<string, unknown>;

    // Convertir campos vacíos a undefined
    const processedData = {
      ...formData,
      empresa: typeof formData.empresa === 'string' ? formData.empresa.trim() || undefined : undefined,
      identificacion: typeof formData.identificacion === 'string' ? formData.identificacion.trim() || undefined : undefined,
      direccion: typeof formData.direccion === 'string' ? formData.direccion.trim() || undefined : undefined,
      categoria: typeof formData.categoria === 'string' ? formData.categoria.trim() || undefined : undefined,
      tipoConsulta: formData.tipoConsulta || '',
    };

    const result = contactFormSchema.safeParse(processedData);
    
    if (!result.success) {
      const errors: Record<string, string> = {};
      result.error.issues.forEach((issue) => {
        const field = issue.path[0] as string;
        errors[field] = issue.message;
      });
      
      return {
        valid: false,
        errors,
      };
    }

    // Convertir al tipo ContactFormData incluyendo campos opcionales
    const validatedData: ContactFormData = {
      nombre: result.data.nombre,
      email: result.data.email,
      telefono: result.data.telefono,
      mensaje: result.data.mensaje,
      empresa: result.data.empresa,
      identificacion: result.data.identificacion,
      direccion: result.data.direccion,
      tipoConsulta: result.data.tipoConsulta,
      categoria: result.data.categoria,
      reCaptchaToken: result.data.reCaptchaToken,
    };

    // Añadir especificaciones de transformador si existen
    if (formData.especificacionesTransformador && 
        typeof formData.especificacionesTransformador === 'object') {
      validatedData.especificacionesTransformador = 
        formData.especificacionesTransformador as ContactFormData['especificacionesTransformador'];
    }

    return {
      valid: true,
      data: validatedData,
    };
  } catch (error: unknown) {
    console.error('Validation error:', error);
    return {
      valid: false,
      errors: { general: 'Error de validación' },
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
export function createSuccessResponse<T = unknown>(
  message: string,
  data?: T
): ApiResponse<T> {
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
  return disposableDomains.includes(domain || '');
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