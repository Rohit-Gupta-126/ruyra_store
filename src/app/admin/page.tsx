"use client";

import dynamic from "next/dynamic";

const AdminEditor = dynamic(
  () => import("@/components/admin/AdminEditor"),
  { ssr: false }
);

export default function AdminPage() {
  return (
    <main className="min-h-screen bg-[#F6F4F0] text-[#3E2C24]">
      <AdminEditor />
    </main>
  );
}
