/**
 * Retorna el enlace directo de WhatsApp Business de Grupo Eminsa.
 * El parámetro `message` se mantiene por compatibilidad pero no aplica
 * al formato wa.me/message/... (enlace de WhatsApp Business).
 */
// eslint-disable-next-line @typescript-eslint/no-unused-vars
export function getWhatsAppUrl(_message?: string): string {
  return "https://wa.me/message/G3PJBGJETLB7P1";
}
