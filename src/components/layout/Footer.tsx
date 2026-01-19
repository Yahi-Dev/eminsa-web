"use client";

import Link from "next/link";
import { 
  Phone, 
  Mail, 
  MapPin, 
  Facebook, 
  Instagram, 
  Linkedin, 
  Youtube,
  ArrowRight,
  MessageCircle
} from "lucide-react";
import { contactInfo, mainNavigation, divisions, certifications } from "@/data/navigation";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-[#001689] text-white">
      {/* CTA Section */}

      {/* Main Footer */}
      <div className="container-eminsa py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12">
          {/* Company Info */}
          <div className="lg:col-span-2">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 bg-white/10 rounded-lg flex items-center justify-center">
                <svg viewBox="0 0 50 50" className="w-8 h-8 text-white">
                  <circle cx="25" cy="25" r="4" fill="currentColor"/>
                  <circle cx="25" cy="25" r="10" fill="none" stroke="currentColor" strokeWidth="2"/>
                  <circle cx="25" cy="25" r="16" fill="none" stroke="currentColor" strokeWidth="2"/>
                  <circle cx="25" cy="25" r="22" fill="none" stroke="currentColor" strokeWidth="2"/>
                  <path d="M25 3 L25 15" stroke="currentColor" strokeWidth="3"/>
                </svg>
              </div>
              <div>
                <div className="flex items-baseline gap-1">
                  <span className="text-white/70 text-lg font-light">Grupo</span>
                  <span className="text-white text-xl font-bold">Eminsa</span>
                </div>
                <span className="text-white/60 text-xs italic">experiencia y servicio</span>
              </div>
            </div>
            <p className="text-white/70 mb-6 max-w-md">
              Más de 50 años siendo líderes en transformadores eléctricos de distribución 
              en República Dominicana y el Caribe. Fabricación, importación, reparación y servicios.
            </p>
            
            {/* Contact Info */}
            <div className="space-y-3 mb-6">
              <a 
                href={`tel:${contactInfo.phone}`}
                className="flex items-center gap-3 text-white/70 hover:text-white transition-colors"
              >
                <Phone size={18} />
                <span>{contactInfo.phone}</span>
              </a>
              <a 
                href={`mailto:${contactInfo.email}`}
                className="flex items-center gap-3 text-white/70 hover:text-white transition-colors"
              >
                <Mail size={18} />
                <span>{contactInfo.email}</span>
              </a>
              <div className="flex items-start gap-3 text-white/70">
                <MapPin size={18} className="mt-1 flex-shrink-0" />
                <span>{contactInfo.address}</span>
              </div>
            </div>

            {/* Social Links */}
            <div className="flex items-center gap-4">
              <a
                href={contactInfo.social.facebook}
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 bg-white/10 rounded-lg flex items-center justify-center hover:bg-white/20 transition-colors"
              >
                <Facebook size={20} />
              </a>
              <a
                href={contactInfo.social.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 bg-white/10 rounded-lg flex items-center justify-center hover:bg-white/20 transition-colors"
              >
                <Instagram size={20} />
              </a>
              <a
                href={contactInfo.social.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 bg-white/10 rounded-lg flex items-center justify-center hover:bg-white/20 transition-colors"
              >
                <Linkedin size={20} />
              </a>
              <a
                href={contactInfo.social.youtube}
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 bg-white/10 rounded-lg flex items-center justify-center hover:bg-white/20 transition-colors"
              >
                <Youtube size={20} />
              </a>
            </div>
          </div>

          {/* Divisions */}
          <div>
            <h4 className="text-lg font-bold mb-6">Divisiones</h4>
            <ul className="space-y-3">
              {divisions.map((division) => (
                <li key={division.id}>
                  <Link
                    href={division.href}
                    className="flex items-center gap-2 text-white/70 hover:text-white transition-colors group"
                  >
                    <span
                      className="w-2 h-2 rounded-full"
                      style={{ backgroundColor: division.color }}
                    />
                    <span>{division.name}</span>
                    <ArrowRight 
                      size={14} 
                      className="opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all" 
                    />
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-bold mb-6">Enlaces Rápidos</h4>
            <ul className="space-y-3">
              <li>
                <Link href="/proyectos" className="text-white/70 hover:text-white transition-colors">
                  Proyectos
                </Link>
              </li>
              <li>
                <Link href="/noticias" className="text-white/70 hover:text-white transition-colors">
                  Noticias
                </Link>
              </li>
              <li>
                <Link href="/contacto" className="text-white/70 hover:text-white transition-colors">
                  Contacto
                </Link>
              </li>
              <li>
                <Link href="/nosotros" className="text-white/70 hover:text-white transition-colors">
                  Sobre Nosotros
                </Link>
              </li>
              <li>
                <Link href="/carreras" className="text-white/70 hover:text-white transition-colors">
                  Trabaja con Nosotros
                </Link>
              </li>
              <li>
                <Link href="/recursos/calculadora" className="text-white/70 hover:text-white transition-colors">
                  Calculadora kVA
                </Link>
              </li>
            </ul>
          </div>

          {/* Certifications */}
          <div>
            <h4 className="text-lg font-bold mb-6">Certificaciones</h4>
            <div className="space-y-4">
              <div className="flex items-center gap-4 bg-white/5 rounded-lg p-3">
                <div className="w-16 h-16 bg-white rounded-lg flex items-center justify-center p-2">
                  <img 
                    src="/images/SelloAENORISO9001_NEG.png" 
                    alt="ISO 9001"
                    className="w-full h-full object-contain"
                  />
                </div>
                <div>
                  <p className="font-semibold text-sm">ISO 9001:2015</p>
                  <p className="text-white/60 text-xs">Gestión de Calidad</p>
                </div>
              </div>
              <div className="flex items-center gap-4 bg-white/5 rounded-lg p-3">
                <div className="w-16 h-16 bg-white rounded-lg flex items-center justify-center p-2">
                  <img 
                    src="/images/IQNET_RCMark_PosCMYK.png" 
                    alt="IQNET"
                    className="w-full h-full object-contain"
                  />
                </div>
                <div>
                  <p className="font-semibold text-sm">IQNET</p>
                  <p className="text-white/60 text-xs">Certificación Internacional</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-white/10">
        <div className="container-eminsa py-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-white/60 text-sm text-center md:text-left">
              © {currentYear} Grupo Eminsa. Todos los derechos reservados.
            </p>
            <div className="flex items-center gap-6">
              <Link 
                href="/privacidad" 
                className="text-white/60 text-sm hover:text-white transition-colors"
              >
                Política de Privacidad
              </Link>
              <Link 
                href="/terminos" 
                className="text-white/60 text-sm hover:text-white transition-colors"
              >
                Términos y Condiciones
              </Link>
              <Link 
                href="/login" 
                className="text-white/30 text-sm hover:text-white/60 transition-colors"
                title="Acceso Administrador"
              >
                Admin
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
