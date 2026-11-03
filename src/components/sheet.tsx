"use client";

import { X } from "lucide-react";
import { useEffect, useRef, type ReactNode } from "react";

type SheetProps = {
  open: boolean;
  onClose: () => void;
  title: string;
  /** Pantalla completa en mobile (la comanda). */
  full?: boolean;
  className?: string;
  footer?: ReactNode;
  /** Foto a sangre arriba de todo (hoja de producto); el título pasa debajo. */
  media?: ReactNode;
  children: ReactNode;
};

/** Hoja inferior sobre <dialog> nativo: foco atrapado, Escape y backdrop gratis. */
export function Sheet({ open, onClose, title, full, className = "", footer, media, children }: SheetProps) {
  const ref = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    const dialog = ref.current;
    if (!dialog) return;
    if (open && !dialog.open) dialog.showModal();
    if (!open && dialog.open) dialog.close();
  }, [open]);

  return (
    <dialog
      ref={ref}
      aria-label={title}
      className={`sheet ${full ? "full" : ""} ${className}`}
      onClose={onClose}
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div className={`relative flex flex-col ${full ? "h-dvh" : "max-h-[92dvh] md:max-h-[88dvh]"}`}>
        {media ? null : (
          <header className="flex items-center justify-between gap-4 px-5 pt-4 pb-2">
            <h2 className="font-display text-2xl leading-tight">{title}</h2>
            <CloseButton onClose={onClose} />
          </header>
        )}
        <div data-scroller className="min-h-0 flex-1 overflow-y-auto overscroll-contain">
          {media ? (
            <>
              {media}
              <h2 className="px-5 pt-5 font-display text-[2rem] leading-none">{title}</h2>
            </>
          ) : null}
          {children}
        </div>
        {media ? (
          <div className="absolute top-3 right-3 rounded-full bg-ground/70 backdrop-blur-sm">
            <CloseButton onClose={onClose} onMedia />
          </div>
        ) : null}
        {footer ? <div className="bg-surface px-5 pt-3 pb-[max(1rem,env(safe-area-inset-bottom))]">{footer}</div> : null}
      </div>
    </dialog>
  );
}

function CloseButton({ onClose, onMedia }: { onClose: () => void; onMedia?: boolean }) {
  return (
    <button
      type="button"
      onClick={onClose}
      aria-label="Cerrar"
      className={`grid size-11 shrink-0 place-items-center rounded-full transition-colors active:scale-95 ${
        onMedia ? "text-text hover:bg-raised" : "-mr-2 text-muted hover:bg-raised hover:text-text"
      }`}
    >
      <X className="size-5" aria-hidden />
    </button>
  );
}
