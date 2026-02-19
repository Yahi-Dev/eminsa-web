"use client";

import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { 
  Send, 
  ChevronRight, 
  CheckCircle2,
  Phone,
  MessageCircle,
  Building,
  User,
  FileText
} from "lucide-react";
import { contactInfo } from "@/config/navigation";
import { getWhatsAppUrl } from "@/utils/whatsapp";

const tiposServicio = [
  { value: "mtn-transformador", label: "Transformador Nuevo (MTN)", category: "MTN" },
  { value: "etrys-reparacion", label: "Reparación de Transformador", category: "ETRYS" },
  { value: "etrys-remanufacturado", label: "Transformador Remanufacturado", category: "ETRYS" },
  { value: "etrys-alquiler", label: "Alquiler de Transformador", category: "ETRYS" },
  { value: "eic-importacion", label: "Importación de Equipos", category: "EIC" },
  { value: "servicio-preventivo", label: "Mantenimiento Preventivo", category: "Servicios" },
  { value: "servicio-correctivo", label: "Mantenimiento Correctivo", category: "Servicios" },
  { value: "servicio-emergencia", label: "Atención de Emergencia", category: "Servicios" },
  { value: "otro", label: "Otro", category: "Otro" },
];

const tiposTransformador = [
  "Tipo Poste Monofásico",
  "Tipo Poste Trifásico",
  "Pad Mounted Monofásico",
  "Pad Mounted Trifásico",
  "Subestación",
  "Seco en Resina",
  "No aplica",
];

const capacidades = [
  "15 kVA", "25 kVA", "30 kVA", "37.5 kVA", "50 kVA", 
  "75 kVA", "100 kVA", "150 kVA", "225 kVA", "300 kVA",
  "500 kVA", "750 kVA", "1000 kVA", "Otro"
];

