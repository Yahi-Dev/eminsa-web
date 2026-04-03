"use client";

import { useState, useEffect, useRef, useMemo } from "react";
import { useRouter } from "next/navigation";
import { useTranslations } from "next-intl";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, ArrowRight } from "lucide-react";

// ─── Constants (non-translatable) ────────────────────────────────────────────

const TAGLINE_COLORS = ["#ffffff", "#e53e3e", "#0099ce", "#0099ce", "#0099ce", "#0099ce"];
const TAGLINE_DURATIONS = [4000, 2800, 2800, 2800, 2800, 2800];

const PRODUCT_HREFS: Record<IntentKey, { sub: string; href: string }[]> = {
  comprar: [
    { sub: "MTN", href: "/mtn/productos/tipo-poste" },
    { sub: "MTN", href: "/mtn/productos/pad-mounted" },
    { sub: "MTN", href: "/mtn/productos/subestacion" },
    { sub: "EIC", href: "/eic/productos" },
  ],
  reparar: [
    { sub: "RST", href: "/etrys/servicios" },
    { sub: "RST", href: "/etrys/productos" },
  ],
  alquilar: [
    { sub: "RST", href: "/etrys/alquiler" },
    { sub: "EIC", href: "/eic/productos" },
  ],
  servicios: [
    { sub: "SRV", href: "/servicios" },
    { sub: "SRV", href: "/servicios" },
    { sub: "SRV", href: "/servicios" },
    { sub: "SRV", href: "/servicios" },
  ],
};

type IntentKey = "comprar" | "reparar" | "alquilar" | "servicios";
const INTENT_KEYS: { value: IntentKey; key: string }[] = [
  { value: "comprar", key: "buy" },
  { value: "reparar", key: "repair" },
  { value: "alquilar", key: "rent" },
  { value: "servicios", key: "services" },
];

// ─── Custom dropdown ──────────────────────────────────────────────────────────

interface DropdownProps {
  label: string;
  open: boolean;
  onToggle: () => void;
  children: React.ReactNode;
  className?: string;
}

function Dropdown({ label, open, onToggle, children, className = "" }: DropdownProps) {
  return (
    <div className={`relative ${className}`}>
      <button
        onClick={onToggle}
        className="flex items-center gap-2 w-full h-full px-7 py-6 text-white font-semibold text-lg tracking-wide transition-colors hover:text-[#0099ce]"
      >
        <span className="flex-1 text-left">{label}</span>
        <motion.div animate={{ rotate: open ? 180 : 0 }} transition={{ duration: 0.2 }}>
          <ChevronDown size={18} className="shrink-0 opacity-70" />
        </motion.div>
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -6, scaleY: 0.92 }}
            animate={{ opacity: 1, y: 0, scaleY: 1 }}
            exit={{ opacity: 0, y: -6, scaleY: 0.92 }}
            transition={{ duration: 0.16, ease: "easeOut" }}
            style={{ transformOrigin: "top" }}
            className="absolute top-full left-0 mt-1 min-w-full z-9999 bg-black/90 backdrop-blur-md border border-white/20 shadow-2xl rounded-xl overflow-hidden"
          >
            {children}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

// ─── Hero ─────────────────────────────────────────────────────────────────────

