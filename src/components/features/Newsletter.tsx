"use client";

import { useState } from "react";
import { Send, Heart, Sparkles } from "lucide-react";
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
    <section id="newsletter-section" className="bg-[#FFFDF9] py-20 md:py-28 px-6 md:px-12 border-t border-[#EFE7DD] flex justify-center items-center w-full overflow-hidden">
      <motion.div 
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="max-w-2xl w-full text-center flex flex-col items-center space-y-4"
      >
        {/* Badge */}
        <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-brand-rose-light text-brand-terracotta text-xs font-sans font-semibold">
          <Heart className="w-3 h-3 fill-brand-terracotta" />
          <span>STAY TUNED & KEEP SUPPORTING SMALL ♡</span>
        </div>
        
        {/* Title */}
        <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl text-[#422926]">
          Join Our <span className="font-script text-4xl sm:text-5xl md:text-6xl text-brand-terracotta">Craft Community</span>
        </h2>
        
        {/* Subtitle */}
        <p className="font-sans text-xs sm:text-sm text-brand-text-muted max-w-md leading-relaxed pb-4">
          Be the first to hear about seasonal bloom drops, limited charm releases, and special handmade gifts.
        </p>

        {submitted ? (
          <motion.div 
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="py-4 px-8 bg-brand-rose-light rounded-full text-brand-terracotta font-sans text-xs tracking-wider uppercase font-bold flex items-center gap-2"
          >
            <Sparkles className="w-4 h-4 text-brand-gold" />
            <span>Welcome to the Chisó family! ♡</span>
          </motion.div>
        ) : (
          <form
            onSubmit={handleSubmit}
            className="w-full max-w-md flex flex-col sm:flex-row items-center gap-3 pt-2"
            aria-label="Newsletter sign-up"
          >
            <input
              id="newsletter-email"
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email address..."
              suppressHydrationWarning
              className="w-full px-5 py-3.5 rounded-full bg-white border border-[#EFE7DD] focus:border-brand-terracotta outline-none font-sans text-sm placeholder:text-brand-text-muted/60 text-[#422926] shadow-xs"
            />
            
            <button
              id="newsletter-subscribe-btn"
              type="submit"
              suppressHydrationWarning
              className="w-full sm:w-auto px-8 py-3.5 bg-brand-terracotta hover:bg-[#B34E59] text-white font-sans text-xs uppercase tracking-widest font-bold rounded-full flex items-center justify-center gap-2 shadow-md hover:shadow-lg transition-all shrink-0 cursor-pointer"
            >
              <span>Join</span>
              <Send className="w-3.5 h-3.5" />
            </button>
          </form>
        )}
      </motion.div>
    </section>
  );
}
