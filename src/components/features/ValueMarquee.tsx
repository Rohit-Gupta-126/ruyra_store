"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import { Heart, Flower2, Gift, Sparkles, Box } from "lucide-react";

export default function ValueMarquee() {
  const [isHovered, setIsHovered] = useState(false);

  const values = [
    { icon: Heart, label: "MADE WITH LOVE ♡" },
    { icon: Flower2, label: "100% EVERLASTING BLOOMS" },
    { icon: Box, label: "PLASTIC-FREE PACKAGING" },
    { icon: Gift, label: "THOUGHTFUL CUSTOM GIFTS" },
    { icon: Sparkles, label: "SUPPORTING SMALL CRAFT ✨" },
  ];

  const marqueeContent = (
    <div className="flex whitespace-nowrap gap-10 sm:gap-14 pr-10 sm:pr-14">
      {values.map((value, idx) => (
        <div key={idx} className="flex items-center gap-3 shrink-0">
          <value.icon className="w-4 h-4 stroke-[1.75] text-[#E8A598]" />
          <span className="font-sans text-[11px] sm:text-xs tracking-[0.25em] uppercase font-bold text-[#FAF7F2]">
            {value.label}
          </span>
        </div>
      ))}
    </div>
  );

  return (
    <section className="w-full py-3.5 bg-[#422926] border-y border-[#38201D] overflow-hidden select-none">
      <motion.div
        className="flex overflow-hidden w-full cursor-grab"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <motion.div
          animate={{
            x: isHovered ? 0 : ["0%", "-33.333%"],
          }}
          transition={{
            duration: isHovered ? 0 : 22,
            ease: "linear",
            repeat: isHovered ? 0 : Infinity,
          }}
          className="flex"
        >
          {marqueeContent}
          {marqueeContent}
          {marqueeContent}
        </motion.div>
      </motion.div>
    </section>
  );
}
