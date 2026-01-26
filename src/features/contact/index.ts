// ============================================================================
// Contact Feature - Public API
// ============================================================================

// Main container
export { ContactSection, default as ContactSectionDefault } from './containers/contact-section';

// Individual components (for custom layouts)
export { ContactHero } from './components/contact-hero';
export { ContactInfo } from './components/contact-info';
export { ContactForm } from '../contact/components/contact-form';
export { ContactSuccess } from './components/contact-success';
export { InquiryTypeSelector } from './components/inquiry-type-selector';
export { TransformerFields } from './components/transformer-fields';

// Hook
export { useContactForm } from './hooks/use-contact-form';

// Services
export { 
  submitContactForm, 
  checkContactApiHealth,
  retryContactSubmission,
  prepareFormDataForSubmission 
} from './services/contact';

// Validation utilities
export {
  contactFormSchema,
  transformerSpecsSchema,
  validateContactForm,
  createErrorResponse,
  createSuccessResponse,
  sanitizeString,
  isDisposableEmail,
  getClientIp,
  formatIdentificacion,
  getIdentificationType,
  type ContactFormValues,
} from './schema/contact-validation';

// Constants
export {
  CATEGORIAS_PRODUCTOS,
  CATEGORIAS_SERVICIOS,
  FASES,
  TIPOS_TRANSFORMADORES,
  NORMAS,
  ZONAS_INSTALACION,
  SERVICE_TYPES,
  FIELD_LIMITS,
  INITIAL_FORM_STATE,
  DISPOSABLE_EMAIL_DOMAINS,
  type CategoriaProducto,
  type CategoriaServicio,
  type ServiceType,
} from './data/constants';

// Types
export type {
  InquiryType,
  TransformerSpec,
  ContactFormData,
  ContactFormState,
  FormErrors,
  ApiResponse,
  ValidationResult,
  ContactEmailData,
  SelectOption,
  TransformerFieldsProps,
  InquiryTypeSelectorProps,
  ContactSuccessProps,
  UseContactFormReturn,
} from './types';