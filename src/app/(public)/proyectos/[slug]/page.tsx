"use client";

import { use, useEffect, useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowLeft, MapPin, Calendar, User, Zap, ChevronRight } from "lucide-react";
import type { ProyectoAPI } from "@/features/admin/types";
import { useTranslations } from "next-intl";
import Image from "next/image";
import { sanitizeContent } from "@/lib/sanitize";
import { getCldUrl } from "@/lib/cloudinary-url";
import ImageGalleryCarousel from "@/components/ui/ImageGalleryCarousel";

const divisionColors: { [key: string]: string } = {
  MTN: "#00269b",
  RST: "#0099ce",
  EIC: "#009e49",
  SRV: "#6d6e6d",
};

const divisionLabels: { [key: string]: string } = {
  MTN: "MTN",
  RST: "RST",
  EIC: "EIC",
  SRV: "Servicios",
};

export default function ProyectoSlugPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = use(params);
  const t = useTranslations("pages.proyectos.detail");
  const [proyecto, setProyecto] = useState<ProyectoAPI | null>(null);
  const [relacionados, setRelacionados] = useState<ProyectoAPI[]>([]);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    fetch(`/api/proyectos/${slug}`)
      .then((r) => r.json())
      .then((data) => {
        if (data.success && data.proyecto?.publicado) {
          setProyecto(data.proyecto);
          const div = data.proyecto.division;
          if (div) {
            fetch(`/api/proyectos?division=${div}`)
              .then((r2) => r2.json())
              .then((d2) => {
                if (d2.success) {
                  setRelacionados(
                    (d2.proyectos as ProyectoAPI[])
                      .filter((p) => p.publicado && p.slug !== slug)
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
        <div className="w-8 h-8 border-4 border-[#0099ce] border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  if (notFound || !proyecto) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-[#00269b] mb-4">{t("notFound")}</h1>
          <p className="text-[#6d6e6d] mb-8">{t("notFoundDesc")}</p>
          <Link
            href="/proyectos"
            className="inline-flex items-center gap-2 px-6 py-3 bg-[#00269b] text-white font-semibold rounded-xl"
          >
            <ArrowLeft size={18} />
            {t("backToProjects")}
          </Link>
        </div>
      </div>
    );
  }

  const divColor = divisionColors[proyecto.division] || "#00269b";
  const divLabel = divisionLabels[proyecto.division] || proyecto.division;

  // Build image list: prefer imagenes array, fallback to single imagen
  const allImages: string[] = [];
  if (Array.isArray(proyecto.imagenes)) {
    for (const img of proyecto.imagenes as Array<{ url: string; isPrincipal?: boolean } | string>) {
      if (typeof img === "string" && img) allImages.push(img);
      else if (typeof img === "object" && img?.url) allImages.push(img.url);
    }
    const principalIdx = (proyecto.imagenes as Array<{ url: string; isPrincipal?: boolean }>)
      .findIndex((i) => typeof i === "object" && i?.isPrincipal);
    if (principalIdx > 0) {
      const [principal] = allImages.splice(principalIdx, 1);
      allImages.unshift(principal);
    }
  }
  if (allImages.length === 0 && proyecto.imagen) {
    allImages.push(proyecto.imagen);
  }

  return (
    <>
      {/* Hero */}
      <section
        className="relative py-20 text-white overflow-hidden"
        style={{ background: `linear-gradient(135deg, ${divColor} 0%, ${divColor}cc 100%)` }}
      >
        <div
          className="absolute inset-0 opacity-[0.04]"
          style={{
            backgroundImage: `linear-gradient(to right, white 1px, transparent 1px), linear-gradient(to bottom, white 1px, transparent 1px)`,
            backgroundSize: "60px 60px",
          }}
        />
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-white/5 rounded-full blur-[120px] pointer-events-none" />

        <div className="container-eminsa relative">
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex items-center gap-2 text-white/60 text-sm mb-8"
          >
            <Link href="/" className="hover:text-white transition-colors">{t("breadcrumbHome")}</Link>
            <ChevronRight size={14} />
            <Link href="/proyectos" className="hover:text-white transition-colors">{t("breadcrumbProjects")}</Link>
            <ChevronRight size={14} />
            <span className="text-white/80 line-clamp-1 max-w-xs">{proyecto.titulo}</span>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-3xl"
          >
            <span
              className="inline-block px-4 py-1.5 rounded-full text-sm font-semibold mb-6"
              style={{ backgroundColor: "rgba(255,255,255,0.15)", border: "1px solid rgba(255,255,255,0.3)" }}
            >
              {divLabel}
            </span>

            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6 leading-tight">
              {proyecto.titulo}
            </h1>

            <p className="text-white/80 text-lg leading-relaxed max-w-2xl">{proyecto.resumen}</p>

            <div className="flex flex-wrap items-center gap-6 text-white/70 text-sm mt-6">
              {proyecto.ubicacion && (
                <span className="flex items-center gap-2">
                  <MapPin size={16} />
                  {proyecto.ubicacion}
                </span>
              )}
              {proyecto.cliente && (
                <span className="flex items-center gap-2">
                  <User size={16} />
                  {proyecto.cliente}
                </span>
              )}
              {proyecto.anio && (
                <span className="flex items-center gap-2">
                  <Calendar size={16} />
                  {proyecto.anio}
                </span>
              )}
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
              {allImages.length > 0 && (
                <div className="mb-10">
                  <ImageGalleryCarousel images={allImages} alt={proyecto.titulo} />
                </div>
              )}

              {proyecto.descripcion ? (
                <div
                  className="prose prose-lg max-w-none text-[#414241] leading-relaxed whitespace-pre-line
                    prose-headings:text-[#00269b] prose-headings:font-bold
                    prose-a:text-[#0099ce] prose-a:no-underline hover:prose-a:underline
                    prose-strong:text-[#00269b]"
                  dangerouslySetInnerHTML={{ __html: sanitizeContent(proyecto.descripcion) }}
                />
              ) : (
                <p className="text-[#6d6e6d] italic">{t("noDescription")}</p>
              )}

              <div className="mt-12 pt-8 border-t border-gray-100">
                <Link
                  href="/proyectos"
                  className="inline-flex items-center gap-2 text-[#00269b] font-semibold hover:gap-3 transition-all group"
                >
                  <ArrowLeft size={18} className="group-hover:-translate-x-1 transition-transform" />
                  {t("backToProjects")}
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
                <h3 className="font-bold text-[#00269b] mb-4">{t("projectDetails")}</h3>
                <dl className="space-y-4">
                  <div>
                    <dt className="text-xs text-[#6d6e6d] uppercase tracking-wide mb-1">{t("division")}</dt>
                    <dd>
                      <span
                        className="inline-block px-3 py-1 rounded-full text-white text-xs font-semibold"
                        style={{ backgroundColor: divColor }}
                      >
                        {divLabel}
                      </span>
                    </dd>
                  </div>

                  {proyecto.cliente && (
                    <div>
                      <dt className="text-xs text-[#6d6e6d] uppercase tracking-wide mb-1">{t("client")}</dt>
                      <dd className="text-sm text-[#414241] font-medium flex items-center gap-2">
                        <User size={14} className="text-[#6d6e6d]" />
                        {proyecto.cliente}
                      </dd>
                    </div>
                  )}

                  {proyecto.ubicacion && (
                    <div>
                      <dt className="text-xs text-[#6d6e6d] uppercase tracking-wide mb-1">{t("location")}</dt>
                      <dd className="text-sm text-[#414241] font-medium flex items-center gap-2">
                        <MapPin size={14} className="text-[#6d6e6d]" />
                        {proyecto.ubicacion}
                      </dd>
                    </div>
                  )}

                  {proyecto.capacidad && (
                    <div>
                      <dt className="text-xs text-[#6d6e6d] uppercase tracking-wide mb-1">{t("capacity")}</dt>
                      <dd className="text-sm text-[#414241] font-medium flex items-center gap-2">
                        <Zap size={14} className="text-[#6d6e6d]" />
                        {proyecto.capacidad}
                      </dd>
                    </div>
                  )}

                  {proyecto.anio && (
                    <div>
                      <dt className="text-xs text-[#6d6e6d] uppercase tracking-wide mb-1">{t("year")}</dt>
                      <dd className="text-sm text-[#414241] font-medium flex items-center gap-2">
                        <Calendar size={14} className="text-[#6d6e6d]" />
                        {proyecto.anio}
                      </dd>
                    </div>
                  )}
                </dl>
              </div>

              {relacionados.length > 0 && (
                <div>
                  <h3 className="font-bold text-[#00269b] mb-4">{t("relatedProjects")}</h3>
                  <div className="space-y-4">
                    {relacionados.map((rel) => (
                      <Link
                        key={rel.id}
                        href={`/proyectos/${rel.slug}`}
                        className="group block p-4 bg-white rounded-xl border border-gray-100 hover:border-[#00269b]/20 hover:shadow-md transition-all"
                      >
                        {rel.imagen && (
                          <div className="rounded-lg overflow-hidden mb-3 h-24 relative">
                            <Image
                              src={getCldUrl(rel.imagen, { width: 400, quality: "auto", format: "auto" })}
                              alt={rel.titulo}
                              fill
                              sizes="(max-width: 1024px) 50vw, 25vw"
                              className="object-cover group-hover:scale-105 transition-transform duration-300"
                            />
                          </div>
                        )}
                        <p className="font-semibold text-sm text-[#00269b] group-hover:text-[#0099ce] transition-colors line-clamp-2 mb-1">
                          {rel.titulo}
                        </p>
                        <span className="text-xs text-[#6d6e6d]">{rel.ubicacion}</span>
                      </Link>
                    ))}
                  </div>
                </div>
              )}

              <div
                className="rounded-2xl p-6 text-white text-center"
                style={{ background: `linear-gradient(135deg, ${divColor}, ${divColor}bb)` }}
              >
                <h3 className="font-bold mb-2">{t("similarProject")}</h3>
                <p className="text-white/80 text-sm mb-4">
                  {t("similarProjectDesc")}
                </p>
                <Link
                  href="/cotizar"
                  className="inline-block px-5 py-2.5 bg-white font-semibold rounded-xl text-sm transition-opacity hover:opacity-90"
                  style={{ color: divColor }}
                >
                  {t("requestQuote")}
                </Link>
              </div>
            </motion.aside>
          </div>
        </div>
      </section>
    </>
  );
}
