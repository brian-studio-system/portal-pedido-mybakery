import type { Metadata } from "next";
import { Manrope, Playfair_Display } from "next/font/google";

import { Footer } from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";

import "./globals.css";

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
  weight: ["600", "700"],
  display: "swap",
});

const manrope = Manrope({
  subsets: ["latin"],
  variable: "--font-manrope",
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "My Bakery — Obrador artesanal en Barcelona",
    template: "%s · My Bakery",
  },
  description:
    "Pan de masa madre, bollería y pasteles horneados cada mañana en Barcelona desde 2020.",
  metadataBase: new URL("https://mybakery.example"),
  openGraph: {
    title: "My Bakery — Obrador artesanal en Barcelona",
    description:
      "Pan de masa madre, bollería y pasteles horneados cada mañana en Barcelona desde 2020.",
    type: "website",
    locale: "es_ES",
    siteName: "My Bakery",
  },
  icons: {
    icon: "/my-bakery-logo.svg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="es" className={`${playfair.variable} ${manrope.variable}`}>
      <body className="flex min-h-dvh flex-col">
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
