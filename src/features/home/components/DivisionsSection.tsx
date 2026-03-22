"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, Factory, Wrench, Globe, Settings } from "lucide-react";
import { divisions } from "@/config/navigation";
import { useTranslations } from "next-intl";

const divisionPhotos: Record<string, string> = {
  mtn:       "/EMINSA/DSC07816.jpg",
  etrys:     "/EMINSA/DSC07751.jpg",
  eic:       "/EMINSA/DSC07158.jpg",
  servicios: "/EMINSA/DSC07203.jpg",
};

const iconMap: { [key: string]: React.ElementType } = {
  factory: Factory,
  wrench: Wrench,
  globe: Globe,
  settings: Settings,
};

export default function DivisionsSection() {
  const t = useTranslations("home");
  const tc = useTranslations("config");
  const [activeIndex, setActiveIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const [progress, setProgress] = useState(0);
  const progressRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const activeDivision = divisions[activeIndex];

  const resetProgress = useCallback(() => {
    setProgress(0);
    if (progressRef.current) clearInterval(progressRef.current);
    progressRef.current = setInterval(() => {
      setProgress((p) => {
        if (p >= 100) return 100;
        return p + 100 / (4500 / 50);
      });
    }, 50);
  }, []);

  const next = useCallback(() => {
    setActiveIndex((prev) => (prev + 1) % divisions.length);
  }, []);

  useEffect(() => {
    if (!isAutoPlaying) return;
    resetProgress();
    const timer = setInterval(next, 4500);
    return () => {
      clearInterval(timer);
      if (progressRef.current) clearInterval(progressRef.current);
    };
  }, [isAutoPlaying, next, resetProgress]);

  // Reset progress bar when slide changes
  useEffect(() => {
    if (isAutoPlaying) resetProgress();
  }, [activeIndex, isAutoPlaying, resetProgress]);

  const handleTabClick = (index: number) => {
    setActiveIndex(index);
    setIsAutoPlaying(false);
    setProgress(0);
  };

  return (
    <section id="divisiones" className="py-20 lg:py-28 bg-white relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-gray-50 rounded-full blur-[120px]" />
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-gray-50 rounded-full blur-[100px]" />
      </div>

      <div className="container-eminsa relative">
        {/* Division Name Bubbles */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="flex flex-wrap justify-center gap-3 mb-10"
        >
          {divisions.map((division, index) => (
            <button
              key={division.id}
              onClick={() => handleTabClick(index)}
              className={`px-6 py-3 rounded-full font-bold text-sm uppercase tracking-wide transition-all duration-300 ${
                activeIndex === index
                  ? "text-white shadow-lg scale-105"
                  : "bg-gray-100 text-gray-500 hover:bg-gray-200 hover:scale-102"
              }`}
              style={
                activeIndex === index
                  ? { backgroundColor: division.color }
                  : {}
              }
            >
              {division.name}
            </button>
          ))}
        </motion.div>

        {/* Carousel Card */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeIndex}
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -24 }}
            transition={{ duration: 0.4 }}
            className="rounded-3xl overflow-hidden shadow-xl border border-gray-100"
          >
            <div className="grid lg:grid-cols-2">
              {/* Left: Info */}
              <div
                className="p-10 lg:p-14 flex flex-col justify-center"
                style={{
                  background: `linear-gradient(135deg, ${activeDivision.color}12 0%, ${activeDivision.color}05 100%)`,
                }}
              >
                {/* Icon */}
                <div
                  className="w-16 h-16 rounded-2xl flex items-center justify-center mb-6"
                  style={{ backgroundColor: `${activeDivision.color}20` }}
                >
                  {(() => {
                    const IconComp = iconMap[activeDivision.icon] || Factory;
                    return (
                      <IconComp
                        className="w-8 h-8"
                        style={{ color: activeDivision.color }}
                      />
                    );
                  })()}
                </div>

                {/* Tagline badge */}
                <div
                  className="inline-block self-start px-3 py-1 rounded-full text-xs font-bold uppercase tracking-widest mb-4"
                  style={{
                    backgroundColor: `${activeDivision.color}15`,
                    color: activeDivision.color,
                  }}
                >
                  {tc(`divisions.${activeDivision.id}.tagline`)}
                </div>

                {/* Name */}
                <h3 className="text-5xl md:text-6xl font-black text-[#00269b] mb-4">
                  {activeDivision.name}
                </h3>

                {/* Description */}
                <p className="text-[#6d6e6d] text-base leading-relaxed mb-8">
                  {tc(`divisions.${activeDivision.id}.description`)}
                </p>

                {/* CTA */}
                <Link
                  href={activeDivision.href}
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-xl font-semibold text-white transition-all hover:opacity-90 hover:-translate-y-0.5 self-start group"
                  style={{ backgroundColor: activeDivision.color }}
                >
                  {t('divisions.cta')}
                  <ArrowRight
                    size={18}
                    className="group-hover:translate-x-1 transition-transform"
                  />
                </Link>
              </div>

              {/* Right: Photo + Features grid */}
              <div className="relative flex flex-col justify-between overflow-hidden min-h-80">
                {/* Background photo */}
                <Image
                  src={divisionPhotos[activeDivision.id] ?? "/EMINSA/DSC07174.jpg"}
                  alt={activeDivision.name}
                  fill
                  priority
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className="object-cover brightness-50"
                />
                {/* Color tint overlay */}
                <div
                  className="absolute inset-0"
                  style={{ backgroundColor: `${activeDivision.color}40` }}
                />

                {/* Content */}
                <div className="relative z-10 p-10 lg:p-14 flex flex-col justify-between h-full">
                  <div className="grid grid-cols-2 gap-4 mb-8">
                    {activeDivision.features.map((feature, idx) => (
                      <motion.div
                        key={feature}
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: idx * 0.07 }}
                        className="bg-white/15 backdrop-blur-sm rounded-xl p-5 border border-white/25 hover:bg-white/25 transition-all duration-200"
                      >
                        <div
                          className="w-2 h-2 rounded-full mb-3"
                          style={{ backgroundColor: activeDivision.color }}
                        />
                        <p className="font-semibold text-white text-sm drop-shadow">
                          {tc(`divisions.${activeDivision.id}.features.${idx}`)}
                        </p>
                      </motion.div>
                    ))}
                  </div>

                  {/* Progress dots + auto-play bar */}
                  <div className="space-y-3">
                    <div className="flex justify-center gap-2">
                      {divisions.map((div, idx) => (
                        <button
                          key={idx}
                          onClick={() => handleTabClick(idx)}
                          className="h-2 rounded-full transition-all duration-300"
                          style={{
                            width: activeIndex === idx ? "32px" : "8px",
                            backgroundColor:
                              activeIndex === idx ? "white" : "rgba(255,255,255,0.3)",
                          }}
                        />
                      ))}
                    </div>
                    {isAutoPlaying && (
                      <div className="w-full h-0.5 bg-white/20 rounded-full overflow-hidden">
                        <motion.div
                          className="h-full rounded-full bg-white"
                          animate={{ width: `${progress}%` }}
                          transition={{ duration: 0.05, ease: "linear" }}
                        />
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}
