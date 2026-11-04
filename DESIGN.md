---
name: El Bocadillo
description: El mostrador de El Bocadillo en el celular, con la estructura de pedido de las grandes cadenas sobre mármol negro y dorado; la comanda térmica es la vista previa del mensaje.
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
  step-title:
    fontFamily: "Gloock, Georgia, serif"
    fontSize: "2.4rem"
    fontWeight: 400
    lineHeight: 1
  hero:
    fontFamily: "Gloock, Georgia, serif"
    fontSize: "2rem"
    fontWeight: 400
    lineHeight: 0.95
  card-title:
    fontFamily: "Gloock, Georgia, serif"
    fontSize: "1.2rem"
    fontWeight: 400
    lineHeight: 1.25
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
  card: "16px"
  hero: "22px"
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
  product-card:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.text}"
    typography: "{typography.card-title}"
    rounded: "{rounded.card}"
  button-add:
    backgroundColor: "{colors.gold}"
    textColor: "{colors.on-gold}"
    rounded: "{rounded.pill}"
    size: "44px"
  step-bar:
    backgroundColor: "{colors.gold}"
    textColor: "{colors.on-gold}"
    rounded: "{rounded.pill}"
    height: "56px"
  mode-option:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.text}"
    rounded: "{rounded.hero}"
    height: "96px"
  mode-option-selected:
    backgroundColor: "{colors.gold}"
    textColor: "{colors.on-gold}"
  hero-card:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.text}"
    typography: "{typography.hero}"
    rounded: "{rounded.hero}"
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

**Creative North Star: "El mostrador de cadena, con mármol de barrio"**

La estructura es la que McDonald's y Burger King pulieron durante años para pedir comida rápida en el celular (spec 003): un destacado arriba, categorías con ícono fijas, "Recomendadas" en carrusel, el menú en tarjetas grandes con foto y un "+" dorado para agregar, una barra fija "Ver pedido" al pie y la revisión del pedido con "¿Le sumás algo?". De las cadenas se toma la estructura, nunca su identidad: la piel es la de El Bocadillo, una noche cálida con el mármol negro de vetas doradas de sus piezas de Instagram y la serif dorada del nombre.

Mientras no haya fotos reales (spec 002), cada producto lleva un mármol propio: vetas doradas deterministas por producto y el ícono de su categoría en trazo fino. Cuando aparece `public/menu/<id>.jpg`, la foto ocupa ese lugar sin tocar código.

La comanda térmica sigue siendo el segundo material: vive en la revisión del pedido como vista previa exacta del mensaje de WhatsApp, con su boca de impresora y su línea impresa.

**Key Characteristics:**
- Estructura de pedido de las cadenas: tarjetas con foto, agregado rápido, barra "Ver pedido", sugerencias en la revisión.
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
- **Step title** (400, 2.4rem en mobile y 3rem desde sm, line-height 1): títulos de pantalla ("¿Cómo lo querés?", "Elegí tu comida", "Tu pedido").
- **Hero** (400, 2rem en mobile y 3.75rem desde sm, line-height 0.95, `text-balance`): el titular del destacado.
- **Card title** (400, 1.2rem, line-height 1.25, `text-balance`): nombres de producto en las tarjetas.
- **Title** (400, 1.6rem, line-height 1.25): reservado; los productos usan Card title en las tarjetas y 2rem en la hoja de producto. Los títulos de hoja y de sección ("Tu comanda", "Tus datos") usan Gloock a 1.5rem.
- **Body** (400, 1rem, line-height 1.5): descripciones (0.95rem en filas, con `line-clamp` de 2 líneas), ayudas y avisos (0.875rem).
- **Label** (600, 1rem): leyendas de campos, chips, botones y precios. Precios y cantidades siempre con cifras tabulares.
- **Ticket** (400, 12.5px, line-height 1.6, ancho 88%): todo el texto impreso; negrita 700 para los nombres de ítem. En la tira fija se usa a 12px.

### Named Rules
**The Mono Sobre Papel Rule.** Martian Mono aparece solo sobre papel térmico. Fuera del ticket, ningún texto se escribe en mono.

**The Serif Para Nombres Rule.** Gloock lleva nombres (del local, de categorías, de burgers, de hojas), siempre en peso 400 y en caja normal; nunca botones, etiquetas ni párrafos.

## Layout

Mobile-first en una columna de hasta 48rem centrada, con margen lateral de 16px (24px desde 640px). Las categorías arrancan con 40px de aire arriba; las filas del menú son renglones de pizarra separados por una línea `edge`, con 20px de aire vertical; los formularios respiran a 28px entre grupos y 16px dentro de un grupo.

El pedido es un flujo por pantallas, como el kiosco de McDonald's (spec 005): "¿Cómo lo querés?", los pasos del menú (Comida y Bebidas, definidos en `steps` de `src/data/menu.ts`; no hay paso de acompañamiento porque las burgers ya traen papas) y "Tu pedido". Cada pantalla es una entrada del historial, así que el botón atrás del celular vuelve al paso anterior.

