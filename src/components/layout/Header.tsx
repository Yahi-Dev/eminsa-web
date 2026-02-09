"use client";

import { useState, useEffect, useCallback } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import {
  Menu,
  X,
  ChevronDown,
  Phone,
  Mail,
  Globe,
  MessageCircle
} from "lucide-react";
import { mainNavigation, contactInfo } from "@/config/navigation";
import { cn } from "@/lib/utils";
import { useRouter } from "next/navigation";
import { Tooltip } from "@/components/ui/Tooltip";

// Tooltips para las divisiones
const divisionsTooltips: { [key: string]: { label: string; color: string } } = {
  MTN: { label: "Manufactura Transformadores Nuevos", color: "#001689" },
  ETRYS: { label: "Transformadores Remanufacturados", color: "#00A3E0" },
  EIC: { label: "Eminsa International Corporation", color: "#00B140" },
};

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [mobileActiveSubmenu, setMobileActiveSubmenu] = useState<string | null>(null);
  const pathname = usePathname();
  const [language, setLanguage] = useState<"en" | "es">("es");
  const router = useRouter();

  // Efecto para manejar el scroll
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    
    window.addEventListener("scroll", handleScroll);
    // Ejecutar inmediatamente para estado inicial
    handleScroll();
    
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Cargar idioma desde cookies/localStorage
  const getInitialLanguage = useCallback((): "en" | "es" => {
    if (typeof window === "undefined") return "es";

    const cookieLang = document.cookie
      .split("; ")
      .find(r => r.startsWith("NEXT_LOCALE="))
      ?.split("=")[1] as "en" | "es" | undefined;

    return (cookieLang ?? (localStorage.getItem("language") as "en" | "es" | null) ?? "es");
  }, []);

  // Efecto para inicializar el idioma
  useEffect(() => {
    const initialLanguage = getInitialLanguage();
    // Solo actualizar si es diferente al estado actual
    if (initialLanguage !== language) {
      setLanguage(initialLanguage);
    }
  }, [getInitialLanguage, language]);

  const setLocale = useCallback((lng: "en" | "es") => {
    setLanguage(lng);
    localStorage.setItem("language", lng);
    document.cookie = `NEXT_LOCALE=${lng}; Path=/; Max-Age=31536000; SameSite=Lax`;

    // Recargar la página para aplicar el cambio de idioma
    router.refresh();
  }, [router]);

  const toggleLanguage = useCallback(() => {
    const newLang = language === "en" ? "es" : "en";
    setLocale(newLang);
  }, [language, setLocale]);

  const closeMobileMenu = useCallback(() => {
    setIsMobileMenuOpen(false);
    setMobileActiveSubmenu(null);
  }, []);

  return (
    <>
      {/* Top Bar */}
      <div className="hidden lg:block bg-[#001689] text-white text-xs xl:text-sm">
        <div className="container-eminsa flex items-center justify-between py-2">
          <div className="flex items-center gap-4 xl:gap-6">
            <a
              href={`tel:${contactInfo.phone}`}
              className="flex items-center gap-2 hover:text-[#00A3E0] transition-colors"
            >
              <Phone size={14} />
              <span>{contactInfo.phone}</span>
            </a>
            <a
              href={`mailto:${contactInfo.email}`}
              className="flex items-center gap-2 hover:text-[#00A3E0] transition-colors"
            >
              <Mail size={14} />
              <span>{contactInfo.email}</span>
            </a>
          </div>
          <div className="flex items-center gap-4">
            <span className="text-white/70 hidden xl:inline">Transformadores • Servicios • Suplidores Eléctricos</span>
            <button
              onClick={toggleLanguage}
              className="flex items-center gap-1 hover:text-[#00A3E0] transition-colors"
              aria-label={language === "en" ? "Switch to Spanish" : "Cambiar a Inglés"}
            >
              <Globe size={14} />
              <span>{language === "en" ? "EN" : "ES"}</span>
              <ChevronDown size={12} />
            </button>
          </div>
        </div>
      </div>

      {/* Main Header */}
      <header
        className={cn(
          "sticky top-0 z-50 transition-all duration-300 bg-white",
          isScrolled && "shadow-lg"
        )}
      >
        <div className="flex items-center h-20 xl:h-25 px-4 lg:px-6 xl:px-8 w-full gap-3 lg:gap-4 xl:gap-6">
          {/* Logo - Left */}
          <Link href="/" className="shrink-0">
            <Image
              src="/logoeminsa-Photoroom.png"
              alt="Grupo EMINSA"
              width={196}
              height={196}
              className="w-auto h-16 lg:h-18 xl:h-20"
              priority
            />
          </Link>

          {/* Desktop Navigation - Center */}
          <nav className="hidden lg:flex items-center gap-1 xl:gap-3 2xl:gap-6 grow justify-center">
            {mainNavigation.map((item) => {
              const tooltip = divisionsTooltips[item.name as keyof typeof divisionsTooltips];

              return tooltip ? (
                <Tooltip key={item.name} content={tooltip.label} color={tooltip.color}>
                  <Link
                    href={item.href}
                    className={cn(
                      "px-2 xl:px-4 py-2 rounded-lg font-medium transition-all duration-200 text-sm xl:text-base uppercase whitespace-nowrap",
                      "text-[#76777A] hover:text-[#001689] hover:bg-gray-50",
                      pathname.startsWith(item.href) && item.href !== "/" && "text-[#001689] bg-gray-50"
                    )}
                  >
                    {item.name}
                  </Link>
                </Tooltip>
              ) : (
                <Link
                  key={item.name}
                  href={item.href}
                  className={cn(
                    "px-2 xl:px-4 py-2 rounded-lg font-medium transition-all duration-200 text-sm xl:text-base uppercase whitespace-nowrap",
                    "text-[#76777A] hover:text-[#001689] hover:bg-gray-50",
                    pathname.startsWith(item.href) && item.href !== "/" && "text-[#001689] bg-gray-50"
                  )}
                >
                  {item.name}
                </Link>
              );
            })}
          </nav>

          {/* CTA Buttons - Right */}
          <div className="hidden lg:flex items-center gap-3 xl:gap-6 shrink-0">
            <a
              href={`https://wa.me/${contactInfo.whatsapp}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-3 xl:px-4 py-2 text-[#25D366] border border-[#25D366] rounded-lg hover:bg-[#25D366] hover:text-white transition-all duration-200"
              aria-label="Contactar por WhatsApp"
            >
              <MessageCircle size={18} />
              <span className="font-medium hidden xl:inline">WhatsApp</span>
            </a>
            <Link href="/cotizar" className="btn-primary text-sm xl:text-base whitespace-nowrap">
              Solicitar Cotización
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="lg:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors"
            aria-label={isMobileMenuOpen ? "Cerrar menú" : "Abrir menú"}
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
              className="lg:hidden bg-white border-t overflow-hidden"
            >
              <div className="container-eminsa py-4">
                <nav className="space-y-1">
                  {mainNavigation.map((item) => (
                    <div key={item.name}>
                      <Link
                        href={item.href}
                        onClick={closeMobileMenu}
                        className="flex items-center px-4 py-3 rounded-lg text-[#76777A] hover:text-[#001689] hover:bg-gray-50 transition-colors"
                      >
                        <span className="font-medium">{item.name}</span>
                      </Link>
                    </div>
                  ))}
                </nav>

                <div className="mt-6 space-y-3">
                  <a
                    href={`https://wa.me/${contactInfo.whatsapp}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center gap-2 w-full px-4 py-3 text-[#25D366] border border-[#25D366] rounded-lg hover:bg-[#25D366] hover:text-white transition-all"
                    aria-label="Contactar por WhatsApp"
                  >
                    <MessageCircle size={18} />
                    <span className="font-medium">WhatsApp</span>
                  </a>
                  <Link
                    href="/cotizar"
                    onClick={closeMobileMenu}
                    className="btn-primary w-full justify-center"
                  >
                    Solicitar Cotización
                  </Link>
                  {/* Botón de idioma en móvil */}
                  <button
                    onClick={() => {
                      toggleLanguage();
                      closeMobileMenu();
                    }}
                    className="flex items-center justify-center gap-2 w-full px-4 py-3 text-[#001689] border border-[#001689] rounded-lg hover:bg-[#001689] hover:text-white transition-all"
                    aria-label={language === "en" ? "Switch to Spanish" : "Cambiar a Inglés"}
                  >
                    <Globe size={18} />
                    <span className="font-medium">
                      {language === "en" ? "Cambiar a Español" : "Switch to English"}
                    </span>
                  </button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>
    </>
  );
}