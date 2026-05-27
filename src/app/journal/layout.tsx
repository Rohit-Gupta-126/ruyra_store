import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Journal - Notes on Intentional Living",
  description:
    "Three essays on ritual, sensory grounding, and the quiet spaces we build for the mind. The RUYRA Journal explores slow light, sacred bathing, and earthen craft.",
  alternates: {
    canonical: "/journal",
  },
  openGraph: {
    title: "The Journal | RUYRA",
    description:
      "Essays on ritual, sensory grounding, and intentional living from the makers at RUYRA.",
    url: "/journal",
  },
};

export default function JournalLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
