import nodemailer from 'nodemailer';
import type { ContactEmailData, ContactFormData } from '@/lib/types-contact';

interface EmailConfig {
    host: string;
    port: number;
    secure: boolean;
    auth: {
        user: string;
        pass: string;
    };
    from: {
        name: string;
        email: string;
    };
}

let transporter: nodemailer.Transporter | null = null;

function getEmailConfig(): EmailConfig {
    const host = process.env.MAIL_HOST || 'smtp.gmail.com';
    const port = parseInt(process.env.MAIL_PORT || '465', 10);
    const user = process.env.MAIL_USERNAME;
    const pass = process.env.MAIL_PASSWORD;
    const fromAddress = process.env.MAIL_FROM_ADDRESS;
    const fromName = process.env.MAIL_FROM_NAME || 'Grupo EMINSA';

    if (!user || !pass || !fromAddress) {
        throw new Error('Email configuration is incomplete. Please check your .env.local file.');
    }

    return {
        host,
        port,
        secure: port === 465,
        auth: {
            user,
            pass,
        },
        from: {
            name: fromName,
            email: fromAddress,
        },
    };
}

function getTransporter(): nodemailer.Transporter {
    if (transporter) {
        return transporter;
    }

    const config = getEmailConfig();
    transporter = nodemailer.createTransport({
        host: config.host,
        port: config.port,
        secure: config.secure,
        auth: config.auth,
    });

    return transporter;
}

/**
 * HTML template for customer confirmation email
 */
function getCustomerEmailTemplate(data: ContactFormData): string {
    return `
    <!DOCTYPE html>
    <html lang="es">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <style>
            body {
                font-family: 'Montserrat', Arial, sans-serif;
                line-height: 1.6;
                color: #333;
                background-color: #f5f5f5;
            }
            .container {
                max-width: 600px;
                margin: 20px auto;
                background-color: #ffffff;
                border-radius: 12px;
                overflow: hidden;
                box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
            }
            .header {
                background: linear-gradient(135deg, #001689 0%, #000E53 100%);
                color: white;
                padding: 40px 20px;
                text-align: center;
            }
            .header h1 {
                margin: 0;
                font-size: 24px;
                font-weight: bold;
            }
            .content {
                padding: 40px;
            }
            .content h2 {
                color: #001689;
                font-size: 18px;
                margin-bottom: 20px;
            }
            .info-block {
                background-color: #f9f9f9;
                border-left: 4px solid #00A3E0;
                padding: 15px;
                margin-bottom: 20px;
                border-radius: 4px;
            }
            .info-block p {
                margin: 8px 0;
            }
            .label {
                font-weight: bold;
                color: #001689;
                margin-right: 8px;
            }
            .message-box {
                background-color: #f0f0f0;
                padding: 20px;
                border-radius: 8px;
                margin: 20px 0;
                border: 1px solid #e0e0e0;
            }
            .footer {
                background-color: #f5f5f5;
                padding: 20px;
                text-align: center;
                font-size: 12px;
                color: #666;
                border-top: 1px solid #e0e0e0;
            }
            .cta-button {
                display: inline-block;
                background-color: #001689;
                color: white;
                padding: 12px 30px;
                text-decoration: none;
                border-radius: 6px;
                margin: 20px 0;
                font-weight: bold;
            }
            .cta-button:hover {
                background-color: #000E53;
            }
            .badge {
                display: inline-block;
                background-color: #00A3E0;
                color: white;
                padding: 6px 12px;
                border-radius: 20px;
                font-size: 12px;
                font-weight: bold;
                margin-top: 10px;
            }
        </style>
    </head>
    <body>
        <div class="container">
            <div class="header">
                <h1>¡Gracias por Contactarnos!</h1>
                <p style="margin: 10px 0 0 0; opacity: 0.9;">Grupo EMINSA</p>
            </div>
            
            <div class="content">
                <h2>Confirmación de tu Solicitud</h2>
                <p>Hola <strong>${data.nombre}</strong>,</p>
                
                <p>Hemos recibido tu mensaje exitosamente. Uno de nuestros especialistas se comunicará contigo en menos de 30 minutos durante horario laboral.</p>
                
                <h2 style="color: #001689; font-size: 16px; margin-top: 30px;">Detalles de tu Solicitud:</h2>
                <div class="info-block">
                <p><span class="label">Nombre:</span> ${data.nombre}</p>
                ${data.empresa ? `<p><span class="label">Empresa:</span> ${data.empresa}</p>` : ''}
                <p><span class="label">Email:</span> ${data.email}</p>
                <p><span class="label">Teléfono:</span> ${data.telefono}</p>
                ${data.tipoConsulta ? `<p><span class="label">Tipo de Consulta:</span> ${data.tipoConsulta === 'productos' ? 'Productos' : 'Servicios'}</p>` : ''}
                ${data.categoria ? `<p><span class="label">Categoría:</span> ${data.categoria}</p>` : ''}
                </div>
                
                <h3 style="color: #001689; font-size: 14px;">Tu Mensaje:</h3>
                <div class="message-box">
                    <p>${data.mensaje.replace(/\n/g, '<br>')}</p>
                </div>
                
                <p style="margin-top: 30px; color: #666; font-size: 14px;">
                    Si necesitas contactarnos de forma inmediata, puedes:
                </p>
                <ul style="color: #666; font-size: 14px;">
                    <li>Llamar al: <strong>+1 809-560-7773</strong></li>
                    <li>Escribir por WhatsApp: <strong>+1 809-560-7773</strong></li>
                    <li>Enviar un email a: <strong>info@eminsa.com</strong></li>
                </ul>
                
                <p style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #e0e0e0; color: #666; font-size: 13px;">
                    Este es un mensaje automático. Por favor, no respondas a este email.
                </p>
            </div>
            
            <div class="footer">
                <p>Grupo EMINSA - Experiencia y Servicio</p>
                <p>Av. Duarte, Km 22, Parque industrial Duarte, Nave No. 6</p>
                <p>&copy; 2026 Grupo EMINSA. Todos los derechos reservados.</p>
            </div>
        </div>
    </body>
    </html>
  `;
}

