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
import { useTranslations } from "next-intl";

function CotizacionesForm() {
  const t = useTranslations("etrysPage.cotizacionesPage");
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
    distribuidora: "",
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
            ...(formData.tipoProducto && formData.tipoProducto !== 'otro' ? {
              marca: formData.marca,
              potencia: formData.potencia,
              voltajePrimario: formData.voltajePrimario,
              voltajeSecundario: formData.voltajeSecundario,
              cantidadUnidades: formData.cantidadUnidades,
              distribuidora: formData.distribuidora,
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
      if (!json.success) throw new Error(json.message || t("errorSubmit"));
      setCodigo(json.codigo);
      setIsSuccess(true);
    } catch (err) {
      setSubmitError(err instanceof Error ? err.message : t("errorConnection"));
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
            {t("successTitle")}
          </h2>
          {codigo && (
            <div className="bg-[#0099ce]/5 border border-[#0099ce]/20 rounded-xl p-4 mb-4">
              <p className="text-xs text-[#0099ce] uppercase tracking-wider font-semibold mb-1">{t("referenceNumber")}</p>
              <p className="text-2xl font-bold text-[#0099ce] tracking-widest">{codigo}</p>
              <p className="text-xs text-gray-500 mt-1">{t("saveCode")}</p>
            </div>
          )}
          <p className="text-gray-600 mb-6">
            {t("successDescription")}
          </p>
          <div className="bg-[#0099ce]/10 rounded-xl p-4 mb-6">
            <p className="text-sm text-gray-700">
              <strong>{t("estimatedResponseTime")}</strong><br />
              {t("lessThan30Min")}
            </p>
          </div>
          <div className="space-y-3">
            <Link
              href="/etrys"
              className="block w-full px-6 py-3 bg-[#0099ce] hover:bg-[#007ba8] text-white font-semibold rounded-xl transition-colors"
            >
              {t("backToEtrys")}
            </Link>
            <Link
              href="/"
              className="block w-full px-6 py-3 border border-gray-300 text-gray-700 hover:bg-gray-50 font-medium rounded-xl transition-colors"
            >
              {t("goHome")}
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
              RST
            </Link>
            <ChevronRight size={14} />
            <span className="text-white">{t("breadcrumb")}</span>
          </nav>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-3xl"
          >
            <h1 className="text-3xl md:text-4xl xl:text-5xl font-bold mb-4">
              {t("heroTitle")}
            </h1>
            <p className="text-lg text-white/90">
              {t("heroDescription")}
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
                    {t("contactInfoSection")}
                  </h2>
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1.5">
                        {t("fullName")} *
                      </label>
                      <input
                        type="text"
                        name="nombre"
                        required
                        value={formData.nombre}
                        onChange={handleChange}
                        className="w-full px-4 py-2.5 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#0099ce] focus:border-transparent transition-all"
                        placeholder={t("namePlaceholder")}
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1.5">
                        {t("company")}
                      </label>
                      <input
                        type="text"
                        name="empresa"
                        value={formData.empresa}
                        onChange={handleChange}
                        className="w-full px-4 py-2.5 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#0099ce] focus:border-transparent transition-all"
                        placeholder={t("companyPlaceholder")}
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1.5">
                        {t("emailLabel")} *
                      </label>
                      <input
                        type="email"
                        name="email"
                        required
                        value={formData.email}
                        onChange={handleChange}
                        className="w-full px-4 py-2.5 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#0099ce] focus:border-transparent transition-all"
                        placeholder={t("emailPlaceholder")}
                      />
                    </div>
                    <div>
                      <PhoneInputField
                        value={formData.telefono}
                        onChange={handlePhoneChange}
                        label={t("phoneLabel")}
                        required
                        focusColor="#0099ce"
                      />
                    </div>
                    <div className="sm:col-span-2">
                      <label className="block text-sm font-medium text-gray-700 mb-1.5">
                        {t("position")}
                      </label>
                      <input
                        type="text"
                        name="cargo"
                        value={formData.cargo}
                        onChange={handleChange}
                        className="w-full px-4 py-2.5 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#0099ce] focus:border-transparent transition-all"
                        placeholder={t("positionPlaceholder")}
                      />
                    </div>
                  </div>
                </div>

                {/* Section: Detalles del Servicio */}
                <div className="mb-8">
                  <h2 className="text-xl font-bold text-gray-900 mb-4 pb-2 border-b">
                    {t("serviceDetailsSection")}
                  </h2>
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1.5">
                        {t("serviceType")} *
                      </label>
                      <select
                        name="tipoServicio"
                        required
                        value={formData.tipoServicio}
                        onChange={handleChange}
                        className="w-full px-4 py-2.5 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#0099ce] focus:border-transparent transition-all"
                      >
                        <option value="">{t("select")}</option>
                        <option value="remanufactura">{t("serviceRemanufacture")}</option>
                        <option value="reparacion">{t("serviceRepair")}</option>
                        <option value="alquiler">{t("serviceRental")}</option>
                        <option value="diagnostico">{t("serviceDiagnosis")}</option>
                        <option value="mantenimiento">{t("serviceMaintenance")}</option>
                        <option value="otro">{t("serviceOther")}</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1.5">
                        {t("transformerType")}
                      </label>
                      <select
                        name="tipoProducto"
                        value={formData.tipoProducto}
                        onChange={handleChange}
                        className="w-full px-4 py-2.5 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#0099ce] focus:border-transparent transition-all"
                      >
                        <option value="">{t("select")}</option>
                        <option value="tipo-poste">{t("poleType")}</option>
                        <option value="pad-mounted">Pad-Mounted</option>
                        <option value="subestacion">{t("substation")}</option>
                        <option value="seco">{t("dryType")}</option>
                        <option value="otro">{t("otherNotSure")}</option>
                      </select>
                    </div>
                    {formData.tipoProducto && formData.tipoProducto !== 'otro' && (
                      <>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1.5">
                            {t("equipmentBrand")}
                          </label>
                          <input
                            type="text"
                            name="marca"
                            value={formData.marca}
                            onChange={handleChange}
                            className="w-full px-4 py-2.5 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#0099ce] focus:border-transparent transition-all"
                            placeholder={t("brandPlaceholder")}
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1.5">
                            {t("power")}
                          </label>
                          <input
                            type="text"
                            name="potencia"
                            value={formData.potencia}
                            onChange={handleChange}
                            className="w-full px-4 py-2.5 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#0099ce] focus:border-transparent transition-all"
                            placeholder={t("powerPlaceholder")}
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1.5">
                            {t("primaryVoltage")}
                          </label>
                          <input
                            type="text"
                            name="voltajePrimario"
                            value={formData.voltajePrimario}
                            onChange={handleChange}
                            className="w-full px-4 py-2.5 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#0099ce] focus:border-transparent transition-all"
                            placeholder={t("primaryVoltagePlaceholder")}
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1.5">
                            {t("secondaryVoltage")}
                          </label>
                          <input
                            type="text"
                            name="voltajeSecundario"
                            value={formData.voltajeSecundario}
                            onChange={handleChange}
                            className="w-full px-4 py-2.5 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#0099ce] focus:border-transparent transition-all"
                            placeholder={t("secondaryVoltagePlaceholder")}
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1.5">
                            {t("unitQuantity")}
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
                            {t("energyDistributor")}
                          </label>
                          <select
                            name="distribuidora"
                            value={formData.distribuidora}
                            onChange={handleChange}
                            className="w-full px-4 py-2.5 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#0099ce] focus:border-transparent transition-all"
                          >
                            <option value="">{t("selectDistributor")}</option>
                            <option value="EDENORTE">EDENORTE</option>
                            <option value="EDESUR">EDESUR</option>
                            <option value="EDEESTE">EDEESTE</option>
                            <option value="CEPM">CEPM</option>
                            <option value="CAPCANA">CAPCANA</option>
                            <option value="USO INTERNO">{t("internalUse")}</option>
                            <option value="OTROS">{t("othersSpecify")}</option>
                          </select>
                        </div>
                      </>
                    )}
                    <div className={formData.tipoProducto && formData.tipoProducto !== 'otro' ? "" : "sm:col-span-2"}>
                      <label className="block text-sm font-medium text-gray-700 mb-1.5">
                        {t("urgency")}
                      </label>
                      <select
                        name="urgencia"
                        value={formData.urgencia}
                        onChange={handleChange}
                        className="w-full px-4 py-2.5 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#0099ce] focus:border-transparent transition-all"
                      >
                        <option value="normal">{t("urgencyNormal")}</option>
                        <option value="prioritario">{t("urgencyPriority")}</option>
                        <option value="urgente">{t("urgencyUrgent")}</option>
                      </select>
                    </div>
                  </div>
                </div>

                {/* Section: Información Adicional */}
                <div className="mb-8">
                  <h2 className="text-xl font-bold text-gray-900 mb-4 pb-2 border-b">
                    {t("additionalInfoSection")}
                  </h2>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1.5">
                        {t("equipmentLocation")}
                      </label>
                      <input
                        type="text"
                        name="ubicacion"
                        value={formData.ubicacion}
                        onChange={handleChange}
                        className="w-full px-4 py-2.5 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#0099ce] focus:border-transparent transition-all"
                        placeholder={t("locationPlaceholder")}
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1.5">
                        {t("problemDescription")}
                      </label>
                      <textarea
                        name="descripcion"
                        value={formData.descripcion}
                        onChange={handleChange}
                        rows={4}
                        className="w-full px-4 py-2.5 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#0099ce] focus:border-transparent transition-all resize-none"
                        placeholder={t("problemPlaceholder")}
                      />
                    </div>
                    
                    {/* File Upload */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1.5">
                        {t("attachFiles")}
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
                            {t("clickToUpload")}
                          </span>
                          <span className="text-xs text-gray-400 mt-1">
                            {t("fileTypes")}
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
                        {t("howDidYouFind")}
                      </label>
                      <select
                        name="comoNosConocio"
                        value={formData.comoNosConocio}
                        onChange={handleChange}
                        className="w-full px-4 py-2.5 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#0099ce] focus:border-transparent transition-all"
                      >
                        <option value="">{t("select")}</option>
                        <option value="google">{t("findGoogle")}</option>
                        <option value="referido">{t("findReferral")}</option>
                        <option value="redes">{t("findSocial")}</option>
                        <option value="evento">{t("findEvent")}</option>
                        <option value="publicidad">{t("findAdvertising")}</option>
                        <option value="otro">{t("findOther")}</option>
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
                      {t("submitting")}
                    </>
                  ) : (
                    <>
                      {t("submitButton")}
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
                  {t("directContact")}
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
                      <span className="text-xs text-gray-500 block">{t("phone")}</span>
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
                  <h3 className="font-bold text-gray-900">{t("quickResponse")}</h3>
                </div>
                <p className="text-gray-600 text-sm">
                  {t("responseTimeDescription")}
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
                  <h3 className="font-bold text-gray-900">{t("location")}</h3>
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
