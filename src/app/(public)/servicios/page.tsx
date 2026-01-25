"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import {
  ArrowRight,
  ChevronRight,
  Settings,
  ShieldCheck,
  Wrench,
  ClipboardCheck,
  AlertTriangle,
  PenTool,
  FlaskConical,
  Truck,
  Phone,
  MessageCircle
} from "lucide-react";
import { services, contactInfo } from "@/data/navigation";

const iconMap: { [key: string]: React.ElementType } = {
  "shield-check": ShieldCheck,
  "wrench": Wrench,
  "clipboard-check": ClipboardCheck,
  "alert-triangle": AlertTriangle,
  "blueprint": PenTool,
  "flask": FlaskConical,
  "truck": Truck,
};

export default function ServiciosPage() {
  return (
    <>
      {/* Hero Section */}
      <section className="relative min-h-[60vh] flex items-center overflow-hidden">
        {/* Background */}
        <div className="absolute inset-0 bg-gradient-to-br from-[#FF5500] via-[#E04D00] to-[#CC4400]">
          <div className="absolute inset-0 opacity-20">
            <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-white/20 rounded-full blur-[100px]" />
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
            <span className="text-white">Servicios</span>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="max-w-3xl"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full text-white/90 text-sm mb-6">
              <Settings size={16} />
              <span>Servicios Especializados</span>
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6">
              EMINSA Servicios
            </h1>
            <p className="text-xl text-white/80">
              Más de 50 años de experiencia en mantenimiento, reparación y soporte
              técnico de transformadores eléctricos. Su socio de confianza para
              garantizar la continuidad operativa de su infraestructura.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-20 bg-white">
        <div className="container-eminsa">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center max-w-3xl mx-auto mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-[#001689] mb-4">
              Nuestros Servicios
            </h2>
            <p className="text-[#76777A] text-lg">
              Soluciones completas para el mantenimiento y cuidado de sus transformadores
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service, index) => {
              const IconComponent = iconMap[service.icon] || ShieldCheck;

              return (
                <motion.div
                  key={service.id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Link href={service.url || `/servicios/${service.id}`} className="group block h-full">
                    <div className="h-full p-8 bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-xl hover:border-[#FF5500]/20 transition-all duration-300 hover:-translate-y-1">
                      {/* Icon */}
                      <div className="w-16 h-16 bg-gradient-to-br from-[#FF5500]/10 to-[#FF5500]/5 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                        <IconComponent className="w-8 h-8 text-[#FF5500]" />
                      </div>

                      {/* Content */}
                      <h3 className="text-xl font-bold text-[#001689] mb-3 group-hover:text-[#FF5500] transition-colors">
                        {service.name}
                      </h3>
                      <p className="text-[#76777A] text-sm leading-relaxed mb-6">
                        {service.description}
                      </p>

                      {/* Benefits */}
                      <div className="space-y-2">
                        {service.benefits.slice(0, 3).map((benefit, i) => (
                          <div key={i} className="flex items-center gap-2 text-sm text-[#76777A]">
                            <div className="w-1.5 h-1.5 bg-[#FF5500] rounded-full" />
                            {benefit}
                          </div>
                        ))}
                      </div>
                    </div>
                  </Link>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Emergency CTA */}
      <section className="py-16 bg-gradient-to-r from-[#001689] to-[#000E53]">
        <div className="container-eminsa">
          <div className="flex flex-col md:flex-row items-center justify-between gap-8">
            <div className="flex items-center gap-6">
              <div className="w-16 h-16 bg-[#FF5500] rounded-2xl flex items-center justify-center">
                <AlertTriangle className="w-8 h-8 text-white" />
              </div>
              <div>
                <h3 className="text-2xl font-bold text-white mb-1">
                  ¿Emergencia Eléctrica?
                </h3>
                <p className="text-white/70">
                  Estamos disponibles 24/7 para atender sus emergencias
                </p>
              </div>
            </div>
            <div className="flex flex-wrap gap-4">
              <a
                href={`tel:${contactInfo.phone}`}
                className="inline-flex items-center gap-2 px-6 py-3 bg-white text-[#001689] font-semibold rounded-lg hover:bg-gray-100 transition-all"
              >
                <Phone size={18} />
                {contactInfo.phone}
              </a>
              <a
                href={`https://wa.me/${contactInfo.whatsapp}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3 bg-[#25D366] text-white font-semibold rounded-lg hover:bg-[#20BD5A] transition-all"
              >
                <MessageCircle size={18} />
                WhatsApp
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-20 bg-gray-50">
        <div className="container-eminsa">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center max-w-3xl mx-auto mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-[#001689] mb-4">
              ¿Por qué EMINSA Servicios?
            </h2>
            <p className="text-[#76777A] text-lg">
              La experiencia y confiabilidad que solo +50 años pueden ofrecer
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center p-8"
            >
              <div className="text-5xl font-bold text-[#FF5500] mb-4">50+</div>
              <h3 className="text-xl font-bold text-[#001689] mb-2">Años de Experiencia</h3>
              <p className="text-[#76777A]">
                Décadas de conocimiento especializado en transformadores eléctricos
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-center p-8"
            >
              <div className="text-5xl font-bold text-[#FF5500] mb-4">24/7</div>
              <h3 className="text-xl font-bold text-[#001689] mb-2">Disponibilidad</h3>
              <p className="text-[#76777A]">
                Atención a emergencias las 24 horas, los 7 días de la semana
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="text-center p-8"
            >
              <div className="text-5xl font-bold text-[#FF5500] mb-4">100%</div>
              <h3 className="text-xl font-bold text-[#001689] mb-2">Satisfacción</h3>
              <p className="text-[#76777A]">
                Compromiso total con la calidad y el servicio al cliente
              </p>
            </motion.div>
          </div>
        </div>
      </section>
    </>
  );
}
