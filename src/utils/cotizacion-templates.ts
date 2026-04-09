// utils/cotizacion-templates.ts
// Distinct email templates for each business unit's quotation/service requests.

const LOGO_URL =
  'https://res.cloudinary.com/ddne5wqxo/image/upload/f_auto,q_auto/v1769097816/logoeminsa-Photoroom_jgkqjb.png';

// ─── Types ────────────────────────────────────────────────────────────────────

export interface CotizacionTemplateData {
  codigo: string;
  unidad: 'MTN' | 'RST' | 'EIC' | 'SRV';
  nombre: string;
  empresa?: string;
  email: string;
  telefono: string;
  urgente: boolean;
  detalles: Record<string, unknown>;
}

// ─── Field labels & value translations ────────────────────────────────────────

const FIELD_LABELS: Record<string, string> = {
  // Common
  cargo: 'Cargo / Posición',
  ubicacion: 'Ubicación del Proyecto / Equipo',
  descripcion: 'Descripción / Requerimientos',
  comoNosConocio: '¿Cómo nos conoció?',
  archivos: 'Archivos Adjuntos',
  urgencia: 'Nivel de Urgencia',
  // MTN – new transformers
  tipoTransformador: 'Tipo de Transformador',
  configuracion: 'Configuración',
  capacidad: 'Capacidad',
  cantidad: 'Cantidad',
  voltajePrimario: 'Voltaje Primario',
  voltajeSecundario: 'Voltaje Secundario',
  // RST – repair & remanufacturing
  tipoServicio: 'Tipo de Servicio',
  tipoProducto: 'Tipo de Transformador (a serviciar)',
  marca: 'Marca del Equipo',
  potencia: 'Potencia (kVA)',
  cantidadUnidades: 'Cantidad de Unidades',
  // EIC – international products
  categoriaProducto: 'Categoría de Producto',
  productoEspecifico: 'Producto Específico',
  // SRV – technical services
  tipoEquipo: 'Tipo de Equipo',
};

