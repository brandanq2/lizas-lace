export default function Hero() {
  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center bg-cream px-6 pt-24 pb-16">
      {/* Soft background texture — radial blush glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse 70% 60% at 50% 40%, #EDD5D533 0%, transparent 70%)',
        }}
      />

      <div className="relative z-10 flex flex-col items-center text-center max-w-2xl">
        {/* Logo */}
        <div className="mb-8">
          <img
            src="/logo.jpeg"
            alt="Liza's Lace logo"
            className="w-56 h-56 md:w-72 md:h-72 object-contain rounded-full shadow-lg"
            style={{ boxShadow: '0 4px 32px 0 #D4A0A022' }}
          />
        </div>

        {/* Brand name */}
        <h1 className="font-cursive text-5xl md:text-7xl text-taupe-dark mb-3 tracking-wide leading-tight">
          Liza's Lace
        </h1>

        {/* Tagline */}
        <p className="font-serif italic text-xl md:text-2xl text-taupe font-light tracking-wide mb-8">
          Vintage Wears by Brigitte Murphy
        </p>

        {/* Decorative divider */}
        <div className="flex items-center gap-4 mb-8 w-full max-w-xs">
          <div className="flex-1 h-px bg-blush/60" />
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1"
            className="w-5 h-5 text-blush"
          >
            <path d="M12 2C6 2 2 6 2 12s4 10 10 10 10-4 10-10S18 2 12 2z" />
            <path d="M12 6v6l4 2" />
          </svg>
          <div className="flex-1 h-px bg-blush/60" />
        </div>

        {/* Coming soon CTA */}
        <p className="font-serif text-taupe/60 text-sm md:text-base tracking-widest uppercase">
          Shop Opening Soon
        </p>
      </div>
    </section>
  )
}
