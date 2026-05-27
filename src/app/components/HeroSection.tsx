"use client";

import Image from "next/image";
import { motion } from "framer-motion";

export default function HeroSection() {
  return (
    <section className="relative h-[90vh] w-full overflow-hidden rounded-b-[40px] md:rounded-b-none">
      {/* Background Image Container with entrance scale-down effect */}
      <motion.div
        initial={{ scale: 1.1, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 1.8, ease: "easeOut" }}
        className="absolute inset-0 w-full h-full"
      >
        <Image
          src="https://images.unsplash.com/photo-1608571423902-eed4a5ad8108?q=80&w=1600&auto=format&fit=crop"
          alt="Macro shot of an unlit textured amber soy candle resting on raw dark volcanic stone"
          fill
          priority
          className="object-cover object-center"
          sizes="100vw"
        />
      </motion.div>

      {/* Dark moody overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-black/20" />

      {/* Hero Content */}
      <div className="absolute inset-0 flex flex-col justify-end p-6 pb-20 md:p-16 md:pb-24 max-w-7xl mx-auto w-full">
        <motion.div 
          variants={{
            hidden: { opacity: 0 },
            show: {
              opacity: 1,
              transition: {
                staggerChildren: 0.15,
                delayChildren: 0.3
              }
            }
          }}
          initial="hidden"
          animate="show"
          className="max-w-2xl text-left"
        >
          {/* Badge */}
          <motion.span 
            variants={{
              hidden: { opacity: 0, y: 15 },
              show: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 100 } }
            }}
            className="inline-block bg-white/20 backdrop-blur-sm text-white font-sans text-xs font-semibold tracking-[0.2em] px-4 py-1.5 rounded-full mb-6 uppercase"
          >
            New Collection
          </motion.span>

          {/* Title */}
          <motion.h1 
            variants={{
              hidden: { opacity: 0, y: 20 },
              show: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 80, damping: 15 } }
            }}
            className="font-serif text-5xl md:text-7xl text-white leading-[1.1] tracking-tight"
          >
            The Amber Ritual
          </motion.h1>

          {/* Subtitle */}
          <motion.p 
            variants={{
              hidden: { opacity: 0, y: 15 },
              show: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 80, damping: 15 } }
            }}
            className="font-serif text-lg text-white/80 mt-4 leading-relaxed"
          >
            Embrace the warmth of nature&apos;s glow. Handcrafted to ground your spirit.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div 
            variants={{
              hidden: { opacity: 0, y: 15 },
              show: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 90, damping: 15 } }
            }}
            className="flex flex-wrap gap-4 mt-8"
          >
            <a
              href="#vibe-section"
              className="px-8 py-3.5 bg-accent-primary text-white font-sans font-medium rounded-full hover:bg-opacity-90 hover:scale-[1.02] active:scale-[0.98] transition-all text-sm tracking-wide shadow-lg shadow-black/10"
            >
              Shop the Collection
            </a>
            <a
              href="#story-section"
              className="px-8 py-3.5 border border-white/30 bg-white/5 backdrop-blur-sm text-white font-sans font-medium rounded-full hover:bg-white/10 hover:scale-[1.02] active:scale-[0.98] transition-all text-sm tracking-wide"
            >
              Our Story
            </a>
          </motion.div>
        </motion.div>
      </div>

      {/* Scroll indicator — mobile only */}
      <div className="absolute bottom-6 right-6 z-10 flex flex-col items-center gap-1 md:hidden">
        <span className="w-px h-8 bg-white/40 animate-pulse" />
        <span className="text-white/50 text-[9px] tracking-[0.2em] uppercase font-sans">
          Scroll
        </span>
      </div>
    </section>
  );
}
