// ============================================================================
// EIC - Eminsa International Corporation
// Configuración de datos completa
// Color corporativo: #009e49 (Pantone Hexachrome Green C)
// ============================================================================

// ============================================================================
// INTERFACES
// ============================================================================

export interface EICBrand {
  id: string;
  slug: string;
  name: string;
  country: string;
  description: string;
  logo?: string;
  category: string;
  products: string[];
  catalogUrl?: string;
}

export interface EICProduct {
  id: string;
  slug: string;
  name: string;
  shortName: string;
  description: string;
  fullDescription: string[];
  image?: string;
  brand: string;
  brandSlug: string;
  category: string;
  categorySlug: string;
  features: string[];
  applications: string[];
  specs: { label: string; value: string }[];
  datasheetUrl?: string;
}

export interface EICProductCategory {
  id: string;
  slug: string;
  name: string;
  shortName: string;
  description: string;
  icon: string;
  brands: string[];
  color: string;
}

export interface EICResource {
  id: string;
  slug: string;
  name: string;
  description: string;
  icon: string;
  type: "article" | "manual" | "job" | "form";
  downloadable: boolean;
  url?: string;
}

export interface EICAdvantage {
  id: string;
  title: string;
  description: string;
  icon: string;
  highlight?: string;
}

export interface EICStat {
  value: string;
  label: string;
  suffix?: string;
}

export interface EICInfo {
  name: string;
  fullName: string;
  tagline: string;
  description: string;
  color: string;
  stats: EICStat[];
  advantages: EICAdvantage[];
}

// ============================================================================
// INFORMACIÓN GENERAL EIC
// ============================================================================

export const eicInfo: EICInfo = {
  name: "EIC",
  fullName: "Eminsa International Corporation",
  tagline: "Suplidores Eléctricos Internacionales",
  description:
    "Conectamos a Eminsa con el mundo, expandiendo nuestras soluciones energéticas a través de una sólida red global de aliados estratégicos, garantizando presencia internacional, servicio especializado y un acompañamiento cercano en cada proyecto.",
  color: "#009e49",
  stats: [
    { value: "9", label: "Marcas Representadas", suffix: "+" },
    { value: "40", label: "Países de Presencia", suffix: "+" },
    { value: "50", label: "Años de Experiencia", suffix: "+" },
    { value: "24", label: "Soporte Técnico", suffix: "/7" },
  ],
  advantages: [
    {
      id: "global",
      title: "Marcas Internacionales",
      description: "Acceso a las mejores marcas internacionales del sector eléctrico.",
      icon: "globe",
      highlight: "9+ Marcas",
    },
    {
      id: "soporte",
      title: "Soporte Especializado",
      description: "Acompañamiento técnico y atención personalizada para cada proyecto.",
      icon: "headphones",
    },
    {
      id: "calidad",
      title: "Calidad Certificada",
      description: "Productos que cumplen con normas internacionales IEEE, ANSI e IEC.",
      icon: "shield-check",
      highlight: "Certificado",
    },
    {
      id: "exclusividad",
      title: "Representación Exclusiva",
      description: "Representantes exclusivos en República Dominicana de marcas líderes.",
      icon: "award",
      highlight: "Exclusivo",
    },
  ],
};

// ============================================================================
// CATEGORÍAS DE PRODUCTOS
// ============================================================================

