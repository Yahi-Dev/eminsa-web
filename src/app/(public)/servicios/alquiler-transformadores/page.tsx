"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { 
  ArrowRight, 
  ChevronRight, 
  Clock,
  Shield, 
  Wrench, 
  CheckCircle, 
  Zap,
  Building2,
  Factory,
  ShoppingBag,
  Hotel,
  Truck,
  Calendar,
  Phone,
  MessageCircle,
  FileText
} from "lucide-react";
import { contactInfo } from "@/config/navigation";

// Datos de transformadores disponibles para alquiler
const transformadoresDisponibles = [
  {
    id: "tipo-poste",
    nombre: "Transformadores Tipo Poste",
    descripcion: "Monofásicos, 60 Hz, ideales para servicios residenciales y cargas livianas comerciales/industriales",
    icon: Zap,
    imagen: "https://eminsa.com/wp-content/uploads/2022/05/4.jpg?x54751", // Ruta a la imagen
    potencias: ["15 KVA", "25 KVA", "37.5 KVA", "50 KVA", "75 KVA", "100 KVA", "167 KVA", "250 KVA", "333 KVA", "500 KVA"],
    caracteristicas: [
      "Norma ANSI C 57-12-00",
      "Esquemas de protección: SP, CP, CSP",
      "Instalación rápida",
      "Bajo mantenimiento"
    ],
    aplicaciones: ["Residencial", "Comercial ligero", "Industrial ligero"],
    color: "#001689"
  },
  {
    id: "pad-mounted",
    nombre: "Transformadores Pad Mounted",
    descripcion: "Trifásicos y Monofásicos para sistemas de distribución subterráneos",
    icon: Building2,
    imagen: "https://eminsa.com/wp-content/uploads/2022/05/4.jpg?x54751", // Ruta a la imagen
    potencias: [
      "Monofásicos: 15-100 KVA",
      "Trifásicos: 30-3000 KVA"
    ],
    caracteristicas: [
      "Tensiones: 5 kV hasta 34.5 kV",
      "Tipo RADIAL o MALLA",
      "Normas ANSI C57-12-26/25/28",
      "Operación bajo carga"
    ],
    aplicaciones: ["Distribución subterránea", "Centros comerciales", "Urbanizaciones"],
    color: "#00A3E0"
  },
  {
    id: "tipo-seco",
    nombre: "Transformadores Tipo Seco",
    descripcion: "Sin aceite dieléctrico, ideales para instalaciones en interiores con riesgo de incendio minimizado",
    icon: Shield,
    imagen: "https://eminsa.com/wp-content/uploads/2022/05/4.jpg?x54751", // Ruta a la imagen
    potencias: [
      "BAJA-BAJA: 15-500 KVA",
      "ALTA-BAJA: 75-1000 KVA"
    ],
    caracteristicas: [
      "Sin aceite dieléctrico",
      "Materiales clase 180°C",
      "Norma ANSI C57-12",
      "Ideal para interiores"
    ],
    aplicaciones: ["Centros comerciales", "Edificios", "Industrias", "Hospitales"],
    color: "#FF5500"
  },
  {
    id: "subestacion",
    nombre: "Transformadores de Subestación",
    descripcion: "Para grandes facilidades industriales, centros comerciales y subestaciones eléctricas",
    icon: Factory,
    imagen: "https://eminsa.com/wp-content/uploads/2022/05/4.jpg?x54751", // Ruta a la imagen
    potencias: [
      "Small Power: 500 KVA - 10 MVA",
      "Medium Power: 10 MVA - 60 MVA"
    ],
    caracteristicas: [
      "Tensiones: 15 kV, 34.5 kV, 69 kV, 138 kV",
      "Refrigeración ONAN",
      "Cambiador de tomas con carga",
      "Sistemas de preservación de fluidos"
    ],
    aplicaciones: ["Industrias", "Subestaciones", "Edificios corporativos", "Hospitales"],
    color: "#00B140"
  }
];

