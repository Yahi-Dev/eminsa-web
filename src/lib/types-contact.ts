// Tipos para el sistema de contacto

export interface ContactFormData {
  nombre: string;
  empresa?: string;
  email: string;
  telefono: string;
  tipoConsulta: 'productos' | 'servicios' | ''; 
  categoria?: string; 
  mensaje: string;
  reCaptchaToken?: string;
}


export interface ContactFormValidation {
  nombre: {
    required: true;
    minLength: 2;
    maxLength: 100;
  };
  empresa: {
    maxLength: 100;
  };
  email: {
    required: true;
    format: 'email';
  };
  telefono: {
    required: true;
    minLength: 7;
  };
  tipoServicio: {
    maxLength: 50;
  };
  mensaje: {
    required: true;
    minLength: 10;
    maxLength: 5000;
  };
}

export interface ApiResponse<T = any> {
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
