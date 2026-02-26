// Datos centralizados para la sección de Servicios de EMINSA

// ================================================================
// INFO GENERAL
// ================================================================
export const serviciosInfo = {
  name: "EMINSA Servicios",
  fullName: "EMINSA Servicios",
  tagline: "Soluciones Integrales en Campo",
  slogan: "Más de 50 años de experiencia y servicio",
  description:
    "SERVICIOS es la unidad de negocios de Grupo EMINSA enfocada en brindar atención técnica especializada en sitio, ofreciendo mantenimiento, reparación y soporte integral para garantizar la eficiencia, seguridad y continuidad operativa de los transformadores eléctricos de nuestros clientes.",
  color: "#696969",
  colorName: "Gray",
  stats: [
    { value: "50", suffix: "+", label: "Años de Experiencia" },
    { value: "500", suffix: "+", label: "Clientes Atendidos" },
    { value: "24", suffix: "/7", label: "Soporte Técnico" },
    { value: "100", suffix: "%", label: "Satisfacción" },
  ],
  procesoTrabajo: [
    {
      id: 1,
      titulo: "Inspección Técnica",
      descripcion:
        "Levantamiento de condiciones actuales, detección de posibles riesgos y elaboración de diagnóstico integral del equipo.",
      icon: "search",
    },
    {
      id: 2,
      titulo: "Ejecución Especializada",
      descripcion:
        "Mantenimiento en base a hallazgos: ejecución de trabajos de acuerdo con los resultados del diagnóstico inicial.",
      icon: "wrench",
    },
    {
      id: 3,
      titulo: "Verificación Final",
      descripcion:
        "Validación del trabajo realizado, confirmación de la operatividad del transformador y entrega de informe técnico.",
      icon: "check-circle",
    },
  ],
};

// ================================================================
// DETALLE EXTENDIDO DE SERVICIOS
// ================================================================
export interface ServicioDetalle {
  id: string;
  slug: string;
  nombre: string;
  nombreCorto: string;
  descripcion: string;
  descripcionLarga: string;
  icon: string;
  imagen?: string;
  beneficios: string[];
  alcance?: string[];
  etapas?: { titulo: string; descripcion: string }[];
}

