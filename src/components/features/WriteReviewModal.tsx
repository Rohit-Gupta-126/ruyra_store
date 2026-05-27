"use client";

import { useState } from "react";
import { X, Star } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface WriteReviewModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (review: {
    rating: number;
    title: string;
    body: string;
    reviewer: string;
  }) => void;
}

export default function WriteReviewModal({
  isOpen,
  onClose,
  onSubmit,
}: WriteReviewModalProps) {
  const [rating, setRating] = useState(5);
  const [hoverRating, setHoverRating] = useState<number | null>(null);
  const [reviewer, setReviewer] = useState("");
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!reviewer.trim() || !title.trim() || !body.trim()) {
      setError("Please fill out all fields.");
      return;
    }
    onSubmit({
      rating,
      title,
      body,
      reviewer,
    });
    // Reset form
    setRating(5);
    setReviewer("");
    setTitle("");
    setBody("");
    setError("");
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-[70]"
            aria-hidden="true"
          />

          {/* Modal Container */}
          <div className="fixed inset-0 flex items-center justify-center p-4 z-[75] pointer-events-none">
            <motion.div
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              transition={{ type: "spring", stiffness: 300, damping: 25 }}
              className="bg-brand-sand border border-brand-brown/10 rounded-3xl w-full max-w-md p-6 shadow-2xl flex flex-col pointer-events-auto relative text-brand-brown"
            >
              {/* Close Button */}
              <button
                onClick={onClose}
                className="absolute top-4 right-4 w-8 h-8 rounded-full bg-brand-taupe flex items-center justify-center text-brand-text-muted hover:text-brand-brown transition-colors focus:outline-none"
                aria-label="Close form"
              >
                <X className="w-4 h-4" />
              </button>

              <h3 className="font-serif text-2xl mb-2 pr-6">Share Your Experience</h3>
              <p className="font-sans text-xs text-brand-text-muted mb-6">
                Your feedback helps us continue refining our botanical rituals.
              </p>

              <form onSubmit={handleSubmit} className="space-y-4 flex-1">
                {error && (
                  <div className="text-brand-terracotta text-xs font-semibold bg-brand-terracotta/5 px-3 py-2 rounded-lg">
                    {error}
                  </div>
                )}

                {/* Star Rating Select */}
                <div>
                  <label className="block font-sans text-xs font-bold uppercase tracking-wider text-brand-text-muted mb-2">
                    Rating
                  </label>
                  <div className="flex items-center gap-1.5">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <button
                        key={star}
                        type="button"
                        onClick={() => setRating(star)}
                        onMouseEnter={() => setHoverRating(star)}
                        onMouseLeave={() => setHoverRating(null)}
                        className="focus:outline-none transition-transform active:scale-90"
                        aria-label={`Rate ${star} stars`}
                      >
                        <Star
                          className={`w-6 h-6 stroke-[1.5] transition-colors cursor-pointer ${
                            star <= (hoverRating ?? rating)
                              ? "fill-brand-terracotta text-brand-terracotta"
                              : "text-brand-brown/20"
                          }`}
                        />
                      </button>
                    ))}
                  </div>
                </div>

                {/* Reviewer Name */}
                <div>
                  <label className="block font-sans text-xs font-bold uppercase tracking-wider text-brand-text-muted mb-1.5">
                    Your Name
                  </label>
                  <input
                    type="text"
                    value={reviewer}
                    onChange={(e) => setReviewer(e.target.value)}
                    placeholder="e.g. Elena V."
                    className="w-full bg-brand-taupe/40 border border-brand-brown/10 rounded-xl px-4 py-2.5 font-sans text-sm focus:outline-none focus:border-brand-brown/30 placeholder-brand-brown/30"
                  />
                </div>

                {/* Review Title */}
                <div>
                  <label className="block font-sans text-xs font-bold uppercase tracking-wider text-brand-text-muted mb-1.5">
                    Review Title
                  </label>
                  <input
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="e.g. Absolutely grounding, rich woody notes"
                    className="w-full bg-brand-taupe/40 border border-brand-brown/10 rounded-xl px-4 py-2.5 font-sans text-sm focus:outline-none focus:border-brand-brown/30 placeholder-brand-brown/30"
                  />
                </div>

                {/* Review Body */}
                <div>
                  <label className="block font-sans text-xs font-bold uppercase tracking-wider text-brand-text-muted mb-1.5">
                    Review Details
                  </label>
                  <textarea
                    rows={4}
                    value={body}
                    onChange={(e) => setBody(e.target.value)}
                    placeholder="Tell us how this ritual affected your space, the scent projection, or craftsmanship..."
                    className="w-full bg-brand-taupe/40 border border-brand-brown/10 rounded-xl px-4 py-2.5 font-sans text-sm focus:outline-none focus:border-brand-brown/30 placeholder-brand-brown/30 resize-none leading-relaxed"
                  />
                </div>

                {/* Submit button */}
                <motion.button
                  type="submit"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full bg-brand-terracotta hover:bg-brand-terracotta/95 text-white py-3 rounded-full font-sans text-xs uppercase tracking-widest font-semibold flex items-center justify-center gap-2 shadow-xl shadow-brand-terracotta/10 transition-all focus:outline-none cursor-pointer mt-6"
                >
                  Submit Review
                </motion.button>
              </form>
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  );
}
