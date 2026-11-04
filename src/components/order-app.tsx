"use client";

import { Check, ChevronRight, Motorbike, Plus, ShoppingBag, Utensils, type LucideIcon } from "lucide-react";
import { useCallback, useEffect, useMemo, useState, type ReactNode } from "react";
import { orderStore, useOrder } from "@/data/store";
import { storeStatus, type StoreStatus } from "@/lib/order/hours";
import { formatMoney, fromPrice, subtotal } from "@/lib/order/pricing";
import { countInStep, nextScreen, productsForStep, type Screen } from "@/lib/order/steps";
import type { CartLine, Category, DeliveryMode, Hero, OrderStep, Product } from "@/lib/order/types";
import { ComandaPanel, TicketPreview } from "./comanda-panel";
import { FriesIcon } from "./icons";
import { ModeStep } from "./mode-step";
import { categoryIcons, ProductArt } from "./product-art";
import { ProductSheet } from "./product-sheet";

type Props = {
  categories: Category[];
  products: Product[];
  hero: Hero;
  /** Pasos del menú (spec 005); antes va "¿Cómo lo querés?" y después "Tu pedido". */
  steps: OrderStep[];
  logo: string | null;
};

/** Sin tamaños ni preguntas: el "+" lo agrega directo, como el agregado rápido de las cadenas. */
const isQuickAdd = (product: Product) => !product.variants?.length && !product.notePrompt;

export function OrderApp({ categories, products, hero, steps, logo }: Props) {
  const byId = useMemo(() => new Map(products.map((p) => [p.id, p])), [products]);
  const getProduct = useCallback((id: string) => byId.get(id), [byId]);
  const iconOf = useMemo(() => new Map(categories.map((c) => [c.id, c.icon])), [categories]);
  const badgeOf = useMemo(() => new Map(categories.map((c) => [c.id, c.badge])), [categories]);

  const { lines, checkout, savedMode } = useOrder();
  const [selected, setSelected] = useState<Product | null>(null);
  const [productOpen, setProductOpen] = useState(false);
  const [announce, setAnnounce] = useState("");
  const { screen, go } = useScreen();

  const openProduct = (product: Product) => {
    setSelected(product);
    setProductOpen(true);
  };

  const add = (product: Product) => {
    if (!isQuickAdd(product)) return openProduct(product);
    orderStore.add({ productId: product.id, extraIds: [], removed: [], note: "", qty: 1 });
    setAnnounce(`Agregaste ${product.name} a tu pedido.`);
  };

  const qtyByProduct = useMemo(() => countByProduct(lines), [lines]);
  const card = { iconOf, badgeOf, qtyByProduct, onOpen: openProduct, onAdd: add };

  const step = steps.find((s) => s.id === screen);
  const next = nextScreen(steps, screen);
  const nextLabel = next === "pedido" ? "Tu pedido" : steps.find((s) => s.id === next)?.short;
  const inStep = step ? countInStep(step, lines, getProduct) : 0;
  // El primer paso no se "rechaza": recién en los complementos aparece "No, gracias".
  const declining = step && inStep === 0 && steps.indexOf(step) > 0;

  return (
    <div className={step ? "lg:grid lg:grid-cols-[minmax(0,1fr)_26rem] xl:grid-cols-[minmax(0,1fr)_28rem]" : ""}>
      <div className="flex min-h-dvh min-w-0 flex-col">
        <StoreHeader logo={logo} compact={screen !== "modo"} />

        {screen === "modo" ? (
          <ModeStep
            current={savedMode}
            onPick={(mode) => {
              orderStore.updateCheckout({ mode });
              go(steps[0].id);
            }}
          />
        ) : (
          <Stepper steps={steps} screen={screen} mode={checkout.mode} onGo={go}>
            {step && step.categoryIds.length > 1 ? (
              <CategoryNav categories={categories.filter((c) => step.categoryIds.includes(c.id))} />
            ) : null}
          </Stepper>
        )}

        {step ? (
          <MenuStep
            key={step.id}
            step={step}
            first={steps.indexOf(step) === 0}
            categories={categories}
            products={productsForStep(step, products)}
            hero={hero}
            heroProduct={byId.get(hero.productId)}
            card={card}
          />
        ) : null}

        {screen === "pedido" ? (
          <main className="mx-auto w-full max-w-xl flex-1 px-4 pt-6 sm:px-6">
            <h2 className="mb-5 font-display text-[2.4rem] leading-none sm:text-5xl">Tu pedido</h2>
            <ComandaPanel getProduct={getProduct} onEmpty={() => go(steps[0].id)} onNewOrder={() => go("modo")} />
          </main>
        ) : null}

        {step ? (
          <StepBar
            getProduct={getProduct}
            label={declining ? "No, gracias" : "Siguiente"}
            destination={nextLabel ?? ""}
            onNext={() => next && go(next)}
            onReview={() => go("pedido")}
          />
        ) : null}
      </div>

      {step ? (
        <aside
          aria-label="Tu pedido"
          className="hidden bg-surface lg:sticky lg:top-0 lg:flex lg:h-dvh lg:flex-col lg:overflow-y-auto"
        >
          <h2 className="px-5 pt-6 pb-4 font-display text-2xl">Tu pedido</h2>
          <div className="px-4 pb-8 sm:px-5">
            <TicketPreview getProduct={getProduct} />
          </div>
        </aside>
      ) : null}

      <p aria-live="polite" className="sr-only">
        {announce}
      </p>

      <ProductSheet
        product={selected}
        icon={selected ? iconOf.get(selected.categoryId) : undefined}
        open={productOpen}
        onClose={() => setProductOpen(false)}
        onAdded={() => setProductOpen(false)}
      />
    </div>
  );
}

