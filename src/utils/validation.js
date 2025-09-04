// valida si un número de tarjeta tiene exactamente 16 dígitos
export function isCardNumber(value) {
  return /^\d{16}$/.test(value);
}

// valida formato y rango de MM/YY
export function isExpiryMmYy(value, { minYear = 22, maxYearOffset = 5 } = {}) {
  if (!/^\d{2}\/\d{2}$/.test(value)) return false;
  const [mm, yy] = value.split("/").map(Number);

  if (mm < 1 || mm > 12) return false;

  const now = new Date();
  const currentYY = now.getFullYear() % 100;
  const maxYY = (currentYY + maxYearOffset) % 100;

  if (yy < minYear || yy > maxYY) return false;
  if (yy < currentYY) return false;
  if (yy === currentYY && mm < now.getMonth() + 1) return false;

  return true;
}

// valida nombre: solo letras + espacios, hasta 20 caracteres
export function isName(value) {
  return /^[A-Za-zÀ-ÖØ-öø-ÿ\u00C0-\u017F ]{1,20}$/.test(value);
}

// valida CVV: 3 o 4 dígitos
export function isCvv(value) {
  return /^\d{3,4}$/.test(value);
}