export const serviciosDetalle: ServicioDetalle[] = [
  {
    id: "preventivo",
    slug: "preventivo",
    nombre: "Mantenimiento Preventivo - Predictivo",
    nombreCorto: "Preventivo",
    descripcion:
      "Inspecciones programadas, pruebas de diagnóstico y monitoreo de condición para anticipar fallas y extender la vida útil de sus equipos.",
    descripcionLarga:
      "En EMINSA Servicios entendemos que la confiabilidad de sus transformadores es clave para la continuidad de sus operaciones. Nuestro programa de Mantenimiento Preventivo y Predictivo está diseñado para anticipar fallas, minimizar riesgos y extender la vida útil de sus equipos. A través de inspecciones programadas, pruebas de diagnóstico y monitoreo de condición, aseguramos que cada transformador opere en parámetros óptimos, reduciendo tiempos de inactividad no planificados y optimizando los costos de operación.",
    icon: "shield-check",
    beneficios: [
      "Prevención de fallas imprevistas",
      "Mayor disponibilidad y eficiencia del transformador",
      "Reducción de costos por reparaciones mayores",
      "Extensión de la vida útil del equipo",
      "Seguridad y continuidad en la distribución de energía",
    ],
    etapas: [
      {
        titulo: "Inspección Visual y Termográfica",
        descripcion:
          "Evaluación del estado externo, conexiones, bushings y componentes mediante termografía infrarroja.",
      },
      {
        titulo: "Pruebas de Diagnóstico",
        descripcion:
          "Análisis de aceite dieléctrico, medición de resistencia de aislamiento, factor de potencia y relación de transformación.",
      },
      {
        titulo: "Monitoreo de Condición",
        descripcion:
          "Seguimiento continuo de parámetros críticos para detectar tendencias de degradación.",
      },
      {
        titulo: "Informe y Recomendaciones",
        descripcion:
          "Entrega de reporte técnico detallado con hallazgos, diagnóstico y plan de acción recomendado.",
      },
    ],
  },
  {
    id: "correctivo",
    slug: "correctivo",
    nombre: "Mantenimiento Correctivo en Campo",
    nombreCorto: "Correctivo",
    descripcion:
      "Soluciones de mantenimiento correctivo en sitio, garantizando atención rápida y eficiente ante fallas.",
    descripcionLarga:
      "En EMINSA Servicios ofrecemos soluciones de mantenimiento correctivo en sitio, garantizando una atención rápida y eficiente ante fallas o condiciones que comprometan la operación de sus transformadores. Nuestros técnicos especializados están capacitados para intervenir directamente en campo, reduciendo tiempos de inactividad y evitando traslados innecesarios de los equipos.",
    icon: "wrench",
    beneficios: [
      "Atención rápida y eficiente en sitio",
      "Reducción de tiempos de inactividad",
      "Evita traslados innecesarios del equipo",
      "Restauración de la confiabilidad operativa",
      "Continuidad de las operaciones",
    ],
    alcance: [
      "Rehabilitación estética: aplicación de pintura y reemplazo de etiquetas",
      "Restauración y ajuste del nivel de aceite",
      "Cambio de aceite dieléctrico",
      "Detección y corrección de fugas",
      "Reemplazo de componentes críticos (bushings, inserts, respiradores, válvulas, conectores)",
    ],
  },
  {
    id: "integral",
    slug: "mantenimiento",
    nombre: "Mantenimiento Integral en Campo",
    nombreCorto: "Integral",
    descripcion:
      "Atención completa combinando inspección, ejecución y verificación final para máxima confiabilidad.",
    descripcionLarga:
      "Nuestro servicio de Mantenimiento Integral en Campo garantiza una atención completa a los transformadores, combinando inspección, ejecución y verificación final, con el fin de asegurar la máxima confiabilidad de los equipos. Este servicio está diseñado para cubrir todas las fases necesarias en el cuidado de un transformador: desde la evaluación inicial hasta la comprobación posterior al mantenimiento.",
    icon: "clipboard-check",
    beneficios: [
      "Corrección de condiciones existentes",
      "Prevención de fallas futuras",
      "Prolongación de la vida útil del equipo",
      "Optimización de la operación del sistema eléctrico",
      "Informe técnico completo",
    ],
    etapas: [
      {
        titulo: "Inspección Técnica Previa",
        descripcion:
          "Levantamiento de condiciones actuales y detección de posibles riesgos.",
      },
      {
        titulo: "Mantenimiento en Base a Hallazgos",
        descripcion:
          "Ejecución de trabajos de acuerdo con los resultados del diagnóstico inicial.",
      },
      {
        titulo: "Inspección Técnica Posterior",
        descripcion:
          "Validación del trabajo realizado y confirmación de la operatividad del transformador.",
      },
    ],
  },
  {
    id: "revisiones",
    slug: "revisiones",
    nombre: "Revisiones Técnicas y Diagnósticos",
    nombreCorto: "Revisiones",
    descripcion:
      "Evaluaciones técnicas especializadas para determinar el estado real y la vida útil restante de sus transformadores.",
    descripcionLarga:
      "Nuestro servicio de Revisiones Técnicas y Diagnósticos proporciona una evaluación exhaustiva del estado de sus transformadores. Utilizamos equipos de última generación y técnicas avanzadas de diagnóstico para determinar con precisión las condiciones operativas, identificar posibles problemas y recomendar acciones correctivas o preventivas.",
    icon: "search",
    beneficios: [
      "Diagnóstico preciso del estado del equipo",
      "Identificación temprana de problemas",
      "Datos para planificación de mantenimiento",
      "Evaluación de vida útil restante",
      "Informes técnicos detallados",
    ],
    etapas: [
      {
        titulo: "Análisis de Aceite Dieléctrico",
        descripcion:
          "Pruebas físico-químicas, cromatografía de gases disueltos y análisis de furanos.",
      },
      {
        titulo: "Pruebas Eléctricas",
        descripcion:
          "Medición de resistencia de aislamiento, factor de potencia, relación de transformación y resistencia de devanados.",
      },
      {
        titulo: "Inspección Termográfica",
        descripcion:
          "Detección de puntos calientes, conexiones flojas y componentes con sobrecalentamiento.",
      },
      {
        titulo: "Evaluación Estructural",
        descripcion:
          "Inspección del tanque, radiadores, bushings, válvulas y accesorios externos.",
      },
    ],
  },
  {
    id: "asesoria",
    slug: "asesoria",
    nombre: "Asesoría Técnica",
    nombreCorto: "Asesoría",
    descripcion:
      "Consultoría especializada para optimizar la gestión de sus activos eléctricos y maximizar el retorno de inversión.",
    descripcionLarga:
      "Nuestro equipo de ingenieros y especialistas ofrece asesoría técnica integral para ayudarle a tomar las mejores decisiones sobre sus transformadores y sistemas eléctricos. Desde la selección de equipos hasta la planificación de mantenimiento, le acompañamos en cada etapa para maximizar la eficiencia y confiabilidad de su infraestructura.",
    icon: "lightbulb",
    beneficios: [
      "Optimización de la gestión de activos",
      "Planificación estratégica de mantenimiento",
      "Selección adecuada de equipos",
      "Reducción de costos operativos",
      "Cumplimiento normativo garantizado",
    ],
  },
  {
    id: "especiales",
    slug: "especiales",
    nombre: "Servicios Especiales",
    nombreCorto: "Especiales",
    descripcion:
      "Soluciones personalizadas para requerimientos únicos que van más allá del mantenimiento convencional.",
    descripcionLarga:
      "EMINSA Servicios ofrece soluciones a medida para atender requerimientos especiales de nuestros clientes. Ya sea una reubicación de equipos, una modernización de componentes o una intervención particular, contamos con la experiencia y los recursos para ejecutar cualquier proyecto especial relacionado con transformadores eléctricos.",
    icon: "star",
    beneficios: [
      "Soluciones personalizadas",
      "Equipo técnico especializado",
      "Flexibilidad en la ejecución",
      "Gestión integral del proyecto",
      "Garantía de calidad",
    ],
  },
  {
    id: "emergencias",
    slug: "emergencias",
    nombre: "Atención a Emergencias",
    nombreCorto: "Emergencias",
    descripcion:
      "Servicio especializado de respuesta rápida ante situaciones críticas, disponible 24/7.",
    descripcionLarga:
      "Entendemos que las emergencias no tienen horario. Nuestro equipo de respuesta rápida está disponible las 24 horas del día, los 7 días de la semana, para atender cualquier situación crítica que ponga en riesgo la operación de sus transformadores. Garantizamos tiempos de respuesta mínimos y acciones efectivas para restablecer la operación normal lo antes posible.",
    icon: "alert-triangle",
    beneficios: [
      "Respuesta inmediata 24/7",
      "Equipo de emergencia dedicado",
      "Tiempos de respuesta mínimos",
      "Acciones correctivas en sitio",
      "Informes técnicos post-emergencia",
    ],
  },
  {
    id: "ingenieria",
    slug: "ingenieria",
    nombre: "Ingeniería y Gestión de Proyectos",
    nombreCorto: "Ingeniería",
    descripcion:
      "Soluciones integrales desde el diseño hasta la ejecución de proyectos eléctricos complejos.",
    descripcionLarga:
      "Nuestro departamento de ingeniería ofrece servicios completos de diseño, planificación y gestión de proyectos eléctricos. Desde subestaciones hasta sistemas de distribución, abarcamos todas las etapas del proyecto garantizando calidad, cumplimiento normativo y eficiencia en la ejecución.",
    icon: "pen-tool",
    beneficios: [
      "Diseño de instalaciones eléctricas",
      "Montajes y puesta en marcha",
      "Proyectos a gran escala",
      "Supervisión especializada",
      "Cumplimiento normativo",
    ],
    etapas: [
      {
        titulo: "Estudio y Diseño",
        descripcion:
          "Análisis de requerimientos, diseño de la solución y elaboración de planos y especificaciones técnicas.",
      },
      {
        titulo: "Planificación y Logística",
        descripcion:
          "Programación de actividades, gestión de recursos y coordinación con el cliente.",
      },
      {
        titulo: "Ejecución y Montaje",
        descripcion:
          "Instalación de equipos, cableado, conexiones y pruebas de comisionamiento.",
      },
      {
        titulo: "Puesta en Marcha",
        descripcion:
          "Energización, pruebas funcionales y entrega formal del proyecto con documentación técnica.",
      },
    ],
  },
  {
    id: "laboratorio",
    slug: "laboratorio",
    nombre: "Pruebas de Laboratorio",
    nombreCorto: "Laboratorio",
    descripcion:
      "Análisis especializado de aceite dieléctrico en alianza con SD Myers, líder mundial en diagnóstico.",
    descripcionLarga:
      "En alianza con SD Myers, líder mundial en diagnóstico de transformadores, ofrecemos un servicio completo de análisis de aceite dieléctrico y pruebas de laboratorio. Nuestros resultados permiten tomar decisiones informadas sobre el mantenimiento y la operación de sus equipos, anticipando problemas antes de que se conviertan en fallas costosas.",
    icon: "flask",
    beneficios: [
      "Análisis de gases disueltos (DGA)",
      "Rigidez dieléctrica y factor de potencia",
      "Detección de humedad y partículas",
      "Análisis de furanos (vida útil del papel)",
      "Interpretación experta de resultados",
    ],
  },
  {
    id: "alquiler",
    slug: "alquiler-transformadores",
    nombre: "Alquiler de Transformadores",
    nombreCorto: "Alquiler",
    descripcion:
      "Equipos disponibles para cubrir necesidades temporales o responder ante emergencias.",
    descripcionLarga:
      "Contamos con un amplio inventario de transformadores disponibles para alquiler temporal. Ya sea para proyectos de construcción, expansiones industriales, mantenimiento programado o emergencias, ofrecemos soluciones flexibles con entrega rápida, instalación incluida y soporte técnico 24/7.",
    icon: "truck",
    beneficios: [
      "Disponibilidad inmediata",
      "Opciones flexibles de contrato",
      "Instalación incluida",
      "Soporte técnico 24/7",
      "Alternativa costo-efectiva",
    ],
  },
];

