"use client";

import { useState, useEffect, Suspense } from "react";
import Link from "next/link";
import Image from "next/image";
import { useSearchParams } from "next/navigation";
import { motion } from "framer-motion";
import {
  ChevronRight,
  FileText,
  Phone,
  MessageCircle,
  CheckCircle2,
  Zap,
  Clock,
  Shield,
  Send,
  Loader2,
  Upload,
  X,
  AlertCircle,
} from "lucide-react";
import { transformerProducts } from "@/config/mtn-data";
import { contactInfo } from "@/config/navigation";
import { getWhatsAppUrl } from "@/utils/whatsapp";
import { PhoneInputField } from "@/components/ui/PhoneInputField";
import { useTranslations } from "next-intl";
import { TransformerFields } from "@/features/contact";
import type { TransformerSpec, ContactFormState, FormErrors } from "@/features/contact/types";
import { FASES, TIPOS_TRANSFORMADORES, NORMAS, ZONAS_INSTALACION } from "@/features/contact/data/constants";

// Capacidades disponibles
const capacities = [
  "15", "25", "30", "37.5", "45", "50", "75", "100", "112.5",
  "150", "167", "225", "300", "500", "750", "1000", "1500", "2000", "2500", "3000", "Otro"
];

// Componente interno que usa useSearchParams
function CotizacionesContent() {
  const tc = useTranslations("mtnConfig");
  const tm = useTranslations("mtnPage");
  const tf = useTranslations("common");
  const searchParams = useSearchParams();
  const preselectedProduct = searchParams.get("producto");

  const [formData, setFormData] = useState({
    nombre: "",
    empresa: "",
    email: "",
    telefono: "",
    tipoSolicitud: "",
    tipoTransformador: preselectedProduct || "",
    configuracion: "",
    capacidad: "",
    cantidad: "1",
    voltajePrimario: "",
    voltajeSecundario: "",
    distribuidora: "",
    ubicacion: "",
    descripcion: "",
    urgente: false,
  });

  const [files, setFiles] = useState<File[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [codigo, setCodigo] = useState("");
  const [errors, setErrors] = useState<Record<string, string>>({});

  // TransformerFields state
  const t = useTranslations("contact");
  const [transformadores, setTransformadores] = useState<TransformerSpec[]>([{
    potenciaKVA: '', fase: '', voltajePrimario: '', voltajeSecundario: '',
    tipoTransformador: '', norma: '', zonaInstalacion: '', cantidad: '1',
  }]);
  const [transformerErrors, setTransformerErrors] = useState<(Partial<TransformerSpec> | undefined)[]>([]);

  const translatedOptions = {
    fases: FASES.map(f => ({ value: f.value, label: t(`form.transformer.phase.${f.value}`) })),
    tiposTransformadores: TIPOS_TRANSFORMADORES.map(tipo => ({ value: tipo.value, label: t(`form.transformer.type.${tipo.value}`) })),
    normas: NORMAS.map(n => ({ value: n.value, label: t(`form.transformer.standard.${n.value}`) })),
    zonasInstalacion: ZONAS_INSTALACION.map(z => ({ value: z.value, label: t(`form.transformer.zone.${z.value}`) })),
  };

  // Build a compatible formData/formErrors for TransformerFields
  const tfFormData = {
    nombre: formData.nombre, empresa: formData.empresa, email: formData.email,
    telefono: formData.telefono, tipoConsulta: 'productos' as const,
    categoria: 'Transformadores', mensaje: '', identificacion: '', direccion: '',
    otrosDescripcion: '', transformadores,
  } satisfies ContactFormState;

  const tfFormErrors: FormErrors = { transformadores: transformerErrors };

  useEffect(() => {
    if (preselectedProduct) {
      setFormData(prev => ({ ...prev, tipoTransformador: preselectedProduct }));
    }
  }, [preselectedProduct]);

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.nombre.trim()) newErrors.nombre = tm("cotizaciones.errorNameRequired");
    if (!formData.email.trim()) newErrors.email = tm("cotizaciones.errorEmailRequired");
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = tm("cotizaciones.errorEmailInvalid");
    }
    if (!formData.telefono.trim()) newErrors.telefono = tm("cotizaciones.errorPhoneRequired");
    if (!formData.tipoSolicitud) newErrors.tipoSolicitud = tm("cotizaciones.errorSelectType");
    if (formData.tipoSolicitud === 'transformador') {
      if (transformadores.some(tr => !tr.potenciaKVA || !tr.fase || !tr.tipoTransformador)) {
        newErrors.transformadores = tm("cotizaciones.errorTransformerFields");
      }
    }
    if (formData.tipoSolicitud === 'otro' && !formData.descripcion.trim()) {
      newErrors.descripcion = tm("cotizaciones.errorDescribeRequest");
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) return;

    setIsSubmitting(true);

    try {
      const res = await fetch('/api/cotizaciones', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          unidad: 'MTN',
          nombre: formData.nombre,
          empresa: formData.empresa || undefined,
          email: formData.email,
          telefono: formData.telefono,
          urgente: formData.urgente,
          detalles: formData.tipoSolicitud === 'transformador' ? {
            transformadores,
            ubicacion: formData.ubicacion,
            descripcion: formData.descripcion,
          } : {
            descripcion: formData.descripcion,
            ubicacion: formData.ubicacion,
            ...(files.length > 0 && {
              archivos: files.map(f => `${f.name} (${(f.size / 1024).toFixed(1)} KB)`).join(' • '),
            }),
          },
        }),
      });

      const json = await res.json();
      if (!json.success) throw new Error(json.message || tm("cotizaciones.errorSubmit"));
      setCodigo(json.codigo);
      setIsSubmitted(true);
    } catch (err) {
      setErrors(prev => ({ ...prev, general: err instanceof Error ? err.message : tm("cotizaciones.errorConnection") }));
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target;
    const checked = (e.target as HTMLInputElement).checked;

    setFormData(prev => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value
    }));

    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: "" }));
    }
  };

  const handlePhoneChange = (value: string) => {
    setFormData(prev => ({ ...prev, telefono: value }));
    if (errors.telefono) setErrors(prev => ({ ...prev, telefono: "" }));
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

  if (isSubmitted) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="min-h-[60vh] flex items-center justify-center p-8"
      >
        <div className="text-center max-w-md">
          <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle2 size={40} className="text-green-600" />
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            {tm("cotizaciones.successTitle")}
          </h2>
          {codigo && (
            <div className="bg-[#00269b]/5 border border-[#00269b]/20 rounded-xl p-4 mb-4">
              <p className="text-xs text-[#00269b] uppercase tracking-wider font-semibold mb-1">{tf("form.refNumber")}</p>
              <p className="text-2xl font-bold text-[#00269b] tracking-widest">{codigo}</p>
              <p className="text-xs text-gray-500 mt-1">{tf("form.saveCode")}</p>
            </div>
          )}
          <p className="text-gray-600 mb-8">
            {tm("cotizaciones.successMessage")}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/mtn/productos"
              className="inline-flex items-center justify-center gap-2 bg-[#00269b] hover:bg-[#00175d] text-white px-6 py-3 rounded-xl font-semibold transition-colors"
            >
              {tm("cotizaciones.viewProducts")}
            </Link>
            <button
              onClick={() => {
                setIsSubmitted(false);
                setFormData({
                  nombre: "",
                  empresa: "",
                  email: "",
                  telefono: "",
                  tipoSolicitud: "",
                  tipoTransformador: "",
                  configuracion: "",
                  capacidad: "",
                  cantidad: "1",
                  voltajePrimario: "",
                  voltajeSecundario: "",
                  distribuidora: "",
                  ubicacion: "",
                  descripcion: "",
                  urgente: false,
                });
                setFiles([]);
              }}
              className="inline-flex items-center justify-center gap-2 border-2 border-[#00269b] text-[#00269b] hover:bg-[#00269b] hover:text-white px-6 py-3 rounded-xl font-semibold transition-colors"
            >
              {tm("cotizaciones.newQuote")}
            </button>
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
                {tm("cotizaciones.sectionContactInfo")}
              </h2>
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="input-label">
                    {tm("cotizaciones.fullName")} <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="nombre"
                    value={formData.nombre}
                    onChange={handleInputChange}
                    className={`input-field ${errors.nombre ? 'border-red-500 focus:ring-red-200' : ''}`}
                    placeholder={tm("cotizaciones.placeholderName")}
                  />
                  {errors.nombre && <p className="text-red-500 text-xs mt-1">{errors.nombre}</p>}
                </div>
                <div>
                  <label className="input-label">{tm("cotizaciones.companyOrg")}</label>
                  <input
                    type="text"
                    name="empresa"
                    value={formData.empresa}
                    onChange={handleInputChange}
                    className="input-field"
                    placeholder={tm("cotizaciones.placeholderCompany")}
                  />
                </div>
                <div>
                  <label className="input-label">
                    {tm("cotizaciones.email")} <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className={`input-field ${errors.email ? 'border-red-500 focus:ring-red-200' : ''}`}
                    placeholder={tm("cotizaciones.placeholderEmail")}
                  />
                  {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
                </div>
                <div>
                  <PhoneInputField
                    value={formData.telefono}
                    onChange={handlePhoneChange}
                    label={tm("cotizaciones.phone")}
                    required
                    error={errors.telefono}
                    focusColor="#00269b"
                  />
                </div>
              </div>
            </div>

            {/* Sección 2: Tipo de Solicitud */}
            <div>
              <h2 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-3">
                <div className="w-8 h-8 bg-[#00269b] text-white rounded-lg flex items-center justify-center text-sm font-bold shrink-0">2</div>
                {tm("cotizaciones.sectionRequestType")}
              </h2>
              <div className="space-y-6">
                <div>
                  <label className="input-label">
                    {tm("cotizaciones.whatToQuote")} <span className="text-red-500">*</span>
                  </label>
                  <select
                    name="tipoSolicitud"
                    value={formData.tipoSolicitud}
                    onChange={handleInputChange}
                    className={`input-field ${errors.tipoSolicitud ? 'border-red-500 focus:ring-red-200' : ''}`}
                  >
                    <option value="">{tf("form.selectOption")}</option>
                    <option value="transformador">{tm("cotizaciones.newTransformer")}</option>
                    <option value="otro">{tm("cotizaciones.otherProduct")}</option>
                  </select>
                  {errors.tipoSolicitud && <p className="text-red-500 text-xs mt-1">{errors.tipoSolicitud}</p>}
                </div>

                {/* Transformer fields */}
                {formData.tipoSolicitud === 'transformador' && (
                  <TransformerFields
                    formData={tfFormData}
                    formErrors={tfFormErrors}
                    isSubmitting={isSubmitting}
                    onTransformersChange={setTransformadores}
                    translatedOptions={translatedOptions}
                  />
                )}

                {/* Otro fields */}
                {formData.tipoSolicitud === 'otro' && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    transition={{ duration: 0.3 }}
                  >
                    <div>
                      <label className="input-label">
                        {tm("cotizaciones.requestDescription")} <span className="text-red-500">*</span>
                      </label>
                      <textarea
                        name="descripcion"
                        value={formData.descripcion}
                        onChange={handleInputChange}
                        rows={5}
                        className={`input-field resize-none ${errors.descripcion ? 'border-red-500 focus:ring-red-200' : ''}`}
                        placeholder={tm("cotizaciones.placeholderDescription")}
                      />
                      {errors.descripcion && <p className="text-red-500 text-xs mt-1">{errors.descripcion}</p>}
                    </div>
                    <div className="mt-4">
                      <label className="input-label">{tf("form.attachFile")}</label>
                      <div className="border-2 border-dashed border-gray-300 rounded-xl p-4 hover:border-[#00269b] transition-colors">
                        <input
                          type="file"
                          multiple
                          accept=".pdf,.doc,.docx,.jpg,.jpeg,.png,.xlsx,.xls"
                          onChange={handleFileChange}
                          className="hidden"
                          id="file-upload-mtn"
                        />
                        <label htmlFor="file-upload-mtn" className="flex flex-col items-center cursor-pointer">
                          <Upload size={32} className="text-gray-400 mb-2" />
                          <span className="text-sm text-gray-600">{tf("form.clickToUpload")}</span>
                          <span className="text-xs text-gray-400 mt-1">{tm("cotizaciones.fileFormats")}</span>
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
                  </motion.div>
                )}
              </div>
            </div>

            {/* Sección 3: Detalles Adicionales */}
            <div>
              <h2 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-3">
                <div className="w-8 h-8 bg-[#00269b] text-white rounded-lg flex items-center justify-center text-sm font-bold shrink-0">3</div>
                {tm("cotizaciones.sectionAdditionalDetails")}
              </h2>
              <div className="space-y-6">
                <div>
                  <label className="input-label">{tf("form.projectLocation")}</label>
                  <input
                    type="text"
                    name="ubicacion"
                    value={formData.ubicacion}
                    onChange={handleInputChange}
                    className="input-field"
                    placeholder={tm("cotizaciones.placeholderLocation")}
                  />
                </div>
                {formData.tipoSolicitud === 'transformador' && (
                  <div>
                    <label className="input-label">{tm("cotizaciones.specialRequirements")}</label>
                    <textarea
                      name="descripcion"
                      value={formData.descripcion}
                      onChange={handleInputChange}
                      rows={4}
                      className="input-field resize-none"
                      placeholder={tm("cotizaciones.placeholderSpecialReq")}
                    />
                  </div>
                )}
                <label className="flex items-center gap-3 cursor-pointer">
                  <input
                    type="checkbox"
                    name="urgente"
                    checked={formData.urgente}
                    onChange={handleInputChange}
                    className="w-5 h-5 rounded border-gray-300 text-[#00269b] focus:ring-[#00269b]"
                  />
                  <span className="text-gray-700 text-sm">
                    <span className="font-semibold text-[#00269b]">{tm("cotizaciones.urgentRequest")}</span> — {tm("cotizaciones.urgentDesc")}
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
                  {tf("form.sending")}
                </>
              ) : (
                <>
                  {tf("form.submit")}
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
        <div className="bg-white rounded-2xl shadow-lg p-6 sticky top-40">
          <h3 className="font-bold text-gray-900 mb-4">{tm("cotizaciones.preferDirectContact")}</h3>

          <div className="space-y-4">
            <a
              href={`tel:${contactInfo.phone}`}
              className="flex items-center gap-3 p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors"
            >
              <div className="w-10 h-10 bg-[#00269b] rounded-lg flex items-center justify-center shrink-0">
                <Phone size={20} className="text-white" />
              </div>
              <div>
                <p className="text-sm text-gray-500">{tm("cotizaciones.callUs")}</p>
                <p className="font-semibold text-gray-900">{contactInfo.phone}</p>
              </div>
            </a>

            <a
              href={getWhatsAppUrl()}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 p-4 bg-[#25D366]/10 rounded-xl hover:bg-[#25D366]/20 transition-colors"
            >
              <div className="w-10 h-10 bg-[#25D366] rounded-lg flex items-center justify-center shrink-0">
                <MessageCircle size={20} className="text-white" />
              </div>
              <div>
                <p className="text-sm text-gray-500">{tm("cotizaciones.whatsapp")}</p>
                <p className="font-semibold text-[#25D366]">{tm("cotizaciones.chatWithUs")}</p>
              </div>
            </a>
          </div>

          {/* Benefits */}
          <div className="mt-6 pt-6 border-t border-gray-100 space-y-3">
            <div className="flex items-center gap-3 text-sm">
              <Clock size={18} className="text-[#00269b] shrink-0" />
              <span className="text-gray-600">{tm("cotizaciones.responseTime")}</span>
            </div>
            <div className="flex items-center gap-3 text-sm">
              <Zap size={18} className="text-[#00269b] shrink-0" />
              <span className="text-gray-600">{tm("cotizaciones.noCommitment")}</span>
            </div>
            <div className="flex items-center gap-3 text-sm">
              <Shield size={18} className="text-[#00269b] shrink-0" />
              <span className="text-gray-600">{tm("cotizaciones.technicalAdvice")}</span>
            </div>
          </div>

          {/* Certifications */}
          <div className="mt-6 pt-6 border-t border-gray-100">
            <p className="text-sm text-gray-500 mb-3">{tm("cotizaciones.certifications")}</p>
            <div className="flex flex-col gap-3">
              <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                <Image src="https://res.cloudinary.com/dixsymrg5/image/upload/v1775242373/eminsa/site/images/SelloAENORISO9001_NEG.webp" alt="ISO 9001" width={36} height={36} className="object-contain shrink-0" />
                <span className="text-xs font-semibold text-gray-700">ISO 9001:2015</span>
              </div>
              <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                <div className="w-9 h-9 bg-[#00269b]/10 rounded flex items-center justify-center shrink-0">
                  <Shield size={18} className="text-[#00269b]" />
                </div>
                <span className="text-xs font-semibold text-gray-700">ANSI/IEEE C57 — Certificado por CIDET</span>
              </div>
              <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                <Image src="https://res.cloudinary.com/dixsymrg5/image/upload/v1775242300/eminsa/site/certificados/ul-certified-logo.jpg" alt="UL" width={36} height={36} className="object-contain shrink-0" />
                <span className="text-xs font-semibold text-gray-700">UL XPLH: Transformers, Distribution, Liquid-filled Type, Over 600 Volts</span>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}

export default function CotizacionesPage() {
  const tm = useTranslations("mtnPage");

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero */}
      <section className="bg-gradient-to-br from-[#00269b] to-[#00175d] text-white py-16 lg:py-20">
        <div className="container-eminsa">
          {/* Breadcrumb */}
          <nav className="flex items-center gap-2 text-sm text-white/60 mb-6">
            <Link href="/" className="hover:text-white transition-colors">{tm("cotizaciones.breadcrumbHome")}</Link>
            <ChevronRight size={14} />
            <Link href="/mtn" className="hover:text-white transition-colors">{tm("cotizaciones.breadcrumbMTN")}</Link>
            <ChevronRight size={14} />
            <span className="text-white">{tm("cotizaciones.breadcrumbQuotes")}</span>
          </nav>

          <div className="max-w-2xl">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 bg-white/10 rounded-xl flex items-center justify-center">
                <FileText size={24} />
              </div>
              <span className="text-[#0099ce] font-semibold">{tm("cotizaciones.heroBadge")}</span>
            </div>
            <h1 className="text-3xl lg:text-4xl font-bold mb-4">
              {tm("cotizaciones.heroTitle")}
            </h1>
            <p className="text-lg text-white/80">
              {tm("cotizaciones.heroDescription")}
            </p>
          </div>
        </div>
      </section>

      {/* Form Section */}
      <section className="py-16 lg:py-20">
        <div className="container-eminsa">
          <Suspense fallback={
            <div className="flex items-center justify-center py-20">
              <Loader2 size={40} className="animate-spin text-[#00269b]" />
            </div>
          }>
            <CotizacionesContent />
          </Suspense>
        </div>
      </section>
    </div>
  );
}
