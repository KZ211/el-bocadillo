import type { Category, Extra, Product } from "@/lib/order/types";

/**
 * Menú de El Bocadillo — única fuente de verdad de productos y precios.
 * Precios tomados del catálogo de WhatsApp Business y de los menús
 * "Menú Burger" / "Menú Bocadillos" (octubre 2026).
 *
 * Para agregar una foto: copiar el archivo en `public/menu/<id>.jpg`
 * y agregar `image: "/menu/<id>.jpg"` al producto.
 */

export const categories: Category[] = [
  { id: "burgers", name: "Burgers", description: "Todas vienen con porción de papas." },
  { id: "quintuples", name: "Quíntuples", description: "Cinco medallones. Para valientes." },
  { id: "bocadillos", name: "Bocadillos", description: "Sándwiches, papas y nuggets." },
  { id: "pizzas", name: "Pizzas" },
];

const burgerSizes = (simple: number, doble: number, triple: number, cuadruple: number) => [
  { id: "simple", label: "Simple", price: simple },
  { id: "doble", label: "Doble", price: doble },
  { id: "triple", label: "Triple", price: triple },
  { id: "cuadruple", label: "Cuádruple", price: cuadruple },
];

export const burgerExtras: Extra[] = [
  { id: "tomate-lechuga", label: "Tomate y lechuga", price: 1500 },
  { id: "huevo", label: "Huevo frito", price: 1500 },
  { id: "panceta", label: "Panceta", price: 1500 },
  { id: "cebolla-caramelizada", label: "Cebolla caramelizada", price: 1500 },
  { id: "picante", label: "Picante", price: 1500 },
  { id: "bano-cheddar", label: "Baño de cheddar", price: 3500 },
];

export const papasExtras: Extra[] = [
  { id: "mayonesa", label: "Mayonesa", price: 1000 },
  { id: "ketchup", label: "Ketchup", price: 1000 },
  { id: "mostaza", label: "Mostaza", price: 1000 },
  { id: "golf", label: "Salsa golf", price: 1000 },
  { id: "salsa-picante", label: "Salsa picante", price: 1000 },
  { id: "cheddar-bacon-verdeo", label: "Cheddar, bacon y verdeo", price: 3500 },
  { id: "salchicha", label: "Salchicha", price: 3500 },
  { id: "milanesa", label: "Milanesa", price: 3500 },
];

export const products: Product[] = [
  // Burgers
  {
    id: "cheeseburger",
    categoryId: "burgers",
    name: "Cheeseburger",
    description: "Medallón y cheddar. Con porción de papas.",
    variants: burgerSizes(8400, 11600, 12700, 14200),
    extras: burgerExtras,
    removable: ["Cheddar"],
  },
  {
    id: "fit",
    categoryId: "burgers",
    name: "Fit Burger",
    description: "Medallón, cheddar, cebolla, tomate, lechuga y salsa de la casa. Con porción de papas.",
    variants: burgerSizes(10400, 12400, 13100, 14800),
    extras: burgerExtras,
    removable: ["Cheddar", "Cebolla", "Tomate", "Lechuga", "Salsa de la casa"],
  },
  {
    id: "onion",
    categoryId: "burgers",
    name: "Onion",
    description: "Medallón, cheddar, cebolla caramelizada, panceta y salsa de la casa. Con porción de papas.",
    variants: burgerSizes(10700, 13200, 14400, 17200),
    extras: burgerExtras,
    removable: ["Cheddar", "Cebolla caramelizada", "Panceta", "Salsa de la casa"],
  },
  {
    id: "chancha",
    categoryId: "burgers",
    name: "Chancha",
    description:
      "Medallón, cheddar, cebolla caramelizada, panceta, huevo frito, baño de cheddar y jamón. Con porción de papas.",
    variants: burgerSizes(12800, 15400, 17200, 19600),
    extras: burgerExtras,
    removable: ["Cebolla caramelizada", "Panceta", "Huevo frito", "Jamón"],
  },

  // Quíntuples
  {
    id: "big-beicon",
    categoryId: "quintuples",
    name: "Big Beicon 5X",
    description: "Cinco medallones con panceta y cheddar.",
    price: 18200,
    extras: burgerExtras,
    removable: ["Panceta"],
  },
  {
    id: "extrema",
    categoryId: "quintuples",
    name: "Extrema",
    description: "Cinco medallones, baño completo de cheddar fundido y panceta cortada chiquita arriba.",
    price: 21200,
    extras: burgerExtras,
    removable: ["Panceta"],
  },

  // Bocadillos
  {
    id: "mila-simple",
    categoryId: "bocadillos",
    name: "Sándwich de milanesa simple",
    description: "Jamón, queso y aderezos.",
    price: 14000,
    removable: ["Jamón", "Queso", "Aderezos"],
  },
  {
    id: "mila-completo",
    categoryId: "bocadillos",
    name: "Sándwich de milanesa completo",
    description: "Tomate, lechuga, jamón, queso y huevo frito.",
    price: 16000,
    removable: ["Tomate", "Lechuga", "Jamón", "Queso", "Huevo frito"],
  },
  {
    id: "lomito",
    categoryId: "bocadillos",
    name: "Sándwich de lomito",
    description: "Tomate, lechuga, jamón y queso.",
    price: 14500,
    removable: ["Tomate", "Lechuga", "Jamón", "Queso"],
  },
  {
    id: "caja-papas",
    categoryId: "bocadillos",
    name: "Caja de papas",
    description: "Con verdeo, cheddar y panceta.",
    variants: [
      { id: "chica", label: "Chica", price: 14000 },
      { id: "grande", label: "Grande", price: 16000 },
    ],
    extras: papasExtras,
    removable: ["Verdeo", "Panceta"],
  },
  {
    id: "nuggets",
    categoryId: "bocadillos",
    name: "Caja de nuggets",
    description: "Nuggets de pollo con aderezo.",
    price: 10500,
    extras: papasExtras.slice(0, 5),
  },
  {
    id: "nuggets-papas",
    categoryId: "bocadillos",
    name: "Caja de nuggets + papas",
    description: "Nuggets de pollo con papas.",
    price: 13000,
    extras: papasExtras,
  },

  // Pizzas
  {
    id: "muzza",
    categoryId: "pizzas",
    name: "Muzza",
    description: "Salsa, muzzarella, aceitunas y orégano.",
    price: 10000,
    removable: ["Aceitunas"],
  },
  {
    id: "napolitana",
    categoryId: "pizzas",
    name: "Napolitana",
    description: "Muzzarella, jamón, rodajas de tomate, aceitunas y orégano.",
    price: 14000,
    removable: ["Aceitunas", "Jamón"],
  },
  {
    id: "jamon-morron",
    categoryId: "pizzas",
    name: "Jamón y morrón",
    description: "Muzzarella, jamón, morrón, aceitunas y orégano.",
    price: 16000,
    removable: ["Aceitunas"],
  },
  {
    id: "pizza-chancha",
    categoryId: "pizzas",
    name: "Pizza Chancha",
    description: "Muzzarella y cheddar coronada con huevos fritos.",
    price: 20000,
  },
];

export const productsById = new Map(products.map((p) => [p.id, p]));
