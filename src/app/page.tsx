import HeroSection from "@/components/features/HeroSection";
import LaunchesAndOffers from "@/components/features/LaunchesAndOffers";
import EditorialInterstitial from "@/components/features/EditorialInterstitial";
import SignaturePieces from "@/components/features/SignaturePieces";
import ValueMarquee from "@/components/features/ValueMarquee";
import Testimonials from "@/components/features/Testimonials";
import Newsletter from "@/components/features/Newsletter";
import Footer from "@/components/layout/Footer";

export default function Home() {
  return (
    <main className="min-h-screen bg-bg-primary text-text-primary">
      
      {/* Hero Section */}
      <HeroSection />
      
      {/* New Launches & Special Offerings */}
      <LaunchesAndOffers />
      
      {/* Editorial Interstitial - Scroll-Driven */}
      <EditorialInterstitial />

      {/* Signature Product Grid */}
      <SignaturePieces />

      {/* Dynamic Value Marquee */}
      <ValueMarquee />

      {/* Customer Testimonials Section */}
      <Testimonials />

      {/* Newsletter Signup */}
      <Newsletter />
      
      {/* Luxury Footer */}
      <Footer />
    </main>
  );
}
