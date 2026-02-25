import { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { 
  ArrowRight, 
  Zap, 
  CheckCircle2, 
  ChevronRight,
  Settings,
  Shield,
  Building2,
  Phone,
  MessageCircle,
  Download,
  FileText
} from "lucide-react";
import { 
  getProductBySlug, 
  getVariantsByProduct,
  transformerProducts 
} from "@/config/mtn-data";
import { contactInfo } from "@/config/navigation";
import { getWhatsAppUrl } from "@/utils/whatsapp";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return transformerProducts.map((product) => ({
    slug: product.slug,
  }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const product = getProductBySlug(slug);
  
  if (!product) {
    return {
      title: "Producto no encontrado | Grupo EMINSA",
    };
  }

  return {
    title: `${product.name} | MTN - Grupo EMINSA`,
    description: product.description,
    openGraph: {
      title: `${product.name} | MTN - Grupo EMINSA`,
      description: product.description,
    },
  };
}

export default async function ProductoPage({ params }: Props) {
  const { slug } = await params;
  const product = getProductBySlug(slug);

  if (!product) {
    notFound();
  }

  const variants = getVariantsByProduct(product.id);

  // Colores según el tipo de producto
  const productColors: Record<string, { gradient: string; accent: string }> = {
    "tipo-poste": { gradient: "from-[#001689] to-[#000E53]", accent: "#001689" },
    "pad-mounted": { gradient: "from-[#001689] to-[#000E53]", accent: "#00A3E0" },
    "subestacion": { gradient: "from-[#001689] to-[#000E53]", accent: "#00B140" },
  };

  const colors = productColors[slug] || productColors["tipo-poste"];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero */}
      <section className={`bg-gradient-to-br ${colors.gradient} text-white py-16 lg:py-20`}>
        <div className="container-eminsa">
          {/* Breadcrumb */}
          <nav className="flex items-center gap-2 text-sm text-white/60 mb-8">
            <Link href="/" className="hover:text-white transition-colors">Inicio</Link>
            <ChevronRight size={14} />
            <Link href="/mtn" className="hover:text-white transition-colors">MTN</Link>
            <ChevronRight size={14} />
            <Link href="/mtn/productos" className="hover:text-white transition-colors">Productos</Link>
            <ChevronRight size={14} />
            <span className="text-white">{product.shortName}</span>
          </nav>

          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Content */}
            <div className="space-y-6">
              <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full border border-white/20">
                <Zap size={16} />
                <span className="text-sm font-medium">Transformador</span>
              </div>

              <h1 className="text-4xl lg:text-5xl font-bold">
                {product.name}
              </h1>

              <p className="text-xl text-white/80 leading-relaxed">
                {product.description}
              </p>

              {/* Quick specs */}
              <div className="flex flex-wrap gap-6 py-4">
                <div className="bg-white/10 backdrop-blur-sm px-6 py-4 rounded-xl">
                  <p className="text-sm text-white/60">Potencia</p>
                  <p className="text-xl font-bold">{product.powerRange}</p>
                </div>
                <div className="bg-white/10 backdrop-blur-sm px-6 py-4 rounded-xl">
                  <p className="text-sm text-white/60">Voltaje</p>
                  <p className="text-xl font-bold">{product.voltageRange}</p>
                </div>
              </div>

              {/* Standards badges */}
              <div className="flex flex-wrap gap-2">
                {product.standards.map((std) => (
                  <span
                    key={std}
                    className="inline-flex items-center gap-1 bg-white/20 text-white text-sm font-medium px-3 py-1.5 rounded-full"
                  >
                    <CheckCircle2 size={14} />
                    {std}
                  </span>
                ))}
              </div>

              {/* CTAs */}
              <div className="flex flex-wrap gap-4 pt-4">
                <Link
                  href={`/mtn/cotizaciones?producto=${product.slug}`}
                  className="inline-flex items-center gap-2 bg-[#001689] hover:bg-[#000E53] text-white px-8 py-4 rounded-xl font-semibold transition-colors shadow-lg"
                >
                  Solicitar Cotización
                  <ArrowRight size={20} />
                </Link>
                <a
                  href={getWhatsAppUrl(`Hola, me interesa información sobre ${product.name}`)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 bg-white/10 hover:bg-white/20 text-white px-6 py-4 rounded-xl font-semibold transition-colors border border-white/30"
                >
                  <MessageCircle size={20} />
                  WhatsApp
                </a>
              </div>
            </div>

            {/* Visual */}
            <div className="hidden lg:flex items-center justify-center">
              <div className="relative">
                <div className="w-80 h-80 bg-white/10 backdrop-blur-sm rounded-3xl flex items-center justify-center border border-white/20">
                  <Zap size={120} className="text-white/80" />
                </div>
                {/* Decorative elements */}
                <div className="absolute -top-4 -right-4 w-24 h-24 bg-white/10 rounded-2xl backdrop-blur-sm border border-white/20 flex items-center justify-center">
                  <Shield size={40} className="text-white/80" />
                </div>
                <div className="absolute -bottom-4 -left-4 w-20 h-20 bg-white/10 rounded-2xl backdrop-blur-sm border border-white/20 flex items-center justify-center">
                  <Settings size={32} className="text-white/80" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Variants Section */}
      {variants.length > 0 && (
        <section className="py-16 bg-white">
          <div className="container-eminsa">
            <h2 className="text-2xl font-bold text-gray-900 mb-8">
              Configuraciones Disponibles
            </h2>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {variants.map((variant) => (
                <Link
                  key={variant.id}
                  href={`/mtn/productos/${product.slug}/${variant.slug}`}
                  className="group bg-gray-50 hover:bg-white rounded-2xl p-6 border border-gray-200 hover:border-[#001689]/30 hover:shadow-xl transition-all duration-300"
                >
                  <div className="flex items-start justify-between mb-4">
                    <div className="w-12 h-12 bg-[#001689]/10 rounded-xl flex items-center justify-center group-hover:bg-[#001689] transition-colors">
                      <Zap size={24} className="text-[#001689] group-hover:text-white transition-colors" />
                    </div>
                    <ChevronRight size={20} className="text-gray-400 group-hover:text-[#001689] group-hover:translate-x-1 transition-all" />
                  </div>

                  <h3 className="text-lg font-bold text-gray-900 mb-2 group-hover:text-[#001689] transition-colors">
                    {variant.name.replace(`Transformadores ${product.shortName} `, '')}
                  </h3>
                  <p className="text-gray-600 text-sm mb-4">
                    {variant.description}
                  </p>

                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-500">Potencia</span>
                      <span className="font-medium">{variant.specs.power}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-500">Voltaje</span>
                      <span className="font-medium">{variant.specs.voltage}</span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Description & Features */}
      <section className="py-16 bg-gray-50">
        <div className="container-eminsa">
          <div className="grid lg:grid-cols-2 gap-12">
            {/* Full Description */}
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-6">
                Descripción
              </h2>
              <div className="prose prose-lg max-w-none text-gray-600">
                {product.fullDescription.split('\n\n').map((paragraph, idx) => (
                  <p key={idx} className="mb-4">{paragraph}</p>
                ))}
              </div>
            </div>

            {/* Features */}
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-6">
                Características
              </h2>
              <div className="space-y-3">
                {product.features.map((feature, idx) => (
                  <div key={idx} className="flex items-start gap-3 bg-white p-4 rounded-xl">
                    <CheckCircle2 size={20} className="text-green-500 flex-shrink-0 mt-0.5" />
                    <span className="text-gray-700">{feature}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Applications */}
      <section className="py-16 bg-white">
        <div className="container-eminsa">
          <h2 className="text-2xl font-bold text-gray-900 mb-8">
            Aplicaciones
          </h2>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {product.applications.map((app, idx) => (
              <div key={idx} className="flex items-center gap-3 bg-gray-50 p-4 rounded-xl">
                <Building2 size={20} className="text-[#001689]" />
                <span className="text-gray-700">{app}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Capacities */}


      {/* Resources */}
      <section className="py-16 bg-white">
        <div className="container-eminsa">
          <h2 className="text-2xl font-bold text-gray-900 mb-8">
            Recursos Técnicos
          </h2>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <Link
              href="/mtn/recursos/fichas-tecnicas"
              className="flex items-center gap-4 bg-gray-50 hover:bg-[#001689] p-6 rounded-xl group transition-colors"
            >
              <FileText size={24} className="text-[#001689] group-hover:text-white" />
              <div>
                <p className="font-semibold text-gray-900 group-hover:text-white">Ficha Técnica</p>
                <p className="text-sm text-gray-500 group-hover:text-white/70">Descargar PDF</p>
              </div>
            </Link>
            <Link
              href="/mtn/recursos/manual-mantenimiento"
              className="flex items-center gap-4 bg-gray-50 hover:bg-[#001689] p-6 rounded-xl group transition-colors"
            >
              <Download size={24} className="text-[#001689] group-hover:text-white" />
              <div>
                <p className="font-semibold text-gray-900 group-hover:text-white">Manual</p>
                <p className="text-sm text-gray-500 group-hover:text-white/70">Mantenimiento</p>
              </div>
            </Link>
            <Link
              href="/mtn/recursos/garantia"
              className="flex items-center gap-4 bg-gray-50 hover:bg-[#001689] p-6 rounded-xl group transition-colors"
            >
              <Shield size={24} className="text-[#001689] group-hover:text-white" />
              <div>
                <p className="font-semibold text-gray-900 group-hover:text-white">Garantía</p>
                <p className="text-sm text-gray-500 group-hover:text-white/70">Ver términos</p>
              </div>
            </Link>
            <Link
              href="/mtn/recursos/calculadora"
              className="flex items-center gap-4 bg-gray-50 hover:bg-[#001689] p-6 rounded-xl group transition-colors"
            >
              <Settings size={24} className="text-[#001689] group-hover:text-white" />
              <div>
                <p className="font-semibold text-gray-900 group-hover:text-white">Calculadora</p>
                <p className="text-sm text-gray-500 group-hover:text-white/70">Calcular kVA</p>
              </div>
            </Link>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className={`py-16 bg-gradient-to-br ${colors.gradient} text-white`}>
        <div className="container-eminsa">
          <div className="max-w-3xl mx-auto text-center space-y-6">
            <h2 className="text-3xl font-bold">
              ¿Interesado en {product.shortName}?
            </h2>
            <p className="text-xl text-white/80">
              Contáctenos para obtener una cotización personalizada o resolver cualquier duda técnica.
            </p>

            <div className="flex flex-wrap justify-center gap-4 pt-4">
              <Link
                href={`/mtn/cotizaciones?producto=${product.slug}`}
                className="inline-flex items-center gap-2 bg-[#001689] hover:bg-[#000E53] text-white px-8 py-4 rounded-xl font-semibold transition-colors"
              >
                Solicitar Cotización
                <ArrowRight size={20} />
              </Link>
              <a
                href={`tel:${contactInfo.phone}`}
                className="inline-flex items-center gap-2 bg-white/10 hover:bg-white/20 text-white px-8 py-4 rounded-xl font-semibold transition-colors border border-white/30"
              >
                <Phone size={20} />
                {contactInfo.phone}
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
