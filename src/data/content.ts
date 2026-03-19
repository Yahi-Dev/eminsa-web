// Tipos para el sistema de contenido

export interface Noticia {
  id: string;
  titulo: string;
  slug: string;
  resumen: string;
  contenido: string;
  imagen: string;
  categoria: "empresa" | "productos" | "servicios" | "eventos" | "industria";
  autor: string;
  fechaPublicacion: string;
  fechaActualizacion: string;
  publicado: boolean;
  destacado: boolean;
}

export interface Proyecto {
  id: string;
  titulo: string;
  slug: string;
  descripcion: string;
  contenido: string;
  imagenPrincipal: string;
  imagenes: string[];
  cliente: string;
  ubicacion: string;
  division: "mtn" | "etrys" | "eic" | "servicios";
  tipoProyecto: string;
  fechaInicio: string;
  fechaFin: string;
  capacidad?: string;
  destacado: boolean;
  publicado: boolean;
}

export interface Usuario {
  id: string;
  nombre: string;
  email: string;
  rol: "admin" | "editor";
}

export interface RecursoDescargable {
  id: string;
  nombre: string;
  descripcion: string;
  archivo: string; // URL del archivo
  tipo: "pdf" | "excel" | "word" | "imagen" | "otro";
  division: "mtn" | "etrys" | "eic" | "servicios" | "general";
  activo: boolean;
  fechaCreacion: string;
  fechaActualizacion: string;
}

export const tiposRecurso = [
  { value: "pdf", label: "PDF" },
  { value: "excel", label: "Excel" },
  { value: "word", label: "Word" },
  { value: "imagen", label: "Imagen" },
  { value: "otro", label: "Otro" },
] as const;

export const divisionesRecurso = [
  { value: "general", label: "General" },
  { value: "mtn", label: "MTN" },
  { value: "etrys", label: "RST" },
  { value: "eic", label: "EIC" },
  { value: "servicios", label: "Servicios" },
] as const;

export const recursosEjemplo: RecursoDescargable[] = [
  {
    id: "1",
    nombre: "Ficha Técnica Transformadores Tipo Poste",
    descripcion: "Especificaciones técnicas completas para transformadores tipo poste ETRYS by EMINSA.",
    archivo: "/recursos/ficha-tecnica-tipo-poste.pdf",
    tipo: "pdf",
    division: "etrys",
    activo: true,
    fechaCreacion: "2024-11-01",
    fechaActualizacion: "2024-11-01",
  },
  {
    id: "2",
    nombre: "Manual de Instalación Pad Mounted",
    descripcion: "Guía de instalación y mantenimiento para transformadores Pad Mounted.",
    archivo: "/recursos/manual-pad-mounted.pdf",
    tipo: "pdf",
    division: "etrys",
    activo: true,
    fechaCreacion: "2024-10-15",
    fechaActualizacion: "2024-10-15",
  },
  {
    id: "3",
    nombre: "Catálogo MTN 2024",
    descripcion: "Catálogo completo de transformadores nuevos MTN by EMINSA.",
    archivo: "/recursos/catalogo-mtn-2024.pdf",
    tipo: "pdf",
    division: "mtn",
    activo: true,
    fechaCreacion: "2024-09-01",
    fechaActualizacion: "2024-09-01",
  },
  {
    id: "4",
    nombre: "Política de Garantía RST",
    descripcion: "Términos y condiciones de la garantía de 18 meses ETRYS by EMINSA.",
    archivo: "/recursos/politica-garantia-rst.pdf",
    tipo: "pdf",
    division: "etrys",
    activo: false,
    fechaCreacion: "2024-08-01",
    fechaActualizacion: "2024-08-01",
  },
];

