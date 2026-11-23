export interface CountryPhoneRule {
  code: string;
  countryEs: string;
  countryEn: string;
  minLocal: number;
  maxLocal: number;
}

// Reglas E.164 ordenadas de prefijos más largos (3 dígitos) a más cortos (1 dígito)
// En E.164 los prefijos de país son libres de ambigüedad (prefix-free).
const COUNTRY_PHONE_RULES: CountryPhoneRule[] = [
  // 3-digit codes (Latin America & Europe)
  { code: '591', countryEs: 'Bolivia', countryEn: 'Bolivia', minLocal: 8, maxLocal: 8 },
  { code: '593', countryEs: 'Ecuador', countryEn: 'Ecuador', minLocal: 9, maxLocal: 9 },
  { code: '595', countryEs: 'Paraguay', countryEn: 'Paraguay', minLocal: 9, maxLocal: 9 },
  { code: '598', countryEs: 'Uruguay', countryEn: 'Uruguay', minLocal: 8, maxLocal: 8 },
  { code: '502', countryEs: 'Guatemala', countryEn: 'Guatemala', minLocal: 8, maxLocal: 8 },
  { code: '503', countryEs: 'El Salvador', countryEn: 'El Salvador', minLocal: 8, maxLocal: 8 },
  { code: '504', countryEs: 'Honduras', countryEn: 'Honduras', minLocal: 8, maxLocal: 8 },
  { code: '505', countryEs: 'Nicaragua', countryEn: 'Nicaragua', minLocal: 8, maxLocal: 8 },
  { code: '506', countryEs: 'Costa Rica', countryEn: 'Costa Rica', minLocal: 8, maxLocal: 8 },
  { code: '507', countryEs: 'Panamá', countryEn: 'Panama', minLocal: 8, maxLocal: 8 },
  { code: '351', countryEs: 'Portugal', countryEn: 'Portugal', minLocal: 9, maxLocal: 9 },
  // 2-digit codes
  { code: '56', countryEs: 'Chile', countryEn: 'Chile', minLocal: 9, maxLocal: 9 },
  { code: '58', countryEs: 'Venezuela', countryEn: 'Venezuela', minLocal: 10, maxLocal: 10 },
  { code: '51', countryEs: 'Perú', countryEn: 'Peru', minLocal: 9, maxLocal: 9 },
  { code: '52', countryEs: 'México', countryEn: 'Mexico', minLocal: 10, maxLocal: 10 },
  { code: '53', countryEs: 'Cuba', countryEn: 'Cuba', minLocal: 8, maxLocal: 8 },
  { code: '54', countryEs: 'Argentina', countryEn: 'Argentina', minLocal: 10, maxLocal: 11 },
  { code: '55', countryEs: 'Brasil', countryEn: 'Brazil', minLocal: 10, maxLocal: 11 },
  { code: '57', countryEs: 'Colombia', countryEn: 'Colombia', minLocal: 10, maxLocal: 10 },
  { code: '34', countryEs: 'España', countryEn: 'Spain', minLocal: 9, maxLocal: 9 },
  { code: '33', countryEs: 'Francia', countryEn: 'France', minLocal: 9, maxLocal: 9 },
  { code: '39', countryEs: 'Italia', countryEn: 'Italy', minLocal: 9, maxLocal: 10 },
  { code: '44', countryEs: 'Reino Unido', countryEn: 'United Kingdom', minLocal: 10, maxLocal: 10 },
  { code: '49', countryEs: 'Alemania', countryEn: 'Germany', minLocal: 10, maxLocal: 11 },
  { code: '31', countryEs: 'Países Bajos', countryEn: 'Netherlands', minLocal: 9, maxLocal: 9 },
  { code: '32', countryEs: 'Bélgica', countryEn: 'Belgium', minLocal: 9, maxLocal: 9 },
  { code: '41', countryEs: 'Suiza', countryEn: 'Switzerland', minLocal: 9, maxLocal: 9 },
  { code: '61', countryEs: 'Australia', countryEn: 'Australia', minLocal: 9, maxLocal: 9 },
  { code: '81', countryEs: 'Japón', countryEn: 'Japan', minLocal: 10, maxLocal: 10 },
  { code: '86', countryEs: 'China', countryEn: 'China', minLocal: 11, maxLocal: 11 },
  { code: '91', countryEs: 'India', countryEn: 'India', minLocal: 10, maxLocal: 10 },
  // 1-digit codes
  { code: '1', countryEs: 'EE.UU. / Canadá', countryEn: 'US / Canada', minLocal: 10, maxLocal: 10 },
];

