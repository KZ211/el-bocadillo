import { describe, expect, it } from "vitest";
import { categories, products, productsById, steps } from "@/data/menu";
import { countInStep, nextScreen, productsForStep, screenOrder } from "./steps";
import type { CartLine } from "./types";

const get = (id: string) => productsById.get(id);
const step = (id: string) => steps.find((s) => s.id === id)!;
const line = (productId: string, qty = 1): CartLine => ({
  key: productId,
  productId,
  extraIds: [],
  removed: [],
  note: "",
  qty,
});

describe("pasos del pedido", () => {
  it("arranca preguntando cómo lo querés y termina en el pedido", () => {
    expect(screenOrder(steps)).toEqual(["modo", "comida", "bebidas", "pedido"]);
  });

  it("avanza de a un paso y no hay siguiente después del pedido", () => {
    expect(nextScreen(steps, "modo")).toBe("comida");
    expect(nextScreen(steps, "bebidas")).toBe("pedido");
    expect(nextScreen(steps, "pedido")).toBeNull();
  });

  it("toda categoría del menú pertenece a exactamente un paso", () => {
    for (const category of categories) {
      expect(steps.filter((s) => s.categoryIds.includes(category.id))).toHaveLength(1);
    }
  });

  it("muestra solo los productos disponibles del paso", () => {
    const comida = productsForStep(step("comida"), products).map((p) => p.id);
    expect(comida).toContain("big-beicon");
    expect(comida).not.toContain("odisea"); // sin precio todavía
    expect(comida).toContain("caja-papas"); // las papas son parte de la comida
    expect(productsForStep(step("bebidas"), products).map((p) => p.id)).not.toContain("caja-papas");
  });

  it("cuenta las unidades del pedido que son de cada paso", () => {
    const lines = [line("big-beicon", 2), line("nuggets")];
    expect(countInStep(step("comida"), lines, get)).toBe(3);
    expect(countInStep(step("bebidas"), lines, get)).toBe(0);
    expect(countInStep(step("bebidas"), [...lines, line("coca-175")], get)).toBe(1);
  });
});
