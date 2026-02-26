"use client";

import { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Factory, ArrowRight, ChevronLeft, ChevronRight } from "lucide-react";

const slides = [
  {
    id: "tipo-poste",
    category: "Tipo Poste",
    name: "Distribución Aérea",
    subtitle: "Confiabilidad y eficiencia máxima para sistemas de distribución eléctrica aérea.",
    specs: [
      { label: "Potencia", value: "15 – 500 KVA" },
      { label: "Voltaje", value: "Hasta 34.5 KV" },
      { label: "Fases", value: "1F / 3F" },
    ],
    image: "/images/mtn/tipo-poste.png",
    productHref: "/mtn/productos/tipo-poste",
    quoteHref: "/mtn/cotizaciones",
  },
  {
    id: "pad-mounted",
    category: "Pad Mounted",
    name: "Distribución Subterránea",
    subtitle: "Solución compacta, segura y hermética para urbanizaciones y sistemas soterrados.",
    specs: [
      { label: "Potencia", value: "30 – 3,000 KVA" },
      { label: "Voltaje", value: "Hasta 34.5 KV" },
      { label: "Fases", value: "1F / 3F" },
    ],
    image: "/images/mtn/pad-mounted.png",
    productHref: "/mtn/productos/pad-mounted",
    quoteHref: "/mtn/cotizaciones",
  },
  {
    id: "subestacion",
    category: "Subestación",
    name: "Potencia Industrial",
    subtitle: "Alta capacidad para plantas industriales, parques solares y proyectos de gran escala.",
    specs: [
      { label: "Potencia", value: "Hasta 10,000 KVA" },
      { label: "Voltaje", value: "Hasta 138 KV" },
      { label: "Norma", value: "ANSI / IEEE" },
    ],
    image: "/images/mtn/subestacion.png",
    productHref: "/mtn/productos",
    quoteHref: "/mtn/cotizaciones",
  },
];

