"use client";

import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { useTranslations } from "next-intl";

const sectorColors: { [key: string]: string } = {
  "Energía": "#001689",
  "Turismo": "#00A3E0",
  "Industrial": "#696969",
  "Alimentación": "#00B140",
  "Manufactura": "#696969",
  "Telecomunicaciones": "#00A3E0",
  "Construcción": "#76777A",
  "Minería": "#696969",
  "Retail": "#001689",
  "Salud": "#00B140",
};

const clientes = [
  { id: 1, nombre: "Grupo Viamar", sector: "Industrial", logo: null },
  { id: 2, nombre: "Helados Bon", sector: "Alimentación", logo: null },
  { id: 3, nombre: "Ingeniería Estrella", sector: "Construcción", logo: null },
  { id: 4, nombre: "INICA", sector: "Manufactura", logo: null },
  { id: 5, nombre: "Lexco", sector: "Industrial", logo: null },
  { id: 6, nombre: "Gerdau Metaldom", sector: "Manufactura", logo: null },
  { id: 7, nombre: "Grupo Eléctrico Dom.", sector: "Energía", logo: null },
  { id: 8, nombre: "Bluewave Group", sector: "Turismo", logo: null },
  { id: 9, nombre: "Cap Cana", sector: "Turismo", logo: null },
  { id: 10, nombre: "CCN", sector: "Retail", logo: null },
  { id: 11, nombre: "Cementos Cibrao", sector: "Manufactura", logo: null },
  { id: 12, nombre: "CEPM", sector: "Energía", logo: null },
  { id: 13, nombre: "Claro RD", sector: "Telecomunicaciones", logo: null },
  { id: 14, nombre: "Gas Aribe", sector: "Energía", logo: null },
  { id: 15, nombre: "Grupo Puntacana", sector: "Turismo", logo: null },
  { id: 16, nombre: "Ramos Grupo", sector: "Industrial", logo: null },
];

// Duplicar para el loop infinito
const clientesLoop = [...clientes, ...clientes];

export default function ClientesSection() {
  const t = useTranslations("home");
  const trackRef = useRef<HTMLDivElement>(null);
  const animRef = useRef<number>(0);
  const posRef = useRef(0);

  useEffect(() => {
    const speed = 0.5; // px per frame
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
    const speed = 0.5;
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
    <section className="py-20 bg-gray-50 overflow-hidden">
      <div className="container-eminsa">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-14"
        >
          <span className="inline-block px-4 py-2 bg-[#001689]/10 text-[#001689] rounded-full text-sm font-semibold mb-4 uppercase">
            {t('clients.sectionLabel')}
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-[#001689]">
            {t('clients.title')}
          </h2>
        </motion.div>
      </div>

      {/* Infinite scroll carousel */}
      <div
        className="relative w-full overflow-hidden"
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        {/* Left fade */}
        <div className="absolute left-0 top-0 bottom-0 w-24 bg-gradient-to-r from-gray-50 to-transparent z-10 pointer-events-none" />
        {/* Right fade */}
        <div className="absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-gray-50 to-transparent z-10 pointer-events-none" />

        <div ref={trackRef} className="flex gap-5 will-change-transform" style={{ width: "max-content" }}>
          {clientesLoop.map((cliente, index) => {
            const color = sectorColors[cliente.sector] || "#001689";
            return (
              <div
                key={`${cliente.id}-${index}`}
                className="flex-shrink-0 w-52 bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-lg transition-all duration-300 hover:-translate-y-1 p-6 flex flex-col items-center gap-3 cursor-default"
              >
                {/* Logo placeholder */}
                <div
                  className="w-16 h-16 rounded-xl flex items-center justify-center text-2xl font-black text-white"
                  style={{ backgroundColor: color }}
                >
                  {cliente.nombre.charAt(0)}
                </div>
                <p className="text-sm font-bold text-[#001689] text-center leading-tight">
                  {cliente.nombre}
                </p>
                <span
                  className="px-3 py-1 rounded-full text-xs font-semibold text-white"
                  style={{ backgroundColor: color }}
                >
                  {cliente.sector}
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
