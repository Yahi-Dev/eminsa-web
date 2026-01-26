// ============================================================================
// Contact Feature - Contact Form Component
// ============================================================================

'use client';

import { motion } from 'framer-motion';
import { Send, Mail, User, Home, AlertCircle } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { ContactSuccess } from './contact-success';
import { InquiryTypeSelector } from './inquiry-type-selector';
import { TransformerFields } from './transformer-fields';
import type { UseContactFormReturn } from '../types';
import { FIELD_LIMITS } from '../data/constants';

interface ContactFormProps {
  form: UseContactFormReturn;
}

/**
 * Formulario principal de contacto
 */
export function ContactForm({ form }: ContactFormProps) {
  const t = useTranslations('contact');

  const {
    formData,
    formErrors,
    isSubmitting,
    isSubmitted,
    errorMessage,
    showTransformadorFields,
    categoriasDisponibles,
    translatedOptions,
    maskedInputRef,
    handleSubmit,
    handleChange,
    handleTipoConsultaClick,
    getTipoIdentificacion,
    resetForm,
  } = form;

  // Validación para habilitar el botón de envío
  const isSubmitDisabled = 
    isSubmitting || 
    !formData.tipoConsulta || 
    !formData.categoria || 
    !formData.identificacion || 
    !formData.direccion ||
    (showTransformadorFields && (
      !formData.potenciaKVA || 
      !formData.fase || 
      !formData.voltajePrimario || 
      !formData.voltajeSecundario || 
      !formData.tipoTransformador || 
      !formData.norma || 
      !formData.zonaInstalacion
    ));

  if (isSubmitted) {
    return <ContactSuccess onReset={resetForm} />;
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Error Message Alert */}
      {errorMessage && (
        <ErrorAlert message={errorMessage} />
      )}

      {/* Nombre y Empresa */}
      <div className="grid md:grid-cols-2 gap-6">
        <TextInputField
          name="nombre"
          label={t('form.fields.fullName.label')}
          placeholder={t('form.fields.fullName.placeholder')}
          value={formData.nombre}
          error={formErrors.nombre}
          maxLength={FIELD_LIMITS.nombre}
          onChange={handleChange}
          disabled={isSubmitting}
          icon={<User className="w-5 h-5" />}
          required
          showCounter
          counterText={t('form.characters', { max: FIELD_LIMITS.nombre })}
        />

        <TextInputField
          name="empresa"
          label={t('form.fields.company.label')}
          placeholder={t('form.fields.company.placeholder')}
          value={formData.empresa}
          error={formErrors.empresa}
          maxLength={FIELD_LIMITS.empresa}
          onChange={handleChange}
          disabled={isSubmitting}
          showCounter
          counterText={t('form.characters', { max: FIELD_LIMITS.empresa })}
        />
      </div>

      {/* Identificación y Teléfono */}
      <div className="grid md:grid-cols-2 gap-6">
        <IdentificationField
          value={formData.identificacion}
          error={formErrors.identificacion}
          onChange={handleChange}
          disabled={isSubmitting}
          identificationType={getTipoIdentificacion()}
        />

        <TextInputField
          name="telefono"
          label={t('form.fields.phone.label')}
          placeholder="+1 809-000-0000"
          value={formData.telefono}
          error={formErrors.telefono}
          onChange={handleChange}
          disabled={isSubmitting}
          inputRef={maskedInputRef}
          type="tel"
          required
        />
      </div>

      {/* Email y Dirección */}
      <div className="grid md:grid-cols-2 gap-6">
        <TextInputField
          name="email"
          label={t('form.fields.email.label')}
          placeholder={t('form.fields.email.placeholder')}
          value={formData.email}
          error={formErrors.email}
          onChange={handleChange}
          disabled={isSubmitting}
          icon={<Mail className="w-5 h-5" />}
          type="email"
          required
        />

        <TextInputField
          name="direccion"
          label={t('form.fields.address.label')}
          placeholder={t('form.fields.address.placeholder')}
          value={formData.direccion}
          error={formErrors.direccion}
          maxLength={FIELD_LIMITS.direccion}
          onChange={handleChange}
          disabled={isSubmitting}
          icon={<Home className="w-5 h-5" />}
          required
          showCounter
          counterText={t('form.characters', { max: FIELD_LIMITS.direccion })}
        />
      </div>

      {/* Selector de Tipo de Consulta */}
      <InquiryTypeSelector
        selectedType={formData.tipoConsulta}
        onSelect={handleTipoConsultaClick}
        error={formErrors.tipoConsulta}
      />

      {/* Selector de Categoría */}
      {formData.tipoConsulta && (
        <CategorySelector
          tipoConsulta={formData.tipoConsulta}
          value={formData.categoria}
          error={formErrors.categoria}
          options={categoriasDisponibles}
          onChange={handleChange}
          disabled={isSubmitting}
        />
      )}

      {/* Campos de Transformador */}
      {showTransformadorFields && (
        <TransformerFields
          formData={formData}
          formErrors={formErrors}
          isSubmitting={isSubmitting}
          onFieldChange={handleChange}
          translatedOptions={translatedOptions}
        />
      )}

      {/* Mensaje */}
      <MessageField
        value={formData.mensaje}
        error={formErrors.mensaje}
        onChange={handleChange}
        disabled={isSubmitting}
      />

      {/* Botón de Envío */}
      <SubmitButton 
        isSubmitting={isSubmitting} 
        disabled={isSubmitDisabled} 
      />

      {/* Aviso Legal */}
      <LegalNotice />
    </form>
  );
}

