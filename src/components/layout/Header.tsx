"use client";

import { useState, useEffect } from "react";
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
import { mainNavigation, contactInfo } from "@/data/navigation";
import { cn } from "@/lib/utils";

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [mobileActiveSubmenu, setMobileActiveSubmenu] = useState<string | null>(null);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Determinar qué submenú mostrar basado en la ruta actual
  const getActiveSubmenu = () => {
    if (pathname.startsWith("/mtn")) return "MTN";
    if (pathname.startsWith("/etrys")) return "ETRYS";
    if (pathname.startsWith("/eic")) return "EIC";
    if (pathname.startsWith("/servicios")) return "Servicios";
    return null;
  };

  const activeSubmenu = getActiveSubmenu();

  const toggleMobileSubmenu = (name: string) => {
    if (mobileActiveSubmenu === name) {
      setMobileActiveSubmenu(null);
    } else {
      setMobileActiveSubmenu(name);
    }
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
    setMobileActiveSubmenu(null);
  };

  return (
    <>
      {/* Top Bar */}
      <div className="hidden lg:block bg-[#001689] text-white text-sm">
        <div className="container-eminsa flex items-center justify-between py-2">
          <div className="flex items-center gap-6">
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
            <span className="text-white/70">Transformadores • Servicios • Suplidores Eléctricos</span>
            <button className="flex items-center gap-1 hover:text-[#00A3E0] transition-colors">
              <Globe size={14} />
              <span>ES</span>
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
        <div className="container-eminsa">
          <div className="flex items-center justify-between h-20">
            {/* Logo */}
            <Link href="/" className="shrink-0">
              <Image
                src="/logoeminsa-Photoroom.png"
                alt="Grupo EMINSA"
                width={156}
                height={156}
                priority
              />
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center gap-1">
              {mainNavigation.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className={cn(
                    "px-4 py-2 rounded-lg font-medium transition-all duration-200",
                    "text-[#76777A] hover:text-[#001689] hover:bg-gray-50",
                    pathname.startsWith(item.href) && item.href !== "/" && "text-[#001689] bg-gray-50"
                  )}
                >
                  {item.name}
                </Link>
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
              <Link href="/cotizar" className="btn-primary">
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
        </div>

        {/* Submenu Bar (Desktop) - Aparece automáticamente cuando estás en la sección */}
        <AnimatePresence>
          {activeSubmenu && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.2 }}
              className="hidden lg:block border-t border-gray-100 bg-gray-50/50 overflow-hidden"
            >
              {mainNavigation.map((item) => {
                if (item.name === activeSubmenu && item.submenu) {
                  return (
                    <div key={item.name} className="container-eminsa py-3">
                      <div className="flex items-center gap-3 flex-wrap">
                        {item.submenu.map((subItem) => (
                          <Link
                            key={subItem.name}
                            href={subItem.href}
                            className={cn(
                              "px-4 py-2 rounded-lg text-sm font-medium transition-colors",
                              pathname === subItem.href
                                ? "bg-white text-[#001689] shadow-sm"
                                : "text-[#76777A] hover:text-[#001689] hover:bg-white/60"
                            )}
                          >
                            {subItem.name}
                          </Link>
                        ))}
                      </div>
                    </div>
                  );
                }
                return null;
              })}
            </motion.div>
          )}
        </AnimatePresence>

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
                      {item.submenu ? (
                        <>
                          <button
                            onClick={() => toggleMobileSubmenu(item.name)}
                            className="flex items-center justify-between w-full px-4 py-3 rounded-lg text-[#76777A] hover:text-[#001689] hover:bg-gray-50 transition-colors"
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
                          <AnimatePresence>
                            {mobileActiveSubmenu === item.name && (
                              <motion.div
                                initial={{ opacity: 0, height: 0 }}
                                animate={{ opacity: 1, height: "auto" }}
                                exit={{ opacity: 0, height: 0 }}
                                className="pl-4 space-y-1 overflow-hidden"
                              >
                                {item.submenu.map((subItem) => (
                                  <Link
                                    key={subItem.name}
                                    href={subItem.href}
                                    onClick={closeMobileMenu}
                                    className="block px-4 py-2 rounded-lg text-sm text-[#76777A] hover:text-[#001689] hover:bg-gray-50 transition-colors"
                                  >
                                    {subItem.name}
                                  </Link>
                                ))}
                              </motion.div>
                            )}
                          </AnimatePresence>
                        </>
                      ) : (
                        <Link
                          href={item.href}
                          onClick={closeMobileMenu}
                          className="flex items-center px-4 py-3 rounded-lg text-[#76777A] hover:text-[#001689] hover:bg-gray-50 transition-colors"
                        >
                          <span className="font-medium">{item.name}</span>
                        </Link>
                      )}
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
                    onClick={closeMobileMenu}
                    className="btn-primary w-full justify-center"
                  >
                    Solicitar Cotización
                  </Link>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>
    </>
  );
}
