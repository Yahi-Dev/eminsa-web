"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import {
  ChevronRight,
  Shield,
  Leaf,
  ArrowRight,
  CheckCircle2,
  FileText,
} from "lucide-react";
import { standards } from "@/config/mtn-data";
import { useTranslations } from "next-intl";

const standardIcons: Record<string, React.ElementType> = {
  shield: Shield,
  leaf: Leaf,
};

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0 },
};

export default function NormativaPageContent() {
  const t = useTranslations("pages.mtn.normativa");
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero */}
      <section className="bg-gradient-to-br from-[#00269b] to-[#00175d] text-white py-16">
        <div className="container-eminsa">
          <motion.nav
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="flex items-center gap-2 text-sm text-white/60 mb-6"
          >
            <Link href="/" className="hover:text-white transition-colors">{t("breadcrumb.home")}</Link>
            <ChevronRight size={14} />
            <Link href="/mtn" className="hover:text-white transition-colors">{t("breadcrumb.mtn")}</Link>
            <ChevronRight size={14} />
            <span className="text-white">{t("breadcrumb.normativa")}</span>
          </motion.nav>

          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="max-w-3xl"
          >
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 bg-white/10 rounded-xl flex items-center justify-center">
                <Shield size={24} />
              </div>
              <span className="text-[#0099ce] font-semibold">{t("hero.badge")}</span>
            </div>
            <h1 className="text-4xl lg:text-5xl font-bold mb-4">{t("hero.titleFull")}</h1>
            <p className="text-xl text-white/80">
              {t("hero.description")}
            </p>
          </motion.div>
        </div>
      </section>

      {/* Standards Grid */}
      <section className="py-16">
        <div className="container-eminsa">
          <div className="grid lg:grid-cols-2 gap-8">
            {standards.map((standard, index) => {
              const Icon = standardIcons[standard.icon] || Shield;
              return (
                <motion.div
                  key={standard.id}
                  variants={fadeUp}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.15 }}
                  className="bg-white rounded-2xl shadow-lg overflow-hidden border border-gray-100 hover:shadow-xl transition-shadow"
                >
                  <div className="bg-gradient-to-r from-[#00269b] to-[#0099ce] p-6 text-white">
                    <div className="flex items-center gap-4">
                      <div className="w-16 h-16 bg-white/20 rounded-xl flex items-center justify-center">
                        <Icon size={32} />
                      </div>
                      <div>
                        <h2 className="text-2xl font-bold">{standard.name}</h2>
                        <p className="text-white/80 text-sm">{t(`standards.${standard.id}.fullName`)}</p>
                      </div>
                    </div>
                  </div>

                  <div className="p-6 space-y-6">
                    <p className="text-gray-600 leading-relaxed">{t(`standards.${standard.id}.description`)}</p>

                    <div>
                      <h3 className="font-semibold text-gray-900 mb-3">{t("labels.details")}</h3>
                      <ul className="space-y-2">
                        {standard.details.map((_detail, idx) => (
                          <motion.li
                            key={idx}
                            initial={{ opacity: 0, x: -10 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.3, delay: idx * 0.07 }}
                            className="flex items-start gap-2 text-sm text-gray-600"
                          >
                            <CheckCircle2 size={16} className="text-green-500 flex-shrink-0 mt-0.5" />
                            <span>{t(`standards.${standard.id}.details.${idx}`)}</span>
                          </motion.li>
                        ))}
                      </ul>
                    </div>

                    <div>
                      <h3 className="font-semibold text-gray-900 mb-3">{t("labels.benefits")}</h3>
                      <div className="grid grid-cols-2 gap-2">
                        {standard.benefits.map((_benefit, idx) => (
                          <motion.div
                            key={idx}
                            initial={{ opacity: 0, scale: 0.95 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.3, delay: idx * 0.05 }}
                            className="flex items-center gap-2 bg-gray-50 px-3 py-2 rounded-lg text-sm"
                          >
                            <div className="w-2 h-2 bg-[#0099ce] rounded-full" />
                            <span className="text-gray-700">{t(`standards.${standard.id}.benefits.${idx}`)}</span>
                          </motion.div>
                        ))}
                      </div>
                    </div>

                    <Link
                      href={`/mtn/normativa/${standard.slug}`}
                      className="inline-flex items-center gap-2 text-[#00269b] hover:text-[#0099ce] font-semibold transition-colors"
                    >
                      {t("labels.viewMore")}
                      <ArrowRight size={18} />
                    </Link>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Additional Info */}
      <section className="py-16 bg-white">
        <div className="container-eminsa">
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="max-w-4xl mx-auto"
          >
            <div className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-2xl p-8 lg:p-12">
              <div className="flex items-start gap-4 mb-6">
                <div className="w-12 h-12 bg-[#00269b] rounded-xl flex items-center justify-center flex-shrink-0">
                  <FileText size={24} className="text-white" />
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-gray-900">{t("documentation.title")}</h2>
                  <p className="text-gray-600 mt-1">
                    {t("documentation.description")}
                  </p>
                </div>
              </div>
              <div className="grid sm:grid-cols-2 gap-4">
                {[
                  { href: "/mtn/recursos/fichas-tecnicas", icon: FileText, label: t("documentation.technicalSheets") },
                  { href: "/mtn/certificaciones", icon: Shield, label: t("documentation.certifications") },
                ].map(({ href, icon: Icon, label }, idx) => (
                  <motion.div
                    key={label}
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: idx * 0.1 }}
                  >
                    <Link
                      href={href}
                      className="flex items-center justify-between bg-white p-4 rounded-xl hover:shadow-md transition-shadow"
                    >
                      <div className="flex items-center gap-3">
                        <Icon size={20} className="text-[#00269b]" />
                        <span className="font-medium text-gray-900">{label}</span>
                      </div>
                      <ChevronRight size={18} className="text-gray-400" />
                    </Link>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* CTA */}
      <motion.section
        variants={fadeUp}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="py-16 bg-gradient-to-br from-[#00269b] to-[#00175d] text-white"
      >
        <div className="container-eminsa text-center">
          <h2 className="text-3xl font-bold mb-4">{t("cta.title")}</h2>
          <p className="text-white/80 mb-8 max-w-2xl mx-auto">
            {t("cta.description")}
          </p>
          <Link
            href="/mtn/cotizaciones"
            className="inline-flex items-center gap-2 bg-white text-[#00269b] hover:bg-gray-100 px-8 py-4 rounded-xl font-semibold transition-colors"
          >
            {t("cta.button")}
            <ArrowRight size={20} />
          </Link>
        </div>
      </motion.section>
    </div>
  );
}
