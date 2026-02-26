"use client";

import { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";

interface BeforeAfterSliderProps {
  beforeImage: string;
  afterImage: string;
  beforeLabel?: string;
  afterLabel?: string;
  className?: string;
}

export default function BeforeAfterSlider({
  beforeImage,
  afterImage,
  beforeLabel = "Before",
  afterLabel = "After",
  className = "",
}: BeforeAfterSliderProps) {
  const [sliderPosition, setSliderPosition] = useState(50);
  const [isDragging, setIsDragging] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const animDirRef = useRef(1);

  // Auto-animation: oscillates smoothly between 20% and 80%
  useEffect(() => {
    if (isDragging) return;
    const interval = setInterval(() => {
      setSliderPosition((prev) => {
        let next = prev + animDirRef.current * 0.5;
        if (next >= 80) { next = 80; animDirRef.current = -1; }
        if (next <= 20) { next = 20; animDirRef.current = 1; }
        return next;
      });
    }, 25);
    return () => clearInterval(interval);
  }, [isDragging]);

  const handleMove = (clientX: number) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = clientX - rect.left;
    const percentage = (x / rect.width) * 100;
    setSliderPosition(Math.min(Math.max(percentage, 0), 100));
  };

  const handleMouseDown = () => setIsDragging(true);
  const handleMouseUp = () => setIsDragging(false);

  const handleMouseMove = (e: MouseEvent) => {
    if (!isDragging) return;
    handleMove(e.clientX);
  };

  const handleTouchMove = (e: TouchEvent) => {
    if (!isDragging) return;
    handleMove(e.touches[0].clientX);
  };

  useEffect(() => {
    if (isDragging) {
      window.addEventListener("mousemove", handleMouseMove);
      window.addEventListener("mouseup", handleMouseUp);
      window.addEventListener("touchmove", handleTouchMove);
      window.addEventListener("touchend", handleMouseUp);
    }
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseup", handleMouseUp);
      window.removeEventListener("touchmove", handleTouchMove);
      window.removeEventListener("touchend", handleMouseUp);
    };
  }, [isDragging]);

  return (
    <div
      ref={containerRef}
      className={`relative w-full h-full overflow-hidden rounded-2xl bg-gray-100 select-none ${className}`}
      style={{ touchAction: "none" }}
    >
      {/* Imagen After (fondo) */}
      <div className="absolute inset-0">
        <img
          src={afterImage}
          alt="After"
          className="w-full h-full object-cover"
          draggable={false}
        />
        {/* Label After */}
        <div className="absolute top-6 left-6">
          <span className="px-4 py-2 bg-black text-white font-bold text-sm rounded-lg shadow-lg">
            {afterLabel}
          </span>
        </div>
      </div>

      {/* Imagen Before (overlay) */}
      <div
        className="absolute inset-0"
        style={{
          clipPath: `inset(0 ${100 - sliderPosition}% 0 0)`,
        }}
      >
        <img
          src={beforeImage}
          alt="Before"
          className="w-full h-full object-cover"
          draggable={false}
        />
        {/* Label Before */}
        <div className="absolute top-6 right-6">
          <span className="px-4 py-2 bg-black text-white font-bold text-sm rounded-lg shadow-lg">
            {beforeLabel}
          </span>
        </div>
      </div>

      {/* Slider Line y Handle */}
      <div
        className="absolute top-0 bottom-0 w-1 cursor-ew-resize"
        style={{ left: `${sliderPosition}%` }}
      >
        {/* Línea vertical */}
        <div className="absolute inset-0 bg-white shadow-lg" />

        {/* Handle (círculo con flechas) */}
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-12 h-12 bg-[#001689] rounded-full shadow-xl flex items-center justify-center cursor-grab active:cursor-grabbing"
          onMouseDown={handleMouseDown}
          onTouchStart={() => setIsDragging(true)}
        >
          {/* Flechas */}
          <div className="flex items-center gap-0.5">
            {/* Flecha izquierda */}
            <svg
              width="10"
              height="10"
              viewBox="0 0 10 10"
              fill="none"
              className="text-white"
            >
              <path
                d="M6 1L2 5L6 9"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            {/* Flecha derecha */}
            <svg
              width="10"
              height="10"
              viewBox="0 0 10 10"
              fill="none"
              className="text-white"
            >
              <path
                d="M4 1L8 5L4 9"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>
        </div>
      </div>

      {/* Instrucción (opcional, se desvanece después de unos segundos) */}
      <motion.div
        initial={{ opacity: 1 }}
        animate={{ opacity: 0 }}
        transition={{ delay: 3, duration: 1 }}
        className="absolute bottom-6 left-1/2 -translate-x-1/2 px-4 py-2 bg-black/70 backdrop-blur-sm text-white text-xs rounded-full pointer-events-none"
      >
        ← Desliza para comparar →
      </motion.div>
    </div>
  );
}