/**
 * Horario de toma de pedidos de El Bocadillo (hora de Argentina).
 * Lunes, martes, jueves, viernes y domingos: 11:00–15:30 y 20:00–03:00.
 * El turno noche toma pedidos hasta las 02:30 y pertenece al día en que empieza.
 */

const TIME_ZONE = "America/Argentina/Buenos_Aires";
const DAY = 1440;
const WEEK = DAY * 7;

/** 0 = domingo … 6 = sábado */
export const OPEN_DAYS = [0, 1, 2, 4, 5];
const SHIFTS: [number, number][] = [
  [11 * 60, 15 * 60 + 30],
  [20 * 60, DAY + 2 * 60 + 30],
];

const DAY_NAMES = ["domingo", "lunes", "martes", "miércoles", "jueves", "viernes", "sábado"];

type Interval = { start: number; end: number };

const intervals: Interval[] = OPEN_DAYS.flatMap((day) =>
  SHIFTS.map(([from, to]) => ({ start: day * DAY + from, end: day * DAY + to })),
);

export type StoreStatus =
  | { open: true; closesAt: string }
  | { open: false; opensAt: string };

/** Minutos desde el domingo 00:00 en hora de Buenos Aires. */
export function weekMinutes(date: Date): number {
  const parts = new Intl.DateTimeFormat("en-US", {
    timeZone: TIME_ZONE,
    weekday: "short",
    hour: "2-digit",
    minute: "2-digit",
    hourCycle: "h23",
  }).formatToParts(date);
  const get = (type: string) => parts.find((p) => p.type === type)?.value ?? "0";
  const weekday = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].indexOf(get("weekday"));
  return weekday * DAY + Number(get("hour")) * 60 + Number(get("minute"));
}

const clock = (minutes: number) => {
  const m = ((minutes % DAY) + DAY) % DAY;
  return `${String(Math.floor(m / 60)).padStart(2, "0")}:${String(m % 60).padStart(2, "0")}`;
};

export function storeStatus(date: Date = new Date()): StoreStatus {
  const now = weekMinutes(date);
  // El turno del sábado a la madrugada viene del viernes; se prueba también una semana atrás.
  for (const { start, end } of intervals) {
    for (const offset of [0, WEEK]) {
      if (now + offset >= start && now + offset < end) {
        return { open: true, closesAt: clock(end) };
      }
    }
  }

  const next = intervals
    .map(({ start }) => (start > now ? start : start + WEEK))
    .sort((a, b) => a - b)[0];
  const today = Math.floor(now / DAY);
  const nextDay = Math.floor(next / DAY);
  const when =
    nextDay === today ? "hoy" : nextDay === today + 1 ? "mañana" : `el ${DAY_NAMES[nextDay % 7]}`;
  return { open: false, opensAt: `${when} a las ${clock(next)}` };
}
