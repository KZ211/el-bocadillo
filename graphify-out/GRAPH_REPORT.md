# Graph Report - el-bocadillo  (2026-11-03)

## Corpus Check
- 39 files · ~19,255 words
- Verdict: corpus is large enough that graph structure adds value.
- Unclassified: 4 file(s) not represented in the graph (top: (none) 2, .ico 1, .css 1)

## Summary
- 297 nodes · 599 edges · 10 communities (9 shown, 1 thin omitted)
- Extraction: 90% EXTRACTED · 10% INFERRED · 0% AMBIGUOUS · INFERRED: 57 edges (avg confidence: 0.85)
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `c6c89572`
- Run `git rev-parse HEAD` and compare to check if the graph is stale.
- Run `graphify update .` after code changes (no API cost).

## Community Hubs (Navigation)
- Spec 001 Pedido por WhatsApp
- package.json
- comanda-panel.tsx
- order-app.tsx
- menu.ts
- compilerOptions
- layout.tsx
- hours.ts
- 003 — Redesign basado en las grandes cadenas
- pnpm-workspace.yaml

## God Nodes (most connected - your core abstractions)
1. `Spec 001 Pedido por WhatsApp` - 18 edges
2. `OrderApp()` - 17 edges
3. `compilerOptions` - 16 edges
4. `DESIGN.md design system` - 16 edges
5. `ComandaPanel()` - 15 edges
6. `formatMoney()` - 15 edges
7. `buildTicket()` - 13 edges
8. `Roadmap` - 11 edges
9. `003 — Redesign basado en las grandes cadenas` - 10 edges
10. `CLAUDE.md project rules` - 10 edges

## Surprising Connections (you probably didn't know these)
- `No incluye` --references--> `buildTicket()`  [INFERRED]
  specs/003-redesign-cadenas/spec.md → src/lib/order/message.ts
- `Modelo de datos` --references--> `CategoryIcon`  [INFERRED]
  specs/004-menu-real/spec.md → src/lib/order/types.ts
- `Comanda termica signature component` --conceptually_related_to--> `buildTicket()`  [INFERRED]
  DESIGN.md → src/lib/order/message.ts
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

## Communities (10 total, 1 thin omitted)

### Community 0 - "Spec 001 Pedido por WhatsApp"
Cohesion: 0.06
Nodes (53): Surface: pedido (/) direction contract, AGENTS.md Next.js agent rules, Next.js breaking changes warning, CLAUDE.md project rules, pnpm test && lint && typecheck before PR, Branch + PR workflow, never commit to main, DESIGN.md design system, Buttons and pill shapes (+45 more)

### Community 1 - "package.json"
Cohesion: 0.06
Nodes (38): eslintConfig, dependencies, lucide-react@^1.63.0, react@19.3.0, react-dom@19.3.0, devDependencies, eslint@^9, eslint-config-next@16.4.3 (+30 more)

### Community 2 - "comanda-panel.tsx"
Cohesion: 0.07
Nodes (59): CheckoutForm(), Field(), invalid(), modes, payments, Props, Segmented(), ComandaPanel() (+51 more)

### Community 3 - "order-app.tsx"
Cohesion: 0.14
Nodes (26): CardProps, CategoryNav(), countByProduct(), HeroCard(), isQuickAdd(), MenuSection(), OrderApp(), OrderBar() (+18 more)

### Community 5 - "menu.ts"
Cohesion: 0.15
Nodes (12): Home(), publicFile(), burgerExtras, categories, complements, hero, papasExtras, products (+4 more)

### Community 6 - "compilerOptions"
Cohesion: 0.11
Nodes (18): compilerOptions, allowJs, esModuleInterop, incremental, isolatedModules, jsx, lib, module (+10 more)

### Community 7 - "layout.tsx"
Cohesion: 0.17
Nodes (8): nextConfig, next@16.4.3, next, archivo, gloock, martian, metadata, viewport

### Community 9 - "hours.ts"
Cohesion: 0.20
Nodes (11): Mobile first verification, Layout: mobile column, desktop two columns, clock(), DAY_NAMES, Interval, intervals, OPEN_DAYS, SHIFTS (+3 more)

### Community 10 - "003 — Redesign basado en las grandes cadenas"
Cohesion: 0.07
Nodes (26): 003 — Redesign basado en las grandes cadenas, Alcance, Contexto, Criterios de aceptación, Decisiones, Fuentes, Incluye, Investigación: qué tomamos de cada referente (+18 more)

## Knowledge Gaps
- **1 isolated node(s):** `005 Panel del local`
  These have ≤1 connection - possible missing edges or undocumented components. (Counts symbols only; 88 node(s) total have ≤1 connection when file, concept and rationale nodes are included.)
- **1 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `buildTicket()` connect `comanda-panel.tsx` to `Spec 001 Pedido por WhatsApp`, `003 — Redesign basado en las grandes cadenas`?**
  _High betweenness centrality (0.147) - this node is a cross-community bridge._
- **Are the 3 inferred relationships involving `Spec 001 Pedido por WhatsApp` (e.g. with `WhatsApp order flow` and `PRODUCT.md`) actually correct?**
  _`Spec 001 Pedido por WhatsApp` has 3 INFERRED edges - model-reasoned connections that need verification._
- **What connects `005 Panel del local` to the rest of the system?**
  _1 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `Spec 001 Pedido por WhatsApp` be split into smaller, more focused modules?**
  _Cohesion score 0.05734767025089606 - nodes in this community are weakly interconnected._
- **Why does `Where to change each thing table` connect `Spec 001 Pedido por WhatsApp` to `hours.ts`, `comanda-panel.tsx`, `menu.ts`, `layout.tsx`?**
  _High betweenness centrality (0.092) - this node is a cross-community bridge._
- **Are the 2 inferred relationships involving `DESIGN.md design system` (e.g. with `Surface: pedido (/) direction contract` and `PRODUCT.md`) actually correct?**
  _`DESIGN.md design system` has 2 INFERRED edges - model-reasoned connections that need verification._
- **Should `package.json` be split into smaller, more focused modules?**
  _Cohesion score 0.0627177700348432 - nodes in this community are weakly interconnected._