"use client";

import { ReactNode, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface TooltipProps {
  content: string;
  children: ReactNode;
  position?: "top" | "bottom";
  color?: string;
}

export function Tooltip({ content, children, position = "bottom", color = "#001689" }: TooltipProps) {
  const [isVisible, setIsVisible] = useState(false);

  return (
    <div className="relative inline-block">
      <div
        onMouseEnter={() => setIsVisible(true)}
        onMouseLeave={() => setIsVisible(false)}
      >
        {children}
      </div>

      <AnimatePresence>
        {isVisible && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.15 }}
            className={`absolute left-1/2 -translate-x-1/2 whitespace-nowrap z-50 ${
              position === "top" ? "-top-12" : "top-12"
            }`}
          >
            <div
              className="text-white text-xs font-medium px-3 py-2 rounded-lg shadow-lg transition-colors"
              style={{ backgroundColor: color }}
            >
              {content}
              {/* Arrow */}
              <div
                className={`absolute left-1/2 -translate-x-1/2 w-2 h-2 rotate-45 ${
                  position === "top" ? "-bottom-1" : "-top-1"
                }`}
                style={{ backgroundColor: color }}
              />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
