import { useEffect, useState } from 'react'

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? 'bg-cream/95 backdrop-blur-sm shadow-sm'
          : 'bg-transparent'
      }`}
    >
      <div className="max-w-5xl mx-auto px-6 py-4 flex items-center justify-between">
        {/* Left nav */}
        <div className="flex gap-6">
          <a
            href="#"
            className="font-serif text-sm tracking-widest uppercase text-taupe hover:text-taupe-dark transition-colors"
          >
            Home
          </a>
        </div>

        {/* Brand name — center */}
        <a
          href="#"
          className="font-cursive text-3xl md:text-4xl text-taupe-dark tracking-wide select-none"
        >
          Liza's Lace
        </a>

        {/* Right nav */}
        <div className="flex gap-6">
          <span
            className="font-serif text-sm tracking-widest uppercase text-taupe/40 cursor-default select-none"
            title="Shop coming soon"
          >
            Shop
          </span>
        </div>
      </div>
    </nav>
  )
}
