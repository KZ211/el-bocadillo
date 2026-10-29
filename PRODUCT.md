# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Stack

Next.js (App Router) + TypeScript + Tailwind CSS, deploy en Vercel. Elegido por el dueño pensando en escalar a pagos automáticos (Mercado Pago), backend y base de datos sin migrar de stack.

## Users

Clientes de El Bocadillo, hamburguesería de smash burgers "comida al paso" en Presidente Derqui (Pilar, Buenos Aires). Llegan desde WhatsApp: escriben al local, el local les responde automáticamente con el link de esta página. Usan el celular, muchas veces de noche (el local abre hasta las 3:00), con hambre y apuro. Su trabajo: elegir burgers/papas/bebidas, personalizarlas y mandar el pedido sin ida y vuelta de mensajes.

Usuario secundario: quien atiende el WhatsApp del local, que recibe el pedido ya escrito y estructurado y solo confirma (costo de envío, alias de transferencia, tiempo).

## Product Purpose

Agilizar la toma de pedidos por WhatsApp. El cliente arma el pedido en la página y al confirmar se abre WhatsApp con un mensaje completo, legible y siempre con el mismo formato (ítems, variantes, extras, sin-ingredientes, aclaraciones, modalidad de entrega, datos de contacto, medio de pago, total estimado). Éxito = menos mensajes por pedido y cero pedidos mal tomados.

## Positioning

No es una plataforma de delivery genérica: es el mostrador de El Bocadillo en el celular. Sin comisiones de apps, sin cuentas, sin login; el pedido termina en el mismo WhatsApp de siempre del local.

## Operating Context

- Entrada: link enviado por respuesta automática de WhatsApp Business o desde la bio de Instagram (@el.bocadillo2024).
- Salida: `https://wa.me/5491126967922?text=...` con el pedido formateado.
- Horario: lunes, martes, jueves, viernes y domingos; 11:00–15:30 y 20:00–03:00. Miércoles y sábados cerrado.
- Dirección: Manuel Dorrego 413, B1635 Presidente Derqui, Buenos Aires.

## Capabilities and Constraints

- Modalidades: retiro en el local, delivery (pide dirección), comer en el local.
- Costo de envío: a confirmar por WhatsApp (no se calcula en la página).
- Pago informado (no procesado): efectivo (con "¿con cuánto abonás?" para el vuelto) o transferencia (el local pasa el alias por WhatsApp).
- Personalización de burgers: tamaño simple/doble/triple con precio distinto, extras pagos, quitar ingredientes, aclaración libre por producto.
- Sin backend en v1; el carrito vive en el navegador. Menú en un único archivo de datos tipado para editar precios fácil.
- A futuro (no en v1): pagos automáticos, panel del local, persistencia de pedidos, horarios dinámicos.
- Abierto: precios y catálogo definitivos (vienen del catálogo de WhatsApp Business del local).

## Brand Commitments

- Nombre: El Bocadillo. Bajada del logo: "Comida al paso". Producto: smash burgers.
- Logo existente: círculo negro con ilustración lineal blanca de burger, papas, pancho y porción de pizza.
- Piezas de Instagram: mármol negro con vetas doradas y título "EL BOCADILLO" en serif dorada; fotos reales de las burgers.
- Nombres de burgers propios: Extrema, Big Beicon 5X, Odisea, Kratos, Tóxica.
- Voz: rioplatense, voseo, directa y con onda de barrio ("¡No te quedes con las ganas!").

## Evidence on Hand

- Menú publicado en historias destacadas de Instagram (descripciones de Extrema, Big Beicon 5X, Odisea, Kratos, Tóxica; promo dos cheeseburger doble + papas $20.000).
- Fotos reales: solo en Instagram, no descargadas aún. No inventar fotos ni reseñas.
- Precios reales pendientes: hasta recibirlos, los precios en la página son de ejemplo y deben marcarse como tales en el código.

## Product Principles

1. El pedido tiene que salir en menos de un minuto desde que abrís el link.
2. El mensaje de WhatsApp es el producto: lo tiene que entender el que atiende de un vistazo.
3. Cero fricción: sin registro, sin pantallas intermedias que no aporten.
4. El menú se edita en un solo lugar.
5. Preparado para crecer (pagos, panel) sin rehacer la base.

## Accessibility & Inclusion

Mobile-first, controles táctiles de 44px+, contraste AA, uso nocturno en pantallas con brillo bajo.
