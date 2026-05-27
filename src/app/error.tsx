"use client";

import Link from "next/link";
import { useEffect } from "react";

export default function GlobalError({
  error,
  unstable_retry,
}: {
  error: Error & { digest?: string };
  unstable_retry: () => void;
}) {
  useEffect(() => {
    // Log error to an error reporting service in production
    if (process.env.NODE_ENV !== "development") {
      console.error("[RUYRA error]", error);
    }
  }, [error]);

  return (
    <main className="min-h-screen bg-brand-sand flex flex-col items-center justify-center text-center px-6">
      {/* Decorative watermark */}
      <span
        aria-hidden="true"
        className="font-serif font-bold text-[160px] leading-none text-brand-brown/[0.04] select-none pointer-events-none absolute"
      >
        ✦
      </span>

      <div className="relative z-10 flex flex-col items-center gap-5 max-w-md">
        <span className="font-sans text-[10px] tracking-[0.4em] uppercase font-bold text-brand-terracotta">
          Something went wrong
        </span>

        <h1 className="font-serif text-3xl sm:text-4xl font-bold text-brand-brown leading-tight">
          A disruption
          <br />
          <span className="italic font-normal">in the sanctuary</span>
        </h1>

        <div className="w-10 h-px bg-brand-terracotta/40" />

        <p className="font-sans text-sm text-brand-text-muted leading-relaxed font-light">
          An unexpected error occurred. Please try again, or return home if the
          problem persists.
        </p>

        <div className="flex gap-3 mt-2">
          <button
            onClick={unstable_retry}
            className="px-6 py-3 bg-brand-brown text-brand-sand font-sans text-xs font-bold tracking-widest uppercase rounded-md hover:bg-brand-brown/90 transition-all"
          >
            Try Again
          </button>
          <Link
            href="/"
            className="px-6 py-3 border border-brand-brown/20 text-brand-brown font-sans text-xs font-bold tracking-widest uppercase rounded-md hover:bg-brand-brown/5 transition-all"
          >
            Home
          </Link>
        </div>
      </div>
    </main>
  );
}