// ================================================================
// EQUIPAMIENTO ESPECIALIZADO
// ================================================================
export interface EquipamientoEspecializado {
  id: string;
  name: string;
  description: string;
  icon: string;
  specs?: string;
}

export const equipamientoEspecializado: EquipamientoEspecializado[] = [
  {
    id: "lab",
    name: "Laboratorio de Pruebas Eléctricas",
    description: "Laboratorio equipado conforme a normas ANSI C.57 para garantizar la calidad de cada servicio",
    icon: "activity",
    specs: "Certificación ANSI C.57"
  },
  {
    id: "horno",
    name: "Horno de Secado",
    description: "Horno industrial para secado de núcleos y bobinas de transformadores",
    icon: "flame",
    specs: "Alta capacidad"
  },
  {
    id: "deshidratadores",
    name: "Deshidratadores de Aceite",
    description: "Sistema de deshidratación de aceite al vacío para purificación",
    icon: "droplets",
    specs: "1,600 GPH"
  },
  {
    id: "grua",
    name: "Puente Grúa",
    description: "Puente grúa para manejo seguro de transformadores pesados en taller",
    icon: "move",
    specs: "10 toneladas"
  },
  {
    id: "taller",
    name: "Taller de Fabricación",
    description: "Taller completo con cabina de pintura profesional para acabados de alta calidad",
    icon: "settings",
    specs: "Cabina de pintura"
  },
  {
    id: "montacargas",
    name: "Montacargas Industrial",
    description: "Montacargas de alta capacidad para manejo de equipos pesados",
    icon: "truck",
    specs: "15,000 lb"
  },
  {
    id: "almacen",
    name: "Almacén de Componentes",
    description: "Inventario completo de componentes y repuestos para disponibilidad inmediata",
    icon: "package",
    specs: "Stock permanente"
  },
  {
    id: "tanque",
    name: "Tanque de Almacenamiento",
    description: "Tanque de almacenamiento de fluido dieléctrico de gran capacidad",
    icon: "database",
    specs: "12,000 galones"
  },
];

