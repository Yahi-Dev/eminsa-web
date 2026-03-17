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
  Upload,
  X,
  AlertCircle,
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
    distribuidora: "",
  });

  const [files, setFiles] = useState<File[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [codigo, setCodigo] = useState("");
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.nombre.trim()) newErrors.nombre = "El nombre es requerido";
    if (!formData.email.trim()) newErrors.email = "El correo electrónico es requerido";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Correo electrónico inválido";
    }
    if (!formData.telefono.trim()) newErrors.telefono = "El teléfono es requerido";
    if (!formData.tipoServicio) newErrors.tipoServicio = "Seleccione el tipo de servicio";
    if (!formData.descripcion.trim()) newErrors.descripcion = "La descripción es requerida";

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
              distribuidora: formData.distribuidora,
            } : {}),
            ...(files.length > 0 && {
              archivos: files.map(f => `${f.name} (${(f.size / 1024).toFixed(1)} KB)`).join(' • '),
            }),
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
      setErrors((prev) => ({ ...prev, general: "Error de conexión. Intente nuevamente." }));
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
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

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const newFiles = Array.from(e.target.files);
      setFiles(prev => [...prev, ...newFiles].slice(0, 5));
    }
  };

  const removeFile = (index: number) => {
    setFiles(prev => prev.filter((_, i) => i !== index));
  };

  const showTransformadorDetails = ['distribucion', 'potencia', 'pad-mounted', 'tipo-poste', 'subestacion'].includes(formData.tipoEquipo);

  const equipoOptions = [
    { value: 'distribucion', label: 'Transformador de distribución' },
    { value: 'potencia', label: 'Transformador de potencia' },
    { value: 'pad-mounted', label: 'Transformador Pad-Mounted' },
    { value: 'tipo-poste', label: 'Transformador tipo poste' },
    { value: 'subestacion', label: 'Transformador de subestación', excludeAlquiler: true },
    { value: 'otro', label: 'Otro tipo de equipo' },
  ];

  if (isSubmitted) {
    return (
      <div className="min-h-screen bg-gray-50">
        {/* Hero */}
        <section className="bg-[#6d6e6d] text-white py-16">
          <div className="container-eminsa">
            <nav className="flex items-center gap-2 text-white/60 text-sm">
              <Link href="/" className="hover:text-white transition-colors">Inicio</Link>
              <ChevronRight size={16} />
              <Link href="/servicios" className="hover:text-white transition-colors">Servicios</Link>
              <ChevronRight size={16} />
              <span className="text-white">Cotización</span>
            </nav>
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
              ¡Solicitud enviada exitosamente!
            </h2>
            {codigo && (
              <div className="bg-[#00269b]/5 border border-[#00269b]/20 rounded-xl p-4 mb-6">
                <p className="text-xs text-[#00269b] uppercase tracking-wider font-semibold mb-1">Número de referencia</p>
                <p className="text-2xl font-bold text-[#00269b] tracking-widest">{codigo}</p>
                <p className="text-xs text-gray-500 mt-1">Guarde este código para seguimiento</p>
              </div>
            )}
            <p className="text-gray-600 mb-8 text-lg">
              Nuestro equipo revisará su solicitud y le contactará a la brevedad para coordinar los detalles del servicio.
            </p>

            <div className="bg-white rounded-2xl p-8 border border-gray-100 shadow-sm mb-8">
              <h3 className="font-bold text-[#00269b] mb-4">Mientras tanto...</h3>
              <div className="space-y-3 text-left">
                <div className="flex items-center gap-3">
                  <CheckCircle2 size={20} className="text-[#00269b]" />
                  <span className="text-gray-600">Revise su correo electrónico para confirmación</span>
                </div>
                <div className="flex items-center gap-3">
                  <CheckCircle2 size={20} className="text-[#00269b]" />
                  <span className="text-gray-600">Prepare información técnica del equipo si la tiene</span>
                </div>
                <div className="flex items-center gap-3">
                  <CheckCircle2 size={20} className="text-[#00269b]" />
                  <span className="text-gray-600">Para urgencias, contáctenos directamente por teléfono</span>
                </div>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/servicios"
                className="inline-flex items-center justify-center gap-2 bg-[#00269b] hover:bg-[#575857] text-white px-6 py-3 rounded-xl font-semibold transition-colors"
              >
                Ver nuestros servicios
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
                    distribuidora: "",
                  });
                  setFiles([]);
                }}
                className="inline-flex items-center justify-center gap-2 border-2 border-[#00269b] text-[#00269b] hover:bg-[#575857] hover:text-white px-6 py-3 rounded-xl font-semibold transition-colors"
              >
                Nueva cotización
              </button>
            </div>

            <div className="mt-8 pt-8 border-t border-gray-200">
              <p className="text-sm text-gray-600 mb-4">¿Necesita atención inmediata?</p>
              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <a
                  href={`tel:${contactInfo.phone}`}
                  className="inline-flex items-center justify-center gap-2 text-[#00269b] font-medium transition-colors"
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
      <section className="bg-[#6d6e6d] text-white py-16 lg:py-20 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div
            className="absolute inset-0"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.4'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
            }}
          />
        </div>

        <div className="container-eminsa relative">
          <motion.nav
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex items-center gap-2 text-white/60 text-sm mb-8"
          >
            <Link href="/" className="hover:text-white transition-colors">Inicio</Link>
            <ChevronRight size={16} />
            <Link href="/servicios" className="hover:text-white transition-colors">Servicios</Link>
            <ChevronRight size={16} />
            <span className="text-white">Cotización</span>
          </motion.nav>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="max-w-3xl"
          >
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 bg-white/10 rounded-xl flex items-center justify-center">
                <Settings size={24} />
              </div>
              <span className="text-white/80 font-semibold">Solicitar cotización</span>
            </div>
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 leading-tight">
              Cotización de Servicios Técnicos
            </h1>
            <p className="text-lg md:text-xl text-white/90 leading-relaxed">
              Mantenimiento, reparación y servicios especializados para transformadores y equipos eléctricos. Reciba una propuesta rápida de nuestros técnicos.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Form Section */}
      <section className="py-16 lg:py-20">
        <div className="container-eminsa">
          <div className="grid lg:grid-cols-5 gap-12">
            {/* Form — 3 columns */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="lg:col-span-3"
            >
              <div className="bg-white rounded-3xl shadow-xl p-8 lg:p-10">
                <form onSubmit={handleSubmit} className="space-y-8">

                  {/* Error general */}
                  {errors.general && (
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="bg-red-50 border border-red-200 rounded-lg p-4 flex items-start gap-3"
                    >
                      <AlertCircle className="w-5 h-5 text-red-600 shrink-0 mt-0.5" />
                      <p className="text-red-700 text-sm">{errors.general}</p>
                    </motion.div>
                  )}

                  {/* Sección 1: Información de Contacto */}
                  <div>
                    <h2 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-3">
                      <div className="w-8 h-8 bg-[#00269b] text-white rounded-lg flex items-center justify-center text-sm font-bold shrink-0">1</div>
                      Información de Contacto
                    </h2>
                    <div className="grid md:grid-cols-2 gap-6">
                      <div>
                        <label className="input-label">
                          Nombre completo <span className="text-red-500">*</span>
                        </label>
                        <input
                          type="text"
                          name="nombre"
                          value={formData.nombre}
                          onChange={handleInputChange}
                          className={`input-field ${errors.nombre ? 'border-red-500 focus:ring-red-200' : ''}`}
                          placeholder="Ej. Juan Pérez"
                        />
                        {errors.nombre && <p className="text-red-500 text-xs mt-1">{errors.nombre}</p>}
                      </div>
                      <div>
                        <label className="input-label">Empresa / Organización</label>
                        <input
                          type="text"
                          name="empresa"
                          value={formData.empresa}
                          onChange={handleInputChange}
                          className="input-field"
                          placeholder="Nombre de su empresa (opcional)"
                        />
                      </div>
                      <div>
                        <label className="input-label">
                          Correo electrónico <span className="text-red-500">*</span>
                        </label>
                        <input
                          type="email"
                          name="email"
                          value={formData.email}
                          onChange={handleInputChange}
                          className={`input-field ${errors.email ? 'border-red-500 focus:ring-red-200' : ''}`}
                          placeholder="correo@empresa.com"
                        />
                        {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
                      </div>
                      <div>
                        <PhoneInputField
                          value={formData.telefono}
                          onChange={handlePhoneChange}
                          label="Teléfono"
                          required
                          error={errors.telefono}
                          focusColor="#00269b"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Sección 2: Detalles del Servicio */}
                  <div>
                    <h2 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-3">
                      <div className="w-8 h-8 bg-[#00269b] text-white rounded-lg flex items-center justify-center text-sm font-bold shrink-0">2</div>
                      Detalles del Servicio
                    </h2>
                    <div className="grid md:grid-cols-2 gap-6">
                      <div>
                        <label className="input-label">
                          Tipo de servicio <span className="text-red-500">*</span>
                        </label>
                        <select
                          name="tipoServicio"
                          value={formData.tipoServicio}
                          onChange={handleInputChange}
                          className={`input-field ${errors.tipoServicio ? 'border-red-500 focus:ring-red-200' : ''}`}
                        >
                          <option value="">Seleccione un servicio</option>
                          {services.map((service) => (
                            <option key={service.id} value={service.id}>
                              {service.name}
                            </option>
                          ))}
                        </select>
                        {errors.tipoServicio && <p className="text-red-500 text-xs mt-1">{errors.tipoServicio}</p>}
                      </div>
                      <div>
                        <label className="input-label">Tipo de equipo</label>
                        <select
                          name="tipoEquipo"
                          value={formData.tipoEquipo}
                          onChange={handleInputChange}
                          className="input-field"
                        >
                          <option value="">Seleccione el equipo</option>
                          {equipoOptions
                            .filter((opt) => !('excludeAlquiler' in opt && opt.excludeAlquiler && formData.tipoServicio === 'alquiler'))
                            .map((opt) => (
                              <option key={opt.value} value={opt.value}>{opt.label}</option>
                            ))
                          }
                        </select>
                      </div>
                    </div>

                    {/* Especificaciones del Transformador */}
                    {showTransformadorDetails && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        transition={{ duration: 0.3 }}
                        className="mt-6 bg-[#00269b]/5 border border-[#00269b]/20 rounded-xl p-5 overflow-hidden"
                      >
                        <div className="flex items-center gap-2 mb-5">
                          <Zap className="w-5 h-5 text-[#00269b]" />
                          <h3 className="font-semibold text-gray-800">Especificaciones del equipo</h3>
                        </div>
                        <div className="grid md:grid-cols-2 gap-6">
                          <div>
                            <label className="input-label">Potencia</label>
                            <input
                              type="text"
                              name="potencia"
                              value={formData.potencia}
                              onChange={handleInputChange}
                              className="input-field"
                              placeholder="Ej. 500 kVA"
                            />
                          </div>
                          <div>
                            <label className="input-label">Configuración</label>
                            <select
                              name="configuracion"
                              value={formData.configuracion}
                              onChange={handleInputChange}
                              className="input-field"
                            >
                              <option value="">Seleccione</option>
                              <option value="monofasico">Monofásico</option>
                              <option value="trifasico">Trifásico</option>
                              <option value="autoprotegido">Autoprotegido</option>
                            </select>
                          </div>
                          <div>
                            <label className="input-label">Voltaje primario</label>
                            <input
                              type="text"
                              name="voltajePrimario"
                              value={formData.voltajePrimario}
                              onChange={handleInputChange}
                              className="input-field"
                              placeholder="Ej. 13,200 V"
                            />
                          </div>
                          <div>
                            <label className="input-label">Voltaje secundario</label>
                            <input
                              type="text"
                              name="voltajeSecundario"
                              value={formData.voltajeSecundario}
                              onChange={handleInputChange}
                              className="input-field"
                              placeholder="Ej. 120/240 V"
                            />
                          </div>
                          <div className="md:col-span-2">
                            <label className="input-label">Distribuidora de energía</label>
                            <select
                              name="distribuidora"
                              value={formData.distribuidora}
                              onChange={handleInputChange}
                              className="input-field"
                            >
                              <option value="">Seleccione la distribuidora</option>
                              <option value="EDENORTE">EDENORTE</option>
                              <option value="EDESUR">EDESUR</option>
                              <option value="EDEESTE">EDEESTE</option>
                              <option value="CEPM">CEPM</option>
                              <option value="CAPCANA">CAPCANA</option>
                              <option value="USO INTERNO">Uso interno</option>
                              <option value="OTROS">Otros (especificar)</option>
                            </select>
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </div>

                  {/* Sección 3: Descripción y Detalles */}
                  <div>
                    <h2 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-3">
                      <div className="w-8 h-8 bg-[#00269b] text-white rounded-lg flex items-center justify-center text-sm font-bold shrink-0">3</div>
                      Descripción y Detalles
                    </h2>
                    <div className="space-y-6">
                      <div>
                        <label className="input-label">Ubicación del equipo</label>
                        <input
                          type="text"
                          name="ubicacion"
                          value={formData.ubicacion}
                          onChange={handleInputChange}
                          className="input-field"
                          placeholder="Ciudad, provincia o dirección del proyecto"
                        />
                      </div>

                      <div>
                        <label className="input-label">
                          Descripción de requerimientos <span className="text-red-500">*</span>
                        </label>
                        <textarea
                          name="descripcion"
                          value={formData.descripcion}
                          onChange={handleInputChange}
                          rows={5}
                          className={`input-field resize-none ${errors.descripcion ? 'border-red-500 focus:ring-red-200' : ''}`}
                          placeholder="Describa el problema, el trabajo a realizar o los requerimientos específicos del servicio..."
                        />
                        {errors.descripcion && <p className="text-red-500 text-xs mt-1">{errors.descripcion}</p>}
                      </div>

                      <div>
                        <label className="input-label">Adjuntar documento (opcional)</label>
                        <div className="border-2 border-dashed border-gray-300 rounded-xl p-4 hover:border-[#00269b] transition-colors">
                          <input
                            type="file"
                            multiple
                            accept=".pdf,.doc,.docx,.jpg,.jpeg,.png,.xlsx,.xls"
                            onChange={handleFileChange}
                            className="hidden"
                            id="file-upload-srv"
                          />
                          <label htmlFor="file-upload-srv" className="flex flex-col items-center cursor-pointer">
                            <Upload size={32} className="text-gray-400 mb-2" />
                            <span className="text-sm text-gray-600">Haga clic para subir archivos</span>
                            <span className="text-xs text-gray-400 mt-1">PDF, DOC, JPG, PNG, XLSX (máx. 5 archivos)</span>
                          </label>
                        </div>
                        {files.length > 0 && (
                          <div className="mt-3 space-y-2">
                            {files.map((file, index) => (
                              <div key={index} className="flex items-center justify-between bg-gray-50 rounded-lg px-3 py-2">
                                <span className="text-sm text-gray-700 truncate">{file.name}</span>
                                <button type="button" onClick={() => removeFile(index)} className="p-1 hover:bg-gray-200 rounded transition-colors">
                                  <X size={16} className="text-gray-500" />
                                </button>
                              </div>
                            ))}
                          </div>
                        )}
                      </div>

                      <label className="flex items-center gap-3 cursor-pointer">
                        <input
                          type="checkbox"
                          name="urgente"
                          checked={formData.urgente}
                          onChange={handleInputChange}
                          className="w-5 h-5 rounded border-gray-300 text-[#00269b] focus:ring-[#00269b]"
                        />
                        <span className="text-sm text-gray-700">
                          <span className="font-semibold text-[#00269b]">Servicio urgente</span> — Requiero atención prioritaria o de emergencia
                        </span>
                      </label>
                    </div>
                  </div>

                  {/* Submit */}
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="btn-primary w-full justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isSubmitting ? (
                      <>
                        <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                        Enviando solicitud...
                      </>
                    ) : (
                      <>
                        <Send size={18} />
                        Enviar solicitud de servicio
                      </>
                    )}
                  </button>
                </form>
              </div>
            </motion.div>

            {/* Sidebar — 2 columns */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="lg:col-span-2 space-y-6"
            >
              {/* Quick Response */}
              <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 bg-[#00269b]/10 rounded-xl flex items-center justify-center">
                    <Clock size={24} className="text-[#00269b]" />
                  </div>
                  <div>
                    <h3 className="font-bold text-[#00269b]">Respuesta rápida</h3>
                    <p className="text-sm text-gray-600">Menos de 2 horas hábiles</p>
                  </div>
                </div>
                <p className="text-sm text-gray-600">
                  Nuestro equipo técnico revisa cada solicitud de forma personalizada para ofrecerle la mejor solución.
                </p>
              </div>

              {/* Experience */}
              <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 bg-[#00269b]/10 rounded-xl flex items-center justify-center">
                    <Shield size={24} className="text-[#00269b]" />
                  </div>
                  <div>
                    <h3 className="font-bold text-[#00269b]">Más de 30 años</h3>
                    <p className="text-sm text-gray-600">de experiencia en el sector</p>
                  </div>
                </div>
                <p className="text-sm text-gray-600">
                  Expertos certificados en mantenimiento, reparación y rehabilitación de transformadores eléctricos.
                </p>
              </div>

              {/* Emergency */}
              <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center">
                    <Zap size={24} className="text-green-600" />
                  </div>
                  <div>
                    <h3 className="font-bold text-[#00269b]">Servicio de emergencia</h3>
                    <p className="text-sm text-gray-600">Disponible 24/7</p>
                  </div>
                </div>
                <p className="text-sm text-gray-600 mb-4">
                  Para emergencias que no pueden esperar, contáctenos directamente.
                </p>
                <div className="space-y-2">
                  <a
                    href={`tel:${contactInfo.phone}`}
                    className="flex items-center gap-2 text-sm text-[#00269b] transition-colors"
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
              </div>

              {/* CTA Card */}
              <div className="bg-[#00269b] rounded-2xl p-6 text-white">
                <Settings size={32} className="mb-4 opacity-80" />
                <h3 className="font-bold text-lg mb-2">¿Necesita ayuda para describir su requerimiento?</h3>
                <p className="text-white/90 text-sm mb-4">
                  Nuestros técnicos pueden orientarle por teléfono sobre qué información es necesaria.
                </p>
                <a
                  href={`tel:${contactInfo.phone}`}
                  className="inline-flex items-center gap-2 bg-white text-[#00269b] px-4 py-2 rounded-lg font-semibold hover:bg-white/90 transition-colors text-sm"
                >
                  <Phone size={16} />
                  Llamar ahora
                </a>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
}
