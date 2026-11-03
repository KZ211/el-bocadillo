export type CategoryIcon = "burger" | "flame" | "sandwich" | "fries" | "pizza" | "soda" | "cocktail" | "beer";

export type Category = {
  id: string;
  name: string;
  /** Ícono del riel de categorías y del placeholder de fotos. */
  icon?: CategoryIcon;
  /** Con alcohol: aviso +18 y fuera de "¿Le sumás algo?". */
  adults?: boolean;
  /** "list": renglones compactos para listas largas sin fotos (bebidas). Por defecto, grilla de tarjetas. */
  layout?: "grid" | "list";
  /** Reservado para navegación jerárquica (subcategorías). */
  parentId?: string;
  description?: string;
};

export type Variant = { id: string; label: string; price: number };
export type Extra = { id: string; label: string; price: number };

export type Product = {
  id: string;
  categoryId: string;
  name: string;
  description: string;
  image?: string;
  /** Precio cuando el producto no tiene variantes. */
  price?: number;
  variants?: Variant[];
  extras?: Extra[];
  /** Ingredientes que el cliente puede pedir quitar. */
  removable?: string[];
  available?: boolean;
  /** Pregunta obligatoria en la aclaración (ej. el gusto): el "+" abre la hoja en vez de agregar directo. */
  notePrompt?: string;
  /** Aparece en "Recomendadas". */
  featured?: boolean;
};

/** Un paso del pedido guiado (spec 005): qué categorías muestra. */
export type OrderStep = { id: string; title: string; short: string; categoryIds: string[] };

/** Destacado del hero. */
export type Hero = { productId: string; headline: string };

export type CartLine = {
  key: string;
  productId: string;
  variantId?: string;
  extraIds: string[];
  removed: string[];
  note: string;
  qty: number;
};

export type DeliveryMode = "retiro" | "delivery" | "local";
export type PaymentMethod = "efectivo" | "transferencia";

export type Checkout = {
  name: string;
  phone: string;
  mode: DeliveryMode;
  street: string;
  between: string;
  reference: string;
  payment: PaymentMethod;
  cashAmount: string;
  notes: string;
};

export const emptyCheckout: Checkout = {
  name: "",
  phone: "",
  mode: "retiro",
  street: "",
  between: "",
  reference: "",
  payment: "efectivo",
  cashAmount: "",
  notes: "",
};