// ================================================================
// CLASIFICACIÓN DE SERVICIOS
// ================================================================
export const serviciosPorTipo = {
  campo: [
    "preventivo",
    "correctivo",
    "integral",
    "revisiones",
    "asesoria",
    "especiales",
    "emergencias",
    "ingenieria",
  ],
  taller: [
    "laboratorio",
    "alquiler",
  ],
};

// ================================================================
// PROYECTOS DE SERVICIOS (Ejemplos)
// ================================================================
export interface ProyectoServicio {
  id: string;
  titulo: string;
  slug: string;
  cliente: string;
  ubicacion: string;
  tipoServicio: string;
  tipoProducto: string;
  descripcion: string;
  detalles: string;
  capacidad?: string;
  fechaInicio: string;
  fechaFin: string;
  destacado: boolean;
  resultados: string[];
}

export const proyectosServicios: ProyectoServicio[] = [
  {
    id: "p1",
    titulo: "Mantenimiento Preventivo - Zona Franca Industrial",
    slug: "mantenimiento-zona-franca",
    cliente: "Zona Franca Las Américas",
    ubicacion: "Santo Domingo Este, Rep. Dominicana",
    tipoServicio: "Mantenimiento Preventivo",
    tipoProducto: "Transformadores de Distribución",
    descripcion:
      "Programa integral de mantenimiento preventivo para 50 transformadores de distribución en zona franca industrial.",
    detalles:
      "Se implementó un programa de mantenimiento preventivo-predictivo que incluyó inspecciones termográficas trimestrales, análisis de aceite dieléctrico semestral, pruebas eléctricas de rutina y monitoreo continuo de condiciones operativas. El programa redujo las fallas no planificadas en un 85% durante el primer año de implementación.",
    capacidad: "50 transformadores (15-500 kVA)",
    fechaInicio: "2024-01-15",
    fechaFin: "2024-12-31",
    destacado: true,
    resultados: [
      "85% reducción en fallas no planificadas",
      "30% reducción en costos de mantenimiento",
      "Cero interrupciones críticas de servicio",
      "Extensión estimada de vida útil en 8-10 años",
    ],
  },
  {
    id: "p2",
    titulo: "Emergencia - Restauración Post-Huracán",
    slug: "restauracion-post-huracan",
    cliente: "EDENORTE",
    ubicacion: "Santiago, Rep. Dominicana",
    tipoServicio: "Emergencias",
    tipoProducto: "Transformadores Tipo Poste",
    descripcion:
      "Restauración de servicio eléctrico después del paso del huracán, incluyendo evaluación, reparación e instalación de transformadores.",
    detalles:
      "Tras el paso del huracán, se movilizó un equipo de emergencia de 25 técnicos en las primeras 6 horas. Se evaluaron 120 transformadores afectados, se repararon 85 en sitio y se reemplazaron 35 unidades con equipos de alquiler temporal. El servicio eléctrico fue restaurado al 95% en las primeras 72 horas.",
    capacidad: "120 transformadores evaluados",
    fechaInicio: "2024-09-10",
    fechaFin: "2024-09-25",
    destacado: true,
    resultados: [
      "95% de servicio restaurado en 72 horas",
      "120 transformadores evaluados",
      "85 unidades reparadas en campo",
      "35 equipos de alquiler instalados",
    ],
  },
  {
    id: "p3",
    titulo: "Ingeniería - Subestación Centro Comercial",
    slug: "subestacion-centro-comercial",
    cliente: "Ágora Mall",
    ubicacion: "Santo Domingo, DN",
    tipoServicio: "Ingeniería y Gestión de Proyectos",
    tipoProducto: "Transformadores de Subestación",
    descripcion:
      "Diseño, instalación y puesta en marcha de subestación eléctrica completa para centro comercial premium.",
    detalles:
      "Proyecto llave en mano que incluyó el diseño de la subestación, selección de equipos, gestión de permisos, instalación de 3 transformadores de 2500 kVA, sistema de distribución en media tensión, celdas Schneider Electric y sistema de monitoreo remoto. El proyecto se completó 2 semanas antes del plazo establecido.",
    capacidad: "3 x 2,500 kVA",
    fechaInicio: "2023-06-01",
    fechaFin: "2024-02-28",
    destacado: true,
    resultados: [
      "Entrega 2 semanas antes del plazo",
      "7,500 kVA de capacidad instalada",
      "Sistema de monitoreo remoto 24/7",
      "Cero incidentes de seguridad",
    ],
  },
  {
    id: "p4",
    titulo: "Mantenimiento Integral - Planta Cementera",
    slug: "mantenimiento-planta-cementera",
    cliente: "Cementos Santo Domingo",
    ubicacion: "San Cristóbal, Rep. Dominicana",
    tipoServicio: "Mantenimiento Integral",
    tipoProducto: "Transformadores de Potencia",
    descripcion:
      "Mantenimiento integral de 8 transformadores de potencia en planta de producción de cemento.",
    detalles:
      "Se realizó el mantenimiento integral de 8 transformadores de potencia (2,000-10,000 kVA) durante la parada programada de la planta. El alcance incluyó limpieza del tanque y radiadores, cambio de aceite dieléctrico, reemplazo de empaquetaduras y juntas, pruebas eléctricas completas y recubrimiento anticorrosivo exterior.",
    capacidad: "8 transformadores (2,000-10,000 kVA)",
    fechaInicio: "2024-04-15",
    fechaFin: "2024-05-30",
    destacado: false,
    resultados: [
      "8 transformadores intervenidos exitosamente",
      "Cumplimiento del programa de parada",
      "Mejora de 15% en eficiencia operativa",
      "Reducción de temperatura de operación",
    ],
  },
  {
    id: "p5",
    titulo: "Pruebas de Laboratorio - Red de Distribución",
    slug: "pruebas-red-distribucion",
    cliente: "EDESUR",
    ubicacion: "Región Sur, Rep. Dominicana",
    tipoServicio: "Pruebas de Laboratorio",
    tipoProducto: "Transformadores de Distribución",
    descripcion:
      "Campaña de muestreo y análisis de aceite dieléctrico para 200 transformadores de la red de distribución.",
    detalles:
      "En alianza con SD Myers, se ejecutó una campaña de diagnóstico que incluyó la toma de muestras de aceite de 200 transformadores, análisis de gases disueltos (DGA), rigidez dieléctrica, contenido de humedad, acidez y análisis de furanos. Los resultados permitieron priorizar 35 unidades para intervención inmediata y planificar el mantenimiento de las restantes.",
    capacidad: "200 transformadores muestreados",
    fechaInicio: "2024-02-01",
    fechaFin: "2024-04-30",
    destacado: false,
    resultados: [
      "200 muestras analizadas",
      "35 unidades priorizadas para intervención",
      "Base de datos de condiciones actualizada",
      "Plan de mantenimiento a 3 años desarrollado",
    ],
  },
  {
    id: "p6",
    titulo: "Alquiler Temporal - Proyecto Turístico",
    slug: "alquiler-proyecto-turistico",
    cliente: "Hard Rock Hotel & Casino",
    ubicacion: "Punta Cana, Rep. Dominicana",
    tipoServicio: "Alquiler de Equipos",
    tipoProducto: "Transformadores Pad Mounted",
    descripcion:
      "Suministro temporal de energía eléctrica durante la ampliación del complejo hotelero.",
    detalles:
      "Se proporcionaron 6 transformadores Pad Mounted en alquiler (225-1000 kVA) durante 8 meses para cubrir las necesidades de energía temporal durante la fase de construcción de la nueva ala del hotel. Se incluyó transporte, instalación, puesta en marcha, mantenimiento mensual y desinstalación al finalizar el proyecto.",
    capacidad: "6 transformadores (225-1,000 kVA)",
    fechaInicio: "2024-03-01",
    fechaFin: "2024-10-31",
    destacado: true,
    resultados: [
      "8 meses de servicio ininterrumpido",
      "Cero interrupciones de energía",
      "Mantenimiento mensual incluido",
      "Desinstalación limpia al finalizar",
    ],
  },
];

