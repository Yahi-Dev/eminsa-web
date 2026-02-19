"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, Save, FileText, Upload } from "lucide-react";
import { useContent } from "@/context/content-context";
import { RecursoDescargable, tiposRecurso, divisionesRecurso } from "@/data/content";

interface RecursoFormProps {
  recurso?: RecursoDescargable;
  isEditing?: boolean;
}

export default function RecursoForm({ recurso, isEditing = false }: RecursoFormProps) {
  const router = useRouter();
  const { agregarRecurso, editarRecurso } = useContent();

  const [formData, setFormData] = useState({
    nombre: recurso?.nombre || "",
    descripcion: recurso?.descripcion || "",
    archivo: recurso?.archivo || "",
    tipo: recurso?.tipo || "pdf",
    division: recurso?.division || "general",
    activo: recurso?.activo ?? true,
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value, type } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? (e.target as HTMLInputElement).checked : value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    await new Promise((r) => setTimeout(r, 600));

    const now = new Date().toISOString().split("T")[0];

    if (isEditing && recurso) {
      editarRecurso(recurso.id, { ...formData, fechaActualizacion: now });
    } else {
      agregarRecurso({
        ...formData,
        fechaCreacion: now,
        fechaActualizacion: now,
      });
    }

    router.push("/admin/recursos");
  };

  const tipoIcono: Record<string, string> = {
    pdf: "📄", excel: "📊", word: "📝", imagen: "🖼️", otro: "📎",
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b sticky top-0 z-40">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-4">
              <Link
                href="/admin/recursos"
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <ArrowLeft size={20} className="text-gray-500" />
              </Link>
              <div className="flex items-center gap-2">
                <FileText size={20} className="text-[#001689]" />
                <h1 className="text-xl font-bold text-[#001689]">
                  {isEditing ? "Editar Recurso" : "Nuevo Recurso"}
                </h1>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Form */}
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Nombre */}
          <div className="bg-white rounded-xl p-6 shadow-sm">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Información del Recurso</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Nombre <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="nombre"
                  value={formData.nombre}
                  onChange={handleChange}
                  required
                  placeholder="Ej: Ficha Técnica Transformador Tipo Poste"
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#001689] focus:border-transparent transition-all"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Descripción <span className="text-red-500">*</span>
                </label>
                <textarea
                  name="descripcion"
                  value={formData.descripcion}
                  onChange={handleChange}
                  required
                  rows={3}
                  placeholder="Breve descripción del contenido del recurso..."
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#001689] focus:border-transparent transition-all resize-none"
                />
              </div>
            </div>
          </div>

          {/* Archivo y Clasificación */}
          <div className="bg-white rounded-xl p-6 shadow-sm">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Archivo y Clasificación</h2>
            <div className="grid sm:grid-cols-2 gap-4">
              <div className="sm:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  URL del Archivo <span className="text-red-500">*</span>
                </label>
                <div className="flex gap-2">
                  <div className="relative flex-1">
                    <Upload size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                    <input
                      type="text"
                      name="archivo"
                      value={formData.archivo}
                      onChange={handleChange}
                      required
                      placeholder="/recursos/mi-documento.pdf"
                      className="w-full pl-9 pr-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#001689] focus:border-transparent transition-all"
                    />
                  </div>
                </div>
                <p className="text-xs text-gray-500 mt-1">
                  Ruta relativa desde /public (ej: /recursos/archivo.pdf) o URL completa
                </p>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Tipo de Archivo
                </label>
                <select
                  name="tipo"
                  value={formData.tipo}
                  onChange={handleChange}
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#001689] focus:border-transparent transition-all"
                >
                  {tiposRecurso.map((t) => (
                    <option key={t.value} value={t.value}>
                      {tipoIcono[t.value]} {t.label}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  División
                </label>
                <select
                  name="division"
                  value={formData.division}
                  onChange={handleChange}
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#001689] focus:border-transparent transition-all"
                >
                  {divisionesRecurso.map((d) => (
                    <option key={d.value} value={d.value}>
                      {d.label}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          {/* Estado */}
          <div className="bg-white rounded-xl p-6 shadow-sm">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Estado</h2>
            <label className="flex items-center gap-3 cursor-pointer group">
              <div className="relative">
                <input
                  type="checkbox"
                  name="activo"
                  checked={formData.activo}
                  onChange={handleChange}
                  className="sr-only"
                />
                <div className={`w-11 h-6 rounded-full transition-colors duration-200 ${formData.activo ? "bg-green-500" : "bg-gray-300"}`}>
                  <div className={`absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full shadow transition-transform duration-200 ${formData.activo ? "translate-x-5" : "translate-x-0"}`} />
                </div>
              </div>
              <div>
                <span className="font-medium text-gray-900">
                  {formData.activo ? "Activo" : "Inactivo"}
                </span>
                <p className="text-xs text-gray-500">
                  {formData.activo
                    ? "El recurso es visible en la sección de descargas"
                    : "El recurso está oculto para los usuarios"}
                </p>
              </div>
            </label>
          </div>

          {/* Actions */}
          <div className="flex gap-3 justify-end">
            <Link
              href="/admin/recursos"
              className="px-6 py-2.5 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors font-medium"
            >
              Cancelar
            </Link>
            <button
              type="submit"
              disabled={isSubmitting}
              className="flex items-center gap-2 px-6 py-2.5 bg-[#001689] text-white rounded-lg hover:bg-[#000E53] disabled:opacity-50 transition-colors font-medium"
            >
              {isSubmitting ? (
                <span className="animate-spin w-4 h-4 border-2 border-white border-t-transparent rounded-full" />
              ) : (
                <Save size={16} />
              )}
              {isSubmitting ? "Guardando..." : isEditing ? "Guardar Cambios" : "Crear Recurso"}
            </button>
          </div>
        </form>
      </main>
    </div>
  );
}
