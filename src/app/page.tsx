import HeroSection from "@/app/components/HeroSection";
import VibeCarousel from "@/app/components/VibeCarousel";
import SignaturePieces from "@/app/components/SignaturePieces";
import Newsletter from "@/app/components/Newsletter";
import Footer from "@/app/components/Footer";
import { Leaf, Handshake, Box, Heart } from "lucide-react";

export default function Home() {
  return (
    <main className="min-h-screen bg-bg-primary text-text-primary">
      
      {/* Hero Section */}
      <HeroSection />

      {/* Content sections */}
      <div className="max-w-[1400px] mx-auto pb-12">
        
        {/* Shop by Vibe Carousel */}
        <VibeCarousel />
        
        {/* Signature Product Grid */}
        <SignaturePieces />

        {/* Brand tagline strip — desktop only */}
        <section className="hidden lg:block my-24 py-12 border-y border-bg-surface">
          <div className="flex items-center justify-between gap-8 max-w-7xl mx-auto px-12">
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

        {/* Newsletter Signup */}
        <Newsletter />
        
        {/* Luxury Footer */}
        <Footer />
      </div>
    </main>
  );
}