// ================================================================
// TESTIMONIALES
// ================================================================
export interface Testimonial {
  id: string;
  nombre: string;
  cargo: string;
  empresa: string;
  testimonio: string;
  rating: number;
  servicio: string;
  fecha: string;
  iniciales: string;
}

export const testimoniales: Testimonial[] = [
  {
    id: "t1",
    nombre: "Ing. Carlos Rodríguez",
    cargo: "Gerente de Mantenimiento",
    empresa: "Zona Franca Las Américas",
    testimonio:
      "Desde que implementamos el programa de mantenimiento preventivo con EMINSA, nuestras fallas no planificadas se redujeron en un 85%. Su equipo técnico es altamente profesional y siempre cumple con los tiempos establecidos.",
    rating: 5,
    servicio: "Mantenimiento Preventivo",
    fecha: "2024-11",
    iniciales: "CR",
  },
  {
    id: "t2",
    nombre: "Ing. María Fernández",
    cargo: "Directora de Operaciones",
    empresa: "EDENORTE",
    testimonio:
      "La respuesta de EMINSA durante la emergencia post-huracán fue excepcional. En menos de 6 horas ya tenían un equipo en el campo y en 72 horas habíamos restaurado el 95% del servicio. Son verdaderos aliados estratégicos.",
    rating: 5,
    servicio: "Emergencias",
    fecha: "2024-10",
    iniciales: "MF",
  },
  {
    id: "t3",
    nombre: "Arq. Roberto Méndez",
    cargo: "Director de Proyectos",
    empresa: "Ágora Mall",
    testimonio:
      "El proyecto de la subestación fue ejecutado de manera impecable. EMINSA no solo cumplió con todas las especificaciones técnicas, sino que entregaron 2 semanas antes del plazo. La calidad de su ingeniería es de primer nivel.",
    rating: 5,
    servicio: "Ingeniería y Proyectos",
    fecha: "2024-03",
    iniciales: "RM",
  },
  {
    id: "t4",
    nombre: "Ing. Pedro Santana",
    cargo: "Jefe de Planta",
    empresa: "Cementos Santo Domingo",
    testimonio:
      "El mantenimiento integral durante nuestra parada programada fue ejecutado con precisión militar. Los 8 transformadores quedaron en condiciones óptimas y la planta arrancó sin ningún contratiempo. Excelente servicio.",
    rating: 5,
    servicio: "Mantenimiento Integral",
    fecha: "2024-06",
    iniciales: "PS",
  },
  {
    id: "t5",
    nombre: "Ing. Ana Guzmán",
    cargo: "Supervisora de Distribución",
    empresa: "EDESUR",
    testimonio:
      "Los análisis de laboratorio de EMINSA, en alianza con SD Myers, nos permitieron identificar 35 transformadores que requerían intervención urgente. Gracias a eso evitamos fallas que nos hubieran costado millones.",
    rating: 5,
    servicio: "Pruebas de Laboratorio",
    fecha: "2024-05",
    iniciales: "AG",
  },
  {
    id: "t6",
    nombre: "Lic. Ramón Torres",
    cargo: "Gerente de Proyectos",
    empresa: "Hard Rock Hotel & Casino",
    testimonio:
      "El servicio de alquiler de transformadores fue clave para nuestro proyecto de ampliación. EMINSA nos proporcionó equipos confiables, instalación profesional y un mantenimiento impecable durante los 8 meses del contrato.",
    rating: 4,
    servicio: "Alquiler de Equipos",
    fecha: "2024-11",
    iniciales: "RT",
  },
];

