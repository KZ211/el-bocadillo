export type CategoryIcon = "burger" | "flame" | "sandwich" | "pizza";

export type Category = {
  id: string;
  name: string;
  /** Ícono del riel de categorías y del placeholder de fotos. */
  icon?: CategoryIcon;
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
  /** Aparece en "Recomendadas". */
  featured?: boolean;
};

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
