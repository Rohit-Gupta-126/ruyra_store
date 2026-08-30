"use client";

import Image from "next/image";
import { useState } from "react";
import { X, ShoppingBag, Star, RefreshCw, Plus, Check, Heart, Sparkles, Gift } from "lucide-react";
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
    image: "https://images.unsplash.com/photo-1582794543139-8ac9cb0f7b11?q=80&w=600&auto=format&fit=crop",
    reviewText: "The chenille flowers are so plush and soft! Never having to throw flowers away again is amazing.",
    author: "Ananya R."
  },
  {
    image: "https://images.unsplash.com/photo-1563245372-f21724e3856d?q=80&w=600&auto=format&fit=crop",
    reviewText: "Looks so sweet on my study desk! The little woven pot and stand are top quality.",
    author: "Elena V."
  },
  {
    image: "https://images.unsplash.com/photo-1611085583191-a3b181a88401?q=80&w=600&auto=format&fit=crop",
    reviewText: "The charm is adorable. The heart crochet work and pearls are so well crafted.",
    author: "Sneha M."
  },
  {
    image: "https://images.unsplash.com/photo-1549465220-1a8b9238cd48?q=80&w=600&auto=format&fit=crop",
    reviewText: "Sent this gift box to my mom. She cried happy tears! 10/10 packaging.",
    author: "Pooja K."
  }
];

const INITIAL_TEXT_REVIEWS: Record<string, Review[]> = {
  "chenille-tulip-bouquet": [
    {
      rating: 5,
      title: "Pure joy in a bouquet ♡",
      body: "The blush pink chenille velvet is so soft to the touch. It arrived in pristine kraft packaging with a lovely ribbon. Will treasure this forever!",
      reviewer: "Ananya R.",
      verified: true
    },
    {
      rating: 5,
      title: "Best anniversary gift ever",
      body: "My partner loved that these flowers will last forever. No wilting, no pollen allergies, just lovely handmade art.",
      reviewer: "Rohan D.",
      verified: true
    }
  ],
  "crochet-daisy-basket": [
    {
      rating: 5,
      title: "Cozy desk companion",
      body: "The daisies look bright and happy every morning when I start work. The wooden stand holds the basket perfectly.",
      reviewer: "Elena V.",
      verified: true
    }
  ],
  "tulip-heart-bag-charm": [
    {
      rating: 5,
      title: "Obsessed with this charm!",
      body: "I attached it to my canvas tote and everyone asks where I got it. The pearls and mini tulip are high quality.",
      reviewer: "Sneha M.",
      verified: true
    }
  ]
};

