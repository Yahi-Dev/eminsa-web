"use client";

import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { Noticia, Proyecto, RecursoDescargable, noticiasEjemplo, proyectosEjemplo, recursosEjemplo } from "@/data/content";

interface ContentContextType {
  // Noticias
  noticias: Noticia[];
  agregarNoticia: (noticia: Omit<Noticia, "id">) => void;
  editarNoticia: (id: string, noticia: Partial<Noticia>) => void;
  eliminarNoticia: (id: string) => void;
  obtenerNoticia: (id: string) => Noticia | undefined;

  // Proyectos
  proyectos: Proyecto[];
  agregarProyecto: (proyecto: Omit<Proyecto, "id">) => void;
  editarProyecto: (id: string, proyecto: Partial<Proyecto>) => void;
  eliminarProyecto: (id: string) => void;
  obtenerProyecto: (id: string) => Proyecto | undefined;

  // Recursos Descargables
  recursos: RecursoDescargable[];
  agregarRecurso: (recurso: Omit<RecursoDescargable, "id">) => void;
  editarRecurso: (id: string, recurso: Partial<RecursoDescargable>) => void;
  eliminarRecurso: (id: string) => void;
  obtenerRecurso: (id: string) => RecursoDescargable | undefined;
}

const ContentContext = createContext<ContentContextType | undefined>(undefined);

export function ContentProvider({ children }: { children: ReactNode }) {
  const [noticias, setNoticias] = useState<Noticia[]>([]);
  const [proyectos, setProyectos] = useState<Proyecto[]>([]);
  const [recursos, setRecursos] = useState<RecursoDescargable[]>([]);

  // Cargar datos iniciales
  useEffect(() => {
    const savedNoticias = localStorage.getItem("eminsa_noticias");
    const savedProyectos = localStorage.getItem("eminsa_proyectos");
    const savedRecursos = localStorage.getItem("eminsa_recursos");

    if (savedNoticias) {
      try { setNoticias(JSON.parse(savedNoticias)); } catch { setNoticias(noticiasEjemplo); }
    } else {
      setNoticias(noticiasEjemplo);
    }

    if (savedProyectos) {
      try { setProyectos(JSON.parse(savedProyectos)); } catch { setProyectos(proyectosEjemplo); }
    } else {
      setProyectos(proyectosEjemplo);
    }

    if (savedRecursos) {
      try { setRecursos(JSON.parse(savedRecursos)); } catch { setRecursos(recursosEjemplo); }
    } else {
      setRecursos(recursosEjemplo);
    }
  }, []);

  // Persistir en localStorage
  useEffect(() => {
    if (noticias.length > 0) localStorage.setItem("eminsa_noticias", JSON.stringify(noticias));
  }, [noticias]);

  useEffect(() => {
    if (proyectos.length > 0) localStorage.setItem("eminsa_proyectos", JSON.stringify(proyectos));
  }, [proyectos]);

  useEffect(() => {
    localStorage.setItem("eminsa_recursos", JSON.stringify(recursos));
  }, [recursos]);

  // Noticias
  const agregarNoticia = (noticia: Omit<Noticia, "id">) => {
    setNoticias((prev) => [{ ...noticia, id: Date.now().toString() }, ...prev]);
  };
  const editarNoticia = (id: string, datos: Partial<Noticia>) => {
    setNoticias((prev) => prev.map((n) => n.id === id ? { ...n, ...datos, fechaActualizacion: new Date().toISOString().split("T")[0] } : n));
  };
  const eliminarNoticia = (id: string) => setNoticias((prev) => prev.filter((n) => n.id !== id));
  const obtenerNoticia = (id: string) => noticias.find((n) => n.id === id);

  // Proyectos
  const agregarProyecto = (proyecto: Omit<Proyecto, "id">) => {
    setProyectos((prev) => [{ ...proyecto, id: Date.now().toString() }, ...prev]);
  };
  const editarProyecto = (id: string, datos: Partial<Proyecto>) => {
    setProyectos((prev) => prev.map((p) => p.id === id ? { ...p, ...datos } : p));
  };
  const eliminarProyecto = (id: string) => setProyectos((prev) => prev.filter((p) => p.id !== id));
  const obtenerProyecto = (id: string) => proyectos.find((p) => p.id === id);

  // Recursos Descargables
  const agregarRecurso = (recurso: Omit<RecursoDescargable, "id">) => {
    setRecursos((prev) => [{ ...recurso, id: Date.now().toString() }, ...prev]);
  };
  const editarRecurso = (id: string, datos: Partial<RecursoDescargable>) => {
    setRecursos((prev) => prev.map((r) => r.id === id ? { ...r, ...datos, fechaActualizacion: new Date().toISOString().split("T")[0] } : r));
  };
  const eliminarRecurso = (id: string) => setRecursos((prev) => prev.filter((r) => r.id !== id));
  const obtenerRecurso = (id: string) => recursos.find((r) => r.id === id);

  return (
    <ContentContext.Provider
      value={{
        noticias, agregarNoticia, editarNoticia, eliminarNoticia, obtenerNoticia,
        proyectos, agregarProyecto, editarProyecto, eliminarProyecto, obtenerProyecto,
        recursos, agregarRecurso, editarRecurso, eliminarRecurso, obtenerRecurso,
      }}
    >
      {children}
    </ContentContext.Provider>
  );
}

export function useContent() {
  const context = useContext(ContentContext);
  if (context === undefined) throw new Error("useContent must be used within a ContentProvider");
  return context;
}
