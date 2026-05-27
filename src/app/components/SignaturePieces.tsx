"use client";

import Image from "next/image";
import { products } from "@/app/data/products";
import { useProductSheet } from "@/app/components/ProductSheetContext";

export default function SignaturePieces() {
  const { openSheet } = useProductSheet();

  return (
    <section className="mt-12 lg:mt-16 px-5 lg:px-0">
      <h3
        className="font-[family-name:var(--font-playfair)] text-2xl text-[#4a5d4e] mb-6"
        style={{ fontWeight: 600 }}
      >
        Signature Pieces
      </h3>

      <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4">
        {products.map((product) => (
          <button
            key={product.id}
            id={`product-card-${product.id}`}
            className="group flex flex-col gap-3 text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-[#4a5d4e] rounded-[20px]"
            onClick={() => openSheet(product.name, product.image, product.price)}
            aria-label={`View ${product.name} — ${product.price}`}
          >
            {/* Image Container */}
            <div className="relative w-full aspect-[4/5] rounded-[20px] bg-[#faf9f6] overflow-hidden">
              <Image
                src={product.image}
                alt={product.name}
                fill
                className="object-cover product-img group-hover:scale-105"
                sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
              />

              {/* Quick-add button */}
              <div
                className="absolute top-3 right-3 w-8 h-8 rounded-full bg-white/60 backdrop-blur-md flex items-center justify-center text-[#4a5d4e] shadow-sm border border-white/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10"
                aria-hidden="true"
              >
                <span className="material-symbols-outlined text-[18px]">add</span>
              </div>

              {/* Category badge */}
              <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </div>

            {/* Text Info */}
            <div className="px-1">
              <p className="font-sans text-sm font-medium text-[#1a1c1a] leading-snug line-clamp-1">
                {product.name}
              </p>
              <p className="font-sans text-sm font-semibold text-[#434843] mt-1 tracking-wide">
                {product.price}
              </p>
            </div>
          </button>
        ))}
      </div>
    </section>
  );
}
