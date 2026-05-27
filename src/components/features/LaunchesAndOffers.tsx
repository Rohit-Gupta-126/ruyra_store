"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { Sparkles, ArrowRight, Tag, ShoppingBag } from "lucide-react";
import { useProductSheet } from "./ProductSheetContext";
import { useCart } from "@/lib/context/CartContext";

interface LaunchItem {
  id: string;
  name: string;
  sub: string;
  price: string;
  originalPrice?: string;
  tag: string;
  description: string;
  image: string;
  alt: string;
  isOffer: boolean;
  ctaText: string;
}

const ITEMS: LaunchItem[] = [
  {
    id: "solstice-bundle",
    name: "The Solstice Ritual Bundle",
    sub: "Limited Edition Summer Set",
    price: "$68",
    originalPrice: "$83",
    tag: "EXCLUSIVE OFFER • 15% OFF",
    description: "A complete morning-to-evening grounding ritual. Pairs our signature Amber Ritual Candle with restorative lavender bath salts.",
    image: "https://images.unsplash.com/photo-1603006905003-be475563bc59?q=80&w=800&auto=format&fit=crop",
    alt: "Solstice ritual set featuring botanical soy wax candle and coarse bath salts on textured tray",
    isOffer: true,
    ctaText: "Claim Limited Bundle"
  },
  {
    id: "sage-cypress-grand",
    name: "Sage & Cypress Grand Pour",
    sub: "Limited 16 oz Candle",
    price: "$72",
    tag: "NEW BATCH LAUNCH",
    description: "Fresh forest sage blended with mountain cypress and cold rain resin. Hand-poured into thick, rustic basalt clay vessels.",
    image: "https://images.unsplash.com/photo-1612196808214-b8e1d6145a8c?q=80&w=800&auto=format&fit=crop",
    alt: "Grand 16 oz double-wick candle poured in a hand-formed grey slate-clay vessel",
    isOffer: false,
    ctaText: "Reserve Pour"
  },
  {
    id: "incense-vessel-set",
    name: "Slate Incense Vessel Set",
    sub: "Hand-carved Stone + Incense",
    price: "$38",
    tag: "NEW ACCESSORY",
    description: "Minimalist raw stone incense plate designed to catch ash gracefully. Includes a pack of 20 cold-pressed forest vetiver sticks.",
    image: "https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?q=80&w=800&auto=format&fit=crop",
    alt: "Hand carved grey slate incense plate with a burning vetiver stick casting thin smoke trail",
    isOffer: false,
    ctaText: "Shop Accessory"
  }
];

