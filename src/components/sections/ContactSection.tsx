"use client";

import { useState, useCallback, useEffect, useRef } from "react";
import { useMaskito } from '@maskito/react';
import options from '../../lib/mask/mask-phone';
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
  Settings,
  User,
  Home,
  Zap,
  Cpu,
  Battery,
  Power,
  GitBranch
} from "lucide-react";
import { contactInfo } from "@/data/navigation";
import type { ContactFormData, ApiResponse } from "@/lib/types-contact";
import { useTranslations } from "next-intl";

// Definir categorías como se solicita (estas serán traducidas en el JSON)
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

// Opciones para el formulario específico de transformadores
const FASES = [
  { value: 'monofasico', label: 'Monofásico' },
  { value: 'trifasico', label: 'Trifásico' }
];

const TIPOS_TRANSFORMADORES = [
  { value: 'pad_mounted', label: 'Pad Mounted' },
  { value: 'poste', label: 'Poste' },
  { value: 'seco', label: 'Seco' },
  { value: 'sumergible', label: 'Sumergible' }
];

const NORMAS = [
  { value: 'ansi', label: 'ANSI/IEEE' },
  { value: 'iec', label: 'IEC' },
  { value: 'nema', label: 'NEMA' },
  { value: 'otros', label: 'Otras normas' }
];

const ZONAS_INSTALACION = [
  { value: 'urbana', label: 'Zona Urbana' },
  { value: 'rural', label: 'Zona Rural' },
  { value: 'industrial', label: 'Zona Industrial' },
  { value: 'comercial', label: 'Zona Comercial' }
];

interface FormState {
  nombre: string;
  empresa: string;
  email: string;
  telefono: string;
  tipoConsulta: 'productos' | 'servicios' | '';
  categoria: string;
  mensaje: string;
  identificacion: string;
  direccion: string;
  // Campos específicos para transformadores
  potenciaKVA: string;
  fase: string;
  voltajePrimario: string;
  voltajeSecundario: string;
  tipoTransformador: string;
  norma: string;
  zonaInstalacion: string;
}

interface FormErrors {
  [key: string]: string;
}

