"use client";

import { useState, useCallback, useEffect } from "react";
import useEmblaCarousel from "embla-carousel-react";
import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { getCldUrl } from "@/lib/cloudinary-url";

interface ImageGalleryCarouselProps {
  images: string[];
  alt: string;
}

export default function ImageGalleryCarousel({
  images,
  alt,
}: ImageGalleryCarouselProps) {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true });
  const [current, setCurrent] = useState(0);

  const scrollPrev = useCallback(() => emblaApi?.scrollPrev(), [emblaApi]);
  const scrollNext = useCallback(() => emblaApi?.scrollNext(), [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    const onSelect = () => setCurrent(emblaApi.selectedScrollSnap());
    emblaApi.on("select", onSelect);
    onSelect();
    return () => {
      emblaApi.off("select", onSelect);
    };
  }, [emblaApi]);

  if (images.length === 0) return null;

  // Single image — no carousel needed
  if (images.length === 1) {
    return (
      <div className="rounded-2xl overflow-hidden shadow-lg relative aspect-[3/2]">
        <Image
          src={getCldUrl(images[0], { width: 1200, quality: "auto", format: "auto" })}
          alt={alt}
          fill
          priority
          sizes="(max-width: 1024px) 100vw, 66vw"
          className="object-cover"
        />
      </div>
    );
  }

  return (
    <div className="relative group">
      {/* Main carousel */}
      <div ref={emblaRef} className="overflow-hidden rounded-2xl shadow-lg">
        <div className="flex">
          {images.map((img, index) => (
            <div
              key={index}
              className="flex-[0_0_100%] min-w-0 relative aspect-[3/2]"
            >
              <Image
                src={getCldUrl(img, { width: 1200, quality: "auto", format: "auto" })}
                alt={`${alt} - ${index + 1}`}
                fill
                priority={index === 0}
                sizes="(max-width: 1024px) 100vw, 66vw"
                className="object-cover"
              />
            </div>
          ))}
        </div>
      </div>

      {/* Navigation arrows */}
      <button
        onClick={scrollPrev}
        className="absolute left-3 top-1/2 -translate-y-1/2 z-10 bg-white/80 backdrop-blur-sm hover:bg-white rounded-full p-2 shadow-lg transition-all opacity-0 group-hover:opacity-100"
        aria-label="Anterior"
      >
        <ChevronLeft size={20} className="text-gray-800" />
      </button>
      <button
        onClick={scrollNext}
        className="absolute right-3 top-1/2 -translate-y-1/2 z-10 bg-white/80 backdrop-blur-sm hover:bg-white rounded-full p-2 shadow-lg transition-all opacity-0 group-hover:opacity-100"
        aria-label="Siguiente"
      >
        <ChevronRight size={20} className="text-gray-800" />
      </button>

      {/* Thumbnail strip */}
      <div className="flex gap-2 mt-3 justify-center">
        {images.map((img, index) => (
          <button
            key={index}
            onClick={() => emblaApi?.scrollTo(index)}
            className={`relative w-16 h-12 rounded-lg overflow-hidden transition-all border-2 ${
              index === current
                ? "border-[#00269b] opacity-100 shadow-md"
                : "border-transparent opacity-50 hover:opacity-80"
            }`}
          >
            <Image
              src={getCldUrl(img, { width: 120, quality: "auto", format: "auto" })}
              alt={`Thumbnail ${index + 1}`}
              fill
              sizes="64px"
              className="object-cover"
            />
          </button>
        ))}
      </div>

      {/* Counter */}
      <div className="absolute top-3 right-3 z-10 bg-black/50 backdrop-blur-sm text-white text-xs px-2.5 py-1 rounded-full font-medium">
        {current + 1} / {images.length}
      </div>
    </div>
  );
}
