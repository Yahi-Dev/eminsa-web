"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import {
  ArrowRight,
  Factory,
  Shield,
  Award,
  Zap,
  CheckCircle2,
  ChevronRight,
  FileText,
  Calculator,
  BookOpen,
  Phone,
  MessageCircle,
} from "lucide-react";
import {
  mtnInfo,
  transformerProducts,
  standards,
  certifications,
  resources,
} from "@/config/mtn-data";
import CertificationsTabSelector from "@/features/home/components/mtn/CertificationsTabSelector";
import { contactInfo } from "@/config/navigation";
import { getWhatsAppUrl } from "@/utils/whatsapp";
import { useTranslations } from "next-intl";

const resourceIcons: Record<string, React.ElementType> = {
  newspaper: FileText,
  "file-text": FileText,
  "shield-check": Shield,
  "book-open": BookOpen,
  calculator: Calculator,
};

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0 },
};

const fadeIn = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 },
};

export default function MTNPageContent() {
  const t = useTranslations("mtnPage");
  const tc = useTranslations("mtnConfig");
  return (
    <div className="min-h-screen">
      {/* ============================================================ */}
      {/* Hero Section */}
      {/* ============================================================ */}
      <section className="relative bg-gradient-to-b from-[#00175d] via-[#00269b] to-[#001a6e] text-white py-12 lg:py-16 overflow-hidden">
        <div
          className="absolute inset-0 opacity-[0.04]"
          style={{
            backgroundImage: `linear-gradient(to right, white 1px, transparent 1px), linear-gradient(to bottom, white 1px, transparent 1px)`,
            backgroundSize: "60px 60px",
          }}
        />

        <div className="container-eminsa relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Content */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              className="space-y-8"
            >
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
                className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full border border-white/20"
              >
                <Factory size={18} className="text-[#0099ce]" />
                <span className="text-sm font-medium">{t("hero.badge")}</span>
              </motion.div>

              <div className="space-y-4">
                <motion.h1
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                  className="text-5xl lg:text-6xl xl:text-7xl font-bold tracking-tight"
                >
                  <span className="text-white">{t("hero.title")}</span>
                </motion.h1>
                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.3 }}
                  className="text-2xl lg:text-3xl xl:text-4xl font-light text-white/90 leading-relaxed text-justify"
                >
                  {tc("info.heroDescription")}
                </motion.p>
              </div>

              {/* <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                className="text-lg text-white/70 leading-relaxed max-w-xl"
              >
                {tc("info.description")}
              </motion.p> */}

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.5 }}
                className="flex flex-wrap gap-4"
              >
                <Link
                  href="/mtn/cotizaciones"
                  className="inline-flex items-center gap-2 bg-white text-[#00269b] hover:bg-gray-100 px-8 py-4 rounded-xl font-semibold transition-all duration-300 shadow-lg hover:shadow-xl hover:-translate-y-0.5"
                >
                  {t("hero.requestQuote")}
                  <ArrowRight size={20} />
                </Link>
                <Link
                  href="/mtn/productos"
                  className="inline-flex items-center gap-2 bg-white/10 hover:bg-white/20 backdrop-blur-sm text-white px-8 py-4 rounded-xl font-semibold transition-all duration-300 border border-white/20"
                >
                  {t("hero.viewProducts")}
                  <ChevronRight size={20} />
                </Link>
              </motion.div>
            </motion.div>

            {/* Hero Visual */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="relative hidden lg:block"
            >
              <div className="relative aspect-square">
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="absolute w-125 h-125 border-2 border-white/50 rounded-full animate-ripple" />
                  <div className="absolute w-125 h-125 border-2 border-white/40 rounded-full animate-ripple" style={{ animationDelay: "0.6s" }} />
                  <div className="absolute w-125 h-125 border-2 border-white/35 rounded-full animate-ripple" style={{ animationDelay: "1.2s" }} />
                  <div className="absolute w-125 h-125 border-2 border-white/30 rounded-full animate-ripple" style={{ animationDelay: "1.8s" }} />
                  <div className="absolute w-125 h-125 border-2 border-white/25 rounded-full animate-ripple" style={{ animationDelay: "2.4s" }} />
                </div>
                <div className="absolute inset-0 flex items-center justify-center">
                  <Link
                    href="/mtn/certificaciones"
                    className="bg-white/10 backdrop-blur-md p-8 rounded-2xl border border-white/20 hover:bg-white/20 hover:scale-105 transition-all duration-300 group relative z-10"
                  >
                    <div className="text-center space-y-2">
                      <Zap size={48} className="mx-auto text-[#0099ce]" />
                      <p className="text-4xl font-bold">DOE 2016</p>
                      <p className="text-sm text-white/70">{t("hero.efficiencyCert")}</p>
                      <p className="text-xs text-white/50 group-hover:text-white/80 transition-colors pt-1">
                        {t("hero.viewCertifications")}
                      </p>
                    </div>
                  </Link>
                </div>

                {/* 30-month warranty badge */}
                <div className="absolute bottom-12 left-8 bg-white/10 backdrop-blur-md rounded-xl p-5 border border-white/20 text-center animate-float-slow z-10">
                  <Shield size={28} className="mx-auto text-[#0099ce] mb-1" />
                  <p className="text-3xl font-bold">30</p>
                  <p className="text-xs text-white/70">{t("hero.warrantyMonths")}</p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ============================================================ */}
      {/* Productos Section */}
      {/* ============================================================ */}
      <section className="py-20 bg-white" id="productos">
        <div className="container-eminsa">
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-center max-w-3xl mx-auto mb-16"
          >
            <span className="inline-flex items-center gap-2 bg-[#0099ce]/10 text-[#0099ce] font-semibold text-sm uppercase tracking-wider mb-4 px-4 py-1.5 rounded-full">
              <Zap size={14} />
              {t("products.badge")}
            </span>
            <h2 className="text-4xl font-bold mb-4">
              <span className="text-[#00269b]">{t("products.title1")}</span>{" "}
              <span className="text-gray-900">{t("products.title2")}</span>
            </h2>
            <div className="w-16 h-1 bg-[#0099ce] mx-auto rounded-full mb-4" />
            <p className="text-lg text-gray-600">
              {t("products.description")}
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {transformerProducts.map((product, index) => (
              <motion.div
                key={product.id}
                variants={fadeUp}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.15 }}
              >
                <Link
                  href={`/mtn/productos/${product.slug}`}
                  className="group relative bg-white rounded-2xl overflow-hidden border border-gray-100 hover:border-[#0099ce]/30 transition-all duration-300 hover:shadow-xl hover:-translate-y-1 block"
                >
                  <div className="h-1 bg-linear-to-r from-[#00269b] to-[#0099ce]" />
                  <div className="aspect-[4/3] bg-gradient-to-br from-[#00269b]/3 to-[#0099ce]/6 flex items-center justify-center">
                    <div className="w-20 h-20 bg-[#00269b]/8 rounded-2xl flex items-center justify-center group-hover:scale-110 group-hover:bg-[#0099ce]/15 transition-all duration-300">
                      <Zap size={36} className="text-[#00269b] group-hover:text-[#0099ce] transition-colors" />
                    </div>
                  </div>
                  <div className="p-6 space-y-4">
                    <div className="flex items-start justify-between">
                      <h3 className="text-xl font-bold text-gray-900 group-hover:text-[#00269b] transition-colors">
                        {tc(`products.${product.slug}.shortName`)}
                      </h3>
                      <ArrowRight size={20} className="text-gray-400 group-hover:text-[#0099ce] group-hover:translate-x-1 transition-all" />
                    </div>
                    <p className="text-gray-600 text-sm line-clamp-2">{tc(`products.${product.slug}.description`)}</p>
                    <div className="pt-4 border-t border-gray-200 space-y-2">
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-500">{t("products.power")}</span>
                        <span className="font-semibold text-gray-900">{product.powerRange}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-500">{t("products.voltage")}</span>
                        <span className="font-semibold text-gray-900">{product.voltageRange}</span>
                      </div>
                    </div>
                    <div className="flex flex-wrap gap-2 pt-2">
                      {product.standards.slice(0, 2).map((std) => (
                        <span
                          key={std}
                          className="inline-flex items-center gap-1 bg-[#0099ce]/10 text-[#0099ce] text-xs font-medium px-2.5 py-1 rounded-full"
                        >
                          <CheckCircle2 size={12} />
                          {std}
                        </span>
                      ))}
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>

          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-center mt-12"
          >
            <Link
              href="/mtn/productos"
              className="inline-flex items-center gap-2 bg-[#00269b] text-white hover:bg-[#00175d] px-6 py-3 rounded-xl font-semibold transition-all duration-300 shadow-md hover:shadow-lg"
            >
              {t("products.viewAll")}
              <ArrowRight size={18} />
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Divider */}
      <div className="container-eminsa"><div className="h-px bg-gray-200" /></div>

      {/* ============================================================ */}
      {/* Normativas y Certificaciones */}
      {/* ============================================================ */}
      <section className="py-20 bg-white">
        <div className="container-eminsa">
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-center max-w-3xl mx-auto mb-14"
          >
            <span className="inline-flex items-center gap-2 bg-[#00269b]/10 text-[#00269b] font-semibold text-sm uppercase tracking-wider mb-4 px-4 py-1.5 rounded-full">
              <Shield size={14} />
              {t("standards.badge")}
            </span>
            <h2 className="text-4xl font-bold mb-4">
              <span className="text-gray-900">{t("standards.title1")}</span>
              <span className="text-[#0099ce]">{t("standards.title2")}</span>
            </h2>
            <div className="w-16 h-1 bg-[#00269b] mx-auto rounded-full mb-4" />
            <p className="text-lg text-gray-600">
              {t("standards.description")}
            </p>
          </motion.div>

          <div className="grid lg:grid-cols-2 gap-8">
            <motion.div
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="bg-gray-50 rounded-2xl p-8 border border-gray-100"
            >
              <div className="flex items-center gap-3 mb-6">
                <div className="w-11 h-11 bg-[#00269b] rounded-lg flex items-center justify-center">
                  <Shield size={22} className="text-white" />
                </div>
                <h3 className="text-xl font-bold text-[#00269b]">{t("standards.normativas")}</h3>
              </div>
              <div className="space-y-3">
                {standards.map((standard) => (
                  <Link
                    key={standard.id}
                    href={`/mtn/normativa/${standard.slug}`}
                    className="group block bg-white rounded-xl p-5 border border-gray-100 hover:border-[#00269b]/20 hover:shadow-lg transition-all duration-300 border-l-4 border-l-[#00269b]/20 hover:border-l-[#00269b]"
                  >
                    <div className="flex items-start justify-between">
                      <div className="space-y-1.5">
                        <h4 className="text-lg font-bold text-gray-900 group-hover:text-[#00269b] transition-colors">
                          {standard.name}
                        </h4>
                        <p className="text-sm text-[#0099ce] font-medium">{tc(`standards.${standard.slug}.fullName`)}</p>
                        <p className="text-gray-600 text-sm line-clamp-2">{tc(`standards.${standard.slug}.description`)}</p>
                      </div>
                      <ChevronRight size={20} className="text-gray-400 group-hover:text-[#0099ce] group-hover:translate-x-1 transition-all flex-shrink-0 mt-1" />
                    </div>
                  </Link>
                ))}
              </div>
              <Link
                href="/mtn/normativa"
                className="inline-flex items-center gap-2 text-[#00269b] hover:text-[#0099ce] font-semibold mt-6 transition-colors"
              >
                {t("standards.viewAllStandards")}
                <ArrowRight size={18} />
              </Link>
            </motion.div>

            <motion.div
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="bg-gray-50 rounded-2xl p-8 border border-gray-100"
            >
              <div className="flex items-center gap-3 mb-6">
                <div className="w-11 h-11 bg-[#0099ce] rounded-lg flex items-center justify-center">
                  <Award size={22} className="text-white" />
                </div>
                <h3 className="text-xl font-bold text-[#0099ce]">{t("standards.certificaciones")}</h3>
              </div>
              <CertificationsTabSelector certifications={certifications} />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Divider */}
      <div className="container-eminsa"><div className="h-px bg-gray-200" /></div>

      {/* ============================================================ */}
      {/* Recursos Section */}
      {/* ============================================================ */}
      <section className="py-20 bg-white" id="recursos">
        <div className="container-eminsa">
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-center max-w-3xl mx-auto mb-12"
          >
            <span className="inline-flex items-center gap-2 bg-[#0099ce]/10 text-[#0099ce] font-semibold text-sm uppercase tracking-wider mb-4 px-4 py-1.5 rounded-full">
              <BookOpen size={14} />
              {t("resources.badge")}
            </span>
            <h2 className="text-3xl font-bold mb-4">
              <span className="text-[#00269b]">{t("resources.title1")}</span>{" "}
              <span className="text-gray-900">{t("resources.title2")}</span>
            </h2>
            <div className="w-16 h-1 bg-[#0099ce] mx-auto rounded-full mb-4" />
            <p className="text-lg text-gray-600">
              {t("resources.description")}
            </p>
          </motion.div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {resources.map((resource, index) => {
              const Icon = resourceIcons[resource.icon] || FileText;
              const accentColors = ["#00269b", "#0099ce", "#00175d", "#00269b"];
              const color = accentColors[index % accentColors.length];
              return (
                <motion.div
                  key={resource.id}
                  variants={fadeUp}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                >
                  <Link
                    href={`/mtn/recursos/${resource.slug}`}
                    className="group flex flex-col items-center text-center p-6 bg-white rounded-2xl border border-gray-100 hover:border-gray-200 transition-all duration-300 hover:shadow-lg hover:-translate-y-1"
                  >
                    <div
                      className="w-14 h-14 rounded-xl flex items-center justify-center mb-4 transition-all duration-300 group-hover:scale-110"
                      style={{ backgroundColor: `${color}12` }}
                    >
                      <Icon size={24} style={{ color }} className="transition-colors" />
                    </div>
                    <h3 className="font-semibold text-gray-900 transition-colors group-hover:text-[#00269b]">
                      {tc(`resources.${resource.slug}.name`)}
                    </h3>
                    <p className="text-sm text-gray-500 mt-1 line-clamp-2">{tc(`resources.${resource.slug}.description`)}</p>
                    <span
                      className="mt-3 text-xs font-semibold opacity-0 group-hover:opacity-100 transition-opacity flex items-center gap-1"
                      style={{ color }}
                    >
                      {t("products.viewMore")} <ArrowRight size={12} />
                    </span>
                  </Link>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ============================================================ */}
      {/* CTA Section */}
      {/* ============================================================ */}
      <section className="pt-12 pb-20 bg-white">
        <div className="container-eminsa">
          <motion.div
            variants={fadeIn}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="relative bg-linear-to-br from-[#00269b] to-[#00175d] rounded-3xl p-10 md:p-16 text-white text-center overflow-hidden"
          >
            <div className="absolute top-0 right-0 w-64 h-64 bg-[#0099ce]/10 rounded-full -translate-y-1/2 translate-x-1/3" />
            <div className="absolute bottom-0 left-0 w-48 h-48 bg-[#0099ce]/5 rounded-full translate-y-1/2 -translate-x-1/4" />

            <div className="relative max-w-3xl mx-auto space-y-8">
              <h2 className="text-3xl md:text-4xl font-bold">
                {t("cta.title1")}<span className="text-[#0099ce]">{t("cta.title2")}</span>{t("cta.title3")}
              </h2>
              <p className="text-lg md:text-xl text-white/80 max-w-2xl mx-auto">
                {t("cta.description")}
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                <Link
                  href="/mtn/cotizaciones"
                  className="inline-flex items-center gap-2 bg-white text-[#00269b] hover:bg-gray-100 px-8 py-4 rounded-xl font-semibold transition-all duration-300 shadow-lg hover:shadow-xl"
                >
                  {t("cta.requestQuote")}
                  <ArrowRight size={20} />
                </Link>
                <a
                  href={`tel:${contactInfo.phone}`}
                  className="inline-flex items-center gap-2 bg-white/10 hover:bg-white/20 backdrop-blur-sm text-white px-8 py-4 rounded-xl font-semibold transition-all duration-300 border border-white/20"
                >
                  <Phone size={20} />
                  {t("cta.callNow")}
                </a>
                <a
                  href={getWhatsAppUrl()}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 bg-[#25D366] hover:bg-[#20BD5A] text-white px-8 py-4 rounded-xl font-semibold transition-all duration-300"
                >
                  <MessageCircle size={20} />
                  WhatsApp
                </a>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
