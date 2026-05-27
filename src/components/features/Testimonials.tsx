"use client";

import { motion, Variants } from "framer-motion";
import { Star } from "lucide-react";

interface Testimonial {
  id: number;
  quote: string;
  author: string;
  role: string;
  rating: number;
}

const TESTIMONIALS: Testimonial[] = [
  {
    id: 1,
    quote: "The Amber Ritual candle has transformed my evening routine. The earthy amber and cedarwood ground my space instantly.",
    author: "Claire H.",
    role: "Verified Ritualist",
    rating: 5,
  },
  {
    id: 2,
    quote: "These lavender bath salts are a weekly self-care necessity. It feels like stepping into a private botanical sanctuary.",
    author: "Liam D.",
    role: "Verified Ritualist",
    rating: 5,
  },
  {
    id: 3,
    quote: "Every detail, from the hand-cast clay to the plastic-free packing, feels intentional. Ruyra is a complete sensory experience.",
    author: "Chloe S.",
    role: "Verified Ritualist",
    rating: 5,
  },
];

export default function Testimonials() {
  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.1,
      },
    },
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 30 },
    show: {
      opacity: 1,
      y: 0,
      transition: { type: "spring", stiffness: 100, damping: 18 },
    },
  };

  return (
    <section className="py-24 px-6 md:px-12 w-full bg-brand-sand overflow-x-hidden">
      <div className="max-w-7xl mx-auto text-center space-y-16">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="space-y-3"
        >
          <h2 className="font-serif text-3xl md:text-4xl text-brand-brown">
            Sanctuary Echoes
          </h2>
          <p className="font-sans text-xs uppercase tracking-widest text-brand-text-muted">
            Stories of grounding from our community
          </p>
        </motion.div>

        {/* Staggered Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-50px" }}
          animate="show"
          className="grid grid-cols-1 md:grid-cols-3 gap-8 text-left w-full"
        >
          {TESTIMONIALS.map((t, index) => {
            // Sticky top offset to stack them sequentially (e.g. 96px, 128px, 160px...)
            const stickyTop = 96 + index * 32;
            return (
              <motion.div
                key={t.id}
                variants={itemVariants}
                whileHover={{ y: -5 }}
                style={{ top: `${stickyTop}px` }}
                className="sticky lg:relative lg:!top-auto bg-[#F5F2EB] lg:bg-brand-taupe/20 border border-brand-brown/10 lg:border-brand-brown/5 rounded-[2rem] lg:rounded-4xl p-8 md:p-10 flex flex-col justify-between space-y-8 hover:bg-[#EAE4DB] lg:hover:bg-brand-taupe/35 hover:border-brand-brown/15 lg:hover:border-brand-brown/10 transition-all duration-300 shadow-md lg:shadow-sm"
              >
              {/* Rating stars */}
              <div className="flex items-center gap-0.5 text-brand-terracotta">
                {[...Array(t.rating)].map((_, i) => (
                  <Star key={i} className="w-3.5 h-3.5 fill-brand-terracotta stroke-brand-terracotta" />
                ))}
              </div>

              {/* Quote */}
              <p className="font-serif text-lg leading-relaxed text-brand-brown italic">
                &ldquo;{t.quote}&rdquo;
              </p>

              {/* Author Info */}
              <div className="pt-4 border-t border-brand-brown/5 flex items-center justify-between">
                <div>
                  <h4 className="font-sans text-sm font-semibold text-brand-brown">
                    {t.author}
                  </h4>
                  <span className="font-sans text-[11px] text-brand-text-muted">
                    {t.role}
                  </span>
                </div>
                {/* Verified Circle */}
                <div className="w-6 h-6 rounded-full bg-brand-brown/5 flex items-center justify-center">
                  <span className="text-[10px] font-sans font-bold text-brand-terracotta">✓</span>
                </div>
              </div>
            </motion.div>
          );
        })}
        </motion.div>
      </div>
    </section>
  );
}