export const eicProductCategories: EICProductCategory[] = [
  {
    id: "transformadores",
    slug: "transformadores",
    name: "Transformadores",
    shortName: "Transformadores",
    description: "Transformadores de distribución de marcas líderes internacionales, incluyendo tipo poste, pad mounted, secos y secos en resina.",
    icon: "zap",
    brands: ["INATRA", "Hammond", "Elpitalia", "Green Transfo"],
    color: "#00269b",
  },
  {
    id: "cables",
    slug: "cables",
    name: "Cables Eléctricos",
    shortName: "Cables",
    description: "Cables eléctricos de alta calidad para transmisión y distribución de energía, desde baja hasta media tensión.",
    icon: "cable",
    brands: ["Top Cable", "Southwire", "Cabelte"],
    color: "#0099ce",
  },
  {
    id: "distribucion-mt",
    slug: "distribucion-mt",
    name: "Distribución en MT (Celdas)",
    shortName: "Distribución MT",
    description: "Celdas de media tensión diseñadas para operar entre 3 kV y 36 kV, en tecnologías AIS y GIS.",
    icon: "grid-3x3",
    brands: ["Schneider Electric"],
    color: "#3DCD58",
  },
  {
    id: "breakers",
    slug: "breakers",
    name: "Breaker y Protección Baja Tensión",
    shortName: "Breakers y Protección",
    description: "Breakers y paneles de baja tensión para protección, continuidad operativa y seguridad en instalaciones.",
    icon: "shield",
    brands: ["Schneider Electric"],
    color: "#e9862c",
  },
  {
    id: "accesorios",
    slug: "accesorios",
    name: "Accesorios para Cables MT",
    shortName: "Accesorios MT",
    description: "Accesorios para cables de media tensión: codos, boquillas, adaptadores, cajas derivadoras, empalmes y terminales.",
    icon: "plug",
    brands: ["Chardon"],
    color: "#6d6e6d",
  },
];

// ============================================================================
// MARCAS REPRESENTADAS
// ============================================================================

