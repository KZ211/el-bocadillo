# 004 — Menú real: bebidas, tragos, burgers de la casa y fotos

- **Estado:** implementada (Odisea, Kratos y Tóxica cargadas pero ocultas hasta tener precio)
- **Rama/PR:** `redesign`

## Contexto
El dueño pasó fotos de las cartas impresas del local (originales en `docs/menus/`, no se publican):

| Foto | Carta |
|---|---|
| `IMG_4768` | Burgers de la casa: Extrema, Big Beicon 5X, Odisea, Kratos y Tóxica, con fotos y sin precios |
| `IMG_4769` | Menú Burger: Cheeseburger, Fit, Onion y Chancha, en 4 tamaños, más los agregados |
| `IMG_4770` | Tragos en jarra |
| `IMG_4771` | Bebidas: con alcohol, combos y sin alcohol |
| `IMG_4772`, `IMG_4773` | Menú Bocadillos (dos fotos de la misma carta) |
| `IMG_4812`, `IMG_4813` | Piezas de Instagram: promo 4 Cheeseburger doble + papas $35.000 y promo 2 Cheeseburger doble + papas $20.000 |

Los precios del Menú Burger y del Menú Bocadillos coinciden con `src/data/menu.ts`. Faltaban las bebidas, los tragos y tres burgers de la casa.

## Alcance
### Incluye
- Categoría **Bebidas** (sin alcohol).
- Categorías **Tragos en jarra** y **Latas y combos** (con alcohol), marcadas `adults`: muestran "Solo para mayores de 18" y nunca aparecen en "¿Le sumás algo?".
- La categoría "Quíntuples" pasa a **De la casa**, con las cinco burgers de la carta de firmas.
- Categoría **Promos** al principio de Comida (como las "Ofertas" de las cadenas): 2 Cheeseburger doble + papas ($20.000) y 4 Cheeseburger doble + papas ($35.000), con fotos recortadas de las piezas. La de $20.000 es el destacado del hero; con esto queda resuelta la pregunta abierta de la spec 001.
- Fotos de Extrema, Big Beicon 5X, Odisea, Kratos y Tóxica recortadas de la carta impresa, en `public/menu/<id>.jpg`.

### No incluye
- Fotos de estudio: los recortes salen de una foto de la carta, así que tienen grano. Se reemplazan cuando estén las fotos originales (spec 002).
- Lista de gustos de las gaseosas en lata y de 600 ml: la carta no los lista, así que el cliente escribe el gusto, que es obligatorio, en la hoja del producto.

## Requisitos
- R1: Precios exactos de la carta; donde hay una etiqueta escrita a mano encima, vale la etiqueta.
- R2: Odisea, Kratos y Tóxica se cargan con `available: false` hasta que el local pase sus precios.
- R3 (reemplazado por la spec 005): "¿Le sumás algo?" sugiere primero una bebida sin alcohol (Coca-Cola 1,75 L) cuando el pedido no tiene bebida, y después papas o nuggets (`complements`).
- R4: Las categorías con alcohol muestran el aviso de mayoría de edad y quedan fuera de las sugerencias.

## Criterios de aceptación
- [x] CA1: Todos los ítems de las cartas `IMG_4770` y `IMG_4771` están en el menú con su precio.
- [x] CA2: Un pedido con solo burgers sugiere una bebida sin alcohol y nunca un trago.
- [x] CA3: Las fotos aparecen solas por convención de nombre, sin tocar código.
- [ ] CA4: Odisea, Kratos y Tóxica visibles con precio (pendiente del local).

## Modelo de datos
- `Category.adults?: boolean`: aviso +18 y fuera de las sugerencias.
- `CategoryIcon` suma `soda`, `beer`, `cocktail` y `promo`.
- `Category.layout?: "grid" | "list"`: las listas largas sin fotos (bebidas) van en renglones compactos.
- `Product.notePrompt?: string`: pregunta obligatoria (por ejemplo, "¿Qué gusto?"); el "+" abre la hoja en vez de agregar directo.
- ~~`complements`~~: se quitó en la spec 005.

## Decisiones
| Decisión | Alternativas | Motivo |
|---|---|---|
| Gaseosas de 1,75 L como productos separados | Un producto con variantes de gusto | Mismo precio y agregado rápido con un toque; las variantes hoy significan "tamaño" en la hoja |
| Ocultar las tres burgers sin precio | Mostrarlas "a consultar" | Un total sin precio rompe el mensaje de WhatsApp y el principio de cero ida y vuelta |
| Recortar las fotos de la carta | Esperar las fotos originales | Muestran el producto real ya mismo; se reemplazan cuando lleguen las originales |

## Preguntas abiertas
- Precios de Odisea, Kratos y Tóxica.
- Etiquetas escritas a mano que conviene confirmar: Brahma en lata ($2.500), Coca, Pepsi y Sprite de 1,75 L ($4.500) y "Speed + Sky $10.000 · Recluta" (cargado como trago "Recluta").
- ¿Hay fotos originales (sin imprimir) de las burgers? Se verían mucho mejor que los recortes.
