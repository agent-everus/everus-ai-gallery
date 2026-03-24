import type { GalleryItem } from '../types';
export const galleryItems: GalleryItem[] = [
  { id:1, title:'Neon Dreamscape', description:'A vibrant cityscape where light and shadow merge into an electric dreamworld.', category:'Cityscape', imageUrl:'https://images.unsplash.com/photo-1518770660439-4636190af475?w=800&q=80', tags:['neon','urban','night'] },
  { id:2, title:'Cosmic Garden', description:'Organic forms bloom in the void of space, where life defies the impossible.', category:'Abstract', imageUrl:'https://images.unsplash.com/photo-1462331940025-496dfbfc7564?w=800&q=80', tags:['space','organic','surreal'] },
  { id:3, title:'Digital Wilderness', description:'Ancient forests reimagined through an algorithmic lens of color and form.', category:'Nature', imageUrl:'https://images.unsplash.com/photo-1448375240586-882707db888b?w=800&q=80', tags:['nature','forest','ethereal'] },
  { id:4, title:'Chrome Horizon', description:'A metallic sunrise over a world rebuilt from pure geometric precision.', category:'Abstract', imageUrl:'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&q=80', tags:['geometric','minimal','futurism'] },
  { id:5, title:'Liquid Architecture', description:'Buildings dissolve into flowing rivers of light and translucent material.', category:'Architecture', imageUrl:'https://images.unsplash.com/photo-1486325212027-8081e485255e?w=800&q=80', tags:['architecture','fluid','light'] },
  { id:6, title:'Portrait of Silence', description:'A face emerges from the static — caught between the digital and the human.', category:'Portrait', imageUrl:'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&q=80', tags:['portrait','surreal','human'] },
  { id:7, title:'Ember Fields', description:'Vast landscapes scorched by algorithmic fire, beautiful and untamed.', category:'Nature', imageUrl:'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=800&q=80', tags:['landscape','fire','dramatic'] },
  { id:8, title:'Fractal Ocean', description:'Infinite depth within each wave — mathematics made visible in water.', category:'Abstract', imageUrl:'https://images.unsplash.com/photo-1505118380757-91f5f5632de0?w=800&q=80', tags:['ocean','fractal','blue'] },
  { id:9, title:'Glass Metropolis', description:'Towers of pure light rise from a city that exists between dreams and data.', category:'Cityscape', imageUrl:'https://images.unsplash.com/photo-1477959858617-67f85cf4f1df?w=800&q=80', tags:['city','glass','futurism'] },
];
export const categories = ['All', ...Array.from(new Set(galleryItems.map(i => i.category)))];