export const eicBrands: EICBrand[] = [
  {
    id: "inatra",
    slug: "inatra",
    name: "INATRA",
    country: "Ecuador",
    description:
      "Una marca ecuatoriana que se encarga de fabricar transformadores de distribución con uno de los estándares más alto del mercado. Su producción se caracteriza por el uso de tecnología de punta, un estricto enfoque en la calidad y un equipo técnico altamente calificado, lo que les permite cumplir con normas nacionales e internacionales y atender las demandas del sector eléctrico con soluciones confiables e innovadoras. Como representantes exclusivos de INATRA en la República Dominicana, ofrecemos acceso directo a su portafolio de transformadores y soluciones eléctricas, garantizando soporte especializado, acompañamiento técnico y una atención personalizada para proyectos del sector público y privado.",
    category: "transformadores",
    products: ["Transformador Pad Mounted", "Transformador Poste"],
  },
  {
    id: "hammond",
    slug: "hammond",
    name: "Hammond",
    country: "Canadá / Norteamérica",
    description:
      "Hammond Power Solutions (HPS) es el mayor fabricante de transformadores secos en Norteamérica, reconocido por su ingeniería avanzada y la fabricación de una amplia gama de transformadores estándar y personalizados que se exportan globalmente. La empresa se especializa en transformadores secos de alta calidad para aplicaciones industriales, comerciales y de energía renovable, destacándose por su durabilidad, eficiencia y capacidad para operar en ambientes exigentes.",
    category: "transformadores",
    products: ["Transformadores Secos"],
  },
  {
    id: "elpitalia",
    slug: "elpitalia",
    name: "Elpitalia",
    country: "Italia",
    description:
      "Elpitalia es un fabricante italiano especializado en la ingeniería, diseño y producción de transformadores secos en resina y de media-baja tensión, con una trayectoria consolidada desde 1962. Su gama de transformadores en resina abarca potencias desde 50 kVA hasta 3150 kVA, diseñados bajo estrictas normas europeas y fabricados exclusivamente con materiales de origen europeo, garantizando alta confiabilidad, seguridad y rendimiento incluso en aplicaciones exigentes.",
    category: "transformadores",
    products: ["Transformadores Secos en Resina"],
  },
  {
    id: "topcable",
    slug: "top-cable",
    name: "Top Cable",
    country: "España",
    description:
      "Top Cable es uno de los principales fabricantes europeos de cables eléctricos de alta calidad, con plantas de producción ubicadas en España y una amplia presencia internacional. La empresa produce una extensa gama de cables —incluyendo cables de potencia, solares, armados, libres de halógenos (LSZH), resistentes al fuego, marinos y de media tensión— diseñados para cumplir con las normativas europeas e internacionales más exigentes. Reconocida como un socio global en soluciones de cableado, Top Cable suministra cables para sectores como construcción, infraestructura, industria, energías renovables, transporte y proyectos marinos.",
    category: "cables",
    products: ["Cables de Potencia", "Cables Solares", "Cables de Media Tensión"],
  },
  {
    id: "southwire",
    slug: "southwire",
    name: "Southwire",
    country: "Estados Unidos",
    description:
      "Southwire es uno de los principales fabricantes estadounidenses de cables y conductores eléctricos utilizados en la transmisión y distribución de energía, suministrando electricidad a millones de personas en todo el mundo. La compañía produce una amplia gama de soluciones de cableado, incluyendo cables de baja, media y alta tensión, cables especiales para aplicaciones industriales, petroleras, mineras, aeroportuarias y fotovoltaicas, además de herramientas eléctricas y equipos asociados.",
    category: "cables",
    products: ["Cables de Baja Tensión", "Cables de Media Tensión", "Cables de Alta Tensión"],
  },
  {
    id: "cabelte",
    slug: "cabelte",
    name: "Cabelte",
    country: "Portugal",
    description:
      "Cabelte es un fabricante portugués de referencia especializado en la producción de cables eléctricos de baja y media tensión, diseñados para aplicaciones industriales, comerciales, residenciales y redes de distribución. Con más de cinco décadas de experiencia y presencia en más de 40 países, Cabelte destaca por su enfoque en calidad, sostenibilidad e innovación, desarrollando cables eficientes, seguros y adaptados a las necesidades energéticas modernas.",
    category: "cables",
    products: ["Cables de Baja Tensión", "Cables de Media Tensión"],
  },
  {
    id: "schneider",
    slug: "schneider-electric",
    name: "Schneider Electric",
    country: "Francia / Global",
    description:
      "Schneider Electric es líder global en soluciones para la distribución eléctrica. Dentro de su portafolio destaca una completa gama de celdas de media tensión (MV switchgear) diseñadas para operar entre 3 kV y 36 kV, disponibles en tecnologías AIS (aisladas en aire) y GIS (aisladas en gas). También ofrece una de las líneas más completas y confiables de breakers y paneles de baja tensión del mercado, diseñados para garantizar protección, continuidad operativa y seguridad en instalaciones comerciales, industriales y residenciales.",
    category: "distribucion-mt",
    products: ["Celdas de Media Tensión", "Breakers de Baja Tensión", "Paneles de Distribución"],
  },
  {
    id: "chardon",
    slug: "chardon",
    name: "Chardon",
    country: "Internacional",
    description:
      "Chardon Group es uno de los principales fabricantes mundiales de accesorios para cables de media tensión, especializado en productos bajo normas IEEE/ANSI e IEC. La empresa diseña y fabrica componentes de alta calidad como codos, boquillas, adaptadores, cajas derivadoras, empalmes y terminales, utilizados en redes eléctricas subterráneas, aéreas y subestaciones. Destaca por desarrollar sus propias formulaciones de EPDM, garantizar certificaciones internacionales y ofrecer soluciones confiables para la industria energética.",
    category: "accesorios",
    products: ["Codos", "Boquillas", "Adaptadores", "Empalmes", "Terminales"],
  },
  {
    id: "green-transfo",
    slug: "green-transfo",
    name: "Green Transfo",
    country: "Francia / Polonia / Turquía",
    description:
      "Green Transfo es un fabricante global de transformadores con más de 60 años de experiencia industrial, consolidado en 2023 bajo el Groupe Cahors tras integrar plantas con legado bajo marcas como AEG, Alstom, Areva y Schneider Electric. La empresa se especializa en el diseño y producción de transformadores de alta calidad, incluyendo transformadores de subestación, que forman parte de su línea de transformadores de potencia y media potencia. Estas unidades pueden alcanzar capacidades de hasta 135 MVA y 170 kV, fabricadas con tecnología avanzada y procesos que cumplen los estándares internacionales más exigentes. Los transformadores de subestación de Green Transfo se desarrollan en instalaciones modernas ubicadas en Polonia y Turquía, donde se aplican métodos de manufactura sostenibles y materiales eco-amigables para garantizar eficiencia, confiabilidad y larga vida útil.",
    category: "transformadores",
    products: ["Transformadores tipo Subestación"],
  },
];

