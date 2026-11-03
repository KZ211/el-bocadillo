# Graph Report - el-bocadillo  (2026-11-03)

## Corpus Check
- 43 files · ~21,469 words
- Verdict: corpus is large enough that graph structure adds value.
- Unclassified: 4 file(s) not represented in the graph (top: (none) 2, .ico 1, .css 1)

## Summary
- 326 nodes · 664 edges · 13 communities (12 shown, 1 thin omitted)
- Extraction: 91% EXTRACTED · 9% INFERRED · 0% AMBIGUOUS · INFERRED: 61 edges (avg confidence: 0.85)
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `a27ec100`
- Run `git rev-parse HEAD` and compare to check if the graph is stale.
- Run `graphify update .` after code changes (no API cost).

## Community Hubs (Navigation)
- Spec 001 Pedido por WhatsApp
- package.json
- comanda-panel.tsx
- order-app.tsx
- product-sheet.tsx
- menu.ts
- compilerOptions
- layout.tsx
- 004 — Menú real: bebidas, tragos, burgers de la casa y fotos
- hours.ts
- 003 — Redesign basado en las grandes cadenas
- pnpm-workspace.yaml
- 005 — Pedido por pasos (estilo kiosco de McDonald's)

## God Nodes (most connected - your core abstractions)
1. `OrderApp()` - 19 edges
2. `Spec 001 Pedido por WhatsApp` - 18 edges
3. `buildTicket()` - 16 edges
4. `compilerOptions` - 16 edges
5. `DESIGN.md design system` - 16 edges
6. `ComandaPanel()` - 14 edges
7. `formatMoney()` - 14 edges
8. `Roadmap` - 11 edges
9. `lucide-react` - 10 edges
10. `003 — Redesign basado en las grandes cadenas` - 10 edges

## Surprising Connections (you probably didn't know these)
- `No incluye` --references--> `buildTicket()`  [INFERRED]
  specs/003-redesign-cadenas/spec.md → src/lib/order/message.ts
- `Criterios de aceptación` --references--> `buildTicket()`  [INFERRED]
  specs/005-pedido-por-pasos/spec.md → src/lib/order/message.ts
- `No incluye` --references--> `buildTicket()`  [INFERRED]
  specs/005-pedido-por-pasos/spec.md → src/lib/order/message.ts
- `Comanda termica signature component` --conceptually_related_to--> `buildTicket()`  [INFERRED]
  DESIGN.md → src/lib/order/message.ts
- `CLAUDE.md project rules` --references--> `buildTicket()`  [EXTRACTED]
  CLAUDE.md → src/lib/order/message.ts

## Import Cycles
- None detected.

## Hyperedges (group relationships)
- **Ticket equals WhatsApp message pipeline** — src_lib_order_message_buildticket, specs_001_pedido_whatsapp_spec_comanda_es_mensaje, design_comanda_termica, specs_001_pedido_whatsapp_spec_formato_del_mensaje [EXTRACTED 0.95]
- **Product to direction to design system chain** — product_principles, surface_thesis, design_north_star, design_two_materials [INFERRED 0.75]
- **Spec Driven Development workflow** — claude_spec_first, readme_sdd, specs_readme_sdd_flow, specs__template_structure [INFERRED 0.85]

## Communities (13 total, 1 thin omitted)

### Community 0 - "Spec 001 Pedido por WhatsApp"
Cohesion: 0.05
Nodes (60): Surface: pedido (/) direction contract, AGENTS.md Next.js agent rules, Next.js breaking changes warning, CLAUDE.md project rules, pnpm test && lint && typecheck before PR, Mobile first verification, Branch + PR workflow, never commit to main, DESIGN.md design system (+52 more)

### Community 1 - "package.json"
Cohesion: 0.07
Nodes (31): eslintConfig, devDependencies, eslint@^9, eslint-config-next@16.4.3, tailwindcss@^4, @tailwindcss/turbopack@^4, @types/node@^20, @types/react@^19 (+23 more)

### Community 2 - "comanda-panel.tsx"
Cohesion: 0.09
Nodes (44): ComandaPanel(), Props, Sent, SentState(), WhatsAppIcon(), PrinterMouth(), Configurator(), LineControls() (+36 more)

### Community 3 - "order-app.tsx"
Cohesion: 0.11
Nodes (34): TicketPreview(), FriesIcon(), ModeStep(), options, Props, CardProps, CategoryNav(), countByProduct() (+26 more)

### Community 4 - "product-sheet.tsx"
Cohesion: 0.12
Nodes (20): dependencies, lucide-react@^1.63.0, react@19.3.0, react-dom@19.3.0, lucide-react, react, react-dom, CheckoutForm() (+12 more)

### Community 5 - "menu.ts"
Cohesion: 0.12
Nodes (18): Home(), publicFile(), burgerExtras, categories, hero, papasExtras, products, productsById (+10 more)

### Community 6 - "compilerOptions"
Cohesion: 0.11
Nodes (18): compilerOptions, allowJs, esModuleInterop, incremental, isolatedModules, jsx, lib, module (+10 more)

### Community 7 - "layout.tsx"
Cohesion: 0.17
Nodes (8): nextConfig, next@16.4.3, next, archivo, gloock, martian, metadata, viewport

### Community 8 - "004 — Menú real: bebidas, tragos, burgers de la casa y fotos"
Cohesion: 0.18
Nodes (11): 004 — Menú real: bebidas, tragos, burgers de la casa y fotos, Alcance, Contexto, Criterios de aceptación, Decisiones, Incluye, Modelo de datos, No incluye (+3 more)

### Community 9 - "hours.ts"
Cohesion: 0.28
Nodes (8): clock(), DAY_NAMES, Interval, intervals, OPEN_DAYS, SHIFTS, storeStatus, weekMinutes()

### Community 10 - "003 — Redesign basado en las grandes cadenas"
Cohesion: 0.17
Nodes (12): 003 — Redesign basado en las grandes cadenas, Alcance, Contexto, Criterios de aceptación, Decisiones, Fuentes, Incluye, Investigación: qué tomamos de cada referente (+4 more)

### Community 12 - "005 — Pedido por pasos (estilo kiosco de McDonald's)"
Cohesion: 0.20
Nodes (9): 005 — Pedido por pasos (estilo kiosco de McDonald's), Alcance, Contexto, Criterios de aceptación, Decisiones, Incluye, Modelo de datos, No incluye (+1 more)

## Knowledge Gaps
- **1 isolated node(s):** `005 Panel del local`
  These have ≤1 connection - possible missing edges or undocumented components. (Counts symbols only; 99 node(s) total have ≤1 connection when file, concept and rationale nodes are included.)
- **1 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `buildTicket()` connect `comanda-panel.tsx` to `Spec 001 Pedido por WhatsApp`, `003 — Redesign basado en las grandes cadenas`, `order-app.tsx`, `005 — Pedido por pasos (estilo kiosco de McDonald's)`?**
  _High betweenness centrality (0.173) - this node is a cross-community bridge._
- **Are the 3 inferred relationships involving `Spec 001 Pedido por WhatsApp` (e.g. with `WhatsApp order flow` and `PRODUCT.md`) actually correct?**
  _`Spec 001 Pedido por WhatsApp` has 3 INFERRED edges - model-reasoned connections that need verification._
- **What connects `005 Panel del local` to the rest of the system?**
  _1 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `Spec 001 Pedido por WhatsApp` be split into smaller, more focused modules?**
  _Cohesion score 0.050078247261345854 - nodes in this community are weakly interconnected._
- **Why does `Where to change each thing table` connect `Spec 001 Pedido por WhatsApp` to `hours.ts`, `comanda-panel.tsx`, `menu.ts`, `layout.tsx`?**
  _High betweenness centrality (0.083) - this node is a cross-community bridge._
- **Are the 4 inferred relationships involving `buildTicket()` (e.g. with `Comanda termica signature component` and `No incluye`) actually correct?**
  _`buildTicket()` has 4 INFERRED edges - model-reasoned connections that need verification._
- **Should `package.json` be split into smaller, more focused modules?**
  _Cohesion score 0.07394957983193277 - nodes in this community are weakly interconnected._