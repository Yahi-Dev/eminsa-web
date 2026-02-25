"use client";

import { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, Calendar, ChevronLeft, ChevronRight, Tag } from "lucide-react";
import { useTranslations } from "next-intl";

const categoriaColors: { [key: string]: string } = {
  empresa: "#001689",
  productos: "#00A3E0",
  servicios: "#696969",
  eventos: "#00B140",
  industria: "#76777A",
};

const categoriaLabels: { [key: string]: string } = {
  empresa: "Empresa",
  productos: "Productos",
  servicios: "Servicios",
  eventos: "Eventos",
  industria: "Industria",
};

const noticias = [
  {
    id: "1",
    titulo: "EMINSA celebra 50 años de excelencia en transformadores",
    slug: "eminsa-celebra-50-anos",
    resumen: "Grupo EMINSA conmemora medio siglo de liderazgo en el sector de transformadores eléctricos en República Dominicana y el Caribe.",
    imagen: "/images/noticias/50-anos.jpg",
    categoria: "empresa",
    fechaPublicacion: "2024-12-01",
  },
  {
    id: "2",
    titulo: "Nueva línea de transformadores Pad Mounted de alta eficiencia",
    slug: "nueva-linea-pad-mounted",
    resumen: "Presentamos nuestra nueva línea de transformadores Pad Mounted que cumple con los estándares DOE-2016 y máxima eficiencia energética.",
    imagen: "/images/noticias/pad-mounted.jpg",
    categoria: "productos",
    fechaPublicacion: "2024-11-15",
  },
  {
    id: "3",
    titulo: "EMINSA renueva certificación ISO 9001:2015",
    slug: "renovacion-iso-9001",
    resumen: "Nuestra empresa renueva exitosamente la certificación internacional de gestión de calidad, reafirmando nuestro compromiso con la excelencia.",
    imagen: "/images/noticias/iso-9001.jpg",
    categoria: "empresa",
    fechaPublicacion: "2024-10-20",
  },
  {
    id: "4",
    titulo: "EIC expande su red de aliados estratégicos internacionales",
    slug: "eic-expansion-aliados",
    resumen: "Eminsa International Corporation suma nuevas marcas líderes del sector eléctrico a su portafolio, fortaleciendo su presencia en la región.",
    imagen: "/images/noticias/eic-expansion.jpg",
    categoria: "industria",
    fechaPublicacion: "2024-09-10",
  },
];

function formatFecha(fecha: string) {
  const date = new Date(fecha + "T00:00:00");
  return date.toLocaleDateString("es-DO", { year: "numeric", month: "long", day: "numeric" });
}

