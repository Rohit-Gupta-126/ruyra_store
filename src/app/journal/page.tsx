"use client";

import { useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, ArrowDown } from "lucide-react";
import { motion, useScroll, useTransform } from "framer-motion";
import Footer from "@/components/layout/Footer";

/* ──────────────────────────────────────────────
   DATA
   ──────────────────────────────────────────── */

const articles = [
  {
    id: "slow-light",
    chapter: "01",
    category: "RITUAL",
    date: "May 24, 2026",
    author: "Elena Ruyra",
    image: "https://images.unsplash.com/photo-1603006905003-be475563bc59?q=80&w=1200&auto=format&fit=crop",
    alt: "Glowing amber jar candle",
    title: ["The Philosophy", "of Slow Light"],
    quote: "In the slow dance of firelight, we find a sanctuary that static light can never build.",
    paragraphs: [
      "Lighting a candle is more than a way to push back the dark; it is an act of quiet creation. In our modern search for hyper-efficiency, we have swapped the rich, shifting glow of fire for the static hum of LED panels. We live in constant, sterile illumination that denies the transition of day into night.",
      "Scientific observations show that flickering candlelight mimics our brains' resting alpha waves, immediately triggering a sense of calm. In this sanctuary, we seek raw organic materials that carry ancient histories — natural soy wax, botanical essential oils, and wood-fired ceramics that hold soil in their bones.",
      "When we choose to live with slow light, we reclaim the boundaries of our day. The evening transitions from a continuation of work into a soft retreat of rest. The shadows cast by the flame are not empty space, but places for the mind to settle and wander without distraction."
    ]
  },
  {
    id: "bathing",
    chapter: "02",
    category: "WELLNESS",
    date: "April 18, 2026",
    author: "Dr. Marcus Vance",
    image: "https://images.unsplash.com/photo-1540555700478-4be289fbecef?q=80&w=800&auto=format&fit=crop",
    alt: "Himalayan salt crystals with lavender petals",
    title: ["Bathing as a", "Sacred Threshold"],
    quote: "Immersion is the physical act of leaving the world behind, step by step.",
    paragraphs: [
      "Water carries memory, and immersion washes away the noise of the day. Modern life treats hygiene as a transactional task, a brief box to check in the morning. When we slow the bath down — adding unrefined salts, lavender blossoms, and woodsmoke infusions — it becomes a threshold.",
      "The warmth of the water triggers a physical softening, dilating blood vessels and releasing lactic acid built up in muscles. Simultaneously, mineral-dense deposits of magnesium and potassium replenish the skin's barrier. By intention, we turn the bath into a sanctuary, a ritual of preservation.",
      "In the steam, our breathing slows. The botanicals — chamomile, cedarwood, and lavender — act as sensory anchors, drawing our focus away from digital notifications and back to the weight of our own bodies."
    ]
  },
  {
    id: "earthen",
    chapter: "03",
    category: "CRAFT",
    date: "March 02, 2026",
    author: "Sora Takahashi",
    image: "https://images.unsplash.com/photo-1612196808214-b8e1d6145a8c?q=80&w=800&auto=format&fit=crop",
    alt: "Artisanal clay candle holder",
    title: ["Tactile Geometry:", "Earthen Clay"],
    quote: "In the imperfect surface of hand-formed clay, we find the texture of truth.",
    paragraphs: [
      "Irregularities are the voice of the materials speaking. When an object is perfectly uniform, it ceases to command attention; it disappears into the background of our sight. A wood-fired clay vessel, however, carries the erratic signature of the flame — iron-spot freckles, running glazes, tactile ridges where the potter's fingers pressed.",
      "In a digital world of smooth screens and frictionless glass, these rough geometries draw our hands. They hold us in the tangible present. Touching the gritty sand-texture of a clay holder reminds us of the earth it came from and the kiln fire that made it solid.",
      "To surround oneself with handcrafted objects is to populate our sanctuary with stories of human touch. It is a quiet rejection of mass production in favor of singular intention."
    ]
  }
];

/* ──────────────────────────────────────────────
   CHAPTER SECTION COMPONENT
   Each chapter is its own isolated scroll zone.
   ──────────────────────────────────────────── */

