// Estructura de navegación de Grupo EMINSA
export const mainNavigation = [
  {
    name: "MTN",
    href: "/mtn",
    description: "Transformadores de fabricación nacional",
    color: "#001689",
    submenu: [
      {
        name: "Productos",
        href: "/mtn/productos",
        submenu: [
          {
            name: "Transformadores",
            href: "/mtn/productos/transformadores",
            submenu: [
              { name: "Tipo Poste", href: "/mtn/productos/transformadores/tipo-poste" },
              { name: "Pad Mounted", href: "/mtn/productos/transformadores/pad-mounted" },
              { name: "Subestación", href: "/mtn/productos/transformadores/subestacion" },
              { name: "Secos en Resina", href: "/mtn/productos/transformadores/secos-resina" },
            ]
          }
        ]
      },
      { name: "Normativa", href: "/mtn/normativa" },
      { name: "Certificaciones", href: "/mtn/certificaciones" },
      { name: "Recursos", href: "/mtn/recursos" },
      { name: "Cotizaciones", href: "/mtn/cotizaciones" },
    ]
  },
  {
    name: "ETRYS",
    href: "/etrys",
    description: "Transformadores remanufacturados y reparación",
    color: "#00A3E0",
    submenu: [
      { name: "Reparación", href: "/etrys/reparacion" },
      { name: "Remanufacturados", href: "/etrys/remanufacturados" },
      { name: "Alquiler", href: "/etrys/alquiler" },
      { name: "Recursos", href: "/etrys/recursos" },
      { name: "Cotizaciones", href: "/etrys/cotizaciones" },
    ]
  },
  {
    name: "EIC",
    href: "/eic",
    description: "Eminsa International Corp - Importaciones",
    color: "#00B140",
    submenu: [
      {
        name: "Productos",
        href: "/eic/productos",
        submenu: [
          { name: "Transformadores", href: "/eic/productos/transformadores" },
          { name: "Cables", href: "/eic/productos/cables" },
          { name: "Distribución MT", href: "/eic/productos/distribucion-mt" },
          { name: "Breakers y Protección", href: "/eic/productos/breakers" },
          { name: "Accesorios", href: "/eic/productos/accesorios" },
        ]
      },
      { name: "Marcas", href: "/eic/marcas" },
      { name: "Recursos", href: "/eic/recursos" },
      { name: "Cotizaciones", href: "/eic/cotizaciones" },
    ]
  },
  {
    name: "Servicios",
    href: "/servicios",
    description: "Servicios técnicos especializados",
    color: "#FF5500",
    submenu: [
      { name: "Preventivo - Predictivo", href: "/servicios/preventivo" },
      { name: "Correctivo en Campo", href: "/servicios/correctivo" },
      { name: "Mantenimiento Integral", href: "/servicios/mantenimiento" },
      { name: "Emergencias", href: "/servicios/emergencias" },
      { name: "Ingeniería y Proyectos", href: "/servicios/ingenieria" },
      { name: "Pruebas de Laboratorio", href: "/servicios/laboratorio" },
      { name: "Alquiler de Equipos", href: "/servicios/alquiler" },
    ]
  },
  {
    name: "Proyectos",
    href: "/proyectos",
    description: "Nuestros proyectos realizados",
  },
  {
    name: "Noticias",
    href: "/noticias",
    description: "Últimas noticias y novedades",
  },
  {
    name: "Contacto",
    href: "/contacto",
    description: "Contáctenos",
  },
];

// Divisiones principales para la página de inicio
export const divisions = [
  {
    id: "mtn",
    name: "MTN",
    fullName: "Mateo Transformadores Nacionales",
    tagline: "Fabricación Nacional de Excelencia",
    description: "Transformadores de distribución fabricados en República Dominicana con los más altos estándares de calidad internacional.",
    href: "/mtn",
    color: "#001689",
    gradient: "from-[#001689] to-[#000E53]",
    icon: "factory",
    features: [
      "Transformadores Tipo Poste",
      "Pad Mounted",
      "Subestación",
      "Certificación ISO 9001",
    ],
  },
  {
    id: "etrys",
    name: "ETRYS",
    fullName: "ETRYS Transformadores",
    tagline: "Renovados, Rendimiento Garantizado",
    description: "Especialistas en reparación y remanufactura de transformadores. Devolvemos la potencia y confiabilidad a sus equipos.",
    href: "/etrys",
    color: "#00A3E0",
    gradient: "from-[#00A3E0] to-[#0077A8]",
    icon: "wrench",
    features: [
      "Reparación Especializada",
      "Transformadores Remanufacturados",
      "Alquiler de Equipos",
      "Garantía 18 meses",
    ],
  },
  {
    id: "eic",
    name: "EIC",
    fullName: "Eminsa International Corp",
    tagline: "Marcas Líderes Mundiales",
    description: "Representantes exclusivos de las mejores marcas internacionales en equipos eléctricos y transformadores.",
    href: "/eic",
    color: "#00B140",
    gradient: "from-[#00B140] to-[#008F33]",
    icon: "globe",
    features: [
      "INATRA",
      "Schneider Electric",
      "Hammond",
      "Top Cable",
    ],
  },
  {
    id: "servicios",
    name: "Servicios",
    fullName: "EMINSA Servicios",
    tagline: "Soluciones Integrales en Campo",
    description: "Más de 50 años de experiencia en mantenimiento, reparación y soporte técnico de transformadores eléctricos.",
    href: "/servicios",
    color: "#FF5500",
    gradient: "from-[#FF5500] to-[#CC4400]",
    icon: "settings",
    features: [
      "Mantenimiento Preventivo",
      "Emergencias 24/7",
      "Pruebas de Laboratorio",
      "Ingeniería de Proyectos",
    ],
  },
];

