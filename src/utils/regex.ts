export const REGEX = {
  // Format : AW-123456789
  GOOGLE_ADS_TAG: /^AW-\d{9}$/,
  // Vérifie si la chaîne ne contient que des chiffres
  NUMBERS_ONLY: /^\d+$/,
} as const;
