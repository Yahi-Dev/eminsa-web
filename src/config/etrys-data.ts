// ============================================================================
// ETRYS - Reparación y Reacondicionamiento de Transformadores
// Configuración de datos completa
// Color corporativo: #0099ce (Pantone 2995C)
// ============================================================================

// ============================================================================
// INTERFACES
// ============================================================================

export interface RemanufacturedProduct {
  id: string;
  slug: string;
  name: string;
  shortName: string;
  description: string;
  fullDescription: string[];
  image: string;
  gallery: string[];
  powerRange: string;
  voltageRange: string;
  standards: string[];
  features: string[];
  applications: string[];
  capacities: string[];
  specs: { label: string; value: string }[];
}

export interface RepairService {
  id: string;
  slug: string;
  name: string;
  shortName: string;
  description: string;
  icon: string;
  details: string[];
}

export interface RepairCenterEquipment {
  id: string;
  name: string;
  description: string;
  icon: string;
  specs?: string;
}

export interface RepairCenter {
  name: string;
  location: string;
  description: string;
  capabilities: { type: string; description: string; capacity?: string }[];
  equipment: RepairCenterEquipment[];
  images: string[];
}

export interface RemanufactureProcessStep {
  id: number;
  title: string;
  shortTitle: string;
  description: string;
  details: string[];
  icon: string;
  phase: number;       // grupo visual (1-5)
  phaseLabel: string;  // nombre de la fase
}

export interface TestPerformed {
  id: string;
  name: string;
  shortName: string;
  description: string;
  isOptional: boolean;
  icon: string;
}

export interface EtrysResource {
  id: string;
  slug: string;
  name: string;
  description: string;
  icon: string;
  type: "article" | "manual" | "policy" | "tool" | "form";
  downloadable: boolean;
  url?: string;
}

export interface RentalBenefit {
  id: string;
  title: string;
  description: string;
  icon: string;
}

export interface RentalInfo {
  title: string;
  description: string;
  phone: string;
  benefits: RentalBenefit[];
  useCases: string[];
  availableEquipment: string[];
}

export interface EtrysAdvantage {
  title: string;
  description: string;
  icon: string;
  highlight?: string;
}

export interface EtrysStat {
  value: string;
  label: string;
  suffix?: string;
}

export interface EtrysInfo {
  name: string;
  fullName: string;
  tagline: string;
  slogan: string;
  description: string;
  color: string;
  colorName: string;
  stats: EtrysStat[];
  advantages: EtrysAdvantage[];
}

export interface AboutEtrys {
  title: string;
  description: string;
  mission: string;
  vision: string;
  position: string;
  team: string;
  values: { title: string; description: string; icon: string }[];
}

export interface NavItem {
  name: string;
  href: string;
  submenu?: { name: string; href: string; description?: string }[];
}

// ============================================================================
// INFORMACIÓN GENERAL ETRYS
// ============================================================================

export const etrysInfo: EtrysInfo = {
  name: "RST",
  fullName: "ETRYS by EMINSA",
  tagline: "Reparacion Y Servicio De Transformadores",
  slogan: "Reparación y Servicio de Transformadores",
  description:
    "GRUPO EMINSA cuenta con más de 50 años de trayectoria en el sector de transformadores eléctricos de distribución y equipos relacionados. A través de nuestra división RST, nos especializamos en la reparación y remanufactura de transformadores de distribución e industriales, ofreciendo soluciones que devuelven la potencia y la confiabilidad a sus equipos.",
  color: "#0099ce",
  colorName: "Pantone 2995C",
  stats: [
    { value: "50", label: "Años de Experiencia", suffix: "+" },
    { value: "18", label: "Meses de Garantía" },
    { value: "30", label: "Min Tiempo Respuesta" },
    { value: "10", label: "Ton Capacidad Máxima" },
  ],
  advantages: [
    {
      title: "Experiencia",
      description: "Más de 50 años especializados en transformadores eléctricos de distribución.",
      icon: "award",
      highlight: "50+ años",
    },
    {
      title: "Atención Personalizada",
      description: "Soluciones a la medida de cada cliente con servicio dedicado.",
      icon: "users",
    },
    {
      title: "Garantía Líder",
      description: "18 meses de garantía en todos nuestros trabajos de reparación y remanufactura.",
      icon: "shield-check",
      highlight: "18 meses",
    },
  ],
};

