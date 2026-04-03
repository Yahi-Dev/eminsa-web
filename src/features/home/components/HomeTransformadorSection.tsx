"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Wrench, Shield, Zap, ArrowRight, Package } from "lucide-react";
import BeforeAfterSlider from "@/components/shared/BeforeAfterSlider";
import { useTranslations } from "next-intl";
import MarqueeEyebrow from "@/components/shared/MarqueeEyebrow";

const FEATURE_ICONS = [Shield, Wrench, Zap];
const FEATURE_COLORS = ["#009e49", "#0099ce", "#0099ce"];

export default function HomeTransformadorSection() {
  const t = useTranslations("home");

  const features = [
    {
      icon: FEATURE_ICONS[0],
      color: FEATURE_COLORS[0],
      title: t("rst.diagnosisTitle"),
      desc: t("rst.diagnosisDesc"),
    },
    {
      icon: FEATURE_ICONS[1],
      color: FEATURE_COLORS[1],
      title: t("rst.restorationTitle"),
      desc: t("rst.restorationDesc"),
    },
    {
      icon: FEATURE_ICONS[2],
      color: FEATURE_COLORS[2],
      title: t("rst.guaranteeTitle"),
      desc: t("rst.guaranteeDesc"),
    },
  ];

  return (
    <section className="py-10 lg:py-14 bg-white">
      <div className="container-eminsa">
        {/* Eyebrow */}
        <MarqueeEyebrow text={t("rst.sectionLabel")} color="#0099ce" />

        {/* Title — outside the card */}
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.55 }}
          className="text-3xl md:text-4xl xl:text-5xl font-bold text-[#00269b] mb-8 max-w-2xl"
        >
          {t("rst.title")}{" "}
          <span className="text-[#0099ce]">{t("rst.titleAccent")}</span>
        </motion.h2>

        {/* ── Card ── */}
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.55, delay: 0.1 }}
          className="grid lg:grid-cols-[1fr_1.15fr] rounded-2xl overflow-hidden border border-[#0099ce]/20 shadow-lg shadow-[#0099ce]/5 bg-white"
        >
          {/* ── Left panel: features + CTAs ── */}
          <div className="relative flex flex-col p-8 lg:p-10">
            {/* Left accent bar */}
            <span className="absolute left-0 top-10 bottom-10 w-0.75 rounded-full bg-linear-to-b from-[#0099ce] via-[#009e49] to-[#0099ce]/20" />

            {/* Features */}
            <div className="flex flex-col gap-0 flex-1">
              {features.map((item, i) => (
                <motion.div
                  key={item.title}
                  initial={{ opacity: 0, x: -18 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.45, delay: 0.15 + i * 0.12 }}
                  className={`flex items-start gap-4 py-5 ${
                    i < features.length - 1
                      ? "border-b border-dashed border-[#0099ce]/15"
                      : ""
                  }`}
                >
                  {/* Number badge */}
                  <div className="flex flex-col items-center gap-1.5 shrink-0">
                    <motion.div
                      whileHover={{ scale: 1.12, rotate: -8 }}
                      transition={{ type: "spring", stiffness: 320, damping: 14 }}
                      className="w-11 h-11 rounded-xl flex items-center justify-center"
                      style={{ backgroundColor: `${item.color}18` }}
                    >
                      <item.icon className="w-5 h-5" style={{ color: item.color }} />
                    </motion.div>
                    <span
                      className="text-[10px] font-black tabular-nums leading-none"
                      style={{ color: `${item.color}80` }}
                    >
                      0{i + 1}
                    </span>
                  </div>

                  <div className="pt-0.5">
                    <h3 className="font-bold text-[#00269b] text-base mb-1 leading-snug">
                      {item.title}
                    </h3>
                    <p className="text-sm text-[#6d6e6d] leading-relaxed">
                      {item.desc}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* ── CTAs at bottom ── */}
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.45, delay: 0.5 }}
              className="flex flex-col sm:flex-row gap-3 mt-8 pt-6 border-t border-[#0099ce]/10"
            >
              <Link
                href="/etrys/cotizaciones"
                className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-[#0099ce] hover:bg-[#007fb0] text-white font-semibold rounded-xl transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lg hover:shadow-[#0099ce]/25 group text-sm"
              >
                {t("rst.requestQuote")}
                <ArrowRight size={16} className="group-hover:translate-x-0.5 transition-transform" />
              </Link>
              <Link
                href="/etrys/productos"
                className="inline-flex items-center justify-center gap-2 px-6 py-3 border border-[#0099ce]/30 text-[#0099ce] hover:border-[#0099ce] hover:bg-[#0099ce]/5 font-semibold rounded-xl transition-all duration-300 hover:-translate-y-0.5 text-sm"
              >
                <Package size={16} />
                {t("rst.viewProducts")}
              </Link>
            </motion.div>
          </div>

          {/* ── Right panel: before/after slider ── */}
          <div className="flex items-center justify-center p-6 lg:p-8 border-t lg:border-t-0 lg:border-l border-[#0099ce]/10">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.55, delay: 0.2 }}
              className="w-full max-w-md aspect-square"
            >
              <BeforeAfterSlider
                beforeImage="https://res.cloudinary.com/dixsymrg5/image/upload/v1775242406/eminsa/site/transformador-before.png"
                afterImage="https://res.cloudinary.com/dixsymrg5/image/upload/v1775242405/eminsa/site/transformador-after.png"
                beforeLabel="Before"
                afterLabel="After"
              />
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
