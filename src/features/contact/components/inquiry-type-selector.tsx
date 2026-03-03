// ============================================================================
// Contact Feature - Inquiry Type Selector Component
// ============================================================================

'use client';

import { Package, Settings } from 'lucide-react';
import { useTranslations } from 'next-intl';
import type { InquiryTypeSelectorProps } from '../types';

/**
 * Selector de tipo de consulta (productos o servicios)
 */
export function InquiryTypeSelector({ 
  selectedType, 
  onSelect,
  error 
}: InquiryTypeSelectorProps) {
  const t = useTranslations('contact');

  return (
    <div>
      <label className="input-label">
        {t('form.fields.inquiryType.label')} <span className="text-red-500">*</span>
      </label>
      
      <div className="grid grid-cols-2 gap-4 mt-2">
        <InquiryTypeButton
          type="productos"
          isSelected={selectedType === 'productos'}
          onSelect={onSelect}
          icon={<Package size={32} />}
          label={t('form.inquiryType.products')}
          description={t('form.inquiryType.productsDescription')}
        />

        <InquiryTypeButton
          type="servicios"
          isSelected={selectedType === 'servicios'}
          onSelect={onSelect}
          icon={<Settings size={32} />}
          label={t('form.inquiryType.services')}
          description={t('form.inquiryType.servicesDescription')}
        />
      </div>

      {error && (
        <p className="text-red-500 text-xs mt-2">{error}</p>
      )}

      {/* Hidden input para validación de formulario HTML */}
      <input
        type="hidden"
        name="tipoConsulta"
        value={selectedType}
        required={!selectedType}
      />
    </div>
  );
}

// ============================================================================
// Sub-componentes
// ============================================================================

interface InquiryTypeButtonProps {
  type: 'productos' | 'servicios';
  isSelected: boolean;
  onSelect: (type: 'productos' | 'servicios') => void;
  icon: React.ReactNode;
  label: string;
  description: string;
}

function InquiryTypeButton({
  type,
  isSelected,
  onSelect,
  icon,
  label,
  description
}: InquiryTypeButtonProps) {
  const baseClasses = 'flex flex-col items-center justify-center p-6 rounded-xl border-2 transition-all';
  const selectedClasses = 'border-[#00269b] bg-[#00269b]/10';
  const unselectedClasses = 'border-gray-200 hover:border-gray-300 hover:bg-gray-50';

  return (
    <button
      type="button"
      onClick={() => onSelect(type)}
      className={`${baseClasses} ${isSelected ? selectedClasses : unselectedClasses}`}
    >
      <div className={`mb-3 ${isSelected ? 'text-[#00269b]' : 'text-gray-400'}`}>
        {icon}
      </div>
      <span className={`font-semibold ${isSelected ? 'text-[#00269b]' : 'text-gray-700'}`}>
        {label}
      </span>
      <span className="text-sm text-gray-500 mt-1">
        {description}
      </span>
    </button>
  );
}