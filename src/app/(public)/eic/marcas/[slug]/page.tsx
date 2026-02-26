"use client";

import React from "react";
import { notFound } from "next/navigation";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  ArrowRight,
  ChevronRight,
  Home,
  CheckCircle2,
  MapPin,
  Phone,
  MessageCircle,
  Mail,
  Globe,
  Download,
  FileText,
  BookOpen,
  Zap,
  Cable,
  Grid3X3,
  Shield,
  Plug,
  ExternalLink,
} from "lucide-react";
import {
  getEICBrandBySlug,
  getEICProductsByBrand,
  getEICCategoryBySlug,
  eicProductCategories,
} from "@/config/eic-data";
import { contactInfo } from "@/config/navigation";
import { getWhatsAppUrl } from "@/utils/whatsapp";

// ─────────────────────────────────────────────────────────────────────────────
// Country flags map
// ─────────────────────────────────────────────────────────────────────────────
const countryFlags: { [key: string]: string } = {
  Ecuador: "🇪🇨",
  "Canadá / Norteamérica": "🇨🇦",
  Italia: "🇮🇹",
  España: "🇪🇸",
  "Estados Unidos": "🇺🇸",
  Portugal: "🇵🇹",
  "Francia / Global": "🇫🇷",
  Internacional: "🌍",
};

const categoryIcons: { [key: string]: React.ElementType } = {
  zap: Zap,
  cable: Cable,
  "grid-3x3": Grid3X3,
  shield: Shield,
  plug: Plug,
};

