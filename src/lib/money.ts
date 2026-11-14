/**
 * Formatea céntimos como moneda. El dinero siempre se guarda en enteros.
 */
export function formatPrice(cents: number, locale = "es-ES"): string {
  if (!Number.isInteger(cents)) {
    throw new TypeError("Los precios deben expresarse en céntimos enteros.");
  }

  return new Intl.NumberFormat(locale, {
    style: "currency",
    currency: "EUR",
    minimumFractionDigits: 2,
  }).format(cents / 100);
}
