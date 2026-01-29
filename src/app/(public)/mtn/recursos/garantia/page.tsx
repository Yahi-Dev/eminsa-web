import { Metadata } from "next";
import Link from "next/link";
import { 
  ChevronRight, 
  Shield,
  CheckCircle2,
  XCircle,
  Clock,
  Phone,
  Mail,
  Download,
  ArrowRight,
  FileText
} from "lucide-react";

export const metadata: Metadata = {
  title: "Garantía - Recursos MTN | Grupo EMINSA",
  description: "Información sobre términos, cobertura y proceso de garantía para transformadores EMINSA.",
};

// Información de garantía
const warrantyPeriods = [
  { product: "Transformadores Tipo Poste", period: "3 años", icon: "🔌" },
  { product: "Transformadores Pad Mounted", period: "3 años", icon: "📦" },
  { product: "Transformadores de Subestación", period: "2 años", icon: "⚡" },
  { product: "Accesorios", period: "1 año", icon: "🔧" },
];

const coverage = [
  "Defectos de fabricación en materiales",
  "Defectos de mano de obra",
  "Fallas en el núcleo magnético",
  "Fallas en devanados primarios y secundarios",
  "Fugas en tanque hermético (primeros 2 años)",
  "Fallas en bushings y conectores",
  "Defectos en aceite dieléctrico",
  "Fallas en indicadores de nivel y temperatura",
];

const exclusions = [
  "Daños por sobrecarga eléctrica",
  "Daños por cortocircuito externo",
  "Daños por fenómenos naturales (rayos, inundaciones, terremotos)",
  "Daños por vandalismo o robo",
  "Modificaciones no autorizadas por EMINSA",
  "Falta de mantenimiento preventivo según manual",
  "Operación fuera de los parámetros especificados",
  "Daños durante transporte o instalación incorrecta",
  "Desgaste normal de componentes consumibles",
];

const claimProcess = [
  {
    step: 1,
    title: "Reporte el problema",
    description: "Contacte a nuestro departamento de servicio técnico con el número de serie del equipo.",
  },
  {
    step: 2,
    title: "Evaluación técnica",
    description: "Un técnico evaluará el equipo para determinar la causa de la falla.",
  },
  {
    step: 3,
    title: "Diagnóstico",
    description: "Recibirá un informe con el diagnóstico y la decisión sobre cobertura de garantía.",
  },
  {
    step: 4,
    title: "Reparación o reemplazo",
    description: "Si aplica la garantía, procederemos con la reparación o reemplazo del equipo.",
  },
];

