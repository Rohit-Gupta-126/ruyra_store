import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Shop All Blooms, Charms & Gifts",
  description:
    "Browse CHISÓ Creations' collection of handcrafted chenille bouquets, adorable bag charms, woven basket décor, and heartfelt custom gift sets.",
  alternates: {
    canonical: "/shop",
  },
  openGraph: {
    title: "Shop All Handcrafted Blooms & Gifts | CHISÓ Creations",
    description:
      "Browse CHISÓ Creations' collection of handcrafted chenille bouquets, adorable bag charms, and heartfelt gift sets.",
    url: "/shop",
  },
};

export default function ShopLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
