---
version: 1
slug: "src-app-page-tsx"
primary_target: "src/app/page.tsx"
related_targets: []
---

# Surface: pedido (/)

Mode: Operate. Audience: clientes de El Bocadillo que llegan desde WhatsApp, en el celular, de noche y con hambre. Task: armar y enviar el pedido en < 1 minuto. Constraint: v1 sin backend; el mensaje de WhatsApp es el producto.

## Direction contract

THESIS: Flujo de pedido del kiosco de McDonald's vestido de El Bocadillo (specs 003 y 005): "¿Cómo lo querés?" (Delivery en moto, Paso a retirar, Para consumir en el local), después Comida, Acompañar y Bebidas, cada uno salteable con "No, gracias", y al final "Tu pedido" con la comanda térmica como vista previa exacta del mensaje de WhatsApp. Se toma la estructura de las cadenas, no su identidad.

OWN-WORLD: Noche de local: negro cálido (#0d0c0a) como suelo, superficies un paso más claras, dorado de marca (#d6a842) solo en marca, precios destacados y acción principal. Papel térmico crema-blanco (#f6f3ea) con borde dentado y tinta negra para el ticket. Display serif de alto contraste (Gloock) para la marca y nombres de burgers; Archivo para UI; mono de ticket solo dentro del ticket (es dato real). Esquinas rectas en papel, 10px en controles.

STORY: El cliente ve en segundos que el local está abierto, recorre las burgers firmadas, configura tamaño/extras/sin, ve cómo su comanda se imprime y la manda por WhatsApp sabiendo exactamente qué texto le llega al local.

FIRST VIEWPORT: Mobile 375: wordmark dorado, dirección y estado; "¿Cómo lo querés?" en Gloock y tres opciones grandes con ícono. En los pasos: encabezado compacto, barra de pasos que se puede tocar, título del paso y menú en tarjetas; abajo, el total y "Siguiente: <paso>". Desktop: el paso a la izquierda y la comanda en vivo a la derecha.

FORM: mostrador de cadena sobre mármol de barrio (redesign 2026-11-03; la v1 "comanda térmica" queda en la rama old-version). Signature move: el mármol con vetas doradas propias de cada producto como placeholder de foto, más el agregado rápido con pop y el contador sobre la tarjeta.

FINISH: unreviewed and undocumented is unfinished; this build ends with the finish review, the verdict, DESIGN.md, and every shipping raster carrying its provenance
