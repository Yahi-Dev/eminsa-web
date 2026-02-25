"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Award, ArrowRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import type { Certification } from "@/config/mtn-data";

interface Props {
  certifications: Certification[];
}

export default function CertificationsTabSelector({ certifications }: Props) {
  const [activeId, setActiveId] = useState(certifications[0]?.id ?? "");
  const activeCert = certifications.find((c) => c.id === activeId) ?? certifications[0];

  if (!activeCert) return null;

  return (
    <div>
      {/* Tab buttons */}
      <div className="flex flex-wrap gap-2 mb-6">
        {certifications.map((cert) => (
          <button
            key={cert.id}
            onClick={() => setActiveId(cert.id)}
            className={`px-4 py-2 rounded-lg text-sm font-semibold transition-all duration-200 ${
              activeId === cert.id
                ? "bg-[#001689] text-white shadow-sm"
                : "bg-gray-100 text-gray-600 hover:bg-gray-200"
            }`}
          >
            {cert.name}
          </button>
        ))}
      </div>

      {/* Animated certification card */}
      <AnimatePresence mode="wait">
        <motion.div
          key={activeId}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          transition={{ duration: 0.2 }}
        >
          <Link
            href="/mtn/certificaciones"
            className="group block bg-white rounded-xl p-6 border border-gray-200 hover:border-[#001689]/30 hover:shadow-lg transition-all duration-300"
          >
            <div className="flex items-start gap-4">
              <div className="w-16 h-16 bg-gray-100 rounded-lg flex items-center justify-center flex-shrink-0 group-hover:bg-[#001689]/5 transition-colors">
                {activeCert.image ? (
                  <Image
                    src={activeCert.image}
                    alt={activeCert.name}
                    width={48}
                    height={48}
                    className="object-contain"
                  />
                ) : (
                  <Award size={32} className="text-[#001689]" />
                )}
              </div>
              <div className="space-y-1 flex-1">
                <h3 className="font-bold text-gray-900 group-hover:text-[#001689] transition-colors">
                  {activeCert.name}
                </h3>
                <p className="text-sm text-gray-500">{activeCert.issuingBody}</p>
                <p className="text-sm text-gray-600 line-clamp-2">
                  {activeCert.description}
                </p>
              </div>
              <ArrowRight
                size={18}
                className="text-gray-400 group-hover:text-[#001689] group-hover:translate-x-1 transition-all flex-shrink-0 mt-1"
              />
            </div>
          </Link>
        </motion.div>
      </AnimatePresence>

      <Link
        href="/mtn/certificaciones"
        className="inline-flex items-center gap-2 text-[#00A3E0] hover:text-[#0092C7] font-semibold mt-6 transition-colors"
      >
        Ver todas las certificaciones
        <ArrowRight size={18} />
      </Link>
    </div>
  );
}
