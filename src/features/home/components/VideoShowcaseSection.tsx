"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { useTranslations } from "next-intl";
import { Play } from "lucide-react";

const videos = [
  { key: "mtn", src: "https://res.cloudinary.com/dixsymrg5/video/upload/v1775242413/eminsa/site/video/mtn.mp4", href: "/mtn" },
  { key: "rst", src: "https://res.cloudinary.com/dixsymrg5/video/upload/v1775242423/eminsa/site/video/rst.mp4", href: "/etrys/servicios" },
  { key: "servicios", src: "https://res.cloudinary.com/dixsymrg5/video/upload/v1775242409/eminsa/site/video/Servicios.mp4", href: "/servicios" },
  { key: "nosotros", src: "https://res.cloudinary.com/dixsymrg5/video/upload/v1775242419/eminsa/site/video/nosotros.mp4", href: "/nosotros" },
];

function VideoCard({
  src,
  title,
  subtitle,
  href,
  index,
}: {
  src: string;
  title: string;
  subtitle: string;
  href: string;
  index: number;
}) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const cardRef = useRef<HTMLAnchorElement>(null);
  const isInView = useInView(cardRef, { amount: 0.5 });
  const [isLoaded, setIsLoaded] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    if (isInView) {
      video.play().catch(() => {});
    } else {
      video.pause();
    }
  }, [isInView]);

  return (
    <motion.a
      ref={cardRef}
      href={href}
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: index * 0.15 }}
      className="group relative block overflow-hidden rounded-2xl shadow-lg hover:shadow-2xl transition-shadow duration-500"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="relative aspect-video overflow-hidden">
        <video
          ref={videoRef}
          src={src}
          muted
          loop
          playsInline
          preload="metadata"
          onLoadedData={() => setIsLoaded(true)}
          className={`h-full w-full object-cover transition-all duration-700 ${
            isLoaded ? "opacity-100" : "opacity-0"
          } ${isHovered ? "scale-105" : "scale-100"}`}
        />

        {!isLoaded && (
          <div className="absolute inset-0 animate-pulse bg-gray-800" />
        )}

        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

        {/* Play icon indicator */}
        <div className="absolute top-4 right-4 flex h-10 w-10 items-center justify-center rounded-full bg-white/20 backdrop-blur-sm transition-all group-hover:bg-white/30">
          <Play size={18} className="text-white ml-0.5" fill="white" />
        </div>

        {/* Text */}
        <div className="absolute bottom-0 left-0 right-0 p-6">
          <span className="mb-1 inline-block text-xs font-semibold tracking-widest uppercase text-blue-300">
            {subtitle}
          </span>
          <h3 className="text-xl font-bold text-white md:text-2xl group-hover:text-blue-200 transition-colors">
            {title}
          </h3>
        </div>
      </div>
    </motion.a>
  );
}

export default function VideoShowcaseSection() {
  const t = useTranslations("videos");

  return (
    <section className="py-16 md:py-24 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900">
      <div className="container mx-auto max-w-7xl px-4">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-12 text-center"
        >
          <span className="mb-3 inline-block text-sm font-semibold tracking-widest uppercase text-blue-400">
            {t("home.subtitle")}
          </span>
          <h2 className="text-3xl font-bold text-white md:text-4xl lg:text-5xl">
            {t("home.title")}
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-gray-300">
            {t("home.description")}
          </p>
        </motion.div>

        {/* Video Grid — 2x2 */}
        <div className="grid gap-6 md:grid-cols-2">
          {videos.map((video, i) => (
            <VideoCard
              key={video.key}
              src={video.src}
              title={t(`${video.key}.title`)}
              subtitle={t(`${video.key}.subtitle`)}
              href={video.href}
              index={i}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