// ============================================================================
// VENTAJAS DE TRANSFORMADORES REMANUFACTURADOS
// ============================================================================

export const remanufacturedAdvantages = [
  {
    id: "speed",
    title: "Velocidad",
    description: "Disponibilidad inmediata para su proyecto",
    icon: "zap",
    highlight: "Entrega Rápida",
  },
  {
    id: "savings",
    title: "Ahorro",
    description: "Menor costo que un equipo nuevo con la misma calidad",
    icon: "piggy-bank",
    highlight: "Hasta 40%",
  },
  {
    id: "reliability",
    title: "Confiabilidad",
    description: "Cumplimiento total con normas IEEE C57 y ANSI",
    icon: "shield-check",
    highlight: "Certificado",
  },
  {
    id: "environment",
    title: "Impacto Ambiental",
    description: "Reducción de residuos y reutilización de materiales",
    icon: "leaf",
    highlight: "Eco-Friendly",
  },
];

// ============================================================================
// PRODUCTOS REMANUFACTURADOS
// ============================================================================

export const remanufacturedProducts: RemanufacturedProduct[] = [
  {
    id: "poste",
    slug: "tipo-poste",
    name: "Transformadores Tipo Poste Remanufacturados",
    shortName: "Tipo Poste",
    description:
      "Los transformadores tipo poste ETRYS by EMINSA ofrecen una solución confiable y económica para sistemas de distribución aérea.",
    fullDescription: [
      "Los transformadores tipo poste ETRYS by EMINSA ofrecen una solución confiable y económica para sistemas de distribución aérea. Cada unidad ha sido restaurada siguiendo procesos rigurosos que aseguran el cumplimiento de las especificaciones originales de diseño, manteniendo la conformidad con las normas ANSI y IEEE.",
      "Gracias a una restauración integral —que incluye inspección, reemplazo de componentes críticos, pruebas eléctricas y reacondicionamiento estructural— estos equipos conservan un desempeño seguro, eficiente y estable, a un costo significativamente menor que los transformadores nuevos.",
      "Son ideales para aplicaciones residenciales, comerciales e industriales que requieren una alternativa confiable, durable y optimizada en costo.",
    ],
    image: "/EMINSA/DSC07227.jpg",
    gallery: [
      "/EMINSA/DSC07602.jpg",
      "/EMINSA/DSC07607.jpg",
      "/EMINSA/DSC07609.jpg",
    ],
    powerRange: "15 – 500 kVA",
    voltageRange: "Hasta 34.5 kV",
    standards: ["ANSI", "IEEE C57"],
    features: [
      "Restauración integral certificada",
      "Pruebas eléctricas completas",
      "Reacondicionamiento estructural",
      "Componentes críticos nuevos",
      "Aceite dieléctrico nuevo",
      "Pintura protectora industrial",
    ],
    applications: [
      "Distribución aérea",
      "Zonas residenciales",
      "Áreas comerciales",
      "Instalaciones industriales",
      "Proyectos de electrificación rural",
      "Expansión de redes eléctricas",
    ],
    capacities: ["15 kVA", "25 kVA", "37.5 kVA", "50 kVA", "75 kVA", "100 kVA", "167 kVA", "250 kVA", "333 kVA", "500 kVA"],
    specs: [
      { label: "Potencia", value: "15 – 500 kVA" },
      { label: "Voltaje Primario", value: "Hasta 34.5 kV" },
      { label: "Fases", value: "Monofásico / Trifásico" },
      { label: "Frecuencia", value: "60 Hz" },
      { label: "Refrigeración", value: "ONAN" },
      { label: "Normas", value: "ANSI / IEEE C57" },
    ],
  },
  {
    id: "pad-mounted",
    slug: "pad-mounted",
    name: "Transformadores Tipo Pad-Mounted Remanufacturados",
    shortName: "Pad-Mounted",
    description:
      "Los transformadores tipo pad-mounted ETRYS by EMINSA son una opción segura y altamente eficiente para sistemas de distribución subterránea.",
    fullDescription: [
      "Los transformadores tipo pad-mounted ETRYS by EMINSA son una opción segura y altamente eficiente para sistemas de distribución subterránea. Estas unidades restauradas bajo estándares estrictos garantizan una operación confiable y cumplen con normas ANSI/IEEE, manteniendo los niveles de seguridad y desempeño originales.",
      "Su diseño cerrado y hermético protege contra condiciones ambientales y contactos accidentales, haciéndolos adecuados para urbanizaciones, hoteles, centros comerciales, industrias y zonas públicas.",
      "Cada equipo es sometido a procesos de restauración que aseguran bajas pérdidas, excelente regulación y larga vida útil, preservando la integridad del diseño original a un costo más accesible.",
    ],
    image: "/EMINSA/DSC07213.jpg",
    gallery: [
      "/EMINSA/DSC07231.jpg",
      "/EMINSA/DSC07555.jpg",
      "/EMINSA/DSC07564.jpg",
    ],
    powerRange: "30 – 3,000 kVA",
    voltageRange: "Hasta 34.5 kV",
    standards: ["ANSI", "IEEE C57"],
    features: [
      "Diseño cerrado y hermético",
      "Protección contra contactos accidentales",
      "Resistente a condiciones ambientales",
      "Bajas pérdidas energéticas",
      "Excelente regulación de voltaje",
      "Configuraciones versátiles",
    ],
    applications: [
      "Distribución subterránea",
      "Urbanizaciones y residenciales",
      "Hoteles y resorts",
      "Centros comerciales",
      "Industrias",
      "Campus universitarios",
    ],
    capacities: ["30 kVA", "45 kVA", "75 kVA", "112.5 kVA", "150 kVA", "225 kVA", "300 kVA", "500 kVA", "750 kVA", "1,000 kVA", "1,500 kVA", "2,000 kVA", "2,500 kVA", "3,000 kVA"],
    specs: [
      { label: "Potencia", value: "30 – 3,000 kVA" },
      { label: "Voltaje Primario", value: "Hasta 34.5 kV" },
      { label: "Fases", value: "Monofásico / Trifásico" },
      { label: "Frecuencia", value: "60 Hz" },
      { label: "Refrigeración", value: "ONAN / ONAF" },
      { label: "Normas", value: "ANSI / IEEE C57" },
    ],
  },
  {
    id: "subestacion",
    slug: "subestacion",
    name: "Transformadores Tipo Subestación Remanufacturados",
    shortName: "Subestación",
    description:
      "Los transformadores tipo subestación ETRYS by EMINSA son unidades restauradas que proporcionan alto rendimiento para aplicaciones de mayor exigencia.",
    fullDescription: [
      "Los transformadores tipo subestación ETRYS by EMINSA son unidades restauradas que proporcionan alto rendimiento, seguridad y confiabilidad para aplicaciones de mayor exigencia en sistemas industriales, comerciales, de distribución y generación.",
      "Cumplen plenamente con las normas ANSI y IEEE, garantizando que cada equipo mantenga sus características eléctricas y mecánicas originales.",
      "Estos transformadores admiten configuraciones personalizadas, como cambiadores de derivación, gabinetes especiales, boquillas de alta capacidad y otros accesorios bajo requerimiento.",
    ],
    image: "/EMINSA/DSC07255.jpg",
    gallery: [
      "/EMINSA/DSC07591.jpg",
      "/EMINSA/DSC07516.jpg",
      "/EMINSA/DSC07517.jpg",
    ],
    powerRange: "Hasta 3,000 kVA",
    voltageRange: "Hasta 34.5 kV",
    standards: ["ANSI", "IEEE C57"],
    features: [
      "Reacondicionamiento estructural reforzado",
      "Pruebas rigurosas de aislamiento",
      "Configuraciones personalizadas",
      "Cambiadores de derivación",
      "Gabinetes especiales",
      "Boquillas de alta capacidad",
    ],
    applications: [
      "Sistemas industriales pesados",
      "Grandes instalaciones comerciales",
      "Redes de distribución",
      "Plantas de generación",
      "Minería e industria extractiva",
      "Infraestructura crítica",
    ],
    capacities: ["500 kVA", "750 kVA", "1,000 kVA", "1,500 kVA", "2,000 kVA", "2,500 kVA", "3,000 kVA"],
    specs: [
      { label: "Potencia", value: "Hasta 3,000 kVA" },
      { label: "Voltaje Primario", value: "Hasta 34.5 kV" },
      { label: "Fases", value: "Trifásico" },
      { label: "Frecuencia", value: "60 Hz" },
      { label: "Refrigeración", value: "ONAN / ONAF / OFAF" },
      { label: "Normas", value: "ANSI / IEEE C57" },
    ],
  },
];

