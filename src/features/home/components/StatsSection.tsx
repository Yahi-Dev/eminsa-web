"use client";

import { useRef, useState, useEffect } from "react";
import { motion, useInView } from "framer-motion";
import { stats } from "@/config/navigation";
import { Award, Shield, CheckCircle2, Users } from "lucide-react";
import { useTranslations } from "next-intl";

function AnimatedStatValue({ value, started }: { value: string; started: boolean }) {
  const isSpecial = value === "24/7";
  const numericValue = parseInt(value.replace(/[^0-9]/g, ""), 10);
  const suffix = value.replace(/[0-9]/g, "");
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!started || isSpecial) return;
    let startTime: number | null = null;
    let animId: number;
    const duration = 2800;
    const animate = (currentTime: number) => {
      if (startTime === null) startTime = currentTime;
      const elapsed = currentTime - startTime;
      if (elapsed < duration) {
        const progress = 1 - Math.pow(1 - elapsed / duration, 3);
        setCount(Math.floor(progress * numericValue));
        animId = requestAnimationFrame(animate);
      } else {
        setCount(numericValue);
      }
    };
    animId = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animId);
  }, [started, numericValue, isSpecial]);

  if (isSpecial) return <>{value}</>;
  return <>{started ? count : 0}{suffix}</>;
}

const iconMap = [
  { icon: Award },
  { icon: Shield },
  { icon: Users },
  { icon: CheckCircle2 },
];

const statKeys = ["yearsExperience", "transformersInstalled", "satisfiedClients", "techSupport"] as const;

export default function StatsSection() {
  const t = useTranslations("home");
  const statsRef = useRef(null);
  const isInView = useInView(statsRef, { once: true, margin: "-15%" });

  return (
    <section className="py-20 lg:py-28 bg-gradient-to-br from-[#001689] to-[#000E53] relative overflow-hidden">
      {/* Background decorations */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-1/4 w-[600px] h-[600px] bg-[#00A3E0]/10 rounded-full blur-[120px]" />
        <div className="absolute bottom-0 right-1/4 w-[400px] h-[400px] bg-[#00B140]/10 rounded-full blur-[100px]" />
        
        {/* Grid pattern */}
        <div 
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: `
              linear-gradient(to right, white 1px, transparent 1px),
              linear-gradient(to bottom, white 1px, transparent 1px)
            `,
            backgroundSize: "80px 80px",
          }}
        />
      </div>

      <div className="container-eminsa relative">
        {/* Stats */}
        <div ref={statsRef} className="grid grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
          {stats.map((stat, index) => {
            const IconComponent = iconMap[index]?.icon || Award;

            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="text-center"
              >
                <motion.div
                  whileHover={{ scale: 1.1, rotate: 5 }}
                  transition={{ type: "spring", stiffness: 300 }}
                  className="inline-flex items-center justify-center w-16 h-16 bg-white/10 backdrop-blur-sm rounded-2xl mb-6"
                >
                  <IconComponent className="w-8 h-8 text-[#00A3E0]" />
                </motion.div>
                <div className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-2">
                  <AnimatedStatValue value={stat.value} started={isInView} />
                </div>
                <div className="text-white/60 text-sm md:text-base">
                  {t(`stats.${statKeys[index]}`)}
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Certifications */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-20 pt-16 border-t border-white/10"
        >
          <div className="text-center mb-10">
            <h3 className="text-2xl font-bold text-white mb-3">
              {t('certifications.title')}
            </h3>
            <p className="text-white/60 max-w-xl mx-auto">
              {t('certifications.subtitle')}
            </p>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-8 lg:gap-16">
            {/* ISO 9001 */}
            <div className="flex items-center gap-4 bg-white/5 backdrop-blur-sm rounded-xl px-6 py-4">
              <div className="w-16 h-16 bg-white rounded-lg flex items-center justify-center p-2">
                <img
                  src="/images/SelloAENORISO9001_NEG.png"
                  alt="ISO 9001:2015"
                  className="w-full h-full object-contain"
                />
              </div>
              <div>
                <p className="font-bold text-white">ISO 9001:2015</p>
                <p className="text-white/60 text-sm">{t('certifications.iso9001')}</p>
              </div>
            </div>

            {/* IQNET */}
            <div className="flex items-center gap-4 bg-white/5 backdrop-blur-sm rounded-xl px-6 py-4">
              <div className="w-16 h-16 bg-white rounded-lg flex items-center justify-center p-2">
                <img
                  src="/images/IQNET_RCMark_PosCMYK.png"
                  alt="IQNET"
                  className="w-full h-full object-contain"
                />
              </div>
              <div>
                <p className="font-bold text-white">IQNET</p>
                <p className="text-white/60 text-sm">{t('certifications.iqnet')}</p>
              </div>
            </div>

            {/* ANSI */}
            <div className="flex items-center gap-4 bg-white/5 backdrop-blur-sm rounded-xl px-6 py-4">
              <div className="w-16 h-16 bg-[#001689] rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-lg">ANSI</span>
              </div>
              <div>
                <p className="font-bold text-white">ANSI C57</p>
                <p className="text-white/60 text-sm">{t('certifications.ansi')}</p>
              </div>
            </div>

            {/* DOE */}
            <div className="flex items-center gap-4 bg-white/5 backdrop-blur-sm rounded-xl px-6 py-4">
              <div className="w-16 h-16 bg-[#00B140] rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-lg">DOE</span>
              </div>
              <div>
                <p className="font-bold text-white">DOE-2016</p>
                <p className="text-white/60 text-sm">{t('certifications.doe')}</p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
