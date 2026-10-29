@AGENTS.md

# El Bocadillo — reglas del proyecto

- Leer `PRODUCT.md`, `DESIGN.md` y la spec correspondiente en `specs/` antes de tocar código.
- Spec primero: si cambia el alcance, actualizar la spec antes del código.
- Nunca commitear a `main`: rama + PR (`gh pr create`).
- Mobile first (360–414px); verificar con capturas mobile antes que desktop.
- UI: usar `/impeccable`, `/design-taste-frontend` y `/ui-ux-pro-max`.
- El ticket de la comanda y el mensaje de WhatsApp salen de `buildTicket` (`src/lib/order/message.ts`); no duplicar el formato en otro lado.
- `pnpm test && pnpm lint && pnpm typecheck` antes de abrir un PR.
- Tras cambios relevantes: `/graphify . --update`.