// ============================================================================
// SERVICIOS DE REPARACIÓN
// ============================================================================

export const repairServices: RepairService[] = [
  {
    id: "bobinas",
    slug: "reparacion-bobinas",
    name: "Reparación y Reemplazo de Bobinas",
    shortName: "Bobinas",
    description: "Servicio especializado de reparación y reemplazo de bobinas dañadas o desgastadas.",
    icon: "coil",
    details: ["Diagnóstico completo", "Rebobinado con materiales de alta calidad", "Reemplazo total cuando es necesario", "Pruebas de aislamiento"],
  },
  {
    id: "aceite",
    slug: "analisis-aceite",
    name: "Muestreo y Análisis de Aceite Dieléctrico",
    shortName: "Análisis de Aceite",
    description: "Análisis completo del aceite dieléctrico para evaluar el estado del transformador.",
    icon: "droplet",
    details: ["Muestreo profesional", "Análisis físico-químico", "Detección de gases (DGA)", "Recomendaciones de mantenimiento"],
  },
  {
    id: "juntas",
    slug: "reemplazo-juntas",
    name: "Reemplazo de Juntas",
    shortName: "Juntas",
    description: "Sustitución de juntas en superficies selladas para prevenir fugas.",
    icon: "circle-dot",
    details: ["Inspección de superficies", "Juntas de alta calidad", "Sellado hermético", "Pruebas de presión"],
  },
  {
    id: "componentes",
    slug: "componentes-electricos",
    name: "Sustitución de Componentes Eléctricos",
    shortName: "Componentes",
    description: "Reemplazo de componentes eléctricos dañados o deteriorados.",
    icon: "cpu",
    details: ["Bushings y boquillas", "Indicadores de nivel", "Válvulas de protección", "Conectores y terminales"],
  },
  {
    id: "soldaduras",
    slug: "soldaduras-tanques",
    name: "Reparación de Soldaduras y Tanques",
    shortName: "Soldaduras",
    description: "Reparación de soldaduras y corrección de deformaciones en tanques.",
    icon: "flame",
    details: ["Evaluación estructural", "Soldadura certificada", "Corrección de deformaciones", "Pruebas de estanqueidad"],
  },
  {
    id: "filtrado",
    slug: "filtrado-aceite",
    name: "Procesamiento y Filtrado de Aceite",
    shortName: "Filtrado",
    description: "Procesamiento y filtrado de aceite para restaurar propiedades dieléctricas.",
    icon: "filter",
    details: ["Filtrado al vacío", "Deshidratación", "Desgasificación", "Regeneración de aceite"],
  },
  {
    id: "pintura",
    slug: "repintado-equipos",
    name: "Repintado de Equipos",
    shortName: "Pintura",
    description: "Servicio de repintado industrial con acabados de alta durabilidad.",
    icon: "paintbrush",
    details: ["Preparación de superficie", "Primer anticorrosivo", "Pintura industrial", "Acabados especiales"],
  },
  {
    id: "especializados",
    slug: "servicios-especializados",
    name: "Servicios Especializados",
    shortName: "Especializados",
    description: "Otros servicios especializados según requerimiento del cliente.",
    icon: "wrench",
    details: ["Modificaciones de voltaje", "Cambio de TAPs", "Instalación de accesorios", "Consultoría técnica"],
  },
];

