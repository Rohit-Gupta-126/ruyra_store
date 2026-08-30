"use client";

import { useRef, useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, ArrowDown, Heart, Sparkles } from "lucide-react";
import { motion, AnimatePresence, useScroll, useTransform, type Variants } from "framer-motion";
import Footer from "@/components/layout/Footer";

const articles = [
  {
    id: "everlasting-blooms",
    chapter: "01",
    category: "CRAFT & DESIGN",
    date: "August 2026",
    author: "Elena Chisó",
    image: "https://images.unsplash.com/photo-1582794543139-8ac9cb0f7b11?q=80&w=1200&auto=format&fit=crop",
    alt: "Handcrafted pink and cream chenille flowers",
    title: ["The Magic of", "Everlasting Blooms"],
    quote: "In every soft chenille petal, we capture a moment of blooming joy that never has to fade.",
    paragraphs: [
      "Cut flowers carry a transient beauty, yet there is always an undercurrent of sadness as petals wilt and drop into the dustbin after only a few days. At CHISÓ Creations, we set out to reimagine the gift of flowers — preserving the joy of blooming color without the fleeting loss.",
      "Each chenille tulip and daisy is sculpted loop by loop from velvety, hypoallergenic fibers. The tactile plushness of the petals invites human touch, turning a simple centerpiece into a warm, comforting presence in your room.",
      "When you gift an everlasting bloom, you give someone a permanent reminder that they are loved and cherished, day after day, year after year."
    ]
  },
  {
    id: "slow-gifting",
    chapter: "02",
    category: "PHILOSOPHY",
    date: "July 2026",
    author: "The Chisó Studio",
    image: "https://images.unsplash.com/photo-1549465220-1a8b9238cd48?q=80&w=800&auto=format&fit=crop",
    alt: "Handmade gift hamper with ribbon and personalized letter",
    title: ["Why Handmade Gifts", "Mean More"],
    quote: "Mass production makes things convenient. Human hands make things unforgettable.",
    paragraphs: [
      "In a world of one-click digital purchases and identical plastic goods, holding something made slowly by hand feels radical. It carries the weight of intention, patience, and artisan care.",
      "When we stitch a miniature crochet heart or assemble a bespoke bouquet with a handwritten note, we are weaving emotion into physical matter. The recipient feels that uniqueness instantly upon unboxing.",
      "Supporting small creators is about keeping human warmth alive in the objects we surround ourselves with every day."
    ]
  },
  {
    id: "cozy-spaces",
    chapter: "03",
    category: "HOME & LIVING",
    date: "June 2026",
    author: "Elena Chisó",
    image: "https://images.unsplash.com/photo-1563245372-f21724e3856d?q=80&w=800&auto=format&fit=crop",
    alt: "Miniature woven basket flowers on wooden table",
    title: ["Styling Handcrafted", "Décor in Cozy Spaces"],
    quote: "A small woven basket of daisies can transform an ordinary study desk into a sanctuary of warmth.",
    paragraphs: [
      "Modern interior spaces often suffer from clinical minimalism — sterile white walls, black screens, and cold metal edges. Soft textures like chenille yarn, natural rattan weaving, and clay ceramic pots add necessary softness.",
      "Placing a small handcrafted daisy pot on your bedside table or bookshelf catches the morning sun and introduces a sense of playful optimism to your morning routine.",
      "Your home should be your personal sanctuary: filled with colors that make you smile and little luxuries that tell your unique story."
    ]
  }
];

export default function JournalPage() {
  return (
    <main className="min-h-screen bg-[#FAF7F2] text-[#422926]">
      {/* Header */}
      <div className="bg-[#FAF7F2] py-16 md:py-24 px-6 md:px-12 border-b border-[#EFE7DD] text-center space-y-4">
        <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-brand-rose-light text-brand-terracotta text-xs font-sans font-semibold">
          <Sparkles className="w-3.5 h-3.5 text-brand-gold" />
          <span>NOTES ON CRAFT, BLOOMS & INTENTIONAL LIVING</span>
        </div>
        <h1 className="font-serif text-4xl sm:text-5xl md:text-6xl font-bold text-[#422926]">
          Our Story & <span className="font-script text-5xl sm:text-6xl md:text-7xl text-brand-terracotta">Journal</span>
        </h1>
        <p className="font-sans text-xs sm:text-sm text-brand-text-muted max-w-lg mx-auto">
          Reflections on the art of slow handmade gifts, everlasting flowers, and the joy of supporting small craft.
        </p>
      </div>

      {/* Articles List */}
      <div className="max-w-5xl mx-auto px-6 md:px-12 py-16 space-y-20">
        {articles.map((article, idx) => (
          <article
            key={article.id}
            className="grid grid-cols-1 md:grid-cols-12 gap-8 sm:gap-12 items-center bg-white p-6 sm:p-10 rounded-3xl border border-[#EFE7DD] shadow-xs"
          >
            {/* Image */}
            <div className={`md:col-span-5 aspect-4/5 relative rounded-2xl overflow-hidden bg-brand-taupe ${idx % 2 === 1 ? "md:order-2" : ""}`}>
              <Image
                src={article.image}
                alt={article.alt}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 40vw"
              />
              <div className="absolute top-3 left-3 px-3 py-1 rounded-full bg-white/90 backdrop-blur text-[10px] font-sans font-bold text-brand-terracotta uppercase">
                {article.category}
              </div>
            </div>

            {/* Content */}
            <div className={`md:col-span-7 space-y-4 text-left ${idx % 2 === 1 ? "md:order-1" : ""}`}>
              <div className="flex items-center gap-2 text-xs font-sans text-brand-text-muted">
                <span className="font-bold text-brand-terracotta">{article.chapter}</span>
                <span>•</span>
                <span>{article.date}</span>
                <span>•</span>
                <span>By {article.author}</span>
              </div>

              <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#422926]">
                {article.title[0]}{" "}
                <span className="font-script text-3xl sm:text-4xl text-brand-terracotta">
                  {article.title[1]}
                </span>
              </h2>

              <blockquote className="p-3.5 rounded-xl bg-brand-rose-light/50 border-l-3 border-brand-blush text-xs sm:text-sm font-serif italic text-[#422926]">
                &ldquo;{article.quote}&rdquo;
              </blockquote>

              <div className="space-y-3 text-xs sm:text-sm font-sans text-brand-text-muted leading-relaxed">
                {article.paragraphs.map((p, pIdx) => (
                  <p key={pIdx}>{p}</p>
                ))}
              </div>
            </div>
          </article>
        ))}
      </div>

      <Footer />
    </main>
  );
}
