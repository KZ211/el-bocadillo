"use client";

import { ChevronRight, Motorbike, ShoppingBag, Utensils, type LucideIcon } from "lucide-react";
import type { DeliveryMode } from "@/lib/order/types";

const options: { id: DeliveryMode; label: string; hint: string; Icon: LucideIcon }[] = [
  { id: "delivery", label: "Delivery", hint: "Te lo llevamos en moto", Icon: Motorbike },
  { id: "retiro", label: "Paso a retirar", hint: "Por Dorrego 413, Pte. Derqui", Icon: ShoppingBag },
  { id: "local", label: "Para consumir en el local", hint: "Comés acá", Icon: Utensils },
];

type Props = {
  /** Modo guardado de una visita anterior: aparece resaltado. */
  current: DeliveryMode | null;
  onPick: (mode: DeliveryMode) => void;
};

/** Paso 0, como el "¿para comer acá o para llevar?" del kiosco de McDonald's. */
export function ModeStep({ current, onPick }: Props) {
  return (
    <section aria-labelledby="modo-title" className="mx-auto w-full max-w-xl px-4 pt-4 sm:px-6">
      <h2 id="modo-title" className="font-display text-[2.4rem] leading-none sm:text-5xl">
        ¿Cómo lo querés?
      </h2>
      <ul className="mt-6 space-y-3">
        {options.map(({ id, label, hint, Icon }) => {
          const selected = current === id;
          return (
            <li key={id}>
              <button
                type="button"
                onClick={() => onPick(id)}
                aria-current={selected ? "true" : undefined}
                className={`group flex min-h-24 w-full items-center gap-4 rounded-[22px] px-5 text-left transition active:scale-[0.98] ${
                  selected ? "bg-gold text-on-gold" : "bg-surface hover:bg-raised"
                }`}
              >
                <span
                  className={`grid size-14 shrink-0 place-items-center rounded-full ${
                    selected ? "bg-on-gold/10" : "bg-raised text-gold group-hover:bg-edge"
                  }`}
                >
                  <Icon className="size-7" strokeWidth={1.75} aria-hidden />
                </span>
                <span className="min-w-0 flex-1">
                  <span className="block text-lg leading-tight font-semibold">{label}</span>
                  <span className={`mt-0.5 block text-sm ${selected ? "text-on-gold/75" : "text-muted"}`}>{hint}</span>
                </span>
                <ChevronRight className="size-5 shrink-0" aria-hidden />
              </button>
            </li>
          );
        })}
      </ul>
    </section>
  );
}
