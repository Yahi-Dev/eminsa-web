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
} from "lucide-react";
import { services, contactInfo } from "@/config/navigation";
import { getWhatsAppUrl } from "@/utils/whatsapp";
import { PhoneInputField } from "@/components/ui/PhoneInputField";
import { useTranslations } from "next-intl";

export default function CotizacionServiciosPage() {
  const t = useTranslations("pages.servicios.cotizacionPage");
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

    if (!formData.nombre.trim())
      newErrors.nombre = t("validationName");
    if (!formData.email.trim()) newErrors.email = t("validationEmail");
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = t("validationEmailInvalid");
    }
    if (!formData.telefono.trim())
      newErrors.telefono = t("validationPhone");
    if (!formData.tipoServicio)
      newErrors.tipoServicio = t("validationService");
    if (!formData.descripcion.trim())
      newErrors.descripcion = t("validationDescription");

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
        setErrors((prev) => ({ ...prev, general: result.message || t("errorGeneral") }));
      }
    } catch {
      setErrors((prev) => ({ ...prev, general: t("errorConnection") }));
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
    { value: 'distribucion', label: t("equipmentOptions.distribucion") },
    { value: 'potencia', label: t("equipmentOptions.potencia") },
    { value: 'pad-mounted', label: t("equipmentOptions.padMounted") },
    { value: 'tipo-poste', label: t("equipmentOptions.tipoPoste") },
    { value: 'subestacion', label: t("equipmentOptions.subestacion"), excludeAlquiler: true },
    { value: 'otro', label: t("equipmentOptions.otro") },
  ];

  if (isSubmitted) {
    return (
      <div className="min-h-screen bg-gray-50">
        <section className="relative bg-gradient-to-br from-[#6d6e6d] via-[#575857] to-[#414241] text-white py-16 overflow-hidden">
          <div className="container-eminsa relative">
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex items-center gap-2 text-white/60 text-sm mb-8"
            >
              <Link href="/" className="hover:text-white transition-colors">
                {t("breadcrumbHome")}
              </Link>
              <ChevronRight size={16} />
              <Link
                href="/servicios"
                className="hover:text-white transition-colors"
              >
                {t("breadcrumbServicios")}
              </Link>
              <ChevronRight size={16} />
              <span className="text-white">{t("breadcrumbTitle")}</span>
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
              {t("successTitle")}
            </h2>
            {codigo && (
              <div className="bg-[#00269b]/5 border border-[#00269b]/20 rounded-xl p-4 mb-6">
                <p className="text-xs text-[#00269b] uppercase tracking-wider font-semibold mb-1">{t("referenceNumber")}</p>
                <p className="text-2xl font-bold text-[#00269b] tracking-widest">{codigo}</p>
                <p className="text-xs text-gray-500 mt-1">{t("saveCode")}</p>
              </div>
            )}
            <p className="text-gray-600 mb-8 text-lg">
              {t("successDescription")}
            </p>

            <div className="bg-white rounded-2xl p-8 border border-gray-100 shadow-sm mb-8">
              <h3 className="font-bold text-[#00269b] mb-4">
                {t("meanwhile")}
              </h3>
              <div className="space-y-3 text-left">
                <div className="flex items-center gap-3">
                  <CheckCircle2 size={20} className="text-[#00269b]" />
                  <span className="text-gray-600">
                    {t("checkEmail")}
                  </span>
                </div>
                <div className="flex items-center gap-3">
                  <CheckCircle2 size={20} className="text-[#00269b]" />
                  <span className="text-gray-600">
                    {t("prepareInfo")}
                  </span>
                </div>
                <div className="flex items-center gap-3">
                  <CheckCircle2 size={20} className="text-[#00269b]" />
                  <span className="text-gray-600">
                    {t("ifUrgent")}
                  </span>
                </div>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/servicios"
                className="inline-flex items-center justify-center gap-2 bg-[#00269b] hover:bg-[#575857] text-white px-6 py-3 rounded-xl font-semibold transition-colors"
              >
                {t("viewOurServices")}
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
                {t("newQuote")}
              </button>
            </div>

            <div className="mt-8 pt-8 border-t border-gray-200">
              <p className="text-sm text-gray-600 mb-4">
                {t("needImmediate")}
              </p>
              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <a
                  href={`tel:${contactInfo.phone}`}
                  className="inline-flex items-center justify-center gap-2 text-[#00269b] hover:text-[#00269b] font-medium transition-colors"
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
      <section className="relative bg-gradient-to-br from-[#6d6e6d] via-[#575857] to-[#414241] text-white py-16 lg:py-20 overflow-hidden">
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
              {t("breadcrumbHome")}
            </Link>
            <ChevronRight size={16} />
            <Link
              href="/servicios"
              className="hover:text-white transition-colors"
            >
              {t("breadcrumbServicios")}
            </Link>
            <ChevronRight size={16} />
            <span className="text-white">{t("breadcrumbTitle")}</span>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="max-w-3xl"
          >
            <h1 className="text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold mb-4 leading-tight">
              {t("title")}
            </h1>
            <p className="text-lg md:text-xl text-white/90 leading-relaxed">
              {t("description")}
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
                  <h2 className="text-2xl font-bold text-[#00269b] mb-6">
                    {t("contactInfo")}
                  </h2>

                  <div className="grid md:grid-cols-2 gap-6 mb-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        {t("fullName")} <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        name="nombre"
                        value={formData.nombre}
                        onChange={handleInputChange}
                        className={`w-full px-4 py-3 rounded-lg border ${
                          errors.nombre
                            ? "border-red-300 focus:border-red-500"
                            : "border-gray-300 focus:border-[#00269b]"
                        } focus:outline-none focus:ring-2 focus:ring-[#00269b]/20 transition-colors`}
                        placeholder={t("namePlaceholder")}
                      />
                      {errors.nombre && (
                        <p className="mt-1 text-sm text-red-500">
                          {errors.nombre}
                        </p>
                      )}
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        {t("company")}
                      </label>
                      <input
                        type="text"
                        name="empresa"
                        value={formData.empresa}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-[#00269b] focus:outline-none focus:ring-2 focus:ring-[#00269b]/20 transition-colors"
                        placeholder={t("companyPlaceholder")}
                      />
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-6 mb-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        {t("email")} <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        className={`w-full px-4 py-3 rounded-lg border ${
                          errors.email
                            ? "border-red-300 focus:border-red-500"
                            : "border-gray-300 focus:border-[#00269b]"
                        } focus:outline-none focus:ring-2 focus:ring-[#00269b]/20 transition-colors`}
                        placeholder={t("emailPlaceholder")}
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
                        label={t("phoneLabel")}
                        required
                        error={errors.telefono}
                        focusColor="#00269b"
                      />
                    </div>
                  </div>

                  <div className="border-t border-gray-200 my-8"></div>

                  <h2 className="text-2xl font-bold text-[#00269b] mb-6">
                    {t("serviceDetails")}
                  </h2>

                  <div className="grid md:grid-cols-2 gap-6 mb-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        {t("serviceType")} <span className="text-red-500">*</span>
                      </label>
                      <select
                        name="tipoServicio"
                        value={formData.tipoServicio}
                        onChange={handleInputChange}
                        className={`w-full px-4 py-3 rounded-lg border ${
                          errors.tipoServicio
                            ? "border-red-300 focus:border-red-500"
                            : "border-gray-300 focus:border-[#00269b]"
                        } focus:outline-none focus:ring-2 focus:ring-[#00269b]/20 transition-colors`}
                      >
                        <option value="">{t("selectService")}</option>
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
                        {t("equipmentType")}
                      </label>
                      <select
                        name="tipoEquipo"
                        value={formData.tipoEquipo}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-[#00269b] focus:outline-none focus:ring-2 focus:ring-[#00269b]/20 transition-colors"
                      >
                        <option value="">{t("selectEquipment")}</option>
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
                      className="mb-6 bg-[#00269b]/5 border border-[#00269b]/20 rounded-xl p-5 overflow-hidden"
                    >
                      <div className="flex items-center gap-2 mb-4">
                        <Zap className="w-5 h-5 text-[#00269b]" />
                        <h3 className="font-semibold text-gray-800">{t("equipmentSpecs")}</h3>
                      </div>
                      <div className="grid md:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            {t("power")}
                          </label>
                          <input
                            type="text"
                            name="potencia"
                            value={formData.potencia}
                            onChange={handleInputChange}
                            className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-[#00269b] focus:outline-none focus:ring-2 focus:ring-[#00269b]/20 transition-colors"
                            placeholder={t("powerPlaceholder")}
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            {t("configuration")}
                          </label>
                          <select
                            name="configuracion"
                            value={formData.configuracion}
                            onChange={handleInputChange}
                            className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-[#00269b] focus:outline-none focus:ring-2 focus:ring-[#00269b]/20 transition-colors"
                          >
                            <option value="">{t("selectConfig")}</option>
                            <option value="monofasico">{t("singlePhase")}</option>
                            <option value="trifasico">{t("threePhase")}</option>
                            <option value="autoprotegido">{t("selfProtected")}</option>
                          </select>
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            {t("primaryVoltage")}
                          </label>
                          <input
                            type="text"
                            name="voltajePrimario"
                            value={formData.voltajePrimario}
                            onChange={handleInputChange}
                            className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-[#00269b] focus:outline-none focus:ring-2 focus:ring-[#00269b]/20 transition-colors"
                            placeholder={t("primaryVoltagePlaceholder")}
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            {t("secondaryVoltage")}
                          </label>
                          <input
                            type="text"
                            name="voltajeSecundario"
                            value={formData.voltajeSecundario}
                            onChange={handleInputChange}
                            className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-[#00269b] focus:outline-none focus:ring-2 focus:ring-[#00269b]/20 transition-colors"
                            placeholder={t("secondaryVoltagePlaceholder")}
                          />
                        </div>
                        <div className="md:col-span-2">
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            {t("energyDistributor")}
                          </label>
                          <select
                            name="distribuidora"
                            value={formData.distribuidora}
                            onChange={handleInputChange}
                            className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-[#00269b] focus:outline-none focus:ring-2 focus:ring-[#00269b]/20 transition-colors"
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
                      </div>
                    </motion.div>
                  )}

                  <div className="mb-6">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      {t("equipmentLocation")}
                    </label>
                    <input
                      type="text"
                      name="ubicacion"
                      value={formData.ubicacion}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-[#00269b] focus:outline-none focus:ring-2 focus:ring-[#00269b]/20 transition-colors"
                      placeholder={t("locationPlaceholder")}
                    />
                  </div>

                  <div className="mb-6">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      {t("requirementsDescription")}{" "}
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
                          : "border-gray-300 focus:border-[#00269b]"
                      } focus:outline-none focus:ring-2 focus:ring-[#00269b]/20 transition-colors resize-none`}
                      placeholder={t("requirementsPlaceholder")}
                    />
                    {errors.descripcion && (
                      <p className="mt-1 text-sm text-red-500">
                        {errors.descripcion}
                      </p>
                    )}
                  </div>

                  <div className="mb-6">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      {t("attachDocument")}
                    </label>
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
                        <span className="text-sm text-gray-600">{t("clickToUpload")}</span>
                        <span className="text-xs text-gray-400 mt-1">{t("fileTypes")}</span>
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

                  <div className="mb-8">
                    <label className="flex items-center gap-3 cursor-pointer">
                      <input
                        type="checkbox"
                        name="urgente"
                        checked={formData.urgente}
                        onChange={handleInputChange}
                        className="w-5 h-5 rounded border-gray-300 text-[#00269b] focus:ring-[#00269b]"
                      />
                      <span className="text-sm font-medium text-gray-700">
                        {t("urgentService")}
                      </span>
                    </label>
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-[#00269b] hover:bg-[#575857] text-white px-8 py-4 rounded-xl font-bold text-lg transition-all shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2 size={20} className="animate-spin" />
                        {t("sending")}
                      </>
                    ) : (
                      <>
                        <Send size={20} />
                        {t("sendRequest")}
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
                  <div className="w-12 h-12 bg-[#00269b]/10 rounded-xl flex items-center justify-center">
                    <Clock size={24} className="text-[#00269b]" />
                  </div>
                  <div>
                    <h3 className="font-bold text-[#00269b]">
                      {t("quickResponse")}
                    </h3>
                    <p className="text-sm text-gray-600">{t("quickResponseTime")}</p>
                  </div>
                </div>
                <p className="text-sm text-gray-600">
                  {t("quickResponseDesc")}
                </p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100"
              >
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 bg-[#00269b]/10 rounded-xl flex items-center justify-center">
                    <Shield size={24} className="text-[#00269b]" />
                  </div>
                  <div>
                    <h3 className="font-bold text-[#00269b]">
                      {t("experience")}
                    </h3>
                    <p className="text-sm text-gray-600">{t("experienceSubtitle")}</p>
                  </div>
                </div>
                <p className="text-sm text-gray-600">
                  {t("experienceDesc")}
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
                    <h3 className="font-bold text-[#00269b]">
                      {t("emergencyService")}
                    </h3>
                    <p className="text-sm text-gray-600">{t("emergencyAvailable")}</p>
                  </div>
                </div>
                <p className="text-sm text-gray-600 mb-4">
                  {t("emergencyDesc")}
                </p>
                <div className="space-y-2">
                  <a
                    href={`tel:${contactInfo.phone}`}
                    className="flex items-center gap-2 text-sm text-[#00269b] hover:text-[#00269b] transition-colors"
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
                className="bg-gradient-to-br from-[#00269b] to-[#00175d] rounded-2xl p-6 text-white"
              >
                <Settings size={32} className="mb-4 opacity-80" />
                <h3 className="font-bold text-lg mb-2">
                  {t("needHelp")}
                </h3>
                <p className="text-white/90 text-sm mb-4">
                  {t("needHelpDesc")}
                </p>
                <a
                  href={`tel:${contactInfo.phone}`}
                  className="inline-flex items-center gap-2 bg-white text-[#00269b] px-4 py-2 rounded-lg font-semibold hover:bg-white/90 transition-colors text-sm"
                >
                  <Phone size={16} />
                  {t("callNow")}
                </a>
              </motion.div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
