// ============================================================================
// Contact Feature - Transformer Fields Component
// ============================================================================

'use client';

import { motion } from 'framer-motion';
import { Zap, Power, GitBranch, Cpu, Battery, Plus, Trash2, Hash } from 'lucide-react';
import { useTranslations } from 'next-intl';
import type { TransformerFieldsProps, SelectOption, TransformerSpec } from '../types';

/**
 * Campos específicos para especificaciones de transformadores
 */
export function TransformerFields({
  formData,
  formErrors,
  isSubmitting,
  onTransformersChange,
  translatedOptions
}: TransformerFieldsProps) {
  const t = useTranslations('contact');

  // Función para agregar un nuevo transformador
  const handleAddTransformer = () => {
    const newTransformer: TransformerSpec = {
      potenciaKVA: '',
      fase: '',
      voltajePrimario: '',
      voltajeSecundario: '',
      tipoTransformador: '',
      norma: '',
      zonaInstalacion: '',
      cantidad: '1'
    };
    
    const updatedTransformers = [...formData.transformadores, newTransformer];
    onTransformersChange(updatedTransformers);
  };

  // Función para eliminar un transformador
  const handleRemoveTransformer = (index: number) => {
    const updatedTransformers = formData.transformadores.filter((_, i) => i !== index);
    onTransformersChange(updatedTransformers);
  };

  // Función para actualizar un campo específico de un transformador
  const handleTransformerFieldChange = (
    index: number, 
    field: keyof TransformerSpec, 
    value: string
  ) => {
    const updatedTransformers = formData.transformadores.map((transformer, i) => {
      if (i === index) {
        return { ...transformer, [field]: value };
      }
      return transformer;
    });
    onTransformersChange(updatedTransformers);
  };

  return (
    <motion.div
      initial={{ opacity: 0, height: 0 }}
      animate={{ opacity: 1, height: 'auto' }}
      transition={{ duration: 0.3 }}
      className="space-y-6"
    >
      {/* Contenedor principal */}
      <div className="bg-[#00269b]/5 border border-[#00269b]/20 rounded-xl p-6 space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <Zap className="w-6 h-6 text-[#00269b]" />
            <h3 className="text-lg font-bold text-[#00269b]">
              {t('form.transformer.title')}
            </h3>
          </div>
          
          {/* Contador de transformadores */}
          <div className="flex items-center gap-2">
            <span className="text-sm font-medium text-gray-600">
              Tipos de Transformadores: {formData.transformadores.length}
            </span>
          </div>
        </div>

        {/* Botón para agregar transformador */}
        <button
          type="button"
          onClick={handleAddTransformer}
          disabled={isSubmitting}
          className="flex items-center justify-center gap-2 w-full p-3 border-2 border-dashed border-[#00269b]/30 rounded-lg hover:border-[#00269b]/50 hover:bg-[#00269b]/5 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <Plus className="w-5 h-5 text-[#00269b]" />
          <span className="font-medium text-[#00269b]">
            {t('form.transformer.addTransformer')}
          </span>
        </button>

        {/* Lista de transformadores */}
        <div className="space-y-8">
          {formData.transformadores.map((transformer, index) => (
            <TransformerSpecification
              key={index}
              index={index}
              transformer={transformer}
              formErrors={formErrors.transformadores?.[index] || {}}
              isSubmitting={isSubmitting}
              onFieldChange={handleTransformerFieldChange}
              onRemove={formData.transformadores.length > 1 ? () => handleRemoveTransformer(index) : undefined}
              translatedOptions={translatedOptions}
              isFirst={index === 0}
            />
          ))}
        </div>
      </div>
    </motion.div>
  );
}

// ============================================================================
// Componente para especificaciones de un transformador individual
// ============================================================================

interface TransformerSpecificationProps {
  index: number;
  transformer: TransformerSpec;
  formErrors: Partial<TransformerSpec>;
  isSubmitting: boolean;
  onFieldChange: (index: number, field: keyof TransformerSpec, value: string) => void;
  onRemove?: () => void;
  translatedOptions: {
    fases: SelectOption[];
    tiposTransformadores: SelectOption[];
    normas: SelectOption[];
    zonasInstalacion: SelectOption[];
  };
  isFirst: boolean;
}

function TransformerSpecification({
  index,
  transformer,
  formErrors,
  isSubmitting,
  onFieldChange,
  onRemove,
  translatedOptions,
  isFirst
}: TransformerSpecificationProps) {
  const t = useTranslations('contact');

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: index * 0.1 }}
      className="relative bg-white border border-gray-200 rounded-xl p-6 space-y-6 shadow-sm"
    >
      {/* Header del transformador - Mostrar cantidad si es mayor a 1 */}
      <div className="flex items-center justify-between pb-4 border-b">
        <div className="flex items-center gap-3">
          <div className="flex items-center justify-center w-8 h-8 bg-[#00269b]/10 rounded-full">
            <span className="font-bold text-[#00269b]">{index + 1}</span>
          </div>
          <div>
            <h4 className="font-bold text-gray-800">
              {isFirst ? t('form.transformer.primaryTransformer') : t('form.transformer.additionalTransformer', { number: index + 1 })}
            </h4>
            {parseInt(transformer.cantidad) > 1 && (
              <p className="text-sm text-gray-600 mt-1">
                {t('form.transformer.quantity.label')}: {transformer.cantidad} {t('form.transformer.units')}
              </p>
            )}
          </div>
        </div>
        
        {onRemove && (
          <button
            type="button"
            onClick={onRemove}
            disabled={isSubmitting}
            className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors disabled:opacity-50"
            title={t('form.transformer.removeTransformer')}
          >
            <Trash2 className="w-5 h-5" />
          </button>
        )}
      </div>

      {/* Campos del transformador */}
      <div className="space-y-6">
        {/* NUEVA FILA: Cantidad */}
        <div className="grid md:grid-cols-2 gap-6">
          <div className="md:col-span-1">
            <InputField
              name={`transformador-${index}-cantidad`}
              label={t('form.transformer.quantity.label')}
              placeholder={t('form.transformer.quantity.placeholder')}
              value={transformer.cantidad}
              error={formErrors.cantidad}
              icon={<Hash className="w-5 h-5" />}
              onChange={(e) => onFieldChange(index, 'cantidad', e.target.value)}
              disabled={isSubmitting}
              required
              inputMode="numeric"
              min="1"
              max="100"
              type="number"
            />
          </div>
          <div className="md:col-span-1 flex items-end">
            <div className="w-full">
              <p className="text-sm font-medium text-gray-700 mb-2">
                {t('form.transformer.totalPower')}:
              </p>
              <div className="bg-gray-50 p-3 rounded-lg border">
                <p className="text-lg font-bold text-[#00269b]">
                  {calculateTotalPower(transformer)}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Primera fila: Potencia y Fase */}
        <div className="grid md:grid-cols-2 gap-6">
          <InputField
            name={`transformador-${index}-potenciaKVA`}
            label={t('form.transformer.power.label')}
            placeholder={t('form.transformer.power.placeholder')}
            value={transformer.potenciaKVA}
            error={formErrors.potenciaKVA}
            icon={<Power className="w-5 h-5" />}
            onChange={(e) => onFieldChange(index, 'potenciaKVA', e.target.value)}
            disabled={isSubmitting}
            required
            inputMode="decimal"
          />

          <SelectField
            name={`transformador-${index}-fase`}
            label={t('form.transformer.phase.label')}
            placeholder={t('form.transformer.phase.select')}
            value={transformer.fase}
            error={formErrors.fase}
            options={translatedOptions.fases}
            icon={<GitBranch className="w-5 h-5" />}
            onChange={(e) => onFieldChange(index, 'fase', e.target.value)}
            disabled={isSubmitting}
            required
          />
        </div>

        {/* Segunda fila: Voltajes */}
        <div className="grid md:grid-cols-2 gap-6">
          <InputField
            name={`transformador-${index}-voltajePrimario`}
            label={t('form.transformer.primaryVoltage.label')}
            placeholder={t('form.transformer.primaryVoltage.placeholder')}
            value={transformer.voltajePrimario}
            error={formErrors.voltajePrimario}
            icon={<Cpu className="w-5 h-5" />}
            onChange={(e) => onFieldChange(index, 'voltajePrimario', e.target.value)}
            disabled={isSubmitting}
            required
            inputMode="decimal"
          />

          <InputField
            name={`transformador-${index}-voltajeSecundario`}
            label={t('form.transformer.secondaryVoltage.label')}
            placeholder={t('form.transformer.secondaryVoltage.placeholder')}
            value={transformer.voltajeSecundario}
            error={formErrors.voltajeSecundario}
            icon={<Battery className="w-5 h-5" />}
            onChange={(e) => onFieldChange(index, 'voltajeSecundario', e.target.value)}
            disabled={isSubmitting}
            required
            inputMode="decimal"
          />
        </div>

        {/* Tercera fila: Tipo y Norma */}
        <div className="grid md:grid-cols-2 gap-6">
          <SelectField
            name={`transformador-${index}-tipoTransformador`}
            label={t('form.transformer.type.label')}
            placeholder={t('form.transformer.type.select')}
            value={transformer.tipoTransformador}
            error={formErrors.tipoTransformador}
            options={translatedOptions.tiposTransformadores}
            onChange={(e) => onFieldChange(index, 'tipoTransformador', e.target.value)}
            disabled={isSubmitting}
            required
          />

          <SelectField
            name={`transformador-${index}-norma`}
            label={t('form.transformer.standard.label')}
            placeholder={t('form.transformer.standard.select')}
            value={transformer.norma}
            error={formErrors.norma}
            options={translatedOptions.normas}
            onChange={(e) => onFieldChange(index, 'norma', e.target.value)}
            disabled={isSubmitting}
            required
          />
        </div>

        {/* Cuarta fila: Zona de instalación */}
        <SelectField
          name={`transformador-${index}-zonaInstalacion`}
          label={t('form.transformer.zone.label')}
          placeholder={t('form.transformer.zone.select')}
          value={transformer.zonaInstalacion}
          error={formErrors.zonaInstalacion}
          options={translatedOptions.zonasInstalacion}
          onChange={(e) => onFieldChange(index, 'zonaInstalacion', e.target.value)}
          disabled={isSubmitting}
          required
        />
      </div>
    </motion.div>
  );
}

