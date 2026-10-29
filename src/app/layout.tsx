import type { Metadata, Viewport } from "next";
import { Archivo, Gloock, Martian_Mono } from "next/font/google"; // taste-skill-ignore: letra del ticket de comandera
import "./globals.css";

const gloock = Gloock({ variable: "--font-gloock", subsets: ["latin"], weight: "400" });
const archivo = Archivo({ variable: "--font-archivo", subsets: ["latin"], axes: ["wdth"] });
const martian = Martian_Mono({ variable: "--font-martian", subsets: ["latin"], axes: ["wdth"] }); // taste-skill-ignore

export const metadata: Metadata = {
  title: "El Bocadillo · Hacé tu pedido",
  description:
    "Armá tu pedido de smash burgers, bocadillos y pizzas de El Bocadillo (Dorrego 413, Pte. Derqui) y mandalo directo por WhatsApp.",
  openGraph: {
    title: "El Bocadillo · Hacé tu pedido",
    description: "Smash burgers en Presidente Derqui. Armá tu pedido y mandalo por WhatsApp.",
    locale: "es_AR",
    type: "website",
  },
};

export const viewport: Viewport = {
  themeColor: "#0d0c0a",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="es-AR" className={`${gloock.variable} ${archivo.variable} ${martian.variable} antialiased`}>
      <body className="min-h-dvh">{children}</body>
    </html>
  );
}
