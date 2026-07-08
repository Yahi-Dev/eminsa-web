// ============================================================================
// Contact Feature - Validation Schemas
// ============================================================================

import { z } from 'zod';
import type { ContactFormData, ValidationResult, ApiResponse, TransformerSpec } from '../types';
import { DISPOSABLE_EMAIL_DOMAINS } from '../data/constants';

/**
 * Esquema de validación para especificaciones de transformador
 */
export const transformerSpecsSchema = z.object({
  potenciaKVA: z.string().min(1, 'La potencia es requerida'),
  fase: z.string().min(1, 'La fase es requerida'),
  voltajePrimario: z.string().min(1, 'El voltaje primario es requerido'),
  voltajeSecundario: z.string().min(1, 'El voltaje secundario es requerido'),
  tipoTransformador: z.string().min(1, 'El tipo de transformador es requerido'),
  norma: z.string().min(1, 'La norma es requerida'),
  zonaInstalacion: z.string().min(1, 'La zona de instalación es requerida'),
}).optional();

/**
 * Esquema principal de validación para el formulario de contacto
 */
export const contactFormSchema = z.object({
  nombre: z
    .string()
    .min(2, 'form.errors.fields.nombreMin')
    .max(100, 'form.errors.fields.nombreMax')
    .trim(),

  empresa: z
    .string()
    .max(100, 'form.errors.fields.empresaMax')
    .trim()
    .optional()
    .or(z.literal('')),

  email: z
    .string()
    .email('form.errors.fields.emailInvalid')
    .max(255, 'form.errors.fields.emailMax')
    .toLowerCase()
    .trim()
    .refine(
      (email) => {
        const domain = email.split('@')[1];
        return !DISPOSABLE_EMAIL_DOMAINS.includes(domain as typeof DISPOSABLE_EMAIL_DOMAINS[number]);
      },
      'form.errors.fields.emailDisposable'
    ),

  telefono: z
    .string()
    .min(7, 'form.errors.fields.telefonoMin')
    .max(20, 'form.errors.fields.telefonoMax')
    .regex(/^[\d+\s\-().]+$/, 'form.errors.fields.telefonoInvalid')
    .trim(),

  identificacion: z
    .string()
    .min(9, 'form.errors.fields.idMin')
    .max(13, 'form.errors.fields.idMax')
    .regex(
      /^(\d{9}|\d{3}-\d{7}-\d{1})$/,
      'form.errors.fields.idFormat'
    )
    .transform((val) => {
      const clean = val.replace(/\D/g, '');
      if (clean.length === 9) return clean;
      if (clean.length === 11) return clean.replace(/(\d{3})(\d{7})(\d{1})/, '$1-$2-$3');
      return val;
    })
    .optional()
    .or(z.literal('')),

  direccion: z
    .string()
    .min(5, 'form.errors.fields.direccionMin')
    .max(130, 'form.errors.fields.direccionMax')
    .trim()
    .optional()
    .or(z.literal('')),

  tipoConsulta: z
    .enum(['productos', 'servicios', ''])
    .refine((val) => val !== '', 'form.errors.fields.tipoConsultaRequired'),

  categoria: z
    .string()
    .max(50, 'form.errors.fields.categoriaMax')
    .trim()
    .optional()
    .or(z.literal('')),

  mensaje: z
    .string()
    .min(10, 'form.errors.fields.mensajeMin')
    .max(5000, 'form.errors.fields.mensajeMax')
    .trim(),
  
  reCaptchaToken: z.string().optional(),
  
  especificacionesTransformador: transformerSpecsSchema,
});

/**
 * Tipo inferido del esquema de validación
 */
export type ContactFormValues = z.infer<typeof contactFormSchema>;

/**
 * Esquema parcial para actualizaciones
 */
export const contactFormPartialSchema = contactFormSchema.partial();

/**
 * Valida los datos del formulario de contacto
 */
