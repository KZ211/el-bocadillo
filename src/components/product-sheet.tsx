"use client";

import { Check, Minus, Plus } from "lucide-react";
import { useState } from "react";
import { orderStore } from "@/data/store";
import { formatMoney, MAX_QTY, unitPrice } from "@/lib/order/pricing";
import type { CategoryIcon, Product } from "@/lib/order/types";
import { ProductArt } from "./product-art";
import { Sheet } from "./sheet";

type Props = {
  product: Product | null;
  icon?: CategoryIcon;
  open: boolean;
  onClose: () => void;
  onAdded: () => void;
};

export function ProductSheet({ product, icon, open, onClose, onAdded }: Props) {
  return (
    <Sheet
      open={open}
      onClose={onClose}
      title={product?.name ?? ""}
      media={
        product ? (
          <ProductArt
            key={product.id}
            seed={product.id}
            image={product.image}
            icon={icon}
            eager
            className="aspect-[4/3] w-full md:aspect-[16/10]"
            iconClassName="relative size-[34%] text-gold/85"
          />
        ) : null
      }
    >
      {product ? <Configurator key={product.id} product={product} onAdded={onAdded} /> : null}
    </Sheet>
  );
}

function Configurator({ product, onAdded }: { product: Product; onAdded: () => void }) {
  const [variantId, setVariantId] = useState(product.variants?.[0]?.id);
  const [extraIds, setExtraIds] = useState<string[]>([]);
  const [removed, setRemoved] = useState<string[]>([]);
  const [note, setNote] = useState("");
  const [qty, setQty] = useState(1);

  const price = unitPrice(product, variantId, extraIds) * qty;
  const toggle = (list: string[], value: string) =>
    list.includes(value) ? list.filter((v) => v !== value) : [...list, value];

  return (
    <form
      className="flex flex-col"
      onSubmit={(e) => {
        e.preventDefault();
        orderStore.add({ productId: product.id, variantId, extraIds, removed, note, qty });
        onAdded();
      }}
    >
      <div className="space-y-7 px-5 pt-2 pb-6">
        <p className="text-muted">{product.description}</p>

        {product.variants?.length ? (
          <fieldset>
            <legend className="mb-3 font-semibold">Elegí el tamaño</legend>
            <div className="grid grid-cols-2 gap-2">
              {product.variants.map((v) => {
                const checked = v.id === variantId;
                return (
                  <label
                    key={v.id}
                    className={`flex min-h-16 cursor-pointer flex-col justify-center rounded-[10px] px-4 py-2.5 transition-colors has-focus-visible:outline-2 has-focus-visible:outline-gold ${
                      checked ? "bg-gold text-on-gold" : "bg-raised hover:bg-edge"
                    }`}
                  >
                    <input
                      type="radio"
                      name="variant"
                      value={v.id}
                      checked={checked}
                      onChange={() => setVariantId(v.id)}
                      className="sr-only"
                    />
                    <span className="font-semibold">{v.label}</span>
                    <span className={`tabular text-sm ${checked ? "text-on-gold/80" : "text-muted"}`}>
                      {formatMoney(v.price)}
                    </span>
                  </label>
                );
              })}
            </div>
          </fieldset>
        ) : null}

        {product.extras?.length ? (
          <fieldset>
            <legend className="mb-1 font-semibold">Agregados</legend>
            <ul>
              {product.extras.map((extra) => {
                const checked = extraIds.includes(extra.id);
                return (
                  <li key={extra.id}>
                    <label className="flex min-h-12 cursor-pointer items-center gap-3 py-1">
                      <input
                        type="checkbox"
                        checked={checked}
                        onChange={() => setExtraIds((ids) => toggle(ids, extra.id))}
                        className="peer sr-only"
                      />
                      <span
                        aria-hidden
                        className={`grid size-6 shrink-0 place-items-center rounded-md transition-colors peer-focus-visible:outline-2 peer-focus-visible:outline-offset-2 peer-focus-visible:outline-gold ${
                          checked ? "bg-gold text-on-gold" : "bg-raised"
                        }`}
                      >
                        {checked ? <Check className="size-4" strokeWidth={3} /> : null}
                      </span>
                      <span className="flex-1">{extra.label}</span>
                      <span className="tabular text-muted">+{formatMoney(extra.price)}</span>
                    </label>
                  </li>
                );
              })}
            </ul>
          </fieldset>
        ) : null}

        {product.removable?.length ? (
          <fieldset>
            <legend className="mb-3 font-semibold">¿Le sacamos algo?</legend>
            <div className="flex flex-wrap gap-2">
              {product.removable.map((ingredient) => {
                const checked = removed.includes(ingredient);
                return (
                  <label
                    key={ingredient}
                    className={`inline-flex min-h-11 cursor-pointer items-center rounded-full px-4 text-sm transition-colors has-focus-visible:outline-2 has-focus-visible:outline-gold ${
                      checked ? "bg-text text-ground line-through decoration-2" : "bg-raised hover:bg-edge"
                    }`}
                  >
                    <input
                      type="checkbox"
                      checked={checked}
                      onChange={() => setRemoved((list) => toggle(list, ingredient))}
                      className="sr-only"
                    />
                    {checked ? `Sin ${ingredient.toLowerCase()}` : ingredient}
                  </label>
                );
              })}
            </div>
          </fieldset>
        ) : null}

        <div>
          <label htmlFor="item-note" className="mb-2 block font-semibold">
            Aclaración <span className="font-normal text-muted">(opcional)</span>
          </label>
          <textarea
            id="item-note"
            value={note}
            maxLength={140}
            rows={2}
            onChange={(e) => setNote(e.target.value)}
            placeholder="Ej: bien cocida, cortada al medio"
            className="w-full resize-none rounded-[10px] bg-raised px-4 py-3 placeholder:text-muted focus:outline-2 focus:outline-gold"
          />
        </div>
      </div>

      <div className="sticky bottom-0 flex items-center gap-3 bg-surface px-5 pt-3 pb-[max(1rem,env(safe-area-inset-bottom))]">
        <div className="flex items-center rounded-full bg-raised" role="group" aria-label="Cantidad">
          <button
            type="button"
            onClick={() => setQty((q) => Math.max(1, q - 1))}
            disabled={qty <= 1}
            aria-label="Restar uno"
            className="grid size-12 place-items-center rounded-full transition active:scale-90 disabled:opacity-35"
          >
            <Minus className="size-4" aria-hidden />
          </button>
          <output aria-live="polite" className="tabular w-6 text-center font-semibold">
            {qty}
          </output>
          <button
            type="button"
            onClick={() => setQty((q) => Math.min(MAX_QTY, q + 1))}
            disabled={qty >= MAX_QTY}
            aria-label="Sumar uno"
            className="grid size-12 place-items-center rounded-full transition active:scale-90 disabled:opacity-35"
          >
            <Plus className="size-4" aria-hidden />
          </button>
        </div>
        <button
          type="submit"
          className="flex min-h-12 flex-1 items-center justify-between gap-3 rounded-full bg-gold px-5 font-semibold text-on-gold transition hover:bg-gold-strong active:scale-[0.98]"
        >
          <span>Agregar</span>
          <span className="tabular">{formatMoney(price)}</span>
        </button>
      </div>
    </form>
  );
}
