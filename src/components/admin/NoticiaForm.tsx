"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowLeft, Save, Eye } from "lucide-react";
import { useContent } from "@/lib/content-context";
import { categoriasNoticias, Noticia } from "@/data/content";

interface NoticiaFormProps {
  noticia?: Noticia;
  isEditing?: boolean;
}

export default function NoticiaForm({ noticia, isEditing = false }: NoticiaFormProps) {
  const router = useRouter();
  const { agregarNoticia, editarNoticia } = useContent();

  const [formData, setFormData] = useState({
    titulo: noticia?.titulo || "",
    slug: noticia?.slug || "",
    resumen: noticia?.resumen || "",
    contenido: noticia?.contenido || "",
    imagen: noticia?.imagen || "",
    categoria: noticia?.categoria || "empresa",
    autor: noticia?.autor || "",
    publicado: noticia?.publicado || false,
    destacado: noticia?.destacado || false,
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

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
    setFormData(prev => ({
      ...prev,
      [name]: type === "checkbox" ? (e.target as HTMLInputElement).checked : value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    const fechaHoy = new Date().toISOString().split("T")[0];

    if (isEditing && noticia) {
      editarNoticia(noticia.id, {
        ...formData,
        categoria: formData.categoria as Noticia["categoria"],
        fechaActualizacion: fechaHoy,
      });
    } else {
      agregarNoticia({
        ...formData,
        categoria: formData.categoria as Noticia["categoria"],
        fechaPublicacion: fechaHoy,
        fechaActualizacion: fechaHoy,
      });
    }

    await new Promise(resolve => setTimeout(resolve, 500));
    router.push("/admin/noticias");
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b sticky top-0 z-40">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-4">
              <Link href="/admin/noticias" className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
                <ArrowLeft size={20} className="text-[#76777A]" />
              </Link>
              <h1 className="text-xl font-bold text-[#001689]">
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
              <label className="block text-sm font-medium text-[#76777A] mb-2">
                Título *
              </label>
              <input
                type="text"
                name="titulo"
                value={formData.titulo}
                onChange={handleTituloChange}
                required
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#001689]/30 focus:border-[#001689]"
                placeholder="Título de la noticia"
              />
            </div>

            {/* Slug */}
            <div>
              <label className="block text-sm font-medium text-[#76777A] mb-2">
                URL Amigable (Slug)
              </label>
              <input
                type="text"
                name="slug"
                value={formData.slug}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#001689]/30 focus:border-[#001689] font-mono text-sm"
                placeholder="url-de-la-noticia"
              />
            </div>

            {/* Categoría y Autor */}
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-[#76777A] mb-2">
                  Categoría *
                </label>
                <select
                  name="categoria"
                  value={formData.categoria}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#001689]/30 focus:border-[#001689]"
                >
                  {categoriasNoticias.map((cat) => (
                    <option key={cat.value} value={cat.value}>{cat.label}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-[#76777A] mb-2">
                  Autor
                </label>
                <input
                  type="text"
                  name="autor"
                  value={formData.autor}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#001689]/30 focus:border-[#001689]"
                  placeholder="Nombre del autor"
                />
              </div>
            </div>

            {/* Imagen */}
            <div>
              <label className="block text-sm font-medium text-[#76777A] mb-2">
                URL de Imagen
              </label>
              <input
                type="url"
                name="imagen"
                value={formData.imagen}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#001689]/30 focus:border-[#001689]"
                placeholder="https://ejemplo.com/imagen.jpg"
              />
              <p className="text-xs text-[#76777A] mt-1">
                Ingrese la URL de la imagen o déjelo vacío para usar una imagen por defecto.
              </p>
            </div>

            {/* Resumen */}
            <div>
              <label className="block text-sm font-medium text-[#76777A] mb-2">
                Resumen *
              </label>
              <textarea
                name="resumen"
                value={formData.resumen}
                onChange={handleChange}
                required
                rows={3}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#001689]/30 focus:border-[#001689] resize-none"
                placeholder="Breve descripción de la noticia (se mostrará en la lista)"
              />
            </div>

            {/* Contenido */}
            <div>
              <label className="block text-sm font-medium text-[#76777A] mb-2">
                Contenido *
              </label>
              <textarea
                name="contenido"
                value={formData.contenido}
                onChange={handleChange}
                required
                rows={10}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#001689]/30 focus:border-[#001689] resize-none"
                placeholder="Contenido completo de la noticia..."
              />
            </div>

            {/* Opciones */}
            <div className="flex flex-wrap gap-6">
              <label className="flex items-center gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  name="publicado"
                  checked={formData.publicado}
                  onChange={handleChange}
                  className="w-5 h-5 rounded border-gray-300 text-[#001689] focus:ring-[#001689]"
                />
                <span className="text-[#76777A]">Publicar inmediatamente</span>
              </label>
              <label className="flex items-center gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  name="destacado"
                  checked={formData.destacado}
                  onChange={handleChange}
                  className="w-5 h-5 rounded border-gray-300 text-yellow-500 focus:ring-yellow-500"
                />
                <span className="text-[#76777A]">Marcar como destacada</span>
              </label>
            </div>
          </div>

          {/* Actions */}
          <div className="px-6 py-4 bg-gray-50 border-t flex items-center justify-between">
            <Link
              href="/admin/noticias"
              className="px-4 py-2 text-[#76777A] hover:text-[#001689] transition-colors"
            >
              Cancelar
            </Link>
            <button
              type="submit"
              disabled={isSubmitting}
              className="flex items-center gap-2 px-6 py-2 bg-[#001689] text-white rounded-lg hover:bg-[#000E53] transition-colors disabled:opacity-50"
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
