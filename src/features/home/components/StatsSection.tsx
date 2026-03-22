"use client";

import { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { ShieldCheck, FileCheck, Award, BadgeCheck, ArrowRight } from "lucide-react";
import Link from "next/link";
import { useTranslations } from "next-intl";

const certItems = [
  {
    id: "iso9001",
    logo: "/images/SelloAENORISO9001_NEG.png",
    color: "#00269b",
  },
  {
    id: "iqnet",
    logo: "/images/IQNET_RCMark_PosCMYK.png",
    color: "#0099ce",
  },
  {
    id: "ul",
    logo: "/certificados/ul-certified-logo.jpg",
    color: "#0099ce",
  },
];

const standardItems = [
  { id: "ansi", abbr: "ANSI", color: "#00269b" },
  { id: "doe", abbr: "DOE", color: "#009e49" },
  { id: "ieee", abbr: "IEEE", color: "#00269b" },
];

export default function StatsSection() {
  const t = useTranslations("home");
  const [activeStandard, setActiveStandard] = useState<string | null>(null);

  return (
    <section className="py-20 lg:py-28 bg-gradient-to-b bg-white relative overflow-hidden">
      {/* Background decorations */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-10 w-72 h-72 bg-[#00269b]/5 rounded-full blur-[100px]" />
        <div className="absolute bottom-20 right-10 w-64 h-64 bg-[#009e49]/5 rounded-full blur-[80px]" />
      </div>

      <div className="container-eminsa relative">
        {/* Section eyebrow */}
        <div className="flex items-center gap-3 mb-8">
          <span className="h-px w-8 inline-block bg-[#00269b]" />
          <span className="text-xs font-bold uppercase tracking-[0.3em] text-[#00269b]">
            Calidad · Certificaciones y Normativas
          </span>
        </div>

        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          {/* <span className="inline-flex items-center gap-2 px-4 py-2 bg-[#00269b]/10 text-[#00269b] rounded-full text-sm font-semibold mb-6">
            <Award className="w-4 h-4" />
            {t("certifications.title")}
          </span> */}
          <h3 className="text-3xl lg:text-2xl xl:text-4xl font-bold text-[#00269b] mb-4">
            {t("certifications.subtitle")}
          </h3>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
          {/* Certificaciones */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <div className="flex items-center gap-3 mb-8">
              <div className="w-10 h-10 bg-[#00269b]/10 rounded-xl flex items-center justify-center">
                <ShieldCheck className="w-5 h-5 text-[#00269b]" />
              </div>
              <h4 className="text-xl font-bold text-[#00269b]">
                {t("certifications.certificationsLabel")}
              </h4>
            </div>

            <div className="space-y-5">
              {certItems.map((cert, index) => (
                <motion.div
                  key={cert.id}
                  initial={{ opacity: 0, y: 15 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.15 + index * 0.1 }}
                  className="group"
                >
                  <div className="flex items-center gap-5 bg-white rounded-2xl border border-gray-100 px-6 py-5 shadow-sm hover:shadow-lg hover:-translate-y-0.5 transition-all duration-300">
                    <div className="w-20 h-20 bg-white rounded-xl flex items-center justify-center p-2 border border-gray-100 shrink-0 group-hover:border-[#00269b]/20 transition-colors">
                      <Image
                        src={cert.logo}
                        alt={t(`certifications.${cert.id}Name`)}
                        width={80}
                        height={80}
                        className="object-contain"
                      />
                    </div>
                    <div className="flex-1">
                      <p className="font-bold text-gray-900 text-lg mb-1">
                        {t(`certifications.${cert.id}Name`)}
                      </p>
                      <p className="text-gray-500 text-sm leading-relaxed">
                        {t(`certifications.${cert.id}`)}
                      </p>
                    </div>
                    <div className="shrink-0">
                      <div className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-green-50 text-green-700 rounded-full text-xs font-semibold">
                        <BadgeCheck className="w-3.5 h-3.5" />
                        {t("certifications.active")}
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Normativas */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <div className="flex items-center gap-3 mb-8">
              <div className="w-10 h-10 bg-[#009e49]/10 rounded-xl flex items-center justify-center">
                <FileCheck className="w-5 h-5 text-[#009e49]" />
              </div>
              <h4 className="text-xl font-bold text-[#00269b]">
                {t("certifications.standardsLabel")}
              </h4>
            </div>

            <div className="grid grid-cols-2 gap-4">
              {standardItems.map((std, index) => (
                <motion.button
                  key={std.id}
                  initial={{ opacity: 0, scale: 0.95 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.2 + index * 0.08 }}
                  onClick={() => setActiveStandard(activeStandard === std.id ? null : std.id)}
                  className="relative text-left bg-white rounded-2xl border border-gray-100 p-5 shadow-sm hover:shadow-lg hover:-translate-y-0.5 transition-all duration-300 group cursor-pointer"
                >
                  <div
                    className="w-14 h-14 rounded-xl flex items-center justify-center mb-4 transition-colors"
                    style={{ backgroundColor: `${std.color}15` }}
                  >
                    <span
                      className="font-bold text-lg"
                      style={{ color: std.color }}
                    >
                      {std.abbr}
                    </span>
                  </div>
                  <p className="font-bold text-gray-900 mb-1">
                    {t(`certifications.${std.id}Name`)}
                  </p>
                  <p className="text-gray-500 text-xs leading-relaxed">
                    {t(`certifications.${std.id}`)}
                  </p>

                  <AnimatePresence>
                    {activeStandard === std.id && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        className="overflow-hidden"
                      >
                        <p className="text-gray-600 text-xs mt-3 pt-3 border-t border-gray-100 leading-relaxed">
                          {t(`certifications.${std.id}Detail`)}
                        </p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.button>
              ))}
            </div>
          </motion.div>
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
          className="text-center mt-14"
        >
          <Link
            href="/mtn/certificaciones"
            className="inline-flex items-center gap-2 px-8 py-4 bg-[#00269b] text-white font-semibold rounded-xl hover:bg-[#00175d] transition-all duration-300 group"
          >
            {t("certifications.viewAll")}
            <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
