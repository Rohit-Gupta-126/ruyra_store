"use client";

import React, { useRef, useState } from "react";
import { useNode } from "@craftjs/core";
import Image from "next/image";
import { motion, AnimatePresence, useMotionValue, useTransform } from "framer-motion";
import { ArrowRight, Sparkles } from "lucide-react";
import LaunchesAndOffers from "../features/LaunchesAndOffers";
import EditorialInterstitial from "../features/EditorialInterstitial";
import SignaturePieces from "../features/SignaturePieces";
import ValueMarquee from "../features/ValueMarquee";
import Testimonials from "../features/Testimonials";
import Newsletter from "../features/Newsletter";
import Footer from "../layout/Footer";


// ─── USER TEXT COMPONENT ───
export interface UserTextProps {
  text?: string;
  fontSize?: string;
  alignment?: string;
  color?: string;
  fontFamily?: string;
}

export const UserText = ({
  text = "Embrace the warmth of nature's glow.",
  fontSize = "text-base",
  alignment = "text-left",
  color = "text-[#3E2C24]",
  fontFamily = "font-sans"
}: UserTextProps) => {
  const { connectors: { connect, drag }, selected } = useNode((state) => ({
    selected: state.events.selected,
  }));

  return (
    <div
      ref={(ref) => {
        if (ref) connect(drag(ref));
      }}
      className={`p-2 transition-all duration-200 cursor-pointer ${
        selected ? "outline-2 outline-dashed outline-[#B85B3F] outline-offset-2" : "hover:outline-1 hover:outline-dashed hover:outline-[#3E2C24]/30"
      } ${fontSize} ${alignment} ${color} ${fontFamily}`}
    >
      {text || "Click to edit text"}
    </div>
  );
};

const UserTextSettings = () => {
  const { actions: { setProp }, props } = useNode((node) => ({
    props: node.data.props as UserTextProps,
  }));

  return (
    <div className="space-y-4">
      <div>
        <label className="block text-xs font-semibold uppercase tracking-wider text-[#3E2C24]/60 mb-1">Text Content</label>
        <textarea
          value={props.text}
          onChange={(e) => setProp((p: UserTextProps) => (p.text = e.target.value))}
          className="w-full px-3 py-2 bg-white border border-[#3E2C24]/10 rounded-md text-sm text-[#3E2C24] focus:outline-none focus:border-[#B85B3F]"
          rows={3}
        />
      </div>

      <div>
        <label className="block text-xs font-semibold uppercase tracking-wider text-[#3E2C24]/60 mb-1">Font Size</label>
        <select
          value={props.fontSize}
          onChange={(e) => setProp((p: UserTextProps) => (p.fontSize = e.target.value))}
          className="w-full px-3 py-2 bg-white border border-[#3E2C24]/10 rounded-md text-sm text-[#3E2C24] focus:outline-none focus:border-[#B85B3F]"
        >
          <option value="text-xs">Extra Small</option>
          <option value="text-sm">Small</option>
          <option value="text-base">Regular</option>
          <option value="text-lg">Large</option>
          <option value="text-xl">Extra Large</option>
          <option value="text-2xl">2X Large</option>
          <option value="text-3xl">3X Large</option>
          <option value="text-4xl">4X Large</option>
          <option value="text-5xl">5X Large</option>
          <option value="text-6xl">6X Large</option>
        </select>
      </div>

      <div>
        <label className="block text-xs font-semibold uppercase tracking-wider text-[#3E2C24]/60 mb-1">Font Family</label>
        <select
          value={props.fontFamily}
          onChange={(e) => setProp((p: UserTextProps) => (p.fontFamily = e.target.value))}
          className="w-full px-3 py-2 bg-white border border-[#3E2C24]/10 rounded-md text-sm text-[#3E2C24] focus:outline-none focus:border-[#B85B3F]"
        >
          <option value="font-sans">Sans (Inter)</option>
          <option value="font-serif">Serif (Playfair)</option>
        </select>
      </div>

      <div>
        <label className="block text-xs font-semibold uppercase tracking-wider text-[#3E2C24]/60 mb-1">Alignment</label>
        <select
          value={props.alignment}
          onChange={(e) => setProp((p: UserTextProps) => (p.alignment = e.target.value))}
          className="w-full px-3 py-2 bg-white border border-[#3E2C24]/10 rounded-md text-sm text-[#3E2C24] focus:outline-none focus:border-[#B85B3F]"
        >
          <option value="text-left">Left</option>
          <option value="text-center">Center</option>
          <option value="text-right">Right</option>
        </select>
      </div>

      <div>
        <label className="block text-xs font-semibold uppercase tracking-wider text-[#3E2C24]/60 mb-1">Color</label>
        <select
          value={props.color}
          onChange={(e) => setProp((p: UserTextProps) => (p.color = e.target.value))}
          className="w-full px-3 py-2 bg-white border border-[#3E2C24]/10 rounded-md text-sm text-[#3E2C24] focus:outline-none focus:border-[#B85B3F]"
        >
          <option value="text-[#3E2C24]">Brand Brown</option>
          <option value="text-[#B85B3F]">Brand Terracotta</option>
          <option value="text-[#7A6F69]">Text Muted</option>
          <option value="text-white">White</option>
        </select>
      </div>
    </div>
  );
};

