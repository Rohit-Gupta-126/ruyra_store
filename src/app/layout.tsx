import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const playfairDisplay = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  weight: ["600", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "RUYRA — Botanical Rituals",
  description:
    "Handcrafted botanical candles, bath rituals, and artisanal home fragrance. Embrace the warmth of nature's glow.",
  keywords: ["botanical", "artisanal", "candles", "bath rituals", "home fragrance"],
  openGraph: {
    title: "RUYRA — Botanical Rituals",
    description:
      "Handcrafted botanical candles, bath rituals, and artisanal home fragrance.",
    type: "website",
  },
};

import CartProvider from "@/app/context/CartContext";
import CartDrawer from "@/app/components/CartDrawer";
import ProductSheetProvider from "@/app/components/ProductSheetContext";
import ProductSheet from "@/app/components/ProductSheet";
import Navigation from "@/app/components/Navigation";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${playfairDisplay.variable}`}
    >
      <body className="min-h-screen antialiased overflow-x-hidden selection:bg-brand-terracotta selection:text-white">
        <CartProvider>
          <ProductSheetProvider>
            <Navigation />
            {children}
            <ProductSheet />
            <CartDrawer />
          </ProductSheetProvider>
        </CartProvider>
      </body>
    </html>
  );
}
