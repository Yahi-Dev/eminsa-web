"use client";

import { use, useEffect, useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowLeft, Calendar, User, Tag, ChevronRight } from "lucide-react";
import { categoriasNoticias } from "@/data/content";
import type { NoticiaAPI } from "@/features/admin/types";

const categoriaColors: { [key: string]: string } = {
  empresa: "#001689",
  productos: "#00A3E0",
  servicios: "#696969",
  eventos: "#00B140",
  industria: "#76777A",
};

function formatFecha(dateStr: string) {
  return new Date(dateStr).toLocaleDateString("es-ES", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

export default function NoticiaSlugPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = use(params);
  const [noticia, setNoticia] = useState<NoticiaAPI | null>(null);
  const [relacionadas, setRelacionadas] = useState<NoticiaAPI[]>([]);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    fetch(`/api/noticias/${slug}`)
      .then((r) => r.json())
      .then((data) => {
        if (data.success && data.noticia?.publicado) {
          setNoticia(data.noticia);
          const cat = data.noticia.categoria;
          if (cat) {
            fetch(`/api/noticias?categoria=${cat}`)
              .then((r2) => r2.json())
              .then((d2) => {
                if (d2.success) {
                  setRelacionadas(
                    (d2.noticias as NoticiaAPI[])
                      .filter((n) => n.publicado && n.slug !== slug)
                      .slice(0, 3)
                  );
                }
              });
          }
        } else {
          setNotFound(true);
        }
      })
      .catch(() => setNotFound(true))
      .finally(() => setLoading(false));
  }, [slug]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="w-8 h-8 border-4 border-[#001689] border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  if (notFound || !noticia) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-[#001689] mb-4">Noticia no encontrada</h1>
          <p className="text-[#76777A] mb-8">La noticia que buscas no existe o no está disponible.</p>
          <Link
            href="/noticias"
            className="inline-flex items-center gap-2 px-6 py-3 bg-[#001689] text-white font-semibold rounded-xl"
          >
            <ArrowLeft size={18} />
            Volver a Noticias
          </Link>
        </div>
      </div>
    );
  }

  const catColor = categoriaColors[noticia.categoria ?? ""] || "#001689";
  const catLabel =
    categoriasNoticias.find((c) => c.value === noticia.categoria)?.label ||
    noticia.categoria ||
    "";

  return (
    <>
      {/* Hero */}
      <section className="relative py-20 bg-gradient-to-br from-[#001689] to-[#000E53] text-white overflow-hidden">
        <div
          className="absolute inset-0 opacity-[0.04]"
          style={{
            backgroundImage: `linear-gradient(to right, white 1px, transparent 1px), linear-gradient(to bottom, white 1px, transparent 1px)`,
            backgroundSize: "60px 60px",
          }}
        />
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#00A3E0]/10 rounded-full blur-[120px] pointer-events-none" />

        <div className="container-eminsa relative">
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex items-center gap-2 text-white/60 text-sm mb-8"
          >
            <Link href="/" className="hover:text-white transition-colors">Inicio</Link>
            <ChevronRight size={14} />
            <Link href="/noticias" className="hover:text-white transition-colors">Noticias</Link>
            <ChevronRight size={14} />
            <span className="text-white/80 line-clamp-1 max-w-xs">{noticia.titulo}</span>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-3xl"
          >
            <span
              className="inline-block px-4 py-1.5 rounded-full text-sm font-semibold mb-6"
              style={{ backgroundColor: `${catColor}30`, color: "white", border: `1px solid ${catColor}60` }}
            >
              {catLabel}
            </span>

            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6 leading-tight">
              {noticia.titulo}
            </h1>

            <div className="flex flex-wrap items-center gap-6 text-white/70 text-sm">
              <span className="flex items-center gap-2">
                <Calendar size={16} />
                {formatFecha(noticia.createdAt)}
              </span>
              {noticia.autor && (
                <span className="flex items-center gap-2">
                  <User size={16} />
                  {noticia.autor}
                </span>
              )}
              <span className="flex items-center gap-2">
                <Tag size={16} />
                {catLabel}
              </span>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-16 bg-white">
        <div className="container-eminsa">
          <div className="grid lg:grid-cols-3 gap-12">
            {/* Article body */}
            <motion.article
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="lg:col-span-2"
            >
              {noticia.imagen && (
                <div className="rounded-2xl overflow-hidden mb-10 shadow-lg">
                  <img
                    src={noticia.imagen}
                    alt={noticia.titulo}
                    className="w-full h-72 md:h-96 object-cover"
                  />
                </div>
              )}

              <p className="text-lg text-[#001689] font-medium leading-relaxed mb-8 pb-8 border-b border-gray-100">
                {noticia.resumen}
              </p>

              {noticia.contenido ? (
                <div
                  className="prose prose-lg max-w-none text-[#4a4a4a] leading-relaxed
                    prose-headings:text-[#001689] prose-headings:font-bold
                    prose-a:text-[#00A3E0] prose-a:no-underline hover:prose-a:underline
                    prose-strong:text-[#001689]"
                  dangerouslySetInnerHTML={{ __html: noticia.contenido }}
                />
              ) : (
                <p className="text-[#76777A] italic">Contenido completo no disponible.</p>
              )}

              <div className="mt-12 pt-8 border-t border-gray-100">
                <Link
                  href="/noticias"
                  className="inline-flex items-center gap-2 text-[#001689] font-semibold hover:gap-3 transition-all group"
                >
                  <ArrowLeft size={18} className="group-hover:-translate-x-1 transition-transform" />
                  Volver a Noticias
                </Link>
              </div>
            </motion.article>

            {/* Sidebar */}
            <motion.aside
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
              className="lg:col-span-1 space-y-8"
            >
              <div className="bg-gray-50 rounded-2xl p-6 border border-gray-100">
                <h3 className="font-bold text-[#001689] mb-4">Información</h3>
                <dl className="space-y-3">
                  <div>
                    <dt className="text-xs text-[#76777A] uppercase tracking-wide mb-1">Categoría</dt>
                    <dd>
                      <span
                        className="inline-block px-3 py-1 rounded-full text-white text-xs font-semibold"
                        style={{ backgroundColor: catColor }}
                      >
                        {catLabel}
                      </span>
                    </dd>
                  </div>
                  <div>
                    <dt className="text-xs text-[#76777A] uppercase tracking-wide mb-1">Publicado</dt>
                    <dd className="text-sm text-[#4a4a4a] font-medium">{formatFecha(noticia.createdAt)}</dd>
                  </div>
                  {noticia.autor && (
                    <div>
                      <dt className="text-xs text-[#76777A] uppercase tracking-wide mb-1">Autor</dt>
                      <dd className="text-sm text-[#4a4a4a] font-medium">{noticia.autor}</dd>
                    </div>
                  )}
                </dl>
              </div>

              {relacionadas.length > 0 && (
                <div>
                  <h3 className="font-bold text-[#001689] mb-4">Noticias Relacionadas</h3>
                  <div className="space-y-4">
                    {relacionadas.map((rel) => (
                      <Link
                        key={rel.id}
                        href={`/noticias/${rel.slug}`}
                        className="group block p-4 bg-white rounded-xl border border-gray-100 hover:border-[#001689]/20 hover:shadow-md transition-all"
                      >
                        <p className="font-semibold text-sm text-[#001689] group-hover:text-[#00A3E0] transition-colors line-clamp-2 mb-1">
                          {rel.titulo}
                        </p>
                        <span className="text-xs text-[#76777A]">{formatFecha(rel.createdAt)}</span>
                      </Link>
                    ))}
                  </div>
                </div>
              )}

              <div
                className="rounded-2xl p-6 text-white text-center"
                style={{ background: `linear-gradient(135deg, ${catColor}, ${catColor}bb)` }}
              >
                <h3 className="font-bold mb-2">¿Necesita más información?</h3>
                <p className="text-white/80 text-sm mb-4">
                  Contáctenos para conocer más sobre nuestros productos y servicios.
                </p>
                <Link
                  href="/cotizar"
                  className="inline-block px-5 py-2.5 bg-white font-semibold rounded-xl text-sm transition-opacity hover:opacity-90"
                  style={{ color: catColor }}
                >
                  Solicitar Cotización
                </Link>
              </div>
            </motion.aside>
          </div>
        </div>
      </section>
    </>
  );
}
