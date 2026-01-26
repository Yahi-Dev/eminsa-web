"use client";

import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { Noticia, Proyecto, noticiasEjemplo, proyectosEjemplo } from "@/data/content";

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
}

const ContentContext = createContext<ContentContextType | undefined>(undefined);

export function ContentProvider({ children }: { children: ReactNode }) {
  const [noticias, setNoticias] = useState<Noticia[]>([]);
  const [proyectos, setProyectos] = useState<Proyecto[]>([]);

  // Cargar datos iniciales
  useEffect(() => {
    const savedNoticias = localStorage.getItem("eminsa_noticias");
    const savedProyectos = localStorage.getItem("eminsa_proyectos");

    if (savedNoticias) {
      try {
        setNoticias(JSON.parse(savedNoticias));
      } catch {
        setNoticias(noticiasEjemplo);
      }
    } else {
      setNoticias(noticiasEjemplo);
    }

    if (savedProyectos) {
      try {
        setProyectos(JSON.parse(savedProyectos));
      } catch {
        setProyectos(proyectosEjemplo);
      }
    } else {
      setProyectos(proyectosEjemplo);
    }
  }, []);

  // Guardar cambios en localStorage
  useEffect(() => {
    if (noticias.length > 0) {
      localStorage.setItem("eminsa_noticias", JSON.stringify(noticias));
    }
  }, [noticias]);

  useEffect(() => {
    if (proyectos.length > 0) {
      localStorage.setItem("eminsa_proyectos", JSON.stringify(proyectos));
    }
  }, [proyectos]);

  // Funciones para Noticias
  const agregarNoticia = (noticia: Omit<Noticia, "id">) => {
    const nuevaNoticia: Noticia = {
      ...noticia,
      id: Date.now().toString(),
    };
    setNoticias((prev) => [nuevaNoticia, ...prev]);
  };

  const editarNoticia = (id: string, datos: Partial<Noticia>) => {
    setNoticias((prev) =>
      prev.map((n) => (n.id === id ? { ...n, ...datos, fechaActualizacion: new Date().toISOString().split("T")[0] } : n))
    );
  };

  const eliminarNoticia = (id: string) => {
    setNoticias((prev) => prev.filter((n) => n.id !== id));
  };

  const obtenerNoticia = (id: string) => {
    return noticias.find((n) => n.id === id);
  };

  // Funciones para Proyectos
  const agregarProyecto = (proyecto: Omit<Proyecto, "id">) => {
    const nuevoProyecto: Proyecto = {
      ...proyecto,
      id: Date.now().toString(),
    };
    setProyectos((prev) => [nuevoProyecto, ...prev]);
  };

  const editarProyecto = (id: string, datos: Partial<Proyecto>) => {
    setProyectos((prev) =>
      prev.map((p) => (p.id === id ? { ...p, ...datos } : p))
    );
  };

  const eliminarProyecto = (id: string) => {
    setProyectos((prev) => prev.filter((p) => p.id !== id));
  };

  const obtenerProyecto = (id: string) => {
    return proyectos.find((p) => p.id === id);
  };

  return (
    <ContentContext.Provider
      value={{
        noticias,
        agregarNoticia,
        editarNoticia,
        eliminarNoticia,
        obtenerNoticia,
        proyectos,
        agregarProyecto,
        editarProyecto,
        eliminarProyecto,
        obtenerProyecto,
      }}
    >
      {children}
    </ContentContext.Provider>
  );
}

export function useContent() {
  const context = useContext(ContentContext);
  if (context === undefined) {
    throw new Error("useContent must be used within a ContentProvider");
  }
  return context;
}
