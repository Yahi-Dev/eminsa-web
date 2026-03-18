"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import {
  ArrowRight,
  ChevronRight,
  Home,
  CheckCircle2,
  Factory,
  Zap,
  Shield,
  Clock,
  Cpu,
  Layers,
  Flame,
  Hammer,
  Boxes,
  Droplets,
  FlaskConical,
  PackageCheck,
  Wrench,
} from "lucide-react";

const steps = [
  {
    id: 1,
    icon: Cpu,
    title: "Planificación y Diseño",
    subtitle: "Diseño eléctrico y mecánico",
    accent: "#00269b",
    badge: "Etapa 1 de 9",
    description:
      "El proceso comienza con la apertura de la orden de producción. El equipo de diseño eléctrico define todas las características eléctricas del transformador, y el departamento de diseño mecánico desarrolla su diseño estructural a partir de esas especificaciones. El software carga el modelo completo con el Bill of Materials de todos los insumos.",
    details: [
      "Apertura de orden de producción (Planificación)",
      "Software: carga del modelo y Bill of Materials con todos los insumos",
      "Diseño Eléctrico: características eléctricas completas del transformador",
      "Diseño Mecánico: diseño estructural basado en especificaciones eléctricas",
      "Revisión del diseño vs. controles de calidad antes de continuar",
    ],
  },
  {
    id: 2,
    icon: Zap,
    title: "Inspección de Materia Prima y Bobinado",
    subtitle: "Estación BT y AT",
    accent: "#0099ce",
    badge: "Etapa 2 de 9",
    description:
      "Antes de iniciar el bobinado se realiza una revisión exhaustiva de la materia prima. Luego se procede al corte de papeles aislantes y manufactura de formaletas, seguido del bobinado de devanados de baja y alta tensión con controles estrictos de número de vueltas, tensión mecánica del conductor y aislamiento intercapas.",
    details: [
      "Inspección de materia prima: espesor y grado de lámina magnética",
      "Verificación de certificados de cobre / aluminio e integridad del aislamiento",
      "Corte de papeles aislantes y manufactura de formaleta (precisión dimensional ± tolerancia según plano)",
      "Bobinado Baja Tensión (BT): número de vueltas, tensión mecánica del conductor, aislamiento intercapas",
      "Bobinado Alta Tensión (AT): mismos controles críticos de calidad",
      "Verificación de cumplimiento del Plan de Control antes de continuar",
    ],
  },
  {
    id: 3,
    icon: Layers,
    title: "Corte y Armado del Núcleo Magnético",
    subtitle: "Estación de corte y ensamble de núcleo",
    accent: "#009e49",
    badge: "Etapa 3 de 9",
    description:
      "El núcleo magnético se corta con precisión dimensional controlada, verificando que las rebabas estén por debajo del límite permitido y que la secuencia de laminación sea correcta. Luego se realiza el apilado y armado del núcleo con alineación Step-Lap, compresión uniforme y torque de sujeción especificado.",
    details: [
      "Corte de Núcleo Magnético: precisión dimensional (± tolerancia especificada)",
      "Rebabas < límite permitido y secuencia correcta de laminación",
      "Apilado y Armado del Núcleo: alineación Step-Lap",
      "Compresión uniforme y torque de sujeción según especificación",
      "Verificación de cumplimiento del Plan de Control antes de continuar",
    ],
  },
  {
    id: 4,
    icon: Flame,
    title: "Prensado y Secado de Bobinas",
    subtitle: "Transporte, prensado y horno",
    accent: "#e8a000",
    badge: "Etapa 4 de 9",
    description:
      "Las bobinas terminadas pasan por el proceso de prensado (Coil Pressing), donde se controla la altura final medida respetando las dimensiones nominales de BT y AT. Luego ingresan al horno de secado a temperatura entre 90 °C y 110 °C según diseño durante 12 horas, registrando los resultados en el checklist de control de temperatura del horno.",
    details: [
      "Coil Pressing Process: evitar aplicar fuerza excesiva, verificar altura final medida",
      "Respetar altura nominal de BT y AT de la bobina ensamblada; medición final documentada",
      "Transporte de bobina prensada al horno",
      "Parámetros del Horno validados antes de cargar la bobina",
      "Secado de Bobina (Coil Drying): 90 °C – 110 °C según diseño, 12 horas",
      "Registro de resultados al salir del horno en el checklist 'Oven Temperature Control, Operational Checklist'",
    ],
  },
  {
    id: 5,
    icon: Wrench,
    title: "Ensamble de Parte Activa (Pre-Tanque)",
    subtitle: "Inserción de núcleo, brida y conexiones",
    accent: "#7c3aed",
    badge: "Etapa 5 de 9",
    description:
      "El núcleo se inserta y ensambla en las bobinas con enfoque en centrado axial, espaciamientos radiales y ajuste mecánico. Se instala la brida verificando la superficie, la junta (gasket) y el torque. Finalmente se realizan las conexiones externas previas al entanque, identificando correctamente los terminales y respetando las distancias dieléctricas.",
    details: [
      "Inserción y/o ensamble del núcleo en las bobinas: centrado axial, espaciamientos radiales, ajuste mecánico",
      "Instalación de Brida: inspección de superficie, verificación de junta (Gasket), control de torque",
      "Conexiones Externas Previas al EnTanque: identificación correcta de terminales",
      "Torque en conexiones atornilladas y distancias dieléctricas verificadas",
      "Verificación de cumplimiento del Plan de Control antes de continuar",
    ],
  },
  {
    id: 6,
    icon: Hammer,
    title: "Metalmecánica del Tanque",
    subtitle: "Proceso paralelo — corte, soldadura y pintura",
    accent: "#c0392b",
    badge: "Etapa 6 de 9",
    description:
      "En paralelo con la manufactura de la parte activa, el departamento de metalmecánica fabrica el tanque mediante corte láser de planchas, formado/doblado de paredes y tapa, soldadura estructural completa y preparación de superficie. Después de la prueba de hermeticidad e inspección dimensional, el tanque recibe su sistema de pintura (primer, capa intermedia y acabado) y la inspección mecánica final antes de ser liberado por Calidad.",
    details: [
      "Corte con Máquina Láser: inspecciones previas al arranque (Kick-off Checklist), corte y verificación dimensional",
      "Forming / Bending: conformado de paredes laterales, tapa e inspección dimensional",
      "Soldadura Completa: soldaduras estructurales, bridas de boquillas y refuerzos",
      "Grinding y preparación de superficie: alisado de soldaduras, eliminación de rebabas, limpieza",
      "Prueba de Hermeticidad (Leak Test): prueba de presión de aire, inspección con solución jabonosa, tiempo de retención",
      "Inspección Dimensional: altura del tanque, planitud de brida, alineación de radiadores, posición de orificios de pernos",
      "Preparación de Superficie: sandblasting / granallado, verificación de rugosidad y limpieza",
      "Proceso de Pintura: aplicación de primer, capa intermedia, capa final y control de tiempo de curado",
      "Inspección Mecánica Final: visual, dimensional, reporte de espesor de pintura, aprobación del leak test y liberación por Calidad",
    ],
  },
  {
    id: 7,
    icon: Boxes,
    title: "EnTanque",
    subtitle: "Recepción del tanque y tanqueo",
    accent: "#0099ce",
    badge: "Etapa 7 de 9",
    description:
      "Una vez liberado el tanque por Calidad (pintado y curado), se transporta al área de tanqueo. El proceso de tanqueo sigue paso a paso la documentación del EMOTIV 50, integrando la parte activa completa dentro del tanque.",
    details: [
      "Recepción del Tanque desde Metalmecánica (pintado, curado y liberado por Calidad)",
      "Transporte del tanque aprobado hacia el área de tanqueo",
      "Tanking stand for transformers EMOTIV 50: paso a paso de la documentación",
      "Integración de la parte activa dentro del tanque",
      "Verificación de cumplimiento del Plan de Control",
    ],
  },
  {
    id: 8,
    icon: Droplets,
    title: "Tratamiento de Aceite y Llenado al Vacío",
    subtitle: "Oil Treatment & Tank Filling",
    accent: "#00269b",
    badge: "Etapa 8 de 9",
    description:
      "El aceite dieléctrico se filtra y se aplica vacío al transformador ya tanqueado. El proceso de llenado al vacío garantiza la impregnación completa del aislamiento y la ausencia de burbujas de aire. Se siguen las Visual Aids del proceso Oil Filtered & VA Vacuum and Oil Filling.",
    details: [
      "Oil Filtered: filtrado y tratamiento del aceite dieléctrico",
      "VA Vacuum: aplicación de vacío al transformador antes del llenado",
      "Oil Filling: llenado al vacío para impregnación total del aislamiento",
      "Seguimiento de Visual Aids 'Oil Filtered & VA Vacuum and Oil Filling'",
      "Verificación de cumplimiento del Plan de Control antes de pasar a pruebas",
    ],
  },
  {
    id: 9,
    icon: FlaskConical,
    title: "Pruebas Eléctricas, Inspección Final y Despacho",
    subtitle: "Testing, Inspection & Packaging",
    accent: "#009e49",
    badge: "Etapa 9 de 9",
    description:
      "Cada transformador pasa por un protocolo completo de pruebas eléctricas según IEEE C57 en la estación de testing. Una vez que los resultados son aprobados (Pass), se procede al ensamble del gabinete, la inspección final y empaque, y finalmente el etiquetado y embalaje para despacho.",
    details: [
      "Testing & Results: pruebas eléctricas completas según IEEE C57",
      "Verificación de cumplimiento del Plan de Control en pruebas",
      "Ensamble del Gabinete (aprobado por Plan de Control)",
      "Final Inspection & Packaging: inspección visual, dimensional y de acabados",
      "Etiquetado y Empaque: placa de datos, embalaje para transporte y despacho",
    ],
  },
];

