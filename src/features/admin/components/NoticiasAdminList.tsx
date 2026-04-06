"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Plus, Edit, Trash2, Eye, EyeOff, Search, ArrowLeft, Star } from "lucide-react";
import type { NoticiaAPI } from "@/features/admin/types";

const categoriasNoticias = [
  { value: "empresa", label: "Empresa" },
  { value: "producto", label: "Producto" },
  { value: "proyecto", label: "Proyecto" },
  { value: "industria", label: "Industria" },
  { value: "tecnologia", label: "Tecnología" },
];

export default function NoticiasAdminList() {
  const [noticias, setNoticias] = useState<NoticiaAPI[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterCategoria, setFilterCategoria] = useState("");
  const [deleteConfirm, setDeleteConfirm] = useState<number | null>(null);

  useEffect(() => {
    fetch("/api/noticias?publicado=all")
      .then((r) => r.json())
      .then((data) => {
        if (data.success) setNoticias(data.noticias ?? []);
      })
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  async function togglePublicado(id: number, current: boolean) {
    const res = await fetch(`/api/noticias/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify({ publicado: !current }),
    });
    if (res.ok) {
      setNoticias((prev) =>
        prev.map((n) => (n.id === id ? { ...n, publicado: !current } : n))
      );
    }
  }

  async function toggleDestacado(id: number, current: boolean) {
    const res = await fetch(`/api/noticias/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify({ destacado: !current }),
    });
    if (res.ok) {
      setNoticias((prev) =>
        prev.map((n) => (n.id === id ? { ...n, destacado: !current } : n))
      );
    }
  }

  async function handleDelete(id: number) {
    const res = await fetch(`/api/noticias/${id}`, { method: "DELETE", credentials: "include" });
    if (res.ok) {
      setNoticias((prev) => prev.filter((n) => n.id !== id));
      setDeleteConfirm(null);
    }
  }

  const noticiasFiltradas = noticias.filter((n) => {
    const matchSearch =
      !searchTerm ||
      n.titulo.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (n.resumen ?? "").toLowerCase().includes(searchTerm.toLowerCase());
    const matchCat = !filterCategoria || n.categoria === filterCategoria;
    return matchSearch && matchCat;
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
            <h1 className="text-xl font-bold text-gray-900">Noticias</h1>
            <span className="bg-gray-100 text-gray-600 text-xs px-2 py-0.5 rounded-full">
              {noticias.length}
            </span>
          </div>
          <Link
            href="/admin/noticias/nueva"
            className="flex items-center gap-2 px-4 py-2 rounded-lg text-white text-sm font-medium"
            style={{ backgroundColor: "#00269b" }}
          >
            <Plus className="w-4 h-4" />
            Nueva Noticia
          </Link>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="bg-white rounded-xl p-4 shadow-sm mb-6 flex flex-col sm:flex-row gap-3">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="text"
              placeholder="Buscar noticias..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-9 pr-4 py-2 rounded-lg border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-[#00269b]"
            />
          </div>
          <select
            value={filterCategoria}
            onChange={(e) => setFilterCategoria(e.target.value)}
            className="px-3 py-2 rounded-lg border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-[#00269b]"
          >
            <option value="">Todas las categorías</option>
            {categoriasNoticias.map((c) => (
              <option key={c.value} value={c.value}>{c.label}</option>
            ))}
          </select>
        </div>

        <div className="space-y-3">
          {noticiasFiltradas.length === 0 && (
            <div className="bg-white rounded-xl p-8 text-center text-gray-500">
              No se encontraron noticias.
            </div>
          )}
          {noticiasFiltradas.map((noticia) => (
            <motion.div
              key={noticia.id}
              layout
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white rounded-xl shadow-sm overflow-hidden"
            >
              <div className="flex gap-4 p-4">
                {noticia.imagen && (
                  <img
                    src={noticia.imagen}
                    alt={noticia.titulo}
                    className="w-20 h-20 object-cover rounded-lg flex-shrink-0"
                  />
                )}
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-2">
                    <div className="min-w-0">
                      <h3 className="font-semibold text-gray-900 truncate">{noticia.titulo}</h3>
                      {noticia.resumen && (
                        <p className="text-sm text-gray-500 mt-0.5 line-clamp-2">{noticia.resumen}</p>
                      )}
                      <div className="flex flex-wrap items-center gap-2 mt-2">
                        {noticia.categoria && (
                          <span className="text-xs bg-gray-100 text-gray-600 px-2 py-0.5 rounded-full">
                            {noticia.categoria}
                          </span>
                        )}
                        <span className="text-xs text-gray-400">
                          {new Date(noticia.createdAt).toLocaleDateString("es")}
                        </span>
                        <span
                          className={`text-xs px-2 py-0.5 rounded-full ${
                            noticia.publicado ? "bg-green-100 text-green-700" : "bg-gray-100 text-gray-500"
                          }`}
                        >
                          {noticia.publicado ? "Publicado" : "Borrador"}
                        </span>
                      </div>
                    </div>
                    <div className="flex items-center gap-1 flex-shrink-0">
                      <button
                        onClick={() => toggleDestacado(noticia.id, noticia.destacado)}
                        title="Destacado"
                        className={`p-1.5 rounded-lg transition-colors ${
                          noticia.destacado ? "text-amber-500 bg-amber-50" : "text-gray-400 hover:text-amber-500 hover:bg-amber-50"
                        }`}
                      >
                        <Star className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => togglePublicado(noticia.id, noticia.publicado)}
                        title={noticia.publicado ? "Despublicar" : "Publicar"}
                        className="p-1.5 rounded-lg text-gray-400 hover:text-[#00269b] hover:bg-blue-50 transition-colors"
                      >
                        {noticia.publicado ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                      </button>
                      <Link
                        href={`/admin/noticias/${noticia.id}/edit`}
                        className="p-1.5 rounded-lg text-gray-400 hover:text-[#00269b] hover:bg-blue-50 transition-colors"
                      >
                        <Edit className="w-4 h-4" />
                      </Link>
                      <button
                        onClick={() => setDeleteConfirm(noticia.id)}
                        className="p-1.5 rounded-lg text-gray-400 hover:text-red-500 hover:bg-red-50 transition-colors"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              {deleteConfirm === noticia.id && (
                <div className="border-t border-red-100 bg-red-50 px-4 py-3 flex items-center justify-between">
                  <p className="text-sm text-red-700">¿Eliminar esta noticia?</p>
                  <div className="flex gap-2">
                    <button
                      onClick={() => setDeleteConfirm(null)}
                      className="px-3 py-1 text-xs rounded-lg border border-gray-300 text-gray-700 hover:bg-gray-50"
                    >
                      Cancelar
                    </button>
                    <button
                      onClick={() => handleDelete(noticia.id)}
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
