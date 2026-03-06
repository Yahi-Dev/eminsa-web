"use client";

import { useState, useCallback, useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  ChevronDown,
  Home,
  Settings,
  FolderOpen,
  Briefcase,
  MessageSquareQuote,
  Users,
  FileText,
  Menu,
  X,
  Phone,
  MessageCircle
} from "lucide-react";
import { cn } from "@/lib/utils";
import { contactInfo } from "@/config/navigation";
import { useTranslations } from "next-intl";
import { getWhatsAppUrl } from "@/utils/whatsapp";

function useScrolled(threshold = 10) {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > threshold);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [threshold]);
  return scrolled;
}

interface NavItem {
  name: string;
  href: string;
  icon: React.ComponentType<{ size?: number }>;
  exact?: boolean;
  submenu?: SubMenuItem[];
}

interface SubMenuItem {
  name: string;
  href: string;
  description?: string;
}

function useServiciosNavItems(): NavItem[] {
  const t = useTranslations("pages.servicios.layout");
  return [
    { name: t("home"), href: "/servicios", icon: Home, exact: true },
    {
      name: t("services"), href: "/servicios/preventivo", icon: Settings,
      submenu: [
        { name: t("submenu.preventivo"), href: "/servicios/preventivo", description: t("submenu.preventivoDesc") },
        { name: t("submenu.correctivo"), href: "/servicios/correctivo", description: t("submenu.correctivoDesc") },
        { name: t("submenu.mantenimiento"), href: "/servicios/mantenimiento", description: t("submenu.mantenimientoDesc") },
        { name: t("submenu.revisiones"), href: "/servicios/revisiones", description: t("submenu.revisionesDesc") },
        { name: t("submenu.asesoria"), href: "/servicios/asesoria", description: t("submenu.asesoriaDesc") },
        { name: t("submenu.especiales"), href: "/servicios/especiales", description: t("submenu.especialesDesc") },
        { name: t("submenu.emergencias"), href: "/servicios/emergencias", description: t("submenu.emergenciasDesc") },
        { name: t("submenu.ingenieria"), href: "/servicios/ingenieria", description: t("submenu.ingenieriaDesc") },
        { name: t("submenu.laboratorio"), href: "/servicios/laboratorio", description: t("submenu.laboratorioDesc") },
        { name: t("submenu.alquiler"), href: "/servicios/alquiler-transformadores", description: t("submenu.alquilerDesc") },
      ],
    },
    { name: t("resources"), href: "/servicios/recursos", icon: FolderOpen },
    { name: t("quotes"), href: "/servicios/cotizacion", icon: FileText },
  ];
}