// ============================================================================
// CENTRO DE REPARACIÓN
// ============================================================================

export const repairCenter: RepairCenter = {
  name: "Centro de Reparación RST",
  location: "Santo Domingo, República Dominicana",
  description: "En nuestro taller en Santo Domingo podemos atender transformadores tipo pedestal, secos de media tensión y subestaciones de hasta 10 toneladas.",
  capabilities: [
    { type: "Transformadores Pedestal", description: "Reparación completa de transformadores tipo pedestal", capacity: "Todos los rangos" },
    { type: "Transformadores Secos MT", description: "Servicio especializado para transformadores secos de media tensión", capacity: "Hasta 3,000 kVA" },
    { type: "Subestaciones", description: "Capacidad para manejar transformadores de subestación pesados", capacity: "Hasta 10 toneladas" },
  ],
  equipment: [
    { id: "lab", name: "Laboratorio de Pruebas Eléctricas", description: "Laboratorio equipado conforme a normas ANSI C.57", icon: "activity", specs: "Certificación ANSI C.57" },
    { id: "horno", name: "Horno de Secado", description: "Horno industrial para secado de núcleos y bobinas", icon: "flame", specs: "Alta capacidad" },
    { id: "deshidratadores", name: "Deshidratadores de Aceite", description: "Sistema de deshidratación de aceite al vacío", icon: "droplets", specs: "1,600 GPH" },
    { id: "grua", name: "Puente Grúa", description: "Puente grúa para manejo de transformadores pesados", icon: "move", specs: "10 toneladas" },
    { id: "taller", name: "Taller de Fabricación", description: "Taller completo con cabina de pintura profesional", icon: "settings", specs: "Cabina de pintura" },
    { id: "montacargas", name: "Montacargas Industrial", description: "Montacargas de alta capacidad para manejo de equipos", icon: "truck", specs: "15,000 lb" },
    { id: "almacen", name: "Almacén de Componentes", description: "Inventario completo de componentes y repuestos", icon: "package", specs: "Stock permanente" },
    { id: "tanque", name: "Tanque de Almacenamiento", description: "Tanque de almacenamiento de fluido dieléctrico", icon: "database", specs: "12,000 galones" },
  ],
  images: [
    "/EMINSA/DSC07759.jpg",
    "/EMINSA/DSC07149.jpg",
    "/EMINSA/DSC07174.jpg",
    "/EMINSA/DSC07706.jpg",
    "/EMINSA/DSC07664.jpg",
    "/EMINSA/DSC07678.jpg",
    "/EMINSA/DSC07161.jpg",
    "/EMINSA/DSC07764.jpg",
    "/EMINSA/DSC07733.jpg",
  ],
};

