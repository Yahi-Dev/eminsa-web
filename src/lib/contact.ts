/**
 * Barrel export para todos los tipos y funciones de contacto
 * Uso: import { ContactFormData, validateContactForm } from '@/lib/contact'
 */

export * from './types-contact';
export * from './contact-validation';
export { 
  sendCustomerEmail, 
  sendAdminEmail, 
  testEmailConnection 
} from './email-service';
