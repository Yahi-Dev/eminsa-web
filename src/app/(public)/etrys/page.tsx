"use client";

import { useState, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useTranslations } from "next-intl";
import { PhoneInputField } from "@/components/ui/PhoneInputField";
import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowRight,
  CheckCircle2,
  Phone,
  MessageCircle,
  Zap,
  PiggyBank,
  ShieldCheck,
  Leaf,
  Award,
  Users,
  Clock,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import {
  etrysInfo,
  remanufacturedAdvantages,
  remanufacturedProducts,
  remanufactureProcess,
  rentalInfo,
} from "@/config/etrys-data";
import { getWhatsAppUrl } from "@/utils/whatsapp";
import TransformadorRestauracionSection from "@/features/home/components/TransformadorRestauracionSection";
import RemanufactureProcessModal from "@/features/home/components/etrys/RemanufactureProcessModal";

const advantageIcons: { [key: string]: React.ElementType } = {
  zap: Zap,
  "piggy-bank": PiggyBank,
  "shield-check": ShieldCheck,
  leaf: Leaf,
};

const HERO_IMAGES_A = [
  "/transformador-before.png",
  "/EMINSA/DSC07645.jpg",
  "/EMINSA/DSC07759.jpg",
  "/EMINSA/DSC07670.jpg",
];

const HERO_IMAGES_B = [
  "/transformador-after.png",
  "/EMINSA/DSC07678.jpg",
  "/EMINSA/DSC07827.jpg",
  "/EMINSA/DSC07780.jpg",
];

const HERO_IMAGES_C = [
  "/EMINSA/DSC07174.jpg",
  "/EMINSA/DSC07764.jpg",
  "/EMINSA/DSC07149.jpg",
  "/EMINSA/DSC07188.jpg",
];

