"use client";

import { useState } from "react";
import { Send } from "lucide-react";
import { motion } from "framer-motion";

export default function Newsletter() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setSubmitted(true);
      setEmail("");
    }
  };

  return (
    <section id="sustainability-section" className="bg-bg-primary py-24 px-6 md:px-12 border-t border-bg-surface flex justify-center items-center w-full overflow-x-hidden">
      <motion.div 
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="max-w-2xl w-full text-center flex flex-col items-center"
      >
        
        {/* Title */}
        <h2 className="font-serif text-3xl md:text-4xl text-text-primary mb-3">
          Join Our Sanctuary
        </h2>
        
        {/* Subtitle */}
        <p className="font-sans text-sm text-text-secondary max-w-md mb-10 leading-relaxed font-light">
          Receive botanical insights, early access to new rituals, and thoughts on minimalist living.
        </p>

        {submitted ? (
          <motion.div 
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ type: "spring", stiffness: 100, damping: 12 }}
            className="py-4 px-8 bg-bg-surface rounded-full text-accent-primary font-sans text-xs tracking-wider uppercase font-semibold"
          >
            Welcome to the sanctuary
          </motion.div>
        ) : (
          <form
            onSubmit={handleSubmit}
            className="w-full max-w-md flex flex-col items-center gap-6"
            aria-label="Newsletter sign-up"
          >
            <div className="relative w-full">
              <input
                id="newsletter-email"
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email address"
                suppressHydrationWarning
                className="bg-transparent border-b border-brand-brown/20 focus:border-brand-terracotta outline-none py-3.5 w-full text-center transition-colors font-sans text-sm placeholder:text-text-secondary/50 text-text-primary"
              />
            </div>
            
            <motion.button
              id="newsletter-subscribe-btn"
              type="submit"
              suppressHydrationWarning
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              transition={{ type: "spring", stiffness: 400, damping: 15 }}
              className="px-8 py-3.5 bg-brand-terracotta hover:bg-[#9A4C34] text-white font-sans text-xs uppercase tracking-widest font-semibold rounded-full flex items-center gap-2 shadow-lg shadow-brand-terracotta/10 transition-all focus:outline-none"
            >
              <span>Subscribe</span>
              <Send className="w-3.5 h-3.5" />
            </motion.button>
          </form>
        )}
      </motion.div>
    </section>
  );
}
