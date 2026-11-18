// wa.me requires a full international number with no leading 0 or '+'.
// Staff enter phone numbers in local format (e.g. 0700123456), so normalize
// before building a wa.me link — otherwise WhatsApp can't resolve the chat.
const UGANDA_COUNTRY_CODE = '256';

export function toWhatsAppDigits(phone, countryCode = UGANDA_COUNTRY_CODE) {
  const digits = (phone || '').replace(/\D/g, '');
  if (!digits) return '';
  if (digits.startsWith(countryCode)) return digits;
  if (digits.startsWith('0')) return countryCode + digits.slice(1);
  return digits;
}