// ============================================================================
// PROCESO DE REMANUFACTURA
// ============================================================================

export const remanufactureProcess: RemanufactureProcessStep[] = [
  // Phase 1 — Evaluación
  {
    id: 1, phase: 1, phaseLabel: "Evaluación",
    title: "Evaluación del Trabajo", shortTitle: "Evaluación",
    description: "Cotización, diseño del trabajo y decisión de orden para determinar el alcance de la remanufactura.",
    details: ["Inspección visual inicial", "Cotización del trabajo", "Diseño del plan de trabajo", "Aprobación de la orden"],
    icon: "clipboard-check",
  },
  // Phase 2 — Producción
  {
    id: 2, phase: 2, phaseLabel: "Producción",
    title: "Orden de Trabajo", shortTitle: "Orden",
    description: "Generación y asignación formal de la orden de trabajo con todos los requerimientos técnicos.",
    details: ["Asignación de técnicos", "Lista de materiales", "Cronograma de trabajo", "Registro en sistema"],
    icon: "file-text",
  },
  {
    id: 3, phase: 2, phaseLabel: "Producción",
    title: "Desarme Completo", shortTitle: "Desarme",
    description: "Desmontaje total del transformador: drenaje de aceite, extracción de núcleo y bobinas.",
    details: ["Drenaje de aceite dieléctrico", "Extracción del tanque", "Separación de núcleo y bobinas", "Registro de componentes"],
    icon: "tool",
  },
  {
    id: 4, phase: 2, phaseLabel: "Producción",
    title: "Corte de Aislante", shortTitle: "Aislante",
    description: "Retiro y corte del material aislante de bobinas y núcleo para evaluación y reemplazo.",
    details: ["Retiro de aislamiento viejo", "Evaluación del estado del núcleo", "Clasificación de materiales", "Preparación para rebobinado"],
    icon: "scissors",
  },
  {
    id: 5, phase: 2, phaseLabel: "Producción",
    title: "Bobinado", shortTitle: "Bobinado",
    description: "Rebobinado de devanados primarios y secundarios con conductor y aislamiento nuevos.",
    details: ["Rebobinado con conductor nuevo", "Aplicación de aislamiento", "Dimensionamiento exacto", "Control de calidad del bobinado"],
    icon: "refresh-cw",
  },
  {
    id: 6, phase: 2, phaseLabel: "Producción",
    title: "Ensamble de Núcleo y Conexiones", shortTitle: "Ensamble",
    description: "Ensamble del núcleo magnético y conexión de los devanados según diseño original.",
    details: ["Apilamiento del núcleo", "Montaje de bobinas", "Conexión de derivaciones (taps)", "Verificación de polaridades"],
    icon: "layers",
  },
  // Phase 3 — Tratamiento Térmico
  {
    id: 7, phase: 3, phaseLabel: "Tratamiento Térmico",
    title: "Desencubar Bobina y Recondicionar", shortTitle: "Desencubar",
    description: "Extracción de la bobina del núcleo y acondicionamiento previo al proceso de secado.",
    details: ["Extracción controlada de bobina", "Limpieza de superficies", "Inspección de aislamiento", "Preparación para horno"],
    icon: "wind",
  },
  {
    id: 8, phase: 3, phaseLabel: "Tratamiento Térmico",
    title: "Horno de Secado y Pruebas de Aislamiento", shortTitle: "Secado",
    description: "Secado en horno industrial para eliminar humedad y pruebas de aislamiento para verificar integridad dieléctrica.",
    details: ["Secado en horno a temperatura controlada", "Prueba de resistencia de aislamiento (Megger)", "Índice de polarización (IP)", "Verificación de valores mínimos ANSI"],
    icon: "flame",
  },
  // Phase 4 — Metal Mecánica y Tanque
  {
    id: 9, phase: 4, phaseLabel: "Metal Mecánica y Tanque",
    title: "Metal Mecánica y Reparación de Tanque", shortTitle: "Metal Mecánica",
    description: "Reparación estructural del tanque, soldaduras y accesorios mecánicos del transformador.",
    details: ["Evaluación estructural del tanque", "Reparación de soldaduras", "Corrección de deformaciones", "Instalación de accesorios"],
    icon: "settings",
  },
  {
    id: 10, phase: 4, phaseLabel: "Metal Mecánica y Tanque",
    title: "Pintura de Fondo", shortTitle: "Fondo",
    description: "Preparación de superficie y aplicación de capa anticorrosiva de fondo (primer).",
    details: ["Limpieza y desengrase", "Granallado o lijado", "Aplicación de primer anticorrosivo", "Tiempo de curado"],
    icon: "paintbrush",
  },
  {
    id: 11, phase: 4, phaseLabel: "Metal Mecánica y Tanque",
    title: "Tanqueo y Pruebas Eléctricas", shortTitle: "Tanqueo",
    description: "Instalación del núcleo y bobinas en el tanque, llenado con aceite nuevo y pruebas eléctricas completas.",
    details: ["Montaje del conjunto activo en tanque", "Llenado con aceite dieléctrico nuevo", "Prueba de relación de transformación (TTR)", "Pruebas de pérdidas y corriente de excitación", "Prueba de impedancia"],
    icon: "check-circle",
  },
  // Phase 5 — Acabado y Despacho
  {
    id: 12, phase: 5, phaseLabel: "Acabado y Despacho",
    title: "Pintura Final", shortTitle: "Pintura",
    description: "Aplicación de pintura industrial de acabado final con color y protección requeridos.",
    details: ["Aplicación de pintura industrial", "Color según especificación", "Acabado uniforme", "Verificación de espesor de capa"],
    icon: "brush",
  },
  {
    id: 13, phase: 5, phaseLabel: "Acabado y Despacho",
    title: "Inspección de Calidad", shortTitle: "Inspección",
    description: "Revisión final integral por control de calidad para asegurar cumplimiento de especificaciones.",
    details: ["Revisión de todos los parámetros eléctricos", "Verificación visual externa", "Revisión de documentación técnica", "Aprobación QC"],
    icon: "search",
  },
  {
    id: 14, phase: 5, phaseLabel: "Acabado y Despacho",
    title: "Etiquetado", shortTitle: "Etiquetado",
    description: "Colocación de placa de datos actualizada con los parámetros del transformador remanufacturado.",
    details: ["Placa de datos con nuevos parámetros", "Etiqueta ETRYS by EMINSA", "Número de serie interno", "Fecha de remanufactura"],
    icon: "tag",
  },
  {
    id: 15, phase: 5, phaseLabel: "Acabado y Despacho",
    title: "Cierre de Orden", shortTitle: "Cierre",
    description: "Cierre formal de la orden de trabajo con toda la documentación técnica y certificado de pruebas.",
    details: ["Elaboración de reporte de pruebas", "Certificado de remanufactura", "Cierre en sistema", "Notificación al cliente"],
    icon: "file-check",
  },
  {
    id: 16, phase: 5, phaseLabel: "Acabado y Despacho",
    title: "Almacén y Despacho", shortTitle: "Despacho",
    description: "Almacenamiento temporal y preparación para entrega o despacho al cliente.",
    details: ["Almacenamiento protegido", "Embalaje para transporte", "Coordinación de entrega", "Entrega con documentación completa"],
    icon: "package-check",
  },
];

