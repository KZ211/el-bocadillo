"use client";

import { useSyncExternalStore } from "react";
import { addLine, MAX_QTY } from "@/lib/order/pricing";
import { newOrderId } from "@/lib/order/message";
import { emptyCheckout, type CartLine, type Checkout, type DeliveryMode } from "@/lib/order/types";

type State = {
  lines: CartLine[];
  checkout: Checkout;
  remember: boolean;
  orderId: string;
  /** Última línea tocada: queda resaltada en el ticket hasta el próximo cambio. */
  lastKey: string | null;
  /** Modo de entrega guardado de una visita anterior (se resalta en "¿Cómo lo querés?"). */
  savedMode: DeliveryMode | null;
};

const CART_KEY = "bocadillo:comanda";
const CUSTOMER_KEY = "bocadillo:cliente";

const initial: State = {
  lines: [],
  checkout: emptyCheckout,
  remember: true,
  orderId: "B-····",
  lastKey: null,
  savedMode: null,
};

let state = initial;
let loaded = false;
const listeners = new Set<() => void>();

function read<T>(key: string): T | null {
  try {
    const raw = window.localStorage.getItem(key);
    return raw ? (JSON.parse(raw) as T) : null;
  } catch {
    return null;
  }
}

function write(key: string, value: unknown) {
  try {
    if (value === null) window.localStorage.removeItem(key);
    else window.localStorage.setItem(key, JSON.stringify(value));
  } catch {
    // Sin almacenamiento (modo privado, bloqueado): la app sigue en memoria.
  }
}

function load() {
  if (loaded || typeof window === "undefined") return;
  loaded = true;
  const cart = read<{ lines: CartLine[]; orderId: string }>(CART_KEY);
  const customer = read<{ checkout: Checkout }>(CUSTOMER_KEY);
  state = {
    ...state,
    lines: Array.isArray(cart?.lines) ? cart.lines : [],
    orderId: cart?.orderId ?? newOrderId(),
    checkout: customer ? { ...emptyCheckout, ...customer.checkout, cashAmount: "", notes: "" } : emptyCheckout,
    remember: true,
    savedMode: customer?.checkout.mode ?? null,
  };
}

function set(patch: Partial<State>) {
  state = { ...state, ...patch };
  write(CART_KEY, { lines: state.lines, orderId: state.orderId });
  const { name, phone, mode, street, between, reference, payment } = state.checkout;
  write(
    CUSTOMER_KEY,
    state.remember ? { checkout: { name, phone, mode, street, between, reference, payment } } : null,
  );
  listeners.forEach((l) => l());
}

function subscribe(listener: () => void) {
  load();
  listeners.add(listener);
  // Notifica una vez tras hidratar para tomar lo guardado.
  queueMicrotask(listener);
  return () => listeners.delete(listener);
}

export const orderStore = {
  add(line: Omit<CartLine, "key">) {
    const lines = addLine(state.lines, line);
    const touched = lines.find((l) => !state.lines.some((p) => p.key === l.key && p.qty === l.qty));
    set({ lines, lastKey: touched?.key ?? null });
  },
  setQty(key: string, qty: number) {
    if (qty <= 0) return orderStore.remove(key);
    set({
      lines: state.lines.map((l) => (l.key === key ? { ...l, qty: Math.min(MAX_QTY, qty) } : l)),
      lastKey: key,
    });
  },
  remove(key: string) {
    set({ lines: state.lines.filter((l) => l.key !== key), lastKey: null });
  },
  updateCheckout(patch: Partial<Checkout>) {
    set({
      checkout: { ...state.checkout, ...patch },
      lastKey: null,
      ...(patch.mode ? { savedMode: patch.mode } : {}),
    });
  },
  setRemember(remember: boolean) {
    set({ remember });
  },
  /** Tras enviar: comanda nueva, se conservan los datos del cliente. */
  startNew() {
    set({
      lines: [],
      orderId: newOrderId(),
      lastKey: null,
      checkout: { ...state.checkout, cashAmount: "", notes: "" },
    });
  },
};

export function useOrder(): State {
  return useSyncExternalStore(
    subscribe,
    () => state,
    () => initial,
  );
}
