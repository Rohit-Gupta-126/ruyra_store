import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Shop - All Adornments & Rituals",
  description:
    "Browse RUYRA's full collection of handcrafted botanical candles, bath salts, earthen ware, and resin adornments. Filter by ritual type and scent profile.",
  alternates: {
    canonical: "/shop",
  },
  openGraph: {
    title: "Shop All Rituals | RUYRA",
    description:
      "Browse RUYRA's full collection of handcrafted botanical candles, bath salts, earthen ware, and resin adornments.",
    url: "/shop",
  },
};

export default function ShopLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
