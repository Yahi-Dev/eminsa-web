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
import { getWhatsAppUrl } from "@/utils/whatsapp";

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

const serviciosNavItems: NavItem[] = [
  {
    name: "Inicio",
    href: "/servicios",
    icon: Home,
    exact: true,
  },
  {
    name: "Servicios",
    href: "/servicios/preventivo",
    icon: Settings,
    submenu: [
      {
        name: "Preventivo - Predictivo",
        href: "/servicios/preventivo",
        description: "Inspecciones y monitoreo",
      },
      {
        name: "Correctivo en Campo",
        href: "/servicios/correctivo",
        description: "Reparación en sitio",
      },
      {
        name: "Mantenimiento Integral",
        href: "/servicios/mantenimiento",
        description: "Atención completa",
      },
      {
        name: "Revisiones y Diagnósticos",
        href: "/servicios/revisiones",
        description: "Evaluación técnica",
      },
      {
        name: "Asesoría Técnica",
        href: "/servicios/asesoria",
        description: "Consultoría especializada",
      },
      {
        name: "Servicios Especiales",
        href: "/servicios/especiales",
        description: "Soluciones a medida",
      },
      {
        name: "Emergencias",
        href: "/servicios/emergencias",
        description: "Respuesta 24/7",
      },
      {
        name: "Ingeniería y Proyectos",
        href: "/servicios/ingenieria",
        description: "Diseño y gestión",
      },
      {
        name: "Pruebas de Laboratorio",
        href: "/servicios/laboratorio",
        description: "Análisis de aceite",
      },
      {
        name: "Alquiler de Equipos",
        href: "/servicios/alquiler-transformadores",
        description: "Equipos temporales",
      },
    ],
  },
  {
    name: "Recursos",
    href: "/servicios/recursos",
    icon: FolderOpen,
  },
  {
    name: "Proyectos",
    href: "/servicios/proyectos",
    icon: Briefcase,
  },
  {
    name: "Testimoniales",
    href: "/servicios/testimoniales",
    icon: MessageSquareQuote,
  },
  {
    name: "Clientes",
    href: "/servicios/clientes",
    icon: Users,
  },
  {
    name: "Cotizaciones",
    href: "/servicios/cotizacion",
    icon: FileText,
  },
];

export default function ServiciosLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
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

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Subnavegación Servicios - Desktop */}
      <nav
        ref={menuRef}
        className="hidden lg:block bg-white border-b border-gray-200 sticky top-24 z-40 shadow-sm"
      >
        <div className="container-eminsa">
          <div className="flex items-center justify-between py-2">
            <div className="flex items-center gap-1 flex-1 justify-between">
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
                                  ? "bg-[#FF5500] text-white"
                                  : "text-gray-600 hover:bg-gray-100 hover:text-[#FF5500]"
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
                                        ? "bg-[#FF5500]/10"
                                        : "text-gray-600"
                                    )}
                                  >
                                    <div className="flex flex-col">
                                      <span className={cn(
                                        "font-medium",
                                        (pathname === subItem.href || pathname.startsWith(subItem.href + "/"))
                                          ? "text-[#FF5500]"
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
                              ? "bg-[#FF5500] text-white"
                              : "text-gray-600 hover:bg-gray-100 hover:text-[#FF5500]"
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
          </div>
        </div>
      </nav>

      {/* Subnavegación Servicios - Mobile */}
      <div
        className="lg:hidden sticky top-0 z-40 bg-white border-b border-gray-200 shadow-sm"
      >
        <div className="flex items-center justify-between px-4 py-3">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#FF5500] to-[#CC4400] flex items-center justify-center">
              <span className="text-white font-bold text-sm">S</span>
            </div>
            <div>
              <span className="text-[#FF5500] font-bold">Servicios</span>
              <span className="text-gray-400 text-xs block -mt-1">by EMINSA</span>
            </div>
          </div>
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
            aria-label={mobileMenuOpen ? "Cerrar menú" : "Abrir menú"}
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
                                  ? "bg-[#FF5500]/10 text-[#FF5500]"
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
                                    pathname === "/servicios" ? "bg-[#FF5500] text-white" : "text-gray-600 hover:bg-gray-50"
                                  )}
                                >
                                  Ver todos
                                </Link>
                                {item.submenu?.map((subItem) => (
                                  <Link
                                    key={subItem.name}
                                    href={subItem.href}
                                    onClick={() => { setMobileMenuOpen(false); setOpenSubmenu(null); }}
                                    className={cn(
                                      "block px-8 py-2.5 rounded-lg text-sm transition-colors group",
                                      pathname === subItem.href ? "bg-[#FF5500] text-white" : "text-gray-600 hover:bg-gray-50"
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
                            active ? "bg-[#FF5500] text-white" : "text-gray-600 hover:bg-gray-50"
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
                    className="flex items-center justify-center gap-2 w-full px-4 py-3 text-[#FF5500] border border-[#FF5500] rounded-lg hover:bg-[#FF5500] hover:text-white transition-all font-medium"
                  >
                    <Phone size={20} />
                    {contactInfo.phone}
                  </a>
                  <Link
                    href="/servicios/cotizacion"
                    onClick={() => setMobileMenuOpen(false)}
                    className="flex items-center justify-center w-full px-4 py-3 bg-[#FF5500] hover:bg-[#E64D00] text-white rounded-lg transition-all font-medium"
                  >
                    Solicitar Cotización
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
