"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, ArrowDown } from "lucide-react";
import { motion, useScroll, useTransform } from "framer-motion";
import Footer from "@/components/layout/Footer";

interface Article {
  id: string;
  title: string;
  category: string;
  date: string;
  author: string;
  description: string;
  content: string[];
  quote: string;
  image: string;
  alt: string;
}

const articles: Article[] = [
  {
    id: "philosophy-of-slow-light",
    title: "The Philosophy of Slow Light",
    category: "RITUAL",
    date: "May 24, 2026",
    author: "Elena Ruyra",
    description: "How we choose to illuminate our spaces shapes our internal geography. A study in the warmth of natural soy wax and slow-burning amber flames.",
    image: "https://images.unsplash.com/photo-1603006905003-be475563bc59?q=80&w=1200&auto=format&fit=crop",
    alt: "Glowing amber jar candle set against a dark volcanic stone setup",
    content: [
      "Lighting a candle is more than a way to push back the dark; it is an act of quiet creation. In our modern search for hyper-efficiency, we have swapped the rich, shifting glow of fire for the static hum of LED panels. We live in constant, sterile illumination that denies the transition of day into night. To light a candle is to declare that for the next three hours, time belongs to the flame.",
      "We explore how slow, natural light grounds our nervous system and invites a meditative state. Scientific observations show that flickering candlelight at a slow frequency mimics our brains' resting alpha waves, immediately triggering a sense of calm. In this sanctuary, we seek the raw organic materials that carry ancient histories—natural soy wax, botanical essential oils, and wood-fired ceramics that hold soil in their bones.",
      "When we choose to live with slow light, we reclaim the boundaries of our day. The evening transitions from a continuation of work into a soft retreat of rest. The shadows cast by the flame are not empty space, but places for the mind to settle and wander without distraction."
    ],
    quote: "In the slow dance of firelight, we find a sanctuary that static light can never build."
  },
  {
    id: "bathing-sacred-threshold",
    title: "Bathing as a Sacred Threshold",
    category: "WELLNESS",
    date: "April 18, 2026",
    author: "Dr. Marcus Vance",
    description: "Reclaiming the bath as a quiet boundary between labor and rest. The chemical grounding of unrefined minerals and botanical steam.",
    image: "https://images.unsplash.com/photo-1540555700478-4be289fbecef?q=80&w=800&auto=format&fit=crop",
    alt: "Coarse pink Himalayan salt crystals mixed with lavender petals in a stoneware bowl",
    content: [
      "Water carries memory, and immersion washes away the noise of the day. Modern life treats hygiene as a transactional task, a brief box to check in the morning. When we slow the bath down, adding unrefined salts, lavender blossoms, and woodsmoke infusions, it becomes a threshold. We pass from the sphere of labor into the sphere of rest.",
      "The warmth of the water triggers a physical softening, dilating blood vessels and releasing lactic acid built up in muscles. Simultaneously, mineral-dense deposits of magnesium and potassium replenish the skin's barrier. By intention, we turn the bath into a sanctuary, a ritual of preservation.",
      "In the steam, our breathing slows. The botanicals—chamomile, cedarwood, and lavender—act as sensory anchors, drawing our focus away from digital notifications and back to the weight of our own bodies."
    ],
    quote: "Immersion is the physical act of leaving the world behind, step by step."
  },
  {
    id: "tactile-geometry-earthen-form",
    title: "Tactile Geometry: Earthen Clay",
    category: "CRAFT",
    date: "March 02, 2026",
    author: "Sora Takahashi",
    description: "Exploring the irregularities of wood-fired clay. Why imperfect objects ground us in the physical world.",
    image: "https://images.unsplash.com/photo-1612196808214-b8e1d6145a8c?q=80&w=800&auto=format&fit=crop",
    alt: "Artisanal clay candle holder displaying rustic sandy grain texture",
    content: [
      "Irregularities are the voice of the materials speaking. When an object is perfectly uniform, it ceases to command attention; it disappears into the background of our sight. A wood-fired clay vessel, however, carries the erratic signature of the flame. It has iron-spot freckles, running glazes, and tactile ridges where the potter's fingers pressed.",
      "In a digital world of smooth screens and frictionless glass, these rough geometries draw our hands. They hold us in the tangible present. Touching the gritty sand-texture of a clay holder reminds us of the earth it came from and the kiln fire that made it solid.",
      "To surround oneself with handcrafted objects is to populate our sanctuary with stories of human touch. It is a quiet rejection of mass production in favor of singular intention."
    ],
    quote: "In the imperfect surface of hand-formed clay, we find the texture of truth."
  }
];

