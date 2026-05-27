"use client";

import Image from "next/image";
import { useState } from "react";
import { X, ShoppingBag, Star, RefreshCw } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useProductSheet } from "./ProductSheetContext";
import { products } from "@/app/data/products";
import { useCart } from "@/app/context/CartContext";

export default function ProductSheet() {
  const { sheetState, closeSheet } = useProductSheet();
  const { isOpen, title, image, price } = sheetState;

  // Find detailed product info based on title
  const currentProduct = products.find((p) => p.name === title) || products[0];

  // Store selected variants keyed by product ID to avoid useEffect state synchronization
  const [selectedVariants, setSelectedVariants] = useState<Record<string, string>>({});

  const { addItem } = useCart();

  const selectedVariant = currentProduct
    ? (selectedVariants[currentProduct.id] || currentProduct.variants[0] || "")
    : "";

  const handleSelectVariant = (variant: string) => {
    if (currentProduct) {
      setSelectedVariants((prev) => ({
        ...prev,
        [currentProduct.id]: variant,
      }));
    }
  };

  if (!currentProduct) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop Overlay */}
          <motion.div
            id="sheet-backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeSheet}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-[55]"
            aria-hidden="true"
          />

          {/* Bottom Sheet Drawer */}
          <motion.div
            id="product-sheet"
            role="dialog"
            aria-modal="true"
            aria-label={`Product details for ${title}`}
            // Mobile: slides up from bottom (y: 100% to 0). Desktop: slides in from right (x: 100% to 0)
            initial={{ y: "100%", x: 0 }}
            animate={{ y: 0, x: 0 }}
            exit={{ y: "100%", x: 0 }}
            variants={{
              desktop: { y: 0, x: 0 },
              mobile: { y: 0, x: 0 }
            }}
            transition={{ type: "spring", stiffness: 260, damping: 28 }}
            className="fixed inset-x-0 bottom-0 h-[80vh] md:h-full md:w-[480px] md:top-0 md:bottom-0 md:left-auto md:right-0 md:rounded-t-none md:rounded-l-3xl bg-bg-primary rounded-t-3xl shadow-2xl z-[60] flex flex-col text-text-primary overflow-hidden"
          >
            {/* Top Drag Indicator (Mobile Only) */}
            <div 
              className="w-full flex justify-center py-4 cursor-pointer md:hidden flex-shrink-0"
              onClick={closeSheet}
              aria-label="Close details"
            >
              <div className="w-12 h-1.5 bg-gray-300 rounded-full hover:bg-gray-400 transition-colors" />
            </div>

            {/* Header / Top Bar */}
            <div className="flex justify-between items-center px-6 pt-2 pb-4 md:pt-8 flex-shrink-0 border-b border-bg-surface">
              <span className="font-sans text-[10px] tracking-[0.25em] uppercase text-text-secondary">
                {currentProduct.category}
              </span>
              <motion.button
                id="sheet-close-btn"
                suppressHydrationWarning
                whileHover={{ scale: 1.08 }}
                whileTap={{ scale: 0.92 }}
                className="w-8 h-8 rounded-full bg-bg-surface flex items-center justify-center text-text-secondary hover:text-text-primary transition-colors focus:outline-none"
                onClick={closeSheet}
                aria-label="Close detail panel"
              >
                <X className="w-4 h-4" />
              </motion.button>
            </div>

            {/* Scrollable Content Container */}
            <div className="flex-1 overflow-y-auto px-6 py-6 space-y-8 no-scrollbar pb-36">
              {/* Product Image */}
              <div className="relative aspect-[4/3] w-full rounded-2xl overflow-hidden bg-bg-surface flex-shrink-0">
                <Image
                  src={image || currentProduct.image}
                  alt={currentProduct.alt}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 480px"
                />
              </div>

              {/* Title & Price */}
              <div>
                <h2 className="font-serif text-3xl md:text-4xl leading-tight">
                  {title}
                </h2>
                <div className="flex items-center gap-3 mt-2">
                  <span className="font-sans text-xl font-medium tracking-wide">
                    {price}
                  </span>
                  <div className="flex items-center gap-1 text-accent-gold ml-2">
                    <Star className="w-4 h-4 fill-accent-gold stroke-accent-gold" />
                    <span className="font-sans text-xs text-text-secondary font-medium">
                      4.9 (128 reviews)
                    </span>
                  </div>
                </div>
              </div>

              {/* Description */}
              <div className="space-y-2">
                <h4 className="font-sans text-xs font-bold uppercase tracking-wider text-text-secondary">
                  The Ritual
                </h4>
                <p className="font-sans text-sm text-text-primary leading-relaxed font-light">
                  {currentProduct.description}
                </p>
              </div>

              {/* Variant Selector */}
              <div>
                <h4 className="font-sans text-xs font-bold uppercase tracking-wider text-text-secondary mb-3">
                  Select {currentProduct.variantType}
                </h4>
                <div className="flex flex-wrap gap-3">
                  {currentProduct.variants.map((v) => {
                    const isSelected = selectedVariant === v;
                    return (
                      <motion.button
                        key={v}
                        id={`variant-btn-${v}`}
                        suppressHydrationWarning
                        whileHover={{ scale: 1.03 }}
                        whileTap={{ scale: 0.97 }}
                        onClick={() => handleSelectVariant(v)}
                        className={`px-5 py-2.5 rounded-full font-sans text-xs tracking-wider border transition-all duration-300 focus:outline-none ${
                          isSelected
                            ? "bg-bg-primary border-accent-primary border-2 text-accent-primary font-medium"
                            : "bg-white border-gray-200 text-text-secondary hover:border-text-secondary/40"
                        }`}
                      >
                        {v}
                      </motion.button>
                    );
                  })}
                </div>
              </div>

              {/* Eco details / brand strip */}
              <div className="bg-bg-surface rounded-2xl p-4 flex flex-col gap-3">
                <div className="flex items-center gap-3 text-accent-primary">
                  <RefreshCw className="w-4 h-4 animate-spin-slow" />
                  <span className="font-sans text-xs font-medium">Plastic-free packaging & climate-neutral shipping</span>
                </div>
              </div>
            </div>

            {/* Sticky Bottom CTA */}
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-bg-primary via-bg-primary to-transparent px-6 pt-12 pb-6 flex-shrink-0">
              <motion.button
                id="add-to-bag-btn"
                suppressHydrationWarning
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="w-full bg-accent-primary hover:bg-opacity-95 text-white py-4 rounded-full font-sans text-xs uppercase tracking-widest font-semibold flex items-center justify-center gap-2 shadow-xl shadow-accent-primary/10 hover:shadow-accent-primary/20 transition-all focus:outline-none"
                onClick={() => {
                  addItem({
                    id: currentProduct.id,
                    name: title,
                    price: price,
                    variant: selectedVariant,
                    image: image || currentProduct.image
                  });
                  closeSheet();
                }}
              >
                <ShoppingBag className="w-4 h-4 stroke-[2]" />
                Add to Bag — {price}
              </motion.button>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
