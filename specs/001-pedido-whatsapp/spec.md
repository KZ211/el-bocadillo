# 001 — Pedido por WhatsApp

- **Estado:** implementada (v1)
- **Rama/PR:** commit inicial en `main` (repo creado desde cero)

## Contexto

El Bocadillo (smash burgers, Manuel Dorrego 413, Presidente Derqui) toma pedidos por WhatsApp a mano: el cliente pregunta el menú, pide de a partes, el local repregunta tamaño, extras, dirección y pago. Queremos que el local responda automáticamente con un link; el cliente arma el pedido en la página y al confirmar se abre WhatsApp con el pedido **completo, escrito y estructurado** listo para enviar al local.

## Alcance

### Incluye
- Menú por categorías con productos, variantes (simple/doble/triple), extras pagos, quitar ingredientes y aclaración por producto.
- Carrito ("comanda") persistente en el navegador, editable.
- Datos de entrega: retiro, delivery o comer en el local.
- Medio de pago informado: efectivo (con monto para el vuelto) o transferencia.
- Generación del mensaje y apertura de `wa.me` con el texto.
- Estado abierto/cerrado según horario del local (zona horaria Argentina).
- Recordar datos del cliente en el dispositivo (opcional).

### No incluye (ver `roadmap.md`)
- Pagos online, backend, base de datos, panel del local, cálculo de envío, cuentas de usuario.

## Requisitos

- **R1 — Menú desde un único archivo de datos tipado** (`src/data/menu.ts`). Editar precios o productos no requiere tocar componentes.
- **R2 — Categorías navegables**: barra de categorías fija arriba con scroll-spy; el modelo soporta subcategorías (`parentId`) para crecer a navegación jerárquica.
- **R3 — Configurador de producto**: al tocar un producto se abre una hoja inferior (mobile) / panel (desktop) con: variante obligatoria si existe, extras con precio, ingredientes para quitar, aclaración libre (máx. 140 caracteres), cantidad (1–20) y botón "Agregar" con el precio calculado.
- **R4 — Comanda**: lista de líneas con detalle (variante, extras, sin, aclaración), cantidad editable, eliminar línea, subtotal. Dos líneas idénticas (mismo producto + variante + extras + sin + aclaración) se agrupan sumando cantidad.
- **R5 — La comanda es el mensaje**: el ticket visible usa la misma función que genera el texto de WhatsApp; lo que el cliente ve es lo que le llega al local.
- **R6 — Checkout** con validación en línea:
  - Nombre (obligatorio, 2–40 caracteres).
  - Teléfono (opcional, para que el local pueda llamar).
  - Modalidad: `retiro` | `delivery` | `local`.
  - Delivery: calle y número (obligatorio), entre calles (opcional), referencia (opcional).
  - Pago: `efectivo` (opcional "¿con cuánto abonás?", debe ser ≥ total si se completa) | `transferencia` (el local envía el alias).
  - Aclaraciones generales (opcional, máx. 200).
- **R7 — Envío por WhatsApp** a `5491126967922` vía `https://wa.me/<numero>?text=<mensaje urlencoded>`. Tras enviar se muestra confirmación con número de comanda, botón para reabrir WhatsApp y botón para copiar el mensaje.
- **R7b — Aviso post-envío**: se recuerda que una vez enviado hay 10 minutos para modificar el pedido (política del local).
- **R8 — Número de comanda** corto y legible (`B-XXXX`, 4 dígitos) generado en el cliente para que el local lo referencie.
- **R9 — Horario**: lun, mar, jue, vie y dom; 11:00–15:30 y 20:00–03:00 (el turno noche cruza medianoche y **toma pedidos hasta las 02:30**, según la aclaración publicada por el local). Si está cerrado se avisa con el próximo horario de apertura, pero **se permite enviar** (el local decide).
- **R10 — Persistencia local**: comanda y datos del cliente en `localStorage`; los datos del cliente solo si el usuario marca "Recordar mis datos" (activado por defecto). Si `localStorage` falla, la app sigue funcionando.
- **R11 — Mobile first**: diseñado para 360–414px; en desktop la comanda queda fija a la derecha y se va imprimiendo en vivo.
- **R12 — Accesibilidad**: controles ≥44px, foco visible, contraste AA, `prefers-reduced-motion` respetado, hojas con foco atrapado y cierre con Escape.

## Formato del mensaje

Usa negritas de WhatsApp (`*texto*`). Sin emojis. Precios con separador de miles `.` y sin decimales.