export default function LaunchesAndOffers() {
  const { openSheet } = useProductSheet();
  const { addItem } = useCart();

  const handleAction = (item: LaunchItem, e: React.MouseEvent) => {
    e.stopPropagation();
    // Open product detail sheet for specific config
    openSheet(item.name, item.image, item.price);
  };

  const handleQuickAdd = (item: LaunchItem, e: React.MouseEvent) => {
    e.stopPropagation();
    addItem({
      id: item.id,
      name: item.name,
      price: item.price,
      variant: item.isOffer ? "Bundle" : "Standard",
      image: item.image,
    });
  };

  return (
    <section id="launches-section" className="w-full py-24 bg-bg-primary border-t border-brand-brown/5 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 md:px-12 w-full">
        
        {/* Header Section */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8 }}
            className="space-y-3 max-w-xl"
          >
            <div className="flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-brand-terracotta" />
              <span className="font-sans text-[10px] tracking-[0.25em] uppercase text-brand-terracotta font-bold">
                LATEST FROM THE SANCTUARY
              </span>
            </div>
            <h2 className="font-serif text-3xl md:text-4xl text-brand-brown leading-tight">
              New Releases & Limited Offerings
            </h2>
            <p className="font-sans text-xs md:text-sm text-brand-text-muted leading-relaxed font-light">
              Explore our fresh botanical creations and seasonal curated bundles poured with pure intentions.
            </p>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, delay: 0.15 }}
            className="flex items-center gap-1.5 font-sans text-xs text-brand-brown font-semibold border-b border-brand-brown/10 pb-1 hover:border-brand-brown hover:text-brand-terracotta transition-all cursor-pointer"
            onClick={() => window.location.href = "/shop"}
          >
            View Full Catalogue
            <ArrowRight className="w-3.5 h-3.5" />
          </motion.div>
        </div>

        {/* 2:1:1 Asymmetrical Grid Layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          
          {ITEMS.map((item, index) => {
            if (item.isOffer) {
              // Highlight Solstice Bundle Card (Spans 2 columns on desktop)
              return (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ type: "spring", stiffness: 70, damping: 15, delay: index * 0.1 }}
                  onClick={() => openSheet(item.name, item.image, item.price)}
                  className="lg:col-span-2 flex flex-col md:flex-row bg-brand-taupe/35 border border-brand-brown/5 rounded-3xl overflow-hidden group cursor-pointer shadow-sm hover:shadow-[0_15px_35px_rgba(62,44,36,0.06)] hover:border-brand-terracotta/25 transition-all duration-500 min-h-[380px]"
                >
                  {/* Left content half */}
                  <div className="flex-1 p-8 flex flex-col justify-between order-2 md:order-1">
                    <div className="space-y-4">
                      {/* Offer badge tag */}
                      <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-brand-terracotta text-brand-sand font-sans text-[9px] tracking-wider uppercase font-bold rounded-full">
                        <Tag className="w-3 h-3 stroke-[2.5]" />
                        {item.tag}
                      </span>
                      
                      <h3 className="font-serif text-2xl text-brand-brown leading-tight group-hover:text-brand-terracotta transition-colors">
                        {item.name}
                      </h3>
                      <p className="font-sans text-xs text-brand-brown/65 uppercase tracking-widest font-semibold">
                        {item.sub}
                      </p>
                      <p className="font-sans text-xs md:text-sm text-brand-text-muted leading-relaxed font-light">
                        {item.description}
                      </p>
                    </div>

                    <div className="mt-8 space-y-4">
                      {/* Price Section */}
                      <div className="flex items-baseline gap-3">
                        <span className="font-sans text-2xl font-semibold text-brand-brown">
                          {item.price}
                        </span>
                        {item.originalPrice && (
                          <span className="font-sans text-sm text-brand-text-muted/60 line-through">
                            {item.originalPrice}
                          </span>
                        )}
                        <span className="font-sans text-[10px] text-accent-gold font-bold tracking-widest uppercase ml-1 animate-pulse">
                          • Limited Batch of 150
                        </span>
                      </div>

                      {/* CTA Buttons */}
                      <div className="flex items-center gap-3">
                        <button
                          onClick={(e) => handleAction(item, e)}
                          className="flex-1 py-3 bg-brand-brown text-brand-sand font-sans text-[10px] tracking-wider uppercase font-bold rounded-md hover:bg-brand-brown/95 transition-all flex items-center justify-center gap-1.5 group/btn"
                        >
                          {item.ctaText}
                          <ArrowRight className="w-3.5 h-3.5 transition-transform duration-300 group-hover/btn:translate-x-1" />
                        </button>
                        <button
                          onClick={(e) => handleQuickAdd(item, e)}
                          className="p-3 border border-brand-brown/20 text-brand-brown hover:bg-brand-brown hover:text-brand-sand hover:border-brand-brown transition-all rounded-md"
                          aria-label="Add Solstice Bundle to cart instantly"
                        >
                          <ShoppingBag className="w-4 h-4 stroke-[1.75]" />
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* Right image half */}
                  <div className="flex-1 relative aspect-square md:aspect-auto min-h-[220px] md:min-h-0 overflow-hidden order-1 md:order-2">
                    <Image
                      src={item.image}
                      alt={item.alt}
                      fill
                      className="object-cover transition-transform duration-700 group-hover:scale-103"
                      sizes="(max-width: 768px) 100vw, 400px"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t md:bg-gradient-to-l from-black/10 to-transparent pointer-events-none" />
                  </div>
                </motion.div>
              );
            }

            // Normal new launch items (Col-span 1)
            return (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ type: "spring", stiffness: 70, damping: 15, delay: index * 0.12 }}
                onClick={() => openSheet(item.name, item.image, item.price)}
                className="lg:col-span-1 bg-white border border-brand-brown/5 rounded-3xl overflow-hidden group cursor-pointer flex flex-col justify-between shadow-sm hover:shadow-[0_15px_35px_rgba(62,44,36,0.06)] hover:border-brand-brown/15 transition-all duration-500"
              >
                {/* Media Container */}
                <div className="relative aspect-[4/3] w-full overflow-hidden">
                  <Image
                    src={item.image}
                    alt={item.alt}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-103"
                    sizes="(max-width: 768px) 100vw, 300px"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent pointer-events-none" />
                  
                  {/* Category label badge */}
                  <span className="absolute top-4 left-4 bg-brand-sand/90 backdrop-blur-sm text-brand-brown font-sans text-[8px] font-bold tracking-widest px-2.5 py-1 rounded-full uppercase border border-brand-brown/5">
                    {item.tag}
                  </span>
                </div>

                {/* Card Content details */}
                <div className="p-6 flex-1 flex flex-col justify-between">
                  <div className="space-y-2">
                    <h3 className="font-serif text-lg text-brand-brown group-hover:text-brand-terracotta transition-colors leading-tight">
                      {item.name}
                    </h3>
                    <p className="font-sans text-[10px] text-brand-text-muted uppercase tracking-widest font-semibold">
                      {item.sub}
                    </p>
                    <p className="font-sans text-xs text-brand-text-muted leading-relaxed font-light line-clamp-2">
                      {item.description}
                    </p>
                  </div>

                  <div className="mt-6 pt-4 border-t border-brand-brown/5 flex items-center justify-between">
                    <span className="font-sans text-base font-semibold text-brand-brown">
                      {item.price}
                    </span>
                    
                    <div className="flex gap-2">
                      <button
                        onClick={(e) => handleAction(item, e)}
                        className="py-1.5 px-3 bg-brand-brown text-brand-sand font-sans text-[9px] tracking-wider uppercase font-bold rounded-md hover:bg-brand-brown/95 transition-colors"
                      >
                        Details
                      </button>
                      <button
                        onClick={(e) => handleQuickAdd(item, e)}
                        className="p-1.5 border border-brand-brown/15 text-brand-brown hover:bg-brand-brown hover:text-brand-sand hover:border-brand-brown transition-colors rounded-md"
                        aria-label={`Quick add ${item.name} to cart`}
                      >
                        <ShoppingBag className="w-3.5 h-3.5 stroke-[1.75]" />
                      </button>
                    </div>
                  </div>
                </div>
              </motion.div>
            );
          })}

        </div>
      </div>
    </section>
  );
}
