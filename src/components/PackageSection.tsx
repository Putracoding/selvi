import React from 'react';
import { PACKAGES } from '../constants';
import { Check, ArrowRight } from 'lucide-react';
import { motion } from 'motion/react';
import { Link } from 'react-router-dom';

export function PackageSection() {
  return (
    <section className="bg-brand-accent py-24 px-4 overflow-hidden" id="packages">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-8">
          <div className="max-w-2xl">
            <h2 className="text-4xl md:text-6xl font-black mb-6 uppercase text-brand-primary">Pilih Paket <br />Yang Sempurna</h2>
            <p className="text-gray-500 text-lg font-bold">Kami menawarkan berbagai pilihan paket yang dapat disesuaikan dengan kebutuhan dan budget acara Anda.</p>
          </div>
          <div className="hidden md:block">
             <div className="text-brand-primary text-9xl font-black opacity-5 select-none">VIBRANT</div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {PACKAGES.map((pkg, index) => (
            <motion.div
              key={pkg.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              viewport={{ once: true }}
              className={`relative p-8 rounded-3xl border-2 ${pkg.id === 'standard' ? 'border-brand-primary bg-white shadow-neo-lg' : 'border-slate-200 bg-white shadow-sm'} flex flex-col`}
            >
              {pkg.id === 'standard' && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-brand-primary text-white px-4 py-1 rounded-full text-[10px] font-black uppercase tracking-[0.2em] shadow-neo">
                  Most Popular
                </div>
              )}

              <div className="mb-8">
                <h3 className="text-2xl font-black uppercase mb-2">{pkg.name}</h3>
                <p className="text-slate-400 text-xs font-bold uppercase tracking-widest mb-6 min-h-[40px]">{pkg.description}</p>
                <div className="flex items-baseline">
                  <span className="text-3xl font-black text-brand-secondary">Rp {pkg.price.toLocaleString('id-ID')}</span>
                  <span className="text-gray-400 text-xs font-bold uppercase ml-2 tracking-widest">/ event</span>
                </div>
              </div>

              <ul className="space-y-4 mb-10 flex-1">
                {pkg.features.map((feature, i) => (
                  <li key={i} className="flex items-start space-x-3 text-sm font-bold text-slate-600">
                    <div className="mt-0.5 w-5 h-5 rounded-full bg-brand-primary/10 flex items-center justify-center flex-shrink-0">
                      <Check className="w-3 h-3 text-brand-primary" />
                    </div>
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>

              <Link
                to="/studio"
                className={`w-full py-4 rounded-xl font-black uppercase tracking-widest text-xs flex items-center justify-center space-x-2 transition-all shadow-neo hover:translate-x-0.5 hover:translate-y-0.5 ${
                  pkg.id === 'standard' 
                  ? 'bg-brand-primary text-white' 
                  : 'bg-brand-dark text-white'
                }`}
              >
                <span>Pilih Paket Ini</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
