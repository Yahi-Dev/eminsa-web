"use client";

import { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, ChevronLeft, ChevronRight, CheckCircle2 } from "lucide-react";
import type { RemanufactureProcessStep } from "@/config/etrys-data";
import { useTranslations } from "next-intl";

interface Props {
  steps: RemanufactureProcessStep[];
  activeIndex: number | null;
  onClose: () => void;
  onNavigate: (index: number) => void;
}

export default function RemanufactureProcessModal({
  steps,
  activeIndex,
  onClose,
  onNavigate,
}: Props) {
  const t = useTranslations("etrysPage.processModal");
  const tc = useTranslations("etrysConfig.process");
  const isOpen = activeIndex !== null;
  const step = activeIndex !== null ? steps[activeIndex] : null;

  // Cerrar con Escape
  useEffect(() => {
    if (!isOpen) return;
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowLeft" && activeIndex !== null && activeIndex > 0)
        onNavigate(activeIndex - 1);
      if (e.key === "ArrowRight" && activeIndex !== null && activeIndex < steps.length - 1)
        onNavigate(activeIndex + 1);
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [isOpen, activeIndex, steps.length, onClose, onNavigate]);

  // Bloquear scroll del body
  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [isOpen]);

  return (
    <AnimatePresence>
      {isOpen && step && (
        <>
          {/* Backdrop */}
          <motion.div
            key="backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm"
            onClick={onClose}
          />

          {/* Modal */}
          <motion.div
            key="modal"
            initial={{ opacity: 0, scale: 0.95, y: 16 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 16 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 pointer-events-none"
          >
            <div
              className="bg-white rounded-2xl shadow-2xl w-full max-w-lg pointer-events-auto overflow-hidden"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Header */}
              <div className="bg-linear-to-br from-[#0099ce] to-[#00269b] p-6 text-white relative">
                <button
                  onClick={onClose}
                  className="absolute top-4 right-4 w-8 h-8 rounded-full bg-white/20 hover:bg-white/30 flex items-center justify-center transition-colors"
                >
                  <X size={16} />
                </button>

                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-xl bg-white/20 flex items-center justify-center text-2xl font-bold shrink-0">
                    {step.id}
                  </div>
                  <div>
                    <p className="text-white/70 text-xs font-semibold uppercase tracking-wider mb-0.5">
                      {t("stepOf", { step: step.id, total: steps.length })}
                    </p>
                    <h3 className="text-xl font-bold">{tc(`${step.id}.title`)}</h3>
                  </div>
                </div>
              </div>

              {/* Body */}
              <AnimatePresence mode="wait">
                <motion.div
                  key={step.id}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.2 }}
                  className="p-6"
                >
                  <p className="text-gray-600 mb-5 leading-relaxed">{tc(`${step.id}.description`)}</p>

                  <h4 className="font-semibold text-gray-900 mb-3 text-sm uppercase tracking-wide">
                    {t("activitiesIncluded")}
                  </h4>
                  <ul className="space-y-2.5">
                    {step.details.map((detail, idx) => (
                      <li key={detail} className="flex items-start gap-3">
                        <CheckCircle2
                          size={18}
                          className="text-[#0099ce] shrink-0 mt-0.5"
                        />
                        <span className="text-gray-700 text-sm">{tc(`${step.id}.details.${idx}`)}</span>
                      </li>
                    ))}
                  </ul>
                </motion.div>
              </AnimatePresence>

              {/* Footer nav */}
              <div className="px-6 pb-6 flex items-center justify-between">
                <button
                  onClick={() => activeIndex !== null && activeIndex > 0 && onNavigate(activeIndex - 1)}
                  disabled={activeIndex === 0}
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-xl border border-gray-200 text-gray-600 hover:border-[#0099ce] hover:text-[#0099ce] disabled:opacity-30 disabled:cursor-not-allowed transition-colors text-sm font-medium"
                >
                  <ChevronLeft size={16} />
                  {t("previous")}
                </button>

                {/* Dots */}
                <div className="flex gap-1.5">
                  {steps.map((s, i) => (
                    <button
                      key={s.id}
                      onClick={() => onNavigate(i)}
                      className={`rounded-full transition-all duration-300 ${
                        i === activeIndex
                          ? "w-5 h-2 bg-[#0099ce]"
                          : "w-2 h-2 bg-gray-300 hover:bg-gray-400"
                      }`}
                    />
                  ))}
                </div>

                <button
                  onClick={() => activeIndex !== null && activeIndex < steps.length - 1 && onNavigate(activeIndex + 1)}
                  disabled={activeIndex === steps.length - 1}
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-xl border border-gray-200 text-gray-600 hover:border-[#0099ce] hover:text-[#0099ce] disabled:opacity-30 disabled:cursor-not-allowed transition-colors text-sm font-medium"
                >
                  {t("next")}
                  <ChevronRight size={16} />
                </button>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
