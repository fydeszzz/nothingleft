export function safeUrl(url) {
  try {
    const u = new URL(url);
    return ['https:', 'http:'].includes(u.protocol) ? u.href : null;
  } catch { return null; }
}

export function safeTel(phone) {
  return /^[\d\s\-().+]+$/.test(phone ?? '') ? `tel:${phone}` : null;
}

export function hexToRgba(hex, a) {
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);
  return `rgba(${r},${g},${b},${a})`;
}
