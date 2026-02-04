"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import {
  ArrowRight,
  ChevronRight,
  Home,
  Award,
  Users,
  ShieldCheck,
  Heart,
  Target,
  Eye,
  Briefcase,
} from "lucide-react";
import { aboutEtrys, etrysInfo } from "@/config/etrys-data";

export default function EtrysNosotrosPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero */}
      <section className="bg-gradient-to-br from-[#00A3E0] via-[#0077A8] to-[#001689] text-white py-16 lg:py-24">
        <div className="container-eminsa">
          {/* Breadcrumb */}
          <nav className="flex items-center gap-2 text-white/70 text-sm mb-6">
            <Link href="/" className="hover:text-white transition-colors">
              <Home size={16} />
            </Link>
            <ChevronRight size={14} />
            <Link href="/etrys" className="hover:text-white transition-colors">
              ETRYS
            </Link>
            <ChevronRight size={14} />
            <span className="text-white">Nosotros</span>
          </nav>

          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
            >
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
                {aboutEtrys.title}
              </h1>
              <p className="text-xl text-white/90 mb-8 leading-relaxed">
                {aboutEtrys.description}
              </p>
              <div className="flex flex-wrap gap-4">
                <Link
                  href="/etrys/cotizaciones"
                  className="inline-flex items-center gap-2 px-6 py-3 bg-[#FF5500] hover:bg-[#E64D00] text-white font-semibold rounded-xl transition-colors"
                >
                  Trabajar con Nosotros
                  <ArrowRight size={20} />
                </Link>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
              className="relative"
            >
              <div className="aspect-[4/3] bg-white/10 backdrop-blur-sm rounded-2xl overflow-hidden border border-white/20">
                <Image
                  src="/images/etrys-team-hero.jpg"
                  alt="Equipo ETRYS"
                  fill
                  className="object-cover"
                  priority
                />
              </div>
              {/* Stats Overlay */}
              <div className="absolute -bottom-6 -left-6 bg-white rounded-xl p-6 shadow-xl">
                <div className="text-4xl font-bold text-[#00A3E0]">50+</div>
                <div className="text-gray-600">Años de Experiencia</div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-16 lg:py-24 bg-white">
        <div className="container-eminsa">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <div className="aspect-square bg-gray-200 rounded-2xl overflow-hidden relative">
                <Image
                  src="/images/etrys-mission.jpg"
                  alt="Misión ETRYS"
                  fill
                  className="object-cover"
                />
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 rounded-xl bg-[#00A3E0]/10 flex items-center justify-center">
                  <Target size={24} className="text-[#00A3E0]" />
                </div>
                <span className="text-[#00A3E0] font-semibold">Nuestra Misión</span>
              </div>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                Compromiso con la Excelencia
              </h2>
              <p className="text-gray-600 text-lg leading-relaxed mb-6">
                {aboutEtrys.mission}
              </p>
              <p className="text-gray-600 text-lg leading-relaxed">
                {aboutEtrys.position}
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-16 lg:py-24 bg-gray-50">
        <div className="container-eminsa">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center max-w-3xl mx-auto mb-12"
          >
            <span className="inline-block px-3 py-1 bg-[#00A3E0]/10 text-[#00A3E0] text-sm font-medium rounded-full mb-4">
              Nuestros Valores
            </span>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Lo que nos Define
            </h2>
          </motion.div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                icon: Award,
                title: "Excelencia",
                description:
                  "Nos esforzamos por superar las expectativas en cada proyecto.",
              },
              {
                icon: Heart,
                title: "Pasión",
                description:
                  "Amamos lo que hacemos y se refleja en cada transformador.",
              },
              {
                icon: ShieldCheck,
                title: "Confiabilidad",
                description:
                  "Cumplimos nuestras promesas con resultados garantizados.",
              },
              {
                icon: Users,
                title: "Compromiso",
                description:
                  "Construimos relaciones duraderas con nuestros clientes.",
              },
            ].map((value, index) => {
              const Icon = value.icon;
              return (
                <motion.div
                  key={value.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all text-center group"
                >
                  <div className="w-16 h-16 rounded-full bg-gradient-to-br from-[#00A3E0] to-[#001689] flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                    <Icon size={32} className="text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">
                    {value.title}
                  </h3>
                  <p className="text-gray-600">{value.description}</p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-16 lg:py-24 bg-white">
        <div className="container-eminsa">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 rounded-xl bg-[#00A3E0]/10 flex items-center justify-center">
                  <Users size={24} className="text-[#00A3E0]" />
                </div>
                <span className="text-[#00A3E0] font-semibold">Nuestro Equipo</span>
              </div>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                Profesionales Dedicados
              </h2>
              <p className="text-gray-600 text-lg leading-relaxed mb-6">
                {aboutEtrys.team}
              </p>
              <p className="text-gray-600 text-lg leading-relaxed mb-8">
                Aquí no solo entregamos equipos: entregamos la tranquilidad de saber 
                que el trabajo está bien hecho.
              </p>
              <Link
                href="/etrys/cotizaciones?servicio=consulta"
                className="inline-flex items-center gap-2 px-6 py-3 bg-[#00A3E0] hover:bg-[#0077A8] text-white font-semibold rounded-xl transition-colors"
              >
                <Briefcase size={20} />
                ¿Te interesa trabajar con nosotros?
              </Link>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <div className="grid grid-cols-2 gap-4">
                {[1, 2, 3, 4].map((num) => (
                  <div
                    key={num}
                    className="aspect-square bg-gray-200 rounded-xl overflow-hidden relative"
                  >
                    <Image
                      src={`/images/team-${num}.jpg`}
                      alt={`Miembro del equipo ETRYS ${num}`}
                      fill
                      className="object-cover"
                    />
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Advantages */}
      <section className="py-16 lg:py-24 bg-gradient-to-br from-[#00A3E0] via-[#0077A8] to-[#001689] text-white">
        <div className="container-eminsa">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center max-w-3xl mx-auto mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              ¿Cuál es la Ventaja ETRYS?
            </h2>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {etrysInfo.advantages.map((adv, index) => (
              <motion.div
                key={adv.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-white/20 text-center"
              >
                <div className="w-16 h-16 rounded-full bg-white/20 flex items-center justify-center mx-auto mb-4">
                  {adv.icon === "award" && <Award size={32} className="text-white" />}
                  {adv.icon === "users" && <Users size={32} className="text-white" />}
                  {adv.icon === "shield-check" && (
                    <ShieldCheck size={32} className="text-white" />
                  )}
                </div>
                <h3 className="text-2xl font-bold mb-2">{adv.title}</h3>
                <p className="text-white/80">{adv.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-16 lg:py-24 bg-white">
        <div className="container-eminsa">
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {etrysInfo.stats.map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="text-center"
              >
                <div className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-[#00A3E0] to-[#001689] bg-clip-text text-transparent mb-2">
                  {stat.value}
                </div>
                <div className="text-gray-600 font-medium">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 lg:py-24 bg-gray-50">
        <div className="container-eminsa">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-gradient-to-br from-[#00A3E0] to-[#001689] rounded-3xl p-8 md:p-12 text-white text-center"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              ¿Listo para Trabajar con ETRYS?
            </h2>
            <p className="text-xl text-white/90 max-w-2xl mx-auto mb-8">
              Únase a cientos de clientes que confían en nosotros para sus 
              necesidades de transformadores.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link
                href="/etrys/cotizaciones"
                className="inline-flex items-center gap-2 px-8 py-4 bg-[#FF5500] hover:bg-[#E64D00] text-white font-semibold rounded-xl transition-colors shadow-lg"
              >
                Solicitar Cotización
                <ArrowRight size={20} />
              </Link>
              <Link
                href="/etrys/servicios"
                className="inline-flex items-center gap-2 px-8 py-4 bg-white/10 hover:bg-white/20 backdrop-blur-sm border border-white/30 text-white font-semibold rounded-xl transition-colors"
              >
                Ver Servicios
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
