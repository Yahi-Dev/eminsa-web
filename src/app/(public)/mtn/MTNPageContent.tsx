"use client";

import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
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
  transformerProducts,
  standards,
  certifications,
  resources,
} from "@/config/mtn-data";
import CertificationsTabSelector from "@/features/home/components/mtn/CertificationsTabSelector";
import { contactInfo } from "@/config/navigation";
import { getWhatsAppUrl } from "@/utils/whatsapp";
import { useTranslations } from "next-intl";
import VideoShowcase from "@/components/ui/VideoShowcase";

const productPhotos: Record<string, string> = {
  "tipo-poste": "/fotos-eminsa/mtn/DSC07227.jpg",
  "pad-mounted": "/fotos-eminsa/mtn/DSC07213.jpg",
  "subestacion": "/fotos-eminsa/mtn/transformador-subestacion.png",
};

const resourceIcons: Record<string, React.ElementType> = {
  newspaper: FileText,
  "file-text": FileText,
  "shield-check": Shield,
  "book-open": BookOpen,
  calculator: Calculator,
};

// ─── Hero floating cards ──────────────────────────────────────────────────────
const HERO_PHOTOS = [
  "/fotos-eminsa/mtn/DSC07227.jpg",  // Transformador Tipo Poste
  "/fotos-eminsa/mtn/DSC07213.jpg",  // Pad Mounted 75kVA EMINSA
  "/fotos-eminsa/mtn/transformador-subestacion.png",  // Transformador Subestación
  "/fotos-eminsa/mtn/DSC07246.jpg",  // Tanque de transformador con radiadores
  "/fotos-eminsa/mtn/DSC07251.jpg",  // Transformador Tipo Poste monofásico
  "/fotos-eminsa/mtn/DSC07231.jpg",  // Pad Mounted 500kVA EMINSA
  "/fotos-eminsa/mtn/DSC07524.jpg",  // Pad Mounted exterior con radiador
  "/fotos-eminsa/mtn/DSC07573.jpg",  // Pad Mounted EMINSA abierto exterior
  "/fotos-eminsa/mtn/DSC07215.jpg",  // Pad Mounted 75kVA frontal
  "/fotos-eminsa/mtn/DSC07158.jpg",  // Aisladores de transformador
];
const HERO_N = HERO_PHOTOS.length;
const HERO_SLOT_COUNT = 6;