// ─────────────────────────────────────────────────────────────────────────────
// Download button helper
// ─────────────────────────────────────────────────────────────────────────────
function DownloadButton({
  url,
  label,
  brandSlug,
  productSlug,
  variant = "outline",
}: {
  url?: string;
  label: string;
  brandSlug: string;
  productSlug?: string;
  variant?: "solid" | "outline";
}) {
  const fallbackUrl = `/eic/cotizaciones?marca=${brandSlug}${productSlug ? `&producto=${productSlug}` : ""}&doc=ficha`;

  if (url) {
    return (
      <a
        href={url}
        target="_blank"
        rel="noopener noreferrer"
        className={`inline-flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
          variant === "solid"
            ? "bg-[#00B140] hover:bg-[#008F33] text-white"
            : "border border-[#00B140] text-[#00B140] hover:bg-[#00B140]/10"
        }`}
      >
        <Download size={15} />
        {label}
      </a>
    );
  }

  return (
    <Link
      href={fallbackUrl}
      className={`inline-flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
        variant === "solid"
          ? "bg-[#00B140] hover:bg-[#008F33] text-white"
          : "border border-[#00B140] text-[#00B140] hover:bg-[#00B140]/10"
      }`}
    >
      <FileText size={15} />
      {label}
    </Link>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// Main Page
// ─────────────────────────────────────────────────────────────────────────────
export default function MarcaDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = React.use(params);

  const brand = getEICBrandBySlug(slug);
  if (!brand) notFound();

  const products = getEICProductsByBrand(slug);
  const category = eicProductCategories.find((c) => c.id === brand.category);
  const categoryColor = category?.color ?? "#00B140";
  const CategoryIcon = categoryIcons[category?.icon ?? "zap"] ?? Zap;

  const flag = countryFlags[brand.country] ?? "🌍";

  return (
    <div className="min-h-screen bg-gray-50">
      {/* ================================================================ */}
      {/* HERO                                                              */}
      {/* ================================================================ */}
      <section
        className="text-white py-16 lg:py-20"
        style={{
          background: `linear-gradient(135deg, ${categoryColor} 0%, ${categoryColor}CC 50%, #001689 100%)`,
        }}
      >
        <div className="container-eminsa">
          {/* Breadcrumb */}
          <nav className="flex items-center gap-2 text-white/70 text-sm mb-8 flex-wrap">
            <Link href="/" className="hover:text-white transition-colors">
              <Home size={16} />
            </Link>
            <ChevronRight size={14} />
            <Link href="/eic" className="hover:text-white transition-colors">
              EIC
            </Link>
            <ChevronRight size={14} />
            <span className="text-white/50">Marcas Representadas</span>
            <ChevronRight size={14} />
            <span className="text-white font-medium">{brand.name}</span>
          </nav>

          <div className="grid lg:grid-cols-2 gap-10 items-center">
            {/* Left */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
            >
              {/* Category badge */}
              {category && (
                <span className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-white/10 backdrop-blur-sm rounded-full text-sm font-medium mb-4">
                  <CategoryIcon size={14} />
                  {category.name}
                </span>
              )}

              {/* Brand name + flag */}
              <div className="flex items-center gap-4 mb-4">
                <div className="w-16 h-16 bg-white/10 backdrop-blur-sm rounded-2xl flex items-center justify-center text-4xl border border-white/20">
                  {flag}
                </div>
                <div>
                  <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold leading-tight">
                    {brand.name}
                  </h1>
                  <div className="flex items-center gap-1.5 text-white/70 mt-1 text-sm">
                    <MapPin size={14} />
                    {brand.country}
                  </div>
                </div>
              </div>

              <p className="text-lg text-white/90 leading-relaxed mb-8 max-w-xl">
                {brand.description}
              </p>

              {/* CTAs */}
              <div className="flex flex-wrap gap-3">
                <Link
                  href={`/eic/cotizaciones?marca=${slug}`}
                  className="inline-flex items-center gap-2 px-6 py-3 bg-[#00B140] hover:bg-[#008F33] text-white font-semibold rounded-xl transition-colors shadow-lg"
                >
                  Solicitar Cotización
                  <ArrowRight size={18} />
                </Link>
                <a
                  href={getWhatsAppUrl()}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-6 py-3 bg-[#25D366] hover:bg-[#20BD5A] text-white font-semibold rounded-xl transition-colors"
                >
                  <MessageCircle size={18} />
                  WhatsApp
                </a>
                {brand.catalogUrl ? (
                  <a
                    href={brand.catalogUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-6 py-3 bg-white/10 hover:bg-white/20 backdrop-blur-sm border border-white/30 text-white font-semibold rounded-xl transition-colors"
                  >
                    <BookOpen size={18} />
                    Catálogo {brand.name}
                  </a>
                ) : (
                  <Link
                    href={`/eic/cotizaciones?marca=${slug}&doc=catalogo`}
                    className="inline-flex items-center gap-2 px-6 py-3 bg-white/10 hover:bg-white/20 backdrop-blur-sm border border-white/30 text-white font-semibold rounded-xl transition-colors"
                  >
                    <BookOpen size={18} />
                    Solicitar Catálogo
                  </Link>
                )}
              </div>
            </motion.div>

            {/* Right — decorative */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
              className="hidden lg:flex items-center justify-center"
            >
              <div className="relative">
                <div className="w-72 h-72 bg-white/10 backdrop-blur-sm rounded-3xl flex items-center justify-center border border-white/20 text-8xl">
                  {flag}
                </div>
                <div className="absolute -top-4 -right-4 w-20 h-20 bg-white/10 rounded-2xl backdrop-blur-sm border border-white/20 flex items-center justify-center">
                  <Globe size={36} className="text-white/80" />
                </div>
                <div className="absolute -bottom-4 -left-4 w-16 h-16 bg-white/10 rounded-2xl backdrop-blur-sm border border-white/20 flex items-center justify-center">
                  <CheckCircle2 size={28} className="text-white/80" />
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ================================================================ */}
      {/* PRODUCTOS DE LA MARCA                                             */}
      {/* ================================================================ */}
      <section className="py-14 lg:py-20">
        <div className="container-eminsa">
          {/* Section header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-10"
          >
            <span
              className="inline-block px-3 py-1 text-sm font-medium rounded-full mb-4"
              style={{ backgroundColor: `${categoryColor}15`, color: categoryColor }}
            >
              Portafolio de Productos
            </span>
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900">
              Productos {brand.name}
            </h2>
            <p className="text-gray-500 mt-2">
              {products.length} producto{products.length !== 1 ? "s" : ""}{" "}
              disponible{products.length !== 1 ? "s" : ""}
            </p>
          </motion.div>

          {products.length === 0 ? (
            <div className="text-center py-16 text-gray-400">
              <Globe size={48} className="mx-auto mb-4 opacity-40" />
              <p className="text-lg">
                Próximamente productos de {brand.name}.
              </p>
              <Link
                href={`/eic/cotizaciones?marca=${slug}`}
                className="inline-flex items-center gap-2 mt-4 text-[#00B140] font-medium hover:underline"
              >
                Consultar disponibilidad
                <ArrowRight size={16} />
              </Link>
            </div>
          ) : (
            <div className="space-y-8">
              {products.map((product, index) => (
                <motion.div
                  key={product.id}
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.08 }}
                  className="bg-white rounded-2xl border border-gray-200 shadow-sm hover:shadow-lg transition-shadow overflow-hidden"
                >
                  <div className="grid lg:grid-cols-3 gap-0">
                    {/* ── Left column: image placeholder ── */}
                    <div
                      className="lg:col-span-1 flex items-center justify-center p-8 min-h-[200px]"
                      style={{
                        background: `linear-gradient(135deg, ${categoryColor}12 0%, ${categoryColor}25 100%)`,
                      }}
                    >
                      {product.image ? (
                        // eslint-disable-next-line @next/next/no-img-element
                        <img
                          src={product.image}
                          alt={product.name}
                          className="max-h-48 object-contain rounded-xl"
                        />
                      ) : (
                        <div className="text-center">
                          <div
                            className="w-24 h-24 rounded-2xl flex items-center justify-center mx-auto mb-3"
                            style={{ backgroundColor: `${categoryColor}20` }}
                          >
                            <CategoryIcon
                              size={48}
                              style={{ color: categoryColor }}
                            />
                          </div>
                          <span className="text-xs text-gray-400 font-medium">
                            {product.brand}
                          </span>
                        </div>
                      )}
                    </div>

                    {/* ── Right column: info ── */}
                    <div className="lg:col-span-2 p-7">
                      {/* Header row */}
                      <div className="flex flex-wrap items-start justify-between gap-3 mb-4">
                        <div>
                          <span
                            className="inline-block px-2.5 py-1 text-xs font-semibold rounded-full mb-2"
                            style={{
                              backgroundColor: `${categoryColor}15`,
                              color: categoryColor,
                            }}
                          >
                            {product.brand}
                          </span>
                          <h3 className="text-xl font-bold text-gray-900">
                            {product.name}
                          </h3>
                        </div>
                        {/* Download ficha técnica */}
                        <DownloadButton
                          url={product.datasheetUrl}
                          label="Ficha Técnica"
                          brandSlug={slug}
                          productSlug={product.slug}
                          variant="outline"
                        />
                      </div>

                      <p className="text-gray-600 mb-5 leading-relaxed">
                        {product.description}
                      </p>

                      {/* Specs grid */}
                      {product.specs.length > 0 && (
                        <div className="mb-5">
                          <h4 className="text-xs font-semibold uppercase tracking-wider text-gray-400 mb-2">
                            Especificaciones
                          </h4>
                          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                            {product.specs.map((spec) => (
                              <div
                                key={spec.label}
                                className="bg-gray-50 rounded-lg px-3 py-2"
                              >
                                <span className="block text-xs text-gray-400">
                                  {spec.label}
                                </span>
                                <span className="block text-sm font-semibold text-gray-800 mt-0.5">
                                  {spec.value}
                                </span>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}

                      {/* Features + Applications */}
                      <div className="grid sm:grid-cols-2 gap-5">
                        {product.features.length > 0 && (
                          <div>
                            <h4 className="text-xs font-semibold uppercase tracking-wider text-gray-400 mb-2">
                              Características
                            </h4>
                            <ul className="space-y-1.5">
                              {product.features.map((f) => (
                                <li
                                  key={f}
                                  className="flex items-start gap-2 text-sm text-gray-600"
                                >
                                  <CheckCircle2
                                    size={14}
                                    className="mt-0.5 shrink-0"
                                    style={{ color: categoryColor }}
                                  />
                                  {f}
                                </li>
                              ))}
                            </ul>
                          </div>
                        )}

                        {product.applications.length > 0 && (
                          <div>
                            <h4 className="text-xs font-semibold uppercase tracking-wider text-gray-400 mb-2">
                              Aplicaciones
                            </h4>
                            <div className="flex flex-wrap gap-1.5">
                              {product.applications.map((app) => (
                                <span
                                  key={app}
                                  className="px-2.5 py-1 bg-gray-100 text-gray-600 text-xs rounded-full"
                                >
                                  {app}
                                </span>
                              ))}
                            </div>
                          </div>
                        )}
                      </div>

                      {/* Action buttons */}
                      <div className="flex flex-wrap gap-3 mt-6 pt-5 border-t border-gray-100">
                        <Link
                          href={`/eic/productos/${product.slug}`}
                          className="inline-flex items-center gap-2 px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 text-sm font-medium rounded-lg transition-colors"
                        >
                          <ExternalLink size={14} />
                          Ver detalle completo
                        </Link>
                        <Link
                          href={`/eic/cotizaciones?producto=${product.slug}`}
                          className="inline-flex items-center gap-2 px-4 py-2 bg-[#00B140] hover:bg-[#008F33] text-white text-sm font-semibold rounded-lg transition-colors"
                        >
                          Solicitar Cotización
                          <ArrowRight size={14} />
                        </Link>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* ================================================================ */}
      {/* CATÁLOGO DE LA MARCA                                              */}
      {/* ================================================================ */}
      <section className="py-12 bg-white border-y border-gray-100">
        <div className="container-eminsa">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex flex-col sm:flex-row items-center justify-between gap-6 bg-gray-50 rounded-2xl p-8 border border-gray-200"
          >
            <div className="flex items-center gap-5">
              <div
                className="w-16 h-16 rounded-2xl flex items-center justify-center text-3xl shrink-0"
                style={{ backgroundColor: `${categoryColor}20` }}
              >
                {flag}
              </div>
              <div>
                <h3 className="text-xl font-bold text-gray-900">
                  Documentación Completa — {brand.name}
                </h3>
                <p className="text-gray-500 text-sm mt-1">
                  Accede al catálogo completo de productos y fichas técnicas de{" "}
                  {brand.name}.
                </p>
              </div>
            </div>
            <div className="flex flex-wrap gap-3 shrink-0">
              <DownloadButton
                url={brand.catalogUrl}
                label={`Catálogo ${brand.name}`}
                brandSlug={slug}
                variant="solid"
              />
              <Link
                href={`/eic/cotizaciones?marca=${slug}`}
                className="inline-flex items-center gap-2 px-5 py-2.5 border-2 border-gray-300 hover:border-gray-400 text-gray-700 text-sm font-medium rounded-lg transition-colors"
              >
                <Mail size={15} />
                Contactar especialista
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ================================================================ */}
      {/* CTA FINAL                                                         */}
      {/* ================================================================ */}
      <section
        className="py-14 text-white"
        style={{
          background: `linear-gradient(135deg, ${categoryColor} 0%, ${categoryColor}CC 50%, #001689 100%)`,
        }}
      >
        <div className="container-eminsa text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-2xl md:text-3xl font-bold mb-4">
              ¿Necesita productos {brand.name}?
            </h2>
            <p className="text-lg text-white/90 max-w-2xl mx-auto mb-8">
              Somos representantes exclusivos en República Dominicana. Solicite
              cotización y reciba asesoría especializada para su proyecto.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link
                href={`/eic/cotizaciones?marca=${slug}`}
                className="inline-flex items-center gap-2 px-8 py-4 bg-[#00B140] hover:bg-[#008F33] text-white font-semibold rounded-xl transition-colors shadow-lg"
              >
                Solicitar Cotización
                <ArrowRight size={20} />
              </Link>
              <a
                href={`tel:${contactInfo.phone}`}
                className="inline-flex items-center gap-2 px-8 py-4 bg-white/10 hover:bg-white/20 text-white font-semibold rounded-xl transition-colors border border-white/30"
              >
                <Phone size={20} />
                {contactInfo.phone}
              </a>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
