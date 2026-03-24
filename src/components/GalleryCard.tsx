import React from 'react';
import type { GalleryItem } from '../types';
interface Props { item: GalleryItem; onClick: (item: GalleryItem) => void; }
const GalleryCard: React.FC<Props> = ({ item, onClick }) => (
  <div className="group relative overflow-hidden cursor-pointer bg-white/5" onClick={() => onClick(item)}>
    <div className="aspect-[4/3] overflow-hidden">
      <img src={item.imageUrl} alt={item.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" loading="lazy" />
    </div>
    <div className="absolute inset-0 bg-obsidian/0 group-hover:bg-obsidian/60 transition-all duration-500 flex flex-col justify-end p-5">
      <div className="translate-y-4 group-hover:translate-y-0 opacity-0 group-hover:opacity-100 transition-all duration-500">
        <span className="text-gold text-xs tracking-widest uppercase font-light">{item.category}</span>
        <h3 className="font-serif text-warm-white text-lg mt-1 mb-2">{item.title}</h3>
        <p className="text-warm-white/60 text-xs leading-relaxed line-clamp-2">{item.description}</p>
      </div>
    </div>
    <div className="absolute top-3 right-3 bg-obsidian/70 backdrop-blur-sm px-2.5 py-1 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
      <span className="text-gold text-[10px] tracking-widest uppercase">{item.category}</span>
    </div>
  </div>
);
export default GalleryCard;
