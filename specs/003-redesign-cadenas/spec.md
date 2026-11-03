# 003 — Redesign basado en las grandes cadenas

- **Estado:** implementada
- **Rama/PR:** `redesign` (la v1 queda guardada en la rama `old-version`)

## Contexto
McDonald's y Burger King llevan años puliendo el pedido de comida rápida en el celular y en el kiosco. En vez de inventar un flujo, El Bocadillo adopta sus patrones de UX y estructura, adaptados a su marca (mármol negro, dorado, voz de barrio). No se copia identidad de marca: ni el rojo/amarillo de McDonald's, ni el naranja/marrón de Burger King, ni sus nombres, logos o textos.

## Investigación: qué tomamos de cada referente
| Patrón | Referente | Cómo lo adaptamos |
|---|---|---|
| Menú guiado por fotos grandes: la foto vende, el texto acompaña | McDonald's app y kiosco, BK app | Tarjetas de producto con foto protagonista (con placeholder de marca hasta tener fotos, ver 002) |
| Grilla de categorías con imagen como punto de entrada | Kiosco de McDonald's | Riel de categorías con ícono/foto, fijo arriba en mobile |
| Destacados y promos arriba de todo ("Ofertas", "Lo más pedido") | McDonald's app (Ofertas), BK app (cupones) | Hero con un producto destacado de la casa (o la promo vigente cuando esté confirmada) y fila "Recomendadas" |
| Pantalla de producto: foto grande, tamaño, ingredientes, extras y botón fijo "Agregar · $total" | Hoja de producto del Whopper en la app de BK | Hoja de producto con foto arriba, opciones preseleccionadas y CTA fijo al pie |
| Opciones por defecto ya marcadas | Baymard sobre el pedido web de BK: no preseleccionar frena el pedido | El primer tamaño viene marcado; el CTA muestra precio desde el primer momento |
| Personalizar ingrediente por ingrediente (sacar / agregar extra) | McDonald's y BK, "Personalizá" | Lista de ingredientes con toggle "Sin" y extras con stepper |
| "Completá tu pedido" (papas, complementos) **después** de agregar, no al tocar "+" rápido | Sugerencias del kiosco de McDonald's; test de usabilidad: el upsell en la tarjeta confunde | Sugerencia de complementos al abrir el pedido, nunca en el agregado rápido |
| Barra fija "Ver pedido · N · $total" al pie | Barra de la bolsa en McDonald's y BK | Barra fija dorada; al tocarla abre la revisión |
| Revisión del pedido antes de pagar, con editar/quitar por ítem | Pantalla de pedido de ambas apps (Baymard, resumen de pedidos) | Hoja "Tu pedido" que conserva la comanda térmica como vista previa del mensaje de WhatsApp |
| Checkout corto: modalidad, datos, pago | Pedido móvil de McDonald's | Igual que la v1: retiro, delivery o comer acá; efectivo o transferencia |

## Alcance
### Incluye
- Nuevo layout de menú: hero destacado, "Recomendadas", categorías con ícono, tarjetas con foto.
- Nueva hoja de producto con foto grande y CTA fijo con precio.
- Agregado rápido desde la tarjeta para productos sin opciones obligatorias.
- Barra fija "Ver pedido" en mobile y columna de pedido en desktop.
- Sugerencia "¿Le sumás algo?" en la revisión del pedido.
- Actualización de `DESIGN.md` con el sistema nuevo.

### No incluye
- Cambios en el formato del mensaje: sigue saliendo de `buildTicket` (`src/lib/order/message.ts`).
- Pagos online, backend o cuentas (roadmap 003–005).
- Fotos reales: dependen de la spec 002.

