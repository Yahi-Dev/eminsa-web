"use client";

import { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, Globe2, Building2, Award } from "lucide-react";
import { useTranslations } from "next-intl";

const brands = [
  {
    id: "inatra",
    slug: "inatra",
    country: "Ecuador",
    flag: "🇪🇨",
    logo: "/images/eic/brands/inatra.png",
    category: "Transformadores",
    color: "#00269b",
  },
  {
    id: "hammond",
    slug: "hammond",
    country: "Canadá",
    flag: "🇨🇦",
    logo: "/images/eic/brands/hammond.png",
    category: "Transformadores",
    color: "#0099ce",
  },
  {
    id: "elpitalia",
    slug: "elpitalia",
    country: "Italia",
    flag: "🇮🇹",
    logo: "/images/eic/brands/elpitalia.png",
    category: "Transformadores",
    color: "#009e49",
  },
  {
    id: "green-transfo",
    slug: "green-transfo",
    country: "Francia / Polonia",
    flag: "🇫🇷",
    logo: "/images/eic/brands/green-transfo.png",
    category: "Transformadores",
    color: "#3DCD58",
  },
  {
    id: "schneider",
    slug: "schneider-electric",
    country: "Francia",
    flag: "🇫🇷",
    logo: "/images/eic/brands/schneider.png",
    category: "Distribución MT / BT",
    color: "#3DCD58",
  },
  {
    id: "topcable",
    slug: "top-cable",
    country: "España",
    flag: "🇪🇸",
    logo: "/images/eic/brands/topcable.png",
    category: "Cables",
    color: "#0099ce",
  },
  {
    id: "southwire",
    slug: "southwire",
    country: "Estados Unidos",
    flag: "🇺🇸",
    logo: "/images/eic/brands/southwire.png",
    category: "Cables",
    color: "#00269b",
  },
  {
    id: "chardon",
    slug: "chardon",
    country: "Internacional",
    flag: "🌍",
    logo: "/images/eic/brands/chardon.png",
    category: "Accesorios MT",
    color: "#6d6e6d",
  },
  {
    id: "cabelte",
    slug: "cabelte",
    country: "Portugal",
    flag: "🇵🇹",
    logo: "/images/eic/brands/cabelte.png",
    category: "Cables",
    color: "#009e49",
  },
];