// ============================================================================
// PRUEBAS REALIZADAS
// ============================================================================

export const testsPerformed: TestPerformed[] = [
  { id: "megger", name: "Resistencia de Aislamiento / Megger", shortName: "Megger", description: "Mide la resistencia del aislamiento para detectar deterioro.", isOptional: false, icon: "zap" },
  { id: "ttr", name: "Relación de Vueltas (TTR)", shortName: "TTR", description: "Verifica la relación de transformación entre devanados.", isOptional: false, icon: "repeat" },
  { id: "resistencia", name: "Resistencia de Devanado", shortName: "Resistencia", description: "Mide la resistencia óhmica de los devanados.", isOptional: false, icon: "thermometer" },
  { id: "perdidas", name: "Pérdidas con y sin Carga", shortName: "Pérdidas", description: "Determina las pérdidas de energía del transformador.", isOptional: false, icon: "battery-charging" },
  { id: "excitacion", name: "Corriente de Excitación", shortName: "Excitación", description: "Evalúa el estado del núcleo magnético.", isOptional: false, icon: "activity" },
  { id: "impedancia", name: "Impedancia", shortName: "Impedancia", description: "Mide la impedancia de cortocircuito.", isOptional: false, icon: "gauge" },
  { id: "dga", name: "Análisis de Gases Disueltos (DGA)", shortName: "DGA", description: "Detecta gases disueltos en el aceite.", isOptional: true, icon: "flask" },
  { id: "pcb", name: "Detección de PCB", shortName: "PCB", description: "Analiza el aceite para detectar bifenilos policlorados.", isOptional: false, icon: "alert-triangle" },
  { id: "factor-potencia", name: "Factor de Potencia", shortName: "Factor Potencia", description: "Evalúa la calidad del aislamiento.", isOptional: true, icon: "pie-chart" },
];

