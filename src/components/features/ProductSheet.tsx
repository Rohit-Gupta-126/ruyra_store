"use client";

import Image from "next/image";
import { useState } from "react";
import { X, ShoppingBag, Star, RefreshCw, Plus, Check } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useProductSheet } from "./ProductSheetContext";
import { products } from "@/lib/data/products";
import { useCart } from "@/lib/context/CartContext";
import WriteReviewModal from "./WriteReviewModal";

interface Review {
  rating: number;
  title: string;
  body: string;
  reviewer: string;
  verified: boolean;
}

interface PhotoReview {
  image: string;
  reviewText: string;
  author: string;
}

const INITIAL_PHOTO_REVIEWS: PhotoReview[] = [
  {
    image: "https://images.unsplash.com/photo-1596436889106-be35e843f974?q=80&w=600&auto=format&fit=crop",
    reviewText: "Creates a warm, calming atmosphere. Absolutely love the amber scent.",
    author: "Julian R."
  },
  {
    image: "https://images.unsplash.com/photo-1602872030267-33a826bc5fe6?q=80&w=600&auto=format&fit=crop",
    reviewText: "The salts dissolved perfectly, leaving a smooth lavender scent. So relaxing.",
    author: "Elena V."
  },
  {
    image: "https://images.unsplash.com/photo-1572945281788-b203c9fb60d1?q=80&w=600&auto=format&fit=crop",
    reviewText: "Fits beautifully in my living room. Handcrafted texture is wonderful.",
    author: "Marc K."
  },
  {
    image: "https://images.unsplash.com/photo-1508746829417-e6f548d8d6ed?q=80&w=600&auto=format&fit=crop",
    reviewText: "A true statement piece. The botanicals look stunning under sunlight.",
    author: "Sophia L."
  }
];

const INITIAL_TEXT_REVIEWS: Record<string, Review[]> = {
  "amber-ritual-candle": [
    {
      rating: 5,
      title: "Pure serenity in a jar",
      body: "The combination of amber and cedarwood is grounding without being overpowering. The slow soy burn is clean, and the jar adds a rustic aesthetic to my mantle.",
      reviewer: "Julian R.",
      verified: true
    },
    {
      rating: 5,
      title: "My evening grounding ritual",
      body: "I light this every evening before meditation. The projection is excellent and it fills the entire room within ten minutes. Absolutely purchasing again.",
      reviewer: "Sarah M.",
      verified: true
    }
  ],
  "ritual-bath-salts": [
    {
      rating: 5,
      title: "Restorative bath sanctuary",
      body: "These lavender salts are the ultimate self-care. The pink Himalayan salt draws out tension and the botanical petals floating in the bath look so beautiful.",
      reviewer: "Elena V.",
      verified: true
    },
    {
      rating: 4,
      title: "Lovely lavender scent",
      body: "Very relaxing and skin feels incredibly soft. The only tiny thing is cleaning the flower petals out of the tub after, but it's worth it for the vibe.",
      reviewer: "Marcus D.",
      verified: true
    }
  ],
  "earthen-taper-holder": [
    {
      rating: 5,
      title: "Stunning craftsmanship",
      body: "I love the natural wabi-sabi imperfections and iron spots on the clay. It holds my tapers firmly and serves as a sculptural accent even when unlit.",
      reviewer: "Marc K.",
      verified: true
    }
  ],
  "resin-adornments": [
    {
      rating: 5,
      title: "An exquisite piece of art",
      body: "The moss and lichen suspended inside the bio-resin block are captured perfectly. It catches the natural morning light beautifully on my windowsill.",
      reviewer: "Sophia L.",
      verified: true
    }
  ]
};

