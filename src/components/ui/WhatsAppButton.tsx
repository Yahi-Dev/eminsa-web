"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MessageCircle, X } from "lucide-react";
import { getWhatsAppUrl } from "@/utils/whatsapp";

export default function WhatsAppButton() {
  const [isVisible, setIsVisible] = useState(false);
  const [showTooltip, setShowTooltip] = useState(false);

  useEffect(() => {
    // Mostrar el botón después de scroll
    const handleScroll = () => {
      setIsVisible(window.scrollY > 300);
    };

    window.addEventListener("scroll", handleScroll);
    
    // Mostrar tooltip después de 5 segundos
    const tooltipTimer = setTimeout(() => {
      setShowTooltip(true);
      // Ocultar después de 5 segundos
      setTimeout(() => setShowTooltip(false), 5000);
    }, 5000);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      clearTimeout(tooltipTimer);
    };
  }, []);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, scale: 0.5, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.5, y: 20 }}
          className="fixed bottom-6 right-6 z-50"
        >
          {/* Tooltip */}
          <AnimatePresence>
            {showTooltip && (
              <motion.div
                initial={{ opacity: 0, x: 10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 10 }}
                className="absolute right-full mr-4 top-1/2 -translate-y-1/2 bg-white rounded-lg shadow-xl p-4 w-64"
              >
                <button
                  onClick={() => setShowTooltip(false)}
                  className="absolute top-2 right-2 text-gray-400 hover:text-gray-600"
                >
                  <X size={16} />
                </button>
                <p className="text-[#001689] font-semibold mb-1">
                  ¿Necesita ayuda?
                </p>
                <p className="text-[#76777A] text-sm">
                  Chatea con nosotros por WhatsApp para una respuesta inmediata.
                </p>
                {/* Arrow */}
                <div className="absolute top-1/2 -right-2 -translate-y-1/2 w-0 h-0 border-t-8 border-b-8 border-l-8 border-transparent border-l-white" />
              </motion.div>
            )}
          </AnimatePresence>

          {/* Button */}
          <a
            href={getWhatsAppUrl()}
            target="_blank"
            rel="noopener noreferrer"
            className="group relative flex items-center justify-center w-16 h-16 bg-[#25D366] text-white rounded-full shadow-lg hover:bg-[#20BD5A] transition-all duration-300 hover:scale-110 hover:shadow-xl hover:shadow-[#25D366]/30"
          >
            <MessageCircle size={28} />
            
            {/* Pulse animation */}
            <span className="absolute inset-0 rounded-full bg-[#25D366] animate-ping opacity-25" />
          </a>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