// ============================================================================
// INFORMACIÓN DE ALQUILER
// ============================================================================

export const rentalInfo: RentalInfo = {
  title: "Alquiler de Transformadores",
  description: "Obtenga energía a corto plazo con una unidad de alquiler con RST.",
  phone: "809-560-7773",
  benefits: [
    { id: "disponibilidad", title: "Disponibilidad Inmediata", description: "Equipos listos para entrega rápida.", icon: "clock" },
    { id: "certificados", title: "Equipos Certificados", description: "Todos los equipos probados y certificados.", icon: "badge-check" },
    { id: "soporte", title: "Soporte Técnico 24/7", description: "Asistencia técnica disponible las 24 horas.", icon: "headphones" },
    { id: "instalacion", title: "Instalación Incluida", description: "Servicio de instalación por técnicos expertos.", icon: "tool" },
    { id: "flexibilidad", title: "Términos Flexibles", description: "Contratos adaptados a su proyecto.", icon: "calendar" },
    { id: "emergencias", title: "Servicio de Emergencias", description: "Respuesta rápida para emergencias.", icon: "alert-circle" },
  ],
  useCases: ["Proyectos de construcción", "Eventos especiales", "Respaldo durante mantenimiento", "Emergencias eléctricas", "Expansión temporal", "Pruebas y puesta en marcha", "Obras civiles y minería"],
  availableEquipment: ["Transformadores Tipo Poste (15-500 kVA)", "Transformadores Pad-Mounted (30-3,000 kVA)", "Transformadores de Subestación (hasta 3,000 kVA)"],
};

// ============================================================================
// RECURSOS
// ============================================================================

export const etrysResources: EtrysResource[] = [
  { id: "calculadora", slug: "calculadora", name: "Calculadora kVA", description: "Herramienta para calcular capacidad requerida.", icon: "calculator", type: "tool", downloadable: false, url: "/mtn/recursos/calculadora" },
];

