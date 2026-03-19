"use client";

import { useState, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { motion } from "framer-motion";
import {
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
  Send,
  AlertCircle,
  Zap,
  Shield,
} from "lucide-react";
import { contactInfo } from "@/config/navigation";
import { getWhatsAppUrl } from "@/utils/whatsapp";
import { PhoneInputField } from "@/components/ui/PhoneInputField";
import { TransformerFields } from "@/features/contact";
import type { TransformerSpec, ContactFormState, FormErrors } from "@/features/contact/types";
import { FASES, TIPOS_TRANSFORMADORES, NORMAS, ZONAS_INSTALACION } from "@/features/contact/data/constants";
import { useTranslations } from "next-intl";

function CotizacionesForm() {
  const searchParams = useSearchParams();
  const t = useTranslations("contact");
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
    distribuidora: "",
    urgencia: "normal",
    // Additional
    ubicacion: "",
    descripcion: "",
    comoNosConocio: "",
  });

  // TransformerFields state
  const [transformadores, setTransformadores] = useState<TransformerSpec[]>([{
    potenciaKVA: '', fase: '', voltajePrimario: '', voltajeSecundario: '',
    tipoTransformador: '', norma: '', zonaInstalacion: '', cantidad: '1',
  }]);

  const translatedOptions = {
    fases: FASES.map(f => ({ value: f.value, label: t(`form.transformer.phase.${f.value}`) })),
    tiposTransformadores: TIPOS_TRANSFORMADORES.map(tipo => ({ value: tipo.value, label: t(`form.transformer.type.${tipo.value}`) })),
    normas: NORMAS.map(n => ({ value: n.value, label: t(`form.transformer.standard.${n.value}`) })),
    zonasInstalacion: ZONAS_INSTALACION.map(z => ({ value: z.value, label: t(`form.transformer.zone.${z.value}`) })),
  };

  const tfFormData: ContactFormState = {
    nombre: formData.nombre, empresa: formData.empresa, email: formData.email,
    telefono: formData.telefono, tipoConsulta: 'productos', categoria: 'Transformadores',
    mensaje: '', identificacion: '', direccion: '', otrosDescripcion: '', transformadores,
  };

  const tfFormErrors: FormErrors = {};

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
            ...(formData.tipoProducto && formData.tipoProducto !== 'otro' ? {
              transformadores,
            } : {}),
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
      if (!json.success) throw new Error(json.message || "Error al enviar la solicitud");
      setCodigo(json.codigo);
      setIsSuccess(true);
    } catch (err) {
      setSubmitError(err instanceof Error ? err.message : "Error de conexión. Intente nuevamente.");
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
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="min-h-[60vh] flex items-center justify-center p-8"
      >
        <div className="text-center max-w-md">
          <div className="w-20 h-20 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-6">
            <CheckCircle2 size={40} className="text-green-600" />
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            ¡Solicitud enviada exitosamente!
          </h2>
          {codigo && (
            <div className="bg-[#0099ce]/5 border border-[#0099ce]/20 rounded-xl p-4 mb-4">
              <p className="text-xs text-[#0099ce] uppercase tracking-wider font-semibold mb-1">Número de referencia</p>
              <p className="text-2xl font-bold text-[#0099ce] tracking-widest">{codigo}</p>
              <p className="text-xs text-gray-500 mt-1">Guarde este código para seguimiento</p>
            </div>
          )}
          <p className="text-gray-600 mb-6">
            Nuestro equipo revisará su solicitud y le contactará a la brevedad.
          </p>
          <div className="bg-[#0099ce]/10 rounded-xl p-4 mb-6">
            <p className="text-sm text-gray-700">
              <strong>Tiempo estimado de respuesta</strong><br />
              Menos de 30 minutos en horario hábil
            </p>
          </div>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/etrys"
              className="inline-flex items-center justify-center gap-2 bg-[#0099ce] hover:bg-[#007ba8] text-white px-6 py-3 rounded-xl font-semibold transition-colors"
            >
              Volver a RST
            </Link>
            <Link
              href="/"
              className="inline-flex items-center justify-center gap-2 border border-gray-300 text-gray-700 hover:bg-gray-50 px-6 py-3 rounded-xl font-medium transition-colors"
            >
              Ir al inicio
            </Link>
          </div>
        </div>
      </motion.div>
    );
  }

  return (
    <div className="grid lg:grid-cols-5 gap-12">
      {/* Form — 3 columns */}
      <motion.div
        initial={{ opacity: 0, x: -30 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6 }}
        className="lg:col-span-3"
      >
        <div className="bg-white rounded-3xl shadow-xl p-8 lg:p-10">
          <form onSubmit={handleSubmit} className="space-y-8">

            {/* Error general */}
            {submitError && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-red-50 border border-red-200 rounded-lg p-4 flex items-start gap-3"
              >
                <AlertCircle className="w-5 h-5 text-red-600 shrink-0 mt-0.5" />
                <p className="text-red-700 text-sm">{submitError}</p>
              </motion.div>
            )}

            {/* Sección 1: Información de Contacto */}
            <div>
              <h2 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-3">
                <div className="w-8 h-8 bg-[#0099ce] text-white rounded-lg flex items-center justify-center text-sm font-bold shrink-0">1</div>
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
                    required
                    value={formData.nombre}
                    onChange={handleChange}
                    className="input-field"
                    placeholder="Ej. Juan Pérez"
                  />
                </div>
                <div>
                  <label className="input-label">Empresa / Organización</label>
                  <input
                    type="text"
                    name="empresa"
                    value={formData.empresa}
                    onChange={handleChange}
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
                    required
                    value={formData.email}
                    onChange={handleChange}
                    className="input-field"
                    placeholder="correo@empresa.com"
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
                <div className="md:col-span-2">
                  <label className="input-label">Cargo / Posición</label>
                  <input
                    type="text"
                    name="cargo"
                    value={formData.cargo}
                    onChange={handleChange}
                    className="input-field"
                    placeholder="Ej. Gerente de Mantenimiento"
                  />
                </div>
              </div>
            </div>

            {/* Sección 2: Detalles del Servicio */}
            <div>
              <h2 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-3">
                <div className="w-8 h-8 bg-[#0099ce] text-white rounded-lg flex items-center justify-center text-sm font-bold shrink-0">2</div>
                Detalles del Servicio
              </h2>
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="input-label">
                    Tipo de servicio <span className="text-red-500">*</span>
                  </label>
                  <select
                    name="tipoServicio"
                    required
                    value={formData.tipoServicio}
                    onChange={handleChange}
                    className="input-field"
                  >
                    <option value="">Seleccione una opción</option>
                    <option value="remanufactura">Remanufactura</option>
                    <option value="reparacion">Reparación</option>
                    <option value="alquiler">Alquiler</option>
                    <option value="diagnostico">Diagnóstico</option>
                    <option value="mantenimiento">Mantenimiento</option>
                    <option value="otro">Otro</option>
                  </select>
                </div>
                <div>
                  <label className="input-label">Tipo de transformador</label>
                  <select
                    name="tipoProducto"
                    value={formData.tipoProducto}
                    onChange={handleChange}
                    className="input-field"
                  >
                    <option value="">Seleccione una opción</option>
                    <option value="tipo-poste">Tipo poste</option>
                    <option value="pad-mounted">Pad-Mounted</option>
                    <option value="subestacion">Subestación</option>
                    <option value="seco">Tipo seco</option>
                    <option value="otro">Otro / No estoy seguro</option>
                  </select>
                </div>

                {formData.tipoProducto && formData.tipoProducto !== 'otro' && (
                  <div className="md:col-span-2">
                    <TransformerFields
                      formData={tfFormData}
                      formErrors={tfFormErrors}
                      isSubmitting={isSubmitting}
                      onTransformersChange={setTransformadores}
                      translatedOptions={translatedOptions}
                    />
                  </div>
                )}

                <div className={formData.tipoProducto && formData.tipoProducto !== 'otro' ? "" : "md:col-span-2"}>
                  <label className="input-label">Urgencia</label>
                  <select
                    name="urgencia"
                    value={formData.urgencia}
                    onChange={handleChange}
                    className="input-field"
                  >
                    <option value="normal">Normal</option>
                    <option value="prioritario">Prioritario</option>
                    <option value="urgente">Urgente</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Sección 3: Información Adicional */}
            <div>
              <h2 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-3">
                <div className="w-8 h-8 bg-[#0099ce] text-white rounded-lg flex items-center justify-center text-sm font-bold shrink-0">3</div>
                Información Adicional
              </h2>
              <div className="space-y-6">
                <div>
                  <label className="input-label">Ubicación del equipo</label>
                  <input
                    type="text"
                    name="ubicacion"
                    value={formData.ubicacion}
                    onChange={handleChange}
                    className="input-field"
                    placeholder="Ciudad, provincia o dirección"
                  />
                </div>
                <div>
                  <label className="input-label">Descripción del problema o requerimiento</label>
                  <textarea
                    name="descripcion"
                    value={formData.descripcion}
                    onChange={handleChange}
                    rows={4}
                    className="input-field resize-none"
                    placeholder="Describa el problema o los detalles del servicio requerido..."
                  />
                </div>

                {/* File Upload */}
                <div>
                  <label className="input-label">Adjuntar archivos (opcional)</label>
                  <div className="border-2 border-dashed border-gray-300 rounded-xl p-4 hover:border-[#0099ce] transition-colors">
                    <input
                      type="file"
                      multiple
                      accept=".pdf,.doc,.docx,.jpg,.jpeg,.png"
                      onChange={handleFileChange}
                      className="hidden"
                      id="file-upload-rst"
                    />
                    <label htmlFor="file-upload-rst" className="flex flex-col items-center cursor-pointer">
                      <Upload size={32} className="text-gray-400 mb-2" />
                      <span className="text-sm text-gray-600">Haga clic para subir archivos</span>
                      <span className="text-xs text-gray-400 mt-1">PDF, DOC, JPG, PNG (máx. 5 archivos)</span>
                    </label>
                  </div>
                  {files.length > 0 && (
                    <div className="mt-3 space-y-2">
                      {files.map((file, index) => (
                        <div
                          key={index}
                          className="flex items-center justify-between bg-gray-50 rounded-lg px-3 py-2"
                        >
                          <span className="text-sm text-gray-700 truncate">{file.name}</span>
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
                  <label className="input-label">¿Cómo nos encontró?</label>
                  <select
                    name="comoNosConocio"
                    value={formData.comoNosConocio}
                    onChange={handleChange}
                    className="input-field"
                  >
                    <option value="">Seleccione una opción</option>
                    <option value="google">Google</option>
                    <option value="referido">Referido</option>
                    <option value="redes">Redes sociales</option>
                    <option value="evento">Evento</option>
                    <option value="publicidad">Publicidad</option>
                    <option value="otro">Otro</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Submit */}
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full inline-flex items-center justify-center gap-2 px-6 py-3 bg-[#0099ce] hover:bg-[#007ba8] text-white font-semibold rounded-lg transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSubmitting ? (
                <>
                  <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  Enviando solicitud...
                </>
              ) : (
                <>
                  Enviar cotización
                  <Send size={18} />
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
        transition={{ duration: 0.6, delay: 0.2 }}
        className="lg:col-span-2 space-y-6"
      >
        {/* Contact Card */}
        <div className="bg-white rounded-2xl shadow-lg p-6">
          <h3 className="text-lg font-bold text-gray-900 mb-4">Contacto directo</h3>
          <div className="space-y-4">
            <a
              href={`tel:${contactInfo.phone}`}
              className="flex items-center gap-3 p-3 bg-gray-50 rounded-xl hover:bg-[#0099ce]/10 transition-colors"
            >
              <div className="w-10 h-10 rounded-lg bg-[#0099ce]/20 flex items-center justify-center shrink-0">
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
              <div className="w-10 h-10 rounded-lg bg-[#0099ce]/20 flex items-center justify-center shrink-0">
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
        </div>

        {/* Benefits */}
        <div className="bg-white rounded-2xl shadow-lg p-6">
          <h3 className="font-bold text-gray-900 mb-4">¿Por qué RST / Etrys?</h3>
          <div className="space-y-3">
            <div className="flex items-center gap-3 text-sm">
              <Clock size={18} className="text-[#0099ce] shrink-0" />
              <span className="text-gray-600">Respuesta en menos de 30 minutos</span>
            </div>
            <div className="flex items-center gap-3 text-sm">
              <Zap size={18} className="text-[#0099ce] shrink-0" />
              <span className="text-gray-600">Servicio de emergencia 24/7</span>
            </div>
            <div className="flex items-center gap-3 text-sm">
              <Shield size={18} className="text-[#0099ce] shrink-0" />
              <span className="text-gray-600">Garantía en todos los servicios</span>
            </div>
          </div>
        </div>

        {/* Location */}
        <div className="bg-white rounded-2xl shadow-lg p-6">
          <div className="flex items-center gap-3 mb-3">
            <MapPin size={24} className="text-[#0099ce]" />
            <h3 className="font-bold text-gray-900">Ubicación</h3>
          </div>
          <p className="text-gray-600 text-sm">{contactInfo.address}</p>
        </div>
      </motion.div>
    </div>
  );
}

export default function EtrysCotizacionesPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero */}
      <section className="bg-linear-to-br from-[#0099ce] to-[#00269b] text-white py-16 lg:py-20">
        <div className="container-eminsa">
          {/* Breadcrumb */}
          <nav className="flex items-center gap-2 text-white/70 text-sm mb-6">
            <Link href="/" className="hover:text-white transition-colors">
              <Home size={16} />
            </Link>
            <ChevronRight size={14} />
            <Link href="/etrys" className="hover:text-white transition-colors">
              RST
            </Link>
            <ChevronRight size={14} />
            <span className="text-white">Cotizaciones</span>
          </nav>

          <div className="max-w-2xl">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 bg-white/10 rounded-xl flex items-center justify-center">
                <Zap size={24} />
              </div>
              <span className="text-white/80 font-semibold">Solicitar cotización</span>
            </div>
            <h1 className="text-3xl md:text-4xl xl:text-5xl font-bold mb-4">
              Cotización de Servicios RST / Etrys
            </h1>
            <p className="text-lg text-white/90">
              Remanufactura, reparación y alquiler de transformadores eléctricos. Complete el formulario para recibir una propuesta personalizada.
            </p>
          </div>
        </div>
      </section>

      {/* Form Section */}
      <section className="py-16 lg:py-20">
        <div className="container-eminsa">
          <Suspense fallback={
            <div className="flex items-center justify-center py-20">
              <Loader2 size={40} className="animate-spin text-[#0099ce]" />
            </div>
          }>
            <CotizacionesForm />
          </Suspense>
        </div>
      </section>
    </div>
  );
}