export default function HeroSection() {
  const router = useRouter();
  const t = useTranslations("home");

  // Build translated data from i18n keys
  const LINE1 = useMemo(() => {
    const text = t("hero.line1");
    return text.split("").map((char) => ({ char, color: "#ffffff" }));
  }, [t]);

  const LINE2 = t("hero.line2");

  const TAGLINES = useMemo(() =>
    TAGLINE_COLORS.map((color, i) => ({
      text: t(`hero.taglines.${i}`),
      color,
      duration: TAGLINE_DURATIONS[i],
    })),
  [t]);

  const INTENTIONS = useMemo(() =>
    INTENT_KEYS.map(({ value, key }) => ({
      label: t(`hero.intentions.${key}.label`),
      value,
      sub: t(`hero.intentions.${key}.sub`),
    })),
  [t]);

  const PRODUCTS = useMemo(() => {
    const result: Record<IntentKey, { label: string; sub: string; href: string }[]> = {
      comprar: [],
      reparar: [],
      alquilar: [],
      servicios: [],
    };
    for (const { value, key } of INTENT_KEYS) {
      result[value] = PRODUCT_HREFS[value].map((item, i) => ({
        label: t(`hero.products.${key}.${i}.label`),
        sub: item.sub,
        href: item.href,
      }));
    }
    return result;
  }, [t]);

  const [taglineIndex, setTaglineIndex] = useState(0);
  const [showSubtitle, setShowSubtitle] = useState(true);
  const [selectedIntent, setSelectedIntent] = useState<IntentKey>("comprar");
  const [selectedProduct, setSelectedProduct] = useState(PRODUCTS.comprar[0]);
  const [intentOpen, setIntentOpen] = useState(false);
  const [prodOpen, setProdOpen] = useState(false);

  const videoRef = useRef<HTMLVideoElement>(null);
  const selectRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let id: ReturnType<typeof setTimeout>;
    const init = setTimeout(() => {
      setShowSubtitle(false);
      const schedule = (index: number) => {
        id = setTimeout(() => {
          const next = (index + 1) % TAGLINES.length;
          setTaglineIndex(next);
          schedule(next);
        }, TAGLINES[index].duration);
      };
      schedule(0);
    }, 10000);
    return () => { clearTimeout(init); clearTimeout(id); };
  }, [TAGLINES]);

  useEffect(() => { videoRef.current?.play().catch(() => {}); }, []);

  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (selectRef.current && !selectRef.current.contains(e.target as Node)) {
        setIntentOpen(false);
        setProdOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  function handleIntentSelect(intent: (typeof INTENTIONS)[0]) {
    setSelectedIntent(intent.value);
    setSelectedProduct(PRODUCTS[intent.value][0]);
    setIntentOpen(false);
    setProdOpen(false);
  }

  const currentIntent = INTENTIONS.find((i) => i.value === selectedIntent)!;

  return (
    <section className="relative z-10 min-h-screen flex flex-col justify-center px-4 md:px-12">

      {/* ── Video Background ── */}
      <div className="absolute inset-0 overflow-hidden">
        <video
          ref={videoRef}
          className="absolute inset-0 w-full h-full object-cover"
          autoPlay loop muted playsInline
        >
          <source src="https://res.cloudinary.com/dixsymrg5/video/upload/q_auto,br_2000k/v1775242401/eminsa/site/images/web-banner-video.mp4" type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-linear-to-r from-black/80 via-black/60 to-black/70" />
        <div className="absolute inset-0 bg-linear-to-b from-transparent via-transparent to-black/40" />

        {/* floating orbs */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <motion.div
            animate={{ x: [0, 40, -20, 0], y: [0, -30, 20, 0], scale: [1, 1.15, 0.9, 1] }}
            transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
            className="absolute top-1/4 right-1/3 w-112.5 h-112.5 bg-[#0099ce]/10 rounded-full blur-[90px]"
          />
          <motion.div
            animate={{ x: [0, -30, 20, 0], y: [0, 25, -20, 0] }}
            transition={{ duration: 16, repeat: Infinity, ease: "easeInOut", delay: 4 }}
            className="absolute bottom-1/3 right-1/4 w-87.5 h-87.5 bg-[#00269b]/18 rounded-full blur-[100px]"
          />
        </div>
      </div>

      {/* ── Content ── */}
      <div className="relative z-10 flex flex-col items-center text-center -mt-16">

        {/* Headline — two lines */}
        <div className="flex flex-col items-center overflow-hidden">
          {/* Line 1 */}
          <div className="flex justify-center overflow-hidden">
            {LINE1.map((item, i) => (
              <motion.span
                key={i}
                className="font-extrabold text-[8vw] md:text-[7.5vw] leading-none select-none"
                style={{ color: item.color }}
                initial={{ y: 120, opacity: 0, rotateX: 90 }}
                animate={{ y: 0, opacity: 1, rotateX: 0 }}
                transition={{ duration: 1, delay: 0.05 * i, ease: [0.22, 1, 0.36, 1] as const }}
              >
                {item.char}
              </motion.span>
            ))}
          </div>
          {/* Line 2 / taglines */}
          <div className="h-[5.5vw] md:h-[4.2vw] overflow-hidden relative w-full flex items-center justify-center">
            <AnimatePresence mode="wait">
              {showSubtitle ? (
                <motion.span
                  key="subtitle"
                  className="font-bold text-[5vw] md:text-[4vw] leading-none select-none text-[#0099ce] text-center"
                  initial={{ y: 40, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  exit={{ y: -40, opacity: 0 }}
                  transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] as const }}
                >
                  {LINE2}
                </motion.span>
              ) : (
                <motion.span
                  key={taglineIndex}
                  className="font-bold text-[4.5vw] md:text-[2.8vw] leading-none text-center"
                  style={{ color: TAGLINES[taglineIndex].color }}
                  initial={{ y: 50, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  exit={{ y: -50, opacity: 0 }}
                  transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] as const }}
                >
                  {TAGLINES[taglineIndex].text}
                </motion.span>
              )}
            </AnimatePresence>
          </div>
        </div>

        {/* ── Select bar ── */}
        <motion.div
          ref={selectRef}
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.1, duration: 0.7 }}
          className="mt-10 w-full flex flex-col items-center gap-2"
        >
          <p className="text-white/50 text-xs tracking-[0.2em] uppercase">{t("hero.whatDoYouNeed")}</p>

          <div className="w-full max-w-215 flex flex-col sm:flex-row items-stretch border border-white/25 bg-black/30 backdrop-blur-sm rounded-2xl">
            {/* Intent selector */}
            <Dropdown
              label={currentIntent.label}
              open={intentOpen}
              onToggle={() => { setIntentOpen((v) => !v); setProdOpen(false); }}
              className="border-b sm:border-b-0 sm:border-r border-white/20 sm:min-w-44"
            >
              {INTENTIONS.map((intent) => (
                <button
                  key={intent.value}
                  onClick={() => handleIntentSelect(intent)}
                  className={`w-full text-left px-6 py-3.5 text-base transition-colors ${
                    selectedIntent === intent.value
                      ? "bg-[#0099ce] text-white font-semibold"
                      : "text-white hover:bg-white/10"
                  }`}
                >
                  <span className="block font-semibold">{intent.label}</span>
                  <span className="block text-[11px] opacity-60 mt-0.5">{intent.sub}</span>
                </button>
              ))}
            </Dropdown>

            {/* Product selector */}
            <Dropdown
              label={selectedProduct.label}
              open={prodOpen}
              onToggle={() => { setProdOpen((v) => !v); setIntentOpen(false); }}
              className="flex-1 border-b sm:border-b-0 sm:border-r border-white/20"
            >
              {PRODUCTS[selectedIntent].map((product) => (
                <button
                  key={product.href + product.label}
                  onClick={() => { setSelectedProduct(product); setProdOpen(false); }}
                  className={`w-full text-left px-6 py-3.5 text-base transition-colors ${
                    selectedProduct.label === product.label
                      ? "bg-[#0099ce] text-white font-semibold"
                      : "text-white hover:bg-white/10"
                  }`}
                >
                  <span className="block">{product.label}</span>
                  <span className="block text-[11px] opacity-50 mt-0.5">{product.sub}</span>
                </button>
              ))}
            </Dropdown>

            {/* CTA button */}
            <button
              onClick={() => router.push(selectedProduct.href)}
              className="flex items-center justify-center gap-3 px-8 py-4 sm:px-10 sm:py-6 bg-[#0099ce] hover:bg-[#0082b0] text-white font-bold text-base sm:text-lg tracking-wide transition-colors shrink-0 rounded-b-2xl sm:rounded-bl-none sm:rounded-r-2xl"
            >
              <span>{t("hero.explore")}</span>
              <ArrowRight size={15} />
            </button>
          </div>
        </motion.div>
      </div>

      {/* ── Scroll indicator ── */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.8 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10"
      >
        <button
          onClick={() => document.getElementById("divisiones")?.scrollIntoView({ behavior: "smooth" })}
          className="flex flex-col items-center gap-2 text-white/50 hover:text-white transition-colors cursor-pointer bg-transparent border-none"
        >
          <span className="text-[10px] tracking-[0.3em] uppercase">{t("hero.scroll")}</span>
          <ChevronDown size={18} className="animate-bounce" />
        </button>
      </motion.div>
    </section>
  );
}
