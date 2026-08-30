"use client";

import Image from "next/image";
import { Plus, Star, Heart } from "lucide-react";
import { motion } from "framer-motion";
import { Product } from "@/lib/data/products";
import { useRef, useState } from "react";

interface ProductCardProps {
  product: Product;
  onOpenDetails: (product: Product) => void;
  onQuickAdd: (product: Product) => void;
}

const cardVariants = {
  hidden: { opacity: 0, y: 30 },
  show: {
    opacity: 1,
    y: 0,
    transition: { type: "spring" as const, stiffness: 80, damping: 16 },
  },
} as const;

export default function ProductCard({
  product,
  onOpenDetails,
  onQuickAdd,
}: ProductCardProps) {
  const magneticButtonRef = useRef<HTMLButtonElement>(null);
  const [magneticOffset, setMagneticOffset] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent<HTMLElement>) => {
    if (!magneticButtonRef.current) return;
    const rect = magneticButtonRef.current.getBoundingClientRect();
    const buttonCenterX = rect.left + rect.width / 2;
    const buttonCenterY = rect.top + rect.height / 2;

    const distance = 40;
    const dx = e.clientX - buttonCenterX;
    const dy = e.clientY - buttonCenterY;
    const dist = Math.sqrt(dx * dx + dy * dy);

    if (dist < distance) {
      const strength = 1 - dist / distance;
      setMagneticOffset({
        x: (dx / dist) * strength * 12,
        y: (dy / dist) * strength * 12,
      });
    } else {
      setMagneticOffset({ x: 0, y: 0 });
    }
  };

  const handleMouseLeave = () => {
    setMagneticOffset({ x: 0, y: 0 });
  };

  return (
    <motion.div
      id={`product-card-${product.id}`}
      suppressHydrationWarning
      variants={cardVariants}
      className="group flex flex-col cursor-pointer rounded-2xl outline-none focus-within:ring-2 focus-within:ring-brand-terracotta bg-white p-3 sm:p-4 border border-[#EFE7DD] hover:border-brand-rose transition-all duration-300 shadow-xs hover:shadow-md"
      onClick={() => onOpenDetails(product)}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          onOpenDetails(product);
        }
      }}
      whileHover={{ y: -4 }}
      aria-label={`View ${product.name} details — price ${product.price}`}
    >
      {/* Image Block */}
      <div
        className="aspect-4/5 bg-brand-taupe rounded-xl relative flex items-center justify-center overflow-hidden mb-3.5 group"
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
      >
        <motion.div
          className="w-full h-full relative"
          variants={{
            hover: { scale: 1.06 },
          }}
          transition={{ duration: 0.5, ease: "easeOut" }}
        >
          <Image
            src={product.image}
            alt={product.alt}
            fill
            className="object-cover rounded-xl"
            sizes="(max-width: 768px) 50vw, (max-width: 1200px) 33vw, 25vw"
          />
        </motion.div>

        {/* Top Tag Badge */}
        {product.tag && (
          <div className="absolute top-2.5 left-2.5 px-2.5 py-1 rounded-full bg-white/90 backdrop-blur-md border border-white/60 shadow-xs text-[10px] font-sans font-bold text-brand-terracotta tracking-wider uppercase z-10 flex items-center gap-1">
            <Heart className="w-2.5 h-2.5 fill-brand-terracotta text-brand-terracotta" />
            <span>{product.tag}</span>
          </div>
        )}

        {/* Mobile Quick Add Button */}
        <button
          id={`add-btn-mobile-${product.id}`}
          suppressHydrationWarning
          className="absolute bottom-2.5 right-2.5 w-8 h-8 rounded-full bg-white/95 backdrop-blur flex items-center justify-center shadow-md text-[#422926] hover:bg-brand-rose-light transition-colors md:hidden z-20 focus:outline-none cursor-pointer"
          aria-label={`Quick add ${product.name} to bag`}
          onClick={(e) => {
            e.stopPropagation();
            onQuickAdd(product);
          }}
        >
          <Plus className="w-4 h-4 stroke-[2.5]" />
        </button>

        {/* Desktop Magnetic Quick Add Button */}
        <motion.button
          ref={magneticButtonRef}
          suppressHydrationWarning
          className="absolute bottom-3 right-3 hidden md:flex items-center justify-center w-10 h-10 rounded-full backdrop-blur-md bg-white/90 border border-white/80 text-[#422926] hover:bg-brand-terracotta hover:text-white transition-colors z-20 shadow-md focus:outline-none"
          animate={{
            x: magneticOffset.x,
            y: magneticOffset.y,
          }}
          transition={{ type: "spring", stiffness: 150, damping: 15 }}
          onClick={(e) => {
            e.stopPropagation();
            onQuickAdd(product);
          }}
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
          aria-label={`Quick add ${product.name} to bag`}
        >
          <Plus className="w-4 h-4 stroke-[2.5]" />
        </motion.button>
      </div>

      {/* Typography Info */}
      <div className="flex flex-col gap-1.5 px-0.5">
        <div className="flex items-center justify-between">
          <span className="font-sans text-[11px] uppercase tracking-wider text-brand-text-muted font-semibold">
            {product.category}
          </span>
          {product.rating && (
            <div className="flex items-center gap-1 text-[#D9A557] text-[11px] font-semibold">
              <Star className="w-3 h-3 fill-[#D9A557] text-[#D9A557]" />
              <span>{product.rating}</span>
            </div>
          )}
        </div>

        <h3 className="font-serif text-sm sm:text-base font-bold text-[#422926] group-hover:text-brand-terracotta transition-colors line-clamp-1">
          {product.name}
        </h3>

        <div className="flex items-baseline gap-2 pt-0.5">
          <span className="font-sans text-sm sm:text-base font-bold text-[#422926]">
            {product.price}
          </span>
          {product.originalPrice && (
            <span className="font-sans text-xs text-brand-text-muted line-through">
              {product.originalPrice}
            </span>
          )}
        </div>
      </div>
    </motion.div>
  );
}
