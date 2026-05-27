"use client";

import Image from "next/image";
import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence, useMotionValue, useTransform } from "framer-motion";
import { ArrowRight, Sparkles } from "lucide-react";

interface Vibe {
  id: string;
  label: string;
  tagline: string;
  title: [string, string];
  desc: string;
  image: string;
  notes: string[];
  ctaText: string;
  ctaLink: string;
  sensoryText: string;
}

const VIBES: Vibe[] = [
  {
    id: "amber",
    label: "Amber Ritual",
    tagline: "RUYRA / SIGNATURE COLLECTION",
    title: ["Sanctuary in", "Every Detail"],
    desc: "Botanical rituals handcrafted with notes of warm amber, cedarwood & wild vetiver. Formulated with pure soy wax to ground your spirit.",
    image: "/hero_bg.png",
    notes: ["Warm Amber", "Cedarwood", "Wild Vetiver"],
    ctaText: "Shop Amber Collection",
    ctaLink: "#vibe-section",
    sensoryText: "100% natural, hand-poured in small batches."
  },
  {
    id: "bath",
    label: "Bath Rituals",
    tagline: "RUYRA / BATH & BODY",
    title: ["Rest in the", "Mineral Depths"],
    desc: "A restorative blend of mineral-rich pink Himalayan salt, Dead Sea salt, and organic lavender. Dissolves to release a grounding aroma.",
    image: "https://images.unsplash.com/photo-1540555700478-4be289fbecef?q=80&w=800&auto=format&fit=crop",
    notes: ["Pink Salt", "Lavender", "Chamomile"],
    ctaText: "Explore Bath Rituals",
    ctaLink: "#vibe-section",
    sensoryText: "Restorative dead-sea minerals & floral extracts."
  },
  {
    id: "earthen",
    label: "Earthen Clay",
    tagline: "RUYRA / HOME DECOR",
    title: ["Molded by", "Fire & Hands"],
    desc: "Molded by hand in clay, then wood-fired to create unique surface irregularities. Adds raw, tactile geometry and rustic elegance to any space.",
    image: "https://images.unsplash.com/photo-1612196808214-b8e1d6145a8c?q=80&w=800&auto=format&fit=crop",
    notes: ["Sable Clay", "Wood-fired", "Tactile Sandstone"],
    ctaText: "View Decor Pieces",
    ctaLink: "#vibe-section",
    sensoryText: "Hand-thrown clay, fired with natural iron spots."
  }
];