export default function ServiciosLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const t = useTranslations("pages.servicios.layout");
  const serviciosNavItems = useServiciosNavItems();
  const [openSubmenu, setOpenSubmenu] = useState<string | null>(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const submenuRef = useRef<HTMLDivElement>(null);

  const isActive = useCallback((href: string, exact?: boolean) => {
    if (exact) return pathname === href;
    return pathname.startsWith(href);
  }, [pathname]);

  const toggleSubmenu = useCallback((name: string) => {
    setOpenSubmenu(prev => prev === name ? null : name);
  }, []);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (submenuRef.current && openSubmenu && !submenuRef.current.contains(event.target as Node) && menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setOpenSubmenu(null);
      }
      if (mobileMenuOpen && menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setMobileMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [openSubmenu, mobileMenuOpen]);

  useEffect(() => {
    if (openSubmenu !== null || mobileMenuOpen) {
      setOpenSubmenu(null);
      setMobileMenuOpen(false);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname]);

  const scrolled = useScrolled(20);

  return (
    <div className="min-h-screen bg-white">
      {/* Subnavegación Servicios - Desktop */}
      <nav
        ref={menuRef}
        className={cn(
          "hidden lg:block sticky z-40 transition-all duration-300",
          scrolled
            ? "top-14 xl:top-16 bg-white/90 backdrop-blur-xl border-b border-gray-200 shadow-md"
            : "top-20 xl:top-28 bg-white/60 backdrop-blur-sm"
        )}
      >
        <div className="flex items-center justify-center px-4 lg:px-6 xl:px-10 w-full py-2">
            <div className="flex items-center gap-1">
                {serviciosNavItems.map((item) => {
                  const Icon = item.icon;
                  const active = isActive(item.href, item.exact);
                  const hasSubmenu = item.submenu && item.submenu.length > 0;

                  return (
                    <div key={item.name} className="relative group">
                      {hasSubmenu ? (
                        <div className="relative">
                          <div className="flex items-center">
                            <Link
                              href={item.href}
                              onClick={(e) => {
                                if (window.innerWidth >= 1024) {
                                  e.preventDefault();
                                  toggleSubmenu(item.name);
                                }
                              }}
                              onMouseDown={(e) => {
                                if (window.innerWidth >= 1024 && e.button === 0) {
                                  e.preventDefault();
                                }
                              }}
                              className={cn(
                                "flex items-center gap-2 px-4 py-2.5 rounded-lg text-sm font-medium transition-all duration-200 whitespace-nowrap",
                                active
                                  ? "bg-[#6d6e6d] text-white"
                                  : "text-gray-600 hover:bg-gray-100 hover:text-[#6d6e6d]"
                              )}
                            >
                              <Icon size={16} />
                              <span>{item.name}</span>
                              <ChevronDown
                                size={14}
                                className={cn(
                                  "transition-transform duration-200",
                                  openSubmenu === item.name && "rotate-180"
                                )}
                              />
                            </Link>
                          </div>

                          <AnimatePresence>
                            {openSubmenu === item.name && (
                              <motion.div
                                ref={submenuRef}
                                initial={{ opacity: 0, y: -10 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -10 }}
                                transition={{ duration: 0.15 }}
                                className="absolute top-full left-0 mt-1 w-64 bg-white rounded-lg shadow-lg border border-gray-200 py-2 z-50"
                              >
                                {item.submenu?.map((subItem) => (
                                  <Link
                                    key={subItem.name}
                                    href={subItem.href}
                                    onClick={() => setOpenSubmenu(null)}
                                    className={cn(
                                      "block px-4 py-2.5 text-sm transition-colors hover:bg-gray-50 group",
                                      pathname === subItem.href || pathname.startsWith(subItem.href + "/")
                                        ? "bg-[#6d6e6d]/10"
                                        : "text-gray-600"
                                    )}
                                  >
                                    <div className="flex flex-col">
                                      <span className={cn(
                                        "font-medium",
                                        (pathname === subItem.href || pathname.startsWith(subItem.href + "/"))
                                          ? "text-[#6d6e6d]"
                                          : "text-gray-800"
                                      )}>
                                        {subItem.name}
                                      </span>
                                      {subItem.description && (
                                        <span className="text-xs text-gray-500 mt-0.5">
                                          {subItem.description}
                                        </span>
                                      )}
                                    </div>
                                  </Link>
                                ))}
                              </motion.div>
                            )}
                          </AnimatePresence>
                        </div>
                      ) : (
                        <Link
                          href={item.href}
                          className={cn(
                            "flex items-center gap-2 px-4 py-2.5 rounded-lg text-sm font-medium transition-all duration-200 whitespace-nowrap",
                            active
                              ? "bg-[#6d6e6d] text-white"
                              : "text-gray-600 hover:bg-gray-100 hover:text-[#6d6e6d]"
                          )}
                        >
                          <Icon size={16} />
                          <span>{item.name}</span>
                        </Link>
                      )}
                    </div>
                  );
                })}
            </div>
        </div>
      </nav>

      {/* Subnavegación Servicios - Mobile */}
      <div
        className={cn(
          "lg:hidden sticky z-40 transition-all duration-300",
          scrolled
            ? "top-14 bg-white/90 backdrop-blur-xl border-b border-gray-200 shadow-md"
            : "top-20 bg-white/60 backdrop-blur-sm"
        )}
      >
        <div className="flex items-center justify-between px-4 py-3">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#6d6e6d] to-[#414241] flex items-center justify-center">
              <span className="text-white font-bold text-sm">S</span>
            </div>
            <div>
              <span className="text-[#6d6e6d] font-bold">{t("services")}</span>
              <span className="text-gray-400 text-xs block -mt-1">by EMINSA</span>
            </div>
          </div>
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
            aria-label={mobileMenuOpen ? t("closeMenu") : t("openMenu")}
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.2 }}
              className="border-t border-gray-100 bg-white"
            >
              <div className="p-4 space-y-2 max-h-[calc(100vh-120px)] overflow-y-auto">
                {serviciosNavItems.map((item) => {
                  const Icon = item.icon;
                  const active = isActive(item.href, item.exact);
                  const hasSubmenu = item.submenu && item.submenu.length > 0;

                  return (
                    <div key={item.name} className="space-y-1">
                      {hasSubmenu ? (
                        <>
                          <div className="flex items-center gap-1">
                            <Link
                              href={item.href}
                              onClick={() => setMobileMenuOpen(false)}
                              className={cn(
                                "flex-1 flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-colors",
                                active
                                  ? "bg-[#6d6e6d]/10 text-[#6d6e6d]"
                                  : "text-gray-600 hover:bg-gray-50"
                              )}
                            >
                              <Icon size={18} />
                              <span>{item.name}</span>
                            </Link>
                            <button
                              onClick={() => toggleSubmenu(item.name)}
                              className="p-2 rounded-lg hover:bg-gray-50 text-gray-600"
                              aria-label={`Mostrar submenú de ${item.name}`}
                            >
                              <ChevronDown
                                size={16}
                                className={cn(
                                  "transition-transform duration-200",
                                  openSubmenu === item.name && "rotate-180"
                                )}
                              />
                            </button>
                          </div>
                          <AnimatePresence>
                            {openSubmenu === item.name && (
                              <motion.div
                                initial={{ opacity: 0, height: 0 }}
                                animate={{ opacity: 1, height: "auto" }}
                                exit={{ opacity: 0, height: 0 }}
                                className="space-y-1 overflow-hidden"
                              >
                                <Link
                                  href="/servicios"
                                  onClick={() => { setMobileMenuOpen(false); setOpenSubmenu(null); }}
                                  className={cn(
                                    "block px-8 py-2.5 rounded-lg text-sm transition-colors",
                                    pathname === "/servicios" ? "bg-[#6d6e6d] text-white" : "text-gray-600 hover:bg-gray-50"
                                  )}
                                >
                                  {t("viewAll")}
                                </Link>
                                {item.submenu?.map((subItem) => (
                                  <Link
                                    key={subItem.name}
                                    href={subItem.href}
                                    onClick={() => { setMobileMenuOpen(false); setOpenSubmenu(null); }}
                                    className={cn(
                                      "block px-8 py-2.5 rounded-lg text-sm transition-colors group",
                                      pathname === subItem.href ? "bg-[#6d6e6d] text-white" : "text-gray-600 hover:bg-gray-50"
                                    )}
                                  >
                                    <div className="flex flex-col">
                                      <span>{subItem.name}</span>
                                      {subItem.description && (
                                        <span className="text-xs text-gray-400 mt-0.5">{subItem.description}</span>
                                      )}
                                    </div>
                                  </Link>
                                ))}
                              </motion.div>
                            )}
                          </AnimatePresence>
                        </>
                      ) : (
                        <Link
                          href={item.href}
                          onClick={() => setMobileMenuOpen(false)}
                          className={cn(
                            "flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-colors",
                            active ? "bg-[#6d6e6d] text-white" : "text-gray-600 hover:bg-gray-50"
                          )}
                        >
                          <Icon size={18} />
                          <span>{item.name}</span>
                        </Link>
                      )}
                    </div>
                  );
                })}

                {/* Mobile CTAs */}
                <div className="pt-4 mt-4 border-t border-gray-100 space-y-3">
                  <a
                    href={getWhatsAppUrl()}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center gap-2 w-full px-4 py-3 text-[#25D366] border border-[#25D366] rounded-lg hover:bg-[#25D366] hover:text-white transition-all font-medium"
                  >
                    <MessageCircle size={20} />
                    WhatsApp
                  </a>
                  <a
                    href={`tel:${contactInfo.phone}`}
                    className="flex items-center justify-center gap-2 w-full px-4 py-3 text-[#6d6e6d] border border-[#6d6e6d] rounded-lg hover:bg-[#6d6e6d] hover:text-white transition-all font-medium"
                  >
                    <Phone size={20} />
                    {contactInfo.phone}
                  </a>
                  <Link
                    href="/servicios/cotizacion"
                    onClick={() => setMobileMenuOpen(false)}
                    className="flex items-center justify-center w-full px-4 py-3 bg-[#6d6e6d] hover:bg-[#575857] text-white rounded-lg transition-all font-medium"
                  >
                    {t("requestQuote")}
                  </Link>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <main className="pt-0">{children}</main>
    </div>
  );
}
