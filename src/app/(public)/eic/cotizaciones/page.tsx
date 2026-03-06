"use client";

import { useState, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { useTranslations } from "next-intl";
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
  Globe,
  Zap,
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
  const t = useTranslations("eicPage.cotizaciones");
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
    // Product details
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
    // Additional
    ubicacion: "",
    descripcion: "",
    comoNosConocio: "",
  });

  // Filtered products based on selected category
  const filteredProducts = formData.categoriaProducto
    ? eicProducts.filter(
        (p) => p.categorySlug === formData.categoriaProducto
      )
    : eicProducts;

  // Filtered brands based on selected category
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
      if (!json.success) throw new Error(json.message || t("errorSubmit"));
      setCodigo(json.codigo);
      setIsSuccess(true);
    } catch (err) {
      setSubmitError(err instanceof Error ? err.message : t("errorConnection"));
    } finally {
      setIsSubmitting(false);
    }
  };

  const handlePhoneChange = (value: string) => {
    setFormData((prev) => ({ ...prev, telefono: value }));
  };

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => {
      const updated = { ...prev, [name]: value };
      // Reset dependent fields when category changes
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
            <div className="bg-[#009e49]/5 border border-[#009e49]/20 rounded-xl p-4 mb-4">
              <p className="text-xs text-[#009e49] uppercase tracking-wider font-semibold mb-1">{t("referenceNumber")}</p>
              <p className="text-2xl font-bold text-[#009e49] tracking-widest">{codigo}</p>
              <p className="text-xs text-gray-500 mt-1">{t("saveCode")}</p>
            </div>
          )}
          <p className="text-gray-600 mb-6">
            {t("successDescription")}
          </p>
          <div className="bg-[#009e49]/10 rounded-xl p-4 mb-6">
            <p className="text-sm text-gray-700">
              <strong>{t("estimatedResponseTime")}</strong>
              <br />
              {t("responseTimeValue")}
            </p>
          </div>
          <div className="space-y-3">
            <Link
              href="/eic"
              className="block w-full px-6 py-3 bg-[#009e49] hover:bg-[#007d3a] text-white font-semibold rounded-xl transition-colors"
            >
              {t("backToEic")}
            </Link>
            <Link
              href="/eic/productos"
              className="block w-full px-6 py-3 border border-gray-300 text-gray-700 hover:bg-gray-50 font-medium rounded-xl transition-colors"
            >
              {t("viewProducts")}
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
      <section className="bg-gradient-to-br from-[#009e49] via-[#007d3a] to-[#00269b] text-white py-12 lg:py-16">
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
            <span className="text-white">{t("breadcrumb")}</span>
          </nav>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-3xl"
          >
            <div className="flex items-center gap-3 mb-4">
              <Globe size={28} className="text-white/80" />
              <span className="px-3 py-1.5 bg-white/10 backdrop-blur-sm rounded-full text-sm font-medium">
                Eminsa International Corporation
              </span>
            </div>
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
                    {t("contactInfo")}
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
                        className="w-full px-4 py-2.5 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#009e49] focus:border-transparent transition-all"
                        placeholder={t("namePlaceholder")}
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1.5">
                        {t("company")} *
                      </label>
                      <input
                        type="text"
                        name="empresa"
                        required
                        value={formData.empresa}
                        onChange={handleChange}
                        className="w-full px-4 py-2.5 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#009e49] focus:border-transparent transition-all"
                        placeholder={t("companyPlaceholder")}
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1.5">
                        {t("email")} *
                      </label>
                      <input
                        type="email"
                        name="email"
                        required
                        value={formData.email}
                        onChange={handleChange}
                        className="w-full px-4 py-2.5 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#009e49] focus:border-transparent transition-all"
                        placeholder={t("emailPlaceholder")}
                      />
                    </div>
                    <div>
                      <PhoneInputField
                        value={formData.telefono}
                        onChange={handlePhoneChange}
                        label={t("phone")}
                        required
                        focusColor="#009e49"
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
                        className="w-full px-4 py-2.5 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#009e49] focus:border-transparent transition-all"
                        placeholder={t("positionPlaceholder")}
                      />
                    </div>
                  </div>
                </div>

                {/* Section: Detalles del Producto */}
                <div className="mb-8">
                  <h2 className="text-xl font-bold text-gray-900 mb-4 pb-2 border-b">
                    {t("productDetails")}
                  </h2>
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1.5">
                        {t("productCategory")} *
                      </label>
                      <select
                        name="categoriaProducto"
                        required
                        value={formData.categoriaProducto}
                        onChange={handleChange}
                        className="w-full px-4 py-2.5 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#009e49] focus:border-transparent transition-all"
                      >
                        <option value="">{t("select")}</option>
                        {eicProductCategories.map((cat) => (
                          <option key={cat.id} value={cat.slug}>
                            {cat.name}
                          </option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1.5">
                        {t("specificProduct")}
                      </label>
                      <select
                        name="productoEspecifico"
                        value={formData.productoEspecifico}
                        onChange={handleChange}
                        className="w-full px-4 py-2.5 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#009e49] focus:border-transparent transition-all"
                      >
                        <option value="">{t("select")}</option>
                        {filteredProducts.map((prod) => (
                          <option key={prod.id} value={prod.slug}>
                            {prod.shortName} ({prod.brand})
                          </option>
                        ))}
                        <option value="otro">{t("otherNotSure")}</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1.5">
                        {t("preferredBrand")}
                      </label>
                      <select
                        name="marca"
                        value={formData.marca}
                        onChange={handleChange}
                        className="w-full px-4 py-2.5 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#009e49] focus:border-transparent transition-all"
                      >
                        <option value="">{t("noPreference")}</option>
                        {filteredBrands.map((brand) => (
                          <option key={brand.id} value={brand.name}>
                            {brand.name} ({brand.country})
                          </option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1.5">
                        {t("quantity")}
                      </label>
                      <input
                        type="number"
                        name="cantidad"
                        min="1"
                        value={formData.cantidad}
                        onChange={handleChange}
                        className="w-full px-4 py-2.5 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#009e49] focus:border-transparent transition-all"
                      />
                    </div>
                    <div className="sm:col-span-2">
                      <label className="block text-sm font-medium text-gray-700 mb-1.5">
                        {t("urgency")}
                      </label>
                      <select
                        name="urgencia"
                        value={formData.urgencia}
                        onChange={handleChange}
                        className="w-full px-4 py-2.5 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#009e49] focus:border-transparent transition-all"
                      >
                        <option value="normal">{t("urgencyNormal")}</option>
                        <option value="prioritario">
                          {t("urgencyPriority")}
                        </option>
                        <option value="urgente">
                          {t("urgencyUrgent")}
                        </option>
                      </select>
                    </div>
                  </div>

                  {/* Transformer specs — only visible when category is Transformadores */}
                  {showTransformerFields && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      transition={{ duration: 0.3 }}
                      className="mt-6 bg-[#009e49]/5 border border-[#009e49]/20 rounded-xl p-5 overflow-hidden"
                    >
                      <div className="flex items-center gap-2 mb-4">
                        <Zap className="w-5 h-5 text-[#009e49]" />
                        <h3 className="font-semibold text-gray-800">{t("transformerSpecs")}</h3>
                      </div>
                      <div className="grid sm:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1.5">
                            {t("power")}
                          </label>
                          <input
                            type="text"
                            name="potencia"
                            value={formData.potencia}
                            onChange={handleChange}
                            className="w-full px-4 py-2.5 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#009e49] focus:border-transparent transition-all"
                            placeholder={t("powerPlaceholder")}
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1.5">
                            {t("configuration")}
                          </label>
                          <select
                            name="configuracion"
                            value={formData.configuracion}
                            onChange={handleChange}
                            className="w-full px-4 py-2.5 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#009e49] focus:border-transparent transition-all"
                          >
                            <option value="">{t("select")}</option>
                            <option value="monofasico">{t("singlePhase")}</option>
                            <option value="trifasico">{t("threePhase")}</option>
                            <option value="autoprotegido">{t("selfProtected")}</option>
                          </select>
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
                            className="w-full px-4 py-2.5 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#009e49] focus:border-transparent transition-all"
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
                            className="w-full px-4 py-2.5 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#009e49] focus:border-transparent transition-all"
                            placeholder={t("secondaryVoltagePlaceholder")}
                          />
                        </div>
                        <div className="sm:col-span-2">
                          <label className="block text-sm font-medium text-gray-700 mb-1.5">
                            {t("energyDistributor")}
                          </label>
                          <select
                            name="distribuidora"
                            value={formData.distribuidora}
                            onChange={handleChange}
                            className="w-full px-4 py-2.5 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#009e49] focus:border-transparent transition-all"
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
                </div>

                {/* Section: Información Adicional */}
                <div className="mb-8">
                  <h2 className="text-xl font-bold text-gray-900 mb-4 pb-2 border-b">
                    {t("additionalInfo")}
                  </h2>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1.5">
                        {t("projectLocation")}
                      </label>
                      <input
                        type="text"
                        name="ubicacion"
                        value={formData.ubicacion}
                        onChange={handleChange}
                        className="w-full px-4 py-2.5 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#009e49] focus:border-transparent transition-all"
                        placeholder={t("locationPlaceholder")}
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1.5">
                        {t("projectDescription")}
                      </label>
                      <textarea
                        name="descripcion"
                        value={formData.descripcion}
                        onChange={handleChange}
                        rows={4}
                        className="w-full px-4 py-2.5 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#009e49] focus:border-transparent transition-all resize-none"
                        placeholder={t("projectDescriptionPlaceholder")}
                      />
                    </div>

                    {/* File Upload */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1.5">
                        {t("attachFiles")}
                      </label>
                      <div className="border-2 border-dashed border-gray-300 rounded-xl p-4 hover:border-[#009e49] transition-colors">
                        <input
                          type="file"
                          multiple
                          accept=".pdf,.doc,.docx,.jpg,.jpeg,.png,.dwg,.xlsx,.xls"
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
                        {t("howDidYouFindUs")}
                      </label>
                      <select
                        name="comoNosConocio"
                        value={formData.comoNosConocio}
                        onChange={handleChange}
                        className="w-full px-4 py-2.5 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#009e49] focus:border-transparent transition-all"
                      >
                        <option value="">{t("select")}</option>
                        <option value="google">{t("sourceGoogle")}</option>
                        <option value="referido">
                          {t("sourceReferral")}
                        </option>
                        <option value="redes">{t("sourceSocial")}</option>
                        <option value="evento">{t("sourceEvent")}</option>
                        <option value="publicidad">{t("sourceAdvertising")}</option>
                        <option value="representante">
                          {t("sourceBrandRep")}
                        </option>
                        <option value="otro">{t("sourceOther")}</option>
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
                  className="w-full px-6 py-4 bg-[#009e49] hover:bg-[#007d3a] disabled:bg-[#009e49]/50 text-white font-semibold rounded-xl transition-colors flex items-center justify-center gap-2"
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
                    className="flex items-center gap-3 p-3 bg-gray-50 rounded-xl hover:bg-[#009e49]/10 transition-colors"
                  >
                    <div className="w-10 h-10 rounded-lg bg-[#009e49]/20 flex items-center justify-center">
                      <Phone size={20} className="text-[#009e49]" />
                    </div>
                    <div>
                      <span className="text-xs text-gray-500 block">
                        {t("phone")}
                      </span>
                      <span className="font-semibold text-gray-900">
                        {contactInfo.phone}
                      </span>
                    </div>
                  </a>
                  <a
                    href={`mailto:${contactInfo.email}`}
                    className="flex items-center gap-3 p-3 bg-gray-50 rounded-xl hover:bg-[#009e49]/10 transition-colors"
                  >
                    <div className="w-10 h-10 rounded-lg bg-[#009e49]/20 flex items-center justify-center">
                      <Mail size={20} className="text-[#009e49]" />
                    </div>
                    <div>
                      <span className="text-xs text-gray-500 block">Email</span>
                      <span className="font-semibold text-gray-900 text-sm">
                        {contactInfo.email}
                      </span>
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
                className="bg-[#009e49]/10 rounded-2xl p-6"
              >
                <div className="flex items-center gap-3 mb-3">
                  <Clock size={24} className="text-[#009e49]" />
                  <h3 className="font-bold text-gray-900">{t("fastResponse")}</h3>
                </div>
                <p className="text-gray-600 text-sm">
                  {t("fastResponseDescription")}
                </p>
              </motion.div>

              {/* International Badge */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.35 }}
                className="bg-gradient-to-br from-[#009e49] to-[#007d3a] rounded-2xl p-6 text-white"
              >
                <div className="flex items-center gap-3 mb-3">
                  <Globe size={24} />
                  <h3 className="font-bold">{t("internationalSuppliers")}</h3>
                </div>
                <p className="text-white/90 text-sm mb-3">
                  {t("internationalSuppliersDescription")}
                </p>
                <div className="flex flex-wrap gap-1.5">
                  {["INATRA", "Hammond", "Elpitalia", "Top Cable", "Schneider"].map(
                    (brand) => (
                      <span
                        key={brand}
                        className="px-2 py-0.5 bg-white/20 text-white text-xs rounded-full"
                      >
                        {brand}
                      </span>
                    )
                  )}
                  <span className="px-2 py-0.5 bg-white/20 text-white text-xs rounded-full">
                    +3 más
                  </span>
                </div>
              </motion.div>

              {/* Location */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="bg-white rounded-2xl p-6 shadow-lg"
              >
                <div className="flex items-center gap-3 mb-3">
                  <MapPin size={24} className="text-[#009e49]" />
                  <h3 className="font-bold text-gray-900">{t("location")}</h3>
                </div>
                <p className="text-gray-600 text-sm">{contactInfo.address}</p>
              </motion.div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default function EICCotizacionesPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-gray-50 flex items-center justify-center">
          <Loader2 size={40} className="animate-spin text-[#009e49]" />
        </div>
      }
    >
      <CotizacionesForm />
    </Suspense>
  );
}
