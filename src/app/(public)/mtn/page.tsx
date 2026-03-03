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
      <section className="relative bg-gradient-to-b from-[#00175d] via-[#00269b] to-[#001a6e] text-white overflow-hidden">
        {/* Subtle grid pattern */}
        <div
          className="absolute inset-0 opacity-[0.04]"
          style={{
            backgroundImage: `linear-gradient(to right, white 1px, transparent 1px), linear-gradient(to bottom, white 1px, transparent 1px)`,
            backgroundSize: "60px 60px",
          }}
        />

        <div className="container-eminsa relative z-10 py-20 lg:py-28">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              {/* Badge */}
              <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full border border-white/20">
                <Factory size={18} className="text-[#0099ce]" />
                <span className="text-sm font-medium">Fabricación 100% Nacional</span>
              </div>

              {/* Title */}
              <div className="space-y-4">
                <h1 className="text-5xl lg:text-6xl xl:text-7xl font-bold tracking-tight">
                  <span className="text-[#0099ce]">Manufactura Transformadores Nuevos</span>
                </h1>
                <p className="text-2xl lg:text-3xl xl:text-4xl font-light text-white/90 leading-relaxed">
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
                  className="inline-flex items-center gap-2 bg-white text-[#00269b] hover:bg-gray-100 px-8 py-4 rounded-xl font-semibold transition-all duration-300 shadow-lg hover:shadow-xl hover:-translate-y-0.5"
                >
                  Solicitar Cotización
                  <ArrowRight size={20} />
                </Link>
                <Link
                  href="/mtn/productos"
                  className="inline-flex items-center gap-2 bg-white/10 hover:bg-white/20 backdrop-blur-sm text-white px-8 py-4 rounded-xl font-semibold transition-all duration-300 border border-white/20"
                >
                  Ver Productos
                  <ChevronRight size={20} />
                </Link>
              </div>
            </div>

            {/* Hero Image/Visual */}
            <div className="relative hidden lg:block">
              <div className="relative aspect-square">
                {/* Water ripple circles - expanding outward from center */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="absolute w-125 h-125 border-2 border-white/50 rounded-full animate-ripple" />
                  <div className="absolute w-125 h-125 border-2 border-white/40 rounded-full animate-ripple" style={{ animationDelay: "0.6s" }} />
                  <div className="absolute w-125 h-125 border-2 border-white/35 rounded-full animate-ripple" style={{ animationDelay: "1.2s" }} />
                  <div className="absolute w-125 h-125 border-2 border-white/30 rounded-full animate-ripple" style={{ animationDelay: "1.8s" }} />
                  <div className="absolute w-125 h-125 border-2 border-white/25 rounded-full animate-ripple" style={{ animationDelay: "2.4s" }} />
                </div>

                {/* Center content */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <Link
                    href="/mtn/certificaciones"
                    className="bg-white/10 backdrop-blur-md p-8 rounded-2xl border border-white/20 hover:bg-white/20 hover:scale-105 transition-all duration-300 group relative z-10"
                  >
                    <div className="text-center space-y-2">
                      <Zap size={48} className="mx-auto text-[#0099ce]" />
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
      <section className="py-20 bg-white" id="productos">
        <div className="container-eminsa">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="inline-block text-[#00269b] font-semibold text-sm uppercase tracking-wider mb-4">
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
                className="group relative bg-white rounded-2xl overflow-hidden border border-gray-100 hover:border-[#00269b]/20 transition-all duration-300 hover:shadow-xl hover:-translate-y-1"
              >
                {/* Product image placeholder */}
                <div className="aspect-[4/3] bg-gradient-to-br from-[#00269b]/3 to-[#0099ce]/6 flex items-center justify-center">
                  <div className="w-20 h-20 bg-[#00269b]/8 rounded-2xl flex items-center justify-center group-hover:scale-110 group-hover:bg-[#00269b]/12 transition-all duration-300">
                    <Zap size={36} className="text-[#00269b]" />
                  </div>
                </div>

                {/* Content */}
                <div className="p-6 space-y-4">
                  <div className="flex items-start justify-between">
                    <h3 className="text-xl font-bold text-gray-900 group-hover:text-[#00269b] transition-colors">
                      {product.shortName}
                    </h3>
                    <ArrowRight size={20} className="text-gray-400 group-hover:text-[#00269b] group-hover:translate-x-1 transition-all" />
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
                        className="inline-flex items-center gap-1 bg-[#00269b]/10 text-[#00269b] text-xs font-medium px-2 py-1 rounded-full"
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
              className="inline-flex items-center gap-2 text-[#00269b] hover:text-[#00175d] font-semibold transition-colors"
            >
              Ver todos los productos
              <ArrowRight size={20} />
            </Link>
          </div>
        </div>
      </section>

      {/* Normativas y Certificaciones */}
      <section className="py-20 bg-[#00269b]/3">
        <div className="container-eminsa">
          <div className="grid lg:grid-cols-2 gap-16">
            {/* Normativas */}
            <div>
              <div className="flex items-center gap-3 mb-8">
                <div className="w-12 h-12 bg-[#00269b] rounded-xl flex items-center justify-center">
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
                    className="group block bg-white rounded-xl p-6 border border-gray-100 hover:border-[#00269b]/20 hover:shadow-lg transition-all duration-300"
                  >
                    <div className="flex items-start justify-between">
                      <div className="space-y-2">
                        <h3 className="text-lg font-bold text-gray-900 group-hover:text-[#00269b] transition-colors">
                          {standard.name}
                        </h3>
                        <p className="text-sm text-gray-500">{standard.fullName}</p>
                        <p className="text-gray-600 text-sm line-clamp-2">
                          {standard.description}
                        </p>
                      </div>
                      <ChevronRight size={20} className="text-gray-400 group-hover:text-[#00269b] group-hover:translate-x-1 transition-all flex-shrink-0 mt-1" />
                    </div>
                  </Link>
                ))}
              </div>

              <Link
                href="/mtn/normativa"
                className="inline-flex items-center gap-2 text-[#00269b] hover:text-[#00175d] font-semibold mt-6 transition-colors"
              >
                Ver todas las normativas
                <ArrowRight size={18} />
              </Link>
            </div>

            {/* Certificaciones */}
            <div>
              <div className="flex items-center gap-3 mb-8">
                <div className="w-12 h-12 bg-[#0099ce] rounded-xl flex items-center justify-center">
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
      <section className="py-20 bg-white" id="recursos">
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
                  className="group flex flex-col items-center text-center p-6 bg-white rounded-xl border border-gray-100 hover:bg-[#00269b] hover:border-[#00269b] transition-all duration-300 hover:shadow-lg"
                >
                  <div className="w-14 h-14 bg-[#00269b]/10 group-hover:bg-white/20 rounded-full flex items-center justify-center mb-4 transition-colors">
                    <Icon size={24} className="text-[#00269b] group-hover:text-white transition-colors" />
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
      <section className="py-20 bg-[#00175d] text-white">
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
                className="inline-flex items-center gap-2 bg-white text-[#00269b] hover:bg-gray-100 px-8 py-4 rounded-xl font-semibold transition-all duration-300 shadow-lg hover:shadow-xl"
              >
                Solicitar Cotización
                <ArrowRight size={20} />
              </Link>
              <a
                href={`tel:${contactInfo.phone}`}
                className="inline-flex items-center gap-2 bg-white/10 hover:bg-white/20 backdrop-blur-sm text-white px-8 py-4 rounded-xl font-semibold transition-all duration-300 border border-white/20"
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
