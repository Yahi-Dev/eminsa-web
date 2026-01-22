// lib/contact.ts

/**
 * Barrel export para todos los tipos y funciones de contacto
 * Uso: import { ContactFormData, validateContactForm } from '@/lib/contact'
 */

export * from './types-contact';
export { 
  sendCustomerEmail, 
  sendAdminEmail, 
  testEmailConnection 
} from './email/email-service';