// ============================================================================
// Sub-componentes (InputField y SelectField)
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
  min?: string;
  max?: string;
  type?: 'text' | 'number';
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
  inputMode = 'text',
  min,
  max,
  type = 'text'
}: InputFieldProps) {
  const handleIncrement = () => {
    const current = parseInt(value) || 1;
    const newValue = Math.min(current + 1, parseInt(max || '100'));
    const event = {
      target: { name, value: newValue.toString() }
    } as React.ChangeEvent<HTMLInputElement>;
    onChange(event);
  };

  const handleDecrement = () => {
    const current = parseInt(value) || 1;
    const newValue = Math.max(current - 1, parseInt(min || '1'));
    const event = {
      target: { name, value: newValue.toString() }
    } as React.ChangeEvent<HTMLInputElement>;
    onChange(event);
  };

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
          required={required}
          disabled={disabled}
          inputMode={inputMode}
          min={min}
          max={max}
          className={`input-field ${icon ? 'pl-10' : ''} ${
            error ? 'border-red-500 focus:ring-red-200' : ''
          } ${type === 'number' ? 'pr-10' : ''}`}
          placeholder={placeholder}
        />
        {type === 'number' && (
          <div className="absolute right-3 top-1/2 transform -translate-y-1/2 flex flex-col">
            <button
              type="button"
              onClick={handleIncrement}
              disabled={disabled}
              className="text-gray-400 hover:text-gray-600 text-xs"
            >
              ↑
            </button>
            <button
              type="button"
              onClick={handleDecrement}
              disabled={disabled}
              className="text-gray-400 hover:text-gray-600 text-xs"
            >
              ↓
            </button>
          </div>
        )}
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

// Función auxiliar para calcular la potencia total
function calculateTotalPower(transformer: TransformerSpec): string {
  const cantidad = parseInt(transformer.cantidad) || 1;
  const potencia = parseFloat(transformer.potenciaKVA) || 0;
  const total = cantidad * potencia;
  
  if (total === 0) return '-';
  return `${total} KVA (${cantidad} × ${potencia} KVA)`;
}