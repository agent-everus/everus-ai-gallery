import React, { useState, useEffect } from 'react';
const Header: React.FC = () => {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  useEffect(() => {
    const h = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', h);
    return () => window.removeEventListener('scroll', h);
  }, []);
  const navLinks = ['Gallery','About','Contact'];
  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${scrolled ? 'bg-obsidian/95 backdrop-blur-sm border-b border-white/5' : 'bg-transparent'}`}>
      <div className="max-w-7xl mx-auto px-6 py-5 flex items-center justify-between">
        <a href="#home" className="flex items-center gap-3 group">
          <span className="text-gold font-serif text-xl font-semibold tracking-wide group-hover:text-gold-light transition-colors">EVERUS</span>
          <span className="text-warm-white/40 text-xs tracking-[0.3em] uppercase font-light mt-0.5">AI Gallery</span>
        </a>
        <nav className="hidden md:flex items-center gap-10">
          {navLinks.map(l => <a key={l} href={`#${l.toLowerCase()}`} className="text-warm-white/60 hover:text-warm-white text-sm tracking-widest uppercase font-light transition-colors duration-300">{l}</a>)}
        </nav>
        <button onClick={() => setMenuOpen(!menuOpen)} className="md:hidden text-warm-white/60 hover:text-warm-white transition-colors" aria-label="Toggle menu">
          <div className="w-6 flex flex-col gap-1.5">
            <span className={`block h-px bg-current transition-all duration-300 ${menuOpen ? 'rotate-45 translate-y-2' : ''}`} />
            <span className={`block h-px bg-current transition-all duration-300 ${menuOpen ? 'opacity-0' : ''}`} />
            <span className={`block h-px bg-current transition-all duration-300 ${menuOpen ? '-rotate-45 -translate-y-2' : ''}`} />
          </div>
        </button>
      </div>
      {menuOpen && (
        <div className="md:hidden bg-obsidian/98 border-t border-white/5 px-6 py-6 flex flex-col gap-6">
          {navLinks.map(l => <a key={l} href={`#${l.toLowerCase()}`} onClick={() => setMenuOpen(false)} className="text-warm-white/70 hover:text-warm-white text-sm tracking-widest uppercase font-light transition-colors">{l}</a>)}
        </div>
      )}
    </header>
  );
};
export default Header;
