"use client";

import Image from "next/image";
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
import { contactInfo, mainNavigation, divisions, certifications } from "@/config/navigation";
import { useTranslations } from "next-intl";

export default function Footer() {
  const t = useTranslations('footer');
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gradient-to-r from-[#00269b] to-[#00175d] text-white">
      {/* Main Footer */}
      <div className="container-eminsa py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12">
          {/* Company Info */}
          <div className="lg:col-span-2">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 bg-white/10 rounded-lg flex items-center justify-center">
                <svg viewBox="0 0 50 50" className="w-8 h-8 text-white">
                  <circle cx="25" cy="25" r="4" fill="currentColor" />
                  <circle cx="25" cy="25" r="10" fill="none" stroke="currentColor" strokeWidth="2" />
                  <circle cx="25" cy="25" r="16" fill="none" stroke="currentColor" strokeWidth="2" />
                  <circle cx="25" cy="25" r="22" fill="none" stroke="currentColor" strokeWidth="2" />
                  <path d="M25 3 L25 15" stroke="currentColor" strokeWidth="3" />
                </svg>
              </div>
              <div>
                <div className="flex items-baseline gap-1">
                  <span className="text-white/70 text-lg font-light">{t('company.group')}</span>
                  <span className="text-white text-xl font-bold">{t('company.name')}</span>
                </div>
                <span className="text-white/60 text-xs italic">{t('company.tagline')}</span>
              </div>
            </div>
            <p className="text-white/70 mb-6 max-w-md text-justify">
              {t('company.description.line1')}
              <br />
              <br />
              {t('company.description.line2')}
            </p>

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
            </div>
          </div>

          {/* Divisions */}
          <div>
            <h4 className="text-lg font-bold mb-6">{t('divisions.title')}</h4>
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
            <h4 className="text-lg font-bold mb-6">{t('quickLinks.title')}</h4>
            <ul className="space-y-3">
              <li>
                <Link href="/proyectos" className="text-white/70 hover:text-white transition-colors">
                  {t('quickLinks.projects')}
                </Link>
              </li>
              <li>
                <Link href="/noticias" className="text-white/70 hover:text-white transition-colors">
                  {t('quickLinks.news')}
                </Link>
              </li>
              <li>
                <Link href="/contacto" className="text-white/70 hover:text-white transition-colors">
                  {t('quickLinks.contact')}
                </Link>
              </li>
              <li>
                <Link href="/nosotros" className="text-white/70 hover:text-white transition-colors">
                  {t('quickLinks.about')}
                </Link>
              </li>
              <li>
                <Link href="/carreras" className="text-white/70 hover:text-white transition-colors">
                  {t('quickLinks.careers')}
                </Link>
              </li>
              <li>
                <Link href="/mtn/recursos/calculadora" className="text-white/70 hover:text-white transition-colors">
                  {t('quickLinks.kvaCalculator')}
                </Link>
              </li>
            </ul>
          </div>

          {/* Certifications & Standards */}
          <div>
            <h4 className="text-lg font-bold mb-6">{t('certifications.title')}</h4>
            <div className="space-y-3">
              <div className="flex items-center gap-3 bg-white/5 rounded-lg p-2.5">
                <div className="w-11 h-11 bg-white rounded-md flex items-center justify-center p-1.5 shrink-0">
                  <Image
                    src="/images/SelloAENORISO9001_NEG.png"
                    alt="ISO 9001"
                    width={44}
                    height={44}
                    className="object-contain"
                  />
                </div>
                <div>
                  <p className="font-semibold text-sm">ISO 9001:2015</p>
                  <p className="text-white/60 text-xs">{t('certifications.iso9001')}</p>
                </div>
              </div>
              <div className="flex items-center gap-3 bg-white/5 rounded-lg p-2.5">
                <div className="w-11 h-11 bg-white rounded-md flex items-center justify-center p-1.5 shrink-0">
                  <Image
                    src="/images/IQNET_RCMark_PosCMYK.png"
                    alt="IQNET"
                    width={44}
                    height={44}
                    className="object-contain"
                  />
                </div>
                <div>
                  <p className="font-semibold text-sm">IQNET</p>
                  <p className="text-white/60 text-xs">{t('certifications.iqnet')}</p>
                </div>
              </div>
              <div className="flex items-center gap-3 bg-white/5 rounded-lg p-2.5">
                <div className="w-11 h-11 bg-[#00175d] rounded-md flex items-center justify-center shrink-0">
                  <span className="text-white font-bold text-[11px]">ANSI</span>
                </div>
                <div>
                  <p className="font-semibold text-sm">ANSI C57</p>
                  <p className="text-white/60 text-xs">{t('certifications.ansi')}</p>
                </div>
              </div>
              <div className="flex items-center gap-3 bg-white/5 rounded-lg p-2.5">
                <div className="w-11 h-11 bg-[#009e49] rounded-md flex items-center justify-center shrink-0">
                  <span className="text-white font-bold text-[11px]">DOE</span>
                </div>
                <div>
                  <p className="font-semibold text-sm">DOE-2016</p>
                  <p className="text-white/60 text-xs">{t('certifications.doe')}</p>
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
            <p className="text-sm text-center md:text-left">
              <span className="text-white">© {currentYear} GRUPO EMINSA</span>
              <span className="text-white/60">. {t('bottomBar.rights')}</span>
            </p>
            <div className="flex items-center gap-6">
              <p className="text-sm text-center md:text-left">
                <span className="text-white/60">{t('bottomBar.websiteBy')} </span>
                <Link href="https://www.linkedin.com/in/yahivas-dev/" className="text-white/60 text-sm hover:text-white transition-colors">
                  Yahinniel Vásquez
                </Link>
              </p>
              <Link
                href="/login"
                className="text-white/30 text-sm hover:text-white/60 transition-colors"
                title={t('bottomBar.adminAccess')}
              >
                {t('bottomBar.admin')}
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}