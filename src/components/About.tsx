import React from 'react';
const About: React.FC = () => (
  <section id="about" className="py-28 border-t border-white/5">
    <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-16 items-center">
      <div className="relative">
        <img src="https://images.unsplash.com/photo-1518770660439-4636190af475?w=800&q=80" alt="AI art process" className="w-full aspect-[4/5] object-cover" />
        <div className="absolute -bottom-4 -right-4 w-32 h-32 border border-gold/20" />
        <div className="absolute -top-4 -left-4 w-20 h-20 border border-gold/10" />
      </div>
      <div>
        <p className="text-gold text-xs tracking-[0.4em] uppercase font-light mb-6">About</p>
        <h2 className="font-serif text-4xl md:text-5xl text-warm-white font-light leading-tight mb-8">The Artist<br /><em className="text-warm-white/40 italic">Behind the Machine</em></h2>
        <div className="space-y-5 text-warm-white/55 text-sm leading-relaxed">
          <p>Everus AI Gallery is an ongoing exploration of what happens when computational creativity meets deliberate artistic vision. Each piece is directed, curated, and refined — the AI is a medium, not the author.</p>
          <p>The work spans generative landscapes, abstract compositions, architectural visions, and portraits — all created through a combination of custom AI models, iterative prompting, and post-processing. Nothing is accidental.</p>
          <p>This gallery is actively growing. New collections are developed continuously, with a focus on coherent series rather than isolated pieces.</p>
        </div>
        <div className="mt-12 grid grid-cols-3 gap-8">
          {[{value:'9+',label:'Works'},{value:'5',label:'Categories'},{value:'∞',label:'In Progress'}].map(s => (
            <div key={s.label}><p className="font-serif text-3xl text-gold font-light">{s.value}</p><p className="text-warm-white/30 text-xs tracking-widest uppercase mt-1">{s.label}</p></div>
          ))}
        </div>
      </div>
    </div>
  </section>
);
export default About;