UserText.craft = {
  displayName: "Text Block",
  props: {
    text: "Embrace the warmth of nature's glow.",
    fontSize: "text-base",
    alignment: "text-left",
    color: "text-[#3E2C24]",
    fontFamily: "font-sans",
  },
  related: {
    settings: UserTextSettings,
  },
};


// ─── USER HERO COMPONENT ───
export interface UserHeroProps {
  tagline?: string;
  headingText?: string;
  subText?: string;
  imageUrl?: string;
  ctaText?: string;
  ctaLink?: string;
  sensoryText?: string;
  notes?: string;
}

export const UserHero = ({
  tagline = "RUYRA / SIGNATURE COLLECTION",
  headingText = "Sanctuary in Every Detail",
  subText = "Botanical rituals handcrafted with notes of warm amber, cedarwood & wild vetiver. Formulated with pure soy wax to ground your spirit.",
  imageUrl = "/hero_bg.png",
  ctaText = "Shop Amber Collection",
  ctaLink = "/shop",
  sensoryText = "100% natural, hand-poured in small batches.",
  notes = "Warm Amber, Cedarwood, Wild Vetiver"
}: UserHeroProps) => {
  const { connectors: { connect, drag }, selected } = useNode((state) => ({
    selected: state.events.selected,
  }));

  const [activeVibe, setActiveVibe] = useState<string>("amber");
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

  const splitHeading = (text: string) => {
    const words = (text || "").split(" ");
    if (words.length > 2) {
      return [words.slice(0, -2).join(" "), words.slice(-2).join(" ")];
    } else if (words.length === 2) {
      return [words[0], words[1]];
    }
    return [text, ""];
  };

  const VIBES = [
    {
      id: "amber",
      label: "Amber Ritual",
      tagline: tagline,
      title: splitHeading(headingText),
      desc: subText,
      image: imageUrl,
      notes: notes ? notes.split(",").map(n => n.trim()) : [],
      ctaText: ctaText,
      ctaLink: ctaLink,
      sensoryText: sensoryText
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
      ctaLink: "/shop",
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
      ctaLink: "/shop",
      sensoryText: "Hand-thrown clay, fired with natural iron spots."
    }
  ];

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
      ref={(ref) => {
        if (ref) connect(drag(ref));
      }}
      className={`relative min-h-[90vh] landscape:min-h-[85vh] w-full bg-brand-sand overflow-hidden flex flex-col justify-center border-b border-brand-brown/5 pb-16 md:pb-0 transition-all duration-200 cursor-pointer ${
        selected ? "outline-2 outline-dashed outline-[#B85B3F] outline-offset-2" : ""
      }`}
    >
      {/* Subtle organic light glow overlay behind the layout */}
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
        
        {/* Right Sensory Canvas Panel (Image Container) */}
        <div
          ref={containerRef}
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
          style={{ perspective: 1000 }}
          className="landscape:col-span-7 flex items-center justify-center order-1 landscape:order-2 w-full select-none"
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
            className="absolute -inset-6 blur-3xl rounded-full opacity-60 pointer-events-none transition-colors duration-700 -z-10 hidden lg:block"
          />

          {/* Main 3D visual card */}
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
              {currentVibe.image ? (
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
                  <div className="absolute inset-0 bg-linear-to-t from-black/45 via-black/10 to-transparent pointer-events-none" />
                </motion.div>
              ) : (
                <div className="absolute inset-0 bg-brand-taupe/50 flex items-center justify-center text-brand-brown/40 font-sans tracking-widest text-xs uppercase">
                  [ No Background Image Selected ]
                </div>
              )}
            </AnimatePresence>

            {/* Floating 3D Parallax Detail Card */}
            <motion.div
              style={{
                x: cardX,
                y: cardY,
                translateZ: 50,
              }}
              className="absolute bottom-3 left-3 right-3 p-3.5 lg:bottom-6 lg:left-6 lg:right-6 lg:p-5 backdrop-blur-md bg-white/10 border border-white/20 rounded-xl lg:rounded-2xl text-white shadow-xl flex flex-col justify-end gap-0.5 pointer-events-none"
            >
              <div className="font-sans text-[8px] sm:text-[9px] tracking-[0.25em] uppercase text-white/70 font-semibold flex items-center gap-1.5">
                <Sparkles className="w-2.5 h-2.5 sm:w-3 sm:h-3 stroke-2 text-accent-gold" />
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

        {/* Left Editorial Panel */}
        <div className="landscape:col-span-5 flex flex-col justify-center w-full max-w-120 sm:portrait:max-w-140 landscape:max-w-none mx-auto p-0 order-2 landscape:order-1">
          {/* Collection Tag */}
          <div className="flex items-center gap-2 mb-3 landscape:mb-6">
            <span className="h-px w-6 bg-brand-brown/30" />
            <span className="font-sans text-[9px] tracking-[0.25em] uppercase text-brand-brown/60 font-semibold">
              {currentVibe.tagline}
            </span>
          </div>

          {/* Vibe Switcher Tabs */}
          <div className="flex overflow-x-auto no-scrollbar gap-1 p-0.5 bg-brand-taupe/30 border border-brand-brown/5 rounded-full max-w-full mb-5 landscape:mb-8 shrink-0 w-max">
            {VIBES.map((v) => (
              <button
                key={v.id}
                onClick={(e) => {
                  e.stopPropagation(); // Prevent selection when switching vibes in builder
                  setActiveVibe(v.id);
                }}
                className="relative px-3.5 py-1.5 sm:py-2 rounded-full font-sans text-[9px] sm:text-xs uppercase tracking-widest font-bold transition-all cursor-pointer z-10 whitespace-nowrap"
                style={{
                  color: activeVibe === v.id ? "var(--color-brand-sand)" : "var(--color-brand-brown)",
                }}
              >
                {activeVibe === v.id && (
                  <motion.span
                    layoutId="user-hero-active-vibe-capsule"
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

          {/* CTAs */}
          <motion.div
            key={`ctas-${activeVibe}`}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ type: "spring", stiffness: 90, damping: 20, delay: 0.42 }}
            className="flex flex-col min-[360px]:flex-row gap-3 mt-6 landscape:mt-8 w-full"
          >
            <span
              className="flex-1 landscape:flex-none inline-flex items-center justify-center gap-2 px-4 sm:px-6 py-3.5 bg-brand-brown text-brand-sand font-sans text-[10px] sm:text-xs font-bold tracking-widest uppercase transition-all duration-300 hover:bg-brand-brown/95 hover:shadow-lg hover:shadow-brand-brown/10 rounded-md cursor-pointer group"
            >
              {currentVibe.ctaText.replace("Collection", "")}
              <ArrowRight className="w-3.5 h-3.5 stroke-2 transition-transform duration-300 group-hover:translate-x-1" />
            </span>
            <span
              className="flex-1 landscape:flex-none inline-flex items-center justify-center px-4 sm:px-6 py-3.5 border border-brand-brown/20 text-brand-brown font-sans text-[10px] sm:text-xs font-bold tracking-widest uppercase hover:bg-brand-brown/5 transition-all duration-300 rounded-md cursor-pointer"
            >
              Our Story
            </span>
          </motion.div>
        </div>

      </div>
    </section>
  );
};

const UserHeroSettings = () => {
  const { actions: { setProp }, props } = useNode((node) => ({
    props: node.data.props as UserHeroProps,
  }));
  const [uploading, setUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);
    const formData = new FormData();
    formData.append("file", file);

    try {
      const res = await fetch("/api/v1/media/upload", {
        method: "POST",
        body: formData,
      });

      if (!res.ok) {
        throw new Error("Upload failed");
      }

      const data = await res.json();
      setProp((p: UserHeroProps) => (p.imageUrl = data.url));
    } catch (err) {
      console.error("Error uploading image:", err);
      alert("Failed to upload image. Please try again.");
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="space-y-4">
      <div>
        <label className="block text-xs font-semibold uppercase tracking-wider text-[#3E2C24]/60 mb-1">Tagline</label>
        <input
          type="text"
          value={props.tagline}
          onChange={(e) => setProp((p: UserHeroProps) => (p.tagline = e.target.value))}
          className="w-full px-3 py-2 bg-white border border-[#3E2C24]/10 rounded-md text-sm text-[#3E2C24] focus:outline-none focus:border-[#B85B3F]"
        />
      </div>

      <div>
        <label className="block text-xs font-semibold uppercase tracking-wider text-[#3E2C24]/60 mb-1">Heading Text</label>
        <input
          type="text"
          value={props.headingText}
          onChange={(e) => setProp((p: UserHeroProps) => (p.headingText = e.target.value))}
          className="w-full px-3 py-2 bg-white border border-[#3E2C24]/10 rounded-md text-sm text-[#3E2C24] focus:outline-none focus:border-[#B85B3F]"
        />
      </div>

      <div>
        <label className="block text-xs font-semibold uppercase tracking-wider text-[#3E2C24]/60 mb-1">Subtitle Text</label>
        <textarea
          value={props.subText}
          onChange={(e) => setProp((p: UserHeroProps) => (p.subText = e.target.value))}
          className="w-full px-3 py-2 bg-white border border-[#3E2C24]/10 rounded-md text-sm text-[#3E2C24] focus:outline-none focus:border-[#B85B3F]"
          rows={3}
        />
      </div>

      <div>
        <label className="block text-xs font-semibold uppercase tracking-wider text-[#3E2C24]/60 mb-1">Image URL</label>
        <input
          type="text"
          value={props.imageUrl}
          onChange={(e) => setProp((p: UserHeroProps) => (p.imageUrl = e.target.value))}
          className="w-full px-3 py-2 bg-white border border-[#3E2C24]/10 rounded-md text-sm text-[#3E2C24] focus:outline-none focus:border-[#B85B3F]"
          placeholder="https://images.unsplash.com/..."
        />
      </div>

      <div>
        <label className="block text-xs font-semibold uppercase tracking-wider text-[#3E2C24]/60 mb-1">Upload Background</label>
        <div className="flex items-center gap-2 mt-1">
          <input
            type="file"
            ref={fileInputRef}
            onChange={handleFileUpload}
            accept="image/*"
            className="hidden"
          />
          <button
            onClick={() => fileInputRef.current?.click()}
            disabled={uploading}
            className="px-4 py-2 bg-[#3E2C24] text-[#F6F4F0] font-sans text-xs tracking-wider uppercase font-semibold rounded-md hover:bg-[#3E2C24]/90 disabled:opacity-50 transition-colors w-full cursor-pointer"
          >
            {uploading ? "Uploading..." : "Upload Image"}
          </button>
        </div>
      </div>

      <div>
        <label className="block text-xs font-semibold uppercase tracking-wider text-[#3E2C24]/60 mb-1">Sensory Spec Text</label>
        <input
          type="text"
          value={props.sensoryText}
          onChange={(e) => setProp((p: UserHeroProps) => (p.sensoryText = e.target.value))}
          className="w-full px-3 py-2 bg-white border border-[#3E2C24]/10 rounded-md text-sm text-[#3E2C24] focus:outline-none focus:border-[#B85B3F]"
        />
      </div>

      <div>
        <label className="block text-xs font-semibold uppercase tracking-wider text-[#3E2C24]/60 mb-1">Fragrance Notes (comma separated)</label>
        <input
          type="text"
          value={props.notes}
          onChange={(e) => setProp((p: UserHeroProps) => (p.notes = e.target.value))}
          className="w-full px-3 py-2 bg-white border border-[#3E2C24]/10 rounded-md text-sm text-[#3E2C24] focus:outline-none focus:border-[#B85B3F]"
          placeholder="Warm Amber, Cedarwood, Wild Vetiver"
        />
      </div>

      <div>
        <label className="block text-xs font-semibold uppercase tracking-wider text-[#3E2C24]/60 mb-1">CTA Button Text</label>
        <input
          type="text"
          value={props.ctaText}
          onChange={(e) => setProp((p: UserHeroProps) => (p.ctaText = e.target.value))}
          className="w-full px-3 py-2 bg-white border border-[#3E2C24]/10 rounded-md text-sm text-[#3E2C24] focus:outline-none focus:border-[#B85B3F]"
        />
      </div>

      <div>
        <label className="block text-xs font-semibold uppercase tracking-wider text-[#3E2C24]/60 mb-1">CTA Link</label>
        <input
          type="text"
          value={props.ctaLink}
          onChange={(e) => setProp((p: UserHeroProps) => (p.ctaLink = e.target.value))}
          className="w-full px-3 py-2 bg-white border border-[#3E2C24]/10 rounded-md text-sm text-[#3E2C24] focus:outline-none focus:border-[#B85B3F]"
        />
      </div>
    </div>
  );
};

UserHero.craft = {
  displayName: "Hero Banner",
  props: {
    tagline: "RUYRA / SIGNATURE COLLECTION",
    headingText: "Sanctuary in Every Detail",
    subText: "Botanical rituals handcrafted with notes of warm amber, cedarwood & wild vetiver. Formulated with pure soy wax to ground your spirit.",
    imageUrl: "/hero_bg.png",
    ctaText: "Shop Amber Collection",
    ctaLink: "/shop",
    sensoryText: "100% natural, hand-poured in small batches.",
    notes: "Warm Amber, Cedarwood, Wild Vetiver"
  },
  related: {
    settings: UserHeroSettings,
  },
};


// ─── USER CONTAINER COMPONENT ───
export interface UserContainerProps {
  padding?: string;
  margin?: string;
  bg?: string;
  flexDirection?: string;
  alignItems?: string;
  justifyContent?: string;
  children?: React.ReactNode;
}

export const UserContainer = ({
  padding = "p-8",
  margin = "m-0",
  bg = "bg-transparent",
  flexDirection = "flex-col",
  alignItems = "items-center",
  justifyContent = "justify-center",
  children,
}: UserContainerProps) => {
  const { connectors: { connect, drag }, selected } = useNode((state) => ({
    selected: state.events.selected,
  }));

  return (
    <div
      ref={(ref) => {
        if (ref) connect(drag(ref));
      }}
      className={`min-h-[120px] w-full flex transition-all duration-200 ${padding} ${margin} ${bg} ${flexDirection} ${alignItems} ${justifyContent} ${
        selected ? "outline-2 outline-dashed outline-[#B85B3F] outline-offset-2" : "border border-dashed border-[#3E2C24]/10"
      }`}
    >
      {children || (
        <div className="text-xs uppercase tracking-widest text-[#3E2C24]/30 font-sans p-6">
          Empty Container (Drop blocks here)
        </div>
      )}
    </div>
  );
};

const UserContainerSettings = () => {
  const { actions: { setProp }, props } = useNode((node) => ({
    props: node.data.props as UserContainerProps,
  }));

  return (
    <div className="space-y-4">
      <div>
        <label className="block text-xs font-semibold uppercase tracking-wider text-[#3E2C24]/60 mb-1">Background Color</label>
        <select
          value={props.bg}
          onChange={(e) => setProp((p: UserContainerProps) => (p.bg = e.target.value))}
          className="w-full px-3 py-2 bg-white border border-[#3E2C24]/10 rounded-md text-sm text-[#3E2C24] focus:outline-none focus:border-[#B85B3F]"
        >
          <option value="bg-transparent">Transparent</option>
          <option value="bg-[#F6F4F0]">Brand Sand</option>
          <option value="bg-[#EAE4DB]">Brand Taupe</option>
          <option value="bg-[#3E2C24]">Brand Brown</option>
          <option value="bg-[#B85B3F]">Brand Terracotta</option>
          <option value="bg-white">White</option>
        </select>
      </div>

      <div>
        <label className="block text-xs font-semibold uppercase tracking-wider text-[#3E2C24]/60 mb-1">Padding</label>
        <select
          value={props.padding}
          onChange={(e) => setProp((p: UserContainerProps) => (p.padding = e.target.value))}
          className="w-full px-3 py-2 bg-white border border-[#3E2C24]/10 rounded-md text-sm text-[#3E2C24] focus:outline-none focus:border-[#B85B3F]"
        >
          <option value="p-0">None</option>
          <option value="p-4">Small (16px)</option>
          <option value="p-8">Medium (32px)</option>
          <option value="p-12">Large (48px)</option>
          <option value="p-16">Extra Large (64px)</option>
        </select>
      </div>

      <div>
        <label className="block text-xs font-semibold uppercase tracking-wider text-[#3E2C24]/60 mb-1">Direction</label>
        <select
          value={props.flexDirection}
          onChange={(e) => setProp((p: UserContainerProps) => (p.flexDirection = e.target.value))}
          className="w-full px-3 py-2 bg-white border border-[#3E2C24]/10 rounded-md text-sm text-[#3E2C24] focus:outline-none focus:border-[#B85B3F]"
        >
          <option value="flex-col">Vertical Column</option>
          <option value="flex-row">Horizontal Row</option>
        </select>
      </div>

      <div>
        <label className="block text-xs font-semibold uppercase tracking-wider text-[#3E2C24]/60 mb-1">Alignment</label>
        <select
          value={props.alignItems}
          onChange={(e) => setProp((p: UserContainerProps) => (p.alignItems = e.target.value))}
          className="w-full px-3 py-2 bg-white border border-[#3E2C24]/10 rounded-md text-sm text-[#3E2C24] focus:outline-none focus:border-[#B85B3F]"
        >
          <option value="items-start">Start</option>
          <option value="items-center">Center</option>
          <option value="items-end">End</option>
          <option value="items-stretch">Stretch</option>
        </select>
      </div>

      <div>
        <label className="block text-xs font-semibold uppercase tracking-wider text-[#3E2C24]/60 mb-1">Justification</label>
        <select
          value={props.justifyContent}
          onChange={(e) => setProp((p: UserContainerProps) => (p.justifyContent = e.target.value))}
          className="w-full px-3 py-2 bg-white border border-[#3E2C24]/10 rounded-md text-sm text-[#3E2C24] focus:outline-none focus:border-[#B85B3F]"
        >
          <option value="justify-start">Start</option>
          <option value="justify-center">Center</option>
          <option value="justify-end">End</option>
          <option value="justify-between">Space Between</option>
        </select>
      </div>
    </div>
  );
};

UserContainer.craft = {
  displayName: "Layout Grid",
  props: {
    padding: "p-8",
    margin: "m-0",
    bg: "bg-transparent",
    flexDirection: "flex-col",
    alignItems: "items-center",
    justifyContent: "justify-center",
  },
  rules: {
    canMoveIn: () => true,
  },
  related: {
    settings: UserContainerSettings,
  },
};


// ─── USER IMAGE COMPONENT ───
export interface UserImageProps {
  imageUrl?: string;
  altText?: string;
  borderRadius?: string;
  maxHeight?: string;
}

export const UserImage = ({
  imageUrl = "https://images.unsplash.com/photo-1612196808214-b8e1d6145a8c?q=80&w=800&auto=format&fit=crop",
  altText = "Artisanal detail",
  borderRadius = "rounded-xl",
  maxHeight = "400px"
}: UserImageProps) => {
  const { connectors: { connect, drag }, selected } = useNode((state) => ({
    selected: state.events.selected,
  }));

  return (
    <div
      ref={(ref) => {
        if (ref) connect(drag(ref));
      }}
      className={`relative w-full overflow-hidden transition-all duration-200 cursor-pointer ${
        selected ? "outline-2 outline-dashed outline-[#B85B3F] outline-offset-2" : ""
      } ${borderRadius}`}
      style={{ height: maxHeight || "400px" }}
    >
      {imageUrl ? (
        <Image
          src={imageUrl}
          alt={altText || "CMS Image"}
          fill
          className="object-cover"
        />
      ) : (
        <div className="absolute inset-0 bg-[#EAE4DB] flex items-center justify-center text-[#3E2C24]/30 font-sans tracking-widest text-xs uppercase">
          [ Empty Image Block ]
        </div>
      )}
    </div>
  );
};

const UserImageSettings = () => {
  const { actions: { setProp }, props } = useNode((node) => ({
    props: node.data.props as UserImageProps,
  }));
  const [uploading, setUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);
    const formData = new FormData();
    formData.append("file", file);

    try {
      const res = await fetch("/api/v1/media/upload", {
        method: "POST",
        body: formData,
      });

      if (!res.ok) {
        throw new Error("Upload failed");
      }

      const data = await res.json();
      setProp((p: UserImageProps) => (p.imageUrl = data.url));
    } catch (err) {
      console.error("Error uploading image:", err);
      alert("Failed to upload image.");
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="space-y-4">
      <div>
        <label className="block text-xs font-semibold uppercase tracking-wider text-[#3E2C24]/60 mb-1">Image URL</label>
        <input
          type="text"
          value={props.imageUrl}
          onChange={(e) => setProp((p: UserImageProps) => (p.imageUrl = e.target.value))}
          className="w-full px-3 py-2 bg-white border border-[#3E2C24]/10 rounded-md text-sm text-[#3E2C24] focus:outline-none focus:border-[#B85B3F]"
          placeholder="https://images.unsplash.com/..."
        />
      </div>

      <div>
        <label className="block text-xs font-semibold uppercase tracking-wider text-[#3E2C24]/60 mb-1">Upload Image</label>
        <div className="flex items-center gap-2 mt-1">
          <input
            type="file"
            ref={fileInputRef}
            onChange={handleFileUpload}
            accept="image/*"
            className="hidden"
          />
          <button
            onClick={() => fileInputRef.current?.click()}
            disabled={uploading}
            className="px-4 py-2 bg-[#3E2C24] text-[#F6F4F0] font-sans text-xs tracking-wider uppercase font-semibold rounded-md hover:bg-[#3E2C24]/90 disabled:opacity-50 transition-colors w-full cursor-pointer"
          >
            {uploading ? "Uploading..." : "Upload Image"}
          </button>
        </div>
      </div>

      <div>
        <label className="block text-xs font-semibold uppercase tracking-wider text-[#3E2C24]/60 mb-1">Alt Text</label>
        <input
          type="text"
          value={props.altText}
          onChange={(e) => setProp((p: UserImageProps) => (p.altText = e.target.value))}
          className="w-full px-3 py-2 bg-white border border-[#3E2C24]/10 rounded-md text-sm text-[#3E2C24] focus:outline-none focus:border-[#B85B3F]"
        />
      </div>

      <div>
        <label className="block text-xs font-semibold uppercase tracking-wider text-[#3E2C24]/60 mb-1">Height</label>
        <select
          value={props.maxHeight}
          onChange={(e) => setProp((p: UserImageProps) => (p.maxHeight = e.target.value))}
          className="w-full px-3 py-2 bg-white border border-[#3E2C24]/10 rounded-md text-sm text-[#3E2C24] focus:outline-none focus:border-[#B85B3F]"
        >
          <option value="200px">Short (200px)</option>
          <option value="300px">Medium Short (300px)</option>
          <option value="400px">Standard (400px)</option>
          <option value="500px">Tall (500px)</option>
          <option value="600px">Extra Tall (600px)</option>
        </select>
      </div>

      <div>
        <label className="block text-xs font-semibold uppercase tracking-wider text-[#3E2C24]/60 mb-1">Border Radius</label>
        <select
          value={props.borderRadius}
          onChange={(e) => setProp((p: UserImageProps) => (p.borderRadius = e.target.value))}
          className="w-full px-3 py-2 bg-white border border-[#3E2C24]/10 rounded-md text-sm text-[#3E2C24] focus:outline-none focus:border-[#B85B3F]"
        >
          <option value="rounded-none">Sharp Corners</option>
          <option value="rounded-md">Medium Rounded</option>
          <option value="rounded-xl">Highly Rounded</option>
          <option value="rounded-3xl">Pill/Luxury Rounded</option>
        </select>
      </div>
    </div>
  );
};

UserImage.craft = {
  displayName: "Image Block",
  props: {
    imageUrl: "https://images.unsplash.com/photo-1612196808214-b8e1d6145a8c?q=80&w=800&auto=format&fit=crop",
    altText: "Artisanal detail",
    maxHeight: "400px",
    borderRadius: "rounded-xl",
  },
  related: {
    settings: UserImageSettings,
  },
};


// ─── USER LAUNCHES SECTION WRAPPER ───
export const UserLaunchesAndOffers = () => {
  const { connectors: { connect, drag } } = useNode();
  return (
    <div ref={(ref) => { if (ref) connect(drag(ref)); }} className="w-full">
      <LaunchesAndOffers />
    </div>
  );
};
UserLaunchesAndOffers.craft = { displayName: "Special Launches & Offers" };

// ─── USER EDITORIAL SECTION WRAPPER ───
export const UserEditorialInterstitial = () => {
  const { connectors: { connect, drag } } = useNode();
  return (
    <div ref={(ref) => { if (ref) connect(drag(ref)); }} className="w-full">
      <EditorialInterstitial />
    </div>
  );
};
UserEditorialInterstitial.craft = { displayName: "Editorial Text Reveal" };

// ─── USER SIGNATURE GRI D SECTION WRAPPER ───
export const UserSignaturePieces = () => {
  const { connectors: { connect, drag } } = useNode();
  return (
    <div ref={(ref) => { if (ref) connect(drag(ref)); }} className="w-full">
      <SignaturePieces />
    </div>
  );
};
UserSignaturePieces.craft = { displayName: "Signature Products" };

// ─── USER VALUE MARQUEE SECTION WRAPPER ───
export const UserValueMarquee = () => {
  const { connectors: { connect, drag } } = useNode();
  return (
    <div ref={(ref) => { if (ref) connect(drag(ref)); }} className="w-full">
      <ValueMarquee />
    </div>
  );
};
UserValueMarquee.craft = { displayName: "Values Ticker Marquee" };

// ─── USER TESTIMONIALS SECTION WRAPPER ───
export const UserTestimonials = () => {
  const { connectors: { connect, drag } } = useNode();
  return (
    <div ref={(ref) => { if (ref) connect(drag(ref)); }} className="w-full">
      <Testimonials />
    </div>
  );
};
UserTestimonials.craft = { displayName: "Customer Testimonials" };

// ─── USER NEWSLETTER SECTION WRAPPER ───
export const UserNewsletter = () => {
  const { connectors: { connect, drag } } = useNode();
  return (
    <div ref={(ref) => { if (ref) connect(drag(ref)); }} className="w-full">
      <Newsletter />
    </div>
  );
};
UserNewsletter.craft = { displayName: "Newsletter Form" };

// ─── USER FOOTER SECTION WRAPPER ───
export const UserFooter = () => {
  const { connectors: { connect, drag } } = useNode();
  return (
    <div ref={(ref) => { if (ref) connect(drag(ref as HTMLDivElement)); }} className="w-full">
      <Footer />
    </div>
  );
};
UserFooter.craft = { displayName: "Storefront Footer" };

// ─── SHARED RESOLVER MAP ───
export const resolver = {
  UserText,
  UserHero,
  UserContainer,
  UserImage,
  UserLaunchesAndOffers,
  UserEditorialInterstitial,
  UserSignaturePieces,
  UserValueMarquee,
  UserTestimonials,
  UserNewsletter,
  UserFooter,
};
