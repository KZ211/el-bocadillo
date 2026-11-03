import { existsSync } from "node:fs";
import path from "node:path";
import { OrderApp } from "@/components/order-app";
import { categories, complements, hero, products } from "@/data/menu";

const publicFile = (...parts: string[]) => existsSync(path.join(process.cwd(), "public", ...parts));

export default function Home() {
  // Las fotos se activan solas al copiar `public/menu/<id>.jpg` y `public/logo.png`.
  const withImages = products.map((p) =>
    p.image || !publicFile("menu", `${p.id}.jpg`) ? p : { ...p, image: `/menu/${p.id}.jpg` },
  );
  const logo = publicFile("logo.png") ? "/logo.png" : null;

  return <OrderApp categories={categories} products={withImages} hero={hero} complements={complements} logo={logo} />;
}
