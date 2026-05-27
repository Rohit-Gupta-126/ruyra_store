const shopLinks = [
  "All Rituals",
  "Home Fragrance",
  "Bath & Body",
  "Adornments",
];
const aboutLinks = ["Our Story", "Sustainability", "Contact", "FAQ"];

export default function Footer() {
  return (
    <footer className="mt-16 px-5 pb-24 pt-8 border-t border-[#4a5d4e]/10 lg:px-0 lg:pb-12">
      {/* Link columns */}
      <div className="grid grid-cols-2 gap-8 mb-12 lg:grid-cols-4 lg:gap-12">
        {/* Shop column */}
        <div>
          <h4 className="font-sans text-xs font-semibold uppercase tracking-widest text-[#4a5d4e] mb-4">
            Shop
          </h4>
          <ul className="flex flex-col gap-3">
            {shopLinks.map((link) => (
              <li key={link}>
                <a
                  href="#"
                  className="font-sans text-sm text-[#434843] hover:text-[#4a5d4e] transition-colors"
                >
                  {link}
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* About column */}
        <div>
          <h4 className="font-sans text-xs font-semibold uppercase tracking-widest text-[#4a5d4e] mb-4">
            About
          </h4>
          <ul className="flex flex-col gap-3">
            {aboutLinks.map((link) => (
              <li key={link}>
                <a
                  href="#"
                  className="font-sans text-sm text-[#434843] hover:text-[#4a5d4e] transition-colors"
                >
                  {link}
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* Newsletter teaser on desktop */}
        <div className="hidden lg:block col-span-2">
          <h4 className="font-sans text-xs font-semibold uppercase tracking-widest text-[#4a5d4e] mb-4">
            Stay Connected
          </h4>
          <p className="font-sans text-sm text-[#434843] mb-4 max-w-sm">
            Follow us on instagram for daily botanical inspiration and behind-the-scenes crafting.
          </p>
          <div className="flex gap-4">
            {["instagram", "pinterest", "facebook"].map((social) => (
              <a
                key={social}
                href="#"
                aria-label={social}
                className="w-9 h-9 rounded-full border border-[#c3c8c1] flex items-center justify-center text-[#4a5d4e] hover:bg-[#4a5d4e] hover:text-white hover:border-[#4a5d4e] transition-colors"
              >
                <span className="material-symbols-outlined text-[18px]">
                  {social === "instagram" ? "photo_camera" : social === "pinterest" ? "push_pin" : "thumb_up"}
                </span>
              </a>
            ))}
          </div>
        </div>
      </div>

      {/* Brand mark */}
      <div className="text-center pt-8 border-t border-[#4a5d4e]/10">
        <h2
          className="font-[family-name:var(--font-playfair)] text-xl text-[#4a5d4e] tracking-[0.2em] uppercase mb-3"
          style={{ fontWeight: 600 }}
        >
          RUYRA
        </h2>
        <p className="font-sans text-xs text-[#434843]">
          © 2024 Botanical Rituals. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
