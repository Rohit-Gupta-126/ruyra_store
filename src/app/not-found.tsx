import Link from "next/link";

export default function NotFound() {
  return (
    <main className="min-h-screen bg-brand-sand flex flex-col items-center justify-center text-center px-6">
      {/* Decorative watermark */}
      <span
        aria-hidden="true"
        className="font-serif font-bold text-[160px] leading-none text-brand-brown/[0.04] select-none pointer-events-none absolute"
      >
        404
      </span>

      <div className="relative z-10 flex flex-col items-center gap-5 max-w-md">
        <span className="font-sans text-[10px] tracking-[0.4em] uppercase font-bold text-brand-terracotta">
          Page Not Found
        </span>

        <h1 className="font-serif text-3xl sm:text-4xl font-bold text-brand-brown leading-tight">
          This sanctuary
          <br />
          <span className="italic font-normal">doesn&apos;t exist</span>
        </h1>

        <div className="w-10 h-px bg-brand-terracotta/40" />

        <p className="font-sans text-sm text-brand-text-muted leading-relaxed font-light">
          The page you&apos;re looking for has moved, or perhaps never was. Let us
          guide you back to warmth.
        </p>

        <div className="flex gap-3 mt-2">
          <Link
            href="/"
            className="px-6 py-3 bg-brand-brown text-brand-sand font-sans text-xs font-bold tracking-widest uppercase rounded-md hover:bg-brand-brown/90 transition-all"
          >
            Home
          </Link>
          <Link
            href="/shop"
            className="px-6 py-3 border border-brand-brown/20 text-brand-brown font-sans text-xs font-bold tracking-widest uppercase rounded-md hover:bg-brand-brown/5 transition-all"
          >
            Shop
          </Link>
        </div>
      </div>
    </main>
  );
}
