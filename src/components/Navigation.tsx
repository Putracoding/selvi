import React, { useState, useEffect } from 'react';
import { Camera, Heart, Instagram, Image as ImageIcon, ShoppingBag, Menu, X, Share2, Printer, Download, Sparkles } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { Link, useLocation } from 'react-router-dom';

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Paket', path: '/packages' },
    { name: 'Studio Desain', path: '/studio' },
    { name: 'Galeri', path: '/gallery' },
    { name: 'Cek Pesanan', path: '/order-check' },
  ];

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled ? 'bg-white border-b-4 border-brand-primary py-3' : 'bg-transparent py-5'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        <Link to="/" className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-brand-primary rounded-full flex items-center justify-center shadow-neo">
            <Camera className="w-6 h-6 text-white" />
          </div>
          <span className={`text-2xl font-black tracking-tighter ${isScrolled ? 'text-brand-primary' : 'text-white'}`}>
            SELVI AYU <span className="text-[10px] font-medium ml-1 opacity-50">11 TKJ 1</span>
          </span>
        </Link>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center space-x-8">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              to={link.path}
              className={`text-xs font-black uppercase tracking-widest transition-colors hover:text-brand-primary ${
                isScrolled ? 'text-brand-dark' : 'text-white'
              } ${location.pathname === link.path ? 'text-brand-primary' : ''}`}
            >
              {link.name}
            </Link>
          ))}
          <Link
            to="/studio"
            className="bg-brand-secondary text-white px-6 py-2 rounded-full text-xs font-black uppercase tracking-widest shadow-neo hover:translate-x-0.5 hover:translate-y-0.5 transition-all"
          >
            BOOK NOW
          </Link>
        </div>

        {/* Mobile Toggle */}
        <button className="md:hidden" onClick={() => setIsMenuOpen(!isMenuOpen)}>
          {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className={`w-6 h-6 ${isScrolled ? 'text-brand-dark' : 'text-white'}`} />}
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed inset-0 z-40 bg-white flex flex-col items-center justify-center space-y-8 md:hidden"
          >
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.path}
                onClick={() => setIsMenuOpen(false)}
                className="text-2xl font-serif font-bold text-brand-dark"
              >
                {link.name}
              </Link>
            ))}
            <button
              onClick={() => setIsMenuOpen(false)}
              className="absolute top-6 right-6"
            >
              <X className="w-8 h-8 text-brand-dark" />
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}

export function Hero() {
  return (
    <section className="relative h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0 z-0">
        <img
          src="https://picsum.photos/seed/photobooth/1920/1080"
          alt="Photobooth Hero"
          className="w-full h-full object-cover"
          referrerPolicy="no-referrer"
        />
        <div className="absolute inset-0 bg-black/50" />
      </div>

      <div className="relative z-10 text-center px-4">
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-white/90 uppercase tracking-[0.4em] font-black text-xs mb-4"
        >
          Capture Every Moment with Style
        </motion.p>
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="text-6xl md:text-9xl text-white font-black leading-none mb-12"
        >
          SELVI AYU <br />
          <span className="text-brand-primary drop-shadow-[4px_4px_0px_rgba(0,0,0,0.5)]">PHOTOBOOTH</span>
        </motion.h1>
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.4 }}
          className="flex flex-col md:flex-row items-center justify-center gap-6"
        >
          <Link
            to="/studio"
            className="bg-brand-primary text-white px-10 py-5 rounded-full font-black uppercase tracking-widest shadow-neo hover:translate-x-1 hover:translate-y-1 transition-all w-full md:w-auto"
          >
            Custom Desain Anda
          </Link>
          <Link
            to="/gallery"
            className="bg-brand-secondary text-white px-10 py-5 rounded-full font-black uppercase tracking-widest shadow-neo hover:translate-x-1 hover:translate-y-1 transition-all w-full md:w-auto"
          >
            Lihat Galeri
          </Link>
        </motion.div>
      </div>

      {/* Floating Elements (Visual Polish) */}
      <div className="absolute bottom-10 left-10 hidden lg:block">
        <div className="flex items-center space-x-4 text-white/40">
          <div className="w-12 h-[1px] bg-white/40" />
          <span className="text-xs uppercase tracking-widest">Est. 2024</span>
        </div>
      </div>
    </section>
  );
}

export function Footer() {
  return (
    <footer className="bg-brand-dark text-white py-20 px-4">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-12">
        <div className="col-span-1 md:col-span-2">
          <Link to="/" className="flex items-center space-x-2 mb-6">
            <Camera className="w-8 h-8 text-brand-primary" />
            <span className="text-3xl font-serif font-bold tracking-tighter">Selvi Ayu</span>
          </Link>
          <p className="text-white/60 max-w-sm mb-8">
            Layanan photobooth premium kelas 11 TKJ 1. Kami menyediakan pengalaman berfoto terbaik dengan teknologi terkini dan desain yang bisa Anda sesuaikan sendiri.
          </p>
          <div className="flex space-x-4">
            <a href="#" className="w-10 h-10 border border-white/20 rounded-full flex items-center justify-center hover:bg-brand-primary transition-colors">
              <Instagram className="w-5 h-5" />
            </a>
            <a href="#" className="w-10 h-10 border border-white/20 rounded-full flex items-center justify-center hover:bg-brand-primary transition-colors">
              <Share2 className="w-5 h-5" />
            </a>
          </div>
        </div>

        <div>
          <h4 className="font-bold uppercase tracking-widest mb-6">Links</h4>
          <ul className="space-y-4 text-white/60">
            <li><Link to="/packages" className="hover:text-brand-primary">Daftar Paket</Link></li>
            <li><Link to="/studio" className="hover:text-brand-primary">Studio Desain</Link></li>
            <li><Link to="/gallery" className="hover:text-brand-primary">Galeri Foto</Link></li>
            <li><Link to="/faq" className="hover:text-brand-primary">FAQ</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="font-bold uppercase tracking-widest mb-6">Contact</h4>
          <ul className="space-y-4 text-white/60">
            <li>SMKN 11 TKJ 1</li>
            <li>Jakarta, Indonesia</li>
            <li>info@selviayu.com</li>
            <li>+62 812 3456 7890</li>
          </ul>
        </div>
      </div>
      <div className="max-w-7xl mx-auto border-t border-white/10 mt-20 pt-8 flex flex-col md:row justify-between items-center text-sm text-white/40">
        <p>&copy; 2024 Selvi Ayu Photobooth. All rights reserved.</p>
        <p>Created with Love by 11 TKJ 1</p>
      </div>
    </footer>
  );
}
