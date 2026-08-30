"use client";

import Link from "next/link";
import { useEffect } from "react";
import { Heart } from "lucide-react";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset?: () => void;
}) {
  useEffect(() => {
    if (process.env.NODE_ENV !== "development") {
      console.error("[CHISÓ Creations error]", error);
    }
  }, [error]);

  return (
    <main className="min-h-screen bg-[#FAF7F2] flex flex-col items-center justify-center text-center px-6 text-[#422926]">
      <div className="relative z-10 flex flex-col items-center gap-4 max-w-md">
        <div className="w-12 h-12 rounded-full bg-brand-rose-light flex items-center justify-center text-brand-terracotta mb-2">
          <Heart className="w-6 h-6 fill-brand-terracotta" />
        </div>

        <span className="font-sans text-xs tracking-[0.3em] uppercase font-bold text-brand-terracotta">
          Something went wrong
        </span>

        <h1 className="font-serif text-3xl sm:text-4xl font-bold text-[#422926] leading-tight">
          A small hiccup in <br />
          <span className="font-script text-4xl sm:text-5xl text-brand-terracotta">the craft studio ♡</span>
        </h1>

        <p className="font-sans text-xs sm:text-sm text-brand-text-muted leading-relaxed">
          An unexpected error occurred. Please try refreshing, or return home if the problem persists.
        </p>

        <div className="flex gap-3 mt-4">
          {reset && (
            <button
              onClick={reset}
              className="px-6 py-3 bg-brand-terracotta text-white font-sans text-xs font-bold tracking-widest uppercase rounded-full hover:bg-[#B34E59] shadow-md transition-all cursor-pointer"
            >
              Try Again
            </button>
          )}
          <Link
            href="/"
            className="px-6 py-3 border border-[#EFE7DD] bg-white text-[#422926] font-sans text-xs font-bold tracking-widest uppercase rounded-full hover:border-brand-rose transition-all shadow-xs"
          >
            Home
          </Link>
        </div>
      </div>
    </main>
  );
}
