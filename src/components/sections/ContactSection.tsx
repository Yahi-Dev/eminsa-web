"use client";

import { useState, useCallback } from "react";
import { motion } from "framer-motion";
import {
  Send,
  Phone,
  Mail,
  MapPin,
  MessageCircle,
  CheckCircle2,
  AlertCircle,
  Facebook,
  Instagram,
  Linkedin,
  Package,
  Settings
} from "lucide-react";
import { contactInfo } from "@/data/navigation";
import type { ContactFormData, ApiResponse } from "@/lib/types-contact";

// Definir categorías como se solicita
const CATEGORIAS_PRODUCTOS = [
  'Transformadores',
  'Capacitores',
  'Paneles',
  'Seccionadores',
  'Materiales Eléctricos',
  'Reguladores de Voltaje'
];

const CATEGORIAS_SERVICIOS = [
  'Mantenimiento & Reparación',
  'Diagnóstico & Asesoría',
  'Instalaciones y montajes eléctricos',
  'Diseño de instalaciones eléctricas',
  'Análisis de aceite Dieléctrico',
  'Alquiler de transformadores'
];

interface FormState {
  nombre: string;
  empresa: string;
  email: string;
  telefono: string;
  tipoConsulta: 'productos' | 'servicios' | '';
  categoria: string;
  mensaje: string;
}

interface FormErrors {
  [key: string]: string;
}