export default function EICBrandsShowcase() {
  const t = useTranslations("home.eic.showcase");
  const tc = useTranslations("eicConfig.brands");
  const [activeIndex, setActiveIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  const activeBrand = brands[activeIndex];

  const nextSlide = useCallback(() => {
    setActiveIndex((prev) => (prev + 1) % brands.length);
  }, []);

  const goToSlide = (index: number) => {
    setActiveIndex(index);
    setIsAutoPlaying(false);
  };

  useEffect(() => {
    if (!isAutoPlaying) return;
    const interval = setInterval(nextSlide, 5000);
    return () => clearInterval(interval);
  }, [isAutoPlaying, nextSlide]);

  return (
    <section className="py-24 lg:py-32 bg-[#009e49]/10 relative overflow-hidden">
      {/* Ambient blurs */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 right-0 w-125 h-125 bg-[#009e49]/5 rounded-full blur-[120px]" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-[#00269b]/5 rounded-full blur-[100px]" />
      </div>

      <div className="container-eminsa relative">
        {/* Header row */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.55 }}
          className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-5 mb-10"
        >
          <div>
            <span className="inline-flex items-center gap-2 text-[#009e49] text-xs font-bold uppercase tracking-[0.2em] mb-2">
              <Globe2 className="w-3.5 h-3.5" />
              {t("sectionLabel")}
            </span>
            <h2 className="text-3xl md:text-4xl xl:text-5xl font-bold text-[#00269b]">
              {t("title")}
            </h2>
          </div>

          {/* Brand pills selector */}
          <div className="flex items-center gap-1 bg-[#009e49]/10 p-1 rounded-xl w-fit overflow-x-auto max-w-full">
            {brands.slice(0, 5).map((brand, index) => (
              <button
                key={brand.id}
                onClick={() => goToSlide(index)}
                className="relative px-4 py-2 rounded-lg text-sm font-semibold transition-colors duration-200 whitespace-nowrap"
                style={{
                  color: activeIndex === index ? "#fff" : "#009e49",
                }}
              >
                {activeIndex === index && (
                  <motion.span
                    layoutId="eic-showcase-tab"
                    className="absolute inset-0 bg-[#009e49] rounded-lg"
                    transition={{ type: "spring", stiffness: 380, damping: 28 }}
                  />
                )}
                <span className="relative z-10">{brand.id === "green-transfo" ? "Green T." : brand.id.charAt(0).toUpperCase() + brand.id.slice(1)}</span>
              </button>
            ))}
            <button
              onClick={() => goToSlide(5)}
              className="relative px-4 py-2 rounded-lg text-sm font-semibold transition-colors duration-200 whitespace-nowrap"
              style={{
                color: activeIndex >= 5 ? "#fff" : "#009e49",
              }}
            >
              {activeIndex >= 5 && (
                <motion.span
                  layoutId="eic-showcase-tab"
                  className="absolute inset-0 bg-[#009e49] rounded-lg"
                  transition={{ type: "spring", stiffness: 380, damping: 28 }}
                />
              )}
              <span className="relative z-10">+{brands.length - 5}</span>
            </button>
          </div>
        </motion.div>

        {/* Brand showcase */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeIndex}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            className="grid lg:grid-cols-[1fr_1.25fr] rounded-2xl overflow-hidden border border-[#009e49]/20 bg-white/80 backdrop-blur-sm"
          >
            {/* Left: brand visual */}
            <div className="relative flex flex-col items-center justify-center gap-5 p-10 bg-gradient-to-br from-[#009e49]/5 to-transparent min-h-80">
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                <div className="w-60 h-60 rounded-full bg-[#009e49]/8 blur-3xl" />
              </div>

              {/* Brand logo area */}
              <div className="relative z-10 w-40 h-40 bg-white rounded-2xl shadow-lg flex items-center justify-center p-6 border border-gray-100">
                <span className="text-3xl font-bold text-[#00269b]">
                  {activeBrand.id === "green-transfo" ? "GT" : activeBrand.id.charAt(0).toUpperCase() + activeBrand.id.slice(1, 3).toUpperCase()}
                </span>
              </div>

              {/* Country + category pills */}
              <div className="flex gap-2 z-10 flex-wrap justify-center">
                <span className="px-4 py-1.5 bg-[#009e49]/10 border border-[#009e49]/20 rounded-full text-[#009e49] text-xs font-bold">
                  {activeBrand.flag} {activeBrand.country}
                </span>
                <span className="px-4 py-1.5 bg-[#00269b]/10 border border-[#00269b]/20 rounded-full text-[#00269b] text-xs font-bold">
                  {activeBrand.category}
                </span>
              </div>
            </div>

            {/* Right: brand info */}
            <div className="flex flex-col gap-5 p-10 border-l border-[#009e49]/10">
              <div>
                <div className="flex items-center gap-3 mb-3">
                  <h3 className="text-2xl md:text-3xl font-bold text-[#00269b] leading-snug capitalize">
                    {activeBrand.id === "green-transfo" ? "Green Transfo" : activeBrand.id.charAt(0).toUpperCase() + activeBrand.id.slice(1)}
                  </h3>
                  <span className="inline-flex items-center gap-1 px-3 py-1 bg-[#009e49]/10 text-[#009e49] rounded-full text-xs font-semibold">
                    <Award className="w-3 h-3" />
                    {t("exclusiveRep")}
                  </span>
                </div>
                <p className="text-gray-600 text-sm leading-relaxed">
                  {tc(`${activeBrand.id}.description`)}
                </p>
              </div>

              {/* Separator */}
              <div className="h-px bg-[#009e49]/10" />

              {/* Products */}
              <div>
                <span className="text-gray-400 text-[11px] uppercase tracking-widest block mb-3">
                  Productos
                </span>
                <div className="flex flex-wrap gap-2">
                  {Array.from({ length: 5 }).map((_, i) => {
                    try {
                      const product = tc(`${activeBrand.id}.products.${i}`);
                      if (!product || product.includes('.products.')) return null;
                      return (
                        <span
                          key={i}
                          className="px-3 py-1.5 bg-[#009e49]/8 border border-[#009e49]/15 text-[#009e49] rounded-lg text-xs font-bold"
                        >
                          {product}
                        </span>
                      );
                    } catch {
                      return null;
                    }
                  })}
                </div>
              </div>

              {/* CTAs */}
              <div className="flex flex-wrap gap-3 mt-auto pt-2">
                <Link
                  href="/eic/cotizaciones"
                  className="inline-flex items-center gap-2 bg-[#009e49] hover:bg-[#008740] text-white px-6 py-3 rounded-xl text-sm font-semibold transition-colors duration-300 group"
                >
                  {t("requestQuote")}
                  <ArrowRight size={15} className="group-hover:translate-x-0.5 transition-transform" />
                </Link>
                <Link
                  href={`/eic/marcas/${activeBrand.slug}`}
                  className="inline-flex items-center gap-2 bg-[#009e49]/8 hover:bg-[#009e49]/15 border border-[#009e49]/15 text-[#009e49] px-6 py-3 rounded-xl text-sm font-semibold transition-all duration-300"
                >
                  {t("viewBrand")}
                </Link>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Progress indicators */}
        <div className="flex justify-center gap-2 mt-6">
          {brands.map((_, i) => (
            <button
              key={i}
              onClick={() => goToSlide(i)}
              aria-label={`${i + 1}`}
              className={`h-0.5 rounded-full transition-all duration-300 ${
                activeIndex === i
                  ? "w-8 bg-[#009e49]"
                  : "w-4 bg-[#009e49]/20 hover:bg-[#009e49]/40"
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
