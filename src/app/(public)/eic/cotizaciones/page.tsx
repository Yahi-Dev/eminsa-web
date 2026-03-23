"use client";

import { useState, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
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
  Globe,
  Zap,
  Shield,
} from "lucide-react";
import { contactInfo } from "@/config/navigation";
import { getWhatsAppUrl } from "@/utils/whatsapp";
import {
  eicProductCategories,
  eicProducts,
  eicBrands,
} from "@/config/eic-data";
import { PhoneInputField } from "@/components/ui/PhoneInputField";

function CotizacionesForm() {
  const searchParams = useSearchParams();
  const t = useTranslations("eicPage");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [codigo, setCodigo] = useState("");
  const [submitError, setSubmitError] = useState("");
  const [files, setFiles] = useState<File[]>([]);
  const [formData, setFormData] = useState({
    nombre: "",
    empresa: "",
    email: "",
    telefono: "",
    cargo: "",
    categoriaProducto: "",
    productoEspecifico: "",
    marca: "",
    cantidad: "1",
    potencia: "",
    voltajePrimario: "",
    voltajeSecundario: "",
    configuracion: "",
    distribuidora: "",
    urgencia: "normal",
    ubicacion: "",
    descripcion: "",
    comoNosConocio: "",
  });

  const filteredProducts = formData.categoriaProducto
    ? eicProducts.filter((p) => p.categorySlug === formData.categoriaProducto)
    : eicProducts;

  const filteredBrands = formData.categoriaProducto
    ? eicBrands.filter((b) => {
        const category = eicProductCategories.find(
          (c) => c.slug === formData.categoriaProducto
        );
        return category?.brands.includes(b.name);
      })
    : eicBrands;

  const showTransformerFields = formData.categoriaProducto === 'transformadores';

  useEffect(() => {
    const producto = searchParams.get("producto");
    const categoria = searchParams.get("categoria");
    if (producto) {
      const product = eicProducts.find((p) => p.slug === producto);
      if (product) {
        setFormData((prev) => ({
          ...prev,
          productoEspecifico: product.slug,
          categoriaProducto: product.categorySlug,
          marca: product.brand,
        }));
      }
    }
    if (categoria) {
      setFormData((prev) => ({ ...prev, categoriaProducto: categoria }));
    }
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
          unidad: 'EIC',
          nombre: formData.nombre,
          empresa: formData.empresa || undefined,
          email: formData.email,
          telefono: formData.telefono,
          urgente: formData.urgencia === 'urgente',
          detalles: {
            categoriaProducto: formData.categoriaProducto,
            productoEspecifico: (() => {
              if (!formData.productoEspecifico) return '';
              const found = filteredProducts.find(p => p.slug === formData.productoEspecifico);
              return found ? `${found.shortName} (${found.brand})` : formData.productoEspecifico;
            })(),
            marca: formData.marca,
            cantidad: formData.cantidad,
            urgencia: formData.urgencia,
            cargo: formData.cargo,
            ubicacion: formData.ubicacion,
            descripcion: formData.descripcion,
            comoNosConocio: formData.comoNosConocio,
            ...(formData.categoriaProducto === 'transformadores' ? {
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

  const handlePhoneChange = (value: string) => {
    setFormData((prev) => ({ ...prev, telefono: value }));
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => {
      const updated = { ...prev, [name]: value };
      if (name === "categoriaProducto") {
        updated.productoEspecifico = "";
        updated.marca = "";
        updated.potencia = "";
        updated.voltajePrimario = "";
        updated.voltajeSecundario = "";
        updated.configuracion = "";
        updated.distribuidora = "";
      }
      return updated;
    });
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
            {t("cotizaciones.successTitle")}
          </h2>
          {codigo && (
            <div className="bg-[#009e49]/5 border border-[#009e49]/20 rounded-xl p-4 mb-4">
              <p className="text-xs text-[#009e49] uppercase tracking-wider font-semibold mb-1">{t("cotizaciones.refNumber")}</p>
              <p className="text-2xl font-bold text-[#009e49] tracking-widest">{codigo}</p>
              <p className="text-xs text-gray-500 mt-1">{t("cotizaciones.saveCode")}</p>
            </div>
          )}
          <p className="text-gray-600 mb-6">
            {t("cotizaciones.teamReview")}
          </p>
          <div className="bg-[#009e49]/10 rounded-xl p-4 mb-6">
            <p className="text-sm text-gray-700">
              <strong>{t("cotizaciones.responseTime")}</strong><br />
              {t("cotizaciones.responseTimeValue")}
            </p>
          </div>
          <div className="flex flex-col gap-3">
            <Link
              href="/eic"
              className="block w-full px-6 py-3 bg-[#009e49] hover:bg-[#007d3a] text-white font-semibold rounded-xl transition-colors text-center"
            >
              {t("cotizaciones.backToEic")}
            </Link>
            <Link
              href="/eic/productos"
              className="block w-full px-6 py-3 border border-gray-300 text-gray-700 hover:bg-gray-50 font-medium rounded-xl transition-colors text-center"
            >
              {t("cotizaciones.viewProducts")}
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
                <div className="w-8 h-8 bg-[#009e49] text-white rounded-lg flex items-center justify-center text-sm font-bold shrink-0">1</div>
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
                  <label className="input-label">
                    {t("cotizaciones.form.company")} <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="empresa"
                    required
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
                    focusColor="#009e49"
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

            {/* Sección 2: Detalles del Producto */}
            <div>
              <h2 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-3">
                <div className="w-8 h-8 bg-[#009e49] text-white rounded-lg flex items-center justify-center text-sm font-bold shrink-0">2</div>
                {t("cotizaciones.form.productDetails")}
              </h2>
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="input-label">
                    {t("cotizaciones.form.productCategory")} <span className="text-red-500">*</span>
                  </label>
                  <select
                    name="categoriaProducto"
                    required
                    value={formData.categoriaProducto}
                    onChange={handleChange}
                    className="input-field"
                  >
                    <option value="">{t("cotizaciones.form.selectCategory")}</option>
                    {eicProductCategories.map((cat) => (
                      <option key={cat.id} value={cat.slug}>
                        {cat.name}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="input-label">{t("cotizaciones.form.specificProduct")}</label>
                  <select
                    name="productoEspecifico"
                    value={formData.productoEspecifico}
                    onChange={handleChange}
                    className="input-field"
                  >
                    <option value="">{t("cotizaciones.form.selectProduct")}</option>
                    {filteredProducts.map((prod) => (
                      <option key={prod.id} value={prod.slug}>
                        {prod.shortName} ({prod.brand})
                      </option>
                    ))}
                    <option value="otro">{t("cotizaciones.form.otherNotSure")}</option>
                  </select>
                </div>
                <div>
                  <label className="input-label">{t("cotizaciones.form.preferredBrand")}</label>
                  <select
                    name="marca"
                    value={formData.marca}
                    onChange={handleChange}
                    className="input-field"
                  >
                    <option value="">{t("cotizaciones.form.noPreference")}</option>
                    {filteredBrands.map((brand) => (
                      <option key={brand.id} value={brand.name}>
                        {brand.name} ({brand.country})
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="input-label">{t("cotizaciones.form.quantity")}</label>
                  <input
                    type="number"
                    name="cantidad"
                    min="1"
                    value={formData.cantidad}
                    onChange={handleChange}
                    className="input-field"
                  />
                </div>
                <div className="md:col-span-2">
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

              {/* Transformer specs */}
              {showTransformerFields && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  transition={{ duration: 0.3 }}
                  className="mt-6 bg-[#009e49]/5 border border-[#009e49]/20 rounded-xl p-5 overflow-hidden"
                >
                  <div className="flex items-center gap-2 mb-5">
                    <Zap className="w-5 h-5 text-[#009e49]" />
                    <h3 className="font-semibold text-gray-800">{t("cotizaciones.form.transformerSpecs")}</h3>
                  </div>
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label className="input-label">{t("cotizaciones.form.power")}</label>
                      <input
                        type="text"
                        name="potencia"
                        value={formData.potencia}
                        onChange={handleChange}
                        className="input-field"
                        placeholder={t("cotizaciones.form.powerPlaceholder")}
                      />
                    </div>
                    <div>
                      <label className="input-label">{t("cotizaciones.form.configuration")}</label>
                      <select
                        name="configuracion"
                        value={formData.configuracion}
                        onChange={handleChange}
                        className="input-field"
                      >
                        <option value="">{t("cotizaciones.form.select")}</option>
                        <option value="monofasico">{t("cotizaciones.form.singlePhase")}</option>
                        <option value="trifasico">{t("cotizaciones.form.threePhase")}</option>
                        <option value="autoprotegido">{t("cotizaciones.form.selfProtected")}</option>
                      </select>
                    </div>
                    <div>
                      <label className="input-label">{t("cotizaciones.form.primaryVoltage")}</label>
                      <input
                        type="text"
                        name="voltajePrimario"
                        value={formData.voltajePrimario}
                        onChange={handleChange}
                        className="input-field"
                        placeholder={t("cotizaciones.form.primaryVoltagePlaceholder")}
                      />
                    </div>
                    <div>
                      <label className="input-label">{t("cotizaciones.form.secondaryVoltage")}</label>
                      <input
                        type="text"
                        name="voltajeSecundario"
                        value={formData.voltajeSecundario}
                        onChange={handleChange}
                        className="input-field"
                        placeholder={t("cotizaciones.form.secondaryVoltagePlaceholder")}
                      />
                    </div>
                    <div className="md:col-span-2">
                      <label className="input-label">{t("cotizaciones.form.powerDistributor")}</label>
                      <select
                        name="distribuidora"
                        value={formData.distribuidora}
                        onChange={handleChange}
                        className="input-field"
                      >
                        <option value="">{t("cotizaciones.form.selectDistributor")}</option>
                        <option value="EDENORTE">EDENORTE</option>
                        <option value="EDESUR">EDESUR</option>
                        <option value="EDEESTE">EDEESTE</option>
                        <option value="CEPM">CEPM</option>
                        <option value="CAPCANA">CAPCANA</option>
                        <option value="USO INTERNO">{t("cotizaciones.form.internalUse")}</option>
                        <option value="OTROS">{t("cotizaciones.form.others")}</option>
                      </select>
                    </div>
                  </div>
                </motion.div>
              )}
            </div>

            {/* Sección 3: Información Adicional */}
            <div>
              <h2 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-3">
                <div className="w-8 h-8 bg-[#009e49] text-white rounded-lg flex items-center justify-center text-sm font-bold shrink-0">3</div>
                {t("cotizaciones.form.additionalInfo")}
              </h2>
              <div className="space-y-6">
                <div>
                  <label className="input-label">{t("cotizaciones.form.projectLocation")}</label>
                  <input
                    type="text"
                    name="ubicacion"
                    value={formData.ubicacion}
                    onChange={handleChange}
                    className="input-field"
                    placeholder={t("cotizaciones.form.projectLocationPlaceholder")}
                  />
                </div>
                <div>
                  <label className="input-label">{t("cotizaciones.form.projectDescription")}</label>
                  <textarea
                    name="descripcion"
                    value={formData.descripcion}
                    onChange={handleChange}
                    rows={4}
                    className="input-field resize-none"
                    placeholder={t("cotizaciones.form.projectDescriptionPlaceholder")}
                  />
                </div>

                {/* File Upload */}
                <div>
                  <label className="input-label">{t("cotizaciones.form.attachFiles")}</label>
                  <div className="border-2 border-dashed border-gray-300 rounded-xl p-4 hover:border-[#009e49] transition-colors">
                    <input
                      type="file"
                      multiple
                      accept=".pdf,.doc,.docx,.jpg,.jpeg,.png,.dwg,.xlsx,.xls"
                      onChange={handleFileChange}
                      className="hidden"
                      id="file-upload-eic"
                    />
                    <label htmlFor="file-upload-eic" className="flex flex-col items-center cursor-pointer">
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
                    <option value="representante">{t("cotizaciones.form.brandRep")}</option>
                    <option value="otro">{t("cotizaciones.form.other")}</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Submit */}
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full inline-flex items-center justify-center gap-2 px-6 py-3 bg-[#009e49] hover:bg-[#007d3a] text-white font-semibold rounded-lg transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
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
              className="flex items-center gap-3 p-3 bg-gray-50 rounded-xl hover:bg-[#009e49]/10 transition-colors"
            >
              <div className="w-10 h-10 rounded-lg bg-[#009e49]/20 flex items-center justify-center shrink-0">
                <Phone size={20} className="text-[#009e49]" />
              </div>
              <div>
                <span className="text-xs text-gray-500 block">{t("cotizaciones.phoneLabel")}</span>
                <span className="font-semibold text-gray-900">{contactInfo.phone}</span>
              </div>
            </a>
            <a
              href={`mailto:${contactInfo.email}`}
              className="flex items-center gap-3 p-3 bg-gray-50 rounded-xl hover:bg-[#009e49]/10 transition-colors"
            >
              <div className="w-10 h-10 rounded-lg bg-[#009e49]/20 flex items-center justify-center shrink-0">
                <Mail size={20} className="text-[#009e49]" />
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
          <h3 className="font-bold text-gray-900 mb-4">{t("cotizaciones.whyEic")}</h3>
          <div className="space-y-3">
            <div className="flex items-center gap-3 text-sm">
              <Clock size={18} className="text-[#009e49] shrink-0" />
              <span className="text-gray-600">{t("cotizaciones.response24h")}</span>
            </div>
            <div className="flex items-center gap-3 text-sm">
              <Globe size={18} className="text-[#009e49] shrink-0" />
              <span className="text-gray-600">{t("cotizaciones.certifiedProviders")}</span>
            </div>
            <div className="flex items-center gap-3 text-sm">
              <Shield size={18} className="text-[#009e49] shrink-0" />
              <span className="text-gray-600">{t("cotizaciones.technicalAdvice")}</span>
            </div>
          </div>
        </div>

        {/* International Suppliers */}
        <div className="bg-[#009e49] rounded-2xl p-6 text-white">
          <div className="flex items-center gap-3 mb-3">
            <Globe size={24} />
            <h3 className="font-bold">{t("cotizaciones.intlProviders")}</h3>
          </div>
          <p className="text-white/90 text-sm mb-3">
            {t("cotizaciones.intlProvidersDesc")}
          </p>
          <div className="flex flex-wrap gap-1.5">
            {["INATRA", "Hammond", "Elpitalia", "Top Cable", "Schneider"].map((brand) => (
              <span
                key={brand}
                className="px-2 py-0.5 bg-white/20 text-white text-xs rounded-full"
              >
                {brand}
              </span>
            ))}
            <span className="px-2 py-0.5 bg-white/20 text-white text-xs rounded-full">
              {t("cotizaciones.moreCount")}
            </span>
          </div>
        </div>

        {/* Location */}
        <div className="bg-white rounded-2xl shadow-lg p-6">
          <div className="flex items-center gap-3 mb-3">
            <MapPin size={24} className="text-[#009e49]" />
            <h3 className="font-bold text-gray-900">{t("cotizaciones.locationTitle")}</h3>
          </div>
          <p className="text-gray-600 text-sm">{contactInfo.address}</p>
        </div>
      </motion.div>
    </div>
  );
}

export default function EICCotizacionesPage() {
  const t = useTranslations("eicPage");

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero */}
      <section className="bg-[#009e49] text-white py-16 lg:py-20">
        <div className="container-eminsa">
          {/* Breadcrumb */}
          <nav className="flex items-center gap-2 text-white/70 text-sm mb-6">
            <Link href="/" className="hover:text-white transition-colors">
              <Home size={16} />
            </Link>
            <ChevronRight size={14} />
            <Link href="/eic" className="hover:text-white transition-colors">
              EIC
            </Link>
            <ChevronRight size={14} />
            <span className="text-white">{t("cotizaciones.pageTitle")}</span>
          </nav>

          <div className="max-w-2xl">
            <div className="flex items-center gap-3 mb-4">
              <Globe size={28} className="text-white/80" />
              <span className="px-3 py-1.5 bg-white/10 backdrop-blur-sm rounded-full text-sm font-medium">
                Eminsa International Corporation
              </span>
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
              <Loader2 size={40} className="animate-spin text-[#009e49]" />
            </div>
          }>
            <CotizacionesForm />
          </Suspense>
        </div>
      </section>
    </div>
  );
}
