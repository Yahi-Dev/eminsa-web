"use client";

import { useState, useCallback } from "react";
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

// Configuración de navegación MTN
const mtnNavItems = [
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

  const isActive = useCallback((href: string, exact?: boolean) => {
    if (exact) {
      return pathname === href;
    }
    return pathname.startsWith(href);
  }, [pathname]);

  const toggleSubmenu = useCallback((name: string) => {
    setOpenSubmenu(prev => prev === name ? null : name);
  }, []);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Subnavegación MTN - Desktop - CORREGIDO: top-16 en lugar de top-20 */}
      <nav className="hidden lg:block bg-white border-b border-gray-200 sticky top-24 z-40 shadow-sm">
        <div className="container-eminsa">
          <div className="flex items-center gap-1 py-2">
            {/* REMOVIDO: overflow-x-auto para evitar scroll horizontal */}
            {mtnNavItems.map((item) => {
              const Icon = item.icon;
              const active = isActive(item.href, item.exact);
              const hasSubmenu = item.submenu && item.submenu.length > 0;

              return (
                <div key={item.name} className="relative group">
                  {hasSubmenu ? (
                    <button
                      onClick={() => toggleSubmenu(item.name)}
                      className={cn(
                        "flex items-center gap-2 px-4 py-2.5 rounded-lg text-sm font-medium transition-all duration-200 whitespace-nowrap",
                        active
                          ? "bg-[#001689] text-white"
                          : "text-gray-600 hover:bg-gray-100 hover:text-[#001689]"
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
                    </button>
                  ) : (
                    <Link
                      href={item.href}
                      className={cn(
                        "flex items-center gap-2 px-4 py-2.5 rounded-lg text-sm font-medium transition-all duration-200 whitespace-nowrap",
                        active
                          ? "bg-[#001689] text-white"
                          : "text-gray-600 hover:bg-gray-100 hover:text-[#001689]"
                      )}
                    >
                      <Icon size={16} />
                      <span>{item.name}</span>
                    </Link>
                  )}

                  {/* Dropdown submenu - CORREGIDO: Añadido max-h-64 y overflow-y-auto si es necesario */}
                  {hasSubmenu && (
                    <AnimatePresence>
                      {openSubmenu === item.name && (
                        <motion.div
                          initial={{ opacity: 0, y: -10 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -10 }}
                          transition={{ duration: 0.15 }}
                          className="absolute top-full left-0 mt-1 w-48 bg-white rounded-lg shadow-lg border border-gray-200 py-2 z-50"
                        >
                          <div className="max-h-64 overflow-y-auto">
                            {item.submenu?.map((subItem) => (
                              <Link
                                key={subItem.name}
                                href={subItem.href}
                                onClick={() => setOpenSubmenu(null)}
                                className={cn(
                                  "block px-4 py-2 text-sm transition-colors hover:bg-gray-50",
                                  pathname === subItem.href || pathname.startsWith(subItem.href + "/")
                                    ? "bg-[#001689]/10 text-[#001689] font-medium"
                                    : "text-gray-600"
                                )}
                              >
                                {subItem.name}
                              </Link>
                            ))}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </nav>

      {/* Subnavegación MTN - Mobile - CORREGIDO: top-0 y estructura mejorada */}
      <div className="lg:hidden sticky top-0 z-40 bg-white border-b border-gray-200 shadow-sm">
        <div className="flex items-center justify-between px-4 py-3">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-[#001689] rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-xs">MTN</span>
            </div>
            <span className="font-semibold text-[#001689]">
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
                          <button
                            onClick={() => toggleSubmenu(item.name)}
                            className={cn(
                              "flex items-center justify-between w-full px-4 py-3 rounded-lg text-sm font-medium transition-colors",
                              active
                                ? "bg-[#001689]/10 text-[#001689]"
                                : "text-gray-600 hover:bg-gray-50"
                            )}
                          >
                            <div className="flex items-center gap-3">
                              <Icon size={18} />
                              <span>{item.name}</span>
                            </div>
                            <ChevronDown 
                              size={16} 
                              className={cn(
                                "transition-transform duration-200",
                                openSubmenu === item.name && "rotate-180"
                              )}
                            />
                          </button>
                          <AnimatePresence>
                            {openSubmenu === item.name && (
                              <motion.div
                                initial={{ opacity: 0, height: 0 }}
                                animate={{ opacity: 1, height: "auto" }}
                                exit={{ opacity: 0, height: 0 }}
                                className="space-y-1 overflow-hidden"
                              >
                                {item.submenu?.map((subItem) => (
                                  <Link
                                    key={subItem.name}
                                    href={subItem.href}
                                    onClick={() => setMobileMenuOpen(false)}
                                    className={cn(
                                      "block px-8 py-2.5 rounded-lg text-sm transition-colors",
                                      pathname === subItem.href
                                        ? "bg-[#001689] text-white"
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
                              ? "bg-[#001689] text-white"
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