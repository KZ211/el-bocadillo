"use client";

import { Check } from "lucide-react";
import type { ReactNode } from "react";
import { orderStore } from "@/data/store";
import type { Checkout, DeliveryMode, PaymentMethod } from "@/lib/order/types";
import type { CheckoutErrors } from "@/lib/order/validate";

type Props = { checkout: Checkout; remember: boolean; errors: CheckoutErrors };

// Mismo orden que "¿Cómo lo querés?" (mode-step.tsx), en versión corta.
const modes: { id: DeliveryMode; label: string }[] = [
  { id: "delivery", label: "Delivery" },
  { id: "retiro", label: "Retiro" },
  { id: "local", label: "Comer acá" },
];

const payments: { id: PaymentMethod; label: string }[] = [
  { id: "efectivo", label: "Efectivo" },
  { id: "transferencia", label: "Transferencia" },
];

export function CheckoutForm({ checkout, remember, errors }: Props) {
  const update = (patch: Partial<Checkout>) => orderStore.updateCheckout(patch);

  return (
    <div className="space-y-7">
      <Segmented
        legend="¿Cómo lo querés?"
        name="mode"
        options={modes}
        value={checkout.mode}
        onChange={(mode) => update({ mode })}
      />
      {checkout.mode === "retiro" ? (
        <p className="-mt-4 text-sm text-muted">Pasás a buscarlo por Dorrego 413, Pte. Derqui.</p>
      ) : null}
      {checkout.mode === "delivery" ? (
        <div className="-mt-2 space-y-4">
          <Field id="street" label="Calle y número" error={errors.street}>
            <input
              id="street"
              autoComplete="street-address"
              value={checkout.street}
              onChange={(e) => update({ street: e.target.value })}
              placeholder="Ej: Dorrego 520"
              {...invalid("street", errors)}
            />
          </Field>
          <Field id="between" label="Entre calles" optional>
            <input id="between" value={checkout.between} onChange={(e) => update({ between: e.target.value })} />
          </Field>
          <Field id="reference" label="Referencia" optional>
            <input
              id="reference"
              value={checkout.reference}
              onChange={(e) => update({ reference: e.target.value })}
              placeholder="Ej: portón negro, timbre 2"
            />
          </Field>
          <p className="text-sm text-muted">El costo de envío te lo confirmamos por WhatsApp.</p>
        </div>
      ) : null}

      <div className="space-y-4">
        <Field id="name" label="Tu nombre" error={errors.name}>
          <input
            id="name"
            autoComplete="given-name"
            maxLength={40}
            value={checkout.name}
            onChange={(e) => update({ name: e.target.value })}
            {...invalid("name", errors)}
          />
        </Field>
        <Field id="phone" label="Teléfono" optional hint="Por si tenemos que llamarte.">
          <input
            id="phone"
            type="tel"
            inputMode="tel"
            autoComplete="tel"
            value={checkout.phone}
            onChange={(e) => update({ phone: e.target.value })}
          />
        </Field>
      </div>

      <Segmented
        legend="¿Cómo pagás?"
        name="payment"
        options={payments}
        value={checkout.payment}
        onChange={(payment) => update({ payment })}
      />
      {checkout.payment === "efectivo" ? (
        <Field id="cashAmount" label="¿Con cuánto abonás?" optional hint="Así te llevamos el vuelto justo." error={errors.cashAmount}>
          <input
            id="cashAmount"
            inputMode="numeric"
            value={checkout.cashAmount}
            onChange={(e) => update({ cashAmount: e.target.value })}
            placeholder="$"
            {...invalid("cashAmount", errors)}
          />
        </Field>
      ) : (
        <p className="-mt-4 text-sm text-muted">Te pasamos el alias por WhatsApp.</p>
      )}

      <Field id="notes" label="Aclaraciones del pedido" optional>
        <textarea
          id="notes"
          rows={2}
          maxLength={200}
          value={checkout.notes}
          onChange={(e) => update({ notes: e.target.value })}
          className="resize-none"
        />
      </Field>

      <label className="flex min-h-11 cursor-pointer items-center gap-3 text-sm">
        <input
          type="checkbox"
          checked={remember}
          onChange={(e) => orderStore.setRemember(e.target.checked)}
          className="peer sr-only"
        />
        <span
          aria-hidden
          className={`grid size-6 place-items-center rounded-md peer-focus-visible:outline-2 peer-focus-visible:outline-offset-2 peer-focus-visible:outline-gold ${
            remember ? "bg-gold text-on-gold" : "bg-raised"
          }`}
        >
          {remember ? <Check className="size-4" strokeWidth={3} /> : null}
        </span>
        Recordar mis datos en este celular
      </label>
    </div>
  );
}

function invalid(field: keyof Checkout, errors: CheckoutErrors) {
  return errors[field] ? { "aria-invalid": true, "aria-describedby": `${field}-error` } : {};
}

function Field({
  id,
  label,
  optional,
  hint,
  error,
  children,
}: {
  id: string;
  label: string;
  optional?: boolean;
  hint?: string;
  error?: string;
  children: ReactNode;
}) {
  return (
    <div className="[&_input,&_textarea]:min-h-12 [&_input,&_textarea]:w-full [&_input,&_textarea]:rounded-[10px] [&_input,&_textarea]:bg-raised [&_input,&_textarea]:px-4 [&_input,&_textarea]:py-3 [&_input,&_textarea]:placeholder:text-muted [&_input,&_textarea]:focus:outline-2 [&_input,&_textarea]:focus:outline-gold [&_[aria-invalid]]:outline-2 [&_[aria-invalid]]:outline-danger!">
      <label htmlFor={id} className="mb-1.5 block font-semibold">
        {label} {optional ? <span className="font-normal text-muted">(opcional)</span> : null}
      </label>
      {children}
      {error ? (
        <p id={`${id}-error`} className="mt-1.5 text-sm text-danger">
          {error}
        </p>
      ) : hint ? (
        <p className="mt-1.5 text-sm text-muted">{hint}</p>
      ) : null}
    </div>
  );
}

function Segmented<T extends string>({
  legend,
  name,
  options,
  value,
  onChange,
}: {
  legend: string;
  name: string;
  options: { id: T; label: string }[];
  value: T;
  onChange: (value: T) => void;
}) {
  return (
    <fieldset>
      <legend className="mb-2 font-semibold">{legend}</legend>
      <div className="flex gap-1 rounded-full bg-raised p-1">
        {options.map((o) => (
          <label
            key={o.id}
            className={`flex min-h-11 flex-1 cursor-pointer items-center justify-center rounded-full px-3 text-sm font-semibold transition-colors has-focus-visible:outline-2 has-focus-visible:outline-gold ${
              value === o.id ? "bg-gold text-on-gold" : "text-muted hover:text-text"
            }`}
          >
            <input
              type="radio"
              name={name}
              value={o.id}
              checked={value === o.id}
              onChange={() => onChange(o.id)}
              className="sr-only"
            />
            {o.label}
          </label>
        ))}
      </div>
    </fieldset>
  );
}
