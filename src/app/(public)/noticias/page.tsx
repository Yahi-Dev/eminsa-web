"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { ChevronRight, Calendar, User, ArrowRight, Star } from "lucide-react";
import { categoriasNoticias } from "@/data/content";
import type { NoticiaAPI } from "@/features/admin/types";
import { useTranslations, useLocale } from "next-intl";

function formatFecha(dateStr: string, locale: string) {
  return new Date(dateStr).toLocaleDateString(locale === "en" ? "en-US" : "es-ES", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

export default function NoticiasPage() {
  const t = useTranslations("pages");
  const locale = useLocale();
  const [noticias, setNoticias] = useState<NoticiaAPI[]>([]);
  const [loading, setLoading] = useState(true);
  const [filterCategoria, setFilterCategoria] = useState("");

  useEffect(() => {
    fetch("/api/noticias")
      .then((r) => r.json())
      .then((data) => {
        if (data.success) setNoticias(data.noticias);
      })
      .finally(() => setLoading(false));
  }, []);

  const noticiasPublicadas = noticias
    .filter((n) => n.publicado)
    .filter((n) => !filterCategoria || n.categoria === filterCategoria);

  const noticiasDestacadas = noticiasPublicadas.filter((n) => n.destacado);

  return (
    <>
      {/* Hero */}
      <section className="relative py-20 bg-gradient-to-br from-[#00269b] to-[#00175d]">
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: `linear-gradient(to right, white 1px, transparent 1px), linear-gradient(to bottom, white 1px, transparent 1px)`,
            backgroundSize: "60px 60px",
          }}
        />
        <div className="container-eminsa relative">
          <div className="flex items-center gap-2 text-white/60 text-sm mb-8">
            <Link href="/" className="hover:text-white transition-colors">{t("common.home")}</Link>
            <ChevronRight size={16} />
            <span className="text-white">{t("noticias.title")}</span>
          </div>

          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} className="max-w-2xl">
            <h1 className="text-4xl md:text-5xl xl:text-6xl font-bold text-white mb-4">{t("noticias.title")}</h1>
            <p className="text-xl text-white/80">
              {t("noticias.description")}
            </p>
          </motion.div>
        </div>
      </section>

      {/* Content */}
      <section className="py-16 bg-gray-50">
        <div className="container-eminsa">
          {/* Filters */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex flex-wrap gap-3 mb-12"
          >
            <button
              onClick={() => setFilterCategoria("")}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                !filterCategoria
                  ? "bg-[#00269b] text-white"
                  : "bg-white text-[#6d6e6d] hover:bg-gray-100"
              }`}
            >
              {t("noticias.filterAll")}
            </button>
            {categoriasNoticias.map((cat) => (
              <button
                key={cat.value}
                onClick={() => setFilterCategoria(cat.value)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                  filterCategoria === cat.value
                    ? "text-white"
                    : "bg-white text-[#6d6e6d] hover:bg-gray-100"
                }`}
                style={filterCategoria === cat.value ? { backgroundColor: cat.color } : {}}
              >
                {cat.label}
              </button>
            ))}
          </motion.div>

          {loading ? (
            <div className="flex justify-center py-16">
              <div className="w-8 h-8 border-4 border-[#00269b] border-t-transparent rounded-full animate-spin" />
            </div>
          ) : (
            <>
              {/* Featured News */}
              {noticiasDestacadas.length > 0 && !filterCategoria && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 }}
                  className="mb-12"
                >
                  <h2 className="text-2xl font-bold text-[#00269b] mb-6 flex items-center gap-2">
                    <Star className="text-yellow-500" size={24} />
                    {t("noticias.featured")}
                  </h2>
                  <div className="grid md:grid-cols-2 gap-6">
                    {noticiasDestacadas.slice(0, 2).map((noticia) => (
                      <Link key={noticia.id} href={`/noticias/${noticia.slug}`} className="group">
                        <div className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                          <div className="h-48 bg-gradient-to-br from-[#00269b] to-[#00175d] relative">
                            {noticia.imagen && (
                              <img src={noticia.imagen} alt="" className="w-full h-full object-cover" />
                            )}
                            <div className="absolute top-4 left-4">
                              <span
                                className="px-3 py-1 rounded-full text-xs font-medium text-white"
                                style={{ backgroundColor: categoriasNoticias.find((c) => c.value === noticia.categoria)?.color }}
                              >
                                {categoriasNoticias.find((c) => c.value === noticia.categoria)?.label}
                              </span>
                            </div>
                          </div>
                          <div className="p-6">
                            <h3 className="text-xl font-bold text-[#00269b] mb-2 group-hover:text-[#0099ce] transition-colors">
                              {noticia.titulo}
                            </h3>
                            <p className="text-[#6d6e6d] text-sm mb-4 line-clamp-2">{noticia.resumen}</p>
                            <div className="flex items-center justify-between text-xs text-[#6d6e6d]">
                              <div className="flex items-center gap-4">
                                <span className="flex items-center gap-1">
                                  <Calendar size={14} />
                                  {formatFecha(noticia.createdAt, locale)}
                                </span>
                                {noticia.autor && (
                                  <span className="flex items-center gap-1">
                                    <User size={14} />
                                    {noticia.autor}
                                  </span>
                                )}
                              </div>
                              <ArrowRight size={16} className="text-[#00269b] group-hover:translate-x-1 transition-transform" />
                            </div>
                          </div>
                        </div>
                      </Link>
                    ))}
                  </div>
                </motion.div>
              )}

              {/* All News */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
              >
                {!filterCategoria && noticiasDestacadas.length > 0 && (
                  <h2 className="text-2xl font-bold text-[#00269b] mb-6">{t("noticias.allNews")}</h2>
                )}

                {noticiasPublicadas.length === 0 ? (
                  <div className="text-center py-12">
                    <p className="text-[#6d6e6d]">{t("noticias.empty")}</p>
                  </div>
                ) : (
                  <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {noticiasPublicadas.map((noticia, index) => (
                      <motion.div
                        key={noticia.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 + index * 0.05 }}
                      >
                        <Link href={`/noticias/${noticia.slug}`} className="group block h-full">
                          <div className="h-full bg-white rounded-xl shadow-sm overflow-hidden hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
                            <div className="h-40 bg-gray-200 relative">
                              {noticia.imagen ? (
                                <img src={noticia.imagen} alt="" className="w-full h-full object-cover" />
                              ) : (
                                <div className="w-full h-full bg-gradient-to-br from-[#00269b]/10 to-[#0099ce]/10 flex items-center justify-center">
                                  <span className="text-[#00269b]/50 text-sm">Grupo EMINSA</span>
                                </div>
                              )}
                              <div className="absolute top-3 left-3">
                                <span
                                  className="px-2 py-1 rounded-full text-xs font-medium text-white"
                                  style={{ backgroundColor: categoriasNoticias.find((c) => c.value === noticia.categoria)?.color }}
                                >
                                  {categoriasNoticias.find((c) => c.value === noticia.categoria)?.label}
                                </span>
                              </div>
                            </div>
                            <div className="p-5">
                              <h3 className="font-bold text-[#00269b] mb-2 group-hover:text-[#0099ce] transition-colors line-clamp-2">
                                {noticia.titulo}
                              </h3>
                              <p className="text-[#6d6e6d] text-sm mb-4 line-clamp-2">{noticia.resumen}</p>
                              <div className="flex items-center gap-2 text-xs text-[#6d6e6d]">
                                <Calendar size={12} />
                                {formatFecha(noticia.createdAt, locale)}
                              </div>
                            </div>
                          </div>
                        </Link>
                      </motion.div>
                    ))}
                  </div>
                )}
              </motion.div>
            </>
          )}
        </div>
      </section>
    </>
  );
}
