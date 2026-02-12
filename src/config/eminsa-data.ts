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
    color: "#001689",
  },
  {
    id: "rst",
    name: "RST",
    fullName: "Reparación y Servicio de Transformadores",
    description: "Especialistas en reparación y remanufactura de transformadores de distribución e industriales.",
    href: "/etrys",
    color: "#00A3E0",
  },
  {
    id: "eic",
    name: "EIC",
    fullName: "Eminsa International Corporation",
    description: "Representantes exclusivos de las mejores marcas internacionales en equipos eléctricos.",
    href: "/eic",
    color: "#00B140",
  },
  {
    id: "servicios",
    name: "EMINSA Servicios",
    fullName: "Servicios Técnicos Especializados",
    description: "Mantenimiento, reparación y soporte técnico de transformadores eléctricos en campo.",
    href: "/servicios",
    color: "#FF5500",
  },
];

// ============================================================================
// HITOS HISTÓRICOS
// ============================================================================

export const eminsaMilestones = [
  {
    year: "1970",
    decade: "1970s",
    event: "Fundación de EMINSA como fabricante de transformadores eléctricos de distribución",
    description: "Inicio de operaciones en Santo Domingo, República Dominicana.",
  },
  {
    year: "1980",
    decade: "1980s",
    event: "Inicio de servicios de reparación y mantenimiento de transformadores",
    description: "Expansión de servicios técnicos especializados.",
  },
  {
    year: "1990",
    decade: "1990s",
    event: "Expansión del centro de reparación y modernización de instalaciones",
    description: "Inversión en equipamiento y capacitación técnica.",
  },
  {
    year: "2000",
    decade: "2000s",
    event: "Certificación ISO 9001 y modernización de equipos de producción",
    description: "Implementación de sistemas de gestión de calidad.",
  },
  {
    year: "2010",
    decade: "2010s",
    event: "Lanzamiento de marca RST y creación de división EIC",
    description: "Diversificación y crecimiento del grupo empresarial.",
  },
  {
    year: "2020",
    decade: "2020s",
    event: "Consolidación como líder del mercado en República Dominicana y el Caribe",
    description: "Reconocimiento regional y expansión de operaciones.",
  },
];
