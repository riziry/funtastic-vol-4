/**
 * Builds a wa.me link from a displayed phone number such as "+62 857-8282-7416".
 * Strips every non-digit and converts a leading local "0" to Indonesia's 62.
 */
export function whatsappLink(phone: string, message?: string) {
  let digits = phone.replace(/\D/g, "");
  if (digits.startsWith("0")) digits = `62${digits.slice(1)}`;
  const text = message ? `?text=${encodeURIComponent(message)}` : "";
  return `https://wa.me/${digits}${text}`;
}

export function telLink(phone: string) {
  return `tel:+${phone.replace(/\D/g, "")}`;
}
