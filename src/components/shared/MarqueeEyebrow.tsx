"use client";

import { motion } from "framer-motion";

interface MarqueeEyebrowProps {
  text: string;
  color?: string;
}

/**
 * Eyebrow label that gently oscillates left ↔ right (slow pendulum).
 */
export default function MarqueeEyebrow({ text, color = "#009e49" }: MarqueeEyebrowProps) {
  return (
    <div className="flex items-center gap-3 mb-8">
      <span className="h-px w-8 shrink-0 inline-block" style={{ backgroundColor: color }} />

      <motion.span
        className="text-xs font-bold uppercase tracking-[0.3em] whitespace-nowrap"
        style={{ color }}
        animate={{ x: [0, 12, 0] }}
        transition={{
          duration: 4,
          repeat: Infinity,
          repeatType: "loop",
          ease: "easeInOut",
        }}
      >
        {text}
      </motion.span>
    </div>
  );
}
