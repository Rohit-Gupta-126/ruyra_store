"use client";

import { useState, useEffect, useRef } from "react";
import { X, Search } from "lucide-react";
import { motion, AnimatePresence, Variants } from "framer-motion";
import { useSearch } from "@/lib/context/SearchContext";
import { useProductSheet } from "@/components/features/ProductSheetContext";
import { products, Product } from "@/lib/data/products";
import Image from "next/image";

const TRENDING_INTENTIONS = [
  { label: "Amber Candle", term: "Amber" },
  { label: "Bath Salts", term: "Salts" },
  { label: "Clay Taper", term: "Taper" },
  { label: "Resin Art", term: "Resin" },
];

export default function SearchOverlay() {
  const { isSearchOpen, closeSearch } = useSearch();
  const { openSheet } = useProductSheet();
  const [query, setQuery] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  // Focus input on open
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

  // Filter products based on search term
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
    }, 200); // Small delay to let search fade out nicely before sheet slides in
  };

  // Framer Motion variants
  const overlayVariants: Variants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
    exit: { opacity: 0 },
  };

  const contentVariants: Variants = {
    hidden: { opacity: 0, y: 15 },
    visible: { opacity: 1, y: 0, transition: { delay: 0.1 } },
  };

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.05,
      },
    },
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, scale: 0.95, y: 10 },
    show: { 
      opacity: 1, 
      scale: 1, 
      y: 0, 
      transition: { type: "spring", stiffness: 300, damping: 24 } 
    },
  };

  return (
    <AnimatePresence>
      {isSearchOpen && (
        <motion.div
          id="search-overlay"
          role="dialog"
          aria-modal="true"
          variants={overlayVariants}
          initial="hidden"
          animate="visible"
          exit="exit"
          transition={{ duration: 0.35, ease: "easeInOut" }}
          className="fixed inset-0 z-[100] bg-brand-sand/95 backdrop-blur-md text-brand-brown flex flex-col pt-16 md:pt-24 px-6 md:px-16"
        >
          {/* Header search controls */}
          <div className="max-w-6xl mx-auto w-full flex items-center justify-between border-b border-brand-brown/10 pb-6 flex-shrink-0 relative">
            <div className="flex-1 flex items-center gap-4">
              <Search className="w-8 h-8 text-brand-brown/40 stroke-[1.5]" />
              <input
                ref={inputRef}
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="What are you looking for?"
                className="w-full text-3xl md:text-5xl font-serif text-brand-brown outline-none bg-transparent placeholder-brand-brown/20 pr-12 font-medium"
              />
            </div>
            
            <button
              onClick={handleClose}
              className="w-12 h-12 rounded-full bg-brand-taupe/40 hover:bg-brand-taupe/80 transition-colors flex items-center justify-center text-brand-brown focus:outline-none cursor-pointer"
              aria-label="Close search overlay"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Results / Empty state area */}
          <div className="flex-1 overflow-y-auto py-12 max-w-6xl mx-auto w-full no-scrollbar pb-32">
            <AnimatePresence mode="wait">
              {query.trim() === "" ? (
                /* Trending Empty State */
                <motion.div
                  key="trending"
                  variants={contentVariants}
                  initial="hidden"
                  animate="visible"
                  exit="hidden"
                  className="space-y-6 text-left"
                >
                  <h3 className="font-serif text-2xl font-bold">Trending Intentions</h3>
                  <div className="flex flex-wrap gap-3">
                    {TRENDING_INTENTIONS.map((intention) => (
                      <button
                        key={intention.label}
                        onClick={() => setQuery(intention.term)}
                        className="bg-brand-taupe/50 hover:bg-brand-taupe text-brand-brown px-5 py-2.5 rounded-full font-sans text-xs tracking-wider border border-brand-brown/5 hover:border-brand-brown/15 transition-all duration-300 cursor-pointer"
                      >
                        {intention.label}
                      </button>
                    ))}
                  </div>
                </motion.div>
              ) : (
                /* Results List */
                <motion.div
                  key="results"
                  variants={contentVariants}
                  initial="hidden"
                  animate="visible"
                  exit="hidden"
                  className="space-y-8 text-left"
                >
                  <div className="flex items-baseline justify-between">
                    <h3 className="font-serif text-2xl font-bold">
                      {filteredProducts.length > 0 ? "Rituals Found" : "No Rituals Found"}
                    </h3>
                    <span className="font-sans text-xs text-brand-text-muted">
                      {filteredProducts.length} results
                    </span>
                  </div>

                  {filteredProducts.length > 0 ? (
                    <motion.div
                      variants={containerVariants}
                      initial="hidden"
                      animate="show"
                      className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8"
                    >
                      {filteredProducts.map((product) => (
                        <motion.div
                          key={product.id}
                          variants={itemVariants}
                          onClick={() => handleResultClick(product)}
                          className="group cursor-pointer space-y-3"
                        >
                          <div className="aspect-[4/3] rounded-2xl overflow-hidden bg-brand-taupe relative shadow-sm">
                            <Image
                              src={product.image}
                              alt={product.alt}
                              fill
                              className="object-cover transition-transform duration-500 group-hover:scale-105"
                              sizes="(max-width: 768px) 50vw, 25vw"
                            />
                            <div className="absolute inset-0 bg-black/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                          </div>
                          <div className="space-y-1">
                            <h4 className="font-sans text-xs font-semibold text-brand-brown group-hover:text-brand-terracotta transition-colors line-clamp-1">
                              {product.name}
                            </h4>
                            <div className="flex justify-between items-center">
                              <span className="font-sans text-xs text-brand-text-muted">
                                {product.category}
                              </span>
                              <span className="font-sans text-xs font-bold text-brand-brown">
                                {product.price}
                              </span>
                            </div>
                          </div>
                        </motion.div>
                      ))}
                    </motion.div>
                  ) : (
                    <p className="font-serif text-lg italic text-brand-text-muted">
                      &ldquo;No rituals match your current intentions. Try exploring Amber or Bath Salts.&rdquo;
                    </p>
                  )}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
