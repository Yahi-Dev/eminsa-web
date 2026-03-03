"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, Save, AlertCircle } from "lucide-react";
import ImageUploadField from "@/components/admin/ImageUploadField";
import ScheduledPublishPicker from "@/components/admin/ScheduledPublishPicker";
import type { ProyectoAPI } from "@/features/admin/types";

const divisionOptions = [
  { value: "MTN", label: "MTN — Manufactura Transformadores Nuevos" },
  { value: "RST", label: "RST — Reparación y Servicio de Transformadores" },
  { value: "EIC", label: "EIC — Eminsa International Corporation" },
  { value: "SRV", label: "SRV — Servicios" },
];

interface ProyectoFormProps {
  proyecto?: ProyectoAPI;
  isEditing?: boolean;
}

function generateSlug(text: string): string {
  return text
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

function toDatetimeLocal(isoString?: string | null): string {
  if (!isoString) return "";
  const d = new Date(isoString);
  const pad = (n: number) => String(n).padStart(2, "0");
  return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}T${pad(d.getHours())}:${pad(d.getMinutes())}`;
}

export default function ProyectoForm({ proyecto, isEditing = false }: ProyectoFormProps) {
  const router = useRouter();

  const [formData, setFormData] = useState({
    titulo: proyecto?.titulo ?? "",
    slug: proyecto?.slug ?? "",
    resumen: proyecto?.resumen ?? "",
    descripcion: proyecto?.descripcion ?? "",
    imagen: proyecto?.imagen ?? "",
    cliente: proyecto?.cliente ?? "",
    ubicacion: proyecto?.ubicacion ?? "",
    division: proyecto?.division ?? "MTN",
    anio: proyecto?.anio ? String(proyecto.anio) : "",
    capacidad: proyecto?.capacidad ?? "",
    publicado: proyecto?.publicado ?? false,
    destacado: proyecto?.destacado ?? false,
    scheduledAt: toDatetimeLocal(proyecto?.scheduledAt),
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [apiError, setApiError] = useState<string | null>(null);

  function handleTituloChange(e: React.ChangeEvent<HTMLInputElement>) {
    const titulo = e.target.value;
    setFormData((prev) => ({
      ...prev,
      titulo,
      slug:
        prev.slug === "" || prev.slug === generateSlug(prev.titulo)
          ? generateSlug(titulo)
          : prev.slug,
    }));
  }

  function handleChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) {
    const { name, value, type } = e.target;
    if (type === "checkbox") {
      const checked = (e.target as HTMLInputElement).checked;
      setFormData((prev) => ({
        ...prev,
        [name]: checked,
        // When publishing immediately, clear the scheduled date
        ...(name === "publicado" && checked ? { scheduledAt: "" } : {}),
      }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setIsSubmitting(true);
    setApiError(null);

    const scheduledAt = !formData.publicado && formData.scheduledAt
      ? new Date(formData.scheduledAt).toISOString()
      : null;

    const body = {
      ...formData,
      anio: formData.anio ? parseInt(formData.anio, 10) : null,
      scheduledAt,
    };

    try {
      const url = isEditing ? `/api/proyectos/${proyecto!.id}` : "/api/proyectos";
      const method = isEditing ? "PUT" : "POST";
      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify(body),
      });
      const data = await res.json();
      if (!res.ok || !data.success) {
        setApiError(data.error ?? data.message ?? "Error al guardar el proyecto");
        return;
      }
      router.push("/admin/proyectos");
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
              href="/admin/proyectos"
              className="p-2 rounded-lg text-gray-500 hover:text-gray-700 hover:bg-gray-100 transition-colors"
            >
              <ArrowLeft className="w-5 h-5" />
            </Link>
            <h1 className="text-xl font-bold text-gray-900">
              {isEditing ? "Editar Proyecto" : "Nuevo Proyecto"}
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

        <motion.form
          onSubmit={handleSubmit}
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="space-y-6"
        >
          <div className="bg-white rounded-xl p-6 shadow-sm space-y-4">
            <h2 className="text-base font-semibold text-gray-800 mb-2">Información General</h2>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Título <span className="text-red-500">*</span>
              </label>
              <input
                name="titulo"
                value={formData.titulo}
                onChange={handleTituloChange}
                required
                maxLength={200}
                placeholder="Ej. Transformador de distribución 500 kVA"
                className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#0099ce] text-sm"
              />
              <p className="text-right text-xs text-gray-400 mt-1">{formData.titulo.length}/200</p>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Slug (URL)</label>
              <input
                name="slug"
                value={formData.slug}
                onChange={handleChange}
                placeholder="transformador-distribucion-500-kva"
                className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#0099ce] text-sm font-mono"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">División</label>
                <select
                  name="division"
                  value={formData.division}
                  onChange={handleChange}
                  className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#0099ce] text-sm"
                >
                  {divisionOptions.map((opt) => (
                    <option key={opt.value} value={opt.value}>{opt.label}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Año</label>
                <input
                  name="anio"
                  type="number"
                  value={formData.anio}
                  onChange={handleChange}
                  placeholder="2024"
                  min="2000"
                  max="2099"
                  className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#0099ce] text-sm"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Cliente</label>
                <input
                  name="cliente"
                  value={formData.cliente}
                  onChange={handleChange}
                  maxLength={100}
                  placeholder="Nombre del cliente"
                  className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#0099ce] text-sm"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Ubicación</label>
                <input
                  name="ubicacion"
                  value={formData.ubicacion}
                  onChange={handleChange}
                  maxLength={100}
                  placeholder="Ej. Caracas, Venezuela"
                  className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#0099ce] text-sm"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Capacidad</label>
              <input
                name="capacidad"
                value={formData.capacidad}
                onChange={handleChange}
                maxLength={100}
                placeholder="Ej. 500 kVA, 25 MVA"
                className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#0099ce] text-sm"
              />
            </div>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-sm space-y-4">
            <h2 className="text-base font-semibold text-gray-800 mb-2">Imagen Principal</h2>
            <ImageUploadField
              label="Imagen Principal"
              value={formData.imagen}
              onChange={(base64) => setFormData((prev) => ({ ...prev, imagen: base64 }))}
              folder="eminsa/proyectos"
            />
          </div>

          <div className="bg-white rounded-xl p-6 shadow-sm space-y-4">
            <h2 className="text-base font-semibold text-gray-800 mb-2">Descripción</h2>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Resumen <span className="text-red-500">*</span>
              </label>
              <textarea
                name="resumen"
                value={formData.resumen}
                onChange={handleChange}
                required
                rows={3}
                maxLength={500}
                placeholder="Breve descripción del proyecto"
                className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#0099ce] text-sm resize-none"
              />
              <p className="text-right text-xs text-gray-400 mt-1">{formData.resumen.length}/500</p>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Descripción Detallada</label>
              <textarea
                name="descripcion"
                value={formData.descripcion}
                onChange={handleChange}
                rows={8}
                maxLength={20000}
                placeholder="Descripción completa del proyecto, proceso, resultados..."
                className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#0099ce] text-sm resize-none"
              />
              <p className="text-right text-xs text-gray-400 mt-1">{formData.descripcion.length}/20000</p>
            </div>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-sm">
            <h2 className="text-base font-semibold text-gray-800 mb-4">Estado y Visibilidad</h2>
            <div className="space-y-4">
              <div className="space-y-3">
                <label className="flex items-center gap-3 cursor-pointer">
                  <input
                    type="checkbox"
                    name="publicado"
                    checked={formData.publicado}
                    onChange={handleChange}
                    className="w-4 h-4 rounded border-gray-300 text-[#0099ce] focus:ring-[#0099ce]"
                  />
                  <span className="text-sm text-gray-700">Publicado (visible en el sitio)</span>
                </label>
                <label className="flex items-center gap-3 cursor-pointer">
                  <input
                    type="checkbox"
                    name="destacado"
                    checked={formData.destacado}
                    onChange={handleChange}
                    className="w-4 h-4 rounded border-gray-300 text-[#0099ce] focus:ring-[#0099ce]"
                  />
                  <span className="text-sm text-gray-700">Destacado (aparece en sección destacada)</span>
                </label>
              </div>

              {/* Programar publicación — visible solo cuando NO está publicado */}
              <AnimatePresence>
                {!formData.publicado && (
                  <motion.div
                    key="scheduler"
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.2 }}
                    className="overflow-hidden"
                  >
                    <ScheduledPublishPicker
                      value={formData.scheduledAt}
                      onChange={(val) => setFormData(prev => ({ ...prev, scheduledAt: val }))}
                      accentColor="#0099ce"
                    />
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>

          <div className="flex items-center justify-end gap-3 pt-2 pb-8">
            <Link
              href="/admin/proyectos"
              className="px-5 py-2.5 rounded-lg border border-gray-300 text-gray-700 text-sm font-medium hover:bg-gray-50 transition-colors"
            >
              Cancelar
            </Link>
            <button
              type="submit"
              disabled={isSubmitting}
              className="flex items-center gap-2 px-6 py-2.5 rounded-lg text-white text-sm font-medium transition-colors disabled:opacity-60"
              style={{ backgroundColor: "#0099ce" }}
            >
              {isSubmitting ? (
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
              ) : (
                <Save className="w-4 h-4" />
              )}
              {isEditing ? "Guardar Cambios" : "Crear Proyecto"}
            </button>
          </div>
        </motion.form>
      </div>
    </div>
  );
}
