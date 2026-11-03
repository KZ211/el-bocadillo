import type { CartLine, OrderStep, Product } from "./types";

/**
 * Pantallas del pedido guiado (spec 005): "modo" (¿Cómo lo querés?), los
 * pasos del menú definidos en `steps` y "pedido" (Tu pedido).
 */
export type Screen = "modo" | "pedido" | (string & {});

/** Orden completo de pantallas: modo, pasos del menú y pedido. */
export function screenOrder(steps: OrderStep[]): Screen[] {
  return ["modo", ...steps.map((s) => s.id), "pedido"];
}

/** Pantalla siguiente; en "pedido" no hay siguiente. */
export function nextScreen(steps: OrderStep[], current: Screen): Screen | null {
  const order = screenOrder(steps);
  const i = order.indexOf(current);
  return i >= 0 && i < order.length - 1 ? order[i + 1] : null;
}

export function productsForStep(step: OrderStep, products: Product[]): Product[] {
  const ids = new Set(step.categoryIds);
  return products.filter((p) => ids.has(p.categoryId) && p.available !== false);
}

/** Unidades del pedido que pertenecen al paso: con 0, el botón dice "No, gracias". */
export function countInStep(
  step: OrderStep,
  lines: CartLine[],
  getProduct: (id: string) => Product | undefined,
): number {
  const ids = new Set(step.categoryIds);
  return lines.reduce((sum, line) => {
    const category = getProduct(line.productId)?.categoryId;
    return category && ids.has(category) ? sum + line.qty : sum;
  }, 0);
}
