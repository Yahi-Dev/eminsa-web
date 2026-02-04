"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, Menu, X } from "lucide-react";
import { etrysNavigation } from "@/config/etrys-data";
import { cn } from "@/lib/utils";

export default function EtrysLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const [openSubmenu, setOpenSubmenu] = useState<string | null>(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const isActive = (href: string) => {
    if (href === "/etrys") {
      return pathname === "/etrys";
    }
    return pathname.startsWith(href);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Subnavegación ETRYS - Desktop */}
      <nav className="sticky top-16 sm:top-18 lg:top-20 z-40 bg-white border-b shadow-sm">
        <div className="container-eminsa">
          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center justify-between h-14">
            {/* Logo/Brand ETRYS */}
            <Link 
              href="/etrys" 
              className="flex items-center gap-2 font-bold text-xl"
            >
              <span className="text-[#00A3E0]">ETRYS</span>
              <span className="text-xs text-gray-400 font-normal hidden xl:inline">
                Reacondicionamiento
              </span>
            </Link>

            {/* Navigation Items */}
            <div className="flex items-center gap-1">
              {etrysNavigation.map((item) => (
                <div
                  key={item.name}
                  className="relative"
                  onMouseEnter={() => item.submenu && setOpenSubmenu(item.name)}
                  onMouseLeave={() => setOpenSubmenu(null)}
                >
                  <Link
                    href={item.href}
                    className={cn(
                      "flex items-center gap-1 px-3 xl:px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200",
                      isActive(item.href)
                        ? "bg-[#00A3E0] text-white"
                        : "text-gray-600 hover:text-[#00A3E0] hover:bg-gray-50"
                    )}
                  >
                    {item.name}
                    {item.submenu && (
                      <ChevronDown
                        size={14}
                        className={cn(
                          "transition-transform duration-200",
                          openSubmenu === item.name && "rotate-180"
                        )}
                      />
                    )}
                  </Link>

                  {/* Dropdown Submenu */}
                  <AnimatePresence>
                    {item.submenu && openSubmenu === item.name && (
                      <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        transition={{ duration: 0.15 }}
                        className="absolute top-full left-0 mt-1 w-56 bg-white rounded-xl shadow-xl border py-2 z-50"
                      >
                        {item.submenu.map((subItem) => (
                          <Link
                            key={subItem.name}
                            href={subItem.href}
                            className={cn(
                              "block px-4 py-2.5 text-sm transition-colors",
                              pathname === subItem.href
                                ? "bg-[#00A3E0]/10 text-[#00A3E0] font-medium"
                                : "text-gray-600 hover:bg-gray-50 hover:text-[#00A3E0]"
                            )}
                          >
                            {subItem.name}
                          </Link>
                        ))}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ))}
            </div>

            {/* CTA Button */}
            <Link
              href="/etrys/cotizaciones"
              className="px-4 py-2 bg-[#FF5500] hover:bg-[#E64D00] text-white text-sm font-medium rounded-lg transition-colors"
            >
              Solicitar Cotización
            </Link>
          </div>

          {/* Mobile Navigation */}
          <div className="lg:hidden flex items-center justify-between h-12">
            <Link href="/etrys" className="font-bold text-lg text-[#00A3E0]">
              ETRYS
            </Link>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
              aria-label={mobileMenuOpen ? "Cerrar menú" : "Abrir menú"}
            >
              {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Menu Dropdown */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.2 }}
              className="lg:hidden bg-white border-t overflow-hidden"
            >
              <div className="container-eminsa py-4 space-y-1">
                {etrysNavigation.map((item) => (
                  <div key={item.name}>
                    {item.submenu ? (
                      <div>
                        <button
                          onClick={() =>
                            setOpenSubmenu(
                              openSubmenu === item.name ? null : item.name
                            )
                          }
                          className={cn(
                            "flex items-center justify-between w-full px-4 py-3 rounded-lg text-left transition-colors",
                            isActive(item.href)
                              ? "bg-[#00A3E0]/10 text-[#00A3E0]"
                              : "text-gray-600 hover:bg-gray-50"
                          )}
                        >
                          <span className="font-medium">{item.name}</span>
                          <ChevronDown
                            size={18}
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
                              className="pl-4 mt-1 space-y-1"
                            >
                              {item.submenu.map((subItem) => (
                                <Link
                                  key={subItem.name}
                                  href={subItem.href}
                                  onClick={() => setMobileMenuOpen(false)}
                                  className={cn(
                                    "block px-4 py-2.5 rounded-lg text-sm transition-colors",
                                    pathname === subItem.href
                                      ? "bg-[#00A3E0]/10 text-[#00A3E0] font-medium"
                                      : "text-gray-500 hover:bg-gray-50 hover:text-[#00A3E0]"
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
                        onClick={() => setMobileMenuOpen(false)}
                        className={cn(
                          "block px-4 py-3 rounded-lg font-medium transition-colors",
                          isActive(item.href)
                            ? "bg-[#00A3E0]/10 text-[#00A3E0]"
                            : "text-gray-600 hover:bg-gray-50 hover:text-[#00A3E0]"
                        )}
                      >
                        {item.name}
                      </Link>
                    )}
                  </div>
                ))}

                {/* Mobile CTA */}
                <div className="pt-4 border-t mt-4">
                  <Link
                    href="/etrys/cotizaciones"
                    onClick={() => setMobileMenuOpen(false)}
                    className="block w-full px-4 py-3 bg-[#FF5500] hover:bg-[#E64D00] text-white text-center font-medium rounded-lg transition-colors"
                  >
                    Solicitar Cotización
                  </Link>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>

      {/* Content */}
      <main>{children}</main>
    </div>
  );
}