// ================================================================
// CLIENTES
// ================================================================
export interface ClienteServicio {
  id: string;
  nombre: string;
  sector: string;
  serviciosContratados: string[];
}

export const clientesServicios: ClienteServicio[] = [
  {
    id: "c1",
    nombre: "EDENORTE",
    sector: "Energía y Distribución",
    serviciosContratados: ["Emergencias", "Mantenimiento Preventivo", "Alquiler"],
  },
  {
    id: "c2",
    nombre: "EDESUR",
    sector: "Energía y Distribución",
    serviciosContratados: ["Pruebas de Laboratorio", "Mantenimiento Preventivo"],
  },
  {
    id: "c3",
    nombre: "EDEESTE",
    sector: "Energía y Distribución",
    serviciosContratados: ["Mantenimiento Integral", "Emergencias"],
  },
  {
    id: "c4",
    nombre: "Zona Franca Las Américas",
    sector: "Industrial",
    serviciosContratados: ["Mantenimiento Preventivo", "Correctivo en Campo"],
  },
  {
    id: "c5",
    nombre: "Ágora Mall",
    sector: "Comercial",
    serviciosContratados: ["Ingeniería y Proyectos", "Mantenimiento Integral"],
  },
  {
    id: "c6",
    nombre: "Cementos Santo Domingo",
    sector: "Industrial",
    serviciosContratados: ["Mantenimiento Integral", "Pruebas de Laboratorio"],
  },
  {
    id: "c7",
    nombre: "Hard Rock Hotel & Casino",
    sector: "Hotelería y Turismo",
    serviciosContratados: ["Alquiler de Equipos", "Ingeniería y Proyectos"],
  },
  {
    id: "c8",
    nombre: "CESPM",
    sector: "Energía y Distribución",
    serviciosContratados: ["Mantenimiento Correctivo", "Emergencias"],
  },
  {
    id: "c9",
    nombre: "Cervecería Nacional Dominicana",
    sector: "Industrial",
    serviciosContratados: ["Mantenimiento Preventivo", "Pruebas de Laboratorio"],
  },
  {
    id: "c10",
    nombre: "Blue Mall",
    sector: "Comercial",
    serviciosContratados: ["Mantenimiento Integral", "Asesoría Técnica"],
  },
  {
    id: "c11",
    nombre: "Hospital General de la Plaza de la Salud",
    sector: "Salud",
    serviciosContratados: ["Mantenimiento Preventivo", "Emergencias"],
  },
  {
    id: "c12",
    nombre: "Grupo Ramos",
    sector: "Comercial",
    serviciosContratados: ["Mantenimiento Integral", "Alquiler de Equipos"],
  },
];

