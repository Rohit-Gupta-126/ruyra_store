// Mobile-only floating header over the hero — the RUYRA logo centered at the top
// Hidden on tablet (uses TabletTopNav) and desktop (uses DesktopSidebar)
export default function MobileHeader() {
  return (
    <header
      aria-label="RUYRA"
      className="absolute top-0 w-full z-40 flex justify-center items-center py-6 pointer-events-none md:hidden"
    >
      <h1
        className="font-[family-name:var(--font-playfair)] text-[20px] text-white tracking-[0.2em] uppercase drop-shadow-md"
        style={{ fontWeight: 600 }}
      >
        RUYRA
      </h1>
    </header>
  );
}
