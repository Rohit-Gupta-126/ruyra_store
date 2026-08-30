"use client";

import { useCart } from "@/lib/context/CartContext";
import { X, Plus, Minus, Lock, ShoppingBag, Heart, Sparkles, Gift } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { useRouter } from "next/navigation";

export default function CartDrawer() {
  const {
    cartItems,
    isCartOpen,
    closeCart,
    updateQuantity,
    removeItem,
    subtotal,
  } = useCart();

  const router = useRouter();

  const freeShippingThreshold = 1999;
  const isFreeShipping = subtotal >= freeShippingThreshold;
  const remainingForFreeShipping = freeShippingThreshold - subtotal;
  const shippingProgress = Math.min((subtotal / freeShippingThreshold) * 100, 100);

  return (
    <AnimatePresence>
      {isCartOpen && (
        <>
          {/* Backdrop Overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeCart}
            className="fixed inset-0 bg-black/40 backdrop-blur-sm z-95"
            aria-hidden="true"
          />

          {/* Slide-out Cart Drawer */}
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", stiffness: 280, damping: 30 }}
            className="fixed top-0 right-0 h-full w-[90%] md:w-[420px] bg-[#FAF7F2] z-100 shadow-2xl flex flex-col text-[#422926]"
          >
            {/* Header Area */}
            <div className="p-6 border-b border-[#EFE7DD] bg-white shrink-0 space-y-4">
              <div className="flex justify-between items-center">
                <h3 className="font-serif text-xl font-bold flex items-center gap-2 text-[#422926]">
                  <ShoppingBag className="w-5 h-5 text-brand-terracotta" />
                  Your Keepsake Bag ♡
                </h3>
                <button
                  onClick={closeCart}
                  className="w-8 h-8 rounded-full bg-[#FAF7F2] hover:bg-brand-rose-light text-[#422926] flex items-center justify-center transition-colors focus:outline-none cursor-pointer"
                  aria-label="Close bag"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              {/* Free Shipping Progress Indicator */}
              <div className="space-y-2">
                <p className="font-sans text-xs text-brand-text-muted">
                  {isFreeShipping ? (
                    <span className="text-brand-sage font-bold flex items-center gap-1">
                      <Sparkles className="w-3.5 h-3.5" />
                      Yay! You qualified for free shipping! ♡
                    </span>
                  ) : (
                    <span>
                      Add{" "}
                      <span className="font-bold text-brand-terracotta">
                        ₹{remainingForFreeShipping.toFixed(0)}
                      </span>{" "}
                      more for free shipping ✨
                    </span>
                  )}
                </p>
                <div className="w-full h-1.5 bg-[#EFE7DD] rounded-full overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${shippingProgress}%` }}
                    transition={{ duration: 0.6, ease: "easeOut" }}
                    className="h-full bg-brand-terracotta rounded-full"
                  />
                </div>
              </div>
            </div>

            {/* Cart Items List */}
            <div className="flex-1 overflow-y-auto p-6 space-y-4 no-scrollbar pb-32">
              {cartItems.length === 0 ? (
                <div className="h-64 flex flex-col items-center justify-center text-center space-y-3">
                  <div className="w-14 h-14 rounded-full bg-brand-rose-light flex items-center justify-center text-brand-terracotta">
                    <Heart className="w-6 h-6 fill-brand-terracotta" />
                  </div>
                  <p className="font-serif text-lg text-[#422926] font-bold">Your bag is empty</p>
                  <p className="font-sans text-xs text-brand-text-muted max-w-xs">
                    Discover our handmade chenille bouquets, adorable charms, and heartfelt gifts.
                  </p>
                  <button
                    onClick={closeCart}
                    className="font-sans text-xs uppercase tracking-widest font-bold text-brand-terracotta pt-2 cursor-pointer"
                  >
                    Start Exploring →
                  </button>
                </div>
              ) : (
                cartItems.map((item, idx) => (
                  <motion.div
                    key={`${item.id}-${item.variant}-${idx}`}
                    layout
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="flex gap-4 p-3.5 rounded-2xl bg-white border border-[#EFE7DD] shadow-xs"
                  >
                    {/* Item Image */}
                    <div className="relative w-20 h-20 rounded-xl overflow-hidden bg-brand-taupe shrink-0">
                      <Image
                        src={item.image}
                        alt={item.name}
                        fill
                        className="object-cover"
                      />
                    </div>

                    {/* Item Details */}
                    <div className="flex-1 flex flex-col justify-between">
                      <div className="flex justify-between items-start gap-2">
                        <div>
                          <h4 className="font-serif text-sm font-bold text-[#422926] line-clamp-1">
                            {item.name}
                          </h4>
                          <span className="font-sans text-[11px] text-brand-terracotta font-medium line-clamp-1">
                            {item.variant}
                          </span>
                        </div>
                        <button
                          onClick={() => removeItem(item.id, item.variant)}
                          className="text-brand-text-muted/60 hover:text-brand-terracotta p-1 focus:outline-none"
                          aria-label="Remove item"
                        >
                          <X className="w-3.5 h-3.5" />
                        </button>
                      </div>

                      <div className="flex justify-between items-center pt-2">
                        <span className="font-sans text-xs font-bold text-[#422926]">
                          {item.price}
                        </span>

                        {/* Quantity controls */}
                        <div className="flex items-center gap-2 border border-[#EFE7DD] rounded-full px-2 py-0.5 bg-[#FAF7F2]">
                          <button
                            onClick={() => updateQuantity(item.id, item.variant, item.quantity - 1)}
                            className="text-[#422926] hover:text-brand-terracotta text-xs font-bold w-4 h-4 flex items-center justify-center focus:outline-none"
                          >
                            <Minus className="w-2.5 h-2.5" />
                          </button>
                          <span className="text-xs font-bold font-sans w-4 text-center">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() => updateQuantity(item.id, item.variant, item.quantity + 1)}
                            className="text-[#422926] hover:text-brand-terracotta text-xs font-bold w-4 h-4 flex items-center justify-center focus:outline-none"
                          >
                            <Plus className="w-2.5 h-2.5" />
                          </button>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))
              )}
            </div>

            {/* Sticky Bottom Summary & Checkout Button */}
            {cartItems.length > 0 && (
              <div className="p-6 border-t border-[#EFE7DD] bg-white space-y-4 shrink-0 shadow-lg">
                <div className="p-2.5 rounded-xl bg-brand-rose-light/50 border border-brand-rose/30 flex items-center gap-2 text-[11px] font-sans text-[#422926]">
                  <Gift className="w-4 h-4 text-brand-terracotta shrink-0" />
                  <span>Plastic-free craft packing & ribbon included ♡</span>
                </div>

                <div className="flex justify-between items-baseline">
                  <span className="font-sans text-xs uppercase tracking-wider text-brand-text-muted font-semibold">
                    Subtotal ({cartItems.reduce((acc, i) => acc + i.quantity, 0)} items)
                  </span>
                  <span className="font-sans text-xl font-bold text-[#422926]">
                    ₹{subtotal.toLocaleString("en-IN")}
                  </span>
                </div>

                <button
                  onClick={() => {
                    closeCart();
                    router.push("/checkout");
                  }}
                  className="w-full py-4 rounded-full bg-brand-terracotta hover:bg-[#B34E59] text-white font-sans text-xs uppercase tracking-widest font-bold flex items-center justify-center gap-2 shadow-md hover:shadow-lg transition-all cursor-pointer"
                >
                  <Lock className="w-3.5 h-3.5" />
                  <span>Proceed to Checkout</span>
                </button>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
