import React from 'react';
const Hero: React.FC = () => (
  <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden">
    <div className="absolute inset-0 bg-cover bg-center bg-no-repeat" style={{ backgroundImage: `url('https://images.unsplash.com/photo-1462331940025-496dfbfc7564?w=1600&q=80')` }} />
    <div className="absolute inset-0 bg-obsidian/75" />
    <div className="absolute inset-0 bg-gradient-to-b from-obsidian/30 via-transparent to-obsidian" />
    <div className="relative z-10 text-center px-6 max-w-4xl mx-auto">
      <p className="text-gold text-xs tracking-[0.4em] uppercase font-light mb-8 opacity-80">Artificial Intelligence · Fine Art</p>
      <h1 className="font-serif text-5xl md:text-7xl lg:text-8xl font-light text-warm-white leading-tight mb-6">Where Code<br /><em className="text-gold italic">Becomes Art</em></h1>
      <p className="text-warm-white/50 text-base md:text-lg font-light tracking-wide max-w-xl mx-auto mb-12 leading-relaxed">A curated portfolio of AI-generated artwork pushing the boundary between algorithmic precision and human expression.</p>
      <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
        <a href="#gallery" className="px-10 py-3.5 bg-gold text-obsidian text-sm tracking-widest uppercase font-medium hover:bg-gold-light transition-colors duration-300">View Gallery</a>
        <a href="#about" className="px-10 py-3.5 border border-warm-white/20 text-warm-white/70 text-sm tracking-widest uppercase font-light hover:border-gold/50 hover:text-warm-white transition-all duration-300">About</a>
      </div>
    </div>
    <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 opacity-40">
      <span className="text-warm-white text-xs tracking-widest uppercase">Scroll</span>
      <div className="w-px h-10 bg-gradient-to-b from-warm-white to-transparent animate-pulse" />
    </div>
  </section>
);
export default Hero;
