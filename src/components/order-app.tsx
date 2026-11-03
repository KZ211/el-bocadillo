"use client";

import { Check, ChevronRight, Plus } from "lucide-react";
import { useCallback, useEffect, useMemo, useRef, useState, useSyncExternalStore } from "react";
import { orderStore, useOrder } from "@/data/store";
import { storeStatus, type StoreStatus } from "@/lib/order/hours";
import { formatMoney, fromPrice, subtotal } from "@/lib/order/pricing";
import type { CartLine, Category, Hero, Product } from "@/lib/order/types";
import { ComandaPanel } from "./comanda-panel";
import { categoryIcons, ProductArt } from "./product-art";
import { ProductSheet } from "./product-sheet";
import { Sheet } from "./sheet";

type Props = { categories: Category[]; products: Product[]; hero: Hero; logo: string | null };

/** Sin tamaños para elegir: el "+" lo agrega directo, como el agregado rápido de las cadenas. */
const isQuickAdd = (product: Product) => !product.variants?.length;

export function OrderApp({ categories, products, hero, logo }: Props) {
  const byId = useMemo(() => new Map(products.map((p) => [p.id, p])), [products]);
  const getProduct = useCallback((id: string) => byId.get(id), [byId]);
  const iconOf = useMemo(() => new Map(categories.map((c) => [c.id, c.icon])), [categories]);
  const available = useMemo(() => products.filter((p) => p.available !== false), [products]);

  const { lines } = useOrder();
  const [selected, setSelected] = useState<Product | null>(null);
  const [productOpen, setProductOpen] = useState(false);
  const [comandaOpen, setComandaOpen] = useState(false);
  const [announce, setAnnounce] = useState("");

  const isDesktop = useIsDesktop();

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
  const card = { iconOf, qtyByProduct, onOpen: openProduct, onAdd: add };

  const heroProduct = byId.get(hero.productId);
  const featured = available.filter((p) => p.featured);
  const suggestions = useMemo(() => suggest(available, lines), [available, lines]);

  return (
    <div className="lg:grid lg:grid-cols-[minmax(0,1fr)_26rem] xl:grid-cols-[minmax(0,1fr)_28rem]">
      <div className="min-w-0 pb-32 lg:pb-16">
        <StoreHeader logo={logo} />
        {heroProduct ? (
          <HeroCard hero={hero} product={heroProduct} icon={iconOf.get(heroProduct.categoryId)} onAdd={add} />
        ) : null}
        <CategoryNav categories={categories} />
        <main className="mx-auto max-w-5xl px-4 sm:px-6">
          {featured.length ? (
            <section aria-labelledby="recomendadas-title" className="pt-8">
              <h2 id="recomendadas-title" className="font-display text-3xl leading-none sm:text-4xl">
                Recomendadas
              </h2>
              <ul className="-mx-4 mt-4 flex snap-x snap-mandatory scroll-px-4 gap-3 overflow-x-auto px-4 pb-2 [scrollbar-width:none] sm:-mx-6 sm:scroll-px-6 sm:px-6">
                {featured.map((product) => (
                  <li key={product.id} className="w-[72%] max-w-72 shrink-0 snap-start">
                    <ProductCard product={product} wide {...card} />
                  </li>
                ))}
              </ul>
            </section>
          ) : null}

          {categories.map((category) => (
            <MenuSection
              key={category.id}
              category={category}
              products={available.filter((p) => p.categoryId === category.id)}
              card={card}
            />
          ))}

          <footer className="mt-20 space-y-1 text-sm text-muted">
            <p className="font-display text-3xl text-text">El Bocadillo</p>
            <p>Manuel Dorrego 413, Presidente Derqui</p>
            <p>Lun, mar, jue, vie y dom · 11:00 a 15:30 y 20:00 a 03:00</p>
            <p>Pedidos de noche hasta las 02:30.</p>
          </footer>
        </main>
      </div>

      <aside
        aria-label="Tu pedido"
        data-scroller
        className="hidden bg-surface lg:sticky lg:top-0 lg:flex lg:h-dvh lg:flex-col lg:overflow-y-auto"
      >
        <h2 className="px-5 pt-6 pb-4 font-display text-2xl">Tu pedido</h2>
        <div className="flex-1">
          {isDesktop ? (
            <ComandaPanel getProduct={getProduct} suggestions={suggestions} iconOf={iconOf} onAdd={add} />
          ) : null}
        </div>
      </aside>

      <OrderBar getProduct={getProduct} onOpen={() => setComandaOpen(true)} />
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
      <Sheet open={comandaOpen && !isDesktop} onClose={() => setComandaOpen(false)} title="Tu pedido" full>
        {isDesktop ? null : (
          <ComandaPanel getProduct={getProduct} suggestions={suggestions} iconOf={iconOf} onAdd={add} />
        )}
      </Sheet>
    </div>
  );
}

