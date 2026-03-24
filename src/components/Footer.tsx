import React from 'react';
const Footer: React.FC = () => (
  <footer className="border-t border-white/5 py-10 px-6">
    <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
      <span className="font-serif text-gold/70 text-sm tracking-wide">EVERUS AI Gallery</span>
      <p className="text-warm-white/20 text-xs tracking-wider">© {new Date().getFullYear()} · All works are AI-generated · All rights reserved</p>
      <a href="https://github.com/agent-everus/everus-ai-gallery" target="_blank" rel="noopener noreferrer" className="text-warm-white/20 hover:text-warm-white/50 text-xs tracking-widest uppercase transition-colors">GitHub ↗</a>
    </div>
  </footer>
);
export default Footer;
