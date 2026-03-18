/**
 * MTN - Manufactura de Transformadores Nuevos
 * Configuración completa de datos, productos, normativas y certificaciones
 */

// ============================================================================
// TIPOS
// ============================================================================

export interface ResourceSection {
  title: string;
  content?: string;
  items?: string[];
}

export interface ResourceContent {
  title: string;
  description: string;
  items?: Array<{
    title: string;
    date?: string;
    category?: string;
    excerpt?: string;
    format?: string;
    size?: string;
    description?: string;
  }>;
  sections?: ResourceSection[];
  chapters?: Array<{
    number: number;
    title: string;
    description: string;
  }>;
}

export interface TransformerProduct {
  id: string;
  name: string;
  slug: string;
  shortName: string;
  description: string;
  fullDescription: string;
  image?: string;
  powerRange: string;
  voltageRange: string;
  phases: ('monofasico' | 'trifasico' | 'autoprotegido')[];
  standards: string[];
  applications: string[];
  features: string[];
  capacities: string[];
}

export interface TransformerVariant {
  id: string;
  parentId: string;
  name: string;
  slug: string;
  description: string;
  specs: {
    power: string;
    voltage: string;
    frequency: string;
    cooling: string;
    insulation: string;
  };
  features: string[];
  applications: string[];
  capacities: string[];
}

export interface Standard {
  id: string;
  name: string;
  slug: string;
  fullName: string;
  description: string;
  details: string[];
  benefits: string[];
  icon: string;
}

export interface Certification {
  id: string;
  name: string;
  slug: string;
  fullName: string;
  description: string;
  issuingBody: string;
  validUntil?: string;
  benefits: string[];
  image?: string;
  complianceOnly?: boolean; // true = cumplimiento de estándar, no una certificación formal
}

export interface Resource {
  id: string;
  name: string;
  slug: string;
  description: string;
  icon: string;
  type: 'articles' | 'datasheets' | 'warranty' | 'manual' | 'calculator';
}

// ============================================================================
// INFORMACIÓN GENERAL MTN
// ============================================================================

export const mtnInfo = {
  name: "MTN",
  fullName: "Manufactura de Transformadores Nuevos",
  tagline: "Transformadores 100% nuevos, fabricados en la República Dominicana",
  description: "Transformadores 100% nuevos, fabricados en la República Dominicana bajo los más altos estándares internacionales y cumpliendo plenamente con los niveles de eficiencia establecidos por ANSI y DOE 2016.",
  heroDescription: "Soluciones en transformación eléctrica con tecnología de alto desempeño, eficiencia garantizada y fabricación local bajo normas ANSI y DOE 2016.",
  color: "#00269b",
  gradient: "from-[#00269b] via-[#00175d] to-[#00269b]",
  stats: [
    { value: "50+", label: "Años de Experiencia" },
    { value: "10,000+", label: "Transformadores Fabricados" },
    { value: "100%", label: "Fabricación Nacional" },
    { value: "DOE 2016", label: "Certificación de Eficiencia" },
  ],
};

// ============================================================================
// PRODUCTOS - TRANSFORMADORES
// ============================================================================

