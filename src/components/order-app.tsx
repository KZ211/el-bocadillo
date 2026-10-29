"use client";

import { ChevronUp, Plus } from "lucide-react";
import { useCallback, useEffect, useMemo, useRef, useState, useSyncExternalStore } from "react";
import { useOrder } from "@/data/store";
import { storeStatus, type StoreStatus } from "@/lib/order/hours";
import { formatMoney, fromPrice, subtotal } from "@/lib/order/pricing";
import type { Category, Product } from "@/lib/order/types";
import { ComandaPanel } from "./comanda-panel";
import { ProductSheet } from "./product-sheet";
import { PrinterMouth } from "./printer-mouth";
import { Sheet } from "./sheet";

type Props = { categories: Category[]; products: Product[]; logo: string | null };

export function OrderApp({ categories, products, logo }: Props) {
  const byId = useMemo(() => new Map(products.map((p) => [p.id, p])), [products]);
  const getProduct = useCallback((id: string) => byId.get(id), [byId]);

  const [selected, setSelected] = useState<Product | null>(null);
  const [productOpen, setProductOpen] = useState(false);
  const [comandaOpen, setComandaOpen] = useState(false);

  const isDesktop = useIsDesktop();

  const openProduct = (product: Product) => {
    setSelected(product);
    setProductOpen(true);
  };

  return (
    <div className="lg:grid lg:grid-cols-[minmax(0,1fr)_26rem] xl:grid-cols-[minmax(0,1fr)_28rem]">
      <div className="min-w-0 pb-36 lg:pb-16">
        <StoreHeader logo={logo} />
        <CategoryNav categories={categories} />
        <main className="mx-auto max-w-3xl px-4 sm:px-6">
          {categories.map((category) => (
            <MenuSection
              key={category.id}
              category={category}
              products={products.filter((p) => p.categoryId === category.id && p.available !== false)}
              onPick={openProduct}
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
        aria-label="Tu comanda"
        data-scroller
        className="hidden bg-surface lg:sticky lg:top-0 lg:flex lg:h-dvh lg:flex-col lg:overflow-y-auto"
      >
        <h2 className="px-5 pt-6 pb-4 font-display text-2xl">Tu comanda</h2>
        <div className="flex-1">{isDesktop ? <ComandaPanel getProduct={getProduct} /> : null}</div>
      </aside>

      <ComandaDock getProduct={getProduct} onOpen={() => setComandaOpen(true)} />

      <ProductSheet
        product={selected}
        open={productOpen}
        onClose={() => setProductOpen(false)}
        onAdded={() => setProductOpen(false)}
      />
      <Sheet open={comandaOpen && !isDesktop} onClose={() => setComandaOpen(false)} title="Tu comanda" full>
        {isDesktop ? null : <ComandaPanel getProduct={getProduct} />}
      </Sheet>
    </div>
  );
}

const desktopQuery = "(min-width: 1024px)";

/** La comanda vive en el aside (desktop) o en la hoja (mobile), nunca en los dos. */
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
    <header className="mx-auto max-w-3xl px-4 pt-6 pb-5 sm:px-6 sm:pt-10">
      <div className="flex items-center gap-4">
        {logo ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={logo} alt="" width={96} height={96} className="size-20 shrink-0 rounded-full sm:size-24" />
        ) : null}
        <div className="min-w-0">
          <h1
            className={`font-display text-[2.6rem] leading-[0.95] tracking-[-0.01em] text-gold sm:text-6xl ${
              logo ? "sr-only" : ""
            }`}
          >
            El Bocadillo
          </h1>
          <p className={`text-muted ${logo ? "" : "mt-1.5"}`}>
            {logo ? <span className="block font-display text-2xl text-text">Smash burgers</span> : null}
            Comida al paso · Dorrego 413, Pte. Derqui
          </p>
        </div>
      </div>
      <div className="mt-5 min-h-6" aria-live="polite">
        {status?.open ? (
          <p className="flex items-center gap-2 font-semibold">
            <span className="size-2.5 rounded-full bg-open" aria-hidden />
            Abierto · tomamos pedidos hasta las {status.closesAt}
          </p>
        ) : status ? (
          <p className="rounded-[10px] bg-raised px-4 py-3">
            <span className="font-semibold">Ahora estamos cerrados.</span> Abrimos {status.opensAt}. Podés dejar tu
            pedido igual y lo vemos cuando abramos.
          </p>
        ) : null}
      </div>
    </header>
  );
}

