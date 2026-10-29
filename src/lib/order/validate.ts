import { parseMoney } from "./pricing";
import type { Checkout } from "./types";

export type CheckoutErrors = Partial<Record<keyof Checkout, string>>;

export function validateCheckout(checkout: Checkout, total: number): CheckoutErrors {
  const errors: CheckoutErrors = {};
  const name = checkout.name.trim();
  if (name.length < 2) errors.name = "Escribí tu nombre para saber de quién es el pedido.";
  else if (name.length > 40) errors.name = "Usá hasta 40 caracteres.";

  if (checkout.mode === "delivery" && !checkout.street.trim()) {
    errors.street = "Necesitamos calle y número para llevarte el pedido.";
  }

  if (checkout.payment === "efectivo" && checkout.cashAmount.trim()) {
    const cash = parseMoney(checkout.cashAmount);
    if (cash === null || cash < total) {
      errors.cashAmount = "El monto tiene que cubrir el total. Dejalo vacío si pagás justo.";
    }
  }
  return errors;
}
