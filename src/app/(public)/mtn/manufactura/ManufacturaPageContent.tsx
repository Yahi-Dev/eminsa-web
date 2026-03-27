"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import { useRef, useEffect } from "react";
import {
  ArrowRight,
  ChevronRight,
  Home,
  CheckCircle2,
  Factory,
  Zap,
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

const stepIcons = [Cpu, Zap, Layers, Flame, Wrench, Hammer, Boxes, Droplets, FlaskConical];
const stepPhotos = [
  "/fotos-eminsa/mtn/DSC07802.jpg",  // Diseño de Núcleo - corte de láminas
  "/fotos-eminsa/mtn/DSC07799.jpg",  // Bobinado - ensamble núcleo y bobinas
  "/fotos-eminsa/mtn/DSC07787.jpg",  // Ensamble Parte Activa - trabajadores ensamblando
  "/fotos-eminsa/mtn/DSC07845.jpg",  // Secado al Vacío - horno con bobinas
  "/fotos-eminsa/mtn/DSC07822.jpg",  // Fabricación de Tanques - soldadores
  "/fotos-eminsa/mtn/DSC07731.jpg",  // Metalmecánica - soldadores estructura
  "/fotos-eminsa/mtn/DSC07775.jpg",  // EnTanque - parte activa en tanque
  "/fotos-eminsa/mtn/DSC07759.jpg",  // Tratamiento de Aceite
  "/fotos-eminsa/mtn/DSC07154.jpg",  // Pruebas - laboratorio
];
const stepAccents = [
  "#00269b", "#0099ce", "#009e49", "#e8a000", "#7c3aed",
  "#c0392b", "#0099ce", "#00269b", "#009e49",
];
const stepDetailCounts = [5, 6, 5, 6, 5, 9, 4, 5, 5];

function HeroVideo() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const animRef = useRef<number | null>(null);
  const targetVol = useRef(0);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    video.volume = 0;
    video.muted = false;

    function tick() {
      if (!video) return;
      const step = 0.02;
      const diff = targetVol.current - video.volume;

      if (Math.abs(diff) > step) {
        video.volume = Math.min(1, Math.max(0, video.volume + Math.sign(diff) * step));
        animRef.current = requestAnimationFrame(tick);
      } else {
        video.volume = targetVol.current;
        animRef.current = null;
      }
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        targetVol.current = entry.isIntersecting ? 0.5 : 0;
        if (!animRef.current) {
          animRef.current = requestAnimationFrame(tick);
        }
      },
      { threshold: 0.4 }
    );

    observer.observe(video);

    return () => {
      observer.disconnect();
      if (animRef.current) cancelAnimationFrame(animRef.current);
    };
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0, x: 40 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.7, delay: 0.2 }}
      className="relative rounded-2xl overflow-hidden shadow-2xl border border-white/20"
    >
      <video
        ref={videoRef}
        autoPlay
        muted
        loop
        playsInline
        className="w-full aspect-video object-cover"
      >
        <source src="/video/mtn1.mp4" type="video/mp4" />
      </video>
    </motion.div>
  );
}

