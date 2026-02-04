"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import {
  ArrowRight,
  ChevronRight,
  Home,
  Phone,
  MessageCircle,
  CheckCircle2,
  Clock,
  Zap,
  Shield,
  Wrench,
  Truck,
  Calendar,
  AlertCircle,
} from "lucide-react";
import { rentalInfo } from "@/config/etrys-data";
import { contactInfo } from "@/config/navigation";

export default function AlquilerPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero */}
      <section className="bg-gradient-to-br from-[#00A3E0] via-[#0077A8] to-[#001689] text-white py-16 lg:py-24">
        <div className="container-eminsa">
          {/* Breadcrumb */}
          <nav className="flex items-center gap-2 text-white/70 text-sm mb-6">
            <Link href="/" className="hover:text-white transition-colors">
              <Home size={16} />
            </Link>
            <ChevronRight size={14} />
            <Link href="/etrys" className="hover:text-white transition-colors">
              ETRYS
            </Link>
            <ChevronRight size={14} />
            <span className="text-white">Alquiler</span>
          </nav>

          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
            >
              <span className="inline-block px-4 py-2 bg-amber-500/20 backdrop-blur-sm text-amber-200 rounded-full text-sm font-medium mb-4">
                Solución Temporal
              </span>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4">
                ¿Necesita Energía Temporalmente?
              </h1>
              <p className="text-xl text-white/90 mb-8">
                {rentalInfo.description}
              </p>
              <div className="flex flex-wrap gap-4">
                <Link
                  href="/etrys/cotizaciones?servicio=alquiler"
                  className="inline-flex items-center gap-2 px-6 py-3 bg-[#FF5500] hover:bg-[#E64D00] text-white font-semibold rounded-xl transition-colors"
                >
                  Solicitar Presupuesto
                  <ArrowRight size={20} />
                </Link>
                <a
                  href={`tel:${rentalInfo.phone}`}
                  className="inline-flex items-center gap-2 px-6 py-3 bg-white/10 hover:bg-white/20 backdrop-blur-sm border border-white/30 text-white font-semibold rounded-xl transition-colors"
                >
                  <Phone size={20} />
                  {rentalInfo.phone}
                </a>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
            >
              <div className="aspect-square bg-white/10 backdrop-blur-sm rounded-2xl overflow-hidden border border-white/20 relative">
                <Image
                  src="/images/etrys-alquiler.jpg"
                  alt="Alquiler de Transformadores ETRYS"
                  fill
                  className="object-cover"
                  priority
                />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section className="py-16 lg:py-24 bg-white">
        <div className="container-eminsa">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center max-w-3xl mx-auto mb-12"
          >
            <span className="inline-block px-3 py-1 bg-[#00A3E0]/10 text-[#00A3E0] text-sm font-medium rounded-full mb-4">
              Ventajas
            </span>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              ¿Por qué Alquilar con ETRYS?
            </h2>
            <p className="text-gray-600 text-lg">
              Obtenga energía a corto plazo con equipos en óptimas condiciones y 
              soporte técnico incluido.
            </p>
          </motion.div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                icon: Zap,
                title: "Disponibilidad Inmediata",
                description: "Equipos listos para entrega y conexión cuando los necesite.",
              },
              {
                icon: Shield,
                title: "Equipos Certificados",
                description: "Transformadores en óptimas condiciones, probados y certificados.",
              },
              {
                icon: Wrench,
                title: "Soporte Técnico",
                description: "Asistencia técnica incluida durante todo el período de alquiler.",
              },
              {
                icon: Truck,
                title: "Instalación Coordinada",
                description: "Servicio de transporte, instalación y retiro coordinado.",
              },
              {
                icon: Calendar,
                title: "Flexibilidad en Plazos",
                description: "Alquiler por días, semanas o meses según sus necesidades.",
              },
              {
                icon: AlertCircle,
                title: "Solución de Emergencias",
                description: "Respuesta rápida para situaciones de emergencia energética.",
              },
            ].map((benefit, index) => {
              const Icon = benefit.icon;
              return (
                <motion.div
                  key={benefit.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-gray-50 rounded-2xl p-6 hover:shadow-lg transition-all group"
                >
                  <div className="w-14 h-14 rounded-xl bg-[#00A3E0]/10 flex items-center justify-center mb-4 group-hover:bg-[#00A3E0] transition-colors">
                    <Icon
                      size={28}
                      className="text-[#00A3E0] group-hover:text-white transition-colors"
                    />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">{benefit.title}</h3>
                  <p className="text-gray-600">{benefit.description}</p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Use Cases */}
      <section className="py-16 lg:py-24 bg-gray-50">
        <div className="container-eminsa">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <span className="inline-block px-3 py-1 bg-[#00A3E0]/10 text-[#00A3E0] text-sm font-medium rounded-full mb-4">
                Casos de Uso
              </span>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                ¿Cuándo Necesita un Transformador de Alquiler?
              </h2>
              <div className="space-y-4">
                {[
                  "Mantenimiento programado de equipos propios",
                  "Ampliación temporal de capacidad",
                  "Proyectos de construcción",
                  "Eventos especiales con alta demanda energética",
                  "Emergencias por fallas en equipos",
                  "Pruebas y evaluaciones de carga",
                  "Reemplazo temporal durante reparaciones",
                ].map((useCase, index) => (
                  <motion.div
                    key={useCase}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.05 }}
                    className="flex items-start gap-3"
                  >
                    <CheckCircle2 size={20} className="text-[#00A3E0] shrink-0 mt-0.5" />
                    <span className="text-gray-700">{useCase}</span>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <div className="bg-white rounded-2xl p-8 shadow-xl">
                <h3 className="text-2xl font-bold text-gray-900 mb-4">
                  Equipos Disponibles para Alquiler
                </h3>
                <div className="space-y-4 mb-6">
                  <div className="bg-gray-50 rounded-xl p-4">
                    <div className="flex justify-between items-center mb-2">
                      <span className="font-semibold text-gray-900">Tipo Poste</span>
                      <span className="text-[#00A3E0] text-sm">Disponible</span>
                    </div>
                    <p className="text-sm text-gray-600">15 - 500 kVA</p>
                  </div>
                  <div className="bg-gray-50 rounded-xl p-4">
                    <div className="flex justify-between items-center mb-2">
                      <span className="font-semibold text-gray-900">Pad Mounted</span>
                      <span className="text-[#00A3E0] text-sm">Disponible</span>
                    </div>
                    <p className="text-sm text-gray-600">30 - 3,000 kVA</p>
                  </div>
                  <div className="bg-gray-50 rounded-xl p-4">
                    <div className="flex justify-between items-center mb-2">
                      <span className="font-semibold text-gray-900">Subestación</span>
                      <span className="text-amber-600 text-sm">Consultar</span>
                    </div>
                    <p className="text-sm text-gray-600">Hasta 3,000 kVA</p>
                  </div>
                </div>
                <p className="text-sm text-gray-500">
                  * La disponibilidad puede variar. Consulte con nuestro equipo para 
                  confirmar existencias.
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Process */}
      <section className="py-16 lg:py-24 bg-white">
        <div className="container-eminsa">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center max-w-3xl mx-auto mb-12"
          >
            <span className="inline-block px-3 py-1 bg-[#00A3E0]/10 text-[#00A3E0] text-sm font-medium rounded-full mb-4">
              Proceso Simple
            </span>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              ¿Cómo Funciona?
            </h2>
          </motion.div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                step: 1,
                title: "Solicite Presupuesto",
                description: "Complete el formulario o llámenos para especificar sus necesidades.",
              },
              {
                step: 2,
                title: "Reciba Cotización",
                description: "En menos de 30 minutos le enviaremos opciones disponibles.",
              },
              {
                step: 3,
                title: "Coordinamos Entrega",
                description: "Acordamos fecha, hora y lugar de instalación del equipo.",
              },
              {
                step: 4,
                title: "Energía Activa",
                description: "Su transformador estará operativo y listo para usar.",
              },
            ].map((process, index) => (
              <motion.div
                key={process.step}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="text-center"
              >
                <div className="w-16 h-16 rounded-full bg-gradient-to-br from-[#00A3E0] to-[#001689] text-white flex items-center justify-center text-2xl font-bold mx-auto mb-4">
                  {process.step}
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">{process.title}</h3>
                <p className="text-gray-600">{process.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Form */}
      <section className="py-16 lg:py-24 bg-gradient-to-br from-[#00A3E0] via-[#0077A8] to-[#001689] text-white">
        <div className="container-eminsa">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                Solicite su Presupuesto de Alquiler
              </h2>
              <p className="text-xl text-white/90 mb-6">
                Complete el formulario a continuación o llame al {rentalInfo.phone} 
                para solicitar un presupuesto personalizado.
              </p>
              <div className="flex items-center gap-3 mb-8">
                <Clock size={24} className="text-white/80" />
                <span className="text-white/80">
                  Respuesta en menos de 30 minutos durante horario laboral
                </span>
              </div>
              <div className="flex flex-wrap gap-4">
                <a
                  href={`tel:${rentalInfo.phone}`}
                  className="inline-flex items-center gap-2 px-6 py-3 bg-white text-[#00A3E0] font-semibold rounded-xl hover:bg-gray-100 transition-colors"
                >
                  <Phone size={20} />
                  {rentalInfo.phone}
                </a>
                <a
                  href={`https://wa.me/${contactInfo.whatsapp}?text=Hola, me interesa alquilar un transformador`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-6 py-3 bg-[#25D366] hover:bg-[#20BD5A] text-white font-semibold rounded-xl transition-colors"
                >
                  <MessageCircle size={20} />
                  WhatsApp
                </a>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="bg-white rounded-2xl p-8 shadow-2xl"
            >
              <h3 className="text-xl font-bold text-gray-900 mb-6">
                Solicitar Presupuesto de Alquiler
              </h3>
              <form className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Nombre Completo *
                  </label>
                  <input
                    type="text"
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#00A3E0] focus:border-transparent transition-all"
                    placeholder="Su nombre"
                  />
                </div>
                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Teléfono *
                    </label>
                    <input
                      type="tel"
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#00A3E0] focus:border-transparent transition-all"
                      placeholder="809-000-0000"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Email *
                    </label>
                    <input
                      type="email"
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#00A3E0] focus:border-transparent transition-all"
                      placeholder="correo@ejemplo.com"
                    />
                  </div>
                </div>
                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Capacidad Requerida
                    </label>
                    <select className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#00A3E0] focus:border-transparent transition-all">
                      <option value="">Seleccionar</option>
                      <option value="15-75">15 - 75 kVA</option>
                      <option value="100-300">100 - 300 kVA</option>
                      <option value="500-1000">500 - 1,000 kVA</option>
                      <option value="1500-3000">1,500 - 3,000 kVA</option>
                      <option value="otro">Otro</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Duración Estimada
                    </label>
                    <select className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#00A3E0] focus:border-transparent transition-all">
                      <option value="">Seleccionar</option>
                      <option value="dias">Días</option>
                      <option value="semanas">Semanas</option>
                      <option value="meses">Meses</option>
                      <option value="indefinido">Por determinar</option>
                    </select>
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Detalles Adicionales
                  </label>
                  <textarea
                    rows={3}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#00A3E0] focus:border-transparent transition-all resize-none"
                    placeholder="Describa su proyecto o necesidad..."
                  />
                </div>
                <button
                  type="submit"
                  className="w-full px-6 py-3 bg-[#FF5500] hover:bg-[#E64D00] text-white font-semibold rounded-xl transition-colors flex items-center justify-center gap-2"
                >
                  Solicitar Presupuesto
                  <ArrowRight size={20} />
                </button>
              </form>
            </motion.div>
          </div>
        </div>
      </section>

      {/* FAQ Preview */}
      <section className="py-16 lg:py-24 bg-gray-50">
        <div className="container-eminsa">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center max-w-3xl mx-auto mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Preguntas Frecuentes
            </h2>
          </motion.div>

          <div className="max-w-3xl mx-auto space-y-4">
            {[
              {
                q: "¿Cuál es el tiempo mínimo de alquiler?",
                a: "El período mínimo de alquiler es de 1 día, pero ofrecemos mejores tarifas para alquileres de mayor duración.",
              },
              {
                q: "¿El precio incluye instalación?",
                a: "Sí, nuestro servicio incluye transporte, instalación y retiro del equipo. El soporte técnico también está incluido.",
              },
              {
                q: "¿Qué pasa si necesito el equipo por más tiempo?",
                a: "Puede extender el período de alquiler comunicándose con nosotros antes de la fecha de retiro acordada.",
              },
              {
                q: "¿Tienen disponibilidad para emergencias?",
                a: "Sí, contamos con un servicio de respuesta rápida para emergencias. Llame al {rentalInfo.phone} para atención inmediata.",
              },
            ].map((faq, index) => (
              <motion.div
                key={faq.q}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="bg-white rounded-xl p-6 shadow-sm"
              >
                <h3 className="font-semibold text-gray-900 mb-2">{faq.q}</h3>
                <p className="text-gray-600">{faq.a}</p>
              </motion.div>
            ))}
          </div>

          <div className="text-center mt-8">
            <p className="text-gray-600">
              ¿Tiene más preguntas?{" "}
              <a
                href={`tel:${rentalInfo.phone}`}
                className="text-[#00A3E0] font-medium hover:underline"
              >
                Llámenos al {rentalInfo.phone}
              </a>
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
