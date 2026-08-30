"use client";

import Image from "next/image";
import Link from "next/link";
import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence, useMotionValue, useTransform } from "framer-motion";
import { Sparkles, Heart, ArrowRight, Flower2, Gift, Send } from "lucide-react";

interface Vibe {
  id: string;
  label: string;
  tagline: string;
  title: [string, string];
  desc: string;
  image: string;
  alt: string;
  notes: string[];
  ctaText: string;
  ctaLink: string;
  craftBadge: string;
}

const VIBES: Vibe[] = [
  {
    id: "blooms",
    label: "Handmade Blooms",
    tagline: "CHISÓ CREATIONS / CHENILLE FLOWERS",
    title: ["Blooming Happiness,", "Crafted by Hand."],
    desc: "Plush, everlasting chenille flower bouquets handcrafted with love in soft blushing pinks and warm cream tones. Never wilts, no water needed.",
    image: "https://images.unsplash.com/photo-1582794543139-8ac9cb0f7b11?q=80&w=1000&auto=format&fit=crop",
    alt: "Handcrafted pink chenille tulip bouquet with satin ribbon and craft tag",
    notes: ["Chenille Velvet", "Everlasting Keepsake", "Hand-tied Satin Bow"],
    ctaText: "Shop Handcrafted Blooms",
    ctaLink: "/shop?category=Blooms",
    craftBadge: "Made with love. Kept forever. ♡"
  },
  {
    id: "charms",
    label: "Adorable Charms",
    tagline: "CHISÓ CREATIONS / BAG CHARMS",
    title: ["Little Charms,", "Big Happiness."],
    desc: "Adorable miniature plush tulips, woven crochet hearts, and lustrous pearl beads designed to brighten your favorite totes and keys.",
    image: "https://images.unsplash.com/photo-1611085583191-a3b181a88401?q=80&w=1000&auto=format&fit=crop",
    alt: "Handmade chenille tulip and woven crochet heart keychain with pearl beads",
    notes: ["Plush Mini Bloom", "Crochet Heart", "Faux Pearl Keychain"],
    ctaText: "Explore Bag Charms",
    ctaLink: "/shop?category=Charms",
    craftBadge: "Adorable & Unique ♡"
  },
  {
    id: "decor",
    label: "Woven Décor",
    tagline: "CHISÓ CREATIONS / ROOM & DESK DÉCOR",
    title: ["Cozy Warmth for", "Every Space."],
    desc: "Handcrafted daisy flower arrangements in miniature woven rattan baskets with easel stands to add sunny cheer to desks and bedrooms.",
    image: "https://images.unsplash.com/photo-1563245372-f21724e3856d?q=80&w=1000&auto=format&fit=crop",
    alt: "Handmade daisy blooms in woven basket pot on wooden display stand",
    notes: ["Woven Basket Pot", "Hand-stitched Daisies", "Wooden Stand"],
    ctaText: "Discover Décor Pieces",
    ctaLink: "/shop?category=Décor",
    craftBadge: "Handmade to Beautify Spaces ✨"
  }
];