// ============================================================================
// Sub-componentes
// ============================================================================

function ErrorAlert({ message }: { message: string }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-red-50 border border-red-200 rounded-lg p-4 flex items-start gap-3"
    >
      <AlertCircle className="w-5 h-5 text-red-600 shrink-0 mt-0.5" />
      <p className="text-red-700 text-sm">{message}</p>
    </motion.div>
  );
}

interface TextInputFieldProps {
  name: string;
  label: string;
  placeholder: string;
  value: string;
  error?: string;
  maxLength?: number;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  disabled?: boolean;
  icon?: React.ReactNode;
  type?: 'text' | 'email' | 'tel';
  required?: boolean;
  showCounter?: boolean;
  counterText?: string;
  inputRef?: React.RefCallback<HTMLInputElement>;
}

function TextInputField({
  name,
  label,
  placeholder,
  value,
  error,
  maxLength,
  onChange,
  disabled,
  icon,
  type = 'text',
  required,
  showCounter,
  counterText,
  inputRef
}: TextInputFieldProps) {
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
          type={type}
          name={name}
          value={value}
          onChange={onChange}
          ref={inputRef}
          required={required}
          maxLength={maxLength}
          disabled={disabled}
          className={`input-field ${icon ? 'pl-10' : ''} ${
            error ? 'border-red-500 focus:ring-red-200' : ''
          }`}
          placeholder={placeholder}
          autoComplete={name === 'nombre' ? 'name' : name === 'email' ? 'email' : name === 'telefono' ? 'tel' : 'off'}
        />
      </div>
      {error && (
        <p className="text-red-500 text-xs mt-1">{error}</p>
      )}
      {showCounter && (
        <p className="text-[#76777A] text-xs mt-2">
          {value.length} / {counterText}
        </p>
      )}
    </div>
  );
}

interface IdentificationFieldProps {
  value: string;
  error?: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  disabled?: boolean;
  identificationType: string;
}

function IdentificationField({
  value,
  error,
  onChange,
  disabled,
  identificationType
}: IdentificationFieldProps) {
  const t = useTranslations('contact');
  const cleanDigits = value.replace(/\D/g, '').length;

  return (
    <div>
      <label className="input-label">
        {t('form.fields.identification.label')} <span className="text-red-500">*</span>
        {value && (
          <span className="ml-2 text-xs font-semibold text-[#001689]">
            ({identificationType})
          </span>
        )}
      </label>
      <input
        type="text"
        name="identificacion"
        value={value}
        onChange={onChange}
        required
        disabled={disabled}
        maxLength={13}
        className={`input-field ${error ? 'border-red-500 focus:ring-red-200' : ''}`}
        placeholder={t('form.fields.identification.placeholder')}
        autoComplete="off"
      />
      {error && (
        <p className="text-red-500 text-xs mt-1">{error}</p>
      )}
      <div className="text-[#76777A] text-xs mt-2 space-y-1">
        <p>{t('form.fields.identification.rncInfo')}</p>
        <p>{t('form.fields.identification.idInfo')}</p>
        <p className="mt-1 font-medium">
          {t('form.fields.identification.digits', { count: cleanDigits })}
        </p>
      </div>
    </div>
  );
}

