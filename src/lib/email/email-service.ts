// lib/email-service.ts

import { ContactFormData } from '@/features/contact';
import { sendEmail } from '@/lib/email/mailer';
import { 
  customerConfirmationTemplate, 
  adminNotificationTemplate,
  customerConfirmationText,
  adminNotificationText 
} from '@/utils/email-templates';

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
  data: ContactFormData,
  ipAddress?: string
): Promise<void> {
  try {
    console.log('Enviando email con datos:', {
      nombre: data.nombre,
      categoria: data.categoria,
      transformadoresCount: data.transformadores?.length || 0,
      transformadores: data.transformadores
    });
    // Preparar datos para los templates
    const emailData = {
      ...data,
      transformadores: data.transformadores || []
    };

    // Enviar email de confirmación al cliente
    const customerEmail = {
      to: data.email,
      subject: `Confirmación de tu solicitud - Grupo EMINSA`,
      html: customerConfirmationTemplate(emailData),
      text: customerConfirmationText(emailData)
    };

    // Enviar email de notificación al admin
    const adminEmail = {
      to: process.env.ADMIN_EMAIL || 'info@eminsa.com',
      subject: `Nueva solicitud de contacto - ${data.nombre}`,
      html: adminNotificationTemplate(emailData, ipAddress),
      text: adminNotificationText(emailData, ipAddress)
    };

    // Enviar ambos emails
    await Promise.all([
      sendEmail(customerEmail),
      sendEmail(adminEmail)
    ]);
    
  } catch (error) {
    console.error('Error sending contact emails:', error);
    throw new Error('Failed to send emails');
  }
}

// ─── Cotizaciones ────────────────────────────────────────────────────────────

type CotizacionUnit = 'MTN' | 'RST' | 'EIC' | 'SRV';

const UNIT_LABELS: Record<CotizacionUnit, string> = {
  MTN: 'MTN – Transformadores Nuevos',
  RST: 'ETRYS – Remanufactura y Servicios',
  EIC: 'EIC – Productos Internacionales',
  SRV: 'Servicios Técnicos',
};

const UNIT_COLORS: Record<CotizacionUnit, string> = {
  MTN: '#001689',
  RST: '#00A3E0',
  EIC: '#00B140',
  SRV: '#696969',
};

// Division-specific next-steps text sent to the customer
const UNIT_NEXT_STEPS: Record<CotizacionUnit, string> = {
  MTN: 'Nuestro equipo de ingeniería revisará sus especificaciones técnicas y le preparará una propuesta económica con el plazo de fabricación estimado.',
  RST: 'Un técnico especializado evaluará sus requerimientos y se pondrá en contacto para coordinar la visita técnica o la remisión del equipo a nuestro taller.',
  EIC: 'Nuestro equipo de comercio internacional verificará la disponibilidad con los fabricantes y le enviará una cotización CIF detallada con tiempos de entrega.',
  SRV: 'Nuestro coordinador de servicios le contactará para asignar el técnico especializado y planificar la ejecución del trabajo.',
};

// Human-readable labels for each detalles field key
const FIELD_LABELS: Record<string, string> = {
  tipoTransformador: 'Tipo de Transformador',
  configuracion: 'Configuración',
  capacidad: 'Capacidad',
  cantidad: 'Cantidad',
  cantidadUnidades: 'Cantidad de Unidades',
  voltajePrimario: 'Voltaje Primario',
  voltajeSecundario: 'Voltaje Secundario',
  potencia: 'Potencia',
  fases: 'Fases',
  tipoServicio: 'Tipo de Servicio',
  tipoProducto: 'Tipo de Transformador',
  tipoEquipo: 'Tipo de Equipo',
  marca: 'Marca del Equipo',
  urgencia: 'Nivel de Urgencia',
  categoriaProducto: 'Categoría de Producto',
  productoEspecifico: 'Producto Específico',
  cargo: 'Cargo / Posición',
  ubicacion: 'Ubicación',
  descripcion: 'Descripción / Requerimientos',
  comoNosConocio: '¿Cómo nos conoció?',
  archivos: 'Archivos Adjuntos',
};

