// ============================================================================
// Contact Feature - Hero Section Component
// ============================================================================

'use client';

import { useTranslations } from 'next-intl';

export function ContactHero() {
  const t = useTranslations('contact');

  return (
    <section className="pt-32 pb-16 bg-gradient-to-br from-[#001689] to-[#000E53] text-white">
      <div className="container-eminsa">
        <div className="max-w-2xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
            {t('hero.title')}
          </h1>
          <p className="text-xl text-white/90">
            {t('hero.description')}
          </p>
        </div>
      </div>
    </section>
  );
}