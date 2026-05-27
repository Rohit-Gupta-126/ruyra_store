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

function DesktopScrollytelling() {
  const containerRef = useRef<HTMLDivElement>(null);

  // Hook scroll progress of the entire scrollytelling container
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  // 1. Dynamic Background Color Transition
  const bgColor = useTransform(
    scrollYProgress,
    [0, 0.31, 0.34, 0.65, 0.68, 0.98],
    ["#F6F4F0", "#F6F4F0", "#EFECE6", "#EFECE6", "#EAE6DF", "#EAE6DF"]
  );

  // 2. Image Transformations (Opacity & Scale)
  const img1Opacity = useTransform(scrollYProgress, [0, 0.31, 0.34], [1, 1, 0]);
  const img1Scale = useTransform(scrollYProgress, [0, 0.31], [1.08, 1.0]);

  const img2Opacity = useTransform(scrollYProgress, [0.31, 0.34, 0.65, 0.68], [0, 1, 1, 0]);
  const img2Scale = useTransform(scrollYProgress, [0.34, 0.65], [1.08, 1.0]);

  const img3Opacity = useTransform(scrollYProgress, [0.65, 0.68, 0.98], [0, 1, 1]);
  const img3Scale = useTransform(scrollYProgress, [0.68, 0.98], [1.08, 1.0]);

  // 3. Title Transformations (Opacity & Translation Y)
  const title1Opacity = useTransform(scrollYProgress, [0, 0.31, 0.34], [1, 1, 0]);
  const title1Y = useTransform(scrollYProgress, [0, 0.31, 0.34], [0, 0, -20]);

  const title2Opacity = useTransform(scrollYProgress, [0.31, 0.34, 0.65, 0.68], [0, 1, 1, 0]);
  const title2Y = useTransform(scrollYProgress, [0.31, 0.34, 0.65, 0.68], [20, 0, 0, -20]);

  const title3Opacity = useTransform(scrollYProgress, [0.65, 0.68, 0.98], [0, 1, 1]);
  const title3Y = useTransform(scrollYProgress, [0.65, 0.68, 0.98], [20, 0, 0]);

  // 4. Paragraph/Slide Transforms for Chapter 1
  const c1p1Opacity = useTransform(scrollYProgress, [0.01, 0.08, 0.11, 0.13], [0, 1, 1, 0]);
  const c1p1Y = useTransform(scrollYProgress, [0.01, 0.08, 0.11, 0.13], [20, 0, 0, -20]);

  const c1p2Opacity = useTransform(scrollYProgress, [0.13, 0.18, 0.21, 0.23], [0, 1, 1, 0]);
  const c1p2Y = useTransform(scrollYProgress, [0.13, 0.18, 0.21, 0.23], [20, 0, 0, -20]);

  const c1p3Opacity = useTransform(scrollYProgress, [0.23, 0.28, 0.31, 0.34], [0, 1, 1, 0]);
  const c1p3Y = useTransform(scrollYProgress, [0.23, 0.28, 0.31, 0.34], [20, 0, 0, -20]);

  // 5. Paragraph/Slide Transforms for Chapter 2
  const c2p1Opacity = useTransform(scrollYProgress, [0.34, 0.39, 0.42, 0.44], [0, 1, 1, 0]);
  const c2p1Y = useTransform(scrollYProgress, [0.34, 0.39, 0.42, 0.44], [20, 0, 0, -20]);

  const c2p2Opacity = useTransform(scrollYProgress, [0.44, 0.49, 0.52, 0.54], [0, 1, 1, 0]);
  const c2p2Y = useTransform(scrollYProgress, [0.44, 0.49, 0.52, 0.54], [20, 0, 0, -20]);

  const c2p3Opacity = useTransform(scrollYProgress, [0.54, 0.59, 0.62, 0.65], [0, 1, 1, 0]);
  const c2p3Y = useTransform(scrollYProgress, [0.54, 0.59, 0.62, 0.65], [20, 0, 0, -20]);

  // 6. Paragraph/Slide Transforms for Chapter 3
  const c3p1Opacity = useTransform(scrollYProgress, [0.65, 0.70, 0.73, 0.75], [0, 1, 1, 0]);
  const c3p1Y = useTransform(scrollYProgress, [0.65, 0.70, 0.73, 0.75], [20, 0, 0, -20]);

  const c3p2Opacity = useTransform(scrollYProgress, [0.75, 0.80, 0.83, 0.85], [0, 1, 1, 0]);
  const c3p2Y = useTransform(scrollYProgress, [0.75, 0.80, 0.83, 0.85], [20, 0, 0, -20]);

  const c3p3Opacity = useTransform(scrollYProgress, [0.85, 0.90, 0.96, 0.98], [0, 1, 1, 1]);
  const c3p3Y = useTransform(scrollYProgress, [0.85, 0.90, 0.96, 0.98], [20, 0, 0, 0]);

  // Active state indicators
  const [activeChapter, setActiveChapter] = useState(0);
  const [activeSlide, setActiveSlide] = useState(0);

  useEffect(() => {
    return scrollYProgress.on("change", (p) => {
      // Set active chapter
      if (p < 0.325) {
        setActiveChapter(0);
        // Set active slide
        if (p < 0.12) setActiveSlide(0);
        else if (p >= 0.12 && p < 0.22) setActiveSlide(1);
        else setActiveSlide(2);
      } else if (p >= 0.325 && p < 0.665) {
        setActiveChapter(1);
        // Set active slide
        if (p < 0.43) setActiveSlide(0);
        else if (p >= 0.43 && p < 0.53) setActiveSlide(1);
        else setActiveSlide(2);
      } else {
        setActiveChapter(2);
        // Set active slide
        if (p < 0.74) setActiveSlide(0);
        else if (p >= 0.74 && p < 0.84) setActiveSlide(1);
        else setActiveSlide(2);
      }
    });
  }, [scrollYProgress]);

  return (
    <motion.div 
      ref={containerRef} 
      className="relative w-full h-[400vh]"
      style={{ backgroundColor: bgColor }}
    >
      <div className="sticky top-0 h-screen w-full flex overflow-hidden items-center">
        
        {/* Left Column: Visual Panel (Fixed Image space) */}
        <div className="w-1/2 h-full flex items-center justify-center p-12 lg:p-16 relative">
          <div className="relative aspect-[4/5] w-full max-w-[420px] lg:max-w-[460px] rounded-3xl overflow-hidden shadow-2xl bg-bg-surface border border-brand-brown/5">
            
            {/* Image Chapter 1 */}
            <motion.div style={{ opacity: img1Opacity, scale: img1Scale }} className="absolute inset-0">
              <Image
                src={articles[0].image}
                alt={articles[0].alt}
                fill
                className="object-cover"
                sizes="50vw"
                priority
              />
            </motion.div>

            {/* Image Chapter 2 */}
            <motion.div style={{ opacity: img2Opacity, scale: img2Scale }} className="absolute inset-0">
              <Image
                src={articles[1].image}
                alt={articles[1].alt}
                fill
                className="object-cover"
                sizes="50vw"
              />
            </motion.div>

            {/* Image Chapter 3 */}
            <motion.div style={{ opacity: img3Opacity, scale: img3Scale }} className="absolute inset-0">
              <Image
                src={articles[2].image}
                alt={articles[2].alt}
                fill
                className="object-cover"
                sizes="50vw"
              />
            </motion.div>

            {/* Float Category Label */}
            <div className="absolute top-6 left-6 bg-white/90 backdrop-blur-sm px-4 py-1.5 rounded-full text-[9px] font-sans font-bold tracking-widest uppercase text-brand-brown">
              {activeChapter === 0 ? articles[0].category : activeChapter === 1 ? articles[1].category : articles[2].category}
            </div>
          </div>
        </div>

        {/* Right Column: Narrative Panel */}
        <div className="w-1/2 h-full flex flex-col justify-center pl-16 pr-16 lg:pl-24 lg:pr-32 relative">
          
          {/* Progress Indicators */}
          <div className="absolute left-4 lg:left-8 top-1/2 -translate-y-1/2 flex flex-col items-center gap-3">
            <span className="font-sans text-[9px] tracking-widest text-text-secondary uppercase rotate-90 origin-left translate-x-[3px] mb-8 font-bold">
              0{activeChapter + 1}
            </span>
            {[0, 1, 2].map((dotIndex) => (
              <div 
                key={dotIndex}
                className={`w-1.5 h-1.5 rounded-full transition-all duration-300 ${
                  activeSlide === dotIndex ? "bg-brand-terracotta scale-125" : "bg-brand-brown/20"
                }`}
              />
            ))}
          </div>

          {/* Dynamic Titles Container */}
          <div className="relative w-full h-[140px] shrink-0 mb-6">
            
            {/* Title Chapter 1 */}
            <motion.div 
              style={{ opacity: title1Opacity, y: title1Y }} 
              className="absolute inset-0 flex flex-col justify-end"
            >
              <span className="font-sans text-[10px] tracking-[0.3em] font-bold text-accent-secondary uppercase">
                CHAPTER 01
              </span>
              <h2 className="font-serif text-3xl lg:text-5xl font-bold leading-tight text-brand-brown mt-1">
                {articles[0].title}
              </h2>
              <div className="flex items-center gap-3 text-[10px] font-sans text-text-secondary uppercase tracking-widest font-semibold pt-1">
                <span>{articles[0].date}</span>
                <span>•</span>
                <span>By {articles[0].author}</span>
              </div>
            </motion.div>

            {/* Title Chapter 2 */}
            <motion.div 
              style={{ opacity: title2Opacity, y: title2Y }} 
              className="absolute inset-0 flex flex-col justify-end"
            >
              <span className="font-sans text-[10px] tracking-[0.3em] font-bold text-accent-secondary uppercase">
                CHAPTER 02
              </span>
              <h2 className="font-serif text-3xl lg:text-5xl font-bold leading-tight text-brand-brown mt-1">
                {articles[1].title}
              </h2>
              <div className="flex items-center gap-3 text-[10px] font-sans text-text-secondary uppercase tracking-widest font-semibold pt-1">
                <span>{articles[1].date}</span>
                <span>•</span>
                <span>By {articles[1].author}</span>
              </div>
            </motion.div>

            {/* Title Chapter 3 */}
            <motion.div 
              style={{ opacity: title3Opacity, y: title3Y }} 
              className="absolute inset-0 flex flex-col justify-end"
            >
              <span className="font-sans text-[10px] tracking-[0.3em] font-bold text-accent-secondary uppercase">
                CHAPTER 03
              </span>
              <h2 className="font-serif text-3xl lg:text-5xl font-bold leading-tight text-brand-brown mt-1">
                {articles[2].title}
              </h2>
              <div className="flex items-center gap-3 text-[10px] font-sans text-text-secondary uppercase tracking-widest font-semibold pt-1">
                <span>{articles[2].date}</span>
                <span>•</span>
                <span>By {articles[2].author}</span>
              </div>
            </motion.div>
          </div>

          {/* Dynamic Content Slides Container */}
          <div className="relative w-full h-[280px] lg:h-[320px]">
            
            {/* ──── CHAPTER 1 CONTENT SLIDES ──── */}
            {/* Slide 1 */}
            <motion.p 
              style={{ opacity: c1p1Opacity, y: c1p1Y }}
              className="absolute inset-0 font-sans text-base lg:text-lg text-text-secondary leading-relaxed font-light first-letter:float-left first-letter:text-6xl first-letter:font-serif first-letter:mr-3 first-letter:font-bold first-letter:text-brand-terracotta first-letter:mt-1 pointer-events-none"
            >
              {articles[0].content[0]}
            </motion.p>
            {/* Slide 2 */}
            <motion.blockquote 
              style={{ opacity: c1p2Opacity, y: c1p2Y }}
              className="absolute inset-0 flex flex-col justify-center border-l-2 border-brand-terracotta/30 pl-6 py-2 pointer-events-none"
            >
              <p className="font-serif text-xl lg:text-2xl italic text-brand-terracotta leading-relaxed font-medium">
                &ldquo;{articles[0].quote}&rdquo;
              </p>
            </motion.blockquote>
            {/* Slide 3 */}
            <motion.div 
              style={{ opacity: c1p3Opacity, y: c1p3Y }}
              className="absolute inset-0 overflow-y-auto no-scrollbar font-sans text-base lg:text-lg text-text-secondary leading-relaxed font-light space-y-4"
            >
              <p>{articles[0].content[1]}</p>
              <p>{articles[0].content[2]}</p>
            </motion.div>

            {/* ──── CHAPTER 2 CONTENT SLIDES ──── */}
            {/* Slide 1 */}
            <motion.p 
              style={{ opacity: c2p1Opacity, y: c2p1Y }}
              className="absolute inset-0 font-sans text-base lg:text-lg text-text-secondary leading-relaxed font-light first-letter:float-left first-letter:text-6xl first-letter:font-serif first-letter:mr-3 first-letter:font-bold first-letter:text-brand-terracotta first-letter:mt-1 pointer-events-none"
            >
              {articles[1].content[0]}
            </motion.p>
            {/* Slide 2 */}
            <motion.blockquote 
              style={{ opacity: c2p2Opacity, y: c2p2Y }}
              className="absolute inset-0 flex flex-col justify-center border-l-2 border-brand-terracotta/30 pl-6 py-2 pointer-events-none"
            >
              <p className="font-serif text-xl lg:text-2xl italic text-brand-terracotta leading-relaxed font-medium">
                &ldquo;{articles[1].quote}&rdquo;
              </p>
            </motion.blockquote>
            {/* Slide 3 */}
            <motion.div 
              style={{ opacity: c2p3Opacity, y: c2p3Y }}
              className="absolute inset-0 overflow-y-auto no-scrollbar font-sans text-base lg:text-lg text-text-secondary leading-relaxed font-light space-y-4"
            >
              <p>{articles[1].content[1]}</p>
              <p>{articles[1].content[2]}</p>
            </motion.div>

            {/* ──── CHAPTER 3 CONTENT SLIDES ──── */}
            {/* Slide 1 */}
            <motion.p 
              style={{ opacity: c3p1Opacity, y: c3p1Y }}
              className="absolute inset-0 font-sans text-base lg:text-lg text-text-secondary leading-relaxed font-light first-letter:float-left first-letter:text-6xl first-letter:font-serif first-letter:mr-3 first-letter:font-bold first-letter:text-brand-terracotta first-letter:mt-1 pointer-events-none"
            >
              {articles[2].content[0]}
            </motion.p>
            {/* Slide 2 */}
            <motion.blockquote 
              style={{ opacity: c3p2Opacity, y: c3p2Y }}
              className="absolute inset-0 flex flex-col justify-center border-l-2 border-brand-terracotta/30 pl-6 py-2 pointer-events-none"
            >
              <p className="font-serif text-xl lg:text-2xl italic text-brand-terracotta leading-relaxed font-medium">
                &ldquo;{articles[2].quote}&rdquo;
              </p>
            </motion.blockquote>
            {/* Slide 3 */}
            <motion.div 
              style={{ opacity: c3p3Opacity, y: c3p3Y }}
              className="absolute inset-0 overflow-y-auto no-scrollbar font-sans text-base lg:text-lg text-text-secondary leading-relaxed font-light space-y-4"
            >
              <p>{articles[2].content[1]}</p>
              <p>{articles[2].content[2]}</p>
            </motion.div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

function MobileEditorial() {
  return (
    <div className="flex md:hidden flex-col bg-bg-primary divide-y divide-bg-surface/60">
      {articles.map((article, index) => (
        <div key={article.id} className="flex flex-col px-6 py-12 w-full gap-6">
          {/* Monospace Badge */}
          <div className="flex items-center justify-between">
            <span className="font-sans text-[9px] tracking-[0.25em] font-bold text-accent-secondary uppercase">
              CHAPTER 0{index + 1} / {article.category}
            </span>
            <span className="font-sans text-[11px] text-text-secondary uppercase tracking-widest font-bold">
              0{index + 1}
            </span>
          </div>

          {/* Title */}
          <h2 className="font-serif text-2xl font-bold text-brand-brown leading-tight">
            {article.title}
          </h2>
          
          {/* Metadata */}
          <div className="flex items-center gap-4 text-[9px] font-sans text-text-secondary uppercase tracking-widest font-bold pb-2">
            <span>{article.date}</span>
            <span>•</span>
            <span>By {article.author}</span>
          </div>

          {/* Hero Image */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.98 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.8 }}
            className="relative aspect-[4/3] w-full rounded-2xl overflow-hidden shadow-md bg-bg-surface"
          >
            <Image
              src={article.image}
              alt={article.alt}
              fill
              className="object-cover"
              sizes="100vw"
            />
          </motion.div>

          {/* Text Body */}
          <div className="space-y-6 font-sans text-sm text-text-secondary leading-relaxed font-light pt-2">
            {/* Paragraph 1 */}
            <p className="first-letter:float-left first-letter:text-5xl first-letter:font-serif first-letter:mr-2.5 first-letter:font-bold first-letter:text-brand-terracotta first-letter:mt-1">
              {article.content[0]}
            </p>

            {/* Pull Quote */}
            <blockquote className="my-6 py-5 border-y border-brand-brown/10 px-4 text-center">
              <p className="font-serif text-base italic text-brand-terracotta leading-relaxed">
                &ldquo;{article.quote}&rdquo;
              </p>
            </blockquote>

            {/* Paragraph 2 */}
            <p>{article.content[1]}</p>

            {/* Paragraph 3 */}
            <p>{article.content[2]}</p>
          </div>
        </div>
      ))}
    </div>
  );
}

export default function JournalPage() {
  const heroRef = useRef<HTMLDivElement>(null);
  
  const { scrollYProgress: heroScroll } = useScroll({
    target: heroRef,
    offset: ["start start", "end end"]
  });

  const heroOpacity = useTransform(heroScroll, [0, 0.8], [1, 0]);
  const heroScale = useTransform(heroScroll, [0, 0.8], [1, 0.96]);
  const heroY = useTransform(heroScroll, [0, 0.8], [0, -40]);

  return (
    <div className="bg-bg-primary text-text-primary min-h-screen flex flex-col overflow-x-hidden selection:bg-brand-terracotta selection:text-white">
      
      {/* ── Intro Hero Section ── */}
      <section 
        ref={heroRef}
        className="h-screen w-full flex flex-col items-center justify-center text-center px-6 relative bg-bg-primary overflow-hidden border-b border-bg-surface"
      >
        <motion.div
          style={{ opacity: heroOpacity, scale: heroScale, y: heroY }}
          className="space-y-6 max-w-2xl z-10 flex flex-col items-center"
        >
          <span className="font-sans text-[10px] tracking-[0.4em] uppercase font-bold text-accent-secondary">
            THE JOURNAL
          </span>
          <h1 className="font-serif text-4xl sm:text-5xl md:text-7xl leading-[1.1] font-bold text-brand-brown">
            Notes on <br />
            <span className="italic font-normal">Intentional Living</span>
          </h1>
          <div className="w-12 h-px bg-brand-terracotta/40 my-6" />
          <p className="font-sans text-xs sm:text-sm text-brand-text-muted max-w-md leading-relaxed font-light">
            A collection of essays exploring the wabi-sabi aesthetic, sensory grounding, and the quiet spaces we construct for the mind.
          </p>
        </motion.div>

        {/* Floating background shape */}
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-brand-taupe/15 rounded-full blur-[100px] pointer-events-none -z-10" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-brand-terracotta/5 rounded-full blur-[120px] pointer-events-none -z-10" />

        {/* Scroll indicator */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 1 }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 cursor-pointer pointer-events-none"
        >
          <span className="font-sans text-[9px] tracking-[0.25em] uppercase font-bold text-brand-brown/50">
            Scroll to read
          </span>
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
          >
            <ArrowDown className="w-3.5 h-3.5 text-brand-terracotta" />
          </motion.div>
        </motion.div>
      </section>

      {/* ── Desktop Scrollytelling & Mobile Editorial Sections ── */}
      <main className="w-full">
        {/* Desktop Layout */}
        <div className="hidden md:block">
          <DesktopScrollytelling />
        </div>

        {/* Mobile Layout */}
        <div className="block md:hidden">
          <MobileEditorial />
        </div>
      </main>

      {/* ── Outro / Call-To-Action ── */}
      <section className="h-[80vh] w-full flex flex-col items-center justify-center text-center px-6 relative bg-bg-primary">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 1 }}
          className="space-y-8 max-w-xl flex flex-col items-center"
        >
          <span className="font-sans text-[9px] tracking-[0.3em] uppercase font-bold text-accent-secondary">
            CODA
          </span>
          <h2 className="font-serif text-2xl sm:text-3xl md:text-4xl italic font-normal leading-relaxed text-brand-brown">
            &ldquo;To live with intention is to choose light that leaves room for shadow.&rdquo;
          </h2>
          <div className="w-12 h-px bg-brand-terracotta/40 my-2" />
          
          <Link
            href="/shop"
            className="inline-flex items-center gap-2 px-8 py-3.5 bg-brand-brown hover:bg-brand-brown/95 text-white font-sans text-xs uppercase tracking-widest font-semibold rounded-full shadow-lg transition-all hover:scale-105 active:scale-95 cursor-pointer"
          >
            Explore the Collection <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </motion.div>
      </section>

      {/* Footer */}
      <Footer />
    </div>
  );
}
