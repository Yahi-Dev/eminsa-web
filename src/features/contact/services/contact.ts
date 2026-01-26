// ============================================================================
// Contact Feature - API Service
// ============================================================================

import type { ContactFormData, ApiResponse } from '../types';

/**
 * URL base para las llamadas a la API de contacto
 */
const API_BASE_URL = '/api/contact';

/**
 * Envía el formulario de contacto al servidor
 */
export async function submitContactForm(
  data: ContactFormData
): Promise<ApiResponse> {
  try {
    const response = await fetch(API_BASE_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });

    const result: ApiResponse = await response.json();

    if (!response.ok) {
      return {
        success: false,
        message: result.message || 'Error al enviar el formulario',
        errors: result.errors,
      };
    }

    return result;
  } catch (error) {
    console.error('Error submitting contact form:', error);

    if (error instanceof TypeError && error.message.includes('fetch')) {
      return {
        success: false,
        message: 'Error de conexión. Por favor, verifica tu conexión a internet.',
      };
    }

    return {
      success: false,
      message: 'Ha ocurrido un error inesperado. Por favor, intenta de nuevo.',
    };
  }
}

/**
 * Verifica el estado de la API de contacto
 */
export async function checkContactApiHealth(): Promise<boolean> {
  try {
    const response = await fetch(`${API_BASE_URL}/health`, {
      method: 'GET',
    });
    return response.ok;
  } catch {
    return false;
  }
}

/**
 * Reenvía un mensaje de contacto (para reintentos)
 */
export async function retryContactSubmission(
  data: ContactFormData,
  maxRetries: number = 3
): Promise<ApiResponse> {
  let lastError: ApiResponse = {
    success: false,
    message: 'Error desconocido',
  };

  for (let attempt = 1; attempt <= maxRetries; attempt++) {
    const result = await submitContactForm(data);

    if (result.success) {
      return result;
    }

    lastError = result;

    // Si es un error de validación, no reintentamos
    if (result.errors) {
      return result;
    }

    // Esperar antes del siguiente intento (backoff exponencial)
    if (attempt < maxRetries) {
      await delay(Math.pow(2, attempt) * 1000);
    }
  }

  return lastError;
}

/**
 * Función auxiliar para delay
 */
function delay(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

/**
 * Prepara los datos del formulario para envío
 * Limpia y formatea los campos según sea necesario
 */
export function prepareFormDataForSubmission(
  formData: Record<string, any>,
  includeTransformerSpecs: boolean
): ContactFormData {
  const submitData: ContactFormData = {
    nombre: formData.nombre?.trim() || '',
    email: formData.email?.trim().toLowerCase() || '',
    telefono: formData.telefono?.trim() || '',
    mensaje: formData.mensaje?.trim() || '',
    tipoConsulta: formData.tipoConsulta as 'productos' | 'servicios' | '',
    // Incluir transformadores solo si es relevante y existen
    transformadores: includeTransformerSpecs && formData.transformadores 
      ? formData.transformadores 
      : []
  };

  // Campos opcionales - asegurar que siempre se envíen si existen
  submitData.empresa = formData.empresa?.trim() || undefined;
  submitData.identificacion = formData.identificacion?.trim() || undefined;
  submitData.direccion = formData.direccion?.trim() || undefined;
  submitData.categoria = formData.categoria?.trim() || undefined;

  return submitData;
}