// Human-readable values for coded/slug field values
const VALUE_MAPS: Record<string, Record<string, string>> = {
  configuracion: {
    monofasico: 'Monofásico',
    trifasico: 'Trifásico',
    autoprotegido: 'Autoprotegido (CSP)',
  },
  fases: { monofasico: 'Monofásico', trifasico: 'Trifásico' },
  urgencia: {
    normal: 'Normal',
    prioritario: 'Prioritario',
    urgente: 'URGENTE',
  },
  // MTN form — product slug → readable name
  tipoTransformador: {
    'tipo-poste': 'Tipo Poste',
    'pad-mounted': 'Pad-Mounted',
    subestacion: 'Subestación',
    seco: 'Seco / Dry-Type',
    otro: 'Otro',
  },
  // RST / ETRYS form — transformer type being serviced
  tipoProducto: {
    'tipo-poste': 'Tipo Poste',
    'pad-mounted': 'Pad-Mounted',
    subestacion: 'Subestación',
    seco: 'Seco / Dry-Type',
    otro: 'Otro / No estoy seguro',
  },
  // SRV form — equipment type
  tipoEquipo: {
    distribucion: 'Transformador de Distribución',
    potencia: 'Transformador de Potencia',
    'pad-mounted': 'Pad-Mounted',
    'tipo-poste': 'Tipo Poste',
    subestacion: 'Subestación',
    otro: 'Otro',
  },
  // RST form service options
  tipoServicio: {
    remanufactura: 'Remanufactura de Transformador',
    reparacion: 'Reparación de Transformador',
    alquiler: 'Alquiler de Transformador',
    diagnostico: 'Diagnóstico / Evaluación',
    mantenimiento: 'Mantenimiento Preventivo',
    // SRV form service IDs (from navigation.ts services array)
    preventivo: 'Mantenimiento Preventivo – Predictivo',
    correctivo: 'Mantenimiento Correctivo en Campo',
    integral: 'Mantenimiento Integral',
    emergencias: 'Atención a Emergencias',
    ingenieria: 'Ingeniería y Gestión de Proyectos',
    laboratorio: 'Pruebas de Laboratorio',
    'alquiler-transformadores': 'Alquiler de Transformadores',
    otro: 'Otro',
  },
  // EIC form categories
  categoriaProducto: {
    transformadores: 'Transformadores',
    cables: 'Cables y Conductores',
    protecciones: 'Protecciones Eléctricas',
    medicion: 'Medición y Control',
    iluminacion: 'Iluminación',
    otro: 'Otro',
  },
  comoNosConocio: {
    google: 'Google / Búsqueda web',
    referido: 'Referido por un cliente',
    redes: 'Redes sociales',
    evento: 'Evento / Feria',
    publicidad: 'Publicidad',
    representante: 'Representante de marca',
    otro: 'Otro',
  },
};

// Keys rendered under "Especificaciones Técnicas" section header
const TRANSFORMER_SPEC_KEYS = new Set([
  // MTN — new transformer order
  'tipoTransformador', 'configuracion', 'capacidad', 'cantidad',
  // RST — existing equipment being serviced
  'tipoProducto', 'marca', 'cantidadUnidades',
  // SRV — existing equipment for service
  'tipoEquipo',
  // Shared electrical specs
  'voltajePrimario', 'voltajeSecundario', 'potencia', 'fases',
]);

interface CotizacionData {
  codigo: string;
  unidad: CotizacionUnit;
  nombre: string;
  empresa?: string;
  email: string;
  telefono: string;
  urgente: boolean;
  detalles: Record<string, unknown>;
}

function getFieldLabel(key: string): string {
  return FIELD_LABELS[key] || key;
}

function getFieldValue(key: string, value: unknown): string {
  const raw = String(value);
  return VALUE_MAPS[key]?.[raw] ?? raw;
}

