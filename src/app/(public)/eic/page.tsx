"use client";

import Link from "next/link";
import { useTranslations } from "next-intl";
import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import {
  Globe,
  ArrowRight,
  CheckCircle2,
  Phone,
  MessageCircle,
  Zap,
  Cable,
  Grid3X3,
  Shield,
  Plug,
  Award,
  Headphones,
  ShieldCheck,
  MapPin,
} from "lucide-react";
import Image from "next/image";
import { eicInfo, eicProductCategories, eicBrands } from "@/config/eic-data";

const categoryPhotos: Record<string, string> = {
  "transformadores": "/EMINSA/DSC07158.jpg",
  "cables": "/EMINSA/DSC07140.jpg",
  "distribucion-mt": "/EMINSA/DSC07215.jpg",
  "breakers": "/EMINSA/DSC07188.jpg",
  "accesorios": "/EMINSA/DSC07218.jpg",
};
import { contactInfo } from "@/config/navigation";
import { getWhatsAppUrl } from "@/utils/whatsapp";

const categoryIcons: { [key: string]: React.ElementType } = {
  zap: Zap,
  cable: Cable,
  "grid-3x3": Grid3X3,
  shield: Shield,
  plug: Plug,
};

const advantageIcons: { [key: string]: React.ElementType } = {
  globe: Globe,
  headphones: Headphones,
  "shield-check": ShieldCheck,
  award: Award,
};

const countryFlags: { [key: string]: string } = {
  Ecuador: "/images/eic/flags/ecuador.png",
  "Canadá / Norteamérica": "/images/eic/flags/canada.png",
  Italia: "/images/eic/flags/italia.png",
  España: "/images/eic/flags/espana.png",
  "Estados Unidos": "/images/eic/flags/estados-unidos.png",
  Portugal: "/images/eic/flags/portugal.png",
  "Francia / Global": "/images/eic/flags/francia.png",
  Internacional: "/images/eic/flags/internacional.png",
  "Francia / Polonia / Turquía": "/images/eic/flags/francia.png",
};

// ─── Shared image pool — same images travel center → top → bottom ─────────────
const CARD_IMGS = [
  "/images/eic/brands/inatra.png",
  "/images/eic/brands/hammond.png",
  "/images/eic/brands/elpitalia.png",
  "/images/eic/brands/green-transfo.png",
  "/images/eic/brands/schneider.png",
  "/images/eic/brands/topcable.png",
  "/images/eic/brands/chardon.png",
  "/images/eic/brands/cabelte.png",
];
const N = CARD_IMGS.length;

// ─── Ripple bubble ─────────────────────────────────────────────────────────────
function Ripple({ delay }: { delay: number }) {
  return (
    <motion.div
      className="absolute rounded-full border-[3px] border-white/70 pointer-events-none"
      style={{ width: 190, height: 190 }}
      animate={{ scale: [1, 1.04, 3.6], opacity: [0, 0.75, 0] }}
      transition={{
        duration: 7,
        delay,
        repeat: Infinity,
        ease: "easeOut",
        times: [0, 0.04, 1],
      }}
    />
  );
}