export const transformerProducts: TransformerProduct[] = [
  {
    id: "tipo-poste",
    name: "Transformadores Tipo Poste",
    slug: "tipo-poste",
    shortName: "Tipo Poste",
    description: "Transformadores para sistemas de distribución eléctrica aérea con máxima confiabilidad y eficiencia.",
    fullDescription: "Los transformadores tipo poste de EMINSA están diseñados para ofrecer máxima confiabilidad, eficiencia y durabilidad en sistemas de distribución eléctrica aérea. Fabricados con materiales de alta calidad y cumpliendo estrictamente con normas internacionales, y diseños robustos que cumplen con los niveles de eficiencia establecidos por ANSI y DOE 2016 según las necesidades de nuestros clientes. Estos equipos garantizan un desempeño óptimo en aplicaciones residenciales, comerciales e industriales.",
    powerRange: "15 – 500 kVA",
    voltageRange: "Hasta 34.5 kV",
    phases: ['monofasico', 'trifasico', 'autoprotegido'],
    standards: ["ANSI", "DOE-2016", "IEEE C57"],
    applications: [
      "Distribución eléctrica residencial",
      "Zonas comerciales",
      "Áreas industriales ligeras",
      "Redes de distribución aérea",
      "Electrificación rural",
    ],
    features: [
      "Tipo de enfriamiento: ONAN",
      "Aceite dieléctrico de alta calidad",
      "Tanque hermético de acero",
      "Bajo nivel de ruido",
      "Alta eficiencia energética",
      "Fácil instalación y mantenimiento",
      "Protección contra sobretensiones",
    ],
    capacities: ["15", "25", "30", "37.5", "50", "75", "100", "150", "167", "225", "300", "500"],
  },
  {
    id: "pad-mounted",
    name: "Transformadores Pad Mounted",
    slug: "pad-mounted",
    shortName: "Pad Mounted",
    description: "Solución segura y compacta para sistemas de distribución subterránea.",
    fullDescription: "Los transformadores tipo pad-mounted de EMINSA están diseñados para ofrecer una solución segura, compacta y altamente eficiente para sistemas de distribución subterránea en áreas residenciales, comerciales e industriales. Su diseño de montaje a nivel del suelo, totalmente cerrado y hermético permite una operación fiable en espacios públicos, garantizando protección ante contactos accidentales y condiciones ambientales adversas.\n\nFabricados bajo estrictos estándares internacionales y alineados con los niveles de eficiencia ANSI/DOE 2016, nuestros transformadores pad-mounted ofrecen bajas pérdidas, excelente regulación de voltaje y un desempeño duradero, incluso en aplicaciones de carga exigente. Su versatilidad en configuraciones, capacidad para integrar accesorios bajo pedido y facilidad de instalación los convierten en la opción ideal para urbanizaciones, proyectos hoteleros, centros comerciales, industrias y empresas distribuidoras que requieren una solución robusta y estéticamente discreta.",
    powerRange: "30 – 3,000 kVA",
    voltageRange: "Hasta 34.5 kV",
    phases: ['monofasico', 'trifasico'],
    standards: ["ANSI", "DOE-2016", "IEEE C57"],
    applications: [
      "Urbanizaciones residenciales",
      "Proyectos hoteleros",
      "Centros comerciales",
      "Zonas industriales",
      "Parques empresariales",
      "Distribución subterránea",
    ],
    features: [
      "Tipo de enfriamiento: ONAN",
      "Diseño compacto y hermético",
      "Montaje a nivel del suelo",
      "Gabinete de acero resistente",
      "Protección contra vandalismo",
      "Bajo perfil visual",
      "Fácil acceso para mantenimiento",
      "Compatible con redes subterráneas",
    ],
    capacities: ["30", "45", "75", "112.5", "150", "225", "300", "500", "750", "1000", "1500", "2000", "2500", "3000"],
  },
  {
    id: "subestacion",
    name: "Transformadores de Subestación",
    slug: "subestacion",
    shortName: "Subestación",
    description: "Máxima confiabilidad y eficiencia para aplicaciones de media y alta potencia.",
    fullDescription: "Los transformadores tipo subestación de EMINSA están diseñados para suministrar energía con máxima confiabilidad, seguridad y eficiencia en aplicaciones de media y alta potencia.\n\nIdeales para subestaciones industriales, comerciales, de distribución y generación, nuestros transformadores tipo subestación ofrecen excelente regulación de voltaje, bajas pérdidas y una operación segura gracias a su diseño reforzado, sistemas de protección integrados y opciones de enfriamiento adaptadas a las necesidades del proyecto. Su ingeniería permite configuraciones flexibles —incluyendo cambiadores de derivación, gabinetes especiales, boquillas de alta capacidad y accesorios personalizados— convirtiéndolos en la solución ideal para proyectos que demandan continuidad, durabilidad y alto rendimiento energético.",
    powerRange: "Hasta 3,000 kVA",
    voltageRange: "Hasta 34.5 kV",
    phases: ['trifasico'],
    standards: ["ANSI", "IEEE C57"],
    applications: [
      "Subestaciones industriales",
      "Subestaciones comerciales",
      "Plantas de generación",
      "Distribución primaria",
      "Proyectos de gran escala",
    ],
    features: [
      "Alta capacidad de potencia",
      "Sistemas de enfriamiento avanzados",
      "Cambiadores de derivación",
      "Gabinetes especiales opcionales",
      "Boquillas de alta capacidad",
      "Diseño reforzado",
      "Protecciones integradas",
    ],
    capacities: ["500", "750", "1000", "1500", "2000", "2500", "3000"],
  },
];

// ============================================================================
// VARIANTES DE PRODUCTOS
// ============================================================================

