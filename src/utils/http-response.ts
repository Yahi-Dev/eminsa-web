// src/utils/http-response.ts
import { NextResponse } from 'next/server';

// ============================================================================
// Types
// ============================================================================

interface ResponseData<T = unknown> {
  Data?: T;
  Total?: number;
  Page?: number;
}

interface ErrorData {
  [key: string]: unknown;
}

// ============================================================================
// HTTP Response Utility Class
// ============================================================================

export class HttpResponse {
  static sendSuccess<T = unknown>(data: ResponseData<T> = {}, message: string = 'Éxito') {
    return NextResponse.json({
      status: 'success',
      Permission: "Permission accepted.",
      success: true,
      message,
      data: data.Data,
      totalRecords: data.Total ?? 0,
      page: data.Page,
      error: false,
      date: new Date()
    }, { status: 200 });
  }

  static sendCreated<T = unknown>(data: ResponseData<T> = {}, message: string = 'Creado exitosamente') {
    return NextResponse.json({
      status: 'success',
      Permission: "Permission accepted.",
      success: true,
      message,
      data: data.Data,
      totalRecords: data.Total ?? 0,
      page: data.Page,
      error: false,
      date: new Date()
    }, { status: 201 });
  }

  static sendBadRequest(message: string = 'Solicitud incorrecta', data: ErrorData = {}) {
    return NextResponse.json({
      status: 'error',
      Permission: "Permission denied.",
      success: false,
      message,
      data,
      error: true,
      date: new Date()
    }, { status: 400 });
  }

  static sendUnauthorized(message: string = 'No autorizado', data: ErrorData = {}) {
    return NextResponse.json({
      status: 'error',
      Permission: "Permission denied.",
      success: false,
      message,
      data,
      error: true,
      date: new Date()
    }, { status: 401 });
  }

  static sendForbidden(message: string = 'Acceso denegado', data: ErrorData = {}) {
    return NextResponse.json({
      status: 'error',
      Permission: "Permission denied.",
      success: false,
      message,
      data,
      error: true,
      date: new Date()
    }, { status: 403 });
  }

  static sendNotFound(message: string = 'No encontrado', data: ErrorData = {}) {
    return NextResponse.json({
      status: 'error',
      Permission: "Permission denied.",
      success: false,
      message,
      data,
      error: true,
      date: new Date()
    }, { status: 404 });
  }

  static sendServerError(message: string = 'Error interno del servidor', error?: unknown) {
    console.error('❌ Error interno:', error);
    return NextResponse.json({
      status: 'error',
      Permission: "Permission denied.",
      success: false,
      message,
      error: true,
      date: new Date()
    }, { status: 500 });
  }

  static sendTooManyRequests(message: string = 'Demasiadas solicitudes', retryAfter?: number) {
    const headers: Record<string, string> = {
      'Content-Type': 'application/json'
    };

    if (retryAfter) {
      headers['Retry-After'] = retryAfter.toString();
    }

    return new NextResponse(JSON.stringify({
      status: 'error',
      Permission: "Permission denied.",
      success: false,
      message,
      error: true,
      date: new Date(),
      retryAfter
    }), {
      status: 429,
      headers
    });
  }
}

// ============================================================================
// Individual Exports
// ============================================================================

export const sendSuccess = HttpResponse.sendSuccess;
export const sendCreated = HttpResponse.sendCreated;
export const sendBadRequest = HttpResponse.sendBadRequest;
export const sendUnauthorized = HttpResponse.sendUnauthorized;
export const sendForbidden = HttpResponse.sendForbidden;
export const sendNotFound = HttpResponse.sendNotFound;
export const sendServerError = HttpResponse.sendServerError;
export const sendTooManyRequests = HttpResponse.sendTooManyRequests;