/**
 * HTML template for admin notification email
 */
function getAdminEmailTemplate(data: ContactFormData, ipAddress?: string): string {
    return `
    <!DOCTYPE html>
    <html lang="es">
    <head>
        <meta charset="UTF-8">
        <style>
            body {
                font-family: 'Montserrat', Arial, sans-serif;
                line-height: 1.6;
                color: #333;
            }
            .container {
                max-width: 700px;
                margin: 20px auto;
                background-color: #ffffff;
                border: 2px solid #001689;
                border-radius: 8px;
                overflow: hidden;
            }
            .header {
                background-color: #001689;
                color: white;
                padding: 20px;
                text-align: center;
            }
            .header h1 {
                margin: 0;
                font-size: 20px;
            }
            .badge {
                display: inline-block;
                background-color: #00A3E0;
                color: white;
                padding: 6px 12px;
                border-radius: 20px;
                font-size: 11px;
                margin: 10px 0 0 0;
            }
            .content {
                padding: 30px;
            }
            .section {
                margin-bottom: 25px;
            }
            .section h3 {
                color: #001689;
                font-size: 14px;
                text-transform: uppercase;
                margin: 0 0 15px 0;
                border-bottom: 2px solid #00A3E0;
                padding-bottom: 8px;
            }
            .field {
                margin-bottom: 10px;
                display: flex;
                border-bottom: 1px solid #f0f0f0;
                padding: 8px 0;
            }
            .field-label {
                font-weight: bold;
                color: #001689;
                width: 120px;
                min-width: 120px;
            }
            .field-value {
                flex: 1;
                color: #333;
            }
            .message {
                background-color: #f5f5f5;
                padding: 15px;
                border-left: 4px solid #00A3E0;
                border-radius: 4px;
                white-space: pre-wrap;
                word-wrap: break-word;
            }
            .action-buttons {
                margin-top: 20px;
                display: flex;
                gap: 10px;
            }
            .btn {
                display: inline-block;
                padding: 10px 20px;
                text-decoration: none;
                border-radius: 4px;
                font-weight: bold;
                font-size: 12px;
            }
            .btn-primary {
                background-color: #001689;
                color: white;
            }
            .meta {
                background-color: #f9f9f9;
                padding: 12px;
                border-radius: 4px;
                font-size: 11px;
                color: #666;
                margin-top: 20px;
            }
        </style>
    </head>
    <body>
        <div class="container">
            <div class="header">
                <h1>📧 Nueva Solicitud de Contacto</h1>
                <div class="badge">⏱️ Requiere respuesta rápida</div>
            </div>
            
            <div class="content">
                <div class="section">
                    <h3>Información del Cliente</h3>
                    <div class="field">
                        <div class="field-label">Nombre:</div>
                        <div class="field-value">${data.nombre}</div>
                    </div>
                    <div class="field">
                        <div class="field-label">Email:</div>
                        <div class="field-value"><a href="mailto:${data.email}">${data.email}</a></div>
                    </div>
                    <div class="field">
                        <div class="field-label">Teléfono:</div>
                        <div class="field-value"><a href="tel:${data.telefono}">${data.telefono}</a></div>
                    </div>
                    ${data.empresa ? `
                    <div class="field">
                        <div class="field-label">Empresa:</div>
                        <div class="field-value">${data.empresa}</div>
                    </div>
                    ` : ''}
                </div>
                
                <div class="section">
                    <h3>Detalles de la Solicitud</h3>
                    <div class="info-block">
                    <p><span class="label">Nombre:</span> ${data.nombre}</p>
                    ${data.empresa ? `<p><span class="label">Empresa:</span> ${data.empresa}</p>` : ''}
                    <p><span class="label">Email:</span> ${data.email}</p>
                    <p><span class="label">Teléfono:</span> ${data.telefono}</p>
                    ${data.tipoConsulta ? `<p><span class="label">Tipo de Consulta:</span> ${data.tipoConsulta === 'productos' ? 'Productos' : 'Servicios'}</p>` : ''}
                    ${data.categoria ? `<p><span class="label">Categoría:</span> ${data.categoria}</p>` : ''}
                    </div>
                </div>
                
                <div class="action-buttons">
                    <a href="mailto:${data.email}?subject=Re: Tu solicitud en Grupo EMINSA" class="btn btn-primary">Responder por Email</a>
                </div>
                
                <div class="meta">
                    <p><strong>Timestamp:</strong> ${new Date().toLocaleString('es-DO')}</p>
                    ${ipAddress ? `<p><strong>IP del Cliente:</strong> ${ipAddress}</p>` : ''}
                    <p><strong>Origen:</strong> Formulario de Contacto - Sitio Web</p>
                </div>
            </div>
        </div>
    </body>
    </html>
  `;
}