export const transformerVariants: TransformerVariant[] = [
  // Tipo Poste - Monofásicos
  {
    id: "tipo-poste-monofasico",
    parentId: "tipo-poste",
    name: "Transformadores Tipo Poste Monofásicos",
    slug: "monofasicos",
    description: "Transformadores monofásicos para distribución residencial y comercial ligera.",
    specs: {
      power: "15 – 167 kVA",
      voltage: "Hasta 34.5 kV",
      frequency: "60 Hz",
      cooling: "ONAN",
      insulation: "Clase A (105°C)",
    },
    features: [
      "Ideal para cargas residenciales",
      "Eficiencia DOE 2016",
      "Núcleo de acero al silicio",
      "Tanque hermético sellado",
    ],
    applications: [
      "Residencias unifamiliares",
      "Pequeños comercios",
      "Iluminación pública",
    ],
    capacities: ["15", "25", "37.5", "50", "75", "100", "167"],
  },
  // Tipo Poste - Trifásicos
  {
    id: "tipo-poste-trifasico",
    parentId: "tipo-poste",
    name: "Transformadores Tipo Poste Trifásicos",
    slug: "trifasicos",
    description: "Transformadores trifásicos para aplicaciones comerciales e industriales.",
    specs: {
      power: "30 – 500 kVA",
      voltage: "Hasta 34.5 kV",
      frequency: "60 Hz",
      cooling: "ONAN",
      insulation: "Clase A (105°C)",
    },
    features: [
      "Potencia balanceada",
      "Eficiencia DOE 2016",
      "Conexiones Delta-Estrella",
      "Múltiples configuraciones",
    ],
    applications: [
      "Edificios comerciales",
      "Pequeñas industrias",
      "Centros de datos",
    ],
    capacities: ["30", "45", "75", "112.5", "150", "225", "300", "500"],
  },
  // Tipo Poste - Autoprotegidos
  {
    id: "tipo-poste-autoprotegido",
    parentId: "tipo-poste",
    name: "Transformadores Tipo Poste Autoprotegidos (CSP)",
    slug: "autoprotegidos",
    description: "Transformadores con protección integrada contra sobrecarga y cortocircuito.",
    specs: {
      power: "15 – 167 kVA",
      voltage: "Hasta 25 kV",
      frequency: "60 Hz",
      cooling: "ONAN",
      insulation: "Clase A (105°C)",
    },
    features: [
      "Fusibles de MT integrados",
      "Interruptor de BT automático",
      "Pararrayos interno",
      "Sin necesidad de equipos externos",
    ],
    applications: [
      "Zonas de difícil acceso",
      "Electrificación rural",
      "Instalaciones temporales",
    ],
    capacities: ["15", "25", "37.5", "50", "75", "100", "167"],
  },
  // Pad Mounted - Monofásicos
  {
    id: "pad-mounted-monofasico",
    parentId: "pad-mounted",
    name: "Transformadores Pad Mounted Monofásicos",
    slug: "monofasicos",
    description: "Solución compacta para distribución subterránea residencial.",
    specs: {
      power: "30 – 167 kVA",
      voltage: "Hasta 25 kV",
      frequency: "60 Hz",
      cooling: "ONAN",
      insulation: "Clase A (105°C)",
    },
    features: [
      "Gabinete de bajo perfil",
      "Compartimentos separados AT/BT",
      "Cerraduras de seguridad",
      "Diseño tamper-proof",
    ],
    applications: [
      "Urbanizaciones residenciales",
      "Condominios",
      "Áreas verdes",
    ],
    capacities: ["30", "50", "75", "100", "167"],
  },
  // Pad Mounted - Trifásicos
  {
    id: "pad-mounted-trifasico",
    parentId: "pad-mounted",
    name: "Transformadores Pad Mounted Trifásicos",
    slug: "trifasicos",
    description: "Alta capacidad para aplicaciones comerciales e industriales subterráneas.",
    specs: {
      power: "75 – 3,000 kVA",
      voltage: "Hasta 34.5 kV",
      frequency: "60 Hz",
      cooling: "ONAN / ONAF",
      insulation: "Clase A (105°C)",
    },
    features: [
      "Configuraciones Loop-Feed y Radial",
      "Switchgear integrado opcional",
      "Acceso frontal completo",
      "Sistema de ventilación",
    ],
    applications: [
      "Centros comerciales",
      "Hoteles y resorts",
      "Complejos industriales",
      "Parques empresariales",
    ],
    capacities: ["75", "112.5", "150", "225", "300", "500", "750", "1000", "1500", "2000", "2500", "3000"],
  },
];

