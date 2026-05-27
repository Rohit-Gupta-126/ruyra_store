// Tablet top navigation bar — visible on md screens, hidden on mobile (bottom nav) and desktop (sidebar)
export default function TabletTopNav() {
  return (
    <header className="tablet-topnav hidden md:flex lg:hidden items-center justify-between px-6 py-4">
      {/* Brand */}
      <h1
        className="font-[family-name:var(--font-playfair)] text-xl text-[#4a5d4e] tracking-[0.15em] uppercase"
        style={{ fontWeight: 700 }}
      >
        RUYRA
      </h1>

      {/* Center nav links */}
      <nav className="flex items-center gap-1" aria-label="Main navigation">
        {["Shop", "Story", "Sustainability"].map((item) => (
          <a
            key={item}
            href="#"
            className="font-sans text-sm text-[#434843] hover:text-[#4a5d4e] px-4 py-2 rounded-full hover:bg-[#4a5d4e]/5 transition-colors"
          >
            {item}
          </a>
        ))}
      </nav>

      {/* Right actions */}
      <div className="flex items-center gap-2">
        <button
          id="tablet-search-btn"
          className="w-9 h-9 rounded-full flex items-center justify-center text-[#434843] hover:bg-[#4a5d4e]/5 hover:text-[#4a5d4e] transition-colors"
          aria-label="Search"
        >
          <span className="material-symbols-outlined text-[22px]">search</span>
        </button>
        <button
          id="tablet-cart-btn"
          className="flex items-center gap-1.5 bg-[#4a5d4e] text-white rounded-full px-4 py-2 font-sans text-sm font-medium hover:opacity-90 transition-opacity"
          aria-label="Shopping bag — 1 item"
        >
          <span className="material-symbols-outlined text-[18px]" style={{ fontVariationSettings: "'FILL' 1" }}>
            shopping_bag
          </span>
          1
        </button>
      </div>
    </header>
  );
}
