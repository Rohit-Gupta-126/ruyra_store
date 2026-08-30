"use client";

import { useState, useMemo, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { SlidersHorizontal, X, ArrowUpDown, Search, Sparkles, Heart, Flower2, Gift, Home, PenTool } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { products, Product } from "@/lib/data/products";
import { useProductSheet } from "@/components/features/ProductSheetContext";
import { useCart } from "@/lib/context/CartContext";
import ProductCard from "@/components/features/ProductCard";
import Footer from "@/components/layout/Footer";

const CATEGORIES = [
  { id: "all", label: "All Creations" },
  { id: "Blooms", label: "Blooms", icon: Flower2 },
  { id: "Charms", label: "Charms", icon: Sparkles },
  { id: "Gifts", label: "Gifts", icon: Gift },
  { id: "Décor", label: "Décor", icon: Home },
  { id: "Custom Creations", label: "Custom", icon: PenTool },
];

function ShopContent() {
  const searchParams = useSearchParams();
  const initialCategory = searchParams.get("category");

  const { openSheet } = useProductSheet();
  const { addItem } = useCart();

  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [sortBy, setSortBy] = useState<"default" | "price-asc" | "price-desc">("default");
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    if (initialCategory) {
      setSelectedCategory(initialCategory);
    }
  }, [initialCategory]);

  const handleClearAll = () => {
    setSelectedCategory("all");
    setSortBy("default");
    setSearchQuery("");
  };

  const filteredProducts = useMemo(() => {
    let result = [...products];

    if (searchQuery.trim() !== "") {
      const q = searchQuery.toLowerCase();
      result = result.filter(
        (prod) =>
          prod.name.toLowerCase().includes(q) ||
          prod.category.toLowerCase().includes(q) ||
          prod.description.toLowerCase().includes(q)
      );
    }

    if (selectedCategory !== "all") {
      result = result.filter((prod) => prod.category === selectedCategory);
    }

    if (sortBy === "price-asc") {
      result.sort((a, b) => {
        const priceA = parseFloat(a.price.replace(/[^0-9.]/g, ""));
        const priceB = parseFloat(b.price.replace(/[^0-9.]/g, ""));
        return priceA - priceB;
      });
    } else if (sortBy === "price-desc") {
      result.sort((a, b) => {
        const priceA = parseFloat(a.price.replace(/[^0-9.]/g, ""));
        const priceB = parseFloat(b.price.replace(/[^0-9.]/g, ""));
        return priceB - priceA;
      });
    }

    return result;
  }, [selectedCategory, sortBy, searchQuery]);

  return (
    <main className="min-h-screen bg-[#FAF7F2] text-[#422926]">
      {/* Header Banner */}
      <div className="bg-[#FAF7F2] py-12 md:py-16 px-6 md:px-12 border-b border-[#EFE7DD] text-center space-y-3">
        <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-brand-rose-light text-brand-terracotta text-xs font-sans font-semibold">
          <Heart className="w-3 h-3 fill-brand-terracotta" />
          <span>HANDMADE WITH LOVE. KEPT FOREVER. ♡</span>
        </div>
        <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-[#422926]">
          Handcrafted <span className="font-script text-4xl sm:text-5xl md:text-6xl text-brand-terracotta">Blooms & Gifts</span>
        </h1>
        <p className="font-sans text-xs sm:text-sm text-brand-text-muted max-w-lg mx-auto">
          Explore our collection of eternal chenille flower creations, adorable bag charms, and bespoke gifts.
        </p>
      </div>

      {/* Filter and Control Bar */}
      <div className="max-w-7xl mx-auto px-6 md:px-12 py-8 space-y-6">
        
        {/* Category Pills & Search */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          {/* Category Tabs */}
          <div className="flex flex-wrap items-center gap-2 w-full md:w-auto overflow-x-auto no-scrollbar pb-2 md:pb-0">
            {CATEGORIES.map((cat) => {
              const isSelected = selectedCategory === cat.id;
              return (
                <button
                  key={cat.id}
                  onClick={() => setSelectedCategory(cat.id)}
                  className={`px-4 py-2 rounded-full text-xs font-sans font-semibold tracking-wider transition-all duration-300 flex items-center gap-1.5 whitespace-nowrap cursor-pointer ${
                    isSelected
                      ? "bg-[#422926] text-white shadow-xs"
                      : "bg-white text-[#422926]/75 border border-[#EFE7DD] hover:border-brand-rose hover:text-[#422926]"
                  }`}
                >
                  {cat.icon && <cat.icon className="w-3.5 h-3.5" />}
                  <span>{cat.label}</span>
                </button>
              );
            })}
          </div>

          {/* Search & Sort Controls */}
          <div className="flex items-center gap-3 w-full md:w-auto justify-end">
            <div className="relative flex-1 md:w-60">
              <Search className="w-4 h-4 text-brand-text-muted/60 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Search..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-9 pr-4 py-2 rounded-full bg-white border border-[#EFE7DD] text-xs font-sans text-[#422926] focus:border-brand-terracotta outline-none shadow-xs"
              />
            </div>

            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as any)}
              className="py-2 px-3.5 rounded-full bg-white border border-[#EFE7DD] text-xs font-sans text-[#422926] font-semibold focus:border-brand-terracotta outline-none shadow-xs cursor-pointer"
            >
              <option value="default">Featured</option>
              <option value="price-asc">Price: Low to High</option>
              <option value="price-desc">Price: High to Low</option>
            </select>
          </div>
        </div>

        {/* Active Filter summary */}
        {(selectedCategory !== "all" || searchQuery !== "") && (
          <div className="flex items-center gap-2 pt-2 text-xs font-sans text-brand-text-muted">
            <span>Showing {filteredProducts.length} creations</span>
            <button
              onClick={handleClearAll}
              className="text-brand-terracotta font-semibold hover:underline cursor-pointer ml-2"
            >
              Reset Filters
            </button>
          </div>
        )}

        {/* Product Grid */}
        {filteredProducts.length > 0 ? (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6 pt-4">
            {filteredProducts.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                onOpenDetails={(p) => openSheet(p.name, p.image, p.price)}
                onQuickAdd={(p) =>
                  addItem({
                    id: p.id,
                    name: p.name,
                    price: p.price,
                    variant: p.variants[0],
                    image: p.image,
                  })
                }
              />
            ))}
          </div>
        ) : (
          <div className="py-20 text-center space-y-4 bg-white rounded-3xl border border-[#EFE7DD] p-8">
            <div className="w-14 h-14 rounded-full bg-brand-rose-light flex items-center justify-center text-brand-terracotta mx-auto">
              <Flower2 className="w-6 h-6" />
            </div>
            <h3 className="font-serif text-xl font-bold text-[#422926]">
              No creations found
            </h3>
            <p className="font-sans text-xs text-brand-text-muted max-w-sm mx-auto">
              We couldn&apos;t find any handmade items matching your selection. Try clearing filters to see all blooms and charms.
            </p>
            <button
              onClick={handleClearAll}
              className="px-6 py-2.5 rounded-full bg-brand-terracotta text-white font-sans text-xs font-bold uppercase tracking-wider"
            >
              Show All Creations
            </button>
          </div>
        )}

      </div>

      <Footer />
    </main>
  );
}

export default function ShopPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-[#FAF7F2] flex items-center justify-center font-sans text-xs text-brand-text-muted">Loading CHISÓ Shop...</div>}>
      <ShopContent />
    </Suspense>
  );
}
