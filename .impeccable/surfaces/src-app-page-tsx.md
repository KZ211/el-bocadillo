---
version: 1
slug: "src-app-page-tsx"
primary_target: "src/app/page.tsx"
related_targets: []
---

# Surface: pedido (/)

Mode: Operate. Audience: clientes de El Bocadillo que llegan desde WhatsApp, en el celular, de noche y con hambre. Task: armar y enviar el pedido en < 1 minuto. Constraint: v1 sin backend; el mensaje de WhatsApp es el producto.

## Direction contract

THESIS: La comanda térmica del mostrador es la interfaz: el carrito es un ticket de papel que se imprime línea a línea mientras elegís, y ese ticket es literalmente el mensaje que recibe el local. Rechaza el carrito-cajón genérico de app de delivery con contador rojo.

OWN-WORLD: Noche de local: negro cálido (#0d0c0a) como suelo, superficies un paso más claras, dorado de marca (#d6a842) solo en marca, precios destacados y acción principal. Papel térmico crema-blanco (#f6f3ea) con borde dentado y tinta negra para el ticket. Display serif de alto contraste (Gloock) para la marca y nombres de burgers; Archivo para UI; mono de ticket solo dentro del ticket (es dato real). Esquinas rectas en papel, 10px en controles.

STORY: El cliente ve en segundos que el local está abierto, recorre las burgers firmadas, configura tamaño/extras/sin, ve cómo su comanda se imprime y la manda por WhatsApp sabiendo exactamente qué texto le llega al local.

FIRST VIEWPORT: Mobile 390: barra superior con wordmark EL BOCADILLO en serif dorada y estado "Abierto · cierra 03:00"; debajo dirección corta; barra de categorías fija; lista de burgers con nombre en serif grande, descripción y precio tabular dorado. Abajo fija la tira de ticket asomando (borde dentado) con "Tu comanda · N ítems · $total" como acción principal. Desktop: menú a la izquierda, ticket fijo a la derecha.

FORM: comanda térmica, posición 2 de mi lista ordenada (elegida por el usuario sobre la asignada "bolsa para llevar"). Signature move: cada línea agregada se "imprime" — el papel avanza desde la boca de la impresora con un corte de clip-path y la línea nueva queda resaltada hasta la próxima interacción. seed:5e2e172ab7e4fef5

FINISH: unreviewed and undocumented is unfinished; this build ends with the finish review, the verdict, DESIGN.md, and every shipping raster carrying its provenance