function buildDetallesHtml(detalles: Record<string, unknown>, accentColor = '#001689'): string {
  const entries = Object.entries(detalles).filter(([, v]) => v !== '' && v !== null && v !== undefined);
  if (entries.length === 0) return '<p style="color:#6b7280;margin:0;font-size:14px;">Sin detalles adicionales.</p>';

  const specEntries = entries.filter(([k]) => TRANSFORMER_SPEC_KEYS.has(k));
  const otherEntries = entries.filter(([k]) => !TRANSFORMER_SPEC_KEYS.has(k));

  const renderTable = (rows: [string, unknown][]) =>
    `<table style="width:100%;border-collapse:collapse;font-size:14px;">
      ${rows.map(([k, v]) => `<tr>
        <td style="padding:7px 10px;background:#f3f4f6;font-weight:600;width:42%;border-bottom:1px solid #e5e7eb;font-size:13px;">${getFieldLabel(k)}</td>
        <td style="padding:7px 10px;border-bottom:1px solid #e5e7eb;color:#374151;">${getFieldValue(k, v)}</td>
      </tr>`).join('')}
    </table>`;

  let html = '';
  if (specEntries.length > 0) {
    html += `<p style="margin:0 0 6px;font-size:12px;font-weight:700;color:${accentColor};text-transform:uppercase;letter-spacing:.5px;">Especificaciones Técnicas</p>`;
    html += renderTable(specEntries);
    if (otherEntries.length > 0) html += '<div style="height:14px;"></div>';
  }
  if (otherEntries.length > 0) {
    if (specEntries.length > 0) {
      html += `<p style="margin:0 0 6px;font-size:12px;font-weight:700;color:${accentColor};text-transform:uppercase;letter-spacing:.5px;">Información Adicional</p>`;
    }
    html += renderTable(otherEntries);
  }
  return html;
}

function buildDetallesText(detalles: Record<string, unknown>): string {
  return Object.entries(detalles)
    .filter(([, v]) => v !== '' && v !== null && v !== undefined)
    .map(([k, v]) => `  ${getFieldLabel(k)}: ${getFieldValue(k, v)}`)
    .join('\n');
}

const LOGO_URL = 'https://res.cloudinary.com/ddne5wqxo/image/upload/v1769097816/logoeminsa-Photoroom_jgkqjb.png';

