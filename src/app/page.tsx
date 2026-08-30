import HeroSection from "@/components/features/HeroSection";
import CategoryPillars from "@/components/features/CategoryPillars";
import LaunchesAndOffers from "@/components/features/LaunchesAndOffers";
import EditorialInterstitial from "@/components/features/EditorialInterstitial";
import SignaturePieces from "@/components/features/SignaturePieces";
import ValueMarquee from "@/components/features/ValueMarquee";
import Testimonials from "@/components/features/Testimonials";
import Newsletter from "@/components/features/Newsletter";
import Footer from "@/components/layout/Footer";

export default function Home() {
  return (
    <main className="min-h-screen bg-[#FAF7F2] text-[#422926]">
      {/* Hero Section */}
      <HeroSection />

      {/* Dynamic Value Marquee */}
      <div id="values-section">
        <ValueMarquee />
      </div>

      {/* 5 Handcrafted Pillars (Blooms, Charms, Gifts, Décor, Custom Creations) */}
      <CategoryPillars />
      
      {/* New Launches & Special Offerings */}
      <LaunchesAndOffers />
      
      {/* Handcrafted Story Interstitial - Scroll-Driven */}
      <EditorialInterstitial />

      {/* Signature Product Grid */}
      <SignaturePieces />

      {/* Customer Testimonials Section */}
      <Testimonials />

      {/* Newsletter Signup & Small Business Support */}
      <Newsletter />
      
      {/* Luxury Footer */}
      <Footer />
    </main>
  );
}
