# 005 — Pedido por pasos (estilo kiosco de McDonald's)

- **Estado:** implementada
- **Rama/PR:** `redesign` (PR #1)

## Contexto
El empleado que atiende el WhatsApp del local pasa el link apenas le escriben. El menú de una sola pantalla obligaba al cliente a recorrer todo por su cuenta. El kiosco de McDonald's resuelve esto con un flujo guiado: primero cómo lo querés, después la comida, lo que acompaña y la bebida, y al final el pedido. El "¿con papas y bebida?" queda incorporado en los pasos.

## Alcance
### Incluye
- Paso 0 "¿Cómo lo querés?": **Delivery** (ícono de moto), **Paso a retirar** y **Para consumir en el local**.
- Pasos 1 a 3 definidos en `src/data/menu.ts` (`steps`): Comida, Acompañar y Bebidas.
- Paso 4 "Tu pedido": comanda, datos y enviar.
- Barra de progreso que se puede tocar para ir a cualquier paso, y barra inferior con el total y "Siguiente".
- Botón atrás del celular entre pasos.

### No incluye
- Paso de postres: la carta no tiene. Se agrega sumando una entrada a `steps`.
- Cambios en el formato del mensaje (`buildTicket`).

## Requisitos
- R1: Tocar una opción del paso 0 guarda `checkout.mode` y avanza a Comida. El modo guardado de una visita anterior aparece resaltado.
- R2: Cada paso muestra solo sus categorías, con chips propias si tiene más de una.
- R3: El botón inferior dice "Siguiente: <paso>"; en los pasos de complementos (todos menos el primero), si no se agregó nada, dice "No, gracias".
- R4: Todos los pasos se pueden saltear y la barra de progreso permite saltar a cualquiera.
- R5: El botón atrás del navegador vuelve al paso anterior; en el paso 0 sale normalmente.
- R6: Desktop: la comanda se ve en vivo en la columna lateral durante los pasos 1 a 3; en el paso 4 ocupa la pantalla principal.
- R7: "¿Le sumás algo?" se elimina: los pasos 2 y 3 cumplen ese rol. Reemplaza R7 y R8 de la spec 003.
- R8: Después de enviar, "Hacer otro pedido" vuelve al paso 0.

## Criterios de aceptación
- [x] CA1: Recorrido Delivery → Big Beicon → "No, gracias" en Acompañar → Coca → datos → enviar abre `wa.me` con el texto de `buildTicket`.
- [x] CA2: El botón atrás recorre los pasos hacia atrás.
- [x] CA3: Las capturas a 375px y 1280px están revisadas.
- [x] CA4: `pnpm test && pnpm lint && pnpm typecheck` pasan.

## Modelo de datos
- `OrderStep { id, title, short, categoryIds }` en `src/lib/order/types.ts`.
- `steps: OrderStep[]` en `src/data/menu.ts`.
- La categoría `bocadillos` se divide en `sandwiches` y `acompanamientos`.
- Se quita `complements` (spec 004, R3).
- Funciones puras en `src/lib/order/steps.ts`, con tests.

## Decisiones
| Decisión | Alternativas | Motivo |
|---|---|---|
| Preguntar la modalidad primero | Al final, junto con los datos | Así arranca el kiosco de McDonald's; además define qué datos se piden después |
| Pasos que se pueden saltear y barra que se puede tocar | Flujo estrictamente lineal | Elegido por el dueño: guía sin encerrar |
| Pasos definidos como datos | Hardcodeados en el componente | Sumar postres u otro paso no requiere tocar la UI |
