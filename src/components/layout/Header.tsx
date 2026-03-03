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
import { getWhatsAppUrl } from "@/utils/whatsapp";
import { cn } from "@/lib/utils";
import { useRouter } from "next/navigation";
import { Tooltip } from "@/components/ui/Tooltip";
import { useTranslations } from "next-intl";

// Tipos
interface SubMenuItem {
  name: string;
  href: string;
  description?: string;
}

// Tooltips para las divisiones
const divisionsTooltips: { [key: string]: { label: string; color: string } } = {
  MTN: { label: "Manufactura Transformadores Nuevos", color: "#00269b" },
  RST: { label: "Reparación y Servicio de Transformadores", color: "#0099ce" },
  EIC: { label: "Eminsa International Corporation", color: "#009e49" },
  Servicios: { label: "Servicios a Nivel Interno y Externo", color: "#6d6e6d" },
};

export default function Header() {
  const t = useTranslations("nav");
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [mobileActiveSubmenu, setMobileActiveSubmenu] = useState<string | null>(null);
  const [desktopActiveSubmenu, setDesktopActiveSubmenu] = useState<string | null>(null);
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
      <div className="hidden lg:block bg-[#00269b] text-white text-xs xl:text-sm">
        <div className="container-eminsa flex items-center justify-between py-2">
          <div className="flex items-center gap-4 xl:gap-6">
            <a
              href={`tel:${contactInfo.phone}`}
              className="flex items-center gap-2 hover:text-[#0099ce] transition-colors"
            >
              <Phone size={14} />
              <span>{contactInfo.phone}</span>
            </a>
            <a
              href={`mailto:${contactInfo.email}`}
              className="flex items-center gap-2 hover:text-[#0099ce] transition-colors"
            >
              <Mail size={14} />
              <span>{contactInfo.email}</span>
            </a>
          </div>
          <div className="flex items-center gap-4">
            <span className="text-white/70 hidden xl:inline">{t('tagline')}</span>
            <button
              onClick={toggleLanguage}
              className="flex items-center gap-1 hover:text-[#0099ce] transition-colors"
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
          isScrolled ? "shadow-lg" : ""
        )}
      >
        <div className={cn(
          "flex items-center px-4 lg:px-6 xl:px-10 w-full gap-3 lg:gap-4 xl:gap-8 transition-all duration-300",
          isScrolled ? "h-14 xl:h-16" : "h-20 xl:h-28"
        )}>
          {/* Logo - Left */}
          <motion.div
            className="shrink-0"
            whileHover={{ scale: 1.04 }}
            transition={{ type: "spring", stiffness: 400, damping: 20 }}
          >
            <Link href="/">
              <Image
                src="/logoeminsa-Photoroom.png"
                alt="Grupo EMINSA"
                width={240}
                height={240}
                className={cn(
                  "w-auto transition-all duration-300",
                  isScrolled ? "h-10 lg:h-11 xl:h-12" : "h-16 lg:h-20 xl:h-24"
                )}
                priority
              />
            </Link>
          </motion.div>

          {/* Desktop Navigation - Center */}
          <motion.nav
            className="hidden lg:flex items-center gap-1 xl:gap-2 2xl:gap-5 grow justify-center"
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.15 }}
          >
            {mainNavigation.map((item) => {
              const tooltip = divisionsTooltips[item.name as keyof typeof divisionsTooltips];
              // Solo mostrar dropdown para "EMINSA"
              const hasSubmenu = item.name === "EMINSA" && item.submenu && item.submenu.length > 0;

              if (hasSubmenu) {
                return (
                  <div
                    key={item.name}
                    className="relative"
                    onMouseEnter={() => setDesktopActiveSubmenu(item.name)}
                    onMouseLeave={() => setDesktopActiveSubmenu(null)}
                  >
                    <button
                      className={cn(
                        "relative group flex items-center gap-1 px-3 xl:px-4 py-2 rounded-lg font-semibold transition-colors duration-200 text-sm xl:text-[15px] 2xl:text-base uppercase whitespace-nowrap tracking-wide",
                        "text-[#414241] hover:text-[#00269b]",
                        pathname.startsWith(item.href) && item.href !== "/" && "text-[#00269b]"
                      )}
                    >
                      {item.name}
                      <span className="absolute bottom-0.5 left-3 right-3 h-0.5 bg-[#00269b] rounded-full scale-x-0 group-hover:scale-x-100 transition-transform duration-200 origin-left" />
                      <ChevronDown
                        size={14}
                        className={cn(
                          "transition-transform duration-200",
                          desktopActiveSubmenu === item.name && "rotate-180"
                        )}
                      />
                    </button>

                    {/* Dropdown */}
                    <AnimatePresence>
                      {desktopActiveSubmenu === item.name && (
                        <motion.div
                          initial={{ opacity: 0, y: -8 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -8 }}
                          transition={{ duration: 0.18 }}
                          className="absolute top-full left-0 mt-2 w-52 bg-white rounded-xl shadow-2xl border border-gray-100 py-2 z-50"
                        >
                          {item.submenu?.map((subItem: SubMenuItem) => (
                            <Link
                              key={subItem.name}
                              href={subItem.href}
                              className={cn(
                                "block px-5 py-2.5 text-sm font-medium transition-colors hover:bg-[#00269b]/5 hover:text-[#00269b]",
                                pathname === subItem.href || pathname.startsWith(subItem.href + "/")
                                  ? "text-[#00269b] bg-[#00269b]/5"
                                  : "text-[#414241]"
                              )}
                            >
                              {subItem.name}
                            </Link>
                          ))}
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                );
              }

              // Item sin submenú - enlace normal
              return tooltip ? (
                <Tooltip key={item.name} content={tooltip.label} color={tooltip.color}>
                  <Link
                    href={item.href}
                    className={cn(
                      "relative group px-3 xl:px-4 py-2 rounded-lg font-semibold transition-colors duration-200 text-sm xl:text-[15px] 2xl:text-base uppercase whitespace-nowrap tracking-wide",
                      "text-[#414241] hover:text-[#00269b]",
                      pathname.startsWith(item.href) && item.href !== "/" && "text-[#00269b]"
                    )}
                  >
                    {item.name}
                    <span className="absolute bottom-0.5 left-3 right-3 h-0.5 bg-[#00269b] rounded-full scale-x-0 group-hover:scale-x-100 transition-transform duration-200 origin-left" />
                  </Link>
                </Tooltip>
              ) : (
                <Link
                  key={item.name}
                  href={item.href}
                  className={cn(
                    "relative group px-3 xl:px-4 py-2 rounded-lg font-semibold transition-colors duration-200 text-sm xl:text-[15px] 2xl:text-base uppercase whitespace-nowrap tracking-wide",
                    "text-[#414241] hover:text-[#00269b]",
                    pathname.startsWith(item.href) && item.href !== "/" && "text-[#00269b]"
                  )}
                >
                  {item.name}
                  <span className="absolute bottom-0.5 left-3 right-3 h-0.5 bg-[#00269b] rounded-full scale-x-0 group-hover:scale-x-100 transition-transform duration-200 origin-left" />
                </Link>
              );
            })}
          </motion.nav>

          {/* CTA Buttons - Right */}
          <div className="hidden lg:flex items-center gap-3 xl:gap-4 shrink-0">
            <a
              href={getWhatsAppUrl()}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-3 xl:px-5 py-2 xl:py-2.5 text-[#25D366] border-2 border-[#25D366] rounded-xl font-semibold hover:bg-[#25D366] hover:text-white transition-all duration-200"
              aria-label="Contactar por WhatsApp"
            >
              <MessageCircle size={18} />
              <span className="hidden xl:inline">WhatsApp</span>
            </a>
            <Link href="/cotizar" className="btn-primary text-sm xl:text-[15px] 2xl:text-base whitespace-nowrap px-5 xl:px-6 py-2.5">
              {t('requestQuote')}
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
                  {mainNavigation.map((item) => {
                    // Solo mostrar accordion para "EMINSA"
                    const hasSubmenu = item.name === "EMINSA" && item.submenu && item.submenu.length > 0;

                    if (hasSubmenu) {
                      return (
                        <div key={item.name}>
                          {/* Botón para toggle del submenú */}
                          <button
                            onClick={() => setMobileActiveSubmenu(
                              mobileActiveSubmenu === item.name ? null : item.name
                            )}
                            className="flex items-center justify-between w-full px-4 py-3 rounded-lg text-[#6d6e6d] hover:text-[#00269b] hover:bg-gray-50 transition-colors"
                          >
                            <span className="font-medium">{item.name}</span>
                            <ChevronDown
                              size={16}
                              className={cn(
                                "transition-transform duration-200",
                                mobileActiveSubmenu === item.name && "rotate-180"
                              )}
                            />
                          </button>

                          {/* Submenú accordion */}
                          <AnimatePresence>
                            {mobileActiveSubmenu === item.name && (
                              <motion.div
                                initial={{ opacity: 0, height: 0 }}
                                animate={{ opacity: 1, height: "auto" }}
                                exit={{ opacity: 0, height: 0 }}
                                transition={{ duration: 0.2 }}
                                className="overflow-hidden space-y-1 mt-1"
                              >
                                {item.submenu?.map((subItem) => (
                                  <Link
                                    key={subItem.name}
                                    href={subItem.href}
                                    onClick={closeMobileMenu}
                                    className={cn(
                                      "block px-8 py-2 rounded-lg text-sm transition-colors",
                                      pathname === subItem.href || pathname.startsWith(subItem.href + "/")
                                        ? "text-[#00269b] bg-gray-50 font-medium"
                                        : "text-gray-600 hover:bg-gray-50"
                                    )}
                                  >
                                    {subItem.name}
                                  </Link>
                                ))}
                              </motion.div>
                            )}
                          </AnimatePresence>
                        </div>
                      );
                    }

                    return (
                      <div key={item.name}>
                        <Link
                          href={item.href}
                          onClick={closeMobileMenu}
                          className="flex items-center px-4 py-3 rounded-lg text-[#6d6e6d] hover:text-[#00269b] hover:bg-gray-50 transition-colors"
                        >
                          <span className="font-medium">{item.name}</span>
                        </Link>
                      </div>
                    );
                  })}
                </nav>

                <div className="mt-6 space-y-3">
                  <a
                    href={getWhatsAppUrl()}
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
                    {t('requestQuote')}
                  </Link>
                  {/* Botón de idioma en móvil */}
                  <button
                    onClick={() => {
                      toggleLanguage();
                      closeMobileMenu();
                    }}
                    className="flex items-center justify-center gap-2 w-full px-4 py-3 text-[#00269b] border border-[#00269b] rounded-lg hover:bg-[#00269b] hover:text-white transition-all"
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