export default function EICPage() {
  const t = useTranslations("eicPage");
  const tc = useTranslations("eicConfig");

  // Guaranteed unique images: each card has a fixed offset so they never collide.
  // center = CARD_IMGS[tick % N]
  // top    = CARD_IMGS[(tick + OFFSET_TOP) % N]   → offset N/3 ≈ 2
  // bot    = CARD_IMGS[(tick + OFFSET_BOT) % N]   → offset 2*N/3 ≈ 5
  // Staggered timing creates the visual "jump" cascade.
  const OFFSET_TOP = Math.floor(N / 3);      // 2
  const OFFSET_BOT = Math.floor((2 * N) / 3); // 5

  const [cTick, setCTick] = useState(0); // center display tick
  const [tTick, setTTick] = useState(0); // top display tick
  const [bTick, setBTick] = useState(0); // bot display tick

  useEffect(() => {
    let current = 0;
    const interval = setInterval(() => {
      current += 1;
      const next = current;
      // Center jumps immediately
      setCTick(next);
      // Top jumps 1.8s later
      const t1 = setTimeout(() => setTTick(next), 1800);
      // Bot jumps 3.6s later
      const t2 = setTimeout(() => setBTick(next), 3600);
      return () => { clearTimeout(t1); clearTimeout(t2); };
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const centerImg = CARD_IMGS[cTick % N];
  const topImg    = CARD_IMGS[(tTick + OFFSET_TOP) % N];
  const botImg    = CARD_IMGS[(bTick + OFFSET_BOT) % N];

  return (
    <div className="min-h-screen">
      {/* ================================================================ */}
      {/* HERO SECTION */}
      {/* ================================================================ */}
      <section className="relative bg-linear-to-br from-[#009e49] via-[#007d3a] to-[#00269b] text-white py-12 lg:py-16 overflow-hidden min-h-120 sm:min-h-135 lg:min-h-160">
        {/* Giant faint "EIC" watermark */}
        <div className="absolute inset-0 flex items-center justify-end pointer-events-none select-none overflow-hidden">
          <motion.span
            initial={{ opacity: 0, x: 120, filter: "blur(24px)" }}
            animate={{ opacity: 0.04, x: 0, filter: "blur(0px)" }}
            transition={{ duration: 1.6, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="text-white leading-none font-black tracking-tighter pr-4"
            style={{ fontSize: "clamp(8rem, 18vw, 22rem)" }}
          >
            EIC
          </motion.span>
        </div>

        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div
            className="absolute inset-0"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.4'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
            }}
          />
        </div>

        <div className="container-eminsa relative">
          <div className="grid lg:grid-cols-2 gap-6 lg:gap-0 items-center">
            {/* Content */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              className="space-y-8"
            >
              <motion.div
                initial={{ opacity: 0, x: -24 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
                className="flex items-center gap-3"
              >
                <div className="h-px w-10 bg-white/50" />
                <span className="text-white/70 text-[11px] font-bold uppercase tracking-[0.32em]">{t("hero.eyebrow")}</span>
              </motion.div>

              <motion.h1
                initial={{ opacity: 0, y: 32 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.75, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
                className="text-4xl sm:text-5xl md:text-6xl lg:text-[3.2rem] xl:text-[3.75rem] font-black leading-[1.04] tracking-tight"
              >
                Eminsa International Corporation
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.22 }}
                className="text-white/65 text-base lg:text-[1.05rem] leading-relaxed max-w-sm"
              >
                {tc("info.description")}
              </motion.p>

              {/* CTAs */}
              <div className="flex flex-wrap gap-4">
                <Link
                  href="/eic/productos"
                  className="inline-flex items-center gap-2 px-6 py-3 bg-white text-[#009e49] hover:bg-white/90 font-semibold rounded-xl transition-all shadow-lg hover:shadow-xl"
                >
                  {t("hero.viewProducts")}
                  <ArrowRight size={20} />
                </Link>
                <Link
                  href="/eic/cotizaciones"
                  className="inline-flex items-center gap-2 px-6 py-3 bg-white/10 hover:bg-white/20 backdrop-blur-sm border border-white/30 text-white font-semibold rounded-xl transition-all"
                >
                  {t("hero.requestQuote")}
                  <ArrowRight size={20} />
                </Link>
              </div>
            </motion.div>

            {/* Visual — mobile brand grid */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="grid grid-cols-4 gap-3 lg:hidden"
            >
              {CARD_IMGS.map((src, i) => (
                <div key={i} className="bg-white/15 backdrop-blur-sm rounded-xl border border-white/25 p-2 flex items-center justify-center aspect-square">
                  <Image src={src} alt={t("brands.altBrand")} width={56} height={56} className="object-contain max-w-full max-h-full" />
                </div>
              ))}
            </motion.div>

            {/* Visual - Ripple + Floating Image Cards */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="relative hidden lg:block"
            >
              <div className="relative h-120">

                {/* ── Ripple bubbles — grow from center card ── */}
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                  {[0, 0.7, 1.4, 2.1, 2.8].map((d) => (
                    <Ripple key={d} delay={d} />
                  ))}
                </div>

                {/* ── Center card — brand logo cycling ── */}
                <div className="absolute inset-0 flex items-center justify-center z-10">
                  <motion.div
                    animate={{ y: [0, -8, 0] }}
                    transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut" }}
                    className="bg-white/15 backdrop-blur-md rounded-2xl border border-white/25 text-center overflow-hidden shadow-2xl"
                    style={{ width: 190, height: 190 }}
                  >
                    <AnimatePresence mode="wait">
                      <motion.div
                        key={centerImg}
                        initial={{ opacity: 0, scale: 1.08, y: 18 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.92, y: -18 }}
                        transition={{ duration: 0.6, ease: "easeOut" }}
                        className="absolute inset-0 flex flex-col items-center justify-center gap-2 p-5"
                      >
                        <div className="w-32 h-32 bg-white rounded-2xl flex items-center justify-center shadow-md overflow-hidden p-2">
                          <Image src={centerImg} alt={t("brands.altBrand")} width={90} height={90} className="object-contain max-w-full max-h-full"  />
                        </div>
                        <p className="text-[10px] text-white/70 font-semibold uppercase tracking-widest">{t("brands.label")}</p>
                      </motion.div>
                    </AnimatePresence>
                  </motion.div>
                </div>

                {/* ── Top-right card ── */}
                <div className="absolute top-4 right-4 z-20">
                  <motion.div
                    animate={{ y: [0, -10, 0] }}
                    transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: 0.8 }}
                    className="bg-white/15 backdrop-blur-md rounded-xl border border-white/25 overflow-hidden shadow-xl"
                    style={{ width: 155, height: 155 }}
                  >
                    <AnimatePresence mode="wait">
                      <motion.div
                        key={topImg}
                        initial={{ opacity: 0, x: 24 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -24 }}
                        transition={{ duration: 0.6, ease: "easeOut" }}
                        className="absolute inset-0 flex flex-col items-center justify-center gap-2 p-4"
                      >
                        <div className="w-24 h-24 bg-white rounded-2xl flex items-center justify-center shadow-md overflow-hidden p-2">
                          <Image src={topImg} alt={t("brands.altBrand")} width={90} height={90} className="object-contain max-w-full max-h-full"  />
                        </div>
                      </motion.div>
                    </AnimatePresence>
                  </motion.div>
                </div>

                {/* ── Bottom-left card — brand logo cycling ── */}
                <div className="absolute bottom-6 left-6 z-20">
                  <motion.div
                    animate={{ y: [0, -8, 0] }}
                    transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut", delay: 1.6 }}
                    className="bg-white/15 backdrop-blur-md rounded-xl border border-white/25 overflow-hidden shadow-xl"
                    style={{ width: 170, height: 170 }}
                  >
                    <AnimatePresence mode="wait">
                      <motion.div
                        key={botImg}
                        initial={{ opacity: 0, y: 24 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -24 }}
                        transition={{ duration: 0.6, ease: "easeOut" }}
                        className="absolute inset-0 flex flex-col items-center justify-center gap-2 p-4"
                      >
                        <div className="w-32 h-32 bg-white rounded-2xl flex items-center justify-center shadow-md overflow-hidden p-2">
                          <Image src={botImg} alt={t("brands.altBrand")} width={90} height={90} className="object-contain max-w-full max-h-full" />
                        </div>
                      </motion.div>
                    </AnimatePresence>
                  </motion.div>
                </div>

              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ================================================================ */}
      {/* MARCAS REPRESENTADAS */}
      {/* ================================================================ */}
      <section className="py-16 lg:py-24 bg-white">
        <div className="container-eminsa">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center max-w-3xl mx-auto mb-12"
          >
            <span className="inline-block px-3 py-1 bg-[#009e49]/10 text-[#009e49] text-sm font-medium rounded-full mb-4">
              {t("brands.badge")}
            </span>
            <h2 className="text-3xl md:text-4xl xl:text-5xl font-bold text-gray-900 mb-4">
              {t("brands.title")}
            </h2>
            <p className="text-gray-600 text-lg">
              {t("brands.description")}
            </p>
          </motion.div>

          {/* Brands Grid */}
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
            {eicBrands.map((brand, index) => (
              <motion.div
                key={brand.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.08 }}
              >
                <Link
                  href={`/eic/marcas/${brand.slug}`}
                  className="block bg-gray-50 hover:bg-white rounded-2xl p-5 shadow-sm hover:shadow-lg transition-all group h-full border border-gray-100 hover:border-[#009e49]/30"
                >
                  <div className="flex items-center gap-2 mb-3">
                    {countryFlags[brand.country] ? (
                      <Image
                        src={countryFlags[brand.country]}
                        alt={tc(`brands.${brand.slug}.country`)}
                        width={28}
                        height={20}
                        className="object-contain"
                      />
                    ) : (
                      <Globe className="w-5 h-5" />
                    )}
                    <span className="text-xs text-gray-500">
                      {tc(`brands.${brand.slug}.country`)}
                    </span>
                  </div>
                  <h3 className="text-lg font-bold text-gray-900 mb-2 group-hover:text-[#009e49] transition-colors">
                    {brand.name}
                  </h3>
                  <p className="text-sm text-gray-600 line-clamp-3 mb-3">
                    {tc(`brands.${brand.slug}.description`).substring(0, 150)}...
                  </p>
                  <div className="flex items-center gap-1 text-[#009e49] text-sm font-medium mt-auto">
                    {t("brands.viewBrand")}
                    <ArrowRight
                      size={14}
                      className="group-hover:translate-x-1 transition-transform"
                    />
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ================================================================ */}
      {/* CATEGORIAS DE PRODUCTOS */}
      {/* ================================================================ */}
      <section className="py-16 lg:py-24 bg-white">
        <div className="container-eminsa">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center max-w-3xl mx-auto mb-12"
          >
            <span className="inline-block px-3 py-1 bg-[#009e49]/10 text-[#009e49] text-sm font-medium rounded-full mb-4">
              {t("categories.badge")}
            </span>
            <h2 className="text-3xl md:text-4xl xl:text-5xl font-bold text-gray-900 mb-4">
              {t("categories.title")}
            </h2>
            <p className="text-gray-600 text-lg">
              {t("categories.description")}
            </p>
          </motion.div>

          {/* Categories */}
          <div className="space-y-8">
            {eicProductCategories.map((category, index) => {
              const Icon = categoryIcons[category.icon] || Zap;
              const isEven = index % 2 === 0;

              return (
                <motion.div
                  key={category.id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-all"
                >
                  <div
                    className={`grid md:grid-cols-2 gap-0 ${isEven ? "" : "md:[direction:rtl]"
                      }`}
                  >
                    {/* Photo Block with Icon */}
                    <div className="relative p-8 md:p-10 flex flex-col justify-center items-center text-white overflow-hidden min-h-72">
                      {categoryPhotos[category.slug] ? (
                        <Image
                          src={categoryPhotos[category.slug]}
                          alt={tc(`categories.${category.slug}.name`)}
                          fill
                          sizes="(max-width: 768px) 100vw, 50vw"
                          className="object-cover"
                        />
                      ) : null}
                      <div
                        className="absolute inset-0"
                        style={{ background: `linear-gradient(135deg, ${category.color}cc, ${category.color}99)` }}
                      />

                      <div className="relative z-10 text-center md:[direction:ltr]">
                        <div className="w-16 h-16 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center mx-auto mb-4">
                          <Icon size={32} className="text-white" />
                        </div>
                        <h3 className="text-2xl md:text-3xl font-bold mb-2">
                          {tc(`categories.${category.slug}.name`)}
                        </h3>
                        <div className="flex flex-wrap justify-center gap-2 mt-4">
                          {category.brands.map((brandName) => (
                            <span
                              key={brandName}
                              className="px-3 py-1 bg-white/20 backdrop-blur-sm rounded-full text-sm font-medium"
                            >
                              {brandName}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>

                    {/* Content */}
                    <div className="p-8 md:p-10 flex flex-col justify-center md:[direction:ltr]">
                      <h3 className="text-xl font-bold text-gray-900 mb-3">
                        {tc(`categories.${category.slug}.name`)}
                      </h3>
                      <p className="text-gray-600 mb-6 leading-relaxed">
                        {tc(`categories.${category.slug}.description`)}
                      </p>
                      <div className="flex flex-wrap gap-2 mb-6">
                        {category.brands.map((brandName) => (
                          <span
                            key={brandName}
                            className="inline-flex items-center gap-1 px-3 py-1 bg-gray-100 text-gray-700 text-sm rounded-lg"
                          >
                            <CheckCircle2
                              size={14}
                              className="text-[#009e49]"
                            />
                            {brandName}
                          </span>
                        ))}
                      </div>
                      <Link
                        href={`/eic/productos/${category.slug}`}
                        className="inline-flex items-center gap-2 text-[#009e49] font-semibold hover:gap-3 transition-all"
                      >
                        {t("categories.viewCategory")}
                        <ArrowRight size={18} />
                      </Link>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ================================================================ */}
      {/* VENTAJAS EIC */}
      {/* ================================================================ */}
      <section className="py-16 lg:py-24 bg-linear-to-br from-gray-900 via-gray-800 to-[#00269b] text-white">
        <div className="container-eminsa">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center max-w-3xl mx-auto mb-12"
          >
            <span className="inline-block px-3 py-1 bg-white/10 text-white text-sm font-medium rounded-full mb-4">
              {t("advantages.badge")}
            </span>
            <h2 className="text-3xl md:text-4xl xl:text-5xl font-bold mb-4">
              {t("advantages.title")}
            </h2>
            <p className="text-white/70 text-lg">
              {t("advantages.description")}
            </p>
          </motion.div>

          {/* Advantages Grid */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {eicInfo.advantages.map((adv, index) => {
              const Icon = advantageIcons[adv.icon] || Globe;
              return (
                <motion.div
                  key={adv.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/10 hover:bg-white/10 transition-all group"
                >
                  <div className="w-14 h-14 rounded-xl bg-[#009e49]/20 flex items-center justify-center mb-4 group-hover:bg-[#009e49] transition-colors">
                    <Icon
                      size={28}
                      className="text-[#009e49] group-hover:text-white transition-colors"
                    />
                  </div>
                  <h3 className="text-xl font-bold mb-2 flex items-center gap-2">
                    {tc(`info.advantages.${adv.id}.title`)}
                    {adv.highlight && (
                      <span className="text-xs font-normal px-2 py-0.5 bg-[#009e49] text-white rounded">
                        {tc(`info.advantages.${adv.id}.highlight`)}
                      </span>
                    )}
                  </h3>
                  <p className="text-white/70 text-sm leading-relaxed">
                    {tc(`info.advantages.${adv.id}.description`)}
                  </p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ================================================================ */}
      {/* CTA SECTION */}
      {/* ================================================================ */}
      <section className="py-16 lg:py-24 bg-white">
        <div className="container-eminsa">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="relative bg-linear-to-br from-[#009e49] via-[#007d3a] to-[#00269b] rounded-3xl p-8 md:p-12 lg:p-16 text-white text-center overflow-hidden"
          >
            {/* Decorative elements */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full -translate-y-1/2 translate-x-1/2" />
            <div className="absolute bottom-0 left-0 w-48 h-48 bg-white/5 rounded-full translate-y-1/2 -translate-x-1/2" />

            <div className="relative z-10 max-w-2xl mx-auto">
              <Globe size={48} className="mx-auto mb-6 text-white/80" />
              <h2 className="text-3xl md:text-4xl xl:text-5xl font-bold mb-4">
                {t("cta.title")}
              </h2>
              <p className="text-white/90 text-lg mb-8 leading-relaxed">
                {t("cta.description")}
              </p>

              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row justify-center gap-4 mb-8">
                <Link
                  href="/eic/cotizaciones"
                  className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-white text-[#009e49] hover:bg-white/90 font-bold rounded-xl transition-all shadow-lg hover:shadow-xl text-lg"
                >
                  {t("cta.requestQuote")}
                  <ArrowRight size={22} />
                </Link>
                <a
                  href={getWhatsAppUrl()}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-white/10 hover:bg-white/20 backdrop-blur-sm border border-white/30 text-white font-bold rounded-xl transition-all text-lg"
                >
                  <MessageCircle size={22} />
                  WhatsApp
                </a>
              </div>

              {/* Contact Info */}
              <div className="flex flex-col sm:flex-row justify-center items-center gap-6 text-white/80">
                <a
                  href={`tel:${contactInfo.phone}`}
                  className="inline-flex items-center gap-2 hover:text-white transition-colors"
                >
                  <Phone size={18} />
                  {contactInfo.phone}
                </a>
                <span className="hidden sm:inline text-white/30">|</span>
                <span className="inline-flex items-center gap-2">
                  <MapPin size={18} />
                  {contactInfo.address}
                </span>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