// ============================================================================
// NORMATIVAS
// ============================================================================

export const standards: Standard[] = [
  {
    id: "ansi",
    name: "ANSI",
    slug: "ansi",
    fullName: "American National Standards Institute",
    description: "Las normas ANSI/IEEE para transformadores establecen los requisitos técnicos, de diseño, desempeño y pruebas que deben cumplir los transformadores utilizados en sistemas eléctricos en Estados Unidos.",
    details: [
      "Publicadas principalmente por el Institute of Electrical and Electronics Engineers (IEEE)",
      "Acreditadas por el American National Standards Institute (ANSI)",
      "Aseguran la seguridad, confiabilidad, compatibilidad y estandarización de los equipos",
      "Aplicables en distribución y potencia",
      "Normas principales: IEEE C57.12.00, IEEE C57.12.90",
    ],
    benefits: [
      "Garantía de calidad internacional",
      "Compatibilidad con sistemas eléctricos americanos",
      "Estandarización de pruebas y especificaciones",
      "Mayor vida útil del equipo",
      "Facilidad de mantenimiento y repuestos",
    ],
    icon: "shield",
  },
  {
    id: "doe-2016",
    name: "DOE-2016",
    slug: "doe-2016",
    fullName: "Department of Energy - Efficiency Standards 2016",
    description: "La normativa DOE 2016 establece los niveles mínimos obligatorios de eficiencia energética que deben cumplir los transformadores para poder ser fabricados, importados o comercializados en Estados Unidos.",
    details: [
      "Emitida por el Department of Energy (DOE) de Estados Unidos",
      "Exige la reducción de pérdidas en transformadores líquidos y secos",
      "Objetivo: disminuir el consumo eléctrico y las emisiones asociadas",
      "Aplicable a transformadores de distribución desde enero 2016",
      "Establece niveles de eficiencia por capacidad y voltaje",
    ],
    benefits: [
      "Menor consumo de energía",
      "Reducción de costos operativos",
      "Menor impacto ambiental",
      "Cumplimiento regulatorio internacional",
      "Retorno de inversión a largo plazo",
    ],
    icon: "leaf",
  },
];

// ============================================================================
// CERTIFICACIONES
// ============================================================================

export const certifications: Certification[] = [
  {
    id: "iso-9001",
    name: "ISO 9001:2015",
    slug: "iso-9001",
    fullName: "Sistema de Gestión de Calidad ISO 9001:2015",
    description: "Certificación internacional que garantiza que nuestros procesos de fabricación cumplen con los más altos estándares de calidad y mejora continua.",
    issuingBody: "AENOR / IQNET",
    benefits: [
      "Procesos de fabricación estandarizados",
      "Control de calidad riguroso",
      "Trazabilidad completa de productos",
      "Mejora continua de procesos",
      "Satisfacción del cliente garantizada",
    ],
    image: "/images/SelloAENORISO9001_NEG.png",
  },
  {
    id: "ansi-ieee-c57",
    name: "ANSI/IEEE C57",
    slug: "ansi-ieee-c57",
    fullName: "Norma ANSI/IEEE C57 — Certificado por CIDET (Acreditado por ANAB)",
    description: "Nuestros transformadores son certificados por CIDET — acreditado por ANAB (la principal entidad de acreditación de América del Norte) — en cumplimiento con la norma ANSI/IEEE C57, el estándar internacional que rige el diseño, desempeño, pruebas y seguridad de transformadores eléctricos, publicado por el Institute of Electrical and Electronics Engineers (IEEE) y acreditado por el American National Standards Institute (ANSI).",
    issuingBody: "CIDET (Acreditado por ANAB)",
    benefits: [
      "Cumplimiento del estándar técnico más riguroso para transformadores",
      "Certificación emitida por CIDET, acreditado por ANAB",
      "Diseño y pruebas conforme a IEEE C57.12.00 y C57.12.90",
      "Acceso a mercados que exigen cumplimiento ANSI/IEEE",
      "Respaldo de las instituciones normativas líderes en Norteamérica",
    ],
  },
  {
    id: "ul",
    name: "UL",
    slug: "ul",
    fullName: "Underwriters Laboratories — Familia de Productos Registrados",
    description: "Nuestra familia de productos está registrada ante UL (Underwriters Laboratories), la organización de certificación de seguridad eléctrica líder en América del Norte. Contar con productos registrados en UL garantiza a nuestros clientes que los equipos han sido evaluados bajo los estándares de seguridad más exigentes del mercado.",
    issuingBody: "Underwriters Laboratories Inc.",
    benefits: [
      "Familia de productos registrados ante UL",
      "Evaluación bajo los estándares de seguridad eléctrica más exigentes",
      "Reconocimiento en mercados de América del Norte",
      "Mayor confianza para clientes, distribuidores e ingenieros",
      "Respaldo de la organización de certificación líder en Norteamérica",
    ],
  },
  {
    id: "doe-2016",
    name: "DOE 2016",
    slug: "doe-2016",
    fullName: "Cumplimiento del Estándar de Eficiencia Energética DOE 2016",
    description: "El DOE 2016 no es una certificación, sino un estándar de eficiencia energética establecido por el Departamento de Energía de los Estados Unidos. Nuestros transformadores de distribución están diseñados para cumplir plenamente con los niveles mínimos de eficiencia que exige este estándar, reduciendo las pérdidas en el núcleo y en los devanados para un menor consumo energético durante toda la vida útil del equipo.",
    issuingBody: "U.S. Department of Energy (DOE)",
    complianceOnly: true,
    benefits: [
      "Diseños que cumplen los niveles de eficiencia DOE 2016",
      "Reducción de pérdidas en núcleo y devanados",
      "Menor consumo energético durante toda la vida útil",
      "Cumplimiento de regulaciones del mercado estadounidense",
      "Impacto ambiental reducido",
    ],
  },
];

