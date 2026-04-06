"use client";

import { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import { motion } from "framer-motion";

interface StackedCardCarouselProps {
  images: { src: string; alt: string }[];
  autoPlayDelay?: number;
}

export default function StackedCardCarousel({
  images,
  autoPlayDelay = 4000,
}: StackedCardCarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  const next = useCallback(
    () => setCurrentIndex((p) => (p + 1) % images.length),
    [images.length]
  );

  useEffect(() => {
    if (isPaused) return;
    const t = setInterval(next, autoPlayDelay);
    return () => clearInterval(t);
  }, [isPaused, next, autoPlayDelay]);

  return (
    <div
      className="relative aspect-[4/3] w-full"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      {images.map((image, i) => {
        const offset = (i - currentIndex + images.length) % images.length;
        const isFront = offset === 0;

        return (
          <motion.div
            key={i}
            className="absolute inset-0 rounded-2xl overflow-hidden cursor-pointer"
            animate={{
              x: offset * 24,
              y: offset * -16,
              scale: 1 - offset * 0.04,
              zIndex: images.length - offset,
              filter: isFront ? "brightness(1)" : "brightness(0.5)",
            }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            onClick={isFront ? next : undefined}
            style={{
              boxShadow: isFront
                ? "0 25px 50px -12px rgba(0, 38, 155, 0.25)"
                : "0 10px 30px -10px rgba(0, 0, 0, 0.2)",
            }}
          >
            <Image
              src={image.src}
              alt={image.alt}
              fill
              sizes="(max-width: 768px) 100vw, 50vw"
              className="object-cover"
            />
            {!isFront && (
              <div className="absolute inset-0 bg-[#00269b]/30" />
            )}
          </motion.div>
        );
      })}

      {/* Click hint */}
      <motion.div
        className="absolute bottom-4 left-1/2 -translate-x-1/2 z-50 bg-white/90 backdrop-blur-sm text-gray-600 text-xs px-4 py-2 rounded-full shadow-lg flex items-center gap-2"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1 }}
      >
        <span className="inline-block w-1.5 h-1.5 bg-[#00269b] rounded-full animate-pulse" />
        Click para cambiar
      </motion.div>

      {/* Dots */}
      <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 z-50 flex gap-3">
        {images.map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrentIndex(i)}
            className={`transition-all rounded-full ${
              i === currentIndex
                ? "w-6 h-2.5 bg-[#00269b]"
                : "w-2.5 h-2.5 bg-gray-300 hover:bg-gray-400"
            }`}
          />
        ))}
      </div>
    </div>
  );
}