interface CategorySelectorProps {
  tipoConsulta: 'productos' | 'servicios';
  value: string;
  error?: string;
  options: string[];
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  disabled?: boolean;
}

function CategorySelector({
  tipoConsulta,
  value,
  error,
  options,
  onChange,
  disabled
}: CategorySelectorProps) {
  const t = useTranslations('contact');

  const label = tipoConsulta === 'productos'
    ? t('form.fields.category.productsLabel')
    : t('form.fields.category.servicesLabel');

  const helpText = tipoConsulta === 'productos'
    ? t('form.fields.category.productsHelp')
    : t('form.fields.category.servicesHelp');

  return (
    <div>
      <label className="input-label">
        {label} <span className="text-red-500">*</span>
      </label>
      <select
        name="categoria"
        value={value}
        onChange={onChange}
        required
        disabled={disabled}
        className={`input-field ${error ? 'border-red-500 focus:ring-red-200' : ''}`}
      >
        <option value="">{t('form.fields.category.selectOption')}</option>
        {options.map((categoria) => (
          <option key={categoria} value={categoria}>
            {categoria}
          </option>
        ))}
      </select>
      {error && (
        <p className="text-red-500 text-xs mt-1">{error}</p>
      )}
      <p className="text-[#76777A] text-xs mt-2">{helpText}</p>
    </div>
  );
}

interface MessageFieldProps {
  value: string;
  error?: string;
  onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  disabled?: boolean;
}

function MessageField({ value, error, onChange, disabled }: MessageFieldProps) {
  const t = useTranslations('contact');

  return (
    <div>
      <label className="input-label">
        {t('form.fields.message.label')} <span className="text-red-500">*</span>
      </label>
      <textarea
        name="mensaje"
        value={value}
        onChange={onChange}
        required
        disabled={disabled}
        maxLength={FIELD_LIMITS.mensaje}
        rows={5}
        className={`input-field resize-none ${error ? 'border-red-500 focus:ring-red-200' : ''}`}
        placeholder={t('form.fields.message.placeholder')}
      />
      {error && (
        <p className="text-red-500 text-xs mt-1">{error}</p>
      )}
      <p className="text-[#76777A] text-xs mt-2">
        {value.length} / {t('form.characters', { max: FIELD_LIMITS.mensaje })}
      </p>
    </div>
  );
}

interface SubmitButtonProps {
  isSubmitting: boolean;
  disabled: boolean;
}

function SubmitButton({ isSubmitting, disabled }: SubmitButtonProps) {
  const t = useTranslations('contact');

  return (
    <button
      type="submit"
      disabled={disabled}
      className="btn-primary w-full justify-center disabled:opacity-50 disabled:cursor-not-allowed transition-all"
    >
      {isSubmitting ? (
        <>
          <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
          {t('form.submitting')}
        </>
      ) : (
        <>
          {t('form.submitButton')}
          <Send size={18} />
        </>
      )}
    </button>
  );
}

function LegalNotice() {
  const t = useTranslations('contact');

  return (
    <p className="text-[#76777A] text-xs text-center">
      {t('form.legalNotice.part1')}{' '}
      <a href="/privacidad" className="text-[#001689] hover:underline font-semibold">
        {t('form.legalNotice.privacyPolicy')}
      </a>
      {' '}{t('form.legalNotice.and')}{' '}
      <a href="/terminos" className="text-[#001689] hover:underline font-semibold">
        {t('form.legalNotice.termsOfService')}
      </a>
    </p>
  );
}