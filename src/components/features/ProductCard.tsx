"use client";

import Image from "next/image";
import { Plus } from "lucide-react";
import { motion } from "framer-motion";
import { Product } from "@/lib/data/products";
import { useRef, useState } from "react";

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

// Video URLs - product-specific videos
const PRODUCT_VIDEOS: Record<string, string> = {
  "amber-ritual-candle":
    "https://storage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4",
  "ritual-bath-salts":
    "https://storage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4",
  "earthen-taper-holder":
    "https://storage.googleapis.com/gtv-videos-bucket/sample/ForBiggerFun.mp4",
  "resin-adornments":
    "https://storage.googleapis.com/gtv-videos-bucket/sample/ForBiggerJoyrides.mp4",
};

export default function ProductCard({
  product,
  onOpenDetails,
  onQuickAdd,
}: ProductCardProps) {
  const [isVideoHovered, setIsVideoHovered] = useState(false);
  const [videoError, setVideoError] = useState(false);
  const magneticButtonRef = useRef<HTMLButtonElement>(null);
  const [magneticOffset, setMagneticOffset] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent<HTMLElement>) => {
    if (!magneticButtonRef.current) return;

    const rect = magneticButtonRef.current.getBoundingClientRect();
    const buttonCenterX = rect.left + rect.width / 2;
    const buttonCenterY = rect.top + rect.height / 2;

    const distance = 40; // magnetic pull distance

    const dx = e.clientX - buttonCenterX;
    const dy = e.clientY - buttonCenterY;
    const dist = Math.sqrt(dx * dx + dy * dy);

    if (dist < distance) {
      const strength = 1 - dist / distance;
      setMagneticOffset({
        x: (dx / dist) * strength * 15,
        y: (dy / dist) * strength * 15,
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
      <div
        className="aspect-4/5 bg-brand-taupe rounded-xl mb-4 relative flex items-center justify-center overflow-hidden p-4 group"
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
      >
        {/* Product Image (fades out on video hover unless video errors out) */}
        <motion.div
          className="w-full h-full relative"
          animate={{ opacity: isVideoHovered && !videoError ? 0 : 1 }}
          transition={{ duration: 0.7 }}
          variants={{
            hover: { scale: isVideoHovered && !videoError ? 1 : 1.05 },
          }}
        >
          <Image
            src={product.image}
            alt={product.alt}
            fill
            className="object-cover rounded-lg"
            sizes="(max-width: 768px) 50vw, (max-width: 1200px) 33vw, 25vw"
          />
        </motion.div>

        {/* Video Element (fades in on hover) */}
        {!videoError && (
          <motion.video
            className="absolute inset-0 w-full h-full object-cover rounded-lg"
            animate={{
              opacity: isVideoHovered ? 1 : 0,
              scale: isVideoHovered ? 1.05 : 1,
            }}
            transition={{ duration: 1 }}
            onMouseEnter={() => setIsVideoHovered(true)}
            onMouseLeave={() => setIsVideoHovered(false)}
            onError={() => setVideoError(true)}
            autoPlay
            muted
            loop
            playsInline
          >
            <source src={PRODUCT_VIDEOS[product.id] || ""} type="video/mp4" />
          </motion.video>
        )}

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
          <Plus className="w-4 h-4 stroke-2" />
        </button>

        {/* Desktop Magnetic Quick Add Button */}
        <motion.button
          ref={magneticButtonRef}
          suppressHydrationWarning
          className="absolute bottom-4 right-4 hidden md:flex items-center justify-center w-12 h-12 rounded-full backdrop-blur-md bg-white/50 border border-white text-brand-brown hover:bg-white/70 transition-colors z-20 shadow-lg focus:outline-none focus-within:ring-2 focus-within:ring-brand-terracotta"
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
          <Plus className="w-5 h-5 stroke-2" />
        </motion.button>
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