export default function EtrysPage() {
  const router = useRouter();
  const t = useTranslations("etrysPage");
  const tc = useTranslations("etrysConfig");
  const [quoteForm, setQuoteForm] = useState({ nombre: "", email: "", telefono: "" });
  const [activeStepIndex, setActiveStepIndex] = useState<number | null>(null);
  const carouselRef = useRef<HTMLDivElement>(null);
  const [heroIdxA, setHeroIdxA] = useState(0);
  const [heroIdxB, setHeroIdxB] = useState(0);
  const [heroIdxC, setHeroIdxC] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => setHeroIdxA(p => (p + 1) % HERO_IMAGES_A.length), 3400);
    return () => clearInterval(interval);
  }, []);
  useEffect(() => {
    const interval = setInterval(() => setHeroIdxB(p => (p + 1) % HERO_IMAGES_B.length), 4100);
    return () => clearInterval(interval);
  }, []);
  useEffect(() => {
    const interval = setInterval(() => setHeroIdxC(p => (p + 1) % HERO_IMAGES_C.length), 3700);
    return () => clearInterval(interval);
  }, []);

  const scrollCarousel = (direction: "left" | "right") => {
    if (!carouselRef.current) return;
    const scrollAmount = carouselRef.current.offsetWidth * 0.75;
    carouselRef.current.scrollBy({
      left: direction === "left" ? -scrollAmount : scrollAmount,
      behavior: "smooth",
    });
  };

  const handleQuoteSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const params = new URLSearchParams();
    if (quoteForm.nombre) params.set("nombre", quoteForm.nombre);
    if (quoteForm.email) params.set("email", quoteForm.email);
    if (quoteForm.telefono) params.set("telefono", quoteForm.telefono);
    router.push(`/etrys/cotizaciones?${params.toString()}`);
  };


  return (
    <div className="min-h-screen">
      {/* ============================================================ */}
      {/* HERO — Polaroid Transformation Stack                        */}
      {/* ============================================================ */}
      <section className="relative bg-gradient-to-br from-[#0099ce] via-[#007ba8] to-[#00269b] text-white overflow-hidden min-h-120 sm:min-h-135 lg:h-160 lg:flex lg:items-center">

        {/* Dot texture */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            backgroundImage: "radial-gradient(circle, rgba(255,255,255,0.13) 1px, transparent 1px)",
            backgroundSize: "26px 26px",
          }}
        />

        {/* Depth glows */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <div className="absolute -bottom-40 -left-20 w-[500px] h-[500px] rounded-full bg-[#00175d]/50 blur-[100px]" />
          <div className="absolute -top-20 -right-10 w-[420px] h-[420px] rounded-full bg-white/6 blur-[110px]" />
        </div>

        {/* Giant faint "RST" watermark */}
        <div className="absolute inset-0 flex items-center justify-end pointer-events-none select-none overflow-hidden">
          <motion.span
            initial={{ opacity: 0, x: 120, filter: "blur(24px)" }}
            animate={{ opacity: 0.035, x: 0, filter: "blur(0px)" }}
            transition={{ duration: 1.6, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="text-white leading-none font-black tracking-tighter pr-4"
            style={{ fontSize: "clamp(8rem, 18vw, 22rem)" }}
          >
            RST
          </motion.span>
        </div>

        <div className="container-eminsa relative w-full py-14 lg:py-0">
          <div className="grid lg:grid-cols-[1fr_490px] gap-10 lg:gap-6 items-center">

            {/* ══════════ LEFT — CONTENT ══════════ */}
            <div className="space-y-7 lg:pr-6">

              {/* Eyebrow line */}
              <motion.div
                initial={{ opacity: 0, x: -24 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
                className="flex items-center gap-3"
              >
                <div className="h-px w-10 bg-white/50" />
                <span className="text-white/70 text-[11px] font-bold uppercase tracking-[0.32em]">División RST · ETRYS</span>
              </motion.div>

              {/* Title */}
              <motion.h1
                initial={{ opacity: 0, y: 32 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.75, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
                className="text-4xl sm:text-5xl md:text-6xl lg:text-[3.2rem] xl:text-[3.75rem] font-black leading-[1.04] tracking-tight"
              >
                {tc("info.tagline")}
              </motion.h1>

              {/* Subtitle */}
              <motion.p
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.22 }}
                className="text-white/65 text-base lg:text-[1.05rem] leading-relaxed max-w-sm"
              >
                {t("hero.heroSubtitle")}
              </motion.p>

              {/* Benefit rows */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3 }}
                className="space-y-2.5"
              >
                {[
                  { Icon: PiggyBank, text: "Hasta 70% menos que un transformador nuevo" },
                  { Icon: ShieldCheck, text: "Garantía certificada IEEE C57 / ANSI" },
                  { Icon: Zap,        text: "Restauración · Remanufactura · Alquiler" },
                ].map(({ Icon, text }, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: -18 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.34 + i * 0.1, duration: 0.45 }}
                    className="flex items-center gap-3"
                  >
                    <div className="w-8 h-8 rounded-xl bg-white/15 flex items-center justify-center shrink-0">
                      <Icon size={15} className="text-white" />
                    </div>
                    <span className="text-white/85 text-sm font-medium">{text}</span>
                  </motion.div>
                ))}
              </motion.div>

              {/* CTAs */}
              <motion.div
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.55 }}
                className="flex flex-wrap gap-3 pt-1"
              >
                <Link
                  href="/etrys/cotizaciones"
                  className="group inline-flex items-center gap-2 px-7 py-3.5 bg-white text-[#0099ce] hover:bg-white/92 text-sm font-bold rounded-xl transition-all duration-300 shadow-xl shadow-black/25 hover:-translate-y-0.5"
                >
                  {t("hero.requestQuote")}
                  <ArrowRight size={15} className="group-hover:translate-x-0.5 transition-transform" />
                </Link>
                <a
                  href={getWhatsAppUrl()}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-7 py-3.5 bg-white/10 hover:bg-white/20 border border-white/25 hover:border-white/45 text-white text-sm font-semibold rounded-xl transition-all duration-300 backdrop-blur-sm"
                >
                  <MessageCircle size={15} />
                  WhatsApp
                </a>
              </motion.div>
            </div>

            {/* ══════════ RIGHT — Floating Depth Gallery ══════════ */}
            <div className="relative self-center w-full flex items-center justify-center" style={{ height: "clamp(330px, 46vw, 450px)" }}>

              {/* ── Back-left panel (tilted, behind) ── */}
              <motion.div
                initial={{ opacity: 0, x: -50, rotate: -8 }}
                animate={{ opacity: 1, x: 0, rotate: -4 }}
                transition={{ duration: 0.9, delay: 0.35, ease: [0.22, 1, 0.36, 1] }}
                className="absolute z-10"
                style={{ top: "4%", left: "0%", width: "48%", maxWidth: 210 }}
              >
                <motion.div
                  animate={{ y: [0, -7, 0], rotate: [-4, -3, -4] }}
                  transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
                >
                  <div className="relative rounded-2xl overflow-hidden shadow-2xl" style={{ aspectRatio: "3/4" }}>
                    <AnimatePresence mode="wait">
                      <motion.div
                        key={heroIdxC}
                        initial={{ opacity: 0, scale: 1.12 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.9 }}
                        className="absolute inset-0"
                      >
                        <Image src={HERO_IMAGES_C[heroIdxC]} alt="Taller RST" fill sizes="210px" className="object-cover" />
                      </motion.div>
                    </AnimatePresence>
                    <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
                  </div>
                </motion.div>
              </motion.div>

              {/* ── Main center panel (largest, front) ── */}
              <motion.div
                initial={{ opacity: 0, y: 50, scale: 0.9 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ duration: 0.85, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
                className="absolute z-30"
                style={{ top: "2%", left: "16%", width: "60%", maxWidth: 280 }}
              >
                <motion.div
                  animate={{ y: [0, -5, 0] }}
                  transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut", delay: 0.6 }}
                >
                  <div
                    className="relative rounded-2xl overflow-hidden"
                    style={{ aspectRatio: "3/4", boxShadow: "0 30px 70px rgba(0,0,0,0.5), 0 10px 25px rgba(0,0,0,0.3)" }}
                  >
                    <AnimatePresence mode="wait">
                      <motion.div
                        key={heroIdxA}
                        initial={{ opacity: 0, x: 40 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -40 }}
                        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                        className="absolute inset-0"
                      >
                        <Image src={HERO_IMAGES_A[heroIdxA]} alt="Transformador RST" fill sizes="280px" className="object-cover" priority />
                      </motion.div>
                    </AnimatePresence>
                    <div className="absolute inset-0 bg-gradient-to-t from-[#00175d]/50 via-transparent to-transparent" />
                  </div>
                </motion.div>
              </motion.div>

              {/* ── Back-right panel (tilted opposite, behind) ── */}
              <motion.div
                initial={{ opacity: 0, x: 50, rotate: 8 }}
                animate={{ opacity: 1, x: 0, rotate: 3 }}
                transition={{ duration: 0.9, delay: 0.5, ease: [0.22, 1, 0.36, 1] }}
                className="absolute z-20"
                style={{ bottom: "2%", right: "0%", width: "46%", maxWidth: 200 }}
              >
                <motion.div
                  animate={{ y: [0, -9, 0], rotate: [3, 4, 3] }}
                  transition={{ duration: 5.4, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                >
                  <div className="relative rounded-2xl overflow-hidden shadow-2xl" style={{ aspectRatio: "3/4" }}>
                    <AnimatePresence mode="wait">
                      <motion.div
                        key={heroIdxB}
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -30 }}
                        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                        className="absolute inset-0"
                      >
                        <Image src={HERO_IMAGES_B[heroIdxB]} alt="Resultado RST" fill sizes="200px" className="object-cover" />
                      </motion.div>
                    </AnimatePresence>
                    <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
                  </div>
                </motion.div>
              </motion.div>

            </div>

          </div>
        </div>
      </section>

      {/* Reparación Section */}
      <section className="bg-white">
        <TransformadorRestauracionSection />
      </section>

      {/* Productos Remanufacturados */}
      <section className="pt-6 pb-12 lg:pb-16 bg-white">
        <div className="container-eminsa">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center max-w-3xl mx-auto mb-12"
          >
            <span className="inline-block px-3 py-1 bg-[#0099ce]/10 text-[#0099ce] text-sm font-medium rounded-full mb-4">
              {t("remanufactured.badge")}
            </span>
            <p className="text-gray-600 text-lg font-bold">
              {t("remanufactured.description")}
            </p>
          </motion.div>

          {/* Ventajas */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-12">
            {remanufacturedAdvantages.map((adv, index) => {
              const Icon = advantageIcons[adv.icon] || Zap;
              return (
                <motion.div
                  key={adv.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-white rounded-xl p-5 shadow-md hover:shadow-lg transition-all group"
                >
                  <div className="w-12 h-12 rounded-lg bg-[#0099ce]/10 flex items-center justify-center mb-3 group-hover:bg-[#0099ce] transition-colors">
                    <Icon size={24} className="text-[#0099ce] group-hover:text-white transition-colors" />
                  </div>
                  <h3 className="font-bold text-gray-900 mb-1">{tc(`remanufacturedAdvantages.${adv.id}.title`)}</h3>
                  <p className="text-sm text-gray-600">{tc(`remanufacturedAdvantages.${adv.id}.description`)}</p>
                  {adv.highlight && (
                    <span className="inline-block mt-2 px-2 py-0.5 bg-[#0099ce]/10 text-[#0099ce] text-xs font-semibold rounded">
                      {adv.highlight}
                    </span>
                  )}
                </motion.div>
              );
            })}
          </div>

          {/* Products Grid */}
          <div className="grid md:grid-cols-3 gap-6">
            {remanufacturedProducts.map((product, index) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.15 }}
              >
                <Link
                  href={`/etrys/productos/${product.slug}`}
                  className="block bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all group h-full"
                >
                  <div className="relative aspect-[4/3] bg-gray-100">
                    <Image
                      src={product.image}
                      alt={product.name}
                      fill
                      sizes="(max-width: 768px) 100vw, 50vw"
                      className="object-cover"
                    />
                    <div className="absolute top-3 right-3">
                      <span className="px-3 py-1 bg-[#0099ce] text-white text-xs font-bold rounded-full">
                        RST
                      </span>
                    </div>
                  </div>
                  <div className="p-6">
                    <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-[#0099ce] transition-colors">
                      {product.shortName}
                    </h3>
                    <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                      {product.description}
                    </p>
                    <div className="flex flex-wrap gap-2 mb-4">
                      <span className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded">
                        {product.powerRange}
                      </span>
                      <span className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded">
                        {product.voltageRange}
                      </span>
                    </div>
                    <div className="flex items-center gap-2 text-[#0099ce] font-medium">
                      {t("remanufactured.viewDetails")}
                      <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>

          {/* CTA */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mt-12"
          >
            <Link
              href="/etrys/productos"
              className="inline-flex items-center gap-2 px-6 py-3 bg-[#0099ce] hover:bg-[#007ba8] text-white font-semibold rounded-xl transition-colors"
            >
              {t("remanufactured.viewAll")}
              <ArrowRight size={20} />
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Proceso de Remanufactura */}
      <section className="py-16 lg:py-24 bg-white">
        <div className="container-eminsa">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center max-w-3xl mx-auto mb-12"
          >
            <span className="inline-block px-3 py-1 bg-[#0099ce]/10 text-[#0099ce] text-sm font-medium rounded-full mb-4">
              {t("process.badge")}
            </span>
            <h2 className="text-3xl md:text-4xl xl:text-5xl font-bold text-gray-900 mb-4">
              {t("process.title")}
            </h2>
            <p className="text-gray-600 text-lg">
              {t("process.description")}
            </p>
          </motion.div>

          {/* Process Steps — Carousel */}
          <div className="relative">
            {/* Nav buttons */}
            <button
              onClick={() => scrollCarousel("left")}
              className="absolute -left-4 top-1/2 -translate-y-1/2 z-10 w-10 h-10 rounded-full bg-white shadow-lg border border-gray-200 flex items-center justify-center text-gray-600 hover:text-[#0099ce] hover:border-[#0099ce] transition-colors"
            >
              <ChevronLeft size={20} />
            </button>
            <button
              onClick={() => scrollCarousel("right")}
              className="absolute -right-4 top-1/2 -translate-y-1/2 z-10 w-10 h-10 rounded-full bg-white shadow-lg border border-gray-200 flex items-center justify-center text-gray-600 hover:text-[#0099ce] hover:border-[#0099ce] transition-colors"
            >
              <ChevronRight size={20} />
            </button>

            {/* Scrollable track */}
            <div
              ref={carouselRef}
              className="overflow-x-auto scrollbar-hide flex gap-4 px-2 pb-4 snap-x snap-mandatory"
              style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
            >
              {remanufactureProcess.map((step, index) => (
                <motion.button
                  key={step.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: Math.min(index * 0.05, 0.4) }}
                  onClick={() => setActiveStepIndex(index)}
                  className="relative text-center group cursor-pointer snap-start shrink-0 w-36"
                >
                  <div className="relative z-10 w-12 h-12 mx-auto mb-3 rounded-full bg-linear-to-br from-[#0099ce] to-[#00269b] flex items-center justify-center text-white font-bold shadow-lg group-hover:scale-110 group-hover:shadow-xl transition-all duration-200">
                    {step.id}
                  </div>
                  <h3 className="font-semibold text-gray-900 text-sm mb-1 group-hover:text-[#0099ce] transition-colors">
                    {step.shortTitle}
                  </h3>
                  <p className="text-xs text-gray-500 line-clamp-2 leading-relaxed">
                    {step.description}
                  </p>
                  <p className="text-xs text-[#0099ce] font-medium mt-1 opacity-0 group-hover:opacity-100 transition-opacity">
                    {t("process.viewDetail")}
                  </p>
                </motion.button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Ventaja ETRYS */}
      <section className="py-16 lg:py-24 bg-gradient-to-br from-gray-900 via-gray-800 to-[#00269b] text-white">
        <div className="container-eminsa">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Content */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <span className="inline-block px-3 py-1 bg-white/10 text-white text-sm font-medium rounded-full mb-4">
                {t("whyRst.badge")}
              </span>
              <h2 className="text-3xl md:text-4xl xl:text-5xl font-bold mb-8">
                {t("whyRst.title")}
              </h2>

              <div className="space-y-6">
                {etrysInfo.advantages.map((adv, index) => (
                  <motion.div
                    key={adv.title}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.15 }}
                    className="flex gap-4"
                  >
                    <div className="w-14 h-14 rounded-xl bg-[#0099ce]/20 flex items-center justify-center shrink-0">
                      {adv.icon === "award" && <Award size={28} className="text-[#0099ce]" />}
                      {adv.icon === "users" && <Users size={28} className="text-[#0099ce]" />}
                      {adv.icon === "shield-check" && <ShieldCheck size={28} className="text-[#0099ce]" />}
                    </div>
                    <div>
                      <h3 className="text-xl font-bold mb-1 flex items-center gap-2">
                        {tc(`info.advantages.${index}.title`)}
                        {adv.highlight && (
                          <span className="text-sm font-normal px-2 py-0.5 bg-gray-500 text-white rounded">
                            {adv.highlight}
                          </span>
                        )}
                      </h3>
                      <p className="text-white/70">{tc(`info.advantages.${index}.description`)}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Form Preview */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="bg-white rounded-2xl p-6 md:p-8 text-gray-900"
            >
              <h3 className="text-2xl font-bold mb-2">{t("quoteForm.title")}</h3>
              <p className="text-gray-600 mb-6">
                {t("quoteForm.description")}
              </p>
              <form onSubmit={handleQuoteSubmit} className="space-y-4">
                <input
                  type="text"
                  placeholder={t("quoteForm.namePlaceholder")}
                  value={quoteForm.nombre}
                  onChange={(e) => setQuoteForm((p) => ({ ...p, nombre: e.target.value }))}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#0099ce] focus:border-transparent transition-all"
                />
                <input
                  type="email"
                  placeholder={t("quoteForm.emailPlaceholder")}
                  value={quoteForm.email}
                  onChange={(e) => setQuoteForm((p) => ({ ...p, email: e.target.value }))}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#0099ce] focus:border-transparent transition-all"
                />
                <PhoneInputField
                  value={quoteForm.telefono}
                  onChange={(val) => setQuoteForm((p) => ({ ...p, telefono: val }))}
                  focusColor="#0099ce"
                />
                <button
                  type="submit"
                  className="block w-full px-6 py-3 bg-[#0099ce] hover:bg-[#007ba8] text-white font-semibold rounded-xl transition-colors text-center"
                >
                  {t("quoteForm.submit")}
                </button>
              </form>
              <p className="text-xs text-gray-500 mt-4 flex items-center gap-2">
                <Clock size={14} />
                {t("quoteForm.responseTime")}
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Alquiler Section */}
      <section className="py-16 lg:py-24 bg-white">
        <div className="container-eminsa">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Image */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="relative"
            >
              <div className="aspect-[4/3] bg-gray-200 rounded-2xl overflow-hidden shadow-xl">
                <Image
                  src="/EMINSA/DSC07624.jpg"
                  alt="Alquiler de Transformadores ETRYS by EMINSA"
                  fill
                  sizes="(max-width: 768px) 100vw, 50vw"
                  className="object-cover"
                />
              </div>
              <div className="absolute -bottom-4 -right-4 bg-gray-500 text-white px-6 py-4 rounded-xl shadow-lg">
                <Phone size={24} className="mb-1" />
                <span className="font-bold block">{rentalInfo.phone}</span>
              </div>
            </motion.div>

            {/* Content */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <span className="inline-block px-3 py-1 bg-[#0099ce]/20 text-[#007ba8] text-sm font-medium rounded-full mb-4">
                {t("rental.badge")}
              </span>
              <h2 className="text-3xl md:text-4xl xl:text-5xl font-bold text-gray-900 mb-4">
                {t("rental.title")}
              </h2>
              <p className="text-gray-600 text-lg mb-6">
                {t("rental.description")}
              </p>

              <ul className="space-y-3 mb-8">
                {rentalInfo.benefits.slice(0, 4).map((benefit) => (
                  <li key={benefit.id} className="flex items-start gap-3">
                    <CheckCircle2 size={20} className="text-[#0099ce] shrink-0 mt-0.5" />
                    <div>
                      <span className="font-medium text-gray-900">{tc(`rental.benefits.${benefit.id}.title`)}</span>
                      <span className="text-gray-600 text-sm block">{tc(`rental.benefits.${benefit.id}.description`)}</span>
                    </div>
                  </li>
                ))}
              </ul>

              <div className="flex flex-wrap gap-4">
                <Link
                  href="/etrys/alquiler"
                  className="inline-flex items-center gap-2 px-6 py-3 bg-gray-500 hover:bg-[#007ba8] text-white font-semibold rounded-xl transition-colors"
                >
                  {t("rental.moreInfo")}
                  <ArrowRight size={20} />
                </Link>
                <a
                  href={`tel:${rentalInfo.phone}`}
                  className="inline-flex items-center gap-2 px-6 py-3 border-2 border-[#0099ce] text-[#0099ce] hover:bg-gray-500 hover:text-white font-semibold rounded-xl transition-colors"
                >
                  <Phone size={20} />
                  {t("rental.callNow")}
                </a>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      <RemanufactureProcessModal
        steps={remanufactureProcess}
        activeIndex={activeStepIndex}
        onClose={() => setActiveStepIndex(null)}
        onNavigate={setActiveStepIndex}
      />
    </div>
  );
}

