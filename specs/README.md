# Specs — El Bocadillo

Este proyecto se trabaja con **Spec Driven Development**: ninguna funcionalidad se implementa sin una spec en esta carpeta. Si cambia el alcance, primero se actualiza la spec y después el código.

## Flujo

1. Crear `specs/NNN-nombre-corto/spec.md` a partir de [`_template.md`](./_template.md).
2. Revisar la spec (requisitos, criterios de aceptación, modelo de datos, decisiones).
3. Abrir rama `feat/NNN-nombre-corto`, implementar y referenciar la spec en el PR.
4. Al mergear, marcar la spec como `Estado: implementada` y actualizar `graphify-out/`.

## Índice

| Nº | Spec | Estado |
|----|------|--------|
| 001 | [Pedido por WhatsApp](./001-pedido-whatsapp/spec.md) | implementada (v1) |
| 002 | [Fotos y logo](./002-fotos-y-logo.md) | borrador |
| 003 | [Redesign basado en las grandes cadenas](./003-redesign-cadenas/spec.md) | implementada |

Próximas ideas en [`roadmap.md`](./roadmap.md).
