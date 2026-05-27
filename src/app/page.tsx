import HeroSection from "@/components/features/HeroSection";
import VibeCarousel from "@/components/features/VibeCarousel";
import SignaturePieces from "@/components/features/SignaturePieces";
import Testimonials from "@/components/features/Testimonials";
import Newsletter from "@/components/features/Newsletter";
import Footer from "@/components/layout/Footer";
import { Leaf, Handshake, Box, Heart } from "lucide-react";

export default function Home() {
  return (
    <main className="min-h-screen bg-bg-primary text-text-primary">
      
      {/* Hero Section */}
      <HeroSection />
      
      {/* Shop by Vibe Carousel */}
      <VibeCarousel />
      
      {/* Signature Product Grid */}
      <SignaturePieces />

      {/* Brand tagline strip — desktop only */}
      <section className="hidden lg:block py-12 border-y border-bg-surface px-6 md:px-12">
        <div className="flex items-center justify-between gap-8 max-w-7xl mx-auto">
          {[
            { icon: Leaf, label: "100% Natural" },
            { icon: Handshake, label: "Ethically Sourced" },
            { icon: Box, label: "Plastic-Free Packaging" },
            { icon: Heart, label: "Made with Intention" },
          ].map(({ icon: Icon, label }) => (
            <div key={label} className="flex items-center gap-3 text-accent-primary">
              <Icon className="w-5 h-5 stroke-[1.5]" />
              <span className="font-sans text-xs tracking-wider uppercase font-semibold text-text-primary">
                {label}
              </span>
            </div>
          ))}
        </div>
      </section>

      {/* Customer Testimonials Section */}
      <Testimonials />

      {/* Newsletter Signup */}
      <Newsletter />
      
      {/* Luxury Footer */}
      <Footer />
    </main>
  );
}
