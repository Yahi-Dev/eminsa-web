import { contactInfo } from "@/config/navigation";

/**
 * Mensaje que se pre-escribe en WhatsApp cuando el enlace no aporta uno propio.
 * Las páginas de producto pasan su propio mensaje con el nombre del producto.
 */
export const DEFAULT_WHATSAPP_MESSAGE =
  "Hola, quiero información sobre transformadores";

/** Número de WhatsApp Business en formato wa.me (solo dígitos). */
const WHATSAPP_NUMBER = contactInfo.whatsapp.replace(/\D/g, "");

/**
 * Retorna el enlace de WhatsApp Business de Grupo EMINSA con el mensaje
 * ya escrito. Si no se pasa `message` se usa DEFAULT_WHATSAPP_MESSAGE.
 */
export function getWhatsAppUrl(message?: string): string {
  const text = (message ?? DEFAULT_WHATSAPP_MESSAGE).trim();
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(text)}`;
}
