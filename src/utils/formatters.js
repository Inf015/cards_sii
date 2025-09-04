// src/utils/formatters.js

// elimina todo lo que no sea dígito
export function onlyDigits(s) {
  return (s || "").replace(/\D+/g, "");
}

// normaliza entrada del número de tarjeta (máx. 16 dígitos)
export function normalizeCardNumberInput(s) {
  return onlyDigits(s).slice(0, 16);
}

// normaliza entrada de fecha a formato MM/YY
export function normalizeExpiryInput(s) {
  const d = onlyDigits(s).slice(0, 4); // MMYY
  if (d.length <= 2) return d;
  return d.slice(0, 2) + "/" + d.slice(2);
}

// normaliza nombre (solo letras, máx. 20)
export function normalizeNameInput(s) {
  return (s || "")
    .normalize("NFC")
    .replace(/[^A-Za-zÀ-ÖØ-öø-ÿ\u00C0-\u017F\s]/g, "")
    .slice(0, 20);
}

// normaliza CVV (3–4 dígitos)
export function normalizeCvvInput(s) {
  return onlyDigits(s).slice(0, 4);
}

// agrupa número en 4-4-4-4 (para preview)
export function groupCard(number) {
  const digits = onlyDigits(number).slice(0, 16);
  return digits
    ? digits.replace(/(.{4})/g, "$1 ").trim()
    : "•••• •••• •••• ••••";
}

// enmascara tarjeta (para lista final)
export function maskCard(number, { showStart = 4, showEnd = 4 } = {}) {
  const d = onlyDigits(number);
  if (d.length <= showStart + showEnd) return d;
  const start = d.slice(0, showStart);
  const end = d.slice(-showEnd);
  const middleMask = "*".repeat(d.length - showStart - showEnd);
  return `${start}${middleMask}${end}`;
}

// normaliza fecha para la vista (MM/YY)
export function normalizeExpiryForView(v) {
  const d = onlyDigits(v).slice(0, 4);
  if (!d) return "MM/YY";
  const mm = (d.slice(0, 2) || "").padStart(2, "0");
  const yy = d.slice(2, 4);
  return yy ? `${mm}/${yy}` : `${mm}/YY`;
}