// ============================================================================
// PRODUCTOS EIC
// ============================================================================

export const eicProducts: EICProduct[] = [
  // --- TRANSFORMADORES ---
  {
    id: "inatra-pad-mounted",
    slug: "inatra-pad-mounted",
    name: "Transformador Pad Mounted INATRA",
    shortName: "Pad Mounted",
    description: "Transformadores tipo pad mounted fabricados por INATRA con los más altos estándares del mercado.",
    fullDescription: [
      "Los transformadores Pad Mounted de INATRA son equipos de distribución diseñados para instalación a nivel de piso, ideales para sistemas de distribución subterránea.",
      "Fabricados con tecnología de punta y un estricto enfoque en la calidad, cumplen con normas nacionales e internacionales para atender las demandas del sector eléctrico.",
      "Como representantes exclusivos de INATRA en la República Dominicana, ofrecemos acceso directo a su portafolio con soporte especializado y acompañamiento técnico.",
    ],
    brand: "INATRA",
    brandSlug: "inatra",
    category: "Transformadores",
    categorySlug: "transformadores",
    features: ["Tecnología de punta", "Estándares internacionales", "Equipo técnico calificado", "Soporte especializado", "Representación exclusiva RD"],
    applications: ["Distribución subterránea", "Urbanizaciones", "Centros comerciales", "Industrias", "Proyectos públicos y privados"],
    specs: [
      { label: "Tipo", value: "Pad Mounted" },
      { label: "Marca", value: "INATRA" },
      { label: "Origen", value: "Ecuador" },
      { label: "Normas", value: "ANSI / IEEE" },
    ],
  },
  {
    id: "inatra-poste",
    slug: "inatra-poste",
    name: "Transformador Poste INATRA",
    shortName: "Tipo Poste",
    description: "Transformadores tipo poste fabricados por INATRA para sistemas de distribución aérea.",
    fullDescription: [
      "Los transformadores Tipo Poste de INATRA están diseñados para instalación en poste, siendo ideales para sistemas de distribución aérea.",
      "Cada unidad es fabricada con los más altos estándares de calidad, utilizando tecnología avanzada y un equipo técnico altamente calificado.",
      "Cumplen con normas nacionales e internacionales, ofreciendo soluciones confiables e innovadoras para el sector eléctrico.",
    ],
    brand: "INATRA",
    brandSlug: "inatra",
    category: "Transformadores",
    categorySlug: "transformadores",
    features: ["Fabricación de alta calidad", "Cumplimiento normativo", "Tecnología avanzada", "Soluciones innovadoras", "Soporte técnico RD"],
    applications: ["Distribución aérea", "Zonas residenciales", "Áreas comerciales", "Proyectos de electrificación", "Redes de distribución"],
    specs: [
      { label: "Tipo", value: "Tipo Poste" },
      { label: "Marca", value: "INATRA" },
      { label: "Origen", value: "Ecuador" },
      { label: "Normas", value: "ANSI / IEEE" },
    ],
  },
  {
    id: "hammond-secos",
    slug: "hammond-secos",
    name: "Transformadores Secos Hammond",
    shortName: "Secos Hammond",
    description: "Transformadores secos de alta calidad fabricados por Hammond Power Solutions, el mayor fabricante de Norteamérica.",
    fullDescription: [
      "Hammond Power Solutions (HPS) es el mayor fabricante de transformadores secos en Norteamérica, reconocido por su ingeniería avanzada y la fabricación de una amplia gama de transformadores estándar y personalizados.",
      "La empresa se especializa en transformadores secos de alta calidad para aplicaciones industriales, comerciales y de energía renovable, destacándose por su durabilidad, eficiencia y capacidad para operar en ambientes exigentes.",
      "Los transformadores secos Hammond no requieren aceite dieléctrico, lo que los hace ideales para instalaciones interiores y ambientes donde la seguridad contra incendios es prioritaria.",
    ],
    brand: "Hammond",
    brandSlug: "hammond",
    category: "Transformadores",
    categorySlug: "transformadores",
    features: ["Mayor fabricante de Norteamérica", "Ingeniería avanzada", "Estándar y personalizados", "Durabilidad excepcional", "Eficiencia energética", "Ambientes exigentes"],
    applications: ["Industria", "Comercios", "Energía renovable", "Instalaciones interiores", "Data centers", "Hospitales"],
    specs: [
      { label: "Tipo", value: "Seco" },
      { label: "Marca", value: "Hammond (HPS)" },
      { label: "Origen", value: "Norteamérica" },
      { label: "Normas", value: "ANSI / UL / CSA" },
    ],
  },
  {
    id: "elpitalia-resina",
    slug: "elpitalia-secos-resina",
    name: "Transformadores Secos en Resina Elpitalia",
    shortName: "Secos en Resina",
    description: "Transformadores secos en resina fabricados por Elpitalia, especialista italiano con trayectoria desde 1962.",
    fullDescription: [
      "Elpitalia es un fabricante italiano especializado en la ingeniería, diseño y producción de transformadores secos en resina y de media-baja tensión, con una trayectoria consolidada desde 1962.",
      "Su gama de transformadores en resina abarca potencias desde 50 kVA hasta 3150 kVA, diseñados bajo estrictas normas europeas y fabricados exclusivamente con materiales de origen europeo.",
      "Garantizan alta confiabilidad, seguridad y rendimiento incluso en aplicaciones exigentes, siendo ideales para ambientes donde se requiere máxima protección contra incendios.",
    ],
    brand: "Elpitalia",
    brandSlug: "elpitalia",
    category: "Transformadores",
    categorySlug: "transformadores",
    features: ["Desde 1962", "50 kVA a 3150 kVA", "Normas europeas", "Materiales europeos", "Alta confiabilidad", "Resistente al fuego"],
    applications: ["Ambientes exigentes", "Hospitales", "Edificios de oficinas", "Industria pesada", "Infraestructura crítica", "Túneles y metro"],
    specs: [
      { label: "Tipo", value: "Seco en Resina" },
      { label: "Marca", value: "Elpitalia" },
      { label: "Potencia", value: "50 – 3,150 kVA" },
      { label: "Origen", value: "Italia" },
      { label: "Normas", value: "IEC / EN" },
    ],
  },
  // --- CABLES ---
  {
    id: "topcable-cables",
    slug: "top-cable",
    name: "Cables Eléctricos Top Cable",
    shortName: "Top Cable",
    description: "Cables eléctricos de alta calidad fabricados en España, incluyendo cables de potencia, solares, armados y de media tensión.",
    fullDescription: [
      "Top Cable es uno de los principales fabricantes europeos de cables eléctricos de alta calidad, con plantas de producción ubicadas en España y una amplia presencia internacional.",
      "La empresa produce una extensa gama de cables —incluyendo cables de potencia, solares, armados, libres de halógenos (LSZH), resistentes al fuego, marinos y de media tensión— diseñados para cumplir con las normativas europeas e internacionales más exigentes.",
      "Reconocida como un socio global en soluciones de cableado, Top Cable suministra cables para sectores como construcción, infraestructura, industria, energías renovables, transporte y proyectos marinos, ofreciendo productos fiables, sostenibles y respaldados por un riguroso control de calidad.",
    ],
    brand: "Top Cable",
    brandSlug: "top-cable",
    category: "Cables",
    categorySlug: "cables",
    features: ["Fabricación europea", "Libres de halógenos (LSZH)", "Resistentes al fuego", "Cables solares", "Cables marinos", "Control de calidad riguroso"],
    applications: ["Construcción", "Infraestructura", "Industria", "Energías renovables", "Transporte", "Proyectos marinos"],
    specs: [
      { label: "Marca", value: "Top Cable" },
      { label: "Origen", value: "España" },
      { label: "Tipos", value: "BT, MT, Solar, Marino" },
      { label: "Normas", value: "IEC / UNE / EN" },
    ],
  },
  {
    id: "southwire-cables",
    slug: "southwire",
    name: "Cables y Conductores Southwire",
    shortName: "Southwire",
    description: "Cables y conductores eléctricos para transmisión y distribución de energía, fabricados en Estados Unidos.",
    fullDescription: [
      "Southwire es uno de los principales fabricantes estadounidenses de cables y conductores eléctricos utilizados en la transmisión y distribución de energía, suministrando electricidad a millones de personas en todo el mundo.",
      "La compañía produce una amplia gama de soluciones de cableado, incluyendo cables de baja, media y alta tensión, cables especiales para aplicaciones industriales, petroleras, mineras, aeroportuarias y fotovoltaicas, además de herramientas eléctricas y equipos asociados.",
    ],
    brand: "Southwire",
    brandSlug: "southwire",
    category: "Cables",
    categorySlug: "cables",
    features: ["Fabricación estadounidense", "Baja, media y alta tensión", "Cables especiales", "Aplicaciones fotovoltaicas", "Herramientas eléctricas"],
    applications: ["Transmisión de energía", "Distribución eléctrica", "Industrial", "Petrolera y minera", "Aeroportuaria", "Fotovoltaica"],
    specs: [
      { label: "Marca", value: "Southwire" },
      { label: "Origen", value: "Estados Unidos" },
      { label: "Tipos", value: "BT, MT, AT, Especiales" },
      { label: "Normas", value: "UL / ANSI / ASTM" },
    ],
  },
  {
    id: "cabelte-cables",
    slug: "cabelte",
    name: "Cables Eléctricos Cabelte",
    shortName: "Cabelte",
    description: "Cables eléctricos de baja y media tensión fabricados en Portugal, con más de cinco décadas de experiencia.",
    fullDescription: [
      "Cabelte es un fabricante portugués de referencia especializado en la producción de cables eléctricos de baja y media tensión, diseñados para aplicaciones industriales, comerciales, residenciales y redes de distribución.",
      "Con más de cinco décadas de experiencia y presencia en más de 40 países, Cabelte destaca por su enfoque en calidad, sostenibilidad e innovación, desarrollando cables eficientes, seguros y adaptados a las necesidades energéticas modernas.",
      "Ofrece además servicios especializados de soporte, instalación y consultoría para proyectos de media y baja tensión.",
    ],
    brand: "Cabelte",
    brandSlug: "cabelte",
    category: "Cables",
    categorySlug: "cables",
    features: ["50+ años de experiencia", "Presencia en 40+ países", "Sostenibilidad", "Innovación", "Soporte y consultoría"],
    applications: ["Industrial", "Comercial", "Residencial", "Redes de distribución", "Subestaciones"],
    specs: [
      { label: "Marca", value: "Cabelte" },
      { label: "Origen", value: "Portugal" },
      { label: "Tipos", value: "BT, MT" },
      { label: "Normas", value: "IEC / EN / NP" },
    ],
  },
  // --- DISTRIBUCIÓN MT ---
  {
    id: "schneider-celdas",
    slug: "schneider-celdas-mt",
    name: "Celdas de Media Tensión Schneider Electric",
    shortName: "Celdas MT Schneider",
    description: "Celdas de media tensión para operar entre 3 kV y 36 kV, en tecnologías AIS y GIS.",
    fullDescription: [
      "Schneider Electric es líder global en soluciones para la distribución eléctrica y, dentro de su portafolio, destaca una completa gama de celdas de media tensión (MV switchgear) diseñadas para operar entre 3 kV y 36 kV, disponibles en tecnologías AIS (aisladas en aire) y GIS (aisladas en gas).",
      "Estas celdas permiten realizar funciones esenciales de protección, seccionamiento, control y continuidad operativa en redes de distribución primaria y secundaria, garantizando un suministro estable y seguro en entornos industriales, comerciales y de infraestructura crítica.",
    ],
    brand: "Schneider Electric",
    brandSlug: "schneider-electric",
    category: "Distribución en MT",
    categorySlug: "distribucion-mt",
    features: ["3 kV a 36 kV", "Tecnología AIS y GIS", "Protección y seccionamiento", "Control y continuidad", "Líder global"],
    applications: ["Distribución primaria", "Distribución secundaria", "Industrial", "Comercial", "Infraestructura crítica"],
    specs: [
      { label: "Marca", value: "Schneider Electric" },
      { label: "Voltaje", value: "3 kV – 36 kV" },
      { label: "Tecnología", value: "AIS / GIS" },
      { label: "Normas", value: "IEC / ANSI" },
    ],
  },
  // --- BREAKERS ---
  {
    id: "schneider-breakers",
    slug: "schneider-breakers-bt",
    name: "Breakers y Protección BT Schneider Electric",
    shortName: "Breakers BT Schneider",
    description: "Breakers y paneles de baja tensión para protección y continuidad operativa en todo tipo de instalaciones.",
    fullDescription: [
      "Schneider Electric es líder global en soluciones de distribución eléctrica y ofrece una de las líneas más completas y confiables de breakers y paneles de baja tensión del mercado.",
      "Sus productos están diseñados para garantizar protección, continuidad operativa y seguridad en instalaciones comerciales, industriales y residenciales.",
    ],
    brand: "Schneider Electric",
    brandSlug: "schneider-electric",
    category: "Breakers y Protección",
    categorySlug: "breakers",
    features: ["Línea completa", "Alta confiabilidad", "Protección integral", "Continuidad operativa", "Seguridad certificada"],
    applications: ["Comercial", "Industrial", "Residencial", "Infraestructura", "Data centers"],
    specs: [
      { label: "Marca", value: "Schneider Electric" },
      { label: "Tipo", value: "Breakers y Paneles BT" },
      { label: "Aplicación", value: "Baja Tensión" },
      { label: "Normas", value: "IEC / UL / ANSI" },
    ],
  },
  // --- ACCESORIOS ---
  {
    id: "chardon-accesorios",
    slug: "chardon-accesorios-mt",
    name: "Accesorios para Cables MT Chardon",
    shortName: "Accesorios MT Chardon",
    description: "Accesorios para cables de media tensión: codos, boquillas, adaptadores, empalmes y terminales.",
    fullDescription: [
      "Chardon Group es uno de los principales fabricantes mundiales de accesorios para cables de media tensión, especializado en productos bajo normas IEEE/ANSI e IEC.",
      "La empresa diseña y fabrica componentes de alta calidad como codos, boquillas, adaptadores, cajas derivadoras, empalmes y terminales, utilizados en redes eléctricas subterráneas, aéreas y subestaciones.",
      "Destaca por desarrollar sus propias formulaciones de EPDM, garantizar certificaciones internacionales y ofrecer soluciones confiables para la industria energética.",
    ],
    brand: "Chardon",
    brandSlug: "chardon",
    category: "Accesorios",
    categorySlug: "accesorios",
    features: ["Normas IEEE/ANSI e IEC", "Formulaciones EPDM propias", "Certificaciones internacionales", "Alta calidad", "Soluciones confiables"],
    applications: ["Redes subterráneas", "Redes aéreas", "Subestaciones", "Distribución de energía", "Infraestructura eléctrica"],
    specs: [
      { label: "Marca", value: "Chardon Group" },
      { label: "Productos", value: "Codos, Boquillas, Empalmes" },
      { label: "Material", value: "EPDM propio" },
      { label: "Normas", value: "IEEE / ANSI / IEC" },
    ],
  },
  // --- GREEN TRANSFO ---
  {
    id: "green-transfo-subestacion",
    slug: "green-transfo-subestacion",
    name: "Transformadores de Subestación Green Transfo",
    shortName: "Subestación Green Transfo",
    description: "Transformadores de subestación de alta potencia fabricados por Green Transfo, con capacidades de hasta 135 MVA y 170 kV.",
    fullDescription: [
      "Green Transfo es un fabricante global de transformadores con más de 60 años de experiencia industrial, consolidado en 2023 bajo el Groupe Cahors tras integrar plantas con legado bajo marcas como AEG, Alstom, Areva y Schneider Electric.",
      "La empresa se especializa en el diseño y producción de transformadores de alta calidad, incluyendo transformadores de subestación que forman parte de su línea de transformadores de potencia y media potencia. Estas unidades pueden alcanzar capacidades de hasta 135 MVA y 170 kV.",
      "Los transformadores de subestación de Green Transfo se desarrollan en instalaciones modernas ubicadas en Polonia y Turquía, donde se aplican métodos de manufactura sostenibles y materiales eco-amigables para garantizar eficiencia, confiabilidad y larga vida útil.",
    ],
    brand: "Green Transfo",
    brandSlug: "green-transfo",
    category: "Transformadores",
    categorySlug: "transformadores",
    features: ["Hasta 135 MVA", "Hasta 170 kV", "Manufactura sostenible", "Materiales eco-amigables", "Legado AEG/Alstom/Areva", "60+ años de experiencia"],
    applications: ["Subestaciones eléctricas", "Generación de energía", "Transmisión de potencia", "Infraestructura industrial", "Proyectos de gran escala"],
    specs: [
      { label: "Marca", value: "Green Transfo (Groupe Cahors)" },
      { label: "Tipo", value: "Subestación / Potencia" },
      { label: "Capacidad", value: "Hasta 135 MVA" },
      { label: "Voltaje", value: "Hasta 170 kV" },
      { label: "Origen", value: "Polonia / Turquía" },
      { label: "Normas", value: "IEC / ANSI" },
    ],
  },
];

