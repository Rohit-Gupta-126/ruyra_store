"use client";

import { useState, useEffect, useRef } from "react";
import { X, Search, Sparkles, Heart } from "lucide-react";
import { motion, AnimatePresence, Variants } from "framer-motion";
import { useSearch } from "@/lib/context/SearchContext";
import { useProductSheet } from "@/components/features/ProductSheetContext";
import { products, Product } from "@/lib/data/products";
import Image from "next/image";

const TRENDING_INTENTIONS = [
  { label: "Chenille Tulip", term: "Tulip" },
  { label: "Bag Charms", term: "Charm" },
  { label: "Daisy Basket", term: "Daisy" },
  { label: "Gift Box", term: "Gift" },
  { label: "Custom Blooms", term: "Custom" },
];

export default function SearchOverlay() {
  const { isSearchOpen, closeSearch } = useSearch();
  const { openSheet } = useProductSheet();
  const [query, setQuery] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isSearchOpen) {
      setTimeout(() => {
        inputRef.current?.focus();
      }, 100);
    }
  }, [isSearchOpen]);

  const handleClose = () => {
    setQuery("");
    closeSearch();
  };

  const filteredProducts = query.trim()
    ? products.filter(
        (product) =>
          product.name.toLowerCase().includes(query.toLowerCase()) ||
          product.category.toLowerCase().includes(query.toLowerCase()) ||
          product.description.toLowerCase().includes(query.toLowerCase())
      )
    : [];

  const handleResultClick = (product: Product) => {
    setQuery("");
    closeSearch();
    setTimeout(() => {
      openSheet(product.name, product.image, product.price);
    }, 200);
  };

  return (
    <AnimatePresence>
      {isSearchOpen && (
        <motion.div
          id="search-overlay"
          role="dialog"
          aria-modal="true"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="fixed inset-0 z-100 bg-[#FAF7F2]/98 backdrop-blur-lg text-[#422926] flex flex-col pt-16 md:pt-24 px-6 md:px-16"
        >
          {/* Header search controls */}
          <div className="max-w-5xl mx-auto w-full flex items-center justify-between border-b border-[#EFE7DD] pb-6 flex-shrink-0 relative">
            <div className="flex-1 flex items-center gap-4">
              <Search className="w-7 h-7 text-[#422926]/40 stroke-[1.75]" />
              <input
                ref={inputRef}
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search handcrafted blooms, charms, gifts..."
                className="w-full text-xl sm:text-2xl md:text-4xl font-serif text-[#422926] outline-none bg-transparent placeholder-[#422926]/30 pr-12 font-medium"
              />
            </div>
            
            <button
              onClick={handleClose}
              className="w-10 h-10 rounded-full bg-white hover:bg-brand-rose-light border border-[#EFE7DD] transition-colors flex items-center justify-center text-[#422926] focus:outline-none cursor-pointer"
              aria-label="Close search"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Results / Empty state */}
          <div className="flex-1 overflow-y-auto py-10 max-w-5xl mx-auto w-full no-scrollbar pb-32">
            <AnimatePresence mode="wait">
              {query.trim() === "" ? (
                <div className="space-y-6 text-left">
                  <div className="flex items-center gap-2 text-brand-terracotta">
                    <Sparkles className="w-4 h-4" />
                    <h3 className="font-serif text-xl font-bold">Trending Searches</h3>
                  </div>
                  <div className="flex flex-wrap gap-2.5">
                    {TRENDING_INTENTIONS.map((intention) => (
                      <button
                        key={intention.label}
                        onClick={() => setQuery(intention.term)}
                        className="bg-white hover:bg-brand-rose-light text-[#422926] px-4 py-2 rounded-full font-sans text-xs font-semibold tracking-wider border border-[#EFE7DD] hover:border-brand-rose transition-all cursor-pointer"
                      >
                        {intention.label}
                      </button>
                    ))}
                  </div>
                </div>
              ) : (
                <div className="space-y-8 text-left">
                  <div className="flex items-baseline justify-between">
                    <h3 className="font-serif text-xl font-bold">
                      {filteredProducts.length > 0 ? "Handmade Pieces Found" : "No Pieces Found"}
                    </h3>
                    <span className="font-sans text-xs text-brand-text-muted">
                      {filteredProducts.length} items
                    </span>
                  </div>

                  {filteredProducts.length > 0 ? (
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
                      {filteredProducts.map((product) => (
                        <div
                          key={product.id}
                          onClick={() => handleResultClick(product)}
                          className="group cursor-pointer space-y-2.5 p-3 rounded-2xl bg-white border border-[#EFE7DD] hover:border-brand-rose transition-all shadow-xs"
                        >
                          <div className="aspect-4/3 rounded-xl overflow-hidden bg-brand-taupe relative">
                            <Image
                              src={product.image}
                              alt={product.alt}
                              fill
                              className="object-cover transition-transform duration-500 group-hover:scale-105"
                              sizes="(max-width: 768px) 50vw, 25vw"
                            />
                          </div>
                          <div className="space-y-1">
                            <h4 className="font-serif text-xs sm:text-sm font-bold text-[#422926] group-hover:text-brand-terracotta transition-colors line-clamp-1">
                              {product.name}
                            </h4>
                            <div className="flex justify-between items-center text-xs">
                              <span className="font-sans text-brand-text-muted">
                                {product.category}
                              </span>
                              <span className="font-sans font-bold text-[#422926]">
                                {product.price}
                              </span>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p className="font-sans text-sm text-brand-text-muted">
                      No handmade items matched &quot;{query}&quot;. Try searching for &quot;Tulip&quot; or &quot;Charms&quot;. ♡
                    </p>
                  )}
                </div>
              )}
            </AnimatePresence>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
