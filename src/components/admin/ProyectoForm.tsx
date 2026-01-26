"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowLeft, Save } from "lucide-react";
import { useContent } from "@/context/content-context";
import { divisions } from "@/config/navigation";
import { tiposProyecto, Proyecto } from "@/data/content";

interface ProyectoFormProps {
  proyecto?: Proyecto;
  isEditing?: boolean;
}

export default function ProyectoForm({ proyecto, isEditing = false }: ProyectoFormProps) {
  const router = useRouter();
  const { agregarProyecto, editarProyecto } = useContent();

  const [formData, setFormData] = useState({
    titulo: proyecto?.titulo || "",
    slug: proyecto?.slug || "",
    descripcion: proyecto?.descripcion || "",
    contenido: proyecto?.contenido || "",
    imagenPrincipal: proyecto?.imagenPrincipal || "",
    cliente: proyecto?.cliente || "",
    ubicacion: proyecto?.ubicacion || "",
    division: proyecto?.division || "mtn",
    tipoProyecto: proyecto?.tipoProyecto || "",
    fechaInicio: proyecto?.fechaInicio || "",
    fechaFin: proyecto?.fechaFin || "",
    capacidad: proyecto?.capacidad || "",
    publicado: proyecto?.publicado || false,
    destacado: proyecto?.destacado || false,
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

    if (isEditing && proyecto) {
      editarProyecto(proyecto.id, {
        ...formData,
        division: formData.division as Proyecto["division"],
        imagenes: proyecto.imagenes || [],
      });
    } else {
      agregarProyecto({
        ...formData,
        division: formData.division as Proyecto["division"],
        imagenes: [],
      });
    }

    await new Promise(resolve => setTimeout(resolve, 500));
    router.push("/admin/proyectos");
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white border-b sticky top-0 z-40">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-4">
              <Link href="/admin/proyectos" className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
                <ArrowLeft size={20} className="text-[#76777A]" />
              </Link>
              <h1 className="text-xl font-bold text-[#001689]">
                {isEditing ? "Editar Proyecto" : "Nuevo Proyecto"}
              </h1>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <motion.form
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          onSubmit={handleSubmit}
          className="bg-white rounded-xl shadow-sm overflow-hidden"
        >
          <div className="p-6 space-y-6">
            <div>
              <label className="block text-sm font-medium text-[#76777A] mb-2">Título del Proyecto *</label>
              <input
                type="text"
                name="titulo"
                value={formData.titulo}
                onChange={handleTituloChange}
                required
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#00A3E0]/30 focus:border-[#00A3E0]"
                placeholder="Nombre del proyecto"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-[#76777A] mb-2">URL Amigable (Slug)</label>
              <input
                type="text"
                name="slug"
                value={formData.slug}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#00A3E0]/30 focus:border-[#00A3E0] font-mono text-sm"
                placeholder="url-del-proyecto"
              />
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-[#76777A] mb-2">División *</label>
                <select
                  name="division"
                  value={formData.division}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#00A3E0]/30 focus:border-[#00A3E0]"
                >
                  {divisions.map((div) => (
                    <option key={div.id} value={div.id}>{div.name} - {div.fullName}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-[#76777A] mb-2">Tipo de Proyecto *</label>
                <select
                  name="tipoProyecto"
                  value={formData.tipoProyecto}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#00A3E0]/30 focus:border-[#00A3E0]"
                >
                  <option value="">Seleccionar tipo</option>
                  {tiposProyecto.map((tipo) => (
                    <option key={tipo} value={tipo}>{tipo}</option>
                  ))}
                </select>
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-[#76777A] mb-2">Cliente *</label>
                <input
                  type="text"
                  name="cliente"
                  value={formData.cliente}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#00A3E0]/30 focus:border-[#00A3E0]"
                  placeholder="Nombre del cliente"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-[#76777A] mb-2">Ubicación *</label>
                <input
                  type="text"
                  name="ubicacion"
                  value={formData.ubicacion}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#00A3E0]/30 focus:border-[#00A3E0]"
                  placeholder="Ciudad, provincia"
                />
              </div>
            </div>

            <div className="grid md:grid-cols-3 gap-6">
              <div>
                <label className="block text-sm font-medium text-[#76777A] mb-2">Fecha Inicio</label>
                <input
                  type="date"
                  name="fechaInicio"
                  value={formData.fechaInicio}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#00A3E0]/30 focus:border-[#00A3E0]"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-[#76777A] mb-2">Fecha Fin</label>
                <input
                  type="date"
                  name="fechaFin"
                  value={formData.fechaFin}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#00A3E0]/30 focus:border-[#00A3E0]"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-[#76777A] mb-2">Capacidad (kVA)</label>
                <input
                  type="text"
                  name="capacidad"
                  value={formData.capacidad}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#00A3E0]/30 focus:border-[#00A3E0]"
                  placeholder="Ej: 2500 kVA"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-[#76777A] mb-2">URL de Imagen Principal</label>
              <input
                type="url"
                name="imagenPrincipal"
                value={formData.imagenPrincipal}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#00A3E0]/30 focus:border-[#00A3E0]"
                placeholder="https://ejemplo.com/imagen.jpg"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-[#76777A] mb-2">Descripción Breve *</label>
              <textarea
                name="descripcion"
                value={formData.descripcion}
                onChange={handleChange}
                required
                rows={3}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#00A3E0]/30 focus:border-[#00A3E0] resize-none"
                placeholder="Breve descripción del proyecto"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-[#76777A] mb-2">Descripción Detallada</label>
              <textarea
                name="contenido"
                value={formData.contenido}
                onChange={handleChange}
                rows={8}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#00A3E0]/30 focus:border-[#00A3E0] resize-none"
                placeholder="Descripción completa del proyecto..."
              />
            </div>

            <div className="flex flex-wrap gap-6">
              <label className="flex items-center gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  name="publicado"
                  checked={formData.publicado}
                  onChange={handleChange}
                  className="w-5 h-5 rounded border-gray-300 text-[#00A3E0] focus:ring-[#00A3E0]"
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
                <span className="text-[#76777A]">Marcar como destacado</span>
              </label>
            </div>
          </div>

          <div className="px-6 py-4 bg-gray-50 border-t flex items-center justify-between">
            <Link
              href="/admin/proyectos"
              className="px-4 py-2 text-[#76777A] hover:text-[#001689] transition-colors"
            >
              Cancelar
            </Link>
            <button
              type="submit"
              disabled={isSubmitting}
              className="flex items-center gap-2 px-6 py-2 bg-[#00A3E0] text-white rounded-lg hover:bg-[#0091C7] transition-colors disabled:opacity-50"
            >
              {isSubmitting ? (
                <>
                  <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  Guardando...
                </>
              ) : (
                <>
                  <Save size={18} />
                  {isEditing ? "Guardar Cambios" : "Crear Proyecto"}
                </>
              )}
            </button>
          </div>
        </motion.form>
      </main>
    </div>
  );
}
