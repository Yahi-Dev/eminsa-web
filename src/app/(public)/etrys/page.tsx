"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import {
  ArrowRight,
  Play,
  CheckCircle2,
  Phone,
  MessageCircle,
  Zap,
  PiggyBank,
  ShieldCheck,
  Leaf,
  Award,
  Users,
  Clock,
} from "lucide-react";
import {
  etrysInfo,
  remanufacturedAdvantages,
  remanufacturedProducts,
  remanufactureProcess,
  rentalInfo,
} from "@/config/etrys-data";
import { contactInfo } from "@/config/navigation";
import { getWhatsAppUrl } from "@/utils/whatsapp";
import TransformadorRestauracionSection from "@/features/home/components/TransformadorRestauracionSection";
import RemanufactureProcessModal from "@/features/home/components/etrys/RemanufactureProcessModal";

const advantageIcons: { [key: string]: React.ElementType } = {
  zap: Zap,
  "piggy-bank": PiggyBank,
  "shield-check": ShieldCheck,
  leaf: Leaf,
};

export default function EtrysPage() {
  const router = useRouter();
  const [quoteForm, setQuoteForm] = useState({ nombre: "", email: "", telefono: "" });
  const [activeStepIndex, setActiveStepIndex] = useState<number | null>(null);

  const handleQuoteSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const params = new URLSearchParams();
    if (quoteForm.nombre) params.set("nombre", quoteForm.nombre);
    if (quoteForm.email) params.set("email", quoteForm.email);
    if (quoteForm.telefono) params.set("telefono", quoteForm.telefono);
    router.push(`/etrys/cotizaciones?${params.toString()}`);
  };

  // Referencia para el video
  const videoRef = useRef<HTMLVideoElement>(null);

  // Efecto para asegurar que el video se reproduzca
  useEffect(() => {
    if (videoRef.current) {
      // Intentar reproducir el video
      videoRef.current.play().catch((error) => {
        console.log("Video autoplay failed, trying with user interaction simulation:", error);
        
        // Si falla el autoplay, intentar con una simulación de interacción del usuario
        const playVideo = () => {
          if (videoRef.current) {
            videoRef.current.play();
          }
        };
        
        // Agregar un event listener para intentar reproducir en la primera interacción del usuario
        document.addEventListener('click', playVideo, { once: true });
      });
    }
  }, []);

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-[#00A3E0] via-[#0077A8] to-[#001689] text-white py-16 lg:py-24 overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0" style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.4'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }} />
        </div>

        <div className="container-eminsa relative">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Content */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
            >
              <span className="inline-block px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full text-sm font-medium mb-6 border border-white/20">
                {etrysInfo.slogan}
              </span>
              <h1 className="text-3xl md:text-3xl lg:text-5xl font-bold mb-6 leading-tight">
                {etrysInfo.tagline}
              </h1>
              <p className="text-lg md:text-xl text-white/90 mb-8 leading-relaxed max-w-xl">
                En ETRYS unimos la experiencia de un equipo técnico altamente
                calificado con tecnología de última generación para garantizar
                que sus transformadores trabajen como nuevos.
              </p>

              {/* CTAs */}
              <div className="flex flex-wrap gap-4">
                <Link
                  href="/etrys/cotizaciones"
                  className="inline-flex items-center gap-2 px-6 py-3 bg-[#FF5500] hover:bg-[#E64D00] text-white font-semibold rounded-xl transition-all shadow-lg hover:shadow-xl"
                >
                  Solicitar Cotización
                  <ArrowRight size={20} />
                </Link>
                <a
                  href={getWhatsAppUrl()}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-6 py-3 bg-white/10 hover:bg-white/20 backdrop-blur-sm border border-white/30 text-white font-semibold rounded-xl transition-all"
                >
                  <MessageCircle size={20} />
                  WhatsApp
                </a>
              </div>
            </motion.div>

            {/* Video */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="relative"
            >
              <div className="aspect-video bg-white/10 backdrop-blur-sm rounded-2xl overflow-hidden border border-white/20 shadow-2xl">
                {/* Video con reproducción automática - Similar al HeroSection */}
                <video
                  ref={videoRef}
                  className="w-full h-full object-cover"
                  autoPlay
                  loop
                  muted
                  playsInline
                  poster="/images/video-poster.jpg"
                  preload="auto"
                >
                  <source src="/videos/video-home-etrys.mp4" type="video/mp4" />
                  Tu navegador no soporta el elemento de video.
                </video>
              </div>

              {/* Floating badge */}
              <div className="absolute -bottom-4 -left-4 bg-amber-500 text-white px-4 py-2 rounded-xl shadow-lg">
                <span className="font-bold">18 meses</span>
                <span className="text-sm block">de garantía</span>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Reparación Section */}
      <section className="">
        <TransformadorRestauracionSection />
      </section>

      {/* Productos Remanufacturados */}
      <section className="py-16 lg:py-24 bg-gray-50">
        <div className="container-eminsa">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center max-w-3xl mx-auto mb-12"
          >
            <span className="inline-block px-3 py-1 bg-[#00A3E0]/10 text-[#00A3E0] text-sm font-medium rounded-full mb-4">
              Transformadores Remanufacturados
            </span>
            <p className="text-gray-600 text-lg font-bold">
              ¿Necesita disponibilidad inmediata y costos competitivos? Los
              transformadores remanufacturados ETRYS son la solución.
            </p>
          </motion.div>

          {/* Ventajas */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-12">
            {remanufacturedAdvantages.map((adv, index) => {
              const Icon = advantageIcons[adv.icon] || Zap;
              return (
                <motion.div
                  key={adv.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-white rounded-xl p-5 shadow-md hover:shadow-lg transition-all group"
                >
                  <div className="w-12 h-12 rounded-lg bg-[#00A3E0]/10 flex items-center justify-center mb-3 group-hover:bg-[#00A3E0] transition-colors">
                    <Icon size={24} className="text-[#00A3E0] group-hover:text-white transition-colors" />
                  </div>
                  <h3 className="font-bold text-gray-900 mb-1">{adv.title}</h3>
                  <p className="text-sm text-gray-600">{adv.description}</p>
                  {adv.highlight && (
                    <span className="inline-block mt-2 px-2 py-0.5 bg-amber-100 text-amber-700 text-xs font-semibold rounded">
                      {adv.highlight}
                    </span>
                  )}
                </motion.div>
              );
            })}
          </div>

          {/* Products Grid */}
          <div className="grid md:grid-cols-3 gap-6">
            {remanufacturedProducts.map((product, index) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.15 }}
              >
                <Link
                  href={`/etrys/productos/${product.slug}`}
                  className="block bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all group h-full"
                >
                  <div className="relative aspect-[4/3] bg-gray-100">
                    <Image
                      src={product.image}
                      alt={product.name}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute top-3 right-3">
                      <span className="px-3 py-1 bg-[#00A3E0] text-white text-xs font-bold rounded-full">
                        ETRYS
                      </span>
                    </div>
                  </div>
                  <div className="p-6">
                    <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-[#00A3E0] transition-colors">
                      {product.shortName}
                    </h3>
                    <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                      {product.description}
                    </p>
                    <div className="flex flex-wrap gap-2 mb-4">
                      <span className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded">
                        {product.powerRange}
                      </span>
                      <span className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded">
                        {product.voltageRange}
                      </span>
                    </div>
                    <div className="flex items-center gap-2 text-[#00A3E0] font-medium">
                      Ver detalles
                      <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>

          {/* CTA */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mt-12"
          >
            <Link
              href="/etrys/productos"
              className="inline-flex items-center gap-2 px-6 py-3 bg-[#00A3E0] hover:bg-[#0077A8] text-white font-semibold rounded-xl transition-colors"
            >
              Ver Todos los Productos
              <ArrowRight size={20} />
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Proceso de Remanufactura */}
      <section className="py-16 lg:py-24 bg-white">
        <div className="container-eminsa">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center max-w-3xl mx-auto mb-12"
          >
            <span className="inline-block px-3 py-1 bg-[#00A3E0]/10 text-[#00A3E0] text-sm font-medium rounded-full mb-4">
              Proceso Certificado
            </span>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Nuestro Proceso de Remanufactura
            </h2>
            <p className="text-gray-600 text-lg">
              Cada transformador pasa por un riguroso proceso de 7 pasos que
              garantiza el cumplimiento de las especificaciones originales.
            </p>
          </motion.div>

          {/* Process Steps */}
          <div className="relative">

            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-4 lg:gap-2">
              {remanufactureProcess.map((step, index) => (
                <motion.button
                  key={step.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  onClick={() => setActiveStepIndex(index)}
                  className="relative text-center group cursor-pointer"
                >
                  <div className="relative z-10 w-12 h-12 mx-auto mb-3 rounded-full bg-linear-to-br from-[#00A3E0] to-[#001689] flex items-center justify-center text-white font-bold shadow-lg group-hover:scale-110 group-hover:shadow-xl transition-all duration-200">
                    {step.id}
                  </div>
                  <h3 className="font-semibold text-gray-900 text-sm mb-1 group-hover:text-[#00A3E0] transition-colors">
                    {step.shortTitle}
                  </h3>
                  <p className="text-xs text-gray-500 hidden md:block line-clamp-2">
                    {step.description}
                  </p>
                  <p className="text-xs text-[#00A3E0] font-medium mt-1 opacity-0 group-hover:opacity-100 transition-opacity hidden md:block">
                    Ver detalle →
                  </p>
                </motion.button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Ventaja ETRYS */}
      <section className="py-16 lg:py-24 bg-gradient-to-br from-gray-900 via-gray-800 to-[#001689] text-white">
        <div className="container-eminsa">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Content */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <span className="inline-block px-3 py-1 bg-white/10 text-white text-sm font-medium rounded-full mb-4">
                ¿Por qué ETRYS?
              </span>
              <h2 className="text-3xl md:text-4xl font-bold mb-8">
                ¿Cuál es la Ventaja ETRYS?
              </h2>

              <div className="space-y-6">
                {etrysInfo.advantages.map((adv, index) => (
                  <motion.div
                    key={adv.title}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.15 }}
                    className="flex gap-4"
                  >
                    <div className="w-14 h-14 rounded-xl bg-[#00A3E0]/20 flex items-center justify-center shrink-0">
                      {adv.icon === "award" && <Award size={28} className="text-[#00A3E0]" />}
                      {adv.icon === "users" && <Users size={28} className="text-[#00A3E0]" />}
                      {adv.icon === "shield-check" && <ShieldCheck size={28} className="text-[#00A3E0]" />}
                    </div>
                    <div>
                      <h3 className="text-xl font-bold mb-1 flex items-center gap-2">
                        {adv.title}
                        {adv.highlight && (
                          <span className="text-sm font-normal px-2 py-0.5 bg-amber-500 text-white rounded">
                            {adv.highlight}
                          </span>
                        )}
                      </h3>
                      <p className="text-white/70">{adv.description}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Form Preview */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="bg-white rounded-2xl p-6 md:p-8 text-gray-900"
            >
              <h3 className="text-2xl font-bold mb-2">Solicite una Cotización</h3>
              <p className="text-gray-600 mb-6">
                Complete el formulario y le responderemos en menos de 30 minutos
                durante horario laboral.
              </p>
              <form onSubmit={handleQuoteSubmit} className="space-y-4">
                <input
                  type="text"
                  placeholder="Nombre completo"
                  value={quoteForm.nombre}
                  onChange={(e) => setQuoteForm((p) => ({ ...p, nombre: e.target.value }))}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#00A3E0] focus:border-transparent transition-all"
                />
                <input
                  type="email"
                  placeholder="Correo electrónico"
                  value={quoteForm.email}
                  onChange={(e) => setQuoteForm((p) => ({ ...p, email: e.target.value }))}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#00A3E0] focus:border-transparent transition-all"
                />
                <input
                  type="tel"
                  placeholder="Teléfono"
                  value={quoteForm.telefono}
                  onChange={(e) => setQuoteForm((p) => ({ ...p, telefono: e.target.value }))}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#00A3E0] focus:border-transparent transition-all"
                />
                <button
                  type="submit"
                  className="block w-full px-6 py-3 bg-[#FF5500] hover:bg-[#E64D00] text-white font-semibold rounded-xl transition-colors text-center"
                >
                  Continuar Cotización
                </button>
              </form>
              <p className="text-xs text-gray-500 mt-4 flex items-center gap-2">
                <Clock size={14} />
                Respuesta promedio: 30 minutos en horario laboral
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Alquiler Section */}
      <section className="py-16 lg:py-24 bg-amber-50">
        <div className="container-eminsa">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Image */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="relative"
            >
              <div className="aspect-[4/3] bg-gray-200 rounded-2xl overflow-hidden shadow-xl">
                <Image
                  src="/images/etrys/alquiler-hero.jpg"
                  alt="Alquiler de Transformadores ETRYS"
                  fill
                  className="object-cover"
                />
              </div>
              <div className="absolute -bottom-4 -right-4 bg-amber-500 text-white px-6 py-4 rounded-xl shadow-lg">
                <Phone size={24} className="mb-1" />
                <span className="font-bold block">{rentalInfo.phone}</span>
              </div>
            </motion.div>

            {/* Content */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <span className="inline-block px-3 py-1 bg-amber-200 text-amber-800 text-sm font-medium rounded-full mb-4">
                Solución Temporal
              </span>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                ¿Necesita Energía Temporalmente?
              </h2>
              <p className="text-gray-600 text-lg mb-6">
                Obtenga energía a corto plazo con una unidad de alquiler ETRYS.
                Equipos certificados, disponibilidad inmediata y soporte técnico 24/7.
              </p>

              <ul className="space-y-3 mb-8">
                {rentalInfo.benefits.slice(0, 4).map((benefit) => (
                  <li key={benefit.id} className="flex items-start gap-3">
                    <CheckCircle2 size={20} className="text-amber-600 shrink-0 mt-0.5" />
                    <div>
                      <span className="font-medium text-gray-900">{benefit.title}</span>
                      <span className="text-gray-600 text-sm block">{benefit.description}</span>
                    </div>
                  </li>
                ))}
              </ul>

              <div className="flex flex-wrap gap-4">
                <Link
                  href="/etrys/alquiler"
                  className="inline-flex items-center gap-2 px-6 py-3 bg-amber-500 hover:bg-amber-600 text-white font-semibold rounded-xl transition-colors"
                >
                  Más Información
                  <ArrowRight size={20} />
                </Link>
                <a
                  href={`tel:${rentalInfo.phone}`}
                  className="inline-flex items-center gap-2 px-6 py-3 border-2 border-amber-500 text-amber-700 hover:bg-amber-500 hover:text-white font-semibold rounded-xl transition-colors"
                >
                  <Phone size={20} />
                  Llamar Ahora
                </a>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      <RemanufactureProcessModal
        steps={remanufactureProcess}
        activeIndex={activeStepIndex}
        onClose={() => setActiveStepIndex(null)}
        onNavigate={setActiveStepIndex}
      />
    </div>
  );
}
