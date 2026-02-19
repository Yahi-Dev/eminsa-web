"use client";

import { useState } from "react";
import Link from "next/link";
import { Plus, Edit, Trash2, Search, ArrowLeft, FileText, Eye, EyeOff, Download } from "lucide-react";
import { useContent } from "@/context/content-context";
import { divisionesRecurso, tiposRecurso } from "@/data/content";

const tipoIcono: Record<string, string> = {
  pdf: "📄", excel: "📊", word: "📝", imagen: "🖼️", otro: "📎",
};

export default function AdminRecursosPage() {
  const { recursos, eliminarRecurso, editarRecurso } = useContent();
  const [searchTerm, setSearchTerm] = useState("");
  const [filterDivision, setFilterDivision] = useState("");
  const [filterTipo, setFilterTipo] = useState("");
  const [deleteConfirm, setDeleteConfirm] = useState<string | null>(null);

  const recursosFiltrados = recursos.filter((r) => {
    const matchSearch =
      r.nombre.toLowerCase().includes(searchTerm.toLowerCase()) ||
      r.descripcion.toLowerCase().includes(searchTerm.toLowerCase());
    const matchDivision = !filterDivision || r.division === filterDivision;
    const matchTipo = !filterTipo || r.tipo === filterTipo;
    return matchSearch && matchDivision && matchTipo;
  });

  const handleDelete = (id: string) => {
    eliminarRecurso(id);
    setDeleteConfirm(null);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-4">
              <Link href="/admin" className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
                <ArrowLeft size={20} className="text-gray-500" />
              </Link>
              <div className="flex items-center gap-2">
                <Download size={20} className="text-[#001689]" />
                <h1 className="text-xl font-bold text-[#001689]">Recursos Descargables</h1>
              </div>
            </div>
            <Link
              href="/admin/recursos/nueva"
              className="flex items-center gap-2 px-4 py-2 bg-[#001689] text-white rounded-lg hover:bg-[#000E53] transition-colors text-sm font-medium"
            >
              <Plus size={18} />
              Nuevo Recurso
            </Link>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          {[
            { label: "Total", value: recursos.length, color: "text-[#001689]" },
            { label: "Activos", value: recursos.filter((r) => r.activo).length, color: "text-green-600" },
            { label: "Inactivos", value: recursos.filter((r) => !r.activo).length, color: "text-gray-500" },
            { label: "PDFs", value: recursos.filter((r) => r.tipo === "pdf").length, color: "text-red-500" },
          ].map((stat) => (
            <div key={stat.label} className="bg-white rounded-xl p-4 shadow-sm text-center">
              <p className={`text-2xl font-bold ${stat.color}`}>{stat.value}</p>
              <p className="text-sm text-gray-500">{stat.label}</p>
            </div>
          ))}
        </div>

        {/* Filters */}
        <div className="bg-white rounded-xl p-4 shadow-sm mb-6 flex flex-wrap gap-3">
          <div className="relative flex-1 min-w-48">
            <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Buscar recursos..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-9 pr-4 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-[#001689] focus:border-transparent"
            />
          </div>
          <select
            value={filterDivision}
            onChange={(e) => setFilterDivision(e.target.value)}
            className="px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-[#001689] focus:border-transparent"
          >
            <option value="">Todas las divisiones</option>
            {divisionesRecurso.map((d) => (
              <option key={d.value} value={d.value}>{d.label}</option>
            ))}
          </select>
          <select
            value={filterTipo}
            onChange={(e) => setFilterTipo(e.target.value)}
            className="px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-[#001689] focus:border-transparent"
          >
            <option value="">Todos los tipos</option>
            {tiposRecurso.map((t) => (
              <option key={t.value} value={t.value}>{tipoIcono[t.value]} {t.label}</option>
            ))}
          </select>
        </div>

        {/* List */}
        {recursosFiltrados.length === 0 ? (
          <div className="bg-white rounded-xl p-12 shadow-sm text-center">
            <FileText size={48} className="mx-auto text-gray-300 mb-4" />
            <p className="text-gray-500 font-medium">No se encontraron recursos</p>
            <Link href="/admin/recursos/nueva" className="inline-flex items-center gap-2 mt-4 text-[#001689] font-medium hover:underline text-sm">
              <Plus size={16} /> Crear primer recurso
            </Link>
          </div>
        ) : (
          <div className="space-y-3">
            {recursosFiltrados.map((recurso) => (
              <div
                key={recurso.id}
                className="bg-white rounded-xl p-4 shadow-sm flex items-center gap-4"
              >
                {/* Icono tipo */}
                <div className="w-12 h-12 rounded-xl bg-gray-100 flex items-center justify-center text-2xl shrink-0">
                  {tipoIcono[recurso.tipo]}
                </div>

                {/* Info */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 flex-wrap">
                    <h3 className="font-semibold text-gray-900 truncate">{recurso.nombre}</h3>
                    <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${
                      recurso.activo
                        ? "bg-green-100 text-green-700"
                        : "bg-gray-100 text-gray-500"
                    }`}>
                      {recurso.activo ? "Activo" : "Inactivo"}
                    </span>
                    <span className="text-xs px-2 py-0.5 rounded-full bg-[#001689]/10 text-[#001689] font-medium">
                      {divisionesRecurso.find((d) => d.value === recurso.division)?.label}
                    </span>
                  </div>
                  <p className="text-sm text-gray-500 truncate mt-0.5">{recurso.descripcion}</p>
                  <p className="text-xs text-gray-400 mt-0.5 truncate">{recurso.archivo}</p>
                </div>

                {/* Actions */}
                <div className="flex items-center gap-2 shrink-0">
                  <button
                    onClick={() => editarRecurso(recurso.id, { activo: !recurso.activo })}
                    className={`p-2 rounded-lg transition-colors ${
                      recurso.activo
                        ? "text-green-600 hover:bg-green-50"
                        : "text-gray-400 hover:bg-gray-100"
                    }`}
                    title={recurso.activo ? "Desactivar" : "Activar"}
                  >
                    {recurso.activo ? <Eye size={18} /> : <EyeOff size={18} />}
                  </button>
                  <Link
                    href={`/admin/recursos/${recurso.id}/edit`}
                    className="p-2 rounded-lg text-[#001689] hover:bg-[#001689]/10 transition-colors"
                    title="Editar"
                  >
                    <Edit size={18} />
                  </Link>
                  <button
                    onClick={() => setDeleteConfirm(recurso.id)}
                    className="p-2 rounded-lg text-red-500 hover:bg-red-50 transition-colors"
                    title="Eliminar"
                  >
                    <Trash2 size={18} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>

      {/* Delete Confirm Modal */}
      {deleteConfirm && (
        <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4">
          <div className="bg-white rounded-xl p-6 max-w-sm w-full shadow-xl">
            <h3 className="text-lg font-bold text-gray-900 mb-2">¿Eliminar recurso?</h3>
            <p className="text-gray-600 text-sm mb-6">Esta acción no se puede deshacer.</p>
            <div className="flex gap-3">
              <button
                onClick={() => setDeleteConfirm(null)}
                className="flex-1 px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors font-medium"
              >
                Cancelar
              </button>
              <button
                onClick={() => handleDelete(deleteConfirm)}
                className="flex-1 px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors font-medium"
              >
                Eliminar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
