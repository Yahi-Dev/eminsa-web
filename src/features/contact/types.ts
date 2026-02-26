// ============================================================================
// Contact Feature - Type Definitions
// ============================================================================

/**
 * Tipos de consulta disponibles
 */
export type InquiryType = 'productos' | 'servicios' | '';

/**
 * Especificaciones técnicas para transformadores
 */
export interface TransformerSpec {
  potenciaKVA: string;
  fase: string;
  voltajePrimario: string;
  voltajeSecundario: string;
  tipoTransformador: string;
  norma: string;
  zonaInstalacion: string;
  cantidad: string; // Cambiado de number a string para consistencia
}

/**
 * Datos del formulario de contacto
 */
export interface ContactFormData {
  nombre: string;
  empresa?: string;
  email: string;
  telefono: string;
  identificacion?: string;
  direccion?: string;
  tipoConsulta: InquiryType;
  categoria?: string;
  mensaje: string;
  reCaptchaToken?: string;
  transformadores: TransformerSpec[];
}

/**
 * Estado interno del formulario
 */
export interface ContactFormState {
  nombre: string;
  empresa: string;
  email: string;
  telefono: string;
  tipoConsulta: InquiryType;
  categoria: string;
  mensaje: string;
  identificacion: string;
  direccion: string;
  otrosDescripcion: string;
  // Transformadores como array
  transformadores: TransformerSpec[];
}

/**
 * Errores del formulario
 */
export type FormErrors = Partial<Record<keyof Omit<ContactFormState, 'transformadores'> | 'general', string>> & {
  transformadores?: (Partial<TransformerSpec> | undefined)[];
};

/**
 * Respuesta genérica de la API
 */
export interface ApiResponse<T = unknown> {
  success: boolean;
  message: string;
  data?: T;
  errors?: Record<string, string>;
}

/**
 * Resultado de validación
 */
export interface ValidationResult {
  valid: boolean;
  errors?: Record<string, string>;
  data?: ContactFormData;
}

/**
 * Datos para envío de email de contacto
 */
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

/**
 * Opción para selectores
 */
export interface SelectOption {
  value: string;
  label: string;
}

/**
 * Props para el componente de campos de transformador
 */
export interface TransformerFieldsProps {
  formData: ContactFormState;
  formErrors: FormErrors;
  isSubmitting: boolean;
  onTransformersChange: (transformers: TransformerSpec[]) => void;
  translatedOptions: {
    fases: SelectOption[];
    tiposTransformadores: SelectOption[];
    normas: SelectOption[];
    zonasInstalacion: SelectOption[];
  };
}

/**
 * Props para el selector de tipo de consulta
 */
export interface InquiryTypeSelectorProps {
  selectedType: InquiryType;
  onSelect: (type: 'productos' | 'servicios') => void;
  error?: string;
}

/**
 * Props para el mensaje de éxito
 */
export interface ContactSuccessProps {
  onReset: () => void;
}

/**
 * Estado del hook useContactForm
 */
export interface UseContactFormReturn {
  formData: ContactFormState;
  formErrors: FormErrors;
  isSubmitting: boolean;
  isSubmitted: boolean;
  errorMessage: string | null;
  showTransformadorFields: boolean;
  showOtrosField: boolean;
  categoriasDisponibles: string[];
  translatedOptions: {
    fases: SelectOption[];
    tiposTransformadores: SelectOption[];
    normas: SelectOption[];
    zonasInstalacion: SelectOption[];
  };
  handlePhoneChange: (value: string) => void;
  handleSubmit: (e: React.FormEvent<HTMLFormElement>) => Promise<void>;
  handleChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => void;
  handleTipoConsultaClick: (tipo: 'productos' | 'servicios') => void;
  handleIdentificacionChange: (value: string) => void;
  getTipoIdentificacion: () => string;
  resetForm: () => void;
  // Nuevos métodos para transformadores
  handleTransformersChange: (transformers: TransformerSpec[]) => void;
  handleTransformerFieldChange: (index: number, field: keyof TransformerSpec, value: string) => void;
  handleAddTransformer: () => void;
  handleRemoveTransformer: (index: number) => void;
}