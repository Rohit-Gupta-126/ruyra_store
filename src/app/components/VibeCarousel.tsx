"use client";

import Image from "next/image";
import { vibeCategories } from "@/app/data/products";
import { useProductSheet } from "@/app/components/ProductSheetContext";

export default function VibeCarousel() {
  const { openSheet } = useProductSheet();

  return (
    <section className="mt-10 lg:mt-14">
      <div className="px-5 lg:px-0">
        <h3
          className="font-[family-name:var(--font-playfair)] text-2xl text-[#4a5d4e] mb-6"
          style={{ fontWeight: 600 }}
        >
          Shop by Vibe
        </h3>
      </div>

      {/* Horizontal scroll on mobile/tablet, grid on desktop */}
      <div className="flex overflow-x-auto gap-4 hide-scrollbar pb-4 pl-5 pr-5 snap-x snap-mandatory lg:grid lg:grid-cols-2 lg:overflow-visible lg:pl-0 lg:pr-0">
        {vibeCategories.map((cat) => (
          <button
            key={cat.id}
            id={`vibe-card-${cat.id}`}
            className="group relative min-w-[280px] h-[380px] rounded-[24px] overflow-hidden flex-shrink-0 snap-center cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-[#4a5d4e] lg:min-w-0 lg:w-full lg:h-[440px]"
            onClick={() => openSheet(cat.name, cat.image, cat.price)}
            aria-label={`Shop ${cat.name} — starting at ${cat.price}`}
          >
            {/* Image */}
            <Image
              src={cat.image}
              alt={cat.name}
              fill
              className="object-cover product-img group-hover:scale-105 transition-transform duration-700 ease-out"
              sizes="(max-width: 768px) 280px, (max-width: 1024px) 50vw, 40vw"
            />

            {/* Gradient */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

            {/* Label */}
            <div className="absolute bottom-0 left-0 p-6 w-full flex justify-between items-end">
              <span
                className="font-[family-name:var(--font-playfair)] text-2xl text-white drop-shadow-md"
                style={{ fontWeight: 600 }}
              >
                {cat.name}
              </span>
              <div className="w-12 h-12 rounded-full bg-white/20 backdrop-blur-xl border border-white/30 flex items-center justify-center text-white shadow-lg flex-shrink-0">
                <span className="material-symbols-outlined">arrow_forward</span>
              </div>
            </div>
          </button>
        ))}
      </div>
    </section>
  );
}
