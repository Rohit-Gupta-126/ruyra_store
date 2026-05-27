"use client";

import { useState } from "react";
import Image from "next/image";
import { X, ArrowRight, Calendar, User } from "lucide-react";
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
  isFeature: boolean;
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
    isFeature: true,
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
    isFeature: false,
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
    isFeature: false,
    content: [
      "Irregularities are the voice of the materials speaking. When an object is perfectly uniform, it ceases to command attention; it disappears into the background of our sight. A wood-fired clay vessel, however, carries the erratic signature of the flame. It has iron-spot freckles, running glazes, and tactile ridges where the potter's fingers pressed.",
      "In a digital world of smooth screens and frictionless glass, these rough geometries draw our hands. They hold us in the tangible present. Touching the gritty sand-texture of a clay holder reminds us of the earth it came from and the kiln fire that made it solid.",
      "To surround oneself with handcrafted objects is to populate our sanctuary with stories of human touch. It is a quiet rejection of mass production in favor of singular intention."
    ],
    quote: "In the imperfect surface of hand-formed clay, we find the texture of truth."
  }
];

export default function JournalPage() {
  const [selectedArticle, setSelectedArticle] = useState<Article | null>(null);

  return (
    <div className="bg-bg-primary text-text-primary min-h-screen flex flex-col">
      
      {/* ── Masthead Hero ── */}
      <section className="h-[50vh] w-full flex flex-col items-center justify-center text-center px-6 border-b border-bg-surface">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="space-y-4 max-w-xl"
        >
          <span className="font-sans text-[10px] tracking-[0.3em] uppercase font-bold text-accent-secondary">
            THE JOURNAL
          </span>
          <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl leading-[1.1] font-bold">
            Notes on Intentional Living
          </h1>
          <div className="w-12 h-px bg-accent-primary/30 mx-auto mt-6" />
        </motion.div>
      </section>

      {/* ── Editorial Asymmetrical Article Grid ── */}
      <main className="max-w-7xl mx-auto w-full px-6 md:px-12 py-24 flex-1">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-16">
          
          {articles.map((article, index) => {
            const isFeature = article.isFeature;
            return (
              <motion.div
                key={article.id}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ type: "spring", stiffness: 60, damping: 15, delay: index * 0.15 }}
                onClick={() => setSelectedArticle(article)}
                className={`group cursor-pointer flex flex-col gap-6 ${
                  isFeature ? "md:col-span-2" : "col-span-1"
                }`}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    e.preventDefault();
                    setSelectedArticle(article);
                  }
                }}
                aria-label={`Read article: ${article.title}`}
              >
                {/* Asymmetrical Image Container */}
                <div 
                  className={`relative w-full rounded-2xl overflow-hidden bg-bg-surface ${
                    isFeature ? "aspect-[21/9] h-[260px] sm:h-[320px] md:h-[450px]" : "aspect-[4/3] md:aspect-[3/4] h-auto"
                  }`}
                >
                  <motion.div
                    whileHover={{ scale: 1.03 }}
                    transition={{ duration: 1, ease: "easeOut" }}
                    className="w-full h-full relative sepia-[.20] contrast-100 group-hover:sepia-0 transition-all duration-700"
                  >
                    <Image
                      src={article.image}
                      alt={article.alt}
                      fill
                      className="object-cover"
                      sizes={isFeature ? "100vw" : "(max-width: 768px) 100vw, 50vw"}
                    />
                  </motion.div>
                  
                  {/* Category label badge */}
                  <span className="absolute top-4 left-4 bg-white/80 backdrop-blur-sm text-text-primary font-sans text-[9px] font-bold tracking-widest px-3 py-1 rounded-full uppercase">
                    {article.category}
                  </span>
                </div>

                {/* Article Info */}
                <div className={`space-y-3 ${isFeature ? "max-w-2xl" : "w-full"}`}>
                  <div className="flex items-center gap-4 text-[10px] font-sans text-text-secondary uppercase tracking-wider font-semibold">
                    <span className="flex items-center gap-1"><Calendar className="w-3 h-3" /> {article.date}</span>
                    <span className="flex items-center gap-1"><User className="w-3 h-3" /> {article.author}</span>
                  </div>
                  <h2 className="font-serif text-2xl md:text-3xl font-bold group-hover:text-accent-primary transition-colors leading-tight">
                    {article.title}
                  </h2>
                  <p className="font-sans text-sm text-text-secondary leading-relaxed font-light line-clamp-3">
                    {article.description}
                  </p>
                  
                  <span className="inline-flex items-center gap-2 font-sans text-xs tracking-wider uppercase font-semibold text-accent-primary mt-2 border-b border-accent-primary/20 pb-0.5 group-hover:border-accent-primary transition-colors">
                    Read Essay <ArrowRight className="w-3 h-3" />
                  </span>
                </div>
              </motion.div>
            );
          })}

        </div>
      </main>

      {/* ── Article Read View Modal (AnimatePresence Overlay) ── */}
      <AnimatePresence>
        {selectedArticle && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedArticle(null)}
              className="fixed inset-0 bg-black/60 backdrop-blur-md z-95"
              aria-hidden="true"
            />

            {/* Essay Modal Container */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ type: "spring", stiffness: 200, damping: 22 }}
              className="fixed inset-4 sm:inset-6 md:inset-12 lg:inset-20 bg-bg-primary rounded-3xl shadow-2xl z-100 flex flex-col text-text-primary overflow-hidden"
              role="dialog"
              aria-modal="true"
              aria-label={selectedArticle.title}
            >
              {/* Close Button Header - Fixed at Top */}
              <div className="flex justify-between items-center px-6 py-4 md:px-12 md:py-6 border-b border-bg-surface shrink-0 z-20 bg-bg-primary/95 backdrop-blur-sm">
                <span className="font-sans text-[10px] tracking-[0.25em] uppercase text-text-secondary font-bold">
                  {selectedArticle.category}
                </span>
                <button
                  onClick={() => setSelectedArticle(null)}
                  className="w-10 h-10 rounded-full bg-bg-surface flex items-center justify-center text-text-secondary hover:text-text-primary hover:bg-gray-200 transition-colors focus:outline-none"
                  aria-label="Close article"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Scrollable Essay Content */}
              <div className="flex-1 overflow-y-auto px-6 py-10 md:py-16 md:px-12 no-scrollbar">
                <article className="max-w-3xl mx-auto space-y-10">
                  
                  {/* Essay Header */}
                  <div className="text-center space-y-3">
                    <h1 className="font-serif text-2xl sm:text-3xl md:text-5xl font-bold leading-tight max-w-2xl mx-auto">
                      {selectedArticle.title}
                    </h1>
                    <div className="flex items-center justify-center gap-4 text-xs font-sans text-text-secondary uppercase tracking-widest pt-2">
                      <span>{selectedArticle.date}</span>
                      <span>•</span>
                      <span>By {selectedArticle.author}</span>
                    </div>
                  </div>

                  {/* Feature Image inside Article */}
                  <div className="relative aspect-video w-full rounded-2xl overflow-hidden bg-bg-surface">
                    <Image
                      src={selectedArticle.image}
                      alt={selectedArticle.alt}
                      fill
                      className="object-cover"
                      sizes="100vw"
                    />
                  </div>

                  {/* Article Body */}
                  <div className="max-w-prose mx-auto font-sans text-base md:text-lg text-text-primary leading-[1.9] font-light space-y-8">
                    
                    {/* First Paragraph with massive serif Drop Cap */}
                    <p className="first-letter:float-left first-letter:text-7xl first-letter:font-serif first-letter:mr-3 first-letter:font-bold first-letter:text-accent-primary first-letter:mt-2">
                      {selectedArticle.content[0]}
                    </p>

                    {/* Breakout Pull Quote */}
                    <blockquote className="w-full md:w-[110%] md:ml-[-5%] py-8 border-y border-bg-surface flex flex-col items-center justify-center text-center my-10">
                      <p className="font-serif text-xl md:text-2xl italic text-accent-primary font-medium max-w-xl leading-relaxed">
                        &ldquo;{selectedArticle.quote}&rdquo;
                      </p>
                    </blockquote>

                    {/* Remaining Paragraphs */}
                    {selectedArticle.content.slice(1).map((para, i) => (
                      <p key={i}>
                        {para}
                      </p>
                    ))}

                  </div>

                  {/* Essay Footer */}
                  <div className="max-w-prose mx-auto pt-12 border-t border-bg-surface text-center space-y-4">
                    <p className="font-serif text-sm italic text-text-secondary">
                      Thank you for reading the RUYRA Journal.
                    </p>
                    <button
                      onClick={() => setSelectedArticle(null)}
                      className="px-6 py-2.5 bg-accent-primary text-white rounded-full font-sans text-xs uppercase tracking-widest font-semibold hover:bg-opacity-95 transition-all"
                    >
                      Return to Journal
                    </button>
                  </div>

                </article>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Footer */}
      <Footer />
    </div>
  );
}
