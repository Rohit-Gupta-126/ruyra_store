import Link from "next/link";
import { Heart } from "lucide-react";

export default function NotFound() {
  return (
    <main className="min-h-screen bg-[#FAF7F2] flex flex-col items-center justify-center text-center px-6 text-[#422926]">
      <span
        aria-hidden="true"
        className="font-serif font-bold text-[160px] leading-none text-[#422926]/5 select-none pointer-events-none absolute"
      >
        404
      </span>

      <div className="relative z-10 flex flex-col items-center gap-4 max-w-md">
        <div className="w-12 h-12 rounded-full bg-brand-rose-light flex items-center justify-center text-brand-terracotta mb-2">
          <Heart className="w-6 h-6 fill-brand-terracotta" />
        </div>

        <span className="font-sans text-xs tracking-[0.3em] uppercase font-bold text-brand-terracotta">
          Page Not Found
        </span>

        <h1 className="font-serif text-3xl sm:text-4xl font-bold text-[#422926] leading-tight">
          This creation <br />
          <span className="font-script text-4xl sm:text-5xl text-brand-terracotta">isn&apos;t here ♡</span>
        </h1>

        <p className="font-sans text-xs sm:text-sm text-brand-text-muted leading-relaxed">
          The page you&apos;re looking for might have bloomed elsewhere. Let us guide you back to our handmade collection.
        </p>

        <div className="flex gap-3 mt-4">
          <Link
            href="/"
            className="px-6 py-3 bg-brand-terracotta text-white font-sans text-xs font-bold tracking-widest uppercase rounded-full hover:bg-[#B34E59] shadow-md transition-all"
          >
            Home
          </Link>
          <Link
            href="/shop"
            className="px-6 py-3 border border-[#EFE7DD] bg-white text-[#422926] font-sans text-xs font-bold tracking-widest uppercase rounded-full hover:border-brand-rose transition-all shadow-xs"
          >
            Shop Blooms
          </Link>
        </div>
      </div>
    </main>
  );
}
