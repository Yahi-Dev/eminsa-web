"use client";

import { useState } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { motion } from "framer-motion";
import {
  ArrowRight,
  ChevronRight,
  Home,
  Phone,
  Mail,
  MapPin,
  Clock,
  MessageCircle,
  CheckCircle2,
  Send,
  Loader2,
} from "lucide-react";
import { remanufacturedProducts, etrysInfo } from "@/config/etrys-data";
import { contactInfo } from "@/config/navigation";

type ServiceType = "compra" | "reparacion" | "alquiler" | "consulta";

export default function EtrysCotizacionesPage() {
  const searchParams = useSearchParams();
  const preselectedProduct = searchParams.get("producto");
  const preselectedService = searchParams.get("servicio") as ServiceType | null;

  const [formData, setFormData] = useState({
    serviceType: preselectedService || ("" as ServiceType | ""),
    name: "",
    company: "",
    email: "",
    phone: "",
    product: preselectedProduct || "",
    capacity: "",
    quantity: "1",
    message: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simular envío
    await new Promise((resolve) => setTimeout(resolve, 1500));

    setIsSubmitting(false);
    setIsSuccess(true);
  };

  if (isSuccess) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center py-16">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-white rounded-2xl p-8 md:p-12 shadow-xl text-center max-w-lg mx-4"
        >
          <div className="w-20 h-20 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-6">
            <CheckCircle2 size={40} className="text-green-600" />
          </div>
          <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">
            ¡Solicitud Enviada!
          </h1>
          <p className="text-gray-600 mb-8">
            Gracias por contactarnos. Uno de nuestros especialistas le responderá 
            en menos de 30 minutos durante horario laboral.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/etrys"
              className="px-6 py-3 bg-[#00A3E0] hover:bg-[#0077A8] text-white font-semibold rounded-xl transition-colors"
            >
              Volver a ETRYS
            </Link>
            <Link
              href="/"
              className="px-6 py-3 border-2 border-gray-200 text-gray-700 hover:border-gray-300 font-semibold rounded-xl transition-colors"
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
      <section className="bg-gradient-to-br from-[#00A3E0] via-[#0077A8] to-[#001689] text-white py-12 lg:py-16">
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
            <span className="text-white">Cotizaciones</span>
          </nav>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-3xl"
          >
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
              Solicitar Cotización
            </h1>
            <p className="text-xl text-white/90">
              Complete el formulario y uno de nuestros especialistas le responderá 
              en menos de 30 minutos durante horario laboral.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Form Section */}
      <section className="py-12 lg:py-16">
        <div className="container-eminsa">
          <div className="grid lg:grid-cols-3 gap-12">
            {/* Form */}
            <div className="lg:col-span-2">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-white rounded-2xl p-6 md:p-8 shadow-lg"
              >
                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* Service Type */}
                  <div>
                    <label className="block text-sm font-semibold text-gray-900 mb-3">
                      Tipo de Servicio *
                    </label>
                    <div className="grid sm:grid-cols-2 gap-3">
                      {[
                        { value: "compra", label: "Compra de Equipo" },
                        { value: "reparacion", label: "Reparación" },
                        { value: "alquiler", label: "Alquiler" },
                        { value: "consulta", label: "Consulta General" },
                      ].map((option) => (
                        <label
                          key={option.value}
                          className={`flex items-center gap-3 p-4 rounded-xl border-2 cursor-pointer transition-all ${
                            formData.serviceType === option.value
                              ? "border-[#00A3E0] bg-[#00A3E0]/5"
                              : "border-gray-200 hover:border-gray-300"
                          }`}
                        >
                          <input
                            type="radio"
                            name="serviceType"
                            value={option.value}
                            checked={formData.serviceType === option.value}
                            onChange={handleChange}
                            className="sr-only"
                          />
                          <div
                            className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                              formData.serviceType === option.value
                                ? "border-[#00A3E0]"
                                : "border-gray-300"
                            }`}
                          >
                            {formData.serviceType === option.value && (
                              <div className="w-3 h-3 rounded-full bg-[#00A3E0]" />
                            )}
                          </div>
                          <span className="font-medium text-gray-700">
                            {option.label}
                          </span>
                        </label>
                      ))}
                    </div>
                  </div>

                  {/* Contact Info */}
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Nombre Completo *
                      </label>
                      <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#00A3E0] focus:border-transparent transition-all"
                        placeholder="Su nombre"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Empresa
                      </label>
                      <input
                        type="text"
                        name="company"
                        value={formData.company}
                        onChange={handleChange}
                        className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#00A3E0] focus:border-transparent transition-all"
                        placeholder="Nombre de empresa"
                      />
                    </div>
                  </div>

                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Email *
                      </label>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#00A3E0] focus:border-transparent transition-all"
                        placeholder="correo@ejemplo.com"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Teléfono *
                      </label>
                      <input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#00A3E0] focus:border-transparent transition-all"
                        placeholder="809-000-0000"
                      />
                    </div>
                  </div>

                  {/* Product Selection */}
                  {(formData.serviceType === "compra" ||
                    formData.serviceType === "reparacion" ||
                    formData.serviceType === "alquiler") && (
                    <>
                      <div className="grid sm:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            Tipo de Transformador
                          </label>
                          <select
                            name="product"
                            value={formData.product}
                            onChange={handleChange}
                            className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#00A3E0] focus:border-transparent transition-all"
                          >
                            <option value="">Seleccionar tipo</option>
                            {remanufacturedProducts.map((product) => (
                              <option key={product.slug} value={product.slug}>
                                {product.shortName}
                              </option>
                            ))}
                            <option value="otro">Otro / No estoy seguro</option>
                          </select>
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            Capacidad Requerida
                          </label>
                          <select
                            name="capacity"
                            value={formData.capacity}
                            onChange={handleChange}
                            className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#00A3E0] focus:border-transparent transition-all"
                          >
                            <option value="">Seleccionar capacidad</option>
                            <option value="15-75">15 - 75 kVA</option>
                            <option value="100-300">100 - 300 kVA</option>
                            <option value="500-1000">500 - 1,000 kVA</option>
                            <option value="1500-3000">1,500 - 3,000 kVA</option>
                            <option value="otro">Otro / Por determinar</option>
                          </select>
                        </div>
                      </div>

                      {formData.serviceType === "compra" && (
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            Cantidad
                          </label>
                          <input
                            type="number"
                            name="quantity"
                            value={formData.quantity}
                            onChange={handleChange}
                            min="1"
                            className="w-full sm:w-32 px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#00A3E0] focus:border-transparent transition-all"
                          />
                        </div>
                      )}
                    </>
                  )}

                  {/* Message */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Mensaje / Detalles Adicionales
                    </label>
                    <textarea
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      rows={4}
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#00A3E0] focus:border-transparent transition-all resize-none"
                      placeholder="Describa su proyecto, necesidades específicas o cualquier información adicional..."
                    />
                  </div>

                  {/* Submit */}
                  <button
                    type="submit"
                    disabled={isSubmitting || !formData.serviceType}
                    className="w-full sm:w-auto px-8 py-4 bg-[#FF5500] hover:bg-[#E64D00] disabled:bg-gray-300 disabled:cursor-not-allowed text-white font-semibold rounded-xl transition-colors flex items-center justify-center gap-2"
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2 size={20} className="animate-spin" />
                        Enviando...
                      </>
                    ) : (
                      <>
                        Enviar Solicitud
                        <Send size={20} />
                      </>
                    )}
                  </button>
                </form>
              </motion.div>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Response Time */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="bg-gradient-to-br from-[#00A3E0] to-[#001689] text-white rounded-2xl p-6"
              >
                <div className="flex items-center gap-3 mb-4">
                  <Clock size={24} />
                  <h3 className="text-xl font-bold">Respuesta Rápida</h3>
                </div>
                <p className="text-white/90 mb-4">
                  Nuestro equipo le responderá en menos de 30 minutos durante 
                  horario laboral.
                </p>
                <div className="bg-white/10 rounded-xl p-4">
                  <p className="text-sm text-white/80 mb-1">Horario de Atención</p>
                  <p className="font-medium">Lunes a Viernes: 8:00 AM - 5:00 PM</p>
                  <p className="font-medium">Sábados: 8:00 AM - 12:00 PM</p>
                </div>
              </motion.div>

              {/* Contact Info */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="bg-white rounded-2xl p-6 shadow-lg"
              >
                <h3 className="text-lg font-bold text-gray-900 mb-4">
                  Contacto Directo
                </h3>
                <div className="space-y-4">
                  <a
                    href={`tel:${contactInfo.phone}`}
                    className="flex items-center gap-3 text-gray-600 hover:text-[#00A3E0] transition-colors"
                  >
                    <div className="w-10 h-10 rounded-lg bg-gray-100 flex items-center justify-center">
                      <Phone size={18} className="text-[#00A3E0]" />
                    </div>
                    <span>{contactInfo.phone}</span>
                  </a>
                  <a
                    href={`mailto:${contactInfo.email}`}
                    className="flex items-center gap-3 text-gray-600 hover:text-[#00A3E0] transition-colors"
                  >
                    <div className="w-10 h-10 rounded-lg bg-gray-100 flex items-center justify-center">
                      <Mail size={18} className="text-[#00A3E0]" />
                    </div>
                    <span>{contactInfo.email}</span>
                  </a>
                  <a
                    href={`https://wa.me/${contactInfo.whatsapp}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 text-gray-600 hover:text-[#25D366] transition-colors"
                  >
                    <div className="w-10 h-10 rounded-lg bg-[#25D366]/10 flex items-center justify-center">
                      <MessageCircle size={18} className="text-[#25D366]" />
                    </div>
                    <span>WhatsApp</span>
                  </a>
                  <div className="flex items-start gap-3 text-gray-600">
                    <div className="w-10 h-10 rounded-lg bg-gray-100 flex items-center justify-center shrink-0">
                      <MapPin size={18} className="text-[#00A3E0]" />
                    </div>
                    <span className="text-sm">{contactInfo.address}</span>
                  </div>
                </div>
              </motion.div>

              {/* Advantages */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="bg-amber-50 rounded-2xl p-6 border border-amber-200"
              >
                <h3 className="text-lg font-bold text-gray-900 mb-4">
                  ¿Por qué ETRYS?
                </h3>
                <ul className="space-y-3">
                  {etrysInfo.advantages.map((adv) => (
                    <li key={adv.title} className="flex items-start gap-3">
                      <CheckCircle2 size={18} className="text-amber-600 shrink-0 mt-0.5" />
                      <div>
                        <span className="font-medium text-gray-900">{adv.title}</span>
                        <p className="text-sm text-gray-600">{adv.description}</p>
                      </div>
                    </li>
                  ))}
                </ul>
              </motion.div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
