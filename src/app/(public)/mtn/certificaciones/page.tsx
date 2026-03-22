"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import {
  ChevronRight,
  Award,
  ArrowRight,
  CheckCircle2,
  Shield,
  Globe,
  Star,
  Zap,
  BadgeCheck,
} from "lucide-react";
import { certifications } from "@/config/mtn-data";
import { useTranslations } from "next-intl";

const whyCards = [
  { icon: Shield, color: "#00269b", bgKey: "security" },
  { icon: Award, color: "#0099ce", bgKey: "quality" },
  { icon: Globe, color: "#009e49", bgKey: "global" },
];

const statsData = [
  { value: "3", label: "Certificaciones y Normas", icon: BadgeCheck },
  { value: "ANSI/IEEE", label: "Normas Aplicadas", icon: Zap },
  { value: "50+", label: "Años de Experiencia", icon: Star },
];

export default function CertificacionesPage() {
  const t = useTranslations("pages.mtn.certificaciones");
  const [activeCert, setActiveCert] = useState(0);

  const filteredCertifications = certifications.filter((c) => c.id !== "doe-2016");
  const cert = filteredCertifications[activeCert];

  return (
    <div className="min-h-screen bg-gray-50 overflow-x-hidden">
      {/* ─── Hero ─────────────────────────────────────────────────── */}
      <section className="relative bg-linear-to-br from-[#00269b] via-[#001f80] to-[#00175d] text-white py-20 overflow-hidden">
        {/* Animated background orbs */}
        <motion.div
          animate={{ x: [0, 30, -20, 0], y: [0, -20, 15, 0] }}
          transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-10 right-20 w-72 h-72 bg-[#0099ce]/20 rounded-full blur-[80px] pointer-events-none"
        />
        <motion.div
          animate={{ x: [0, -25, 15, 0], y: [0, 20, -15, 0] }}
          transition={{ duration: 22, repeat: Infinity, ease: "easeInOut", delay: 5 }}
          className="absolute bottom-10 left-10 w-56 h-56 bg-white/10 rounded-full blur-[60px] pointer-events-none"
        />

        <div className="container-eminsa relative">
          {/* Breadcrumb */}
          <motion.nav
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="flex items-center gap-2 text-sm text-white/60 mb-8"
          >
            <Link href="/" className="hover:text-white transition-colors">{t("breadcrumb.home")}</Link>
            <ChevronRight size={14} />
            <Link href="/mtn" className="hover:text-white transition-colors">MTN</Link>
            <ChevronRight size={14} />
            <span className="text-white">{t("breadcrumb.certificaciones")}</span>
          </motion.nav>

          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -40 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7 }}
            >
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.2 }}
                className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full border border-white/20 mb-6"
              >
                <Award size={18} />
                <span className="text-sm font-medium">{t("hero.badge")}</span>
              </motion.div>
              <h1 className="text-4xl lg:text-5xl xl:text-6xl font-bold mb-6 leading-tight">
                {t("hero.title")}
              </h1>
              <p className="text-xl text-white/80 leading-relaxed mb-8">
                {t("hero.description")}
              </p>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                className="flex flex-wrap gap-3"
              >
                {filteredCertifications.map((c, i) => (
                  <button
                    key={c.id}
                    onClick={() => setActiveCert(i)}
                    className={`px-4 py-2 rounded-xl text-sm font-semibold transition-all duration-300 ${
                      activeCert === i
                        ? "bg-white text-[#00269b] shadow-lg"
                        : "bg-white/10 text-white hover:bg-white/20 border border-white/20"
                    }`}
                  >
                    {c.name}
                  </button>
                ))}
              </motion.div>
            </motion.div>


          </div>
        </div>
      </section>

      {/* ─── Stats Bar ─────────────────────────────────────────────── */}
      <section className="py-8 bg-white border-b border-gray-100">
        <div className="container-eminsa">
          <div className="flex flex-wrap justify-center gap-8 lg:gap-16">
            {statsData.map((stat, i) => {
              const Icon = stat.icon;
              return (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="flex items-center gap-4"
                >
                  <div className="w-12 h-12 bg-[#00269b]/10 rounded-xl flex items-center justify-center">
                    <Icon size={24} className="text-[#00269b]" />
                  </div>
                  <div>
                    <p className="text-2xl font-bold text-[#00269b]">{stat.value}</p>
                    <p className="text-sm text-gray-500">{stat.label}</p>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ─── Certification Detail Tabs ─────────────────────────────── */}
      <section className="py-16 lg:py-24">
        <div className="container-eminsa">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <span className="inline-block px-3 py-1 bg-[#00269b]/10 text-[#00269b] text-sm font-medium rounded-full mb-4">
              {t("certificationLabel")}
            </span>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
              Nuestras Certificaciones
            </h2>
          </motion.div>

          {/* Tab Buttons */}
          <div className="flex flex-wrap justify-center gap-3 mb-12">
            {filteredCertifications.map((c, i) => (
              <motion.button
                key={c.id}
                onClick={() => setActiveCert(i)}
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                className={`relative px-6 py-3 rounded-xl text-sm font-semibold transition-all duration-300 ${
                  activeCert === i
                    ? "bg-[#00269b] text-white shadow-lg shadow-[#00269b]/20"
                    : "bg-white text-gray-600 hover:bg-gray-50 border border-gray-200"
                }`}
              >
                {activeCert === i && (
                  <motion.span
                    layoutId="activeTab"
                    className="absolute inset-0 bg-[#00269b] rounded-xl"
                    style={{ zIndex: -1 }}
                  />
                )}
                {c.name}
              </motion.button>
            ))}
          </div>

          {/* Active Cert Detail */}
          <AnimatePresence mode="wait">
            <motion.div
              key={activeCert}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -30 }}
              transition={{ duration: 0.4 }}
              className="bg-white rounded-3xl shadow-xl overflow-hidden border border-gray-100"
            >
              <div className="grid lg:grid-cols-5 gap-0">
                {/* Left visual panel */}
                <div className="lg:col-span-2 bg-linear-to-br from-[#00269b]/5 to-[#0099ce]/10 p-8 lg:p-12 flex flex-col items-center justify-center gap-6">
                  <motion.div
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ duration: 0.4, delay: 0.1 }}
                    className="relative"
                  >
                    {/* Decorative rings */}
                    <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                      <motion.div
                        animate={{ rotate: 360 }}
                        transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                        className="w-48 h-48 border border-dashed border-[#00269b]/20 rounded-full"
                      />
                    </div>
                    <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                      <motion.div
                        animate={{ rotate: -360 }}
                        transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
                        className="w-36 h-36 border border-dashed border-[#0099ce]/30 rounded-full"
                      />
                    </div>
                    <div className="relative w-32 h-32 bg-white rounded-2xl shadow-xl flex items-center justify-center">
                      {cert.image ? (
                        <Image src={cert.image} alt={cert.name} width={80} height={80} className="object-contain" />
                      ) : (
                        <Award size={56} className="text-[#00269b]" />
                      )}
                    </div>
                  </motion.div>
                  <div className="text-center">
                    <p className="text-xs text-gray-400 uppercase tracking-wider mb-1">{t("issuedBy")}</p>
                    <p className="font-bold text-[#00269b] text-lg">{cert.issuingBody}</p>
                  </div>
                  {cert.validUntil && (
                    <div className="px-4 py-2 bg-green-50 rounded-xl border border-green-200 text-center">
                      <p className="text-xs text-green-600 font-medium">{t("validUntil")} {cert.validUntil}</p>
                    </div>
                  )}
                </div>

                {/* Right content */}
                <div className="lg:col-span-3 p-8 lg:p-12">
                  <div className="space-y-8">
                    <div>
                      <span className="inline-block text-[#0099ce] font-semibold text-xs uppercase tracking-widest mb-2">
                        {cert.complianceOnly ? "Cumplimiento de Estándar" : t("certificationLabel")}
                      </span>
                      <h2 className="text-3xl font-bold text-gray-900 mb-1">{cert.name}</h2>
                      <p className="text-gray-400 text-sm">{cert.fullName}</p>
                    </div>

                    <p className="text-gray-600 leading-relaxed text-base">
                      {cert.description}
                    </p>

                    <div>
                      <h3 className="font-bold text-gray-900 mb-4 flex items-center gap-2">
                        <CheckCircle2 size={18} className="text-[#00269b]" />
                        {t("benefitsTitle")}
                      </h3>
                      <div className="grid sm:grid-cols-2 gap-3">
                        {cert.benefits.map((_, idx) => (
                          <motion.div
                            key={idx}
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: idx * 0.07 }}
                            className="flex items-start gap-3 bg-[#00269b]/5 hover:bg-[#00269b]/10 p-3 rounded-xl transition-colors"
                          >
                            <CheckCircle2 size={16} className="text-[#00269b] shrink-0 mt-0.5" />
                            <span className="text-gray-700 text-sm leading-snug">
                              {t(`certs.${cert.id}.benefits.${idx}`)}
                            </span>
                          </motion.div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Navigation arrows between certs */}
          <div className="flex justify-center items-center gap-4 mt-8">
            <button
              onClick={() => setActiveCert((prev) => (prev - 1 + filteredCertifications.length) % filteredCertifications.length)}
              className="w-10 h-10 rounded-full bg-white border border-gray-200 hover:border-[#00269b] hover:text-[#00269b] flex items-center justify-center transition-colors shadow-sm"
              aria-label="Previous"
            >
              <ChevronRight size={18} className="rotate-180" />
            </button>
            <div className="flex gap-2">
              {filteredCertifications.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setActiveCert(i)}
                  className={`h-2 rounded-full transition-all duration-300 ${
                    activeCert === i ? "w-8 bg-[#00269b]" : "w-2 bg-gray-300 hover:bg-gray-400"
                  }`}
                  aria-label={`Certification ${i + 1}`}
                />
              ))}
            </div>
            <button
              onClick={() => setActiveCert((prev) => (prev + 1) % filteredCertifications.length)}
              className="w-10 h-10 rounded-full bg-white border border-gray-200 hover:border-[#00269b] hover:text-[#00269b] flex items-center justify-center transition-colors shadow-sm"
              aria-label="Next"
            >
              <ChevronRight size={18} />
            </button>
          </div>
        </div>
      </section>

      {/* ─── Why Certifications Matter ──────────────────────────────── */}
      <section className="py-16 bg-white">
        <div className="container-eminsa">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center max-w-3xl mx-auto mb-12"
          >
            <h2 className="text-3xl font-bold text-gray-900 mb-4">{t("why.title")}</h2>
            <p className="text-lg text-gray-600">{t("why.description")}</p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {whyCards.map(({ icon: Icon, color, bgKey }, i) => (
              <motion.div
                key={bgKey}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.15 }}
                whileHover={{ y: -6 }}
                className="group text-center p-8 bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-xl transition-all duration-300"
              >
                <motion.div
                  whileHover={{ scale: 1.1, rotate: 5 }}
                  transition={{ type: "spring", stiffness: 300 }}
                  className="w-20 h-20 rounded-2xl flex items-center justify-center mx-auto mb-6"
                  style={{ backgroundColor: `${color}15` }}
                >
                  <Icon size={36} style={{ color }} />
                </motion.div>
                <h3 className="font-bold text-gray-900 mb-3 text-lg">
                  {t(`why.${bgKey}.title`)}
                </h3>
                <p className="text-gray-500 text-sm leading-relaxed">
                  {t(`why.${bgKey}.description`)}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── CTA ───────────────────────────────────────────────────── */}
      <section className="py-16 bg-linear-to-br from-[#0099ce] to-[#00269b] text-white relative overflow-hidden">
        <motion.div
          animate={{ x: [0, 20, -10, 0], y: [0, -15, 10, 0] }}
          transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-[60px] pointer-events-none"
        />
        <div className="container-eminsa text-center relative">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl font-bold mb-4">{t("cta.title")}</h2>
            <p className="text-white/80 mb-8 max-w-2xl mx-auto">{t("cta.description")}</p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link
                href="/mtn/cotizaciones"
                className="inline-flex items-center gap-2 bg-white text-[#00269b] hover:bg-gray-100 px-8 py-4 rounded-xl font-semibold transition-all shadow-lg hover:shadow-xl hover:-translate-y-0.5"
              >
                {t("cta.requestQuote")}
                <ArrowRight size={20} />
              </Link>
              <Link
                href="/mtn/productos"
                className="inline-flex items-center gap-2 bg-white/10 hover:bg-white/20 text-white px-8 py-4 rounded-xl font-semibold transition-all border border-white/30 hover:-translate-y-0.5"
              >
                {t("cta.viewProducts")}
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