function ChapterSection({ article, isLast }: { article: typeof articles[0]; isLast: boolean }) {
  const sectionRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end end"]
  });

  /* ── Parallax & zoom on background image ── */
  const imgScale = useTransform(scrollYProgress, [0, 1], [1.12, 1.0]);
  const imgY = useTransform(scrollYProgress, [0, 1], ["0%", "-6%"]);

  /* ── Overlay vignette lightens slightly as you read deeper ── */
  const overlayOpacity = useTransform(scrollYProgress, [0, 0.1, 0.5, 1], [0.7, 0.55, 0.55, 0.65]);

  /* ── Chapter label & title fades in early, exits at end ── */
  const titleOpacity = useTransform(scrollYProgress, [0, 0.06, 0.60, 0.72], [0, 1, 1, 0]);
  const titleY = useTransform(scrollYProgress, [0, 0.06, 0.60, 0.72], [30, 0, 0, -20]);

  /* ── Paragraph 1: visible 10%→30%, exits 38%→45% ── */
  const p1Opacity = useTransform(scrollYProgress, [0.06, 0.13, 0.36, 0.44], [0, 1, 1, 0]);
  const p1Y = useTransform(scrollYProgress, [0.06, 0.13, 0.36, 0.44], [24, 0, 0, -24]);

  /* ── Quote block: visible 44%→62%, exits 67%→74% ── */
  const quoteOpacity = useTransform(scrollYProgress, [0.44, 0.51, 0.64, 0.72], [0, 1, 1, 0]);
  const quoteY = useTransform(scrollYProgress, [0.44, 0.51, 0.64, 0.72], [24, 0, 0, -24]);

  /* ── Paragraph 2 + 3: visible 72%→90%, stays till end ── */
  const p2Opacity = useTransform(scrollYProgress, [0.72, 0.79, 0.95, 1.0], [0, 1, 1, isLast ? 1 : 0]);
  const p2Y = useTransform(scrollYProgress, [0.72, 0.79, 0.95, 1.0], [24, 0, 0, isLast ? 0 : -12]);

  return (
    /* Scroll zone: 5 viewport heights per chapter */
    <section ref={sectionRef} className="relative w-full h-[500vh]">
      
      {/* Sticky fullscreen frame */}
      <div className="sticky top-0 h-screen w-full overflow-hidden">

        {/* ── Background image layer ── */}
        <motion.div
          style={{ scale: imgScale, y: imgY }}
          className="absolute inset-0 w-full h-full will-change-transform"
        >
          <Image
            src={article.image}
            alt={article.alt}
            fill
            className="object-cover"
            sizes="100vw"
            priority={article.chapter === "01"}
          />
        </motion.div>

        {/* ── Vignette overlay ── */}
        <motion.div
          style={{ opacity: overlayOpacity }}
          className="absolute inset-0 bg-black pointer-events-none"
        />

        {/* ── Centered content layer ── */}
        <div className="absolute inset-0 flex flex-col items-center justify-center px-6 sm:px-12 lg:px-24">
          <div className="w-full max-w-2xl lg:max-w-3xl mx-auto flex flex-col items-start">

            {/* Chapter label + Title */}
            <motion.div style={{ opacity: titleOpacity, y: titleY }} className="mb-8 lg:mb-10">
              <p className="font-sans text-[10px] tracking-[0.35em] font-bold text-brand-terracotta uppercase mb-3">
                CHAPTER {article.chapter} · {article.category}
              </p>
              <h2 className="font-serif text-3xl sm:text-5xl lg:text-6xl font-bold text-white leading-[1.1]">
                {article.title[0]}
                <br />
                <span className="italic font-normal text-brand-sand">{article.title[1]}</span>
              </h2>
              <div className="flex items-center gap-3 mt-3 text-[10px] font-sans text-white/50 uppercase tracking-widest font-medium">
                <span>{article.date}</span>
                <span>·</span>
                <span>By {article.author}</span>
              </div>
            </motion.div>

            {/* Paragraph 1 — drop cap */}
            <motion.p
              style={{ opacity: p1Opacity, y: p1Y }}
              className="absolute top-1/2 -translate-y-1/2 w-full max-w-2xl lg:max-w-3xl font-sans text-base sm:text-lg text-white/80 leading-relaxed font-light px-6 sm:px-12 lg:px-24 left-0 right-0 mx-auto
                first-letter:float-left first-letter:text-7xl first-letter:font-serif first-letter:font-bold first-letter:text-brand-terracotta first-letter:mr-3 first-letter:mt-1 first-letter:leading-none"
            >
              {article.paragraphs[0]}
            </motion.p>

            {/* Pull Quote */}
            <motion.blockquote
              style={{ opacity: quoteOpacity, y: quoteY }}
              className="absolute top-1/2 -translate-y-1/2 w-full max-w-2xl lg:max-w-3xl px-6 sm:px-12 lg:px-24 left-0 right-0 mx-auto border-l-2 border-brand-terracotta pl-6 sm:pl-8"
            >
              <p className="font-serif text-xl sm:text-2xl lg:text-3xl italic text-brand-terracotta leading-snug font-medium">
                &ldquo;{article.quote}&rdquo;
              </p>
            </motion.blockquote>

            {/* Paragraphs 2 + 3 */}
            <motion.div
              style={{ opacity: p2Opacity, y: p2Y }}
              className="absolute top-1/2 -translate-y-1/2 w-full max-w-2xl lg:max-w-3xl px-6 sm:px-12 lg:px-24 left-0 right-0 mx-auto space-y-5 font-sans text-base sm:text-lg text-white/80 leading-relaxed font-light"
            >
              <p>{article.paragraphs[1]}</p>
              <p>{article.paragraphs[2]}</p>
            </motion.div>

          </div>
        </div>

        {/* ── Chapter number watermark (corner) ── */}
        <div className="absolute bottom-8 right-8 font-serif text-[80px] sm:text-[120px] font-bold text-white/5 leading-none select-none pointer-events-none">
          {article.chapter}
        </div>

        {/* ── Scroll cue (visible at chapter start) ── */}
        <motion.div
          style={{ opacity: titleOpacity }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 pointer-events-none"
        >
          <motion.div
            animate={{ y: [0, 6, 0] }}
            transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
          >
            <ArrowDown className="w-3.5 h-3.5 text-white/30" />
          </motion.div>
        </motion.div>

      </div>
    </section>
  );
}

