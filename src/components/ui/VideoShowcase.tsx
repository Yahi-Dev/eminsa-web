"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";

interface VideoShowcaseProps {
  src: string;
  title?: string;
  subtitle?: string;
  description?: string;
  /** "light" uses white bg, "dark" uses dark gradient bg */
  variant?: "light" | "dark";
  /** Overlay position for text */
  textPosition?: "bottom" | "overlay" | "side";
}

export default function VideoShowcase({
  src,
  title,
  subtitle,
  description,
  variant = "dark",
  textPosition = "bottom",
}: VideoShowcaseProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const isInView = useInView(containerRef, { amount: 0.4 });
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    if (isInView) {
      video.play().catch(() => {});
    } else {
      video.pause();
    }
  }, [isInView]);

  const isDark = variant === "dark";
  const hasText = title || subtitle || description;

  if (textPosition === "side" && hasText) {
    return (
      <section
        ref={containerRef}
        className={`py-16 md:py-24 ${isDark ? "bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900" : "bg-gray-50"}`}
      >
        <div className="container mx-auto max-w-7xl px-4">
          <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
            {/* Text */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="space-y-5"
            >
              {subtitle && (
                <span
                  className={`inline-block text-sm font-semibold tracking-widest uppercase ${isDark ? "text-blue-400" : "text-blue-600"}`}
                >
                  {subtitle}
                </span>
              )}
              {title && (
                <h2
                  className={`text-3xl font-bold md:text-4xl ${isDark ? "text-white" : "text-gray-900"}`}
                >
                  {title}
                </h2>
              )}
              {description && (
                <p
                  className={`text-lg leading-relaxed ${isDark ? "text-gray-300" : "text-gray-600"}`}
                >
                  {description}
                </p>
              )}
            </motion.div>

            {/* Video */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="relative"
            >
              <div className="relative overflow-hidden rounded-2xl shadow-2xl">
                <video
                  ref={videoRef}
                  src={src}
                      loop
                  playsInline
                  preload="none"
                  onLoadedData={() => setIsLoaded(true)}
                  className={`h-auto w-full object-cover transition-opacity duration-700 ${isLoaded ? "opacity-100" : "opacity-0"}`}
                />
                {!isLoaded && (
                  <div className="absolute inset-0 animate-pulse bg-gray-700 rounded-2xl" />
                )}
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section
      ref={containerRef}
      className={`py-16 md:py-24 ${isDark ? "bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900" : "bg-gray-50"}`}
    >
      <div className="container mx-auto max-w-6xl px-4">
        {/* Header text */}
        {hasText && textPosition === "bottom" && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="mb-10 text-center"
          >
            {subtitle && (
              <span
                className={`mb-3 inline-block text-sm font-semibold tracking-widest uppercase ${isDark ? "text-blue-400" : "text-blue-600"}`}
              >
                {subtitle}
              </span>
            )}
            {title && (
              <h2
                className={`text-3xl font-bold md:text-4xl ${isDark ? "text-white" : "text-gray-900"}`}
              >
                {title}
              </h2>
            )}
            {description && (
              <p
                className={`mt-4 text-lg ${isDark ? "text-gray-300" : "text-gray-600"}`}
              >
                {description}
              </p>
            )}
          </motion.div>
        )}

        {/* Video */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="relative"
        >
          <div className="relative overflow-hidden rounded-2xl shadow-2xl">
            <video
              ref={videoRef}
              src={src}
              loop
              playsInline
              preload="none"
              onLoadedData={() => setIsLoaded(true)}
              className={`h-auto w-full object-cover transition-opacity duration-700 ${isLoaded ? "opacity-100" : "opacity-0"}`}
            />
            {!isLoaded && (
              <div className="absolute inset-0 animate-pulse bg-gray-700 rounded-2xl" />
            )}

            {/* Overlay text */}
            {hasText && textPosition === "overlay" && (
              <div className="absolute inset-0 flex items-end bg-gradient-to-t from-black/70 via-black/20 to-transparent p-8">
                <div>
                  {subtitle && (
                    <span className="mb-2 inline-block text-sm font-semibold tracking-widest uppercase text-blue-400">
                      {subtitle}
                    </span>
                  )}
                  {title && (
                    <h2 className="text-2xl font-bold text-white md:text-3xl">
                      {title}
                    </h2>
                  )}
                  {description && (
                    <p className="mt-2 max-w-xl text-gray-200">
                      {description}
                    </p>
                  )}
                </div>
              </div>
            )}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
