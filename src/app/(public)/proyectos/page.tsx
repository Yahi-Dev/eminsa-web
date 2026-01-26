"use client";

import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { ChevronRight, MapPin, Building, ArrowRight, Star, Calendar } from "lucide-react";
import { useContent } from "@/context/content-context";
import { divisions } from "@/config/navigation";

export default function ProyectosPage() {
  const { proyectos } = useContent();
  const [filterDivision, setFilterDivision] = useState("");

  const proyectosPublicados = proyectos
    .filter(p => p.publicado)
    .filter(p => !filterDivision || p.division === filterDivision);

  const proyectosDestacados = proyectosPublicados.filter(p => p.destacado);

  const getDivisionColor = (division: string) => {
    return divisions.find(d => d.id === division)?.color || "#001689";
  };

  const getDivisionName = (division: string) => {
    return divisions.find(d => d.id === division)?.name || division.toUpperCase();
  };

  return (
    <>
      {/* Hero */}
      <section className="relative py-20 bg-gradient-to-br from-[#00A3E0] to-[#0077A8]">
        <div className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: `linear-gradient(to right, white 1px, transparent 1px), linear-gradient(to bottom, white 1px, transparent 1px)`,
            backgroundSize: "60px 60px",
          }}
        />
        <div className="container-eminsa relative">
          <div className="flex items-center gap-2 text-white/60 text-sm mb-8">
            <Link href="/" className="hover:text-white transition-colors">Inicio</Link>
            <ChevronRight size={16} />
            <span className="text-white">Proyectos</span>
          </div>

          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} className="max-w-2xl">
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">Proyectos</h1>
            <p className="text-xl text-white/80">
              Conozca algunos de los proyectos más destacados que hemos realizado 
              para nuestros clientes en República Dominicana y el Caribe.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Content */}
      <section className="py-16 bg-gray-50">
        <div className="container-eminsa">
          {/* Filters */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex flex-wrap gap-3 mb-12"
          >
            <button
              onClick={() => setFilterDivision("")}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                !filterDivision 
                  ? 'bg-[#00A3E0] text-white' 
                  : 'bg-white text-[#76777A] hover:bg-gray-100'
              }`}
            >
              Todos
            </button>
            {divisions.map((div) => (
              <button
                key={div.id}
                onClick={() => setFilterDivision(div.id)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                  filterDivision === div.id 
                    ? 'text-white' 
                    : 'bg-white text-[#76777A] hover:bg-gray-100'
                }`}
                style={filterDivision === div.id ? { backgroundColor: div.color } : {}}
              >
                {div.name}
              </button>
            ))}
          </motion.div>

          {/* Featured Projects */}
          {proyectosDestacados.length > 0 && !filterDivision && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="mb-12"
            >
              <h2 className="text-2xl font-bold text-[#001689] mb-6 flex items-center gap-2">
                <Star className="text-yellow-500" size={24} />
                Proyectos Destacados
              </h2>
              <div className="grid md:grid-cols-2 gap-6">
                {proyectosDestacados.slice(0, 2).map((proyecto) => (
                  <Link key={proyecto.id} href={`/proyectos/${proyecto.slug}`} className="group">
                    <div className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                      <div className="h-56 bg-gradient-to-br from-[#001689] to-[#000E53] relative">
                        {proyecto.imagenPrincipal && (
                          <img src={proyecto.imagenPrincipal} alt="" className="w-full h-full object-cover" />
                        )}
                        <div className="absolute top-4 left-4">
                          <span 
                            className="px-3 py-1 rounded-full text-xs font-medium text-white"
                            style={{ backgroundColor: getDivisionColor(proyecto.division) }}
                          >
                            {getDivisionName(proyecto.division)}
                          </span>
                        </div>
                        {proyecto.capacidad && (
                          <div className="absolute bottom-4 right-4 px-3 py-1 bg-white/90 backdrop-blur-sm rounded-lg text-[#001689] font-bold text-sm">
                            {proyecto.capacidad}
                          </div>
                        )}
                      </div>
                      <div className="p-6">
                        <h3 className="text-xl font-bold text-[#001689] mb-2 group-hover:text-[#00A3E0] transition-colors">
                          {proyecto.titulo}
                        </h3>
                        <p className="text-[#76777A] text-sm mb-4 line-clamp-2">
                          {proyecto.descripcion}
                        </p>
                        <div className="flex items-center justify-between text-xs text-[#76777A]">
                          <div className="flex items-center gap-4">
                            <span className="flex items-center gap-1">
                              <Building size={14} />
                              {proyecto.cliente}
                            </span>
                            <span className="flex items-center gap-1">
                              <MapPin size={14} />
                              {proyecto.ubicacion}
                            </span>
                          </div>
                          <ArrowRight size={16} className="text-[#00A3E0] group-hover:translate-x-1 transition-transform" />
                        </div>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </motion.div>
          )}

          {/* All Projects */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            {!filterDivision && proyectosDestacados.length > 0 && (
              <h2 className="text-2xl font-bold text-[#001689] mb-6">Todos los Proyectos</h2>
            )}
            
            {proyectosPublicados.length === 0 ? (
              <div className="text-center py-12">
                <p className="text-[#76777A]">No hay proyectos disponibles en este momento.</p>
              </div>
            ) : (
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {proyectosPublicados.map((proyecto, index) => (
                  <motion.div
                    key={proyecto.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 + index * 0.05 }}
                  >
                    <Link href={`/proyectos/${proyecto.slug}`} className="group block h-full">
                      <div className="h-full bg-white rounded-xl shadow-sm overflow-hidden hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
                        <div className="h-44 bg-gray-200 relative">
                          {proyecto.imagenPrincipal ? (
                            <img src={proyecto.imagenPrincipal} alt="" className="w-full h-full object-cover" />
                          ) : (
                            <div 
                              className="w-full h-full flex items-center justify-center"
                              style={{ backgroundColor: `${getDivisionColor(proyecto.division)}15` }}
                            >
                              <span style={{ color: getDivisionColor(proyecto.division) }} className="font-bold">
                                {getDivisionName(proyecto.division)}
                              </span>
                            </div>
                          )}
                          <div className="absolute top-3 left-3">
                            <span 
                              className="px-2 py-1 rounded-full text-xs font-medium text-white"
                              style={{ backgroundColor: getDivisionColor(proyecto.division) }}
                            >
                              {getDivisionName(proyecto.division)}
                            </span>
                          </div>
                          {proyecto.capacidad && (
                            <div className="absolute bottom-3 right-3 px-2 py-1 bg-white/90 backdrop-blur-sm rounded text-[#001689] font-bold text-xs">
                              {proyecto.capacidad}
                            </div>
                          )}
                        </div>
                        <div className="p-5">
                          <span className="text-xs text-[#76777A] mb-1 block">{proyecto.tipoProyecto}</span>
                          <h3 className="font-bold text-[#001689] mb-2 group-hover:text-[#00A3E0] transition-colors line-clamp-2">
                            {proyecto.titulo}
                          </h3>
                          <p className="text-[#76777A] text-sm mb-4 line-clamp-2">
                            {proyecto.descripcion}
                          </p>
                          <div className="flex items-center gap-3 text-xs text-[#76777A]">
                            <span className="flex items-center gap-1">
                              <Building size={12} />
                              {proyecto.cliente}
                            </span>
                            <span className="flex items-center gap-1">
                              <MapPin size={12} />
                              {proyecto.ubicacion}
                            </span>
                          </div>
                        </div>
                      </div>
                    </Link>
                  </motion.div>
                ))}
              </div>
            )}
          </motion.div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-gradient-to-r from-[#001689] to-[#000E53]">
        <div className="container-eminsa text-center">
          <h2 className="text-3xl font-bold text-white mb-4">
            ¿Tiene un proyecto en mente?
          </h2>
          <p className="text-white/80 mb-8 max-w-xl mx-auto">
            Contáctenos para discutir cómo podemos ayudarle con su próximo proyecto 
            de transformadores o sistemas eléctricos.
          </p>
          <Link href="/cotizar" className="btn-accent inline-flex items-center gap-2">
            Solicitar Cotización
            <ArrowRight size={18} />
          </Link>
        </div>
      </section>
    </>
  );
}