export default function ContactSection() {
  const [formData, setFormData] = useState<FormState>({
    nombre: "",
    empresa: "",
    email: "",
    telefono: "",
    tipoConsulta: "",
    categoria: "",
    mensaje: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [formErrors, setFormErrors] = useState<FormErrors>({});

  const categoriasDisponibles = formData.tipoConsulta === 'productos' 
    ? CATEGORIAS_PRODUCTOS 
    : formData.tipoConsulta === 'servicios'
    ? CATEGORIAS_SERVICIOS
    : [];

  const handleSubmit = useCallback(async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    setErrorMessage(null);
    setFormErrors({});

    try {
      // Preparar datos para envío
      const submitData: ContactFormData = {
        nombre: formData.nombre,
        empresa: formData.empresa || undefined,
        email: formData.email,
        telefono: formData.telefono,
        tipoConsulta: formData.tipoConsulta,
        categoria: formData.categoria || undefined,
        mensaje: formData.mensaje,
      };

      // Enviar solicitud al API
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(submitData),
      });

      const data: ApiResponse = await response.json();

      if (!response.ok) {
        // Errores de validación
        if (data.errors) {
          setFormErrors(data.errors);
          setErrorMessage("Por favor corrige los errores en el formulario.");
        } else {
          setErrorMessage(
            data.message || "Ocurrió un error al enviar tu solicitud. Intenta de nuevo."
          );
        }
        setIsSubmitting(false);
        return;
      }

      // Éxito
      setIsSubmitted(true);
      setFormData({
        nombre: "",
        empresa: "",
        email: "",
        telefono: "",
        tipoConsulta: "",
        categoria: "",
        mensaje: "",
      });
    } catch (error) {
      console.error("Error submitting form:", error);
      setErrorMessage(
        "Error de conexión. Por favor intenta de nuevo más tarde."
      );
      setIsSubmitting(false);
    }
  }, [formData]);

  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
      const { name, value } = e.target;
      
      // Si cambia el tipo de consulta, reiniciar la categoría
      if (name === 'tipoConsulta') {
        setFormData(prev => ({
          ...prev,
          [name]: value as 'productos' | 'servicios' | '',
          categoria: "" // Reiniciar categoría al cambiar tipo de consulta
        }));
      } else {
        setFormData(prev => ({
          ...prev,
          [name]: value
        }));
      }
      
      // Limpiar error de este campo cuando el usuario empieza a escribir
      if (formErrors[name]) {
        setFormErrors(prev => ({
          ...prev,
          [name]: ""
        }));
      }
    },
    [formErrors]
  );

  const handleTipoConsultaClick = useCallback((tipo: 'productos' | 'servicios') => {
    setFormData(prev => ({
      ...prev,
      tipoConsulta: tipo,
      categoria: ""
    }));
    
    // Limpiar error si existe
    if (formErrors.tipoConsulta) {
      setFormErrors(prev => ({
        ...prev,
        tipoConsulta: ""
      }));
    }
  }, [formErrors]);

  const resetForm = useCallback(() => {
    setIsSubmitted(false);
    setFormData({
      nombre: "",
      empresa: "",
      email: "",
      telefono: "",
      tipoConsulta: "",
      categoria: "",
      mensaje: "",
    });
    setErrorMessage(null);
    setFormErrors({});
  }, []);

  return (
    <section id="contacto" className="py-20 lg:py-32 bg-gray-50 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0">
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-[#001689]/5 rounded-full blur-[100px]" />
      </div>

      <div className="container-eminsa relative">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-[#001689] mb-4">
            Formulario de solicitud de {" "}
            <span className="text-[#00A3E0]">servicios, productos y contacto</span>
          </h2>
        </motion.div>

        <div className="grid lg:grid-cols-5 gap-12">
          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-2"
          >
            <div className="bg-gradient-to-br from-[#001689] to-[#000E53] rounded-3xl p-8 text-white h-full">
              <h3 className="text-2xl font-bold mb-6">Información de Contacto</h3>

              <div className="space-y-6 mb-10">
                {/* Dirección con link a Google Maps */}
                <a
                  href="https://www.google.com/maps/place/GRUPO+EMINSA/@18.5668907,-70.0613034,17z/data=!3m1!4b1!4m6!3m5!1s0x8eaff5f43e73b9b7:0x33640f05d61e41e1!8m2!3d18.5668907!4d-70.0587285!16s%2Fg%2F11w21dsggc?entry=tts&g_ep=EgoyMDI0MDkyMi4wKgBIAVAD"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-start gap-4 group"
                >
                  <div className="w-12 h-12 bg-white/10 rounded-xl flex items-center justify-center flex-shrink-0 group-hover:bg-white/20 transition-colors">
                    <MapPin size={20} />
                  </div>
                  <div>
                    <p className="text-white/60 text-sm mb-1">Dirección</p>
                    <p className="font-semibold group-hover:text-[#00A3E0] transition-colors">
                      Av. Duarte, Km 22, Parque industrial Duarte, Nave No. 6
                    </p>
                  </div>
                </a>

                {/* Email */}
                <a
                  href={`mailto:${contactInfo.email}`}
                  className="flex items-start gap-4 group"
                >
                  <div className="w-12 h-12 bg-white/10 rounded-xl flex items-center justify-center flex-shrink-0 group-hover:bg-white/20 transition-colors">
                    <Mail size={20} />
                  </div>
                  <div>
                    <p className="text-white/60 text-sm mb-1">Correo Electrónico</p>
                    <p className="font-semibold group-hover:text-[#00A3E0] transition-colors">
                      {contactInfo.email}
                    </p>
                  </div>
                </a>

                {/* Teléfono */}
                <a
                  href={`tel:${contactInfo.phone}`}
                  className="flex items-start gap-4 group"
                >
                  <div className="w-12 h-12 bg-white/10 rounded-xl flex items-center justify-center flex-shrink-0 group-hover:bg-white/20 transition-colors">
                    <Phone size={20} />
                  </div>
                  <div>
                    <p className="text-white/60 text-sm mb-1">Teléfono</p>
                    <p className="font-semibold group-hover:text-[#00A3E0] transition-colors">
                      {contactInfo.phone}
                    </p>
                  </div>
                </a>
              </div>

              {/* Redes Sociales */}
              <div className="pt-8 border-t border-white/10">
                <p className="text-white/60 text-sm mb-4">Síguenos en:</p>
                <div className="flex gap-3">
                  <a
                    href={contactInfo.social.facebook}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-10 h-10 bg-white/10 rounded-lg flex items-center justify-center hover:bg-[#1877F2] transition-all"
                    title="Facebook"
                  >
                    <Facebook size={20} />
                  </a>
                  <a
                    href={contactInfo.social.instagram}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-10 h-10 bg-white/10 rounded-lg flex items-center justify-center hover:bg-[#E1306C] transition-all"
                    title="Instagram"
                  >
                    <Instagram size={20} />
                  </a>
                  <a
                    href={contactInfo.social.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-10 h-10 bg-white/10 rounded-lg flex items-center justify-center hover:bg-[#0A66C2] transition-all"
                    title="LinkedIn"
                  >
                    <Linkedin size={20} />
                  </a>
                </div>
              </div>

              {/* WhatsApp Button */}
              <a
                href={`https://wa.me/${contactInfo.whatsapp}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-3 w-full px-6 py-4 bg-[#25D366] text-white font-semibold rounded-xl hover:bg-[#20BD5A] transition-all mt-8"
              >
                <MessageCircle size={22} />
                Chatear por WhatsApp
              </a>

              {/* Google Maps Embed */}
              <div className="mt-6">
                <p className="text-white/60 text-sm mb-3">Nuestra ubicación:</p>
                <div className="rounded-xl overflow-hidden border-2 border-white/20 shadow-lg">
                  <iframe
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3784.1234567890123!2d-70.0613034!3d18.5668907!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8eaff5f43e73b9b7%3A0x33640f05d61e41e1!2sGRUPO%20EMINSA!5e0!3m2!1ses!2sdo!4v1234567890123!5m2!1ses!2sdo"
                    width="100%"
                    height="180"
                    style={{ border: 0 }}
                    allowFullScreen
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    title="Ubicación de GRUPO EMINSA"
                    className="w-full"
                  />
                </div>
                <a
                  href="https://www.google.com/maps/place/GRUPO+EMINSA/@18.5668907,-70.0613034,17z/data=!3m1!4b1!4m6!3m5!1s0x8eaff5f43e73b9b7:0x33640f05d61e41e1!8m2!3d18.5668907!4d-70.0587285!16s%2Fg%2F11w21dsggc"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 text-sm text-white/70 hover:text-[#00A3E0] transition-colors mt-3"
                >
                  <MapPin size={14} />
                  Ver mapa más grande
                </a>
              </div>
            </div>
          </motion.div>

          {/* Form */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-3"
          >
            <div className="bg-white rounded-3xl shadow-xl p-8 lg:p-10">
              {isSubmitted ? (
                <div className="text-center py-12">
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: "spring", stiffness: 200, damping: 20 }}
                    className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6"
                  >
                    <CheckCircle2 className="w-10 h-10 text-green-600" />
                  </motion.div>
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                  >
                    <h3 className="text-2xl font-bold text-[#001689] mb-3">
                      ¡Mensaje Enviado Exitosamente!
                    </h3>
                    <p className="text-[#76777A] mb-2">
                      Hemos recibido tu solicitud correctamente.
                    </p>
                    <p className="text-[#76777A] mb-8">
                      Te hemos enviado un email de confirmación y uno de nuestros
                      especialistas se comunicará contigo en menos de 30 minutos.
                    </p>
                    <div className="bg-[#00A3E0]/10 border border-[#00A3E0]/30 rounded-lg p-4 mb-6 text-left">
                      <p className="text-sm text-[#001689]">
                        <strong>Contraseña de tu solicitud:</strong>
                      </p>
                      <p className="text-xs text-[#76777A] mt-1">
                        Email: {formData.email}
                      </p>
                    </div>
                    <button
                      onClick={resetForm}
                      className="btn-primary"
                    >
                      Enviar otro mensaje
                    </button>
                  </motion.div>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* Error Message Alert */}
                  {errorMessage && (
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="bg-red-50 border border-red-200 rounded-lg p-4 flex items-start gap-3"
                    >
                      <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
                      <p className="text-red-700 text-sm">{errorMessage}</p>
                    </motion.div>
                  )}

                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label className="input-label">
                        Nombre Completo <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        name="nombre"
                        value={formData.nombre}
                        onChange={handleChange}
                        required
                        className={`input-field ${formErrors.nombre ? "border-red-500 focus:ring-red-200" : ""
                          }`}
                        placeholder="Su nombre"
                        autoComplete="name"
                      />
                      {formErrors.nombre && (
                        <p className="text-red-500 text-xs mt-1">{formErrors.nombre}</p>
                      )}
                    </div>
                    <div>
                      <label className="input-label">Empresa</label>
                      <input
                        type="text"
                        name="empresa"
                        value={formData.empresa}
                        onChange={handleChange}
                        className={`input-field ${formErrors.empresa ? "border-red-500 focus:ring-red-200" : ""
                          }`}
                        placeholder="Nombre de su empresa"
                        autoComplete="organization"
                      />
                      {formErrors.empresa && (
                        <p className="text-red-500 text-xs mt-1">{formErrors.empresa}</p>
                      )}
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label className="input-label">
                        Email <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        className={`input-field ${formErrors.email ? "border-red-500 focus:ring-red-200" : ""
                          }`}
                        placeholder="correo@ejemplo.com"
                        autoComplete="email"
                      />
                      {formErrors.email && (
                        <p className="text-red-500 text-xs mt-1">{formErrors.email}</p>
                      )}
                    </div>
                    <div>
                      <label className="input-label">
                        Teléfono <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="tel"
                        name="telefono"
                        value={formData.telefono}
                        onChange={handleChange}
                        required
                        className={`input-field ${formErrors.telefono ? "border-red-500 focus:ring-red-200" : ""
                          }`}
                        placeholder="+1 809-000-0000"
                        autoComplete="tel"
                      />
                      {formErrors.telefono && (
                        <p className="text-red-500 text-xs mt-1">{formErrors.telefono}</p>
                      )}
                    </div>
                  </div>

                  {/* Nueva sección: Selección entre Productos y Servicios */}
                  <div>
                    <label className="input-label">
                      ¿Qué información necesitas? <span className="text-red-500">*</span>
                    </label>
                    <div className="grid grid-cols-2 gap-4 mt-2">
                      {/* Botón Productos */}
                      <button
                        type="button"
                        onClick={() => handleTipoConsultaClick('productos')}
                        className={`flex flex-col items-center justify-center p-6 rounded-xl border-2 transition-all ${formData.tipoConsulta === 'productos'
                            ? 'border-[#001689] bg-[#001689]/10'
                            : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50'
                          }`}
                      >
                        <Package size={32} className={`mb-3 ${formData.tipoConsulta === 'productos' ? 'text-[#001689]' : 'text-gray-400'
                          }`} />
                        <span className={`font-semibold ${formData.tipoConsulta === 'productos' ? 'text-[#001689]' : 'text-gray-700'
                          }`}>
                          Productos
                        </span>
                        <span className="text-sm text-gray-500 mt-1">Información de productos</span>
                      </button>

                      {/* Botón Servicios */}
                      <button
                        type="button"
                        onClick={() => handleTipoConsultaClick('servicios')}
                        className={`flex flex-col items-center justify-center p-6 rounded-xl border-2 transition-all ${formData.tipoConsulta === 'servicios'
                            ? 'border-[#001689] bg-[#001689]/10'
                            : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50'
                          }`}
                      >
                        <Settings size={32} className={`mb-3 ${formData.tipoConsulta === 'servicios' ? 'text-[#001689]' : 'text-gray-400'
                          }`} />
                        <span className={`font-semibold ${formData.tipoConsulta === 'servicios' ? 'text-[#001689]' : 'text-gray-700'
                          }`}>
                          Servicios
                        </span>
                        <span className="text-sm text-gray-500 mt-1">Información de servicios</span>
                      </button>
                    </div>
                    {formErrors.tipoConsulta && (
                      <p className="text-red-500 text-xs mt-2">{formErrors.tipoConsulta}</p>
                    )}
                    <input
                      type="hidden"
                      name="tipoConsulta"
                      value={formData.tipoConsulta}
                      required={!formData.tipoConsulta}
                    />
                  </div>

                  {/* Categorías específicas (solo visible si se seleccionó un tipo) */}
                  {formData.tipoConsulta && (
                    <div>
                      <label className="input-label">
                        {formData.tipoConsulta === 'productos' ? 'Selecciona el producto' : 'Selecciona el servicio'} <span className="text-red-500">*</span>
                      </label>
                      <select
                        name="categoria"
                        value={formData.categoria}
                        onChange={handleChange}
                        required
                        className={`input-field ${formErrors.categoria ? "border-red-500 focus:ring-red-200" : ""
                          }`}
                      >
                        <option value="">Seleccione una opción</option>
                        {categoriasDisponibles.map((categoria) => (
                          <option key={categoria} value={categoria}>
                            {categoria}
                          </option>
                        ))}
                      </select>
                      {formErrors.categoria && (
                        <p className="text-red-500 text-xs mt-1">{formErrors.categoria}</p>
                      )}
                      <p className="text-[#76777A] text-xs mt-2">
                        {formData.tipoConsulta === 'productos'
                          ? 'Elige el producto del cual necesitas información'
                          : 'Elige el servicio del cual necesitas información'}
                      </p>
                    </div>
                  )}

                  <div>
                    <label className="input-label">
                      Mensaje <span className="text-red-500">*</span>
                    </label>
                    <textarea
                      name="mensaje"
                      value={formData.mensaje}
                      onChange={handleChange}
                      required
                      rows={5}
                      className={`input-field resize-none ${formErrors.mensaje ? "border-red-500 focus:ring-red-200" : ""
                        }`}
                      placeholder="Describa su requerimiento..."
                    />
                    {formErrors.mensaje && (
                      <p className="text-red-500 text-xs mt-1">{formErrors.mensaje}</p>
                    )}
                    <p className="text-[#76777A] text-xs mt-2">
                      {formData.mensaje.length} / 5000 caracteres
                    </p>
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting || !formData.tipoConsulta || !formData.categoria}
                    className="btn-primary w-full justify-center disabled:opacity-50 disabled:cursor-not-allowed transition-all"
                  >
                    {isSubmitting ? (
                      <>
                        <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                        Enviando...
                      </>
                    ) : (
                      <>
                        Solicitar Información
                        <Send size={18} />
                      </>
                    )}
                  </button>

                  <p className="text-[#76777A] text-xs text-center">
                    Al enviar este formulario, aceptas nuestra{" "}
                    <a href="/privacidad" className="text-[#001689] hover:underline font-semibold">
                      Política de Privacidad
                    </a>
                    {" "} y{" "}
                    <a href="/terminos" className="text-[#001689] hover:underline font-semibold">
                      Términos de Servicio
                    </a>
                  </p>
                </form>
              )}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}