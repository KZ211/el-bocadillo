---
name: El Bocadillo
description: El mostrador de El Bocadillo en el celular; el carrito es una comanda térmica que se imprime mientras elegís.
colors:
  ground: "#0d0c0a"
  surface: "#181613"
  raised: "#24211c"
  edge: "#3a352d"
  text: "#f4eee3"
  muted: "#b4aa98"
  gold: "#d6a842"
  gold-strong: "#ecc25f"
  on-gold: "#17120a"
  paper: "#f6f3ea"
  paper-ink: "#1c1a16"
  paper-muted: "#5f594d"
  paper-mark: "#ffe39a"
  danger: "#ff8a75"
  open: "#9fd99a"
typography:
  display:
    fontFamily: "Gloock, Georgia, serif"
    fontSize: "2.6rem"
    fontWeight: 400
    lineHeight: 0.95
    letterSpacing: "-0.01em"
  headline:
    fontFamily: "Gloock, Georgia, serif"
    fontSize: "2.25rem"
    fontWeight: 400
    lineHeight: 1
  title:
    fontFamily: "Gloock, Georgia, serif"
    fontSize: "1.6rem"
    fontWeight: 400
    lineHeight: 1.25
  body:
    fontFamily: "Archivo, system-ui, sans-serif"
    fontSize: "1rem"
    fontWeight: 400
    lineHeight: 1.5
  label:
    fontFamily: "Archivo, system-ui, sans-serif"
    fontSize: "1rem"
    fontWeight: 600
    lineHeight: 1.5
  ticket:
    fontFamily: "Martian Mono, ui-monospace, monospace"
    fontSize: "12.5px"
    fontWeight: 400
    lineHeight: 1.6
    fontVariation: "\"wdth\" 88"
rounded:
  mark: "2px"
  check: "6px"
  control: "10px"
  sheet: "18px"
  pill: "9999px"
spacing:
  gutter: "16px"
  gutter-wide: "24px"
  row: "16px"
  stack: "28px"
  section: "40px"
components:
  button-primary:
    backgroundColor: "{colors.gold}"
    textColor: "{colors.on-gold}"
    typography: "{typography.label}"
    rounded: "{rounded.pill}"
    padding: "0 20px"
    height: "48px"
  button-primary-hover:
    backgroundColor: "{colors.gold-strong}"
  button-send:
    backgroundColor: "{colors.gold}"
    textColor: "{colors.on-gold}"
    rounded: "{rounded.pill}"
    padding: "0 24px"
    height: "56px"
  button-secondary:
    backgroundColor: "{colors.raised}"
    textColor: "{colors.text}"
    rounded: "{rounded.pill}"
    padding: "0 20px"
    height: "48px"
  button-secondary-hover:
    backgroundColor: "{colors.edge}"
  button-ghost:
    textColor: "{colors.muted}"
    rounded: "{rounded.pill}"
    padding: "0 20px"
    height: "48px"
  chip-category:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.muted}"
    rounded: "{rounded.pill}"
    padding: "0 16px"
    height: "44px"
  chip-category-active:
    backgroundColor: "{colors.gold}"
    textColor: "{colors.on-gold}"
  chip-removed:
    backgroundColor: "{colors.text}"
    textColor: "{colors.ground}"
    rounded: "{rounded.pill}"
    height: "44px"
  input:
    backgroundColor: "{colors.raised}"
    textColor: "{colors.text}"
    rounded: "{rounded.control}"
    padding: "12px 16px"
    height: "48px"
  option-variant:
    backgroundColor: "{colors.raised}"
    textColor: "{colors.text}"
    rounded: "{rounded.control}"
    padding: "10px 16px"
    height: "64px"
  option-variant-selected:
    backgroundColor: "{colors.gold}"
    textColor: "{colors.on-gold}"
  menu-row:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.text}"
    rounded: "{rounded.row}"
    padding: "16px"
  menu-row-hover:
    backgroundColor: "{colors.raised}"
  ticket:
    backgroundColor: "{colors.paper}"
    textColor: "{colors.paper-ink}"
    typography: "{typography.ticket}"
    padding: "28px 20px 32px"
  sheet:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.text}"
    rounded: "{rounded.sheet}"
---

# Design System: El Bocadillo

## Overview

**Creative North Star: "La comanda térmica del mostrador"**

