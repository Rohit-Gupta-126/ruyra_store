"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { Sparkles, ArrowRight, Tag, ShoppingBag, Heart } from "lucide-react";
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
    id: "keepsake-solstice-bundle",
    name: "The Keepsake Bloom & Charm Gift Set",
    sub: "Limited Edition Celebration Box",
    price: "₹2,499",
    originalPrice: "₹2,999",
    tag: "EXCLUSIVE SET • 15% OFF",
    description: "Our signature Chenille Tulip Bouquet paired with an adorable Tulip & Heart Bag Charm and a handwritten gift card.",
    image: "https://images.unsplash.com/photo-1549465220-1a8b9238cd48?q=80&w=800&auto=format&fit=crop",
    alt: "Handcrafted gift set with floral bouquet and pearl bag charm in decorative box",
    isOffer: true,
    ctaText: "Claim Gift Bundle"
  },
  {
    id: "spring-pastel-grand-pour",
    name: "Spring Meadow Chenille Trio",
    sub: "Set of 3 Potted Blooms",
    price: "₹1,899",
    tag: "NEW DROP",
    description: "A joyful trio of mini potted chenille daisies and lavender stems. Hand-stitched with love to brighten up any desk or shelf.",
    image: "https://images.unsplash.com/photo-1563245372-f21724e3856d?q=80&w=800&auto=format&fit=crop",
    alt: "Set of 3 miniature handcrafted flowers in woven baskets",
    isOffer: false,
    ctaText: "View Collection"
  },
  {
    id: "bespoke-charm-duo",
    name: "Personalized Initials & Charm Set",
    sub: "Hand-stitched Heart + Pearl Clasp",
    price: "₹999",
    tag: "CUSTOM ACCENTS",
    description: "Customizable crochet charm set with your initial embroidered on a plush velvet heart. Includes pearl beaded chain.",
    image: "https://images.unsplash.com/photo-1611085583191-a3b181a88401?q=80&w=800&auto=format&fit=crop",
    alt: "Custom initial embroidered crochet heart keychain on gold clasp",
    isOffer: false,
    ctaText: "Order Custom Charm"
  }
];

export default function LaunchesAndOffers() {
  const { openSheet } = useProductSheet();
  const { addItem } = useCart();

  const handleAction = (item: LaunchItem, e: React.MouseEvent) => {
    e.stopPropagation();
    openSheet(item.name, item.image, item.price);
  };

  const handleQuickAdd = (item: LaunchItem, e: React.MouseEvent) => {
    e.stopPropagation();
    addItem({
      id: item.id,
      name: item.name,
      price: item.price,
      variant: item.isOffer ? "Gift Box Bundle" : "Standard",
      image: item.image,
    });
  };

  return (
    <section id="launches-section" className="w-full py-20 md:py-28 bg-[#FFFDF9] border-t border-[#EFE7DD] overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 md:px-12 w-full">
        
        {/* Header Section */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 lg:mb-16 gap-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="space-y-2 max-w-xl"
          >
            <div className="flex items-center gap-2 text-brand-terracotta">
              <Sparkles className="w-4 h-4 text-brand-gold" />
              <span className="font-sans text-xs tracking-[0.25em] uppercase font-bold">
                NEW DROPS & CURATED GIFT SETS
              </span>
            </div>
            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl text-[#422926]">
              Thoughtful <span className="font-script text-4xl sm:text-5xl lg:text-6xl text-brand-terracotta">Offerings</span>
            </h2>
            <p className="font-sans text-xs sm:text-sm text-brand-text-muted">
              Limited-edition bundles and freshly crafted treasures for special moments.
            </p>
          </motion.div>
        </div>

        {/* 3 Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
          {ITEMS.map((item, index) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.12 }}
              whileHover={{ y: -6 }}
              onClick={(e) => handleAction(item, e)}
              className={`group cursor-pointer rounded-3xl overflow-hidden bg-white border flex flex-col justify-between transition-all duration-300 shadow-xs hover:shadow-lg ${
                item.isOffer 
                  ? "border-brand-rose ring-1 ring-brand-rose/40" 
                  : "border-[#EFE7DD] hover:border-brand-rose"
              }`}
            >
              {/* Image Container */}
              <div className="relative aspect-4/3 w-full overflow-hidden bg-brand-taupe">
                <Image
                  src={item.image}
                  alt={item.alt}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-700"
                  sizes="(max-width: 768px) 100vw, 33vw"
                />

                {/* Badge Tag */}
                <div className="absolute top-3 left-3 z-10">
                  <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-sans font-bold tracking-wider uppercase shadow-xs ${
                    item.isOffer
                      ? "bg-brand-terracotta text-white"
                      : "bg-white/90 backdrop-blur text-brand-brown border border-white/80"
                  }`}>
                    {item.isOffer ? <Tag className="w-3 h-3" /> : <Sparkles className="w-3 h-3 text-brand-gold" />}
                    {item.tag}
                  </span>
                </div>
              </div>

              {/* Content Area */}
              <div className="p-6 sm:p-7 flex flex-col flex-1 justify-between space-y-4">
                <div className="space-y-2">
                  <span className="font-sans text-[11px] font-semibold text-brand-terracotta tracking-wider uppercase">
                    {item.sub}
                  </span>
                  <h3 className="font-serif text-xl sm:text-2xl font-bold text-[#422926] group-hover:text-brand-terracotta transition-colors leading-snug">
                    {item.name}
                  </h3>
                  <p className="font-sans text-xs sm:text-sm text-brand-text-muted leading-relaxed">
                    {item.description}
                  </p>
                </div>

                {/* Pricing & CTA */}
                <div className="pt-4 border-t border-[#EFE7DD] flex items-center justify-between">
                  <div>
                    <span className="font-sans text-lg sm:text-xl font-bold text-[#422926]">
                      {item.price}
                    </span>
                    {item.originalPrice && (
                      <span className="ml-2 font-sans text-xs text-brand-text-muted line-through">
                        {item.originalPrice}
                      </span>
                    )}
                  </div>

                  <button
                    onClick={(e) => handleQuickAdd(item, e)}
                    className="px-4 py-2.5 rounded-full bg-[#FAF7F2] hover:bg-brand-terracotta text-brand-brown hover:text-white border border-[#EFE7DD] hover:border-transparent font-sans text-xs font-semibold tracking-wider transition-all flex items-center gap-1.5 cursor-pointer"
                  >
                    <ShoppingBag className="w-3.5 h-3.5" />
                    <span>Quick Add</span>
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
