"use client";

import Link from "next/link";
import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
import {
  ArrowRight,
  ChevronRight,
  Home,
  FileText,
  FileCheck,
  Download,
  ExternalLink,
  Phone,
  MessageCircle,
  Globe,
} from "lucide-react";
import { eicResources, eicBrands } from "@/config/eic-data";
import { Calculator } from "lucide-react";

const extraCards = [
  {
    id: "fichas-tecnicas",
    name: "Fichas Técnicas",
    description: "Especificaciones técnicas y documentación detallada de los productos EIC.",
    icon: "file-text",
    url: "/eic/recursos/fichas-tecnicas",
    downloadable: false,
  },
  {
    id: "calculadora-kva",
    name: "Calculadora KVA",
    description: "Herramienta para calcular la capacidad de transformador requerida según su carga.",
    icon: "calculator",
    url: "/mtn/recursos/calculadora",
    downloadable: false,
  },
];
import { contactInfo } from "@/config/navigation";
import { getWhatsAppUrl } from "@/utils/whatsapp";
import RecursosDinamicos from "@/components/shared/RecursosDinamicos";

const resourceIcons: { [key: string]: React.ElementType } = {
  "file-text": FileText,
  "file-check": FileCheck,
  calculator: Calculator,
};

export default function EICRecursosPage() {
  const t = useTranslations("eicPage.recursos");

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero */}
      <section className="bg-gradient-to-br from-[#009e49] via-[#007d3a] to-[#00269b] text-white py-16 lg:py-20">
        <div className="container-eminsa">
          <nav className="flex items-center gap-2 text-white/70 text-sm mb-6">
            <Link href="/" className="hover:text-white transition-colors">
              <Home size={16} />
            </Link>
            <ChevronRight size={14} />
            <Link href="/eic" className="hover:text-white transition-colors">
              EIC
            </Link>
            <ChevronRight size={14} />
            <span className="text-white">{t("breadcrumb")}</span>
          </nav>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-3xl"
          >
            <span className="inline-block px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full text-sm font-medium mb-4">
              {t("heroBadge")}
            </span>
            <h1 className="text-4xl md:text-5xl xl:text-6xl font-bold mb-4">
              {t("heroTitle")}
            </h1>
            <p className="text-xl text-white/90">
              {t("heroDescription")}
            </p>
          </motion.div>
        </div>
      </section>

      {/* Acciones rápidas */}
      <section className="py-16 bg-white">
        <div className="container-eminsa">
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Extra cards: Fichas Técnicas + Calculadora */}
            {extraCards.map((card, index) => {
              const Icon = resourceIcons[card.icon] || FileText;
              return (
                <motion.div
                  key={card.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 group border border-gray-100"
                >
                  <div className="w-16 h-16 rounded-xl bg-linear-to-br from-[#009e49]/20 to-[#007d3a]/20 flex items-center justify-center mb-4 group-hover:from-[#009e49] group-hover:to-[#007d3a] transition-all">
                    <Icon size={32} className="text-[#009e49] group-hover:text-white transition-colors" />
                  </div>
                  <h3 className="text-lg font-bold text-gray-900 mb-2">{card.name}</h3>
                  <p className="text-gray-600 text-sm mb-4">{card.description}</p>
                  <Link
                    href={card.url}
                    className="flex items-center gap-2 text-[#009e49] font-medium text-sm hover:underline"
                  >
                    <ArrowRight size={16} />
                    {t("access")}
                  </Link>
                </motion.div>
              );
            })}
            {eicResources.map((resource, index) => {
              const Icon = resourceIcons[resource.icon] || FileText;
              return (
                <motion.div
                  key={resource.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 group border border-gray-100"
                >
                  <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-[#009e49]/20 to-[#007d3a]/20 flex items-center justify-center mb-4">
                    <Icon size={32} className="text-[#009e49]" />
                  </div>
                  <h3 className="text-lg font-bold text-gray-900 mb-2">
                    {resource.name}
                  </h3>
                  <p className="text-gray-600 text-sm mb-4">
                    {resource.description}
                  </p>
                  <div className="flex items-center gap-2">
                    {resource.url ? (
                      <Link
                        href={resource.url}
                        className="flex items-center gap-2 text-[#009e49] font-medium text-sm hover:underline"
                      >
                        <ExternalLink size={16} />
                        {t("access")}
                      </Link>
                    ) : resource.downloadable ? (
                      <button className="flex items-center gap-2 text-[#009e49] font-medium text-sm hover:underline">
                        <Download size={16} />
                        {t("download")}
                      </button>
                    ) : null}
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Fichas Técnicas Dinámicas */}
      <section className="py-16 lg:py-24 bg-gray-50">
        <div className="container-eminsa">
          <RecursosDinamicos
            division="EIC"
            accentColor="#009e49"
            title={t("dynamicResourcesTitle")}
          />
        </div>
      </section>

      {/* Marcas y Catálogos */}
      <section className="py-16 bg-white">
        <div className="container-eminsa">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              {t("brandCatalogsTitle")}
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              {t("brandCatalogsDescription")}
            </p>
          </motion.div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {eicBrands.map((brand, index) => (
              <motion.div
                key={brand.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.05 }}
                className="bg-gray-50 rounded-xl p-5 hover:bg-[#009e49]/5 transition-all duration-200 group border border-gray-100"
              >
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-10 h-10 rounded-lg bg-[#009e49]/10 flex items-center justify-center">
                    <Globe size={20} className="text-[#009e49]" />
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-900 text-sm">
                      {brand.name}
                    </h3>
                    <p className="text-xs text-gray-500">{brand.country}</p>
                  </div>
                </div>
                <p className="text-xs text-gray-600 mb-3 line-clamp-2">
                  {brand.description.substring(0, 100)}...
                </p>
                <button className="flex items-center gap-1 text-[#009e49] text-xs font-medium hover:underline">
                  <Download size={14} />
                  {t("catalogLabel")}
                </button>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA de Contacto */}
      <section className="py-16 bg-gradient-to-br from-[#009e49] via-[#007d3a] to-[#00269b] text-white">
        <div className="container-eminsa text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl xl:text-5xl font-bold mb-4">
              {t("ctaTitle")}
            </h2>
            <p className="text-white/90 text-lg max-w-2xl mx-auto mb-8">
              {t("ctaDescription")}
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                href="/eic/cotizaciones"
                className="inline-flex items-center gap-2 px-8 py-4 bg-[#009e49] hover:bg-[#007d3a] text-white rounded-xl font-semibold transition-all shadow-lg"
              >
                {t("requestQuote")}
                <ArrowRight size={20} />
              </Link>
              <a
                href={getWhatsAppUrl()}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-8 py-4 bg-white/10 backdrop-blur-sm hover:bg-white/20 text-white rounded-xl font-semibold transition-all border border-white/20"
              >
                <MessageCircle size={20} />
                WhatsApp
              </a>
              <a
                href={`tel:${contactInfo.phone}`}
                className="inline-flex items-center gap-2 px-8 py-4 bg-white/10 backdrop-blur-sm hover:bg-white/20 text-white rounded-xl font-semibold transition-all border border-white/20"
              >
                <Phone size={20} />
                {t("call")}
              </a>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
