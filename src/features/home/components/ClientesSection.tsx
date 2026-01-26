"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, Building2 } from "lucide-react";

// Datos de clientes (temporales con iconos)
const clientes = [
  {
    id: 1,
    nombre: "Grupo Eléctrico Dominicano",
    imagen: null, // Placeholder
    industria: "Energía"
  },
  {
    id: 2,
    nombre: "Grupo Puntacana",
    imagen: null,
    industria: "Turismo"
  },
  {
    id: 3,
    nombre: "Ramos Grupo",
    imagen: null,
    industria: "Industrial"
  },
  {
    id: 4,
    nombre: "Grupo Viamar",
    imagen: null,
    industria: "Marítimo"
  },
  {
    id: 5,
    nombre: "EDE Norte",
    imagen: null,
    industria: "Energía"
  },
  {
    id: 6,
    nombre: "EDE Este",
    imagen: null,
    industria: "Energía"
  },
  {
    id: 7,
    nombre: "CEPM",
    imagen: null,
    industria: "Minería"
  },
  {
    id: 8,
    nombre: "Cervecería Nacional Dominicana",
    imagen: null,
    industria: "Industria"
  },
];

export default function ClientesSection() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  
  // Configuración responsive
  const itemsPerSlide = {
    mobile: 1,
    tablet: 2,
    desktop: 4,
  };
  
  const [itemsToShow, setItemsToShow] = useState(itemsPerSlide.desktop);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 640) {
        setItemsToShow(itemsPerSlide.mobile);
      } else if (window.innerWidth < 1024) {
        setItemsToShow(itemsPerSlide.tablet);
      } else {
        setItemsToShow(itemsPerSlide.desktop);
      }
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const totalSlides = Math.ceil(clientes.length / itemsToShow);

  useEffect(() => {
    if (!isAutoPlaying) return;

    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % totalSlides);
    }, 4000);

    return () => clearInterval(interval);
  }, [isAutoPlaying, totalSlides]);

  const goToSlide = (index: number) => {
    setCurrentSlide(index);
    setIsAutoPlaying(false);
    setTimeout(() => setIsAutoPlaying(true), 5000);
  };

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % totalSlides);
    setIsAutoPlaying(false);
    setTimeout(() => setIsAutoPlaying(true), 5000);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + totalSlides) % totalSlides);
    setIsAutoPlaying(false);
    setTimeout(() => setIsAutoPlaying(true), 5000);
  };

  const getCurrentClientes = () => {
    const start = currentSlide * itemsToShow;
    return clientes.slice(start, start + itemsToShow);
  };

  return (
    <section className="py-20 bg-white">
      <div className="container-eminsa">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-[#001689] mb-4">
            Clientes
          </h2>
          <p className="text-[#76777A] text-lg">
            Empresas líderes que confían en nuestros transformadores y servicios
          </p>
        </motion.div>

        {/* Carousel Container */}
        <div className="relative max-w-6xl mx-auto">
          {/* Navigation Buttons */}
          <button
            onClick={prevSlide}
            className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 lg:-translate-x-12 z-10 w-12 h-12 bg-white rounded-full shadow-lg flex items-center justify-center text-[#001689] hover:bg-[#001689] hover:text-white transition-all duration-300 hover:scale-110"
            aria-label="Cliente anterior"
          >
            <ChevronLeft size={24} />
          </button>

          <button
            onClick={nextSlide}
            className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 lg:translate-x-12 z-10 w-12 h-12 bg-white rounded-full shadow-lg flex items-center justify-center text-[#001689] hover:bg-[#001689] hover:text-white transition-all duration-300 hover:scale-110"
            aria-label="Siguiente cliente"
          >
            <ChevronRight size={24} />
          </button>

          {/* Logos Grid */}
          <div className="overflow-hidden px-4">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentSlide}
                initial={{ opacity: 0, x: 100 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -100 }}
                transition={{ duration: 0.5 }}
                className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8"
              >
                {getCurrentClientes().map((cliente) => (
                  <motion.div
                    key={cliente.id}
                    whileHover={{ scale: 1.05 }}
                    className="flex flex-col items-center justify-center p-8 bg-gray-50 rounded-2xl border border-gray-100 hover:border-[#00A3E0]/30 hover:shadow-lg transition-all duration-300 group"
                  >
                    {cliente.imagen ? (
                      <img
                        src={cliente.imagen}
                        alt={cliente.nombre}
                        className="w-full h-24 object-contain grayscale group-hover:grayscale-0 transition-all duration-300"
                      />
                    ) : (
                      // Placeholder con icono
                      <div className="w-full h-24 flex items-center justify-center">
                        <div className="relative">
                          <div className="w-20 h-20 bg-gradient-to-br from-[#001689]/10 to-[#00A3E0]/10 rounded-2xl flex items-center justify-center group-hover:from-[#001689]/20 group-hover:to-[#00A3E0]/20 transition-all duration-300">
                            <Building2 className="w-10 h-10 text-[#001689] group-hover:text-[#00A3E0] transition-colors" />
                          </div>
                          {/* Badge de industria */}
                          <div className="absolute -top-2 -right-2 px-2 py-0.5 bg-[#00A3E0] text-white text-xs font-medium rounded-full">
                            {cliente.industria}
                          </div>
                        </div>
                      </div>
                    )}
                    
                    {/* Nombre del cliente */}
                    <p className="mt-4 text-sm font-medium text-[#001689] text-center group-hover:text-[#00A3E0] transition-colors">
                      {cliente.nombre}
                    </p>
                  </motion.div>
                ))}
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Dots Indicators */}
          <div className="flex justify-center gap-2 mt-8">
            {Array.from({ length: totalSlides }).map((_, index) => (
              <button
                key={index}
                onClick={() => goToSlide(index)}
                className={`transition-all duration-300 rounded-full ${
                  currentSlide === index
                    ? "w-8 h-2 bg-[#001689]"
                    : "w-2 h-2 bg-gray-300 hover:bg-gray-400"
                }`}
                aria-label={`Ir a diapositiva ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}