function CategoryNav({ categories }: { categories: Category[] }) {
  const [active, setActive] = useState(categories[0]?.id);
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
    navRef.current?.querySelector(`[data-cat="${active}"]`)?.scrollIntoView({ inline: "center", block: "nearest" });
  }, [active]);

  return (
    <nav
      ref={navRef}
      aria-label="Categorías"
      className="sticky top-0 z-10 bg-ground py-3"
    >
      <ul className="mx-auto flex max-w-3xl gap-2 overflow-x-auto px-4 [scrollbar-width:none] sm:px-6">
        {categories.map((c) => (
          <li key={c.id} className="shrink-0">
            <a
              href={`#${c.id}`}
              data-cat={c.id}
              aria-current={active === c.id ? "true" : undefined}
              className={`inline-flex min-h-11 items-center rounded-full px-4 font-semibold transition-colors ${
                active === c.id ? "bg-gold text-on-gold" : "bg-surface text-muted hover:text-text"
              }`}
            >
              {c.name}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}

const menuRules = "mt-3 divide-y divide-edge"; // taste-skill-ignore: renglones de pizarra de menú, nombre y precio en una línea

function MenuSection({
  category,
  products,
  onPick,
}: {
  category: Category;
  products: Product[];
  onPick: (product: Product) => void;
}) {
  if (!products.length) return null;
  return (
    <section id={category.id} aria-labelledby={`${category.id}-title`} className="pt-10">
      <h2 id={`${category.id}-title`} className="font-display text-4xl leading-none sm:text-5xl">
        {category.name}
      </h2>
      {category.description ? <p className="mt-2 text-muted">{category.description}</p> : null}
      <ul className={menuRules}>
        {products.map((product) => (
          <li key={product.id}>
            <button
              type="button"
              onClick={() => onPick(product)}
              className="group flex w-full items-start gap-4 py-5 text-left transition-colors active:bg-surface"
            >
              {product.image ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={product.image}
                  alt=""
                  loading="lazy"
                  className="size-20 shrink-0 rounded-[10px] object-cover"
                />
              ) : null}
              <span className="min-w-0 flex-1">
                <span className="flex items-baseline justify-between gap-3">
                  <span className="font-display text-[1.6rem] leading-tight transition-colors group-hover:text-gold">
                    {product.name}
                  </span>
                  <span className="tabular shrink-0 font-semibold whitespace-nowrap text-gold">
                    {product.variants?.length ? <span className="text-sm font-normal text-muted">desde </span> : null}
                    {formatMoney(fromPrice(product))}
                  </span>
                </span>
                <span className="mt-1 flex items-end justify-between gap-4">
                  <span className="line-clamp-2 text-[0.95rem] text-muted">{product.description}</span>
                  <span
                    aria-hidden
                    className="grid size-11 shrink-0 place-items-center rounded-full bg-raised text-gold transition-colors group-hover:bg-gold group-hover:text-on-gold"
                  >
                    <Plus className="size-5" />
                  </span>
                </span>
              </span>
            </button>
          </li>
        ))}
      </ul>
    </section>
  );
}

const dockShadow = "shadow-[0_-12px_32px_rgb(0_0_0/0.45)]"; // taste-skill-ignore: barra fija que flota sobre el menú

function ComandaDock({
  getProduct,
  onOpen,
}: {
  getProduct: (id: string) => Product | undefined;
  onOpen: () => void;
}) {
  const { lines, lastKey } = useOrder();
  const count = lines.reduce((sum, l) => sum + l.qty, 0);
  const total = subtotal(lines, getProduct);
  const lastLine = lines.find((l) => l.key === lastKey);
  const lastProduct = lastLine ? getProduct(lastLine.productId) : undefined;
  return (
    <div className="fixed inset-x-0 bottom-0 z-20 px-3 pb-[max(0.75rem,env(safe-area-inset-bottom))] lg:hidden">
      <PrinterMouth />
      <button
        key={`${lastKey}-${count}`}
        type="button"
        onClick={onOpen}
        data-ui
        className={`paper-top relative -mt-1.5 motion-safe:animate-feed flex w-full items-center gap-3 bg-paper px-5 pt-5 pb-4 text-left text-paper-ink active:scale-[0.99] ${dockShadow}`}
      >
        <span className="min-w-0 flex-1">
          <span className="block font-semibold">
            Tu comanda · {count ? `${count} ${count === 1 ? "ítem" : "ítems"}` : "vacía"}
          </span>
          <span className="block truncate font-ticket text-xs text-paper-muted [font-stretch:88%]">
            {!count
              ? "Tocá un producto para empezar"
              : lastProduct
                ? `+ ${lastLine!.qty}x ${lastProduct.name}`
                : "Tocá para revisar y enviar"}
          </span>
        </span>
        {count ? <span className="tabular text-lg font-bold">{formatMoney(total)}</span> : null}
        <ChevronUp className="size-5" aria-hidden />
      </button>
    </div>
  );
}
