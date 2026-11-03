import { Beer, CupSoda, Flame, Hamburger, Martini, Pizza, Sandwich, Utensils } from "lucide-react";
import type { ComponentType } from "react";
import type { CategoryIcon } from "@/lib/order/types";
import { FriesIcon } from "./icons";

type Icon = ComponentType<{ className?: string; strokeWidth?: number }>;

export const categoryIcons: Record<CategoryIcon, Icon> = {
  burger: Hamburger,
  flame: Flame,
  sandwich: Sandwich,
  fries: FriesIcon,
  pizza: Pizza,
  soda: CupSoda,
  cocktail: Martini,
  beer: Beer,
};

type Props = {
  /** Semilla de las vetas: cada producto tiene su propio mármol. */
  seed: string;
  image?: string;
  icon?: CategoryIcon;
  className?: string;
  /** Tamaño, color y posición del ícono (en el hero queda de fondo, detrás del texto). */
  iconClassName?: string;
  eager?: boolean;
};

/**
 * Foto del producto o, mientras no haya fotos (spec 002), un mármol negro
 * con vetas doradas como el de las piezas de Instagram del local.
 */
export function ProductArt({ seed, image, icon, className = "", iconClassName = "relative size-[38%] text-gold/85", eager }: Props) {
  if (image) {
    return (
      // eslint-disable-next-line @next/next/no-img-element
      <img
        src={image}
        alt=""
        loading={eager ? "eager" : "lazy"}
        className={`object-cover ${className}`}
      />
    );
  }
  const Icon = icon ? categoryIcons[icon] : Utensils;
  return (
    <div aria-hidden className={`marble relative grid place-items-center overflow-hidden ${className}`}>
      <Veins seed={seed} />
      <Icon className={iconClassName} strokeWidth={1.25} />
    </div>
  );
}

function hash(text: string): number {
  let h = 2166136261;
  for (let i = 0; i < text.length; i++) h = Math.imul(h ^ text.charCodeAt(i), 16777619);
  return h >>> 0;
}

/** Vetas deterministas: mismo producto, mismo mármol en server y cliente. */
function veinPaths(seed: string) {
  let h = hash(seed);
  const rand = () => {
    h = Math.imul(h ^ (h >>> 15), 2246822507) >>> 0;
    h = Math.imul(h ^ (h >>> 13), 3266489909) >>> 0;
    return ((h ^= h >>> 16) >>> 0) / 4294967296;
  };
  return Array.from({ length: 3 }, (_, i) => {
    const [y0, y1, c1, c2] = [rand(), rand(), rand(), rand()].map((n) => (n * 100).toFixed(1));
    return {
      d: `M-5 ${y0} C 30 ${c1}, 65 ${c2}, 105 ${y1}`,
      width: i === 0 ? 1.5 : 0.75,
      opacity: i === 0 ? 0.55 : 0.3,
    };
  });
}

function Veins({ seed }: { seed: string }) {
  const veins = veinPaths(seed);
  return (
    <svg viewBox="0 0 100 100" preserveAspectRatio="none" className="absolute inset-0 size-full">
      {veins.map((v, i) => (
        <path
          key={i}
          d={v.d}
          fill="none"
          stroke="var(--color-gold)"
          strokeWidth={v.width}
          strokeOpacity={v.opacity}
          vectorEffect="non-scaling-stroke"
        />
      ))}
    </svg>
  );
}