/**
 * Pantalla actual con historial: cada paso es una entrada, así el botón atrás
 * del celular vuelve al paso anterior en vez de salir de la página.
 */
function useScreen() {
  const [screen, setScreen] = useState<Screen>("modo");

  useEffect(() => {
    const restore = (state: unknown) => {
      const saved = (state as { screen?: unknown } | null)?.screen;
      setScreen(typeof saved === "string" ? saved : "modo");
    };
    // Al recargar, el navegador conserva el estado de la entrada actual.
    restore(window.history.state);
    const onPop = (e: PopStateEvent) => {
      restore(e.state);
      window.scrollTo({ top: 0 });
    };
    window.addEventListener("popstate", onPop);
    return () => window.removeEventListener("popstate", onPop);
  }, []);

  const go = useCallback((next: Screen) => {
    window.history.pushState({ screen: next }, "");
    setScreen(next);
    window.scrollTo({ top: 0 });
  }, []);

  return { screen, go };
}

const modeLabels: Record<DeliveryMode, { label: string; Icon: LucideIcon }> = {
  delivery: { label: "Delivery", Icon: Motorbike },
  retiro: { label: "Paso a retirar", Icon: ShoppingBag },
  local: { label: "En el local", Icon: Utensils },
};

/** Barra de progreso fija arriba; cada paso se puede tocar (spec 005, R4). */
function Stepper({
  steps,
  screen,
  mode,
  onGo,
  children,
}: {
  steps: OrderStep[];
  screen: Screen;
  mode: DeliveryMode;
  onGo: (screen: Screen) => void;
  children?: ReactNode;
}) {
  const items = [...steps.map((s) => ({ id: s.id, short: s.short })), { id: "pedido", short: "Tu pedido" }];
  const current = items.findIndex((i) => i.id === screen);
  const { label, Icon } = modeLabels[mode];
  return (
    <div className="sticky top-0 z-10 bg-ground/95 backdrop-blur-md">
      <div className="mx-auto max-w-5xl px-4 pt-2 pb-3 sm:px-6">
        <button
          type="button"
          onClick={() => onGo("modo")}
          className="inline-flex min-h-9 items-center gap-1.5 rounded-full bg-surface pr-3 pl-2.5 text-sm font-semibold text-muted transition-colors hover:text-text"
        >
          <Icon className="size-4 text-gold" strokeWidth={2} aria-hidden />
          {label}
          <span className="font-normal">· cambiar</span>
        </button>
        <nav aria-label="Pasos del pedido" className="mt-2">
          <ol className="grid gap-1.5" style={{ gridTemplateColumns: `repeat(${items.length}, minmax(0, 1fr))` }}>
            {items.map((item, i) => (
              <li key={item.id}>
                <button
                  type="button"
                  onClick={() => onGo(item.id)}
                  aria-current={i === current ? "step" : undefined}
                  className="group flex min-h-11 w-full flex-col justify-end gap-1.5 text-left"
                >
                  <span
                    className={`truncate text-xs font-semibold transition-colors ${
                      i === current ? "text-gold" : i < current ? "text-text" : "text-muted group-hover:text-text"
                    }`}
                  >
                    {item.short}
                  </span>
                  <span
                    aria-hidden
                    className={`h-1 rounded-full transition-colors duration-500 ${i <= current ? "bg-gold" : "bg-raised"}`}
                  />
                </button>
              </li>
            ))}
          </ol>
        </nav>
      </div>
      {children}
    </div>
  );
}