export default function MTNHeroSection() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const [direction, setDirection] = useState(1);

  const nextSlide = useCallback(() => {
    setDirection(1);
    setActiveIndex((prev) => (prev + 1) % slides.length);
  }, []);

  const prevSlide = useCallback(() => {
    setDirection(-1);
    setActiveIndex((prev) => (prev - 1 + slides.length) % slides.length);
  }, []);

  const goToSlide = (index: number) => {
    setDirection(index > activeIndex ? 1 : -1);
    setActiveIndex(index);
    setIsAutoPlaying(false);
  };

  useEffect(() => {
    if (!isAutoPlaying) return;
    const timer = setInterval(nextSlide, 5500);
    return () => clearInterval(timer);
  }, [isAutoPlaying, nextSlide]);

  const slide = slides[activeIndex];

  return (
    <section className="py-24 lg:py-32 bg-gray-50 relative overflow-hidden">
      {/* Ambient background */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 right-0 w-96 h-96 bg-[#001689]/5 rounded-full blur-[100px]" />
        <div className="absolute bottom-0 left-0 w-80 h-80 bg-[#00A3E0]/5 rounded-full blur-[80px]" />
      </div>

      <div className="container-eminsa relative">

        {/* ── Section Header ─────────────────────────────────────────── */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-4xl mx-auto mb-14"
        >
          <span className="inline-flex items-center gap-2 px-4 py-2 bg-[#001689]/10 text-[#001689] rounded-full text-sm font-semibold mb-6">
            <Factory className="w-4 h-4" />
            Manufactura de Transformadores Nuevos
          </span>

          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-[#001689] mb-6">
            Transformadores{" "}
            <span className="relative inline-block">
              <span className="text-[#00A3E0]">100% Nuevos</span>
              <motion.svg
                className="absolute -bottom-2 left-0 w-full"
                viewBox="0 0 200 12"
                initial={{ pathLength: 0 }}
                whileInView={{ pathLength: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 1, delay: 0.5 }}
              >
                <motion.path
                  d="M0 6 Q50 0 100 6 T200 6"
                  fill="none"
                  stroke="#00A3E0"
                  strokeWidth="4"
                  strokeLinecap="round"
                  initial={{ pathLength: 0 }}
                  whileInView={{ pathLength: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 1, delay: 0.5 }}
                />
              </motion.svg>
            </span>
          </h2>

          <p className="text-lg md:text-xl text-[#76777A] max-w-3xl mx-auto leading-relaxed">
            Fabricados en la República Dominicana bajo los más altos estándares
            internacionales, cumpliendo plenamente con los niveles de eficiencia
            establecidos por <strong className="text-[#001689]">ANSI</strong> y{" "}
            <strong className="text-[#001689]">DOE 2016</strong>.
          </p>
        </motion.div>

        {/* ── Tesla-style Carousel ───────────────────────────────────── */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="relative rounded-2xl overflow-hidden shadow-2xl bg-[#00091F]"
          style={{ minHeight: 480 }}
        >
          <AnimatePresence mode="wait" custom={direction}>
            <motion.div
              key={activeIndex}
              custom={direction}
              variants={{
                enter: (d: number) => ({ opacity: 0, x: d * 60 }),
                center: { opacity: 1, x: 0 },
                exit: (d: number) => ({ opacity: 0, x: d * -60 }),
              }}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ duration: 0.55, ease: [0.32, 0.72, 0, 1] }}
              className="absolute inset-0 grid grid-cols-1 md:grid-cols-[1fr_1.1fr]"
            >
              {/* Left: dark overlay + text */}
              <div className="relative z-10 flex flex-col justify-center px-10 md:px-14 py-14 bg-[#00091F]">

                {/* Category chip */}
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4 }}
                  className="mb-5"
                >
                  <span className="inline-flex items-center gap-2 text-[#00A3E0] text-xs font-bold uppercase tracking-[0.2em]">
                    <span className="w-6 h-px bg-[#00A3E0] inline-block" />
                    {slide.category}
                  </span>
                </motion.div>

                {/* Product name */}
                <motion.h3
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.45, delay: 0.06 }}
                  className="text-3xl md:text-4xl lg:text-5xl font-bold text-white leading-tight mb-4"
                >
                  {slide.name}
                </motion.h3>

                {/* Subtitle */}
                <motion.p
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.45, delay: 0.12 }}
                  className="text-white/60 text-sm md:text-base leading-relaxed mb-8 max-w-xs"
                >
                  {slide.subtitle}
                </motion.p>

                {/* Specs row */}
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: 0.17 }}
                  className="flex flex-wrap gap-x-6 gap-y-3 mb-8"
                >
                  {slide.specs.map((s) => (
                    <div key={s.label} className="flex flex-col">
                      <span className="text-white/40 text-xs uppercase tracking-wider">
                        {s.label}
                      </span>
                      <span className="text-white font-semibold text-sm mt-0.5">
                        {s.value}
                      </span>
                    </div>
                  ))}
                </motion.div>

                {/* CTA buttons */}
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: 0.22 }}
                  className="flex flex-wrap gap-3"
                >
                  <Link
                    href={slide.quoteHref}
                    className="inline-flex items-center gap-2 bg-[#001689] hover:bg-[#0020A0] text-white px-6 py-3 rounded-xl text-sm font-semibold transition-all duration-300 group"
                  >
                    Cotizar Ahora
                    <ArrowRight size={15} className="group-hover:translate-x-0.5 transition-transform" />
                  </Link>
                  <Link
                    href={slide.productHref}
                    className="inline-flex items-center gap-2 bg-white/8 hover:bg-white/15 border border-white/15 text-white/80 hover:text-white px-6 py-3 rounded-xl text-sm font-semibold transition-all duration-300"
                  >
                    Ver Producto
                  </Link>
                </motion.div>
              </div>

              {/* Right: product image */}
              <div className="relative hidden md:flex items-center justify-center overflow-hidden bg-linear-to-br from-[#001060] to-[#00091F]">
                {/* Subtle grid texture */}
                <div
                  className="absolute inset-0 opacity-[0.04]"
                  style={{
                    backgroundImage: `linear-gradient(white 1px, transparent 1px), linear-gradient(to right, white 1px, transparent 1px)`,
                    backgroundSize: "40px 40px",
                  }}
                />

                {/* Color glow behind image */}
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.6 }}
                  className="absolute w-80 h-80 rounded-full blur-3xl bg-[#001689]/50"
                />

                {/* Transformer image — fixed container so all slides stay the same size */}
                <motion.div
                  initial={{ opacity: 0, scale: 0.9, y: 20 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.05, ease: [0.22, 1, 0.36, 1] }}
                  className="relative z-10 w-full max-w-md mx-auto px-6"
                >
                  <div className="relative w-full h-72 md:h-80">
                    <Image
                      src={slide.image}
                      alt={slide.name}
                      fill
                      sizes="(max-width: 768px) 100vw, 440px"
                      className="object-contain drop-shadow-2xl"
                      priority={activeIndex === 0}
                    />
                  </div>
                </motion.div>

                {/* ANSI / DOE badge overlay */}
                <div className="absolute bottom-6 right-6 flex gap-2 z-20">
                  {["ANSI", "DOE 2016"].map((badge) => (
                    <span
                      key={badge}
                      className="px-3 py-1.5 bg-white/10 backdrop-blur-sm border border-white/15 rounded-lg text-white/70 text-xs font-semibold"
                    >
                      {badge}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* ── Prev / Next arrows ──────────────────────────────────── */}
          <button
            onClick={() => { prevSlide(); setIsAutoPlaying(false); }}
            aria-label="Anterior"
            className="absolute left-3 top-1/2 -translate-y-1/2 z-30 w-9 h-9 rounded-full bg-white/10 hover:bg-white/20 border border-white/10 flex items-center justify-center text-white transition-all duration-200"
          >
            <ChevronLeft size={18} />
          </button>
          <button
            onClick={() => { nextSlide(); setIsAutoPlaying(false); }}
            aria-label="Siguiente"
            className="absolute right-3 top-1/2 -translate-y-1/2 z-30 w-9 h-9 rounded-full bg-white/10 hover:bg-white/20 border border-white/10 flex items-center justify-center text-white transition-all duration-200"
          >
            <ChevronRight size={18} />
          </button>

          {/* ── Progress bars (Tesla-style) ──────────────────────────── */}
          <div className="absolute bottom-5 left-1/2 -translate-x-1/2 z-30 flex gap-2">
            {slides.map((s, i) => (
              <button
                key={s.id}
                onClick={() => goToSlide(i)}
                aria-label={`Ir a ${s.category}`}
                className="relative h-0.5 rounded-full overflow-hidden transition-all duration-300"
                style={{ width: activeIndex === i ? 32 : 16 }}
              >
                <span className="absolute inset-0 bg-white/20" />
                {activeIndex === i && (
                  <motion.span
                    layoutId="progress-bar"
                    className="absolute inset-0 bg-white rounded-full"
                  />
                )}
                {activeIndex !== i && (
                  <span className="absolute inset-0 bg-white/30 rounded-full" />
                )}
              </button>
            ))}
          </div>

          {/* Slide counter */}
          <div className="absolute top-5 right-12 z-30">
            <span className="text-white/25 text-xs font-mono tabular-nums">
              {String(activeIndex + 1).padStart(2, "0")} / {String(slides.length).padStart(2, "0")}
            </span>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