export default function ProductSheet() {
  const { sheetState, closeSheet } = useProductSheet();
  const { isOpen, title, image } = sheetState;

  // Find detailed product info based on title
  const currentProduct = products.find((p) => p.name === title) || products[0];

  // Store selected variants keyed by product ID
  const [selectedVariants, setSelectedVariants] = useState<Record<string, string>>({});
  const [purchaseType, setPurchaseType] = useState<"one-time" | "subscription">("one-time");
  const [frequency, setFrequency] = useState("1 month");

  // Reviews state (scoped per product ID)
  const [customReviews, setCustomReviews] = useState<Record<string, Review[]>>({});
  const [isReviewModalOpen, setIsReviewModalOpen] = useState(false);

  const { addItem, subtotal } = useCart();

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

  const handleAddReview = (newReview: { rating: number; title: string; body: string; reviewer: string }) => {
    if (currentProduct) {
      setCustomReviews((prev) => {
        const existing = prev[currentProduct.id] || [];
        return {
          ...prev,
          [currentProduct.id]: [
            {
              rating: newReview.rating,
              title: newReview.title,
              body: newReview.body,
              reviewer: newReview.reviewer,
              verified: true,
            },
            ...existing,
          ],
        };
      });
    }
  };

  if (!currentProduct) return null;

  // Numerical pricing for subscribe discount calculations
  const basePriceNumeric = parseFloat(currentProduct.price.replace(/[^0-9.]/g, "")) || 0;
  const discountPriceNumeric = basePriceNumeric * 0.9;
  const displayPrice = purchaseType === "one-time"
    ? currentProduct.price
    : `$${discountPriceNumeric.toFixed(2)}`;

  // Find 1-2 complementary products
  const complementaryProducts = products
    .filter((p) => p.id !== currentProduct.id)
    .slice(0, 2);

  // Combine default reviews and custom reviews
  const textReviews = [
    ...(customReviews[currentProduct.id] || []),
    ...(INITIAL_TEXT_REVIEWS[currentProduct.id] || []),
  ];

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
            <div className="flex-1 overflow-y-auto px-6 py-6 space-y-8 no-scrollbar pb-48">
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
                    {displayPrice}
                  </span>
                  <div className="flex items-center gap-1 text-accent-gold ml-2">
                    <Star className="w-4 h-4 fill-accent-gold stroke-accent-gold" />
                    <span className="font-sans text-xs text-text-secondary font-medium">
                      4.9 ({140 + textReviews.length} reviews)
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

              {/* Subscribe & Save Radio-Button Cards */}
              <div className="space-y-3">
                <h4 className="font-sans text-xs font-bold uppercase tracking-wider text-text-secondary">
                  Delivery Options
                </h4>
                <div className="flex flex-col gap-3">
                  {/* Card 1: One-time */}
                  <div
                    onClick={() => setPurchaseType("one-time")}
                    className={`p-4 rounded-2xl border cursor-pointer transition-all duration-300 flex items-center justify-between ${
                      purchaseType === "one-time"
                        ? "border-brand-brown bg-brand-taupe/30"
                        : "border-brand-brown/10 hover:border-brand-brown/30 bg-white"
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div className={`w-4.5 h-4.5 rounded-full border flex items-center justify-center ${
                        purchaseType === "one-time" ? "border-brand-brown" : "border-brand-brown/25"
                      }`}>
                        {purchaseType === "one-time" && (
                          <div className="w-2.5 h-2.5 rounded-full bg-brand-brown" />
                        )}
                      </div>
                      <span className="font-sans text-sm font-semibold">One-Time Purchase</span>
                    </div>
                    <span className="font-sans text-sm font-medium">{currentProduct.price}</span>
                  </div>

                  {/* Card 2: Subscribe & Save */}
                  <div
                    onClick={() => setPurchaseType("subscription")}
                    className={`p-4 rounded-2xl border cursor-pointer transition-all duration-300 flex flex-col gap-3 ${
                      purchaseType === "subscription"
                        ? "border-brand-brown bg-brand-taupe/30"
                        : "border-brand-brown/10 hover:border-brand-brown/30 bg-white"
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className={`w-4.5 h-4.5 rounded-full border flex items-center justify-center ${
                          purchaseType === "subscription" ? "border-brand-brown" : "border-brand-brown/25"
                        }`}>
                          {purchaseType === "subscription" && (
                            <div className="w-2.5 h-2.5 rounded-full bg-brand-brown" />
                          )}
                        </div>
                        <div className="flex flex-col text-left">
                          <span className="font-sans text-sm font-semibold">Subscribe & Save 10%</span>
                          <span className="text-[10px] text-brand-text-muted">Eco-friendly auto-ship, cancel anytime</span>
                        </div>
                      </div>
                      <span className="font-sans text-sm font-bold text-brand-terracotta">
                        ${discountPriceNumeric.toFixed(2)}
                      </span>
                    </div>

                    {purchaseType === "subscription" && (
                      <motion.div 
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        className="pt-3 border-t border-brand-brown/10 flex items-center justify-between" 
                        onClick={(e) => e.stopPropagation()}
                      >
                        <span className="font-sans text-[11px] text-brand-text-muted">Delivery frequency:</span>
                        <select
                          value={frequency}
                          onChange={(e) => setFrequency(e.target.value)}
                          className="bg-white border border-brand-brown/10 rounded-lg px-2 py-1 font-sans text-xs focus:outline-none"
                        >
                          <option value="1 month">Deliver every 1 month</option>
                          <option value="2 months">Deliver every 2 months</option>
                          <option value="3 months">Deliver every 3 months</option>
                        </select>
                      </motion.div>
                    )}
                  </div>
                </div>
              </div>

              {/* Eco details / brand strip */}
              <div className="bg-bg-surface rounded-2xl p-4 flex flex-col gap-3">
                <div className="flex items-center gap-3 text-accent-primary">
                  <RefreshCw className="w-4 h-4 animate-spin-slow" />
                  <span className="font-sans text-xs font-medium">Plastic-free packaging & climate-neutral shipping</span>
                </div>
              </div>

              {/* "Frequently Paired With" Cross-Sell */}
              <div className="space-y-4 pt-4 border-t border-brand-brown/10">
                <h3 className="font-serif text-lg font-bold text-brand-brown">Complete the Ritual</h3>
                <div className="flex flex-col gap-3">
                  {complementaryProducts.map((item) => (
                    <div
                      key={item.id}
                      className="flex items-center justify-between p-3.5 bg-brand-taupe/20 border border-brand-brown/5 rounded-2xl hover:bg-brand-taupe/35 transition-colors duration-200"
                    >
                      <div className="flex items-center gap-3.5">
                        <div className="relative w-12 h-12 rounded-xl overflow-hidden bg-brand-taupe flex-shrink-0">
                          <Image
                            src={item.image}
                            alt={item.name}
                            fill
                            className="object-cover"
                            sizes="48px"
                          />
                        </div>
                        <div className="text-left">
                          <h4 className="font-sans text-xs font-semibold text-brand-brown leading-snug">
                            {item.name}
                          </h4>
                          <span className="font-sans text-[11px] text-brand-text-muted">
                            {item.price}
                          </span>
                        </div>
                      </div>
                      <motion.button
                        whileHover={{ scale: 1.08 }}
                        whileTap={{ scale: 0.92 }}
                        onClick={() => {
                          addItem({
                            id: item.id,
                            name: item.name,
                            price: item.price,
                            variant: item.variants[0],
                            image: item.image,
                          });
                        }}
                        className="w-8 h-8 rounded-full border border-brand-brown text-brand-brown hover:bg-brand-brown hover:text-brand-sand flex items-center justify-center transition-colors focus:outline-none"
                        aria-label={`Add ${item.name}`}
                      >
                        <Plus className="w-4 h-4" />
                      </motion.button>
                    </div>
                  ))}
                </div>
              </div>

              {/* "Words from the Sanctuary" Reviews (Trust Engine) */}
              <div className="pt-8 border-t border-brand-brown/10 space-y-6">
                {/* Header Summary */}
                <div className="flex items-start justify-between">
                  <div className="space-y-1 text-left">
                    <h3 className="font-serif text-2xl font-bold text-brand-brown">
                      Words from the Sanctuary
                    </h3>
                    <div className="flex items-center gap-2">
                      <div className="flex items-center gap-0.5 text-accent-primary">
                        {[1, 2, 3, 4, 5].map((i) => (
                          <Star key={i} className="w-3.5 h-3.5 fill-brand-terracotta stroke-brand-terracotta" />
                        ))}
                      </div>
                      <span className="font-sans text-[11px] text-brand-text-muted">
                        4.9 / 5 • {140 + textReviews.length} reviews
                      </span>
                    </div>
                  </div>
                  <button
                    onClick={() => setIsReviewModalOpen(true)}
                    className="border border-brand-brown text-brand-brown hover:bg-brand-brown hover:text-brand-sand font-sans text-[10px] tracking-wider uppercase font-semibold px-4 py-2 rounded-full transition-all focus:outline-none cursor-pointer"
                  >
                    Write a Review
                  </button>
                </div>

                {/* Photo Reviews Carousel */}
                <div className="space-y-2 text-left">
                  <h4 className="font-sans text-[10px] font-bold uppercase tracking-wider text-brand-text-muted">
                    Community Moments
                  </h4>
                  <div className="flex gap-4 overflow-x-auto pb-4 no-scrollbar scroll-smooth snap-x snap-mandatory">
                    {INITIAL_PHOTO_REVIEWS.map((photo, i) => (
                      <div
                        key={i}
                        className="w-[200px] h-[250px] rounded-2xl overflow-hidden relative group flex-shrink-0 snap-start bg-brand-taupe shadow-md"
                      >
                        <Image
                          src={photo.image}
                          alt={`Lifestyle upload by ${photo.author}`}
                          fill
                          className="object-cover transition-transform duration-700 group-hover:scale-105"
                          sizes="200px"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-4 text-left pointer-events-none">
                          <p className="text-white font-sans text-xs leading-relaxed mb-1 line-clamp-4 transform translate-y-3 group-hover:translate-y-0 transition-transform duration-300">
                            &ldquo;{photo.reviewText}&rdquo;
                          </p>
                          <span className="text-white/80 font-sans text-[9px] uppercase tracking-wider">
                            — {photo.author}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Detailed Text Reviews List */}
                <div className="space-y-4 divide-y divide-brand-brown/5 text-left">
                  {textReviews.map((review, idx) => (
                    <div key={idx} className={`${idx > 0 ? "pt-4" : ""} space-y-1.5`}>
                      <div className="flex justify-between items-center">
                        <div className="flex items-center gap-0.5 text-accent-primary">
                          {[1, 2, 3, 4, 5].map((i) => (
                            <Star
                              key={i}
                              className={`w-3 h-3 ${
                                i <= review.rating
                                  ? "fill-brand-terracotta stroke-brand-terracotta"
                                  : "text-brand-brown/15"
                              }`}
                            />
                          ))}
                        </div>
                        <div className="flex items-center gap-1 bg-[#D1E7DD] text-[#0F5132] px-2 py-0.5 rounded-full">
                          <Check className="w-2.5 h-2.5" />
                          <span className="font-sans text-[9px] font-semibold uppercase tracking-wider">
                            Verified Buyer
                          </span>
                        </div>
                      </div>
                      <h4 className="font-sans text-sm font-semibold text-brand-brown">
                        {review.title}
                      </h4>
                      <p className="font-sans text-xs text-brand-text-muted leading-relaxed max-w-2xl font-light">
                        {review.body}
                      </p>
                      <span className="block font-sans text-[10px] text-brand-brown/60">
                        — {review.reviewer}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Sticky Bottom CTA */}
            <div className="absolute bottom-0 left-0 right-0 bg-brand-sand/95 border-t border-brand-brown/5 px-6 py-5 flex-shrink-0 z-10">
              {/* Shipping Motivator */}
              <div className="mb-3.5 space-y-1.5 text-left">
                <div className="flex justify-between text-[11px] font-medium font-sans">
                  {subtotal >= 75 ? (
                    <span className="text-brand-terracotta font-semibold">You qualify for complimentary shipping! 🚚</span>
                  ) : (
                    <span>
                      Add <span className="font-bold text-brand-terracotta">${(75 - subtotal).toFixed(2)}</span> to unlock free shipping
                    </span>
                  )}
                  <span className="text-brand-text-muted">{Math.min(Math.round((subtotal / 75) * 100), 100)}%</span>
                </div>
                <div className="w-full h-1 bg-brand-taupe rounded-full overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${Math.min((subtotal / 75) * 100, 100)}%` }}
                    transition={{ duration: 0.5, ease: "easeOut" }}
                    className="h-full bg-brand-terracotta"
                  />
                </div>
              </div>

              <motion.button
                id="add-to-bag-btn"
                suppressHydrationWarning
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="w-full bg-accent-primary hover:bg-opacity-95 text-white py-4 rounded-full font-sans text-xs uppercase tracking-widest font-semibold flex items-center justify-center gap-2 shadow-xl shadow-accent-primary/10 hover:shadow-accent-primary/20 transition-all focus:outline-none cursor-pointer"
                onClick={() => {
                  addItem({
                    id: currentProduct.id,
                    name: title,
                    price: displayPrice,
                    variant: selectedVariant,
                    image: image || currentProduct.image,
                    isSubscription: purchaseType === "subscription",
                    frequency: purchaseType === "subscription" ? frequency : undefined,
                  });
                  closeSheet();
                }}
              >
                <ShoppingBag className="w-4 h-4 stroke-[2]" />
                Add to Bag — {displayPrice}
              </motion.button>
            </div>
          </motion.div>

          {/* Write Review Form Overlay */}
          <WriteReviewModal
            isOpen={isReviewModalOpen}
            onClose={() => setIsReviewModalOpen(false)}
            onSubmit={handleAddReview}
          />
        </>
      )}
    </AnimatePresence>
  );
}