function countByProduct(lines: CartLine[]): Map<string, number> {
  const counts = new Map<string, number>();
  for (const line of lines) counts.set(line.productId, (counts.get(line.productId) ?? 0) + line.qty);
  return counts;
}

/** "¿Le sumás algo?": hasta 3 productos de categorías que todavía no están en el pedido, recomendadas primero. */
function suggest(products: Product[], lines: CartLine[]): Product[] {
  if (!lines.length) return [];
  const inOrder = new Set(lines.map((l) => l.productId));
  const categoriesInOrder = new Set(products.filter((p) => inOrder.has(p.id)).map((p) => p.categoryId));
  const picked: Product[] = [];
  const usedCategories = new Set<string>();
  const ranked = [...products].sort((a, b) => Number(Boolean(b.featured)) - Number(Boolean(a.featured)));
  for (const product of ranked) {
    if (picked.length === 3) break;
    if (categoriesInOrder.has(product.categoryId) || usedCategories.has(product.categoryId)) continue;
    picked.push(product);
    usedCategories.add(product.categoryId);
  }
  return picked;
}

const desktopQuery = "(min-width: 1024px)";

/** El pedido vive en el aside (desktop) o en la hoja (mobile), nunca en los dos. */
function useIsDesktop(): boolean {
  return useSyncExternalStore(
    (onChange) => {
      const mql = window.matchMedia(desktopQuery);
      mql.addEventListener("change", onChange);
      return () => mql.removeEventListener("change", onChange);
    },
    () => window.matchMedia(desktopQuery).matches,
    () => false,
  );
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

function StoreHeader({ logo }: { logo: string | null }) {
  const status = useStoreStatus();
  return (
    <header className="mx-auto max-w-5xl px-4 pt-5 pb-5 sm:px-6 sm:pt-8">
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
    <section aria-labelledby="hero-title" className="mx-auto max-w-5xl px-4 sm:px-6">
      <div className="relative isolate overflow-hidden rounded-[22px] bg-surface">
        <div className="absolute inset-0 -z-10">
          <ProductArt
            seed={`hero-${product.id}`}
            image={product.image}
            icon={icon}
            eager
            className="size-full"
            iconClassName="absolute -top-4 -right-6 size-44 text-gold/30 sm:-top-8 sm:right-8 sm:size-80"
          />
        </div>
        <div className={`flex min-h-60 flex-col justify-end p-5 pt-20 sm:min-h-80 sm:p-8 ${heroShade}`}>
          <h2 id="hero-title" className="max-w-md font-display text-[2rem] leading-[0.95] text-balance sm:text-6xl">
            {hero.headline}
          </h2>
          <p className="mt-2 line-clamp-2 max-w-md text-sm text-muted sm:text-base">
            <span className="font-semibold text-text">{product.name}:</span> {product.description}
          </p>
          <button
            type="button"
            onClick={() => onAdd(product)}
            className="mt-4 flex min-h-12 items-center justify-between gap-4 self-start rounded-full bg-gold pr-2 pl-5 font-semibold text-on-gold transition hover:bg-gold-strong active:scale-[0.98]"
          >
            <span>Pedir la {product.name}</span>
            <span className="tabular rounded-full bg-on-gold/10 px-3 py-1.5">{formatMoney(fromPrice(product))}</span>
          </button>
        </div>
      </div>
    </section>
  );
}

function CategoryNav({ categories }: { categories: Category[] }) {
  const [active, setActive] = useState<string | undefined>();
  const navRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries.filter((e) => e.isIntersecting);
        if (visible.length) setActive(visible[0].target.id);
      },
      { rootMargin: "-90px 0px -60% 0px" },
    );
    categories.forEach((c) => {
      const el = document.getElementById(c.id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, [categories]);

  useEffect(() => {
    if (!active) return;
    navRef.current?.querySelector(`[data-cat="${active}"]`)?.scrollIntoView({ inline: "center", block: "nearest" });
  }, [active]);

  return (
    <nav ref={navRef} aria-label="Categorías" className="sticky top-0 z-10 mt-4 bg-ground/95 py-3 backdrop-blur-md">
      <ul className="mx-auto flex max-w-5xl gap-2 overflow-x-auto px-4 [scrollbar-width:none] sm:px-6">
        {categories.map((c) => {
          const Icon = c.icon ? categoryIcons[c.icon] : null;
          const current = active === c.id;
          return (
            <li key={c.id} className="shrink-0">
              <a
                href={`#${c.id}`}
                data-cat={c.id}
                aria-current={current ? "true" : undefined}
                className={`inline-flex min-h-11 items-center gap-2 rounded-full pr-4 pl-3 font-semibold transition-colors ${
                  current ? "bg-gold text-on-gold" : "bg-surface text-muted hover:text-text"
                }`}
              >
                {Icon ? <Icon className="size-5" strokeWidth={1.75} aria-hidden /> : null}
                {c.name}
              </a>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}

type CardProps = {
  iconOf: Map<string, Category["icon"]>;
  qtyByProduct: Map<string, number>;
  onOpen: (product: Product) => void;
  onAdd: (product: Product) => void;
};

function MenuSection({ category, products, card }: { category: Category; products: Product[]; card: CardProps }) {
  if (!products.length) return null;
  return (
    <section id={category.id} aria-labelledby={`${category.id}-title`} className="pt-12">
      <h2 id={`${category.id}-title`} className="font-display text-4xl leading-none sm:text-5xl">
        {category.name}
      </h2>
      {category.description ? <p className="mt-2 text-muted">{category.description}</p> : null}
      <ul className="mt-5 grid grid-cols-2 gap-x-3 gap-y-7 md:grid-cols-3 xl:grid-cols-4">
        {products.map((product) => (
          <li key={product.id}>
            <ProductCard product={product} {...card} />
          </li>
        ))}
      </ul>
    </section>
  );
}

function ProductCard({
  product,
  wide,
  iconOf,
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
        aria-label={quick ? `Agregar ${product.name}` : `Elegir tamaño de ${product.name}`}
        className={`absolute right-2 grid size-11 place-items-center rounded-full bg-gold text-on-gold shadow-[0_6px_16px_rgb(0_0_0/0.45)] transition hover:bg-gold-strong active:scale-90 ${
          qty ? "motion-safe:animate-pop" : ""
        } ${wide ? "top-[calc(75cqw-3.25rem)]" : "top-[calc(100cqw-3.25rem)]"}`}
      >
        <Plus className="size-5" strokeWidth={2.5} aria-hidden />
      </button>
    </div>
  );
}

function OrderBar({ getProduct, onOpen }: { getProduct: (id: string) => Product | undefined; onOpen: () => void }) {
  const { lines } = useOrder();
  const count = lines.reduce((sum, l) => sum + l.qty, 0);
  if (!count) return null;
  const total = subtotal(lines, getProduct);
  return (
    <div className="fixed inset-x-0 bottom-0 z-20 px-3 pb-[max(0.75rem,env(safe-area-inset-bottom))] motion-safe:animate-rise lg:hidden">
      <button
        key={count}
        type="button"
        onClick={onOpen}
        className="flex min-h-14 w-full items-center gap-3 rounded-full bg-gold pr-4 pl-2 text-on-gold shadow-[0_10px_28px_rgb(0_0_0/0.55)] transition hover:bg-gold-strong active:scale-[0.98] motion-safe:animate-feed"
      >
        <span className="tabular grid size-10 shrink-0 place-items-center rounded-full bg-on-gold font-bold text-gold">
          {count}
        </span>
        <span className="flex-1 text-left text-lg font-semibold">Ver pedido</span>
        <span className="tabular text-lg font-bold">{formatMoney(total)}</span>
        <ChevronRight className="size-5" aria-hidden />
      </button>
    </div>
  );
}
