"use client";

import Image from "next/image";
import { Plus } from "lucide-react";
import { motion } from "framer-motion";
import { Product } from "@/app/data/products";

interface ProductCardProps {
  product: Product;
  onOpenDetails: (product: Product) => void;
  onQuickAdd: (product: Product) => void;
}

const cardVariants = {
  hidden: { opacity: 0, y: 40 },
  show: {
    opacity: 1,
    y: 0,
    transition: { type: "spring" as const, stiffness: 70, damping: 15 },
  },
} as const;

export default function ProductCard({
  product,
  onOpenDetails,
  onQuickAdd,
}: ProductCardProps) {
  return (
    <motion.div
      id={`product-card-${product.id}`}
      suppressHydrationWarning
      variants={cardVariants}
      className="group flex flex-col cursor-pointer focus-within:ring-2 focus-within:ring-brand-terracotta rounded-xl outline-none"
      onClick={() => onOpenDetails(product)}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          onOpenDetails(product);
        }
      }}
      whileHover="hover"
      aria-label={`View ${product.name} details — price ${product.price}`}
    >
      {/* Image Block */}
      <div className="aspect-[4/5] bg-brand-taupe rounded-xl mb-4 relative flex items-center justify-center overflow-hidden p-4">
        {/* Product Image */}
        <motion.div
          className="w-full h-full relative"
          variants={{
            hover: { scale: 1.05 },
          }}
          transition={{ duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
        >
          <Image
            src={product.image}
            alt={product.alt}
            fill
            className="object-cover rounded-lg"
            sizes="(max-width: 768px) 50vw, (max-width: 1200px) 33vw, 25vw"
          />
        </motion.div>

        {/* Mobile Floating Add Button */}
        <button
          id={`add-btn-mobile-${product.id}`}
          suppressHydrationWarning
          className="absolute bottom-3 right-3 w-8 h-8 rounded-full bg-brand-sand/90 backdrop-blur flex items-center justify-center shadow-md text-brand-brown hover:bg-brand-taupe transition-colors md:hidden z-20 focus:outline-none"
          aria-label={`Quick add ${product.name} to bag`}
          onClick={(e) => {
            e.stopPropagation();
            onQuickAdd(product);
          }}
        >
          <Plus className="w-4 h-4 stroke-[2]" />
        </button>

        {/* Desktop Hover Quick Add Slide-up */}
        <motion.div
          variants={{
            hover: { y: 0 },
          }}
          initial={{ y: "101%" }}
          transition={{ type: "spring", stiffness: 150, damping: 18 }}
          onClick={(e) => {
            e.stopPropagation();
            onQuickAdd(product);
          }}
          className="absolute bottom-0 left-0 right-0 w-full bg-brand-terracotta hover:bg-[#9A4C34] text-white py-3.5 text-center font-sans text-xs tracking-widest uppercase font-semibold hidden md:block z-20 cursor-pointer transition-colors duration-300"
        >
          Quick Add
        </motion.div>
      </div>

      {/* Typography Info */}
      <div className="flex flex-col gap-1 px-1">
        <h3 className="font-sans text-sm font-medium text-brand-brown group-hover:text-brand-terracotta transition-colors line-clamp-1">
          {product.name}
        </h3>
        <span className="font-sans text-sm text-brand-text-muted">
          {product.price}
        </span>
      </div>
    </motion.div>
  );
}