export default function NoticiasSection() {
  const t = useTranslations("home");
  const [activeIndex, setActiveIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  const next = useCallback(() => {
    setActiveIndex((prev) => (prev + 1) % noticias.length);
  }, []);

  useEffect(() => {
    if (!isAutoPlaying) return;
    const timer = setInterval(next, 5000);
    return () => clearInterval(timer);
  }, [isAutoPlaying, next]);

  const handleNav = (index: number) => {
    setActiveIndex(index);
    setIsAutoPlaying(false);
  };

  const activeNoticia = noticias[activeIndex];
  const color = categoriaColors[activeNoticia.categoria] || "#001689";

  return (
    <section className="py-20 lg:py-28 bg-white relative overflow-hidden">
      {/* Background */}
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-[#001689]/3 rounded-full blur-[120px] pointer-events-none" />

      <div className="container-eminsa relative">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="flex items-end justify-between mb-12"
        >
          <div>
            <span className="inline-block px-4 py-2 bg-[#001689]/10 text-[#001689] rounded-full text-sm font-semibold mb-4 uppercase">
              {t('news.sectionLabel')}
            </span>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-[#001689]">
              {t('news.title')}
            </h2>
          </div>
          <Link
            href="/noticias"
            className="hidden sm:inline-flex items-center gap-2 px-6 py-3 border-2 border-[#001689] text-[#001689] font-semibold rounded-xl hover:bg-[#001689] hover:text-white transition-all duration-300 group"
          >
            {t('news.viewAll')}
            <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
          </Link>
        </motion.div>

        <div className="grid lg:grid-cols-5 gap-8 items-start">
          {/* Featured article */}
          <div className="lg:col-span-3">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeIndex}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.4 }}
                className="rounded-3xl overflow-hidden shadow-xl border border-gray-100"
              >
                {/* Image placeholder */}
                <div
                  className="w-full h-64 md:h-80 flex items-center justify-center relative"
                  style={{ background: `linear-gradient(135deg, ${color}20 0%, ${color}08 100%)` }}
                >
                  <div
                    className="w-20 h-20 rounded-2xl flex items-center justify-center text-4xl font-black text-white"
                    style={{ backgroundColor: color }}
                  >
                    N
                  </div>
                  {/* Category badge */}
                  <div
                    className="absolute top-6 left-6 px-4 py-2 rounded-full text-white text-xs font-bold uppercase tracking-wide"
                    style={{ backgroundColor: color }}
                  >
                    {categoriaLabels[activeNoticia.categoria]}
                  </div>
                </div>

                <div className="p-8">
                  <div className="flex items-center gap-2 text-[#76777A] text-sm mb-4">
                    <Calendar size={14} />
                    {formatFecha(activeNoticia.fechaPublicacion)}
                  </div>
                  <h3 className="text-2xl font-bold text-[#001689] mb-4 leading-tight">
                    {activeNoticia.titulo}
                  </h3>
                  <p className="text-[#76777A] leading-relaxed mb-6">
                    {activeNoticia.resumen}
                  </p>
                  <Link
                    href={`/noticias/${activeNoticia.slug}`}
                    className="inline-flex items-center gap-2 font-semibold transition-all group"
                    style={{ color }}
                  >
                    {t('news.readMore')}
                    <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                  </Link>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Sidebar list */}
          <div className="lg:col-span-2 space-y-4">
            {noticias.map((noticia, index) => {
              const c = categoriaColors[noticia.categoria] || "#001689";
              return (
                <button
                  key={noticia.id}
                  onClick={() => handleNav(index)}
                  className={`w-full text-left p-5 rounded-2xl border-2 transition-all duration-300 ${
                    activeIndex === index
                      ? "shadow-md"
                      : "border-gray-100 bg-white hover:border-gray-200 hover:shadow-sm"
                  }`}
                  style={
                    activeIndex === index
                      ? { borderColor: c, backgroundColor: `${c}08` }
                      : {}
                  }
                >
                  <div className="flex items-center gap-2 mb-2">
                    <span
                      className="w-2 h-2 rounded-full flex-shrink-0"
                      style={{ backgroundColor: c }}
                    />
                    <span className="text-xs font-bold uppercase tracking-wide" style={{ color: c }}>
                      {categoriaLabels[noticia.categoria]}
                    </span>
                    <span className="text-xs text-[#76777A] ml-auto">
                      {formatFecha(noticia.fechaPublicacion)}
                    </span>
                  </div>
                  <p className={`text-sm font-semibold leading-tight ${activeIndex === index ? "text-[#001689]" : "text-gray-700"}`}>
                    {noticia.titulo}
                  </p>
                </button>
              );
            })}

            {/* Carousel dots */}
            <div className="flex justify-center gap-2 pt-2">
              {noticias.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => handleNav(idx)}
                  className="h-2 rounded-full transition-all duration-300"
                  style={{
                    width: activeIndex === idx ? "32px" : "8px",
                    backgroundColor: activeIndex === idx ? "#001689" : "#e5e7eb",
                  }}
                />
              ))}
            </div>
          </div>
        </div>

        {/* Mobile CTA */}
        <div className="sm:hidden text-center mt-8">
          <Link
            href="/noticias"
            className="inline-flex items-center gap-2 px-6 py-3 bg-[#001689] text-white font-semibold rounded-xl"
          >
            {t('news.viewAll')}
            <ArrowRight size={18} />
          </Link>
        </div>
      </div>
    </section>
  );
}
