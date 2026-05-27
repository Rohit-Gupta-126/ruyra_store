"use client";

import { useState, useMemo } from "react";
import { SlidersHorizontal, X, ArrowUpDown, HelpCircle } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { products } from "@/lib/data/products";
import { useProductSheet } from "@/components/features/ProductSheetContext";
import { useCart } from "@/lib/context/CartContext";
import ProductCard from "@/components/features/ProductCard";
import Footer from "@/components/layout/Footer";

// Types mapping for category and scent
const RITUAL_TYPES = [
  { label: "Candles", category: "Home Fragrance" },
  { label: "Bath", category: "Bath & Body" },
  { label: "Resin", category: "Adornments" },
  { label: "Gift Sets", category: "Gift Sets" }
];

const SCENT_PROFILES = [
  { label: "Woody", productIds: ["amber-ritual-candle", "resin-adornments"] },
  { label: "Floral", productIds: ["ritual-bath-salts"] },
  { label: "Citrus", productIds: ["resin-adornments"] },
  { label: "Earth", productIds: ["earthen-taper-holder"] }
];

export default function ShopPage() {
  const { openSheet } = useProductSheet();
  const { addItem } = useCart();

  // Filter states
  const [selectedTypes, setSelectedTypes] = useState<string[]>([]);
  const [selectedScents, setSelectedScents] = useState<string[]>([]);
  const [sortBy, setSortBy] = useState<"default" | "price-asc" | "price-desc">("default");
  
  // Mobile filter drawer state
  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);

  // Accordion states (desktop)
  const [isTypeExpanded, setIsTypeExpanded] = useState(true);
  const [isScentExpanded, setIsScentExpanded] = useState(true);

  // Toggle handlers
  const handleTypeToggle = (type: string) => {
    setSelectedTypes(prev =>
      prev.includes(type) ? prev.filter(t => t !== type) : [...prev, type]
    );
  };

  const handleScentToggle = (scent: string) => {
    setSelectedScents(prev =>
      prev.includes(scent) ? prev.filter(s => s !== scent) : [...prev, scent]
    );
  };

  const handleClearAll = () => {
    setSelectedTypes([]);
    setSelectedScents([]);
    setSortBy("default");
  };

  // Filter & Sort Logic
  const filteredProducts = useMemo(() => {
    let result = [...products];

    // Filter by type
    if (selectedTypes.length > 0) {
      const activeCategories = selectedTypes.map(
        t => RITUAL_TYPES.find(item => item.label === t)?.category
      );
      result = result.filter(prod => activeCategories.includes(prod.category));
    }

    // Filter by scent
    if (selectedScents.length > 0) {
      const activeProductIds = selectedScents.flatMap(
        s => SCENT_PROFILES.find(item => item.label === s)?.productIds || []
      );
      result = result.filter(prod => activeProductIds.includes(prod.id));
    }

    // Sorting
    if (sortBy === "price-asc") {
      result.sort((a, b) => {
        const priceA = parseFloat(a.price.replace("$", ""));
        const priceB = parseFloat(b.price.replace("$", ""));
        return priceA - priceB;
      });
    } else if (sortBy === "price-desc") {
      result.sort((a, b) => {
        const priceA = parseFloat(a.price.replace("$", ""));
        const priceB = parseFloat(b.price.replace("$", ""));
        return priceB - priceA;
      });
    }

    return result;
  }, [selectedTypes, selectedScents, sortBy]);

  // Framer Motion variants
  const gridContainerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.08,
        delayChildren: 0.1
      }
    }
  } as const;
  return (
    <div className="bg-bg-primary text-text-primary min-h-screen flex flex-col">
      
      {/* ── Page Header (Static top header under Navigation) ── */}
      <div className="bg-bg-primary border-b border-bg-surface pt-12 pb-8 px-6 md:px-12">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div className="space-y-2">
            <h1 className="font-serif text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold leading-tight">
              All Adornments & Rituals
            </h1>
            <p className="font-sans text-xs uppercase tracking-widest text-text-secondary">
              Filter by intention or scent profile
            </p>
          </div>
          
          {/* Sorting Dropdown */}
          <div className="flex items-center gap-2 self-start md:self-end">
            <ArrowUpDown className="w-4 h-4 text-text-secondary" />
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as "default" | "price-asc" | "price-desc")}
              className="bg-transparent font-sans text-xs tracking-wider uppercase font-semibold text-text-primary focus:outline-none cursor-pointer border-b border-text-primary/10 pb-1"
            >
              <option value="default">Default Sorting</option>
              <option value="price-asc">Price: Low to High</option>
              <option value="price-desc">Price: High to Low</option>
            </select>
          </div>
        </div>

        {/* Active Filters Tag Bar */}
        {(selectedTypes.length > 0 || selectedScents.length > 0) && (
          <motion.div 
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-7xl mx-auto mt-6 flex flex-wrap items-center gap-3 border-t border-bg-surface/55 pt-4"
          >
            <span className="font-sans text-[10px] tracking-wider uppercase font-bold text-text-secondary">
              Active Filters:
            </span>
            
            {/* Ritual Type Tags */}
            {selectedTypes.map(t => (
              <button
                key={t}
                onClick={() => handleTypeToggle(t)}
                className="bg-bg-surface text-text-primary px-3 py-1 rounded-full text-xs flex items-center gap-1.5 hover:text-accent-secondary transition-colors focus:outline-none"
              >
                {t} <X className="w-3 h-3" />
              </button>
            ))}

            {/* Scent Profile Tags */}
            {selectedScents.map(s => (
              <button
                key={s}
                onClick={() => handleScentToggle(s)}
                className="bg-bg-surface text-text-primary px-3 py-1 rounded-full text-xs flex items-center gap-1.5 hover:text-accent-secondary transition-colors focus:outline-none"
              >
                {s} <X className="w-3 h-3" />
              </button>
            ))}

            <button
              onClick={handleClearAll}
              className="font-sans text-xs tracking-wider text-accent-secondary hover:text-accent-primary font-medium border-b border-accent-secondary/20 pb-0.5 ml-2 focus:outline-none"
            >
              Clear All
            </button>
          </motion.div>
        )}
      </div>

      {/* ── Main Catalog Layout ── */}
      <div className="max-w-7xl mx-auto w-full px-6 md:px-12 py-24 flex-1 flex gap-12 relative">
        
        {/* ── Desktop Filters Sidebar (md+) ── */}
        <aside className="w-64 shrink-0 sticky top-24 h-[calc(100vh-140px)] overflow-y-auto pr-6 hidden md:block no-scrollbar space-y-8">
          
          {/* Ritual Type Accordion */}
          <div className="space-y-4">
            <button
              onClick={() => setIsTypeExpanded(!isTypeExpanded)}
              className="w-full flex justify-between items-center py-2 font-serif text-lg text-text-primary border-b border-bg-surface focus:outline-none font-bold"
            >
              <span>Ritual Type</span>
              <span className="font-sans text-xs text-text-secondary">{isTypeExpanded ? "−" : "+"}</span>
            </button>
            
            <AnimatePresence initial={false}>
              {isTypeExpanded && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  className="overflow-hidden flex flex-wrap gap-2.5 pt-1"
                >
                  {RITUAL_TYPES.map(t => {
                    const isActive = selectedTypes.includes(t.label);
                    return (
                      <button
                        key={t.label}
                        onClick={() => handleTypeToggle(t.label)}
                        className={`px-4 py-2 rounded-full font-sans text-xs tracking-wider border transition-colors focus:outline-none ${
                          isActive
                            ? "bg-accent-primary border-accent-primary text-white font-medium"
                            : "bg-white border-gray-200 text-text-secondary hover:border-text-primary/30"
                        }`}
                      >
                        {t.label}
                      </button>
                    );
                  })}
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Scent Profile Accordion */}
          <div className="space-y-4">
            <button
              onClick={() => setIsScentExpanded(!isScentExpanded)}
              className="w-full flex justify-between items-center py-2 font-serif text-lg text-text-primary border-b border-bg-surface focus:outline-none font-bold"
            >
              <span>Scent Profile</span>
              <span className="font-sans text-xs text-text-secondary">{isScentExpanded ? "−" : "+"}</span>
            </button>
            
            <AnimatePresence initial={false}>
              {isScentExpanded && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  className="overflow-hidden flex flex-wrap gap-2.5 pt-1"
                >
                  {SCENT_PROFILES.map(s => {
                    const isActive = selectedScents.includes(s.label);
                    return (
                      <button
                        key={s.label}
                        onClick={() => handleScentToggle(s.label)}
                        className={`px-4 py-2 rounded-full font-sans text-xs tracking-wider border transition-colors focus:outline-none ${
                          isActive
                            ? "bg-accent-primary border-accent-primary text-white font-medium"
                            : "bg-white border-gray-200 text-text-secondary hover:border-text-primary/30"
                        }`}
                      >
                        {s.label}
                      </button>
                    );
                  })}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </aside>

        {/* ── Catalog Product Grid ── */}
        <div className="flex-1">
          {filteredProducts.length === 0 ? (
            <div className="py-24 text-center space-y-4">
              <HelpCircle className="w-12 h-12 text-text-secondary/40 mx-auto" />
              <p className="font-serif text-xl italic text-text-secondary">No rituals match your current intentions.</p>
              <button
                onClick={handleClearAll}
                className="px-6 py-2.5 bg-accent-primary text-white rounded-full font-sans text-xs uppercase tracking-widest font-semibold hover:bg-opacity-95 transition-all"
              >
                Show All Products
              </button>
            </div>
          ) : (
            <motion.div
              variants={gridContainerVariants}
              initial="hidden"
              animate="show"
              key={`${selectedTypes.join("-")}-${selectedScents.join("-")}-${sortBy}`}
              className="grid grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 md:gap-8"
            >
              {filteredProducts.map((product) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  onOpenDetails={(prod) => openSheet(prod.name, prod.image, prod.price)}
                  onQuickAdd={(prod) =>
                    addItem({
                      id: prod.id,
                      name: prod.name,
                      price: prod.price,
                      variant: prod.variants[0],
                      image: prod.image,
                    })
                  }
                />
              ))}
            </motion.div>
          )}
        </div>
      </div>

      {/* ── Mobile Floating Filter Button & Bottom Sheet Modal ── */}
      <div className="fixed bottom-24 left-1/2 -translate-x-1/2 z-40 md:hidden">
        <motion.button
          id="mobile-filter-trigger"
          suppressHydrationWarning
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setIsMobileFilterOpen(true)}
          className="bg-accent-primary text-white px-6 py-3 rounded-full shadow-xl flex items-center gap-2 font-sans text-xs tracking-widest uppercase font-semibold hover:bg-opacity-95 focus:outline-none"
        >
          <SlidersHorizontal className="w-4 h-4" />
          Filter & Sort
        </motion.button>
      </div>

      {/* Mobile Filter Drawer (Bottom Sheet) */}
      <AnimatePresence>
        {isMobileFilterOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsMobileFilterOpen(false)}
              className="fixed inset-0 bg-black/45 backdrop-blur-sm z-55 md:hidden"
              aria-hidden="true"
            />

            {/* Bottom Sheet Modal */}
            <motion.div
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              exit={{ y: "100%" }}
              transition={{ type: "spring", stiffness: 220, damping: 25 }}
              className="fixed inset-x-0 bottom-0 h-[80vh] bg-bg-primary rounded-t-3xl shadow-2xl z-60 p-6 flex flex-col text-text-primary md:hidden overflow-hidden"
            >
              {/* Drag Handle */}
              <div 
                className="w-full flex justify-center py-2 cursor-pointer shrink-0"
                onClick={() => setIsMobileFilterOpen(false)}
              >
                <div className="w-12 h-1.5 bg-gray-300 rounded-full" />
              </div>

              {/* Header */}
              <div className="flex justify-between items-center border-b border-bg-surface pb-4 pt-2 shrink-0">
                <h3 className="font-serif text-xl font-bold">Filter Sanctuary</h3>
                <button
                  onClick={() => setIsMobileFilterOpen(false)}
                  className="w-8 h-8 rounded-full bg-bg-surface flex items-center justify-center text-text-secondary focus:outline-none"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              {/* Scrollable filters */}
              <div className="flex-1 overflow-y-auto py-6 space-y-8 pr-1 no-scrollbar">
                
                {/* Ritual Types */}
                <div className="space-y-3">
                  <h4 className="font-sans text-xs font-bold uppercase tracking-wider text-text-secondary">
                    Ritual Type
                  </h4>
                  <div className="flex flex-wrap gap-2.5">
                    {RITUAL_TYPES.map(t => {
                      const isActive = selectedTypes.includes(t.label);
                      return (
                        <button
                          key={t.label}
                          onClick={() => handleTypeToggle(t.label)}
                          className={`px-4 py-2.5 rounded-full font-sans text-xs tracking-wider border transition-colors focus:outline-none ${
                            isActive
                              ? "bg-accent-primary border-accent-primary text-white font-medium"
                              : "bg-white border-gray-200 text-text-secondary"
                          }`}
                        >
                          {t.label}
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Scent Profiles */}
                <div className="space-y-3">
                  <h4 className="font-sans text-xs font-bold uppercase tracking-wider text-text-secondary">
                    Scent Profile
                  </h4>
                  <div className="flex flex-wrap gap-2.5">
                    {SCENT_PROFILES.map(s => {
                      const isActive = selectedScents.includes(s.label);
                      return (
                        <button
                          key={s.label}
                          onClick={() => handleScentToggle(s.label)}
                          className={`px-4 py-2.5 rounded-full font-sans text-xs tracking-wider border transition-colors focus:outline-none ${
                            isActive
                              ? "bg-accent-primary border-accent-primary text-white font-medium"
                              : "bg-white border-gray-200 text-text-secondary"
                          }`}
                        >
                          {s.label}
                        </button>
                      );
                    })}
                  </div>
                </div>

              </div>

              {/* Sticky bottom modal action buttons */}
              <div className="pt-4 border-t border-bg-surface flex gap-4 shrink-0">
                <button
                  onClick={handleClearAll}
                  className="flex-1 py-3.5 bg-bg-surface text-text-primary rounded-full font-sans text-xs uppercase tracking-widest font-semibold focus:outline-none hover:bg-gray-200 transition-colors"
                >
                  Clear All
                </button>
                <button
                  onClick={() => setIsMobileFilterOpen(false)}
                  className="flex-1 py-3.5 bg-accent-primary text-white rounded-full font-sans text-xs uppercase tracking-widest font-semibold focus:outline-none hover:bg-opacity-90 transition-colors"
                >
                  Apply Filters ({filteredProducts.length})
                </button>
              </div>

            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Brand Tagline Ribbon (Shop Page) */}
      <div className="w-full bg-bg-primary">
        <Footer />
      </div>
    </div>
  );
}
