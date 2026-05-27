"use client";

import Image from "next/image";
import { useState } from "react";
import { useProductSheet } from "@/app/components/ProductSheetContext";

export default function ProductSheet() {
  const { sheetState, closeSheet } = useProductSheet();
  const [selectedSize, setSelectedSize] = useState<"standard" | "large">("standard");

  const { isOpen, title, image, price } = sheetState;

  return (
    <>
      {/* Backdrop */}
      <div
        id="sheet-backdrop"
        className={`sheet-backdrop fixed inset-0 bg-black/60 z-50 backdrop-blur-sm ${isOpen ? "open" : ""}`}
        onClick={closeSheet}
        aria-hidden="true"
      />

      {/* Bottom Sheet — slides up from bottom on mobile/tablet, right panel on desktop */}
      <div
        id="product-sheet"
        role="dialog"
        aria-modal="true"
        aria-label={`Product details: ${title}`}
        className={`
          bottom-sheet fixed z-50 bg-[#faf9f6] shadow-[0_-20px_60px_rgba(0,0,0,0.15)]
          flex flex-col
          bottom-0 left-0 w-full h-[88vh] rounded-t-[40px]
          lg:top-0 lg:right-0 lg:left-auto lg:bottom-auto lg:w-[480px] lg:h-full lg:rounded-none lg:rounded-l-[40px] lg:shadow-[-20px_0_60px_rgba(0,0,0,0.12)]
          ${isOpen ? "open" : ""}
        `}
      >
        {/* Drag Handle / Close bar */}
        <div
          className="w-full flex justify-center py-5 cursor-pointer flex-shrink-0 lg:hidden"
          onClick={closeSheet}
          aria-label="Close panel"
        >
          <div className="w-12 h-1.5 rounded-full bg-black/10" />
        </div>

        {/* Desktop close button */}
        <button
          id="sheet-close-desktop"
          className="hidden lg:flex absolute top-6 right-6 w-10 h-10 rounded-full bg-[#f0efeb] items-center justify-center text-[#4a5d4e] hover:bg-[#e3e2e0] transition-colors z-10"
          onClick={closeSheet}
          aria-label="Close panel"
        >
          <span className="material-symbols-outlined text-[20px]">close</span>
        </button>

        {/* Scrollable Content */}
        <div className="flex-1 overflow-y-auto px-5 pb-40 lg:px-8 lg:pb-48 lg:pt-16">
          {/* Product Image */}
          <div className="relative w-full aspect-[4/3] rounded-[24px] bg-[#f0efeb] overflow-hidden mb-6">
            {image && (
              <Image
                src={image}
                alt={title}
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 480px"
              />
            )}
          </div>

          {/* Title and Price */}
          <div className="flex justify-between items-start mb-4 gap-4">
            <h3
              className="font-[family-name:var(--font-playfair)] text-[28px] text-[#4a5d4e] leading-tight"
              style={{ fontWeight: 700 }}
            >
              {title}
            </h3>
            <span className="font-sans text-lg font-semibold text-[#1a1c1a] mt-1 flex-shrink-0">
              {price}
            </span>
          </div>

          {/* Description */}
          <p className="font-sans text-sm text-[#434843] mb-8 leading-relaxed">
            Crafted from earth and intention. This piece brings warmth and grounding
            energy to your daily rituals. Each item is unique, reflecting the raw
            nature of its materials.
          </p>

          {/* Scent / Size Selector */}
          <div className="mb-8">
            <h4 className="font-sans text-xs font-semibold uppercase tracking-widest text-[#434843] mb-3">
              Select Size
            </h4>
            <div className="flex gap-3">
              <button
                id="size-standard"
                className={`px-5 py-2.5 rounded-full border font-sans text-sm transition-colors ${
                  selectedSize === "standard"
                    ? "border-[#4a5d4e] bg-[#4a5d4e] text-white"
                    : "border-black/10 text-[#434843] hover:border-[#4a5d4e]/30"
                }`}
                onClick={() => setSelectedSize("standard")}
              >
                Standard
              </button>
              <button
                id="size-large"
                className={`px-5 py-2.5 rounded-full border font-sans text-sm transition-colors ${
                  selectedSize === "large"
                    ? "border-[#4a5d4e] bg-[#4a5d4e] text-white"
                    : "border-black/10 text-[#434843] hover:border-[#4a5d4e]/30"
                }`}
                onClick={() => setSelectedSize("large")}
              >
                Large
              </button>
            </div>
          </div>

          {/* Reviews strip */}
          <div className="flex items-center gap-2 text-[#4a5d4e] mb-2">
            <div className="flex gap-0.5">
              {[1, 2, 3, 4, 5].map((s) => (
                <span key={s} className="material-symbols-outlined text-[16px]" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
              ))}
            </div>
            <span className="font-sans text-sm text-[#434843]">4.9 · 128 reviews</span>
          </div>

          {/* Badges */}
          <div className="flex flex-wrap gap-2 mt-6">
            {["Handcrafted", "Sustainable", "Cruelty-Free"].map((badge) => (
              <span
                key={badge}
                className="bg-[#f0efeb] text-[#4a5d4e] font-sans text-xs font-semibold px-3 py-1 rounded-full border border-[#c3c8c1]"
              >
                {badge}
              </span>
            ))}
          </div>
        </div>

        {/* Sticky CTA */}
        <div className="absolute bottom-0 left-0 right-0 px-5 bg-gradient-to-t from-[#faf9f6] via-[#faf9f6] to-transparent pt-12 pb-8 lg:px-8">
          <button
            id="add-to-bag-btn"
            className="w-full h-14 bg-[#4a5d4e] text-white rounded-full font-sans font-medium text-base flex items-center justify-center gap-2 hover:opacity-90 transition-opacity shadow-xl shadow-[#4a5d4e]/20"
          >
            <span className="material-symbols-outlined text-[20px]" style={{ fontVariationSettings: "'FILL' 1" }}>shopping_bag</span>
            Add to Bag — {price}
          </button>
        </div>
      </div>
    </>
  );
}
