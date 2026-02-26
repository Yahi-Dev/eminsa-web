"use client";

import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  ChevronRight,
  Send,
  Loader2,
  CheckCircle2,
  Phone,
  MessageCircle,
  Clock,
  Shield,
  Zap,
  Settings,
} from "lucide-react";
import { services, contactInfo } from "@/config/navigation";
import { getWhatsAppUrl } from "@/utils/whatsapp";
import { PhoneInputField } from "@/components/ui/PhoneInputField";

export default function CotizacionServiciosPage() {
  const [formData, setFormData] = useState({
    nombre: "",
    empresa: "",
    email: "",
    telefono: "",
    tipoServicio: "",
    tipoEquipo: "",
    ubicacion: "",
    descripcion: "",
    urgente: false,
    potencia: "",
    configuracion: "",
    voltajePrimario: "",
    voltajeSecundario: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [codigo, setCodigo] = useState("");
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.nombre.trim())
      newErrors.nombre = "El nombre es requerido";
    if (!formData.email.trim()) newErrors.email = "El email es requerido";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Email inválido";
    }
    if (!formData.telefono.trim())
      newErrors.telefono = "El teléfono es requerido";
    if (!formData.tipoServicio)
      newErrors.tipoServicio = "Seleccione un servicio";
    if (!formData.descripcion.trim())
      newErrors.descripcion = "Describa sus requerimientos";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) return;

    setIsSubmitting(true);

    try {
      const res = await fetch("/api/cotizaciones", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          unidad: "SRV",
          nombre: formData.nombre,
          empresa: formData.empresa || undefined,
          email: formData.email,
          telefono: formData.telefono,
          urgente: formData.urgente,
          detalles: {
            tipoServicio: formData.tipoServicio,
            tipoEquipo: formData.tipoEquipo,
            ubicacion: formData.ubicacion,
            descripcion: formData.descripcion,
            ...(['distribucion', 'potencia', 'pad-mounted', 'tipo-poste', 'subestacion'].includes(formData.tipoEquipo) ? {
              potencia: formData.potencia,
              configuracion: formData.configuracion,
              voltajePrimario: formData.voltajePrimario,
              voltajeSecundario: formData.voltajeSecundario,
            } : {}),
          },
        }),
      });

      const result = await res.json();

      if (result.success) {
        setCodigo(result.codigo);
        setIsSubmitted(true);
      } else {
        setErrors((prev) => ({ ...prev, general: result.message || "Error al enviar la solicitud" }));
      }
    } catch {
      setErrors((prev) => ({ ...prev, general: "Error de conexión. Por favor intenta de nuevo." }));
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleInputChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    const { name, value, type } = e.target;
    const checked = (e.target as HTMLInputElement).checked;

    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));

    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const handlePhoneChange = (value: string) => {
    setFormData((prev) => ({ ...prev, telefono: value }));
    if (errors.telefono) setErrors((prev) => ({ ...prev, telefono: "" }));
  };

  const showTransformadorDetails = ['distribucion', 'potencia', 'pad-mounted', 'tipo-poste', 'subestacion'].includes(formData.tipoEquipo);

  const equipoOptions = [
    { value: 'distribucion', label: 'Transformador de Distribución' },
    { value: 'potencia', label: 'Transformador de Potencia' },
    { value: 'pad-mounted', label: 'Pad Mounted' },
    { value: 'tipo-poste', label: 'Tipo Poste' },
    { value: 'subestacion', label: 'Subestación', excludeAlquiler: true },
    { value: 'otro', label: 'Otro' },
  ];

  if (isSubmitted) {
    return (
      <div className="min-h-screen bg-gray-50">
        <section className="relative bg-gradient-to-br from-[#696969] via-[#555555] to-[#4a4a4a] text-white py-16 overflow-hidden">
          <div className="container-eminsa relative">
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex items-center gap-2 text-white/60 text-sm mb-8"
            >
              <Link href="/" className="hover:text-white transition-colors">
                Inicio
              </Link>
              <ChevronRight size={16} />
              <Link
                href="/servicios"
                className="hover:text-white transition-colors"
              >
                Servicios
              </Link>
              <ChevronRight size={16} />
              <span className="text-white">Cotización</span>
            </motion.div>
          </div>
        </section>

        <div className="container-eminsa py-16">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="max-w-2xl mx-auto text-center"
          >
            <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <CheckCircle2 size={40} className="text-green-600" />
            </div>
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">
              ¡Solicitud Enviada Exitosamente!
            </h2>
            {codigo && (
              <div className="bg-[#696969]/5 border border-[#696969]/20 rounded-xl p-4 mb-6">
                <p className="text-xs text-[#696969] uppercase tracking-wider font-semibold mb-1">Número de Referencia</p>
                <p className="text-2xl font-bold text-[#696969] tracking-widest">{codigo}</p>
                <p className="text-xs text-gray-500 mt-1">Guarde este código para dar seguimiento a su solicitud</p>
              </div>
            )}
            <p className="text-gray-600 mb-8 text-lg">
              Hemos recibido su solicitud de cotización. Nuestro equipo de
              expertos se pondrá en contacto con usted en menos de 24 horas
              para discutir sus requerimientos.
            </p>

            <div className="bg-white rounded-2xl p-8 border border-gray-100 shadow-sm mb-8">
              <h3 className="font-bold text-[#001689] mb-4">
                Mientras tanto...
              </h3>
              <div className="space-y-3 text-left">
                <div className="flex items-center gap-3">
                  <CheckCircle2 size={20} className="text-[#696969]" />
                  <span className="text-gray-600">
                    Revise su email para confirmación
                  </span>
                </div>
                <div className="flex items-center gap-3">
                  <CheckCircle2 size={20} className="text-[#696969]" />
                  <span className="text-gray-600">
                    Prepárese con información adicional del equipo
                  </span>
                </div>
                <div className="flex items-center gap-3">
                  <CheckCircle2 size={20} className="text-[#696969]" />
                  <span className="text-gray-600">
                    Si es urgente, contáctenos directamente
                  </span>
                </div>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/servicios"
                className="inline-flex items-center justify-center gap-2 bg-[#696969] hover:bg-[#555555] text-white px-6 py-3 rounded-xl font-semibold transition-colors"
              >
                Ver Nuestros Servicios
              </Link>
              <button
                onClick={() => {
                  setIsSubmitted(false);
                  setFormData({
                    nombre: "",
                    empresa: "",
                    email: "",
                    telefono: "",
                    tipoServicio: "",
                    tipoEquipo: "",
                    ubicacion: "",
                    descripcion: "",
                    urgente: false,
                    potencia: "",
                    configuracion: "",
                    voltajePrimario: "",
                    voltajeSecundario: "",
                  });
                }}
                className="inline-flex items-center justify-center gap-2 border-2 border-[#696969] text-[#696969] hover:bg-[#555555] hover:text-white px-6 py-3 rounded-xl font-semibold transition-colors"
              >
                Nueva Cotización
              </button>
            </div>

            <div className="mt-8 pt-8 border-t border-gray-200">
              <p className="text-sm text-gray-600 mb-4">
                ¿Necesita atención inmediata?
              </p>
              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <a
                  href={`tel:${contactInfo.phone}`}
                  className="inline-flex items-center justify-center gap-2 text-[#001689] hover:text-[#696969] font-medium transition-colors"
                >
                  <Phone size={18} />
                  {contactInfo.phone}
                </a>
                <a
                  href={getWhatsAppUrl()}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 text-[#25D366] hover:text-[#20BD5A] font-medium transition-colors"
                >
                  <MessageCircle size={18} />
                  WhatsApp
                </a>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-[#696969] via-[#555555] to-[#4a4a4a] text-white py-16 lg:py-20 overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div
            className="absolute inset-0"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.4'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
            }}
          />
        </div>

        <div className="container-eminsa relative">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex items-center gap-2 text-white/60 text-sm mb-8"
          >
            <Link href="/" className="hover:text-white transition-colors">
              Inicio
            </Link>
            <ChevronRight size={16} />
            <Link
              href="/servicios"
              className="hover:text-white transition-colors"
            >
              Servicios
            </Link>
            <ChevronRight size={16} />
            <span className="text-white">Cotización</span>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="max-w-3xl"
          >
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 leading-tight">
              Solicitar Cotización
            </h1>
            <p className="text-lg md:text-xl text-white/90 leading-relaxed">
              Complete el formulario a continuación y nuestro equipo de expertos
              le contactará para ofrecerle una solución personalizada.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Form Section */}
      <section className="py-16">
        <div className="container-eminsa">
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Left Column - Form */}
            <div className="lg:col-span-2">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
              >
                <form
                  onSubmit={handleSubmit}
                  className="bg-white rounded-2xl p-6 md:p-8 shadow-sm border border-gray-100"
                >
                  <h2 className="text-2xl font-bold text-[#001689] mb-6">
                    Información de Contacto
                  </h2>

                  <div className="grid md:grid-cols-2 gap-6 mb-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Nombre Completo <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        name="nombre"
                        value={formData.nombre}
                        onChange={handleInputChange}
                        className={`w-full px-4 py-3 rounded-lg border ${
                          errors.nombre
                            ? "border-red-300 focus:border-red-500"
                            : "border-gray-300 focus:border-[#696969]"
                        } focus:outline-none focus:ring-2 focus:ring-[#696969]/20 transition-colors`}
                        placeholder="Juan Pérez"
                      />
                      {errors.nombre && (
                        <p className="mt-1 text-sm text-red-500">
                          {errors.nombre}
                        </p>
                      )}
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Empresa
                      </label>
                      <input
                        type="text"
                        name="empresa"
                        value={formData.empresa}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-[#696969] focus:outline-none focus:ring-2 focus:ring-[#696969]/20 transition-colors"
                        placeholder="Nombre de su empresa"
                      />
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-6 mb-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Email <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        className={`w-full px-4 py-3 rounded-lg border ${
                          errors.email
                            ? "border-red-300 focus:border-red-500"
                            : "border-gray-300 focus:border-[#696969]"
                        } focus:outline-none focus:ring-2 focus:ring-[#696969]/20 transition-colors`}
                        placeholder="juan@ejemplo.com"
                      />
                      {errors.email && (
                        <p className="mt-1 text-sm text-red-500">
                          {errors.email}
                        </p>
                      )}
                    </div>

                    <div>
                      <PhoneInputField
                        value={formData.telefono}
                        onChange={handlePhoneChange}
                        label="Teléfono"
                        required
                        error={errors.telefono}
                        focusColor="#696969"
                      />
                    </div>
                  </div>

                  <div className="border-t border-gray-200 my-8"></div>

                  <h2 className="text-2xl font-bold text-[#001689] mb-6">
                    Detalles del Servicio
                  </h2>

                  <div className="grid md:grid-cols-2 gap-6 mb-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Tipo de Servicio <span className="text-red-500">*</span>
                      </label>
                      <select
                        name="tipoServicio"
                        value={formData.tipoServicio}
                        onChange={handleInputChange}
                        className={`w-full px-4 py-3 rounded-lg border ${
                          errors.tipoServicio
                            ? "border-red-300 focus:border-red-500"
                            : "border-gray-300 focus:border-[#696969]"
                        } focus:outline-none focus:ring-2 focus:ring-[#696969]/20 transition-colors`}
                      >
                        <option value="">Seleccione un servicio...</option>
                        {services.map((service) => (
                          <option key={service.id} value={service.id}>
                            {service.name}
                          </option>
                        ))}
                      </select>
                      {errors.tipoServicio && (
                        <p className="mt-1 text-sm text-red-500">
                          {errors.tipoServicio}
                        </p>
                      )}
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Tipo de Equipo
                      </label>
                      <select
                        name="tipoEquipo"
                        value={formData.tipoEquipo}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-[#696969] focus:outline-none focus:ring-2 focus:ring-[#696969]/20 transition-colors"
                      >
                        <option value="">Seleccione tipo de equipo...</option>
                        {equipoOptions
                          .filter((opt) => !('excludeAlquiler' in opt && opt.excludeAlquiler && formData.tipoServicio === 'alquiler'))
                          .map((opt) => (
                            <option key={opt.value} value={opt.value}>{opt.label}</option>
                          ))
                        }
                      </select>
                    </div>
                  </div>

                  {/* Especificaciones del Transformador — solo cuando se selecciona un tipo de transformador */}
                  {showTransformadorDetails && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      transition={{ duration: 0.3 }}
                      className="mb-6 bg-[#696969]/5 border border-[#696969]/20 rounded-xl p-5 overflow-hidden"
                    >
                      <div className="flex items-center gap-2 mb-4">
                        <Zap className="w-5 h-5 text-[#696969]" />
                        <h3 className="font-semibold text-gray-800">Especificaciones del Equipo</h3>
                      </div>
                      <div className="grid md:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Potencia (kVA)
                          </label>
                          <input
                            type="text"
                            name="potencia"
                            value={formData.potencia}
                            onChange={handleInputChange}
                            className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-[#696969] focus:outline-none focus:ring-2 focus:ring-[#696969]/20 transition-colors"
                            placeholder="Ej: 500 kVA"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Configuración
                          </label>
                          <select
                            name="configuracion"
                            value={formData.configuracion}
                            onChange={handleInputChange}
                            className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-[#696969] focus:outline-none focus:ring-2 focus:ring-[#696969]/20 transition-colors"
                          >
                            <option value="">Seleccione...</option>
                            <option value="monofasico">Monofásico</option>
                            <option value="trifasico">Trifásico</option>
                            <option value="autoprotegido">Autoprotegido (CSP)</option>
                          </select>
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Voltaje Primario (kV)
                          </label>
                          <input
                            type="text"
                            name="voltajePrimario"
                            value={formData.voltajePrimario}
                            onChange={handleInputChange}
                            className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-[#696969] focus:outline-none focus:ring-2 focus:ring-[#696969]/20 transition-colors"
                            placeholder="Ej: 13.2 kV"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Voltaje Secundario (V)
                          </label>
                          <input
                            type="text"
                            name="voltajeSecundario"
                            value={formData.voltajeSecundario}
                            onChange={handleInputChange}
                            className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-[#696969] focus:outline-none focus:ring-2 focus:ring-[#696969]/20 transition-colors"
                            placeholder="Ej: 120/240 V"
                          />
                        </div>
                      </div>
                    </motion.div>
                  )}

                  <div className="mb-6">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Ubicación del Equipo
                    </label>
                    <input
                      type="text"
                      name="ubicacion"
                      value={formData.ubicacion}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-[#696969] focus:outline-none focus:ring-2 focus:ring-[#696969]/20 transition-colors"
                      placeholder="Ciudad, Provincia o Dirección"
                    />
                  </div>

                  <div className="mb-6">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Descripción de Requerimientos{" "}
                      <span className="text-red-500">*</span>
                    </label>
                    <textarea
                      name="descripcion"
                      value={formData.descripcion}
                      onChange={handleInputChange}
                      rows={5}
                      className={`w-full px-4 py-3 rounded-lg border ${
                        errors.descripcion
                          ? "border-red-300 focus:border-red-500"
                          : "border-gray-300 focus:border-[#696969]"
                      } focus:outline-none focus:ring-2 focus:ring-[#696969]/20 transition-colors resize-none`}
                      placeholder="Describa el servicio que necesita, el estado del equipo, síntomas o problemas identificados, y cualquier información relevante..."
                    />
                    {errors.descripcion && (
                      <p className="mt-1 text-sm text-red-500">
                        {errors.descripcion}
                      </p>
                    )}
                  </div>

                  <div className="mb-8">
                    <label className="flex items-center gap-3 cursor-pointer">
                      <input
                        type="checkbox"
                        name="urgente"
                        checked={formData.urgente}
                        onChange={handleInputChange}
                        className="w-5 h-5 rounded border-gray-300 text-[#696969] focus:ring-[#696969]"
                      />
                      <span className="text-sm font-medium text-gray-700">
                        Este servicio es urgente (requiere atención inmediata)
                      </span>
                    </label>
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-[#696969] hover:bg-[#555555] text-white px-8 py-4 rounded-xl font-bold text-lg transition-all shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2 size={20} className="animate-spin" />
                        Enviando...
                      </>
                    ) : (
                      <>
                        <Send size={20} />
                        Enviar Solicitud
                      </>
                    )}
                  </button>
                </form>
              </motion.div>
            </div>

            {/* Right Column - Info Cards */}
            <div className="space-y-6">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100"
              >
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 bg-[#696969]/10 rounded-xl flex items-center justify-center">
                    <Clock size={24} className="text-[#696969]" />
                  </div>
                  <div>
                    <h3 className="font-bold text-[#001689]">
                      Respuesta Rápida
                    </h3>
                    <p className="text-sm text-gray-600">En menos de 24 horas</p>
                  </div>
                </div>
                <p className="text-sm text-gray-600">
                  Nuestro equipo revisará su solicitud y se pondrá en contacto
                  con una cotización personalizada.
                </p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100"
              >
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 bg-[#001689]/10 rounded-xl flex items-center justify-center">
                    <Shield size={24} className="text-[#001689]" />
                  </div>
                  <div>
                    <h3 className="font-bold text-[#001689]">
                      50+ Años de Experiencia
                    </h3>
                    <p className="text-sm text-gray-600">Servicio garantizado</p>
                  </div>
                </div>
                <p className="text-sm text-gray-600">
                  Respaldados por décadas de experiencia en servicios eléctricos
                  especializados.
                </p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100"
              >
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center">
                    <Zap size={24} className="text-green-600" />
                  </div>
                  <div>
                    <h3 className="font-bold text-[#001689]">
                      Servicio de Emergencia
                    </h3>
                    <p className="text-sm text-gray-600">Disponible 24/7</p>
                  </div>
                </div>
                <p className="text-sm text-gray-600 mb-4">
                  Para emergencias, contáctenos directamente:
                </p>
                <div className="space-y-2">
                  <a
                    href={`tel:${contactInfo.phone}`}
                    className="flex items-center gap-2 text-sm text-[#001689] hover:text-[#696969] transition-colors"
                  >
                    <Phone size={16} />
                    {contactInfo.phone}
                  </a>
                  <a
                    href={getWhatsAppUrl()}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 text-sm text-[#25D366] hover:text-[#20BD5A] transition-colors"
                  >
                    <MessageCircle size={16} />
                    WhatsApp
                  </a>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 }}
                className="bg-gradient-to-br from-[#696969] to-[#4a4a4a] rounded-2xl p-6 text-white"
              >
                <Settings size={32} className="mb-4 opacity-80" />
                <h3 className="font-bold text-lg mb-2">
                  ¿Necesita Ayuda para Completar el Formulario?
                </h3>
                <p className="text-white/90 text-sm mb-4">
                  Nuestro equipo puede asistirle telefónicamente para recopilar
                  la información necesaria.
                </p>
                <a
                  href={`tel:${contactInfo.phone}`}
                  className="inline-flex items-center gap-2 bg-white text-[#696969] px-4 py-2 rounded-lg font-semibold hover:bg-white/90 transition-colors text-sm"
                >
                  <Phone size={16} />
                  Llamar Ahora
                </a>
              </motion.div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
