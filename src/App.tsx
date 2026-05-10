import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { Navbar, Hero, Footer } from './components/Navigation';
import { PackageSection } from './components/PackageSection';
import { DesignStudio } from './components/DesignStudio';
import { GallerySection } from './components/GallerySection';
import { motion } from 'motion/react';

function HomePage() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <Hero />
      <PackageSection />
      <GallerySection />
      
      {/* Experience Section */}
      <section className="bg-white py-24 px-4 border-y-4 border-brand-primary/10">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center gap-16">
          <div className="flex-1">
             <h2 className="text-4xl md:text-7xl font-black mb-8 uppercase tracking-tighter text-brand-secondary">Bukan Sekadar Foto. <br /><span className="text-brand-primary">Ini Kenangan.</span></h2>
             <p className="text-slate-500 text-lg mb-10 leading-relaxed font-bold">
               Di Selvi Ayu, kami menggabungkan kecanggihan teknologi photobooth dengan sentuhan estetik yang personal. Setiap jepretan dirancang untuk menonjolkan sisi terbaik Anda.
             </p>
             <div className="grid grid-cols-2 gap-8 mb-10">
                <div className="p-6 bg-brand-accent rounded-3xl border-2 border-brand-primary shadow-neo">
                  <h4 className="font-black text-4xl text-brand-primary mb-2">100%</h4>
                  <p className="text-[10px] uppercase font-black tracking-widest text-slate-400">Customizable</p>
                </div>
                <div className="p-6 bg-brand-accent rounded-3xl border-2 border-brand-secondary shadow-neo">
                  <h4 className="font-black text-4xl text-brand-secondary mb-2">Instant</h4>
                  <p className="text-[10px] uppercase font-black tracking-widest text-slate-400">Upload & Print</p>
                </div>
             </div>
             <Link to="/studio" className="inline-block bg-brand-dark text-white px-10 py-5 rounded-full font-black uppercase tracking-widest shadow-neo hover:translate-x-1 hover:translate-y-1 transition-all">
               Mulai Desain Sekarang
             </Link>
          </div>
          <div className="flex-1 relative">
             <div className="aspect-[4/5] rounded-[60px] overflow-hidden border-4 border-brand-dark shadow-neo-lg relative z-10">
                <img src="https://picsum.photos/seed/experience/800/1000" alt="Experience" className="w-full h-full object-cover" />
             </div>
             <div className="absolute -bottom-10 -right-10 w-64 h-64 bg-brand-primary/20 rounded-full blur-3xl z-0" />
             <div className="absolute top-10 -left-10 w-40 h-40 bg-brand-yellow rounded-full flex flex-col items-center justify-center text-brand-dark z-20 shadow-neo border-4 border-brand-dark animate-bounce-slow">
                <span className="font-black text-2xl">SA</span>
                <span className="font-black text-[10px] uppercase tracking-widest">TKJ 1</span>
             </div>
          </div>
        </div>
      </section>
    </motion.div>
  );
}

function StudioPage() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="pt-20"
    >
      <DesignStudio />
    </motion.div>
  );
}

function PackagesPage() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="pt-20"
    >
      <PackageSection />
    </motion.div>
  );
}

function GalleryPage() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="pt-20"
    >
      <GallerySection />
    </motion.div>
  );
}

export default function App() {
  return (
    <Router>
      <div className="min-h-screen flex flex-col font-sans">
        <Navbar />
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/packages" element={<PackagesPage />} />
            <Route path="/studio" element={<StudioPage />} />
            <Route path="/gallery" element={<GalleryPage />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}