export default function ManufacturaPage() {
  const t = useTranslations("mtnPage.manufacturaPage");

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
            <span className="text-white">{t("breadcrumb")}</span>
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
                <span className="text-sm font-medium">{t("heroBadge")}</span>
              </motion.div>
              <h1 className="text-4xl lg:text-5xl xl:text-6xl font-bold mb-6 leading-tight">
                {t.rich("heroTitle", {
                  accent: (chunks) => <span className="text-[#0099ce]">{chunks}</span>,
                })}
              </h1>
              <p className="text-xl text-white/80 leading-relaxed">
                {t("heroDescription")}
              </p>
            </motion.div>

            {/* Video */}
            <HeroVideo />
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
              {t("processBadge")}
            </span>
            <h2 className="text-3xl md:text-4xl xl:text-5xl font-bold text-gray-900 mb-4">
              {t("processTitle")}
            </h2>
            <p className="text-gray-600 text-lg leading-relaxed">
              {t("processDescription")}
            </p>
          </motion.div>

          <div className="space-y-12">
            {stepIcons.map((IconComp, i) => {
              const isEven = i % 2 === 1;
              const stepId = i + 1;
              return (
                <motion.div
                  key={stepId}
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-80px" }}
                  transition={{ duration: 0.6, delay: 0.1 }}
                  className="grid lg:grid-cols-2 gap-0 rounded-3xl overflow-hidden shadow-xl border border-gray-100"
                >
                  {/* Visual panel */}
                  <div
                    className={`relative overflow-hidden flex flex-col items-center justify-center p-12 min-h-72 ${isEven ? "lg:order-2" : ""}`}
                  >
                    <Image
                      src={stepPhotos[i]}
                      alt={t(`steps.${i}.title`)}
                      fill
                      sizes="(max-width: 768px) 100vw, 50vw"
                      className="object-cover"
                    />
                    {/* Dark overlay */}
                    <div className="absolute inset-0 bg-black/35" />
                    {/* Watermark step number */}
                    <span className="absolute top-6 right-8 text-8xl font-black opacity-10 select-none leading-none text-white">
                      {stepId}
                    </span>
                    <motion.div
                      whileInView={{ scale: [0.8, 1.05, 1] }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.6, delay: 0.2 }}
                      className="relative w-28 h-28 rounded-3xl flex items-center justify-center mb-6 shadow-lg"
                      style={{ backgroundColor: stepAccents[i] }}
                    >
                      <IconComp size={52} className="text-white" />
                    </motion.div>
                    <span className="relative inline-block px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-widest border border-white/40 text-white bg-white/15">
                      {t(`steps.${i}.badge`)}
                    </span>
                    <p className="relative mt-3 text-sm font-semibold text-white/90 text-center">{t(`steps.${i}.subtitle`)}</p>
                  </div>

                  {/* Content panel */}
                  <div className={`flex flex-col justify-center p-10 lg:p-14 bg-white ${isEven ? "lg:order-1" : ""}`}>
                    <h3 className="text-2xl md:text-3xl font-black text-gray-900 mb-4">
                      {t(`steps.${i}.title`)}
                    </h3>
                    <p className="text-gray-600 leading-relaxed mb-6 text-base">
                      {t(`steps.${i}.description`)}
                    </p>
                    <ul className="space-y-2.5">
                      {Array.from({ length: stepDetailCounts[i] }).map((_, j) => (
                        <motion.li
                          key={j}
                          initial={{ opacity: 0, x: -10 }}
                          whileInView={{ opacity: 1, x: 0 }}
                          viewport={{ once: true }}
                          transition={{ delay: 0.1 + j * 0.07 }}
                          className="flex items-start gap-3"
                        >
                          <CheckCircle2 size={16} className="shrink-0 mt-0.5" style={{ color: stepAccents[i] }} />
                          <span className="text-gray-700 text-sm">{t(`steps.${i}.details.${j}`)}</span>
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
              {t("qualityBadge")}
            </span>
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900">
              {t("qualityTitle")}
            </h2>
          </motion.div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 max-w-5xl mx-auto">
            {Array.from({ length: 9 }).map((_, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
                className="flex items-start gap-3 bg-white rounded-xl p-5 border border-gray-100 shadow-sm"
              >
                <PackageCheck size={18} className="text-[#00269b] shrink-0 mt-0.5" />
                <span className="text-gray-700 text-sm leading-snug">{t(`qualityPoints.${i}`)}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ────────────────────────────────────────────────── */}
      <section className="py-16 bg-gradient-to-br from-[#00269b] to-[#00175d] text-white ">
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
              {t("ctaTitle")}
            </h2>
            <p className="text-white/80 mb-8 max-w-2xl mx-auto">
              {t("ctaDescription")}
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link
                href="/mtn/cotizaciones"
                className="inline-flex items-center gap-2 bg-white text-[#00269b] hover:bg-gray-100 px-8 py-4 rounded-xl font-semibold transition-all shadow-lg hover:shadow-xl hover:-translate-y-0.5"
              >
                {t("ctaRequestQuote")}
                <ArrowRight size={20} />
              </Link>
              <Link
                href="/mtn/certificaciones"
                className="inline-flex items-center gap-2 bg-white/10 hover:bg-white/20 text-white px-8 py-4 rounded-xl font-semibold transition-all border border-white/30 hover:-translate-y-0.5"
              >
                {t("ctaViewCertifications")}
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
