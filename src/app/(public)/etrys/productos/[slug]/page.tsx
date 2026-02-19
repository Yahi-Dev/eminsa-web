"use client";

import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import {
  ArrowRight,
  ChevronRight,
  Home,
  CheckCircle2,
  Phone,
  MessageCircle,
  FileText,
  ShieldCheck,
} from "lucide-react";
import {
  getRemanufacturedProductBySlug,
  getOtherProducts,
  remanufactureProcess,
} from "@/config/etrys-data";
import { contactInfo } from "@/config/navigation";
import { getWhatsAppUrl } from "@/utils/whatsapp";
import React from "react"; // Importar React

export default function EtrysProductoDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>; // Parámetro como Promise
}) {
  // Desenvolver params con React.use()
  const { slug } = React.use(params);
  
  const product = getRemanufacturedProductBySlug(slug);

  if (!product) {
    notFound();
  }

  const otherProducts = getOtherProducts(slug);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero */}
      <section className="bg-gradient-to-br from-[#001689] to-[#000E53] text-white py-12 lg:py-16">
        <div className="container-eminsa">
          {/* Breadcrumb */}
          <nav className="flex items-center gap-2 text-white/70 text-sm mb-6 flex-wrap">
            <Link href="/" className="hover:text-white transition-colors">
              <Home size={16} />
            </Link>
            <ChevronRight size={14} />
            <Link href="/etrys" className="hover:text-white transition-colors">
              ETRYS
            </Link>
            <ChevronRight size={14} />
            <Link href="/etrys/productos" className="hover:text-white transition-colors">
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
              <span className="inline-block px-3 py-1.5 bg-white/10 backdrop-blur-sm rounded-full text-sm font-medium mb-4">
                ETRYS by EMINSA
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
                  <div key={spec.label} className="bg-white/10 backdrop-blur-sm rounded-xl p-4">
                    <span className="text-sm text-white/70 block">{spec.label}</span>
                    <span className="font-bold">{spec.value}</span>
                  </div>
                ))}
              </div>

              {/* Standards */}
              <div className="flex items-center gap-2 mb-6">
                <span className="text-white/70">Normas:</span>
                {product.standards.map((std) => (
                  <span key={std} className="px-3 py-1 bg-white/20 rounded-full text-sm font-medium">
                    {std}
                  </span>
                ))}
              </div>

              {/* CTAs */}
              <div className="flex flex-wrap gap-4">
                <Link
                  href={`/etrys/cotizaciones?producto=${product.slug}`}
                  className="inline-flex items-center gap-2 px-6 py-3 bg-[#FF5500] hover:bg-[#E64D00] text-white font-semibold rounded-xl transition-colors shadow-lg"
                >
                  Solicitar Cotización
                  <ArrowRight size={20} />
                </Link>
                <a
                  href={getWhatsAppUrl()}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-6 py-3 bg-[#25D366] hover:bg-[#20BD5A] text-white font-semibold rounded-xl transition-colors"
                >
                  <MessageCircle size={20} />
                  WhatsApp
                </a>
              </div>
            </motion.div>

            {/* Image */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
            >
              <div className="relative aspect-[4/3] rounded-2xl overflow-hidden shadow-2xl bg-white/10">
                <Image
                  src={product.image}
                  alt={product.name}
                  fill
                  className="object-cover"
                  priority
                />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Content Section */}
      <section className="py-12 lg:py-16">
        <div className="container-eminsa">
          <div className="grid lg:grid-cols-3 gap-8 lg:gap-12">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-12">
              {/* Description */}
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
                    <p key={i} className="mb-4">{para}</p>
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
                    <div key={feature} className="flex items-start gap-3 bg-white rounded-xl p-4 shadow-sm">
                      <CheckCircle2 size={20} className="text-[#00A3E0] shrink-0 mt-0.5" />
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
                    <div key={app} className="flex items-center gap-2 text-gray-700">
                      <div className="w-2 h-2 rounded-full bg-[#00A3E0]" />
                      {app}
                    </div>
                  ))}
                </div>
              </motion.div>

              {/* Capacities */}
              {product.capacities.length > 0 && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                >
                  <h2 className="text-2xl font-bold text-gray-900 mb-4">
                    Capacidades Disponibles
                  </h2>
                  <div className="flex flex-wrap gap-2">
                    {product.capacities.map((cap) => (
                      <span key={cap} className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg font-medium">
                        {cap}
                      </span>
                    ))}
                  </div>
                </motion.div>
              )}

              {/* Process */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
              >
                <h2 className="text-2xl font-bold text-gray-900 mb-4">
                  Proceso de Remanufactura
                </h2>
                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {remanufactureProcess.slice(0, 6).map((step) => (
                    <div key={step.id} className="bg-white rounded-xl p-4 shadow-sm">
                      <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-[#00A3E0] to-[#001689] flex items-center justify-center text-white font-bold mb-3">
                        {step.id}
                      </div>
                      <h3 className="font-semibold text-gray-900 mb-1">{step.shortTitle}</h3>
                      <p className="text-sm text-gray-600">{step.description}</p>
                    </div>
                  ))}
                </div>
              </motion.div>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Quick Contact */}
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
                    href={`/etrys/cotizaciones?producto=${product.slug}`}
                    className="flex items-center justify-center gap-2 w-full px-4 py-3 bg-[#FF5500] hover:bg-[#E64D00] text-white font-semibold rounded-xl transition-colors"
                  >
                    Solicitar Cotización
                  </Link>
                  <a
                    href={`tel:${contactInfo.phone}`}
                    className="flex items-center justify-center gap-2 w-full px-4 py-3 border-2 border-gray-200 text-gray-700 hover:border-[#00A3E0] hover:text-[#00A3E0] font-medium rounded-xl transition-colors"
                  >
                    <Phone size={18} />
                    {contactInfo.phone}
                  </a>
                  <a
                    href={getWhatsAppUrl()}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center gap-2 w-full px-4 py-3 bg-[#25D366] hover:bg-[#20BD5A] text-white font-medium rounded-xl transition-colors"
                  >
                    <MessageCircle size={18} />
                    WhatsApp
                  </a>
                </div>

                {/* Resources */}
                <h4 className="font-semibold text-gray-900 mb-3">Recursos</h4>
                <div className="space-y-2">
                  <a href="#" className="flex items-center gap-2 text-gray-600 hover:text-[#00A3E0] transition-colors">
                    <FileText size={16} />
                    <span className="text-sm">Ficha Técnica</span>
                  </a>
                  <a href="#" className="flex items-center gap-2 text-gray-600 hover:text-[#00A3E0] transition-colors">
                    <FileText size={16} />
                    <span className="text-sm">Manual de Instrucciones</span>
                  </a>
                </div>

                {/* Warranty Badge */}
                <div className="mt-6 pt-6 border-t border-gray-100">
                  <div className="flex items-center gap-3 bg-amber-50 rounded-xl p-4">
                    <ShieldCheck size={32} className="text-amber-600" />
                    <div>
                      <span className="font-bold text-amber-800 block">Garantía 18 meses</span>
                      <span className="text-sm text-amber-700">Líder en la industria</span>
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
            Otros Productos ETRYS
          </h2>
          <div className="grid md:grid-cols-2 gap-6">
            {otherProducts.map((prod) => (
              <Link
                key={prod.id}
                href={`/etrys/productos/${prod.slug}`}
                className="flex gap-4 bg-gray-50 rounded-xl p-4 hover:bg-gray-100 transition-colors group"
              >
                <div className="relative w-24 h-24 rounded-lg overflow-hidden bg-gray-200 shrink-0">
                  <Image
                    src={prod.image}
                    alt={prod.name}
                    fill
                    className="object-cover"
                  />
                </div>
                <div>
                  <h3 className="font-bold text-gray-900 group-hover:text-[#00A3E0] transition-colors">
                    {prod.shortName}
                  </h3>
                  <p className="text-sm text-gray-600 mb-2 line-clamp-2">{prod.description}</p>
                  <span className="text-xs text-gray-500">{prod.powerRange}</span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-12 bg-gradient-to-br from-[#00A3E0] via-[#0077A8] to-[#001689] text-white">
        <div className="container-eminsa text-center">
          <h2 className="text-2xl md:text-3xl font-bold mb-4">
            ¿Interesado en este producto?
          </h2>
          <p className="text-lg text-white/90 mb-6">
            Solicite una cotización y le responderemos en menos de 30 minutos.
          </p>
          <Link
            href={`/etrys/cotizaciones?producto=${product.slug}`}
            className="inline-flex items-center gap-2 px-8 py-4 bg-[#FF5500] hover:bg-[#E64D00] text-white font-semibold rounded-xl transition-colors shadow-lg"
          >
            Solicitar Cotización
            <ArrowRight size={20} />
          </Link>
        </div>
      </section>
    </div>
  );
}