- **"¿Cómo lo querés?":** encabezado completo (nombre, dirección y estado, con el aviso de cerrado) y tres opciones grandes.
- **Pasos del menú:** encabezado compacto en una línea, barra de pasos fija y título del paso en Gloock a 2.4rem. En Comida van además el hero y "Recomendadas" (carrusel con snap, tarjetas al 72% del ancho). Después, una sección por categoría con grilla de tarjetas: 2 columnas en mobile, 3 desde 768px y 4 desde 1280px, con 12px entre columnas y 28px entre filas. La columna del menú llega hasta 64rem.
- **"Tu pedido":** una columna de 36rem con la comanda, los datos y "Enviar pedido" pegajoso al pie.

La barra de pasos (con las chips de categoría del paso debajo, si tiene más de una) es fija arriba sobre el suelo al 95% con desenfoque; `scroll-padding-top` es de 11.5rem para que las secciones no queden tapadas. En cada paso del menú, la barra inferior es fija al pie (margen de 12px, respeta `safe-area-inset-bottom`, con un velo de suelo detrás) y el contenido reserva 9rem al pie.

Desde 1024px, los pasos del menú pasan a dos columnas: el paso a la izquierda (con la barra inferior pegajosa al pie de la columna) y la comanda en vivo en un aside fijo de alto completo (26rem, 28rem desde 1280px) sobre surface. En "¿Cómo lo querés?" y "Tu pedido" no hay aside: la comanda está en la pantalla principal.

Las hojas son `dialog` nativos: suben desde abajo a ancho completo en mobile (máx. 92dvh; la comanda ocupa la pantalla completa) y se centran a 34rem desde 768px. Toda barra de acción dentro de una hoja es pegajosa al pie sobre surface.

## Elevation & Depth

La profundidad es tonal: ground, surface y raised son tres pasos de luz del mismo negro cálido, y el hover sube un paso (surface a raised, raised a edge). No hay sombras en reposo. La única sombra del sistema es la del papel que flota sobre el menú. El fondo de las hojas oscurece la página al 72%.

### Shadow Vocabulary
- **Botón flotante** (`0 6px 16px rgb(0 0 0 / 0.45)`): el "+" dorado sobre la foto de la tarjeta.
- **Barra de pedido** (`0 10px 28px rgb(0 0 0 / 0.55)`): la barra "Ver pedido", que flota sobre el menú.
- **Velo de hoja** (`::backdrop` en `rgb(5 4 3 / 0.72)`): detrás de toda hoja abierta.

### Named Rules
**The Un Paso De Luz Rule.** Para separar o mostrar hover, subí un escalón tonal. No agregues sombras ni bordes a las superficies de noche; las únicas sombras son las de los controles dorados que flotan.

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
- **Tarjeta de producto:** foto cuadrada (4:3 en "Recomendadas") con 16px de radio; debajo, el nombre en Card title y el precio dorado tabular ("desde" en gris si hay tamaños). Foto, nombre y precio son un solo botón que abre la hoja del producto; al presionar, la foto se achica a 0.98.
- **Etiqueta de categoría:** debajo del precio, en 0.875rem gris con el ícono de papas en dorado (trazo 1.75), cuando la categoría tiene `badge`. Hoy: "Con papas" en Burgers.
- **"+" de la tarjeta:** círculo dorado de 44px con "+" en tinta, a 8px de la esquina inferior derecha de la foto (posicionado con `cqw`). Si el producto no tiene tamaños, agrega directo (agregado rápido de las cadenas) y hace un pop; si tiene, abre la hoja.
- **Contador en la tarjeta:** píldora de 28px arriba a la izquierda de la foto, noche al 85% con desenfoque, check y cantidad en dorado. Es la confirmación del agregado rápido; no es un badge rojo.
- **Mármol (placeholder de foto):** superficie con dos brillos radiales cálidos, tres vetas doradas en SVG (1.5px al 55% y 0.75px al 30%) que salen del id del producto, y el ícono lucide de la categoría en dorado al 85% con trazo 1.25.
- **Hero:** caja de 22px de radio y 16rem de alto mínimo, siempre sobre mármol. Con foto, la foto va recortada arriba a la derecha (14rem, 20rem desde sm) con los bordes desvanecidos por una máscara radial (`.fade-edges`) para fundirse con el mármol; sin foto, el ícono de la categoría grande y al 30%. Un velo de abajo hacia arriba asegura la lectura del texto. Titular en Hero, nombre y descripción del producto en 2 líneas, y CTA dorado "Pedila" con el precio en una cápsula dentro del botón. El destacado sale de `hero` en `src/data/menu.ts`.
- **Renglón compacto (listas sin fotos):** para categorías con `layout: "list"` (bebidas, tragos, latas y combos). Renglón separado por línea `edge` con nombre en Label, receta opcional en gris de 2 líneas, precio dorado tabular y "+" raised de 44px que se vuelve dorado en hover. Una columna en mobile y dos desde 768px. Con ítems en el pedido, check y cantidad en dorado antes del nombre.
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
- **"¿Cómo lo querés?":** tres opciones de 96px y 22px de radio sobre surface: Delivery (moto), Paso a retirar (bolsa) y Para consumir en el local (cubiertos). Cada una lleva el ícono en un círculo raised de 56px, el nombre en Label a 1.125rem, una ayuda en gris y un chevron. El modo elegido antes aparece en dorado. Tocar una opción la elige y avanza.
- **Barra de pasos:** chip del modo elegido ("Delivery · cambiar", vuelve al inicio), y debajo una grilla con un segmento por pantalla: nombre en 0.75rem y una barra de 4px, dorada hasta el paso actual y raised después. El paso actual lleva el nombre en dorado y `aria-current="step"`. Todos los segmentos se pueden tocar (zona de 44px).
- **Chips de categoría:** solo las del paso, en píldora (ícono y nombre), con scroll horizontal. El chip activo sigue a la sección visible. Son botones y no anclas, así no ensucian el historial.

