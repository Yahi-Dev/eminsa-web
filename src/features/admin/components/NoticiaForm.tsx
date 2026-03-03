"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, Save, AlertCircle } from "lucide-react";
import { categoriasNoticias } from "@/data/content";
import ImageUploadField from "@/components/admin/ImageUploadField";
import ScheduledPublishPicker from "@/components/admin/ScheduledPublishPicker";
import type { NoticiaAPI } from "@/features/admin/types";

interface NoticiaFormProps {
  noticia?: NoticiaAPI;
  isEditing?: boolean;
}

function toDatetimeLocal(isoString?: string | null): string {
  if (!isoString) return "";
  const d = new Date(isoString);
  const pad = (n: number) => String(n).padStart(2, "0");
  return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}T${pad(d.getHours())}:${pad(d.getMinutes())}`;
}

export default function NoticiaForm({ noticia, isEditing = false }: NoticiaFormProps) {
  const router = useRouter();

  const [formData, setFormData] = useState({
    titulo: noticia?.titulo || "",
    slug: noticia?.slug || "",
    resumen: noticia?.resumen || "",
    contenido: noticia?.contenido || "",
    imagen: noticia?.imagen || "",
    categoria: noticia?.categoria || "empresa",
    division: noticia?.division || "",
    autor: noticia?.autor || "",
    publicado: noticia?.publicado || false,
    destacado: noticia?.destacado || false,
    scheduledAt: toDatetimeLocal(noticia?.scheduledAt),
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [apiError, setApiError] = useState<string | null>(null);

  const generateSlug = (titulo: string) => {
    return titulo
      .toLowerCase()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-+|-+$/g, "");
  };

  const handleTituloChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const titulo = e.target.value;
    setFormData(prev => ({
      ...prev,
      titulo,
      slug: prev.slug || generateSlug(titulo),
    }));
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    if (type === "checkbox") {
      const checked = (e.target as HTMLInputElement).checked;
      setFormData(prev => ({
        ...prev,
        [name]: checked,
        // When publishing immediately, clear the scheduled date
        ...(name === "publicado" && checked ? { scheduledAt: "" } : {}),
      }));
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setApiError(null);

    try {
      const url = isEditing && noticia ? `/api/noticias/${noticia.id}` : "/api/noticias";
      const method = isEditing ? "PUT" : "POST";

      const scheduledAt = !formData.publicado && formData.scheduledAt
        ? new Date(formData.scheduledAt).toISOString()
        : null;

      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({
          ...formData,
          categoria: formData.categoria || null,
          division: formData.division || null,
          autor: formData.autor || null,
          scheduledAt,
        }),
      });

      const data = await res.json();
      if (!data.success) {
        setApiError(data.message || "Error al guardar");
        setIsSubmitting(false);
        return;
      }

      router.push("/admin/noticias");
    } catch {
      setApiError("Error de conexión. Intente nuevamente.");
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b sticky top-0 z-40">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-4">
              <Link href="/admin/noticias" className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
                <ArrowLeft size={20} className="text-[#6d6e6d]" />
              </Link>
              <h1 className="text-xl font-bold text-[#00269b]">
                {isEditing ? "Editar Noticia" : "Nueva Noticia"}
              </h1>
            </div>
          </div>
        </div>
      </header>

      {/* Form */}
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <motion.form
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          onSubmit={handleSubmit}
          className="bg-white rounded-xl shadow-sm overflow-hidden"
        >
          <div className="p-6 space-y-6">
            {/* Título */}
            <div>
              <label className="block text-sm font-medium text-[#6d6e6d] mb-2">
                Título *
              </label>
              <input
                type="text"
                name="titulo"
                value={formData.titulo}
                onChange={handleTituloChange}
                required
                maxLength={200}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#00269b]/30 focus:border-[#00269b]"
                placeholder="Título de la noticia"
              />
              <p className="text-right text-xs text-gray-400 mt-1">{formData.titulo.length}/200</p>
            </div>

            {/* Slug */}
            <div>
              <label className="block text-sm font-medium text-[#6d6e6d] mb-2">
                URL Amigable (Slug)
              </label>
              <input
                type="text"
                name="slug"
                value={formData.slug}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#00269b]/30 focus:border-[#00269b] font-mono text-sm"
                placeholder="url-de-la-noticia"
              />
            </div>

            {/* Error */}
            {apiError && (
              <div className="flex items-center gap-2 p-3 bg-red-50 border border-red-200 rounded-lg text-red-700 text-sm">
                <AlertCircle size={16} />
                {apiError}
              </div>
            )}

            {/* Categoría y Autor */}
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-[#6d6e6d] mb-2">
                  Categoría *
                </label>
                <select
                  name="categoria"
                  value={formData.categoria}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#00269b]/30 focus:border-[#00269b]"
                >
                  {categoriasNoticias.map((cat) => (
                    <option key={cat.value} value={cat.value}>{cat.label}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-[#6d6e6d] mb-2">
                  Autor
                </label>
                <input
                  type="text"
                  name="autor"
                  value={formData.autor}
                  onChange={handleChange}
                  maxLength={100}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#00269b]/30 focus:border-[#00269b]"
                  placeholder="Nombre del autor"
                />
              </div>
            </div>

            {/* División */}
            <div>
              <label className="block text-sm font-medium text-[#6d6e6d] mb-2">
                División (opcional)
              </label>
              <select
                name="division"
                value={formData.division}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#00269b]/30 focus:border-[#00269b]"
              >
                <option value="">Sin división específica</option>
                <option value="MTN">MTN — Manufactura Transformadores Nuevos</option>
                <option value="RST">RST — Reparación y Servicio de Transformadores</option>
                <option value="EIC">EIC — Eminsa International Corporation</option>
                <option value="SRV">SRV — Servicios</option>
              </select>
            </div>

            {/* Imagen */}
            <ImageUploadField
              label="Imagen"
              value={formData.imagen}
              onChange={(val) => setFormData(prev => ({ ...prev, imagen: val }))}
              accentColor="#00269b"
              folder="eminsa/noticias"
            />

            {/* Resumen */}
            <div>
              <label className="block text-sm font-medium text-[#6d6e6d] mb-2">
                Resumen *
              </label>
              <textarea
                name="resumen"
                value={formData.resumen}
                onChange={handleChange}
                required
                rows={3}
                maxLength={500}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#00269b]/30 focus:border-[#00269b] resize-none"
                placeholder="Breve descripción de la noticia (se mostrará en la lista)"
              />
              <p className="text-right text-xs text-gray-400 mt-1">{formData.resumen.length}/500</p>
            </div>

            {/* Contenido */}
            <div>
              <label className="block text-sm font-medium text-[#6d6e6d] mb-2">
                Contenido *
              </label>
              <textarea
                name="contenido"
                value={formData.contenido}
                onChange={handleChange}
                required
                rows={10}
                maxLength={20000}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#00269b]/30 focus:border-[#00269b] resize-none"
                placeholder="Contenido completo de la noticia..."
              />
              <p className="text-right text-xs text-gray-400 mt-1">{formData.contenido.length}/20000</p>
            </div>

            {/* Opciones de publicación */}
            <div className="space-y-4">
              <div className="flex flex-wrap gap-6">
                <label className="flex items-center gap-3 cursor-pointer">
                  <input
                    type="checkbox"
                    name="publicado"
                    checked={formData.publicado}
                    onChange={handleChange}
                    className="w-5 h-5 rounded border-gray-300 text-[#00269b] focus:ring-[#00269b]"
                  />
                  <span className="text-[#6d6e6d]">Publicar inmediatamente</span>
                </label>
                <label className="flex items-center gap-3 cursor-pointer">
                  <input
                    type="checkbox"
                    name="destacado"
                    checked={formData.destacado}
                    onChange={handleChange}
                    className="w-5 h-5 rounded border-gray-300 text-yellow-500 focus:ring-yellow-500"
                  />
                  <span className="text-[#6d6e6d]">Marcar como destacada</span>
                </label>
              </div>

              {/* Programar publicación — visible solo cuando NO se publica inmediatamente */}
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
                      accentColor="#00269b"
                    />
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>

          {/* Actions */}
          <div className="px-6 py-4 bg-gray-50 border-t flex items-center justify-between">
            <Link
              href="/admin/noticias"
              className="px-4 py-2 text-[#6d6e6d] hover:text-[#00269b] transition-colors"
            >
              Cancelar
            </Link>
            <button
              type="submit"
              disabled={isSubmitting}
              className="flex items-center gap-2 px-6 py-2 bg-[#00269b] text-white rounded-lg hover:bg-[#00175d] transition-colors disabled:opacity-50"
            >
              {isSubmitting ? (
                <>
                  <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  Guardando...
                </>
              ) : (
                <>
                  <Save size={18} />
                  {isEditing ? "Guardar Cambios" : "Crear Noticia"}
                </>
              )}
            </button>
          </div>
        </motion.form>
      </main>
    </div>
  );
}
