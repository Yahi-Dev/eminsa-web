"use client";

import { useState, useCallback, useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { 
  ChevronDown, 
  Package, 
  Shield, 
  Award, 
  FolderOpen, 
  FileText,
  Home,
  Menu,
  X
} from "lucide-react";
import { cn } from "@/lib/utils";

// Tipos para los items del menú
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
}

// Configuración de navegación MTN
const mtnNavItems: NavItem[] = [
  {
    name: "Inicio MTN",
    href: "/mtn",
    icon: Home,
    exact: true,
  },
  {
    name: "Productos",
    href: "/mtn/productos",
    icon: Package,
    submenu: [
      { name: "Tipo Poste", href: "/mtn/productos/tipo-poste" },
      { name: "Pad Mounted", href: "/mtn/productos/pad-mounted" },
      { name: "Subestación", href: "/mtn/productos/subestacion" },
    ],
  },
  {
    name: "Normativa",
    href: "/mtn/normativa",
    icon: Shield,
    submenu: [
      { name: "ANSI", href: "/mtn/normativa/ansi" },
      { name: "DOE-2016", href: "/mtn/normativa/doe-2016" },
    ],
  },
  {
    name: "Certificaciones",
    href: "/mtn/certificaciones",
    icon: Award,
  },
  {
    name: "Recursos",
    href: "/mtn/recursos",
    icon: FolderOpen,
  },
  {
    name: "Cotizaciones",
    href: "/mtn/cotizaciones",
    icon: FileText,
  },
];

