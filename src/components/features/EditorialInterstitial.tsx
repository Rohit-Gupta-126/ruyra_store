"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

export default function EditorialInterstitial() {
  const containerRef = useRef<HTMLDivElement>(null);
  const stickyRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  // Map scroll progress to opacity and y position for each line (entrance and float-out exit)
  const line1Opacity = useTransform(scrollYProgress, [0.05, 0.22, 0.80, 0.92], [0, 1, 1, 0]);
  const line1Y = useTransform(scrollYProgress, [0.05, 0.22, 0.80, 0.92], [40, 0, 0, -20]);

  const line2Opacity = useTransform(scrollYProgress, [0.28, 0.45, 0.80, 0.92], [0, 1, 1, 0]);
  const line2Y = useTransform(scrollYProgress, [0.28, 0.45, 0.80, 0.92], [40, 0, 0, -20]);

  const line3Opacity = useTransform(scrollYProgress, [0.50, 0.68, 0.80, 0.92], [0, 1, 1, 0]);
  const line3Y = useTransform(scrollYProgress, [0.50, 0.68, 0.80, 0.92], [40, 0, 0, -20]);

  // Background color shift
  const bgOpacity = useTransform(scrollYProgress, [0, 1], [0.3, 1]);

  return (
    <section
      ref={containerRef}
      className="relative w-full min-h-[135vh] bg-brand-sand"
    >
      {/* Animated grain texture overlay */}
      <div className="absolute inset-0 opacity-5 mix-blend-multiply overflow-hidden pointer-events-none">
        <svg width="100%" height="100%">
          <filter id="noise">
            <feTurbulence
              type="fractalNoise"
              baseFrequency="0.9"
              numOctaves="4"
              result="noise"
              seed="2"
            />
            <feDisplacementMap
              in="SourceGraphic"
              in2="noise"
              scale="1"
              xChannelSelector="R"
              yChannelSelector="G"
            />
          </filter>
          <rect width="100%" height="100%" filter="url(#noise)" fill="url(#grad)" />
          <defs>
            <linearGradient id="grad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#8B7355" />
              <stop offset="100%" stopColor="#D4A574" />
            </linearGradient>
          </defs>
        </svg>
      </div>

      {/* Sticky container with text */}
      <div
        ref={stickyRef}
        className="sticky top-0 h-screen w-full flex flex-col items-center justify-center overflow-visible"
      >
        <div className="w-full max-w-5xl mx-auto px-6 text-center">
          <motion.h2
            style={{
              opacity: line1Opacity,
              y: line1Y,
            }}
            className="font-serif text-5xl md:text-7xl text-brand-brown leading-[1.1] font-light"
          >
            Light a Candle.
          </motion.h2>

          <motion.h2
            style={{
              opacity: line2Opacity,
              y: line2Y,
            }}
            className="font-serif text-6xl md:text-8xl text-brand-brown leading-[1.1] font-light mt-8"
          >
            Ground your Spirit.
          </motion.h2>

          <motion.h2
            style={{
              opacity: line3Opacity,
              y: line3Y,
            }}
            className="font-serif text-6xl md:text-8xl text-brand-brown leading-[1.1] font-light mt-8"
          >
            Reclaim your Space.
          </motion.h2>
        </div>
      </div>
    </section>
  );
}
