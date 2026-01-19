"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { 
  Send, 
  Phone, 
  Mail, 
  MapPin, 
  Clock,
  MessageCircle,
  CheckCircle2
} from "lucide-react";
import { contactInfo } from "@/data/navigation";

export default function ContactSection() {
  const [formData, setFormData] = useState({
    nombre: "",
    empresa: "",
    email: "",
    telefono: "",
    tipoServicio: "",
    mensaje: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simular envío
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    setIsSubmitting(false);
    setIsSubmitted(true);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  return (
    <section id="contacto" className="py-20 lg:py-32 bg-gray-50 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0">
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-[#001689]/5 rounded-full blur-[100px]" />
      </div>

      <div className="container-eminsa relative">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <span className="inline-block px-4 py-2 bg-[#00A3E0]/10 text-[#00A3E0] rounded-full text-sm font-semibold mb-4">
            Contáctenos
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-[#001689] mb-4">
            Solicite su{" "}
            <span className="text-[#00A3E0]">Cotización</span>
          </h2>
          <p className="text-[#76777A] text-lg">
            Complete el formulario y uno de nuestros especialistas le responderá 
            en menos de 30 minutos durante horario laboral.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-5 gap-12">
          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-2"
          >
            <div className="bg-gradient-to-br from-[#001689] to-[#000E53] rounded-3xl p-8 text-white h-full">
              <h3 className="text-2xl font-bold mb-6">Información de Contacto</h3>
              
              <div className="space-y-6 mb-10">
                <a 
                  href={`tel:${contactInfo.phone}`}
                  className="flex items-start gap-4 group"
                >
                  <div className="w-12 h-12 bg-white/10 rounded-xl flex items-center justify-center flex-shrink-0 group-hover:bg-white/20 transition-colors">
                    <Phone size={20} />
                  </div>
                  <div>
                    <p className="text-white/60 text-sm mb-1">Teléfono</p>
                    <p className="font-semibold group-hover:text-[#00A3E0] transition-colors">
                      {contactInfo.phone}
                    </p>
                  </div>
                </a>

                <a 
                  href={`mailto:${contactInfo.email}`}
                  className="flex items-start gap-4 group"
                >
                  <div className="w-12 h-12 bg-white/10 rounded-xl flex items-center justify-center flex-shrink-0 group-hover:bg-white/20 transition-colors">
                    <Mail size={20} />
                  </div>
                  <div>
                    <p className="text-white/60 text-sm mb-1">Email</p>
                    <p className="font-semibold group-hover:text-[#00A3E0] transition-colors">
                      {contactInfo.email}
                    </p>
                  </div>
                </a>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-white/10 rounded-xl flex items-center justify-center flex-shrink-0">
                    <MapPin size={20} />
                  </div>
                  <div>
                    <p className="text-white/60 text-sm mb-1">Ubicación</p>
                    <p className="font-semibold">{contactInfo.address}</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-white/10 rounded-xl flex items-center justify-center flex-shrink-0">
                    <Clock size={20} />
                  </div>
                  <div>
                    <p className="text-white/60 text-sm mb-1">Horario</p>
                    <p className="font-semibold">Lunes - Viernes</p>
                    <p className="text-white/80 text-sm">8:00 AM - 5:00 PM</p>
                  </div>
                </div>
              </div>

              {/* WhatsApp Button */}
              <a
                href={`https://wa.me/${contactInfo.whatsapp}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-3 w-full px-6 py-4 bg-[#25D366] text-white font-semibold rounded-xl hover:bg-[#20BD5A] transition-all"
              >
                <MessageCircle size={22} />
                Chatear por WhatsApp
              </a>

              {/* Decorative Element */}
              <div className="mt-10 pt-8 border-t border-white/10">
                <p className="text-white/60 text-sm mb-4">Respuesta garantizada en:</p>
                <div className="flex items-center gap-3">
                  <div className="text-3xl font-bold text-[#00A3E0]">&lt;30</div>
                  <div className="text-white/80 text-sm">minutos<br/>en horario laboral</div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Form */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-3"
          >
            <div className="bg-white rounded-3xl shadow-xl p-8 lg:p-10">
              {isSubmitted ? (
                <div className="text-center py-12">
                  <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                    <CheckCircle2 className="w-10 h-10 text-green-600" />
                  </div>
                  <h3 className="text-2xl font-bold text-[#001689] mb-3">
                    ¡Mensaje Enviado!
                  </h3>
                  <p className="text-[#76777A] mb-6">
                    Gracias por contactarnos. Uno de nuestros especialistas 
                    se comunicará con usted en breve.
                  </p>
                  <button
                    onClick={() => setIsSubmitted(false)}
                    className="btn-primary"
                  >
                    Enviar otro mensaje
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label className="input-label">Nombre Completo *</label>
                      <input
                        type="text"
                        name="nombre"
                        value={formData.nombre}
                        onChange={handleChange}
                        required
                        className="input-field"
                        placeholder="Su nombre"
                      />
                    </div>
                    <div>
                      <label className="input-label">Empresa</label>
                      <input
                        type="text"
                        name="empresa"
                        value={formData.empresa}
                        onChange={handleChange}
                        className="input-field"
                        placeholder="Nombre de su empresa"
                      />
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label className="input-label">Email *</label>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        className="input-field"
                        placeholder="correo@ejemplo.com"
                      />
                    </div>
                    <div>
                      <label className="input-label">Teléfono *</label>
                      <input
                        type="tel"
                        name="telefono"
                        value={formData.telefono}
                        onChange={handleChange}
                        required
                        className="input-field"
                        placeholder="+1 809-000-0000"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="input-label">Tipo de Servicio</label>
                    <select
                      name="tipoServicio"
                      value={formData.tipoServicio}
                      onChange={handleChange}
                      className="input-field"
                    >
                      <option value="">Seleccione una opción</option>
                      <option value="transformadores-nuevos">Transformadores Nuevos (MTN)</option>
                      <option value="reparacion">Reparación (ETRYS)</option>
                      <option value="importaciones">Importaciones (EIC)</option>
                      <option value="mantenimiento">Mantenimiento y Servicios</option>
                      <option value="alquiler">Alquiler de Equipos</option>
                      <option value="otro">Otro</option>
                    </select>
                  </div>

                  <div>
                    <label className="input-label">Mensaje *</label>
                    <textarea
                      name="mensaje"
                      value={formData.mensaje}
                      onChange={handleChange}
                      required
                      rows={5}
                      className="input-field resize-none"
                      placeholder="Describa su requerimiento..."
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="btn-primary w-full justify-center disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isSubmitting ? (
                      <>
                        <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                        Enviando...
                      </>
                    ) : (
                      <>
                        Enviar Solicitud
                        <Send size={18} />
                      </>
                    )}
                  </button>

                  <p className="text-[#76777A] text-sm text-center">
                    Al enviar este formulario, acepta nuestra{" "}
                    <a href="/privacidad" className="text-[#001689] hover:underline">
                      Política de Privacidad
                    </a>
                  </p>
                </form>
              )}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