function MenuStep({
  step,
  first,
  categories,
  products,
  hero,
  heroProduct,
  card,
}: {
  step: OrderStep;
  first: boolean;
  categories: Category[];
  products: Product[];
  hero: Hero;
  heroProduct?: Product;
  card: CardProps;
}) {
  const featured = products.filter((p) => p.featured);
  return (
    <main className="mx-auto w-full max-w-5xl flex-1 px-4 pb-36 sm:px-6 lg:pb-12">
      <h2 className="pt-5 font-display text-[2.4rem] leading-none sm:text-5xl">{step.title}</h2>
      {first && heroProduct ? (
        <div className="-mx-4 mt-5 sm:-mx-6">
          <HeroCard hero={hero} product={heroProduct} icon={card.iconOf.get(heroProduct.categoryId)} onAdd={card.onAdd} />
        </div>
      ) : null}
      {first && featured.length ? (
        <section aria-labelledby="recomendadas-title" className="pt-8">
          <h3 id="recomendadas-title" className="font-display text-3xl leading-none sm:text-4xl">
            Recomendadas
          </h3>
          <ul className="-mx-4 mt-4 flex snap-x snap-mandatory scroll-px-4 gap-3 overflow-x-auto px-4 pb-2 [scrollbar-width:none] sm:-mx-6 sm:scroll-px-6 sm:px-6">
            {featured.map((product) => (
              <li key={product.id} className="w-[72%] max-w-72 shrink-0 snap-start">
                <ProductCard product={product} wide {...card} />
              </li>
            ))}
          </ul>
        </section>
      ) : null}
      {categories
        .filter((c) => step.categoryIds.includes(c.id))
        .map((category) => (
          <MenuSection
            key={category.id}
            category={category}
            products={products.filter((p) => p.categoryId === category.id)}
            card={card}
            solo={step.categoryIds.length === 1}
          />
        ))}
    </main>
  );
}

/** Barra inferior del paso: total (abre el pedido) y "Siguiente" (spec 005, R3). */
function StepBar({
  getProduct,
  label,
  destination,
  onNext,
  onReview,
}: {
  getProduct: (id: string) => Product | undefined;
  label: string;
  /** A dónde lleva, en una segunda línea: entra al lado del total aun en 360px. */
  destination: string;
  onNext: () => void;
  onReview: () => void;
}) {
  const { lines } = useOrder();
  const count = lines.reduce((sum, l) => sum + l.qty, 0);
  const total = subtotal(lines, getProduct);
  return (
    <div className="fixed inset-x-0 bottom-0 z-20 bg-linear-to-t from-ground via-ground/90 to-transparent px-3 pt-6 pb-[max(0.75rem,env(safe-area-inset-bottom))] lg:sticky lg:px-6">
      <div className="mx-auto flex max-w-5xl gap-2">
        {count ? (
          <button
            key={count}
            type="button"
            onClick={onReview}
            aria-label={`Ver pedido: ${count} ${count === 1 ? "ítem" : "ítems"}, ${formatMoney(total)}`}
            className="flex min-h-14 shrink-0 items-center gap-2 rounded-full bg-raised pr-4 pl-2 transition hover:bg-edge active:scale-[0.98] motion-safe:animate-feed"
          >
            <span className="tabular grid size-10 place-items-center rounded-full bg-gold font-bold text-on-gold">
              {count}
            </span>
            <span className="tabular font-bold">{formatMoney(total)}</span>
          </button>
        ) : null}
        <button
          type="button"
          onClick={onNext}
          aria-label={`${label}: ${destination}`}
          className="flex min-h-14 min-w-0 flex-1 items-center justify-center gap-3 rounded-full bg-gold px-5 text-on-gold shadow-[0_10px_28px_rgb(0_0_0/0.55)] transition hover:bg-gold-strong active:scale-[0.98]"
        >
          <span className="flex min-w-0 flex-col items-start leading-tight">
            <span className="truncate text-lg font-semibold">{label}</span>
            <span className="truncate text-xs font-medium text-on-gold/70">{destination}</span>
          </span>
          <ChevronRight className="size-5 shrink-0" aria-hidden />
        </button>
      </div>
    </div>
  );
}

