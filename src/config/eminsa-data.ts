// ============================================================================
// GRUPO EMINSA - Configuración de datos corporativos
// Información general sobre Grupo EMINSA
// ============================================================================

// ============================================================================
// INTERFACES
// ============================================================================

export interface EminsaStat {
  value: string;
  label: string;
  suffix?: string;
}

export interface EminsaValue {
  title: string;
  description: string;
  icon: string;
}

export interface EminsaAdvantage {
  title: string;
  description: string;
  icon: string;
}

export interface AboutEminsa {
  title: string;
  description: string;
  mission: string;
  vision: string;
  values: EminsaValue[];
  team: string;
  position: string;
}

export interface EminsaDivision {
  id: string;
  name: string;
  fullName: string;
  description: string;
  href: string;
  color: string;
}

// ============================================================================
// INFORMACIÓN GENERAL GRUPO EMINSA
// ============================================================================

export const eminsaInfo = {
  name: "Grupo EMINSA",
  fullName: "Grupo Empresarial EMINSA",
  tagline: "Más de 50 años de Excelencia en el Sector Eléctrico",
  slogan: "Soluciones Integrales en Transformadores y Equipos Eléctricos",
  description:
    "GRUPO EMINSA es líder en la República Dominicana y el Caribe en la manufactura, reparación y comercialización de transformadores eléctricos de distribución y equipos relacionados. Con más de 50 años de experiencia, ofrecemos soluciones integrales respaldadas por los más altos estándares de calidad internacional.",
  yearFounded: "1970",
  headquarters: "Santo Domingo, República Dominicana",
};

// ============================================================================
// ESTADÍSTICAS DEL GRUPO
// ============================================================================

export const eminsaStats: EminsaStat[] = [
  { value: "50", label: "Años de Experiencia", suffix: "+" },
  { value: "10,000", label: "Transformadores Instalados", suffix: "+" },
  { value: "500", label: "Clientes Satisfechos", suffix: "+" },
  { value: "24/7", label: "Soporte Técnico" },
];

// ============================================================================
// VENTAJAS COMPETITIVAS
// ============================================================================

export const eminsaAdvantages: EminsaAdvantage[] = [
  {
    title: "Experiencia Comprobada",
    description: "Más de 50 años especializados en transformadores eléctricos de distribución en el Caribe.",
    icon: "award",
  },
  {
    title: "Calidad Certificada",
    description: "Certificación ISO 9001:2015 y cumplimiento con normas ANSI, IEEE y DOE.",
    icon: "shield-check",
  },
  {
    title: "Soluciones Integrales",
    description: "Desde manufactura hasta servicios de mantenimiento, reparación y comercialización.",
    icon: "package",
  },
  {
    title: "Alcance Regional",
    description: "Presencia consolidada en República Dominicana y el Caribe.",
    icon: "globe",
  },
];

// ============================================================================
// INFORMACIÓN CORPORATIVA (NOSOTROS)
// ============================================================================