export const DEFAULT_MIN_DIGITS = 8;
export const DEFAULT_LOCAL_MAX_DIGITS = 12;
export const GLOBAL_E164_MAX_DIGITS = 15;

export interface PhoneInspection {
  hasPlus: boolean;
  digits: string;
  rule: CountryPhoneRule | null;
  localDigitsCount: number;
  minTotalDigits: number;
  maxTotalDigits: number;
}

export function detectPhoneRule(value: string): PhoneInspection {
  const trimmed = value.trim();
  const hasPlus = trimmed.startsWith('+');
  const digits = trimmed.replace(/\D/g, '');

  // Solo detecta código de país cuando empieza con '+' o cuando ya tiene 10+ dígitos comenzando con un prefijo conocido
  let rule: CountryPhoneRule | null = null;
  if (hasPlus && digits.length >= 1) {
    rule = COUNTRY_PHONE_RULES.find(r => digits.startsWith(r.code)) ?? null;
  } else if (!hasPlus && digits.length >= 10) {
    rule = COUNTRY_PHONE_RULES.find(r => r.code.length >= 2 && digits.startsWith(r.code)) ?? null;
  }

  if (rule) {
    const localDigitsCount = Math.max(0, digits.length - rule.code.length);
    return {
      hasPlus,
      digits,
      rule,
      localDigitsCount,
      minTotalDigits: rule.code.length + rule.minLocal,
      maxTotalDigits: rule.code.length + rule.maxLocal,
    };
  }

  return {
    hasPlus,
    digits,
    rule: null,
    localDigitsCount: digits.length,
    minTotalDigits: DEFAULT_MIN_DIGITS,
    maxTotalDigits: hasPlus ? GLOBAL_E164_MAX_DIGITS : DEFAULT_LOCAL_MAX_DIGITS,
  };
}

/**
 * Sanitiza y recorta el teléfono WhatsApp según el código de país detectado.
 * Permite solo '+' opcional al inicio y dígitos.
 * Si el país no se reconoce o no lleva '+', aplica límite seguro de 12 dígitos.
 */
export function sanitizeWhatsappPhone(rawValue: string): string {
  const hasPlus = rawValue.includes('+');
  const rawDigits = rawValue.replace(/\D/g, '');
  const candidate = hasPlus ? `+${rawDigits}` : rawDigits;
  const info = detectPhoneRule(candidate);
  const clampedDigits = rawDigits.slice(0, info.maxTotalDigits);
  return hasPlus ? `+${clampedDigits}` : clampedDigits;
}

export function validateWhatsappPhone(value: string, isEs: boolean): string | null {
  const info = detectPhoneRule(value);
  if (!info.digits) {
    return isEs ? 'Ingresa tu número de WhatsApp.' : 'Please enter your WhatsApp number.';
  }

  if (info.rule) {
    const country = isEs ? info.rule.countryEs : info.rule.countryEn;
    const expected =
      info.rule.minLocal === info.rule.maxLocal
        ? `${info.rule.minLocal}`
        : `${info.rule.minLocal}-${info.rule.maxLocal}`;

    if (info.digits.length < info.minTotalDigits) {
      return isEs
        ? `Para ${country} (+${info.rule.code}) ingresa ${expected} dígitos después del código.`
        : `For ${country} (+${info.rule.code}), enter ${expected} digits after the code.`;
    }
    return null;
  }

  if (info.digits.length < DEFAULT_MIN_DIGITS) {
    return isEs
      ? `Ingresa al menos ${DEFAULT_MIN_DIGITS} dígitos (ej: +56987676879).`
      : `Enter at least ${DEFAULT_MIN_DIGITS} digits (e.g. +56987676879).`;
  }

  return null;
}
