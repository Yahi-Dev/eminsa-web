// utils/email-templates.ts

interface EmailTemplateOptions {
  appName?: string;
  logoUrl?: string;
  supportEmail?: string;
  baseUrl?: string;
}

const defaultOptions: EmailTemplateOptions = {
  appName: 'Grupo EMINSA',
  supportEmail: 'info@eminsa.com',
  baseUrl: process.env.NEXT_PUBLIC_BASE_URL || 'https://eminsa.com',
};

const brandColors = {
  primary: '#001689',
  secondary: '#00A3E0',
  accent: '#000E53',
  text: '#111827',
  muted: '#6b7280',
  bg: '#f8fafc',
  card: '#ffffff',
};

// Interfaz para especificaciones de transformador
interface TransformadorEspecificaciones {
  potenciaKVA?: string;
  fase?: string;
  voltajePrimario?: string;
  voltajeSecundario?: string;
  tipoTransformador?: string;
  norma?: string;
  zonaInstalacion?: string;
}

// ==================== EMAIL PARA CLIENTE ====================
export function customerConfirmationTemplate(
  data: {
    nombre: string;
    empresa?: string;
    email: string;
    telefono: string;
    tipoConsulta?: 'productos' | 'servicios' | '';
    categoria?: string;
    mensaje: string;
    identificacion?: string;
    direccion?: string;
    especificacionesTransformador?: TransformadorEspecificaciones;
  },
  options?: EmailTemplateOptions
) {
  const { appName, supportEmail } = { ...defaultOptions, ...options };
  const { primary, secondary, text, muted, bg, card } = brandColors;
  
  const preheader = `Confirmación de tu solicitud en ${appName}`;
  const safeLogo = options?.logoUrl || `${options?.baseUrl || defaultOptions.baseUrl}/logo.png`;

  // Formatear datos específicos de transformadores si existen
  const especificacionesHTML = data.especificacionesTransformador ? `
    <div style="margin:24px 0; padding:20px; background:#f0f7ff; border-radius:8px; border-left:4px solid ${secondary};">
      <h3 style="margin:0 0 16px 0; font-family:Segoe UI,Roboto,Arial,sans-serif; font-size:16px; color:${primary};">
        📋 Especificaciones del Transformador
      </h3>
      <table width="100%" cellpadding="0" cellspacing="0" style="font-family:Segoe UI,Roboto,Arial,sans-serif; font-size:14px; color:${text};">
        ${data.especificacionesTransformador.potenciaKVA ? `
        <tr>
          <td width="140" style="padding:8px 0; color:${muted};">Potencia (KVA):</td>
          <td style="padding:8px 0; font-weight:bold;">${data.especificacionesTransformador.potenciaKVA}</td>
        </tr>
        ` : ''}
        ${data.especificacionesTransformador.fase ? `
        <tr>
          <td width="140" style="padding:8px 0; color:${muted};">Fase:</td>
          <td style="padding:8px 0; font-weight:bold;">${data.especificacionesTransformador.fase === 'monofasico' ? 'Monofásico' : 'Trifásico'}</td>
        </tr>
        ` : ''}
        ${data.especificacionesTransformador.voltajePrimario ? `
        <tr>
          <td width="140" style="padding:8px 0; color:${muted};">Voltaje Primario:</td>
          <td style="padding:8px 0; font-weight:bold;">${data.especificacionesTransformador.voltajePrimario} V</td>
        </tr>
        ` : ''}
        ${data.especificacionesTransformador.voltajeSecundario ? `
        <tr>
          <td width="140" style="padding:8px 0; color:${muted};">Voltaje Secundario:</td>
          <td style="padding:8px 0; font-weight:bold;">${data.especificacionesTransformador.voltajeSecundario} V</td>
        </tr>
        ` : ''}
        ${data.especificacionesTransformador.tipoTransformador ? `
        <tr>
          <td width="140" style="padding:8px 0; color:${muted};">Tipo:</td>
          <td style="padding:8px 0; font-weight:bold;">${data.especificacionesTransformador.tipoTransformador}</td>
        </tr>
        ` : ''}
        ${data.especificacionesTransformador.norma ? `
        <tr>
          <td width="140" style="padding:8px 0; color:${muted};">Norma:</td>
          <td style="padding:8px 0; font-weight:bold;">${data.especificacionesTransformador.norma}</td>
        </tr>
        ` : ''}
        ${data.especificacionesTransformador.zonaInstalacion ? `
        <tr>
          <td width="140" style="padding:8px 0; color:${muted};">Zona de Instalación:</td>
          <td style="padding:8px 0; font-weight:bold;">${data.especificacionesTransformador.zonaInstalacion}</td>
        </tr>
        ` : ''}
      </table>
    </div>
  ` : '';

  return `<!doctype html>
<html lang="es">
<head>
  <meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
  <meta name="color-scheme" content="light only" />
  <meta name="x-apple-disable-message-reformatting" />
  <meta name="format-detection" content="telephone=no, date=no, address=no, email=no" />
  <title>${appName} - Confirmación de Solicitud</title>
  <style>
    a { text-decoration: none; color: ${primary}; }
    @media (max-width: 600px) {
      .container { width: 100% !important; }
      .px { padding-left: 20px !important; padding-right: 20px !important; }
      .btn { width: 100% !important; }
    }
  </style>
</head>
<body style="margin:0; padding:0; background:${bg};">
  <!-- Preheader (oculto) -->
  <div style="display:none; max-height:0; overflow:hidden; opacity:0; color:transparent; visibility:hidden;">
    ${preheader}
  </div>

  <table role="presentation" cellpadding="0" cellspacing="0" width="100%" style="background:${bg};">
    <tr>
      <td align="center" style="padding: 32px 16px;">
        <table role="presentation" cellpadding="0" cellspacing="0" width="600" class="container" style="width:600px; max-width:100%;">
          <!-- Card -->
          <tr>
            <td style="background:${card}; border-radius:16px; box-shadow:0 20px 60px rgba(0,0,0,.12); overflow:hidden;">
              <!-- Top bar gradient -->
              <div style="height:6px; background: linear-gradient(90deg, ${primary}, ${secondary});"></div>

              <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
                <tr>
                  <td align="center" class="px" style="padding: 32px 40px;">
                    <!-- Logo -->
                    <div style="display:inline-block; background:#fff; border-radius:16px; padding:16px; box-shadow:0 10px 25px rgba(0,0,0,.08);">
                      <img src="${safeLogo}" alt="${appName} Logo" width="114" height="114" style="display:block; border:0; outline:none; text-decoration:none;" />
                    </div>

                    <!-- Heading -->
                    <h1 style="margin:24px 0 8px; font-family:Segoe UI,Roboto,Arial,sans-serif; font-size:24px; line-height:1.3; color:${text};">
                      ¡Gracias por Contactarnos!
                    </h1>
                    <div style="height:6px; width:96px; margin:8px auto 0; border-radius:9999px; background: linear-gradient(90deg, ${primary}, ${secondary});"></div>

                    <!-- Mensaje principal -->
                    <p style="margin:24px 0 0; font-family:Segoe UI,Roboto,Arial,sans-serif; font-size:14px; line-height:1.7; color:${muted};">
                      Hola <strong style="color:${text};">${data.nombre}</strong>,
                    </p>
                    <p style="margin:12px 0 0; font-family:Segoe UI,Roboto,Arial,sans-serif; font-size:14px; line-height:1.7; color:${muted};">
                      Hemos recibido tu mensaje exitosamente. Uno de nuestros especialistas se comunicará contigo en menos de 30 minutos durante horario laboral.
                    </p>

                    <!-- Detalles de la solicitud -->
                    <div style="margin:24px 0; padding:20px; background:#f8f9fa; border-radius:8px;">
                      <h3 style="margin:0 0 16px 0; font-family:Segoe UI,Roboto,Arial,sans-serif; font-size:16px; color:${primary};">
                        📋 Detalles de tu Solicitud
                      </h3>
                      <table width="100%" cellpadding="0" cellspacing="0" style="font-family:Segoe UI,Roboto,Arial,sans-serif; font-size:14px; color:${text};">
                        <tr>
                          <td width="120" style="padding:8px 0; color:${muted};">Nombre:</td>
                          <td style="padding:8px 0; font-weight:bold;">${data.nombre}</td>
                        </tr>
                        ${data.empresa ? `
                        <tr>
                          <td style="padding:8px 0; color:${muted};">Empresa:</td>
                          <td style="padding:8px 0; font-weight:bold;">${data.empresa}</td>
                        </tr>
                        ` : ''}
                        ${data.identificacion ? `
                        <tr>
                          <td style="padding:8px 0; color:${muted};">RNC/Cédula:</td>
                          <td style="padding:8px 0; font-weight:bold;">${data.identificacion}</td>
                        </tr>
                        ` : ''}
                        <tr>
                          <td style="padding:8px 0; color:${muted};">Email:</td>
                          <td style="padding:8px 0; font-weight:bold;">${data.email}</td>
                        </tr>
                        <tr>
                          <td style="padding:8px 0; color:${muted};">Teléfono:</td>
                          <td style="padding:8px 0; font-weight:bold;">${data.telefono}</td>
                        </tr>
                        ${data.direccion ? `
                        <tr>
                          <td style="padding:8px 0; color:${muted};">Dirección:</td>
                          <td style="padding:8px 0; font-weight:bold;">${data.direccion}</td>
                        </tr>
                        ` : ''}
                        ${data.tipoConsulta ? `
                        <tr>
                          <td style="padding:8px 0; color:${muted};">Tipo:</td>
                          <td style="padding:8px 0; font-weight:bold;">
                            ${data.tipoConsulta === 'productos' ? 'Productos' : 'Servicios'}
                            ${data.categoria ? ` - ${data.categoria}` : ''}
                          </td>
                        </tr>
                        ` : ''}
                      </table>
                    </div>

                    ${especificacionesHTML}

                    <!-- Mensaje del usuario -->
                    <div style="margin:24px 0; padding:20px; background:#f8f9fa; border-radius:8px;">
                      <h3 style="margin:0 0 16px 0; font-family:Segoe UI,Roboto,Arial,sans-serif; font-size:16px; color:${primary};">
                        📝 Tu Mensaje
                      </h3>
                      <p style="margin:0; font-family:Segoe UI,Roboto,Arial,sans-serif; font-size:14px; line-height:1.6; color:${text}; white-space: pre-wrap;">
                        ${data.mensaje.replace(/\n/g, '<br>')}
                      </p>
                    </div>

                    <!-- Contacto de emergencia -->
                    <div style="margin:24px 0; padding:20px; background:#e8f4fd; border-radius:8px; border-left:4px solid ${secondary};">
                      <h3 style="margin:0 0 12px 0; font-family:Segoe UI,Roboto,Arial,sans-serif; font-size:16px; color:${primary};">
                        📞 Contacto Rápido
                      </h3>
                      <p style="margin:8px 0; font-family:Segoe UI,Roboto,Arial,sans-serif; font-size:14px; color:${text};">
                        <strong>Teléfono:</strong> +1 809-560-7773
                      </p>
                      <p style="margin:8px 0; font-family:Segoe UI,Roboto,Arial,sans-serif; font-size:14px; color:${text};">
                        <strong>WhatsApp:</strong> +1 809-560-7773
                      </p>
                      <p style="margin:8px 0; font-family:Segoe UI,Roboto,Arial,sans-serif; font-size:14px; color:${text};">
                        <strong>Email:</strong> ${supportEmail}
                      </p>
                    </div>

                    <!-- Divider -->
                    <div style="height:1px; background:#e5e7eb; margin:28px 0;"></div>

                    <!-- Footer -->
                    <p style="margin:0; font-family:Segoe UI,Roboto,Arial,sans-serif; font-size:12px; color:${muted};">
                      Este es un mensaje automático. Por favor, no respondas a este email.
                    </p>
                    <p style="margin:16px 0 0; font-family:Segoe UI,Roboto,Arial,sans-serif; font-size:12px; color:${muted};">
                      © ${new Date().getFullYear()} ${appName}. Todos los derechos reservados.<br>
                      Av. Duarte, Km 22, Parque industrial Duarte, Nave No. 6
                    </p>
                  </td>
                </tr>
              </table>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>`;
}

