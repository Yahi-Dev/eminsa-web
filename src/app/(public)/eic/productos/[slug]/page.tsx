"use client";

import { notFound } from "next/navigation";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  ArrowRight,
  ChevronRight,
  Home,
  CheckCircle2,
  Phone,
  MessageCircle,
  Mail,
  Globe,
  MapPin,
  ExternalLink,
  Building2,
} from "lucide-react";
import {
  getEICProductBySlug,
  getOtherEICProducts,
  eicBrands,
} from "@/config/eic-data";
import { contactInfo } from "@/config/navigation";
import React from "react";

export default function EICProductoPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = React.use(params);

  const product = getEICProductBySlug(slug);

  if (!product) {
    notFound();
  }

  const otherProducts = getOtherEICProducts(slug).slice(0, 3);
  const brand = eicBrands.find((b) => b.slug === product.brandSlug);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero */}
      <section className="bg-gradient-to-br from-[#00B140] via-[#008F33] to-[#001689] text-white py-12 lg:py-16">
        <div className="container-eminsa">
          {/* Breadcrumb */}
          <nav className="flex items-center gap-2 text-white/70 text-sm mb-6 flex-wrap">
            <Link href="/" className="hover:text-white transition-colors">
              <Home size={16} />
            </Link>
            <ChevronRight size={14} />
            <Link href="/eic" className="hover:text-white transition-colors">
              EIC
            </Link>
            <ChevronRight size={14} />
            <Link
              href="/eic/productos"
              className="hover:text-white transition-colors"
            >
              Productos
            </Link>
            <ChevronRight size={14} />
            <span className="text-white">{product.shortName}</span>
          </nav>

          <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
            {/* Content */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
            >
              <span className="inline-flex items-center gap-2 px-3 py-1.5 bg-white/10 backdrop-blur-sm rounded-full text-sm font-medium mb-4">
                <Building2 size={14} />
                {product.brand}
              </span>
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
                {product.name}
              </h1>
              <p className="text-lg text-white/90 mb-6">
                {product.description}
              </p>

              {/* Quick Specs */}
              <div className="grid grid-cols-2 gap-4 mb-6">
                {product.specs.slice(0, 4).map((spec) => (
                  <div
                    key={spec.label}
                    className="bg-white/10 backdrop-blur-sm rounded-xl p-4"
                  >
                    <span className="text-sm text-white/70 block">
                      {spec.label}
                    </span>
                    <span className="font-bold">{spec.value}</span>
                  </div>
                ))}
              </div>

              {/* CTAs */}
              <div className="flex flex-wrap gap-4">
                <Link
                  href={`/eic/cotizaciones?producto=${product.slug}`}
                  className="inline-flex items-center gap-2 px-6 py-3 bg-[#FF5500] hover:bg-[#E64D00] text-white font-semibold rounded-xl transition-colors shadow-lg"
                >
                  Solicitar Cotización
                  <ArrowRight size={20} />
                </Link>
                <a
                  href={`https://wa.me/${contactInfo.whatsapp}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-6 py-3 bg-[#25D366] hover:bg-[#20BD5A] text-white font-semibold rounded-xl transition-colors"
                >
                  <MessageCircle size={20} />
                  WhatsApp
                </a>
              </div>
            </motion.div>

            {/* Visual placeholder */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
              className="hidden lg:flex items-center justify-center"
            >
              <div className="relative">
                <div className="w-80 h-80 bg-white/10 backdrop-blur-sm rounded-3xl flex items-center justify-center border border-white/20">
                  <Globe size={120} className="text-white/80" />
                </div>
                <div className="absolute -top-4 -right-4 w-24 h-24 bg-white/10 rounded-2xl backdrop-blur-sm border border-white/20 flex items-center justify-center">
                  <Building2 size={40} className="text-white/80" />
                </div>
                <div className="absolute -bottom-4 -left-4 w-20 h-20 bg-white/10 rounded-2xl backdrop-blur-sm border border-white/20 flex items-center justify-center">
                  <CheckCircle2 size={32} className="text-white/80" />
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Main Content - 2 column layout */}
      <section className="py-12 lg:py-16">
        <div className="container-eminsa">
          <div className="grid lg:grid-cols-3 gap-8 lg:gap-12">
            {/* Left Column (2/3) */}
            <div className="lg:col-span-2 space-y-12">
              {/* Full Description */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
              >
                <h2 className="text-2xl font-bold text-gray-900 mb-4">
                  Descripción
                </h2>
                <div className="prose prose-lg max-w-none text-gray-600">
                  {product.fullDescription.map((para, i) => (
                    <p key={i} className="mb-4">
                      {para}
                    </p>
                  ))}
                </div>
              </motion.div>

              {/* Features */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
              >
                <h2 className="text-2xl font-bold text-gray-900 mb-4">
                  Características
                </h2>
                <div className="grid sm:grid-cols-2 gap-3">
                  {product.features.map((feature) => (
                    <div
                      key={feature}
                      className="flex items-start gap-3 bg-white rounded-xl p-4 shadow-sm"
                    >
                      <CheckCircle2
                        size={20}
                        className="text-[#00B140] shrink-0 mt-0.5"
                      />
                      <span className="text-gray-700">{feature}</span>
                    </div>
                  ))}
                </div>
              </motion.div>

              {/* Applications */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
              >
                <h2 className="text-2xl font-bold text-gray-900 mb-4">
                  Aplicaciones
                </h2>
                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
                  {product.applications.map((app) => (
                    <div
                      key={app}
                      className="flex items-center gap-2 text-gray-700"
                    >
                      <div className="w-2 h-2 rounded-full bg-[#00B140]" />
                      {app}
                    </div>
                  ))}
                </div>
              </motion.div>
            </div>

            {/* Right Sidebar (1/3) */}
            <div className="space-y-6">
              {/* Quick Contact Card */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="bg-white rounded-2xl p-6 shadow-lg sticky top-40"
              >
                <h3 className="text-lg font-bold text-gray-900 mb-4">
                  Contacto Rápido
                </h3>
                <div className="space-y-3 mb-6">
                  <Link
                    href={`/eic/cotizaciones?producto=${product.slug}`}
                    className="flex items-center justify-center gap-2 w-full px-4 py-3 bg-[#FF5500] hover:bg-[#E64D00] text-white font-semibold rounded-xl transition-colors"
                  >
                    Solicitar Cotización
                  </Link>
                  <a
                    href={`tel:${contactInfo.phone}`}
                    className="flex items-center justify-center gap-2 w-full px-4 py-3 border-2 border-gray-200 text-gray-700 hover:border-[#00B140] hover:text-[#00B140] font-medium rounded-xl transition-colors"
                  >
                    <Phone size={18} />
                    {contactInfo.phone}
                  </a>
                  <a
                    href={`https://wa.me/${contactInfo.whatsapp}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center gap-2 w-full px-4 py-3 bg-[#25D366] hover:bg-[#20BD5A] text-white font-medium rounded-xl transition-colors"
                  >
                    <MessageCircle size={18} />
                    WhatsApp
                  </a>
                  <a
                    href={`mailto:${contactInfo.email}`}
                    className="flex items-center justify-center gap-2 w-full px-4 py-3 border-2 border-gray-200 text-gray-700 hover:border-[#00B140] hover:text-[#00B140] font-medium rounded-xl transition-colors"
                  >
                    <Mail size={18} />
                    {contactInfo.email}
                  </a>
                </div>

                {/* Brand Info Card */}
                {brand && (
                  <div className="pt-6 border-t border-gray-100">
                    <h4 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
                      <Building2 size={16} className="text-[#00B140]" />
                      Marca
                    </h4>
                    <div className="bg-gray-50 rounded-xl p-4 space-y-2">
                      <p className="font-bold text-gray-900">{brand.name}</p>
                      <div className="flex items-center gap-1.5 text-sm text-gray-600">
                        <MapPin size={14} className="shrink-0" />
                        {brand.country}
                      </div>
                      <p className="text-sm text-gray-600 line-clamp-3">
                        {brand.description.substring(0, 150)}...
                      </p>
                      <Link
                        href={`/eic/marcas/${brand.slug}`}
                        className="inline-flex items-center gap-1 text-sm text-[#00B140] hover:text-[#008F33] font-medium transition-colors mt-1"
                      >
                        Ver marca
                        <ExternalLink size={14} />
                      </Link>
                    </div>
                  </div>
                )}

                {/* CTA to cotizaciones */}
                <div className="mt-6 pt-6 border-t border-gray-100">
                  <div className="flex items-center gap-3 bg-green-50 rounded-xl p-4">
                    <Globe size={32} className="text-[#00B140]" />
                    <div>
                      <span className="font-bold text-green-800 block">
                        Suplidores Internacionales
                      </span>
                      <span className="text-sm text-green-700">
                        Soporte y asesoría especializada
                      </span>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* Other Products */}
      <section className="py-12 lg:py-16 bg-white">
        <div className="container-eminsa">
          <h2 className="text-2xl font-bold text-gray-900 mb-8">
            Otros Productos EIC
          </h2>
          <div className="grid md:grid-cols-3 gap-6">
            {otherProducts.map((prod) => (
              <Link
                key={prod.id}
                href={`/eic/productos/${prod.slug}`}
                className="group bg-gray-50 rounded-2xl p-6 hover:bg-white hover:shadow-xl border border-transparent hover:border-gray-200 transition-all duration-300"
              >
                <div className="flex items-start justify-between mb-3">
                  <span className="inline-block px-2.5 py-1 bg-[#00B140]/10 text-[#00B140] text-xs font-semibold rounded-full">
                    {prod.brand}
                  </span>
                  <ArrowRight
                    size={18}
                    className="text-gray-400 group-hover:text-[#00B140] group-hover:translate-x-1 transition-all"
                  />
                </div>
                <h3 className="font-bold text-gray-900 group-hover:text-[#00B140] transition-colors mb-2">
                  {prod.shortName}
                </h3>
                <p className="text-sm text-gray-600 line-clamp-2 mb-3">
                  {prod.description}
                </p>
                <span className="text-xs text-gray-500">
                  {prod.category}
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-12 bg-gradient-to-br from-[#00B140] via-[#008F33] to-[#001689] text-white">
        <div className="container-eminsa text-center">
          <h2 className="text-2xl md:text-3xl font-bold mb-4">
            ¿Interesado en este producto?
          </h2>
          <p className="text-lg text-white/90 mb-6">
            Solicite una cotización y le responderemos en menos de 30
            minutos.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link
              href={`/eic/cotizaciones?producto=${product.slug}`}
              className="inline-flex items-center gap-2 px-8 py-4 bg-[#FF5500] hover:bg-[#E64D00] text-white font-semibold rounded-xl transition-colors shadow-lg"
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
        </div>
      </section>
    </div>
  );
}
