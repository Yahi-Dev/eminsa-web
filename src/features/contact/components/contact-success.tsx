// ============================================================================
// Contact Feature - Success Message Component
// ============================================================================

'use client';

import { motion } from 'framer-motion';
import { CheckCircle2 } from 'lucide-react';
import { useTranslations } from 'next-intl';
import type { ContactSuccessProps } from '../types';

/**
 * Mensaje de éxito mostrado después de enviar el formulario
 */
export function ContactSuccess({ onReset }: ContactSuccessProps) {
  const t = useTranslations('contact');

  return (
    <div className="text-center py-12">
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ type: 'spring', stiffness: 200, damping: 20 }}
        className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6"
      >
        <CheckCircle2 className="w-10 h-10 text-green-600" />
      </motion.div>
      
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
      >
        <h3 className="text-2xl font-bold text-[#001689] mb-3">
          {t('form.success.title')}
        </h3>
        <p className="text-[#76777A] mb-2">
          {t('form.success.description1')}
        </p>
        <p className="text-[#76777A] mb-8">
          {t('form.success.description2')}
        </p>
        <button
          onClick={onReset}
          className="btn-primary"
        >
          {t('form.success.anotherMessage')}
        </button>
      </motion.div>
    </div>
  );
}