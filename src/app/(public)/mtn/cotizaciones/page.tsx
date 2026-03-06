"use client";

import { useState, useEffect, Suspense } from "react";
import Link from "next/link";
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
} from "lucide-react";
import { transformerProducts } from "@/config/mtn-data";
import { contactInfo } from "@/config/navigation";
import { getWhatsAppUrl } from "@/utils/whatsapp";
import { PhoneInputField } from "@/components/ui/PhoneInputField";

// Capacidades disponibles
const capacities = [
  "15", "25", "30", "37.5", "45", "50", "75", "100", "112.5", 
  "150", "167", "225", "300", "500", "750", "1000", "1500", "2000", "2500", "3000", "Otro"
];

// Componente interno que usa useSearchParams
function CotizacionesContent() {
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

  // Actualizar producto preseleccionado cuando cambie el URL
  useEffect(() => {
    if (preselectedProduct) {
      setFormData(prev => ({ ...prev, tipoTransformador: preselectedProduct }));
    }
  }, [preselectedProduct]);

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    
    if (!formData.nombre.trim()) newErrors.nombre = "El nombre es requerido";
    if (!formData.email.trim()) newErrors.email = "El email es requerido";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Email inválido";
    }
    if (!formData.telefono.trim()) newErrors.telefono = "El teléfono es requerido";
    if (!formData.tipoSolicitud) newErrors.tipoSolicitud = "Seleccione el tipo de solicitud";
    if (formData.tipoSolicitud === 'transformador') {
      if (!formData.tipoTransformador) newErrors.tipoTransformador = "Seleccione un tipo";
      if (!formData.capacidad) newErrors.capacidad = "Seleccione una capacidad";
    }
    if (formData.tipoSolicitud === 'otro' && !formData.descripcion.trim()) {
      newErrors.descripcion = "Describa su solicitud";
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
            tipoTransformador: formData.tipoTransformador,
            configuracion: formData.configuracion,
            capacidad: formData.capacidad ? `${formData.capacidad} kVA` : '',
            cantidad: formData.cantidad,
            voltajePrimario: formData.voltajePrimario,
            voltajeSecundario: formData.voltajeSecundario,
            distribuidora: formData.distribuidora,
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
      if (!json.success) throw new Error(json.message || 'Error al enviar');
      setCodigo(json.codigo);
      setIsSubmitted(true);
    } catch (err) {
      setErrors(prev => ({ ...prev, general: err instanceof Error ? err.message : 'Error de conexión. Intente de nuevo.' }));
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

    // Clear error when field is modified
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
            ¡Solicitud Enviada!
          </h2>
          {codigo && (
            <div className="bg-[#00269b]/5 border border-[#00269b]/20 rounded-xl p-4 mb-4">
              <p className="text-xs text-[#00269b] uppercase tracking-wider font-semibold mb-1">Número de Referencia</p>
              <p className="text-2xl font-bold text-[#00269b] tracking-widest">{codigo}</p>
              <p className="text-xs text-gray-500 mt-1">Guarde este código para dar seguimiento a su solicitud</p>
            </div>
          )}
          <p className="text-gray-600 mb-8">
            Hemos recibido su solicitud de cotización. Nuestro equipo se pondrá en contacto
            con usted en menos de 24 horas.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/mtn/productos"
              className="inline-flex items-center justify-center gap-2 bg-[#00269b] hover:bg-[#00175d] text-white px-6 py-3 rounded-xl font-semibold transition-colors"
            >
              Ver Productos
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
              Nueva Cotización
            </button>
          </div>
        </div>
      </motion.div>
    );
  }

  return (
    <div className="grid lg:grid-cols-3 gap-8">
      {/* Form */}
      <div className="lg:col-span-2">
        <form onSubmit={handleSubmit} className="bg-white rounded-2xl shadow-lg p-8 space-y-8">
          {/* Información de Contacto */}
          <div>
            <h2 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
              <div className="w-8 h-8 bg-[#00269b] text-white rounded-lg flex items-center justify-center text-sm font-bold">1</div>
              Información de Contacto
            </h2>
            <div className="grid sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Nombre completo *
                </label>
                <input
                  type="text"
                  name="nombre"
                  value={formData.nombre}
                  onChange={handleInputChange}
                  className={`w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-[#00269b] focus:border-transparent transition-all ${
                    errors.nombre ? "border-red-500" : "border-gray-300"
                  }`}
                  placeholder="Su nombre"
                />
                {errors.nombre && <p className="text-red-500 text-sm mt-1">{errors.nombre}</p>}
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Empresa
                </label>
                <input
                  type="text"
                  name="empresa"
                  value={formData.empresa}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#00269b] focus:border-transparent transition-all"
                  placeholder="Nombre de su empresa"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Correo electrónico *
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className={`w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-[#00269b] focus:border-transparent transition-all ${
                    errors.email ? "border-red-500" : "border-gray-300"
                  }`}
                  placeholder="correo@ejemplo.com"
                />
                {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
              </div>
              <div>
                <PhoneInputField
                  value={formData.telefono}
                  onChange={handlePhoneChange}
                  label="Teléfono"
                  required
                  error={errors.telefono}
                  focusColor="#00269b"
                />
              </div>
            </div>
          </div>

          {/* Tipo de Solicitud */}
          <div>
            <h2 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
              <div className="w-8 h-8 bg-[#00269b] text-white rounded-lg flex items-center justify-center text-sm font-bold">2</div>
              Tipo de Solicitud
            </h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  ¿Qué desea cotizar? *
                </label>
                <select
                  name="tipoSolicitud"
                  value={formData.tipoSolicitud}
                  onChange={handleInputChange}
                  className={`w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-[#00269b] focus:border-transparent transition-all ${
                    errors.tipoSolicitud ? "border-red-500" : "border-gray-300"
                  }`}
                >
                  <option value="">Seleccione...</option>
                  <option value="transformador">Transformador Nuevo</option>
                  <option value="otro">Otro producto o servicio</option>
                </select>
                {errors.tipoSolicitud && <p className="text-red-500 text-sm mt-1">{errors.tipoSolicitud}</p>}
              </div>

              {/* Transformer fields */}
              {formData.tipoSolicitud === 'transformador' && (
                <div className="grid sm:grid-cols-2 gap-4 pt-2">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Tipo de Transformador *
                    </label>
                    <select
                      name="tipoTransformador"
                      value={formData.tipoTransformador}
                      onChange={handleInputChange}
                      className={`w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-[#00269b] focus:border-transparent transition-all ${
                        errors.tipoTransformador ? "border-red-500" : "border-gray-300"
                      }`}
                    >
                      <option value="">Seleccione un tipo</option>
                      {transformerProducts.map((product) => (
                        <option key={product.id} value={product.slug}>
                          {product.name}
                        </option>
                      ))}
                    </select>
                    {errors.tipoTransformador && <p className="text-red-500 text-sm mt-1">{errors.tipoTransformador}</p>}
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Configuración
                    </label>
                    <select
                      name="configuracion"
                      value={formData.configuracion}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#00269b] focus:border-transparent transition-all"
                    >
                      <option value="">Seleccione configuración</option>
                      <option value="monofasico">Monofásico</option>
                      <option value="trifasico">Trifásico</option>
                      <option value="autoprotegido">Autoprotegido (CSP)</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Capacidad (kVA) *
                    </label>
                    <select
                      name="capacidad"
                      value={formData.capacidad}
                      onChange={handleInputChange}
                      className={`w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-[#00269b] focus:border-transparent transition-all ${
                        errors.capacidad ? "border-red-500" : "border-gray-300"
                      }`}
                    >
                      <option value="">Seleccione capacidad</option>
                      {capacities.map((cap) => (
                        <option key={cap} value={cap}>
                          {cap === "Otro" ? "Otro (especificar)" : `${cap} kVA`}
                        </option>
                      ))}
                    </select>
                    {errors.capacidad && <p className="text-red-500 text-sm mt-1">{errors.capacidad}</p>}
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Cantidad
                    </label>
                    <input
                      type="number"
                      name="cantidad"
                      value={formData.cantidad}
                      onChange={handleInputChange}
                      min="1"
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#00269b] focus:border-transparent transition-all"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Voltaje Primario
                    </label>
                    <input
                      type="text"
                      name="voltajePrimario"
                      value={formData.voltajePrimario}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#00269b] focus:border-transparent transition-all"
                      placeholder="Ej: 13.2 kV"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Voltaje Secundario
                    </label>
                    <input
                      type="text"
                      name="voltajeSecundario"
                      value={formData.voltajeSecundario}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#00269b] focus:border-transparent transition-all"
                      placeholder="Ej: 120/240 V"
                    />
                  </div>
                  <div className="sm:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Distribuidora de Energía
                    </label>
                    <select
                      name="distribuidora"
                      value={formData.distribuidora}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#00269b] focus:border-transparent transition-all"
                    >
                      <option value="">Seleccione la distribuidora</option>
                      <option value="EDENORTE">EDENORTE</option>
                      <option value="EDESUR">EDESUR</option>
                      <option value="EDEESTE">EDEESTE</option>
                      <option value="CEPM">CEPM</option>
                      <option value="CAPCANA">CAPCANA</option>
                      <option value="USO INTERNO">USO INTERNO</option>
                      <option value="OTROS">OTROS (ESPECIFICAR)</option>
                    </select>
                  </div>
                </div>
              )}

              {/* Otro fields */}
              {formData.tipoSolicitud === 'otro' && (
                <div className="space-y-4 pt-2">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Descripción de su solicitud *
                    </label>
                    <textarea
                      name="descripcion"
                      value={formData.descripcion}
                      onChange={handleInputChange}
                      rows={5}
                      className={`w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-[#00269b] focus:border-transparent transition-all resize-none ${
                        errors.descripcion ? "border-red-500" : "border-gray-300"
                      }`}
                      placeholder="Describa el producto o servicio que necesita cotizar..."
                    />
                    {errors.descripcion && <p className="text-red-500 text-sm mt-1">{errors.descripcion}</p>}
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Adjuntar documento (opcional)
                    </label>
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
                        <span className="text-sm text-gray-600">Haga clic para subir archivos</span>
                        <span className="text-xs text-gray-400 mt-1">PDF, DOC, JPG, PNG, Excel (máx. 5 archivos)</span>
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
                </div>
              )}
            </div>
          </div>

          {/* Detalles Adicionales */}
          <div>
            <h2 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
              <div className="w-8 h-8 bg-[#00269b] text-white rounded-lg flex items-center justify-center text-sm font-bold">3</div>
              Detalles Adicionales
            </h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Ubicación del proyecto
                </label>
                <input
                  type="text"
                  name="ubicacion"
                  value={formData.ubicacion}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#00269b] focus:border-transparent transition-all"
                  placeholder="Ciudad, provincia o dirección"
                />
              </div>
              {formData.tipoSolicitud === 'transformador' && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Descripción o requerimientos especiales
                  </label>
                  <textarea
                    name="descripcion"
                    value={formData.descripcion}
                    onChange={handleInputChange}
                    rows={4}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#00269b] focus:border-transparent transition-all resize-none"
                    placeholder="Describa cualquier requerimiento especial, accesorios adicionales, o información relevante para su cotización..."
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
                <span className="text-gray-700">
                  <span className="font-medium text-[#00269b]">Urgente</span> - Necesito respuesta lo antes posible
                </span>
              </label>
            </div>
          </div>

          {/* General error */}
          {errors.general && (
            <div className="bg-red-50 border border-red-200 text-red-700 rounded-xl px-4 py-3 text-sm">
              {errors.general}
            </div>
          )}

          {/* Submit */}
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full flex items-center justify-center gap-2 bg-[#00269b] hover:bg-[#00175d] disabled:bg-gray-400 text-white px-8 py-4 rounded-xl font-semibold transition-colors text-lg"
          >
            {isSubmitting ? (
              <>
                <Loader2 size={24} className="animate-spin" />
                Enviando...
              </>
            ) : (
              <>
                <Send size={24} />
                Enviar Solicitud de Cotización
              </>
            )}
          </button>
        </form>
      </div>

      {/* Sidebar */}
      <div className="space-y-6">
        {/* Contact Card */}
        <div className="bg-white rounded-2xl shadow-lg p-6 sticky top-40">
          <h3 className="font-bold text-gray-900 mb-4">¿Prefiere contactarnos directamente?</h3>
          
          <div className="space-y-4">
            <a
              href={`tel:${contactInfo.phone}`}
              className="flex items-center gap-3 p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors"
            >
              <div className="w-10 h-10 bg-[#00269b] rounded-lg flex items-center justify-center">
                <Phone size={20} className="text-white" />
              </div>
              <div>
                <p className="text-sm text-gray-500">Llámenos</p>
                <p className="font-semibold text-gray-900">{contactInfo.phone}</p>
              </div>
            </a>
            
            <a
              href={getWhatsAppUrl()}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 p-4 bg-[#25D366]/10 rounded-xl hover:bg-[#25D366]/20 transition-colors"
            >
              <div className="w-10 h-10 bg-[#25D366] rounded-lg flex items-center justify-center">
                <MessageCircle size={20} className="text-white" />
              </div>
              <div>
                <p className="text-sm text-gray-500">WhatsApp</p>
                <p className="font-semibold text-[#25D366]">Chatea con nosotros</p>
              </div>
            </a>
          </div>

          {/* Benefits */}
          <div className="mt-6 pt-6 border-t border-gray-100 space-y-3">
            <div className="flex items-center gap-3 text-sm">
              <Clock size={18} className="text-[#00269b]" />
              <span className="text-gray-600">Respuesta en menos de 24 horas</span>
            </div>
            <div className="flex items-center gap-3 text-sm">
              <Zap size={18} className="text-[#00269b]" />
              <span className="text-gray-600">Cotización sin compromiso</span>
            </div>
            <div className="flex items-center gap-3 text-sm">
              <Shield size={18} className="text-[#00269b]" />
              <span className="text-gray-600">Asesoría técnica incluida</span>
            </div>
          </div>

          {/* Certifications */}
          <div className="mt-6 pt-6 border-t border-gray-100">
            <p className="text-sm text-gray-500 mb-3">Certificaciones</p>
            <div className="flex gap-4">
              <div className="w-16 h-16 bg-gray-100 rounded-lg flex items-center justify-center">
                <span className="text-xs font-bold text-gray-600">ISO 9001</span>
              </div>
              <div className="w-16 h-16 bg-gray-100 rounded-lg flex items-center justify-center">
                <span className="text-xs font-bold text-gray-600">CIDET</span>
              </div>
              <div className="w-16 h-16 bg-gray-100 rounded-lg flex items-center justify-center">
                <span className="text-xs font-bold text-gray-600">UL</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function CotizacionesPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero */}
      <section className="bg-gradient-to-br from-[#00269b] to-[#00175d] text-white py-12">
        <div className="container-eminsa">
          {/* Breadcrumb */}
          <nav className="flex items-center gap-2 text-sm text-white/60 mb-6">
            <Link href="/" className="hover:text-white transition-colors">Inicio</Link>
            <ChevronRight size={14} />
            <Link href="/mtn" className="hover:text-white transition-colors">MTN</Link>
            <ChevronRight size={14} />
            <span className="text-white">Cotizaciones</span>
          </nav>

          <div className="max-w-2xl">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 bg-white/10 rounded-xl flex items-center justify-center">
                <FileText size={24} />
              </div>
              <span className="text-[#0099ce] font-semibold">Solicitar Cotización</span>
            </div>
            <h1 className="text-3xl lg:text-4xl font-bold mb-4">
              Cotice su Transformador
            </h1>
            <p className="text-lg text-white/80">
              Complete el formulario y reciba una cotización personalizada en menos de 24 horas.
            </p>
          </div>
        </div>
      </section>

      {/* Form Section */}
      <section className="py-12">
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
