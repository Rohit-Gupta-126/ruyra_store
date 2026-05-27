"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, ArrowDown } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
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

const bgColors = ["#F6F4F0", "#EFECE6", "#EAE6DF"];

export default function JournalPage() {
  const [activeChapter, setActiveChapter] = useState(0);
  const heroRef = useRef<HTMLDivElement>(null);

  // Monitor which chapter is active by checking scroll positions
  useEffect(() => {
    const handleScroll = () => {
      const elements = articles.map((_, idx) => document.getElementById(`chapter-${idx}`));
      const viewportHeight = window.innerHeight;
      
      let activeIdx = 0;
      let minDistance = Infinity;

      elements.forEach((el, idx) => {
        if (el) {
          const rect = el.getBoundingClientRect();
          // Calculate distance from center of viewport
          const distance = Math.abs(rect.top + rect.height / 2 - viewportHeight / 2);
          if (distance < minDistance) {
            minDistance = distance;
            activeIdx = idx;
          }
        }
      });
      
      setActiveChapter(activeIdx);
    };

    window.addEventListener("scroll", handleScroll);
    // Initial call
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <motion.div 
      animate={{ backgroundColor: bgColors[activeChapter] || "#F6F4F0" }}
      transition={{ duration: 0.8, ease: "easeInOut" }}
      className="text-text-primary min-h-screen flex flex-col overflow-x-hidden selection:bg-brand-terracotta selection:text-white transition-colors duration-500"
    >
      
      {/* ── Intro Hero Section ── */}
      <section 
        ref={heroRef}
        className="h-screen w-full flex flex-col items-center justify-center text-center px-6 relative overflow-hidden border-b border-brand-brown/5"
      >
        <div className="space-y-6 max-w-2xl z-10 flex flex-col items-center">
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
        </div>

        {/* Floating background shapes */}
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-brand-taupe/15 rounded-full blur-[100px] pointer-events-none -z-10" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-brand-terracotta/5 rounded-full blur-[120px] pointer-events-none -z-10" />

        {/* Scroll indicator */}
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 cursor-pointer pointer-events-none">
          <span className="font-sans text-[9px] tracking-[0.25em] uppercase font-bold text-brand-brown/50">
            Scroll to read
          </span>
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
          >
            <ArrowDown className="w-3.5 h-3.5 text-brand-terracotta" />
          </motion.div>
        </div>
      </section>

      {/* ── Main Editorial Content ── */}
      <main className="max-w-7xl mx-auto w-full flex flex-col md:flex-row gap-12 relative py-12 md:py-24">
        
        {/* Sticky Visual Column (Desktop only, pins on left) */}
        <div className="hidden md:block w-1/2 h-screen sticky top-0 flex items-center justify-center p-12 lg:p-16">
          <div className="relative aspect-[4/5] w-full max-w-[420px] rounded-3xl overflow-hidden shadow-2xl bg-bg-surface border border-brand-brown/5">
            {articles.map((article, idx) => (
              <motion.div
                key={article.id}
                initial={{ opacity: 0, scale: 1.05 }}
                animate={{ 
                  opacity: activeChapter === idx ? 1 : 0,
                  scale: activeChapter === idx ? 1.0 : 1.05
                }}
                transition={{ duration: 0.6, ease: "easeInOut" }}
                className="absolute inset-0"
              >
                <Image
                  src={article.image}
                  alt={article.alt}
                  fill
                  className="object-cover"
                  sizes="50vw"
                  priority={idx === 0}
                />
              </motion.div>
            ))}
            <div className="absolute top-6 left-6 bg-white/90 backdrop-blur-sm px-4 py-1.5 rounded-full text-[9px] font-sans font-bold tracking-widest uppercase text-brand-brown z-10">
              {articles[activeChapter]?.category}
            </div>
          </div>
        </div>

        {/* Scrolling Narrative Column (Right on desktop, full-width on mobile) */}
        <div className="w-full md:w-1/2 flex flex-col gap-24 md:gap-40 py-12 px-6 md:px-12 md:py-24">
          {articles.map((article, idx) => (
            <div
              key={article.id}
              id={`chapter-${idx}`}
              className="min-h-[70vh] flex flex-col justify-center relative"
            >
              {/* Monospace Badge & Progress Indicators */}
              <div className="flex items-center gap-3 mb-6">
                <span className="font-sans text-[10px] tracking-[0.3em] font-bold text-accent-secondary uppercase">
                  CHAPTER 0{idx + 1}
                </span>
                <div className="flex gap-1.5">
                  {articles.map((_, dotIdx) => (
                    <div
                      key={dotIdx}
                      className={`w-1 h-1 rounded-full transition-all duration-300 ${
                        idx === activeChapter 
                          ? "bg-brand-terracotta scale-125" 
                          : "bg-brand-brown/25"
                      }`}
                    />
                  ))}
                </div>
              </div>

              {/* Title */}
              <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold leading-tight text-brand-brown mb-4">
                {article.title}
              </h2>
              
              {/* Metadata */}
              <div className="flex items-center gap-4 text-[10px] font-sans text-text-secondary uppercase tracking-widest font-semibold pb-4">
                <span>{article.date}</span>
                <span>•</span>
                <span>By {article.author}</span>
              </div>

              {/* Inline Mobile Image (Hidden on Desktop) */}
              <div className="block md:hidden relative aspect-[4/3] w-full rounded-2xl overflow-hidden shadow-lg bg-bg-surface my-6">
                <Image
                  src={article.image}
                  alt={article.alt}
                  fill
                  className="object-cover"
                  sizes="100vw"
                />
              </div>

              {/* Essay Text Content */}
              <div className="space-y-6 font-sans text-base lg:text-lg text-text-secondary leading-relaxed font-light mt-4">
                {/* Paragraph 1 with Drop Cap */}
                <p className="first-letter:float-left first-letter:text-6xl first-letter:font-serif first-letter:mr-3 first-letter:font-bold first-letter:text-brand-terracotta first-letter:mt-1">
                  {article.content[0]}
                </p>

                {/* Pull Quote */}
                <blockquote className="my-8 border-l-2 border-brand-terracotta/30 pl-6 py-2">
                  <p className="font-serif text-xl lg:text-2xl italic text-brand-terracotta leading-relaxed font-medium">
                    &ldquo;{article.quote}&rdquo;
                  </p>
                </blockquote>

                {/* Paragraphs 2 & 3 */}
                <p>{article.content[1]}</p>
                <p>{article.content[2]}</p>
              </div>
            </div>
          ))}
        </div>
      </main>

      {/* ── Outro / Call-To-Action ── */}
      <section className="h-[80vh] w-full flex flex-col items-center justify-center text-center px-6 relative bg-transparent border-t border-brand-brown/5">
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
    </motion.div>
  );
}
