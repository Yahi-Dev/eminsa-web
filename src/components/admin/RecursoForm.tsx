"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, Save, AlertCircle, FileText } from "lucide-react";
import FileUploadField from "@/components/admin/FileUploadField";
import type { RecursoAPI } from "@/features/admin/types";

const tiposRecurso = [
  { value: "pdf", label: "PDF", emoji: "📄" },
  { value: "doc", label: "Word", emoji: "📝" },
  { value: "xls", label: "Excel", emoji: "📊" },
  { value: "img", label: "Imagen", emoji: "🖼️" },
  { value: "link", label: "Enlace/URL", emoji: "🔗" },
];

const divisionesRecurso = [
  { value: "MTN", label: "MTN" },
  { value: "RST", label: "RST" },
  { value: "EIC", label: "EIC" },
  { value: "SRV", label: "SRV — Servicios" },
];

interface RecursoFormProps {
  recurso?: RecursoAPI;
  isEditing?: boolean;
}

export default function RecursoForm({ recurso, isEditing = false }: RecursoFormProps) {
  const router = useRouter();

  const [formData, setFormData] = useState({
    nombre: recurso?.nombre ?? "",
    descripcion: recurso?.descripcion ?? "",
    archivo: recurso?.archivo ?? "",
    nombreArchivo: recurso?.nombreArchivo ?? "",
    tipo: recurso?.tipo ?? "pdf",
    division: recurso?.division ?? "MTN",
    activo: recurso?.activo ?? true,
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [apiError, setApiError] = useState<string | null>(null);

  function handleChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) {
    const { name, value, type } = e.target;
    if (type === "checkbox") {
      const checked = (e.target as HTMLInputElement).checked;
      setFormData((prev) => ({ ...prev, [name]: checked }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  }

  function handleFileUpload(base64: string, filename: string) {
    setFormData((prev) => ({ ...prev, archivo: base64, nombreArchivo: filename }));
  }

  function handleFileClear() {
    setFormData((prev) => ({ ...prev, archivo: "", nombreArchivo: "" }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setIsSubmitting(true);
    setApiError(null);

    try {
      const url = isEditing ? `/api/recursos/${recurso!.id}` : "/api/recursos";
      const method = isEditing ? "PUT" : "POST";
      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (!res.ok || !data.success) {
        setApiError(data.error ?? "Error al guardar el recurso");
        return;
      }
      router.push("/admin/recursos");
    } catch {
      setApiError("Error de red. Intenta de nuevo.");
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="sticky top-0 z-10 bg-white border-b border-gray-200 shadow-sm">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Link
              href="/admin/recursos"
              className="p-2 rounded-lg text-gray-500 hover:text-gray-700 hover:bg-gray-100 transition-colors"
            >
              <ArrowLeft className="w-5 h-5" />
            </Link>
            <FileText className="w-5 h-5 text-[#001689]" />
            <h1 className="text-xl font-bold text-gray-900">
              {isEditing ? "Editar Recurso" : "Nuevo Recurso"}
            </h1>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {apiError && (
          <div className="mb-6 flex items-center gap-2 bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-xl">
            <AlertCircle className="w-5 h-5 flex-shrink-0" />
            <p className="text-sm">{apiError}</p>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="bg-white rounded-xl p-6 shadow-sm space-y-4">
            <h2 className="text-base font-semibold text-gray-800 mb-2">Información del Recurso</h2>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Nombre <span className="text-red-500">*</span>
              </label>
              <input
                name="nombre"
                value={formData.nombre}
                onChange={handleChange}
                required
                maxLength={200}
                placeholder="Ej. Manual de instalación de transformadores"
                className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#001689] text-sm"
              />
              <p className="text-right text-xs text-gray-400 mt-1">{formData.nombre.length}/200</p>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Descripción</label>
              <textarea
                name="descripcion"
                value={formData.descripcion}
                onChange={handleChange}
                rows={3}
                maxLength={500}
                placeholder="Breve descripción del recurso"
                className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#001689] text-sm resize-none"
              />
              <p className="text-right text-xs text-gray-400 mt-1">{formData.descripcion.length}/500</p>
            </div>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-sm space-y-4">
            <h2 className="text-base font-semibold text-gray-800 mb-2">Archivo y Clasificación</h2>

            <FileUploadField
              value={formData.archivo}
              nombreArchivo={formData.nombreArchivo}
              onChange={handleFileUpload}
              onClear={handleFileClear}
            />

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Tipo</label>
                <select
                  name="tipo"
                  value={formData.tipo}
                  onChange={handleChange}
                  className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#001689] text-sm"
                >
                  {tiposRecurso.map((t) => (
                    <option key={t.value} value={t.value}>{t.emoji} {t.label}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">División</label>
                <select
                  name="division"
                  value={formData.division}
                  onChange={handleChange}
                  className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#001689] text-sm"
                >
                  {divisionesRecurso.map((d) => (
                    <option key={d.value} value={d.value}>{d.label}</option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-sm">
            <h2 className="text-base font-semibold text-gray-800 mb-4">Estado</h2>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-700">
                  {formData.activo ? "Activo" : "Inactivo"}
                </p>
                <p className="text-xs text-gray-500">
                  {formData.activo ? "El recurso es visible y descargable" : "El recurso está oculto"}
                </p>
              </div>
              <button
                type="button"
                onClick={() => setFormData((prev) => ({ ...prev, activo: !prev.activo }))}
                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                  formData.activo ? "bg-[#001689]" : "bg-gray-200"
                }`}
              >
                <span
                  className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                    formData.activo ? "translate-x-6" : "translate-x-1"
                  }`}
                />
              </button>
            </div>
          </div>

          <div className="flex items-center justify-end gap-3 pt-2 pb-8">
            <Link
              href="/admin/recursos"
              className="px-5 py-2.5 rounded-lg border border-gray-300 text-gray-700 text-sm font-medium hover:bg-gray-50 transition-colors"
            >
              Cancelar
            </Link>
            <button
              type="submit"
              disabled={isSubmitting}
              className="flex items-center gap-2 px-6 py-2.5 rounded-lg text-white text-sm font-medium transition-colors disabled:opacity-60"
              style={{ backgroundColor: "#001689" }}
            >
              {isSubmitting ? (
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
              ) : (
                <Save className="w-4 h-4" />
              )}
              {isEditing ? "Guardar Cambios" : "Crear Recurso"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
