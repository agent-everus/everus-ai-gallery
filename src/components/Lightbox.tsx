import React, { useEffect } from 'react';
import type { GalleryItem } from '../types';
interface Props { item: GalleryItem; onClose: () => void; onPrev: () => void; onNext: () => void; }
const Lightbox: React.FC<Props> = ({ item, onClose, onPrev, onNext }) => {
  useEffect(() => {
    const h = (e: KeyboardEvent) => { if (e.key==='Escape') onClose(); if (e.key==='ArrowLeft') onPrev(); if (e.key==='ArrowRight') onNext(); };
    document.addEventListener('keydown', h);
    document.body.style.overflow = 'hidden';
    return () => { document.removeEventListener('keydown', h); document.body.style.overflow = ''; };
  }, [onClose, onPrev, onNext]);
  return (
    <div className="fixed inset-0 z-50 bg-obsidian/95 backdrop-blur-md flex items-center justify-center p-4 md:p-10" onClick={onClose}>
      <div className="relative max-w-5xl w-full flex flex-col md:flex-row shadow-2xl" onClick={e => e.stopPropagation()}>
        <div className="flex-1 overflow-hidden">
          <img src={item.imageUrl.replace('w=800','w=1200')} alt={item.title} className="w-full h-full object-cover max-h-[70vh] md:max-h-[80vh]" />
        </div>
        <div className="bg-[#111] border-t md:border-t-0 md:border-l border-white/10 p-8 md:w-72 flex flex-col justify-between">
          <div>
            <span className="text-gold text-xs tracking-widest uppercase font-light">{item.category}</span>
            <h2 className="font-serif text-warm-white text-2xl mt-3 mb-4">{item.title}</h2>
            <p className="text-warm-white/50 text-sm leading-relaxed">{item.description}</p>
            <div className="flex flex-wrap gap-2 mt-6">{item.tags.map(t => <span key={t} className="border border-white/10 text-warm-white/40 text-[10px] tracking-wider uppercase px-2.5 py-1">{t}</span>)}</div>
          </div>
          <p className="text-warm-white/20 text-xs mt-6 italic">AI-generated art — Everus AI Gallery</p>
        </div>
      </div>
      <button onClick={onClose} className="absolute top-5 right-5 text-warm-white/50 hover:text-warm-white transition-colors text-2xl leading-none" aria-label="Close">✕</button>
      <button onClick={e => { e.stopPropagation(); onPrev(); }} className="absolute left-4 md:left-8 top-1/2 -translate-y-1/2 text-warm-white/40 hover:text-warm-white transition-colors text-3xl" aria-label="Previous">‹</button>
      <button onClick={e => { e.stopPropagation(); onNext(); }} className="absolute right-4 md:right-8 top-1/2 -translate-y-1/2 text-warm-white/40 hover:text-warm-white transition-colors text-3xl" aria-label="Next">›</button>
    </div>
  );
};
export default Lightbox;