## Requisitos
- R1: El menú se ve primero como fotos/tarjetas grandes; 2 columnas en mobile (360–414px), 3–4 en desktop.
- R2: Sin foto, la tarjeta muestra un placeholder de marca coherente (no un hueco gris).
- R3: El hero muestra el destacado definido en `src/data/menu.ts` (`hero`), no hardcodeado en el componente. La promo "2 cheeseburger doble + papas" no se carga hasta que el local la confirme (pregunta abierta de la spec 001).
- R4: "Recomendadas" sale de un flag `featured` en los productos. No se usa "las más pedidas" porque no hay datos de ventas.
- R5: La hoja de producto tiene el primer tamaño preseleccionado y un CTA fijo "Agregar · $total" que se actualiza en vivo.
- R6: Los productos sin variantes ni opciones obligatorias se agregan con "+" desde la tarjeta, con feedback visible sin abrir hojas.
- R7: La barra "Ver pedido" aparece cuando hay ítems y muestra cantidad y total; en desktop el pedido vive en una columna lateral.
- R8: La revisión del pedido sugiere hasta 3 complementos (lista `complements` de `src/data/menu.ts`, en orden de prioridad), uno por categoría que todavía no está en el pedido. Así funciona el "¿con papas y bebida?" de las cadenas.
- R9: El mensaje de WhatsApp sigue siendo idéntico al de la v1 (los tests de `order.test.ts` pasan sin cambios).
- R10: Controles táctiles de 44px o más, contraste AA, `prefers-reduced-motion` respetado.

## Criterios de aceptación
- [ ] CA1: Desde el link, un pedido de 1 burger + papas se manda en menos de 1 minuto en un celular de 375px.
- [x] CA2: Agregar un producto sin tamaños (nuggets, pizzas, quíntuples) desde la tarjeta no abre ninguna hoja ni sugerencia. Los productos con tamaños (burgers, caja de papas) abren la hoja.
- [x] CA3: La barra fija nunca tapa contenido (reserva de espacio al pie y safe-area).
- [x] CA4: Capturas a 375px y a 1280px revisadas antes del PR.
- [x] CA5: `pnpm test && pnpm lint && pnpm typecheck` en verde.

## Modelo de datos
- `Product.featured?: boolean`: aparece en "Recomendadas".
- `Hero { productId, headline }` exportado desde `src/data/menu.ts`.
- `Category.icon?: CategoryIcon`: ícono de la categoría en el riel y en el placeholder de las fotos.

## Decisiones
| Decisión | Alternativas | Motivo |
|---|---|---|
| Copiar patrones de UX de McDonald's/BK, no su identidad | Clonar su estética roja/amarilla | Es otra marca; la paleta de El Bocadillo (negro y dorado) ya es reconocible en Instagram |
| Upsell solo en la revisión del pedido | Upsell al agregar | Test de usabilidad del kiosco: el upsell al agregar confunde y frena |
| Mantener la comanda térmica como vista previa en la revisión | Eliminarla | Es literalmente lo que le llega al local y cumple el principio 2 de PRODUCT.md |

## Preguntas abiertas
Ninguna. Resueltas el 2026-11-03:
- Fotos: se diseña con placeholders de marca; las fotos reales entran después por convención (`public/menu/<id>.jpg`, spec 002).
- Paleta: se mantiene el negro y dorado de El Bocadillo; de las cadenas se toma la estructura, no los colores.

## Fuentes
- McDonald's, recomendaciones personalizadas y sugerencias (Mastercard / Dynamic Yield): https://www.mastercard.com/us/en/news-and-trends/Insights/2023/mcdonalds.html
- Test del upsell del kiosco de McDonald's: https://dsmeier-designandfilmmaking.github.io/portfolio/projects/previous/mcdonalds-kiosk/
- Caso de estudio del kiosco de McDonald's: https://uxdesign.cc/mcdonalds-kiosk-ordering-system-ui-ux-case-study-fe7b3693f12c
- Resumen de pedidos en la app de McDonald's (Baymard): https://baymard.com/ecommerce-design-examples/62-orders-overview/11406-mcdonalds
- Resumen de pedidos en la app de BK (Baymard): https://baymard.com/ecommerce-design-examples/62-orders-overview/11416-burger-king
- Recorrido de pantallas de la app de BK: https://screensdesign.com/showcase/burger-king-app
- Test de usabilidad del pedido web de BK (Bitovi): https://www.bitovi.com/blog/guerrilla-user-testing-series-burger-king-case-study
