"use client";

import { motion, Variants } from "framer-motion";
import { Star, Heart } from "lucide-react";

interface Testimonial {
  id: number;
  quote: string;
  author: string;
  role: string;
  itemBought: string;
  rating: number;
}

const TESTIMONIALS: Testimonial[] = [
  {
    id: 1,
    quote: "The Chenille Tulip Bouquet is even prettier in real life! The soft velvet texture and lovely wrapping make it the perfect keepsake. It never wilts!",
    author: "Ananya R.",
    role: "Verified Buyer",
    itemBought: "Eternal Tulip Bouquet",
    rating: 5,
  },
  {
    id: 2,
    quote: "I bought the Tulip & Heart Bag Charm for my tote bag and receive compliments every single day. The little pearl chain and wooden tag are so adorable.",
    author: "Sneha M.",
    role: "Verified Buyer",
    itemBought: "Tulip & Heart Charm",
    rating: 5,
  },
  {
    id: 3,
    quote: "Ordered the custom gift box for my best friend's birthday. Chisó wrote my message in beautiful calligraphy and the daisies brought pure happiness!",
    author: "Pooja K.",
    role: "Verified Buyer",
    itemBought: "Heartfelt Gift Hamper",
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
    <section className="py-20 md:py-28 w-full bg-[#FAF7F2] border-t border-[#EFE7DD]">
      <div className="max-w-7xl mx-auto px-6 md:px-12 text-center space-y-14">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="space-y-2 max-w-xl mx-auto"
        >
          <div className="flex items-center justify-center gap-1.5 text-brand-terracotta text-xs font-sans font-bold tracking-widest uppercase">
            <Heart className="w-3.5 h-3.5 fill-brand-terracotta" />
            <span>LOVED BY THOUSANDS</span>
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl text-[#422926]">
            Heartfelt <span className="font-script text-4xl sm:text-5xl lg:text-6xl text-brand-terracotta">Reviews</span>
          </h2>
          <p className="font-sans text-xs sm:text-sm text-brand-text-muted">
            Stories of blooming joy and keepsake gifts from our sweet community.
          </p>
        </motion.div>

        {/* 3 Cards Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-50px" }}
          className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8 text-left w-full"
        >
          {TESTIMONIALS.map((t) => (
            <motion.div
              key={t.id}
              variants={itemVariants}
              whileHover={{ y: -5 }}
              className="bg-white border border-[#EFE7DD] rounded-3xl p-8 flex flex-col justify-between space-y-6 shadow-xs hover:shadow-md hover:border-brand-rose transition-all duration-300"
            >
              {/* Rating stars & Item tag */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-1 text-[#D9A557]">
                  {[...Array(t.rating)].map((_, i) => (
                    <Star key={i} className="w-3.5 h-3.5 fill-[#D9A557] stroke-[#D9A557]" />
                  ))}
                </div>
                <span className="text-[11px] font-sans font-semibold text-brand-terracotta bg-brand-rose-light px-2.5 py-0.5 rounded-full">
                  {t.itemBought}
                </span>
              </div>

              {/* Quote */}
              <p className="font-serif text-base sm:text-lg leading-relaxed text-[#422926] italic">
                &ldquo;{t.quote}&rdquo;
              </p>

              {/* Author Info */}
              <div className="pt-4 border-t border-[#EFE7DD] flex items-center justify-between">
                <div>
                  <h4 className="font-sans text-sm font-bold text-[#422926]">
                    {t.author}
                  </h4>
                  <span className="font-sans text-[11px] text-brand-text-muted">
                    {t.role}
                  </span>
                </div>
                {/* Verified Tag */}
                <div className="w-6 h-6 rounded-full bg-brand-sage-light flex items-center justify-center text-brand-sage font-bold text-xs">
                  ✓
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
