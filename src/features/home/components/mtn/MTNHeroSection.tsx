"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { useTranslations } from "next-intl";
import MarqueeEyebrow from "@/components/shared/MarqueeEyebrow";

// ─── Photos per product ────────────────────────────────────────────────────────
const PRODUCT_PHOTOS = [
  "/EMINSA/DSC07227.jpg",  // Tipo Poste
  "/EMINSA/DSC07213.jpg",  // Pad Mounted
  "/EMINSA/DSC07255.jpg",  // Subestación
];

// ─── Accent colors ─────────────────────────────────────────────────────────────
const ACCENTS = ["#0099ce", "#009e49", "#00269b"];

const TAB_LABELS = ["Tipo Poste", "Pad Mounted", "Subestación"];

// ─── Component ────────────────────────────────────────────────────────────────

export default function MTNHeroSection() {
  const t = useTranslations("home");
  const [active, setActive] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const [progress, setProgress] = useState(0);
  const progressRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const DURATION = 5000;

  const slides = [
    {
      id: "tipo-poste",
      eyebrow: "Distribución aérea · Norma IEEE C57",
      name: t("mtn.slides.tipoPoste.name"),
      subtitle: t("mtn.slides.tipoPoste.subtitle"),
      specs: [
        { label: "Potencia", value: "15–500", unit: "KVA" },
        { label: "Voltaje", value: "34.5", unit: "KV" },
        { label: "Fases", value: "1–3", unit: "Ф" },
      ],
      tags: ["IEEE C57", "DOE 2016", "ANSI"],
      quoteHref: "/mtn/cotizaciones",
      productHref: "/mtn/productos/tipo-poste",
    },
    {
      id: "pad-mounted",
      eyebrow: "Distribución subterránea · Gabinete hermético",
      name: t("mtn.slides.padMounted.name"),
      subtitle: t("mtn.slides.padMounted.subtitle"),
      specs: [
        { label: "Potencia", value: "30–3k", unit: "KVA" },
        { label: "Voltaje", value: "34.5", unit: "KV" },
        { label: "Fases", value: "1–3", unit: "Ф" },
      ],
      tags: ["IEEE C57", "NEMA", "Hermético"],
      quoteHref: "/mtn/cotizaciones",
      productHref: "/mtn/productos/pad-mounted",
    },
    {
      id: "subestacion",
      eyebrow: "Alta potencia industrial · ANSI / IEEE",
      name: t("mtn.slides.subestacion.name"),
      subtitle: t("mtn.slides.subestacion.subtitle"),
      specs: [
        { label: "Potencia", value: "≤10k", unit: "KVA" },
        { label: "Voltaje", value: "138", unit: "KV" },
        { label: "Norma", value: "ANSI", unit: "/IEEE" },
      ],
      tags: ["DOE 2016", "ANSI/IEEE", "Alta eficiencia"],
      quoteHref: "/mtn/cotizaciones",
      productHref: "/mtn/productos",
    },
  ];

  const resetProgress = useCallback(() => {
    setProgress(0);
    if (progressRef.current) clearInterval(progressRef.current);
    progressRef.current = setInterval(() => {
      setProgress((p) => {
        if (p >= 100) return 100;
        return p + 100 / (DURATION / 50);
      });
    }, 50);
  }, []);

  const next = useCallback(() => {
    setActive((prev) => (prev + 1) % slides.length);
  }, [slides.length]);

  useEffect(() => {
    if (!isAutoPlaying) return;
    resetProgress();
    const timer = setInterval(next, DURATION);
    return () => {
      clearInterval(timer);
      if (progressRef.current) clearInterval(progressRef.current);
    };
  }, [isAutoPlaying, next, resetProgress]);

  useEffect(() => {
    if (isAutoPlaying) resetProgress();
  }, [active, isAutoPlaying, resetProgress]);

  const handleTabClick = (index: number) => {
    setActive(index);
    setIsAutoPlaying(false);
    setProgress(0);
  };

  const slide = slides[active];
  const accent = ACCENTS[active];
  const productPhoto = PRODUCT_PHOTOS[active];

  return (
    <section id="mtn-productos" className="py-10 lg:py-14 bg-white relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-0 w-125 h-125 bg-gray-50 rounded-full blur-[120px]" />
        <div className="absolute bottom-0 right-0 w-100 h-100 bg-gray-50 rounded-full blur-[100px]" />
      </div>

      <div className="container-eminsa relative">

        {/* ── Header ── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mb-10"
        >
          <MarqueeEyebrow text="División MTN · Manufactura Nacional" color={accent} />
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-black text-[#00269b] leading-none">
            {t("mtn.title")}{" "}
            <span style={{ color: accent }} className="transition-colors duration-700">
              {t("mtn.titleAccent")}
            </span>
          </h2>
        </motion.div>

        {/* ── Pill Tabs ── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="flex flex-wrap justify-center gap-3 mb-10"
        >
          {slides.map((s, i) => (
            <button
              key={s.id}
              onClick={() => handleTabClick(i)}
              className={`px-6 py-3 rounded-full font-bold text-sm uppercase tracking-wide transition-all duration-300 ${
                active === i
                  ? "text-white shadow-lg scale-105"
                  : "bg-gray-100 text-gray-500 hover:bg-gray-200"
              }`}
              style={active === i ? { backgroundColor: ACCENTS[i] } : {}}
            >
              {TAB_LABELS[i]}
            </button>
          ))}
        </motion.div>

        {/* ── Card ── */}
        <div className="relative rounded-3xl overflow-hidden shadow-xl" style={{ background: "linear-gradient(to bottom, #00175d, #00269b, #001a6e)", minHeight: 480 }}>
          <AnimatePresence mode="wait">
            <motion.div
              key={active}
              initial={{ opacity: 0, x: 40 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -40 }}
              transition={{ duration: 0.5, ease: [0.32, 0.72, 0, 1] }}
              className="grid grid-cols-1 md:grid-cols-[1fr_1.2fr] min-h-120"
            >
              {/* LEFT — Content */}
              <div className="flex flex-col justify-center px-10 md:px-14 py-14 gap-6">

                {/* Eyebrow */}
                <motion.p
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4 }}
                  className="text-[11px] font-bold uppercase tracking-[0.2em] text-white/70"
                >
                  {slide.eyebrow}
                </motion.p>

                {/* Product name */}
                <motion.h3
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.45, delay: 0.06 }}
                  className="text-3xl md:text-4xl lg:text-[2.75rem] font-black text-white leading-tight"
                >
                  {slide.name}
                </motion.h3>

                {/* Description */}
                <motion.p
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: 0.12 }}
                  className="text-white/50 text-sm leading-relaxed max-w-xs"
                >
                  {slide.subtitle}
                </motion.p>

                {/* Specs */}
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.18 }}
                  className="flex gap-5 flex-wrap"
                >
                  {slide.specs.map((s, i) => (
                    <motion.div
                      key={s.label}
                      initial={{ opacity: 0, y: 12 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.2 + i * 0.07 }}
                      className="flex flex-col gap-0.5"
                    >
                      <span className="text-2xl font-black text-white leading-none tabular-nums">
                        {s.value}
                        <span className="text-sm font-semibold ml-0.5 text-white/60">{s.unit}</span>
                      </span>
                      <span className="text-white/35 text-[10px] uppercase tracking-widest">{s.label}</span>
                    </motion.div>
                  ))}
                </motion.div>

                {/* Divider */}
                <motion.div
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: 1 }}
                  transition={{ delay: 0.3, duration: 0.5 }}
                  className="origin-left h-px bg-white/10 w-full"
                />

                {/* Tags */}
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.32 }}
                  className="flex flex-wrap gap-2"
                >
                  {slide.tags.map((tag, i) => (
                    <motion.span
                      key={tag}
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: 0.34 + i * 0.05 }}
                      className="px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider border border-white/20 text-white/80 bg-white/10"
                    >
                      {tag}
                    </motion.span>
                  ))}
                </motion.div>

                {/* CTAs */}
                <motion.div
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.38 }}
                  className="flex flex-wrap gap-3"
                >
                  <Link
                    href={slide.quoteHref}
                    className="group inline-flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-bold text-white transition-all duration-300 hover:scale-[1.03] hover:brightness-110"
                    style={{ backgroundColor: accent }}
                  >
                    Cotizar Ahora
                    <ArrowRight size={14} className="group-hover:translate-x-0.5 transition-transform" />
                  </Link>
                  <Link
                    href={slide.productHref}
                    className="group inline-flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-semibold text-white/70 hover:text-white border border-white/15 hover:border-white/30 transition-all duration-300"
                  >
                    Ver Especificaciones
                    <ArrowUpRight size={14} className="opacity-60 group-hover:opacity-100 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 transition-transform" />
                  </Link>
                </motion.div>
              </div>

              {/* RIGHT — Full-bleed product photo */}
              <div className="relative hidden md:block overflow-hidden">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={productPhoto}
                    className="absolute inset-0"
                    initial={{ opacity: 0, scale: 1.04 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 1.04 }}
                    transition={{ duration: 0.7, ease: [0.32, 0.72, 0, 1] }}
                  >
                    <Image
                      src={productPhoto}
                      alt={slide.name}
                      fill
                      priority
                      sizes="(max-width: 1024px) 100vw, 50vw"
                      className="object-cover"
                    />
                    <div className="absolute inset-0 bg-linear-to-r from-[#00175d]/60 via-transparent to-transparent" />
                    <div className="absolute inset-0 bg-linear-to-t from-black/30 via-transparent to-transparent" />
                    <div className="absolute inset-0 mix-blend-color" style={{ backgroundColor: `${accent}18` }} />
                  </motion.div>
                </AnimatePresence>

                {/* Slide counter */}
                <div className="absolute top-5 right-6 z-20 font-mono text-white/50 text-xs">
                  {String(active + 1).padStart(2, "0")}&nbsp;/&nbsp;{String(slides.length).padStart(2, "0")}
                </div>

                {/* Accent bottom bar */}
                <div className="absolute bottom-0 left-0 right-0 h-1 z-20" style={{ backgroundColor: accent }} />
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Nav arrows */}
          {[
            { fn: () => { setActive((active - 1 + slides.length) % slides.length); setIsAutoPlaying(false); }, side: "left-4", label: "Anterior", icon: "‹" },
            { fn: () => { setActive((active + 1) % slides.length); setIsAutoPlaying(false); }, side: "right-4", label: "Siguiente", icon: "›" },
          ].map(({ fn, side, label, icon }) => (
            <button
              key={label}
              onClick={fn}
              aria-label={label}
              className={`absolute ${side} top-1/2 -translate-y-1/2 z-30 w-9 h-9 rounded-full bg-white/8 hover:bg-white/16 border border-white/10 hover:border-white/25 flex items-center justify-center text-white/70 hover:text-white text-xl font-light transition-all duration-200 hover:scale-110`}
            >
              {icon}
            </button>
          ))}

          {/* Auto-play progress bar */}
          {isAutoPlaying && (
            <div className="absolute bottom-0 left-0 h-0.5 transition-none z-30" style={{ width: `${progress}%`, backgroundColor: accent }} />
          )}
        </div>

      </div>
    </section>
  );
}
