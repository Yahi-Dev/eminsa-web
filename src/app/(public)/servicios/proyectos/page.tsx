"use client";

import { useState, useRef, useCallback } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  ChevronRight,
  ChevronLeft,
  X,
  Calendar,
  MapPin,
  Building2,
  Wrench,
  CheckCircle2,
  ArrowRight,
  Settings,
  Briefcase,
} from "lucide-react";
import {
  proyectosServicios,
  type ProyectoServicio,
} from "@/config/servicios-data";
import { useTranslations } from "next-intl";

const formatDate = (dateStr: string) => {
  const date = new Date(dateStr + "T00:00:00");
  return date.toLocaleDateString("es-DO", { month: "short", year: "numeric" });
};

export default function ProyectosServiciosPage() {
  const t = useTranslations("pages.servicios.proyectosPage");
  const [selectedProject, setSelectedProject] =
    useState<ProyectoServicio | null>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const carouselRef = useRef<HTMLDivElement>(null);

  const proyectosDestacados = proyectosServicios.filter((p) => p.destacado);

  const scrollCarousel = useCallback(
    (direction: "left" | "right") => {
      if (!carouselRef.current) return;
      const cardWidth = carouselRef.current.querySelector("div")?.offsetWidth || 420;
      const scrollAmount = direction === "left" ? -cardWidth - 24 : cardWidth + 24;
      carouselRef.current.scrollBy({ left: scrollAmount, behavior: "smooth" });
    },
    []
  );

  const handleCarouselScroll = useCallback(() => {
    if (!carouselRef.current) return;
    const container = carouselRef.current;
    const cardWidth =
      (container.querySelector("div")?.offsetWidth || 420) + 24;
    const index = Math.round(container.scrollLeft / cardWidth);
    setActiveIndex(index);
  }, []);

  const scrollToIndex = useCallback((index: number) => {
    if (!carouselRef.current) return;
    const container = carouselRef.current;
    const cardWidth =
      (container.querySelector("div")?.offsetWidth || 420) + 24;
    container.scrollTo({ left: index * cardWidth, behavior: "smooth" });
    setActiveIndex(index);
  }, []);

  return (
    <div className="min-h-screen">
      {/* ================================================================ */}
      {/* 1. HERO SECTION */}
      {/* ================================================================ */}
      <section className="relative bg-gradient-to-br from-[#6d6e6d] via-[#575857] to-[#414241] text-white py-16 lg:py-24 overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div
            className="absolute inset-0"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.4'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
            }}
          />
        </div>
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-white/10 rounded-full blur-[120px]" />
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-white/5 rounded-full blur-[100px]" />

        <div className="container-eminsa relative">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex items-center gap-2 text-white/60 text-sm mb-8"
          >
            <Link href="/" className="hover:text-white transition-colors">
              {t("breadcrumbHome")}
            </Link>
            <ChevronRight size={16} />
            <Link
              href="/servicios"
              className="hover:text-white transition-colors"
            >
              {t("breadcrumbServicios")}
            </Link>
            <ChevronRight size={16} />
            <span className="text-white">{t("breadcrumbTitle")}</span>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="max-w-3xl"
          >
            <span className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full text-white/90 text-sm font-medium mb-6 border border-white/20">
              <Briefcase size={16} />
              {t("badge")}
            </span>

            <h1 className="text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold mb-6 leading-tight">
              {t("title")}
            </h1>
            <p className="text-lg md:text-xl text-white/90 mb-8 leading-relaxed max-w-xl">
              {t("description")}
            </p>

            <div className="flex flex-wrap gap-4">
              <Link
                href="/servicios/cotizacion"
                className="inline-flex items-center gap-2 px-6 py-3 bg-white text-[#00269b] hover:bg-white/90 font-semibold rounded-xl transition-all shadow-lg hover:shadow-xl"
              >
                {t("requestQuote")}
                <ArrowRight size={20} />
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ================================================================ */}
      {/* 2. PROJECTS CAROUSEL SECTION */}
      {/* ================================================================ */}
      <section className="py-16 lg:py-24 bg-white">
        <div className="container-eminsa">
          {/* Section Header */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center max-w-3xl mx-auto mb-16"
          >
            <span className="inline-block px-3 py-1 bg-[#00269b]/10 text-[#00269b] text-sm font-medium rounded-full mb-4">
              {t("successCases")}
            </span>
            <h2 className="text-3xl md:text-4xl xl:text-5xl font-bold text-[#00269b] mb-4">
              {t("featuredProjects")}
            </h2>
            <p className="text-[#6d6e6d] text-lg">
              {t("featuredDescription")}
            </p>
          </motion.div>

          {/* Carousel */}
          <div className="relative">
            {/* Navigation Arrows */}
            <button
              onClick={() => scrollCarousel("left")}
              className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 z-10 w-12 h-12 bg-white rounded-full shadow-lg hover:shadow-xl flex items-center justify-center text-[#00269b] hover:text-[#00269b] transition-all duration-300 hover:scale-110 hidden md:flex"
              aria-label={t("previous")}
            >
              <ChevronLeft size={24} />
            </button>
            <button
              onClick={() => scrollCarousel("right")}
              className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 z-10 w-12 h-12 bg-white rounded-full shadow-lg hover:shadow-xl flex items-center justify-center text-[#00269b] hover:text-[#00269b] transition-all duration-300 hover:scale-110 hidden md:flex"
              aria-label={t("next")}
            >
              <ChevronRight size={24} />
            </button>

            {/* Carousel Container */}
            <div
              ref={carouselRef}
              onScroll={handleCarouselScroll}
              className="flex gap-6 overflow-x-auto scroll-smooth snap-x snap-mandatory pb-4"
              style={{
                scrollbarWidth: "none",
                msOverflowStyle: "none",
              }}
            >
              <style jsx>{`
                div::-webkit-scrollbar {
                  display: none;
                }
              `}</style>

              {proyectosDestacados.map((project, index) => (
                <motion.div
                  key={project.id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="snap-start min-w-[320px] md:min-w-[400px] lg:min-w-[420px] flex-shrink-0 cursor-pointer group"
                  onClick={() => setSelectedProject(project)}
                >
                  <div className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 border border-gray-100 h-full">
                    {/* Top gradient stripe */}
                    <div className="h-2 bg-gradient-to-r from-[#00269b] to-[#00175d]" />

                    {/* Image placeholder area */}
                    <div className="h-48 bg-gradient-to-br from-[#00269b]/5 to-[#00269b]/10 flex items-center justify-center relative">
                      <Settings className="w-16 h-16 text-[#00269b]/20" />
                      <div className="absolute top-3 right-3">
                        <span className="px-3 py-1 bg-[#00269b] text-white text-xs font-bold rounded-full">
                          {project.tipoServicio}
                        </span>
                      </div>
                      {/* Decorative circles */}
                      <div className="absolute bottom-3 left-3 w-20 h-20 bg-[#00269b]/5 rounded-full" />
                      <div className="absolute top-6 left-6 w-8 h-8 bg-[#00269b]/5 rounded-full" />
                    </div>

                    {/* Content */}
                    <div className="p-6">
                      <h3 className="text-lg font-bold text-[#00269b] mb-2 group-hover:text-[#00269b] transition-colors line-clamp-2">
                        {project.titulo}
                      </h3>
                      <div className="flex items-center gap-2 text-sm text-[#6d6e6d] mb-2">
                        <Building2 size={14} className="flex-shrink-0" />
                        <span>{project.cliente}</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm text-[#6d6e6d] mb-3">
                        <Calendar size={14} className="flex-shrink-0" />
                        <span>
                          {formatDate(project.fechaInicio)} -{" "}
                          {formatDate(project.fechaFin)}
                        </span>
                      </div>
                      <p className="text-sm text-[#6d6e6d] line-clamp-2 mb-4">
                        {project.descripcion}
                      </p>

                      {/* View more hint */}
                      <div className="flex items-center gap-2 text-[#00269b] text-sm font-medium opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        {t("viewDetails")}
                        <ArrowRight
                          size={14}
                          className="group-hover:translate-x-1 transition-transform"
                        />
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Dot Indicators */}
            <div className="flex justify-center gap-2 mt-8">
              {proyectosDestacados.map((_, index) => (
                <button
                  key={index}
                  onClick={() => scrollToIndex(index)}
                  className={`transition-all duration-300 rounded-full ${
                    activeIndex === index
                      ? "w-8 h-3 bg-[#00269b]"
                      : "w-3 h-3 bg-gray-300 hover:bg-[#00269b]/50"
                  }`}
                  aria-label={`${t("goToProject")} ${index + 1}`}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ================================================================ */}
      {/* 3. PROJECT DETAIL DIALOG / MODAL */}
      {/* ================================================================ */}
      <AnimatePresence>
        {selectedProject && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={() => setSelectedProject(null)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-white rounded-3xl max-w-3xl w-full max-h-[90vh] overflow-y-auto shadow-2xl relative"
            >
              {/* Close button */}
              <button
                onClick={() => setSelectedProject(null)}
                className="absolute top-4 right-4 w-10 h-10 rounded-full bg-white/90 hover:bg-white shadow-lg flex items-center justify-center z-10 text-[#00269b] hover:text-[#00269b] transition-all hover:scale-110"
                aria-label={t("close")}
              >
                <X size={24} />
              </button>

              {/* Header gradient */}
              <div className="bg-gradient-to-r from-[#00269b] to-[#00175d] p-8 text-white relative overflow-hidden">
                {/* Decorative elements */}
                <div className="absolute top-0 right-0 w-48 h-48 bg-white/5 rounded-full -translate-y-1/2 translate-x-1/2" />
                <div className="absolute bottom-0 left-0 w-32 h-32 bg-white/5 rounded-full translate-y-1/2 -translate-x-1/2" />

                <div className="relative z-10">
                  <span className="inline-block px-3 py-1 bg-white/20 rounded-full text-sm font-medium mb-4">
                    {selectedProject.tipoServicio}
                  </span>
                  <h2 className="text-2xl md:text-3xl font-bold leading-tight">
                    {selectedProject.titulo}
                  </h2>
                </div>
              </div>

              {/* Details content */}
              <div className="p-8">
                {/* Details grid */}
                <div className="grid md:grid-cols-2 gap-6 mb-8">
                  <div className="space-y-4">
                    <div>
                      <label className="text-xs font-bold text-[#00269b] uppercase tracking-wider">
                        {t("client")}
                      </label>
                      <p className="text-[#6d6e6d] flex items-center gap-2 mt-1">
                        <Building2
                          size={16}
                          className="text-[#00269b] flex-shrink-0"
                        />
                        {selectedProject.cliente}
                      </p>
                    </div>
                    <div>
                      <label className="text-xs font-bold text-[#00269b] uppercase tracking-wider">
                        {t("location")}
                      </label>
                      <p className="text-[#6d6e6d] flex items-center gap-2 mt-1">
                        <MapPin
                          size={16}
                          className="text-[#00269b] flex-shrink-0"
                        />
                        {selectedProject.ubicacion}
                      </p>
                    </div>
                    <div>
                      <label className="text-xs font-bold text-[#00269b] uppercase tracking-wider">
                        {t("productType")}
                      </label>
                      <p className="text-[#6d6e6d] flex items-center gap-2 mt-1">
                        <Wrench
                          size={16}
                          className="text-[#00269b] flex-shrink-0"
                        />
                        {selectedProject.tipoProducto}
                      </p>
                    </div>
                  </div>
                  <div className="space-y-4">
                    <div>
                      <label className="text-xs font-bold text-[#00269b] uppercase tracking-wider">
                        {t("period")}
                      </label>
                      <p className="text-[#6d6e6d] flex items-center gap-2 mt-1">
                        <Calendar
                          size={16}
                          className="text-[#00269b] flex-shrink-0"
                        />
                        {formatDate(selectedProject.fechaInicio)} -{" "}
                        {formatDate(selectedProject.fechaFin)}
                      </p>
                    </div>
                    {selectedProject.capacidad && (
                      <div>
                        <label className="text-xs font-bold text-[#00269b] uppercase tracking-wider">
                          {t("capacity")}
                        </label>
                        <p className="text-[#6d6e6d] flex items-center gap-2 mt-1">
                          <Settings
                            size={16}
                            className="text-[#00269b] flex-shrink-0"
                          />
                          {selectedProject.capacidad}
                        </p>
                      </div>
                    )}
                  </div>
                </div>

                {/* Description */}
                <div className="mb-8">
                  <h3 className="text-lg font-bold text-[#00269b] mb-3">
                    {t("projectDescription")}
                  </h3>
                  <p className="text-[#6d6e6d] leading-relaxed">
                    {selectedProject.detalles}
                  </p>
                </div>

                {/* Results */}
                <div>
                  <h3 className="text-lg font-bold text-[#00269b] mb-4">
                    {t("resultsObtained")}
                  </h3>
                  <div className="grid sm:grid-cols-2 gap-3">
                    {selectedProject.resultados.map((resultado, i) => (
                      <motion.div
                        key={i}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: i * 0.1 }}
                        className="flex items-start gap-3 bg-[#00269b]/5 rounded-xl p-4"
                      >
                        <CheckCircle2
                          size={18}
                          className="text-[#00269b] flex-shrink-0 mt-0.5"
                        />
                        <span className="text-sm text-[#6d6e6d]">
                          {resultado}
                        </span>
                      </motion.div>
                    ))}
                  </div>
                </div>

                {/* CTA */}
                <div className="mt-8 pt-6 border-t border-gray-100 flex flex-wrap gap-4">
                  <Link
                    href="/servicios/cotizacion"
                    className="inline-flex items-center gap-2 px-6 py-3 bg-[#00269b] text-white font-semibold rounded-xl hover:bg-[#00175d] transition-all shadow-md hover:shadow-lg"
                  >
                    {t("requestSimilar")}
                    <ArrowRight size={18} />
                  </Link>
                  <button
                    onClick={() => setSelectedProject(null)}
                    className="inline-flex items-center gap-2 px-6 py-3 bg-gray-100 text-[#6d6e6d] font-semibold rounded-xl hover:bg-gray-200 transition-all"
                  >
                    {t("close")}
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ================================================================ */}
      {/* 4. ALL PROJECTS GRID SECTION */}
      {/* ================================================================ */}
      <section className="py-16 lg:py-24 bg-gray-50">
        <div className="container-eminsa">
          {/* Section Header */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center max-w-3xl mx-auto mb-16"
          >
            <span className="inline-block px-3 py-1 bg-[#00269b]/10 text-[#00269b] text-sm font-medium rounded-full mb-4">
              {t("fullPortfolio")}
            </span>
            <h2 className="text-3xl md:text-4xl xl:text-5xl font-bold text-[#00269b] mb-4">
              {t("allProjects")}
            </h2>
            <p className="text-[#6d6e6d] text-lg">
              {t("allProjectsDescription")}
            </p>
          </motion.div>

          {/* Projects Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {proyectosServicios.map((project, index) => (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.08 }}
                className="cursor-pointer group"
                onClick={() => setSelectedProject(project)}
              >
                <div className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border border-gray-100 h-full">
                  {/* Top gradient stripe */}
                  <div className="h-1.5 bg-gradient-to-r from-[#6d6e6d] via-[#575857] to-[#414241]" />

                  <div className="p-6">
                    {/* Service Badge + Date */}
                    <div className="flex items-center justify-between mb-4">
                      <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-[#00269b]/10 text-[#00269b] text-xs font-medium rounded-full">
                        <Settings size={12} />
                        {project.tipoServicio}
                      </span>
                      {project.destacado && (
                        <span className="px-2 py-0.5 bg-[#00269b]/10 text-[#00269b] text-xs font-bold rounded-full">
                          {t("featured")}
                        </span>
                      )}
                    </div>

                    {/* Title */}
                    <h3 className="text-lg font-bold text-[#00269b] mb-2 group-hover:text-[#00269b] transition-colors line-clamp-2">
                      {project.titulo}
                    </h3>

                    {/* Client & Location */}
                    <div className="flex items-center gap-2 text-sm text-[#6d6e6d] mb-1.5">
                      <Building2 size={14} className="flex-shrink-0" />
                      <span>{project.cliente}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-[#6d6e6d] mb-1.5">
                      <MapPin size={14} className="flex-shrink-0" />
                      <span>{project.ubicacion}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-[#6d6e6d] mb-3">
                      <Calendar size={14} className="flex-shrink-0" />
                      <span>
                        {formatDate(project.fechaInicio)} -{" "}
                        {formatDate(project.fechaFin)}
                      </span>
                    </div>

                    {/* Description */}
                    <p className="text-sm text-[#6d6e6d] line-clamp-2 mb-4">
                      {project.descripcion}
                    </p>

                    {/* Results preview */}
                    <div className="space-y-1.5 mb-4">
                      {project.resultados.slice(0, 2).map((resultado, i) => (
                        <div
                          key={i}
                          className="flex items-center gap-2 text-xs text-[#6d6e6d]"
                        >
                          <CheckCircle2
                            size={12}
                            className="text-[#00269b] flex-shrink-0"
                          />
                          {resultado}
                        </div>
                      ))}
                    </div>

                    {/* View more hint */}
                    <div className="flex items-center gap-2 text-[#00269b] text-sm font-medium opacity-0 group-hover:opacity-100 transition-opacity duration-300 pt-2 border-t border-gray-100">
                      {t("viewFullProject")}
                      <ArrowRight
                        size={14}
                        className="group-hover:translate-x-1 transition-transform"
                      />
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ================================================================ */}
      {/* 5. CTA SECTION */}
      {/* ================================================================ */}
      <section className="py-16 lg:py-24 bg-white">
        <div className="container-eminsa">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="relative bg-gradient-to-br from-[#00269b] via-[#00175d] to-[#00269b] rounded-3xl p-8 md:p-12 lg:p-16 text-white text-center overflow-hidden"
          >
            {/* Decorative elements */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-[#00269b]/10 rounded-full -translate-y-1/2 translate-x-1/2" />
            <div className="absolute bottom-0 left-0 w-48 h-48 bg-[#00269b]/10 rounded-full translate-y-1/2 -translate-x-1/2" />
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#00269b]/5 rounded-full blur-[100px]" />

            <div className="relative z-10 max-w-2xl mx-auto">
              <Settings size={48} className="mx-auto mb-6 text-[#00269b]" />
              <h2 className="text-3xl md:text-4xl xl:text-5xl font-bold mb-4">
                {t("haveProject")}
              </h2>
              <p className="text-white/80 text-lg mb-8 leading-relaxed">
                {t("haveProjectDesc")}
              </p>

              <div className="flex flex-col sm:flex-row justify-center gap-4">
                <Link
                  href="/servicios/cotizacion"
                  className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-[#00269b] text-white hover:bg-[#00175d] font-bold rounded-xl transition-all shadow-lg hover:shadow-xl text-lg"
                >
                  {t("requestQuote")}
                  <ArrowRight size={22} />
                </Link>
                <Link
                  href="/servicios"
                  className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-white/10 hover:bg-white/20 backdrop-blur-sm border border-white/30 text-white font-bold rounded-xl transition-all text-lg"
                >
                  {t("viewOurServices")}
                </Link>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