// ==================== EMAIL PARA ADMIN ====================
export function adminNotificationTemplate(
  data: {
    nombre: string;
    empresa?: string;
    email: string;
    telefono: string;
    tipoConsulta?: 'productos' | 'servicios' | '';
    categoria?: string;
    mensaje: string;
    identificacion?: string;
    direccion?: string;
    especificacionesTransformador?: TransformadorEspecificaciones;
  },
  ipAddress?: string,
  options?: EmailTemplateOptions
) {
  const { appName } = { ...defaultOptions, ...options };
  const { primary, secondary, text, muted } = brandColors;
  
  const timestamp = new Date().toLocaleString('es-DO', {
    timeZone: 'America/Santo_Domingo',
    dateStyle: 'full',
    timeStyle: 'long'
  });

  // Formatear especificaciones de transformadores si existen
  const especificacionesHTML = data.especificacionesTransformador ? `
    <div style="margin:16px 0; padding:16px; background:#f0f7ff; border-radius:6px;">
      <h4 style="margin:0 0 12px 0; font-family:Segoe UI,Roboto,Arial,sans-serif; font-size:14px; color:${primary};">
        🔧 Especificaciones Técnicas del Transformador:
      </h4>
      <table width="100%" cellpadding="0" cellspacing="0" style="font-family:Segoe UI,Roboto,Arial,sans-serif; font-size:13px; color:${text};">
        ${data.especificacionesTransformador.potenciaKVA ? `
        <tr>
          <td width="160" style="padding:4px 0; color:${muted};">Potencia (KVA):</td>
          <td style="padding:4px 0;"><strong>${data.especificacionesTransformador.potenciaKVA}</strong></td>
        </tr>
        ` : ''}
        ${data.especificacionesTransformador.fase ? `
        <tr>
          <td style="padding:4px 0; color:${muted};">Fase:</td>
          <td style="padding:4px 0;"><strong>${data.especificacionesTransformador.fase === 'monofasico' ? 'Monofásico' : 'Trifásico'}</strong></td>
        </tr>
        ` : ''}
        ${data.especificacionesTransformador.voltajePrimario ? `
        <tr>
          <td style="padding:4px 0; color:${muted};">Voltaje Primario:</td>
          <td style="padding:4px 0;"><strong>${data.especificacionesTransformador.voltajePrimario} V</strong></td>
        </tr>
        ` : ''}
        ${data.especificacionesTransformador.voltajeSecundario ? `
        <tr>
          <td style="padding:4px 0; color:${muted};">Voltaje Secundario:</td>
          <td style="padding:4px 0;"><strong>${data.especificacionesTransformador.voltajeSecundario} V</strong></td>
        </tr>
        ` : ''}
        ${data.especificacionesTransformador.tipoTransformador ? `
        <tr>
          <td style="padding:4px 0; color:${muted};">Tipo:</td>
          <td style="padding:4px 0;"><strong>${data.especificacionesTransformador.tipoTransformador}</strong></td>
        </tr>
        ` : ''}
        ${data.especificacionesTransformador.norma ? `
        <tr>
          <td style="padding:4px 0; color:${muted};">Norma:</td>
          <td style="padding:4px 0;"><strong>${data.especificacionesTransformador.norma}</strong></td>
        </tr>
        ` : ''}
        ${data.especificacionesTransformador.zonaInstalacion ? `
        <tr>
          <td style="padding:4px 0; color:${muted};">Zona de Instalación:</td>
          <td style="padding:4px 0;"><strong>${data.especificacionesTransformador.zonaInstalacion}</strong></td>
        </tr>
        ` : ''}
      </table>
    </div>
  ` : '';

  return `<!doctype html>
<html lang="es">
<head>
  <meta charset="UTF-8">
  <style>
    body { font-family: 'Segoe UI', Roboto, Arial, sans-serif; line-height: 1.6; color: #333; }
    a { color: ${primary}; text-decoration: none; }
    a:hover { text-decoration: underline; }
  </style>
</head>
<body style="margin:0; padding:20px; background:#f5f5f5;">
  <div style="max-width:700px; margin:0 auto; background:#fff; border:2px solid ${primary}; border-radius:12px; overflow:hidden; box-shadow:0 10px 30px rgba(0,0,0,.1);">
    
    <!-- Header -->
    <div style="background:linear-gradient(135deg, ${primary} 0%, ${secondary} 100%); color:#fff; padding:24px; text-align:center;">
      <h1 style="margin:0; font-size:20px;">NUEVA SOLICITUD DE CONTACTO</h1>
      <div style="display:inline-block; background:rgba(255,255,255,.2); color:#fff; padding:6px 16px; border-radius:20px; font-size:12px; font-weight:bold; margin-top:12px;">
         REQUIERE RESPUESTA RÁPIDA
      </div>
    </div>

    <!-- Content -->
    <div style="padding:32px;">
      
      <!-- Información del Cliente -->
      <div style="margin-bottom:24px;">
        <h2 style="margin:0 0 16px 0; font-size:18px; color:${primary}; border-bottom:3px solid ${secondary}; padding-bottom:8px;">
          Información del Cliente
        </h2>
        <table width="100%" cellpadding="0" cellspacing="0" style="font-size:14px;">
          <tr>
            <td width="140" style="padding:8px 0; color:#666;">Nombre:</td>
            <td style="padding:8px 0; font-weight:bold;">${data.nombre}</td>
          </tr>
          ${data.empresa ? `
          <tr>
            <td style="padding:8px 0; color:#666;">Empresa:</td>
            <td style="padding:8px 0; font-weight:bold;">${data.empresa}</td>
          </tr>
          ` : ''}
          ${data.identificacion ? `
          <tr>
            <td style="padding:8px 0; color:#666;">RNC/Cédula:</td>
            <td style="padding:8px 0; font-weight:bold;">${data.identificacion}</td>
          </tr>
          ` : ''}
          <tr>
            <td style="padding:8px 0; color:#666;">Email:</td>
            <td style="padding:8px 0; font-weight:bold;"><a href="mailto:${data.email}">${data.email}</a></td>
          </tr>
          <tr>
            <td style="padding:8px 0; color:#666;">Teléfono:</td>
            <td style="padding:8px 0; font-weight:bold;"><a href="tel:${data.telefono}">${data.telefono}</a></td>
          </tr>
          ${data.direccion ? `
          <tr>
            <td style="padding:8px 0; color:#666;">Dirección:</td>
            <td style="padding:8px 0; font-weight:bold;">${data.direccion}</td>
          </tr>
          ` : ''}
        </table>
      </div>

      <!-- Detalles de la Solicitud -->
      <div style="margin-bottom:24px;">
        <h2 style="margin:0 0 16px 0; font-size:18px; color:${primary}; border-bottom:3px solid ${secondary}; padding-bottom:8px;">
          📋 Detalles de la Solicitud
        </h2>
        <table width="100%" cellpadding="0" cellspacing="0" style="font-size:14px;">
          ${data.tipoConsulta ? `
          <tr>
            <td width="160" style="padding:8px 0; color:#666;">Tipo de Consulta:</td>
            <td style="padding:8px 0; font-weight:bold;">
              ${data.tipoConsulta === 'productos' ? 'Productos' : 'Servicios'}
            </td>
          </tr>
          ` : ''}
          ${data.categoria ? `
          <tr>
            <td style="padding:8px 0; color:#666;">Categoría:</td>
            <td style="padding:8px 0; font-weight:bold;">${data.categoria}</td>
          </tr>
          ` : ''}
        </table>
      </div>

      ${especificacionesHTML}

      <!-- Mensaje del Cliente -->
      <div style="margin-bottom:24px;">
        <h2 style="margin:0 0 16px 0; font-size:18px; color:${primary}; border-bottom:3px solid ${secondary}; padding-bottom:8px;">
          Mensaje del Cliente
        </h2>
        <div style="background:#f8f9fa; padding:20px; border-radius:8px; border-left:4px solid ${secondary};">
          <p style="margin:0; font-size:14px; line-height:1.6; white-space: pre-wrap;">
            ${data.mensaje.replace(/\n/g, '<br>')}
          </p>
        </div>
      </div>

      <!-- Botones de Acción -->
      <div style="margin:32px 0; text-align:center;">
        <a href="mailto:${data.email}?subject=Re: Tu solicitud en ${appName}&body=Hola ${data.nombre}," 
           style="display:inline-block; background:${primary}; color:#fff; padding:14px 28px; border-radius:8px; font-weight:bold; margin:0 8px;">
          ✉️ Responder por Email
        </a>
        <a href="tel:${data.telefono}" 
           style="display:inline-block; background:${secondary}; color:#fff; padding:14px 28px; border-radius:8px; font-weight:bold; margin:0 8px;">
          📞 Llamar Ahora
        </a>
      </div>

      <!-- Metadatos -->
      <div style="margin-top:32px; padding-top:24px; border-top:2px dashed #e0e0e0;">
        <h3 style="margin:0 0 12px 0; font-size:14px; color:#666;">📊 Información Técnica</h3>
        <table width="100%" cellpadding="0" cellspacing="0" style="font-size:12px; color:#888;">
          <tr>
            <td width="120" style="padding:4px 0;">📅 Fecha y Hora:</td>
            <td style="padding:4px 0;"><strong>${timestamp}</strong></td>
          </tr>
          ${ipAddress ? `
          <tr>
            <td style="padding:4px 0;">🌐 IP del Cliente:</td>
            <td style="padding:4px 0;"><code>${ipAddress}</code></td>
          </tr>
          ` : ''}
          <tr>
            <td style="padding:4px 0;">🚀 Origen:</td>
            <td style="padding:4px 0;">Formulario Web - ${appName}</td>
          </tr>
        </table>
      </div>

    </div>

    <!-- Footer -->
    <div style="background:#f8f9fa; padding:20px; text-align:center; border-top:1px solid #e0e0e0;">
      <p style="margin:0; font-size:12px; color:#888;">
        Este es un mensaje automático del sistema de ${appName}.<br>
        Si recibiste este email por error, por favor ignóralo.
      </p>
    </div>

  </div>
</body>
</html>`;
}

