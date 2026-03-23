// ============================================================================
// Contact Feature - Contact Info Component
// ============================================================================

'use client';

import { motion } from 'framer-motion';
import { 
  Phone, 
  Mail, 
  MapPin, 
  MessageCircle, 
  Facebook, 
  Instagram, 
  Linkedin 
} from 'lucide-react';
import { useTranslations } from 'next-intl';
import { contactInfo } from '@/config/navigation';
import { getWhatsAppUrl } from '@/utils/whatsapp';

/**
 * Información de contacto con datos de la empresa, redes sociales y mapa
 */
export function ContactInfo() {
  const t = useTranslations('contact');

  return (
    <motion.div
      initial={{ opacity: 0, x: -30 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      className="lg:col-span-2"
    >
      <div className="bg-linear-to-br from-[#00269b] to-[#00175d] rounded-3xl p-8 text-white h-full">
        <h3 className="text-2xl font-bold mb-6">{t('contactInfo.title')}</h3>

        {/* Información de contacto */}
        <div className="space-y-6 mb-10">
          <ContactInfoItem
            href="https://www.google.com/maps/place/GRUPO+EMINSA/@18.5668907,-70.0613034,17z"
            icon={<MapPin size={20} />}
            label={t('contactInfo.address.label')}
            value={t('contactInfo.address.value')}
            external
          />

          <ContactInfoItem
            href={`mailto:${contactInfo.email}`}
            icon={<Mail size={20} />}
            label={t('contactInfo.email.label')}
            value={contactInfo.email}
          />

          <ContactInfoItem
            href={`tel:${contactInfo.phone}`}
            icon={<Phone size={20} />}
            label={t('contactInfo.phone.label')}
            value={contactInfo.phone}
          />
        </div>

        {/* Redes Sociales */}
        <SocialLinks />

        {/* Botón de WhatsApp */}
        <WhatsAppButton whatsappNumber={contactInfo.whatsapp} />

        {/* Mapa de Google */}
        <GoogleMap />
      </div>
    </motion.div>
  );
}

// ============================================================================
// Sub-componentes
// ============================================================================

interface ContactInfoItemProps {
  href: string;
  icon: React.ReactNode;
  label: string;
  value: string;
  external?: boolean;
}

function ContactInfoItem({ href, icon, label, value, external }: ContactInfoItemProps) {
  const linkProps = external 
    ? { target: '_blank', rel: 'noopener noreferrer' } 
    : {};

  return (
    <a
      href={href}
      className="flex items-start gap-4 group"
      {...linkProps}
    >
      <div className="w-12 h-12 bg-white/10 rounded-xl flex items-center justify-center shrink-0 group-hover:bg-white/20 transition-colors">
        {icon}
      </div>
      <div>
        <p className="text-white/60 text-sm mb-1">{label}</p>
        <p className="font-semibold group-hover:text-[#0099ce] transition-colors">
          {value}
        </p>
      </div>
    </a>
  );
}

function SocialLinks() {
  const t = useTranslations('contact');

  const socials = [
    { 
      name: 'Facebook', 
      href: contactInfo.social.facebook, 
      icon: <Facebook size={20} />,
      hoverColor: 'hover:bg-[#1877F2]'
    },
    { 
      name: 'Instagram', 
      href: contactInfo.social.instagram, 
      icon: <Instagram size={20} />,
      hoverColor: 'hover:bg-[#E1306C]'
    },
    { 
      name: 'LinkedIn', 
      href: contactInfo.social.linkedin, 
      icon: <Linkedin size={20} />,
      hoverColor: 'hover:bg-[#0A66C2]'
    },
  ];

  return (
    <div className="pt-8 border-t border-white/10">
      <p className="text-white/60 text-sm mb-4">{t('contactInfo.followUs')}</p>
      <div className="flex gap-3">
        {socials.map((social) => (
          <a
            key={social.name}
            href={social.href}
            target="_blank"
            rel="noopener noreferrer"
            className={`w-10 h-10 bg-white/10 rounded-lg flex items-center justify-center ${social.hoverColor} transition-all`}
            title={social.name}
          >
            {social.icon}
          </a>
        ))}
      </div>
    </div>
  );
}

interface WhatsAppButtonProps {
  whatsappNumber: string;
}

function WhatsAppButton({ whatsappNumber }: WhatsAppButtonProps) {
  const t = useTranslations('contact');

  return (
    <a
      href={getWhatsAppUrl()}
      target="_blank"
      rel="noopener noreferrer"
      className="flex items-center justify-center gap-3 w-full px-6 py-4 bg-[#25D366] text-white font-semibold rounded-xl hover:bg-[#20BD5A] transition-all mt-8"
    >
      <MessageCircle size={22} />
      {t('contactInfo.whatsappButton')}
    </a>
  );
}

function GoogleMap() {
  const t = useTranslations('contact');

  const mapUrl = "https://www.google.com/maps?q=18.5668907,-70.0613034&hl=es&z=15&output=embed";
  const mapsLink = "https://www.google.com/maps/place/GRUPO+EMINSA/@18.5668907,-70.0613034,17z";

  return (
    <div className="mt-6">
      <p className="text-white/60 text-sm mb-3">{t('contactInfo.location')}</p>
      <div className="rounded-xl overflow-hidden border-2 border-white/20 shadow-lg">
        <iframe
          src={mapUrl}
          width="100%"
          height="180"
          style={{ border: 0 }}
          allowFullScreen
          loading="lazy"
          title="Ubicación de GRUPO EMINSA"
          className="w-full"
        />
      </div>
      <a
        href={mapsLink}
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center justify-center gap-2 text-sm text-white/70 hover:text-[#0099ce] transition-colors mt-3"
      >
        <MapPin size={14} />
        {t('contactInfo.viewMap')}
      </a>
    </div>
  );
}