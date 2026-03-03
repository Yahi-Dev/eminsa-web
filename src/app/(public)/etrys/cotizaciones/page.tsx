"use client";

import { useState, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  ArrowRight,
  ChevronRight,
  Home,
  CheckCircle2,
  Phone,
  MessageCircle,
  Mail,
  MapPin,
  Clock,
  Loader2,
  Upload,
  X,
} from "lucide-react";
import { contactInfo } from "@/config/navigation";
import { getWhatsAppUrl } from "@/utils/whatsapp";
import { PhoneInputField } from "@/components/ui/PhoneInputField";

function CotizacionesForm() {
  const searchParams = useSearchParams();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [codigo, setCodigo] = useState("");
  const [submitError, setSubmitError] = useState("");
  const [files, setFiles] = useState<File[]>([]);
  const [formData, setFormData] = useState({
    // Contact info
    nombre: "",
    empresa: "",
    email: "",
    telefono: "",
    cargo: "",
    // Service details
    tipoServicio: "",
    tipoProducto: "",
    marca: "",
    potencia: "",
    voltajePrimario: "",
    voltajeSecundario: "",
    cantidadUnidades: "1",
    urgencia: "normal",
    // Additional
    ubicacion: "",
    descripcion: "",
    comoNosConocio: "",
  });

  useEffect(() => {
    const servicio = searchParams.get("servicio");
    const producto = searchParams.get("producto");
    const nombre = searchParams.get("nombre");
    const email = searchParams.get("email");
    const telefono = searchParams.get("telefono");
    setFormData((prev) => ({
      ...prev,
      ...(servicio && { tipoServicio: servicio }),
      ...(producto && { tipoProducto: producto }),
      ...(nombre && { nombre }),
      ...(email && { email }),
      ...(telefono && { telefono }),
    }));
  }, [searchParams]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitError("");

    try {
      const res = await fetch('/api/cotizaciones', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          unidad: 'RST',
          nombre: formData.nombre,
          empresa: formData.empresa || undefined,
          email: formData.email,
          telefono: formData.telefono,
          urgente: formData.urgencia === 'urgente',
          detalles: {
            tipoServicio: formData.tipoServicio,
            tipoProducto: formData.tipoProducto,
            marca: formData.marca,
            potencia: formData.potencia,
            voltajePrimario: formData.voltajePrimario,
            voltajeSecundario: formData.voltajeSecundario,
            cantidadUnidades: formData.cantidadUnidades,
            urgencia: formData.urgencia,
            cargo: formData.cargo,
            ubicacion: formData.ubicacion,
            descripcion: formData.descripcion,
            comoNosConocio: formData.comoNosConocio,
            ...(files.length > 0 && {
              archivos: files.map(f => `${f.name} (${(f.size / 1024).toFixed(1)} KB)`).join(' • '),
            }),
          },
        }),
      });

      const json = await res.json();
      if (!json.success) throw new Error(json.message || 'Error al enviar');
      setCodigo(json.codigo);
      setIsSuccess(true);
    } catch (err) {
      setSubmitError(err instanceof Error ? err.message : 'Error de conexión. Intente de nuevo.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handlePhoneChange = (value: string) => {
    setFormData((prev) => ({ ...prev, telefono: value }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const newFiles = Array.from(e.target.files);
      setFiles((prev) => [...prev, ...newFiles].slice(0, 5));
    }
  };

  const removeFile = (index: number) => {
    setFiles((prev) => prev.filter((_, i) => i !== index));
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
          {codigo && (
            <div className="bg-[#0099ce]/5 border border-[#0099ce]/20 rounded-xl p-4 mb-4">
              <p className="text-xs text-[#0099ce] uppercase tracking-wider font-semibold mb-1">Número de Referencia</p>
              <p className="text-2xl font-bold text-[#0099ce] tracking-widest">{codigo}</p>
              <p className="text-xs text-gray-500 mt-1">Guarde este código para dar seguimiento a su solicitud</p>
            </div>
          )}
          <p className="text-gray-600 mb-6">
            Hemos recibido su solicitud de cotización. Nuestro equipo le contactará
            en breve con un presupuesto personalizado.
          </p>
          <div className="bg-[#0099ce]/10 rounded-xl p-4 mb-6">
            <p className="text-sm text-gray-700">
              <strong>Tiempo de respuesta estimado:</strong><br />
              Menos de 30 minutos en horario laboral
            </p>
          </div>
          <div className="space-y-3">
            <Link
              href="/etrys"
              className="block w-full px-6 py-3 bg-[#0099ce] hover:bg-[#007ba8] text-white font-semibold rounded-xl transition-colors"
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
      <section className="bg-gradient-to-br from-[#0099ce] via-[#007ba8] to-[#00269b] text-white py-12 lg:py-16">
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
            <h1 className="text-3xl md:text-4xl xl:text-5xl font-bold mb-4">
              Solicitar Cotización
            </h1>
            <p className="text-lg text-white/90">
              Complete el formulario y reciba un presupuesto personalizado en 
              menos de 30 minutos durante horario laboral.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Form Section */}
      <section className="py-12 lg:py-16">
        <div className="container-eminsa">
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Form */}
            <div className="lg:col-span-2">
              <motion.form
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                onSubmit={handleSubmit}
                className="bg-white rounded-2xl p-6 lg:p-8 shadow-lg"
              >
                {/* Section: Información de Contacto */}
                <div className="mb-8">
                  <h2 className="text-xl font-bold text-gray-900 mb-4 pb-2 border-b">
                    Información de Contacto
                  </h2>
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1.5">
                        Nombre Completo *
                      </label>
                      <input
                        type="text"
                        name="nombre"
                        required
                        value={formData.nombre}
                        onChange={handleChange}
                        className="w-full px-4 py-2.5 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#0099ce] focus:border-transparent transition-all"
                        placeholder="Ej: Juan Pérez"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1.5">
                        Empresa
                      </label>
                      <input
                        type="text"
                        name="empresa"
                        value={formData.empresa}
                        onChange={handleChange}
                        className="w-full px-4 py-2.5 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#0099ce] focus:border-transparent transition-all"
                        placeholder="Nombre de su empresa"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1.5">
                        Email *
                      </label>
                      <input
                        type="email"
                        name="email"
                        required
                        value={formData.email}
                        onChange={handleChange}
                        className="w-full px-4 py-2.5 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#0099ce] focus:border-transparent transition-all"
                        placeholder="correo@ejemplo.com"
                      />
                    </div>
                    <div>
                      <PhoneInputField
                        value={formData.telefono}
                        onChange={handlePhoneChange}
                        label="Teléfono"
                        required
                        focusColor="#0099ce"
                      />
                    </div>
                    <div className="sm:col-span-2">
                      <label className="block text-sm font-medium text-gray-700 mb-1.5">
                        Cargo / Posición
                      </label>
                      <input
                        type="text"
                        name="cargo"
                        value={formData.cargo}
                        onChange={handleChange}
                        className="w-full px-4 py-2.5 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#0099ce] focus:border-transparent transition-all"
                        placeholder="Ej: Gerente de Mantenimiento"
                      />
                    </div>
                  </div>
                </div>

                {/* Section: Detalles del Servicio */}
                <div className="mb-8">
                  <h2 className="text-xl font-bold text-gray-900 mb-4 pb-2 border-b">
                    Detalles del Servicio
                  </h2>
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1.5">
                        Tipo de Servicio *
                      </label>
                      <select
                        name="tipoServicio"
                        required
                        value={formData.tipoServicio}
                        onChange={handleChange}
                        className="w-full px-4 py-2.5 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#0099ce] focus:border-transparent transition-all"
                      >
                        <option value="">Seleccione...</option>
                        <option value="remanufactura">Remanufactura de Transformador</option>
                        <option value="reparacion">Reparación de Transformador</option>
                        <option value="alquiler">Alquiler de Transformador</option>
                        <option value="diagnostico">Diagnóstico / Evaluación</option>
                        <option value="mantenimiento">Mantenimiento Preventivo</option>
                        <option value="otro">Otro</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1.5">
                        Tipo de Transformador
                      </label>
                      <select
                        name="tipoProducto"
                        value={formData.tipoProducto}
                        onChange={handleChange}
                        className="w-full px-4 py-2.5 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#0099ce] focus:border-transparent transition-all"
                      >
                        <option value="">Seleccione...</option>
                        <option value="tipo-poste">Tipo Poste</option>
                        <option value="pad-mounted">Pad-Mounted</option>
                        <option value="subestacion">Subestación</option>
                        <option value="seco">Seco</option>
                        <option value="otro">Otro / No estoy seguro</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1.5">
                        Marca del Equipo
                      </label>
                      <input
                        type="text"
                        name="marca"
                        value={formData.marca}
                        onChange={handleChange}
                        className="w-full px-4 py-2.5 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#0099ce] focus:border-transparent transition-all"
                        placeholder="Ej: MTN, ABB, Siemens..."
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1.5">
                        Potencia (kVA)
                      </label>
                      <input
                        type="text"
                        name="potencia"
                        value={formData.potencia}
                        onChange={handleChange}
                        className="w-full px-4 py-2.5 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#0099ce] focus:border-transparent transition-all"
                        placeholder="Ej: 500 kVA"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1.5">
                        Voltaje Primario (kV)
                      </label>
                      <input
                        type="text"
                        name="voltajePrimario"
                        value={formData.voltajePrimario}
                        onChange={handleChange}
                        className="w-full px-4 py-2.5 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#0099ce] focus:border-transparent transition-all"
                        placeholder="Ej: 13.2 kV"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1.5">
                        Voltaje Secundario (V)
                      </label>
                      <input
                        type="text"
                        name="voltajeSecundario"
                        value={formData.voltajeSecundario}
                        onChange={handleChange}
                        className="w-full px-4 py-2.5 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#0099ce] focus:border-transparent transition-all"
                        placeholder="Ej: 120/240 V"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1.5">
                        Cantidad de Unidades
                      </label>
                      <input
                        type="number"
                        name="cantidadUnidades"
                        min="1"
                        value={formData.cantidadUnidades}
                        onChange={handleChange}
                        className="w-full px-4 py-2.5 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#0099ce] focus:border-transparent transition-all"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1.5">
                        Urgencia
                      </label>
                      <select
                        name="urgencia"
                        value={formData.urgencia}
                        onChange={handleChange}
                        className="w-full px-4 py-2.5 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#0099ce] focus:border-transparent transition-all"
                      >
                        <option value="normal">Normal (2-4 semanas)</option>
                        <option value="prioritario">Prioritario (1-2 semanas)</option>
                        <option value="urgente">Urgente (menos de 1 semana)</option>
                      </select>
                    </div>
                  </div>
                </div>

                {/* Section: Información Adicional */}
                <div className="mb-8">
                  <h2 className="text-xl font-bold text-gray-900 mb-4 pb-2 border-b">
                    Información Adicional
                  </h2>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1.5">
                        Ubicación del Equipo
                      </label>
                      <input
                        type="text"
                        name="ubicacion"
                        value={formData.ubicacion}
                        onChange={handleChange}
                        className="w-full px-4 py-2.5 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#0099ce] focus:border-transparent transition-all"
                        placeholder="Ciudad, Provincia"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1.5">
                        Descripción del Problema / Requerimiento
                      </label>
                      <textarea
                        name="descripcion"
                        value={formData.descripcion}
                        onChange={handleChange}
                        rows={4}
                        className="w-full px-4 py-2.5 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#0099ce] focus:border-transparent transition-all resize-none"
                        placeholder="Describa el problema, síntomas, historial de fallas, o cualquier información relevante..."
                      />
                    </div>
                    
                    {/* File Upload */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1.5">
                        Adjuntar Archivos (opcional)
                      </label>
                      <div className="border-2 border-dashed border-gray-300 rounded-xl p-4 hover:border-[#0099ce] transition-colors">
                        <input
                          type="file"
                          multiple
                          accept=".pdf,.doc,.docx,.jpg,.jpeg,.png"
                          onChange={handleFileChange}
                          className="hidden"
                          id="file-upload"
                        />
                        <label
                          htmlFor="file-upload"
                          className="flex flex-col items-center cursor-pointer"
                        >
                          <Upload size={32} className="text-gray-400 mb-2" />
                          <span className="text-sm text-gray-600">
                            Haga clic para subir archivos
                          </span>
                          <span className="text-xs text-gray-400 mt-1">
                            PDF, DOC, JPG, PNG (máx. 5 archivos)
                          </span>
                        </label>
                      </div>
                      {files.length > 0 && (
                        <div className="mt-3 space-y-2">
                          {files.map((file, index) => (
                            <div
                              key={index}
                              className="flex items-center justify-between bg-gray-50 rounded-lg px-3 py-2"
                            >
                              <span className="text-sm text-gray-700 truncate">
                                {file.name}
                              </span>
                              <button
                                type="button"
                                onClick={() => removeFile(index)}
                                className="p-1 hover:bg-gray-200 rounded transition-colors"
                              >
                                <X size={16} className="text-gray-500" />
                              </button>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1.5">
                        ¿Cómo nos conoció?
                      </label>
                      <select
                        name="comoNosConocio"
                        value={formData.comoNosConocio}
                        onChange={handleChange}
                        className="w-full px-4 py-2.5 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#0099ce] focus:border-transparent transition-all"
                      >
                        <option value="">Seleccione...</option>
                        <option value="google">Google / Búsqueda web</option>
                        <option value="referido">Referido por un cliente</option>
                        <option value="redes">Redes sociales</option>
                        <option value="evento">Evento / Feria</option>
                        <option value="publicidad">Publicidad</option>
                        <option value="otro">Otro</option>
                      </select>
                    </div>
                  </div>
                </div>

                {/* General error */}
                {submitError && (
                  <div className="bg-red-50 border border-red-200 text-red-700 rounded-xl px-4 py-3 text-sm">
                    {submitError}
                  </div>
                )}

                {/* Submit */}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full px-6 py-4 bg-[#0099ce] hover:bg-[#007ba8] disabled:bg-[#0099ce]/50 text-white font-semibold rounded-xl transition-colors flex items-center justify-center gap-2"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 size={20} className="animate-spin" />
                      Enviando solicitud...
                    </>
                  ) : (
                    <>
                      Enviar Solicitud de Cotización
                      <ArrowRight size={20} />
                    </>
                  )}
                </button>
              </motion.form>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Contact Card */}
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
                    className="flex items-center gap-3 p-3 bg-gray-50 rounded-xl hover:bg-[#0099ce]/10 transition-colors"
                  >
                    <div className="w-10 h-10 rounded-lg bg-[#0099ce]/20 flex items-center justify-center">
                      <Phone size={20} className="text-[#0099ce]" />
                    </div>
                    <div>
                      <span className="text-xs text-gray-500 block">Teléfono</span>
                      <span className="font-semibold text-gray-900">{contactInfo.phone}</span>
                    </div>
                  </a>
                  <a
                    href={`mailto:${contactInfo.email}`}
                    className="flex items-center gap-3 p-3 bg-gray-50 rounded-xl hover:bg-[#0099ce]/10 transition-colors"
                  >
                    <div className="w-10 h-10 rounded-lg bg-[#0099ce]/20 flex items-center justify-center">
                      <Mail size={20} className="text-[#0099ce]" />
                    </div>
                    <div>
                      <span className="text-xs text-gray-500 block">Email</span>
                      <span className="font-semibold text-gray-900 text-sm">{contactInfo.email}</span>
                    </div>
                  </a>
                  <a
                    href={getWhatsAppUrl()}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center gap-2 w-full px-4 py-3 bg-[#25D366] hover:bg-[#20BD5A] text-white font-semibold rounded-xl transition-colors"
                  >
                    <MessageCircle size={20} />
                    WhatsApp
                  </a>
                </div>
              </motion.div>

              {/* Response Time */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="bg-[#0099ce]/10 rounded-2xl p-6"
              >
                <div className="flex items-center gap-3 mb-3">
                  <Clock size={24} className="text-[#0099ce]" />
                  <h3 className="font-bold text-gray-900">Respuesta Rápida</h3>
                </div>
                <p className="text-gray-600 text-sm">
                  Respondemos en menos de <strong>30 minutos</strong> durante 
                  horario laboral (Lunes a Viernes 8am - 5pm).
                </p>
              </motion.div>

              {/* Location */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="bg-white rounded-2xl p-6 shadow-lg"
              >
                <div className="flex items-center gap-3 mb-3">
                  <MapPin size={24} className="text-[#0099ce]" />
                  <h3 className="font-bold text-gray-900">Ubicación</h3>
                </div>
                <p className="text-gray-600 text-sm">
                  {contactInfo.address}
                </p>
              </motion.div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default function EtrysCotizacionesPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <Loader2 size={40} className="animate-spin text-[#0099ce]" />
      </div>
    }>
      <CotizacionesForm />
    </Suspense>
  );
}
