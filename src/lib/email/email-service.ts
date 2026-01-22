// lib/email-service.ts

import { sendEmail } from '@/lib/email/mailer';
import { 
  customerConfirmationTemplate, 
  adminNotificationTemplate,
  customerConfirmationText,
  adminNotificationText 
} from '@/utils/email-templates';
import type { ContactFormData } from '@/lib/types-contact';

interface EmailServiceOptions {
  appName?: string;
  logoUrl?: string;
  supportEmail?: string;
  baseUrl?: string;
}

const defaultEmailOptions: EmailServiceOptions = {
  appName: 'Grupo EMINSA',
  supportEmail: 'info@eminsa.com',
  baseUrl: process.env.NEXT_PUBLIC_BASE_URL || 'https://eminsa.com',
};

/**
 * Envía email de confirmación al cliente
 */
export async function sendCustomerEmail(
  formData: ContactFormData,
  options?: EmailServiceOptions
): Promise<void> {
  const mergedOptions = { ...defaultEmailOptions, ...options };
  
  const html = customerConfirmationTemplate(formData, mergedOptions);
  const text = customerConfirmationText(formData, mergedOptions);
  
  await sendEmail({
    to: formData.email,
    subject: `✓ Confirmación de Solicitud - ${mergedOptions.appName}`,
    text,
    html,
  });
  
  console.log(`✅ Email de confirmación enviado a: ${formData.email}`);
}

/**
 * Envía notificación al admin/equipo de ventas
 */
export async function sendAdminEmail(
  formData: ContactFormData,
  ipAddress?: string,
  options?: EmailServiceOptions
): Promise<void> {
  const mergedOptions = { ...defaultEmailOptions, ...options };
  
  // Determinar destinatarios (admin + posibles emails adicionales)
  const adminEmails = process.env.ADMIN_EMAILS || process.env.ADMIN_EMAIL || 'info@eminsa.com';
  const recipients = adminEmails.split(',').map(email => email.trim());
  
  // Determinar asunto según tipo de consulta
  let subject = `📧 Nueva Solicitud - ${formData.nombre}`;
  if (formData.tipoConsulta && formData.categoria) {
    subject = `📋 ${formData.categoria} - ${formData.nombre} (${formData.tipoConsulta === 'productos' ? 'Productos' : 'Servicios'})`;
  }
  
  const html = adminNotificationTemplate(formData, ipAddress, mergedOptions);
  const text = adminNotificationText(formData, ipAddress, mergedOptions);
  
  await sendEmail({
    to: recipients,
    subject,
    text,
    html,
    cc: process.env.SALES_EMAIL?.split(',').map(email => email.trim()),
    bcc: process.env.BCC_EMAIL?.split(',').map(email => email.trim()),
  });
  
  console.log(`✅ Notificación enviada al equipo: ${recipients.join(', ')}`);
}

/**
 * Función de conveniencia para enviar ambos emails
 */
export async function sendContactEmails(
  formData: ContactFormData,
  ipAddress?: string,
  options?: EmailServiceOptions
): Promise<{ customer: boolean; admin: boolean }> {
  try {
    // Enviar email al cliente
    await sendCustomerEmail(formData, options);
    
    // Enviar notificación al admin
    await sendAdminEmail(formData, ipAddress, options);
    
    return { customer: true, admin: true };
  } catch (error) {
    console.error('❌ Error enviando emails:', error);
    throw error;
  }
}

/**
 * Prueba la configuración de email
 */
export async function testEmailConnection(
  testEmail?: string
): Promise<{ success: boolean; message: string }> {
  try {
    const testRecipient = testEmail || process.env.TEST_EMAIL || 'test@example.com';
    
    await sendEmail({
      to: testRecipient,
      subject: '✅ Prueba de Configuración Email - Grupo EMINSA',
      text: 'Esta es una prueba de la configuración del sistema de email de Grupo EMINSA.',
      html: `
        <div style="padding: 20px; background: #f8fafc; font-family: Arial, sans-serif;">
          <h1 style="color: #001689;">✅ Configuración Exitosa</h1>
          <p>El sistema de email de <strong>Grupo EMINSA</strong> está configurado correctamente.</p>
          <p><strong>Fecha:</strong> ${new Date().toLocaleString('es-DO')}</p>
          <p><strong>Servidor:</strong> ${process.env.MAIL_HOST}:${process.env.MAIL_PORT}</p>
          <div style="margin-top: 20px; padding: 10px; background: #e8f4fd; border-left: 4px solid #00A3E0;">
            <p><small>Esta es una prueba automática del sistema.</small></p>
          </div>
        </div>
      `,
    });
    
    return {
      success: true,
      message: `Email de prueba enviado exitosamente a ${testRecipient}`
    };
  } catch (error) {
    return {
      success: false,
      message: `Error enviando email de prueba: ${error instanceof Error ? error.message : 'Error desconocido'}`
    };
  }
}