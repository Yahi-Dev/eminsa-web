// ============================================================================
// Contact Feature - useContactForm Hook
// ============================================================================

'use client';

import { useState, useCallback, useEffect, useRef } from 'react';
import { useMaskito } from '@maskito/react';
import { useTranslations } from 'next-intl';
import type { 
  ContactFormState, 
  FormErrors, 
  InquiryType,
  UseContactFormReturn,
  TransformerSpec
} from '../types';
import { submitContactForm, prepareFormDataForSubmission } from '../services/contact';
import { 
  INITIAL_FORM_STATE, 
  CATEGORIAS_PRODUCTOS, 
  CATEGORIAS_SERVICIOS,
  FASES,
  TIPOS_TRANSFORMADORES,
  NORMAS,
  ZONAS_INSTALACION,
  FIELD_LIMITS 
} from '../data/constants';

// Importar opciones de máscara de teléfono
import phoneMaskOptions from '@/lib/mask/mask-phone';
import { formatIdentificacion, getIdentificationType } from '../schema/contact-validation';

/**
 * Hook personalizado para manejar el formulario de contacto
 */
export function useContactForm(): UseContactFormReturn {
  const t = useTranslations('contact');
  
  // Estado del formulario
  const [formData, setFormData] = useState<ContactFormState>(INITIAL_FORM_STATE);
  const [formErrors, setFormErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  
  // Ref para tracking de identificación
  const identificacionRef = useRef<string>('');
  
  // Máscara para teléfono
  const maskedInputRef = useMaskito({ options: phoneMaskOptions });

  // ============================================================================
  // Categorías traducidas
  // ============================================================================
  
  const translateCategory = useCallback((cat: string, type: 'products' | 'services'): string => {
    const key = cat.toLowerCase()
      .replace(/\s+/g, '_')
      .replace(/[&]/g, 'y')
      .replace(/[áéíóú]/g, (match) => {
        const map: Record<string, string> = { 'á': 'a', 'é': 'e', 'í': 'i', 'ó': 'o', 'ú': 'u' };
        return map[match] || match;
      })
      .replace(/ñ/g, 'n')
      .replace(/[^a-z_]/g, '');

    return t(`form.categories.${type}.${key}`);
  }, [t]);

  const categoriasProductos = CATEGORIAS_PRODUCTOS.map(cat => translateCategory(cat, 'products'));
  const categoriasServicios = CATEGORIAS_SERVICIOS.map(cat => translateCategory(cat, 'services'));

  const categoriasDisponibles = formData.tipoConsulta === 'productos'
    ? categoriasProductos
    : formData.tipoConsulta === 'servicios'
      ? categoriasServicios
      : [];

  // ============================================================================
  // Opciones traducidas para transformadores
  // ============================================================================
  
  const translatedOptions = {
    fases: FASES.map(fase => ({ 
      value: fase.value, 
      label: t(`form.transformer.phase.${fase.value}`) 
    })),
    tiposTransformadores: TIPOS_TRANSFORMADORES.map(tipo => ({ 
      value: tipo.value, 
      label: t(`form.transformer.type.${tipo.value}`) 
    })),
    normas: NORMAS.map(norma => ({ 
      value: norma.value, 
      label: t(`form.transformer.standard.${norma.value}`) 
    })),
    zonasInstalacion: ZONAS_INSTALACION.map(zona => ({ 
      value: zona.value, 
      label: t(`form.transformer.zone.${zona.value}`) 
    })),
  };

  // ============================================================================
  // Lógica de transformadores
  // ============================================================================
  
  const transformadoresCategory = t('form.categories.products.transformadores');
  const showTransformadorFields = 
    formData.tipoConsulta === 'productos' && 
    formData.categoria === transformadoresCategory;

  // ============================================================================
  // Handlers para transformadores
  // ============================================================================

  /**
   * Actualiza la lista de transformadores
   */
  const handleTransformersChange = useCallback((transformers: TransformerSpec[]) => {
    setFormData(prev => ({
      ...prev,
      transformadores: transformers
    }));

    // Limpiar errores de transformadores
    if (formErrors.transformadores) {
      setFormErrors(prev => ({ ...prev, transformadores: undefined }));
    }
  }, [formErrors.transformadores]);

  /**
   * Maneja cambios en campos específicos de transformadores
   */
  const handleTransformerFieldChange = useCallback((
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
    handleTransformersChange(updatedTransformers);
  }, [formData.transformadores, handleTransformersChange]);

  /**
   * Agrega un nuevo transformador
   */
  const handleAddTransformer = useCallback(() => {
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
    handleTransformersChange(updatedTransformers);
  }, [formData.transformadores, handleTransformersChange]);

  /**
   * Elimina un transformador
   */
  const handleRemoveTransformer = useCallback((index: number) => {
    if (formData.transformadores.length <= 1) return;
    
    const updatedTransformers = formData.transformadores.filter((_, i) => i !== index);
    handleTransformersChange(updatedTransformers);
  }, [formData.transformadores, handleTransformersChange]);

  // ============================================================================
  // Handlers
  // ============================================================================

  /**
   * Maneja cambios en el campo de identificación
   */
  const handleIdentificacionChange = useCallback((value: string) => {
    const formatted = formatIdentificacion(value);
    identificacionRef.current = formatted;

    setFormData(prev => ({
      ...prev,
      identificacion: formatted
    }));

    if (formErrors.identificacion) {
      setFormErrors(prev => ({ ...prev, identificacion: undefined }));
    }
  }, [formErrors.identificacion]);

  /**
   * Obtiene el tipo de identificación (RNC/Cédula)
   */
  const getTipoIdentificacion = useCallback((): string => {
    const type = getIdentificationType(formData.identificacion);
    return type === 'Indefinido' ? t('form.fields.identification.undefined') : type;
  }, [formData.identificacion, t]);

  /**
   * Resetea los campos de transformador
   */
  const resetTransformerFields = useCallback(() => ({
    transformadores: [{
      potenciaKVA: '',
      fase: '',
      voltajePrimario: '',
      voltajeSecundario: '',
      tipoTransformador: '',
      norma: '',
      zonaInstalacion: '',
      cantidad: '1'
    }]
  }), []);

  /**
   * Maneja el click en el selector de tipo de consulta
   */
  const handleTipoConsultaClick = useCallback((tipo: 'productos' | 'servicios') => {
    setFormData(prev => ({
      ...prev,
      tipoConsulta: tipo,
      categoria: '',
      ...resetTransformerFields()
    }));

    if (formErrors.tipoConsulta) {
      setFormErrors(prev => ({ ...prev, tipoConsulta: undefined }));
    }
  }, [formErrors.tipoConsulta, resetTransformerFields]);

  /**
   * Maneja cambios genéricos en campos del formulario
   */
  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
      const { name, value } = e.target;

      // Campo de identificación tiene manejo especial
      if (name === 'identificacion') {
        handleIdentificacionChange(value);
        return;
      }

      let formattedValue = value;

      // Aplicar límites de caracteres
      if (name === 'nombre' || name === 'empresa') {
        formattedValue = value.substring(0, FIELD_LIMITS.nombre);
      } else if (name === 'direccion') {
        formattedValue = value.substring(0, FIELD_LIMITS.direccion);
      }

      // Manejar cambio de tipo de consulta
      if (name === 'tipoConsulta') {
        setFormData(prev => ({
          ...prev,
          tipoConsulta: value as InquiryType,
          categoria: '',
          ...resetTransformerFields()
        }));
      } 
      // Manejar cambio de categoría (reset transformers si no es transformadores)
      else if (name === 'categoria' && value !== transformadoresCategory) {
        setFormData(prev => ({
          ...prev,
          categoria: value,
          ...resetTransformerFields()
        }));
      } 
      // Cambio normal
      else {
        setFormData(prev => ({
          ...prev,
          [name]: formattedValue
        }));
      }

      // Limpiar error del campo
      if (formErrors[name as keyof Omit<FormErrors, 'transformadores'>]) {
        setFormErrors(prev => ({ ...prev, [name]: undefined }));
      }
    },
    [formErrors, handleIdentificacionChange, resetTransformerFields, transformadoresCategory]
  );

  /**
   * Resetea el formulario completo
   */
  const resetForm = useCallback(() => {
    setIsSubmitted(false);
    setFormData(INITIAL_FORM_STATE);
    identificacionRef.current = '';
    setErrorMessage(null);
    setFormErrors({});
  }, []);

  /**
   * Valida todos los transformadores
   */
  const validateTransformers = useCallback((): boolean => {
    if (!showTransformadorFields) return true;

    const transformerErrors: (Partial<TransformerSpec> | undefined)[] = [];
    let allValid = true;

    formData.transformadores.forEach((transformer, index) => {
      const errors: Partial<TransformerSpec> = {};
      
      if (!transformer.potenciaKVA.trim()) {
        errors.potenciaKVA = t('form.errors.requiredPower');
        allValid = false;
      }
      if (!transformer.fase) {
        errors.fase = t('form.errors.requiredPhase');
        allValid = false;
      }
      if (!transformer.voltajePrimario.trim()) {
        errors.voltajePrimario = t('form.errors.requiredPrimaryVoltage');
        allValid = false;
      }
      if (!transformer.voltajeSecundario.trim()) {
        errors.voltajeSecundario = t('form.errors.requiredSecondaryVoltage');
        allValid = false;
      }
      if (!transformer.tipoTransformador) {
        errors.tipoTransformador = t('form.errors.requiredTransformerType');
        allValid = false;
      }
      if (!transformer.norma) {
        errors.norma = t('form.errors.requiredStandard');
        allValid = false;
      }
      if (!transformer.zonaInstalacion) {
        errors.zonaInstalacion = t('form.errors.requiredInstallationZone');
        allValid = false;
      }
      if (!transformer.cantidad || parseInt(transformer.cantidad) < 1) {
        errors.cantidad = t('form.errors.requiredQuantity');
        allValid = false;
      }

      transformerErrors[index] = Object.keys(errors).length > 0 ? errors : undefined;
    });

    if (!allValid) {
      setFormErrors(prev => ({ ...prev, transformadores: transformerErrors }));
    }

    return allValid;
  }, [formData.transformadores, showTransformadorFields, t]);

  /**
   * Maneja el envío del formulario
   */
  const handleSubmit = useCallback(async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    setErrorMessage(null);
    setFormErrors({});

    try {
      // Validar transformadores si es necesario
      if (showTransformadorFields && !validateTransformers()) {
        setIsSubmitting(false);
        return;
      }

      const submitData = prepareFormDataForSubmission(
        formData as unknown as Record<string, any>,
        showTransformadorFields
      );

      const response = await submitContactForm(submitData);

      if (!response.success) {
        if (response.errors) {
          setFormErrors(response.errors);
          setErrorMessage(t('form.errors.validation'));
        } else {
          setErrorMessage(response.message || t('form.errors.submission'));
        }
        return;
      }

      // Éxito
      setIsSubmitted(true);
      setFormData(INITIAL_FORM_STATE);
      identificacionRef.current = '';
      
    } catch (error) {
      console.error('Error submitting form:', error);
      setErrorMessage(t('form.errors.connection'));
    } finally {
      setIsSubmitting(false);
    }
  }, [formData, showTransformadorFields, validateTransformers, t]);

  // ============================================================================
  // Effects
  // ============================================================================

  /**
   * Auto-formatear identificación cuando se completa
   */
  useEffect(() => {
    const cleanId = identificacionRef.current.replace(/\D/g, '');

    if (cleanId.length === 9 || cleanId.length === 11) {
      const formatted = formatIdentificacion(identificacionRef.current);
      if (formatted !== formData.identificacion) {
        setFormData(prev => ({
          ...prev,
          identificacion: formatted
        }));
      }
    }
  }, [formData.identificacion]);

  // ============================================================================
  // Return
  // ============================================================================

  return {
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
    handleIdentificacionChange,
    getTipoIdentificacion,
    resetForm,
    // Nuevos métodos para transformadores
    handleTransformersChange,
    handleTransformerFieldChange,
    handleAddTransformer,
    handleRemoveTransformer,
  };
}