El sistema es un local de noche: un suelo negro cálido, superficies que suben un paso de luz por capa, y un dorado de marca que aparece donde importa (el nombre del local, los precios, la acción y lo que elegiste). Sobre esa noche, un único material distinto: el papel térmico de la comandera, crema con borde dentado y tinta negra, que es el carrito y es literalmente el texto que le llega al local por WhatsApp.

La densidad es de mostrador: filas táctiles grandes, nombres de burgers en serif de alto contraste, descripciones cortas en gris cálido y precios tabulares. Nada decorativo compite con el pedido. El movimiento tiene una sola gramática, la de la impresora: el papel avanza, la línea nueva se imprime de arriba hacia abajo y queda resaltada como con un marcador.

Se rechaza explícitamente el carrito-cajón genérico de app de delivery con contador rojo: el estado del pedido se ve siempre como papel, nunca como badge.

**Key Characteristics:**
- Modo oscuro único (`color-scheme: dark`), pensado para pantallas con brillo bajo de noche.
- Dos materiales: noche (ground/surface/raised) y papel térmico (paper).
- Dorado como voz de marca, precio, acción primaria y selección.
- Gloock para marca y nombres; Archivo para toda la UI; Martian Mono solo sobre papel.
- Controles de 44px o más; acciones principales en píldora.

## Colors

Una noche cálida de tres escalones con un dorado de marca y un papel térmico como segundo material.

### Primary
- **Dorado Bocadillo** (gold): wordmark, precios del menú, número de comanda enviada, acción primaria, foco, selección de texto, caret y estado seleccionado de chips, opciones y casillas.
- **Dorado Encendido** (gold-strong): solo como hover de las acciones doradas.
- **Tinta sobre Dorado** (on-gold): texto e íconos sobre cualquier relleno dorado.

### Neutral
- **Noche de Local** (ground): suelo de la página, barra de categorías fija y `theme-color` del navegador.
- **Mostrador** (surface): estado presionado de las filas del menú, hojas, aside de la comanda en desktop y barras de acción fijas.
- **Mostrador Alto** (raised): campos, opciones sin elegir, botones secundarios, avisos y círculo del "+".
- **Canto** (edge): hover de controles sobre raised y color del scrollbar.
- **Crema de Luz** (text): texto principal; también relleno del chip de ingrediente quitado.
- **Gris Cálido** (muted): descripciones, ayudas, texto secundario y chips inactivos.

### Papel térmico
- **Papel Térmico** (paper): fondo del ticket y de la tira de comanda fija en mobile.
- **Tinta Térmica** (paper-ink): texto del ticket; sus transparencias (35% en cortes, 20% en separadores, 10% en hover) son las únicas variaciones permitidas sobre papel.
- **Tinta Gastada** (paper-muted): texto secundario sobre papel.
- **Marcador** (paper-mark): resaltado de la última línea impresa hasta la próxima interacción.

### Estado
- **Alerta Coral** (danger): borde de campo inválido y mensaje de error.
- **Verde Abierto** (open): solo el punto de "Abierto".

### Named Rules
**The Dorado Con Motivo Rule.** El dorado marca marca, precio, acción o elección; nunca fondos de sección, bordes decorativos ni texto corrido.

**The Dos Materiales Rule.** Toda superficie es noche o papel. Los tokens `paper-*` solo viven sobre `paper`, y los tokens de noche nunca se usan dentro del ticket.

## Typography

**Display Font:** Gloock (con Georgia, serif)
**Body Font:** Archivo (con system-ui, sans-serif)
**Label/Mono Font:** Martian Mono (con ui-monospace), exclusiva del papel

**Character:** Una serif de cartel de alto contraste, como el título dorado de las piezas de Instagram, sobre una grotesca de trabajo. La mono es la letra de la comandera: aparece porque el ticket es dato real.

### Hierarchy
- **Display** (400, 2.6rem en mobile y 3.75rem desde sm, line-height 0.95, -0.01em): solo el wordmark "El Bocadillo" en dorado.
- **Headline** (400, 2.25rem en mobile y 3rem desde sm, line-height 1): nombres de categoría; también el número de comanda enviada.
- **Title** (400, 1.6rem, line-height 1.25): nombres de burgers en el menú. Los títulos de hoja y de sección ("Tu comanda", "Tus datos") usan Gloock a 1.5rem.
- **Body** (400, 1rem, line-height 1.5): descripciones (0.95rem en filas, con `line-clamp` de 2 líneas), ayudas y avisos (0.875rem).
- **Label** (600, 1rem): leyendas de campos, chips, botones y precios. Precios y cantidades siempre con cifras tabulares.
- **Ticket** (400, 12.5px, line-height 1.6, ancho 88%): todo el texto impreso; negrita 700 para los nombres de ítem. En la tira fija se usa a 12px.

