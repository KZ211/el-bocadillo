# Graph Report - el-bocadillo  (2026-11-03)

## Corpus Check
- 41 files · ~20,209 words
- Verdict: corpus is large enough that graph structure adds value.
- Unclassified: 7 file(s) not represented in the graph (top: .log 3, (none) 2, .ico 1)

## Summary
- 284 nodes · 580 edges · 12 communities (11 shown, 1 thin omitted)
- Extraction: 90% EXTRACTED · 10% INFERRED · 0% AMBIGUOUS · INFERRED: 56 edges (avg confidence: 0.85)
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `17cee897`
- Run `git rev-parse HEAD` and compare to check if the graph is stale.
- Run `graphify update .` after code changes (no API cost).

## Community Hubs (Navigation)
- Spec 001 Pedido por WhatsApp
- package.json
- comanda-panel.tsx
- order-app.tsx
- DESIGN.md design system
- menu.ts
- compilerOptions
- layout.tsx
- store.ts
- hours.ts
- 003 — Redesign basado en las grandes cadenas
- pnpm-workspace.yaml

## God Nodes (most connected - your core abstractions)
1. `Spec 001 Pedido por WhatsApp` - 18 edges
2. `OrderApp()` - 17 edges
3. `compilerOptions` - 16 edges
4. `DESIGN.md design system` - 16 edges
5. `ComandaPanel()` - 15 edges
6. `formatMoney()` - 14 edges
7. `buildTicket()` - 13 edges
8. `Roadmap` - 11 edges
9. `003 — Redesign basado en las grandes cadenas` - 10 edges
10. `CLAUDE.md project rules` - 10 edges

## Surprising Connections (you probably didn't know these)
- `No incluye` --references--> `buildTicket()`  [INFERRED]
  specs/003-redesign-cadenas/spec.md → src/lib/order/message.ts
- `Comanda termica signature component` --conceptually_related_to--> `buildTicket()`  [INFERRED]
  DESIGN.md → src/lib/order/message.ts
- `R7 Envio por WhatsApp wa.me` --references--> `WHATSAPP_NUMBER`  [EXTRACTED]
  specs/001-pedido-whatsapp/spec.md → src/lib/order/message.ts
- `CLAUDE.md project rules` --references--> `buildTicket()`  [EXTRACTED]
  CLAUDE.md → src/lib/order/message.ts
- `R5 La comanda es el mensaje` --references--> `buildTicket()`  [EXTRACTED]
  specs/001-pedido-whatsapp/spec.md → src/lib/order/message.ts

## Import Cycles
- None detected.

## Hyperedges (group relationships)
- **Ticket equals WhatsApp message pipeline** — src_lib_order_message_buildticket, specs_001_pedido_whatsapp_spec_comanda_es_mensaje, design_comanda_termica, specs_001_pedido_whatsapp_spec_formato_del_mensaje [EXTRACTED 0.95]
- **Product to direction to design system chain** — product_principles, surface_thesis, design_north_star, design_two_materials [INFERRED 0.75]
- **Spec Driven Development workflow** — claude_spec_first, readme_sdd, specs_readme_sdd_flow, specs__template_structure [INFERRED 0.85]

## Communities (12 total, 1 thin omitted)

### Community 0 - "Spec 001 Pedido por WhatsApp"
Cohesion: 0.07
Nodes (43): AGENTS.md Next.js agent rules, Next.js breaking changes warning, CLAUDE.md project rules, pnpm test && lint && typecheck before PR, Branch + PR workflow, never commit to main, Hojas (native dialog sheets), graphify project map, Accessibility and inclusion (+35 more)

### Community 1 - "package.json"
Cohesion: 0.07
Nodes (31): eslintConfig, devDependencies, eslint@^9, eslint-config-next@16.4.3, tailwindcss@^4, @tailwindcss/turbopack@^4, @types/node@^20, @types/react@^19 (+23 more)

