"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, ChevronDown } from "lucide-react";
import { divisions, stats } from "@/config/navigation";
import { useCountUp } from "../hooks/useCountUp";
import { useTranslations } from "next-intl";

// Componente para animar números individuales
function AnimatedStat({ value, label, delay }: { value: string; label: string; delay: number }) {
  // Extraer el número de la cadena (ej: "50+" -> 50)
  const numericValue = parseInt(value.replace(/[^0-9]/g, ""));
  const suffix = value.replace(/[0-9]/g, "");
  const isSpecialCase = value === "24/7";
  
  const count = useCountUp({ 
    end: isSpecialCase ? 0 : numericValue, 
    duration: 3000, // Aumentado de 2000 a 3000ms
    delay: delay + 500 // Agregamos 500ms extra de delay
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

export default function HeroSection() {
  const t = useTranslations("home");
  const [activeSlide, setActiveSlide] = useState(0);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveSlide((prev) => (prev + 1) % divisions.length);
    }, 6000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    // Ensure video plays on mount
    if (videoRef.current) {
      videoRef.current.play().catch((error) => {
        console.log("Video autoplay failed:", error);
      });
    }
  }, []);

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
          Your browser does not support the video tag.
        </video>

        {/* Dark overlay for better text readability */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/50 to-black/60" />

        {/* Additional gradient overlay for depth */}
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/30" />

        {/* Animated floating orbs — futuristic depth effect */}
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
          <motion.div
            animate={{ x: [0, 15, -25, 0], y: [0, -20, 30, 0], scale: [1, 0.9, 1.1, 1] }}
            transition={{ duration: 24, repeat: Infinity, ease: "easeInOut", delay: 8 }}
            className="absolute top-1/2 left-1/4 w-[280px] h-[280px] bg-[#00B140]/8 rounded-full blur-[80px]"
          />
        </div>
      </div>

      {/* Content */}
      <div className="relative container-eminsa py-20 lg:py-32 z-10">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Left Column - Text Content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            {/* Main Heading */}
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold text-white mb-6 leading-tight"
            >
              <span className="block">{t('hero.title1')}</span>
              <span className="block text-[#00A3E0]">{t('hero.title2')}</span>
            </motion.h1>

            {/* Description */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="text-lg md:text-xl text-white/90 mb-10 max-w-xl"
            >
              {t('hero.description')}
            </motion.p>

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="flex flex-col sm:flex-row gap-4 mb-12"
            >
              <Link
                href="/cotizar"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-[#00A3E0] text-white font-semibold rounded-xl hover:bg-[#0091C7] transition-all duration-300 hover:shadow-lg hover:shadow-[#00A3E0]/30 hover:-translate-y-1"
              >
                {t('hero.cta')}
                <ArrowRight size={20} />
              </Link>
            </motion.div>

            {/* Stats */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="grid grid-cols-2 md:grid-cols-4 gap-6"
            >
              {stats.map((stat, index) => (
                <AnimatedStat
                  key={index}
                  value={stat.value}
                  label={t(`stats.${statKeys[index]}`)}
                  delay={700 + index * 100}
                />
              ))}
            </motion.div>
          </motion.div>

          {/* Right Column - Division Cards */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="hidden lg:block"
          >
            <div className="relative">
              {/* Cards Stack */}
              <div className="space-y-4">
                {divisions.map((division, index) => (
                  <motion.div
                    key={division.id}
                    initial={{ opacity: 0, x: 50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.5 + index * 0.1 }}
                  >
                    <Link
                      href={division.href}
                      className={`group block p-6 rounded-2xl backdrop-blur-md transition-all duration-300 ${
                        activeSlide === index
                          ? "bg-white/20 scale-105 shadow-2xl"
                          : "bg-white/10 hover:bg-white/15"
                      }`}
                      onMouseEnter={() => setActiveSlide(index)}
                    >
                      <div className="flex items-start justify-between">
                        <div>
                          <div className="flex items-center gap-3 mb-2">
                            <div
                              className="w-3 h-3 rounded-full"
                              style={{ backgroundColor: division.color }}
                            />
                            <span className="text-xl font-bold text-white">
                              {division.name}
                            </span>
                          </div>
                          <p className="text-white/70 text-sm max-w-xs line-clamp-3">
                            {division.description}
                          </p>
                        </div>
                        <ArrowRight
                          className={`text-white transition-all duration-300 ${
                            activeSlide === index
                              ? "opacity-100 translate-x-0"
                              : "opacity-0 -translate-x-4"
                          }`}
                          size={24}
                        />
                      </div>

                      {/* Features on active */}
                      {activeSlide === index && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: "auto" }}
                          className="mt-4 pt-4 border-t border-white/20"
                        >
                          <div className="flex flex-wrap gap-2">
                            {division.features.slice(0, 3).map((feature, i) => (
                              <span
                                key={i}
                                className="px-3 py-1 bg-white/15 rounded-full text-xs text-white/90"
                              >
                                {feature}
                              </span>
                            ))}
                          </div>
                        </motion.div>
                      )}
                    </Link>
                  </motion.div>
                ))}
              </div>
            </div>
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
          className="flex flex-col items-center gap-2 text-white/70 hover:text-white transition-colors"
        >
          <span className="text-sm">{t('hero.scrollIndicator')}</span>
          <ChevronDown size={24} className="animate-bounce" />
        </a>
      </motion.div>
    </section>
  );
}