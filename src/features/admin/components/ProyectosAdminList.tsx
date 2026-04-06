"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Plus, Edit, Trash2, Eye, EyeOff, Search, ArrowLeft, Star, MapPin } from "lucide-react";
import type { ProyectoAPI } from "@/features/admin/types";

function getDivisionColor(division: string): string {
  switch (division) {
    case "MTN": return "#00269b";
    case "RST": return "#0099ce";
    case "EIC": return "#009e49";
    case "SRV": return "#6d6e6d";
    default: return "#00269b";
  }
}

function getDivisionLabel(division: string): string {
  switch (division) {
    case "MTN": return "MTN";
    case "RST": return "RST";
    case "EIC": return "EIC";
    case "SRV": return "SRV";
    default: return division;
  }
}

export default function ProyectosAdminList() {
  const [proyectos, setProyectos] = useState<ProyectoAPI[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterDivision, setFilterDivision] = useState("");
  const [deleteConfirm, setDeleteConfirm] = useState<number | null>(null);

  useEffect(() => {
    fetch("/api/proyectos?publicado=all")
      .then((r) => r.json())
      .then((data) => {
        if (data.success) setProyectos(data.proyectos ?? []);
      })
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  async function togglePublicado(id: number, current: boolean) {
    const res = await fetch(`/api/proyectos/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify({ publicado: !current }),
    });
    if (res.ok) {
      setProyectos((prev) =>
        prev.map((p) => (p.id === id ? { ...p, publicado: !current } : p))
      );
    }
  }

  async function toggleDestacado(id: number, current: boolean) {
    const res = await fetch(`/api/proyectos/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify({ destacado: !current }),
    });
    if (res.ok) {
      setProyectos((prev) =>
        prev.map((p) => (p.id === id ? { ...p, destacado: !current } : p))
      );
    }
  }

  async function handleDelete(id: number) {
    const res = await fetch(`/api/proyectos/${id}`, { method: "DELETE", credentials: "include" });
    if (res.ok) {
      setProyectos((prev) => prev.filter((p) => p.id !== id));
      setDeleteConfirm(null);
    }
  }

  const proyectosFiltrados = proyectos.filter((p) => {
    const matchSearch =
      !searchTerm ||
      p.titulo.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (p.cliente ?? "").toLowerCase().includes(searchTerm.toLowerCase());
    const matchDiv = !filterDivision || p.division === filterDivision;
    return matchSearch && matchDiv;
  });

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="w-8 h-8 border-4 border-[#00269b] border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="sticky top-0 z-10 bg-white border-b border-gray-200 shadow-sm">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Link href="/admin" className="p-2 rounded-lg text-gray-500 hover:bg-gray-100 transition-colors">
              <ArrowLeft className="w-5 h-5" />
            </Link>
            <h1 className="text-xl font-bold text-gray-900">Proyectos</h1>
            <span className="bg-gray-100 text-gray-600 text-xs px-2 py-0.5 rounded-full">
              {proyectos.length}
            </span>
          </div>
          <Link
            href="/admin/proyectos/nuevo"
            className="flex items-center gap-2 px-4 py-2 rounded-lg text-white text-sm font-medium"
            style={{ backgroundColor: "#0099ce" }}
          >
            <Plus className="w-4 h-4" />
            Nuevo Proyecto
          </Link>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="bg-white rounded-xl p-4 shadow-sm mb-6 flex flex-col sm:flex-row gap-3">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="text"
              placeholder="Buscar proyectos..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-9 pr-4 py-2 rounded-lg border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-[#0099ce]"
            />
          </div>
          <select
            value={filterDivision}
            onChange={(e) => setFilterDivision(e.target.value)}
            className="px-3 py-2 rounded-lg border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-[#0099ce]"
          >
            <option value="">Todas las divisiones</option>
            <option value="MTN">MTN</option>
            <option value="RST">RST</option>
            <option value="EIC">EIC</option>
            <option value="SRV">SRV</option>
          </select>
        </div>

        <div className="space-y-3">
          {proyectosFiltrados.length === 0 && (
            <div className="bg-white rounded-xl p-8 text-center text-gray-500">
              No se encontraron proyectos.
            </div>
          )}
          {proyectosFiltrados.map((proyecto) => (
            <motion.div
              key={proyecto.id}
              layout
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white rounded-xl shadow-sm overflow-hidden"
            >
              <div className="flex gap-4 p-4">
                {proyecto.imagen && (
                  <img
                    src={proyecto.imagen}
                    alt={proyecto.titulo}
                    className="w-20 h-20 object-cover rounded-lg flex-shrink-0"
                  />
                )}
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-2">
                    <div className="min-w-0">
                      <h3 className="font-semibold text-gray-900 truncate">{proyecto.titulo}</h3>
                      {proyecto.resumen && (
                        <p className="text-sm text-gray-500 mt-0.5 line-clamp-2">{proyecto.resumen}</p>
                      )}
                      <div className="flex flex-wrap items-center gap-2 mt-2">
                        <span
                          className="text-xs px-2 py-0.5 rounded-full text-white font-medium"
                          style={{ backgroundColor: getDivisionColor(proyecto.division) }}
                        >
                          {getDivisionLabel(proyecto.division)}
                        </span>
                        {proyecto.ubicacion && (
                          <span className="flex items-center gap-0.5 text-xs text-gray-500">
                            <MapPin className="w-3 h-3" />
                            {proyecto.ubicacion}
                          </span>
                        )}
                        {proyecto.cliente && (
                          <span className="text-xs text-gray-500">{proyecto.cliente}</span>
                        )}
                        {proyecto.capacidad && (
                          <span className="text-xs bg-gray-100 text-gray-600 px-2 py-0.5 rounded-full">
                            {proyecto.capacidad}
                          </span>
                        )}
                        <span
                          className={`text-xs px-2 py-0.5 rounded-full ${
                            proyecto.publicado ? "bg-green-100 text-green-700" : "bg-gray-100 text-gray-500"
                          }`}
                        >
                          {proyecto.publicado ? "Publicado" : "Borrador"}
                        </span>
                      </div>
                    </div>
                    <div className="flex items-center gap-1 flex-shrink-0">
                      <button
                        onClick={() => toggleDestacado(proyecto.id, proyecto.destacado)}
                        title="Destacado"
                        className={`p-1.5 rounded-lg transition-colors ${
                          proyecto.destacado ? "text-amber-500 bg-amber-50" : "text-gray-400 hover:text-amber-500 hover:bg-amber-50"
                        }`}
                      >
                        <Star className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => togglePublicado(proyecto.id, proyecto.publicado)}
                        title={proyecto.publicado ? "Despublicar" : "Publicar"}
                        className="p-1.5 rounded-lg text-gray-400 hover:text-[#0099ce] hover:bg-blue-50 transition-colors"
                      >
                        {proyecto.publicado ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                      </button>
                      <Link
                        href={`/admin/proyectos/${proyecto.id}/edit`}
                        className="p-1.5 rounded-lg text-gray-400 hover:text-[#0099ce] hover:bg-blue-50 transition-colors"
                      >
                        <Edit className="w-4 h-4" />
                      </Link>
                      <button
                        onClick={() => setDeleteConfirm(proyecto.id)}
                        className="p-1.5 rounded-lg text-gray-400 hover:text-red-500 hover:bg-red-50 transition-colors"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              {deleteConfirm === proyecto.id && (
                <div className="border-t border-red-100 bg-red-50 px-4 py-3 flex items-center justify-between">
                  <p className="text-sm text-red-700">¿Eliminar este proyecto?</p>
                  <div className="flex gap-2">
                    <button
                      onClick={() => setDeleteConfirm(null)}
                      className="px-3 py-1 text-xs rounded-lg border border-gray-300 text-gray-700 hover:bg-gray-50"
                    >
                      Cancelar
                    </button>
                    <button
                      onClick={() => handleDelete(proyecto.id)}
                      className="px-3 py-1 text-xs rounded-lg bg-red-500 text-white hover:bg-red-600"
                    >
                      Eliminar
                    </button>
                  </div>
                </div>
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
