import React, { useState } from 'react';
import { Heart, Instagram, Share2, Eye, LayoutGrid, LayoutList } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

const DUMMY_GALLERY = [
  { id: '1', url: 'https://picsum.photos/seed/wedding/800/800', user: 'Anita & Budi', likes: 245, category: 'Wedding' },
  { id: '2', url: 'https://picsum.photos/seed/party/800/800', user: 'SMKN 11 Party', likes: 182, category: 'Prom' },
  { id: '3', url: 'https://picsum.photos/seed/birthday/800/800', user: 'Sasha Birthday', likes: 320, category: 'Birthday' },
  { id: '4', url: 'https://picsum.photos/seed/event/800/800', user: 'Product Launch X', likes: 98, category: 'Corporate' },
  { id: '5', url: 'https://picsum.photos/seed/fam/800/800', user: 'Family Reunion', likes: 156, category: 'Family' },
  { id: '6', url: 'https://picsum.photos/seed/club/800/800', user: 'Night Clubbers', likes: 412, category: 'Party' },
];

export function GallerySection() {
  const [filter, setFilter] = useState('All');
  const categories = ['All', 'Wedding', 'Birthday', 'Prom', 'Corporate', 'Family'];

  const filteredItems = filter === 'All' 
    ? DUMMY_GALLERY 
    : DUMMY_GALLERY.filter(item => item.category === filter);

  return (
    <section className="bg-brand-dark py-24 px-4 overflow-hidden relative">
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-brand-primary via-brand-secondary to-brand-purple" />
      
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-white text-4xl md:text-7xl font-black mb-4 uppercase tracking-tighter">Live Gallery</h2>
          <div className="flex items-center justify-center space-x-3 mb-10">
            <span className="bg-brand-primary text-white text-[10px] px-3 py-1 rounded-full font-black uppercase tracking-widest animate-pulse shadow-neo">
              Live Now
            </span>
            <p className="text-white/40 uppercase tracking-[0.3em] font-black text-[10px]">Memories from 11 TKJ 1</p>
          </div>
          
          <div className="flex flex-wrap justify-center gap-4">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setFilter(cat)}
                className={`px-6 py-2 rounded-full text-[10px] font-black uppercase tracking-widest transition-all shadow-neo ${
                  filter === cat 
                  ? 'bg-brand-primary text-white border-2 border-white' 
                  : 'bg-white/5 text-white/60 hover:bg-white/10'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        <motion.div 
          layout
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          <AnimatePresence>
            {filteredItems.map((item) => (
              <motion.div
                key={item.id}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                className="group relative aspect-[3/4] overflow-hidden rounded-[2.5rem] border-4 border-white/10 shadow-neo-lg"
              >
                <img 
                  src={item.url} 
                  alt={item.user} 
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute bottom-4 left-4 right-4 bg-white/90 backdrop-blur-md p-4 rounded-3xl translate-y-2 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300 shadow-neo">
                  <div className="flex justify-between items-center mb-2">
                    <h4 className="text-brand-dark font-black text-sm uppercase tracking-tight">{item.user}</h4>
                    <Heart className="w-4 h-4 text-brand-primary fill-brand-primary" />
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-[9px] font-black text-brand-secondary uppercase tracking-widest">{item.category}</span>
                    <span className="text-[9px] font-bold text-slate-400">@selvi.a</span>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        <div className="mt-20 text-center">
           <button className="bg-brand-secondary text-white px-10 py-4 rounded-full font-black uppercase tracking-widest shadow-neo hover:translate-x-1 hover:translate-y-1 transition-all">
             View All Memories →
           </button>
        </div>
      </div>
    </section>
  );
}