// ============================================================================
// RECURSOS
// ============================================================================

export const resources: Resource[] = [
  {
    id: "fichas-tecnicas",
    name: "Fichas Técnicas",
    slug: "fichas-tecnicas",
    description: "Especificaciones detalladas de todos nuestros productos para consulta y descarga.",
    icon: "file-text",
    type: "datasheets",
  },
  {
    id: "garantia",
    name: "Garantía",
    slug: "garantia",
    description: "Información sobre cobertura, términos y condiciones de garantía de nuestros productos.",
    icon: "shield-check",
    type: "warranty",
  },
  {
    id: "manual-mantenimiento",
    name: "Manual de Mantenimiento",
    slug: "manual-mantenimiento",
    description: "Guías completas para el cuidado, mantenimiento preventivo y correctivo de transformadores.",
    icon: "book-open",
    type: "manual",
  },
  {
    id: "calculadora",
    name: "Calculadora kVA",
    slug: "calculadora",
    description: "Herramienta interactiva para calcular la capacidad de transformador que necesita su proyecto.",
    icon: "calculator",
    type: "calculator",
  },
];

// ============================================================================
// NAVEGACIÓN MTN
// ============================================================================

export const mtnNavigation = [
  {
    name: "Productos",
    href: "/mtn/productos",
    submenu: [
      { name: "Tipo Poste", href: "/mtn/productos/tipo-poste" },
      { name: "Pad Mounted", href: "/mtn/productos/pad-mounted" },
      { name: "Subestación", href: "/mtn/productos/subestacion" },
    ],
  },
  {
    name: "Normativa",
    href: "/mtn/normativa",
    submenu: [
      { name: "ANSI", href: "/mtn/normativa/ansi" },
      { name: "DOE-2016", href: "/mtn/normativa/doe-2016" },
    ],
  },
  {
    name: "Certificaciones",
    href: "/mtn/certificaciones",
  },
  {
    name: "Recursos",
    href: "/mtn/recursos",
  },
  {
    name: "Cotizaciones",
    href: "/mtn/cotizaciones",
  },
];

// ============================================================================
// HELPERS
// ============================================================================

export function getProductBySlug(slug: string): TransformerProduct | undefined {
  return transformerProducts.find((p) => p.slug === slug);
}

export function getVariantsByProduct(productId: string): TransformerVariant[] {
  return transformerVariants.filter((v) => v.parentId === productId);
}

export function getVariantBySlug(productSlug: string, variantSlug: string): TransformerVariant | undefined {
  const product = getProductBySlug(productSlug);
  if (!product) return undefined;
  return transformerVariants.find((v) => v.parentId === product.id && v.slug === variantSlug);
}

export function getStandardBySlug(slug: string): Standard | undefined {
  return standards.find((s) => s.slug === slug);
}

export function getCertificationBySlug(slug: string): Certification | undefined {
  return certifications.find((c) => c.slug === slug);
}

export function getResourceBySlug(slug: string): Resource | undefined {
  return resources.find((r) => r.slug === slug);
}
