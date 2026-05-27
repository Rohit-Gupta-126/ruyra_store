"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { useProductSheet } from "./ProductSheetContext";

const vibes = [
  {
    id: "home-fragrance",
    name: "Home Fragrance",
    price: "$45",
    description: "Deep amber, slow-burning soy wax in stoneware.",
    image: "https://images.unsplash.com/photo-1603006905003-be475563bc59?q=80&w=800&auto=format&fit=crop",
    alt: "Moody amber soy jar candle burning softly with a warm flame on cracked stone"
  },
  {
    id: "bath-rituals",
    name: "Bath Rituals",
    price: "$38",
    description: "Botanical salts and floral mineral infusions.",
    image: "https://images.unsplash.com/photo-1540555700478-4be289fbecef?q=80&w=800&auto=format&fit=crop",
    alt: "Macro shot of coarse pink Himalayan salt crystals and dry lavender petals in a low clay dish"
  },
  {
    id: "stoneware-decor",
    name: "Earthen Decor",
    price: "$65",
    description: "Hand-molded clay and raw stoneware vessels.",
    image: "https://images.unsplash.com/photo-1612196808214-b8e1d6145a8c?q=80&w=800&auto=format&fit=crop",
    alt: "Artisanal hand-thrown clay candle holder set on a textured limestone tray"
  }
];

export default function VibeCarousel() {
  const { openSheet } = useProductSheet();

  return (
    <section id="vibe-section" className="w-full py-24 bg-bg-primary">
      {/* Header with entrance animation on scroll */}
      <motion.div 
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="max-w-7xl mx-auto px-6 md:px-12 text-center mb-12"
      >
        <h2 className="font-serif text-3xl md:text-4xl text-text-primary">
          Curated Vibe
        </h2>
        <p className="font-sans text-sm text-text-secondary mt-2">
          Select an essence to ground your sanctuary
        </p>
      </motion.div>

      {/* Carousel Container */}
      <div className="flex overflow-x-auto gap-6 px-6 md:px-12 snap-x snap-mandatory no-scrollbar pb-6 scroll-smooth">
        {vibes.map((vibe, index) => (
          <motion.div
            key={vibe.id}
            id={`vibe-card-${vibe.id}`}
            suppressHydrationWarning
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ type: "spring", stiffness: 70, damping: 15, delay: index * 0.15 }}
            onClick={() => openSheet(vibe.name, vibe.image, vibe.price)}
            className="w-[280px] md:w-[400px] h-[400px] md:h-[500px] shrink-0 snap-center relative rounded-2xl overflow-hidden group cursor-pointer focus-within:ring-2 focus-within:ring-accent-primary focus:outline-none"
            tabIndex={0}
            role="button"
            aria-label={`Explore ${vibe.name} collection, starting at ${vibe.price}`}
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === " ") {
                e.preventDefault();
                openSheet(vibe.name, vibe.image, vibe.price);
              }
            }}
          >
            {/* Background Image Container */}
            <div className="absolute inset-0 w-full h-full overflow-hidden">
              <motion.div
                className="w-full h-full relative"
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
              >
                <Image
                  src={vibe.image}
                  alt={vibe.alt}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 280px, 400px"
                />
              </motion.div>
            </div>

            {/* Permanent Dark Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent z-10" />

            {/* Text Overlay (Bottom Aligned) */}
            <div className="absolute bottom-0 left-0 right-0 p-6 z-20 flex flex-col justify-end text-white">
              <span className="font-sans text-[10px] tracking-[0.25em] uppercase text-white/70 mb-1">
                Collection
              </span>
              <h3 className="font-serif text-2xl md:text-3xl text-white mb-2">
                {vibe.name}
              </h3>
              <p className="font-sans text-xs text-white/80 leading-relaxed font-light line-clamp-2 mb-4">
                {vibe.description}
              </p>
              
              <div className="flex items-center justify-between">
                <span className="font-sans text-sm font-medium tracking-wide">
                  From {vibe.price}
                </span>
                <span className="font-sans text-xs tracking-wider border-b border-white/40 pb-0.5 group-hover:border-white transition-colors">
                  Explore Ritual
                </span>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