// Marcas representadas (EIC)
export const brands = [
  { name: "INATRA", logo: "/images/brands/inatra.png", href: "/eic/marcas/inatra" },
  { name: "Schneider Electric", logo: "/images/brands/schneider.png", href: "/eic/marcas/schneider" },
  { name: "Top Cable", logo: "/images/brands/topcable.png", href: "/eic/marcas/topcable" },
  { name: "Southwire", logo: "/images/brands/southwire.png", href: "/eic/marcas/southwire" },
  { name: "Hammond", logo: "/images/brands/hammond.png", href: "/eic/marcas/hammond" },
  { name: "Chardon", logo: "/images/brands/chardon.png", href: "/eic/marcas/chardon" },
  { name: "Elpitalia", logo: "/images/brands/elpitalia.png", href: "/eic/marcas/elpitalia" },
  { name: "Sofamel", logo: "/images/brands/sofamel.png", href: "/eic/marcas/sofamel" },
];

// Estadísticas de la empresa
export const stats = [
  { value: "50+", label: "Años de Experiencia" },
  { value: "10000+", label: "Transformadores Instalados" },
  { value: "500+", label: "Clientes Satisfechos" },
  { value: "24/7", label: "Soporte Técnico" },
];

// Información de contacto
export const contactInfo = {
  phone: "+1 809-560-7773",
  email: "info@eminsa.com",
  address: "Santo Domingo, República Dominicana",
  whatsapp: "+18095607773",
  social: {
    facebook: "https://www.facebook.com/GrupoEminsa/",
    instagram: "https://www.instagram.com/grupo.eminsa/",
    linkedin: "https://www.linkedin.com/company/grupo-eminsa/",
    youtube: "https://youtube.com/grupoeminsa",
  },
};

// Tipos de transformadores MTN
export const mtnProducts = {
  tipoPoste: {
    name: "Transformadores Tipo Poste",
    description: "Transformadores de distribución para instalación en poste",
    types: [
      { name: "Monofásicos", capacities: ["15 kVA", "25 kVA", "37.5 kVA", "50 kVA", "75 kVA", "100 kVA"] },
      { name: "Trifásicos", capacities: ["30 kVA", "45 kVA", "75 kVA", "112.5 kVA", "150 kVA", "225 kVA", "300 kVA"] },
      { name: "Autoprotegidos", capacities: ["15 kVA", "25 kVA", "37.5 kVA", "50 kVA", "75 kVA"] },
    ]
  },
  padMounted: {
    name: "Transformadores Pad Mounted",
    description: "Transformadores tipo pedestal para instalación a nivel de piso",
    types: [
      { name: "Monofásicos", capacities: ["25 kVA", "37.5 kVA", "50 kVA", "75 kVA", "100 kVA", "167 kVA"] },
      { name: "Trifásicos", capacities: ["75 kVA", "112.5 kVA", "150 kVA", "225 kVA", "300 kVA", "500 kVA", "750 kVA", "1000 kVA", "1500 kVA", "2000 kVA", "2500 kVA"] },
    ]
  },
  subestacion: {
    name: "Transformadores de Subestación",
    description: "Transformadores de potencia para subestaciones eléctricas",
    capacities: ["500 kVA", "750 kVA", "1000 kVA", "1500 kVA", "2000 kVA", "2500 kVA", "3000 kVA", "5000 kVA"],
  },
  secosResina: {
    name: "Transformadores Secos en Resina",
    description: "Transformadores encapsulados en resina para ambientes especiales",
    capacities: ["150 kVA", "225 kVA", "300 kVA", "500 kVA", "750 kVA", "1000 kVA", "1500 kVA", "2000 kVA"],
  },
};

