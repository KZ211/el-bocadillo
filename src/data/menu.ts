import type { Category, Extra, Hero, Product } from "@/lib/order/types";

/**
 * Menú de El Bocadillo — única fuente de verdad de productos y precios.
 * Precios tomados de las cartas impresas del local (fotos en `docs/menus/`,
 * spec 004) y del catálogo de WhatsApp Business (noviembre 2026).
 *
 * Fotos: copiar el archivo en `public/menu/<id>.jpg` y aparece solo.
 */

export const categories: Category[] = [
  { id: "burgers", name: "Burgers", icon: "burger", description: "Todas vienen con porción de papas." },
  { id: "de-la-casa", name: "De la casa", icon: "flame", description: "Las firmas de El Bocadillo. Para valientes." },
  { id: "bocadillos", name: "Bocadillos", icon: "sandwich", description: "Sándwiches, papas y nuggets." },
  { id: "pizzas", name: "Pizzas", icon: "pizza" },
  { id: "bebidas", name: "Bebidas", icon: "soda", description: "Sin alcohol.", layout: "list" },
  { id: "tragos", name: "Tragos en jarra", icon: "cocktail", adults: true, layout: "list" },
  { id: "con-alcohol", name: "Latas y combos", icon: "beer", adults: true, layout: "list" },
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

/**
 * Destacado del hero. Cuando el local confirme una promo, cargala como
 * producto y apuntá el hero a ella.
 */
export const hero: Hero = { productId: "big-beicon", headline: "¡No te quedes con las ganas!" };

/**
 * "¿Le sumás algo?": complementos en orden de prioridad, como el "¿con papas
 * y bebida?" de las cadenas. Se sugiere uno por categoría que falte en el
 * pedido; nunca bebidas con alcohol.
 */
export const complements: string[] = ["coca-175", "caja-papas", "nuggets"];

export const products: Product[] = [
  // Burgers
  {
    id: "cheeseburger",
    featured: true,
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
    featured: true,
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

  // De la casa
  {
    id: "big-beicon",
    featured: true,
    categoryId: "de-la-casa",
    name: "Big Beicon 5X",
    description: "Cinco medallones con panceta y cheddar.",
    price: 18200,
    extras: burgerExtras,
    removable: ["Panceta"],
  },
  {
    id: "extrema",
    categoryId: "de-la-casa",
    name: "Extrema",
    description: "Cinco medallones, baño completo de cheddar fundido y panceta cortada chiquita arriba.",
    price: 21200,
    extras: burgerExtras,
    removable: ["Panceta"],
  },

  // Odisea, Kratos y Tóxica: en la carta de firmas pero sin precio.
  // Ocultas hasta que el local pase el precio (spec 004).
  {
    id: "odisea",
    categoryId: "de-la-casa",
    name: "Odisea",
    description: "Tres medallones, cheddar, cebolla crispy, panceta, salsa tasty y barbacoa.",
    price: 0,
    available: false,
    extras: burgerExtras,
    removable: ["Cebolla crispy", "Panceta", "Salsa tasty", "Barbacoa"],
  },
  {
    id: "kratos",
    categoryId: "de-la-casa",
    name: "Kratos",
    description: "Tres medallones, cheddar, cebolla caramelizada, panceta, cebolla crispy, barbacoa y alioli.",
    price: 0,
    available: false,
    extras: burgerExtras,
    removable: ["Cebolla caramelizada", "Panceta", "Cebolla crispy", "Barbacoa", "Alioli"],
  },
  {
    id: "toxica",
    categoryId: "de-la-casa",
    name: "Tóxica",
    description: "Tres medallones, cheddar, Takis y criolla de la casa.",
    price: 0,
    available: false,
    extras: burgerExtras,
    removable: ["Takis", "Criolla"],
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
    featured: true,
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

  // Bebidas sin alcohol. La carta no lista los gustos de lata y 600 ml:
  // el cliente lo escribe en la hoja (notePrompt).
  { id: "gaseosa-lata", categoryId: "bebidas", name: "Gaseosa en lata", description: "", notePrompt: "¿Qué gusto?", price: 1700 },
  { id: "gaseosa-600", categoryId: "bebidas", name: "Gaseosa 600 ml", description: "", notePrompt: "¿Qué gusto?", price: 2200 },
  { id: "coca-175", categoryId: "bebidas", name: "Coca-Cola 1,75 L", description: "", price: 4500 },
  { id: "pepsi-175", categoryId: "bebidas", name: "Pepsi 1,75 L", description: "", price: 4500 },
  { id: "sprite-175", categoryId: "bebidas", name: "Sprite 1,75 L", description: "", price: 4500 },
  { id: "manaos-225", categoryId: "bebidas", name: "Manaos 2,25 L", description: "", price: 1700 },
  { id: "baggio-1l", categoryId: "bebidas", name: "Baggio multifruta 1 L", description: "", price: 2500 },
  { id: "speed", categoryId: "bebidas", name: "Speed", description: "", price: 2700 },
  { id: "monster", categoryId: "bebidas", name: "Monster Watermelon", description: "", price: 3200 },

  // Tragos en jarra
  { id: "snoopy", categoryId: "tragos", name: "Snoopy", description: "Sprite, rodaja de limón, Smirnoff verde y regaliz verde.", price: 7000 },
  { id: "megamente", categoryId: "tragos", name: "Megamente", description: "Gatorade, Sky y regaliz azul.", price: 7000 },
  { id: "wolverine", categoryId: "tragos", name: "Wolverine", description: "Smirnoff sandía, Baggio, regaliz arcoíris y Monster rojo.", price: 7000 },
  { id: "deadpool", categoryId: "tragos", name: "Deadpool", description: "Monster rojo, Smirnoff rojo y gomitas.", price: 7000 },
  { id: "recluta", categoryId: "tragos", name: "Recluta", description: "Speed con Sky.", price: 10000 },
  { id: "jarra-fernet", categoryId: "tragos", name: "Fernet con Coca", description: "En jarra.", price: 8000 },
  { id: "jarra-gancia", categoryId: "tragos", name: "Gancia con Sprite", description: "En jarra.", price: 7000 },

  // Latas y combos
  { id: "brahma-lata", categoryId: "con-alcohol", name: "Brahma en lata", description: "", price: 2500 },
  { id: "schneider-lata", categoryId: "con-alcohol", name: "Schneider en lata", description: "", price: 2000 },
  { id: "gancia-lata", categoryId: "con-alcohol", name: "Gancia en lata", description: "", price: 2700 },
  { id: "fernet-lata", categoryId: "con-alcohol", name: "Fernet en lata", description: "", price: 3000 },
  { id: "smirnoff-lata", categoryId: "con-alcohol", name: "Smirnoff en lata", description: "", price: 3000 },
  { id: "combo-gancia-sprite", categoryId: "con-alcohol", name: "Combo Gancia + Sprite", description: "", price: 12000 },
  { id: "combo-fernet-coca", categoryId: "con-alcohol", name: "Combo Fernet + Coca", description: "", price: 20000 },
  { id: "combo-cosecha-speed", categoryId: "con-alcohol", name: "Combo Cosecha + Speed", description: "", price: 7000 },
  { id: "combo-fede-speed", categoryId: "con-alcohol", name: "Combo Fede + Speed", description: "", price: 9500 },
  { id: "combo-balbo-manaos", categoryId: "con-alcohol", name: "Combo Balbo + Manaos", description: "", price: 5500 },
  { id: "combo-termidor-manaos", categoryId: "con-alcohol", name: "Combo Termidor + Manaos", description: "", price: 5000 },
  { id: "combo-vina-manaos", categoryId: "con-alcohol", name: "Combo Viña + Manaos", description: "", price: 5500 },
];

export const productsById = new Map(products.map((p) => [p.id, p]));
