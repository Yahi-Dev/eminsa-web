"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import { clientes, sectorColors } from "@/config/clientes-data";

// Duplicate for infinite loop
const clientesLoop = [...clientes, ...clientes];

export default function ClientesSection() {
  const t = useTranslations("home");
  const tc = useTranslations("clientes");
  const trackRef = useRef<HTMLDivElement>(null);
  const animRef = useRef<number>(0);
  const posRef = useRef(0);

  useEffect(() => {
    const speed = 0.45;
    const track = trackRef.current;
    if (!track) return;

    const step = () => {
      posRef.current += speed;
      const halfWidth = track.scrollWidth / 2;
      if (posRef.current >= halfWidth) posRef.current = 0;
      track.style.transform = `translateX(-${posRef.current}px)`;
      animRef.current = requestAnimationFrame(step);
    };

    animRef.current = requestAnimationFrame(step);
    return () => cancelAnimationFrame(animRef.current);
  }, []);

  const handleMouseEnter = () => cancelAnimationFrame(animRef.current);
  const handleMouseLeave = () => {
    const track = trackRef.current;
    if (!track) return;
    const speed = 0.45;
    const step = () => {
      posRef.current += speed;
      const halfWidth = track.scrollWidth / 2;
      if (posRef.current >= halfWidth) posRef.current = 0;
      track.style.transform = `translateX(-${posRef.current}px)`;
      animRef.current = requestAnimationFrame(step);
    };
    animRef.current = requestAnimationFrame(step);
  };

  return (
    <section className="py-20 bg-white overflow-hidden">
      <div className="container-eminsa">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-14"
        >
          <span className="inline-block px-4 py-2 bg-[#00269b]/10 text-[#00269b] rounded-full text-sm font-semibold mb-4 uppercase">
            {t("clients.sectionLabel")}
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-[#00269b]">
            {t("clients.title")}
          </h2>
        </motion.div>
      </div>

      {/* Infinite scroll carousel */}
      <div
        className="relative w-full overflow-hidden"
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        {/* Edge fades */}
        <div className="absolute left-0 top-0 bottom-0 w-28 bg-linear-to-r from-gray-50 to-transparent z-10 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-28 bg-linear-to-l from-gray-50 to-transparent z-10 pointer-events-none" />

        <div
          ref={trackRef}
          className="flex gap-4 will-change-transform"
          style={{ width: "max-content" }}
        >
          {clientesLoop.map((cliente, index) => {
            const color = sectorColors[cliente.sector] ?? "#00269b";
            return (
              <div
                key={`${cliente.id}-${index}`}
                className="shrink-0 w-52 bg-white rounded-2xl shadow-sm hover:shadow-md transition-all duration-300 hover:-translate-y-1 overflow-hidden"
                style={{ borderTop: `3px solid ${color}` }}
              >
                {/* Logo */}
                <div className="h-28 flex items-center justify-center px-5 pt-4 pb-2">
                  <div className="relative w-full h-full">
                    <Image
                      src={cliente.logo}
                      alt={cliente.nombre}
                      fill
                      sizes="160px"
                      className="object-contain"
                    />
                  </div>
                </div>

                {/* Name + sector badge */}
                <div className="px-4 pb-4 flex flex-col items-center gap-2 text-center">
                  <p className="text-xs font-semibold text-[#00269b] leading-tight line-clamp-2">
                    {cliente.nombre}
                  </p>
                  <span
                    className="px-2.5 py-1 rounded-full text-[10px] font-bold text-white uppercase tracking-wide"
                    style={{ backgroundColor: color }}
                  >
                    {tc(`sectors.${cliente.sector}`)}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
