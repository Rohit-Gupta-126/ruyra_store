"use client";

export default function Newsletter() {
  return (
    <section className="mt-12 lg:mt-16 px-5 lg:px-0">
      <div className="bg-[#faf9f6] rounded-[32px] p-8 text-center shadow-sm lg:p-12">
        {/* Decorative leaf */}
        <div className="flex justify-center mb-4">
          <span className="material-symbols-outlined text-[32px] text-[#4a5d4e]">
            spa
          </span>
        </div>

        <h3
          className="font-[family-name:var(--font-playfair)] text-2xl text-[#4a5d4e] mb-2 lg:text-3xl"
          style={{ fontWeight: 600 }}
        >
          Join our Sanctuary
        </h3>
        <p className="font-sans text-sm text-[#434843] mb-6 max-w-xs mx-auto lg:max-w-md lg:text-base">
          Receive early access to new rituals and exclusive botanical insights.
        </p>

        <form
          className="flex flex-col gap-4 lg:flex-row lg:max-w-md lg:mx-auto"
          onSubmit={(e) => e.preventDefault()}
          aria-label="Newsletter sign-up"
        >
          <input
            id="newsletter-email"
            type="email"
            placeholder="Email address"
            required
            className="flex-1 bg-[#f0efeb] border-none rounded-full px-6 py-4 font-sans text-sm focus:outline-none focus:ring-2 focus:ring-[#4a5d4e]/20 text-[#1a1c1a] placeholder:text-[#434843]/60"
          />
          <button
            id="newsletter-subscribe-btn"
            type="submit"
            className="bg-[#b97c66] text-white rounded-full py-4 px-8 font-sans font-medium tracking-wide hover:opacity-90 transition-opacity lg:flex-shrink-0"
          >
            Subscribe
          </button>
        </form>

        <p className="font-sans text-xs text-[#737872] mt-4">
          No spam. Unsubscribe at any time.
        </p>
      </div>
    </section>
  );
}