```
*NUEVO PEDIDO · EL BOCADILLO*
Comanda B-4821

*1x Kratos (Doble)* — $14.500
  + Cheddar extra
  - Sin cebolla
  > bien cocida
*2x Papas clásicas* — $9.000

Subtotal: $23.500
Envío: a confirmar
*Total: $23.500 + envío*

*Entrega:* Delivery
Dirección: Dorrego 500
Entre: Sarmiento y Mitre
Referencia: portón negro
*Nombre:* Juan
*Teléfono:* 11 2345-6789
*Pago:* Efectivo, abona con $30.000
*Aclaraciones:* tocar timbre
```

- Retiro: `*Entrega:* Retiro en el local`. Local: `*Entrega:* Para comer en el local`.
- Transferencia: `*Pago:* Transferencia (pasame el alias)`.
- Sin envío en retiro/local: no se imprimen las líneas "Envío" y el total va sin "+ envío".

## Modelo de datos

```ts
type Category = { id: string; name: string; parentId?: string; description?: string };
type Variant  = { id: string; label: string; price: number };
type Extra    = { id: string; label: string; price: number };
type Product  = {
  id: string; categoryId: string; name: string; description: string;
  image?: string; price?: number;          // precio si no tiene variantes
  variants?: Variant[]; extras?: Extra[];  // extras con costo
  removable?: string[];                    // ingredientes que se pueden quitar
  available?: boolean; tag?: string;
};
type CartLine = {
  key: string; productId: string; variantId?: string;
  extraIds: string[]; removed: string[]; note: string; qty: number;
};
type Checkout = {
  name: string; phone: string; mode: "retiro" | "delivery" | "local";
  street: string; between: string; reference: string;
  payment: "efectivo" | "transferencia"; cashAmount: string; notes: string;
};
```

Archivos: `src/data/menu.ts`, `src/data/store.ts` (local), `src/lib/order/*` (precio, mensaje, horario — funciones puras con tests), `src/components/*`.

## Criterios de aceptación

- [x] CA1: Desde el link, un cliente puede elegir una burger doble con un extra, sacar un ingrediente y enviarla por WhatsApp en menos de 1 minuto.
- [x] CA2: El texto que se abre en WhatsApp coincide exactamente con el ticket mostrado.
- [x] CA3: Delivery sin dirección no permite enviar y muestra el error junto al campo.
- [x] CA4: Efectivo con monto menor al total muestra error.
- [x] CA5: Recargar la página conserva la comanda.
- [x] CA6: Con horario cerrado se muestra aviso y próximo horario, y se puede enviar igual.
- [x] CA7: Sin overflow horizontal a 360px; desktop muestra la comanda fija.
- [x] CA8: Tests unitarios de precio, agrupado de líneas, mensaje y horario pasan (`pnpm test`).

## Decisiones

| Decisión | Alternativas | Motivo |
|----------|--------------|--------|
| Next.js App Router + Vercel | Vite estático | Escalar a pagos/API/DB sin migrar (elección del dueño). |
| Estado en cliente con `useSyncExternalStore` + `localStorage` | Zustand/Redux | Sin dependencias; suficiente para v1. |
| Categorías en barra horizontal con scroll-spy (1 nivel) | Drill-down jerárquico | El menú tiene 4 categorías; drill-down agregaría pasos. El modelo ya soporta `parentId` para cuando crezca. |
| Se permite pedir fuera de horario | Bloquear | El local decide; puede tomarlo como pedido para más tarde. |
| Número de comanda aleatorio en cliente | Secuencial | No hay backend aún (ver 004). |
| Precios reales del catálogo de WhatsApp Business + menús "Menú Burger"/"Menú Bocadillos" (oct. 2026) | — | Fuente provista por el dueño. Ante diferencias entre catálogo y menú se usó el menú (ver preguntas abiertas). |
| Fotos y logo detectados por archivo (`public/logo.png`, `public/menu/<id>.jpg`) | Hardcodear rutas | Las imágenes llegaron pegadas en el chat, no como archivos; al copiarlas aparecen solas. |
| Combos: las burgers ya incluyen porción de papas | Combos aparte | Así figura en el menú del local. |

## Preguntas abiertas

- Nuggets + papas: el catálogo dice $12.000 y el menú $13.000 (se usa $13.000).
- Quíntuples: el catálogo tiene "Menú quíntuples $17.000"; la pieza muestra Big Beacon $18.200 y Xtrema $21.200 (se usan estos).
- ~~¿Sigue vigente la promo "2 cheeseburger doble + papas $20.000"?~~ Sí: la confirmó el local y se cargó en la spec 004, junto con la de 4 por $35.000.
- Odisea, Kratos y Tóxica aparecen en un menú anterior de Instagram pero no en el catálogo actual (no se cargaron).
- Descripción exacta de la Pizza Chancha y si las pizzas llevan agregados.
- Logo y fotos como archivos (ver spec 002).
- ¿Hay mesas suficientes para "comer en el local" todos los días?
