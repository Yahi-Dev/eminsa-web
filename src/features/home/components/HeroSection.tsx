"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, Search } from "lucide-react";
import { stats } from "@/config/navigation";
import { useCountUp } from "../hooks/useCountUp";
import { useTranslations } from "next-intl";

// Componente para animar números individuales
function AnimatedStat({ value, label, delay }: { value: string; label: string; delay: number }) {
  const numericValue = parseInt(value.replace(/[^0-9]/g, ""));
  const suffix = value.replace(/[0-9]/g, "");
  const isSpecialCase = value === "24/7";

  const count = useCountUp({
    end: isSpecialCase ? 0 : numericValue,
    duration: 3000,
    delay: delay + 500,
  });

  return (
    <div className="text-center md:text-left">
      <div className="text-3xl md:text-4xl font-bold text-white mb-1">
        {isSpecialCase ? value : `${count}${suffix}`}
      </div>
      <div className="text-sm text-white/70">{label}</div>
    </div>
  );
}

const statKeys = ["yearsExperience", "transformersInstalled", "satisfiedClients", "techSupport"] as const;

// Product explorer options
const actionOptions = [
  { value: "cotizar", label: "Cotizar" },
  { value: "comprar", label: "Comprar" },
  { value: "alquilar", label: "Alquilar" },
  { value: "reparar", label: "Reparar" },
];

const productOptions = [
  { value: "tipo-poste", label: "Transformador Tipo Poste", href: "/mtn/productos/transformadores/tipo-poste" },
  { value: "pad-mounted", label: "Transformador Pad Mounted", href: "/mtn/productos/transformadores/pad-mounted" },
  { value: "subestacion", label: "Transformador de Subestación", href: "/mtn/productos/transformadores/subestacion" },
  { value: "secos-resina", label: "Transformador Seco en Resina", href: "/mtn/productos/transformadores/secos-resina" },
  { value: "remanufacturado", label: "Transformador Remanufacturado", href: "/etrys/productos" },
  { value: "cables", label: "Cables Eléctricos", href: "/eic/productos/cables" },
  { value: "distribucion-mt", label: "Distribución Media Tensión", href: "/eic/productos/distribucion-mt" },
  { value: "breakers", label: "Breakers y Protección", href: "/eic/productos/breakers" },
];

