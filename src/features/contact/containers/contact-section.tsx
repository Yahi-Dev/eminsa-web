// ============================================================================
// Contact Feature - Main Container Component
// ============================================================================

'use client';

import { motion } from 'framer-motion';
import { useTranslations } from 'next-intl';
import { ContactHero } from '../components/contact-hero';
import { ContactInfo } from '../components/contact-info';
import { useContactForm } from '../hooks/use-contact-form';
import { ContactForm } from '..';


/**
 * Contenedor principal de la sección de contacto
 * Integra todos los componentes y maneja el estado del formulario
 */
export function ContactSection() {
  const form = useContactForm();

  return (
    <>
      {/* Hero Section */}
      <ContactHero />

      {/* Main Contact Section */}
      <section 
        id="contacto" 
        className="py-20 lg:py-32 bg-gray-50 relative overflow-hidden"
      >
        {/* Background decoration */}
        <BackgroundDecoration />

        <div className="container-eminsa relative">
          {/* Section Header - removed per design spec */}

          {/* Main Grid: Contact Info + Form */}
          <div className="grid lg:grid-cols-5 gap-12">
            {/* Contact Info (2 columns) */}
            <ContactInfo />

            {/* Contact Form (3 columns) */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="lg:col-span-3"
            >
              <div className="bg-white rounded-3xl shadow-xl p-8 lg:p-10">
                <ContactForm form={form} />
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </>
  );
}

// ============================================================================
// Sub-componentes privados
// ============================================================================

function BackgroundDecoration() {
  return (
    <div className="absolute inset-0">
      <div className="absolute top-0 right-0 w-150 h-150 bg-[#001689]/5 rounded-full blur-[100px]" />
    </div>
  );
}

function SectionHeader() {
  const t = useTranslations('contact');

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      className="text-center max-w-3xl mx-auto mb-16"
    >
      <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-[#001689] mb-4">
        {t('form.sectionTitle.part1')}{' '}
        <span className="text-[#00A3E0]">{t('form.sectionTitle.part2')}</span>
      </h2>
      <p className="text-[#76777A]">
        {t('form.sectionDescription')}
      </p>
    </motion.div>
  );
}

// ============================================================================
// Export Default para uso directo
// ============================================================================

export default ContactSection;