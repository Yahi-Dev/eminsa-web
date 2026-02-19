"use client";

import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { 
  Plus, 
  Edit, 
  Trash2, 
  Eye, 
  EyeOff,
  Search,
  ArrowLeft,
  MoreVertical,
  Star
} from "lucide-react";
import { useContent } from "@/context/content-context";
import { categoriasNoticias } from "@/data/content";

export default function AdminNoticiasPage() {
  const { noticias, eliminarNoticia, editarNoticia } = useContent();
  const [searchTerm, setSearchTerm] = useState("");
  const [filterCategoria, setFilterCategoria] = useState("");
  const [deleteConfirm, setDeleteConfirm] = useState<string | null>(null);

  const noticiasFiltradas = noticias.filter((noticia) => {
    const matchSearch = noticia.titulo.toLowerCase().includes(searchTerm.toLowerCase()) ||
                       noticia.resumen.toLowerCase().includes(searchTerm.toLowerCase());
    const matchCategoria = !filterCategoria || noticia.categoria === filterCategoria;
    return matchSearch && matchCategoria;
  });

  const handleDelete = (id: string) => {
    eliminarNoticia(id);
    setDeleteConfirm(null);
  };

  const togglePublicado = (id: string, publicado: boolean) => {
    editarNoticia(id, { publicado: !publicado });
  };

  const toggleDestacado = (id: string, destacado: boolean) => {
    editarNoticia(id, { destacado: !destacado });
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-4">
              <Link href="/admin" className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
                <ArrowLeft size={20} className="text-[#76777A]" />
              </Link>
              <h1 className="text-xl font-bold text-[#001689]">Gestionar Noticias</h1>
            </div>
            <Link
              href="/admin/noticias/nueva"
              className="flex items-center gap-2 px-4 py-2 bg-[#001689] text-white rounded-lg hover:bg-[#000E53] transition-colors"
            >
              <Plus size={18} />
              <span className="hidden sm:inline">Nueva Noticia</span>
            </Link>
          </div>
        </div>
      </header>

      {/* Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Filters */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-xl shadow-sm p-4 mb-6"
        >
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="Buscar noticias..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#001689]/30 focus:border-[#001689]"
              />
            </div>
            <select
              value={filterCategoria}
              onChange={(e) => setFilterCategoria(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#001689]/30 focus:border-[#001689]"
            >
              <option value="">Todas las categorías</option>
              {categoriasNoticias.map((cat) => (
                <option key={cat.value} value={cat.value}>{cat.label}</option>
              ))}
            </select>
          </div>
        </motion.div>

        {/* List */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-white rounded-xl shadow-sm overflow-hidden"
        >
          {noticiasFiltradas.length === 0 ? (
            <div className="p-12 text-center">
              <p className="text-[#76777A] mb-4">No se encontraron noticias</p>
              <Link
                href="/admin/noticias/nueva"
                className="inline-flex items-center gap-2 px-4 py-2 bg-[#001689] text-white rounded-lg hover:bg-[#000E53] transition-colors"
              >
                <Plus size={18} />
                Crear Primera Noticia
              </Link>
            </div>
          ) : (
            <div className="divide-y">
              {noticiasFiltradas.map((noticia) => (
                <div key={noticia.id} className="p-4 hover:bg-gray-50 transition-colors">
                  <div className="flex items-start gap-4">
                    {/* Image placeholder */}
                    <div className="w-20 h-20 bg-gray-200 rounded-lg flex-shrink-0 overflow-hidden">
                      {noticia.imagen ? (
                        <img src={noticia.imagen} alt="" className="w-full h-full object-cover" />
                      ) : (
                        <div className="w-full h-full bg-[#001689]/10 flex items-center justify-center">
                          <span className="text-[#001689] text-xs">Sin imagen</span>
                        </div>
                      )}
                    </div>

                    {/* Content */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between gap-4">
                        <div>
                          <div className="flex items-center gap-2 mb-1">
                            {noticia.destacado && (
                              <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" />
                            )}
                            <h3 className="font-semibold text-[#001689] truncate">
                              {noticia.titulo}
                            </h3>
                          </div>
                          <p className="text-[#76777A] text-sm line-clamp-2 mb-2">
                            {noticia.resumen}
                          </p>
                          <div className="flex items-center gap-3 text-xs text-[#76777A]">
                            <span 
                              className="px-2 py-1 rounded-full"
                              style={{ 
                                backgroundColor: `${categoriasNoticias.find(c => c.value === noticia.categoria)?.color}15`,
                                color: categoriasNoticias.find(c => c.value === noticia.categoria)?.color
                              }}
                            >
                              {categoriasNoticias.find(c => c.value === noticia.categoria)?.label}
                            </span>
                            <span>{noticia.fechaPublicacion}</span>
                            <span className={`flex items-center gap-1 ${noticia.publicado ? 'text-green-600' : 'text-orange-500'}`}>
                              {noticia.publicado ? <Eye size={14} /> : <EyeOff size={14} />}
                              {noticia.publicado ? 'Publicado' : 'Borrador'}
                            </span>
                          </div>
                        </div>

                        {/* Actions */}
                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => toggleDestacado(noticia.id, noticia.destacado)}
                            className={`p-2 rounded-lg transition-colors ${noticia.destacado ? 'bg-yellow-100 text-yellow-600' : 'hover:bg-gray-100 text-gray-400'}`}
                            title={noticia.destacado ? 'Quitar destacado' : 'Destacar'}
                          >
                            <Star size={18} className={noticia.destacado ? 'fill-current' : ''} />
                          </button>
                          <button
                            onClick={() => togglePublicado(noticia.id, noticia.publicado)}
                            className={`p-2 rounded-lg transition-colors ${noticia.publicado ? 'hover:bg-gray-100 text-green-600' : 'hover:bg-gray-100 text-orange-500'}`}
                            title={noticia.publicado ? 'Despublicar' : 'Publicar'}
                          >
                            {noticia.publicado ? <Eye size={18} /> : <EyeOff size={18} />}
                          </button>
                          <Link
                            href={`/admin/noticias/${noticia.id}/edit`}
                            className="p-2 hover:bg-gray-100 rounded-lg transition-colors text-[#001689]"
                            title="Editar"
                          >
                            <Edit size={18} />
                          </Link>
                          <button
                            onClick={() => setDeleteConfirm(noticia.id)}
                            className="p-2 hover:bg-red-100 rounded-lg transition-colors text-red-500"
                            title="Eliminar"
                          >
                            <Trash2 size={18} />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Delete confirmation */}
                  {deleteConfirm === noticia.id && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      className="mt-4 p-4 bg-red-50 rounded-lg"
                    >
                      <p className="text-red-800 text-sm mb-3">
                        ¿Está seguro de eliminar esta noticia? Esta acción no se puede deshacer.
                      </p>
                      <div className="flex gap-2">
                        <button
                          onClick={() => handleDelete(noticia.id)}
                          className="px-4 py-2 bg-red-600 text-white text-sm rounded-lg hover:bg-red-700 transition-colors"
                        >
                          Sí, eliminar
                        </button>
                        <button
                          onClick={() => setDeleteConfirm(null)}
                          className="px-4 py-2 bg-white text-gray-700 text-sm rounded-lg hover:bg-gray-100 transition-colors border"
                        >
                          Cancelar
                        </button>
                      </div>
                    </motion.div>
                  )}
                </div>
              ))}
            </div>
          )}
        </motion.div>
      </main>
    </div>
  );
}