export default function HeroSection() {
  const t = useTranslations("home");
  const [selectedAction, setSelectedAction] = useState("cotizar");
  const [selectedProduct, setSelectedProduct] = useState("pad-mounted");
  const [isActionOpen, setIsActionOpen] = useState(false);
  const [isProductOpen, setIsProductOpen] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const actionRef = useRef<HTMLDivElement>(null);
  const productRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.play().catch(() => {});
    }
  }, []);

  // Close dropdowns on click outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (actionRef.current && !actionRef.current.contains(event.target as Node)) {
        setIsActionOpen(false);
      }
      if (productRef.current && !productRef.current.contains(event.target as Node)) {
        setIsProductOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const currentAction = actionOptions.find((a) => a.value === selectedAction);
  const currentProduct = productOptions.find((p) => p.value === selectedProduct);

  const getExploreHref = () => {
    if (selectedAction === "alquilar") return "/servicios/alquiler-transformadores";
    if (selectedAction === "reparar") return "/etrys";
    if (selectedAction === "cotizar") return `/contacto?producto=${encodeURIComponent(currentProduct?.label || "")}`;
    return currentProduct?.href || "/mtn/productos";
  };

  return (
    <section className="relative min-h-screen flex items-center overflow-hidden">
      {/* Video Background */}
      <div className="absolute inset-0">
        <video
          ref={videoRef}
          className="absolute inset-0 w-full h-full object-cover"
          autoPlay
          loop
          muted
          playsInline
          poster="/images/video-poster.jpg"
        >
          <source src="/images/web-banner-video.mp4" type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/60 to-black/50" />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/40" />

        {/* Animated floating orbs */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <motion.div
            animate={{ x: [0, 40, -20, 0], y: [0, -30, 20, 0], scale: [1, 1.15, 0.9, 1] }}
            transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
            className="absolute top-1/4 right-1/3 w-[450px] h-[450px] bg-[#00A3E0]/12 rounded-full blur-[90px]"
          />
          <motion.div
            animate={{ x: [0, -30, 20, 0], y: [0, 25, -20, 0] }}
            transition={{ duration: 16, repeat: Infinity, ease: "easeInOut", delay: 4 }}
            className="absolute bottom-1/3 right-1/4 w-[350px] h-[350px] bg-[#001689]/20 rounded-full blur-[100px]"
          />
        </div>
      </div>

      {/* Content */}
      <div className="relative container-eminsa py-20 lg:py-32 z-10">
        <div className="max-w-5xl">
          {/* Main Heading - Bold industrial style */}
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-black text-white mb-4 leading-[0.9] tracking-tight uppercase"
          >
            <span className="block">Transformadores</span>
            <span className="block text-[#00A3E0]">Eléctricos</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="text-lg md:text-xl lg:text-2xl font-bold text-white/90 mb-2 uppercase tracking-wide"
          >
            Impulsando la Energía del Caribe
          </motion.p>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="text-base md:text-lg text-white/70 mb-10 max-w-2xl"
          >
            {t("hero.description")}
          </motion.p>

          {/* Product Explorer Bar */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.7 }}
            className="flex flex-col sm:flex-row max-w-3xl"
          >
            {/* Action Dropdown */}
            <div ref={actionRef} className="relative">
              <button
                onClick={() => { setIsActionOpen(!isActionOpen); setIsProductOpen(false); }}
                className="flex items-center justify-between gap-4 px-6 py-5 bg-white/10 backdrop-blur-md border border-white/20 sm:border-r-0 text-white font-semibold text-lg min-w-[180px] w-full sm:w-auto rounded-t-xl sm:rounded-t-none sm:rounded-l-xl hover:bg-white/15 transition-colors cursor-pointer"
              >
                <span>{currentAction?.label}</span>
                <ChevronDown size={20} className={`transition-transform duration-200 ${isActionOpen ? "rotate-180" : ""}`} />
              </button>
              <AnimatePresence>
                {isActionOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: -8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -8 }}
                    transition={{ duration: 0.15 }}
                    className="absolute top-full left-0 right-0 sm:right-auto z-50 mt-1 bg-white rounded-xl shadow-2xl overflow-hidden min-w-[180px]"
                  >
                    {actionOptions.map((option) => (
                      <button
                        key={option.value}
                        onClick={() => { setSelectedAction(option.value); setIsActionOpen(false); }}
                        className={`w-full text-left px-5 py-3 text-sm font-medium transition-colors cursor-pointer ${
                          selectedAction === option.value ? "bg-[#001689] text-white" : "text-gray-800 hover:bg-gray-100"
                        }`}
                      >
                        {option.label}
                      </button>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Product Dropdown */}
            <div ref={productRef} className="relative flex-1">
              <button
                onClick={() => { setIsProductOpen(!isProductOpen); setIsActionOpen(false); }}
                className="flex items-center justify-between gap-4 px-6 py-5 bg-white/10 backdrop-blur-md border border-white/20 text-white font-medium text-lg w-full hover:bg-white/15 transition-colors cursor-pointer"
              >
                <span className="truncate">{currentProduct?.label}</span>
                <ChevronDown size={20} className={`transition-transform duration-200 flex-shrink-0 ${isProductOpen ? "rotate-180" : ""}`} />
              </button>
              <AnimatePresence>
                {isProductOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: -8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -8 }}
                    transition={{ duration: 0.15 }}
                    className="absolute top-full left-0 right-0 z-50 mt-1 bg-white rounded-xl shadow-2xl overflow-hidden"
                  >
                    {productOptions.map((option) => (
                      <button
                        key={option.value}
                        onClick={() => { setSelectedProduct(option.value); setIsProductOpen(false); }}
                        className={`w-full text-left px-5 py-3 text-sm font-medium transition-colors cursor-pointer ${
                          selectedProduct === option.value ? "bg-[#001689] text-white" : "text-gray-800 hover:bg-gray-100"
                        }`}
                      >
                        {option.label}
                      </button>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Explore Button */}
            <Link
              href={getExploreHref()}
              className="flex items-center justify-center gap-2 px-8 py-5 bg-[#00A3E0] text-white font-bold text-lg rounded-b-xl sm:rounded-b-none sm:rounded-r-xl hover:bg-[#0091C7] transition-all duration-300 hover:shadow-lg hover:shadow-[#00A3E0]/30 cursor-pointer"
            >
              <Search size={20} />
              Explorar
            </Link>
          </motion.div>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 }}
            className="grid grid-cols-2 xl:grid-cols-4 gap-6 mt-14 max-w-3xl"
          >
            {stats.map((stat, index) => (
              <AnimatedStat
                key={index}
                value={stat.value}
                label={t(`stats.${statKeys[index]}`)}
                delay={900 + index * 100}
              />
            ))}
          </motion.div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10"
      >
        <a
          href="#divisiones"
          className="flex flex-col items-center gap-2 text-white/70 hover:text-white transition-colors cursor-pointer"
          onClick={(e) => {
            e.preventDefault();
            document.getElementById("divisiones")?.scrollIntoView({ behavior: "smooth" });
          }}
        >
          <span className="text-sm">{t("hero.scrollIndicator")}</span>
          <ChevronDown size={24} className="animate-bounce" />
        </a>
      </motion.div>
    </section>
  );
}