export default function CotizarPage() {
  const [formData, setFormData] = useState({
    nombre: "",
    empresa: "",
    email: "",
    telefono: "",
    tipoServicio: "",
    tipoTransformador: "",
    capacidad: "",
    cantidad: "1",
    ubicacion: "",
    mensaje: "",
    urgente: false,
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    await new Promise(resolve => setTimeout(resolve, 2000));
    setIsSubmitting(false);
    setIsSubmitted(true);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === "checkbox" ? (e.target as HTMLInputElement).checked : value
    }));
  };

  return (
    <>
      {/* Hero */}
      <section className="relative py-20 bg-gradient-to-br from-[#001689] to-[#000E53]">
        <div className="container-eminsa relative">
          <div className="flex items-center gap-2 text-white/60 text-sm mb-8">
            <Link href="/" className="hover:text-white transition-colors">Inicio</Link>
            <ChevronRight size={16} />
            <span className="text-white">Solicitar Cotización</span>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-2xl"
          >
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
              Solicitar Cotización
            </h1>
            <p className="text-xl text-white/80">
              Complete el formulario y recibirá una respuesta en menos de 30 minutos 
              durante horario laboral.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Form Section */}
      <section className="py-16 bg-gray-50">
        <div className="container-eminsa">
          <div className="grid lg:grid-cols-3 gap-12">
            {/* Form */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              className="lg:col-span-2"
            >
              <div className="bg-white rounded-3xl shadow-xl overflow-hidden">
                {isSubmitted ? (
                  <div className="p-12 text-center">
                    <div className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-8">
                      <CheckCircle2 className="w-12 h-12 text-green-600" />
                    </div>
                    <h2 className="text-3xl font-bold text-[#001689] mb-4">
                      ¡Solicitud Recibida!
                    </h2>
                    <p className="text-[#76777A] text-lg mb-8 max-w-md mx-auto">
                      Gracias por contactarnos. Uno de nuestros especialistas 
                      se comunicará con usted en breve.
                    </p>
                    <div className="flex flex-wrap justify-center gap-4">
                      <button onClick={() => setIsSubmitted(false)} className="btn-primary">
                        Nueva Solicitud
                      </button>
                      <Link href="/" className="btn-secondary">
                        Volver al Inicio
                      </Link>
                    </div>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="p-8 lg:p-10 space-y-8">
                    {/* Contact Info */}
                    <div>
                      <div className="flex items-center gap-3 mb-6">
                        <div className="w-12 h-12 bg-[#001689]/10 rounded-xl flex items-center justify-center">
                          <User className="w-6 h-6 text-[#001689]" />
                        </div>
                        <div>
                          <h3 className="text-xl font-bold text-[#001689]">Información de Contacto</h3>
                        </div>
                      </div>

                      <div className="grid md:grid-cols-2 gap-6">
                        <div>
                          <label className="input-label">Nombre Completo *</label>
                          <input type="text" name="nombre" value={formData.nombre} onChange={handleChange} required className="input-field" placeholder="Su nombre" />
                        </div>
                        <div>
                          <label className="input-label">Empresa</label>
                          <input type="text" name="empresa" value={formData.empresa} onChange={handleChange} className="input-field" placeholder="Nombre de su empresa" />
                        </div>
                        <div>
                          <label className="input-label">Email *</label>
                          <input type="email" name="email" value={formData.email} onChange={handleChange} required className="input-field" placeholder="correo@ejemplo.com" />
                        </div>
                        <div>
                          <label className="input-label">Teléfono *</label>
                          <input type="tel" name="telefono" value={formData.telefono} onChange={handleChange} required className="input-field" placeholder="+1 809-000-0000" />
                        </div>
                      </div>
                    </div>

                    {/* Service Type */}
                    <div>
                      <div className="flex items-center gap-3 mb-6">
                        <div className="w-12 h-12 bg-[#00A3E0]/10 rounded-xl flex items-center justify-center">
                          <FileText className="w-6 h-6 text-[#00A3E0]" />
                        </div>
                        <div>
                          <h3 className="text-xl font-bold text-[#001689]">Tipo de Requerimiento</h3>
                        </div>
                      </div>

                      <div className="grid md:grid-cols-2 gap-6">
                        <div className="md:col-span-2">
                          <label className="input-label">Tipo de Servicio *</label>
                          <select name="tipoServicio" value={formData.tipoServicio} onChange={handleChange} required className="input-field">
                            <option value="">Seleccione una opción</option>
                            {tiposServicio.map((tipo) => (
                              <option key={tipo.value} value={tipo.value}>[{tipo.category}] {tipo.label}</option>
                            ))}
                          </select>
                        </div>
                        <div>
                          <label className="input-label">Tipo de Transformador</label>
                          <select name="tipoTransformador" value={formData.tipoTransformador} onChange={handleChange} className="input-field">
                            <option value="">Seleccione</option>
                            {tiposTransformador.map((tipo) => (
                              <option key={tipo} value={tipo}>{tipo}</option>
                            ))}
                          </select>
                        </div>
                        <div>
                          <label className="input-label">Capacidad</label>
                          <select name="capacidad" value={formData.capacidad} onChange={handleChange} className="input-field">
                            <option value="">Seleccione</option>
                            {capacidades.map((cap) => (
                              <option key={cap} value={cap}>{cap}</option>
                            ))}
                          </select>
                        </div>
                      </div>
                    </div>

                    {/* Details */}
                    <div>
                      <div className="flex items-center gap-3 mb-6">
                        <div className="w-12 h-12 bg-[#00B140]/10 rounded-xl flex items-center justify-center">
                          <Building className="w-6 h-6 text-[#00B140]" />
                        </div>
                        <div>
                          <h3 className="text-xl font-bold text-[#001689]">Detalles Adicionales</h3>
                        </div>
                      </div>

                      <div className="grid md:grid-cols-2 gap-6">
                        <div>
                          <label className="input-label">Cantidad</label>
                          <input type="number" name="cantidad" value={formData.cantidad} onChange={handleChange} min="1" className="input-field" />
                        </div>
                        <div>
                          <label className="input-label">Ubicación del Proyecto</label>
                          <input type="text" name="ubicacion" value={formData.ubicacion} onChange={handleChange} className="input-field" placeholder="Ciudad, provincia" />
                        </div>
                        <div className="md:col-span-2">
                          <label className="input-label">Descripción del Requerimiento *</label>
                          <textarea name="mensaje" value={formData.mensaje} onChange={handleChange} required rows={5} className="input-field resize-none" placeholder="Describa su requerimiento..." />
                        </div>
                      </div>

                      <div className="flex items-center gap-3 p-4 bg-orange-50 rounded-xl mt-6">
                        <input type="checkbox" name="urgente" checked={formData.urgente} onChange={handleChange} id="urgente" className="w-5 h-5" />
                        <label htmlFor="urgente" className="text-[#76777A]">
                          <span className="font-semibold text-[#FF5500]">Urgente:</span> Necesito una respuesta lo antes posible
                        </label>
                      </div>
                    </div>

                    <button type="submit" disabled={isSubmitting} className="btn-primary w-full justify-center disabled:opacity-50">
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
                  </form>
                )}
              </div>
            </motion.div>

            {/* Sidebar */}
            <motion.div initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.2 }}>
              <div className="sticky top-24 space-y-6">
                <div className="bg-gradient-to-br from-[#001689] to-[#000E53] rounded-2xl p-6 text-white">
                  <h3 className="text-lg font-bold mb-4">¿Prefiere llamarnos?</h3>
                  <a href={`tel:${contactInfo.phone}`} className="flex items-center gap-3 mb-4 hover:text-[#00A3E0] transition-colors">
                    <Phone size={20} />
                    <span className="font-semibold">{contactInfo.phone}</span>
                  </a>
                  <a href={getWhatsAppUrl()} target="_blank" rel="noopener noreferrer" className="flex items-center justify-center gap-2 w-full px-4 py-3 bg-[#25D366] text-white font-semibold rounded-lg hover:bg-[#20BD5A] transition-all">
                    <MessageCircle size={18} />
                    WhatsApp
                  </a>
                </div>

                <div className="bg-white rounded-2xl shadow-lg p-6">
                  <h3 className="text-lg font-bold text-[#001689] mb-4">Tiempo de Respuesta</h3>
                  <div className="flex items-center gap-4 mb-4">
                    <div className="text-4xl font-bold text-[#00A3E0]">&lt;30</div>
                    <div className="text-[#76777A] text-sm">minutos<br/>en horario laboral</div>
                  </div>
                  <p className="text-[#76777A] text-sm">Lunes a Viernes de 8:00 AM a 5:00 PM</p>
                </div>

                <div className="bg-gray-50 rounded-2xl p-6">
                  <h4 className="font-semibold text-[#001689] mb-4">Certificaciones</h4>
                  <div className="flex gap-4">
                    <img src="/images/SelloAENORISO9001_NEG.png" alt="ISO 9001" className="h-12 object-contain" />
                    <img src="/images/IQNET_RCMark_PosCMYK.png" alt="IQNET" className="h-12 object-contain" />
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </>
  );
}
