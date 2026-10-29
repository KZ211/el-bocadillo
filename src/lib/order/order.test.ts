import { describe, expect, it } from "vitest";
import { productsById } from "@/data/menu";
import { storeStatus } from "./hours";
import { buildTicket, newOrderId, parseBold, ticketToText, whatsappUrl } from "./message";
import { addLine, formatMoney, lineKey, parseMoney, subtotal, unitPrice } from "./pricing";
import { emptyCheckout, type CartLine } from "./types";
import { validateCheckout } from "./validate";

const get = (id: string) => productsById.get(id);
const onion = get("onion")!;

const doubleOnion: Omit<CartLine, "key"> = {
  productId: "onion",
  variantId: "doble",
  extraIds: ["huevo"],
  removed: ["Cebolla caramelizada"],
  note: "bien cocida",
  qty: 1,
};

describe("precios", () => {
  it("formatea pesos argentinos sin decimales", () => {
    expect(formatMoney(14500)).toBe("$14.500");
  });

  it("interpreta montos escritos a mano", () => {
    expect(parseMoney("$30.000")).toBe(30000);
    expect(parseMoney("abc")).toBeNull();
  });

  it("suma variante y extras", () => {
    expect(unitPrice(onion, "doble", ["huevo", "bano-cheddar"])).toBe(13200 + 1500 + 3500);
  });

  it("agrupa líneas idénticas y separa las distintas", () => {
    let lines = addLine([], doubleOnion);
    lines = addLine(lines, { ...doubleOnion, qty: 2 });
    expect(lines).toHaveLength(1);
    expect(lines[0].qty).toBe(3);
    lines = addLine(lines, { ...doubleOnion, note: "" });
    expect(lines).toHaveLength(2);
    expect(lineKey({ ...doubleOnion, extraIds: ["b", "a"] })).toBe(lineKey({ ...doubleOnion, extraIds: ["a", "b"] }));
  });

  it("calcula el subtotal", () => {
    const lines = addLine(addLine([], doubleOnion), { productId: "muzza", extraIds: [], removed: [], note: "", qty: 2 });
    expect(subtotal(lines, get)).toBe(13200 + 1500 + 20000);
  });
});

describe("mensaje de WhatsApp", () => {
  const lines = addLine([], doubleOnion);

  it("arma el pedido de delivery completo", () => {
    const text = ticketToText(
      buildTicket({
        orderId: "B-0042",
        lines,
        getProduct: get,
        checkout: {
          ...emptyCheckout,
          name: "Juan",
          phone: "11 2345-6789",
          mode: "delivery",
          street: "Dorrego 500",
          between: "Sarmiento y Mitre",
          payment: "efectivo",
          cashAmount: "20000",
        },
      }),
    );
    expect(text).toBe(
      [
        "*NUEVO PEDIDO · EL BOCADILLO*",
        "Comanda B-0042",
        "",
        "*1x Onion (Doble)* — $14.700",
        "  + Huevo frito",
        "  - Sin cebolla caramelizada",
        "  > bien cocida",
        "",
        "Subtotal: $14.700",
        "Envío: a confirmar",
        "*Total: $14.700 + envío*",
        "",
        "*Entrega:* Delivery",
        "Dirección: Dorrego 500",
        "Entre: Sarmiento y Mitre",
        "*Nombre:* Juan",
        "*Teléfono:* 11 2345-6789",
        "*Pago:* Efectivo, abona con $20.000",
      ].join("\n"),
    );
  });

  it("en retiro no menciona envío y pide alias si es transferencia", () => {
    const text = ticketToText(
      buildTicket({ orderId: "B-1", lines, getProduct: get, checkout: { ...emptyCheckout, payment: "transferencia" } }),
    );
    expect(text).not.toContain("envío");
    expect(text).toContain("*Entrega:* Retiro en el local");
    expect(text).toContain("*Pago:* Transferencia (pasame el alias)");
  });

  it("codifica el link de wa.me", () => {
    expect(whatsappUrl("hola mundo", "549")).toBe("https://wa.me/549?text=hola%20mundo");
  });

  it("genera números de comanda de 4 dígitos", () => {
    expect(newOrderId(() => 0.0042)).toBe("B-0042");
  });

  it("separa negritas", () => {
    expect(parseBold("*Pago:* Efectivo")).toEqual([
      { text: "Pago:", bold: true },
      { text: " Efectivo", bold: false },
    ]);
  });
});

describe("validación", () => {
  it("exige nombre y dirección en delivery", () => {
    const errors = validateCheckout({ ...emptyCheckout, mode: "delivery" }, 10000);
    expect(errors.name).toBeDefined();
    expect(errors.street).toBeDefined();
  });

  it("rechaza efectivo menor al total", () => {
    expect(validateCheckout({ ...emptyCheckout, name: "Ana", cashAmount: "5000" }, 10000).cashAmount).toBeDefined();
    expect(validateCheckout({ ...emptyCheckout, name: "Ana", cashAmount: "" }, 10000)).toEqual({});
  });
});

describe("horario", () => {
  // Fechas en UTC; Argentina es UTC-3.
  const at = (iso: string) => storeStatus(new Date(iso));

  it("abierto el lunes al mediodía", () => {
    expect(at("2026-10-26T15:00:00Z")).toEqual({ open: true, closesAt: "15:30" });
  });

  it("el turno noche del viernes sigue abierto el sábado a la 1", () => {
    expect(at("2026-10-31T04:00:00Z")).toEqual({ open: true, closesAt: "02:30" });
  });

  it("cerrado el miércoles a la noche, abre el jueves", () => {
    expect(at("2026-10-29T00:00:00Z")).toEqual({ open: false, opensAt: "mañana a las 11:00" });
  });

  it("después del corte de las 02:30 está cerrado", () => {
    expect(at("2026-10-27T05:45:00Z")).toEqual({ open: false, opensAt: "hoy a las 11:00" });
  });

  it("el sábado a la tarde abre el domingo", () => {
    expect(at("2026-10-31T18:00:00Z")).toEqual({ open: false, opensAt: "mañana a las 11:00" });
  });
});
