// ============================================================================
// Contact Feature - Constants & Static Data
// ============================================================================

import type { SelectOption, ContactFormState } from '../types';

/**
 * Categorías de productos disponibles
 */
export const CATEGORIAS_PRODUCTOS = [
  'Transformadores',
  'Capacitores',
  'Paneles',
  'Seccionadores',
  'Materiales Eléctricos',
  'Reguladores de Voltaje'
] as const;

/**
 * Categorías de servicios disponibles
 */
export const CATEGORIAS_SERVICIOS = [
  'Mantenimiento & Reparación',
  'Diagnóstico & Asesoría',
  'Instalaciones y montajes eléctricos',
  'Diseño de instalaciones eléctricas',
  'Análisis de aceite Dieléctrico',
  'Alquiler de transformadores'
] as const;

/**
 * Opciones de fase para transformadores
 */
export const FASES: SelectOption[] = [
  { value: 'monofasico', label: 'Monofásico' },
  { value: 'trifasico', label: 'Trifásico' }
];

/**
 * Tipos de transformadores disponibles
 */
export const TIPOS_TRANSFORMADORES: SelectOption[] = [
  { value: 'pad_mounted', label: 'Pad Mounted' },
  { value: 'poste', label: 'Poste' },
  { value: 'seco', label: 'Seco' },
  { value: 'sumergible', label: 'Sumergible' }
];

/**
 * Normas técnicas aplicables
 */
export const NORMAS: SelectOption[] = [
  { value: 'ansi', label: 'ANSI/IEEE' },
  { value: 'iec', label: 'IEC' },
  { value: 'nema', label: 'NEMA' },
  { value: 'otros', label: 'Otras normas' }
];

/**
 * Zonas de instalación
 */
export const ZONAS_INSTALACION: SelectOption[] = [
  { value: 'urbana', label: 'Zona Urbana' },
  { value: 'rural', label: 'Zona Rural' },
  { value: 'industrial', label: 'Zona Industrial' },
  { value: 'comercial', label: 'Zona Comercial' }
];

/**
 * Tipos de servicio para el formulario
 */
export const SERVICE_TYPES = {
  transformadores_nuevos: 'Transformadores Nuevos (MTN)',
  reparacion: 'Reparación (ETRYS)',
  importaciones: 'Importaciones (EIC)',
  mantenimiento: 'Mantenimiento y Servicios',
  alquiler: 'Alquiler de Equipos',
  otro: 'Otro',
} as const;

/**
 * Límites de caracteres para campos del formulario
 */
export const FIELD_LIMITS = {
  nombre: 100,
  empresa: 100,
  direccion: 130,
  mensaje: 5000,
  identificacion: 13,
  categoria: 50,
  email: 255,
  telefono: 20,
} as const;

/**
 * Estado inicial del formulario
 */
export const INITIAL_FORM_STATE: ContactFormState = {
  nombre: '',
  empresa: '',
  email: '',
  telefono: '',
  tipoConsulta: '' as const,
  categoria: '',
  mensaje: '',
  identificacion: '',
  direccion: '',
  transformadores: [{
    potenciaKVA: '',
    fase: '',
    voltajePrimario: '',
    voltajeSecundario: '',
    tipoTransformador: '',
    norma: '',
    zonaInstalacion: '',
    cantidad: '1' // Cambiado a string
  }]
};

/**
 * Lista de dominios de email temporales/desechables
 */
export const DISPOSABLE_EMAIL_DOMAINS = [
  'tempmail.com',
  'throwaway.email',
  '10minutemail.com',
  'guerrillamail.com',
  'mailinator.com',
  'temp-mail.org',
  'maildrop.cc',
] as const;

/**
 * Tipos exportados para uso externo
 */
export type CategoriaProducto = typeof CATEGORIAS_PRODUCTOS[number];
export type CategoriaServicio = typeof CATEGORIAS_SERVICIOS[number];
export type ServiceType = keyof typeof SERVICE_TYPES;