export default function JournalPage() {
  const containerRef = useRef<HTMLDivElement>(null);

  // Hook scroll progress of the entire scrollytelling container
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  // 1. Progress Bar Width
  const progressBarWidth = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  // 2. Background Image Crossfades & Parallax Drift (Zoom & Translate)
  // Chapter 1 Image
  const img1Opacity = useTransform(scrollYProgress, [0, 0.08, 0.36, 0.40], [0.3, 1, 1, 0]);
  const img1Scale = useTransform(scrollYProgress, [0.08, 0.38], [1.15, 1.05]);
  const img1Y = useTransform(scrollYProgress, [0.08, 0.38], ["0%", "-4%"]);

  // Chapter 2 Image
  const img2Opacity = useTransform(scrollYProgress, [0.36, 0.40, 0.66, 0.70], [0, 1, 1, 0]);
  const img2Scale = useTransform(scrollYProgress, [0.38, 0.68], [1.15, 1.05]);
  const img2Y = useTransform(scrollYProgress, [0.38, 0.68], ["2%", "-2%"]);

  // Chapter 3 Image
  const img3Opacity = useTransform(scrollYProgress, [0.66, 0.70, 0.94, 0.96], [0, 1, 1, 0.2]);
  const img3Scale = useTransform(scrollYProgress, [0.68, 0.96], [1.15, 1.05]);
  const img3Y = useTransform(scrollYProgress, [0.68, 0.96], ["4%", "0%"]);

  // 3. Intro Screen Slide (0.0 to 0.10)
  const introOpacity = useTransform(scrollYProgress, [0, 0.06, 0.09], [1, 1, 0]);
  const introY = useTransform(scrollYProgress, [0, 0.09], [0, -30]);

  // 4. Chapter 1 Slides (0.10 to 0.38)
  const c1TitleOpacity = useTransform(scrollYProgress, [0.09, 0.12, 0.35, 0.38], [0, 1, 1, 0]);
  const c1TitleY = useTransform(scrollYProgress, [0.09, 0.12, 0.35, 0.38], [25, 0, 0, -25]);

  const c1p1Opacity = useTransform(scrollYProgress, [0.11, 0.14, 0.18, 0.20], [0, 1, 1, 0]);
  const c1p1Y = useTransform(scrollYProgress, [0.11, 0.14, 0.18, 0.20], [20, 0, 0, -20]);

  const c1p2Opacity = useTransform(scrollYProgress, [0.20, 0.23, 0.27, 0.29], [0, 1, 1, 0]);
  const c1p2Y = useTransform(scrollYProgress, [0.20, 0.23, 0.27, 0.29], [20, 0, 0, -20]);

  const c1p3Opacity = useTransform(scrollYProgress, [0.29, 0.32, 0.35, 0.38], [0, 1, 1, 0]);
  const c1p3Y = useTransform(scrollYProgress, [0.29, 0.32, 0.35, 0.38], [20, 0, 0, -20]);

  // 5. Chapter 2 Slides (0.38 to 0.66)
  const c2TitleOpacity = useTransform(scrollYProgress, [0.37, 0.40, 0.63, 0.66], [0, 1, 1, 0]);
  const c2TitleY = useTransform(scrollYProgress, [0.37, 0.40, 0.63, 0.66], [25, 0, 0, -25]);

  const c2p1Opacity = useTransform(scrollYProgress, [0.39, 0.42, 0.46, 0.48], [0, 1, 1, 0]);
  const c2p1Y = useTransform(scrollYProgress, [0.39, 0.42, 0.46, 0.48], [20, 0, 0, -20]);

  const c2p2Opacity = useTransform(scrollYProgress, [0.48, 0.51, 0.55, 0.57], [0, 1, 1, 0]);
  const c2p2Y = useTransform(scrollYProgress, [0.48, 0.51, 0.55, 0.57], [20, 0, 0, -20]);

  const c2p3Opacity = useTransform(scrollYProgress, [0.57, 0.60, 0.63, 0.66], [0, 1, 1, 0]);
  const c2p3Y = useTransform(scrollYProgress, [0.57, 0.60, 0.63, 0.66], [20, 0, 0, -20]);

  // 6. Chapter 3 Slides (0.66 to 0.94)
  const c3TitleOpacity = useTransform(scrollYProgress, [0.65, 0.68, 0.91, 0.94], [0, 1, 1, 0]);
  const c3TitleY = useTransform(scrollYProgress, [0.65, 0.68, 0.91, 0.94], [25, 0, 0, -25]);

  const c3p1Opacity = useTransform(scrollYProgress, [0.67, 0.70, 0.74, 0.76], [0, 1, 1, 0]);
  const c3p1Y = useTransform(scrollYProgress, [0.67, 0.70, 0.74, 0.76], [20, 0, 0, -20]);

  const c3p2Opacity = useTransform(scrollYProgress, [0.76, 0.79, 0.83, 0.85], [0, 1, 1, 0]);
  const c3p2Y = useTransform(scrollYProgress, [0.76, 0.79, 0.83, 0.85], [20, 0, 0, -20]);

  const c3p3Opacity = useTransform(scrollYProgress, [0.85, 0.88, 0.91, 0.94], [0, 1, 1, 0]);
  const c3p3Y = useTransform(scrollYProgress, [0.85, 0.88, 0.91, 0.94], [20, 0, 0, -20]);

  // 7. Outro Screen Slides (0.94 to 1.0)
  const outroOpacity = useTransform(scrollYProgress, [0.93, 0.96, 1.0], [0, 1, 1]);
  const outroY = useTransform(scrollYProgress, [0.93, 0.96], [30, 0]);

  // Active state monitor for indicators
  const [activeChapter, setActiveChapter] = useState(-1);
  const [activeSlide, setActiveSlide] = useState(-1);

  useEffect(() => {
    return scrollYProgress.on("change", (p) => {
      // Intro
      if (p < 0.09) {
        setActiveChapter(-1);
        setActiveSlide(-1);
        return;
      }
      // Outro
      if (p >= 0.94) {
        setActiveChapter(3);
        setActiveSlide(-1);
        return;
      }
      // Chapter 1
      if (p >= 0.09 && p < 0.38) {
        setActiveChapter(0);
        if (p < 0.20) setActiveSlide(0);
        else if (p >= 0.20 && p < 0.29) setActiveSlide(1);
        else setActiveSlide(2);
      } 
      // Chapter 2
      else if (p >= 0.38 && p < 0.66) {
        setActiveChapter(1);
        if (p < 0.48) setActiveSlide(0);
        else if (p >= 0.48 && p < 0.57) setActiveSlide(1);
        else setActiveSlide(2);
      } 
      // Chapter 3
      else {
        setActiveChapter(2);
        if (p < 0.76) setActiveSlide(0);
        else if (p >= 0.76 && p < 0.85) setActiveSlide(1);
        else setActiveSlide(2);
      }
    });
  }, [scrollYProgress]);

  return (
    <div 
      ref={containerRef} 
      className="relative w-full h-[650vh] bg-black text-white selection:bg-brand-terracotta selection:text-white"
    >
      {/* ── Scroll progress bar at top ── */}
      <motion.div 
        style={{ width: progressBarWidth }}
        className="fixed top-0 left-0 h-[2.5px] bg-brand-terracotta z-50 transition-all duration-75"
      />

      {/* ── IMMERSIVE FULL-SCREEN VISUAL & NARRATIVE STICKY AREA ── */}
      <div className="sticky top-0 h-screen w-full overflow-hidden flex items-center justify-center">
        
        {/* ── Full-Bleed Atmospheric Background Images Layer ── */}
        <div className="absolute inset-0 z-0 bg-black overflow-hidden">
          
          {/* Chapter 1 Background image */}
          <motion.div 
            style={{ opacity: img1Opacity, scale: img1Scale, y: img1Y }}
            className="absolute inset-0 w-full h-full"
          >
            <Image
              src={articles[0].image}
              alt={articles[0].alt}
              fill
              className="object-cover pointer-events-none"
              sizes="100vw"
              priority
            />
          </motion.div>

          {/* Chapter 2 Background image */}
          <motion.div 
            style={{ opacity: img2Opacity, scale: img2Scale, y: img2Y }}
            className="absolute inset-0 w-full h-full"
          >
            <Image
              src={articles[1].image}
              alt={articles[1].alt}
              fill
              className="object-cover pointer-events-none"
              sizes="100vw"
            />
          </motion.div>

          {/* Chapter 3 Background image */}
          <motion.div 
            style={{ opacity: img3Opacity, scale: img3Scale, y: img3Y }}
            className="absolute inset-0 w-full h-full"
          >
            <Image
              src={articles[2].image}
              alt={articles[2].alt}
              fill
              className="object-cover pointer-events-none"
              sizes="100vw"
            />
          </motion.div>

          {/* Cinematic Vignette Overlay (Ensures 100% Typography legibility) */}
          <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/45 to-black/85 mix-blend-multiply pointer-events-none" />
        </div>

        {/* ── CONTENT PRESENTATION LAYER (Text Overlay centered) ── */}
        <div className="relative z-10 w-full max-w-3xl px-6 sm:px-12 text-center flex flex-col items-center justify-center">
          
          {/* 1. INTRO SLIDE */}
          <motion.div
            style={{ opacity: introOpacity, y: introY }}
            className="absolute flex flex-col items-center gap-6"
          >
            <span className="font-sans text-[10px] tracking-[0.4em] uppercase font-bold text-brand-terracotta">
              THE JOURNAL
            </span>
            <h1 className="font-serif text-4xl sm:text-5xl md:text-7xl leading-[1.1] font-bold text-white">
              Notes on <br />
              <span className="italic font-normal text-brand-sand">Intentional Living</span>
            </h1>
            <div className="w-12 h-px bg-white/20 my-2" />
            <p className="font-sans text-xs sm:text-sm text-brand-sand/70 max-w-md leading-relaxed font-light">
              An immersive space exploring the wabi-sabi aesthetic, sensory grounding, and the daily rituals that restore internal quiet.
            </p>
            <div className="flex flex-col items-center gap-2 mt-4 text-white/40">
              <span className="font-sans text-[9px] tracking-[0.25em] uppercase font-bold">
                Scroll to begin
              </span>
              <motion.div
                animate={{ y: [0, 6, 0] }}
                transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
              >
                <ArrowDown className="w-3.5 h-3.5 text-brand-terracotta" />
              </motion.div>
            </div>
          </motion.div>

          {/* 2. CHAPTER TITLE CARD LAYOUT (Top segment) */}
          <div className="relative w-full h-[120px] shrink-0 pointer-events-none mb-4">
            
            {/* Title Chapter 1 */}
            <motion.div 
              style={{ opacity: c1TitleOpacity, y: c1TitleY }}
              className="absolute inset-x-0 bottom-0 flex flex-col items-center"
            >
              <span className="font-sans text-[10px] tracking-[0.3em] font-bold text-brand-terracotta uppercase">
                CHAPTER 01 / {articles[0].category}
              </span>
              <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold leading-tight text-white mt-1.5">
                {articles[0].title}
              </h2>
            </motion.div>

            {/* Title Chapter 2 */}
            <motion.div 
              style={{ opacity: c2TitleOpacity, y: c2TitleY }}
              className="absolute inset-x-0 bottom-0 flex flex-col items-center"
            >
              <span className="font-sans text-[10px] tracking-[0.3em] font-bold text-brand-terracotta uppercase">
                CHAPTER 02 / {articles[1].category}
              </span>
              <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold leading-tight text-white mt-1.5">
                {articles[1].title}
              </h2>
            </motion.div>

            {/* Title Chapter 3 */}
            <motion.div 
              style={{ opacity: c3TitleOpacity, y: c3TitleY }}
              className="absolute inset-x-0 bottom-0 flex flex-col items-center"
            >
              <span className="font-sans text-[10px] tracking-[0.3em] font-bold text-brand-terracotta uppercase">
                CHAPTER 03 / {articles[2].category}
              </span>
              <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold leading-tight text-white mt-1.5">
                {articles[2].title}
              </h2>
            </motion.div>
          </div>

          {/* 3. CHAPTER PARAGRAPHS OVERLAY (Main segment) */}
          <div className="relative w-full h-[260px] sm:h-[220px] pointer-events-none">
            
            {/* ──── CHAPTER 1 PARAGRAPHS ──── */}
            <motion.p 
              style={{ opacity: c1p1Opacity, y: c1p1Y }}
              className="absolute inset-0 font-sans text-[15px] sm:text-base lg:text-lg text-brand-sand/85 leading-relaxed font-light first-letter:float-left first-letter:text-6xl first-letter:font-serif first-letter:mr-3 first-letter:font-bold first-letter:text-brand-terracotta first-letter:mt-1"
            >
              {articles[0].content[0]}
            </motion.p>
            <motion.blockquote 
              style={{ opacity: c1p2Opacity, y: c1p2Y }}
              className="absolute inset-0 flex flex-col justify-center border-l-2 border-brand-terracotta/40 pl-6 py-2 text-left"
            >
              <p className="font-serif text-lg sm:text-xl lg:text-2xl italic text-brand-terracotta leading-relaxed font-medium">
                &ldquo;{articles[0].quote}&rdquo;
              </p>
            </motion.blockquote>
            <motion.p 
              style={{ opacity: c1p3Opacity, y: c1p3Y }}
              className="absolute inset-0 font-sans text-[15px] sm:text-base lg:text-lg text-brand-sand/85 leading-relaxed font-light"
            >
              {articles[0].content[1]} <br className="hidden sm:inline" /> {articles[0].content[2]}
            </motion.p>

            {/* ──── CHAPTER 2 PARAGRAPHS ──── */}
            <motion.p 
              style={{ opacity: c2p1Opacity, y: c2p1Y }}
              className="absolute inset-0 font-sans text-[15px] sm:text-base lg:text-lg text-brand-sand/85 leading-relaxed font-light first-letter:float-left first-letter:text-6xl first-letter:font-serif first-letter:mr-3 first-letter:font-bold first-letter:text-brand-terracotta first-letter:mt-1"
            >
              {articles[1].content[0]}
            </motion.p>
            <motion.blockquote 
              style={{ opacity: c2p2Opacity, y: c2p2Y }}
              className="absolute inset-0 flex flex-col justify-center border-l-2 border-brand-terracotta/40 pl-6 py-2 text-left"
            >
              <p className="font-serif text-lg sm:text-xl lg:text-2xl italic text-brand-terracotta leading-relaxed font-medium">
                &ldquo;{articles[1].quote}&rdquo;
              </p>
            </motion.blockquote>
            <motion.p 
              style={{ opacity: c2p3Opacity, y: c2p3Y }}
              className="absolute inset-0 font-sans text-[15px] sm:text-base lg:text-lg text-brand-sand/85 leading-relaxed font-light"
            >
              {articles[1].content[1]} <br className="hidden sm:inline" /> {articles[1].content[2]}
            </motion.p>

            {/* ──── CHAPTER 3 PARAGRAPHS ──── */}
            <motion.p 
              style={{ opacity: c3p1Opacity, y: c3p1Y }}
              className="absolute inset-0 font-sans text-[15px] sm:text-base lg:text-lg text-brand-sand/85 leading-relaxed font-light first-letter:float-left first-letter:text-6xl first-letter:font-serif first-letter:mr-3 first-letter:font-bold first-letter:text-brand-terracotta first-letter:mt-1"
            >
              {articles[2].content[0]}
            </motion.p>
            <motion.blockquote 
              style={{ opacity: c3p2Opacity, y: c3p2Y }}
              className="absolute inset-0 flex flex-col justify-center border-l-2 border-brand-terracotta/40 pl-6 py-2 text-left"
            >
              <p className="font-serif text-lg sm:text-xl lg:text-2xl italic text-brand-terracotta leading-relaxed font-medium">
                &ldquo;{articles[2].quote}&rdquo;
              </p>
            </motion.blockquote>
            <motion.p 
              style={{ opacity: c3p3Opacity, y: c3p3Y }}
              className="absolute inset-0 font-sans text-[15px] sm:text-base lg:text-lg text-brand-sand/85 leading-relaxed font-light"
            >
              {articles[2].content[1]} <br className="hidden sm:inline" /> {articles[2].content[2]}
            </motion.p>
          </div>

          {/* 4. CHAPTER PROGRESS BARS (Bottom dots) */}
          {activeChapter >= 0 && activeChapter < 3 && (
            <div className="flex gap-2.5 mt-8 items-center shrink-0 pointer-events-none">
              {[0, 1, 2].map((dotIdx) => (
                <div 
                  key={dotIdx} 
                  className={`w-2.5 h-1.5 rounded-full transition-all duration-300 ${
                    activeSlide === dotIdx ? "bg-brand-terracotta w-6" : "bg-white/20"
                  }`}
                />
              ))}
            </div>
          )}

          {/* 5. CODA / OUTRO SLIDE */}
          <motion.div
            style={{ opacity: outroOpacity, y: outroY }}
            className="absolute flex flex-col items-center gap-6 pointer-events-auto"
          >
            <span className="font-sans text-[9px] tracking-[0.3em] uppercase font-bold text-brand-terracotta">
              CODA
            </span>
            <h2 className="font-serif text-xl sm:text-2xl md:text-3xl italic font-normal leading-relaxed text-brand-sand max-w-lg">
              &ldquo;To live with intention is to choose light that leaves room for shadow.&rdquo;
            </h2>
            <div className="w-12 h-px bg-white/20 my-2" />
            
            <Link
              href="/shop"
              className="inline-flex items-center gap-2 px-8 py-3.5 bg-brand-terracotta hover:bg-opacity-95 text-white font-sans text-xs uppercase tracking-widest font-semibold rounded-full shadow-lg transition-all hover:scale-105 active:scale-95 cursor-pointer"
            >
              Explore the Collection <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </motion.div>

        </div>
      </div>

      {/* ── Footer ── */}
      <div className="relative z-20">
        <Footer />
      </div>
    </div>
  );
}
