const slit = "absolute inset-x-3 top-1/2 h-px -translate-y-1/2 bg-black"; // taste-skill-ignore: la ranura de la comandera, no un divisor

/** Boca de la comandera: el papel sale por debajo de esta ranura. */
export function PrinterMouth() {
  return (
    <div aria-hidden className="relative z-10 mx-1 h-3 rounded-full bg-[#050403] ring-1 ring-edge">
      <div className={slit} />
    </div>
  );
}
