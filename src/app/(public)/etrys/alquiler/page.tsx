"use client";

import { useState } from "react";
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
  BadgeCheck,
  Headphones,
  Wrench,
  Calendar,
  AlertCircle,
  Building2,
  Zap,
  HardHat,
  Loader2,
} from "lucide-react";
import { rentalInfo } from "@/config/etrys-data";
import { contactInfo } from "@/config/navigation";

const benefitIcons: { [key: string]: React.ElementType } = {
  clock: Clock,
  "badge-check": BadgeCheck,
  headphones: Headphones,
  tool: Wrench,
  calendar: Calendar,
  "alert-circle": AlertCircle,
};

export default function EtrysAlquilerPage() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [formData, setFormData] = useState({
    nombre: "",
    empresa: "",
    email: "",
    telefono: "",
    capacidad: "",
    duracion: "",
    mensaje: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500));
    setIsSubmitting(false);
    setIsSuccess(true);
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  if (isSuccess) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-white rounded-2xl p-8 max-w-md w-full text-center shadow-xl"
        >
          <div className="w-20 h-20 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-6">
            <CheckCircle2 size={40} className="text-green-600" />
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">
            ¡Solicitud Enviada!
          </h2>
          <p className="text-gray-600 mb-6">
            Hemos recibido su solicitud de alquiler. Nuestro equipo le contactará 
            en breve con un presupuesto personalizado.
          </p>
          <div className="space-y-3">
            <Link
              href="/etrys"
              className="block w-full px-6 py-3 bg-[#00A3E0] hover:bg-[#0077A8] text-white font-semibold rounded-xl transition-colors"
            >
              Volver a ETRYS
            </Link>
            <Link
              href="/"
              className="block w-full px-6 py-3 border border-gray-300 text-gray-700 hover:bg-gray-50 font-medium rounded-xl transition-colors"
            >
              Ir al Inicio
            </Link>
          </div>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero */}
      <section className="bg-gradient-to-br from-amber-500 via-amber-600 to-amber-700 text-white py-16 lg:py-20">
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
              <span className="inline-block px-4 py-2 bg-white/20 backdrop-blur-sm rounded-full text-sm font-medium mb-4">
                Solución Temporal
              </span>
              <h1 className="text-4xl md:text-5xl font-bold mb-4">
                {rentalInfo.title}
              </h1>
              <p className="text-xl text-white/90 mb-6">
                ¿Necesita energía temporalmente? Obtenga energía a corto plazo con 
                una unidad de alquiler ETRYS. Equipos certificados, disponibilidad 
                inmediata y soporte técnico 24/7.
              </p>
              <div className="flex flex-wrap gap-4">
                <a
                  href={`tel:${rentalInfo.phone}`}
                  className="inline-flex items-center gap-2 px-6 py-3 bg-white text-amber-700 font-semibold rounded-xl hover:bg-gray-100 transition-colors"
                >
                  <Phone size={20} />
                  {rentalInfo.phone}
                </a>
                <a
                  href={`https://wa.me/${contactInfo.whatsapp}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-6 py-3 bg-[#25D366] hover:bg-[#20BD5A] text-white font-semibold rounded-xl transition-colors"
                >
                  <MessageCircle size={20} />
                  WhatsApp
                </a>
              </div>
            </motion.div>

            {/* Image */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
            >
              <div className="relative aspect-[4/3] rounded-2xl overflow-hidden shadow-2xl">
                <Image
                  src="/images/etrys/alquiler-hero.jpg"
                  alt="Alquiler de Transformadores ETRYS"
                  fill
                  className="object-cover"
                  priority
                />
                <div className="absolute bottom-4 left-4 bg-white/90 backdrop-blur-sm rounded-xl p-4">
                  <span className="text-amber-700 font-bold text-lg block">
                    Disponibilidad Inmediata
                  </span>
                  <span className="text-gray-600 text-sm">
                    Equipos listos para entrega
                  </span>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section className="py-16 lg:py-24">
        <div className="container-eminsa">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center max-w-3xl mx-auto mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              ¿Por qué Alquilar con ETRYS?
            </h2>
            <p className="text-gray-600 text-lg">
              Ofrecemos soluciones de alquiler flexibles y confiables para 
              satisfacer sus necesidades temporales de energía.
            </p>
          </motion.div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {rentalInfo.benefits.map((benefit, index) => {
              const Icon = benefitIcons[benefit.icon] || Clock;
              return (
                <motion.div
                  key={benefit.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all"
                >
                  <div className="w-14 h-14 rounded-xl bg-amber-100 flex items-center justify-center mb-4">
                    <Icon size={28} className="text-amber-600" />
                  </div>
                  <h3 className="text-lg font-bold text-gray-900 mb-2">
                    {benefit.title}
                  </h3>
                  <p className="text-gray-600">
                    {benefit.description}
                  </p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Use Cases */}
      <section className="py-16 lg:py-24 bg-white">
        <div className="container-eminsa">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Content */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <span className="inline-block px-3 py-1 bg-amber-100 text-amber-700 text-sm font-medium rounded-full mb-4">
                Casos de Uso
              </span>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                ¿Cuándo Necesita Alquilar?
              </h2>
              <p className="text-gray-600 text-lg mb-6">
                Nuestro servicio de alquiler es ideal para diversas situaciones 
                donde necesita una solución temporal de energía.
              </p>
              <ul className="space-y-3">
                {rentalInfo.useCases.map((useCase) => (
                  <li key={useCase} className="flex items-start gap-3">
                    <CheckCircle2 size={20} className="text-amber-600 shrink-0 mt-0.5" />
                    <span className="text-gray-700">{useCase}</span>
                  </li>
                ))}
              </ul>
            </motion.div>

            {/* Images */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="grid grid-cols-2 gap-4"
            >
              <div className="space-y-4">
                <div className="relative aspect-[4/5] rounded-xl overflow-hidden shadow-lg">
                  <Image
                    src="/images/etrys/alquiler-construccion.jpg"
                    alt="Alquiler para construcción"
                    fill
                    className="object-cover"
                  />
                  <div className="absolute bottom-3 left-3 right-3">
                    <div className="bg-white/90 backdrop-blur-sm rounded-lg p-2 flex items-center gap-2">
                      <HardHat size={18} className="text-amber-600" />
                      <span className="text-sm font-medium text-gray-800">Construcción</span>
                    </div>
                  </div>
                </div>
              </div>
              <div className="space-y-4 pt-8">
                <div className="relative aspect-[4/5] rounded-xl overflow-hidden shadow-lg">
                  <Image
                    src="/images/etrys/alquiler-eventos.jpg"
                    alt="Alquiler para eventos"
                    fill
                    className="object-cover"
                  />
                  <div className="absolute bottom-3 left-3 right-3">
                    <div className="bg-white/90 backdrop-blur-sm rounded-lg p-2 flex items-center gap-2">
                      <Zap size={18} className="text-amber-600" />
                      <span className="text-sm font-medium text-gray-800">Eventos</span>
                    </div>
                  </div>
                </div>
                <div className="relative aspect-[4/5] rounded-xl overflow-hidden shadow-lg">
                  <Image
                    src="/images/etrys/alquiler-industria.jpg"
                    alt="Alquiler para industria"
                    fill
                    className="object-cover"
                  />
                  <div className="absolute bottom-3 left-3 right-3">
                    <div className="bg-white/90 backdrop-blur-sm rounded-lg p-2 flex items-center gap-2">
                      <Building2 size={18} className="text-amber-600" />
                      <span className="text-sm font-medium text-gray-800">Industria</span>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Process */}
      <section className="py-16 lg:py-24 bg-gray-50">
        <div className="container-eminsa">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center max-w-3xl mx-auto mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Proceso de Alquiler
            </h2>
            <p className="text-gray-600 text-lg">
              Alquilar un transformador con ETRYS es rápido y sencillo.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-4 gap-6">
            {[
              { step: 1, title: "Solicitud", desc: "Complete el formulario o llámenos" },
              { step: 2, title: "Cotización", desc: "Reciba un presupuesto en 30 min" },
              { step: 3, title: "Instalación", desc: "Técnicos expertos instalan el equipo" },
              { step: 4, title: "Soporte", desc: "Asistencia técnica 24/7" },
            ].map((item, index) => (
              <motion.div
                key={item.step}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="text-center"
              >
                <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-amber-500 text-white flex items-center justify-center text-2xl font-bold shadow-lg">
                  {item.step}
                </div>
                <h3 className="font-bold text-gray-900 mb-1">{item.title}</h3>
                <p className="text-sm text-gray-600">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Form Section */}
      <section className="py-16 lg:py-24 bg-white">
        <div className="container-eminsa">
          <div className="grid lg:grid-cols-2 gap-12">
            {/* Form */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                Solicitar Presupuesto
              </h2>
              <p className="text-gray-600 mb-8">
                Complete el formulario y le responderemos con un presupuesto 
                personalizado en menos de 30 minutos durante horario laboral.
              </p>

              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="grid sm:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Nombre Completo *
                    </label>
                    <input
                      type="text"
                      name="nombre"
                      required
                      value={formData.nombre}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-all"
                      placeholder="Su nombre"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Empresa
                    </label>
                    <input
                      type="text"
                      name="empresa"
                      value={formData.empresa}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-all"
                      placeholder="Nombre de su empresa"
                    />
                  </div>
                </div>

                <div className="grid sm:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Email *
                    </label>
                    <input
                      type="email"
                      name="email"
                      required
                      value={formData.email}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-all"
                      placeholder="su@email.com"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Teléfono *
                    </label>
                    <input
                      type="tel"
                      name="telefono"
                      required
                      value={formData.telefono}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-all"
                      placeholder="809-000-0000"
                    />
                  </div>
                </div>

                <div className="grid sm:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Capacidad Requerida
                    </label>
                    <select
                      name="capacidad"
                      value={formData.capacidad}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-all"
                    >
                      <option value="">Seleccione...</option>
                      <option value="15-50">15 - 50 kVA</option>
                      <option value="50-100">50 - 100 kVA</option>
                      <option value="100-500">100 - 500 kVA</option>
                      <option value="500-1000">500 - 1,000 kVA</option>
                      <option value="1000+">Más de 1,000 kVA</option>
                      <option value="no-se">No estoy seguro</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Duración Estimada
                    </label>
                    <select
                      name="duracion"
                      value={formData.duracion}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-all"
                    >
                      <option value="">Seleccione...</option>
                      <option value="dias">Días</option>
                      <option value="semanas">Semanas</option>
                      <option value="1-3-meses">1 - 3 meses</option>
                      <option value="3-6-meses">3 - 6 meses</option>
                      <option value="6+-meses">Más de 6 meses</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Mensaje / Detalles Adicionales
                  </label>
                  <textarea
                    name="mensaje"
                    value={formData.mensaje}
                    onChange={handleChange}
                    rows={4}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-all resize-none"
                    placeholder="Describa su proyecto o necesidades específicas..."
                  />
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full px-6 py-4 bg-amber-500 hover:bg-amber-600 disabled:bg-amber-300 text-white font-semibold rounded-xl transition-colors flex items-center justify-center gap-2"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 size={20} className="animate-spin" />
                      Enviando...
                    </>
                  ) : (
                    <>
                      Solicitar Presupuesto
                      <ArrowRight size={20} />
                    </>
                  )}
                </button>
              </form>
            </motion.div>

            {/* Sidebar */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="space-y-6"
            >
              {/* Quick Contact */}
              <div className="bg-amber-50 rounded-2xl p-6 border border-amber-200">
                <h3 className="text-lg font-bold text-gray-900 mb-4">
                  ¿Necesita Respuesta Inmediata?
                </h3>
                <p className="text-gray-600 mb-4">
                  Llámenos directamente para una atención más rápida.
                </p>
                <a
                  href={`tel:${rentalInfo.phone}`}
                  className="flex items-center justify-center gap-2 w-full px-4 py-3 bg-amber-500 hover:bg-amber-600 text-white font-semibold rounded-xl transition-colors"
                >
                  <Phone size={20} />
                  {rentalInfo.phone}
                </a>
                <a
                  href={`https://wa.me/${contactInfo.whatsapp}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 w-full mt-3 px-4 py-3 bg-[#25D366] hover:bg-[#20BD5A] text-white font-semibold rounded-xl transition-colors"
                >
                  <MessageCircle size={20} />
                  WhatsApp
                </a>
              </div>

              {/* Available Equipment */}
              <div className="bg-gray-50 rounded-2xl p-6">
                <h3 className="text-lg font-bold text-gray-900 mb-4">
                  Equipos Disponibles
                </h3>
                <ul className="space-y-3">
                  {rentalInfo.availableEquipment.map((equip) => (
                    <li key={equip} className="flex items-start gap-3">
                      <CheckCircle2 size={18} className="text-amber-600 shrink-0 mt-0.5" />
                      <span className="text-gray-700 text-sm">{equip}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Response Time */}
              <div className="bg-[#00A3E0]/10 rounded-2xl p-6">
                <div className="flex items-center gap-3 mb-3">
                  <Clock size={24} className="text-[#00A3E0]" />
                  <h3 className="text-lg font-bold text-gray-900">
                    Tiempo de Respuesta
                  </h3>
                </div>
                <p className="text-gray-600">
                  Respondemos a su solicitud en menos de <strong>30 minutos</strong> durante 
                  horario laboral (Lunes a Viernes 8am - 5pm).
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-gradient-to-br from-amber-500 via-amber-600 to-amber-700 text-white">
        <div className="container-eminsa text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              ¿Listo para Alquilar?
            </h2>
            <p className="text-xl text-white/90 max-w-2xl mx-auto mb-8">
              Contáctenos hoy y obtenga su transformador de alquiler rápidamente.
            </p>
            <a
              href={`tel:${rentalInfo.phone}`}
              className="inline-flex items-center gap-2 px-8 py-4 bg-white text-amber-700 font-semibold rounded-xl hover:bg-gray-100 transition-colors shadow-lg"
            >
              <Phone size={20} />
              Llamar Ahora: {rentalInfo.phone}
            </a>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