const VALUE_MAPS: Record<string, Record<string, string>> = {
  configuracion: {
    monofasico: 'Monofásico',
    trifasico: 'Trifásico',
    autoprotegido: 'Autoprotegido (CSP)',
  },
  urgencia: {
    normal: 'Normal',
    prioritario: 'Prioritario',
    urgente: 'URGENTE',
  },
  tipoTransformador: {
    'tipo-poste': 'Tipo Poste',
    'pad-mounted': 'Pad-Mounted',
    subestacion: 'Subestación',
    seco: 'Seco / Dry-Type',
    'secos-resina': 'Seco en Resina',
    otro: 'Otro',
  },
  tipoProducto: {
    'tipo-poste': 'Tipo Poste',
    'pad-mounted': 'Pad-Mounted',
    subestacion: 'Subestación',
    seco: 'Seco / Dry-Type',
    otro: 'Otro / No estoy seguro',
  },
  tipoEquipo: {
    distribucion: 'Transformador de Distribución',
    potencia: 'Transformador de Potencia',
    'pad-mounted': 'Pad-Mounted',
    'tipo-poste': 'Tipo Poste',
    subestacion: 'Subestación',
    otro: 'Otro',
  },
  tipoServicio: {
    // RST services
    remanufactura: 'Remanufactura de Transformador',
    reparacion: 'Reparación de Transformador',
    alquiler: 'Alquiler de Transformador',
    diagnostico: 'Diagnóstico / Evaluación Técnica',
    mantenimiento: 'Mantenimiento Preventivo',
    otro: 'Otro',
    // SRV services (IDs from navigation.ts)
    preventivo: 'Mantenimiento Preventivo – Predictivo',
    correctivo: 'Mantenimiento Correctivo en Campo',
    integral: 'Mantenimiento Integral',
    emergencias: 'Atención a Emergencias',
    ingenieria: 'Ingeniería y Gestión de Proyectos',
    laboratorio: 'Pruebas de Laboratorio',
    'alquiler-transformadores': 'Alquiler de Transformadores',
  },
  categoriaProducto: {
    transformadores: 'Transformadores',
    cables: 'Cables y Conductores',
    'distribucion-mt': 'Distribución MT',
    breakers: 'Breakers y Protección',
    accesorios: 'Accesorios MT',
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

// Keys that go under "Especificaciones Técnicas" heading
const SPEC_KEYS = new Set([
  'tipoTransformador',
  'configuracion',
  'capacidad',
  'cantidad',
  'tipoProducto',
  'marca',
  'cantidadUnidades',
  'tipoEquipo',
  'voltajePrimario',
  'voltajeSecundario',
  'potencia',
  'fases',
  'categoriaProducto',
  'productoEspecifico',
  'urgencia',
]);

// ─── Helpers ──────────────────────────────────────────────────────────────────

function getLabel(key: string): string {
  return FIELD_LABELS[key] ?? key;
}

function getValue(key: string, raw: unknown): string {
  const str = String(raw ?? '');
  return VALUE_MAPS[key]?.[str] ?? str;
}

function renderTransformadoresHtml(
  transformadores: unknown[],
  accentColor: string
): string {
  return transformadores
    .map((t, i) => {
      if (typeof t !== 'object' || t === null) return '';
      const obj = t as Record<string, unknown>;
      const rows = Object.entries(obj)
        .filter(([, v]) => v !== '' && v !== null && v !== undefined)
        .map(
          ([k, v]) => `
        <tr>
          <td style="padding:6px 12px;background:#f3f4f6;font-weight:600;width:40%;border-bottom:1px solid #e5e7eb;font-size:13px;color:#374151;">${getLabel(k)}</td>
          <td style="padding:6px 12px;border-bottom:1px solid #e5e7eb;color:#374151;font-size:14px;">${getValue(k, v)}</td>
        </tr>`
        )
        .join('');
      return `
        <p style="margin:0 0 6px;font-size:12px;font-weight:700;color:${accentColor};">Transformador #${i + 1}</p>
        <table style="width:100%;border-collapse:collapse;border-radius:8px;overflow:hidden;border:1px solid #e5e7eb;margin-bottom:12px;">${rows}</table>`;
    })
    .join('');
}

function renderArchivosHtml(archivos: unknown[], accentColor: string): string {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || process.env.NEXT_PUBLIC_BASE_URL || 'https://eminsa.com';
  const links = archivos
    .map((a) => {
      if (typeof a !== 'object' || a === null) return '';
      const obj = a as Record<string, unknown>;
      const url = String(obj.url ?? '');
      const name = String(obj.name ?? 'Archivo');
      if (!url) return '';
      const downloadUrl = `${baseUrl}/api/cotizaciones/download?url=${encodeURIComponent(url)}&name=${encodeURIComponent(name)}`;
      return `<li style="margin-bottom:6px;"><a href="${downloadUrl}" style="color:${accentColor};font-weight:600;text-decoration:underline;font-size:14px;">📎 ${name}</a></li>`;
    })
    .filter(Boolean)
    .join('');
  if (!links) return '';
  return `<ul style="margin:0;padding:0 0 0 18px;list-style:none;">${links}</ul>`;
}

function buildDetallesHtml(
  detalles: Record<string, unknown>,
  accentColor: string
): string {
  const entries = Object.entries(detalles).filter(
    ([, v]) => v !== '' && v !== null && v !== undefined
  );
  if (entries.length === 0)
    return '<p style="color:#6b7280;margin:0;font-size:14px;">Sin detalles adicionales.</p>';

  // Separate transformadores and archivos from regular entries
  const transformadores = Array.isArray(detalles.transformadores) ? detalles.transformadores : null;
  const archivos = Array.isArray(detalles.archivos) ? detalles.archivos : null;
  const skipKeys = new Set(['transformadores', 'archivos']);

  const regularEntries = entries.filter(([k]) => !skipKeys.has(k));
  const specEntries = regularEntries.filter(([k]) => SPEC_KEYS.has(k));
  const otherEntries = regularEntries.filter(([k]) => !SPEC_KEYS.has(k));

  const row = ([k, v]: [string, unknown]) => {
    // Skip nested objects/arrays that would render as [object Object]
    if (typeof v === 'object' && v !== null) return '';
    return `
    <tr>
      <td style="padding:7px 12px;background:#f3f4f6;font-weight:600;width:40%;border-bottom:1px solid #e5e7eb;font-size:13px;color:#374151;">${getLabel(k)}</td>
      <td style="padding:7px 12px;border-bottom:1px solid #e5e7eb;color:#374151;font-size:14px;">${getValue(k, v)}</td>
    </tr>`;
  };

  const table = (rows: [string, unknown][]) => {
    const rendered = rows.map(row).filter(Boolean).join('');
    if (!rendered) return '';
    return `<table style="width:100%;border-collapse:collapse;border-radius:8px;overflow:hidden;border:1px solid #e5e7eb;">${rendered}</table>`;
  };

  let html = '';

  // Render transformadores section
  if (transformadores && transformadores.length > 0) {
    html += `<p style="margin:0 0 8px;font-size:11px;font-weight:700;color:${accentColor};text-transform:uppercase;letter-spacing:.6px;">Transformadores Solicitados</p>`;
    html += renderTransformadoresHtml(transformadores, accentColor);
    html += '<div style="height:8px;"></div>';
  }

  if (specEntries.length > 0) {
    html += `<p style="margin:0 0 8px;font-size:11px;font-weight:700;color:${accentColor};text-transform:uppercase;letter-spacing:.6px;">Especificaciones Técnicas</p>`;
    html += table(specEntries);
    if (otherEntries.length > 0) html += '<div style="height:16px;"></div>';
  }
  if (otherEntries.length > 0) {
    if (specEntries.length > 0 || (transformadores && transformadores.length > 0))
      html += `<p style="margin:0 0 8px;font-size:11px;font-weight:700;color:${accentColor};text-transform:uppercase;letter-spacing:.6px;">Información Adicional</p>`;
    html += table(otherEntries);
  }

  // Render archivos section with download links
  if (archivos && archivos.length > 0) {
    html += '<div style="height:16px;"></div>';
    html += `<p style="margin:0 0 8px;font-size:11px;font-weight:700;color:${accentColor};text-transform:uppercase;letter-spacing:.6px;">Archivos Adjuntos</p>`;
    html += renderArchivosHtml(archivos, accentColor);
  }

  return html;
}

function buildDetallesText(detalles: Record<string, unknown>): string {
  const lines: string[] = [];
  const skipKeys = new Set(['transformadores', 'archivos']);

  // Render transformadores
  if (Array.isArray(detalles.transformadores)) {
    detalles.transformadores.forEach((t, i) => {
      if (typeof t !== 'object' || t === null) return;
      const obj = t as Record<string, unknown>;
      lines.push(`  --- Transformador #${i + 1} ---`);
      Object.entries(obj)
        .filter(([, v]) => v !== '' && v !== null && v !== undefined)
        .forEach(([k, v]) => lines.push(`    ${getLabel(k)}: ${getValue(k, v)}`));
    });
  }

  // Render regular entries
  Object.entries(detalles)
    .filter(([k, v]) => !skipKeys.has(k) && v !== '' && v !== null && v !== undefined)
    .forEach(([k, v]) => {
      if (typeof v === 'object' && v !== null) return; // Skip nested objects
      lines.push(`  ${getLabel(k)}: ${getValue(k, v)}`);
    });

  // Render archivos
  if (Array.isArray(detalles.archivos)) {
    const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || process.env.NEXT_PUBLIC_BASE_URL || 'https://eminsa.com';
    lines.push('  --- Archivos Adjuntos ---');
    detalles.archivos.forEach((a) => {
      if (typeof a !== 'object' || a === null) return;
      const obj = a as Record<string, unknown>;
      const name = String(obj.name ?? 'Archivo');
      const url = String(obj.url ?? '');
      const downloadUrl = `${baseUrl}/api/cotizaciones/download?url=${encodeURIComponent(url)}&name=${encodeURIComponent(name)}`;
      lines.push(`    ${name}: ${downloadUrl}`);
    });
  }

  return lines.join('\n');
}

// ─── Shared layout builders ───────────────────────────────────────────────────

interface UnitConfig {
  color: string;
  label: string;
  badge: string;
  headerTitle: string;
  headerSubtitle: string;
  intro: string;
  nextSteps: string;
  adminDivisionTitle: string;
}

const UNIT_CONFIGS: Record<string, UnitConfig> = {
  MTN: {
    color: '#00269b',
    label: 'MTN – Transformadores Nuevos',
    badge: 'Fabricados en República Dominicana',
    headerTitle: 'Solicitud de Cotización',
    headerSubtitle: 'Transformadores Nuevos · Grupo EMINSA',
    intro:
      'Hemos recibido su solicitud de cotización para la fabricación de un nuevo transformador. Nuestro equipo de ingeniería revisará sus especificaciones técnicas y le enviará una propuesta económica con el plazo de fabricación estimado.',
    nextSteps:
      'Nuestro equipo de ingeniería revisará sus especificaciones y preparará una propuesta técnica-económica personalizada con plazos de fabricación y condiciones de entrega.',
    adminDivisionTitle: 'MTN – NUEVA COTIZACIÓN DE TRANSFORMADOR',
  },
  RST: {
    color: '#0099ce',
    label: 'ETRYS – Remanufactura y Servicios',
    badge: 'Taller Especializado en Transformadores',
    headerTitle: 'Solicitud de Servicio',
    headerSubtitle: 'Remanufactura y Servicios de Transformadores · ETRYS',
    intro:
      'Hemos recibido su solicitud de servicio satisfactoriamente. Un técnico especializado evaluará sus requerimientos y se pondrá en contacto para coordinar la visita técnica o la recepción del equipo en nuestro taller.',
    nextSteps:
      'Un técnico especializado se pondrá en contacto para coordinar la visita técnica en sitio o la recepción del equipo en nuestro taller de remanufactura. Recibirá un diagnóstico técnico detallado.',
    adminDivisionTitle: 'ETRYS – NUEVA SOLICITUD DE SERVICIO',
  },
  EIC: {
    color: '#009e49',
    label: 'EIC – Productos Internacionales',
    badge: 'Eminsa International Corporation',
    headerTitle: 'Solicitud de Cotización Internacional',
    headerSubtitle: 'Productos Eléctricos Internacionales · EIC',
    intro:
      'Hemos recibido su solicitud de cotización para productos eléctricos internacionales. Nuestro equipo de comercio internacional verificará la disponibilidad con los fabricantes y le enviará una cotización CIF detallada con tiempos de entrega.',
    nextSteps:
      'Nuestro equipo de comercio internacional verificará disponibilidad de stock con los fabricantes representados y le enviará una cotización CIF detallada con tiempos de entrega y condiciones de importación.',
    adminDivisionTitle: 'EIC – NUEVA COTIZACIÓN INTERNACIONAL',
  },
  SRV: {
    color: '#6d6e6d',
    label: 'Servicios Técnicos Especializados',
    badge: 'Disponible 24/7 para Emergencias',
    headerTitle: 'Solicitud de Servicio Técnico',
    headerSubtitle: 'Servicios Técnicos Especializados · Grupo EMINSA',
    intro:
      'Hemos recibido su solicitud de servicio técnico. Nuestro coordinador de servicios le contactará para asignar el técnico especializado y planificar la ejecución del trabajo en función de sus requerimientos.',
    nextSteps:
      'Nuestro coordinador de servicios le contactará para asignar el técnico especializado, planificar la visita técnica y presentarle una cotización detallada según los requerimientos indicados.',
    adminDivisionTitle: 'SRV – NUEVA SOLICITUD DE SERVICIO TÉCNICO',
  },
};

// ─── Customer HTML template ────────────────────────────────────────────────────

function buildCustomerHtml(data: CotizacionTemplateData): string {
  const cfg = UNIT_CONFIGS[data.unidad] ?? UNIT_CONFIGS.MTN;
  const { color } = cfg;
  const year = new Date().getFullYear();

  return `<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width,initial-scale=1">
  <meta name="color-scheme" content="light only">
  <title>Confirmación de Solicitud – Grupo EMINSA</title>
  <style>
    body { margin:0; padding:0; background:#f3f4f6; font-family:'Segoe UI',Roboto,Arial,sans-serif; }
    a { color:${color}; text-decoration:none; }
    @media (max-width:600px) { .container { width:100% !important; } .px { padding-left:20px !important; padding-right:20px !important; } }
  </style>
</head>
<body>
  <!-- preheader -->
  <div style="display:none;max-height:0;overflow:hidden;opacity:0;">Su solicitud ${data.codigo} fue recibida – Grupo EMINSA responderá a la brevedad.</div>

  <table width="100%" cellpadding="0" cellspacing="0" style="background:#f3f4f6;padding:32px 16px;">
    <tr><td align="center">
      <table width="600" class="container" cellpadding="0" cellspacing="0" style="max-width:600px;background:#ffffff;border-radius:16px;overflow:hidden;box-shadow:0 4px 24px rgba(0,0,0,.10);">

        <!-- TOP ACCENT BAR -->
        <tr><td style="height:5px;background:linear-gradient(90deg,${color},${color}99);"></td></tr>

        <!-- HEADER -->
        <tr>
          <td style="background:linear-gradient(135deg,${color} 0%,${color}dd 100%);padding:32px 40px;text-align:center;">
            <div style="display:inline-block;background:rgba(255,255,255,.12);border-radius:12px;padding:12px 20px;margin-bottom:16px;">
              <img src="${LOGO_URL}" alt="Grupo EMINSA" width="130" style="display:block;max-width:130px;">
            </div>
            <h1 style="margin:0 0 6px;color:#ffffff;font-size:20px;font-weight:700;letter-spacing:-.3px;">${cfg.headerTitle}</h1>
            <p style="margin:0;color:rgba(255,255,255,.75);font-size:12px;letter-spacing:.5px;">${cfg.headerSubtitle}</p>
            <div style="display:inline-block;margin-top:12px;background:rgba(255,255,255,.18);color:#ffffff;font-size:11px;font-weight:600;padding:4px 14px;border-radius:20px;letter-spacing:.4px;">${cfg.badge}</div>
          </td>
        </tr>

        <!-- REFERENCE CODE BANNER -->
        <tr>
          <td style="background:#f8faff;padding:24px 40px;text-align:center;border-bottom:3px solid ${color}20;">
            <p style="margin:0 0 4px;color:#6b7280;font-size:11px;text-transform:uppercase;letter-spacing:1.5px;font-weight:600;">Número de Referencia</p>
            <p style="margin:0 0 6px;color:${color};font-size:38px;font-weight:800;letter-spacing:6px;line-height:1;">${data.codigo}</p>
            <span style="display:inline-block;background:${color}15;color:${color};font-size:11px;padding:3px 14px;border-radius:20px;font-weight:700;">${cfg.label}</span>
            <p style="margin:8px 0 0;color:#9ca3af;font-size:12px;">Conserve este número para dar seguimiento a su solicitud</p>
          </td>
        </tr>

        ${data.urgente ? `<!-- URGENCY BANNER -->
        <tr>
          <td style="background:#fef3cd;padding:10px 40px;text-align:center;border-bottom:1px solid #fde68a;">
            <p style="margin:0;color:#92400e;font-size:13px;font-weight:700;">⚠️ Solicitud marcada como URGENTE — será atendida con máxima prioridad</p>
          </td>
        </tr>` : ''}

        <!-- BODY -->
        <tr>
          <td style="padding:32px 40px;" class="px">

            <!-- Greeting -->
            <p style="margin:0 0 6px;color:#111827;font-size:16px;font-weight:600;">Estimado/a ${data.nombre},</p>
            <p style="margin:0 0 28px;color:#6b7280;font-size:14px;line-height:1.75;">${cfg.intro}</p>

            <!-- Contact info card -->
            <table width="100%" cellpadding="0" cellspacing="0" style="border-radius:10px;border:1px solid #e5e7eb;margin-bottom:24px;overflow:hidden;">
              <tr><td style="padding:12px 18px;background:${color}08;border-bottom:1px solid #e5e7eb;">
                <p style="margin:0;color:${color};font-size:11px;font-weight:700;text-transform:uppercase;letter-spacing:.6px;">Sus Datos de Contacto</p>
              </td></tr>
              <tr><td style="padding:14px 18px;">
                <table width="100%" cellpadding="0" cellspacing="0" style="font-size:14px;">
                  <tr>
                    <td style="padding:4px 0;width:38%;color:#6b7280;font-weight:600;">Nombre</td>
                    <td style="padding:4px 0;color:#374151;">${data.nombre}</td>
                  </tr>
                  ${data.empresa ? `<tr>
                    <td style="padding:4px 0;color:#6b7280;font-weight:600;">Empresa</td>
                    <td style="padding:4px 0;color:#374151;">${data.empresa}</td>
                  </tr>` : ''}
                  <tr>
                    <td style="padding:4px 0;color:#6b7280;font-weight:600;">Correo</td>
                    <td style="padding:4px 0;color:#374151;">${data.email}</td>
                  </tr>
                  <tr>
                    <td style="padding:4px 0;color:#6b7280;font-weight:600;">Teléfono</td>
                    <td style="padding:4px 0;color:#374151;">${data.telefono}</td>
                  </tr>
                </table>
              </td></tr>
            </table>

            <!-- Request details -->
            <table width="100%" cellpadding="0" cellspacing="0" style="border-radius:10px;border:1px solid #e5e7eb;margin-bottom:24px;overflow:hidden;">
              <tr><td style="padding:12px 18px;background:${color};border-bottom:1px solid ${color}dd;">
                <p style="margin:0;color:#ffffff;font-size:11px;font-weight:700;text-transform:uppercase;letter-spacing:.6px;">Detalles de su Solicitud</p>
              </td></tr>
              <tr><td style="padding:16px 18px;">
                ${buildDetallesHtml(data.detalles, color)}
              </td></tr>
            </table>

            <!-- Next steps -->

            <!-- Quick contact -->
            <p style="margin:0 0 5px;color:#374151;font-size:13px;font-weight:700;">¿Necesita asistencia inmediata?</p>
            <p style="margin:0;color:#6b7280;font-size:13px;line-height:1.8;">
              📞 <a href="tel:+18095965774" style="color:${color};font-weight:600;">(809) 596-5774</a>
              &nbsp;|&nbsp;
              📱 <a href="https://wa.me/18095965774" style="color:${color};font-weight:600;">WhatsApp</a>
              &nbsp;|&nbsp;
              ✉️ <a href="mailto:info@eminsa.com" style="color:${color};font-weight:600;">info@eminsa.com</a>
            </p>

          </td>
        </tr>

        <!-- FOOTER -->
        <tr>
          <td style="background:#f9fafb;padding:20px 40px;border-top:1px solid #e5e7eb;text-align:center;">
            <p style="margin:0 0 4px;color:#9ca3af;font-size:12px;">© ${year} Grupo EMINSA – Transformadores Eléctricos de Distribución</p>
            <p style="margin:0;color:#d1d5db;font-size:11px;">Av. Duarte, Km 22, Parque Industrial Duarte, Nave No. 6 · República Dominicana</p>
          </td>
        </tr>

      </table>
    </td></tr>
  </table>
</body>
</html>`;
}

// ─── Customer text template ────────────────────────────────────────────────────

function buildCustomerText(data: CotizacionTemplateData): string {
  const cfg = UNIT_CONFIGS[data.unidad] ?? UNIT_CONFIGS.MTN;
  const year = new Date().getFullYear();

  return `GRUPO EMINSA – Confirmación de Solicitud
=========================================
Número de Referencia : ${data.codigo}
División             : ${cfg.label}
${data.urgente ? '⚠️  SOLICITUD MARCADA COMO URGENTE\n' : ''}
Estimado/a ${data.nombre},

${cfg.intro}

SUS DATOS DE CONTACTO
─────────────────────────────────────────
  Nombre   : ${data.nombre}${data.empresa ? `\n  Empresa  : ${data.empresa}` : ''}
  Correo   : ${data.email}
  Teléfono : ${data.telefono}

DETALLES DE SU SOLICITUD
─────────────────────────────────────────
${buildDetallesText(data.detalles) || '  Sin detalles adicionales.'}


¿Necesita asistencia inmediata?
  Teléfono  : (809) 596-5774
  WhatsApp  : +1 809-596-5774
  Correo    : info@eminsa.com

─────────────────────────────────────────
© ${year} Grupo EMINSA · República Dominicana
Av. Duarte, Km 22, Parque Industrial Duarte, Nave No. 6`.trim();
}

// ─── Admin HTML template ──────────────────────────────────────────────────────

function buildAdminHtml(data: CotizacionTemplateData, ipAddress?: string): string {
  const cfg = UNIT_CONFIGS[data.unidad] ?? UNIT_CONFIGS.MTN;
  const { color } = cfg;
  const registeredAt = new Date().toLocaleString('es-DO', {
    timeZone: 'America/Santo_Domingo',
    dateStyle: 'full',
    timeStyle: 'short',
  });

  return `<!DOCTYPE html>
<html lang="es">
<head><meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1"></head>
<body style="margin:0;padding:0;background:#f3f4f6;font-family:'Segoe UI',Roboto,Arial,sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background:#f3f4f6;padding:24px 16px;">
    <tr><td align="center">
      <table width="640" cellpadding="0" cellspacing="0" style="max-width:640px;background:#ffffff;border-radius:14px;overflow:hidden;box-shadow:0 4px 20px rgba(0,0,0,.10);">

        <!-- HEADER -->
        <tr>
          <td style="background:${color};padding:22px 28px;">
            <p style="margin:0 0 4px;color:#ffffff;font-size:20px;font-weight:800;"> ${cfg.adminDivisionTitle}</p>
            <p style="margin:0;color:rgba(255,255,255,.7);font-size:13px;">Código: <strong style="color:#ffffff;">${data.codigo}</strong>${data.urgente ? ' · <span style="color:#ffd700;">⚠️ URGENTE</span>' : ''} · ${registeredAt}</p>
          </td>
        </tr>

        ${data.urgente ? `<!-- URGENCY BANNER -->
        <tr><td style="background:#dc2626;padding:10px 28px;text-align:center;">
          <p style="margin:0;color:#ffffff;font-size:13px;font-weight:800;letter-spacing:.5px;"> SOLICITUD URGENTE — ATENDER CON MÁXIMA PRIORIDAD</p>
        </td></tr>` : ''}

        <!-- QUICK ACTIONS -->
        <tr>
          <td style="padding:16px 28px;background:#f8faff;border-bottom:1px solid #e5e7eb;text-align:center;">
            <a href="mailto:${data.email}?subject=Re: Cotización ${data.codigo} - ${cfg.label}" style="display:inline-block;margin:0 6px;padding:10px 22px;background:${color};color:#ffffff;border-radius:8px;font-size:13px;font-weight:700;text-decoration:none;">✉️ Responder por Email</a>
            <a href="tel:${data.telefono.replace(/[\s\-()]/g, '')}" style="display:inline-block;margin:0 6px;padding:10px 22px;background:#374151;color:#ffffff;border-radius:8px;font-size:13px;font-weight:700;text-decoration:none;">📞 Llamar al Cliente</a>
            <a href="https://wa.me/${data.telefono.replace(/[\s\-()+ ]/g, '')}" style="display:inline-block;margin:0 6px;padding:10px 22px;background:#25D366;color:#ffffff;border-radius:8px;font-size:13px;font-weight:700;text-decoration:none;">💬 WhatsApp</a>
          </td>
        </tr>

        <!-- REQUESTER INFO -->
        <tr>
          <td style="padding:24px 28px 0;">
            <p style="margin:0 0 12px;color:#374151;font-size:13px;font-weight:800;text-transform:uppercase;letter-spacing:.5px;border-bottom:2px solid ${color}30;padding-bottom:8px;">Datos del Solicitante</p>
            <table style="width:100%;border-collapse:collapse;font-size:14px;border:1px solid #e5e7eb;border-radius:8px;overflow:hidden;">
              <tr><td style="padding:9px 14px;background:#f3f4f6;font-weight:700;width:32%;border-bottom:1px solid #e5e7eb;color:#374151;">Nombre</td><td style="padding:9px 14px;border-bottom:1px solid #e5e7eb;">${data.nombre}</td></tr>
              <tr><td style="padding:9px 14px;background:#f3f4f6;font-weight:700;border-bottom:1px solid #e5e7eb;color:#374151;">Empresa</td><td style="padding:9px 14px;border-bottom:1px solid #e5e7eb;">${data.empresa || '—'}</td></tr>
              <tr><td style="padding:9px 14px;background:#f3f4f6;font-weight:700;border-bottom:1px solid #e5e7eb;color:#374151;">Email</td><td style="padding:9px 14px;border-bottom:1px solid #e5e7eb;"><a href="mailto:${data.email}" style="color:${color};">${data.email}</a></td></tr>
              <tr><td style="padding:9px 14px;background:#f3f4f6;font-weight:700;border-bottom:1px solid #e5e7eb;color:#374151;">Teléfono</td><td style="padding:9px 14px;border-bottom:1px solid #e5e7eb;"><a href="tel:${data.telefono.replace(/[\s\-()]/g, '')}" style="color:${color};">${data.telefono}</a></td></tr>
              <tr><td style="padding:9px 14px;background:#f3f4f6;font-weight:700;border-bottom:1px solid #e5e7eb;color:#374151;">Urgente</td><td style="padding:9px 14px;border-bottom:1px solid #e5e7eb;${data.urgente ? 'color:#dc2626;font-weight:700;' : ''}">${data.urgente ? '⚠️ SÍ' : 'No'}</td></tr>
              <tr><td style="padding:9px 14px;background:#f3f4f6;font-weight:700;color:#374151;">IP</td><td style="padding:9px 14px;color:#9ca3af;">${ipAddress ?? '—'}</td></tr>
            </table>
          </td>
        </tr>

        <!-- REQUEST DETAILS -->
        <tr>
          <td style="padding:24px 28px;">
            <p style="margin:0 0 12px;color:#374151;font-size:13px;font-weight:800;text-transform:uppercase;letter-spacing:.5px;border-bottom:2px solid ${color}30;padding-bottom:8px;">Detalles de la Solicitud</p>
            <div style="border:1px solid #e5e7eb;border-radius:8px;overflow:hidden;padding:16px;">
              ${buildDetallesHtml(data.detalles, color)}
            </div>
          </td>
        </tr>

        <!-- FOOTER -->
        <tr>
          <td style="background:${color}10;padding:14px 28px;border-top:2px solid ${color}25;text-align:center;">
            <p style="margin:0;color:#9ca3af;font-size:12px;">
              Registrado: ${registeredAt} &nbsp;·&nbsp; Ref.: <strong style="color:#374151;">${data.codigo}</strong> &nbsp;·&nbsp; División: ${data.unidad}
            </p>
          </td>
        </tr>

      </table>
    </td></tr>
  </table>
</body>
</html>`;
}

// ─── Admin text template ──────────────────────────────────────────────────────

function buildAdminText(data: CotizacionTemplateData, ipAddress?: string): string {
  const cfg = UNIT_CONFIGS[data.unidad] ?? UNIT_CONFIGS.MTN;
  const registeredAt = new Date().toLocaleString('es-DO', { timeZone: 'America/Santo_Domingo' });

  return `${cfg.adminDivisionTitle}
Código   : ${data.codigo}
División : ${cfg.label}${data.urgente ? '\n⚠️  SOLICITUD URGENTE' : ''}
Fecha    : ${registeredAt}
=========================================
SOLICITANTE
  Nombre   : ${data.nombre}
  Empresa  : ${data.empresa || '—'}
  Email    : ${data.email}
  Teléfono : ${data.telefono}
  Urgente  : ${data.urgente ? 'SÍ ⚠️' : 'No'}
  IP       : ${ipAddress ?? '—'}

DETALLES DE LA SOLICITUD
${buildDetallesText(data.detalles) || '  Sin detalles adicionales.'}`.trim();
}

// ─── Public exports (per-unit wrappers) ──────────────────────────────────────

/** MTN – Transformadores Nuevos */
export function buildMtnCustomerHtml(data: CotizacionTemplateData): string {
  return buildCustomerHtml({ ...data, unidad: 'MTN' });
}
export function buildMtnCustomerText(data: CotizacionTemplateData): string {
  return buildCustomerText({ ...data, unidad: 'MTN' });
}
export function buildMtnAdminHtml(data: CotizacionTemplateData, ip?: string): string {
  return buildAdminHtml({ ...data, unidad: 'MTN' }, ip);
}
export function buildMtnAdminText(data: CotizacionTemplateData, ip?: string): string {
  return buildAdminText({ ...data, unidad: 'MTN' }, ip);
}

/** RST – ETRYS Remanufactura y Servicios */
export function buildRstCustomerHtml(data: CotizacionTemplateData): string {
  return buildCustomerHtml({ ...data, unidad: 'RST' });
}
export function buildRstCustomerText(data: CotizacionTemplateData): string {
  return buildCustomerText({ ...data, unidad: 'RST' });
}
export function buildRstAdminHtml(data: CotizacionTemplateData, ip?: string): string {
  return buildAdminHtml({ ...data, unidad: 'RST' }, ip);
}
export function buildRstAdminText(data: CotizacionTemplateData, ip?: string): string {
  return buildAdminText({ ...data, unidad: 'RST' }, ip);
}

/** EIC – Productos Internacionales */
export function buildEicCustomerHtml(data: CotizacionTemplateData): string {
  return buildCustomerHtml({ ...data, unidad: 'EIC' });
}
export function buildEicCustomerText(data: CotizacionTemplateData): string {
  return buildCustomerText({ ...data, unidad: 'EIC' });
}
export function buildEicAdminHtml(data: CotizacionTemplateData, ip?: string): string {
  return buildAdminHtml({ ...data, unidad: 'EIC' }, ip);
}
export function buildEicAdminText(data: CotizacionTemplateData, ip?: string): string {
  return buildAdminText({ ...data, unidad: 'EIC' }, ip);
}

/** SRV – Servicios Técnicos */
export function buildSrvCustomerHtml(data: CotizacionTemplateData): string {
  return buildCustomerHtml({ ...data, unidad: 'SRV' });
}
export function buildSrvCustomerText(data: CotizacionTemplateData): string {
  return buildCustomerText({ ...data, unidad: 'SRV' });
}
export function buildSrvAdminHtml(data: CotizacionTemplateData, ip?: string): string {
  return buildAdminHtml({ ...data, unidad: 'SRV' }, ip);
}
export function buildSrvAdminText(data: CotizacionTemplateData, ip?: string): string {
  return buildAdminText({ ...data, unidad: 'SRV' }, ip);
}

/** Generic dispatcher: picks the right builder by unidad */
export function buildCotizacionEmails(
  data: CotizacionTemplateData,
  ipAddress?: string
): {
  customerHtml: string;
  customerText: string;
  adminHtml: string;
  adminText: string;
} {
  return {
    customerHtml: buildCustomerHtml(data),
    customerText: buildCustomerText(data),
    adminHtml: buildAdminHtml(data, ipAddress),
    adminText: buildAdminText(data, ipAddress),
  };
}
