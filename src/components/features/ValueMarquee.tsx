"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import { Leaf, Handshake, Box, Heart } from "lucide-react";

export default function ValueMarquee() {
  const [isHovered, setIsHovered] = useState(false);

  const values = [
    { icon: Leaf, label: "100% NATURAL" },
    { icon: Handshake, label: "ETHICALLY SOURCED" },
    { icon: Box, label: "PLASTIC-FREE PACKAGING" },
    { icon: Heart, label: "MADE WITH INTENTION" },
  ];

  const marqueeContent = (
    <div className="flex whitespace-nowrap gap-12 pr-12">
      {values.map((value, idx) => (
        <div key={idx} className="flex items-center gap-3 shrink-0">
          <value.icon className="w-4 h-4 stroke-[1.5] text-brand-sand" />
          <span className="font-sans text-xs tracking-[0.3em] uppercase font-semibold text-brand-sand">
            {value.label}
          </span>
        </div>
      ))}
    </div>
  );

  return (
    <section className="w-full py-4 bg-brand-brown border-y border-brand-sand/20 overflow-hidden">
      <motion.div
        className="flex overflow-hidden w-full"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <motion.div
          animate={{
            x: isHovered ? 0 : ["0%", "-33.333%"],
          }}
          transition={{
            duration: isHovered ? 0 : 20,
            ease: "linear",
            repeat: isHovered ? 0 : Infinity,
          }}
          className="flex"
        >
          {/* Three blocks to guarantee full-width coverage on ultra-wide screens */}
          {marqueeContent}
          {marqueeContent}
          {marqueeContent}
        </motion.div>
      </motion.div>
    </section>
  );
}
