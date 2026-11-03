"use client";

import { Copy, RotateCcw } from "lucide-react";
import { useMemo, useState } from "react";
import { orderStore, useOrder } from "@/data/store";
import { buildTicket, ticketToText, whatsappUrl } from "@/lib/order/message";
import { formatMoney, subtotal } from "@/lib/order/pricing";
import type { Product } from "@/lib/order/types";
import { validateCheckout, type CheckoutErrors } from "@/lib/order/validate";
import { CheckoutForm } from "./checkout-form";
import { WhatsAppIcon } from "./icons";
import { Ticket } from "./ticket";

type Sent = { orderId: string; text: string; url: string };

type Props = {
  getProduct: (id: string) => Product | undefined;
  /** Pedido vacío: vuelve al primer paso del menú. */
  onEmpty: () => void;
  /** Tras enviar, "Hacer otro pedido" vuelve a "¿Cómo lo querés?". */
  onNewOrder: () => void;
};

/** La comanda en vivo, tal cual le llega al local (aside de desktop y paso "Tu pedido"). */
export function TicketPreview({ getProduct }: { getProduct: (id: string) => Product | undefined }) {
  const { lines, checkout, orderId, lastKey } = useOrder();
  const sections = useMemo(
    () => buildTicket({ orderId, lines, checkout, getProduct }),
    [orderId, lines, checkout, getProduct],
  );
  return (
    <div>
      <Ticket sections={sections} lines={lines} lastKey={lastKey} />
      <p className="mt-3 px-1 text-sm text-muted">Esto es exactamente lo que le llega al local por WhatsApp.</p>
    </div>
  );
}

/** Paso "Tu pedido": comanda, datos y enviar por WhatsApp. */
export function ComandaPanel({ getProduct, onEmpty, onNewOrder }: Props) {
  const { lines, checkout, remember, orderId } = useOrder();
  const [triedSend, setTriedSend] = useState(false);
  const [sent, setSent] = useState<Sent | null>(null);

  const total = subtotal(lines, getProduct);
  // Tras el primer intento, los errores se recalculan en vivo mientras corrige.
  const errors: CheckoutErrors = triedSend ? validateCheckout(checkout, total) : {};

  if (sent) {
    return (
      <SentState
        sent={sent}
        onNew={() => {
          setSent(null);
          onNewOrder();
        }}
      />
    );
  }

  const send = () => {
    const found = validateCheckout(checkout, total);
    setTriedSend(true);
    const first = (["street", "name", "cashAmount"] as const).find((field) => found[field]);
    if (first) {
      const field = document.getElementById(first);
      field?.focus({ preventScroll: true });
      field?.scrollIntoView({ block: "center", behavior: "smooth" });
      return;
    }
    const text = ticketToText(buildTicket({ orderId, lines, checkout, getProduct }));
    const url = whatsappUrl(text);
    // Sin "noopener" en features: con él window.open devuelve null y no se puede detectar el bloqueo.
    const win = window.open(url, "_blank");
    if (win) win.opener = null;
    else window.location.assign(url);
    setSent({ orderId, text, url });
    setTriedSend(false);
    orderStore.startNew();
  };

  return (
    <div className="flex min-h-full flex-col">
      <div className="space-y-8 pb-8">
        <TicketPreview getProduct={getProduct} />
        {lines.length ? (
          <section aria-labelledby="datos-title" className="px-1">
            <h3 id="datos-title" className="mb-5 font-display text-2xl">
              Tus datos
            </h3>
            <CheckoutForm checkout={checkout} remember={remember} errors={errors} />
          </section>
        ) : (
          <button
            type="button"
            onClick={onEmpty}
            className="flex min-h-12 w-full items-center justify-center rounded-full bg-gold px-5 font-semibold text-on-gold transition hover:bg-gold-strong active:scale-[0.98]"
          >
            Elegir mi comida
          </button>
        )}
      </div>

      {lines.length ? (
        <div className="sticky bottom-0 mt-auto bg-ground pt-3 pb-[max(1rem,env(safe-area-inset-bottom))]">
          <button
            type="button"
            onClick={send}
            className="flex min-h-14 w-full items-center justify-center gap-3 rounded-full bg-gold px-6 text-lg font-semibold text-on-gold transition hover:bg-gold-strong active:scale-[0.98]"
          >
            <WhatsAppIcon className="size-6" />
            Enviar pedido · <span className="tabular">{formatMoney(total)}</span>
          </button>
        </div>
      ) : null}
    </div>
  );
}

function SentState({ sent, onNew }: { sent: Sent; onNew: () => void }) {
  const [copied, setCopied] = useState(false);
  return (
    <div className="space-y-6 pt-2 pb-10" role="status">
      <div>
        <p className="font-display text-4xl leading-none text-gold">{sent.orderId}</p>
        <h3 className="mt-3 font-display text-2xl">¡Comanda lista!</h3>
        <p className="mt-2 text-muted">
          Se abrió WhatsApp con tu pedido. Tocá enviar ahí y te confirmamos el total y el tiempo de entrega.
        </p>
      </div>
      <p className="rounded-[10px] bg-raised px-4 py-3 text-sm">
        Una vez enviado tenés 10 minutos para modificar tu pedido.
      </p>
      <div className="flex flex-col gap-2">
        <a
          href={sent.url}
          target="_blank"
          rel="noopener"
          className="flex min-h-12 items-center justify-center gap-2 rounded-full bg-gold px-5 font-semibold text-on-gold transition hover:bg-gold-strong active:scale-[0.98]"
        >
          <WhatsAppIcon className="size-5" />
          Abrir WhatsApp de nuevo
        </a>
        <button
          type="button"
          onClick={async () => {
            try {
              await navigator.clipboard.writeText(sent.text);
              setCopied(true);
            } catch {
              setCopied(false);
            }
          }}
          className="flex min-h-12 items-center justify-center gap-2 rounded-full bg-raised px-5 font-semibold transition hover:bg-edge active:scale-[0.98]"
        >
          <Copy className="size-4" aria-hidden />
          {copied ? "¡Copiado!" : "Copiar el pedido"}
        </button>
        <button
          type="button"
          onClick={onNew}
          className="flex min-h-12 items-center justify-center gap-2 rounded-full px-5 font-semibold text-muted transition hover:text-text"
        >
          <RotateCcw className="size-4" aria-hidden />
          Hacer otro pedido
        </button>
      </div>
    </div>
  );
}
