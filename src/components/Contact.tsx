import React from 'react';
const Contact: React.FC = () => (
  <section id="contact" className="py-28 border-t border-white/5">
    <div className="max-w-3xl mx-auto px-6 text-center">
      <p className="text-gold text-xs tracking-[0.4em] uppercase font-light mb-4">Contact</p>
      <h2 className="font-serif text-4xl md:text-5xl text-warm-white font-light mb-6">Get in Touch</h2>
      <div className="w-12 h-px bg-gold/50 mx-auto mb-10" />
      <p className="text-warm-white/50 text-sm leading-relaxed mb-14 max-w-lg mx-auto">Interested in commissions, collaborations, or licensing original work? Reach out — every project starts with a conversation.</p>
      <div className="grid sm:grid-cols-3 gap-6 mb-16">
        {[{label:'Commissions',desc:'Custom AI artwork for your project or space'},{label:'Licensing',desc:'Rights and usage for commercial projects'},{label:'Collaborate',desc:'Joint creative and technical partnerships'}].map(i => (
          <div key={i.label} className="border border-white/5 p-6 hover:border-gold/20 transition-colors duration-300">
            <h3 className="font-serif text-warm-white text-lg mb-3">{i.label}</h3>
            <p className="text-warm-white/35 text-xs leading-relaxed">{i.desc}</p>
          </div>
        ))}
      </div>
      <a href="https://github.com/agent-everus" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-3 px-10 py-3.5 bg-gold text-obsidian text-sm tracking-widest uppercase font-medium hover:bg-gold-light transition-colors duration-300">Connect on GitHub</a>
    </div>
  </section>
);
export default Contact;
