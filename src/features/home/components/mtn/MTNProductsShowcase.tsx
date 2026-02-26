"use client";

import { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, Layers } from "lucide-react";
import { useTranslations } from "next-intl";

export default function MTNProductsShowcase() {
  const t = useTranslations("home");
  const [activeIndex, setActiveIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  const transformerTypes = [
    {
      id: "tipo-poste",
      name: t("mtn.showcase.tipoPoste.name"),
      shortName: t("mtn.showcase.tipoPoste.shortName"),
      image: "/images/mtn/tipo-poste.png",
      phases: ["3F", "1F"],
      standards: ["DOE 2016", "ANSI C57"],
      power: "15 – 500 KVA",
      voltage: "≤ 34.5 KV",
      description: t("mtn.showcase.tipoPoste.description"),
      features: [
        t("mtn.showcase.tipoPoste.feature1"),
        t("mtn.showcase.tipoPoste.feature2"),
        t("mtn.showcase.tipoPoste.feature3"),
        t("mtn.showcase.tipoPoste.feature4"),
      ],
      href: "/mtn/productos/transformadores/tipo-poste",
    },
    {
      id: "pad-mounted",
      name: t("mtn.showcase.padMounted.name"),
      shortName: t("mtn.showcase.padMounted.shortName"),
      image: "/images/mtn/pad-mounted.png",
      phases: ["3F", "1F"],
      standards: ["DOE 2016", "ANSI C57"],
      power: "30 – 3,000 KVA",
      voltage: "≤ 34.5 KV",
      description: t("mtn.showcase.padMounted.description"),
      features: [
        t("mtn.showcase.padMounted.feature1"),
        t("mtn.showcase.padMounted.feature2"),
        t("mtn.showcase.padMounted.feature3"),
        t("mtn.showcase.padMounted.feature4"),
      ],
      href: "/mtn/productos/transformadores/pad-mounted",
    },
  ];

  const activeTransformer = transformerTypes[activeIndex];

  const nextSlide = useCallback(() => {
    setActiveIndex((prev) => (prev + 1) % transformerTypes.length);
  }, [transformerTypes.length]);

  const goToSlide = (index: number) => {
    setActiveIndex(index);
    setIsAutoPlaying(false);
  };

  useEffect(() => {
    if (!isAutoPlaying) return;
    const interval = setInterval(nextSlide, 6000);
    return () => clearInterval(interval);
  }, [isAutoPlaying, nextSlide]);

  return (
    <section className="py-24 lg:py-32 bg-[#001689] relative overflow-hidden">
      {/* Ambient blurs */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 right-0 w-125 h-125 bg-white/5 rounded-full blur-[120px]" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-[#00A3E0]/8 rounded-full blur-[100px]" />
      </div>

      <div className="container-eminsa relative">

        {/* ── Header row ─────────────────────────────────── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.55 }}
          className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-5 mb-10"
        >
          {/* Title */}
          <div>
            <span className="inline-flex items-center gap-2 text-[#00A3E0] text-xs font-bold uppercase tracking-[0.2em] mb-2">
              <Layers className="w-3.5 h-3.5" />
              {t("mtn.showcase.sectionLabel")}
            </span>
            <h2 className="text-3xl md:text-4xl font-bold text-white">
              {t("mtn.showcase.title")}
            </h2>
          </div>

          {/* Segmented tab selector */}
          <div className="flex items-center gap-1 bg-white/8 p-1 rounded-xl w-fit">
            {transformerTypes.map((type, index) => (
              <button
                key={type.id}
                onClick={() => goToSlide(index)}
                className="relative px-5 py-2.5 rounded-lg text-sm font-semibold transition-colors duration-200"
                style={{ color: activeIndex === index ? "#001689" : "rgba(255,255,255,0.6)" }}
              >
                {activeIndex === index && (
                  <motion.span
                    layoutId="showcase-tab"
                    className="absolute inset-0 bg-white rounded-lg"
                    transition={{ type: "spring", stiffness: 380, damping: 28 }}
                  />
                )}
                <span className="relative z-10">{type.shortName}</span>
              </button>
            ))}
          </div>
        </motion.div>

        {/* ── Product showcase ─────────────────────────── */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeIndex}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            className="grid lg:grid-cols-[1fr_1.25fr] rounded-2xl overflow-hidden border border-white/10"
          >
            {/* ── Left: image stage ── */}
            <div className="relative flex flex-col items-center justify-center gap-5 p-10 bg-white/3 min-h-80">
              {/* Radial glow */}
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                <div className="w-60 h-60 rounded-full bg-[#00A3E0]/12 blur-3xl" />
              </div>

              {/* Image */}
              <div className="relative w-full max-w-65 h-64 md:h-72 z-10">
                <Image
                  src={activeTransformer.image}
                  alt={activeTransformer.name}
                  fill
                  sizes="(max-width: 1024px) 80vw, 320px"
                  className="object-contain drop-shadow-2xl"
                />
              </div>

              {/* Phase pills */}
              <div className="flex gap-2 z-10">
                {activeTransformer.phases.map((phase) => (
                  <span
                    key={phase}
                    className="px-4 py-1.5 bg-white/8 border border-white/15 rounded-full text-white/80 text-xs font-bold tracking-widest"
                  >
                    {phase}
                  </span>
                ))}
              </div>
            </div>

            {/* ── Right: product info ── */}
            <div className="flex flex-col gap-6 p-10 border-l border-white/10">

              {/* Name + description */}
              <div>
                <h3 className="text-2xl md:text-3xl font-bold text-white leading-snug">
                  {activeTransformer.name}
                </h3>
                <p className="text-white/55 text-sm leading-relaxed mt-2">
                  {activeTransformer.description}
                </p>
              </div>

              {/* Inline specs */}
              <div className="flex gap-10">
                <div>
                  <span className="text-white/35 text-[11px] uppercase tracking-widest block">
                    {t("mtn.specLabels.power")}
                  </span>
                  <span className="text-white font-bold text-base mt-0.5 block">
                    {activeTransformer.power}
                  </span>
                </div>
                <div>
                  <span className="text-white/35 text-[11px] uppercase tracking-widest block">
                    {t("mtn.specLabels.voltage")}
                  </span>
                  <span className="text-white font-bold text-base mt-0.5 block">
                    {activeTransformer.voltage}
                  </span>
                </div>
              </div>

              {/* Separator */}
              <div className="h-px bg-white/8" />

              {/* Standards */}
              <div className="flex flex-wrap gap-2">
                {activeTransformer.standards.map((standard) => (
                  <span
                    key={standard}
                    className="px-3 py-1.5 bg-[#00A3E0]/12 border border-[#00A3E0]/25 text-[#00A3E0] rounded-lg text-xs font-bold uppercase tracking-wide"
                  >
                    {standard}
                  </span>
                ))}
              </div>

              {/* Features */}
              <ul className="space-y-2.5">
                {activeTransformer.features.map((feature, i) => (
                  <li key={i} className="flex items-center gap-3">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#00A3E0] shrink-0" />
                    <span className="text-white/65 text-sm">{feature}</span>
                  </li>
                ))}
              </ul>

              {/* CTAs */}
              <div className="flex flex-wrap gap-3 mt-auto pt-2">
                <Link
                  href="/mtn/cotizaciones"
                  className="inline-flex items-center gap-2 bg-[#00A3E0] hover:bg-[#0091C7] text-white px-6 py-3 rounded-xl text-sm font-semibold transition-colors duration-300 group"
                >
                  {t("mtn.cta.quote")}
                  <ArrowRight
                    size={15}
                    className="group-hover:translate-x-0.5 transition-transform"
                  />
                </Link>
                <Link
                  href={activeTransformer.href}
                  className="inline-flex items-center gap-2 bg-white/8 hover:bg-white/14 border border-white/12 text-white/80 hover:text-white px-6 py-3 rounded-xl text-sm font-semibold transition-all duration-300"
                >
                  {t("mtn.cta.viewDetails")}
                </Link>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>

        {/* ── Progress indicators ──────────────────────── */}
        <div className="flex justify-center gap-2 mt-6">
          {transformerTypes.map((_, i) => (
            <button
              key={i}
              onClick={() => goToSlide(i)}
              aria-label={`${i + 1}`}
              className={`h-0.5 rounded-full transition-all duration-300 ${
                activeIndex === i
                  ? "w-8 bg-[#00A3E0]"
                  : "w-4 bg-white/20 hover:bg-white/40"
              }`}
            />
          ))}
        </div>

      </div>
    </section>
  );
}
