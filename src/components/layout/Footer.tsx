"use client";

import Link from "next/link";
import { motion } from "framer-motion";

export default function Footer() {
  return (
    <footer id="story-section" className="bg-bg-primary pt-16 pb-12 border-t border-bg-surface w-full">
      <div className="max-w-7xl mx-auto px-6 md:px-12 flex flex-col gap-8">
        
        {/* Top Segment: Brand & Navigation */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-8 border-b border-bg-surface pb-10">
          <div className="space-y-2">
            <h3 className="font-serif text-2xl tracking-[0.15em] text-text-primary font-bold">
              RUYRA
            </h3>
            <p className="font-sans text-xs text-text-secondary max-w-sm font-light leading-relaxed">
              Crafting botanical rituals to bring intention, warmth, and raw tactile beauty to modern spaces.
            </p>
          </div>
          
          <nav className="flex flex-wrap gap-x-8 gap-y-4 text-sm font-medium" aria-label="Footer Directory">
            <Link href="/shop" className="font-serif text-[15px] text-text-secondary hover:text-accent-primary transition-colors">
              Shop All
            </Link>
            <Link href="/journal" className="font-serif text-[15px] text-text-secondary hover:text-accent-primary transition-colors">
              Our Story
            </Link>
            <Link href="/#sustainability-section" className="font-serif text-[15px] text-text-secondary hover:text-accent-primary transition-colors">
              Sustainability
            </Link>
            <Link href="/#newsletter-section" className="font-serif text-[15px] text-text-secondary hover:text-accent-primary transition-colors">
              Contact
            </Link>
          </nav>
        </div>

        {/* Bottom Segment: Copyright, Policies & Socials */}
        <div className="flex flex-col sm:flex-row justify-between items-center gap-6 pt-2">
          <div className="flex flex-col sm:flex-row items-center gap-4 sm:gap-8 text-center sm:text-left">
            <p className="font-sans text-xs text-text-secondary font-light">
              © {new Date().getFullYear()} RUYRA. Poured with Intention.
            </p>
            <div className="flex gap-4">
              <Link href="/journal" className="font-sans text-[11px] text-text-secondary hover:text-text-primary transition-colors font-light">
                Privacy Policy
              </Link>
              <Link href="/shop" className="font-sans text-[11px] text-text-secondary hover:text-text-primary transition-colors font-light">
                Terms of Service
              </Link>
            </div>
          </div>
          
          {/* Socials */}
          <div className="flex gap-4">
            {[
              {
                label: "Instagram",
                svg: (
                  <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                    <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
                    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                    <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
                  </svg>
                )
              },
              {
                label: "Facebook",
                svg: (
                  <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
                  </svg>
                )
              },
              {
                label: "Youtube",
                svg: (
                  <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M2.5 17a24.12 24.12 0 0 1 0-10 2 2 0 0 1 1.4-1.4 49.56 49.56 0 0 1 16.2 0A2 2 0 0 1 21.5 7a24.12 24.12 0 0 1 0 10 2 2 0 0 1-1.4 1.4 49.55 49.55 0 0 1-16.2 0A2 2 0 0 1 2.5 17z" />
                    <polygon points="10 15 15 12 10 9" />
                  </svg>
                )
              }
            ].map((social) => (
              <motion.a
                key={social.label}
                href="/journal"
                aria-label={social.label}
                whileHover={{ scale: 1.1, rotate: 5 }}
                whileTap={{ scale: 0.95 }}
                className="w-8 h-8 rounded-full border border-bg-surface flex items-center justify-center text-text-secondary hover:text-accent-primary hover:border-accent-primary transition-colors focus:outline-none focus:ring-1 focus:ring-accent-primary"
              >
                {social.svg}
              </motion.a>
            ))}
          </div>
        </div>

      </div>
    </footer>
  );
}