### Named Rules
**The Mono Sobre Papel Rule.** Martian Mono aparece solo sobre papel térmico. Fuera del ticket, ningún texto se escribe en mono.

**The Serif Para Nombres Rule.** Gloock lleva nombres (del local, de categorías, de burgers, de hojas), siempre en peso 400 y en caja normal; nunca botones, etiquetas ni párrafos.

## Layout

Mobile-first en una columna de hasta 48rem centrada, con margen lateral de 16px (24px desde 640px). Las categorías arrancan con 40px de aire arriba; las filas del menú son renglones de pizarra separados por una línea `edge`, con 20px de aire vertical; los formularios respiran a 28px entre grupos y 16px dentro de un grupo.

La barra de categorías es fija arriba sobre el suelo, con scroll horizontal sin barra y la categoría visible centrada. En mobile, la tira de comanda flota fija abajo (margen de 12px, respeta `safe-area-inset-bottom`) y el contenido reserva 9rem al pie para no quedar tapado.

Desde 1024px la página pasa a dos columnas: menú flexible a la izquierda y la comanda en un aside fijo de alto completo (26rem, 28rem desde 1280px) sobre surface, con su propio scroll. La comanda vive en el aside o en la hoja, nunca en los dos a la vez.

Las hojas son `dialog` nativos: suben desde abajo a ancho completo en mobile (máx. 92dvh; la comanda ocupa la pantalla completa) y se centran a 34rem desde 768px. Toda barra de acción dentro de una hoja es pegajosa al pie sobre surface.

## Elevation & Depth

La profundidad es tonal: ground, surface y raised son tres pasos de luz del mismo negro cálido, y el hover sube un paso (surface a raised, raised a edge). No hay sombras en reposo. La única sombra del sistema es la del papel que flota sobre el menú. El fondo de las hojas oscurece la página al 72%.

### Shadow Vocabulary
- **Papel flotante** (`box-shadow: 0 -12px 32px rgb(0 0 0 / 0.45)`): solo la tira de comanda fija en mobile, porque es papel encima de la noche.
- **Velo de hoja** (`::backdrop` en `rgb(5 4 3 / 0.72)`): detrás de toda hoja abierta.

### Named Rules
**The Un Paso De Luz Rule.** Para separar o mostrar hover, subí un escalón tonal. No agregues sombras ni bordes a las superficies de noche.

## Shapes

Los controles de noche son blandos: píldora para botones, chips, segmentos y stepper; 10px para campos, opciones de tamaño y avisos; las filas del menú no tienen caja; 18px para las esquinas superiores de las hojas (las cuatro desde 768px, ninguna en pantalla completa). Las casillas usan 6px y los íconos de acción son círculos de 44px o más.

El papel tiene su propia forma: sin radio, con borde dentado de diente de 7px arriba y abajo recortado por máscara (solo arriba en la tira fija), y secciones separadas por un corte punteado de tinta al 35%. El resaltado de la última línea usa apenas 2px de radio.

La dirección pedía 10px en controles; el build resolvió las acciones y los chips en píldora y reservó los 10px para campos y opciones. Esto registra el build.

## Components

### Buttons
Táctiles y seguros, siempre en píldora.
- **Shape:** píldora completa (9999px).
- **Primary:** relleno dorado con tinta sobre dorado, 600, 48px de alto y 20px de lado. Si lleva precio, el precio va a la derecha en cifras tabulares ("Agregar ... $total").
- **Enviar pedido:** la acción final, de 56px de alto y texto de 1.125rem, con el ícono de WhatsApp en SVG y el total.
- **Hover / Focus:** hover a gold-strong; al presionar se achica a 0.98; foco con anillo dorado de 2px y 3px de separación.
- **Secondary:** relleno raised con texto crema; hover a edge.
- **Ghost:** sin relleno, texto gris cálido que pasa a crema en hover.
- **Ícono:** círculo de 44px (36px dentro del ticket), hover con un paso tonal; al presionar se achica a 0.95 o 0.90.

