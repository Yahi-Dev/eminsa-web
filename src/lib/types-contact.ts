import z from "zod";

export interface ContactFormData {
  nombre: string;
  empresa?: string;
  email: string;
  telefono: string;
  identificacion?: string;
  direccion?: string;
  tipoConsulta: 'productos' | 'servicios' | ''; 
  categoria?: string; 
  mensaje: string;
  reCaptchaToken?: string;
  especificacionesTransformador?: {
    potenciaKVA?: string;
    fase?: string;
    voltajePrimario?: string;
    voltajeSecundario?: string;
    tipoTransformador?: string;
    norma?: string;
    zonaInstalacion?: string;
  };
}

// NOTA: Este esquema está DUPLICADO en contact-validation.ts
// Debes mantener solo UNO de los dos. Recomiendo eliminar este
// y usar el que está en contact-validation.ts
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
      const clean = val.replace(/\D/g, '');
      if (clean.length === 9) return clean;
      if (clean.length === 11) return clean.replace(/(\d{3})(\d{7})(\d{1})/, '$1-$2-$3');
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

export interface ApiResponse<T = unknown> {
  success: boolean;
  message: string;
  data?: T;
  errors?: Record<string, string>;
}

export interface ContactEmailData {
  nombre: string;
  empresa?: string;
  email: string;
  telefono: string;
  tipoServicio?: string;
  mensaje: string;
  timestamp: string;
  ipAddress?: string;
  userAgent?: string;
}

export const SERVICE_TYPES = {
  transformadores_nuevos: 'Transformadores Nuevos (MTN)',
  reparacion: 'Reparación (ETRYS)',
  importaciones: 'Importaciones (EIC)',
  mantenimiento: 'Mantenimiento y Servicios',
  alquiler: 'Alquiler de Equipos',
  otro: 'Otro',
} as const;

export const CATEGORIAS_PRODUCTOS = [
  'Transformadores',
  'Capacitores',
  'Paneles',
  'Seccionadores',
  'Materiales Eléctricos',
  'Reguladores de Voltaje'
] as const;

export const CATEGORIAS_SERVICIOS = [
  'Mantenimiento & Reparación',
  'Diagnóstico & Asesoría',
  'Instalaciones y montajes eléctricos',
  'Diseño de instalaciones eléctricas',
  'Análisis de aceite Dieléctrico',
  'Alquiler de transformadores'
] as const;

export type ServiceType = keyof typeof SERVICE_TYPES;