// ==================== VERSIÓN TEXTO PLANO ====================
export function customerConfirmationText(
  data: {
    nombre: string;
    empresa?: string;
    email: string;
    telefono: string;
    tipoConsulta?: 'productos' | 'servicios' | '';
    categoria?: string;
    mensaje: string;
    identificacion?: string;
    direccion?: string;
    especificacionesTransformador?: TransformadorEspecificaciones;
  },
  options?: EmailTemplateOptions
) {
  const { appName, supportEmail } = { ...defaultOptions, ...options };
  
  let text = `¡Gracias por Contactarnos!

Hola ${data.nombre},

Hemos recibido tu mensaje exitosamente. Uno de nuestros especialistas se comunicará contigo en menos de 30 minutos durante horario laboral.

📋 DETALLES DE TU SOLICITUD:
─────────────────────────────
• Nombre: ${data.nombre}
${data.empresa ? `• Empresa: ${data.empresa}\n` : ''}
${data.identificacion ? `• RNC/Cédula: ${data.identificacion}\n` : ''}
• Email: ${data.email}
• Teléfono: ${data.telefono}
${data.direccion ? `• Dirección: ${data.direccion}\n` : ''}
${data.tipoConsulta ? `• Tipo: ${data.tipoConsulta === 'productos' ? 'Productos' : 'Servicios'}\n` : ''}
${data.categoria ? `• Categoría: ${data.categoria}\n` : ''}

💬 TU MENSAJE:
─────────────────────────────
${data.mensaje}

`;

  // Agregar especificaciones de transformador si existen
  if (data.especificacionesTransformador) {
    text += `🔧 ESPECIFICACIONES DEL TRANSFORMADOR:
─────────────────────────────
`;
    if (data.especificacionesTransformador.potenciaKVA) {
      text += `• Potencia (KVA): ${data.especificacionesTransformador.potenciaKVA}\n`;
    }
    if (data.especificacionesTransformador.fase) {
      text += `• Fase: ${data.especificacionesTransformador.fase === 'monofasico' ? 'Monofásico' : 'Trifásico'}\n`;
    }
    if (data.especificacionesTransformador.voltajePrimario) {
      text += `• Voltaje Primario: ${data.especificacionesTransformador.voltajePrimario} V\n`;
    }
    if (data.especificacionesTransformador.voltajeSecundario) {
      text += `• Voltaje Secundario: ${data.especificacionesTransformador.voltajeSecundario} V\n`;
    }
    if (data.especificacionesTransformador.tipoTransformador) {
      text += `• Tipo: ${data.especificacionesTransformador.tipoTransformador}\n`;
    }
    if (data.especificacionesTransformador.norma) {
      text += `• Norma: ${data.especificacionesTransformador.norma}\n`;
    }
    if (data.especificacionesTransformador.zonaInstalacion) {
      text += `• Zona de Instalación: ${data.especificacionesTransformador.zonaInstalacion}\n`;
    }
    text += '\n';
  }

  text += `📞 CONTACTO RÁPIDO:
─────────────────────────────
• Teléfono: +1 809-560-7773
• WhatsApp: +1 809-560-7773
• Email: ${supportEmail}

─────────────────────────────
Este es un mensaje automático. Por favor, no respondas a este email.

© ${new Date().getFullYear()} ${appName}
Av. Duarte, Km 22, Parque industrial Duarte, Nave No. 6`;

  return text;
}

