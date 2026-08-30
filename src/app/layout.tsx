import type { Metadata, Viewport } from "next";
import { Plus_Jakarta_Sans, Playfair_Display, Caveat } from "next/font/google";
import "./globals.css";

import CartProvider from "@/lib/context/CartContext";
import CartDrawer from "@/components/features/CartDrawer";
import ProductSheetProvider from "@/components/features/ProductSheetContext";
import ProductSheet from "@/components/features/ProductSheet";
import Navigation from "@/components/layout/Navigation";
import SearchProvider from "@/lib/context/SearchContext";
import SearchOverlay from "@/components/features/SearchOverlay";

const jakarta = Plus_Jakarta_Sans({
  variable: "--font-jakarta",
  subsets: ["latin"],
  display: "swap",
});

const playfairDisplay = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  weight: ["500", "600", "700", "800"],
  display: "swap",
});

const caveat = Caveat({
  variable: "--font-caveat",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

export const viewport: Viewport = {
  themeColor: "#422926",
  width: "device-width",
  initialScale: 1,
};

export const metadata: Metadata = {
  metadataBase: new URL("https://chisocreations.com"),
  title: {
    default: "CHISÓ Creations - Little Luxuries, Handcrafted",
    template: "%s | CHISÓ Creations",
  },
  description:
    "Handmade blooms, adorable charms, and thoughtful gifts made especially for you. Discover everlasting chenille flowers, handcrafted woven décor, and bespoke keepsakes.",
  keywords: [
    "CHISÓ Creations",
    "handmade blooms",
    "chenille flowers",
    "crochet flower bouquet",
    "tulip bouquet",
    "bag charms",
    "thoughtful gifts",
    "handcrafted gifts",
    "custom creations",
    "aesthetic room decor",
    "everlasting flowers"
  ],
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
    title: "CHISÓ Creations - Little Luxuries, Handcrafted",
    description:
      "Handmade blooms, adorable charms, and thoughtful gifts made especially for you. Blooming happiness, crafted by hand.",
    type: "website",
    url: "/",
    siteName: "CHISÓ Creations",
    locale: "en_US",
    images: [
      {
        url: "https://images.unsplash.com/photo-1563245372-f21724e3856d?q=80&w=1200&auto=format&fit=crop",
        width: 1200,
        height: 630,
        alt: "CHISÓ Creations handmade floral bouquet and charms",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "CHISÓ Creations - Little Luxuries, Handcrafted",
    description:
      "Handmade blooms, adorable charms, and thoughtful gifts made especially for you.",
    images: ["https://images.unsplash.com/photo-1563245372-f21724e3856d?q=80&w=1200&auto=format&fit=crop"],
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
      className={`${jakarta.variable} ${playfairDisplay.variable} ${caveat.variable}`}
    >
      <body className="min-h-screen antialiased overflow-x-clip selection:bg-brand-blush selection:text-white pb-16 md:pb-0 font-sans bg-brand-sand text-brand-brown">
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