export const aboutEminsa: AboutEminsa = {
  title: "Grupo EMINSA",
  description:
    "GRUPO EMINSA es una organización empresarial líder en la República Dominicana y el Caribe, con más de 50 años de trayectoria en el sector de transformadores eléctricos de distribución y equipos relacionados. Nos especializamos en ofrecer soluciones integrales que incluyen manufactura, reparación, remanufactura, comercialización y servicios técnicos especializados.",
  mission:
    "Brindar soluciones confiables, innovadoras y de calidad en transformadores y equipos eléctricos, actuando con transparencia, integridad y dedicación en cada proyecto. Nuestro compromiso es superar las expectativas de nuestros clientes, garantizando un servicio técnico excepcional respaldado por décadas de experiencia.",
  vision:
    "Ser el referente líder en el Caribe para la manufactura, reparación y comercialización de transformadores eléctricos, reconocidos por nuestra excelencia técnica, innovación constante y compromiso con el desarrollo sostenible del sector energético.",
  values: [
    {
      title: "Excelencia",
      description: "Nos esforzamos por superar las expectativas en cada proyecto, asegurando la más alta calidad en nuestros productos y servicios.",
      icon: "award",
    },
    {
      title: "Integridad",
      description: "Actuamos con honestidad, transparencia y ética en todas nuestras relaciones comerciales y operaciones.",
      icon: "shield-check",
    },
    {
      title: "Compromiso",
      description: "Cumplimos nuestras promesas y asumimos responsabilidad total por nuestros productos, servicios y el impacto que generamos.",
      icon: "heart",
    },
    {
      title: "Innovación",
      description: "Buscamos constantemente mejores formas de servir a nuestros clientes, adoptando nuevas tecnologías y mejorando nuestros procesos.",
      icon: "lightbulb",
    },
  ],
  team:
    "Contamos con un equipo de profesionales multidisciplinarios altamente capacitados, ingenieros, técnicos y especialistas comprometidos con brindar las mejores soluciones posibles. Nuestro personal recibe capacitación constante para mantenerse actualizado con las últimas tecnologías y estándares de la industria.",
  position:
    "En la República Dominicana y el Caribe, GRUPO EMINSA se ha consolidado como el especialista de referencia en transformadores eléctricos. Nuestra trayectoria de más de cinco décadas, combinada con nuestra capacidad técnica y compromiso con la calidad, nos ha permitido ganarnos la confianza de cientos de clientes en diversos sectores industriales, comerciales y residenciales.",
};

// ============================================================================
// DIVISIONES DEL GRUPO
// ============================================================================

export const eminsaDivisions: EminsaDivision[] = [
  {
    id: "mtn",
    name: "MTN",
    fullName: "Manufactura Transformadores Nuevos",
    description: "Fabricación de transformadores de distribución con los más altos estándares de calidad internacional.",
    href: "/mtn",
    color: "#00269b",
  },
  {
    id: "rst",
    name: "RST",
    fullName: "Reparación y Servicio de Transformadores",
    description: "Especialistas en reparación y remanufactura de transformadores de distribución e industriales.",
    href: "/etrys",
    color: "#0099ce",
  },
  {
    id: "eic",
    name: "EIC",
    fullName: "Eminsa International Corporation",
    description: "Representantes exclusivos de las mejores marcas internacionales en equipos eléctricos.",
    href: "/eic",
    color: "#009e49",
  },
  {
    id: "servicios",
    name: "EMINSA Servicios",
    fullName: "Servicios Técnicos Especializados",
    description: "Mantenimiento, reparación y soporte técnico de transformadores eléctricos en campo.",
    href: "/servicios",
    color: "#e9862c",
  },
];

// ============================================================================
// HITOS HISTÓRICOS
// ============================================================================

