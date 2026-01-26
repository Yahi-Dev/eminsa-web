// ============================================================================
// Contact Feature - Transformer Fields Component
// ============================================================================

'use client';

import { motion } from 'framer-motion';
import { Zap, Power, GitBranch, Cpu, Battery } from 'lucide-react';
import { useTranslations } from 'next-intl';
import type { TransformerFieldsProps, SelectOption } from '../types';

/**
 * Campos específicos para especificaciones de transformadores
 */
export function TransformerFields({
  formData,
  formErrors,
  isSubmitting,
  onFieldChange,
  translatedOptions
}: TransformerFieldsProps) {
  const t = useTranslations('contact');

  return (
    <motion.div
      initial={{ opacity: 0, height: 0 }}
      animate={{ opacity: 1, height: 'auto' }}
      transition={{ duration: 0.3 }}
      className="bg-[#001689]/5 border border-[#001689]/20 rounded-xl p-6 space-y-6"
    >
      {/* Header */}
      <div className="flex items-center gap-3 mb-4">
        <Zap className="w-6 h-6 text-[#001689]" />
        <h3 className="text-lg font-bold text-[#001689]">
          {t('form.transformer.title')}
        </h3>
      </div>

      {/* Primera fila: Potencia y Fase */}
      <div className="grid md:grid-cols-2 gap-6">
        <InputField
          name="potenciaKVA"
          label={t('form.transformer.power.label')}
          placeholder={t('form.transformer.power.placeholder')}
          value={formData.potenciaKVA}
          error={formErrors.potenciaKVA}
          icon={<Power className="w-5 h-5" />}
          onChange={onFieldChange}
          disabled={isSubmitting}
          required
          inputMode="decimal"
        />

        <SelectField
          name="fase"
          label={t('form.transformer.phase.label')}
          placeholder={t('form.transformer.phase.select')}
          value={formData.fase}
          error={formErrors.fase}
          options={translatedOptions.fases}
          icon={<GitBranch className="w-5 h-5" />}
          onChange={onFieldChange}
          disabled={isSubmitting}
          required
        />
      </div>

      {/* Segunda fila: Voltajes */}
      <div className="grid md:grid-cols-2 gap-6">
        <InputField
          name="voltajePrimario"
          label={t('form.transformer.primaryVoltage.label')}
          placeholder={t('form.transformer.primaryVoltage.placeholder')}
          value={formData.voltajePrimario}
          error={formErrors.voltajePrimario}
          icon={<Cpu className="w-5 h-5" />}
          onChange={onFieldChange}
          disabled={isSubmitting}
          required
          inputMode="decimal"
        />

        <InputField
          name="voltajeSecundario"
          label={t('form.transformer.secondaryVoltage.label')}
          placeholder={t('form.transformer.secondaryVoltage.placeholder')}
          value={formData.voltajeSecundario}
          error={formErrors.voltajeSecundario}
          icon={<Battery className="w-5 h-5" />}
          onChange={onFieldChange}
          disabled={isSubmitting}
          required
          inputMode="decimal"
        />
      </div>

      {/* Tercera fila: Tipo y Norma */}
      <div className="grid md:grid-cols-2 gap-6">
        <SelectField
          name="tipoTransformador"
          label={t('form.transformer.type.label')}
          placeholder={t('form.transformer.type.select')}
          value={formData.tipoTransformador}
          error={formErrors.tipoTransformador}
          options={translatedOptions.tiposTransformadores}
          onChange={onFieldChange}
          disabled={isSubmitting}
          required
        />

        <SelectField
          name="norma"
          label={t('form.transformer.standard.label')}
          placeholder={t('form.transformer.standard.select')}
          value={formData.norma}
          error={formErrors.norma}
          options={translatedOptions.normas}
          onChange={onFieldChange}
          disabled={isSubmitting}
          required
        />
      </div>

      {/* Cuarta fila: Zona de instalación */}
      <SelectField
        name="zonaInstalacion"
        label={t('form.transformer.zone.label')}
        placeholder={t('form.transformer.zone.select')}
        value={formData.zonaInstalacion}
        error={formErrors.zonaInstalacion}
        options={translatedOptions.zonasInstalacion}
        onChange={onFieldChange}
        disabled={isSubmitting}
        required
      />
    </motion.div>
  );
}

// ============================================================================
// Sub-componentes
// ============================================================================

interface InputFieldProps {
  name: string;
  label: string;
  placeholder: string;
  value: string;
  error?: string;
  icon?: React.ReactNode;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  disabled?: boolean;
  required?: boolean;
  inputMode?: 'text' | 'decimal' | 'numeric';
}

function InputField({
  name,
  label,
  placeholder,
  value,
  error,
  icon,
  onChange,
  disabled,
  required,
  inputMode = 'text'
}: InputFieldProps) {
  return (
    <div>
      <label className="input-label">
        {label} {required && <span className="text-red-500">*</span>}
      </label>
      <div className="relative">
        {icon && (
          <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
            {icon}
          </div>
        )}
        <input
          type="text"
          name={name}
          value={value}
          onChange={onChange}
          required={required}
          disabled={disabled}
          inputMode={inputMode}
          className={`input-field ${icon ? 'pl-10' : ''} ${
            error ? 'border-red-500 focus:ring-red-200' : ''
          }`}
          placeholder={placeholder}
        />
      </div>
      {error && (
        <p className="text-red-500 text-xs mt-1">{error}</p>
      )}
    </div>
  );
}

interface SelectFieldProps {
  name: string;
  label: string;
  placeholder: string;
  value: string;
  error?: string;
  options: SelectOption[];
  icon?: React.ReactNode;
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  disabled?: boolean;
  required?: boolean;
}

function SelectField({
  name,
  label,
  placeholder,
  value,
  error,
  options,
  icon,
  onChange,
  disabled,
  required
}: SelectFieldProps) {
  return (
    <div>
      <label className="input-label">
        {label} {required && <span className="text-red-500">*</span>}
      </label>
      <div className="relative">
        {icon && (
          <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
            {icon}
          </div>
        )}
        <select
          name={name}
          value={value}
          onChange={onChange}
          required={required}
          disabled={disabled}
          className={`input-field ${icon ? 'pl-10' : ''} ${
            error ? 'border-red-500 focus:ring-red-200' : ''
          }`}
        >
          <option value="">{placeholder}</option>
          {options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </div>
      {error && (
        <p className="text-red-500 text-xs mt-1">{error}</p>
      )}
    </div>
  );
}