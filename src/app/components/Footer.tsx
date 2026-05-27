"use client";

import { motion } from "framer-motion";

const columns = [
  {
    title: "Shop",
    links: [
      { label: "All Products", href: "#" },
      { label: "Home Fragrance", href: "#" },
      { label: "Bath Rituals", href: "#" },
      { label: "Earthen Ware", href: "#" }
    ]
  },
  {
    title: "Sanctuary",
    links: [
      { label: "Our Story", href: "#" },
      { label: "Journal", href: "#" },
      { label: "Sustainability", href: "#" }
    ]
  },
  {
    title: "Support",
    links: [
      { label: "Care Guide", href: "#" },
      { label: "Shipping & Returns", href: "#" },
      { label: "Contact Us", href: "#" }
    ]
  }
];

export default function Footer() {
  return (
    <footer id="story-section" className="bg-bg-primary py-24 px-6 md:px-12 border-t border-bg-surface w-full">
      <div className="max-w-7xl mx-auto flex flex-col gap-16">
        
        {/* Main Grid with scroll stagger */}
        <motion.div 
          variants={{
            hidden: { opacity: 0 },
            show: {
              opacity: 1,
              transition: {
                staggerChildren: 0.1,
                delayChildren: 0.1
              }
            }
          }}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-50px" }}
          className="grid grid-cols-2 md:grid-cols-5 gap-10"
        >
          
          {/* Brand/About Block */}
          <motion.div 
            variants={{
              hidden: { opacity: 0, y: 20 },
              show: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 80, damping: 15 } }
            }}
            className="col-span-2 space-y-4"
          >
            <h3 className="font-serif text-2xl tracking-[0.15em] text-text-primary font-bold">
              RUYRA
            </h3>
            <p className="font-sans text-xs text-text-secondary max-w-sm leading-relaxed font-light">
              Crafting botanical rituals to bring intention, warmth, and raw tactile beauty to modern spaces. Sustainably produced, ethically sourced.
            </p>
            
            {/* Socials */}
            <div className="flex gap-4 pt-2">
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
                  href="#"
                  aria-label={social.label}
                  whileHover={{ scale: 1.1, rotate: 5 }}
                  whileTap={{ scale: 0.95 }}
                  className="w-8 h-8 rounded-full border border-bg-surface flex items-center justify-center text-text-secondary hover:text-accent-primary hover:border-accent-primary transition-colors focus:outline-none focus:ring-1 focus:ring-accent-primary"
                >
                  {social.svg}
                </motion.a>
              ))}
            </div>
          </motion.div>

          {/* Links Columns */}
          {columns.map((col) => (
            <motion.div 
              key={col.title}
              variants={{
                hidden: { opacity: 0, y: 20 },
                show: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 80, damping: 15 } }
              }}
              className="space-y-4"
            >
              <h4 className="font-sans text-[10px] tracking-[0.2em] uppercase font-bold text-text-primary">
                {col.title}
              </h4>
              <ul className="space-y-2.5">
                {col.links.map((link) => (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      className="font-sans text-xs text-text-secondary hover:text-accent-primary transition-colors font-light"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}

        </motion.div>

        {/* Bottom Bar */}
        <motion.div 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 0.3 }}
          className="flex flex-col md:flex-row justify-between items-center pt-8 border-t border-bg-surface gap-4"
        >
          <p className="font-sans text-[10px] text-text-secondary font-light">
            © {new Date().getFullYear()} RUYRA. Handcrafted with Intention.
          </p>
          <div className="flex gap-6">
            <a href="#" className="font-sans text-[10px] text-text-secondary hover:text-text-primary transition-colors font-light">
              Privacy Policy
            </a>
            <a href="#" className="font-sans text-[10px] text-text-secondary hover:text-text-primary transition-colors font-light">
              Terms of Service
            </a>
          </div>
        </motion.div>

      </div>
    </footer>
  );
}