export default function HeroSection() {
  const [activeVibe, setActiveVibe] = useState<string>("blooms");
  const [isAutoplay, setIsAutoplay] = useState<boolean>(true);
  const containerRef = useRef<HTMLDivElement>(null);

  // Motion values for 3D tilt parallax
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    mouseX.set(x);
    mouseY.set(y);
  };

  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
  };

  const rotateX = useTransform(mouseY, [-0.5, 0.5], [8, -8]);
  const rotateY = useTransform(mouseX, [-0.5, 0.5], [-8, 8]);
  const cardX = useTransform(mouseX, [-0.5, 0.5], [-12, 12]);
  const cardY = useTransform(mouseY, [-0.5, 0.5], [-12, 12]);

  // Autoplay rotation
  useEffect(() => {
    if (!isAutoplay) return;
    const interval = setInterval(() => {
      setActiveVibe((prev) => {
        const currentIndex = VIBES.findIndex((v) => v.id === prev);
        const nextIndex = (currentIndex + 1) % VIBES.length;
        return VIBES[nextIndex].id;
      });
    }, 6500);
    return () => clearInterval(interval);
  }, [isAutoplay]);

  const currentVibe = VIBES.find((v) => v.id === activeVibe) || VIBES[0];

  return (
    <section 
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="relative min-h-[90vh] md:min-h-[88vh] flex items-center justify-center overflow-hidden py-12 md:py-16 bg-[#FAF7F2]"
    >
      {/* Background Soft Pastel Gradient Blurs */}
      <div className="absolute top-10 left-1/4 w-96 h-96 bg-[#FADCD9]/40 rounded-full blur-3xl pointer-events-none -z-10" />
      <div className="absolute bottom-10 right-1/4 w-96 h-96 bg-[#EBF1EA]/50 rounded-full blur-3xl pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-6 md:px-12 w-full grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
        
        {/* ── Left Column: Editorial Copy ── */}
        <div className="lg:col-span-7 space-y-6 sm:space-y-8 text-left z-10">
          
          {/* Pill Badge */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white border border-[#EFE7DD] shadow-xs text-brand-terracotta text-xs font-sans tracking-widest uppercase font-semibold"
          >
            <Sparkles className="w-3.5 h-3.5 text-brand-gold animate-spin-slow" />
            <span>Little luxuries, handcrafted. ✨</span>
          </motion.div>

          {/* Headline with script accent */}
          <AnimatePresence mode="wait">
            <motion.div
              key={currentVibe.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5, ease: "easeOut" }}
              className="space-y-2"
            >
              <span className="font-sans text-xs tracking-[0.25em] uppercase text-brand-text-muted font-bold block">
                {currentVibe.tagline}
              </span>
              <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl text-[#422926] leading-[1.12] font-bold tracking-tight">
                {currentVibe.title[0]}{" "}
                <span className="font-script text-5xl sm:text-6xl lg:text-7xl font-normal text-brand-terracotta block sm:inline">
                  {currentVibe.title[1]}
                </span>
              </h1>
              <p className="font-sans text-sm sm:text-base text-brand-text-muted max-w-xl font-normal leading-relaxed pt-2">
                {currentVibe.desc}
              </p>
            </motion.div>
          </AnimatePresence>

          {/* Notes pills */}
          <div className="flex flex-wrap gap-2 pt-1">
            {currentVibe.notes.map((note, idx) => (
              <span
                key={idx}
                className="px-3.5 py-1 rounded-full text-xs font-sans font-medium bg-[#F3EBE6] text-[#422926]/80 flex items-center gap-1.5"
              >
                <Heart className="w-2.5 h-2.5 text-brand-blush fill-brand-blush" />
                {note}
              </span>
            ))}
          </div>

          {/* Action CTAs */}
          <div className="flex flex-wrap items-center gap-4 pt-2">
            <Link
              href={currentVibe.ctaLink}
              className="px-8 py-4 rounded-full bg-brand-terracotta hover:bg-[#B34E59] text-white font-sans text-xs sm:text-sm font-semibold tracking-wider uppercase transition-all shadow-md hover:shadow-lg flex items-center gap-2 group"
            >
              <span>{currentVibe.ctaText}</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>

            <Link
              href="/shop?category=Custom%20Creations"
              className="px-6 py-4 rounded-full bg-white hover:bg-[#FBF8F4] text-[#422926] border border-[#EFE7DD] hover:border-brand-rose font-sans text-xs sm:text-sm font-semibold tracking-wider transition-all flex items-center gap-2 shadow-xs"
            >
              <Send className="w-3.5 h-3.5 text-brand-terracotta" />
              <span>Custom Creation (DM us ♡)</span>
            </Link>
          </div>

          {/* Interactive Vibe Selectors */}
          <div className="pt-6 border-t border-[#EFE7DD] flex flex-wrap items-center gap-3">
            <span className="font-sans text-xs text-brand-text-muted uppercase tracking-wider font-semibold mr-2">
              Explore:
            </span>
            {VIBES.map((vibe) => {
              const isActive = vibe.id === activeVibe;
              return (
                <button
                  key={vibe.id}
                  onClick={() => {
                    setActiveVibe(vibe.id);
                    setIsAutoplay(false);
                  }}
                  className={`px-4 py-2 rounded-full text-xs font-sans transition-all duration-300 cursor-pointer ${
                    isActive
                      ? "bg-[#422926] text-[#FAF7F2] font-bold shadow-xs scale-105"
                      : "bg-white text-[#422926]/70 border border-[#EFE7DD] hover:border-brand-rose hover:text-[#422926]"
                  }`}
                >
                  {vibe.label}
                </button>
              );
            })}
          </div>

        </div>

        {/* ── Right Column: 3D Tilt Image Showcase with Floating Tags ── */}
        <div className="lg:col-span-5 relative flex items-center justify-center">
          
          {/* Main 3D Card */}
          <motion.div
            style={{
              rotateX,
              rotateY,
              x: cardX,
              y: cardY,
              transformStyle: "preserve-3d",
            }}
            className="relative w-full aspect-4/5 max-w-md rounded-3xl overflow-hidden shadow-2xl bg-white p-3 border border-[#EFE7DD]"
          >
            <div className="relative w-full h-full rounded-2xl overflow-hidden bg-brand-taupe">
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentVibe.id}
                  initial={{ opacity: 0, scale: 1.08 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.96 }}
                  transition={{ duration: 0.7 }}
                  className="relative w-full h-full"
                >
                  <Image
                    src={currentVibe.image}
                    alt={currentVibe.alt}
                    fill
                    priority
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, 40vw"
                  />
                  {/* Subtle vignette gradient */}
                  <div className="absolute inset-0 bg-gradient-to-t from-[#422926]/40 via-transparent to-transparent" />
                </motion.div>
              </AnimatePresence>

              {/* Bottom Image Tag */}
              <div className="absolute bottom-4 left-4 right-4 p-3.5 rounded-xl bg-white/90 backdrop-blur-md border border-white/60 shadow-lg flex items-center justify-between text-left">
                <div>
                  <h4 className="font-serif text-sm font-bold text-[#422926]">
                    {currentVibe.label}
                  </h4>
                  <p className="font-sans text-[11px] text-brand-text-muted">
                    100% Handcrafted • Never Wilts
                  </p>
                </div>
                <span className="font-script text-lg text-brand-terracotta">
                  Chisó ♡
                </span>
              </div>
            </div>
          </motion.div>

          {/* Floating Craft Tag 1 (Top Left) */}
          <motion.div
            animate={{ y: [0, -6, 0] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            className="absolute -top-4 -left-4 sm:-left-8 bg-white border border-[#EFE7DD] rounded-2xl p-3 sm:p-4 shadow-xl z-20 hidden sm:flex items-center gap-3 max-w-[200px]"
          >
            <div className="w-9 h-9 rounded-full bg-brand-rose-light flex items-center justify-center text-brand-terracotta shrink-0">
              <Heart className="w-4 h-4 fill-brand-terracotta" />
            </div>
            <div>
              <p className="font-sans text-[11px] font-bold text-[#422926] leading-tight">
                Made with love.
              </p>
              <p className="font-script text-xs text-brand-terracotta">
                Kept forever. ♡
              </p>
            </div>
          </motion.div>

          {/* Floating Craft Tag 2 (Bottom Right) */}
          <motion.div
            animate={{ y: [0, 6, 0] }}
            transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
            className="absolute -bottom-4 -right-4 sm:-right-6 bg-white border border-[#EFE7DD] rounded-2xl p-3 sm:p-4 shadow-xl z-20 hidden sm:flex items-center gap-3 max-w-[220px]"
          >
            <div className="w-9 h-9 rounded-full bg-brand-sage-light flex items-center justify-center text-brand-sage shrink-0">
              <Flower2 className="w-4 h-4" />
            </div>
            <div>
              <p className="font-sans text-[11px] font-bold text-[#422926] leading-tight">
                Blooming happiness,
              </p>
              <p className="font-script text-xs text-brand-terracotta">
                crafted by hand. ✨
              </p>
            </div>
          </motion.div>

        </div>

      </div>
    </section>
  );
}
