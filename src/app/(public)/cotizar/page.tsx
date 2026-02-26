"use client";

import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  Send,
  ChevronRight,
  CheckCircle2,
  Phone,
  MessageCircle,
  Building,
  User,
  FileText
} from "lucide-react";
import { contactInfo } from "@/config/navigation";
import { getWhatsAppUrl } from "@/utils/whatsapp";
import { PhoneInputField } from "@/components/ui/PhoneInputField";
import { useTranslations } from "next-intl";

const capacidades = [
  "15 kVA", "25 kVA", "30 kVA", "37.5 kVA", "50 kVA",
  "75 kVA", "100 kVA", "150 kVA", "225 kVA", "300 kVA",
  "500 kVA", "750 kVA", "1000 kVA", "Otro"
];

export default function CotizarPage() {
  const t = useTranslations("pages.cotizar");
  const tCommon = useTranslations("pages.common");

  const tiposServicio = [
    { value: "mtn-transformador", labelKey: "tiposServicio.mtnTransformador", category: "MTN" },
    { value: "etrys-reparacion", labelKey: "tiposServicio.etrysReparacion", category: "ETRYS" },
    { value: "etrys-remanufacturado", labelKey: "tiposServicio.etrysRemanufacturado", category: "ETRYS" },
    { value: "etrys-alquiler", labelKey: "tiposServicio.etrysAlquiler", category: "ETRYS" },
    { value: "eic-importacion", labelKey: "tiposServicio.eicImportacion", category: "EIC" },
    { value: "servicio-preventivo", labelKey: "tiposServicio.servicioPreventivo", category: "Servicios" },
    { value: "servicio-correctivo", labelKey: "tiposServicio.servicioCorrectivo", category: "Servicios" },
    { value: "servicio-emergencia", labelKey: "tiposServicio.servicioEmergencia", category: "Servicios" },
    { value: "otro", labelKey: "tiposServicio.otro", category: "Otro" },
  ];

  const tiposTransformador = [
    { value: "poste-monofasico", labelKey: "tiposTransformador.posteMonofasico" },
    { value: "poste-trifasico", labelKey: "tiposTransformador.posteTrifasico" },
    { value: "pad-monofasico", labelKey: "tiposTransformador.padMonofasico" },
    { value: "pad-trifasico", labelKey: "tiposTransformador.padTrifasico" },
    { value: "subestacion", labelKey: "tiposTransformador.subestacion" },
    { value: "seco-resina", labelKey: "tiposTransformador.secoResina" },
    { value: "no-aplica", labelKey: "tiposTransformador.noAplica" },
  ];

  const [formData, setFormData] = useState({
    nombre: "",
    empresa: "",
    email: "",
    telefono: "",
    tipoServicio: "",
    tipoTransformador: "",
    capacidad: "",
    cantidad: "1",
    ubicacion: "",
    mensaje: "",
    urgente: false,
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    await new Promise(resolve => setTimeout(resolve, 2000));
    setIsSubmitting(false);
    setIsSubmitted(true);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === "checkbox" ? (e.target as HTMLInputElement).checked : value
    }));
  };

  const handlePhoneChange = (value: string) => {
    setFormData(prev => ({ ...prev, telefono: value }));
  };

  return (
    <>
      {/* Hero */}
      <section className="relative py-20 bg-gradient-to-br from-[#001689] to-[#000E53]">
        <div className="container-eminsa relative">
          <div className="flex items-center gap-2 text-white/60 text-sm mb-8">
            <Link href="/" className="hover:text-white transition-colors">{tCommon("home")}</Link>
            <ChevronRight size={16} />
            <span className="text-white">{t("breadcrumb")}</span>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-2xl"
          >
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
              {t("title")}
            </h1>
            <p className="text-xl text-white/80">
              {t("description")}
            </p>
          </motion.div>
        </div>
      </section>

      {/* Form Section */}
      <section className="py-16 bg-gray-50">
        <div className="container-eminsa">
          <div className="grid lg:grid-cols-3 gap-12">
            {/* Form */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              className="lg:col-span-2"
            >
              <div className="bg-white rounded-3xl shadow-xl overflow-hidden">
                {isSubmitted ? (
                  <div className="p-12 text-center">
                    <div className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-8">
                      <CheckCircle2 className="w-12 h-12 text-green-600" />
                    </div>
                    <h2 className="text-3xl font-bold text-[#001689] mb-4">
                      {t("success.title")}
                    </h2>
                    <p className="text-[#76777A] text-lg mb-8 max-w-md mx-auto">
                      {t("success.description")}
                    </p>
                    <div className="flex flex-wrap justify-center gap-4">
                      <button onClick={() => setIsSubmitted(false)} className="btn-primary">
                        {t("success.newRequest")}
                      </button>
                      <Link href="/" className="btn-secondary">
                        {t("success.backHome")}
                      </Link>
                    </div>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="p-8 lg:p-10 space-y-8">
                    {/* Contact Info */}
                    <div>
                      <div className="flex items-center gap-3 mb-6">
                        <div className="w-12 h-12 bg-[#001689]/10 rounded-xl flex items-center justify-center">
                          <User className="w-6 h-6 text-[#001689]" />
                        </div>
                        <div>
                          <h3 className="text-xl font-bold text-[#001689]">{t("sections.contact")}</h3>
                        </div>
                      </div>

                      <div className="grid md:grid-cols-2 gap-6">
                        <div>
                          <label className="input-label">{t("fields.fullName")} *</label>
                          <input type="text" name="nombre" value={formData.nombre} onChange={handleChange} required className="input-field" placeholder={t("fields.namePlaceholder")} />
                        </div>
                        <div>
                          <label className="input-label">{t("fields.company")}</label>
                          <input type="text" name="empresa" value={formData.empresa} onChange={handleChange} className="input-field" placeholder={t("fields.companyPlaceholder")} />
                        </div>
                        <div>
                          <label className="input-label">{t("fields.email")} *</label>
                          <input type="email" name="email" value={formData.email} onChange={handleChange} required className="input-field" placeholder={t("fields.emailPlaceholder")} />
                        </div>
                        <div>
                          <PhoneInputField
                            value={formData.telefono}
                            onChange={handlePhoneChange}
                            label={t("fields.phone") as string}
                            required
                            focusColor="#001689"
                          />
                        </div>
                      </div>
                    </div>

                    {/* Service Type */}
                    <div>
                      <div className="flex items-center gap-3 mb-6">
                        <div className="w-12 h-12 bg-[#00A3E0]/10 rounded-xl flex items-center justify-center">
                          <FileText className="w-6 h-6 text-[#00A3E0]" />
                        </div>
                        <div>
                          <h3 className="text-xl font-bold text-[#001689]">{t("sections.serviceType")}</h3>
                        </div>
                      </div>

                      <div className="grid md:grid-cols-2 gap-6">
                        <div className="md:col-span-2">
                          <label className="input-label">{t("fields.serviceType")} *</label>
                          <select name="tipoServicio" value={formData.tipoServicio} onChange={handleChange} required className="input-field">
                            <option value="">{t("selects.selectOption")}</option>
                            {tiposServicio.map((tipo) => (
                              <option key={tipo.value} value={tipo.value}>[{tipo.category}] {t(tipo.labelKey as Parameters<typeof t>[0])}</option>
                            ))}
                          </select>
                        </div>
                        <div>
                          <label className="input-label">{t("fields.transformerType")}</label>
                          <select name="tipoTransformador" value={formData.tipoTransformador} onChange={handleChange} className="input-field">
                            <option value="">{t("selects.select")}</option>
                            {tiposTransformador.map((tipo) => (
                              <option key={tipo.value} value={tipo.value}>{t(tipo.labelKey as Parameters<typeof t>[0])}</option>
                            ))}
                          </select>
                        </div>
                        <div>
                          <label className="input-label">{t("fields.capacity")}</label>
                          <select name="capacidad" value={formData.capacidad} onChange={handleChange} className="input-field">
                            <option value="">{t("selects.select")}</option>
                            {capacidades.map((cap) => (
                              <option key={cap} value={cap}>{cap}</option>
                            ))}
                          </select>
                        </div>
                      </div>
                    </div>

                    {/* Details */}
                    <div>
                      <div className="flex items-center gap-3 mb-6">
                        <div className="w-12 h-12 bg-[#00B140]/10 rounded-xl flex items-center justify-center">
                          <Building className="w-6 h-6 text-[#00B140]" />
                        </div>
                        <div>
                          <h3 className="text-xl font-bold text-[#001689]">{t("sections.details")}</h3>
                        </div>
                      </div>

                      <div className="grid md:grid-cols-2 gap-6">
                        <div>
                          <label className="input-label">{t("fields.quantity")}</label>
                          <input type="number" name="cantidad" value={formData.cantidad} onChange={handleChange} min="1" className="input-field" />
                        </div>
                        <div>
                          <label className="input-label">{t("fields.location")}</label>
                          <input type="text" name="ubicacion" value={formData.ubicacion} onChange={handleChange} className="input-field" placeholder={t("fields.locationPlaceholder")} />
                        </div>
                        <div className="md:col-span-2">
                          <label className="input-label">{t("fields.description")} *</label>
                          <textarea name="mensaje" value={formData.mensaje} onChange={handleChange} required rows={5} className="input-field resize-none" placeholder={t("fields.descriptionPlaceholder")} />
                        </div>
                      </div>

                      <div className="flex items-center gap-3 p-4 bg-orange-50 rounded-xl mt-6">
                        <input type="checkbox" name="urgente" checked={formData.urgente} onChange={handleChange} id="urgente" className="w-5 h-5" />
                        <label htmlFor="urgente" className="text-[#76777A]">
                          <span className="font-semibold text-[#FF5500]">{t("fields.urgentLabel")}</span> {t("fields.urgentDescription")}
                        </label>
                      </div>
                    </div>

                    <button type="submit" disabled={isSubmitting} className="btn-primary w-full justify-center disabled:opacity-50">
                      {isSubmitting ? (
                        <>
                          <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                          {t("submit.sending")}
                        </>
                      ) : (
                        <>
                          {t("submit.button")}
                          <Send size={18} />
                        </>
                      )}
                    </button>
                  </form>
                )}
              </div>
            </motion.div>

            {/* Sidebar */}
            <motion.div initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.2 }}>
              <div className="sticky top-24 space-y-6">
                <div className="bg-gradient-to-br from-[#001689] to-[#000E53] rounded-2xl p-6 text-white">
                  <h3 className="text-lg font-bold mb-4">{t("sidebar.callUs")}</h3>
                  <a href={`tel:${contactInfo.phone}`} className="flex items-center gap-3 mb-4 hover:text-[#00A3E0] transition-colors">
                    <Phone size={20} />
                    <span className="font-semibold">{contactInfo.phone}</span>
                  </a>
                  <a href={getWhatsAppUrl()} target="_blank" rel="noopener noreferrer" className="flex items-center justify-center gap-2 w-full px-4 py-3 bg-[#25D366] text-white font-semibold rounded-lg hover:bg-[#20BD5A] transition-all">
                    <MessageCircle size={18} />
                    WhatsApp
                  </a>
                </div>

                <div className="bg-white rounded-2xl shadow-lg p-6">
                  <h3 className="text-lg font-bold text-[#001689] mb-4">{t("sidebar.responseTime")}</h3>
                  <div className="flex items-center gap-4 mb-4">
                    <div className="text-4xl font-bold text-[#00A3E0]">&lt;30</div>
                    <div className="text-[#76777A] text-sm">{t("sidebar.responseUnit")}<br/>{t("sidebar.responseDetail")}</div>
                  </div>
                  <p className="text-[#76777A] text-sm">{t("sidebar.businessHours")}</p>
                </div>

                <div className="bg-gray-50 rounded-2xl p-6">
                  <h4 className="font-semibold text-[#001689] mb-4">{t("sidebar.certifications")}</h4>
                  <div className="flex gap-4">
                    <img src="/images/SelloAENORISO9001_NEG.png" alt="ISO 9001" className="h-12 object-contain" />
                    <img src="/images/IQNET_RCMark_PosCMYK.png" alt="IQNET" className="h-12 object-contain" />
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </>
  );
}
