"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Plus, Edit, Trash2, Search, ArrowLeft } from "lucide-react";
import type { RecursoAPI } from "@/features/admin/types";

const tipoIcono: Record<string, string> = {
  pdf: "📄",
  doc: "📝",
  xls: "📊",
  img: "🖼️",
  link: "🔗",
};

const tiposRecurso = [
  { value: "pdf", label: "PDF" },
  { value: "doc", label: "Word" },
  { value: "xls", label: "Excel" },
  { value: "img", label: "Imagen" },
  { value: "link", label: "Enlace" },
];

const divisionesRecurso = [
  { value: "MTN", label: "MTN" },
  { value: "RST", label: "RST" },
  { value: "EIC", label: "EIC" },
  { value: "SRV", label: "Servicios" },
];

export default function RecursosAdminList() {
  const [recursos, setRecursos] = useState<RecursoAPI[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterDivision, setFilterDivision] = useState("");
  const [filterTipo, setFilterTipo] = useState("");
  const [deleteConfirm, setDeleteConfirm] = useState<number | null>(null);

  useEffect(() => {
    fetch("/api/recursos")
      .then((r) => r.json())
      .then((data) => {
        if (data.success) setRecursos(data.recursos ?? []);
      })
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  async function toggleActivo(id: number, current: boolean) {
    const res = await fetch(`/api/recursos/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ activo: !current }),
    });
    if (res.ok) {
      setRecursos((prev) =>
        prev.map((r) => (r.id === id ? { ...r, activo: !current } : r))
      );
    }
  }

  async function handleDelete(id: number) {
    const res = await fetch(`/api/recursos/${id}`, { method: "DELETE" });
    if (res.ok) {
      setRecursos((prev) => prev.filter((r) => r.id !== id));
      setDeleteConfirm(null);
    }
  }

  const recursosFiltrados = recursos.filter((r) => {
    const matchSearch =
      !searchTerm ||
      r.nombre.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (r.descripcion ?? "").toLowerCase().includes(searchTerm.toLowerCase());
    const matchDiv = !filterDivision || r.division === filterDivision;
    const matchTipo = !filterTipo || r.tipo === filterTipo;
    return matchSearch && matchDiv && matchTipo;
  });

  const total = recursos.length;
  const activos = recursos.filter((r) => r.activo).length;
  const inactivos = total - activos;
  const pdfs = recursos.filter((r) => r.tipo === "pdf").length;

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="w-8 h-8 border-4 border-[#001689] border-t-transparent rounded-full animate-spin" />
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
            <h1 className="text-xl font-bold text-gray-900">Recursos</h1>
            <span className="bg-gray-100 text-gray-600 text-xs px-2 py-0.5 rounded-full">{total}</span>
          </div>
          <Link
            href="/admin/recursos/nuevo"
            className="flex items-center gap-2 px-4 py-2 rounded-lg text-white text-sm font-medium"
            style={{ backgroundColor: "#001689" }}
          >
            <Plus className="w-4 h-4" />
            Nuevo Recurso
          </Link>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {/* Stats */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-6">
          {[
            { label: "Total", value: total, color: "#001689" },
            { label: "Activos", value: activos, color: "#00B140" },
            { label: "Inactivos", value: inactivos, color: "#696969" },
            { label: "PDFs", value: pdfs, color: "#E53E3E" },
          ].map((stat) => (
            <div key={stat.label} className="bg-white rounded-xl p-4 shadow-sm text-center">
              <div className="text-2xl font-bold" style={{ color: stat.color }}>{stat.value}</div>
              <div className="text-xs text-gray-500 mt-1">{stat.label}</div>
            </div>
          ))}
        </div>

        {/* Filters */}
        <div className="bg-white rounded-xl p-4 shadow-sm mb-6 flex flex-col sm:flex-row gap-3">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="text"
              placeholder="Buscar recursos..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-9 pr-4 py-2 rounded-lg border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-[#001689]"
            />
          </div>
          <select
            value={filterDivision}
            onChange={(e) => setFilterDivision(e.target.value)}
            className="px-3 py-2 rounded-lg border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-[#001689]"
          >
            <option value="">Todas las divisiones</option>
            {divisionesRecurso.map((d) => (
              <option key={d.value} value={d.value}>{d.label}</option>
            ))}
          </select>
          <select
            value={filterTipo}
            onChange={(e) => setFilterTipo(e.target.value)}
            className="px-3 py-2 rounded-lg border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-[#001689]"
          >
            <option value="">Todos los tipos</option>
            {tiposRecurso.map((t) => (
              <option key={t.value} value={t.value}>{t.label}</option>
            ))}
          </select>
        </div>

        {/* List */}
        <div className="space-y-3">
          {recursosFiltrados.length === 0 && (
            <div className="bg-white rounded-xl p-8 text-center text-gray-500">
              No se encontraron recursos.
            </div>
          )}
          {recursosFiltrados.map((recurso) => (
            <motion.div
              key={recurso.id}
              layout
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white rounded-xl shadow-sm overflow-hidden"
            >
              <div className="flex gap-4 p-4">
                <div className="text-3xl flex-shrink-0">{tipoIcono[recurso.tipo] ?? "📄"}</div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-2">
                    <div className="min-w-0">
                      <h3 className="font-semibold text-gray-900 truncate">{recurso.nombre}</h3>
                      {recurso.descripcion && (
                        <p className="text-sm text-gray-500 mt-0.5 line-clamp-2">{recurso.descripcion}</p>
                      )}
                      <div className="flex flex-wrap items-center gap-2 mt-2">
                        <span
                          className={`text-xs px-2 py-0.5 rounded-full ${
                            recurso.activo ? "bg-green-100 text-green-700" : "bg-gray-100 text-gray-500"
                          }`}
                        >
                          {recurso.activo ? "Activo" : "Inactivo"}
                        </span>
                        <span className="text-xs bg-blue-50 text-blue-700 px-2 py-0.5 rounded-full">
                          {recurso.division}
                        </span>
                        {recurso.nombreArchivo && (
                          <span className="text-xs text-gray-400 truncate max-w-[200px]">
                            {recurso.nombreArchivo}
                          </span>
                        )}
                      </div>
                    </div>
                    <div className="flex items-center gap-1 flex-shrink-0">
                      <button
                        onClick={() => toggleActivo(recurso.id, recurso.activo)}
                        title={recurso.activo ? "Desactivar" : "Activar"}
                        className="p-1.5 rounded-lg text-gray-400 hover:text-[#001689] hover:bg-blue-50 transition-colors text-xs font-medium"
                      >
                        {recurso.activo ? "Off" : "On"}
                      </button>
                      <Link
                        href={`/admin/recursos/${recurso.id}/edit`}
                        className="p-1.5 rounded-lg text-gray-400 hover:text-[#001689] hover:bg-blue-50 transition-colors"
                      >
                        <Edit className="w-4 h-4" />
                      </Link>
                      <button
                        onClick={() => setDeleteConfirm(recurso.id)}
                        className="p-1.5 rounded-lg text-gray-400 hover:text-red-500 hover:bg-red-50 transition-colors"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              {deleteConfirm === recurso.id && (
                <div className="border-t border-red-100 bg-red-50 px-4 py-3 flex items-center justify-between">
                  <p className="text-sm text-red-700">¿Eliminar este recurso?</p>
                  <div className="flex gap-2">
                    <button
                      onClick={() => setDeleteConfirm(null)}
                      className="px-3 py-1 text-xs rounded-lg border border-gray-300 text-gray-700 hover:bg-gray-50"
                    >
                      Cancelar
                    </button>
                    <button
                      onClick={() => handleDelete(recurso.id)}
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