const beneficiosAlquiler = [
  {
    icon: Clock,
    titulo: "Disponibilidad Inmediata",
    descripcion: "Amplio stock de transformadores listos para entrega y instalación rápida"
  },
  {
    icon: Shield,
    titulo: "Equipos Certificados",
    descripcion: "Todos nuestros transformadores cumplen con normas ANSI e ISO 9001:2015"
  },
  {
    icon: Wrench,
    titulo: "Mantenimiento Incluido",
    descripcion: "Servicio técnico y mantenimiento preventivo sin costos adicionales"
  },
  {
    icon: CheckCircle,
    titulo: "Flexibilidad de Contratos",
    descripcion: "Períodos de alquiler adaptados a sus necesidades: corto, mediano o largo plazo"
  },
  {
    icon: Truck,
    titulo: "Transporte e Instalación",
    descripcion: "Nos encargamos del transporte, instalación y puesta en marcha"
  },
  {
    icon: Phone,
    titulo: "Soporte 24/7",
    descripcion: "Atención a emergencias las 24 horas, los 7 días de la semana"
  }
];

const casosDeUso = [
  {
    icon: Building2,
    titulo: "Proyectos de Construcción",
    descripcion: "Suministro temporal de energía durante la construcción de edificios, centros comerciales y desarrollos inmobiliarios",
    ejemplos: ["Torres residenciales", "Centros comerciales", "Complejos hoteleros"]
  },
  {
    icon: Factory,
    titulo: "Expansión Industrial",
    descripcion: "Soluciones temporales mientras se completa la infraestructura eléctrica permanente",
    ejemplos: ["Plantas industriales", "Zonas francas", "Ampliaciones de capacidad"]
  },
  {
    icon: Wrench,
    titulo: "Mantenimiento y Emergencias",
    descripcion: "Reemplazo temporal durante reparaciones o fallas de equipos existentes",
    ejemplos: ["Fallas inesperadas", "Mantenimiento programado", "Contingencias"]
  },
  {
    icon: Hotel,
    titulo: "Eventos y Proyectos Temporales",
    descripcion: "Suministro de energía para eventos especiales, festivales o instalaciones temporales",
    ejemplos: ["Eventos corporativos", "Ferias comerciales", "Proyectos especiales"]
  }
];

