"use client";

import { Minus, Plus, Trash2 } from "lucide-react";
import { orderStore } from "@/data/store";
import { parseBold, type TicketSection } from "@/lib/order/message";
import type { CartLine } from "@/lib/order/types";
import { PrinterMouth } from "./printer-mouth";

const sectionCut =
  "border-b border-dashed border-paper-ink/35 py-3 first:pt-0 last:border-0 last:pb-0"; // taste-skill-ignore: corte punteado del papel de comanda

type Props = {
  sections: TicketSection[];
  lines: CartLine[];
  lastKey: string | null;
};

/**
 * La comanda impresa. Cada renglón es exactamente el texto que llega por
 * WhatsApp; los controles de cantidad no se imprimen (van fuera del texto).
 */
export function Ticket({ sections, lines, lastKey }: Props) {
  const qtyOf = (key: string) => lines.find((l) => l.key === key)?.qty ?? 0;
  const hasItems = lines.length > 0;

  const fed = lines.reduce((sum, l) => sum + l.qty, 0);

  return (
    <div className="overflow-hidden">
      <PrinterMouth />
      <figure
        key={fed}
        aria-label="Comanda: así le llega tu pedido al local"
        data-ui
        className="paper -mt-1.5 font-ticket text-[12.5px] leading-[1.6] [font-stretch:88%] motion-safe:animate-[paper-feed_560ms_var(--ease-out-expo)]"
      >
        <div className="px-5 pt-7 pb-8">
          {sections.map((section) => (
            <div key={section.id} className={sectionCut}>
              {section.id === "items" && !hasItems ? (
                <p className="text-paper-muted">
                  Todavía no pediste nada.
                  <br />
                  Tocá un producto para empezar.
                </p>
              ) : null}
              {section.groups.map((group) => {
                const isItem = section.id === "items";
                const marked = isItem && group.key === lastKey;
                return (
                  <div
                    key={group.key}
                    className={`-mx-2 rounded-sm px-2 py-1 transition-colors duration-700 ${
                      marked ? "motion-safe:animate-print" : ""
                    } ${marked ? "bg-paper-mark" : ""}`}
                  >
                    {group.lines.map((line, i) => (
                      <p key={i} className="break-words whitespace-pre-wrap">
                        {parseBold(line).map((part, j) =>
                          part.bold ? (
                            <strong key={j} className="font-bold">
                              {part.text}
                            </strong>
                          ) : (
                            <span key={j}>{part.text}</span>
                          ),
                        )}
                      </p>
                    ))}
                    {isItem ? (
                      <LineControls
                        lineKey={group.key}
                        qty={qtyOf(group.key)}
                      />
                    ) : null}
                  </div>
                );
              })}
            </div>
          ))}
        </div>
      </figure>
    </div>
  );
}

function LineControls({ lineKey, qty }: { lineKey: string; qty: number }) {
  const btn =
    "grid size-9 place-items-center rounded-full text-paper-ink transition hover:bg-paper-ink/10 active:scale-90";
  return (
    <div className="mt-1 flex items-center justify-end gap-1 font-sans [&>button:first-child]:mr-3" data-ui>
      <button
        type="button"
        className={btn}
        aria-label="Quitar del pedido"
        onClick={() => orderStore.remove(lineKey)}
      >
        <Trash2 className="size-4" aria-hidden />
      </button>
      <button
        type="button"
        className={btn}
        aria-label="Restar uno"
        onClick={() => orderStore.setQty(lineKey, qty - 1)}
      >
        <Minus className="size-4" aria-hidden />
      </button>
      <span
        className="tabular w-5 text-center text-sm font-semibold"
        aria-label={`Cantidad ${qty}`}
      >
        {qty}
      </span>
      <button
        type="button"
        className={btn}
        aria-label="Sumar uno"
        onClick={() => orderStore.setQty(lineKey, qty + 1)}
      >
        <Plus className="size-4" aria-hidden />
      </button>
    </div>
  );
}