// ================================================================
// RECURSOS
// ================================================================
export interface RecursoServicio {
  id: string;
  nombre: string;
  descripcion: string;
  icon: string;
  href: string;
  tipo: "formulario" | "herramienta" | "documento" | "enlace";
}

export const recursosServicios: RecursoServicio[] = [
  {
    id: "r1",
    nombre: "Ordenar Servicio",
    descripcion:
      "Solicite un servicio de mantenimiento, reparación o inspección para sus transformadores.",
    icon: "clipboard-list",
    href: "/servicios/cotizacion",
    tipo: "formulario",
  },
  {
    id: "r2",
    nombre: "Calculadora KVA",
    descripcion:
      "Herramienta para calcular la capacidad de transformador requerida según su carga.",
    icon: "calculator",
    href: "/mtn/recursos/calculadora",
    tipo: "herramienta",
  },
  {
    id: "r3",
    nombre: "Programar Visita",
    descripcion:
      "Agende una visita técnica para evaluación en sitio de sus equipos eléctricos.",
    icon: "calendar",
    href: "/servicios/cotizacion",
    tipo: "formulario",
  },
  {
    id: "r5",
    nombre: "Términos y Condiciones",
    descripcion:
      "Conozca los términos y condiciones de nuestros servicios y contratos.",
    icon: "file-text",
    href: "#",
    tipo: "documento",
  },
  {
    id: "r6",
    nombre: "Política de Garantía",
    descripcion:
      "Información sobre nuestra política de garantía para servicios y reparaciones.",
    icon: "shield",
    href: "#",
    tipo: "documento",
  },
  {
    id: "r7",
    nombre: "Artículos y Publicaciones",
    descripcion:
      "Artículos técnicos, publicaciones y noticias del sector eléctrico.",
    icon: "newspaper",
    href: "/noticias",
    tipo: "enlace",
  },
];