// Datos de ejemplo para noticias
export const noticiasEjemplo: Noticia[] = [
  {
    id: "1",
    titulo: "EMINSA celebra 50 años de excelencia en transformadores",
    slug: "eminsa-celebra-50-anos",
    resumen: "Grupo EMINSA conmemora medio siglo de liderazgo en el sector de transformadores eléctricos en República Dominicana y el Caribe.",
    contenido: "Contenido completo del artículo...",
    imagen: "/images/noticias/50-anos.jpg",
    categoria: "empresa",
    autor: "Departamento de Comunicaciones",
    fechaPublicacion: "2024-12-01",
    fechaActualizacion: "2024-12-01",
    publicado: true,
    destacado: true,
  },
  {
    id: "2",
    titulo: "Nueva línea de transformadores Pad Mounted de alta eficiencia",
    slug: "nueva-linea-pad-mounted",
    resumen: "Presentamos nuestra nueva línea de transformadores Pad Mounted que cumple con los estándares DOE-2016.",
    contenido: "Contenido completo del artículo...",
    imagen: "/images/noticias/pad-mounted.jpg",
    categoria: "productos",
    autor: "Departamento Técnico",
    fechaPublicacion: "2024-11-15",
    fechaActualizacion: "2024-11-15",
    publicado: true,
    destacado: false,
  },
  {
    id: "3",
    titulo: "EMINSA obtiene renovación de certificación ISO 9001:2015",
    slug: "renovacion-iso-9001",
    resumen: "Nuestra empresa renueva exitosamente la certificación internacional de gestión de calidad.",
    contenido: "Contenido completo del artículo...",
    imagen: "/images/noticias/iso-9001.jpg",
    categoria: "empresa",
    autor: "Departamento de Calidad",
    fechaPublicacion: "2024-10-20",
    fechaActualizacion: "2024-10-20",
    publicado: true,
    destacado: true,
  },
];

// Datos de ejemplo para proyectos
export const proyectosEjemplo: Proyecto[] = [
  {
    id: "1",
    titulo: "Subestación Eléctrica Centro Comercial Ágora Mall",
    slug: "subestacion-agora-mall",
    descripcion: "Instalación completa de subestación eléctrica con transformadores de 2500 kVA.",
    contenido: "Descripción detallada del proyecto...",
    imagenPrincipal: "/images/proyectos/agora-mall.jpg",
    imagenes: [],
    cliente: "Ágora Mall",
    ubicacion: "Santo Domingo, DN",
    division: "mtn",
    tipoProyecto: "Subestación",
    fechaInicio: "2024-01-15",
    fechaFin: "2024-06-30",
    capacidad: "2500 kVA",
    destacado: true,
    publicado: true,
  },
  {
    id: "2",
    titulo: "Mantenimiento Preventivo Zona Franca Las Américas",
    slug: "mantenimiento-zona-franca",
    descripcion: "Programa de mantenimiento preventivo para 50 transformadores de distribución.",
    contenido: "Descripción detallada del proyecto...",
    imagenPrincipal: "/images/proyectos/zona-franca.jpg",
    imagenes: [],
    cliente: "Zona Franca Las Américas",
    ubicacion: "Santo Domingo Este",
    division: "servicios",
    tipoProyecto: "Mantenimiento",
    fechaInicio: "2024-03-01",
    fechaFin: "2024-12-31",
    destacado: false,
    publicado: true,
  },
  {
    id: "3",
    titulo: "Reparación de Transformador 1000 kVA - CESPM",
    slug: "reparacion-cespm",
    descripcion: "Reparación y reacondicionamiento de transformador de subestación.",
    contenido: "Descripción detallada del proyecto...",
    imagenPrincipal: "/images/proyectos/cespm.jpg",
    imagenes: [],
    cliente: "CESPM",
    ubicacion: "San Pedro de Macorís",
    division: "etrys",
    tipoProyecto: "Reparación",
    fechaInicio: "2024-05-10",
    fechaFin: "2024-07-15",
    capacidad: "1000 kVA",
    destacado: true,
    publicado: true,
  },
];

// Categorías de noticias
export const categoriasNoticias = [
  { value: "empresa", label: "Empresa", color: "#00269b" },
  { value: "productos", label: "Productos", color: "#0099ce" },
  { value: "servicios", label: "Servicios", color: "#e9862c" },
  { value: "eventos", label: "Eventos", color: "#009e49" },
  { value: "industria", label: "Industria", color: "#6d6e6d" },
];

// Tipos de proyectos
export const tiposProyecto = [
  "Subestación",
  "Instalación",
  "Mantenimiento",
  "Reparación",
  "Remanufactura",
  "Ingeniería",
  "Emergencia",
  "Otro",
];
