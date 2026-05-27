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
    desc: "Botanical rituals handcrafted with notes of warm amber, cedarwood & wild vetiver. Formulated with pure soy wax to ground your spirit and soothe the senses.",
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
    desc: "A restorative blend of mineral-rich pink Himalayan salt, Dead Sea salt, and organic botanical extracts of lavender and chamomile. Dissolves to release a calm, grounding aroma.",
    image: "https://images.unsplash.com/photo-1540555700478-4be289fbecef?q=80&w=800&auto=format&fit=crop",
    notes: ["Pink Himalayan Salt", "Lavender", "Chamomile"],
    ctaText: "Explore Bath Rituals",
    ctaLink: "#vibe-section",
    sensoryText: "Restorative dead-sea minerals & floral extracts."
  },
  {
    id: "earthen",
    label: "Earthen Clay",
    tagline: "RUYRA / HOME DECOR",
    title: ["Molded by", "Fire & Hands"],
    desc: "Molded by hand in clay, then wood-fired to create unique surface irregularities. This sculptural holder adds raw, tactile geometry and rustic elegance to any table setting.",
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

  // Motion values for mouse movement (3D tilt parallax)
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
      className="relative min-h-[90vh] lg:min-h-[85vh] w-full bg-brand-sand overflow-hidden flex flex-col justify-center border-b border-brand-brown/5"
    >
      {/* Subtle organic light glow overlay behind the layout */}
      <div className="absolute inset-0 pointer-events-none -z-10 overflow-hidden">
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

      <div className="max-w-7xl mx-auto w-full px-6 py-12 lg:py-16 grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
        {/* Left Editorial Panel: Tag, Vibe Switcher, Headlines, and CTAs (Col-span 5 for larger image ratio) */}
        <div className="lg:col-span-5 flex flex-col justify-center order-2 lg:order-1">
          {/* Collection Tag */}
          <div className="flex items-center gap-2 mb-6">
            <span className="h-px w-6 bg-brand-brown/30" />
            <span className="font-sans text-[10px] tracking-[0.25em] uppercase text-brand-brown/60 font-semibold">
              {currentVibe.tagline}
            </span>
          </div>

          {/* Vibe Switcher Tabs */}
          <div className="flex flex-wrap gap-1.5 p-1 bg-brand-taupe/30 border border-brand-brown/5 rounded-full w-fit mb-8">
            {VIBES.map((v) => (
              <button
                key={v.id}
                onClick={() => {
                  setActiveVibe(v.id);
                  // Temporarily disable autoplay briefly when clicked
                  setIsAutoplay(false);
                }}
                className="relative px-4 py-2 rounded-full font-sans text-[10px] md:text-xs uppercase tracking-widest font-bold transition-all cursor-pointer z-10"
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
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ type: "spring", stiffness: 90, damping: 20 }}
              className="font-serif text-4xl md:text-5xl lg:text-6xl text-brand-brown leading-[1.15] tracking-wide max-w-xl"
            >
              <span className="block">{currentVibe.title[0]}</span>
              <motion.span
                initial={{ opacity: 0, y: 25 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ type: "spring", stiffness: 90, damping: 20, delay: 0.12 }}
                className="block font-serif italic mt-1.5 font-normal"
                style={{ color: getVibeColor(activeVibe) }}
              >
                {currentVibe.title[1]}
              </motion.span>
            </motion.h1>
          </div>

          {/* Subtitle Description */}
          <motion.p
            key={`desc-${activeVibe}`}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ type: "spring", stiffness: 90, damping: 20, delay: 0.22 }}
            className="font-sans text-xs md:text-sm lg:text-base text-brand-text-muted mt-6 max-w-md leading-relaxed font-light"
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
            className="flex flex-wrap gap-2 mt-8"
          >
            {currentVibe.notes.map((note) => (
              <motion.span
                key={note}
                variants={{
                  hidden: { opacity: 0, y: 8 },
                  show: { opacity: 1, y: 0 },
                }}
                className="px-3.5 py-1.5 bg-brand-taupe/40 border border-brand-brown/5 rounded-full font-sans text-[10px] md:text-[11px] tracking-wider text-brand-brown font-medium flex items-center gap-1.5"
              >
                <span className="w-1 h-1 rounded-full bg-brand-terracotta/60" />
                {note}
              </motion.span>
            ))}
          </motion.div>

          {/* CTAs */}
          <motion.div
            key={`ctas-${activeVibe}`}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ type: "spring", stiffness: 90, damping: 20, delay: 0.42 }}
            className="flex flex-col sm:flex-row gap-4 mt-10"
          >
            <a
              href={currentVibe.ctaLink}
              className="inline-flex items-center justify-center gap-2 px-8 py-3.5 bg-brand-brown text-brand-sand font-sans text-xs font-bold tracking-widest uppercase transition-all duration-300 hover:bg-brand-brown/95 hover:shadow-lg hover:shadow-brand-brown/10 rounded-md cursor-pointer group"
            >
              {currentVibe.ctaText}
              <ArrowRight className="w-3.5 h-3.5 stroke-[2] transition-transform duration-300 group-hover:translate-x-1" />
            </a>
            <a
              href="#sustainability-section"
              className="inline-flex items-center justify-center px-8 py-3.5 border border-brand-brown/20 text-brand-brown font-sans text-xs font-bold tracking-widest uppercase hover:bg-brand-brown/5 transition-all duration-300 rounded-md cursor-pointer"
            >
              Our Story
            </a>
          </motion.div>
        </div>

        {/* Right Sensory Canvas Panel: Interactive Image Frame with 3D Parallax Tilt (Col-span 7 for a larger visual) */}
        <div
          ref={containerRef}
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
          style={{ perspective: 1000 }}
          className="lg:col-span-7 flex items-center justify-center order-1 lg:order-2 w-full select-none"
        >
          {/* Color aura behind image */}
          <motion.div
            animate={{
              backgroundColor: activeVibe === "amber" 
                ? "rgba(184, 91, 63, 0.12)" 
                : activeVibe === "bath" 
                ? "rgba(126, 142, 118, 0.14)" 
                : "rgba(140, 109, 88, 0.14)",
            }}
            className="absolute -inset-6 blur-3xl rounded-full opacity-60 pointer-events-none transition-colors duration-700 -z-10"
          />

          {/* Main 3D Card (Increased height to h-[68vh] for more prominence) */}
          <motion.div
            style={{
              rotateX,
              rotateY,
              transformStyle: "preserve-3d",
            }}
            className="relative w-full h-[45vh] sm:h-[50vh] lg:h-[68vh] rounded-3xl overflow-hidden shadow-[0_20px_50px_rgba(62,44,36,0.12)] border border-brand-brown/5 bg-brand-taupe/20"
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

            {/* Floating 3D Parallax Detail Card */}
            <motion.div
              style={{
                x: cardX,
                y: cardY,
                translateZ: 50,
              }}
              className="absolute bottom-6 left-6 right-6 p-5 backdrop-blur-md bg-white/10 border border-white/20 rounded-2xl text-white shadow-xl flex flex-col justify-end gap-1 pointer-events-none"
            >
              <div className="font-sans text-[9px] tracking-[0.25em] uppercase text-white/70 font-semibold flex items-center gap-1.5">
                <Sparkles className="w-3 h-3 stroke-[2] text-accent-gold" />
                Sensory Spec
              </div>
              <div className="font-serif text-sm md:text-base font-medium leading-snug mt-1 text-white">
                {currentVibe.sensoryText}
              </div>
              <div className="font-sans text-[10px] text-white/60 mt-1 flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-accent-gold animate-pulse" />
                Pure Intention • Cruelty-Free
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
