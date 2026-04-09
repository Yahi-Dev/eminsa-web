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
  const tContact = useTranslations("contact");
  const t = useTranslations("etrysPage");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [codigo, setCodigo] = useState("");
  const [submitError, setSubmitError] = useState("");
  const [files, setFiles] = useState<{ name: string; url: string; size: number }[]>([]);
  const [uploadingFile, setUploadingFile] = useState(false);
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
    fases: FASES.map(f => ({ value: f.value, label: tContact(`form.transformer.phase.${f.value}`) })),
    tiposTransformadores: TIPOS_TRANSFORMADORES.map(tipo => ({ value: tipo.value, label: tContact(`form.transformer.type.${tipo.value}`) })),
    normas: NORMAS.map(n => ({ value: n.value, label: tContact(`form.transformer.standard.${n.value}`) })),
    zonasInstalacion: ZONAS_INSTALACION.map(z => ({ value: z.value, label: tContact(`form.transformer.zone.${z.value}`) })),
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
              archivos: files.map(f => ({ name: f.name, url: f.url, size: f.size })),
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

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;
    const selected = Array.from(e.target.files);
    e.target.value = "";
    for (const file of selected) {
      if (files.length >= 5) break;
      setUploadingFile(true);
      try {
        const body = new FormData();
        body.append("file", file);
        const res = await fetch("/api/cotizaciones/upload", { method: "POST", body });
        const data = await res.json();
        if (data.success) {
          setFiles(prev => [...prev, { name: data.name, url: data.url, size: data.size }].slice(0, 5));
        }
      } catch { /* silent */ }
      setUploadingFile(false);
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
            {t("cotizaciones.successTitle")}
          </h2>
          {codigo && (
            <div className="bg-[#0099ce]/5 border border-[#0099ce]/20 rounded-xl p-4 mb-4">
              <p className="text-xs text-[#0099ce] uppercase tracking-wider font-semibold mb-1">{t("cotizaciones.refNumber")}</p>
              <p className="text-2xl font-bold text-[#0099ce] tracking-widest">{codigo}</p>
              <p className="text-xs text-gray-500 mt-1">{t("cotizaciones.saveCode")}</p>
            </div>
          )}
          <p className="text-gray-600 mb-6">
            {t("cotizaciones.teamReview")}
          </p>
          <div className="bg-[#0099ce]/10 rounded-xl p-4 mb-6">
            <p className="text-sm text-gray-700">
              <strong>{t("cotizaciones.responseTime")}</strong><br />
              {t("cotizaciones.responseTimeValue")}
            </p>
          </div>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/etrys"
              className="inline-flex items-center justify-center gap-2 bg-[#0099ce] hover:bg-[#007ba8] text-white px-6 py-3 rounded-xl font-semibold transition-colors"
            >
              {t("cotizaciones.backToRst")}
            </Link>
            <Link
              href="/"
              className="inline-flex items-center justify-center gap-2 border border-gray-300 text-gray-700 hover:bg-gray-50 px-6 py-3 rounded-xl font-medium transition-colors"
            >
              {t("cotizaciones.goHome")}
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
                {t("cotizaciones.form.contactInfo")}
              </h2>
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="input-label">
                    {t("cotizaciones.form.fullName")} <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="nombre"
                    required
                    value={formData.nombre}
                    onChange={handleChange}
                    className="input-field"
                    placeholder={t("cotizaciones.form.fullNamePlaceholder")}
                  />
                </div>
                <div>
                  <label className="input-label">{t("cotizaciones.form.company")}</label>
                  <input
                    type="text"
                    name="empresa"
                    value={formData.empresa}
                    onChange={handleChange}
                    className="input-field"
                    placeholder={t("cotizaciones.form.companyPlaceholder")}
                  />
                </div>
                <div>
                  <label className="input-label">
                    {t("cotizaciones.form.email")} <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="email"
                    name="email"
                    required
                    value={formData.email}
                    onChange={handleChange}
                    className="input-field"
                    placeholder={t("cotizaciones.form.emailPlaceholder")}
                  />
                </div>
                <div>
                  <PhoneInputField
                    value={formData.telefono}
                    onChange={handlePhoneChange}
                    label={t("cotizaciones.form.phone")}
                    required
                    focusColor="#0099ce"
                  />
                </div>
                <div className="md:col-span-2">
                  <label className="input-label">{t("cotizaciones.form.position")}</label>
                  <input
                    type="text"
                    name="cargo"
                    value={formData.cargo}
                    onChange={handleChange}
                    className="input-field"
                    placeholder={t("cotizaciones.form.positionPlaceholder")}
                  />
                </div>
              </div>
            </div>

            {/* Sección 2: Detalles del Servicio */}
            <div>
              <h2 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-3">
                <div className="w-8 h-8 bg-[#0099ce] text-white rounded-lg flex items-center justify-center text-sm font-bold shrink-0">2</div>
                {t("cotizaciones.form.serviceDetails")}
              </h2>
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="input-label">
                    {t("cotizaciones.form.serviceType")} <span className="text-red-500">*</span>
                  </label>
                  <select
                    name="tipoServicio"
                    required
                    value={formData.tipoServicio}
                    onChange={handleChange}
                    className="input-field"
                  >
                    <option value="">{t("cotizaciones.form.selectOption")}</option>
                    <option value="remanufactura">{t("cotizaciones.form.remanufacture")}</option>
                    <option value="reparacion">{t("cotizaciones.form.repair")}</option>
                    <option value="alquiler">{t("cotizaciones.form.rental")}</option>
                    <option value="diagnostico">{t("cotizaciones.form.diagnostic")}</option>
                    <option value="mantenimiento">{t("cotizaciones.form.maintenance")}</option>
                    <option value="otro">{t("cotizaciones.form.other")}</option>
                  </select>
                </div>
                <div>
                  <label className="input-label">{t("cotizaciones.form.transformerType")}</label>
                  <select
                    name="tipoProducto"
                    value={formData.tipoProducto}
                    onChange={handleChange}
                    className="input-field"
                  >
                    <option value="">{t("cotizaciones.form.selectOption")}</option>
                    <option value="tipo-poste">{t("cotizaciones.form.poleType")}</option>
                    <option value="pad-mounted">{t("cotizaciones.form.padMounted")}</option>
                    <option value="subestacion">{t("cotizaciones.form.substation")}</option>
                    <option value="seco">{t("cotizaciones.form.dryType")}</option>
                    <option value="otro">{t("cotizaciones.form.otherNotSure")}</option>
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
                  <label className="input-label">{t("cotizaciones.form.urgency")}</label>
                  <select
                    name="urgencia"
                    value={formData.urgencia}
                    onChange={handleChange}
                    className="input-field"
                  >
                    <option value="normal">{t("cotizaciones.form.normal")}</option>
                    <option value="prioritario">{t("cotizaciones.form.priority")}</option>
                    <option value="urgente">{t("cotizaciones.form.urgent")}</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Sección 3: Información Adicional */}
            <div>
              <h2 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-3">
                <div className="w-8 h-8 bg-[#0099ce] text-white rounded-lg flex items-center justify-center text-sm font-bold shrink-0">3</div>
                {t("cotizaciones.form.additionalInfo")}
              </h2>
              <div className="space-y-6">
                <div>
                  <label className="input-label">{t("cotizaciones.form.equipmentLocation")}</label>
                  <input
                    type="text"
                    name="ubicacion"
                    value={formData.ubicacion}
                    onChange={handleChange}
                    className="input-field"
                    placeholder={t("cotizaciones.form.locationPlaceholder")}
                  />
                </div>
                <div>
                  <label className="input-label">{t("cotizaciones.form.problemDescription")}</label>
                  <textarea
                    name="descripcion"
                    value={formData.descripcion}
                    onChange={handleChange}
                    rows={4}
                    className="input-field resize-none"
                    placeholder={t("cotizaciones.form.problemPlaceholder")}
                  />
                </div>

                {/* File Upload */}
                <div>
                  <label className="input-label">{t("cotizaciones.form.attachFiles")}</label>
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
                      <span className="text-sm text-gray-600">{t("cotizaciones.form.clickToUpload")}</span>
                      <span className="text-xs text-gray-400 mt-1">{t("cotizaciones.form.fileTypes")}</span>
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
                  <label className="input-label">{t("cotizaciones.form.howFoundUs")}</label>
                  <select
                    name="comoNosConocio"
                    value={formData.comoNosConocio}
                    onChange={handleChange}
                    className="input-field"
                  >
                    <option value="">{t("cotizaciones.form.selectOption")}</option>
                    <option value="google">{t("cotizaciones.form.google")}</option>
                    <option value="referido">{t("cotizaciones.form.referral")}</option>
                    <option value="redes">{t("cotizaciones.form.socialMedia")}</option>
                    <option value="evento">{t("cotizaciones.form.event")}</option>
                    <option value="publicidad">{t("cotizaciones.form.advertising")}</option>
                    <option value="otro">{t("cotizaciones.form.other")}</option>
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
                  {t("cotizaciones.form.sending")}
                </>
              ) : (
                <>
                  {t("cotizaciones.form.submit")}
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
          <h3 className="text-lg font-bold text-gray-900 mb-4">{t("cotizaciones.directContact")}</h3>
          <div className="space-y-4">
            <a
              href={`tel:${contactInfo.phone}`}
              className="flex items-center gap-3 p-3 bg-gray-50 rounded-xl hover:bg-[#0099ce]/10 transition-colors"
            >
              <div className="w-10 h-10 rounded-lg bg-[#0099ce]/20 flex items-center justify-center shrink-0">
                <Phone size={20} className="text-[#0099ce]" />
              </div>
              <div>
                <span className="text-xs text-gray-500 block">{t("cotizaciones.phoneLabel")}</span>
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
                <span className="text-xs text-gray-500 block">{t("cotizaciones.emailLabel")}</span>
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
          <h3 className="font-bold text-gray-900 mb-4">{t("cotizaciones.whyRst")}</h3>
          <div className="space-y-3">
            <div className="flex items-center gap-3 text-sm">
              <Clock size={18} className="text-[#0099ce] shrink-0" />
              <span className="text-gray-600">{t("cotizaciones.response30min")}</span>
            </div>
            <div className="flex items-center gap-3 text-sm">
              <Zap size={18} className="text-[#0099ce] shrink-0" />
              <span className="text-gray-600">{t("cotizaciones.emergency247")}</span>
            </div>
            <div className="flex items-center gap-3 text-sm">
              <Shield size={18} className="text-[#0099ce] shrink-0" />
              <span className="text-gray-600">{t("cotizaciones.warrantyAll")}</span>
            </div>
          </div>
        </div>

        {/* Location */}
        <div className="bg-white rounded-2xl shadow-lg p-6">
          <div className="flex items-center gap-3 mb-3">
            <MapPin size={24} className="text-[#0099ce]" />
            <h3 className="font-bold text-gray-900">{t("cotizaciones.locationTitle")}</h3>
          </div>
          <p className="text-gray-600 text-sm">{contactInfo.address}</p>
        </div>
      </motion.div>
    </div>
  );
}

export default function EtrysCotizacionesPage() {
  const t = useTranslations("etrysPage");
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
            <span className="text-white">{t("cotizaciones.pageTitle")}</span>
          </nav>

          <div className="max-w-2xl">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 bg-white/10 rounded-xl flex items-center justify-center">
                <Zap size={24} />
              </div>
              <span className="text-white/80 font-semibold">{t("cotizaciones.formTitle")}</span>
            </div>
            <h1 className="text-3xl md:text-4xl xl:text-5xl font-bold mb-4">
              {t("cotizaciones.title")}
            </h1>
            <p className="text-lg text-white/90">
              {t("cotizaciones.description")}
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
