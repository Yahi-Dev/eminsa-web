"use client";

import { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, Zap, Ruler, CheckCircle2, ChevronLeft, ChevronRight } from "lucide-react";

interface TransformerType {
  id: string;
  name: string;
  shortName: string;
  image: string;
  phases: string[];
  standards: string[];
  power: string;
  voltage: string;
  description: string;
  features: string[];
  href: string;
  color: string;
}

const transformerTypes: TransformerType[] = [
  {
    id: "tipo-poste",
    name: "Transformadores Tipo Poste",
    shortName: "Tipo Poste",
    image: "/images/mtn/tipo-poste.png",
    phases: ["3F", "1F"],
    standards: ["DOE 2016", "ANSI"],
    power: "15 - 500 KVA",
    voltage: "Hasta 34.5 KV",
    description:
      "Diseñados para ofrecer máxima confiabilidad, eficiencia y durabilidad en sistemas de distribución eléctrica aérea.",
    features: [
      "Máxima confiabilidad y eficiencia",
      "Diseño robusto para intemperie",
      "Cumplimiento ANSI y DOE 2016",
      "Aplicaciones residenciales e industriales",
    ],
    href: "/mtn/productos/transformadores/tipo-poste",
    color: "#001689",
  },
  {
    id: "pad-mounted",
    name: "Transformadores Pad Mounted",
    shortName: "Pad Mounted",
    image: "/images/mtn/pad-mounted.png",
    phases: ["3F", "1F"],
    standards: ["DOE 2016", "ANSI"],
    power: "30 - 3,000 KVA",
    voltage: "Hasta 34.5 KV",
    description:
      "Solución segura, compacta y altamente eficiente para sistemas de distribución subterránea.",
    features: [
      "Diseño compacto y seguro",
      "Montaje a nivel del suelo",
      "Protección hermética total",
      "Ideal para urbanizaciones",
    ],
    href: "/mtn/productos/transformadores/pad-mounted",
    color: "#00A3E0",
  },
];

