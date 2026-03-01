function InstagramIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="w-5 h-5"
    >
      <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.5" cy="6.5" r="0.5" fill="currentColor" stroke="none" />
    </svg>
  )
}

export default function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className="bg-taupe-dark text-lace-white py-14 px-6">
      <div className="max-w-2xl mx-auto flex flex-col items-center gap-8 text-center">
        {/* Brand */}
        <h2 className="font-cursive text-4xl tracking-wide text-blush-light">
          Liza's Lace
        </h2>

        {/* Divider */}
        <div className="w-16 h-px bg-blush/40" />

        {/* Contact links */}
        <div className="flex flex-col gap-3 font-serif text-sm tracking-wide">
          {/* Instagram */}
          <a
            href="https://instagram.com/lizas.lace"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-2 text-blush-light/80 hover:text-blush-light transition-colors"
          >
            <InstagramIcon />
            @lizas.lace
          </a>

          {/* Email */}
          <a
            href="mailto:bmurphy@gmail.com"
            className="text-blush-light/80 hover:text-blush-light transition-colors"
          >
            bmurphy5272@gmail.com
          </a>
        </div>

        {/* Copyright */}
        <p className="font-serif text-xs text-lace-white/30 tracking-widest uppercase">
          &copy; {year} Liza's Lace. All rights reserved.
        </p>
      </div>
    </footer>
  )
}