export default function GarantiaPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero */}
      <section className="bg-gradient-to-br from-[#001689] to-[#000E53] text-white py-12">
        <div className="container-eminsa">
          {/* Breadcrumb */}
          <nav className="flex items-center gap-2 text-sm text-white/60 mb-6">
            <Link href="/" className="hover:text-white transition-colors">Inicio</Link>
            <ChevronRight size={14} />
            <Link href="/mtn" className="hover:text-white transition-colors">MTN</Link>
            <ChevronRight size={14} />
            <Link href="/mtn/recursos" className="hover:text-white transition-colors">Recursos</Link>
            <ChevronRight size={14} />
            <span className="text-white">Garantía</span>
          </nav>

          <div className="flex items-center gap-4">
            <div className="w-14 h-14 bg-white/10 rounded-xl flex items-center justify-center">
              <Shield size={28} />
            </div>
            <div>
              <h1 className="text-3xl font-bold">Garantía</h1>
              <p className="text-white/70">Términos y condiciones de garantía</p>
            </div>
          </div>
        </div>
      </section>

      {/* Warranty Periods */}
      <section className="py-12 bg-white">
        <div className="container-eminsa">
          <h2 className="text-2xl font-bold text-gray-900 mb-8 text-center">
            Períodos de Garantía
          </h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {warrantyPeriods.map((item, idx) => (
              <div key={idx} className="bg-gradient-to-br from-[#001689]/5 to-[#00A3E0]/5 rounded-2xl p-6 text-center border border-[#001689]/10">
                <span className="text-4xl">{item.icon}</span>
                <p className="text-3xl font-bold text-[#001689] mt-4">{item.period}</p>
                <p className="text-gray-600 mt-2">{item.product}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Coverage & Exclusions */}
      <section className="py-12">
        <div className="container-eminsa">
          <div className="grid lg:grid-cols-2 gap-8">
            {/* Coverage */}
            <div className="bg-white rounded-2xl shadow-lg p-8">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                  <CheckCircle2 size={24} className="text-green-600" />
                </div>
                <h2 className="text-xl font-bold text-gray-900">Cobertura</h2>
              </div>
              <ul className="space-y-3">
                {coverage.map((item, idx) => (
                  <li key={idx} className="flex items-start gap-3">
                    <CheckCircle2 size={18} className="text-green-500 flex-shrink-0 mt-0.5" />
                    <span className="text-gray-600">{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Exclusions */}
            <div className="bg-white rounded-2xl shadow-lg p-8">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 bg-red-100 rounded-lg flex items-center justify-center">
                  <XCircle size={24} className="text-red-600" />
                </div>
                <h2 className="text-xl font-bold text-gray-900">Exclusiones</h2>
              </div>
              <ul className="space-y-3">
                {exclusions.map((item, idx) => (
                  <li key={idx} className="flex items-start gap-3">
                    <XCircle size={18} className="text-red-400 flex-shrink-0 mt-0.5" />
                    <span className="text-gray-600">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Claim Process */}
      <section className="py-12 bg-white">
        <div className="container-eminsa">
          <h2 className="text-2xl font-bold text-gray-900 mb-8 text-center">
            Proceso de Reclamación
          </h2>
          <div className="max-w-4xl mx-auto">
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {claimProcess.map((item) => (
                <div key={item.step} className="relative">
                  <div className="bg-gray-50 rounded-xl p-6 h-full">
                    <div className="w-10 h-10 bg-[#001689] text-white rounded-full flex items-center justify-center font-bold mb-4">
                      {item.step}
                    </div>
                    <h3 className="font-bold text-gray-900 mb-2">{item.title}</h3>
                    <p className="text-sm text-gray-600">{item.description}</p>
                  </div>
                  {item.step < 4 && (
                    <div className="hidden lg:block absolute top-1/2 -right-2 transform -translate-y-1/2">
                      <ChevronRight size={20} className="text-gray-300" />
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Requirements */}
      <section className="py-12">
        <div className="container-eminsa">
          <div className="max-w-3xl mx-auto bg-[#001689]/5 rounded-2xl p-8">
            <h2 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
              <Clock size={24} className="text-[#001689]" />
              Requisitos para Validar la Garantía
            </h2>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <div className="w-6 h-6 bg-[#001689] text-white rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0">1</div>
                <span className="text-gray-700">Presentar factura original de compra o documento equivalente.</span>
              </li>
              <li className="flex items-start gap-3">
                <div className="w-6 h-6 bg-[#001689] text-white rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0">2</div>
                <span className="text-gray-700">Proporcionar número de serie del equipo visible en la placa de datos.</span>
              </li>
              <li className="flex items-start gap-3">
                <div className="w-6 h-6 bg-[#001689] text-white rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0">3</div>
                <span className="text-gray-700">Documentar registros de mantenimiento preventivo según el manual.</span>
              </li>
              <li className="flex items-start gap-3">
                <div className="w-6 h-6 bg-[#001689] text-white rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0">4</div>
                <span className="text-gray-700">Reportar la falla dentro del período de garantía vigente.</span>
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* Contact & Download */}
      <section className="py-12 bg-white">
        <div className="container-eminsa">
          <div className="grid md:grid-cols-2 gap-8">
            {/* Contact */}
            <div className="bg-gray-50 rounded-2xl p-8">
              <h2 className="text-xl font-bold text-gray-900 mb-6">Contacto de Servicio Técnico</h2>
              <div className="space-y-4">
                <a href="tel:809-555-0123" className="flex items-center gap-4 p-4 bg-white rounded-xl hover:shadow-md transition-shadow">
                  <div className="w-12 h-12 bg-[#001689] rounded-lg flex items-center justify-center">
                    <Phone size={24} className="text-white" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Teléfono</p>
                    <p className="font-semibold text-gray-900">(809) 555-0123</p>
                  </div>
                </a>
                <a href="mailto:servicio@eminsa.com" className="flex items-center gap-4 p-4 bg-white rounded-xl hover:shadow-md transition-shadow">
                  <div className="w-12 h-12 bg-[#00A3E0] rounded-lg flex items-center justify-center">
                    <Mail size={24} className="text-white" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Correo Electrónico</p>
                    <p className="font-semibold text-gray-900">servicio@eminsa.com</p>
                  </div>
                </a>
              </div>
            </div>

            {/* Download */}
            <div className="bg-gradient-to-br from-[#001689] to-[#00A3E0] rounded-2xl p-8 text-white">
              <h2 className="text-xl font-bold mb-4">Documento de Garantía</h2>
              <p className="text-white/80 mb-6">
                Descargue el documento completo con todos los términos y condiciones de garantía.
              </p>
              <button className="flex items-center gap-2 bg-white text-[#001689] hover:bg-gray-100 px-6 py-3 rounded-xl font-semibold transition-colors">
                <Download size={20} />
                Descargar PDF
              </button>
              <p className="text-sm text-white/60 mt-4">
                <FileText size={14} className="inline mr-1" />
                Términos_Garantía_EMINSA.pdf (320 KB)
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-12 bg-[#001689] text-white">
        <div className="container-eminsa text-center">
          <h2 className="text-2xl font-bold mb-4">¿Tiene preguntas sobre la garantía?</h2>
          <p className="text-white/80 mb-6 max-w-xl mx-auto">
            Nuestro equipo está disponible para resolver cualquier duda.
          </p>
          <Link
            href="/mtn/cotizaciones"
            className="inline-flex items-center gap-2 bg-[#FF5500] hover:bg-[#E64D00] text-white px-6 py-3 rounded-xl font-semibold transition-colors"
          >
            Contactar Soporte
            <ArrowRight size={18} />
          </Link>
        </div>
      </section>
    </div>
  );
}
