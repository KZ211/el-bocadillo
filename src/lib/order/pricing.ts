import type { CartLine, Product } from "./types";

const moneyFormat = new Intl.NumberFormat("es-AR", { maximumFractionDigits: 0 });

export function formatMoney(value: number): string {
  return `$${moneyFormat.format(Math.round(value))}`;
}

/** Parsea montos escritos a mano: "30.000", "$30000", "30 000". */
export function parseMoney(input: string): number | null {
  const digits = input.replace(/[^\d]/g, "");
  if (!digits) return null;
  return Number(digits);
}

export function basePrice(product: Product, variantId?: string): number {
  if (product.variants?.length) {
    const variant = product.variants.find((v) => v.id === variantId) ?? product.variants[0];
    return variant.price;
  }
  return product.price ?? 0;
}

export function fromPrice(product: Product): number {
  if (product.variants?.length) return Math.min(...product.variants.map((v) => v.price));
  return product.price ?? 0;
}

export function unitPrice(product: Product, variantId: string | undefined, extraIds: string[]): number {
  const extras = (product.extras ?? [])
    .filter((e) => extraIds.includes(e.id))
    .reduce((sum, e) => sum + e.price, 0);
  return basePrice(product, variantId) + extras;
}

export function lineTotal(line: CartLine, product: Product): number {
  return unitPrice(product, line.variantId, line.extraIds) * line.qty;
}

/** Dos líneas con la misma configuración comparten clave y se agrupan. */
export function lineKey(line: Omit<CartLine, "key" | "qty">): string {
  return [
    line.productId,
    line.variantId ?? "",
    [...line.extraIds].sort().join("+"),
    [...line.removed].sort().join("+"),
    line.note.trim().toLowerCase(),
  ].join("|");
}

export const MAX_QTY = 20;

export function addLine(lines: CartLine[], incoming: Omit<CartLine, "key">): CartLine[] {
  const key = lineKey(incoming);
  const existing = lines.find((l) => l.key === key);
  if (existing) {
    return lines.map((l) =>
      l.key === key ? { ...l, qty: Math.min(MAX_QTY, l.qty + incoming.qty) } : l,
    );
  }
  return [...lines, { ...incoming, note: incoming.note.trim(), key }];
}

export function subtotal(lines: CartLine[], getProduct: (id: string) => Product | undefined): number {
  return lines.reduce((sum, line) => {
    const product = getProduct(line.productId);
    return product ? sum + lineTotal(line, product) : sum;
  }, 0);
}
