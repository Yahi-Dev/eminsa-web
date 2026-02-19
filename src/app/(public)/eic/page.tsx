"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import {
  Globe,
  ArrowRight,
  CheckCircle2,
  Phone,
  MessageCircle,
  Zap,
  Cable,
  Grid3X3,
  Shield,
  Plug,
  Award,
  Headphones,
  ShieldCheck,
  MapPin,
} from "lucide-react";
import { eicInfo, eicProductCategories, eicBrands } from "@/config/eic-data";
import { contactInfo } from "@/config/navigation";
import { getWhatsAppUrl } from "@/utils/whatsapp";

const categoryIcons: { [key: string]: React.ElementType } = {
  zap: Zap,
  cable: Cable,
  "grid-3x3": Grid3X3,
  shield: Shield,
  plug: Plug,
};

const advantageIcons: { [key: string]: React.ElementType } = {
  globe: Globe,
  headphones: Headphones,
  "shield-check": ShieldCheck,
  award: Award,
};

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

export default function EICPage() {
  return (
    <div className="min-h-screen">
      {/* ================================================================ */}
      {/* HERO SECTION */}
      {/* ================================================================ */}
      <section className="relative bg-gradient-to-br from-[#00B140] via-[#008F33] to-[#001689] text-white py-16 lg:py-24 overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div
            className="absolute inset-0"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.4'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
            }}
          />
        </div>

        <div className="container-eminsa relative">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Content */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
            >
              <span className="inline-block px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full text-sm font-medium mb-6 border border-white/20">
                {eicInfo.tagline}
              </span>
              <h1 className="text-3xl md:text-3xl lg:text-5xl font-bold mb-6 leading-tight">
                Eminsa International Corporation
              </h1>
              <p className="text-lg md:text-xl text-white/90 mb-8 leading-relaxed max-w-xl">
                {eicInfo.description}
              </p>

              {/* CTAs */}
              <div className="flex flex-wrap gap-4">
                <Link
                  href="/eic/productos"
                  className="inline-flex items-center gap-2 px-6 py-3 bg-white text-[#00B140] hover:bg-white/90 font-semibold rounded-xl transition-all shadow-lg hover:shadow-xl"
                >
                  Ver Productos
                  <ArrowRight size={20} />
                </Link>
                <Link
                  href="/eic/cotizaciones"
                  className="inline-flex items-center gap-2 px-6 py-3 bg-white/10 hover:bg-white/20 backdrop-blur-sm border border-white/30 text-white font-semibold rounded-xl transition-all"
                >
                  Solicitar Cotización
                  <ArrowRight size={20} />
                </Link>
              </div>
            </motion.div>

            {/* Stats Grid */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <div className="grid grid-cols-2 gap-4">
                {eicInfo.stats.map((stat, index) => (
                  <motion.div
                    key={stat.label}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.3 + index * 0.1 }}
                    className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20 text-center hover:bg-white/15 transition-colors"
                  >
                    <div className="text-3xl md:text-4xl font-bold mb-1">
                      {stat.value}
                      {stat.suffix && (
                        <span className="text-white/70">{stat.suffix}</span>
                      )}
                    </div>
                    <div className="text-sm text-white/80">{stat.label}</div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ================================================================ */}
      {/* MARCAS REPRESENTADAS */}
      {/* ================================================================ */}
      <section className="py-16 lg:py-24 bg-white">
        <div className="container-eminsa">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center max-w-3xl mx-auto mb-12"
          >
            <span className="inline-block px-3 py-1 bg-[#00B140]/10 text-[#00B140] text-sm font-medium rounded-full mb-4">
              Aliados Estratégicos
            </span>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Marcas Representadas
            </h2>
            <p className="text-gray-600 text-lg">
              Representamos exclusivamente las mejores marcas internacionales del
              sector eléctrico, garantizando calidad, soporte y disponibilidad.
            </p>
          </motion.div>

          {/* Brands Grid */}
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
            {eicBrands.map((brand, index) => (
              <motion.div
                key={brand.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.08 }}
              >
                <Link
                  href={`/eic/productos`}
                  className="block bg-gray-50 hover:bg-white rounded-2xl p-5 shadow-sm hover:shadow-lg transition-all group h-full border border-gray-100 hover:border-[#00B140]/30"
                >
                  <div className="flex items-center gap-2 mb-3">
                    <span className="text-xl">
                      {countryFlags[brand.country] || <Globe className="w-5 h-5" />}
                    </span>
                    <span className="text-xs text-gray-500">
                      {brand.country}
                    </span>
                  </div>
                  <h3 className="text-lg font-bold text-gray-900 mb-2 group-hover:text-[#00B140] transition-colors">
                    {brand.name}
                  </h3>
                  <p className="text-sm text-gray-600 line-clamp-3 mb-3">
                    {brand.description.substring(0, 150)}...
                  </p>
                  <div className="flex items-center gap-1 text-[#00B140] text-sm font-medium mt-auto">
                    Ver productos
                    <ArrowRight
                      size={14}
                      className="group-hover:translate-x-1 transition-transform"
                    />
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ================================================================ */}
      {/* CATEGORIAS DE PRODUCTOS */}
      {/* ================================================================ */}
      <section className="py-16 lg:py-24 bg-gray-50">
        <div className="container-eminsa">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center max-w-3xl mx-auto mb-12"
          >
            <span className="inline-block px-3 py-1 bg-[#00B140]/10 text-[#00B140] text-sm font-medium rounded-full mb-4">
              Nuestro Portafolio
            </span>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Categorías de Productos
            </h2>
            <p className="text-gray-600 text-lg">
              Ofrecemos una amplia gama de soluciones eléctricas a través de
              nuestras marcas representadas, cubriendo todas las necesidades del
              sector.
            </p>
          </motion.div>

          {/* Categories */}
          <div className="space-y-8">
            {eicProductCategories.map((category, index) => {
              const Icon = categoryIcons[category.icon] || Zap;
              const isEven = index % 2 === 0;

              return (
                <motion.div
                  key={category.id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-all"
                >
                  <div
                    className={`grid md:grid-cols-2 gap-0 ${isEven ? "" : "md:[direction:rtl]"
                      }`}
                  >
                    {/* Color Block with Icon */}
                    <div
                      className="p-8 md:p-10 flex flex-col justify-center items-center text-white relative overflow-hidden"
                      style={{
                        background: `linear-gradient(135deg, ${category.color}, ${category.color}dd)`,
                      }}
                    >
                      {/* Decorative circles */}
                      <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/2" />
                      <div className="absolute bottom-0 left-0 w-24 h-24 bg-white/10 rounded-full translate-y-1/2 -translate-x-1/2" />

                      <div className="relative z-10 text-center md:[direction:ltr]">
                        <div className="w-16 h-16 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center mx-auto mb-4">
                          <Icon size={32} className="text-white" />
                        </div>
                        <h3 className="text-2xl md:text-3xl font-bold mb-2">
                          {category.name}
                        </h3>
                        <div className="flex flex-wrap justify-center gap-2 mt-4">
                          {category.brands.map((brandName) => (
                            <span
                              key={brandName}
                              className="px-3 py-1 bg-white/20 backdrop-blur-sm rounded-full text-sm font-medium"
                            >
                              {brandName}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>

                    {/* Content */}
                    <div className="p-8 md:p-10 flex flex-col justify-center md:[direction:ltr]">
                      <h3 className="text-xl font-bold text-gray-900 mb-3">
                        {category.name}
                      </h3>
                      <p className="text-gray-600 mb-6 leading-relaxed">
                        {category.description}
                      </p>
                      <div className="flex flex-wrap gap-2 mb-6">
                        {category.brands.map((brandName) => (
                          <span
                            key={brandName}
                            className="inline-flex items-center gap-1 px-3 py-1 bg-gray-100 text-gray-700 text-sm rounded-lg"
                          >
                            <CheckCircle2
                              size={14}
                              className="text-[#00B140]"
                            />
                            {brandName}
                          </span>
                        ))}
                      </div>
                      <Link
                        href={`/eic/productos/${category.slug}`}
                        className="inline-flex items-center gap-2 text-[#00B140] font-semibold hover:gap-3 transition-all"
                      >
                        Ver productos de esta categoría
                        <ArrowRight size={18} />
                      </Link>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ================================================================ */}
      {/* VENTAJAS EIC */}
      {/* ================================================================ */}
      <section className="py-16 lg:py-24 bg-gradient-to-br from-gray-900 via-gray-800 to-[#001689] text-white">
        <div className="container-eminsa">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center max-w-3xl mx-auto mb-12"
          >
            <span className="inline-block px-3 py-1 bg-white/10 text-white text-sm font-medium rounded-full mb-4">
              ¿Por qué EIC?
            </span>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Ventajas de Trabajar con EIC
            </h2>
            <p className="text-white/70 text-lg">
              Como división internacional de Grupo Eminsa, ofrecemos acceso
              directo a las mejores marcas del sector eléctrico con respaldo
              local.
            </p>
          </motion.div>

          {/* Advantages Grid */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {eicInfo.advantages.map((adv, index) => {
              const Icon = advantageIcons[adv.icon] || Globe;
              return (
                <motion.div
                  key={adv.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/10 hover:bg-white/10 transition-all group"
                >
                  <div className="w-14 h-14 rounded-xl bg-[#00B140]/20 flex items-center justify-center mb-4 group-hover:bg-[#00B140] transition-colors">
                    <Icon
                      size={28}
                      className="text-[#00B140] group-hover:text-white transition-colors"
                    />
                  </div>
                  <h3 className="text-xl font-bold mb-2 flex items-center gap-2">
                    {adv.title}
                    {adv.highlight && (
                      <span className="text-xs font-normal px-2 py-0.5 bg-[#00B140] text-white rounded">
                        {adv.highlight}
                      </span>
                    )}
                  </h3>
                  <p className="text-white/70 text-sm leading-relaxed">
                    {adv.description}
                  </p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ================================================================ */}
      {/* CTA SECTION */}
      {/* ================================================================ */}
      <section className="py-16 lg:py-24 bg-white">
        <div className="container-eminsa">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="relative bg-gradient-to-br from-[#00B140] via-[#008F33] to-[#001689] rounded-3xl p-8 md:p-12 lg:p-16 text-white text-center overflow-hidden"
          >
            {/* Decorative elements */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full -translate-y-1/2 translate-x-1/2" />
            <div className="absolute bottom-0 left-0 w-48 h-48 bg-white/5 rounded-full translate-y-1/2 -translate-x-1/2" />

            <div className="relative z-10 max-w-2xl mx-auto">
              <Globe size={48} className="mx-auto mb-6 text-white/80" />
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                ¿Necesita Equipos Eléctricos Internacionales?
              </h2>
              <p className="text-white/90 text-lg mb-8 leading-relaxed">
                Solicite una cotización y obtenga acceso a las mejores marcas del
                sector eléctrico con asesoría especializada y soporte técnico
                garantizado.
              </p>

              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row justify-center gap-4 mb-8">
                <Link
                  href="/eic/cotizaciones"
                  className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-white text-[#00B140] hover:bg-white/90 font-bold rounded-xl transition-all shadow-lg hover:shadow-xl text-lg"
                >
                  Solicitar Cotización
                  <ArrowRight size={22} />
                </Link>
                <a
                  href={getWhatsAppUrl()}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-white/10 hover:bg-white/20 backdrop-blur-sm border border-white/30 text-white font-bold rounded-xl transition-all text-lg"
                >
                  <MessageCircle size={22} />
                  WhatsApp
                </a>
              </div>

              {/* Contact Info */}
              <div className="flex flex-col sm:flex-row justify-center items-center gap-6 text-white/80">
                <a
                  href={`tel:${contactInfo.phone}`}
                  className="inline-flex items-center gap-2 hover:text-white transition-colors"
                >
                  <Phone size={18} />
                  {contactInfo.phone}
                </a>
                <span className="hidden sm:inline text-white/30">|</span>
                <span className="inline-flex items-center gap-2">
                  <MapPin size={18} />
                  {contactInfo.address}
                </span>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