const HERO_LEFT_CARDS = [
  { top: 0,   left: 25,  w: 200, h: 225, rotate: -6, photoOffset: 0 },
  { top: 185, left: -8,  w: 178, h: 205, rotate:  4, photoOffset: 3 },
  { top: 350, left: 22,  w: 215, h: 172, photoOffset: 6, rotate: -3 },
];
const HERO_RIGHT_CARDS = [
  { top: 15,  right: 20, w: 195, h: 220, rotate:  5, photoOffset: 1 },
  { top: 193, right: -6, w: 182, h: 208, rotate: -5, photoOffset: 4 },
  { top: 360, right: 18, w: 210, h: 170, rotate:  3, photoOffset: 7 },
];
const HERO_FLOAT_DURATIONS  = [3.8, 4.5, 3.2, 4.1, 3.6, 4.8];
const HERO_FLOAT_AMPLITUDES = [6,   5,   7,   5,   6,   4  ];
const HERO_FLOAT_DELAYS     = [0,   0.9, 1.7, 0.4, 1.3, 2.1];

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
  const tv = useTranslations("videos.mtn");

  // Hero photo cycling — one slot updates every 2.5s, no duplicates across slots
  const [heroSlots, setHeroSlots] = useState<number[]>(() =>
    Array.from({ length: HERO_SLOT_COUNT }, (_, i) => i)
  );
  useEffect(() => {
    let cursor = 0;
    const id = setInterval(() => {
      const slot = cursor % HERO_SLOT_COUNT;
      setHeroSlots((prev) => {
        const next = [...prev];
        // Find the next photo index not already used by another slot
        let candidate = (next[slot] + 1) % HERO_N;
        const otherSlots = new Set(next.filter((_, idx) => idx !== slot));
        while (otherSlots.has(candidate)) {
          candidate = (candidate + 1) % HERO_N;
        }
        next[slot] = candidate;
        return next;
      });
      cursor++;
    }, 2500);
    return () => clearInterval(id);
  }, []);

  return (
    <div className="min-h-screen">

      {/* ============================================================ */}
      {/* Hero Section — Floating Cards */}
      {/* ============================================================ */}
      <section className="relative bg-gradient-to-b from-[#00175d] via-[#00269b] to-[#001a6e] overflow-hidden py-16 lg:py-0 min-h-120 sm:min-h-135 lg:h-160 lg:flex lg:items-center">
        {/* Giant faint "MTN" watermark */}
        <div className="absolute inset-0 flex items-center justify-end pointer-events-none select-none overflow-hidden">
          <motion.span
            initial={{ opacity: 0, x: 120, filter: "blur(24px)" }}
            animate={{ opacity: 0.04, x: 0, filter: "blur(0px)" }}
            transition={{ duration: 1.6, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="text-white leading-none font-black tracking-tighter pr-4"
            style={{ fontSize: "clamp(8rem, 18vw, 22rem)" }}
          >
            MTN
          </motion.span>
        </div>

        {/* Subtle grid pattern */}
        <div className="absolute inset-0 opacity-[0.04] pointer-events-none" style={{ backgroundImage: "linear-gradient(to right, white 1px, transparent 1px), linear-gradient(to bottom, white 1px, transparent 1px)", backgroundSize: "60px 60px" }} />

        <div className="container-eminsa relative w-full">
          <div className="flex items-center justify-between gap-2 lg:gap-6">

            {/* ── LEFT CARDS ── */}
            <div className="hidden lg:block relative shrink-0" style={{ width: 270, height: 510 }}>
              {HERO_LEFT_CARDS.map((card, i) => (
                <motion.div
                  key={i}
                  className="absolute"
                  style={{ top: card.top, left: card.left }}
                  initial={{ opacity: 0, x: -55, rotate: card.rotate }}
                  animate={{ opacity: 1, x: 0, rotate: card.rotate }}
                  transition={{ duration: 0.75, delay: 0.08 + i * 0.13, ease: [0.22, 1, 0.36, 1] }}
                >
                  <motion.div
                    animate={{ y: [0, -HERO_FLOAT_AMPLITUDES[i], 0] }}
                    transition={{ duration: HERO_FLOAT_DURATIONS[i], repeat: Infinity, ease: "easeInOut", delay: HERO_FLOAT_DELAYS[i] }}
                  >
                    <div className="rounded-3xl bg-white p-1 shadow-2xl" style={{ width: card.w + 8, height: card.h + 8 }}>
                      <div className="relative rounded-[1.2rem] overflow-hidden" style={{ width: card.w, height: card.h }}>
                        <AnimatePresence mode="wait">
                          <motion.div key={heroSlots[i]} className="absolute inset-0" initial={{ opacity: 0, scale: 1.1 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.94 }} transition={{ duration: 0.6, ease: "easeOut" }}>
                            <Image src={HERO_PHOTOS[heroSlots[i]] || HERO_PHOTOS[0]} alt="MTN" fill sizes="220px" className="object-cover" />
                          </motion.div>
                        </AnimatePresence>
                      </div>
                    </div>
                  </motion.div>
                </motion.div>
              ))}
            </div>

            {/* ── CENTER ── */}
            <div className="flex-1 flex flex-col items-center text-center gap-7 px-4 lg:px-6">
              {/* Icon badge */}
              <motion.div initial={{ opacity: 0, y: -20, scale: 0.75 }} animate={{ opacity: 1, y: 0, scale: 1 }} transition={{ duration: 0.55, ease: [0.34, 1.56, 0.64, 1] }} className="w-16 h-16 bg-white/10 backdrop-blur-sm rounded-2xl border border-white/20 flex items-center justify-center">
                <svg width="30" height="30" viewBox="0 0 30 30" fill="none">
                  <rect x="4" y="5"  width="22" height="3" rx="1.5" fill="white" />
                  <rect x="4" y="10" width="22" height="3" rx="1.5" fill="white" opacity="0.65" />
                  <rect x="4" y="15" width="22" height="3" rx="1.5" fill="white" opacity="0.35" />
                  <path d="M11 18 L11 26" stroke="#0099ce" strokeWidth="2" strokeLinecap="round" />
                  <path d="M19 18 L19 26" stroke="#0099ce" strokeWidth="2" strokeLinecap="round" />
                  <path d="M8 26 L22 26"  stroke="#0099ce" strokeWidth="2" strokeLinecap="round" />
                </svg>
              </motion.div>

              <motion.h1 initial={{ opacity: 0, y: 22 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.55, delay: 0.1 }} className="text-4xl md:text-5xl lg:text-[3.2rem] font-black text-white leading-[1.06] tracking-tight">
                {t("hero.title")}
              </motion.h1>

              <motion.p initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.2 }} className="text-white/70 text-base lg:text-[1.05rem] leading-relaxed max-w-xs">
                {tc("info.heroDescription")}
              </motion.p>

              <motion.div initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.3 }} className="flex flex-wrap gap-3 justify-center">
                <Link href="/mtn/cotizaciones" className="inline-flex items-center gap-2 px-8 py-3.5 bg-white text-[#00269b] text-sm font-bold rounded-full transition-all duration-300 shadow-lg hover:bg-gray-100 hover:-translate-y-0.5">
                  {t("hero.requestQuote")}
                  <ArrowRight size={15} />
                </Link>
                <Link href="/mtn/productos" className="inline-flex items-center gap-2 px-8 py-3.5 bg-white/10 text-white text-sm font-semibold rounded-full transition-all duration-300 border border-white/20 hover:bg-white/20 hover:-translate-y-0.5">
                  {t("hero.viewProducts")}
                  <ChevronRight size={15} />
                </Link>
              </motion.div>
            </div>

            {/* ── RIGHT CARDS ── */}
            <div className="hidden lg:block relative shrink-0" style={{ width: 270, height: 510 }}>
              {HERO_RIGHT_CARDS.map((card, i) => (
                <motion.div
                  key={i}
                  className="absolute"
                  style={{ top: card.top, right: card.right }}
                  initial={{ opacity: 0, x: 55, rotate: card.rotate }}
                  animate={{ opacity: 1, x: 0, rotate: card.rotate }}
                  transition={{ duration: 0.75, delay: 0.08 + i * 0.13, ease: [0.22, 1, 0.36, 1] }}
                >
                  <motion.div
                    animate={{ y: [0, -HERO_FLOAT_AMPLITUDES[3 + i], 0] }}
                    transition={{ duration: HERO_FLOAT_DURATIONS[3 + i], repeat: Infinity, ease: "easeInOut", delay: HERO_FLOAT_DELAYS[3 + i] }}
                  >
                    <div className="rounded-3xl bg-white p-1 shadow-2xl" style={{ width: card.w + 8, height: card.h + 8 }}>
                      <div className="relative rounded-[1.2rem] overflow-hidden" style={{ width: card.w, height: card.h }}>
                        <AnimatePresence mode="wait">
                          <motion.div key={heroSlots[3 + i]} className="absolute inset-0" initial={{ opacity: 0, scale: 1.1 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.94 }} transition={{ duration: 0.6, ease: "easeOut" }}>
                            <Image src={HERO_PHOTOS[heroSlots[3 + i]] || HERO_PHOTOS[0]} alt="MTN" fill sizes="220px" className="object-cover" />
                          </motion.div>
                        </AnimatePresence>
                      </div>
                    </div>
                  </motion.div>
                </motion.div>
              ))}
            </div>

          </div>
        </div>
      </section>

      {/* Video de Manufactura */}
      <VideoShowcase
        src="/video/mtn.mp4"
        subtitle={tv("subtitle")}
        title={tv("title")}
        description={tv("description")}
        variant="dark"
        textPosition="side"
      />

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
                  <div className="relative aspect-4/3 overflow-hidden">
                    <Image
                      src={productPhotos[product.slug] ?? "/fotos-eminsa/mtn/DSC07227.jpg"}
                      alt={product.shortName}
                      fill
                      sizes="(max-width: 768px) 100vw, 50vw"
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-black/30" />
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

      {/* ============================================================ */}
      {/* Laboratorio y Manufactura — Photo Strip */}
      {/* ============================================================ */}
      <section className="py-16 bg-gray-950 overflow-hidden">
        <div className="container-eminsa mb-10">
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="flex items-end justify-between gap-4"
          >
            <div>
              <span className="inline-flex items-center gap-2 bg-[#0099ce]/20 text-[#0099ce] font-semibold text-sm uppercase tracking-wider mb-3 px-4 py-1.5 rounded-full">
                <Factory size={14} />
                {t("manufacturing.badge")}
              </span>
              <h2 className="text-3xl font-bold text-white">{t("manufacturing.title")}</h2>
            </div>
            <Link
              href="/mtn/manufactura"
              className="inline-flex items-center gap-2 text-[#0099ce] hover:text-white font-semibold transition-colors text-sm shrink-0"
            >
              {t("manufacturing.viewProcess")}
              <ArrowRight size={16} />
            </Link>
          </motion.div>
        </div>

        {/* Photo grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-1">
          {[
            { src: "/fotos-eminsa/mtn/DSC07799.jpg", label: t("manufacturing.photoLabels.winding") },
            { src: "/fotos-eminsa/mtn/DSC07731.jpg", label: t("manufacturing.photoLabels.metalwork") },
            { src: "/fotos-eminsa/mtn/DSC07775.jpg", label: t("manufacturing.photoLabels.inTank") },
            { src: "/fotos-eminsa/mtn/DSC07134.jpg", label: t("manufacturing.photoLabels.testLab") },
            { src: "/fotos-eminsa/mtn/DSC07731.jpg", label: t("manufacturing.photoLabels.laserCutting") },
            { src: "/fotos-eminsa/mtn/DSC07822.jpg", label: t("manufacturing.photoLabels.assembly") },
            { src: "/fotos-eminsa/mtn/DSC07154.jpg", label: t("manufacturing.photoLabels.highVoltageTesting") },
            { src: "/fotos-eminsa/mtn/DSC07842.jpg", label: t("manufacturing.photoLabels.eminsaTeam") },
          ].map((photo, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.07 }}
              className="relative aspect-square overflow-hidden group"
            >
              <Image
                src={photo.src}
                alt={photo.label}
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                className="object-cover brightness-75 group-hover:brightness-90 group-hover:scale-105 transition-all duration-500"
              />
              <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors" />
              <span className="absolute bottom-2 left-3 text-white text-xs font-semibold opacity-0 group-hover:opacity-100 transition-opacity drop-shadow">
                {photo.label}
              </span>
            </motion.div>
          ))}
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
                <h3 className="text-xl font-bold text-[#00269b]">{t("standards.normativasAndEfficiencies")}</h3>
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
