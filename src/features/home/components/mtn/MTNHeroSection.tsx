"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { useTranslations } from "next-intl";

// ─── Real product photos ──────────────────────────────────────────────────────
const PRODUCT_PHOTOS = [
  "/EMINSA/DSC07227.jpg",  // Tipo Poste
  "/EMINSA/DSC07213.jpg",  // Pad Mounted
  "/EMINSA/DSC07255.jpg",  // Subestación
];

// ─── Accent colors per product ────────────────────────────────────────────────
const ACCENTS = ["#0099ce", "#009e49", "#00269b"];
const ACCENT_DARKS = ["#006a90", "#006a30", "#001880"];

// ─── Component ───────────────────────────────────────────────────────────────

export default function MTNHeroSection() {
  const t = useTranslations("home");
  const [active, setActive] = useState(0);
  const [dir, setDir] = useState(1);
  const [autoPlay, setAutoPlay] = useState(true);
  const [bar, setBar] = useState(0);
  const barRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const DURATION = 6000;

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

  const startBar = useCallback(() => {
    setBar(0);
    if (barRef.current) clearInterval(barRef.current);
    barRef.current = setInterval(() => setBar(p => Math.min(p + 100 / (DURATION / 40), 100)), 40);
  }, []);

  const go = useCallback((index: number, d: number) => {
    setDir(d);
    setActive(index);
    startBar();
  }, [startBar]);

  const next = useCallback(() => go((active + 1) % slides.length, 1), [active, go, slides.length]);
  const prev = useCallback(() => go((active - 1 + slides.length) % slides.length, -1), [active, go, slides.length]);

  useEffect(() => { startBar(); return () => { if (barRef.current) clearInterval(barRef.current); }; }, [startBar]);
  useEffect(() => {
    if (!autoPlay) return;
    const t = setInterval(next, DURATION);
    return () => clearInterval(t);
  }, [autoPlay, next]);

  const slide = slides[active];
  const accent = ACCENTS[active];
  const accentDark = ACCENT_DARKS[active];
  const productPhoto = PRODUCT_PHOTOS[active];

  return (
    <section className="bg-white py-20 lg:py-28 relative overflow-hidden">


      <div className="container-eminsa relative">

        {/* ── Header ── */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-10"
        >
          <div className="flex items-center gap-3 mb-3">
            <motion.span
              className="h-px w-8 inline-block"
              style={{ backgroundColor: accent }}
              animate={{ width: [24, 40, 24] }}
              transition={{ duration: 3, repeat: Infinity }}
            />
            <span className="text-xs font-bold uppercase tracking-[0.3em]" style={{ color: accent }}>
              División MTN · Manufactura Nacional
            </span>
          </div>
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4">
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-black text-[#00269b] leading-none">
              {t("mtn.title")}{" "}
              <span style={{ color: accent }} className="transition-colors duration-700">{t("mtn.titleAccent")}</span>
            </h2>
            <p className="text-[#6d6e6d] text-base max-w-sm leading-relaxed">
              {t("mtn.description")}
            </p>
          </div>
        </motion.div>

        {/* ── Product Tabs ── */}
        <div className="flex gap-0 mb-0 border-b border-gray-200">
          {slides.map((s, i) => (
            <button
              key={s.id}
              onClick={() => { go(i, i > active ? 1 : -1); setAutoPlay(false); }}
              className="relative px-5 py-3 text-sm font-semibold transition-colors duration-200"
              style={{ color: active === i ? ACCENTS[i] : "#9a9a9a" }}
            >
              {s.id === "tipo-poste" ? "Tipo Poste" : s.id === "pad-mounted" ? "Pad Mounted" : "Subestación"}
              {active === i && (
                <motion.div
                  layoutId="tab-indicator"
                  className="absolute bottom-0 left-0 right-0 h-0.5"
                  style={{ backgroundColor: ACCENTS[i] }}
                  transition={{ type: "spring", stiffness: 400, damping: 30 }}
                />
              )}
            </button>
          ))}
          {/* Auto-play progress on tab bar */}
          {autoPlay && (
            <div className="absolute bottom-0 left-0 h-px bg-gray-300 w-full -z-10" />
          )}
        </div>

        {/* ── Main showcase ── */}
        <div
          className="relative overflow-hidden rounded-b-2xl"
          style={{ background: "#00091F", minHeight: 480 }}
        >
          <AnimatePresence mode="wait" custom={dir}>
            <motion.div
              key={active}
              custom={dir}
              variants={{
                enter: (d: number) => ({ opacity: 0, x: d * 60 }),
                center: { opacity: 1, x: 0 },
                exit: (d: number) => ({ opacity: 0, x: d * -60 }),
              }}
              initial="enter"
              animate="center"
              exit="exit"
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
                  className="text-[11px] font-bold uppercase tracking-[0.2em]"
                  style={{ color: accent }}
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
                  className="flex gap-5"
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
                        <span className="text-sm font-semibold ml-0.5" style={{ color: accent }}>{s.unit}</span>
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
                      className="px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider border"
                      style={{ borderColor: `${accent}40`, color: accent, backgroundColor: `${accent}12` }}
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
                      className="object-cover"
                      priority
                    />
                    {/* Gradient: left edge blends into dark panel, bottom darkens slightly */}
                    <div className="absolute inset-0 bg-linear-to-r from-[#00091F]/60 via-transparent to-transparent" />
                    <div className="absolute inset-0 bg-linear-to-t from-black/30 via-transparent to-transparent" />
                    {/* Accent color tint */}
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
          {[{ fn: prev, side: "left-4", label: "Anterior", icon: "‹" }, { fn: next, side: "right-4", label: "Siguiente", icon: "›" }].map(({ fn, side, label, icon }) => (
            <button
              key={label}
              onClick={() => { fn(); setAutoPlay(false); }}
              aria-label={label}
              className={`absolute ${side} top-1/2 -translate-y-1/2 z-30 w-9 h-9 rounded-full bg-white/8 hover:bg-white/16 border border-white/10 hover:border-white/25 flex items-center justify-center text-white/70 hover:text-white text-xl font-light transition-all duration-200 hover:scale-110`}
            >
              {icon}
            </button>
          ))}

          {/* Auto-play progress bar (bottom edge of showcase) */}
          {autoPlay && (
            <div className="absolute bottom-0 left-0 h-0.5 transition-none" style={{ width: `${bar}%`, backgroundColor: accent }} />
          )}
        </div>
      </div>
    </section>
  );
}
