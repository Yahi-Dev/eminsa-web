"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowRight, Calendar, Newspaper } from "lucide-react";
import { useTranslations } from "next-intl";

interface Noticia {
  id: string | number;
  titulo: string;
  slug: string;
  resumen: string;
  imagen?: string | null;
  categoria: string;
  fechaPublicacion?: string | null;
  createdAt?: string;
}

const categoriaColors: Record<string, string> = {
  empresa: "#001689",
  productos: "#00A3E0",
  servicios: "#696969",
  eventos: "#00B140",
  industria: "#76777A",
};

const categoriaLabels: Record<string, string> = {
  empresa: "Empresa",
  productos: "Productos",
  servicios: "Servicios",
  eventos: "Eventos",
  industria: "Industria",
};

function formatFecha(fecha?: string | null) {
  if (!fecha) return "";
  const date = new Date(fecha);
  return date.toLocaleDateString("es-DO", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

export default function NoticiasSection() {
  const t = useTranslations("home");
  const [noticias, setNoticias] = useState<Noticia[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/noticias?publicado=true")
      .then((r) => r.json())
      .then((data: Noticia[]) => {
        setNoticias(data.slice(0, 4));
      })
      .catch(() => setNoticias([]))
      .finally(() => setLoading(false));
  }, []);

  return (
    <section className="py-20 lg:py-28 bg-white relative overflow-hidden">
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-[#001689]/3 rounded-full blur-[120px] pointer-events-none" />

      <div className="container-eminsa relative">

        {/* ── Header ──────────────────────────────────────────── */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="flex items-end justify-between mb-12"
        >
          <div>
            <span className="inline-block px-4 py-2 bg-[#001689]/10 text-[#001689] rounded-full text-sm font-semibold mb-4 uppercase">
              {t("news.sectionLabel")}
            </span>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-[#001689]">
              {t("news.title")}
            </h2>
          </div>
          <Link
            href="/noticias"
            className="hidden sm:inline-flex items-center gap-2 px-6 py-3 border-2 border-[#001689] text-[#001689] font-semibold rounded-xl hover:bg-[#001689] hover:text-white transition-all duration-300 group"
          >
            {t("news.viewAll")}
            <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
          </Link>
        </motion.div>

        {/* ── Loading skeleton ─────────────────────────────────── */}
        {loading && (
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-5">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="rounded-2xl overflow-hidden border border-gray-100 animate-pulse">
                <div className="h-44 bg-gray-100" />
                <div className="p-5 space-y-3">
                  <div className="h-3 bg-gray-100 rounded w-1/3" />
                  <div className="h-4 bg-gray-100 rounded w-full" />
                  <div className="h-4 bg-gray-100 rounded w-3/4" />
                </div>
              </div>
            ))}
          </div>
        )}

        {/* ── No noticias ──────────────────────────────────────── */}
        {!loading && noticias.length === 0 && (
          <div className="text-center py-20 text-[#76777A]">
            <Newspaper size={48} className="mx-auto mb-4 opacity-30" />
            <p className="text-lg">No hay noticias publicadas aún.</p>
          </div>
        )}

        {/* ── 4-card grid ──────────────────────────────────────── */}
        {!loading && noticias.length > 0 && (
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-5">
            {noticias.map((noticia, i) => {
              const color = categoriaColors[noticia.categoria] ?? "#001689";
              const fecha = noticia.fechaPublicacion ?? noticia.createdAt;
              return (
                <motion.div
                  key={noticia.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.45, delay: i * 0.08 }}
                >
                  <Link
                    href={`/noticias/${noticia.slug}`}
                    className="group flex flex-col rounded-2xl overflow-hidden border border-gray-100 shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-300 h-full bg-white"
                  >
                    {/* Image / Placeholder */}
                    <div
                      className="relative h-44 overflow-hidden"
                      style={{
                        background: `linear-gradient(135deg, ${color}22 0%, ${color}08 100%)`,
                      }}
                    >
                      {noticia.imagen ? (
                        <Image
                          src={noticia.imagen}
                          alt={noticia.titulo}
                          fill
                          sizes="(max-width: 768px) 100vw, 25vw"
                          className="object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                      ) : (
                        <div className="absolute inset-0 flex items-center justify-center">
                          <Newspaper
                            size={36}
                            style={{ color }}
                            className="opacity-30"
                          />
                        </div>
                      )}

                      {/* Category badge */}
                      <span
                        className="absolute top-3 left-3 px-3 py-1 rounded-full text-white text-[10px] font-bold uppercase tracking-wide"
                        style={{ backgroundColor: color }}
                      >
                        {categoriaLabels[noticia.categoria] ?? noticia.categoria}
                      </span>
                    </div>

                    {/* Content */}
                    <div className="flex flex-col flex-1 p-5 gap-3">
                      {fecha && (
                        <div className="flex items-center gap-1.5 text-[#76777A] text-xs">
                          <Calendar size={12} />
                          {formatFecha(fecha)}
                        </div>
                      )}

                      <h3 className="text-sm font-bold text-[#001689] leading-snug line-clamp-3 group-hover:text-[#00A3E0] transition-colors">
                        {noticia.titulo}
                      </h3>

                      <p className="text-xs text-[#76777A] leading-relaxed line-clamp-2 flex-1">
                        {noticia.resumen}
                      </p>

                      <span
                        className="inline-flex items-center gap-1 text-xs font-semibold mt-auto"
                        style={{ color }}
                      >
                        {t("news.readMore")}
                        <ArrowRight size={12} className="group-hover:translate-x-0.5 transition-transform" />
                      </span>
                    </div>
                  </Link>
                </motion.div>
              );
            })}
          </div>
        )}

        {/* ── Mobile CTA ───────────────────────────────────────── */}
        {!loading && noticias.length > 0 && (
          <div className="sm:hidden text-center mt-8">
            <Link
              href="/noticias"
              className="inline-flex items-center gap-2 px-6 py-3 bg-[#001689] text-white font-semibold rounded-xl"
            >
              {t("news.viewAll")}
              <ArrowRight size={18} />
            </Link>
          </div>
        )}

      </div>
    </section>
  );
}