/* ──────────────────────────────────────────────
   PAGE
   ──────────────────────────────────────────── */

export default function JournalPage() {
  return (
    <div className="bg-black text-white selection:bg-brand-terracotta selection:text-white">

      {/* ── INTRO SCREEN ── */}
      <section className="relative h-screen w-full flex flex-col items-center justify-center text-center px-6 overflow-hidden bg-black">
        {/* Dim atmospheric background from chapter 1 */}
        <div className="absolute inset-0">
          <Image
            src={articles[0].image}
            alt="Journal intro"
            fill
            className="object-cover opacity-25"
            sizes="100vw"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/80" />
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: "easeOut", delay: 0.2 }}
          className="relative z-10 flex flex-col items-center gap-5 max-w-2xl"
        >
          <span className="font-sans text-[10px] tracking-[0.4em] uppercase font-bold text-brand-terracotta">
            THE JOURNAL
          </span>
          <h1 className="font-serif text-4xl sm:text-6xl md:text-7xl leading-[1.05] font-bold text-white">
            Notes on
            <br />
            <span className="italic font-normal text-brand-sand">Intentional Living</span>
          </h1>
          <div className="w-10 h-px bg-brand-terracotta/60 my-2" />
          <p className="font-sans text-sm text-white/55 max-w-sm leading-relaxed font-light">
            Three essays on ritual, sensory grounding, and the quiet spaces we build for the mind.
          </p>

          <div className="flex flex-col items-center gap-2 mt-6 text-white/30">
            <span className="font-sans text-[9px] tracking-[0.25em] uppercase font-semibold">
              Scroll to read
            </span>
            <motion.div
              animate={{ y: [0, 6, 0] }}
              transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
            >
              <ArrowDown className="w-3.5 h-3.5 text-brand-terracotta" />
            </motion.div>
          </div>
        </motion.div>
      </section>

      {/* ── THREE CHAPTERS ── */}
      {articles.map((article, idx) => (
        <ChapterSection
          key={article.id}
          article={article}
          isLast={idx === articles.length - 1}
        />
      ))}

      {/* ── OUTRO ── */}
      <section className="relative h-screen w-full flex flex-col items-center justify-center text-center px-6 bg-black overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src={articles[2].image}
            alt="Outro"
            fill
            className="object-cover opacity-15"
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-black/70" />
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 1 }}
          className="relative z-10 flex flex-col items-center gap-6 max-w-xl"
        >
          <span className="font-sans text-[9px] tracking-[0.35em] uppercase font-bold text-brand-terracotta">
            CODA
          </span>
          <h2 className="font-serif text-xl sm:text-2xl md:text-3xl italic font-normal leading-relaxed text-brand-sand">
            &ldquo;To live with intention is to choose light that leaves room for shadow.&rdquo;
          </h2>
          <div className="w-10 h-px bg-white/15 my-2" />
          <Link
            href="/shop"
            className="inline-flex items-center gap-2 px-8 py-3.5 bg-brand-terracotta hover:bg-opacity-90 text-white font-sans text-xs uppercase tracking-widest font-semibold rounded-full shadow-lg transition-all hover:scale-105 active:scale-95"
          >
            Explore the Collection <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </motion.div>
      </section>

      {/* ── FOOTER ── */}
      <div className="bg-bg-primary">
        <Footer />
      </div>

    </div>
  );
}