export const eminsaMilestones = [
  {
    year: "14 de septiembre, 1973",
    decade: "1973",
    event: "Fundación de EMINSA",
    description: "Primera empresa en República Dominicana para la fabricación y reparación de transformadores de distribución eléctrica.",
    details: [
      "El 14 de septiembre de 1973 fue constituida la Empresa de Ingeniería Eléctrica SAS (EMINSA), producto de la fusión de capital dominicano con la empresa multinacional chilena Hernan Briones y Compañía.",
      "Es la primera empresa establecida en República Dominicana para la fabricación y reparación de transformadores de distribución eléctrica.",
      "En el año 1979, la empresa adquirió las maquinarias y equipos de la Canadian General Electric, asesorados por la firma canadiense Ferranti Packard Transformers.",
      "Se introdujo al mercado el transformador Pad Mounted, siendo nuevamente pioneros en este rango."
    ],
    achievements: [
      "Primera fábrica de transformadores en RD",
      "Fusión dominico-chilena pionera en el sector",
      "Introducción del transformador Pad Mounted al mercado"
    ]
  },
  {
    year: "Finales de los años 80 – 1996",
    decade: "1980s",
    event: "Primeras exportaciones y alianzas internacionales",
    description: "Exportaciones a Haití y Turks & Caicos, y convenio con Energy Internacional Corporation USA.",
    details: [
      "A finales de los años 80, EMINSA realizó sus primeras exportaciones a la República de Haití, así como a las islas de Turks & Caicos a través de un contratista eléctrico.",
      "En 1996 firmó un convenio de asistencia técnica y suministro de materia prima con la división internacional de Energy Internacional Corporation en Estados Unidos, firma con más de 100 años de experiencia.",
      "El convenio abarcó especialmente el área de subestación eléctrica y proyectos de generación."
    ],
    achievements: [
      "Primeras exportaciones al Caribe y Haití",
      "Alianza con Energy Internacional Corporation USA",
      "Presencia en múltiples mercados del Caribe"
    ]
  },
  {
    year: "2002 – 2006",
    decade: "2000s",
    event: "Un nuevo milenio: diversificación y crecimiento",
    description: "Distribución de Celdas de Media Tensión, asesoría PUM holandesa y distribución oficial ABB.",
    details: [
      "En el año 2002, gracias al espíritu de innovación constante y las necesidades de los clientes, EMINSA inició la distribución de Celdas de Media Tensión y Centros de Transformación.",
      "En el 2003, EMINSA recibió asesoría del PUM (Programa de Asesores Holandeses), quienes rediseñaron las operaciones de negocios, enfocándolas hacia la comercialización de servicios basados en la flexibilidad e innovación de subcontratistas experimentados.",
      "En 2006, EMINSA emprendió la distribución de los transformadores y equipos de ABB, Inc., manteniendo un stock de transformadores disponible para sus clientes.",
      "EMINSA fue designada empresa autorizada para los servicios de evaluación, diagnósticos y reparación para los equipos manufacturados por General Electric, CO. en República Dominicana."
    ],
    achievements: [
      "Distribución de Celdas de Media Tensión",
      "Rediseño operacional con asesoría PUM Holanda",
      "Distribución oficial ABB Inc.",
      "Servicio autorizado General Electric en RD"
    ]
  },
  {
    year: "2018 – 2019",
    decade: "2018–2019",
    event: "Nuevas representaciones internacionales",
    description: "Acuerdos con fabricante ecuatoriano, Snyder Electric USA y ELPROM TRAFO Bulgaria.",
    details: [
      "En 2018 se firmó un acuerdo de representación con una industria de Transformadores Ecuatorianos, con tecnología propia de punta y profesionales, técnicos y operarios altamente calificados.",
      "En 2019, EMINSA firmó un contrato de distribución con Snyder Electric USA, especialista global en manejo de energía y automatización con operaciones en más de 100 países.",
      "En ese mismo año se firmó un contrato de representación y distribución con la empresa búlgara ELPROM TRAFO, que cuenta con la norma IEC (International Electrotechnical Commission)."
    ],
    achievements: [
      "Representación de fabricante ecuatoriano de transformadores",
      "Distribución oficial Snyder Electric USA",
      "Representación ELPROM TRAFO Bulgaria (norma IEC)"
    ]
  },
  {
    year: "2024",
    decade: "2024",
    event: "Traslado al Parque Industrial Duarte",
    description: "Preparación para abrir la primera fábrica de transformadores 100% nuevos en el Caribe.",
    details: [
      "EMINSA trasladó sus operaciones al Parque Industrial Duarte.",
      "Se inició la preparación para abrir la primera fábrica de transformadores 100% nuevos en el Caribe."
    ],
    achievements: [
      "Nuevas instalaciones en Parque Industrial Duarte",
      "Preparación de la primera fábrica MTN del Caribe"
    ]
  },
  {
    year: "2025",
    decade: "2025",
    event: "Primeros prototipos MTN, ISO 9001 y homologación CEPM",
    description: "Salida de los primeros transformadores nuevos EMINSA fabricados bajo norma ANSI / DOE 2016.",
    details: [
      "Salieron los primeros prototipos de la nueva línea de transformadores EMINSA, fabricados bajo la norma ANSI y con eficiencia DOE 2016.",
      "EMINSA obtuvo la certificación ISO 9001.",
      "CEPM recibió uno de los prototipos de los transformadores nuevos EMINSA para su evaluación técnica.",
      "Tras completar el proceso de pruebas y validación, CEPM homologó los transformadores fabricados por EMINSA para ser utilizados en sus redes de distribución."
    ],
    achievements: [
      "Primeros prototipos MTN bajo norma ANSI / DOE 2016",
      "Certificación ISO 9001 obtenida",
      "Homologación CEPM para redes de distribución"
    ]
  },
];
