// Desktop sidebar navigation — visible on lg+ screens only
const navLinks = [
  { href: "#", label: "Home", icon: "home" },
  { href: "#", label: "Shop", icon: "storefront" },
  { href: "#", label: "Story", icon: "auto_stories" },
  { href: "#", label: "Sustainability", icon: "eco" },
  { href: "#", label: "Contact", icon: "mail" },
];

export default function DesktopSidebar() {
  return (
    <aside
      aria-label="Site navigation"
      className="hidden lg:flex desktop-sidebar flex-col"
    >
      {/* Brand Logo */}
      <div className="mb-12">
        <h1
          className="font-[family-name:var(--font-playfair)] text-2xl text-[#4a5d4e] tracking-[0.15em] uppercase"
          style={{ fontWeight: 700 }}
        >
          RUYRA
        </h1>
        <p className="font-sans text-xs text-[#737872] mt-1 tracking-wide">
          Botanical Rituals
        </p>
      </div>

      {/* Navigation Links */}
      <nav className="flex flex-col gap-1 flex-1">
        {navLinks.map((link, i) => (
          <a
            key={link.label}
            href={link.href}
            className={`flex items-center gap-3 px-3 py-2.5 rounded-xl font-sans text-sm transition-all ${
              i === 0
                ? "bg-[#4a5d4e]/8 text-[#4a5d4e] font-medium"
                : "text-[#434843] hover:bg-[#4a5d4e]/5 hover:text-[#4a5d4e]"
            }`}
          >
            <span
              className="material-symbols-outlined text-[20px]"
              style={i === 0 ? { fontVariationSettings: "'FILL' 1" } : {}}
            >
              {link.icon}
            </span>
            {link.label}
          </a>
        ))}
      </nav>

      {/* Cart pill */}
      <div className="mt-auto pt-8 border-t border-[#c3c8c1]/50">
        <button
          id="desktop-cart-btn"
          className="w-full flex items-center justify-between px-4 py-3 bg-[#4a5d4e] text-white rounded-xl hover:opacity-90 transition-opacity"
        >
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-[20px]" style={{ fontVariationSettings: "'FILL' 1" }}>
              shopping_bag
            </span>
            <span className="font-sans font-medium text-sm">My Bag</span>
          </div>
          <span className="bg-[#b97c66] text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
            1
          </span>
        </button>

        {/* User */}
        <button
          id="desktop-account-btn"
          className="w-full flex items-center gap-3 px-3 py-2.5 mt-2 text-[#434843] hover:text-[#4a5d4e] hover:bg-[#4a5d4e]/5 rounded-xl transition-colors font-sans text-sm"
        >
          <span className="material-symbols-outlined text-[20px]">account_circle</span>
          Account
        </button>
      </div>
    </aside>
  );
}
