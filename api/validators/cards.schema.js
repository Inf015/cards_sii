export function validateRequired(payload) {
  const errs = [];
  for (const k of ["number", "name", "expiry"]) {
    if (!payload?.[k] || String(payload[k]).trim() === "") {
      errs.push(`${k} is required`);
    }
  }
  return errs;
}