const capabilities = [
  { icon: Zap, value: "500 kVA", label: "Capacidad máxima Tipo Poste" },
  { icon: Factory, value: "3,000 kVA", label: "Capacidad máxima Pad Mounted" },
  { icon: Shield, value: "34.5 kV", label: "Voltaje máximo de fabricación" },
  { icon: Clock, value: "48–72 h", label: "Tiempo promedio de fabricación" },
];

const qualityPoints = [
  "Plan de Control verificado en cada etapa del proceso antes de continuar",
  "Checklist documentado al salir del horno de secado ('Oven Temperature Control')",
  "Kickoff Checklist de inspecciones previo al arranque de corte láser",
  "Prueba de hermeticidad (Leak Test) antes de pintura del tanque",
  "Inspección dimensional completa: altura, planitud de brida, alineación de radiadores",
  "Cada transformador recibe número de serie único con trazabilidad completa del proceso",
  "Protocolo de pruebas eléctricas IEEE C57 entregado con cada unidad",
  "Liberación formal por Calidad antes de proceder al ensamble final y despacho",
  "Visual Aids para el proceso de vacío y llenado de aceite dieléctrico",
];

export default function ManufacturaPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* ── Hero ─────────────────────────────────────────────────── */}
      <section className="relative bg-linear-to-br from-[#00269b] via-[#001f80] to-[#00175d] text-white py-20 overflow-hidden">
        <motion.div
          animate={{ x: [0, 30, -20, 0], y: [0, -20, 15, 0] }}
          transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-10 right-20 w-72 h-72 bg-[#0099ce]/20 rounded-full blur-[80px] pointer-events-none"
        />
        <motion.div
          animate={{ x: [0, -25, 15, 0], y: [0, 20, -15, 0] }}
          transition={{ duration: 22, repeat: Infinity, ease: "easeInOut", delay: 5 }}
          className="absolute bottom-10 left-10 w-56 h-56 bg-white/10 rounded-full blur-[60px] pointer-events-none"
        />

        <div className="container-eminsa relative">
          {/* Breadcrumb */}
          <nav className="flex items-center gap-2 text-sm text-white/60 mb-8">
            <Link href="/" className="hover:text-white transition-colors"><Home size={16} /></Link>
            <ChevronRight size={14} />
            <Link href="/mtn" className="hover:text-white transition-colors">MTN</Link>
            <ChevronRight size={14} />
            <span className="text-white">Manufactura</span>
          </nav>

          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -40 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7 }}
            >
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.2 }}
                className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full border border-white/20 mb-6"
              >
                <Factory size={18} />
                <span className="text-sm font-medium">EMOTIV-EMINSA Manufacturing Process</span>
              </motion.div>
              <h1 className="text-4xl lg:text-5xl xl:text-6xl font-bold mb-6 leading-tight">
                Así se fabrica un{" "}
                <span className="text-[#0099ce]">transformador EMINSA</span>
              </h1>
              <p className="text-xl text-white/80 leading-relaxed">
                Desde la planificación y el diseño hasta las pruebas eléctricas finales,
                nuestro proceso de manufactura está documentado, controlado y validado
                en cada etapa para garantizar calidad y cumplimiento con los estándares IEEE/ANSI.
              </p>
            </motion.div>

            {/* Capability stats */}
            <motion.div
              initial={{ opacity: 0, x: 40 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7, delay: 0.2 }}
              className="grid grid-cols-2 gap-4"
            >
              {capabilities.map((cap, i) => {
                const Icon = cap.icon;
                return (
                  <motion.div
                    key={cap.label}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 + i * 0.1 }}
                    className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20 text-center"
                  >
                    <Icon size={28} className="mx-auto mb-3 text-[#0099ce]" />
                    <p className="text-2xl font-bold text-white">{cap.value}</p>
                    <p className="text-white/60 text-xs mt-1 leading-snug">{cap.label}</p>
                  </motion.div>
                );
              })}
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── Process Steps ───────────────────────────────────────── */}
      <section className="py-20 lg:py-28">
        <div className="container-eminsa">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center max-w-3xl mx-auto mb-16"
          >
            <span className="inline-block px-3 py-1 bg-[#00269b]/10 text-[#00269b] text-sm font-medium rounded-full mb-4">
              Proceso de Manufactura
            </span>
            <h2 className="text-3xl md:text-4xl xl:text-5xl font-bold text-gray-900 mb-4">
              9 etapas, 1 transformador confiable
            </h2>
            <p className="text-gray-600 text-lg leading-relaxed">
              Cada unidad pasa por un proceso estructurado, controlado y documentado
              con verificación de Plan de Control en cada estación, desde la materia prima
              hasta el etiquetado y despacho.
            </p>
          </motion.div>

          <div className="space-y-12">
            {steps.map((step, i) => {
              const Icon = step.icon;
              const isEven = i % 2 === 1;
              return (
                <motion.div
                  key={step.id}
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-80px" }}
                  transition={{ duration: 0.6, delay: 0.1 }}
                  className="grid lg:grid-cols-2 gap-0 rounded-3xl overflow-hidden shadow-xl border border-gray-100"
                >
                  {/* Visual panel */}
                  <div
                    className={`relative flex flex-col items-center justify-center p-12 min-h-72 ${isEven ? "lg:order-2" : ""}`}
                    style={{ backgroundColor: `${step.accent}12` }}
                  >
                    <span
                      className="absolute top-6 right-8 text-8xl font-black opacity-[0.07] select-none leading-none"
                      style={{ color: step.accent }}
                    >
                      {step.id}
                    </span>
                    <motion.div
                      whileInView={{ scale: [0.8, 1.05, 1] }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.6, delay: 0.2 }}
                      className="w-28 h-28 rounded-3xl flex items-center justify-center mb-6 shadow-lg"
                      style={{ backgroundColor: step.accent }}
                    >
                      <Icon size={52} className="text-white" />
                    </motion.div>
                    <span
                      className="inline-block px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-widest border"
                      style={{ color: step.accent, borderColor: `${step.accent}40`, backgroundColor: `${step.accent}12` }}
                    >
                      {step.badge}
                    </span>
                    <p className="mt-3 text-sm font-semibold text-gray-500 text-center">{step.subtitle}</p>
                  </div>

                  {/* Content panel */}
                  <div className={`flex flex-col justify-center p-10 lg:p-14 bg-white ${isEven ? "lg:order-1" : ""}`}>
                    <h3 className="text-2xl md:text-3xl font-black text-gray-900 mb-4">
                      {step.title}
                    </h3>
                    <p className="text-gray-600 leading-relaxed mb-6 text-base">
                      {step.description}
                    </p>
                    <ul className="space-y-2.5">
                      {step.details.map((detail, j) => (
                        <motion.li
                          key={j}
                          initial={{ opacity: 0, x: -10 }}
                          whileInView={{ opacity: 1, x: 0 }}
                          viewport={{ once: true }}
                          transition={{ delay: 0.1 + j * 0.07 }}
                          className="flex items-start gap-3"
                        >
                          <CheckCircle2 size={16} className="shrink-0 mt-0.5" style={{ color: step.accent }} />
                          <span className="text-gray-700 text-sm">{detail}</span>
                        </motion.li>
                      ))}
                    </ul>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── Quality assurance bar ───────────────────────────────── */}
      <section className="py-16 bg-[#f8faff] border-y border-[#e8edf5]">
        <div className="container-eminsa">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-10"
          >
            <span className="inline-block px-3 py-1 bg-[#00269b]/10 text-[#00269b] text-sm font-medium rounded-full mb-4">
              Trazabilidad y Control
            </span>
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900">
              Calidad documentada en cada etapa
            </h2>
          </motion.div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 max-w-5xl mx-auto">
            {qualityPoints.map((point, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
                className="flex items-start gap-3 bg-white rounded-xl p-5 border border-gray-100 shadow-sm"
              >
                <PackageCheck size={18} className="text-[#00269b] shrink-0 mt-0.5" />
                <span className="text-gray-700 text-sm leading-snug">{point}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ────────────────────────────────────────────────── */}
      <section className="py-16 bg-linear-to-br from-[#0099ce] to-[#00269b] text-white relative overflow-hidden">
        <motion.div
          animate={{ x: [0, 20, -10, 0], y: [0, -15, 10, 0] }}
          transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-[60px] pointer-events-none"
        />
        <div className="container-eminsa text-center relative">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl font-bold mb-4">
              ¿Listo para cotizar su transformador?
            </h2>
            <p className="text-white/80 mb-8 max-w-2xl mx-auto">
              Cuéntenos sus especificaciones y nuestro equipo técnico preparará una
              propuesta personalizada con los tiempos de entrega de su proyecto.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link
                href="/mtn/cotizaciones"
                className="inline-flex items-center gap-2 bg-white text-[#00269b] hover:bg-gray-100 px-8 py-4 rounded-xl font-semibold transition-all shadow-lg hover:shadow-xl hover:-translate-y-0.5"
              >
                Solicitar Cotización
                <ArrowRight size={20} />
              </Link>
              <Link
                href="/mtn/certificaciones"
                className="inline-flex items-center gap-2 bg-white/10 hover:bg-white/20 text-white px-8 py-4 rounded-xl font-semibold transition-all border border-white/30 hover:-translate-y-0.5"
              >
                Ver Certificaciones
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
