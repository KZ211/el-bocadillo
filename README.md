# El Bocadillo · Pedidos por WhatsApp

Página de pedidos de **El Bocadillo** (smash burgers, Manuel Dorrego 413, Presidente Derqui). El local la manda como respuesta automática por WhatsApp: el cliente arma el pedido, elige entrega y pago, y al confirmar se abre WhatsApp con la **comanda escrita y estructurada** lista para enviar.

## Stack

Next.js (App Router) · TypeScript · Tailwind CSS v4 · Vitest · deploy en Vercel. Sin backend en v1: el carrito vive en el navegador.

## Desarrollo

```bash
pnpm install
pnpm dev          # http://localhost:3000
pnpm test         # tests de precios, mensaje, horario y validación
pnpm lint && pnpm typecheck
pnpm build
```

## Dónde se cambia cada cosa

| Qué | Archivo |
|---|---|
| Productos, precios, agregados | `src/data/menu.ts` |
| Número de WhatsApp | `src/lib/order/message.ts` (`WHATSAPP_NUMBER`) |
| Formato del mensaje | `src/lib/order/message.ts` |
| Horarios | `src/lib/order/hours.ts` |
| Colores y tipografías | `src/app/globals.css`, `src/app/layout.tsx` (ver `DESIGN.md`) |
| Logo | copiar `public/logo.png` (se detecta solo) |
| Fotos de productos | copiar `public/menu/<id-del-producto>.jpg` (se detectan solas) |

## Cómo trabajamos

- **Spec Driven Development**: toda funcionalidad nace en `specs/` (ver `specs/README.md`). Roadmap en `specs/roadmap.md`.
- **Ramas y PRs**: nada directo a `main`; rama `feat/NNN-...` + `gh pr create`.
- **Diseño**: `PRODUCT.md` (producto), `DESIGN.md` (sistema visual), `.impeccable/surfaces/` (contrato de dirección). Mobile first.
- **graphify**: mapa del proyecto en `graphify-out/GRAPH_REPORT.md`; actualizar con `/graphify . --update` tras cambios relevantes.