export default function ProductSheet() {
  const { sheetState, closeSheet } = useProductSheet();
  const { addItem } = useCart();

  const product = products.find((p) => p.name === sheetState.title) || products[0];

  const [selectedVariant, setSelectedVariant] = useState<string>(
    product.variants ? product.variants[0] : "Standard"
  );
  const [includeGiftNote, setIncludeGiftNote] = useState(false);
  const [giftNoteMessage, setGiftNoteMessage] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState<"craft" | "care" | "reviews">("craft");
  const [isWriteReviewOpen, setIsWriteReviewOpen] = useState(false);
  const [addedAnimation, setAddedAnimation] = useState(false);

  const reviews = INITIAL_TEXT_REVIEWS[product.id] || [
    {
      rating: 5,
      title: "Exceptional handmade quality",
      body: "Handcrafted with so much attention to detail. Packed securely and arrived quickly.",
      reviewer: "Tara S.",
      verified: true
    }
  ];

  const handleAddToCart = () => {
    setAddedAnimation(true);
    for (let i = 0; i < quantity; i++) {
      addItem({
        id: product.id,
        name: product.name,
        price: product.price,
        variant: selectedVariant + (includeGiftNote && giftNoteMessage ? ` (Note: ${giftNoteMessage})` : ""),
        image: product.image,
      });
    }
    setTimeout(() => {
      setAddedAnimation(false);
      closeSheet();
    }, 800);
  };

  return (
    <>
      <AnimatePresence>
        {sheetState.isOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={closeSheet}
              className="fixed inset-0 bg-black/40 backdrop-blur-sm z-90"
              aria-hidden="true"
            />

            {/* Modal / Bottom Sheet */}
            <motion.div
              initial={{ y: "100%", opacity: 0.5 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: "100%", opacity: 0 }}
              transition={{ type: "spring", stiffness: 260, damping: 28 }}
              className="fixed bottom-0 left-0 right-0 max-h-[92vh] md:max-h-[88vh] md:bottom-auto md:top-1/2 md:left-1/2 md:-translate-x-1/2 md:-translate-y-1/2 md:w-full md:max-w-3xl bg-[#FAF7F2] rounded-t-3xl md:rounded-3xl z-100 shadow-2xl overflow-hidden flex flex-col text-[#422926]"
            >
              {/* Header with Close */}
              <div className="p-4 sm:p-6 border-b border-[#EFE7DD] flex items-center justify-between bg-white shrink-0">
                <div className="flex items-center gap-2">
                  <span className="font-sans text-xs uppercase tracking-wider font-bold text-brand-terracotta bg-brand-rose-light px-3 py-1 rounded-full">
                    {product.category}
                  </span>
                  <span className="text-xs text-brand-text-muted hidden sm:inline">
                    • 100% Handcrafted Keepsake
                  </span>
                </div>
                <button
                  onClick={closeSheet}
                  className="w-8 h-8 rounded-full bg-[#FAF7F2] hover:bg-brand-rose-light text-[#422926] hover:text-brand-terracotta flex items-center justify-center transition-colors focus:outline-none cursor-pointer"
                  aria-label="Close details"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              {/* Scrollable Content */}
              <div className="overflow-y-auto p-6 sm:p-8 space-y-6 sm:space-y-8 flex-1 no-scrollbar pb-32 md:pb-8">
                
                {/* Product Hero Info */}
                <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-start">
                  <div className="md:col-span-5 aspect-4/5 rounded-2xl overflow-hidden bg-brand-taupe relative shadow-xs">
                    <Image
                      src={product.image}
                      alt={product.alt}
                      fill
                      className="object-cover"
                      sizes="(max-width: 768px) 100vw, 40vw"
                    />
                  </div>

                  <div className="md:col-span-7 space-y-4 text-left">
                    <div>
                      <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#422926]">
                        {product.name}
                      </h2>
                      <div className="flex items-baseline gap-3 pt-1">
                        <span className="font-sans text-xl sm:text-2xl font-bold text-[#422926]">
                          {product.price}
                        </span>
                        {product.originalPrice && (
                          <span className="font-sans text-sm text-brand-text-muted line-through">
                            {product.originalPrice}
                          </span>
                        )}
                        <span className="text-xs font-sans text-brand-sage font-semibold">
                          In Stock (Handcrafted with love)
                        </span>
                      </div>
                    </div>

                    <p className="font-sans text-xs sm:text-sm text-brand-text-muted leading-relaxed">
                      {product.description}
                    </p>

                    {/* Variant Selector */}
                    {product.variants && product.variants.length > 0 && (
                      <div className="space-y-2 pt-2">
                        <label className="font-sans text-xs font-bold text-[#422926] uppercase tracking-wider block">
                          Select {product.variantType || "Option"}:
                        </label>
                        <div className="flex flex-wrap gap-2">
                          {product.variants.map((variant) => (
                            <button
                              key={variant}
                              onClick={() => setSelectedVariant(variant)}
                              className={`px-3.5 py-1.5 rounded-full text-xs font-sans transition-all cursor-pointer ${
                                selectedVariant === variant
                                  ? "bg-[#422926] text-white font-bold shadow-xs"
                                  : "bg-white text-[#422926] border border-[#EFE7DD] hover:border-brand-rose"
                              }`}
                            >
                              {variant}
                            </button>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Custom Gift Note Option */}
                    <div className="p-3.5 rounded-2xl bg-white border border-[#EFE7DD] space-y-2.5">
                      <label className="flex items-center gap-2 cursor-pointer select-none">
                        <input
                          type="checkbox"
                          checked={includeGiftNote}
                          onChange={(e) => setIncludeGiftNote(e.target.checked)}
                          className="accent-brand-terracotta w-4 h-4 rounded"
                        />
                        <span className="font-sans text-xs font-bold text-[#422926] flex items-center gap-1.5">
                          <Gift className="w-3.5 h-3.5 text-brand-terracotta" />
                          Add Complimentary Handwritten Gift Note ♡
                        </span>
                      </label>

                      {includeGiftNote && (
                        <textarea
                          rows={2}
                          value={giftNoteMessage}
                          onChange={(e) => setGiftNoteMessage(e.target.value)}
                          placeholder="Write your custom message here (e.g. Happy Birthday Sarah! Loved crafting this for you...)"
                          className="w-full text-xs font-sans p-2.5 rounded-xl border border-[#EFE7DD] focus:border-brand-terracotta outline-none bg-[#FAF7F2] resize-none"
                        />
                      )}
                    </div>

                    {/* Quantity & Add to Bag Bar */}
                    <div className="flex items-center gap-3 pt-2">
                      <div className="flex items-center border border-[#EFE7DD] bg-white rounded-full p-1 shadow-xs">
                        <button
                          onClick={() => setQuantity(Math.max(1, quantity - 1))}
                          className="w-8 h-8 rounded-full flex items-center justify-center hover:bg-brand-rose-light text-[#422926] font-bold text-sm"
                        >
                          -
                        </button>
                        <span className="w-8 text-center font-sans text-xs font-bold">
                          {quantity}
                        </span>
                        <button
                          onClick={() => setQuantity(quantity + 1)}
                          className="w-8 h-8 rounded-full flex items-center justify-center hover:bg-brand-rose-light text-[#422926] font-bold text-sm"
                        >
                          +
                        </button>
                      </div>

                      <button
                        onClick={handleAddToCart}
                        disabled={addedAnimation}
                        className={`flex-1 py-3.5 px-6 rounded-full font-sans text-xs sm:text-sm font-bold uppercase tracking-wider flex items-center justify-center gap-2 transition-all shadow-md cursor-pointer ${
                          addedAnimation
                            ? "bg-brand-sage text-white"
                            : "bg-brand-terracotta hover:bg-[#B34E59] text-white hover:shadow-lg"
                        }`}
                      >
                        {addedAnimation ? (
                          <>
                            <Check className="w-4 h-4" />
                            <span>Added to Bag! ♡</span>
                          </>
                        ) : (
                          <>
                            <ShoppingBag className="w-4 h-4" />
                            <span>Add to Bag</span>
                          </>
                        )}
                      </button>
                    </div>

                  </div>
                </div>

                {/* Tabs: Craft Story, Flower Care, Customer Reviews */}
                <div className="space-y-4 pt-4 border-t border-[#EFE7DD]">
                  <div className="flex border-b border-[#EFE7DD] gap-6">
                    <button
                      onClick={() => setActiveTab("craft")}
                      className={`pb-2.5 font-sans text-xs sm:text-sm font-bold uppercase tracking-wider border-b-2 transition-all cursor-pointer ${
                        activeTab === "craft"
                          ? "border-brand-terracotta text-brand-terracotta"
                          : "border-transparent text-brand-text-muted hover:text-[#422926]"
                      }`}
                    >
                      Artisanal Craft
                    </button>
                    <button
                      onClick={() => setActiveTab("care")}
                      className={`pb-2.5 font-sans text-xs sm:text-sm font-bold uppercase tracking-wider border-b-2 transition-all cursor-pointer ${
                        activeTab === "care"
                          ? "border-brand-terracotta text-brand-terracotta"
                          : "border-transparent text-brand-text-muted hover:text-[#422926]"
                      }`}
                    >
                      Care Guide
                    </button>
                    <button
                      onClick={() => setActiveTab("reviews")}
                      className={`pb-2.5 font-sans text-xs sm:text-sm font-bold uppercase tracking-wider border-b-2 transition-all cursor-pointer ${
                        activeTab === "reviews"
                          ? "border-brand-terracotta text-brand-terracotta"
                          : "border-transparent text-brand-text-muted hover:text-[#422926]"
                      }`}
                    >
                      Reviews ({reviews.length})
                    </button>
                  </div>

                  {/* Tab Contents */}
                  {activeTab === "craft" && (
                    <div className="p-4 rounded-2xl bg-white border border-[#EFE7DD] text-xs font-sans text-brand-text-muted space-y-2 leading-relaxed text-left">
                      <p>
                        🌸 <strong>Hand-stitched with care:</strong> Every petal and loop is sculpted individually using high-grade hypoallergenic chenille velvet yarn.
                      </p>
                      <p>
                        ✨ <strong>Everlasting Keepsake:</strong> Unlike fresh cut flowers that fade in days, our blooms stay vibrant forever without any maintenance.
                      </p>
                      <p>
                        🎁 <strong>Eco-Friendly Packaging:</strong> Shipped in plastic-free recyclable kraft wrapping with a hand-tied satin ribbon.
                      </p>
                    </div>
                  )}

                  {activeTab === "care" && (
                    <div className="p-4 rounded-2xl bg-white border border-[#EFE7DD] text-xs font-sans text-brand-text-muted space-y-2 leading-relaxed text-left">
                      <p>• <strong>No Water Needed:</strong> Keep away from moisture and water to preserve yarn softness.</p>
                      <p>• <strong>Gentle Dusting:</strong> If needed, gently tap or blow cool air from a hairdryer to remove light dust.</p>
                      <p>• <strong>Direct Sunlight:</strong> Best displayed indoors away from harsh prolonged UV sunlight to retain rich pastel hues.</p>
                    </div>
                  )}

                  {activeTab === "reviews" && (
                    <div className="space-y-4 text-left">
                      {/* Photo Reviews Strip */}
                      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                        {INITIAL_PHOTO_REVIEWS.map((pr, idx) => (
                          <div key={idx} className="aspect-square relative rounded-xl overflow-hidden bg-brand-taupe">
                            <Image src={pr.image} alt={pr.reviewText} fill className="object-cover" />
                            <div className="absolute inset-0 bg-black/30 p-2 flex flex-col justify-end text-[10px] text-white">
                              <span className="font-bold">{pr.author}</span>
                            </div>
                          </div>
                        ))}
                      </div>

                      {/* Text Reviews */}
                      <div className="space-y-3">
                        {reviews.map((r, idx) => (
                          <div key={idx} className="p-4 rounded-2xl bg-white border border-[#EFE7DD] space-y-1.5">
                            <div className="flex items-center justify-between">
                              <div className="flex text-[#D9A557]">
                                {[...Array(r.rating)].map((_, i) => (
                                  <Star key={i} className="w-3 h-3 fill-[#D9A557]" />
                                ))}
                              </div>
                              <span className="text-[10px] font-sans font-semibold text-brand-sage">
                                Verified Buyer ✓
                              </span>
                            </div>
                            <h4 className="font-serif text-sm font-bold text-[#422926]">{r.title}</h4>
                            <p className="font-sans text-xs text-brand-text-muted">{r.body}</p>
                            <p className="font-sans text-[10px] text-brand-text-muted/70 pt-1">— {r.reviewer}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                </div>

              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      <WriteReviewModal
        isOpen={isWriteReviewOpen}
        onClose={() => setIsWriteReviewOpen(false)}
        onSubmit={() => setIsWriteReviewOpen(false)}
      />
    </>
  );
}
