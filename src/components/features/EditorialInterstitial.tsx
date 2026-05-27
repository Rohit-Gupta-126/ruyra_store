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

  // Map scroll progress to opacity and y position for each line (gradual, smooth entrance)
  const line1Opacity = useTransform(scrollYProgress, [0.05, 0.30], [0, 1]);
  const line1Y = useTransform(scrollYProgress, [0.05, 0.30], [35, 0]);

  const line2Opacity = useTransform(scrollYProgress, [0.30, 0.55], [0, 1]);
  const line2Y = useTransform(scrollYProgress, [0.30, 0.55], [35, 0]);

  const line3Opacity = useTransform(scrollYProgress, [0.55, 0.80], [0, 1]);
  const line3Y = useTransform(scrollYProgress, [0.55, 0.80], [35, 0]);

  // Combined float-out exit transition applied to the whole text block for premium smoothness
  const containerOpacity = useTransform(scrollYProgress, [0.85, 0.96], [1, 0]);
  const containerY = useTransform(scrollYProgress, [0.85, 0.96], [0, -30]);

  return (
    <section
      ref={containerRef}
      className="relative w-full min-h-[150vh] bg-brand-sand"
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
        <motion.div
          style={{
            opacity: containerOpacity,
            y: containerY,
          }}
          className="w-full max-w-5xl mx-auto px-6 text-center"
        >
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
        </motion.div>
      </div>
    </section>
  );
}