function countByProduct(lines: CartLine[]): Map<string, number> {
  const counts = new Map<string, number>();
  for (const line of lines) counts.set(line.productId, (counts.get(line.productId) ?? 0) + line.qty);
  return counts;
}

function useStoreStatus(): StoreStatus | null {
  const [status, setStatus] = useState<StoreStatus | null>(null);
  useEffect(() => {
    const tick = () => setStatus(storeStatus());
    tick();
    const id = window.setInterval(tick, 60_000);
    return () => window.clearInterval(id);
  }, []);
  return status;
}

function StoreHeader({ logo, compact }: { logo: string | null; compact?: boolean }) {
  const status = useStoreStatus();
  if (compact) {
    // En los pasos: una sola línea, así el menú arranca más arriba.
    return (
      <header className="mx-auto flex w-full max-w-5xl items-center justify-between gap-3 px-4 pt-4 sm:px-6">
        <h1 className="font-display text-2xl leading-none text-gold">El Bocadillo</h1>
        <p className="flex shrink-0 items-center gap-1.5 text-sm font-semibold text-muted" aria-live="polite">
          {status ? (
            <>
              <span className={`size-2 rounded-full ${status.open ? "bg-open" : "bg-danger"}`} aria-hidden />
              {status.open ? `Abierto hasta las ${status.closesAt}` : "Cerrado"}
            </>
          ) : null}
        </p>
      </header>
    );
  }
  return (
    <header className="mx-auto w-full max-w-5xl px-4 pt-5 pb-5 sm:px-6 sm:pt-8">
      <div className="flex items-center gap-3">
        {logo ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={logo} alt="" width={64} height={64} className="size-14 shrink-0 rounded-full sm:size-16" />
        ) : null}
        <div className="min-w-0 flex-1">
          <h1 className="font-display text-[2.25rem] leading-[0.95] tracking-[-0.01em] text-gold sm:text-5xl">
            El Bocadillo
          </h1>
          <p className="mt-1 truncate text-sm text-muted">Smash burgers · Dorrego 413, Pte. Derqui</p>
        </div>
      </div>
      <div className="mt-4 min-h-6" aria-live="polite">
        {status?.open ? (
          <p className="flex items-center gap-2 text-sm font-semibold">
            <span className="size-2.5 rounded-full bg-open" aria-hidden />
            Abierto · tomamos pedidos hasta las {status.closesAt}
          </p>
        ) : status ? (
          <p className="rounded-[10px] bg-raised px-4 py-3 text-sm">
            <span className="font-semibold">Ahora estamos cerrados.</span> Abrimos {status.opensAt}. Podés dejar tu
            pedido igual y lo vemos cuando abramos.
          </p>
        ) : null}
      </div>
    </header>
  );
}

const heroShade = "bg-linear-to-t from-ground/95 via-ground/60 to-transparent"; // taste-skill-ignore: velo para leer el texto sobre la foto

function HeroCard({
  hero,
  product,
  icon,
  onAdd,
}: {
  hero: Hero;
  product: Product;
  icon: Category["icon"];
  onAdd: (product: Product) => void;
}) {
  return (
    <section aria-labelledby="hero-title" className="mx-auto w-full max-w-5xl px-4 sm:px-6">
      <div className="relative isolate overflow-hidden rounded-[22px] bg-surface">
        <div className="absolute inset-0 -z-10">
          {/* El mármol siempre de fondo; la foto, si hay, va recortada a la derecha y fundida con él. */}
          <ProductArt
            seed={`hero-${product.id}`}
            icon={product.image ? undefined : icon}
            className="size-full"
            iconClassName={
              product.image
                ? "hidden"
                : "absolute -top-4 -right-6 size-44 text-gold/30 sm:-top-8 sm:right-8 sm:size-80"
            }
          />
          {product.image ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={product.image}
              alt=""
              className="fade-edges absolute -top-3 -right-6 size-56 object-cover sm:top-0 sm:right-6 sm:size-80"
            />
          ) : null}
        </div>
        <div className={`flex min-h-64 flex-col justify-end p-5 pt-24 sm:min-h-80 sm:p-8 ${heroShade}`}>
          <h2 id="hero-title" className="max-w-md font-display text-[2rem] leading-[0.95] text-balance sm:text-6xl">
            {hero.headline}
          </h2>
          <p className="mt-2 line-clamp-2 max-w-md text-sm text-muted sm:text-base">
            <span className="font-semibold text-text">{product.name}:</span> {product.description}
          </p>
          <button
            type="button"
            onClick={() => onAdd(product)}
            aria-label={`Pedir ${product.name}, ${formatMoney(fromPrice(product))}`}
            className="mt-4 flex min-h-12 items-center justify-between gap-4 self-start rounded-full bg-gold pr-2 pl-5 font-semibold text-on-gold transition hover:bg-gold-strong active:scale-[0.98]"
          >
            <span>Pedila</span>
            <span className="tabular rounded-full bg-on-gold/10 px-3 py-1.5">{formatMoney(fromPrice(product))}</span>
          </button>
        </div>
      </div>
    </section>
  );
}