// ============================================================================
// RECURSOS EIC
// ============================================================================

export const eicResources: EICResource[] = [
  {
    id: "cotizacion",
    slug: "cotizacion",
    name: "Solicitar Cotización",
    description: "Formulario para solicitar cotización de productos internacionales.",
    icon: "file-check",
    type: "form",
    downloadable: false,
    url: "/eic/cotizaciones",
  },
];

// ============================================================================
// HELPERS
// ============================================================================

export const getEICProductBySlug = (slug: string): EICProduct | undefined => {
  return eicProducts.find((p) => p.slug === slug);
};

export const getEICBrandBySlug = (slug: string): EICBrand | undefined => {
  return eicBrands.find((b) => b.slug === slug);
};

export const getEICCategoryBySlug = (slug: string): EICProductCategory | undefined => {
  return eicProductCategories.find((c) => c.slug === slug);
};

export const getEICProductsByCategory = (categorySlug: string): EICProduct[] => {
  return eicProducts.filter((p) => p.categorySlug === categorySlug);
};

export const getEICBrandsByCategory = (categoryId: string): EICBrand[] => {
  return eicBrands.filter((b) => b.category === categoryId);
};

export const getOtherEICProducts = (currentSlug: string): EICProduct[] => {
  return eicProducts.filter((p) => p.slug !== currentSlug);
};

export const getAllEICProductSlugs = (): string[] => {
  return eicProducts.map((p) => p.slug);
};

export const getEICProductsByBrand = (brandSlug: string): EICProduct[] => {
  return eicProducts.filter((p) => p.brandSlug === brandSlug);
};

export const getAllEICBrandSlugs = (): string[] => {
  return eicBrands.map((b) => b.slug);
};