### Community 2 - "comanda-panel.tsx"
Cohesion: 0.12
Nodes (33): ComandaPanel(), Props, Sent, SentState(), Suggestions(), WhatsAppIcon(), PrinterMouth(), LineControls() (+25 more)

### Community 3 - "order-app.tsx"
Cohesion: 0.13
Nodes (30): lucide-react, react, CardProps, CategoryNav(), countByProduct(), HeroCard(), isQuickAdd(), MenuSection() (+22 more)

### Community 4 - "DESIGN.md design system"
Cohesion: 0.15
Nodes (15): Surface: pedido (/) direction contract, Mobile first verification, DESIGN.md design system, Buttons and pill shapes, Color tokens (ground, surface, gold, paper), Comanda termica signature component, Layout: mobile column, desktop two columns, Printer motion grammar and reduced motion (+7 more)

### Community 5 - "menu.ts"
Cohesion: 0.16
Nodes (11): Home(), publicFile(), burgerExtras, categories, hero, papasExtras, products, productsById (+3 more)

### Community 6 - "compilerOptions"
Cohesion: 0.11
Nodes (18): compilerOptions, allowJs, esModuleInterop, incremental, isolatedModules, jsx, lib, module (+10 more)

### Community 7 - "layout.tsx"
Cohesion: 0.12
Nodes (13): nextConfig, dependencies, lucide-react@^1.63.0, next@16.4.3, react@19.3.0, react-dom@19.3.0, next, react-dom (+5 more)

### Community 8 - "store.ts"
Cohesion: 0.12
Nodes (23): CheckoutForm(), Field(), invalid(), modes, payments, Props, Segmented(), initial (+15 more)

### Community 9 - "hours.ts"
Cohesion: 0.22
Nodes (10): Where to change each thing table, clock(), DAY_NAMES, Interval, intervals, OPEN_DAYS, SHIFTS, storeStatus (+2 more)

### Community 10 - "003 — Redesign basado en las grandes cadenas"
Cohesion: 0.17
Nodes (12): 003 — Redesign basado en las grandes cadenas, Alcance, Contexto, Criterios de aceptación, Decisiones, Fuentes, Incluye, Investigación: qué tomamos de cada referente (+4 more)

## Knowledge Gaps
- **1 isolated node(s):** `005 Panel del local`
  These have ≤1 connection - possible missing edges or undocumented components. (Counts symbols only; 81 node(s) total have ≤1 connection when file, concept and rationale nodes are included.)
- **1 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `buildTicket()` connect `comanda-panel.tsx` to `Spec 001 Pedido por WhatsApp`, `003 — Redesign basado en las grandes cadenas`, `DESIGN.md design system`?**
  _High betweenness centrality (0.159) - this node is a cross-community bridge._
- **Are the 3 inferred relationships involving `Spec 001 Pedido por WhatsApp` (e.g. with `WhatsApp order flow` and `PRODUCT.md`) actually correct?**
  _`Spec 001 Pedido por WhatsApp` has 3 INFERRED edges - model-reasoned connections that need verification._
- **What connects `005 Panel del local` to the rest of the system?**
  _1 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `Spec 001 Pedido por WhatsApp` be split into smaller, more focused modules?**
  _Cohesion score 0.0700354609929078 - nodes in this community are weakly interconnected._
- **Why does `Where to change each thing table` connect `hours.ts` to `Spec 001 Pedido por WhatsApp`, `comanda-panel.tsx`, `DESIGN.md design system`, `menu.ts`, `layout.tsx`?**
  _High betweenness centrality (0.096) - this node is a cross-community bridge._
- **Are the 2 inferred relationships involving `DESIGN.md design system` (e.g. with `Surface: pedido (/) direction contract` and `PRODUCT.md`) actually correct?**
  _`DESIGN.md design system` has 2 INFERRED edges - model-reasoned connections that need verification._
- **Should `package.json` be split into smaller, more focused modules?**
  _Cohesion score 0.07394957983193277 - nodes in this community are weakly interconnected._