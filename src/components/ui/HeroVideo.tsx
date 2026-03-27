"use client";

import { useRef, useEffect, useState } from "react";

interface HeroVideoProps {
  src: string;
  maxVolume?: number;
}

export default function HeroVideo({ src, maxVolume = 0.5 }: HeroVideoProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const animRef = useRef<number | null>(null);
  const targetVol = useRef(0);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    video.volume = 0;
    video.muted = false;

    function tick() {
      if (!video) return;
      const step = 0.02;
      const diff = targetVol.current - video.volume;

      if (Math.abs(diff) > step) {
        video.volume = Math.min(1, Math.max(0, video.volume + Math.sign(diff) * step));
        animRef.current = requestAnimationFrame(tick);
      } else {
        video.volume = targetVol.current;
        animRef.current = null;
      }
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        targetVol.current = entry.isIntersecting ? maxVolume : 0;
        if (!animRef.current) {
          animRef.current = requestAnimationFrame(tick);
        }
      },
      { threshold: 0.4 }
    );

    observer.observe(video);

    return () => {
      observer.disconnect();
      if (animRef.current) cancelAnimationFrame(animRef.current);
    };
  }, [maxVolume]);

  return (
    <>
      <video
        ref={videoRef}
        autoPlay
        muted
        loop
        playsInline
        preload="metadata"
        onLoadedData={() => setIsLoaded(true)}
        className={`w-full aspect-video object-cover transition-opacity duration-700 ${isLoaded ? "opacity-100" : "opacity-0"}`}
      >
        <source src={src} type="video/mp4" />
      </video>
      {!isLoaded && (
        <div className="absolute inset-0 animate-pulse bg-white/10 rounded-2xl" />
      )}
    </>
  );
}