// ============================================================================
// QUIÉNES SOMOS
// ============================================================================

export const aboutEtrys: AboutEtrys = {
  title: "¿Quiénes Somos?",
  description: "En RST creemos que la verdadera excelencia no está solo en lo que hacemos, sino en cómo lo hacemos. Por más de 50 años hemos trabajado con un enfoque especializado en transformadores.",
  mission: "Brindar soluciones confiables y una atención que supere expectativas, actuando con transparencia y dedicación en cada paso.",
  vision: "Ser el referente líder en el Caribe para la reparación y remanufactura de transformadores.",
  position: "En la República Dominicana y el Caribe, nos hemos ganado el lugar de especialistas gracias a una pasión que se refleja en cada transformador que pasa por nuestras manos.",
  team: "Somos un equipo de profesionales multidisciplinarios, celosos de brindar las mejores soluciones posibles.",
  values: [
    { title: "Excelencia", description: "Superamos expectativas en cada proyecto.", icon: "award" },
    { title: "Integridad", description: "Honestidad y transparencia en todo.", icon: "shield" },
    { title: "Compromiso", description: "Cumplimos promesas y asumimos responsabilidad.", icon: "heart-handshake" },
    { title: "Innovación", description: "Buscamos mejores formas de servir.", icon: "lightbulb" },
  ],
};

// ============================================================================
// NAVEGACIÓN ETRYS
// ============================================================================

export const etrysNavigation: NavItem[] = [
  { name: "Inicio", href: "/etrys" },
  { name: "Productos", href: "/etrys/productos", submenu: [
    { name: "Tipo Poste", href: "/etrys/productos/tipo-poste", description: "15 – 500 kVA" },
    { name: "Pad-Mounted", href: "/etrys/productos/pad-mounted", description: "30 – 3,000 kVA" },
    { name: "Subestación", href: "/etrys/productos/subestacion", description: "Hasta 3,000 kVA" },
  ]},
  { name: "Servicios", href: "/etrys/servicios", submenu: [
    { name: "Reparación", href: "/etrys/servicios", description: "Servicios de reparación integral" },
    { name: "Centro de Reparación", href: "/etrys/servicios/centro-reparacion", description: "Nuestras instalaciones" },
  ]},
  { name: "Alquiler", href: "/etrys/alquiler" },
  { name: "Recursos", href: "/etrys/recursos" },
  { name: "Cotizaciones", href: "/etrys/cotizaciones" },
  { name: "Nosotros", href: "/etrys/nosotros" },
];

// ============================================================================
// FAQ
// ============================================================================

export const etrysFAQ = [
  { question: "¿Cuánto tiempo tarda una reparación?", answer: "Depende del alcance. Una reparación menor puede tomar 1-2 semanas, mientras que una remanufactura completa puede tomar 4-6 semanas." },
  { question: "¿Qué garantía ofrecen?", answer: "Ofrecemos garantía líder de 18 meses en todos nuestros trabajos de reparación y remanufactura." },
  { question: "¿Pueden reparar cualquier marca?", answer: "Sí, nuestros técnicos están capacitados para reparar transformadores de todas las marcas principales." },
  { question: "¿Ofrecen servicio de transporte?", answer: "Sí, contamos con servicio de transporte especializado para recoger y entregar transformadores." },
  { question: "¿Cuál es la capacidad máxima?", answer: "Podemos manejar transformadores de hasta 10 toneladas y capacidades de hasta 3,000 kVA." },
];

// ============================================================================
// HELPERS
// ============================================================================

export const getRemanufacturedProductBySlug = (slug: string): RemanufacturedProduct | undefined => {
  return remanufacturedProducts.find((p) => p.slug === slug);
};

export const getRepairServiceBySlug = (slug: string): RepairService | undefined => {
  return repairServices.find((s) => s.slug === slug);
};

export const getEtrysResourceBySlug = (slug: string): EtrysResource | undefined => {
  return etrysResources.find((r) => r.slug === slug);
};

export const getAllProductSlugs = (): string[] => {
  return remanufacturedProducts.map((p) => p.slug);
};

export const getOtherProducts = (currentSlug: string): RemanufacturedProduct[] => {
  return remanufacturedProducts.filter((p) => p.slug !== currentSlug);
};