export function validateContactForm(data: unknown): ValidationResult {
  try {
    if (!data || typeof data !== 'object') {
      return {
        valid: false,
        errors: { general: 'form.errors.fields.general' },
      };
    }

    const formData = data as Record<string, unknown>;

    // Procesar campos vacíos
    const processedData = {
      ...formData,
      empresa: normalizeOptionalField(formData.empresa),
      identificacion: normalizeOptionalField(formData.identificacion),
      direccion: normalizeOptionalField(formData.direccion),
      categoria: normalizeOptionalField(formData.categoria),
      tipoConsulta: formData.tipoConsulta || '',
    };

    const result = contactFormSchema.safeParse(processedData);
    
    if (!result.success) {
      const errors = extractZodErrors(result.error);
      return { valid: false, errors };
    }

    const validatedData = buildContactFormData(result.data, formData);

    return { valid: true, data: validatedData };
  } catch (error) {
    console.error('Validation error:', error);
    return {
      valid: false,
      errors: { general: 'form.errors.fields.general' },
    };
  }
}

/**
 * Normaliza campos opcionales
 */
function normalizeOptionalField(value: unknown): string | undefined {
  if (typeof value === 'string') {
    const trimmed = value.trim();
    return trimmed || undefined;
  }
  return undefined;
}

/**
 * Extrae errores de Zod en formato de objeto
 */
function extractZodErrors(error: z.ZodError): Record<string, string> {
  const errors: Record<string, string> = {};
  error.issues.forEach((issue) => {
    const field = issue.path[0] as string;
    errors[field] = issue.message;
  });
  return errors;
}

/**
 * Construye el objeto ContactFormData desde los datos validados
 */
function buildContactFormData(
  validatedData: ContactFormValues,
  originalData: Record<string, unknown>
): ContactFormData {
  const transformadores = Array.isArray(originalData.transformadores) 
    ? originalData.transformadores as TransformerSpec[]
    : [];

  const contactData: ContactFormData = {
    nombre: validatedData.nombre,
    email: validatedData.email,
    telefono: validatedData.telefono,
    mensaje: validatedData.mensaje,
    tipoConsulta: validatedData.tipoConsulta as 'productos' | 'servicios' | '',
    empresa: validatedData.empresa,
    identificacion: validatedData.identificacion,
    direccion: validatedData.direccion,
    categoria: validatedData.categoria,
    reCaptchaToken: validatedData.reCaptchaToken,
    transformadores, // ✅ Now included in initial object
  };

  return contactData;
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
 * Valida si un email es de un dominio desechable
 */
export function isDisposableEmail(email: string): boolean {
  const domain = email.split('@')[1];
  return DISPOSABLE_EMAIL_DOMAINS.includes(domain as typeof DISPOSABLE_EMAIL_DOMAINS[number]);
}

/**
 * Obtiene la IP del cliente desde los headers
 */
export function getClientIp(headers: Headers): string | undefined {
  const forwardedFor = headers.get('x-forwarded-for');
  const realIp = headers.get('x-real-ip');

  if (forwardedFor) {
    return forwardedFor.split(',')[0].trim();
  }

  return realIp || undefined;
}

/**
 * Formatea la identificación (cédula/RNC)
 */
export function formatIdentificacion(value: string): string {
  const cleanValue = value.replace(/\D/g, '');

  if (cleanValue.length <= 9) {
    return cleanValue.substring(0, 9);
  }

  if (cleanValue.length > 9) {
    const cedula = cleanValue.substring(0, 11);

    if (cedula.length === 11) {
      return cedula.replace(/(\d{3})(\d{7})(\d{1})/, '$1-$2-$3');
    }
    return cedula;
  }

  return cleanValue;
}

/**
 * Determina el tipo de identificación basado en la longitud
 */
export function getIdentificationType(identificacion: string): 'RNC' | 'Cédula' | 'Indefinido' {
  const cleanId = identificacion.replace(/\D/g, '');
  
  if (cleanId.length === 9) return 'RNC';
  if (cleanId.length === 11) return 'Cédula';
  return 'Indefinido';
}