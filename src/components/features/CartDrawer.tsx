"use client";

import { useCart } from "@/lib/context/CartContext";
import { X, Plus, Minus, Lock, ShoppingBag } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";

export default function CartDrawer() {
  const {
    cartItems,
    isCartOpen,
    closeCart,
    updateQuantity,
    removeItem,
    subtotal,
  } = useCart();

  const freeShippingThreshold = 75;
  const isFreeShipping = subtotal >= freeShippingThreshold;
  const remainingForFreeShipping = freeShippingThreshold - subtotal;
  const shippingProgress = Math.min((subtotal / freeShippingThreshold) * 100, 100);

  return (
    <AnimatePresence>
      {isCartOpen && (
        <>
          {/* Backdrop Blur Overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeCart}
            className="fixed inset-0 bg-black/40 backdrop-blur-sm z-[95]"
            aria-hidden="true"
          />

          {/* Slide-out Cart Drawer */}
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", stiffness: 260, damping: 30 }}
            className="fixed top-0 right-0 h-full w-[90%] md:w-[450px] bg-bg-primary z-[100] shadow-2xl flex flex-col text-text-primary"
          >
            {/* Header Area */}
            <div className="p-6 border-b border-bg-surface flex-shrink-0 space-y-4">
              <div className="flex justify-between items-center">
                <h3 className="font-serif text-2xl font-bold flex items-center gap-2">
                  <ShoppingBag className="w-5 h-5 text-accent-primary" />
                  Your Sanctuary Bag
                </h3>
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={closeCart}
                  className="w-8 h-8 rounded-full bg-bg-surface flex items-center justify-center text-text-secondary hover:text-text-primary transition-colors focus:outline-none"
                  aria-label="Close cart"
                >
                  <X className="w-4 h-4" />
                </motion.button>
              </div>

              {/* Free Shipping Progress Indicator */}
              <div className="space-y-2">
                <p className="font-sans text-xs text-text-secondary">
                  {isFreeShipping ? (
                    <span className="text-accent-primary font-medium">You qualify for complimentary shipping!</span>
                  ) : (
                    <span>
                      You are{" "}
                      <span className="font-bold text-accent-secondary">
                        ${remainingForFreeShipping.toFixed(2)}
                      </span>{" "}
                      away from complimentary shipping.
                    </span>
                  )}
                </p>
                <div className="w-full h-1 bg-bg-surface rounded-full overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${shippingProgress}%` }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                    className="h-full bg-accent-secondary"
                  />
                </div>
              </div>
            </div>

            {/* Cart Items List */}
            <div className="flex-1 overflow-y-auto p-6 space-y-6 no-scrollbar pb-40">
              {cartItems.length === 0 ? (
                <div className="h-48 flex flex-col items-center justify-center text-center space-y-3">
                  <p className="font-serif text-lg text-text-secondary italic">Your bag is empty.</p>
                  <button
                    onClick={closeCart}
                    className="font-sans text-xs uppercase tracking-widest font-semibold text-accent-primary border-b border-accent-primary/20 hover:border-accent-primary pb-0.5"
                  >
                    Start Your Ritual
                  </button>
                </div>
              ) : (
                cartItems.map((item) => (
                  <motion.div
                    key={`${item.id}-${item.variant}`}
                    layout
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    className="flex gap-4 border-b border-bg-surface/50 pb-6"
                  >
                    {/* Item Image */}
                    <div className="w-24 h-24 rounded-lg bg-bg-surface relative flex-shrink-0 overflow-hidden">
                      <Image
                        src={item.image}
                        alt={item.name}
                        fill
                        className="object-cover"
                        sizes="96px"
                      />
                    </div>

                    {/* Item Details */}
                    <div className="flex-1 flex flex-col justify-between">
                      <div className="space-y-1">
                        <div className="flex justify-between items-start gap-2">
                          <h4 className="font-sans text-sm font-medium text-text-primary leading-tight">
                            {item.name}
                          </h4>
                          <span className="font-sans text-sm font-semibold text-text-primary">
                            {item.price}
                          </span>
                        </div>
                        <div className="font-sans text-xs text-text-secondary flex flex-col gap-0.5">
                          <span>{item.variant}</span>
                          {item.isSubscription && (
                            <span className="text-[10px] text-accent-primary font-semibold flex items-center gap-1 mt-0.5">
                              <span className="w-1.5 h-1.5 rounded-full bg-accent-primary animate-pulse" />
                              Auto-delivery: {item.frequency} (Saved 10%)
                            </span>
                          )}
                        </div>
                      </div>

                      {/* Quantity Selector & Remove Button */}
                      <div className="flex justify-between items-center mt-2">
                        <div className="border border-[#E5E5E5] rounded-full flex items-center justify-between w-24 px-2 py-0.5 bg-white">
                          <motion.button
                            whileTap={{ scale: 0.8 }}
                            onClick={() => updateQuantity(item.id, item.variant, item.quantity - 1, item.isSubscription, item.frequency)}
                            className="p-1 hover:text-accent-primary text-text-secondary focus:outline-none"
                            aria-label="Decrease quantity"
                          >
                            <Minus className="w-3 h-3" />
                          </motion.button>
                          <span className="font-sans text-xs font-medium text-text-primary">
                            {item.quantity}
                          </span>
                          <motion.button
                            whileTap={{ scale: 0.8 }}
                            onClick={() => updateQuantity(item.id, item.variant, item.quantity + 1, item.isSubscription, item.frequency)}
                            className="p-1 hover:text-accent-primary text-text-secondary focus:outline-none"
                            aria-label="Increase quantity"
                          >
                            <Plus className="w-3 h-3" />
                          </motion.button>
                        </div>

                        <button
                          onClick={() => removeItem(item.id, item.variant, item.isSubscription, item.frequency)}
                          className="font-sans text-[10px] uppercase tracking-wider text-text-secondary hover:text-accent-secondary transition-colors"
                        >
                          Remove
                        </button>
                      </div>
                    </div>
                  </motion.div>
                ))
              )}
            </div>

            {/* Checkout Footer (Sticky Bottom) */}
            {cartItems.length > 0 && (
              <div className="absolute bottom-0 w-full bg-white p-6 border-t border-bg-surface flex flex-col gap-4 shadow-[0_-8px_30px_rgba(0,0,0,0.03)] z-10">
                <div className="flex justify-between items-baseline">
                  <span className="font-sans text-sm text-text-secondary">Subtotal</span>
                  <span className="font-serif text-xl font-bold">${subtotal.toFixed(2)}</span>
                </div>
                
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => {
                    alert("Proceeding to secure checkout sanctuary...");
                    closeCart();
                  }}
                  className="w-full bg-accent-primary hover:bg-opacity-95 text-white py-4 rounded-full font-sans text-xs uppercase tracking-widest font-semibold flex items-center justify-center gap-2 shadow-xl shadow-accent-primary/10 transition-all focus:outline-none"
                >
                  <Lock className="w-3.5 h-3.5" />
                  Proceed to Checkout
                </motion.button>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
