import { formatMoney, lineTotal, parseMoney, subtotal } from "./pricing";
import type { CartLine, Checkout, Product } from "./types";

export const WHATSAPP_NUMBER = "5491126967922";

/** Un grupo de renglones; `key` liga los renglones de un ítem con su línea de carrito. */
export type TicketGroup = { key: string; lines: string[] };
export type TicketSection = { id: "header" | "items" | "totals" | "customer"; groups: TicketGroup[] };

type BuildInput = {
  orderId: string;
  lines: CartLine[];
  checkout: Checkout;
  getProduct: (id: string) => Product | undefined;
};

const modeLabel: Record<Checkout["mode"], string> = {
  retiro: "Retiro en el local",
  delivery: "Delivery",
  local: "Para comer en el local",
};

/**
 * Arma la comanda como secciones de renglones. El ticket de la pantalla y
 * el texto de WhatsApp salen de acá: lo que se ve es lo que se envía.
 */
export function buildTicket({ orderId, lines, checkout, getProduct }: BuildInput): TicketSection[] {
  const header: TicketGroup = {
    key: "header",
    lines: ["*NUEVO PEDIDO · EL BOCADILLO*", `Comanda ${orderId}`],
  };

  const items: TicketGroup[] = [];
  for (const line of lines) {
    const product = getProduct(line.productId);
    if (!product) continue;
    const variant = product.variants?.find((v) => v.id === line.variantId);
    const title = variant ? `${product.name} (${variant.label})` : product.name;
    const rows = [`*${line.qty}x ${title}* — ${formatMoney(lineTotal(line, product))}`];
    for (const extra of product.extras ?? []) {
      if (line.extraIds.includes(extra.id)) rows.push(`  + ${extra.label}`);
    }
    for (const ingredient of line.removed) rows.push(`  - Sin ${ingredient.toLowerCase()}`);
    if (line.note.trim()) rows.push(`  > ${line.note.trim()}`);
    items.push({ key: line.key, lines: rows });
  }

  const total = subtotal(lines, getProduct);
  const isDelivery = checkout.mode === "delivery";
  const totals: TicketGroup = {
    key: "totals",
    lines: isDelivery
      ? [`Subtotal: ${formatMoney(total)}`, "Envío: a confirmar", `*Total: ${formatMoney(total)} + envío*`]
      : [`*Total: ${formatMoney(total)}*`],
  };

  const customer: string[] = [`*Entrega:* ${modeLabel[checkout.mode]}`];
  if (isDelivery) {
    if (checkout.street.trim()) customer.push(`Dirección: ${checkout.street.trim()}`);
    if (checkout.between.trim()) customer.push(`Entre: ${checkout.between.trim()}`);
    if (checkout.reference.trim()) customer.push(`Referencia: ${checkout.reference.trim()}`);
  }
  if (checkout.name.trim()) customer.push(`*Nombre:* ${checkout.name.trim()}`);
  if (checkout.phone.trim()) customer.push(`*Teléfono:* ${checkout.phone.trim()}`);
  customer.push(`*Pago:* ${paymentLine(checkout)}`);
  if (checkout.notes.trim()) customer.push(`*Aclaraciones:* ${checkout.notes.trim()}`);

  return [
    { id: "header", groups: [header] },
    { id: "items", groups: items },
    { id: "totals", groups: [totals] },
    { id: "customer", groups: [{ key: "customer", lines: customer }] },
  ];
}

function paymentLine(checkout: Checkout): string {
  if (checkout.payment === "transferencia") return "Transferencia (pasame el alias)";
  const cash = parseMoney(checkout.cashAmount);
  return cash ? `Efectivo, abona con ${formatMoney(cash)}` : "Efectivo";
}

export function ticketToText(sections: TicketSection[]): string {
  return sections
    .map((s) => s.groups.flatMap((g) => g.lines).join("\n"))
    .filter(Boolean)
    .join("\n\n");
}

export function whatsappUrl(text: string, phone = WHATSAPP_NUMBER): string {
  return `https://wa.me/${phone}?text=${encodeURIComponent(text)}`;
}

/** Número corto para que el local referencie la comanda: B-0000 a B-9999. */
export function newOrderId(random: () => number = Math.random): string {
  return `B-${String(Math.floor(random() * 10000)).padStart(4, "0")}`;
}

/** Divide un renglón con negritas de WhatsApp (*texto*) en tramos. */
export function parseBold(line: string): { text: string; bold: boolean }[] {
  return line
    .split(/(\*[^*]+\*)/g)
    .filter(Boolean)
    .map((part) =>
      part.startsWith("*") && part.endsWith("*") && part.length > 1
        ? { text: part.slice(1, -1), bold: true }
        : { text: part, bold: false },
    );
}
