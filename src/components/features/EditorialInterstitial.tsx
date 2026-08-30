"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Heart, Sparkles } from "lucide-react";

export default function EditorialInterstitial() {
  const containerRef = useRef<HTMLDivElement>(null);
  const stickyRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  const line1Opacity = useTransform(scrollYProgress, [0.05, 0.30], [0, 1]);
  const line1Y = useTransform(scrollYProgress, [0.05, 0.30], [30, 0]);

  const line2Opacity = useTransform(scrollYProgress, [0.30, 0.55], [0, 1]);
  const line2Y = useTransform(scrollYProgress, [0.30, 0.55], [30, 0]);

  const line3Opacity = useTransform(scrollYProgress, [0.55, 0.80], [0, 1]);
  const line3Y = useTransform(scrollYProgress, [0.55, 0.80], [30, 0]);

  const containerOpacity = useTransform(scrollYProgress, [0.85, 0.96], [1, 0]);
  const containerY = useTransform(scrollYProgress, [0.85, 0.96], [0, -30]);

  return (
    <section
      ref={containerRef}
      className="relative w-full min-h-[140vh] bg-[#F7EFE9]"
    >
      {/* Sticky container with text */}
      <div
        ref={stickyRef}
        className="sticky top-0 h-screen w-full flex flex-col items-center justify-center overflow-visible px-6"
      >
        <motion.div
          style={{
            opacity: containerOpacity,
            y: containerY,
          }}
          className="w-full max-w-5xl mx-auto text-center space-y-6"
        >
          <div className="flex items-center justify-center gap-2 text-brand-terracotta mb-4">
            <Heart className="w-4 h-4 fill-brand-terracotta" />
            <span className="font-sans text-xs uppercase tracking-[0.25em] font-semibold">
              THE CHISÓ PROMISE
            </span>
            <Heart className="w-4 h-4 fill-brand-terracotta" />
          </div>

          <motion.h2
            style={{
              opacity: line1Opacity,
              y: line1Y,
            }}
            className="font-serif text-3xl sm:text-5xl md:text-7xl text-[#422926] leading-[1.1] font-light"
          >
            Handmade with Love.
          </motion.h2>

          <motion.h2
            style={{
              opacity: line2Opacity,
              y: line2Y,
            }}
            className="font-script text-5xl sm:text-7xl md:text-8xl text-brand-terracotta leading-[1.1] font-normal"
          >
            Kept Forever. ♡
          </motion.h2>

          <motion.h2
            style={{
              opacity: line3Opacity,
              y: line3Y,
            }}
            className="font-serif text-3xl sm:text-5xl md:text-7xl text-[#422926] leading-[1.1] font-light"
          >
            Blooming Happiness in Every Stitch.
          </motion.h2>
        </motion.div>
      </div>
    </section>
  );
}
