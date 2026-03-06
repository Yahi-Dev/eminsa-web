"use client";

import { motion } from "framer-motion";
import { ShieldCheck, FileCheck } from "lucide-react";
import { useTranslations } from "next-intl";

export default function StatsSection() {
  const t = useTranslations("home");

  return (
    <section className="py-16 lg:py-20 bg-gray-50 border-y border-gray-200">
      <div className="container-eminsa">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <h3 className="text-2xl lg:text-3xl font-bold text-gray-900 mb-3">
            {t("certifications.title")}
          </h3>
          <p className="text-gray-500 max-w-xl mx-auto">
            {t("certifications.subtitle")}
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-10 max-w-5xl mx-auto">
          {/* Certificaciones */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <div className="flex items-center gap-2 mb-6">
              <ShieldCheck className="w-5 h-5 text-[#00269b]" />
              <h4 className="text-lg font-semibold text-gray-900">
                {t("certifications.certificationsLabel")}
              </h4>
            </div>
            <div className="space-y-4">
              <div className="flex items-center gap-4 bg-white rounded-xl border border-gray-200 px-5 py-4 shadow-sm">
                <div className="w-14 h-14 bg-white rounded-lg flex items-center justify-center p-1.5 border border-gray-100">
                  <img
                    src="/images/SelloAENORISO9001_NEG.png"
                    alt="ISO 9001:2015"
                    className="w-full h-full object-contain"
                  />
                </div>
                <div>
                  <p className="font-bold text-gray-900 text-sm">
                    ISO 9001:2015
                  </p>
                  <p className="text-gray-500 text-xs">
                    {t("certifications.iso9001")}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-4 bg-white rounded-xl border border-gray-200 px-5 py-4 shadow-sm">
                <div className="w-14 h-14 bg-white rounded-lg flex items-center justify-center p-1.5 border border-gray-100">
                  <img
                    src="/images/IQNET_RCMark_PosCMYK.png"
                    alt="IQNET"
                    className="w-full h-full object-contain"
                  />
                </div>
                <div>
                  <p className="font-bold text-gray-900 text-sm">IQNET</p>
                  <p className="text-gray-500 text-xs">
                    {t("certifications.iqnet")}
                  </p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Normativas */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <div className="flex items-center gap-2 mb-6">
              <FileCheck className="w-5 h-5 text-[#009e49]" />
              <h4 className="text-lg font-semibold text-gray-900">
                {t("certifications.standardsLabel")}
              </h4>
            </div>
            <div className="space-y-4">
              <div className="flex items-center gap-4 bg-white rounded-xl border border-gray-200 px-5 py-4 shadow-sm">
                <div className="w-14 h-14 bg-[#00269b] rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold text-sm">ANSI</span>
                </div>
                <div>
                  <p className="font-bold text-gray-900 text-sm">ANSI C57</p>
                  <p className="text-gray-500 text-xs">
                    {t("certifications.ansi")}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-4 bg-white rounded-xl border border-gray-200 px-5 py-4 shadow-sm">
                <div className="w-14 h-14 bg-[#009e49] rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold text-sm">DOE</span>
                </div>
                <div>
                  <p className="font-bold text-gray-900 text-sm">DOE-2016</p>
                  <p className="text-gray-500 text-xs">
                    {t("certifications.doe")}
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
