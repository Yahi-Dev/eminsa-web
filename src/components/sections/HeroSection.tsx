"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, Play, ChevronDown } from "lucide-react";
import { divisions, stats } from "@/data/navigation";

export default function HeroSection() {
  const [activeSlide, setActiveSlide] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveSlide((prev) => (prev + 1) % divisions.length);
    }, 6000);
    return () => clearInterval(interval);
  }, []);

  return (
    <>
      {/* CSS Animations for Lightning Effects */}
      <style jsx>{`
        @keyframes lightning {
          0% {
            opacity: 0;
            filter: blur(1px);
          }
          1% {
            opacity: 1;
            filter: blur(0px);
          }
          2% {
            opacity: 0.8;
            filter: blur(1px);
          }
          3% {
            opacity: 1;
            filter: blur(0px);
          }
          4% {
            opacity: 0.6;
            filter: blur(1px);
          }
          5% {
            opacity: 0.9;
            filter: blur(0px);
          }
          6% {
            opacity: 0;
            filter: blur(2px);
          }
          100% {
            opacity: 0;
            filter: blur(2px);
          }
        }

        @keyframes lightningGlow {
          0% {
            opacity: 0;
            transform: scale(1);
          }
          1% {
            opacity: 0.8;
            transform: scale(1.1);
          }
          2% {
            opacity: 0.6;
            transform: scale(1.05);
          }
          3% {
            opacity: 0.7;
            transform: scale(1.08);
          }
          4% {
            opacity: 0.5;
            transform: scale(1.02);
          }
          5% {
            opacity: 0.6;
            transform: scale(1.04);
          }
          6% {
            opacity: 0;
            transform: scale(1);
          }
          100% {
            opacity: 0;
            transform: scale(1);
          }
        }

        @keyframes spark {
          0% {
            opacity: 0;
            transform: translateY(0) scale(0);
          }
          10% {
            opacity: 1;
            transform: translateY(-15px) scale(1.2);
          }
          20% {
            opacity: 0.5;
            transform: translateY(-40px) scale(0.8);
          }
          25% {
            opacity: 0;
            transform: translateY(-50px) scale(0.5);
          }
          100% {
            opacity: 0;
            transform: translateY(-50px) scale(0);
          }
        }

        .animate-lightning {
          animation: lightning 6s ease-in-out infinite;
        }

        .animate-lightning-glow {
          animation: lightningGlow 6s ease-in-out infinite;
        }

        .animate-spark {
          animation: spark 3s ease-out infinite;
        }

        .lightning-branch {
          stroke-dasharray: 1000;
          stroke-dashoffset: 1000;
          animation: drawLightning 0.5s ease-out forwards;
        }

        @keyframes drawLightning {
          to {
            stroke-dashoffset: 0;
          }
        }
      `}</style>

      <section className="relative min-h-screen flex items-center overflow-hidden">
        {/* Background with animated gradient */}
        <div className="absolute inset-0 bg-gradient-to-br from-[#001689] via-[#000E53] to-[#001689]">
          {/* Animated mesh gradient overlay */}
          <div className="absolute inset-0 opacity-50">
            <div className="absolute top-0 left-0 w-[800px] h-[800px] bg-[#00A3E0]/20 rounded-full blur-[120px] animate-pulse" />
            <div className="absolute bottom-0 right-0 w-[600px] h-[600px] bg-[#001689]/40 rounded-full blur-[100px] animate-pulse" style={{ animationDelay: "1s" }} />
            <div className="absolute top-1/2 left-1/2 w-[400px] h-[400px] bg-[#00B140]/10 rounded-full blur-[80px] animate-pulse" style={{ animationDelay: "2s" }} />
          </div>

          {/* Electric Lightning Effects - Solo rayos */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            {/* Lightning Strike 1 - Top Left */}
            <svg className="absolute top-[-10%] left-[10%] w-[4px] h-[70%] animate-lightning" style={{ animationDelay: "0s" }}>
              <path
                d="M 2 0 L 1 80 L 3 100 L 1 150 L 3 200 L 1 250 L 2 320"
                stroke="url(#gradient1)"
                strokeWidth="3"
                fill="none"
                strokeLinecap="round"
                className="lightning-branch"
                style={{ animationDelay: "0.1s" }}
              />
              <defs>
                <linearGradient id="gradient1" x1="0%" y1="0%" x2="0%" y2="100%">
                  <stop offset="0%" stopColor="#FFFFFF" stopOpacity="1" />
                  <stop offset="40%" stopColor="#80E0FF" stopOpacity="0.9" />
                  <stop offset="70%" stopColor="#00A3E0" stopOpacity="0.7" />
                  <stop offset="100%" stopColor="#00A3E0" stopOpacity="0" />
                </linearGradient>
              </defs>
            </svg>
            
            {/* Lightning Glow Effect 1 */}
            <div className="absolute top-[5%] left-[8%] w-48 h-48 bg-[#80E0FF]/40 rounded-full blur-3xl animate-lightning-glow" style={{ animationDelay: "0s" }} />

            {/* Lightning Strike 2 - Center */}
            <svg className="absolute top-[-5%] left-[45%] w-[5px] h-[80%] animate-lightning" style={{ animationDelay: "2s" }}>
              <path
                d="M 2 0 L 3 60 L 1 90 L 3 130 L 1 180 L 3 220 L 1 280 L 2 350"
                stroke="url(#gradient2)"
                strokeWidth="3.5"
                fill="none"
                strokeLinecap="round"
                className="lightning-branch"
                style={{ animationDelay: "2.1s" }}
              />
              <defs>
                <linearGradient id="gradient2" x1="0%" y1="0%" x2="0%" y2="100%">
                  <stop offset="0%" stopColor="#FFFFFF" stopOpacity="1" />
                  <stop offset="30%" stopColor="#A0EAFF" stopOpacity="0.9" />
                  <stop offset="60%" stopColor="#60D5FF" stopOpacity="0.8" />
                  <stop offset="90%" stopColor="#00A3E0" stopOpacity="0.5" />
                  <stop offset="100%" stopColor="#00A3E0" stopOpacity="0" />
                </linearGradient>
              </defs>
            </svg>
            
            {/* Lightning Glow Effect 2 */}
            <div className="absolute top-[8%] left-[43%] w-56 h-56 bg-[#A0EAFF]/35 rounded-full blur-3xl animate-lightning-glow" style={{ animationDelay: "2s" }} />

            {/* Lightning Strike 3 - Right Side */}
            <svg className="absolute top-[-15%] right-[15%] w-[4px] h-[85%] animate-lightning" style={{ animationDelay: "4s" }}>
              <path
                d="M 2 0 L 1 100 L 3 140 L 1 190 L 3 240 L 1 290 L 2 380"
                stroke="url(#gradient3)"
                strokeWidth="3"
                fill="none"
                strokeLinecap="round"
                className="lightning-branch"
                style={{ animationDelay: "4.1s" }}
              />
              <defs>
                <linearGradient id="gradient3" x1="0%" y1="0%" x2="0%" y2="100%">
                  <stop offset="0%" stopColor="#FFFFFF" stopOpacity="1" />
                  <stop offset="35%" stopColor="#90E5FF" stopOpacity="0.9" />
                  <stop offset="65%" stopColor="#40CFFF" stopOpacity="0.7" />
                  <stop offset="100%" stopColor="#00A3E0" stopOpacity="0" />
                </linearGradient>
              </defs>
            </svg>
            
            {/* Lightning Glow Effect 3 */}
            <div className="absolute top-[3%] right-[13%] w-52 h-52 bg-[#90E5FF]/30 rounded-full blur-3xl animate-lightning-glow" style={{ animationDelay: "4s" }} />

            {/* Lightning Strike 4 - Left Lower */}
            <svg className="absolute top-[30%] left-[20%] w-[3px] h-[50%] animate-lightning" style={{ animationDelay: "1.5s" }}>
              <path
                d="M 1 0 L 2 40 L 0 60 L 2 90 L 0 120 L 2 150 L 1 200"
                stroke="url(#gradient4)"
                strokeWidth="2.5"
                fill="none"
                strokeLinecap="round"
                className="lightning-branch"
                style={{ animationDelay: "1.6s" }}
              />
              <defs>
                <linearGradient id="gradient4" x1="0%" y1="0%" x2="0%" y2="100%">
                  <stop offset="0%" stopColor="#C0F0FF" stopOpacity="0.9" />
                  <stop offset="50%" stopColor="#80E0FF" stopOpacity="0.7" />
                  <stop offset="100%" stopColor="#00A3E0" stopOpacity="0" />
                </linearGradient>
              </defs>
            </svg>

            {/* Lightning Strike 5 - Right Lower */}
            <svg className="absolute top-[25%] right-[25%] w-[3px] h-[55%] animate-lightning" style={{ animationDelay: "3.5s" }}>
              <path
                d="M 2 0 L 1 50 L 3 75 L 1 110 L 3 140 L 1 180 L 2 220"
                stroke="url(#gradient5)"
                strokeWidth="2.5"
                fill="none"
                strokeLinecap="round"
                className="lightning-branch"
                style={{ animationDelay: "3.6s" }}
              />
              <defs>
                <linearGradient id="gradient5" x1="0%" y1="0%" x2="0%" y2="100%">
                  <stop offset="0%" stopColor="#D0F5FF" stopOpacity="0.9" />
                  <stop offset="40%" stopColor="#A0EAFF" stopOpacity="0.7" />
                  <stop offset="80%" stopColor="#60D5FF" stopOpacity="0.4" />
                  <stop offset="100%" stopColor="#00A3E0" stopOpacity="0" />
                </linearGradient>
              </defs>
            </svg>



          </div>

          {/* Grid pattern overlay */}
          <div 
            className="absolute inset-0 opacity-[0.03]"
            style={{
              backgroundImage: `
                linear-gradient(to right, white 1px, transparent 1px),
                linear-gradient(to bottom, white 1px, transparent 1px)
              `,
              backgroundSize: "60px 60px",
            }}
          />

          {/* Subtle overlay to make lightning pop more */}
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/5" />
        </div>

        {/* Content */}
        <div className="relative container-eminsa py-20 lg:py-32">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            {/* Left Column - Text Content */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >

              {/* Main Heading */}
              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold text-white mb-6 leading-tight"
              >
                <span className="block">¡Viva la verdadera</span>
                <span className="block text-[#00A3E0]">eficiencia eléctrica!</span>
              </motion.h1>

              {/* Description */}
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="text-lg md:text-xl text-white/80 mb-10 max-w-xl"
              >
                Descubra soluciones integrales en la fabricación y mantenimiento de 
                sistemas eléctricos que optimizan la eficiencia y garantizan la 
                seguridad de su infraestructura.
              </motion.p>

              {/* CTA Buttons */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                className="flex flex-col sm:flex-row gap-4 mb-12"
              >
                <Link
                  href="/cotizar"
                  className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-[#00A3E0] text-white font-semibold rounded-xl hover:bg-[#0091C7] transition-all duration-300 hover:shadow-lg hover:shadow-[#00A3E0]/30 hover:-translate-y-1"
                >
                  Solicitar una Cotización
                  <ArrowRight size={20} />
                </Link>
              </motion.div>

              {/* Stats */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 }}
                className="grid grid-cols-2 md:grid-cols-4 gap-6"
              >
                {stats.map((stat, index) => (
                  <div key={index} className="text-center md:text-left">
                    <div className="text-3xl md:text-4xl font-bold text-white mb-1">
                      {stat.value}
                    </div>
                    <div className="text-sm text-white/60">{stat.label}</div>
                  </div>
                ))}
              </motion.div>
            </motion.div>

            {/* Right Column - Division Cards */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="hidden lg:block"
            >
              <div className="relative">
                {/* Cards Stack */}
                <div className="space-y-4">
                  {divisions.map((division, index) => (
                    <motion.div
                      key={division.id}
                      initial={{ opacity: 0, x: 50 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.5 + index * 0.1 }}
                    >
                      <Link
                        href={division.href}
                        className={`group block p-6 rounded-2xl backdrop-blur-sm transition-all duration-300 ${
                          activeSlide === index
                            ? "bg-white/15 scale-105 shadow-2xl"
                            : "bg-white/5 hover:bg-white/10"
                        }`}
                        onMouseEnter={() => setActiveSlide(index)}
                      >
                        <div className="flex items-start justify-between">
                          <div>
                            <div className="flex items-center gap-3 mb-2">
                              <div
                                className="w-3 h-3 rounded-full"
                                style={{ backgroundColor: division.color }}
                              />
                              <span className="text-xl font-bold text-white">
                                {division.name}
                              </span>
                            </div>
                            <p className="text-white/60 text-sm max-w-xs">
                              {division.tagline}
                            </p>
                          </div>
                          <ArrowRight 
                            className={`text-white transition-all duration-300 ${
                              activeSlide === index 
                                ? "opacity-100 translate-x-0" 
                                : "opacity-0 -translate-x-4"
                            }`}
                            size={24}
                          />
                        </div>
                        
                        {/* Features on active */}
                        {activeSlide === index && (
                          <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: "auto" }}
                            className="mt-4 pt-4 border-t border-white/10"
                          >
                            <div className="flex flex-wrap gap-2">
                              {division.features.slice(0, 3).map((feature, i) => (
                                <span
                                  key={i}
                                  className="px-3 py-1 bg-white/10 rounded-full text-xs text-white/80"
                                >
                                  {feature}
                                </span>
                              ))}
                            </div>
                          </motion.div>
                        )}
                      </Link>
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2"
        >
          <a
            href="#divisiones"
            className="flex flex-col items-center gap-2 text-white/60 hover:text-white transition-colors"
          >
            <span className="text-sm">Descubrir más</span>
            <ChevronDown size={24} className="animate-bounce" />
          </a>
        </motion.div>
      </section>
    </>
  );
}