export default function ContactSection() {
  const t = useTranslations('contact');
  const [formData, setFormData] = useState<FormState>({
    nombre: "",
    empresa: "",
    email: "",
    telefono: "",
    tipoConsulta: "",
    categoria: "",
    mensaje: "",
    identificacion: "",
    direccion: "",
    // Campos específicos para transformadores
    potenciaKVA: "",
    fase: "",
    voltajePrimario: "",
    voltajeSecundario: "",
    tipoTransformador: "",
    norma: "",
    zonaInstalacion: ""
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [formErrors, setFormErrors] = useState<FormErrors>({});
  const maskedInputRef = useMaskito({ options });
  const identificacionRef = useRef<string>('');

  // Usar traducciones para categorías si están disponibles
  const categoriasProductos = CATEGORIAS_PRODUCTOS.map(cat => {
    // Crear clave consistente - incluyendo la ñ
    const key = cat.toLowerCase()
      .replace(/\s+/g, '_')
      .replace(/[&]/g, 'y')
      .replace(/[áéíóú]/g, (match) => {
        const map: Record<string, string> = {
          'á': 'a', 'é': 'e', 'í': 'i', 'ó': 'o', 'ú': 'u'
        };
        return map[match] || match;
      })
      // Mantener la ñ como 'n' (sin tilde) para coincidir con tu JSON
      .replace(/ñ/g, 'n')
      .replace(/[^a-z_]/g, '');

    return t(`form.categories.products.${key}`);
  });

  const categoriasServicios = CATEGORIAS_SERVICIOS.map(cat => {
    // Crear clave consistente - incluyendo la ñ
    const key = cat.toLowerCase()
      .replace(/\s+/g, '_')
      .replace(/[&]/g, 'y')
      .replace(/[áéíóú]/g, (match) => {
        const map: Record<string, string> = {
          'á': 'a', 'é': 'e', 'í': 'i', 'ó': 'o', 'ú': 'u'
        };
        return map[match] || match;
      })
      // Mantener la ñ como 'n' (sin tilde) para coincidir con tu JSON
      .replace(/ñ/g, 'n')
      .replace(/[^a-z_]/g, '');

    return t(`form.categories.services.${key}`);
  });

  const categoriasDisponibles = formData.tipoConsulta === 'productos'
    ? categoriasProductos
    : formData.tipoConsulta === 'servicios'
      ? categoriasServicios
      : [];

  // Verificar si se seleccionó Transformadores para mostrar campos específicos
  const showTransformadorFields = formData.tipoConsulta === 'productos' && formData.categoria === t('form.categories.products.transformadores');

  // Función para formatear la cédula/RNC con límites automáticos
  const formatIdentificacion = (value: string): string => {
    const cleanValue = value.replace(/\D/g, '');

    if (cleanValue.length <= 9) {
      return cleanValue.substring(0, 9);
    }

    if (cleanValue.length > 9) {
      const cedula = cleanValue.substring(0, 11);

      if (cedula.length === 11) {
        return cedula.replace(/(\d{3})(\d{7})(\d{1})/, '$1-$2-$3');
      }
      return cedula;
    }

    return cleanValue;
  };

  // Manejar el cambio en el campo de identificación
  const handleIdentificacionChange = useCallback((value: string) => {
    const formatted = formatIdentificacion(value);
    identificacionRef.current = formatted;

    setFormData(prev => ({
      ...prev,
      identificacion: formatted
    }));

    if (formErrors.identificacion) {
      setFormErrors(prev => ({
        ...prev,
        identificacion: ""
      }));
    }
  }, [formErrors.identificacion]);

  // Validar automáticamente cuando se completa la identificación
  useEffect(() => {
    const cleanId = identificacionRef.current.replace(/\D/g, '');

    if (cleanId.length === 9) {
      setFormData(prev => ({
        ...prev,
        identificacion: cleanId
      }));
    } else if (cleanId.length === 11) {
      const formatted = cleanId.replace(/(\d{3})(\d{7})(\d{1})/, '$1-$2-$3');
      setFormData(prev => ({
        ...prev,
        identificacion: formatted
      }));
    }
  }, [formData.identificacion]);

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
        identificacion: formData.identificacion || undefined,
        direccion: formData.direccion || undefined,
        ...(showTransformadorFields && {
          especificacionesTransformador: {
            potenciaKVA: formData.potenciaKVA,
            fase: formData.fase,
            voltajePrimario: formData.voltajePrimario,
            voltajeSecundario: formData.voltajeSecundario,
            tipoTransformador: formData.tipoTransformador,
            norma: formData.norma,
            zonaInstalacion: formData.zonaInstalacion
          }
        })
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
        if (data.errors) {
          setFormErrors(data.errors);
          setErrorMessage(t('form.errors.validation'));
        } else {
          setErrorMessage(
            data.message || t('form.errors.submission')
          );
        }
        setIsSubmitting(false);
        return;
      }

      // Éxito - resetear todos los campos
      setIsSubmitted(true);
      setFormData({
        nombre: "",
        empresa: "",
        email: "",
        telefono: "",
        tipoConsulta: "",
        categoria: "",
        mensaje: "",
        identificacion: "",
        direccion: "",
        potenciaKVA: "",
        fase: "",
        voltajePrimario: "",
        voltajeSecundario: "",
        tipoTransformador: "",
        norma: "",
        zonaInstalacion: ""
      });
      identificacionRef.current = '';
    } catch (error) {
      console.error("Error submitting form:", error);
      setErrorMessage(t('form.errors.connection'));
      setIsSubmitting(false);
    }
  }, [formData, showTransformadorFields, t]);

  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
      const { name, value } = e.target;

      let formattedValue = value;

      // Aplicar límites de caracteres según el campo
      if (name === 'nombre' || name === 'empresa') {
        formattedValue = value.substring(0, 100);
      } else if (name === 'direccion') {
        formattedValue = value.substring(0, 130);
      } else if (name === 'identificacion') {
        handleIdentificacionChange(value);
        return;
      } else if (name === 'potenciaKVA' || name === 'voltajePrimario' || name === 'voltajeSecundario') {
        formattedValue = value.replace(/[^\d.]/g, '');
      }

      // Si cambia el tipo de consulta, reiniciar la categoría
      if (name === 'tipoConsulta') {
        setFormData(prev => ({
          ...prev,
          [name]: value as 'productos' | 'servicios' | '',
          categoria: "",
          potenciaKVA: "",
          fase: "",
          voltajePrimario: "",
          voltajeSecundario: "",
          tipoTransformador: "",
          norma: "",
          zonaInstalacion: ""
        }));
      } else if (name === 'categoria' && value !== t('form.categories.products.transformadores')) {
        setFormData(prev => ({
          ...prev,
          [name]: value,
          potenciaKVA: "",
          fase: "",
          voltajePrimario: "",
          voltajeSecundario: "",
          tipoTransformador: "",
          norma: "",
          zonaInstalacion: ""
        }));
      } else if (name !== 'identificacion') {
        setFormData(prev => ({
          ...prev,
          [name]: formattedValue
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
    [formErrors, handleIdentificacionChange, t]
  );

  const handleTipoConsultaClick = useCallback((tipo: 'productos' | 'servicios') => {
    setFormData(prev => ({
      ...prev,
      tipoConsulta: tipo,
      categoria: "",
      potenciaKVA: "",
      fase: "",
      voltajePrimario: "",
      voltajeSecundario: "",
      tipoTransformador: "",
      norma: "",
      zonaInstalacion: ""
    }));

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
      identificacion: "",
      direccion: "",
      potenciaKVA: "",
      fase: "",
      voltajePrimario: "",
      voltajeSecundario: "",
      tipoTransformador: "",
      norma: "",
      zonaInstalacion: ""
    });
    identificacionRef.current = '';
    setErrorMessage(null);
    setFormErrors({});
  }, []);

  // Determinar el tipo de identificación basado en la longitud
  const getTipoIdentificacion = () => {
    const cleanId = formData.identificacion.replace(/\D/g, '');
    if (cleanId.length === 9) return 'RNC';
    if (cleanId.length === 11) return 'Cédula';
    return t('form.identification.undefined');
  };

  // Obtener opciones traducidas
  const getTranslatedOptions = () => {
    return {
      fases: FASES.map(fase => ({ value: fase.value, label: t(`form.transformer.phase.${fase.value}`) })),
      tiposTransformadores: TIPOS_TRANSFORMADORES.map(tipo => ({ value: tipo.value, label: t(`form.transformer.type.${tipo.value}`) })),
      normas: NORMAS.map(norma => ({ value: norma.value, label: t(`form.transformer.standard.${norma.value}`) })),
      zonasInstalacion: ZONAS_INSTALACION.map(zona => ({ value: zona.value, label: t(`form.transformer.zone.${zona.value}`) }))
    };
  };

  const translatedOptions = getTranslatedOptions();

  return (
    <>
      {/* Hero Section */}
      <section className="pt-32 pb-16 bg-gradient-to-br from-[#001689] to-[#000E53] text-white">
        <div className="container-eminsa">
          <div className="max-w-2xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
              {t('hero.title')}
            </h1>
            <p className="text-xl text-white/90">
              {t('hero.description')}
            </p>
          </div>
        </div>
      </section>
      <section id="contacto" className="py-20 lg:py-32 bg-gray-50 relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-0 right-0 w-150 h-150 bg-[#001689]/5 rounded-full blur-[100px]" />
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
              {t('form.sectionTitle.part1')}{" "}
              <span className="text-[#00A3E0]">{t('form.sectionTitle.part2')}</span>
            </h2>
            <p className="text-[#76777A]">
              {t('form.sectionDescription')}
            </p>
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
              <div className="bg-linear-to-br from-[#001689] to-[#000E53] rounded-3xl p-8 text-white h-full">
                <h3 className="text-2xl font-bold mb-6">{t('contactInfo.title')}</h3>

                <div className="space-y-6 mb-10">
                  {/* Dirección */}
                  <a
                    href="https://www.google.com/maps/place/GRUPO+EMINSA/@18.5668907,-70.0613034,17z/data=!3m1!4b1!4m6!3m5!1s0x8eaff5f43e73b9b7:0x33640f05d61e41e1!8m2!3d18.5668907!4d-70.0587285!16s%2Fg%2F11w21dsggc?entry=tts&g_ep=EgoyMDI0MDkyMi4wKgBIAVAD"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-start gap-4 group"
                  >
                    <div className="w-12 h-12 bg-white/10 rounded-xl flex items-center justify-center shrink-0 group-hover:bg-white/20 transition-colors">
                      <MapPin size={20} />
                    </div>
                    <div>
                      <p className="text-white/60 text-sm mb-1">{t('contactInfo.address.label')}</p>
                      <p className="font-semibold group-hover:text-[#00A3E0] transition-colors">
                        {t('contactInfo.address.value')}
                      </p>
                    </div>
                  </a>

                  {/* Email */}
                  <a
                    href={`mailto:${contactInfo.email}`}
                    className="flex items-start gap-4 group"
                  >
                    <div className="w-12 h-12 bg-white/10 rounded-xl flex items-center justify-center shrink-0 group-hover:bg-white/20 transition-colors">
                      <Mail size={20} />
                    </div>
                    <div>
                      <p className="text-white/60 text-sm mb-1">{t('contactInfo.email.label')}</p>
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
                    <div className="w-12 h-12 bg-white/10 rounded-xl flex items-center justify-center shrink-0 group-hover:bg-white/20 transition-colors">
                      <Phone size={20} />
                    </div>
                    <div>
                      <p className="text-white/60 text-sm mb-1">{t('contactInfo.phone.label')}</p>
                      <p className="font-semibold group-hover:text-[#00A3E0] transition-colors">
                        {contactInfo.phone}
                      </p>
                    </div>
                  </a>
                </div>

                {/* Redes Sociales */}
                <div className="pt-8 border-t border-white/10">
                  <p className="text-white/60 text-sm mb-4">{t('contactInfo.followUs')}</p>
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
                  {t('contactInfo.whatsappButton')}
                </a>

                {/* Google Maps Embed */}
                <div className="mt-6">
                  <p className="text-white/60 text-sm mb-3">{t('contactInfo.location')}</p>
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
                    {t('contactInfo.viewMap')}
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
                        {t('form.success.title')}
                      </h3>
                      <p className="text-[#76777A] mb-2">
                        {t('form.success.description1')}
                      </p>
                      <p className="text-[#76777A] mb-8">
                        {t('form.success.description2')}
                      </p>
                      <button
                        onClick={resetForm}
                        className="btn-primary"
                      >
                        {t('form.success.anotherMessage')}
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
                        <AlertCircle className="w-5 h-5 text-red-600 shrink-0 mt-0.5" />
                        <p className="text-red-700 text-sm">{errorMessage}</p>
                      </motion.div>
                    )}

                    <div className="grid md:grid-cols-2 gap-6">
                      <div>
                        <label className="input-label">
                          {t('form.fields.fullName.label')} <span className="text-red-500">*</span>
                        </label>
                        <div className="relative">
                          <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                          <input
                            type="text"
                            name="nombre"
                            value={formData.nombre}
                            onChange={handleChange}
                            required
                            maxLength={100}
                            className={`input-field pl-10 ${formErrors.nombre ? "border-red-500 focus:ring-red-200" : ""
                              }`}
                            placeholder={t('form.fields.fullName.placeholder')}
                            autoComplete="name"
                          />
                        </div>
                        {formErrors.nombre && (
                          <p className="text-red-500 text-xs mt-1">{formErrors.nombre}</p>
                        )}
                        <p className="text-[#76777A] text-xs mt-2">
                          {formData.nombre.length} / {t('form.characters', { max: 100 })}
                        </p>
                      </div>
                      <div>
                        <label className="input-label">{t('form.fields.company.label')}</label>
                        <input
                          type="text"
                          name="empresa"
                          value={formData.empresa}
                          onChange={handleChange}
                          maxLength={100}
                          className={`input-field ${formErrors.empresa ? "border-red-500 focus:ring-red-200" : ""
                            }`}
                          placeholder={t('form.fields.company.placeholder')}
                          autoComplete="organization"
                        />
                        {formErrors.empresa && (
                          <p className="text-red-500 text-xs mt-1">{formErrors.empresa}</p>
                        )}
                        <p className="text-[#76777A] text-xs mt-2">
                          {formData.empresa.length} / {t('form.characters', { max: 100 })}
                        </p>
                      </div>
                    </div>

                    <div className="grid md:grid-cols-2 gap-6">
                      <div>
                        <label className="input-label">
                          {t('form.fields.identification.label')} <span className="text-red-500">*</span>
                          <span className="ml-2 text-xs font-semibold text-[#001689]">
                            {formData.identificacion && `(${getTipoIdentificacion()})`}
                          </span>
                        </label>
                        <input
                          type="text"
                          name="identificacion"
                          value={formData.identificacion}
                          onChange={handleChange}
                          required
                          className={`input-field ${formErrors.identificacion ? "border-red-500 focus:ring-red-200" : ""
                            }`}
                          placeholder={t('form.fields.identification.placeholder')}
                          autoComplete="off"
                          maxLength={13}
                        />
                        {formErrors.identificacion && (
                          <p className="text-red-500 text-xs mt-1">{formErrors.identificacion}</p>
                        )}
                        <div className="text-[#76777A] text-xs mt-2 space-y-1">
                          <p>{t('form.fields.identification.rncInfo')}</p>
                          <p>{t('form.fields.identification.idInfo')}</p>
                          <p className="mt-1 font-medium">
                            {t('form.fields.identification.digits', { count: formData.identificacion.replace(/\D/g, '').length })}
                          </p>
                        </div>
                      </div>
                      <div>
                        <label className="input-label">
                          {t('form.fields.phone.label')} <span className="text-red-500">*</span>
                        </label>
                        <input
                          type="tel"
                          name="telefono"
                          value={formData.telefono}
                          onChange={handleChange}
                          ref={maskedInputRef}
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

                    <div className="grid md:grid-cols-2 gap-6">
                      <div>
                        <label className="input-label">
                          {t('form.fields.email.label')} <span className="text-red-500">*</span>
                        </label>
                        <div className="relative">
                          <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                          <input
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            required
                            className={`input-field pl-10 ${formErrors.email ? "border-red-500 focus:ring-red-200" : ""
                              }`}
                            placeholder={t('form.fields.email.placeholder')}
                            autoComplete="email"
                          />
                        </div>
                        {formErrors.email && (
                          <p className="text-red-500 text-xs mt-1">{formErrors.email}</p>
                        )}
                      </div>
                      <div>
                        <label className="input-label">
                          {t('form.fields.address.label')} <span className="text-red-500">*</span>
                        </label>
                        <div className="relative">
                          <Home className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                          <input
                            type="text"
                            name="direccion"
                            value={formData.direccion}
                            onChange={handleChange}
                            required
                            maxLength={130}
                            className={`input-field pl-10 ${formErrors.direccion ? "border-red-500 focus:ring-red-200" : ""
                              }`}
                            placeholder={t('form.fields.address.placeholder')}
                            autoComplete="street-address"
                          />
                        </div>
                        {formErrors.direccion && (
                          <p className="text-red-500 text-xs mt-1">{formErrors.direccion}</p>
                        )}
                        <p className="text-[#76777A] text-xs mt-2">
                          {formData.direccion.length} / {t('form.characters', { max: 130 })}
                        </p>
                      </div>
                    </div>

                    {/* Selección entre Productos y Servicios */}
                    <div>
                      <label className="input-label">
                        {t('form.fields.inquiryType.label')} <span className="text-red-500">*</span>
                      </label>
                      <div className="grid grid-cols-2 gap-4 mt-2">
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
                            {t('form.inquiryType.products')}
                          </span>
                          <span className="text-sm text-gray-500 mt-1">
                            {t('form.inquiryType.productsDescription')}
                          </span>
                        </button>

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
                            {t('form.inquiryType.services')}
                          </span>
                          <span className="text-sm text-gray-500 mt-1">
                            {t('form.inquiryType.servicesDescription')}
                          </span>
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

                    {/* Categorías específicas */}
                    {formData.tipoConsulta && (
                      <div>
                        <label className="input-label">
                          {formData.tipoConsulta === 'productos'
                            ? t('form.fields.category.productsLabel')
                            : t('form.fields.category.servicesLabel')} <span className="text-red-500">*</span>
                        </label>
                        <select
                          name="categoria"
                          value={formData.categoria}
                          onChange={handleChange}
                          required
                          className={`input-field ${formErrors.categoria ? "border-red-500 focus:ring-red-200" : ""
                            }`}
                        >
                          <option value="">{t('form.fields.category.selectOption')}</option>
                          {categoriasDisponibles.map((categoria, index) => {
                            const originalCategoria = formData.tipoConsulta === 'productos'
                              ? CATEGORIAS_PRODUCTOS[index]
                              : CATEGORIAS_SERVICIOS[index];
                            return (
                              <option key={categoria} value={categoria}>
                                {categoria}
                              </option>
                            );
                          })}
                        </select>
                        {formErrors.categoria && (
                          <p className="text-red-500 text-xs mt-1">{formErrors.categoria}</p>
                        )}
                        <p className="text-[#76777A] text-xs mt-2">
                          {formData.tipoConsulta === 'productos'
                            ? t('form.fields.category.productsHelp')
                            : t('form.fields.category.servicesHelp')}
                        </p>
                      </div>
                    )}

                    {/* Campos específicos para Transformadores */}
                    {showTransformadorFields && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        transition={{ duration: 0.3 }}
                        className="bg-[#001689]/5 border border-[#001689]/20 rounded-xl p-6 space-y-6"
                      >
                        <div className="flex items-center gap-3 mb-4">
                          <Zap className="w-6 h-6 text-[#001689]" />
                          <h3 className="text-lg font-bold text-[#001689]">
                            {t('form.transformer.title')}
                          </h3>
                        </div>

                        <div className="grid md:grid-cols-2 gap-6">
                          <div>
                            <label className="input-label">
                              {t('form.transformer.power.label')} <span className="text-red-500">*</span>
                            </label>
                            <div className="relative">
                              <Power className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                              <input
                                type="text"
                                name="potenciaKVA"
                                value={formData.potenciaKVA}
                                onChange={handleChange}
                                required
                                className={`input-field pl-10 ${formErrors.potenciaKVA ? "border-red-500 focus:ring-red-200" : ""
                                  }`}
                                placeholder={t('form.transformer.power.placeholder')}
                                inputMode="decimal"
                              />
                            </div>
                            {formErrors.potenciaKVA && (
                              <p className="text-red-500 text-xs mt-1">{formErrors.potenciaKVA}</p>
                            )}
                          </div>

                          <div>
                            <label className="input-label">
                              {t('form.transformer.phase.label')} <span className="text-red-500">*</span>
                            </label>
                            <div className="relative">
                              <GitBranch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                              <select
                                name="fase"
                                value={formData.fase}
                                onChange={handleChange}
                                required
                                className={`input-field pl-10 ${formErrors.fase ? "border-red-500 focus:ring-red-200" : ""
                                  }`}
                              >
                                <option value="">{t('form.transformer.phase.select')}</option>
                                {translatedOptions.fases.map((opcion) => (
                                  <option key={opcion.value} value={opcion.value}>
                                    {opcion.label}
                                  </option>
                                ))}
                              </select>
                            </div>
                            {formErrors.fase && (
                              <p className="text-red-500 text-xs mt-1">{formErrors.fase}</p>
                            )}
                          </div>
                        </div>

                        <div className="grid md:grid-cols-2 gap-6">
                          <div>
                            <label className="input-label">
                              {t('form.transformer.primaryVoltage.label')} <span className="text-red-500">*</span>
                            </label>
                            <div className="relative">
                              <Cpu className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                              <input
                                type="text"
                                name="voltajePrimario"
                                value={formData.voltajePrimario}
                                onChange={handleChange}
                                required
                                className={`input-field pl-10 ${formErrors.voltajePrimario ? "border-red-500 focus:ring-red-200" : ""
                                  }`}
                                placeholder={t('form.transformer.primaryVoltage.placeholder')}
                                inputMode="decimal"
                              />
                            </div>
                            {formErrors.voltajePrimario && (
                              <p className="text-red-500 text-xs mt-1">{formErrors.voltajePrimario}</p>
                            )}
                          </div>

                          <div>
                            <label className="input-label">
                              {t('form.transformer.secondaryVoltage.label')} <span className="text-red-500">*</span>
                            </label>
                            <div className="relative">
                              <Battery className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                              <input
                                type="text"
                                name="voltajeSecundario"
                                value={formData.voltajeSecundario}
                                onChange={handleChange}
                                required
                                className={`input-field pl-10 ${formErrors.voltajeSecundario ? "border-red-500 focus:ring-red-200" : ""
                                  }`}
                                placeholder={t('form.transformer.secondaryVoltage.placeholder')}
                                inputMode="decimal"
                              />
                            </div>
                            {formErrors.voltajeSecundario && (
                              <p className="text-red-500 text-xs mt-1">{formErrors.voltajeSecundario}</p>
                            )}
                          </div>
                        </div>

                        <div className="grid md:grid-cols-2 gap-6">
                          <div>
                            <label className="input-label">
                              {t('form.transformer.type.label')} <span className="text-red-500">*</span>
                            </label>
                            <select
                              name="tipoTransformador"
                              value={formData.tipoTransformador}
                              onChange={handleChange}
                              required
                              className={`input-field ${formErrors.tipoTransformador ? "border-red-500 focus:ring-red-200" : ""
                                }`}
                            >
                              <option value="">{t('form.transformer.type.select')}</option>
                              {translatedOptions.tiposTransformadores.map((tipo) => (
                                <option key={tipo.value} value={tipo.value}>
                                  {tipo.label}
                                </option>
                              ))}
                            </select>
                            {formErrors.tipoTransformador && (
                              <p className="text-red-500 text-xs mt-1">{formErrors.tipoTransformador}</p>
                            )}
                          </div>

                          <div>
                            <label className="input-label">
                              {t('form.transformer.standard.label')} <span className="text-red-500">*</span>
                            </label>
                            <select
                              name="norma"
                              value={formData.norma}
                              onChange={handleChange}
                              required
                              className={`input-field ${formErrors.norma ? "border-red-500 focus:ring-red-200" : ""
                                }`}
                            >
                              <option value="">{t('form.transformer.standard.select')}</option>
                              {translatedOptions.normas.map((norma) => (
                                <option key={norma.value} value={norma.value}>
                                  {norma.label}
                                </option>
                              ))}
                            </select>
                            {formErrors.norma && (
                              <p className="text-red-500 text-xs mt-1">{formErrors.norma}</p>
                            )}
                          </div>
                        </div>

                        <div>
                          <label className="input-label">
                            {t('form.transformer.zone.label')} <span className="text-red-500">*</span>
                          </label>
                          <select
                            name="zonaInstalacion"
                            value={formData.zonaInstalacion}
                            onChange={handleChange}
                            required
                            className={`input-field ${formErrors.zonaInstalacion ? "border-red-500 focus:ring-red-200" : ""
                              }`}
                          >
                            <option value="">{t('form.transformer.zone.select')}</option>
                            {translatedOptions.zonasInstalacion.map((zona) => (
                              <option key={zona.value} value={zona.value}>
                                {zona.label}
                              </option>
                            ))}
                          </select>
                          {formErrors.zonaInstalacion && (
                            <p className="text-red-500 text-xs mt-1">{formErrors.zonaInstalacion}</p>
                          )}
                        </div>
                      </motion.div>
                    )}

                    <div>
                      <label className="input-label">
                        {t('form.fields.message.label')} <span className="text-red-500">*</span>
                      </label>
                      <textarea
                        name="mensaje"
                        value={formData.mensaje}
                        onChange={handleChange}
                        required
                        maxLength={5000}
                        rows={5}
                        className={`input-field resize-none ${formErrors.mensaje ? "border-red-500 focus:ring-red-200" : ""
                          }`}
                        placeholder={t('form.fields.message.placeholder')}
                      />
                      {formErrors.mensaje && (
                        <p className="text-red-500 text-xs mt-1">{formErrors.mensaje}</p>
                      )}
                      <p className="text-[#76777A] text-xs mt-2">
                        {formData.mensaje.length} / {t('form.characters', { max: 5000 })}
                      </p>
                    </div>

                    <button
                      type="submit"
                      disabled={isSubmitting || !formData.tipoConsulta || !formData.categoria || !formData.identificacion || !formData.direccion || (showTransformadorFields && (!formData.potenciaKVA || !formData.fase || !formData.voltajePrimario || !formData.voltajeSecundario || !formData.tipoTransformador || !formData.norma || !formData.zonaInstalacion))}
                      className="btn-primary w-full justify-center disabled:opacity-50 disabled:cursor-not-allowed transition-all"
                    >
                      {isSubmitting ? (
                        <>
                          <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                          {t('form.submitting')}
                        </>
                      ) : (
                        <>
                          {t('form.submitButton')}
                          <Send size={18} />
                        </>
                      )}
                    </button>

                    <p className="text-[#76777A] text-xs text-center">
                      {t('form.legalNotice.part1')}{" "}
                      <a href="/privacidad" className="text-[#001689] hover:underline font-semibold">
                        {t('form.legalNotice.privacyPolicy')}
                      </a>
                      {" "}{t('form.legalNotice.and')}{" "}
                      <a href="/terminos" className="text-[#001689] hover:underline font-semibold">
                        {t('form.legalNotice.termsOfService')}
                      </a>
                    </p>
                  </form>
                )}
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </>
  );
}