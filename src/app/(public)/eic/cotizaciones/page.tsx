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
  Globe,
} from "lucide-react";
import { contactInfo } from "@/config/navigation";
import { getWhatsAppUrl } from "@/utils/whatsapp";
import {
  eicProductCategories,
  eicProducts,
  eicBrands,
} from "@/config/eic-data";

function CotizacionesForm() {
  const searchParams = useSearchParams();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
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
    await new Promise((resolve) => setTimeout(resolve, 2000));
    setIsSubmitting(false);
    setIsSuccess(true);
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
            ¡Solicitud Enviada!
          </h2>
          <p className="text-gray-600 mb-6">
            Hemos recibido su solicitud de cotización. Nuestro equipo de
            comercio internacional le contactará en breve con un presupuesto
            personalizado.
          </p>
          <div className="bg-[#00B140]/10 rounded-xl p-4 mb-6">
            <p className="text-sm text-gray-700">
              <strong>Tiempo de respuesta estimado:</strong>
              <br />
              Menos de 30 minutos en horario laboral
            </p>
          </div>
          <div className="space-y-3">
            <Link
              href="/eic"
              className="block w-full px-6 py-3 bg-[#00B140] hover:bg-[#008F33] text-white font-semibold rounded-xl transition-colors"
            >
              Volver a EIC
            </Link>
            <Link
              href="/eic/productos"
              className="block w-full px-6 py-3 border border-gray-300 text-gray-700 hover:bg-gray-50 font-medium rounded-xl transition-colors"
            >
              Ver Productos
            </Link>
            <Link
              href="/"
              className="block w-full px-6 py-3 border border-gray-300 text-gray-700 hover:bg-gray-50 font-medium rounded-xl transition-colors"
            >
              Ir al Inicio
            </Link>
          </div>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero */}
      <section className="bg-gradient-to-br from-[#00B140] via-[#008F33] to-[#001689] text-white py-12 lg:py-16">
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
            <span className="text-white">Cotizaciones</span>
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
            <h1 className="text-3xl md:text-4xl font-bold mb-4">
              Solicitar Cotización Internacional
            </h1>
            <p className="text-lg text-white/90">
              Complete el formulario y reciba un presupuesto personalizado para
              productos eléctricos internacionales. Respondemos en menos de 30
              minutos durante horario laboral.
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
                    Información de Contacto
                  </h2>
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1.5">
                        Nombre Completo *
                      </label>
                      <input
                        type="text"
                        name="nombre"
                        required
                        value={formData.nombre}
                        onChange={handleChange}
                        className="w-full px-4 py-2.5 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#00B140] focus:border-transparent transition-all"
                        placeholder="Ej: Juan Pérez"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1.5">
                        Empresa *
                      </label>
                      <input
                        type="text"
                        name="empresa"
                        required
                        value={formData.empresa}
                        onChange={handleChange}
                        className="w-full px-4 py-2.5 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#00B140] focus:border-transparent transition-all"
                        placeholder="Nombre de su empresa"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1.5">
                        Email *
                      </label>
                      <input
                        type="email"
                        name="email"
                        required
                        value={formData.email}
                        onChange={handleChange}
                        className="w-full px-4 py-2.5 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#00B140] focus:border-transparent transition-all"
                        placeholder="correo@ejemplo.com"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1.5">
                        Teléfono *
                      </label>
                      <input
                        type="tel"
                        name="telefono"
                        required
                        value={formData.telefono}
                        onChange={handleChange}
                        className="w-full px-4 py-2.5 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#00B140] focus:border-transparent transition-all"
                        placeholder="809-000-0000"
                      />
                    </div>
                    <div className="sm:col-span-2">
                      <label className="block text-sm font-medium text-gray-700 mb-1.5">
                        Cargo / Posición
                      </label>
                      <input
                        type="text"
                        name="cargo"
                        value={formData.cargo}
                        onChange={handleChange}
                        className="w-full px-4 py-2.5 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#00B140] focus:border-transparent transition-all"
                        placeholder="Ej: Gerente de Proyectos"
                      />
                    </div>
                  </div>
                </div>

                {/* Section: Detalles del Producto */}
                <div className="mb-8">
                  <h2 className="text-xl font-bold text-gray-900 mb-4 pb-2 border-b">
                    Detalles del Producto
                  </h2>
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1.5">
                        Categoría de Producto *
                      </label>
                      <select
                        name="categoriaProducto"
                        required
                        value={formData.categoriaProducto}
                        onChange={handleChange}
                        className="w-full px-4 py-2.5 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#00B140] focus:border-transparent transition-all"
                      >
                        <option value="">Seleccione...</option>
                        {eicProductCategories.map((cat) => (
                          <option key={cat.id} value={cat.slug}>
                            {cat.name}
                          </option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1.5">
                        Producto Específico
                      </label>
                      <select
                        name="productoEspecifico"
                        value={formData.productoEspecifico}
                        onChange={handleChange}
                        className="w-full px-4 py-2.5 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#00B140] focus:border-transparent transition-all"
                      >
                        <option value="">Seleccione...</option>
                        {filteredProducts.map((prod) => (
                          <option key={prod.id} value={prod.slug}>
                            {prod.shortName} ({prod.brand})
                          </option>
                        ))}
                        <option value="otro">Otro / No estoy seguro</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1.5">
                        Marca Preferida
                      </label>
                      <select
                        name="marca"
                        value={formData.marca}
                        onChange={handleChange}
                        className="w-full px-4 py-2.5 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#00B140] focus:border-transparent transition-all"
                      >
                        <option value="">Sin preferencia</option>
                        {filteredBrands.map((brand) => (
                          <option key={brand.id} value={brand.name}>
                            {brand.name} ({brand.country})
                          </option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1.5">
                        Cantidad
                      </label>
                      <input
                        type="number"
                        name="cantidad"
                        min="1"
                        value={formData.cantidad}
                        onChange={handleChange}
                        className="w-full px-4 py-2.5 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#00B140] focus:border-transparent transition-all"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1.5">
                        Potencia (kVA)
                      </label>
                      <input
                        type="text"
                        name="potencia"
                        value={formData.potencia}
                        onChange={handleChange}
                        className="w-full px-4 py-2.5 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#00B140] focus:border-transparent transition-all"
                        placeholder="Ej: 500 kVA"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1.5">
                        Voltaje Primario (kV)
                      </label>
                      <input
                        type="text"
                        name="voltajePrimario"
                        value={formData.voltajePrimario}
                        onChange={handleChange}
                        className="w-full px-4 py-2.5 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#00B140] focus:border-transparent transition-all"
                        placeholder="Ej: 13.2 kV"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1.5">
                        Voltaje Secundario (V)
                      </label>
                      <input
                        type="text"
                        name="voltajeSecundario"
                        value={formData.voltajeSecundario}
                        onChange={handleChange}
                        className="w-full px-4 py-2.5 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#00B140] focus:border-transparent transition-all"
                        placeholder="Ej: 120/240 V"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1.5">
                        Urgencia
                      </label>
                      <select
                        name="urgencia"
                        value={formData.urgencia}
                        onChange={handleChange}
                        className="w-full px-4 py-2.5 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#00B140] focus:border-transparent transition-all"
                      >
                        <option value="normal">Normal (3-6 semanas)</option>
                        <option value="prioritario">
                          Prioritario (2-3 semanas)
                        </option>
                        <option value="urgente">
                          Urgente (menos de 2 semanas)
                        </option>
                      </select>
                    </div>
                  </div>
                </div>

                {/* Section: Información Adicional */}
                <div className="mb-8">
                  <h2 className="text-xl font-bold text-gray-900 mb-4 pb-2 border-b">
                    Información Adicional
                  </h2>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1.5">
                        Ubicación del Proyecto
                      </label>
                      <input
                        type="text"
                        name="ubicacion"
                        value={formData.ubicacion}
                        onChange={handleChange}
                        className="w-full px-4 py-2.5 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#00B140] focus:border-transparent transition-all"
                        placeholder="Ciudad, Provincia / País"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1.5">
                        Descripción del Proyecto / Requerimiento
                      </label>
                      <textarea
                        name="descripcion"
                        value={formData.descripcion}
                        onChange={handleChange}
                        rows={4}
                        className="w-full px-4 py-2.5 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#00B140] focus:border-transparent transition-all resize-none"
                        placeholder="Describa su proyecto, especificaciones técnicas requeridas, condiciones de operación, o cualquier información relevante..."
                      />
                    </div>

                    {/* File Upload */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1.5">
                        Adjuntar Archivos (opcional)
                      </label>
                      <div className="border-2 border-dashed border-gray-300 rounded-xl p-4 hover:border-[#00B140] transition-colors">
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
                            Haga clic para subir archivos
                          </span>
                          <span className="text-xs text-gray-400 mt-1">
                            PDF, DOC, JPG, PNG, DWG, Excel (máx. 5 archivos)
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
                        ¿Cómo nos conoció?
                      </label>
                      <select
                        name="comoNosConocio"
                        value={formData.comoNosConocio}
                        onChange={handleChange}
                        className="w-full px-4 py-2.5 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#00B140] focus:border-transparent transition-all"
                      >
                        <option value="">Seleccione...</option>
                        <option value="google">Google / Búsqueda web</option>
                        <option value="referido">
                          Referido por un cliente
                        </option>
                        <option value="redes">Redes sociales</option>
                        <option value="evento">Evento / Feria</option>
                        <option value="publicidad">Publicidad</option>
                        <option value="representante">
                          Representante de marca
                        </option>
                        <option value="otro">Otro</option>
                      </select>
                    </div>
                  </div>
                </div>

                {/* Submit */}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full px-6 py-4 bg-[#FF5500] hover:bg-[#E64D00] disabled:bg-orange-300 text-white font-semibold rounded-xl transition-colors flex items-center justify-center gap-2"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 size={20} className="animate-spin" />
                      Enviando solicitud...
                    </>
                  ) : (
                    <>
                      Enviar Solicitud de Cotización
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
                  Contacto Directo
                </h3>
                <div className="space-y-4">
                  <a
                    href={`tel:${contactInfo.phone}`}
                    className="flex items-center gap-3 p-3 bg-gray-50 rounded-xl hover:bg-[#00B140]/10 transition-colors"
                  >
                    <div className="w-10 h-10 rounded-lg bg-[#00B140]/20 flex items-center justify-center">
                      <Phone size={20} className="text-[#00B140]" />
                    </div>
                    <div>
                      <span className="text-xs text-gray-500 block">
                        Teléfono
                      </span>
                      <span className="font-semibold text-gray-900">
                        {contactInfo.phone}
                      </span>
                    </div>
                  </a>
                  <a
                    href={`mailto:${contactInfo.email}`}
                    className="flex items-center gap-3 p-3 bg-gray-50 rounded-xl hover:bg-[#00B140]/10 transition-colors"
                  >
                    <div className="w-10 h-10 rounded-lg bg-[#00B140]/20 flex items-center justify-center">
                      <Mail size={20} className="text-[#00B140]" />
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
                className="bg-[#00B140]/10 rounded-2xl p-6"
              >
                <div className="flex items-center gap-3 mb-3">
                  <Clock size={24} className="text-[#00B140]" />
                  <h3 className="font-bold text-gray-900">Respuesta Rápida</h3>
                </div>
                <p className="text-gray-600 text-sm">
                  Respondemos en menos de <strong>30 minutos</strong> durante
                  horario laboral (Lunes a Viernes 8am - 5pm).
                </p>
              </motion.div>

              {/* International Badge */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.35 }}
                className="bg-gradient-to-br from-[#00B140] to-[#008F33] rounded-2xl p-6 text-white"
              >
                <div className="flex items-center gap-3 mb-3">
                  <Globe size={24} />
                  <h3 className="font-bold">Suplidores Internacionales</h3>
                </div>
                <p className="text-white/90 text-sm mb-3">
                  Representamos más de 8 marcas líderes del sector eléctrico con
                  presencia en más de 40 países.
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
                  <MapPin size={24} className="text-[#00B140]" />
                  <h3 className="font-bold text-gray-900">Ubicación</h3>
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
          <Loader2 size={40} className="animate-spin text-[#00B140]" />
        </div>
      }
    >
      <CotizacionesForm />
    </Suspense>
  );
}
