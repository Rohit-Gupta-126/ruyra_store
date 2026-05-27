import type { Metadata, Viewport } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import "./globals.css";

import CartProvider from "@/lib/context/CartContext";
import CartDrawer from "@/components/features/CartDrawer";
import ProductSheetProvider from "@/components/features/ProductSheetContext";
import ProductSheet from "@/components/features/ProductSheet";
import Navigation from "@/components/layout/Navigation";
import SearchProvider from "@/lib/context/SearchContext";
import SearchOverlay from "@/components/features/SearchOverlay";

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

export const viewport: Viewport = {
  themeColor: "#3E2C24",
  width: "device-width",
  initialScale: 1,
};

export const metadata: Metadata = {
  metadataBase: new URL("https://ruyra.com"),
  title: {
    default: "RUYRA - Botanical Rituals",
    template: "%s | RUYRA",
  },
  description:
    "Handcrafted botanical candles, bath rituals, and artisanal home fragrance. Embrace the warmth of nature's glow.",
  keywords: ["botanical", "artisanal", "candles", "bath rituals", "home fragrance", "soy candles", "botanical skincare"],
  icons: {
    icon: { url: "/icon.svg", type: "image/svg+xml" },
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "RUYRA - Botanical Rituals",
    description:
      "Handcrafted botanical candles, bath rituals, and artisanal home fragrance.",
    type: "website",
    url: "/",
    siteName: "RUYRA",
    locale: "en_US",
    images: [
      {
        url: "/hero_bg.png",
        width: 1200,
        height: 630,
        alt: "RUYRA botanical candle ritual",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "RUYRA - Botanical Rituals",
    description:
      "Handcrafted botanical candles, bath rituals, and artisanal home fragrance.",
    images: ["/hero_bg.png"],
  },
};

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
      <body className="min-h-screen antialiased overflow-x-clip selection:bg-brand-terracotta selection:text-white pb-16 md:pb-0">
        <CartProvider>
          <SearchProvider>
            <ProductSheetProvider>
              <Navigation />
              {children}
              <ProductSheet />
              <CartDrawer />
              <SearchOverlay />
            </ProductSheetProvider>
          </SearchProvider>
        </CartProvider>
      </body>
    </html>
  );
}
