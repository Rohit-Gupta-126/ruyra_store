import DesktopSidebar from "@/app/components/DesktopSidebar";
import TabletTopNav from "@/app/components/TabletTopNav";
import MobileHeader from "@/app/components/MobileHeader";
import HeroSection from "@/app/components/HeroSection";
import VibeCarousel from "@/app/components/VibeCarousel";
import SignaturePieces from "@/app/components/SignaturePieces";
import Newsletter from "@/app/components/Newsletter";
import Footer from "@/app/components/Footer";
import BottomNav from "@/app/components/BottomNav";
import ProductSheet from "@/app/components/ProductSheet";
import ProductSheetProvider from "@/app/components/ProductSheetContext";

export default function Home() {
  return (
    <ProductSheetProvider>
      {/* ── Desktop Sidebar (lg+) ── */}
      <DesktopSidebar />

      {/* ── Tablet Top Nav (md to lg) ── */}
      <TabletTopNav />

      {/* ── Main scrollable content area ── */}
      <div
        className="
          min-h-screen
          lg:ml-[260px]
          md:pt-[72px] lg:pt-0
        "
      >
        {/* Hero — relative so the floating MobileHeader can position over it */}
        <div className="relative">
          <MobileHeader />
          <HeroSection />
        </div>

        {/* Content sections */}
        <div className="pb-8 lg:px-10 xl:px-16 max-w-[1400px] mx-auto">
          <VibeCarousel />
          <SignaturePieces />

          {/* Brand tagline strip — desktop only */}
          <section className="hidden lg:block mt-16 py-10 border-y border-[#4a5d4e]/10">
            <div className="flex items-center justify-between gap-8">
              {[
                { icon: "eco", label: "100% Natural" },
                { icon: "handshake", label: "Ethically Sourced" },
                { icon: "package_2", label: "Plastic-Free Packaging" },
                { icon: "favorite", label: "Made with Intention" },
              ].map(({ icon, label }) => (
                <div key={label} className="flex items-center gap-3 text-[#4a5d4e]">
                  <span className="material-symbols-outlined text-[24px]" style={{ fontVariationSettings: "'FILL' 1" }}>
                    {icon}
                  </span>
                  <span className="font-sans text-sm font-medium">{label}</span>
                </div>
              ))}
            </div>
          </section>

          <Newsletter />
          <Footer />
        </div>
      </div>

      {/* ── Mobile floating bottom navigation ── */}
      <BottomNav />

      {/* ── Product detail sheet / drawer ── */}
      <ProductSheet />
    </ProductSheetProvider>
  );
}
