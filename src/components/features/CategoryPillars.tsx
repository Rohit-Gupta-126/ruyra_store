"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Flower2, Sparkles, Gift, Home, PenTool, Heart } from "lucide-react";

interface Pillar {
  id: string;
  icon: typeof Flower2;
  title: string;
  subtitle: string;
  href: string;
  badge?: string;
  gradient: string;
}

const PILLARS: Pillar[] = [
  {
    id: "blooms",
    icon: Flower2,
    title: "BLOOMS",
    subtitle: "Chenille Flower Creations",
    href: "/shop?category=Blooms",
    badge: "Kept Forever",
    gradient: "from-[#FADCD9] to-[#F7E6E2]"
  },
  {
    id: "charms",
    icon: Sparkles,
    title: "CHARMS",
    subtitle: "Adorable & Unique",
    href: "/shop?category=Charms",
    badge: "Cute & Plush",
    gradient: "from-[#F5E6E0] to-[#EFE2DB]"
  },
  {
    id: "gifts",
    icon: Gift,
    title: "GIFTS",
    subtitle: "Thoughtful. Heartfelt.",
    href: "/shop?category=Gifts",
    badge: "With Note ♡",
    gradient: "from-[#F9EBE8] to-[#F3DDD8]"
  },
  {
    id: "decor",
    icon: Home,
    title: "DÉCOR",
    subtitle: "Handmade to Beautify Spaces",
    href: "/shop?category=Décor",
    badge: "Cozy Spaces",
    gradient: "from-[#EAEFE8] to-[#DFE9DD]"
  },
  {
    id: "custom",
    icon: PenTool,
    title: "CUSTOM CREATIONS",
    subtitle: "Made especially for you. ♡",
    href: "/shop?category=Custom%20Creations",
    badge: "Bespoke",
    gradient: "from-[#FAF1E6] to-[#F5E6D3]"
  }
];

export default function CategoryPillars() {
  return (
    <section className="py-16 md:py-24 bg-brand-sand border-b border-brand-brown/5 relative overflow-hidden">
      {/* Subtle decorative background elements */}
      <div className="absolute top-0 right-10 text-brand-blush/10 select-none pointer-events-none text-9xl font-serif">
        🌸
      </div>

      <div className="max-w-7xl mx-auto px-6 md:px-12">
        {/* Header with script tagline */}
        <div className="text-center max-w-2xl mx-auto mb-14 space-y-3">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex items-center justify-center gap-2 text-brand-terracotta"
          >
            <Sparkles className="w-4 h-4" />
            <span className="font-sans text-xs uppercase tracking-[0.25em] font-semibold">
              OUR HANDCRAFTED WORLD
            </span>
            <Sparkles className="w-4 h-4" />
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="font-serif text-3xl sm:text-4xl md:text-5xl text-brand-brown"
          >
            Crafted by Hand, <span className="font-script text-4xl sm:text-5xl md:text-6xl text-brand-terracotta">Cherished Forever</span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="font-sans text-sm text-brand-text-muted leading-relaxed"
          >
            Handmade blooms, adorable charms, and thoughtful gifts made especially for you. ♡
          </motion.p>
        </div>

        {/* 5 Pillars Row */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4 sm:gap-6">
          {PILLARS.map((pillar, idx) => {
            const Icon = pillar.icon;
            return (
              <motion.div
                key={pillar.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                whileHover={{ y: -6 }}
                className="h-full"
              >
                <Link
                  href={pillar.href}
                  className="group relative flex flex-col items-center text-center p-6 sm:p-7 rounded-3xl bg-white border border-[#EFE7DD] hover:border-brand-rose transition-all duration-300 shadow-sm hover:shadow-md h-full justify-between"
                >
                  {/* Top Badge */}
                  {pillar.badge && (
                    <span className="text-[10px] font-sans font-medium px-2.5 py-0.5 rounded-full bg-brand-rose-light text-brand-terracotta mb-4">
                      {pillar.badge}
                    </span>
                  )}

                  {/* Icon Circle */}
                  <div
                    className={`w-16 h-16 sm:w-18 sm:h-18 rounded-full bg-gradient-to-br ${pillar.gradient} flex items-center justify-center text-brand-brown group-hover:scale-110 transition-transform duration-300 shadow-inner mb-5 relative`}
                  >
                    <Icon className="w-7 h-7 sm:w-8 sm:h-8 stroke-[1.5] text-brand-brown" />
                    <Heart className="w-3 h-3 text-brand-blush fill-brand-blush absolute bottom-1 right-1 opacity-0 group-hover:opacity-100 transition-opacity" />
                  </div>

                  {/* Title & Subtitle */}
                  <div className="space-y-1.5 w-full">
                    <h3 className="font-serif text-base sm:text-lg font-bold tracking-wider text-brand-brown group-hover:text-brand-terracotta transition-colors">
                      {pillar.title}
                    </h3>
                    <p className="font-sans text-xs text-brand-text-muted leading-snug">
                      {pillar.subtitle}
                    </p>
                  </div>

                  {/* Tiny arrow indicator */}
                  <span className="mt-4 font-script text-sm text-brand-terracotta opacity-0 group-hover:opacity-100 transition-opacity">
                    discover →
                  </span>
                </Link>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
