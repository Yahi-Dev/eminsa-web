import { contactInfo } from "@/config/navigation";

const DEFAULT_MESSAGE =
  "Hola, me gustaría obtener información sobre sus productos y servicios.";

/**
 * Genera la URL correcta para abrir un chat de WhatsApp.
 * - Elimina caracteres no numéricos del número (wa.me no acepta '+', espacios ni guiones).
 * - Codifica el mensaje para que sea válido en una URL.
 * @param message Mensaje predefinido opcional. Si se omite, se usa el mensaje por defecto.
 */
export function getWhatsAppUrl(message: string = DEFAULT_MESSAGE): string {
  const cleanNumber = contactInfo.whatsapp.replace(/\D/g, "");
  const encodedMessage = encodeURIComponent(message);
  return `https://wa.me/${cleanNumber}?text=${encodedMessage}`;
}