export async function sendCotizacionEmails(
  data: CotizacionData,
  ipAddress?: string
): Promise<void> {
  const unidadLabel = UNIT_LABELS[data.unidad] ?? data.unidad;
  const unitColor = UNIT_COLORS[data.unidad] ?? '#001689';
  const nextSteps = UNIT_NEXT_STEPS[data.unidad] ?? 'Nuestro equipo se pondrá en contacto con usted a la brevedad.';
  const urgenteTag = data.urgente ? ' ⚠️ URGENTE' : '';
  const year = new Date().getFullYear();
  const registeredAt = new Date().toLocaleString('es-DO', { timeZone: 'America/Santo_Domingo' });

  // ── Customer confirmation ──────────────────────────────────────────────────
  const customerHtml = `
<!DOCTYPE html>
<html lang="es">
<head><meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1"></head>
<body style="margin:0;padding:0;background:#f3f4f6;font-family:Arial,Helvetica,sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="padding:32px 16px;">
    <tr><td align="center">
      <table width="600" cellpadding="0" cellspacing="0" style="max-width:600px;background:#ffffff;border-radius:12px;overflow:hidden;box-shadow:0 2px 8px rgba(0,0,0,.10);">

        <!-- Header with logo -->
        <tr>
          <td style="background:linear-gradient(135deg,${unitColor} 0%,${unitColor}cc 100%);padding:28px 32px;text-align:center;">
            <img src="${LOGO_URL}" alt="Grupo EMINSA" width="140" style="display:block;margin:0 auto 14px;max-width:140px;">
            <p style="margin:0;color:#ffffff;font-size:13px;letter-spacing:1px;text-transform:uppercase;opacity:.85;">Confirmación de Solicitud de Cotización</p>
          </td>
        </tr>

        <!-- Reference code banner -->
        <tr>
          <td style="background:#f8faff;padding:22px 32px;text-align:center;border-bottom:3px solid ${unitColor};">
            <p style="margin:0;color:#6b7280;font-size:12px;text-transform:uppercase;letter-spacing:1.5px;">Número de Referencia</p>
            <p style="margin:8px 0 4px;color:${unitColor};font-size:34px;font-weight:bold;letter-spacing:4px;line-height:1;">${data.codigo}</p>
            <p style="margin:6px 0 0;display:inline-block;background:${unitColor}15;color:${unitColor};font-size:12px;padding:3px 12px;border-radius:20px;font-weight:600;">${unidadLabel}</p>
          </td>
        </tr>

        ${data.urgente ? `<!-- Urgency banner -->
        <tr>
          <td style="background:#fef3cd;padding:10px 32px;border-bottom:1px solid #fde68a;text-align:center;">
            <p style="margin:0;color:#92400e;font-size:13px;font-weight:600;">⚠️ Su solicitud ha sido marcada como URGENTE — será atendida con máxima prioridad</p>
          </td>
        </tr>` : ''}

        <!-- Body -->
        <tr>
          <td style="padding:28px 32px;">
            <p style="margin:0 0 6px;color:#374151;font-size:16px;">Estimado/a <strong>${data.nombre}</strong>,</p>
            <p style="margin:0 0 22px;color:#6b7280;font-size:14px;line-height:1.7;">
              Hemos recibido su solicitud de cotización satisfactoriamente.
              ${nextSteps}
            </p>

            <!-- Contact info card -->
            <table width="100%" cellpadding="0" cellspacing="0" style="background:#f9fafb;border-radius:8px;border:1px solid #e5e7eb;margin-bottom:24px;">
              <tr>
                <td style="padding:14px 20px;border-bottom:1px solid #e5e7eb;">
                  <p style="margin:0;color:#374151;font-size:12px;font-weight:700;text-transform:uppercase;letter-spacing:.6px;">Sus Datos de Contacto</p>
                </td>
              </tr>
              <tr>
                <td style="padding:14px 20px;">
                  <table width="100%" cellpadding="0" cellspacing="0" style="font-size:14px;color:#6b7280;">
                    <tr>
                      <td style="padding:3px 0;width:40%;font-weight:600;color:#374151;">Empresa</td>
                      <td style="padding:3px 0;">${data.empresa || '—'}</td>
                    </tr>
                    <tr>
                      <td style="padding:3px 0;font-weight:600;color:#374151;">Correo</td>
                      <td style="padding:3px 0;">${data.email}</td>
                    </tr>
                    <tr>
                      <td style="padding:3px 0;font-weight:600;color:#374151;">Teléfono</td>
                      <td style="padding:3px 0;">${data.telefono}</td>
                    </tr>
                  </table>
                </td>
              </tr>
            </table>

            <!-- Request details -->
            <table width="100%" cellpadding="0" cellspacing="0" style="border-radius:8px;border:1px solid #e5e7eb;margin-bottom:24px;overflow:hidden;">
              <tr>
                <td style="padding:14px 20px;background:${unitColor};border-bottom:1px solid ${unitColor}cc;">
                  <p style="margin:0;color:#ffffff;font-size:12px;font-weight:700;text-transform:uppercase;letter-spacing:.6px;">Detalles de su Solicitud</p>
                </td>
              </tr>
              <tr>
                <td style="padding:16px 20px;">
                  ${buildDetallesHtml(data.detalles, unitColor)}
                </td>
              </tr>
            </table>

            <!-- Next steps -->
            <table width="100%" cellpadding="0" cellspacing="0" style="background:#f0f4ff;border-radius:8px;border-left:4px solid ${unitColor};margin-bottom:24px;">
              <tr>
                <td style="padding:14px 18px;">
                  <p style="margin:0 0 4px;color:${unitColor};font-size:12px;font-weight:700;text-transform:uppercase;letter-spacing:.6px;">¿Qué sigue?</p>
                  <p style="margin:0;color:#374151;font-size:14px;line-height:1.6;">${nextSteps}</p>
                </td>
              </tr>
            </table>

            <p style="margin:0 0 6px;color:#374151;font-size:14px;font-weight:600;">¿Necesita asistencia inmediata?</p>
            <p style="margin:0;color:#6b7280;font-size:14px;">
              📞 <a href="tel:+18095965774" style="color:${unitColor};text-decoration:none;">(809) 596-5774</a>
              &nbsp;&nbsp;|&nbsp;&nbsp;
              ✉️ <a href="mailto:info@eminsa.com" style="color:${unitColor};text-decoration:none;">info@eminsa.com</a>
            </p>
          </td>
        </tr>

        <!-- Footer -->
        <tr>
          <td style="background:#f9fafb;padding:18px 32px;border-top:1px solid #e5e7eb;text-align:center;">
            <p style="margin:0 0 4px;color:#9ca3af;font-size:12px;">
              © ${year} Grupo EMINSA – Transformadores Eléctricos de Distribución
            </p>
            <p style="margin:0;color:#d1d5db;font-size:11px;">República Dominicana</p>
          </td>
        </tr>

      </table>
    </td></tr>
  </table>
</body>
</html>`;

  const customerText = `
GRUPO EMINSA – Confirmación de Solicitud
=========================================
Número de Referencia: ${data.codigo}
Unidad: ${unidadLabel}
${data.urgente ? '⚠️  SOLICITUD MARCADA COMO URGENTE\n' : ''}
Estimado/a ${data.nombre},

Hemos recibido su solicitud de cotización satisfactoriamente.
${nextSteps}

SUS DATOS DE CONTACTO
  Empresa:  ${data.empresa || '—'}
  Correo:   ${data.email}
  Teléfono: ${data.telefono}

DETALLES DE SU SOLICITUD
${buildDetallesText(data.detalles) || '  Sin detalles adicionales.'}

¿Necesita asistencia inmediata?
  Teléfono: (809) 596-5774
  Correo:   info@eminsa.com

© ${year} Grupo EMINSA – República Dominicana
`.trim();

  // ── Admin notification ─────────────────────────────────────────────────────
  const adminHtml = `
<!DOCTYPE html>
<html lang="es">
<head><meta charset="UTF-8"></head>
<body style="margin:0;padding:0;background:#f3f4f6;font-family:Arial,Helvetica,sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="padding:24px 16px;">
    <tr><td align="center">
      <table width="640" cellpadding="0" cellspacing="0" style="max-width:640px;background:#ffffff;border-radius:12px;overflow:hidden;box-shadow:0 2px 8px rgba(0,0,0,.10);">

        <!-- Header -->
        <tr>
          <td style="background:${unitColor};padding:20px 28px;">
            <p style="margin:0;color:#ffffff;font-size:18px;font-weight:bold;">📋 Nueva Cotización — ${data.codigo}</p>
            <p style="margin:5px 0 0;color:#ffffffaa;font-size:13px;">${unidadLabel}${urgenteTag} · ${registeredAt}</p>
          </td>
        </tr>

        ${data.urgente ? `<!-- Urgency banner -->
        <tr>
          <td style="background:#dc2626;padding:10px 28px;text-align:center;">
            <p style="margin:0;color:#ffffff;font-size:13px;font-weight:700;letter-spacing:.5px;">⚠️ SOLICITUD URGENTE — ATENDER CON MÁXIMA PRIORIDAD</p>
          </td>
        </tr>` : ''}

        <!-- Contact actions -->
        <tr>
          <td style="padding:18px 28px;background:#f8faff;border-bottom:1px solid #e5e7eb;text-align:center;">
            <a href="mailto:${data.email}?subject=Re: Cotización ${data.codigo}" style="display:inline-block;margin:0 6px;padding:9px 20px;background:${unitColor};color:#ffffff;text-decoration:none;border-radius:6px;font-size:13px;font-weight:600;">✉️ Responder por Email</a>
            <a href="tel:${data.telefono.replace(/\s+/g, '')}" style="display:inline-block;margin:0 6px;padding:9px 20px;background:#374151;color:#ffffff;text-decoration:none;border-radius:6px;font-size:13px;font-weight:600;">📞 Llamar al Cliente</a>
          </td>
        </tr>

        <!-- Solicitante -->
        <tr>
          <td style="padding:22px 28px 0;">
            <p style="margin:0 0 10px;color:#374151;font-size:14px;font-weight:700;text-transform:uppercase;letter-spacing:.5px;">Datos del Solicitante</p>
            <table style="width:100%;border-collapse:collapse;font-size:14px;border-radius:8px;overflow:hidden;border:1px solid #e5e7eb;">
              <tr><td style="padding:8px 12px;background:#f3f4f6;font-weight:600;width:34%;border-bottom:1px solid #e5e7eb;">Nombre</td><td style="padding:8px 12px;border-bottom:1px solid #e5e7eb;">${data.nombre}</td></tr>
              <tr><td style="padding:8px 12px;background:#f3f4f6;font-weight:600;border-bottom:1px solid #e5e7eb;">Empresa</td><td style="padding:8px 12px;border-bottom:1px solid #e5e7eb;">${data.empresa || '—'}</td></tr>
              <tr><td style="padding:8px 12px;background:#f3f4f6;font-weight:600;border-bottom:1px solid #e5e7eb;">Email</td><td style="padding:8px 12px;border-bottom:1px solid #e5e7eb;"><a href="mailto:${data.email}" style="color:${unitColor};">${data.email}</a></td></tr>
              <tr><td style="padding:8px 12px;background:#f3f4f6;font-weight:600;border-bottom:1px solid #e5e7eb;">Teléfono</td><td style="padding:8px 12px;border-bottom:1px solid #e5e7eb;"><a href="tel:${data.telefono.replace(/\s+/g, '')}" style="color:${unitColor};">${data.telefono}</a></td></tr>
              <tr><td style="padding:8px 12px;background:#f3f4f6;font-weight:600;border-bottom:1px solid #e5e7eb;">Urgente</td><td style="padding:8px 12px;border-bottom:1px solid #e5e7eb;${data.urgente ? 'color:#dc2626;font-weight:700;' : ''}">${data.urgente ? '⚠️ SÍ' : 'No'}</td></tr>
              <tr><td style="padding:8px 12px;background:#f3f4f6;font-weight:600;">IP</td><td style="padding:8px 12px;color:#9ca3af;">${ipAddress ?? '—'}</td></tr>
            </table>
          </td>
        </tr>

        <!-- Detalles técnicos -->
        <tr>
          <td style="padding:22px 28px;">
            <p style="margin:0 0 10px;color:#374151;font-size:14px;font-weight:700;text-transform:uppercase;letter-spacing:.5px;">Detalles de la Solicitud</p>
            <div style="border:1px solid #e5e7eb;border-radius:8px;overflow:hidden;padding:16px;">
              ${buildDetallesHtml(data.detalles, unitColor)}
            </div>
          </td>
        </tr>

        <!-- Footer -->
        <tr>
          <td style="background:${unitColor}12;padding:12px 28px;border-top:2px solid ${unitColor}30;text-align:center;">
            <p style="margin:0;color:#9ca3af;font-size:12px;">
              Registrado: ${registeredAt} &nbsp;·&nbsp; Referencia: <strong style="color:#374151;">${data.codigo}</strong> &nbsp;·&nbsp; Unidad: ${data.unidad}
            </p>
          </td>
        </tr>

      </table>
    </td></tr>
  </table>
</body>
</html>`;

  const adminText = `
NUEVA COTIZACIÓN: ${data.codigo}
Unidad: ${unidadLabel}${urgenteTag}
Fecha: ${registeredAt}
=====================================
SOLICITANTE
  Nombre:   ${data.nombre}
  Empresa:  ${data.empresa || '—'}
  Email:    ${data.email}
  Teléfono: ${data.telefono}
  Urgente:  ${data.urgente ? 'SÍ ⚠️' : 'No'}
  IP:       ${ipAddress ?? '—'}

DETALLES DE LA SOLICITUD
${buildDetallesText(data.detalles) || '  Sin detalles adicionales.'}
`.trim();

  const adminEmails = process.env.ADMIN_EMAILS || process.env.ADMIN_EMAIL || 'info@eminsa.com';
  const recipients = adminEmails.split(',').map((e) => e.trim());

  await Promise.all([
    sendEmail({
      to: data.email,
      subject: `✓ Solicitud ${data.codigo} recibida – Grupo EMINSA`,
      html: customerHtml,
      text: customerText,
    }),
    sendEmail({
      to: recipients,
      subject: `📋 [${data.codigo}]${data.urgente ? ' ⚠️ URGENTE' : ''} ${data.nombre}${data.empresa ? ` – ${data.empresa}` : ''} (${data.unidad})`,
      html: adminHtml,
      text: adminText,
      cc: process.env.SALES_EMAIL?.split(',').map((e) => e.trim()),
    }),
  ]);

  console.log(`✅ Emails de cotización ${data.codigo} enviados`);
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