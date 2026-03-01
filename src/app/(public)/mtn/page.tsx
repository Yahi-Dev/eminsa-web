import { Metadata } from "next";
import Link from "next/link";
import {
  ArrowRight, 
  Factory, 
  Shield, 
  Award, 
  Zap,
  CheckCircle2,
  ChevronRight,
  FileText,
  Calculator,
  BookOpen,
  Phone,
  MessageCircle
} from "lucide-react";
import {
  mtnInfo,
  transformerProducts,
  standards,
  certifications,
  resources
} from "@/config/mtn-data";
import CertificationsTabSelector from "@/features/home/components/mtn/CertificationsTabSelector";
import { contactInfo } from "@/config/navigation";
import { getWhatsAppUrl } from "@/utils/whatsapp";

export const metadata: Metadata = {
  title: "MTN - Manufactura de Transformadores Nuevos | Grupo EMINSA",
  description: "Transformadores 100% nuevos fabricados en República Dominicana. Cumplimos con estándares ANSI y DOE 2016. Tipo Poste, Pad Mounted y Subestación.",
  openGraph: {
    title: "MTN - Manufactura de Transformadores Nuevos | Grupo EMINSA",
    description: "Transformadores 100% nuevos fabricados en República Dominicana bajo los más altos estándares internacionales.",
    images: ["/images/mtn-og.jpg"],
  },
};

// Iconos para recursos
const resourceIcons: Record<string, React.ElementType> = {
  newspaper: FileText,
  "file-text": FileText,
  "shield-check": Shield,
  "book-open": BookOpen,
  calculator: Calculator,
};