/**
 * Send confirmation email to customer
 */
export async function sendCustomerEmail(formData: ContactFormData): Promise<void> {
    const transporter = getTransporter();
    const config = getEmailConfig();

    const mailOptions = {
        from: `${config.from.name} <${config.from.email}>`,
        to: formData.email,
        subject: '✓ Tu Solicitud ha sido Recibida - Grupo EMINSA',
        html: getCustomerEmailTemplate(formData),
        replyTo: config.from.email,
    };

    await transporter.sendMail(mailOptions);
}

/**
 * Send notification email to admin
 */
export async function sendAdminEmail(
    formData: ContactFormData,
    ipAddress?: string
): Promise<void> {
    const adminEmail = process.env.ADMIN_EMAIL;
    if (!adminEmail) {
        console.warn('ADMIN_EMAIL is not configured. Admin notification will not be sent.');
        return;
    }

    const transporter = getTransporter();
    const config = getEmailConfig();

    const mailOptions = {
        from: `${config.from.name} <${config.from.email}>`,
        to: adminEmail,
        subject: `📧 Nueva Solicitud: ${formData.nombre} - ${formData.tipoServicio || 'General'}`,
        html: getAdminEmailTemplate(formData, ipAddress),
        replyTo: formData.email,
    };

    await transporter.sendMail(mailOptions);
}

/**
 * Test email configuration
 */
export async function testEmailConnection(): Promise<boolean> {
    try {
        const transporter = getTransporter();
        await transporter.verify();
        console.log('Email configuration verified successfully');
        return true;
    } catch (error) {
        console.error('Email configuration error:', error);
        return false;
    }
}