### Barra del paso
Al pie de cada paso del menú. A la izquierda, si hay ítems, una píldora raised de 56px con la cantidad en un círculo dorado y el total; tocarla lleva a "Tu pedido" y con cada cambio rebota 8px. A la derecha, la acción dorada de 56px con "Siguiente" en Label a 1.125rem, el destino debajo en 0.75rem (tinta al 70%) y un chevron. Las dos líneas hacen que entre al lado del total aun en 360px. Después del primer paso (hoy, Bebidas), si no se agregó nada de ese paso, dice "No, gracias".

### Hojas
`dialog` nativo sobre surface con título en Gloock a 1.5rem y botón de cerrar circular. La hoja de producto abre con la foto (o el mármol) a sangre en 4:3 (16:10 desde 768px), el botón de cerrar flotando sobre ella en un círculo de noche al 70%, y el nombre debajo en Gloock a 2rem. Entran desde abajo en 380ms con `cubic-bezier(0.16, 1, 0.3, 1)`; el velo aparece en 300ms. Con movimiento reducido todas las transiciones duran 1ms.

### Comanda térmica (componente firma)
El ticket es papel sin radio con borde dentado, Martian Mono a 12.5px, 28px arriba, 32px abajo y 20px de lado. Cada renglón es exactamente el texto del mensaje de WhatsApp; los controles de cantidad (papelera, restar, sumar en círculos de 36px) van en Archivo y no forman parte del texto. Las secciones se separan con corte punteado. Sobre el papel hay una **boca de comandera** (barra casi negra de 12px con su ranura) y el papel sale por debajo: con cada cambio de cantidad todo el ticket avanza 18px desde la ranura (560ms, ease-out-expo) y la línea tocada se imprime con recorte de arriba hacia abajo y queda sobre el marcador. Debajo, siempre, la frase "Esto es exactamente lo que le llega al local por WhatsApp." La comanda vive en la hoja "Tu pedido" (mobile) o en la columna lateral (desktop); en el menú, el estado del pedido lo da la barra "Ver pedido".

## Do's and Don'ts

### Do:
- **Do** tomar la estructura de las grandes cadenas (tarjetas con foto, agregado rápido, barra de pedido, sugerencias en la revisión) y vestirla con la marca propia.
- **Do** mostrar la vista previa del mensaje como papel térmico (paper con borde dentado).
- **Do** escribir precios y cantidades en cifras tabulares; en el menú van en dorado y 600.
- **Do** separar superficies de noche subiendo un escalón tonal (ground, surface, raised, edge).
- **Do** mantener todo control táctil en 44px o más (48px en campos y acciones de hoja, 56px en enviar).
- **Do** usar `cubic-bezier(0.16, 1, 0.3, 1)` para todo movimiento y respetar `prefers-reduced-motion`.
- **Do** usar el contorno dorado de 2px como foco en todo elemento interactivo.

### Don't:
- **Don't** copiar la identidad de McDonald's o Burger King: ni rojo y amarillo, ni naranja y marrón, ni sus nombres, logos o textos.
- **Don't** usar badges rojos de contador ni sugerir productos al agregar: las sugerencias son los pasos del flujo.
- **Don't** usar Martian Mono fuera del papel térmico ni tokens `paper-*` sobre la noche.
- **Don't** redondear el papel: sus bordes son dientes de 7px o cortes punteados.
- **Don't** agregar sombras a superficies de noche; solo flotan con sombra el "+" de la tarjeta y la barra "Ver pedido".
- **Don't** usar el dorado como fondo de sección, borde decorativo o texto corrido.
- **Don't** poner Gloock en botones, etiquetas o párrafos, ni en otro peso que 400.