export default function MTNPage() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-[#001689] via-[#000E53] to-[#001689] text-white overflow-hidden">
        {/* Background pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0" style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.4'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }} />
        </div>

        <div className="container-eminsa relative z-10 py-20 lg:py-28">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              {/* Badge */}
              <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full border border-white/20">
                <Factory size={18} className="text-[#00A3E0]" />
                <span className="text-sm font-medium">Fabricación 100% Nacional</span>
              </div>

              {/* Title */}
              <div className="space-y-4">
                <h1 className="text-5xl lg:text-6xl font-bold tracking-tight">
                  <span className="text-[#00A3E0]">Manufactura Transformadores Nuevos</span>
                </h1>
                <p className="text-2xl lg:text-3xl font-light text-white/90 leading-relaxed">
                  {mtnInfo.heroDescription}
                </p>
              </div>

              {/* Description */}
              <p className="text-lg text-white/70 leading-relaxed max-w-xl">
                {mtnInfo.description}
              </p>

              {/* CTAs */}
              <div className="flex flex-wrap gap-4">
                <Link
                  href="/mtn/cotizaciones"
                  className="inline-flex items-center gap-2 bg-[#001689] hover:bg-[#000E53] text-white px-8 py-4 rounded-xl font-semibold transition-all duration-300 shadow-lg hover:shadow-xl hover:-translate-y-0.5"
                >
                  Solicitar Cotización
                  <ArrowRight size={20} />
                </Link>
                <Link
                  href="/mtn/productos"
                  className="inline-flex items-center gap-2 bg-white/10 hover:bg-white/20 backdrop-blur-sm text-white px-8 py-4 rounded-xl font-semibold transition-all duration-300 border border-white/30"
                >
                  Ver Productos
                  <ChevronRight size={20} />
                </Link>
              </div>
            </div>

            {/* Hero Image/Visual */}
            <div className="relative hidden lg:block">
              <div className="relative aspect-square">
                {/* Decorative circles */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-80 h-80 border-2 border-white/10 rounded-full animate-pulse" />
                  <div className="absolute w-64 h-64 border-2 border-[#00A3E0]/30 rounded-full animate-pulse delay-150" />
                  <div className="absolute w-48 h-48 border-2 border-white/20 rounded-full animate-pulse delay-300" />
                </div>
                
                {/* Center content */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <Link
                    href="/mtn/certificaciones"
                    className="bg-white/10 backdrop-blur-md p-8 rounded-2xl border border-white/20 hover:bg-white/20 hover:scale-105 transition-all duration-300 group"
                  >
                    <div className="text-center space-y-2">
                      <Zap size={48} className="mx-auto text-[#00A3E0]" />
                      <p className="text-4xl font-bold">DOE 2016</p>
                      <p className="text-sm text-white/70">Certificación de Eficiencia</p>
                      <p className="text-xs text-white/50 group-hover:text-white/80 transition-colors pt-1">
                        Ver certificaciones →
                      </p>
                    </div>
                  </Link>
                </div>
              </div>
            </div>
          </div>


        </div>
      </section>

      {/* Productos Section */}
      <section className="py-20 bg-white">
        <div className="container-eminsa">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="inline-block text-[#001689] font-semibold text-sm uppercase tracking-wider mb-4">
              Nuestros Productos
            </span>
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Transformadores de Alta Calidad
            </h2>
            <p className="text-lg text-gray-600">
              Diseñados para optimizar el rendimiento y la eficiencia energética en sus instalaciones
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {transformerProducts.map((product, index) => (
              <Link
                key={product.id}
                href={`/mtn/productos/${product.slug}`}
                className="group relative bg-gradient-to-br from-gray-50 to-gray-100 rounded-2xl overflow-hidden border border-gray-200 hover:border-[#001689]/30 transition-all duration-300 hover:shadow-xl hover:-translate-y-1"
              >
                {/* Product image placeholder */}
                <div className="aspect-[4/3] bg-gradient-to-br from-[#001689]/5 to-[#00A3E0]/5 flex items-center justify-center">
                  <div className="w-24 h-24 bg-[#001689]/10 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                    <Zap size={40} className="text-[#001689]" />
                  </div>
                </div>

                {/* Content */}
                <div className="p-6 space-y-4">
                  <div className="flex items-start justify-between">
                    <h3 className="text-xl font-bold text-gray-900 group-hover:text-[#001689] transition-colors">
                      {product.shortName}
                    </h3>
                    <ArrowRight size={20} className="text-gray-400 group-hover:text-[#001689] group-hover:translate-x-1 transition-all" />
                  </div>

                  <p className="text-gray-600 text-sm line-clamp-2">
                    {product.description}
                  </p>

                  {/* Specs */}
                  <div className="pt-4 border-t border-gray-200 space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-500">Potencia</span>
                      <span className="font-semibold text-gray-900">{product.powerRange}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-500">Voltaje</span>
                      <span className="font-semibold text-gray-900">{product.voltageRange}</span>
                    </div>
                  </div>

                  {/* Standards badges */}
                  <div className="flex flex-wrap gap-2 pt-2">
                    {product.standards.slice(0, 2).map((std) => (
                      <span
                        key={std}
                        className="inline-flex items-center gap-1 bg-[#001689]/10 text-[#001689] text-xs font-medium px-2 py-1 rounded-full"
                      >
                        <CheckCircle2 size={12} />
                        {std}
                      </span>
                    ))}
                  </div>
                </div>
              </Link>
            ))}
          </div>

          <div className="text-center mt-12">
            <Link
              href="/mtn/productos"
              className="inline-flex items-center gap-2 text-[#001689] hover:text-[#000E53] font-semibold transition-colors"
            >
              Ver todos los productos
              <ArrowRight size={20} />
            </Link>
          </div>
        </div>
      </section>

      {/* Normativas y Certificaciones */}
      <section className="py-20 bg-gray-50">
        <div className="container-eminsa">
          <div className="grid lg:grid-cols-2 gap-16">
            {/* Normativas */}
            <div>
              <div className="flex items-center gap-3 mb-8">
                <div className="w-12 h-12 bg-[#001689] rounded-xl flex items-center justify-center">
                  <Shield size={24} className="text-white" />
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-gray-900">Normativas</h2>
                  <p className="text-gray-600">Estándares que garantizan calidad</p>
                </div>
              </div>

              <div className="space-y-4">
                {standards.map((standard) => (
                  <Link
                    key={standard.id}
                    href={`/mtn/normativa/${standard.slug}`}
                    className="group block bg-white rounded-xl p-6 border border-gray-200 hover:border-[#001689]/30 hover:shadow-lg transition-all duration-300"
                  >
                    <div className="flex items-start justify-between">
                      <div className="space-y-2">
                        <h3 className="text-lg font-bold text-gray-900 group-hover:text-[#001689] transition-colors">
                          {standard.name}
                        </h3>
                        <p className="text-sm text-gray-500">{standard.fullName}</p>
                        <p className="text-gray-600 text-sm line-clamp-2">
                          {standard.description}
                        </p>
                      </div>
                      <ChevronRight size={20} className="text-gray-400 group-hover:text-[#001689] group-hover:translate-x-1 transition-all flex-shrink-0 mt-1" />
                    </div>
                  </Link>
                ))}
              </div>

              <Link
                href="/mtn/normativa"
                className="inline-flex items-center gap-2 text-[#001689] hover:text-[#000E53] font-semibold mt-6 transition-colors"
              >
                Ver todas las normativas
                <ArrowRight size={18} />
              </Link>
            </div>

            {/* Certificaciones */}
            <div>
              <div className="flex items-center gap-3 mb-8">
                <div className="w-12 h-12 bg-[#00A3E0] rounded-xl flex items-center justify-center">
                  <Award size={24} className="text-white" />
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-gray-900">Certificaciones</h2>
                  <p className="text-gray-600">Respaldo de calidad internacional</p>
                </div>
              </div>

              <CertificationsTabSelector certifications={certifications} />
            </div>
          </div>
        </div>
      </section>

      {/* Recursos Section */}
      <section className="py-20 bg-white">
        <div className="container-eminsa">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Recursos Técnicos
            </h2>
            <p className="text-lg text-gray-600">
              Acceda a documentación técnica, herramientas y guías para sus proyectos
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {resources.map((resource) => {
              const Icon = resourceIcons[resource.icon] || FileText;
              return (
                <Link
                  key={resource.id}
                  href={`/mtn/recursos/${resource.slug}`}
                  className="group flex flex-col items-center text-center p-6 bg-gray-50 rounded-xl hover:bg-[#001689] transition-all duration-300"
                >
                  <div className="w-14 h-14 bg-[#001689]/10 group-hover:bg-white/20 rounded-full flex items-center justify-center mb-4 transition-colors">
                    <Icon size={24} className="text-[#001689] group-hover:text-white transition-colors" />
                  </div>
                  <h3 className="font-semibold text-gray-900 group-hover:text-white transition-colors">
                    {resource.name}
                  </h3>
                  <p className="text-sm text-gray-500 group-hover:text-white/70 mt-1 line-clamp-2 transition-colors">
                    {resource.description}
                  </p>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-br from-[#001689] to-[#000E53] text-white">
        <div className="container-eminsa">
          <div className="max-w-4xl mx-auto text-center space-y-8">
            <h2 className="text-4xl font-bold">
              ¿Necesita un Transformador a Medida?
            </h2>
            <p className="text-xl text-white/80 max-w-2xl mx-auto">
              Nuestro equipo de ingenieros está listo para diseñar la solución perfecta para su proyecto. Contáctenos hoy mismo.
            </p>

            <div className="flex flex-wrap justify-center gap-4">
              <Link
                href="/mtn/cotizaciones"
                className="inline-flex items-center gap-2 bg-[#001689] hover:bg-[#000E53] text-white px-8 py-4 rounded-xl font-semibold transition-all duration-300 shadow-lg hover:shadow-xl"
              >
                Solicitar Cotización
                <ArrowRight size={20} />
              </Link>
              <a
                href={`tel:${contactInfo.phone}`}
                className="inline-flex items-center gap-2 bg-white/10 hover:bg-white/20 backdrop-blur-sm text-white px-8 py-4 rounded-xl font-semibold transition-all duration-300 border border-white/30"
              >
                <Phone size={20} />
                Llamar Ahora
              </a>
              <a
                href={getWhatsAppUrl()}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-[#25D366] hover:bg-[#20BD5A] text-white px-8 py-4 rounded-xl font-semibold transition-all duration-300"
              >
                <MessageCircle size={20} />
                WhatsApp
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
