export interface NoticiaAPI {
  id: number;
  slug: string;
  titulo: string;
  resumen: string;
  contenido: string;
  imagen?: string | null;
  imagenes?: unknown;
  categoria?: string | null;
  division?: string | null;
  autor?: string | null;
  publicado: boolean;
  destacado: boolean;
  scheduledAt?: string | null;
  createdAt: string;
  updatedAt: string;
}

export interface ProyectoAPI {
  id: number;
  slug: string;
  titulo: string;
  cliente?: string | null;
  division: string;
  resumen: string;
  descripcion?: string | null;
  imagen?: string | null;
  imagenes?: unknown;
  ubicacion?: string | null;
  capacidad?: string | null;
  anio?: number | null;
  publicado: boolean;
  destacado: boolean;
  scheduledAt?: string | null;
  createdAt: string;
  updatedAt: string;
}

export interface RecursoAPI {
  id: number;
  nombre: string;
  descripcion?: string | null;
  division: string;
  tipo: string;
  archivo?: string | null;
  nombreArchivo?: string | null;
  activo: boolean;
  createdAt: string;
  updatedAt: string;
}