// Servicios disponibles
export const services = [
  {
    id: "preventivo",
    name: "Mantenimiento Preventivo - Predictivo",
    shortName: "Preventivo",
    description: "Inspecciones programadas, pruebas de diagnóstico y monitoreo de condición para anticipar fallas y extender la vida útil de sus equipos.",
    icon: "shield-check",
    benefits: [
      "Prevención de fallas imprevistas",
      "Mayor disponibilidad del transformador",
      "Reducción de costos por reparaciones",
      "Extensión de vida útil",
    ],
  },
  {
    id: "correctivo",
    name: "Mantenimiento Correctivo en Campo",
    shortName: "Correctivo",
    description: "Soluciones de mantenimiento correctivo en sitio, garantizando atención rápida y eficiente ante fallas.",
    icon: "wrench",
    benefits: [
      "Rehabilitación estética",
      "Restauración de aceite",
      "Corrección de fugas",
      "Reemplazo de componentes",
    ],
  },
  {
    id: "integral",
    name: "Mantenimiento Integral",
    shortName: "Integral",
    description: "Atención completa combinando inspección, ejecución y verificación final para máxima confiabilidad.",
    icon: "clipboard-check",
    benefits: [
      "Inspección técnica previa",
      "Mantenimiento según hallazgos",
      "Inspección posterior",
      "Prevención de fallas futuras",
    ],
  },
  {
    id: "emergencias",
    name: "Atención a Emergencias",
    shortName: "Emergencias",
    description: "Servicio especializado de respuesta rápida ante situaciones críticas, disponible 24/7.",
    icon: "alert-triangle",
    benefits: [
      "Respuesta inmediata",
      "Inspección en sitio",
      "Acciones correctivas",
      "Informes técnicos",
    ],
  },
  {
    id: "ingenieria",
    name: "Ingeniería y Gestión de Proyectos",
    shortName: "Ingeniería",
    description: "Soluciones integrales desde el diseño hasta la ejecución de proyectos eléctricos complejos.",
    icon: "blueprint",
    benefits: [
      "Diseño de instalaciones",
      "Montajes eléctricos",
      "Proyectos a gran escala",
      "Supervisión especializada",
    ],
  },
  {
    id: "laboratorio",
    name: "Pruebas de Laboratorio",
    shortName: "Laboratorio",
    description: "Análisis especializado de aceite dieléctrico en alianza con SD Myers, líder mundial en diagnóstico.",
    icon: "flask",
    benefits: [
      "Análisis de gases disueltos",
      "Rigidez dieléctrica",
      "Detección de humedad",
      "Interpretación de resultados",
    ],
  },
  {
    id: "alquiler",
    name: "Alquiler de Transformadores",
    shortName: "Alquiler",
    description: "Equipos disponibles para cubrir necesidades temporales o responder ante emergencias.",
    icon: "truck",
    url: "/servicios/alquiler-transformadores",
    benefits: [
      "Disponibilidad inmediata",
      "Opciones flexibles",
      "Instalación incluida",
      "Alternativa costo-efectiva",
    ],
  },
];

// Certificaciones
export const certifications = [
  {
    name: "ISO 9001:2015",
    description: "Sistema de Gestión de Calidad",
    logo: "/images/SelloAENORISO9001_NEG.png",
    issuer: "AENOR",
  },
  {
    name: "IQNET",
    description: "Red Internacional de Certificación",
    logo: "/images/IQNET_RCMark_PosCMYK.png",
    issuer: "IQNET Association",
  },
  {
    name: "CIDET",
    description: "Centro de Investigación y Desarrollo Tecnológico",
    logo: "/images/cidet.png",
    issuer: "CIDET Colombia",
  },
  {
    name: "UL",
    description: "Underwriters Laboratories",
    logo: "/images/ul.png",
    issuer: "UL Solutions",
  },
];

// Normativas aplicables
export const standards = [
  {
    name: "ANSI",
    fullName: "American National Standards Institute",
    description: "Estándares americanos para transformadores",
  },
  {
    name: "DOE-2016",
    fullName: "Department of Energy Efficiency Standards",
    description: "Estándares de eficiencia energética del DOE",
  },
  {
    name: "IEEE C57",
    fullName: "IEEE Standard for Transformers",
    description: "Estándares IEEE para transformadores de potencia",
  },
  {
    name: "ISO 9001:2015",
    fullName: "Quality Management Systems",
    description: "Sistema de gestión de calidad",
  },
];