export default function MTNProductsShowcase() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  const activeTransformer = transformerTypes[activeIndex];

  const nextSlide = useCallback(() => {
    setActiveIndex((prev) => (prev + 1) % transformerTypes.length);
  }, []);

  const prevSlide = useCallback(() => {
    setActiveIndex((prev) => (prev - 1 + transformerTypes.length) % transformerTypes.length);
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
    <section className="py-24 lg:py-32 bg-[#001689] relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0">
        <div className="absolute top-0 right-0 w-96 h-96 bg-white/5 rounded-full blur-[100px]" />
        <div className="absolute bottom-0 left-0 w-80 h-80 bg-[#00A3E0]/10 rounded-full blur-[80px]" />
      </div>

      <div className="container-eminsa relative">
        {/* Section Badge */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <span className="inline-block px-4 py-2 bg-white/10 text-white rounded-full text-sm font-semibold">
            Línea de Productos
          </span>
        </motion.div>

        {/* Product Tabs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="flex flex-wrap justify-center gap-3 mb-12"
        >
          {transformerTypes.map((type, index) => (
            <button
              key={type.id}
              onClick={() => goToSlide(index)}
              className={`px-6 py-3 rounded-xl font-semibold transition-all duration-300 ${
                activeIndex === index
                  ? "bg-white text-[#001689]"
                  : "bg-white/10 text-white/80 hover:bg-white/20"
              }`}
            >
              {type.shortName}
            </button>
          ))}
        </motion.div>

        {/* Main Carousel */}
        <div className="relative">
          {/* Navigation Arrows */}
          <button
            onClick={() => {
              prevSlide();
              setIsAutoPlaying(false);
            }}
            className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 z-20 w-12 h-12 bg-white/10 rounded-full flex items-center justify-center text-white hover:bg-white/20 transition-all duration-300"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>
          <button
            onClick={() => {
              nextSlide();
              setIsAutoPlaying(false);
            }}
            className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 z-20 w-12 h-12 bg-white/10 rounded-full flex items-center justify-center text-white hover:bg-white/20 transition-all duration-300"
          >
            <ChevronRight className="w-6 h-6" />
          </button>

          <AnimatePresence mode="wait">
            <motion.div
              key={activeIndex}
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
              transition={{ duration: 0.4 }}
              className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center"
            >
              {/* Product Image */}
              <div className="relative order-2 lg:order-1">
                <div className="relative aspect-square max-w-lg mx-auto">
                  <div className="relative bg-white/10 rounded-3xl p-8 backdrop-blur-sm border border-white/10">
                    <Image
                      src={activeTransformer.image}
                      alt={activeTransformer.name}
                      width={500}
                      height={500}
                      className="w-full h-auto object-contain drop-shadow-2xl"
                    />
                  </div>

                  {/* Phase Badges */}
                  <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 flex gap-3">
                    {activeTransformer.phases.map((phase) => (
                      <span
                        key={phase}
                        className="px-4 py-2 bg-white rounded-full text-[#001689] font-bold text-sm shadow-lg"
                      >
                        {phase}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Product Info */}
              <div className="space-y-6 order-1 lg:order-2">
                <div>
                  <h3 className="text-3xl md:text-4xl font-bold text-white mb-4">
                    {activeTransformer.name}
                  </h3>
                  <p className="text-white/70 text-lg leading-relaxed">
                    {activeTransformer.description}
                  </p>
                </div>

                {/* Specs */}
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-white/10 rounded-xl p-5 border border-white/10">
                    <div className="flex items-center gap-2 text-[#00A3E0] mb-2">
                      <Zap className="w-5 h-5" />
                      <span className="text-sm font-semibold">Potencia</span>
                    </div>
                    <p className="text-white text-lg font-bold">{activeTransformer.power}</p>
                  </div>
                  <div className="bg-white/10 rounded-xl p-5 border border-white/10">
                    <div className="flex items-center gap-2 text-[#00A3E0] mb-2">
                      <Ruler className="w-5 h-5" />
                      <span className="text-sm font-semibold">Voltaje</span>
                    </div>
                    <p className="text-white text-lg font-bold">{activeTransformer.voltage}</p>
                  </div>
                </div>

                {/* Standards */}
                <div className="flex flex-wrap gap-2">
                  {activeTransformer.standards.map((standard) => (
                    <span
                      key={standard}
                      className="px-4 py-2 bg-[#00A3E0]/20 text-[#00A3E0] rounded-lg text-sm font-semibold border border-[#00A3E0]/30"
                    >
                      {standard}
                    </span>
                  ))}
                </div>

                {/* Features */}
                <div className="space-y-3">
                  {activeTransformer.features.map((feature, index) => (
                    <div key={index} className="flex items-center gap-3">
                      <CheckCircle2 className="w-5 h-5 text-[#00A3E0] flex-shrink-0" />
                      <span className="text-white/80">{feature}</span>
                    </div>
                  ))}
                </div>

                {/* CTA Buttons */}
                <div className="flex flex-wrap gap-4 pt-4">
                  <Link
                    href="/cotizar"
                    className="inline-flex items-center gap-2 px-8 py-4 bg-[#00A3E0] text-white font-semibold rounded-xl hover:bg-[#0091C7] transition-all duration-300 group"
                  >
                    Cotizar Ahora
                    <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                  </Link>
                  <Link
                    href={activeTransformer.href}
                    className="inline-flex items-center gap-2 px-8 py-4 bg-white/10 text-white font-semibold rounded-xl hover:bg-white/20 transition-all duration-300 border border-white/20"
                  >
                    Ver Detalles
                  </Link>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Progress Dots */}
        <div className="flex justify-center gap-2 mt-12">
          {transformerTypes.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={`h-2 rounded-full transition-all duration-300 ${
                activeIndex === index
                  ? "w-8 bg-[#00A3E0]"
                  : "w-2 bg-white/30 hover:bg-white/50"
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
