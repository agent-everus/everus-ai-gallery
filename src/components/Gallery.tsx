import React, { useState } from 'react';
import { galleryItems, categories } from '../data/gallery';
import type { GalleryItem } from '../types';
import GalleryCard from './GalleryCard';
import Lightbox from './Lightbox';
const Gallery: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState('All');
  const [lightboxItem, setLightboxItem] = useState<GalleryItem | null>(null);
  const filtered = activeCategory === 'All' ? galleryItems : galleryItems.filter(i => i.category === activeCategory);
  const idx = lightboxItem ? filtered.findIndex(i => i.id === lightboxItem.id) : -1;
  const handlePrev = () => setLightboxItem(idx > 0 ? filtered[idx-1] : filtered[filtered.length-1]);
  const handleNext = () => setLightboxItem(idx < filtered.length-1 ? filtered[idx+1] : filtered[0]);
  return (
    <section id="gallery" className="py-28 px-6 max-w-7xl mx-auto">
      <div className="text-center mb-16">
        <p className="text-gold text-xs tracking-[0.4em] uppercase font-light mb-4">Portfolio</p>
        <h2 className="font-serif text-4xl md:text-5xl text-warm-white font-light">The Gallery</h2>
        <div className="w-12 h-px bg-gold/50 mx-auto mt-6" />
      </div>
      <div className="max-w-2xl mx-auto text-center mb-16 p-8 border border-white/5 bg-white/[0.02]">
        <p className="text-gold text-xs tracking-[0.3em] uppercase font-light mb-3">Coming Soon</p>
        <p className="text-warm-white/50 text-sm leading-relaxed">This gallery is being built to showcase original AI-generated artwork. The works you see now are high-quality placeholders. Original pieces — blending generative models, custom training, and artistic direction — will be published here as they are completed.</p>
      </div>
      <div className="flex flex-wrap items-center justify-center gap-3 mb-12">
        {categories.map(cat => (
          <button key={cat} onClick={() => setActiveCategory(cat)} className={`px-6 py-2 text-xs tracking-widest uppercase font-light transition-all duration-300 ${activeCategory===cat ? 'bg-gold text-obsidian' : 'border border-white/10 text-warm-white/50 hover:border-gold/30 hover:text-warm-white'}`}>{cat}</button>
        ))}
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {filtered.map(item => <GalleryCard key={item.id} item={item} onClick={setLightboxItem} />)}
      </div>
      {lightboxItem && <Lightbox item={lightboxItem} onClose={() => setLightboxItem(null)} onPrev={handlePrev} onNext={handleNext} />}
    </section>
  );
};
export default Gallery;
