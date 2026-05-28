/** Pakistani mobile only (Lahore delivery). Examples: 03xx-xxxxxxx, 923xx-xxxxxxx */

export const PAKISTANI_PHONE_ERROR =
  "Please enter a valid Pakistani mobile number (e.g. 03xx-xxxxxxx).";

export function isValidPakistaniPhone(input: string): boolean {
  const digits = input.replace(/\D/g, "");

  if (!digits) return false;

  // Local: 03XX XXXXXXX (11 digits)
  if (/^03[0-9]{9}$/.test(digits)) return true;

  // Country code: 923XX XXXXXXX (12 digits)
  if (/^923[0-9]{9}$/.test(digits)) return true;

  // Without leading 0: 3XX XXXXXXX (10 digits)
  if (/^3[0-9]{9}$/.test(digits)) return true;

  return false;
}