export default function HeroSection() {
  const [activeVibe, setActiveVibe] = useState<string>("amber");
  const [isAutoplay, setIsAutoplay] = useState<boolean>(true);
  const containerRef = useRef<HTMLDivElement>(null);

  // Motion values for mouse movement (3D tilt parallax) - Desktop only
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5; // range: -0.5 to 0.5
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    mouseX.set(x);
    mouseY.set(y);
  };

  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
  };

  // Map mouse coordinates to 3D rotation & floating translation
  const rotateX = useTransform(mouseY, [-0.5, 0.5], [10, -10]);
  const rotateY = useTransform(mouseX, [-0.5, 0.5], [-10, 10]);
  const cardX = useTransform(mouseX, [-0.5, 0.5], [-15, 15]);
  const cardY = useTransform(mouseY, [-0.5, 0.5], [-15, 15]);

  // Automatic vibe switching logic
  useEffect(() => {
    if (!isAutoplay) return;

    const interval = setInterval(() => {
      setActiveVibe((prev) => {
        const currentIndex = VIBES.findIndex((v) => v.id === prev);
        const nextIndex = (currentIndex + 1) % VIBES.length;
        return VIBES[nextIndex].id;
      });
    }, 6500); // switches every 6.5 seconds

    return () => clearInterval(interval);
  }, [isAutoplay, activeVibe]);

  const currentVibe = VIBES.find((v) => v.id === activeVibe) || VIBES[0];

  const getVibeColor = (id: string) => {
    switch (id) {
      case "amber":
        return "var(--color-brand-terracotta)";
      case "bath":
        return "#7E8E76"; // Sage Green
      case "earthen":
        return "#8C6D58"; // Clay Sable
      default:
        return "var(--color-brand-terracotta)";
    }
  };

  return (
    <section 
      onMouseEnter={() => setIsAutoplay(false)}
      onMouseLeave={() => setIsAutoplay(true)}
      className="relative min-h-[90vh] landscape:min-h-[85vh] w-full bg-brand-sand overflow-hidden flex flex-col justify-center border-b border-brand-brown/5 pb-[64px] md:pb-0"
    >
      {/* Subtle organic light glow overlay behind the layout (Desktop only) */}
      <div className="absolute inset-0 pointer-events-none -z-10 overflow-hidden hidden lg:block">
        <motion.div
          animate={{
            background: activeVibe === "amber" 
              ? "radial-gradient(circle at 15% 25%, rgba(184, 91, 63, 0.05) 0%, transparent 60%)"
              : activeVibe === "bath"
              ? "radial-gradient(circle at 15% 25%, rgba(126, 142, 118, 0.06) 0%, transparent 60%)"
              : "radial-gradient(circle at 15% 25%, rgba(140, 109, 88, 0.06) 0%, transparent 60%)"
          }}
          className="absolute inset-0 transition-all duration-1000"
        />
      </div>

      {/* Main Grid Wrapper */}
      <div className="max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-12 py-6 landscape:py-16 grid grid-cols-1 landscape:grid-cols-12 gap-6 landscape:gap-16 items-center">
        
        {/* Right Sensory Canvas Panel (Image Container - Order-1 on mobile so visual loads at the top) */}
        <div
          ref={containerRef}
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
          style={{ perspective: 1000 }}
          className="landscape:col-span-7 flex items-center justify-center order-1 landscape:order-2 w-full select-none"
        >
          {/* Color aura behind image (Desktop only) */}
          <motion.div
            animate={{
              backgroundColor: activeVibe === "amber" 
                ? "rgba(184, 91, 63, 0.12)" 
                : activeVibe === "bath" 
                ? "rgba(126, 142, 118, 0.14)" 
                : "rgba(140, 109, 88, 0.14)",
            }}
            className="absolute -inset-6 blur-3xl rounded-full opacity-60 pointer-events-none transition-colors duration-700 -z-10 hidden lg:block"
          />

          {/* Main 3D visual card - Compact on mobile (h-[28vh] to h-[35vh]), large on desktop */}
          <motion.div
            style={{
              rotateX,
              rotateY,
              transformStyle: "preserve-3d",
            }}
            className="relative w-full h-[28vh] sm:h-[35vh] portrait:sm:h-[45vh] landscape:h-[68vh] rounded-2xl lg:rounded-3xl overflow-hidden shadow-[0_12px_30px_rgba(62,44,36,0.08)] lg:shadow-[0_20px_50px_rgba(62,44,36,0.12)] border border-brand-brown/5 bg-brand-taupe/20"
          >
            {/* Image Transition Slider */}
            <AnimatePresence mode="wait">
              <motion.div
                key={activeVibe}
                initial={{ opacity: 0, scale: 1.04 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.96 }}
                transition={{ duration: 0.55, ease: "easeInOut" }}
                className="absolute inset-0 w-full h-full"
              >
                <Image
                  src={currentVibe.image}
                  alt={currentVibe.label}
                  fill
                  priority
                  sizes="(max-width: 1024px) 100vw, 55vw"
                  className="object-cover object-center"
                />
                {/* Visual shade gradient */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/45 via-black/10 to-transparent pointer-events-none" />
              </motion.div>
            </AnimatePresence>

            {/* Floating 3D Parallax Detail Card (Responsive sizing) */}
            <motion.div
              style={{
                x: cardX,
                y: cardY,
                translateZ: 50,
              }}
              className="absolute bottom-3 left-3 right-3 p-3.5 lg:bottom-6 lg:left-6 lg:right-6 lg:p-5 backdrop-blur-md bg-white/10 border border-white/20 rounded-xl lg:rounded-2xl text-white shadow-xl flex flex-col justify-end gap-0.5 pointer-events-none"
            >
              <div className="font-sans text-[8px] sm:text-[9px] tracking-[0.25em] uppercase text-white/70 font-semibold flex items-center gap-1.5">
                <Sparkles className="w-2.5 h-2.5 sm:w-3 sm:h-3 stroke-[2] text-accent-gold" />
                Sensory Spec
              </div>
              <div className="font-serif text-[11px] sm:text-xs lg:text-base font-medium leading-snug mt-0.5 text-white">
                {currentVibe.sensoryText}
              </div>
              <div className="font-sans text-[8px] sm:text-[9px] text-white/60 mt-0.5 flex items-center gap-1.5">
                <span className="w-1 h-1 rounded-full bg-accent-gold animate-pulse" />
                Pure Intention • Cruelty-Free
              </div>
            </motion.div>
          </motion.div>
        </div>

        {/* Left Editorial Panel (Order-2 on mobile so it sits cleanly below the image) */}
        <div className="landscape:col-span-5 flex flex-col justify-center w-full max-w-[480px] sm:portrait:max-w-[560px] landscape:max-w-none mx-auto p-0 order-2 landscape:order-1">
          {/* Collection Tag */}
          <div className="flex items-center gap-2 mb-3 landscape:mb-6">
            <span className="h-px w-6 bg-brand-brown/30" />
            <span className="font-sans text-[9px] tracking-[0.25em] uppercase text-brand-brown/60 font-semibold">
              {currentVibe.tagline}
            </span>
          </div>

          {/* Vibe Switcher Tabs (Horizontal scroll on mobile, wrap/flex on desktop) */}
          <div className="flex overflow-x-auto no-scrollbar gap-1 p-0.5 bg-brand-taupe/30 border border-brand-brown/5 rounded-full max-w-full mb-5 landscape:mb-8 shrink-0 w-max">
            {VIBES.map((v) => (
              <button
                key={v.id}
                onClick={() => {
                  setActiveVibe(v.id);
                  setIsAutoplay(false);
                }}
                suppressHydrationWarning
                className="relative px-3.5 py-1.5 sm:py-2 rounded-full font-sans text-[9px] sm:text-xs uppercase tracking-widest font-bold transition-all cursor-pointer z-10 whitespace-nowrap"
                style={{
                  color: activeVibe === v.id ? "var(--color-brand-sand)" : "var(--color-brand-brown)",
                }}
              >
                {activeVibe === v.id && (
                  <motion.span
                    layoutId="hero-active-vibe-capsule"
                    className="absolute inset-0 bg-brand-brown rounded-full -z-10"
                    transition={{ type: "spring", stiffness: 380, damping: 30 }}
                  />
                )}
                {v.label}
              </button>
            ))}
          </div>

          {/* Sequential Reveal Header */}
          <div key={`header-${activeVibe}`} className="overflow-hidden">
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ type: "spring", stiffness: 90, damping: 20 }}
              className="font-serif text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl text-brand-brown leading-[1.15] tracking-wide"
            >
              <span className="block">{currentVibe.title[0]}</span>
              <motion.span
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ type: "spring", stiffness: 90, damping: 20, delay: 0.12 }}
                className="block font-serif italic mt-1 font-normal"
                style={{ color: getVibeColor(activeVibe) }}
              >
                {currentVibe.title[1]}
              </motion.span>
            </motion.h1>
          </div>

          {/* Subtitle Description */}
          <motion.p
            key={`desc-${activeVibe}`}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ type: "spring", stiffness: 90, damping: 20, delay: 0.22 }}
            className="font-sans text-xs sm:text-sm lg:text-base text-brand-text-muted mt-3 landscape:mt-6 leading-relaxed font-light"
          >
            {currentVibe.desc}
          </motion.p>

          {/* Fragrance / Product Ingredient Badges */}
          <motion.div
            key={`notes-${activeVibe}`}
            initial="hidden"
            animate="show"
            variants={{
              hidden: { opacity: 0 },
              show: {
                opacity: 1,
                transition: {
                  staggerChildren: 0.08,
                  delayChildren: 0.32,
                },
              },
            }}
            className="flex flex-wrap gap-1.5 mt-5"
          >
            {currentVibe.notes.map((note) => (
              <motion.span
                key={note}
                variants={{
                  hidden: { opacity: 0, y: 5 },
                  show: { opacity: 1, y: 0 },
                }}
                className="px-3 py-1 bg-brand-taupe/40 border border-brand-brown/5 rounded-full font-sans text-[9px] sm:text-[10px] tracking-wider text-brand-brown font-medium flex items-center gap-1.5"
              >
                <span className="w-1 h-1 rounded-full bg-brand-terracotta/60" />
                {note}
              </motion.span>
            ))}
          </motion.div>

          {/* CTAs (Side-by-side on mobile and tablet to save vertical height) */}
          <motion.div
            key={`ctas-${activeVibe}`}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ type: "spring", stiffness: 90, damping: 20, delay: 0.42 }}
            className="flex flex-col min-[360px]:flex-row gap-3 mt-6 landscape:mt-8 w-full"
          >
            <a
              href={currentVibe.ctaLink}
              className="flex-1 landscape:flex-none inline-flex items-center justify-center gap-2 px-4 sm:px-6 py-3.5 bg-brand-brown text-brand-sand font-sans text-[10px] sm:text-xs font-bold tracking-widest uppercase transition-all duration-300 hover:bg-brand-brown/95 hover:shadow-lg hover:shadow-brand-brown/10 rounded-md cursor-pointer group"
            >
              {currentVibe.ctaText.replace("Collection", "")} {/* Make it slightly shorter for mobile */}
              <ArrowRight className="w-3.5 h-3.5 stroke-[2] transition-transform duration-300 group-hover:translate-x-1" />
            </a>
            <a
              href="#sustainability-section"
              className="flex-1 landscape:flex-none inline-flex items-center justify-center px-4 sm:px-6 py-3.5 border border-brand-brown/20 text-brand-brown font-sans text-[10px] sm:text-xs font-bold tracking-widest uppercase hover:bg-brand-brown/5 transition-all duration-300 rounded-md cursor-pointer"
            >
              Our Story
            </a>
          </motion.div>
        </div>

      </div>
    </section>
  );
}