export default function AlquilerTransformadoresPage() {
  return (
    <>
      {/* Hero Section */}
      <section className="relative min-h-[60vh] flex items-center overflow-hidden">
        {/* Background */}
        <div className="absolute inset-0 bg-gradient-to-br from-[#FF5500] via-[#E04D00] to-[#CC4400]">
          <div className="absolute inset-0 opacity-20">
            <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-white/20 rounded-full blur-[100px]" />
            <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-white/10 rounded-full blur-[100px]" />
          </div>
          <div 
            className="absolute inset-0 opacity-[0.03]"
            style={{
              backgroundImage: `
                linear-gradient(to right, white 1px, transparent 1px),
                linear-gradient(to bottom, white 1px, transparent 1px)
              `,
              backgroundSize: "60px 60px",
            }}
          />
        </div>

        <div className="container-eminsa relative py-20">
          {/* Breadcrumb */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex items-center gap-2 text-white/60 text-sm mb-8"
          >
            <Link href="/" className="hover:text-white transition-colors">Inicio</Link>
            <ChevronRight size={16} />
            <Link href="/servicios" className="hover:text-white transition-colors">Servicios</Link>
            <ChevronRight size={16} />
            <span className="text-white">Alquiler de Transformadores</span>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="max-w-3xl"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full text-white/90 text-sm mb-6">
              <Zap size={16} />
              <span>Soluciones Temporales</span>
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6">
              Alquiler de Transformadores
            </h1>
            <p className="text-xl text-white/80 mb-8">
              Soluciones flexibles de energía eléctrica para proyectos temporales, 
              emergencias y mantenimiento. Más de 50 años de experiencia garantizando 
              la continuidad operativa de su proyecto.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link 
                href="#cotizar" 
                className="inline-flex items-center gap-2 px-6 py-3 bg-white text-[#FF5500] font-semibold rounded-lg hover:bg-gray-100 transition-all hover:shadow-lg"
              >
                Solicitar Cotización
                <ArrowRight size={18} />
              </Link>
              <a 
                href={`https://wa.me/${contactInfo.whatsapp}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3 bg-[#25D366] text-white font-semibold rounded-lg hover:bg-[#20BD5A] transition-all"
              >
                <MessageCircle size={18} />
                Consulta por WhatsApp
              </a>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Beneficios del Alquiler */}
      <section className="py-20 bg-white">
        <div className="container-eminsa">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center max-w-3xl mx-auto mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-[#001689] mb-4">
              ¿Por qué Alquilar con EMINSA?
            </h2>
            <p className="text-[#76777A] text-lg">
              Beneficios y ventajas de nuestro servicio de alquiler de transformadores
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {beneficiosAlquiler.map((beneficio, index) => {
              const IconComponent = beneficio.icon;
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="p-6 bg-gray-50 rounded-2xl hover:shadow-lg transition-all duration-300 hover:-translate-y-1"
                >
                  <div className="w-14 h-14 bg-gradient-to-br from-[#FF5500]/10 to-[#FF5500]/5 rounded-xl flex items-center justify-center mb-4">
                    <IconComponent className="w-7 h-7 text-[#FF5500]" />
                  </div>
                  <h3 className="text-xl font-bold text-[#001689] mb-2">
                    {beneficio.titulo}
                  </h3>
                  <p className="text-[#76777A]">
                    {beneficio.descripcion}
                  </p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Catálogo de Transformadores */}
      <section className="py-20 bg-gray-50">
        <div className="container-eminsa">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center max-w-3xl mx-auto mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-[#001689] mb-4">
              Transformadores Disponibles
            </h2>
            <p className="text-[#76777A] text-lg">
              Amplio inventario de transformadores para satisfacer sus necesidades
            </p>
          </motion.div>

          <div className="space-y-12">
            {transformadoresDisponibles.map((transformador, index) => {
              const IconComponent = transformador.icon;
              const isEven = index % 2 === 0;
              
              return (
                <motion.div
                  key={transformador.id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-white rounded-3xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300"
                >
                  <div className={`grid lg:grid-cols-2 gap-0 ${!isEven ? 'lg:grid-flow-dense' : ''}`}>
                    {/* Imagen */}
                    <div 
                      className={`relative h-[400px] lg:h-auto overflow-hidden ${!isEven ? 'lg:col-start-2' : ''}`}
                      style={{ 
                        background: `linear-gradient(135deg, ${transformador.color}15 0%, ${transformador.color}05 100%)` 
                      }}
                    >
                      {/* Badge de disponibilidad */}
                      <div className="absolute top-6 left-6 z-10">
                        <span className="px-4 py-2 bg-white/95 backdrop-blur-sm rounded-full text-xs font-semibold flex items-center gap-2 shadow-lg">
                          <div className="w-2 h-2 bg-[#00B140] rounded-full animate-pulse"></div>
                          Disponible para Alquiler
                        </span>
                      </div>

                      {/* Icono decorativo */}
                      <div 
                        className="absolute top-6 right-6 w-16 h-16 rounded-2xl flex items-center justify-center text-white shadow-lg"
                        style={{ backgroundColor: transformador.color }}
                      >
                        <IconComponent className="w-8 h-8" />
                      </div>

                      {/* Aquí iría la imagen real */}
                      <div className="w-full h-full flex items-center justify-center p-12">
                        {transformador.imagen ? (
                          <img 
                            src={transformador.imagen} 
                            alt={transformador.nombre}
                            className="w-full h-full object-contain"
                          />
                        ) : (
                          // Placeholder si no hay imagen
                          <div 
                            className="w-full h-full rounded-2xl flex items-center justify-center text-white/20 font-bold text-2xl"
                            style={{ backgroundColor: `${transformador.color}20` }}
                          >
                            <div className="text-center">
                              <IconComponent className="w-32 h-32 mx-auto mb-4 opacity-30" style={{ color: transformador.color }} />
                              <span className="text-sm" style={{ color: transformador.color }}>Imagen del transformador</span>
                            </div>
                          </div>
                        )}
                      </div>

                      {/* Gradiente decorativo */}
                      <div 
                        className="absolute inset-0 opacity-10"
                        style={{
                          background: `linear-gradient(45deg, ${transformador.color} 0%, transparent 50%)`
                        }}
                      />
                    </div>

                    {/* Contenido */}
                    <div className="p-8 lg:p-12 flex flex-col justify-center">
                      {/* Header */}
                      <div className="mb-6">
                        <div className="flex items-center gap-3 mb-3">
                          <div 
                            className="w-1 h-8 rounded-full"
                            style={{ backgroundColor: transformador.color }}
                          />
                          <h3 className="text-2xl lg:text-3xl font-bold text-[#001689]">
                            {transformador.nombre}
                          </h3>
                        </div>
                        <p className="text-[#76777A] text-sm lg:text-base leading-relaxed">
                          {transformador.descripcion}
                        </p>
                      </div>

                      {/* Potencias */}
                      <div className="mb-6">
                        <h4 className="text-xs font-bold text-[#001689] uppercase tracking-wide mb-3 flex items-center gap-2">
                          <Zap size={14} style={{ color: transformador.color }} />
                          Potencias Disponibles
                        </h4>
                        <div className="flex flex-wrap gap-2">
                          {transformador.potencias.map((potencia, i) => (
                            <span 
                              key={i} 
                              className="px-3 py-1.5 rounded-lg text-xs font-medium border-2"
                              style={{ 
                                borderColor: `${transformador.color}30`,
                                color: transformador.color,
                                backgroundColor: `${transformador.color}08`
                              }}
                            >
                              {potencia}
                            </span>
                          ))}
                        </div>
                      </div>

                      {/* Características */}
                      <div className="mb-6">
                        <h4 className="text-xs font-bold text-[#001689] uppercase tracking-wide mb-3 flex items-center gap-2">
                          <CheckCircle size={14} style={{ color: transformador.color }} />
                          Características Técnicas
                        </h4>
                        <div className="grid grid-cols-1 gap-2">
                          {transformador.caracteristicas.map((caracteristica, i) => (
                            <div key={i} className="flex items-start gap-2 text-sm text-[#76777A]">
                              <div 
                                className="w-1.5 h-1.5 rounded-full mt-1.5 flex-shrink-0"
                                style={{ backgroundColor: transformador.color }}
                              />
                              {caracteristica}
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Aplicaciones */}
                      <div className="mb-8">
                        <h4 className="text-xs font-bold text-[#001689] uppercase tracking-wide mb-3 flex items-center gap-2">
                          <Building2 size={14} style={{ color: transformador.color }} />
                          Aplicaciones
                        </h4>
                        <div className="flex flex-wrap gap-2">
                          {transformador.aplicaciones.map((aplicacion, i) => (
                            <span 
                              key={i} 
                              className="px-3 py-1 text-xs font-medium rounded-full"
                              style={{ 
                                backgroundColor: `${transformador.color}15`, 
                                color: transformador.color 
                              }}
                            >
                              {aplicacion}
                            </span>
                          ))}
                        </div>
                      </div>

                      {/* CTA Button */}
                      <div>
                        <Link 
                          href="#cotizar"
                          className="inline-flex items-center gap-2 px-6 py-3 rounded-xl font-semibold transition-all group shadow-md hover:shadow-lg text-white"
                          style={{ backgroundColor: transformador.color }}
                        >
                          Solicitar Cotización
                          <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                        </Link>
                      </div>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Casos de Uso */}
      <section className="py-20 bg-gray-50">
        <div className="container-eminsa">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center max-w-3xl mx-auto mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-[#001689] mb-4">
              Casos de Uso
            </h2>
            <p className="text-[#76777A] text-lg">
              Soluciones de alquiler para diferentes sectores y necesidades
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-8">
            {casosDeUso.map((caso, index) => {
              const IconComponent = caso.icon;
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-white p-8 rounded-2xl shadow-sm hover:shadow-lg transition-all duration-300"
                >
                  <div className="flex items-start gap-4 mb-4">
                    <div className="w-12 h-12 bg-[#FF5500]/10 rounded-xl flex items-center justify-center flex-shrink-0">
                      <IconComponent className="w-6 h-6 text-[#FF5500]" />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-[#001689] mb-2">{caso.titulo}</h3>
                      <p className="text-[#76777A] text-sm mb-4">{caso.descripcion}</p>
                    </div>
                  </div>
                  <div className="pl-16">
                    <h4 className="text-xs font-semibold text-[#001689] mb-2">Ejemplos:</h4>
                    <div className="flex flex-wrap gap-2">
                      {caso.ejemplos.map((ejemplo, i) => (
                        <span key={i} className="px-3 py-1 bg-gray-100 text-[#76777A] rounded-full text-xs">
                          {ejemplo}
                        </span>
                      ))}
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

    </>
  );
}