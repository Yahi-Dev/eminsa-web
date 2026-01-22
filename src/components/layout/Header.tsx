"use client";

import { useState, useEffect } from "react";
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
import { mainNavigation, contactInfo } from "@/data/navigation";
import { cn } from "@/lib/utils";
import { useRouter } from "next/navigation";

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [language, setLanguage] = useState<"en" | "es">("es");
  const router = useRouter();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Cargar idioma desde cookies/localStorage - CORREGIDO
  useEffect(() => {
    const getInitialLanguage = (): "en" | "es" => {
      if (typeof window === "undefined") return "es";
      
      const cookieLang = document.cookie
        .split("; ")
        .find(r => r.startsWith("NEXT_LOCALE="))
        ?.split("=")[1] as "en" | "es" | undefined;

      return (cookieLang ?? (localStorage.getItem("language") as "en" | "es" | null) ?? "es");
    };

    setLanguage(getInitialLanguage());
  }, []);

  const setLocale = (lng: "en" | "es") => {
    setLanguage(lng);
    localStorage.setItem("language", lng);
    document.cookie = `NEXT_LOCALE=${lng}; Path=/; Max-Age=31536000; SameSite=Lax`;
    
    // Recargar la página para aplicar el cambio de idioma
    router.refresh();
  };

  const toggleLanguage = () => {
    const newLang = language === "en" ? "es" : "en";
    setLocale(newLang);
  };

  const handleMouseEnter = (name: string) => {
    setActiveDropdown(name);
  };

  const handleMouseLeave = () => {
    setActiveDropdown(null);
  };

  return (
    <>
      {/* Top Bar */}
      <div className="hidden lg:block bg-[#001689] text-white text-sm">
        <div className="container-eminsa flex items-center justify-between py-2">
          <div className="flex items-center gap-6">
            <a href={`tel:${contactInfo.phone}`} className="flex items-center gap-2 hover:text-[#00A3E0] transition-colors">
              <Phone size={14} />
              <span>{contactInfo.phone}</span>
            </a>
            <a href={`mailto:${contactInfo.email}`} className="flex items-center gap-2 hover:text-[#00A3E0] transition-colors">
              <Mail size={14} />
              <span>{contactInfo.email}</span>
            </a>
          </div>
          <div className="flex items-center gap-4">
            <span className="text-white/70">Transformadores • Servicios • Suplidores Eléctricos</span>
            <button 
              onClick={toggleLanguage}
              className="flex items-center gap-1 hover:text-[#00A3E0] transition-colors"
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
          "sticky top-0 z-50 transition-all duration-300",
          isScrolled
            ? "bg-white/95 backdrop-blur-md shadow-lg"
            : "bg-white"
        )}
      >
        <div className="container-eminsa">
          <div className="flex items-center justify-between h-20">
            {/* Logo */}
            <Link href="/" className="shrink-0"> {/* CORREGIDO: shrink-0 en lugar de flex-shrink-0 */}
              <div className="flex items-center gap-3">
                <Image src="/logoeminsa-Photoroom.png" alt="Logo" width={156} height={156} />
              </div>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center gap-1">
              {mainNavigation.map((item) => (
                <div
                  key={item.name}
                  className="relative"
                  onMouseEnter={() => item.submenu && handleMouseEnter(item.name)}
                  onMouseLeave={handleMouseLeave}
                >
                  <Link
                    href={item.href}
                    className={cn(
                      "flex items-center gap-1 px-4 py-2 rounded-lg font-medium transition-all duration-200",
                      "text-[#76777A] hover:text-[#001689] hover:bg-gray-50",
                      activeDropdown === item.name && "text-[#001689] bg-gray-50"
                    )}
                  >
                    {item.name}
                    {item.submenu && (
                      <ChevronDown
                        size={16}
                        className={cn(
                          "transition-transform duration-200",
                          activeDropdown === item.name && "rotate-180"
                        )}
                      />
                    )}
                  </Link>

                  {/* Dropdown Menu */}
                  <AnimatePresence>
                    {item.submenu && activeDropdown === item.name && (
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 10 }}
                        transition={{ duration: 0.2 }}
                        className="absolute top-full left-0 mt-1 w-64 bg-white rounded-xl shadow-xl border border-gray-100 overflow-hidden"
                      >
                        <div 
                          className="h-1 w-full"
                          style={{ backgroundColor: item.color || "#001689" }}
                        />
                        <div className="p-2">
                          {item.submenu.map((subItem) => (
                            <Link
                              key={subItem.name}
                              href={subItem.href}
                              className="block px-4 py-3 rounded-lg text-[#76777A] hover:text-[#001689] hover:bg-gray-50 transition-colors"
                            >
                              <span className="font-medium">{subItem.name}</span>
                            </Link>
                          ))}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ))}
            </nav>

            {/* CTA Buttons */}
            <div className="hidden lg:flex items-center gap-3">
              <a
                href={`https://wa.me/${contactInfo.whatsapp}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-4 py-2 text-[#25D366] border border-[#25D366] rounded-lg hover:bg-[#25D366] hover:text-white transition-all duration-200"
              >
                <MessageCircle size={18} />
                <span className="font-medium">WhatsApp</span>
              </a>
              <Link
                href="/cotizar"
                className="btn-primary"
              >
                Solicitar Cotización
              </Link>
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="lg:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors"
            >
              {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
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
                        onClick={() => setIsMobileMenuOpen(false)}
                        className="flex items-center justify-between px-4 py-3 rounded-lg text-[#76777A] hover:text-[#001689] hover:bg-gray-50 transition-colors"
                      >
                        <span className="font-medium">{item.name}</span>
                        {item.submenu && <ChevronDown size={16} />}
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
                  >
                    <MessageCircle size={18} />
                    <span className="font-medium">WhatsApp</span>
                  </a>
                  <Link
                    href="/cotizar"
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="btn-primary w-full justify-center"
                  >
                    Solicitar Cotización
                  </Link>
                  {/* Botón de idioma en móvil */}
                  <button 
                    onClick={() => {
                      toggleLanguage();
                      setIsMobileMenuOpen(false);
                    }}
                    className="flex items-center justify-center gap-2 w-full px-4 py-3 text-[#001689] border border-[#001689] rounded-lg hover:bg-[#001689] hover:text-white transition-all"
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