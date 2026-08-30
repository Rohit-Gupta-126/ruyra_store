"use client";

import dynamic from "next/dynamic";

// LiveStorefront uses Craft.js which requires browser APIs.
// ssr:false is only permitted inside Client Components.
const LiveStorefront = dynamic(
  () => import("./LiveStorefront"),
  { ssr: false }
);

export default function LiveStorefrontWrapper({ data }: { data: string }) {
  return <LiveStorefront data={data} />;
}
