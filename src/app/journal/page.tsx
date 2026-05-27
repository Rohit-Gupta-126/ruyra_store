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

function StorySection({ article, index }: { article: Article; index: number }) {
  const containerRef = useRef<HTMLDivElement>(null);
  
  // Hook into scroll progress of this container
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  // Transforms for desktop view
  const imgScale = useTransform(scrollYProgress, [0, 0.5, 1], [1.1, 1.03, 1.0]);
  const imgOpacity = useTransform(scrollYProgress, [0, 0.15, 0.85, 1], [0.8, 1, 1, 0.8]);
  
  // Slide progress transforms
  const p1Opacity = useTransform(scrollYProgress, [0.05, 0.15, 0.28, 0.38], [0, 1, 1, 0]);
  const p1Y = useTransform(scrollYProgress, [0.05, 0.15, 0.28, 0.38], [30, 0, 0, -30]);

  const p2Opacity = useTransform(scrollYProgress, [0.38, 0.48, 0.62, 0.72], [0, 1, 1, 0]);
  const p2Y = useTransform(scrollYProgress, [0.38, 0.48, 0.62, 0.72], [30, 0, 0, -30]);

  const p3Opacity = useTransform(scrollYProgress, [0.72, 0.82, 0.92, 0.98], [0, 1, 1, 1]);
  const p3Y = useTransform(scrollYProgress, [0.72, 0.82, 0.92, 0.98], [30, 0, 0, 0]);

  // Active bullet dot state
  const [activeDot, setActiveDot] = useState(0);
  
  // Track the active dot by listening to scrollYProgress
  useEffect(() => {
    return scrollYProgress.on("change", (latest) => {
      if (latest < 0.36) {
        setActiveDot(0);
      } else if (latest >= 0.36 && latest < 0.70) {
        setActiveDot(1);
      } else {
        setActiveDot(2);
      }
    });
  }, [scrollYProgress]);

  const isEven = index % 2 === 0;

  return (
    <div 
      ref={containerRef} 
      className="relative w-full h-[220vh] bg-bg-primary text-text-primary border-b border-bg-surface/50"
    >
      {/* ── Desktop view: Sticky scroll-scrub split layout ── */}
      <div className="hidden md:flex sticky top-0 h-screen w-full overflow-hidden items-center">
        
        {/* Alternating image columns */}
        {isEven ? (
          <>
            {/* Image Left */}
            <div className="w-1/2 h-full flex items-center justify-center p-12 lg:p-16 relative">
              <div className="relative aspect-[4/5] w-full max-w-[420px] lg:max-w-[460px] rounded-3xl overflow-hidden shadow-2xl bg-bg-surface">
                <motion.div style={{ scale: imgScale, opacity: imgOpacity }} className="w-full h-full relative">
                  <Image
                    src={article.image}
                    alt={article.alt}
                    fill
                    className="object-cover"
                    sizes="50vw"
                  />
                </motion.div>
                <div className="absolute top-6 left-6 bg-white/90 backdrop-blur-sm px-4 py-1.5 rounded-full text-[9px] font-sans font-bold tracking-widest uppercase text-brand-brown">
                  {article.category}
                </div>
              </div>
            </div>

            {/* Text Right */}
            <div className="w-1/2 h-full flex flex-col justify-center pl-16 pr-16 lg:pl-24 lg:pr-32 relative">
              {/* Category Indicator & Progress Indicator dots on the left of text */}
              <div className="absolute left-4 lg:left-8 top-1/2 -translate-y-1/2 flex flex-col items-center gap-3">
                <div className="font-sans text-[9px] tracking-widest text-text-secondary uppercase rotate-90 origin-left translate-x-[3px] mb-8 font-bold">
                  0{index + 1}
                </div>
                {[0, 1, 2].map((dotIndex) => (
                  <div 
                    key={dotIndex}
                    className={`w-1.5 h-1.5 rounded-full transition-all duration-300 ${
                      activeDot === dotIndex ? "bg-brand-terracotta scale-125" : "bg-brand-brown/20"
                    }`}
                  />
                ))}
              </div>

              {/* Title */}
              <div className="space-y-2 mb-8">
                <span className="font-sans text-[10px] tracking-[0.3em] font-bold text-accent-secondary uppercase">
                  CHAPTER 0{index + 1}
                </span>
                <h2 className="font-serif text-3xl lg:text-5xl font-bold leading-[1.15] text-brand-brown">
                  {article.title}
                </h2>
                <div className="flex items-center gap-3 text-[10px] font-sans text-text-secondary uppercase tracking-widest font-semibold pt-1">
                  <span>{article.date}</span>
                  <span>•</span>
                  <span>By {article.author}</span>
                </div>
              </div>

              {/* Content Slides */}
              <div className="relative w-full h-[280px] lg:h-[320px]">
                {/* Paragraph 1 */}
                <motion.p 
                  style={{ opacity: p1Opacity, y: p1Y }}
                  className="absolute inset-0 font-sans text-base lg:text-lg text-text-secondary leading-relaxed font-light first-letter:float-left first-letter:text-6xl first-letter:font-serif first-letter:mr-3 first-letter:font-bold first-letter:text-brand-terracotta first-letter:mt-1"
                >
                  {article.content[0]}
                </motion.p>

                {/* Quote (Paragraph 2 in flow) */}
                <motion.blockquote 
                  style={{ opacity: p2Opacity, y: p2Y }}
                  className="absolute inset-0 flex flex-col justify-center border-l-2 border-brand-terracotta/30 pl-6 py-2"
                >
                  <p className="font-serif text-xl lg:text-2xl italic text-brand-terracotta leading-relaxed font-medium">
                    &ldquo;{article.quote}&rdquo;
                  </p>
                </motion.blockquote>

                {/* Paragraph 2 & 3 Combined */}
                <motion.div 
                  style={{ opacity: p3Opacity, y: p3Y }}
                  className="absolute inset-0 overflow-y-auto no-scrollbar font-sans text-base lg:text-lg text-text-secondary leading-relaxed font-light space-y-4"
                >
                  <p>{article.content[1]}</p>
                  <p>{article.content[2]}</p>
                </motion.div>
              </div>
            </div>
          </>
        ) : (
          <>
            {/* Text Left */}
            <div className="w-1/2 h-full flex flex-col justify-center pl-16 pr-16 lg:pl-24 lg:pr-32 relative">
              {/* Category Indicator & Progress Indicator dots on the left of text */}
              <div className="absolute left-4 lg:left-8 top-1/2 -translate-y-1/2 flex flex-col items-center gap-3">
                <div className="font-sans text-[9px] tracking-widest text-text-secondary uppercase rotate-90 origin-left translate-x-[3px] mb-8 font-bold">
                  0{index + 1}
                </div>
                {[0, 1, 2].map((dotIndex) => (
                  <div 
                    key={dotIndex}
                    className={`w-1.5 h-1.5 rounded-full transition-all duration-300 ${
                      activeDot === dotIndex ? "bg-brand-terracotta scale-125" : "bg-brand-brown/20"
                    }`}
                  />
                ))}
              </div>

              {/* Title */}
              <div className="space-y-2 mb-8">
                <span className="font-sans text-[10px] tracking-[0.3em] font-bold text-accent-secondary uppercase">
                  CHAPTER 0{index + 1}
                </span>
                <h2 className="font-serif text-3xl lg:text-5xl font-bold leading-[1.15] text-brand-brown">
                  {article.title}
                </h2>
                <div className="flex items-center gap-3 text-[10px] font-sans text-text-secondary uppercase tracking-widest font-semibold pt-1">
                  <span>{article.date}</span>
                  <span>•</span>
                  <span>By {article.author}</span>
                </div>
              </div>

              {/* Content Slides */}
              <div className="relative w-full h-[280px] lg:h-[320px]">
                {/* Paragraph 1 */}
                <motion.p 
                  style={{ opacity: p1Opacity, y: p1Y }}
                  className="absolute inset-0 font-sans text-base lg:text-lg text-text-secondary leading-relaxed font-light first-letter:float-left first-letter:text-6xl first-letter:font-serif first-letter:mr-3 first-letter:font-bold first-letter:text-brand-terracotta first-letter:mt-1"
                >
                  {article.content[0]}
                </motion.p>

                {/* Quote (Paragraph 2 in flow) */}
                <motion.blockquote 
                  style={{ opacity: p2Opacity, y: p2Y }}
                  className="absolute inset-0 flex flex-col justify-center border-l-2 border-brand-terracotta/30 pl-6 py-2"
                >
                  <p className="font-serif text-xl lg:text-2xl italic text-brand-terracotta leading-relaxed font-medium">
                    &ldquo;{article.quote}&rdquo;
                  </p>
                </motion.blockquote>

                {/* Paragraph 2 & 3 Combined */}
                <motion.div 
                  style={{ opacity: p3Opacity, y: p3Y }}
                  className="absolute inset-0 overflow-y-auto no-scrollbar font-sans text-base lg:text-lg text-text-secondary leading-relaxed font-light space-y-4"
                >
                  <p>{article.content[1]}</p>
                  <p>{article.content[2]}</p>
                </motion.div>
              </div>
            </div>

            {/* Image Right */}
            <div className="w-1/2 h-full flex items-center justify-center p-12 lg:p-16 relative">
              <div className="relative aspect-[4/5] w-full max-w-[420px] lg:max-w-[460px] rounded-3xl overflow-hidden shadow-2xl bg-bg-surface">
                <motion.div style={{ scale: imgScale, opacity: imgOpacity }} className="w-full h-full relative">
                  <Image
                    src={article.image}
                    alt={article.alt}
                    fill
                    className="object-cover"
                    sizes="50vw"
                  />
                </motion.div>
                <div className="absolute top-6 left-6 bg-white/90 backdrop-blur-sm px-4 py-1.5 rounded-full text-[9px] font-sans font-bold tracking-widest uppercase text-brand-brown">
                  {article.category}
                </div>
              </div>
            </div>
          </>
        )}
      </div>

      {/* ── Mobile view: Clean vertical editorial layout ── */}
      <div className="flex md:hidden flex-col px-6 py-16 w-full gap-6">
        
        {/* Monospace Badge */}
        <div className="flex items-center justify-between">
          <span className="font-sans text-[10px] tracking-[0.25em] font-bold text-accent-secondary uppercase">
            CHAPTER 0{index + 1} / {article.category}
          </span>
          <span className="font-sans text-[11px] text-text-secondary uppercase tracking-widest font-bold">
            0{index + 1}
          </span>
        </div>

        {/* Title */}
        <h2 className="font-serif text-3xl font-bold text-brand-brown leading-tight">
          {article.title}
        </h2>
        
        {/* Metadata */}
        <div className="flex items-center gap-4 text-[10px] font-sans text-text-secondary uppercase tracking-widest font-bold pb-2">
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
          className="relative aspect-[4/3] w-full rounded-2xl overflow-hidden shadow-lg bg-bg-surface"
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
        <div className="space-y-6 font-sans text-[15px] text-text-secondary leading-relaxed font-light pt-2">
          {/* Paragraph 1 */}
          <p className="first-letter:float-left first-letter:text-6xl first-letter:font-serif first-letter:mr-2.5 first-letter:font-bold first-letter:text-brand-terracotta first-letter:mt-1">
            {article.content[0]}
          </p>

          {/* Pull Quote */}
          <blockquote className="my-8 py-6 border-y border-brand-brown/10 px-4 text-center">
            <p className="font-serif text-lg italic text-brand-terracotta leading-relaxed">
              &ldquo;{article.quote}&rdquo;
            </p>
          </blockquote>

          {/* Paragraph 2 */}
          <p>{article.content[1]}</p>

          {/* Paragraph 3 */}
          <p>{article.content[2]}</p>
        </div>

      </div>
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

      {/* ── Chapters ── */}
      <main className="w-full">
        {articles.map((article, index) => (
          <StorySection key={article.id} article={article} index={index} />
        ))}
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