export default function MTNLayout({
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
    if (exact) {
      return pathname === href;
    }
    return pathname.startsWith(href);
  }, [pathname]);

  const toggleSubmenu = useCallback((name: string) => {
    setOpenSubmenu(prev => prev === name ? null : name);
  }, []);

  // SOLUCIÓN 1: Cerrar submenús al hacer clic fuera de ellos
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      // Para desktop
      if (submenuRef.current && 
          openSubmenu && 
          !submenuRef.current.contains(event.target as Node) &&
          menuRef.current &&
          !menuRef.current.contains(event.target as Node)) {
        setOpenSubmenu(null);
      }
      
      // Para mobile
      if (mobileMenuOpen && 
          menuRef.current && 
          !menuRef.current.contains(event.target as Node)) {
        setMobileMenuOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [openSubmenu, mobileMenuOpen]);

  // SOLUCIÓN 2: Cerrar submenú cuando cambia la ruta (corregido para evitar setState en efecto)
  // Usamos un efecto para limpiar cuando cambia el pathname
  useEffect(() => {
    // Solo cerrar si realmente necesitamos (cuando el pathname cambia)
    const shouldCloseSubmenu = openSubmenu !== null;
    const shouldCloseMobileMenu = mobileMenuOpen;

    if (shouldCloseSubmenu || shouldCloseMobileMenu) {
      setOpenSubmenu(null);
      setMobileMenuOpen(false);
    }
  }, [pathname]); // eslint-disable-line react-hooks/exhaustive-deps
  // Nota: No incluimos openSubmenu y mobileMenuOpen en las dependencias
  // para evitar re-renders cíclicos

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Subnavegación MTN - Desktop */}
      <nav 
        ref={menuRef}
        className="hidden lg:block bg-[#00269b]/10 border-t-2 border-t-[#00269b]/30 border-b border-b-[#00269b]/20 sticky top-20 xl:top-28 z-40 shadow-sm"
      >
        <div className="container-eminsa">
          <div className="flex items-center gap-1 py-2 justify-center">
            {mtnNavItems.map((item) => {
              const Icon = item.icon;
              const active = isActive(item.href, item.exact);
              const hasSubmenu = item.submenu && item.submenu.length > 0;

              return (
                <div key={item.name} className="relative group">
                  {hasSubmenu ? (
                    <div className="relative">
                      {/* Botón principal con enlace funcional para "Productos" y "Normativa" */}
                      <div className="flex items-center">
                        <Link
                          href={item.href}
                          onClick={(e) => {
                            // En desktop, al hacer clic en el enlace principal:
                            // 1. Previene la navegación inmediata
                            // 2. Abre/cierra el submenú
                            // 3. Si se hace clic nuevamente o en "Ver todos", navega
                            if (window.innerWidth >= 1024) {
                              e.preventDefault();
                              toggleSubmenu(item.name);
                            }
                          }}
                          onMouseDown={(e) => {
                            // Prevenir el comportamiento por defecto solo en desktop
                            // para dar prioridad a la apertura del submenú
                            if (window.innerWidth >= 1024 && e.button === 0) {
                              e.preventDefault();
                            }
                          }}
                          className={cn(
                            "flex items-center gap-2 px-4 py-2.5 rounded-lg text-sm font-medium transition-all duration-200 whitespace-nowrap",
                            active
                              ? "bg-[#00269b] text-white"
                              : "text-gray-600 hover:bg-gray-100 hover:text-[#00269b]"
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

                      {/* Dropdown submenu */}
                      <AnimatePresence>
                        {openSubmenu === item.name && (
                          <motion.div
                            ref={submenuRef}
                            initial={{ opacity: 0, y: -10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -10 }}
                            transition={{ duration: 0.15 }}
                            className="absolute top-full left-0 mt-1 w-48 bg-white rounded-lg shadow-lg border border-gray-200 py-2 z-50"
                          >
                            {/* Enlace para ver todos los productos/normativa */}
                            <Link
                              href={item.href}
                              onClick={() => {
                                // Navega a la página principal y cierra el submenú
                                setOpenSubmenu(null);
                              }}
                              className={cn(
                                "block px-4 py-2 text-sm transition-colors hover:bg-gray-50 border-b border-gray-100",
                                pathname === item.href
                                  ? "bg-[#00269b]/10 text-[#00269b] font-medium"
                                  : "text-gray-600"
                              )}
                            >
                              Ver todos
                            </Link>
                            
                            {/* Submenú items */}
                            {item.submenu?.map((subItem) => (
                              <Link
                                key={subItem.name}
                                href={subItem.href}
                                onClick={() => setOpenSubmenu(null)}
                                className={cn(
                                  "block px-4 py-2 text-sm transition-colors hover:bg-gray-50",
                                  pathname === subItem.href || pathname.startsWith(subItem.href + "/")
                                    ? "bg-[#00269b]/10 text-[#00269b] font-medium"
                                    : "text-gray-600"
                                )}
                              >
                                {subItem.name}
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
                          ? "bg-[#00269b] text-white"
                          : "text-gray-600 hover:bg-gray-100 hover:text-[#00269b]"
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

      {/* Subnavegación MTN - Mobile */}
      <div 
        ref={menuRef}
        className="lg:hidden sticky top-20 z-40 bg-[#00269b]/10 border-t-2 border-t-[#00269b]/30 border-b border-b-[#00269b]/20 shadow-sm"
      >
        <div className="flex items-center justify-between px-4 py-3">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-[#00269b] rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-xs">MTN</span>
            </div>
            <span className="font-semibold text-[#00269b]">
              {mtnNavItems.find(item => isActive(item.href, item.exact))?.name || "MTN"}
            </span>
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
                {mtnNavItems.map((item) => {
                  const Icon = item.icon;
                  const active = isActive(item.href, item.exact);
                  const hasSubmenu = item.submenu && item.submenu.length > 0;

                  return (
                    <div key={item.name} className="space-y-1">
                      {hasSubmenu ? (
                        <>
                          {/* Para mobile, separamos el enlace principal del botón de toggle */}
                          <div className="flex items-center gap-1">
                            <Link
                              href={item.href}
                              onClick={() => setMobileMenuOpen(false)}
                              className={cn(
                                "flex-1 flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-colors",
                                active
                                  ? "bg-[#00269b]/10 text-[#00269b]"
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
                                {/* Enlace para ver todos en mobile */}
                                <Link
                                  href={item.href}
                                  onClick={() => {
                                    setMobileMenuOpen(false);
                                    setOpenSubmenu(null);
                                  }}
                                  className={cn(
                                    "block px-8 py-2.5 rounded-lg text-sm transition-colors",
                                    pathname === item.href
                                      ? "bg-[#00269b] text-white"
                                      : "text-gray-600 hover:bg-gray-50"
                                  )}
                                >
                                  Ver todos
                                </Link>
                                
                                {item.submenu?.map((subItem) => (
                                  <Link
                                    key={subItem.name}
                                    href={subItem.href}
                                    onClick={() => {
                                      setMobileMenuOpen(false);
                                      setOpenSubmenu(null);
                                    }}
                                    className={cn(
                                      "block px-8 py-2.5 rounded-lg text-sm transition-colors",
                                      pathname === subItem.href
                                        ? "bg-[#00269b] text-white"
                                        : "text-gray-600 hover:bg-gray-50"
                                    )}
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
                          onClick={() => setMobileMenuOpen(false)}
                          className={cn(
                            "flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-colors",
                            active
                              ? "bg-[#00269b] text-white"
                              : "text-gray-600 hover:bg-gray-50"
                          )}
                        >
                          <Icon size={18} />
                          <span>{item.name}</span>
                        </Link>
                      )}
                    </div>
                  );
                })}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Contenido principal */}
      <main className="pt-0">{children}</main>
    </div>
  );
}