import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Our Story & Journal - CHISÓ Creations",
  description:
    "Stories on handcrafted art, the magic of everlasting chenille blooms, and why thoughtful handmade gifts mean more. From the makers at CHISÓ Creations.",
  alternates: {
    canonical: "/journal",
  },
  openGraph: {
    title: "Our Story & Journal | CHISÓ Creations",
    description:
      "Stories on handcrafted art, everlasting flowers, and thoughtful handmade gifts from CHISÓ Creations.",
    url: "/journal",
  },
};

export default function JournalLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