export function adminNotificationText(
  data: {
    nombre: string;
    empresa?: string;
    email: string;
    telefono: string;
    tipoConsulta?: 'productos' | 'servicios' | '';
    categoria?: string;
    mensaje: string;
    identificacion?: string;
    direccion?: string;
    especificacionesTransformador?: TransformadorEspecificaciones;
  },
  ipAddress?: string,
  options?: EmailTemplateOptions
) {
  const appName  = "Grupo EMINSA";
  const timestamp = new Date().toLocaleString('es-DO');
  
  let text = `NUEVA SOLICITUD DE CONTACTO - ${appName.toUpperCase()}
─────────────────────────────

👤 INFORMACIÓN DEL CLIENTE:
─────────────────────────────
• Nombre: ${data.nombre}
${data.empresa ? `• Empresa: ${data.empresa}\n` : ''}
${data.identificacion ? `• RNC/Cédula: ${data.identificacion}\n` : ''}
• Email: ${data.email}
• Teléfono: ${data.telefono}
${data.direccion ? `• Dirección: ${data.direccion}\n` : ''}

📋 DETALLES DE LA SOLICITUD:
─────────────────────────────
${data.tipoConsulta ? `• Tipo: ${data.tipoConsulta === 'productos' ? 'Productos' : 'Servicios'}\n` : ''}
${data.categoria ? `• Categoría: ${data.categoria}\n` : ''}

`;

  // Agregar especificaciones de transformador si existen
  if (data.especificacionesTransformador) {
    text += `🔧 ESPECIFICACIONES DEL TRANSFORMADOR:
─────────────────────────────
`;
    if (data.especificacionesTransformador.potenciaKVA) {
      text += `• Potencia (KVA): ${data.especificacionesTransformador.potenciaKVA}\n`;
    }
    if (data.especificacionesTransformador.fase) {
      text += `• Fase: ${data.especificacionesTransformador.fase === 'monofasico' ? 'Monofásico' : 'Trifásico'}\n`;
    }
    if (data.especificacionesTransformador.voltajePrimario) {
      text += `• Voltaje Primario: ${data.especificacionesTransformador.voltajePrimario} V\n`;
    }
    if (data.especificacionesTransformador.voltajeSecundario) {
      text += `• Voltaje Secundario: ${data.especificacionesTransformador.voltajeSecundario} V\n`;
    }
    if (data.especificacionesTransformador.tipoTransformador) {
      text += `• Tipo: ${data.especificacionesTransformador.tipoTransformador}\n`;
    }
    if (data.especificacionesTransformador.norma) {
      text += `• Norma: ${data.especificacionesTransformador.norma}\n`;
    }
    if (data.especificacionesTransformador.zonaInstalacion) {
      text += `• Zona de Instalación: ${data.especificacionesTransformador.zonaInstalacion}\n`;
    }
    text += '\n';
  }

  text += `💬 MENSAJE DEL CLIENTE:
─────────────────────────────
${data.mensaje}

📊 INFORMACIÓN TÉCNICA:
─────────────────────────────
• Fecha y Hora: ${timestamp}
${ipAddress ? `• IP del Cliente: ${ipAddress}\n` : ''}
• Origen: Formulario Web
• ID de Referencia: EM-${Date.now().toString(36).toUpperCase()}

⚡ ACCIONES RECOMENDADAS:
─────────────────────────────
1. Contactar al cliente en menos de 30 minutos
2. Agendar seguimiento en CRM
3. Asignar especialista según categoría

─────────────────────────────
  REQUIERE RESPUESTA RÁPIDA 
─────────────────────────────`;

  return text;
}