"use client";

import { useState } from "react";

const navItems = [
  { id: "home", icon: "home", label: "Home", fill: true },
  { id: "story", icon: "auto_stories", label: "Story", fill: false },
  { id: "search", icon: "search", label: "Search", fill: false },
  { id: "bag", icon: "shopping_bag", label: "Bag", fill: false },
];

export default function BottomNav() {
  const [activeTab, setActiveTab] = useState("home");
  const hasBagItems = true; // Simulate cart state

  return (
    <nav
      aria-label="Main navigation"
      className="fixed bottom-6 left-1/2 -translate-x-1/2 z-40
        bg-white/70 backdrop-blur-xl border border-white/50
        shadow-[0_8px_32px_rgba(0,0,0,0.08)]
        rounded-full flex justify-between items-center px-6 py-3
        min-w-[280px] w-auto
        md:hidden"
    >
      {navItems.map((item) => {
        const isActive = activeTab === item.id;
        return (
          <button
            key={item.id}
            id={`bottom-nav-${item.id}`}
            onClick={() => setActiveTab(item.id)}
            className="flex flex-col items-center justify-center gap-1 active:scale-95 transition-transform relative focus:outline-none"
            aria-label={item.label}
            aria-current={isActive ? "page" : undefined}
          >
            <div
              className={`rounded-full p-2 transition-colors ${
                isActive
                  ? "bg-[#b97c66]/10 text-[#b97c66]"
                  : "text-[#434843]/60"
              }`}
            >
              <span
                className="material-symbols-outlined text-[24px]"
                style={
                  isActive && item.fill
                    ? { fontVariationSettings: "'FILL' 1" }
                    : {}
                }
              >
                {item.icon}
              </span>
            </div>

            {/* Cart badge */}
            {item.id === "bag" && hasBagItems && (
              <span
                aria-label="1 item in bag"
                className="absolute top-1 right-1 w-2 h-2 bg-[#b97c66] rounded-full"
              />
            )}
          </button>
        );
      })}
    </nav>
  );
}