### Chips
- **Categoría:** píldora de 44px sobre surface con texto gris cálido; activa en dorado con tinta sobre dorado. Lleva `aria-current`.
- **Sin ingrediente:** píldora raised; al quitar se invierte a crema con texto noche, tachado de 2px y la etiqueta pasa a "Sin …".

### Cards / Containers
- **Fila del menú:** renglón de pizarra sin caja, separado por línea `edge` (`divide-y`), 20px arriba y abajo. Nombre en Title y precio dorado tabular en la misma línea de base ("desde" en gris si hay tamaños); debajo la descripción en gris cálido y, al final, un círculo raised de 44px con "+" dorado que se invierte en hover. Toda la fila es el botón. La foto, si existe, va a la izquierda a 80px con 10px de radio.
- **Aviso:** raised con 10px de radio y padding de 12px por 16px (cerrado, plazo para modificar).
- **Sombra:** ninguna (ver Elevation & Depth).

### Inputs / Fields
- **Style:** relleno raised, sin borde, 10px de radio, 48px de alto mínimo, padding de 12px por 16px, placeholder en gris cálido al 70%, caret dorado.
- **Focus:** contorno dorado de 2px.
- **Error:** contorno coral de 2px y mensaje coral de 0.875rem debajo; al enviar, el primer campo con error recibe el foco y se centra en pantalla.
- **Opción de tamaño:** grilla de 2 columnas, 64px de alto, raised con 10px; elegida en dorado.
- **Segmentado:** riel raised en píldora con 4px de padding; el segmento elegido es una píldora dorada.
- **Casilla:** cuadro de 24px con 6px de radio; marcada en dorado con check de trazo 3.

### Navigation
Barra de categorías fija arriba sobre ground con chips en píldora y scroll horizontal; el chip activo sigue a la sección visible. No hay otra navegación: el resto pasa en hojas.

### Hojas
`dialog` nativo sobre surface con título en Gloock a 1.5rem y botón de cerrar circular. Entran desde abajo en 380ms con `cubic-bezier(0.16, 1, 0.3, 1)`; el velo aparece en 300ms. Con movimiento reducido todas las transiciones duran 1ms.

### Comanda térmica (componente firma)
El ticket es papel sin radio con borde dentado, Martian Mono a 12.5px, 28px arriba, 32px abajo y 20px de lado. Cada renglón es exactamente el texto del mensaje de WhatsApp; los controles de cantidad (papelera, restar, sumar en círculos de 36px) van en Archivo y no forman parte del texto. Las secciones se separan con corte punteado. Sobre el papel hay una **boca de comandera** (barra casi negra de 12px con su ranura) y el papel sale por debajo: con cada cambio de cantidad todo el ticket avanza 18px desde la ranura (560ms, ease-out-expo) y la línea tocada se imprime con recorte de arriba hacia abajo y queda sobre el marcador. En mobile, la tira de comanda vive siempre abajo, aun vacía ("Tu comanda · vacía"), saliendo de la misma boca. Debajo, siempre, la frase "Esto es exactamente lo que le llega al local por WhatsApp."

En mobile, la tira fija es el mismo papel con dientes solo arriba: "Tu comanda · N ítems", la última línea agregada en mono y el total en negrita tabular. Con cada agregado avanza 8px y vuelve (420ms), como el papel que sale de la impresora.

## Do's and Don'ts

### Do:
- **Do** mostrar el estado del pedido como papel térmico (paper con borde dentado), nunca como contador.
- **Do** escribir precios y cantidades en cifras tabulares; en el menú van en dorado y 600.
- **Do** separar superficies de noche subiendo un escalón tonal (ground, surface, raised, edge).
- **Do** mantener todo control táctil en 44px o más (48px en campos y acciones de hoja, 56px en enviar).
- **Do** usar `cubic-bezier(0.16, 1, 0.3, 1)` para todo movimiento y respetar `prefers-reduced-motion`.
- **Do** usar el contorno dorado de 2px como foco en todo elemento interactivo.

### Don't:
- **Don't** usar un carrito-cajón con badge rojo de contador.
- **Don't** usar Martian Mono fuera del papel térmico ni tokens `paper-*` sobre la noche.
- **Don't** redondear el papel: sus bordes son dientes de 7px o cortes punteados.
- **Don't** agregar sombras a superficies de noche; la única sombra es la del papel flotante.
- **Don't** usar el dorado como fondo de sección, borde decorativo o texto corrido.
- **Don't** poner Gloock en botones, etiquetas o párrafos, ni en otro peso que 400.