function CategoryNav({ categories }: { categories: Category[] }) {
  // Solo resalta el chip de la sección visible: nunca mueve la página ni la fila de chips,
  // así el scroll queda libre (un scrollIntoView dentro de la barra fija hacía saltar la página).
  const [active, setActive] = useState<string | undefined>();

  useEffect(() => {
    // Secciones dentro de la franja: la activa es la primera en el orden del menú.
    const inView = new Set<string>();
    const observer = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) inView.add(e.target.id);
          else inView.delete(e.target.id);
        }
        const first = categories.find((c) => inView.has(c.id));
        if (first) setActive(first.id);
      },
      { rootMargin: "-170px 0px -55% 0px" },
    );
    categories.forEach((c) => {
      const el = document.getElementById(c.id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, [categories]);

  return (
    <nav aria-label="Categorías" className="pb-3">
      <ul className="mx-auto flex max-w-5xl gap-2 overflow-x-auto px-4 [scrollbar-width:none] sm:px-6">
        {categories.map((c) => {
          const Icon = c.icon ? categoryIcons[c.icon] : null;
          const current = active === c.id;
          return (
            <li key={c.id} className="shrink-0">
              {/* Botón y no ancla: un #hash sumaría entradas al historial y rompería el "atrás" entre pasos. */}
              <button
                type="button"
                data-cat={c.id}
                aria-current={current ? "true" : undefined}
                onClick={() => document.getElementById(c.id)?.scrollIntoView({ behavior: "smooth" })}
                className={`inline-flex min-h-11 items-center gap-2 rounded-full pr-4 pl-3 font-semibold transition-colors ${
                  current ? "bg-gold text-on-gold" : "bg-surface text-muted hover:text-text"
                }`}
              >
                {Icon ? <Icon className="size-5" strokeWidth={1.75} aria-hidden /> : null}
                {c.name}
              </button>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}

type CardProps = {
  iconOf: Map<string, Category["icon"]>;
  /** Etiqueta por categoría ("Con papas" en las burgers). */
  badgeOf: Map<string, string | undefined>;
  qtyByProduct: Map<string, number>;
  onOpen: (product: Product) => void;
  onAdd: (product: Product) => void;
};

function MenuSection({
  category,
  products,
  card,
  solo,
}: {
  category: Category;
  products: Product[];
  card: CardProps;
  /** Única categoría del paso: el título del paso ya la nombra. */
  solo?: boolean;
}) {
  if (!products.length) return null;
  return (
    <section id={category.id} aria-labelledby={`${category.id}-title`} className={solo ? "pt-4" : "pt-12"}>
      <h2
        id={`${category.id}-title`}
        className={solo ? "sr-only" : "font-display text-4xl leading-none sm:text-5xl"}
      >
        {category.name}
      </h2>
      {category.description || category.adults ? (
        <p className="mt-2 text-muted">
          {category.description}
          {category.adults ? " Solo para mayores de 18." : null}
        </p>
      ) : null}
      {category.layout === "list" ? (
        <ul className={listRules}>
          {products.map((product) => (
            <li key={product.id}>
              <ProductRow product={product} {...card} />
            </li>
          ))}
        </ul>
      ) : (
        <ul className="mt-5 grid grid-cols-2 gap-x-3 gap-y-7 md:grid-cols-3 xl:grid-cols-4">
          {products.map((product) => (
            <li key={product.id}>
              <ProductCard product={product} {...card} />
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}

const listRules = "mt-3 divide-y divide-edge md:grid md:grid-cols-2 md:gap-x-8 md:divide-y-0"; // taste-skill-ignore: lista de bebidas como renglones de pizarra

/** Renglón compacto para listas largas sin fotos (bebidas): nombre, precio y "+". */
function ProductRow({ product, qtyByProduct, onOpen, onAdd }: CardProps & { product: Product }) {
  const qty = qtyByProduct.get(product.id) ?? 0;
  return (
    <div className="flex items-center gap-3 py-3 md:border-b md:border-edge">
      <button type="button" onClick={() => onOpen(product)} className="group min-w-0 flex-1 text-left">
        <span className="flex items-baseline gap-2">
          {qty ? (
            <span className="tabular inline-flex shrink-0 items-center gap-0.5 text-sm font-semibold text-gold">
              <Check className="size-3.5" strokeWidth={3} aria-hidden />
              {qty}
              <span className="sr-only"> en tu pedido</span>
            </span>
          ) : null}
          <span className="font-semibold transition-colors group-hover:text-gold">{product.name}</span>
        </span>
        {product.description ? (
          <span className="mt-0.5 block line-clamp-2 text-sm text-muted">{product.description}</span>
        ) : null}
      </button>
      <span className="tabular shrink-0 font-semibold text-gold">{formatMoney(fromPrice(product))}</span>
      <button
        key={qty}
        type="button"
        onClick={() => onAdd(product)}
        aria-label={isQuickAdd(product) ? `Agregar ${product.name}` : `Elegir opciones de ${product.name}`}
        className={`grid size-11 shrink-0 place-items-center rounded-full bg-raised text-gold transition hover:bg-gold hover:text-on-gold active:scale-90 ${
          qty ? "motion-safe:animate-pop" : ""
        }`}
      >
        <Plus className="size-5" strokeWidth={2.5} aria-hidden />
      </button>
    </div>
  );
}

function ProductCard({
  product,
  wide,
  iconOf,
  badgeOf,
  qtyByProduct,
  onOpen,
  onAdd,
}: CardProps & { product: Product; wide?: boolean }) {
  const qty = qtyByProduct.get(product.id) ?? 0;
  const quick = isQuickAdd(product);
  return (
    <div className="@container relative">
      <button type="button" onClick={() => onOpen(product)} className="group block w-full text-left">
        <ProductArt
          seed={product.id}
          image={product.image}
          icon={iconOf.get(product.categoryId)}
          className={`w-full rounded-2xl bg-surface transition-transform duration-300 ease-out-expo group-active:scale-[0.98] ${
            wide ? "aspect-[4/3]" : "aspect-square"
          }`}
        />
        <span className="mt-3 block font-display text-[1.2rem] leading-tight text-balance transition-colors group-hover:text-gold">
          {product.name}
        </span>
        {wide ? <span className="mt-1 line-clamp-1 text-sm text-muted">{product.description}</span> : null}
        <span className="tabular mt-1 block font-semibold text-gold">
          {product.variants?.length ? <span className="text-sm font-normal text-muted">desde </span> : null}
          {formatMoney(fromPrice(product))}
        </span>
        {badgeOf.get(product.categoryId) ? (
          <span className="mt-1.5 inline-flex items-center gap-1 text-sm text-muted">
            <FriesIcon className="size-4 text-gold" strokeWidth={1.75} />
            {badgeOf.get(product.categoryId)}
          </span>
        ) : null}
      </button>

      {qty ? (
        <span className="pointer-events-none absolute top-2 left-2 inline-flex h-7 items-center gap-1 rounded-full bg-ground/85 pr-2.5 pl-2 text-sm font-semibold text-gold backdrop-blur-sm">
          <Check className="size-3.5" strokeWidth={3} aria-hidden />
          <span className="tabular">{qty}</span>
          <span className="sr-only"> en tu pedido</span>
        </span>
      ) : null}

      <button
        key={qty}
        type="button"
        onClick={() => onAdd(product)}
        aria-label={quick ? `Agregar ${product.name}` : `Elegir opciones de ${product.name}`}
        className={`absolute right-2 grid size-11 place-items-center rounded-full bg-gold text-on-gold shadow-[0_6px_16px_rgb(0_0_0/0.45)] transition hover:bg-gold-strong active:scale-90 ${
          qty ? "motion-safe:animate-pop" : ""
        } ${wide ? "top-[calc(75cqw-3.25rem)]" : "top-[calc(100cqw-3.25rem)]"}`}
      >
        <Plus className="size-5" strokeWidth={2.5} aria-hidden />
      </button>
    </div>
  );
}
