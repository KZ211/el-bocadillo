# Graph Report - el-bocadillo  (2026-10-29)

## Corpus Check
- Corpus is ~14,460 words - fits in a single context window. You may not need a graph.

## Summary
- 252 nodes · 513 edges · 12 communities (11 shown, 1 thin omitted)
- Extraction: 89% EXTRACTED · 11% INFERRED · 0% AMBIGUOUS · INFERRED: 55 edges (avg confidence: 0.84)
- Token cost: 0 input · 0 output

## Community Hubs (Navigation)
- Reglas y producto
- Dependencias npm
- Comanda y mensaje WhatsApp
- App de pedido (UI)
- Sistema de diseño
- Menú, fotos y specs
- Config TypeScript
- Layout, fuentes y Next
- Formulario de checkout
- Horario del local
- Ticket térmico
- Workspace pnpm

## God Nodes (most connected - your core abstractions)
1. `Spec 001 Pedido por WhatsApp` - 18 edges
2. `compilerOptions` - 16 edges
3. `DESIGN.md design system` - 16 edges
4. `ComandaPanel()` - 14 edges
5. `buildTicket()` - 12 edges
6. `formatMoney()` - 12 edges
7. `OrderApp()` - 11 edges
8. `Roadmap` - 11 edges
9. `CLAUDE.md project rules` - 10 edges
10. `subtotal()` - 9 edges

## Surprising Connections (you probably didn't know these)
- `Comanda termica signature component` --conceptually_related_to--> `buildTicket()`  [INFERRED]
  DESIGN.md → src/lib/order/message.ts
- `R7 Envio por WhatsApp wa.me` --references--> `WHATSAPP_NUMBER`  [EXTRACTED]
  specs/001-pedido-whatsapp/spec.md → src/lib/order/message.ts
- `CLAUDE.md project rules` --references--> `buildTicket()`  [EXTRACTED]
  CLAUDE.md → src/lib/order/message.ts
- `R5 La comanda es el mensaje` --references--> `buildTicket()`  [EXTRACTED]
  specs/001-pedido-whatsapp/spec.md → src/lib/order/message.ts
- `Formato del mensaje` --references--> `buildTicket()`  [EXTRACTED]
  specs/001-pedido-whatsapp/spec.md → src/lib/order/message.ts

## Import Cycles
- None detected.

## Hyperedges (group relationships)
- **Ticket equals WhatsApp message pipeline** — src_lib_order_message_buildticket, specs_001_pedido_whatsapp_spec_comanda_es_mensaje, design_comanda_termica, specs_001_pedido_whatsapp_spec_formato_del_mensaje [EXTRACTED 0.95]
- **Spec Driven Development workflow** — claude_spec_first, readme_sdd, specs_readme_sdd_flow, specs__template_structure [INFERRED 0.85]
- **Product to direction to design system chain** — product_principles, surface_thesis, design_north_star, design_two_materials [INFERRED 0.75]

## Communities (12 total, 1 thin omitted)

### Community 0 - "Reglas y producto"
Cohesion: 0.08
Nodes (38): AGENTS.md Next.js agent rules, Next.js breaking changes warning, CLAUDE.md project rules, pnpm test && lint && typecheck before PR, Branch + PR workflow, never commit to main, Hojas (native dialog sheets), graphify project map, Accessibility and inclusion (+30 more)

### Community 1 - "Dependencias npm"
Cohesion: 0.06
Nodes (36): eslintConfig, dependencies, lucide-react@^1.63.0, react@19.3.0, react-dom@19.3.0, devDependencies, eslint@^9, eslint-config-next@16.4.3 (+28 more)

### Community 2 - "Comanda y mensaje WhatsApp"
Cohesion: 0.13
Nodes (32): ComandaPanel(), Sent, SentState(), WhatsAppIcon(), Configurator(), BuildInput, buildTicket(), modeLabel (+24 more)

### Community 3 - "App de pedido (UI)"
Cohesion: 0.13
Nodes (26): lucide-react, react, CategoryNav(), ComandaDock(), MenuSection(), OrderApp(), Props, StoreHeader() (+18 more)

### Community 4 - "Sistema de diseño"
Cohesion: 0.14
Nodes (15): Surface: pedido (/) direction contract, Mobile first verification, DESIGN.md design system, Buttons and pill shapes, Color tokens (ground, surface, gold, paper), Comanda termica signature component, Layout: mobile column, desktop two columns, Printer motion grammar and reduced motion (+7 more)

### Community 5 - "Menú, fotos y specs"
Cohesion: 0.14
Nodes (14): Evidence on hand / pending prices and photos, Where to change each thing table, Preguntas abiertas (prices, promo), Spec 002 Fotos y logo, Expected product photo files, Image detection by filename convention, Home(), publicFile() (+6 more)

### Community 6 - "Config TypeScript"
Cohesion: 0.11
Nodes (18): compilerOptions, allowJs, esModuleInterop, incremental, isolatedModules, jsx, lib, module (+10 more)

### Community 7 - "Layout, fuentes y Next"
Cohesion: 0.17
Nodes (8): nextConfig, next@16.4.3, next, archivo, gloock, martian, metadata, viewport

### Community 8 - "Formulario de checkout"
Cohesion: 0.27
Nodes (9): CheckoutForm(), Field(), invalid(), modes, payments, Props, Segmented(), DeliveryMode (+1 more)

### Community 9 - "Horario del local"
Cohesion: 0.28
Nodes (8): clock(), DAY_NAMES, Interval, intervals, OPEN_DAYS, SHIFTS, storeStatus, weekMinutes()

### Community 10 - "Ticket térmico"
Cohesion: 0.39
Nodes (6): PrinterMouth(), LineControls(), Props, Ticket(), parseBold(), TicketSection

## Knowledge Gaps
- **1 isolated node(s):** `005 Panel del local`
  These have ≤1 connection - possible missing edges or undocumented components. (Counts symbols only; 68 node(s) total have ≤1 connection when file, concept and rationale nodes are included.)
- **1 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `buildTicket()` connect `Comanda y mensaje WhatsApp` to `Reglas y producto`, `Sistema de diseño`?**
  _High betweenness centrality (0.118) - this node is a cross-community bridge._
- **Are the 3 inferred relationships involving `Spec 001 Pedido por WhatsApp` (e.g. with `WhatsApp order flow` and `PRODUCT.md`) actually correct?**
  _`Spec 001 Pedido por WhatsApp` has 3 INFERRED edges - model-reasoned connections that need verification._
- **What connects `005 Panel del local` to the rest of the system?**
  _1 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `Reglas y producto` be split into smaller, more focused modules?**
  _Cohesion score 0.08205128205128205 - nodes in this community are weakly interconnected._
- **Why does `Where to change each thing table` connect `Menú, fotos y specs` to `Reglas y producto`, `Comanda y mensaje WhatsApp`, `Sistema de diseño`, `Layout, fuentes y Next`, `Horario del local`?**
  _High betweenness centrality (0.106) - this node is a cross-community bridge._
- **Are the 2 inferred relationships involving `DESIGN.md design system` (e.g. with `Surface: pedido (/) direction contract` and `PRODUCT.md`) actually correct?**
  _`DESIGN.md design system` has 2 INFERRED edges - model-reasoned connections that need verification._
- **Should `Dependencias npm` be split into smaller, more focused modules?**
  _Cohesion score 0.0641025641025641 - nodes in this community are weakly interconnected._