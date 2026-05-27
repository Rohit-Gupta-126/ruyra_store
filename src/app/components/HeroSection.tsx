import Image from "next/image";
import { heroImage } from "@/app/data/products";

export default function HeroSection() {
  return (
    <section className="relative h-screen w-full rounded-b-[40px] overflow-hidden">
      {/* Background Image */}
      <Image
        src={heroImage}
        alt="The Amber Ritual — RUYRA handcrafted candle collection"
        fill
        priority
        className="object-cover object-center"
        sizes="100vw"
      />

      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-black/10" />

      {/* Hero Content */}
      <div className="absolute inset-0 flex flex-col justify-end items-center text-center p-5 pb-28 z-10 lg:items-start lg:pb-20 lg:pl-16">
        <span className="bg-white/10 backdrop-blur-md text-white border border-white/20 font-sans text-xs font-semibold px-4 py-1.5 rounded-full mb-6 tracking-widest uppercase">
          New Collection
        </span>

        <h2
          className="font-[family-name:var(--font-playfair)] text-[clamp(2.5rem,6vw,4.5rem)] leading-[1.1] text-[#d4af37] mb-4 text-outline-sage hero-headline"
          style={{ fontWeight: 700 }}
        >
          The Amber
          <br />
          Ritual
        </h2>

        <p className="text-white/90 font-sans text-sm max-w-[280px] mb-8 font-light lg:max-w-sm lg:text-base">
          Embrace the warmth of nature&apos;s glow. Handcrafted to ground your
          spirit.
        </p>

        {/* CTA — visible on desktop */}
        <div className="hidden lg:flex gap-4">
          <button
            id="hero-shop-now"
            className="px-8 py-3.5 bg-[#4a5d4e] text-white font-sans font-medium rounded-full hover:opacity-90 transition-opacity shadow-xl"
          >
            Shop the Collection
          </button>
          <button
            id="hero-learn-more"
            className="px-8 py-3.5 bg-white/15 backdrop-blur-md text-white font-sans font-medium rounded-full border border-white/30 hover:bg-white/25 transition-colors"
          >
            Our Story
          </button>
        </div>
      </div>

      {/* Scroll indicator — mobile */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-1 lg:hidden">
        <span className="w-px h-8 bg-white/40 animate-pulse" />
        <span className="text-white/50 text-[10px] tracking-widest uppercase font-sans">
          Scroll
        </span>
      </div>
    </section>
  );
}
