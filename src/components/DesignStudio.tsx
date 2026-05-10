import React, { useEffect, useRef, useState } from 'react';
import * as fabric from 'fabric';
import confetti from 'canvas-confetti';
import { BACKGROUNDS, PROPS, FILTERS } from '../constants';
import { Camera, Download, Layers, Palette, Sparkles, Type, Trash2, CheckCircle2, Printer, ShoppingBag } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export function DesignStudio() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [canvas, setCanvas] = useState<fabric.Canvas | null>(null);
  const [activeTab, setActiveTab] = useState<'background' | 'props' | 'text' | 'filters'>('background');
  const [isSaved, setIsSaved] = useState(false);

  useEffect(() => {
    if (canvasRef.current && !canvas) {
      const fbCanvas = new fabric.Canvas(canvasRef.current, {
        width: 600,
        height: 600,
        backgroundColor: '#ffffff',
      });
      setCanvas(fbCanvas);

      // Add a placeholder for "Your Photo"
      const rect = new fabric.Rect({
        left: 100,
        top: 100,
        width: 400,
        height: 400,
        fill: '#f0f0f0',
        stroke: '#cccccc',
        strokeDashArray: [5, 5],
        rx: 10,
        ry: 10,
        selectable: false,
      });
      
      const text = new fabric.IText('TEMPAT FOTO ANDA', {
        left: 300,
        top: 300,
        fontSize: 20,
        fontFamily: 'Montserrat',
        fontWeight: 'bold',
        fill: '#999999',
        originX: 'center',
        originY: 'center',
        selectable: false,
      });

      fbCanvas.add(rect, text);
      fbCanvas.renderAll();

      return () => {
        fbCanvas.dispose();
      };
    }
  }, [canvas]);

  const handleBackgroundChange = (bgUrl: string) => {
    if (!canvas) return;
    fabric.Image.fromURL(bgUrl, { crossOrigin: 'anonymous' }).then((img) => {
      canvas.setBackgroundImage(img, canvas.renderAll.bind(canvas), {
        scaleX: canvas.width! / img.width!,
        scaleY: canvas.height! / img.height!,
      });
    });
  };

  const addProp = (propUrl: string) => {
    if (!canvas) return;
    fabric.Image.fromURL(propUrl, { crossOrigin: 'anonymous' }).then((img) => {
      img.scale(0.5);
      img.set({
        left: Math.random() * 400,
        top: Math.random() * 400,
      });
      canvas.add(img);
      canvas.setActiveObject(img);
      canvas.renderAll();
    });
  };

  const addText = () => {
    if (!canvas) return;
    const text = new fabric.IText('Teks Anda di Sini', {
      left: 300,
      top: 500,
      fontSize: 30,
      fontFamily: 'Playfair Display',
      fill: '#1a1a1a',
      originX: 'center',
    });
    canvas.add(text);
    canvas.setActiveObject(text);
    canvas.renderAll();
  };

  const removeSelected = () => {
    if (!canvas) return;
    const activeObjects = canvas.getActiveObjects();
    canvas.remove(...activeObjects);
    canvas.discardActiveObject();
    canvas.renderAll();
  };

  const saveDesign = () => {
    if (!canvas) return;
    // In a real app, we would upload this to Firebase Storage
    const dataUrl = canvas.toDataURL();
    console.log('Design Saved:', dataUrl);
    
    // Trigger confetti
    confetti({
      particleCount: 150,
      spread: 70,
      origin: { y: 0.6 },
      colors: ['#d4af37', '#1a1a1a', '#ffffff']
    });

    setIsSaved(true);
    setTimeout(() => setIsSaved(false), 3000);
  };

  const handlePrint = () => {
    if (!canvas) return;
    const dataUrl = canvas.toDataURL();
    const windowContent = '<!DOCTYPE html>';
    const printWindow = window.open('', '', 'width=800,height=800');
    if (printWindow) {
      printWindow.document.open();
      printWindow.document.write(windowContent + '<html><head><title>Print Photo</title></head><body><img src="' + dataUrl + '" style="width:100%"></body></html>');
      printWindow.document.close();
      printWindow.focus();
      printWindow.print();
    }
  };

  return (
    <section className="bg-brand-accent py-24 min-h-screen">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-6xl font-black mb-4 uppercase text-brand-primary tracking-tighter">Design Your Experience</h2>
          <p className="text-brand-dark/60 uppercase tracking-[0.3em] font-black text-[10px]">Sesuaikan latar belakang, properti, dan teks untuk photobooth impian Anda</p>
        </div>

        <div className="flex flex-col lg:flex-row gap-8 items-start">
          {/* Canvas Area */}
          <div className="flex-1 w-full flex flex-col items-center">
            <div className="bg-white p-6 rounded-[40px] border-4 border-brand-dark relative shadow-neo-lg">
              <canvas ref={canvasRef} className="max-w-full h-auto bg-slate-100 rounded-2xl shadow-inner border-2 border-slate-200" />
              
              <div className="absolute -top-4 -right-4 bg-brand-primary text-white p-4 rounded-full shadow-neo border-2 border-brand-dark">
                <Camera className="w-6 h-6 animate-pulse" />
              </div>

              {/* Quick Actions overlay */}
              <div className="mt-6 flex justify-between items-center px-2">
                <button 
                  onClick={removeSelected}
                  className="flex items-center space-x-2 text-red-500 hover:text-red-700 transition-colors text-xs font-black uppercase tracking-widest"
                >
                  <Trash2 className="w-4 h-4" />
                  <span>Hapus Pilihan</span>
                </button>
                <div className="flex space-x-3">
                   <button onClick={handlePrint} className="bg-brand-secondary text-white px-6 py-2 rounded-full text-[10px] font-black uppercase tracking-widest flex items-center space-x-2 shadow-neo hover:translate-x-0.5 hover:translate-y-0.5 transition-all">
                     <Printer className="w-4 h-4" />
                     <span>Cetak</span>
                   </button>
                   <button onClick={saveDesign} className="bg-brand-primary text-white px-6 py-2 rounded-full text-[10px] font-black uppercase tracking-widest flex items-center space-x-2 shadow-neo hover:translate-x-0.5 hover:translate-y-0.5 transition-all">
                     <Download className="w-4 h-4" />
                     <span>Simpan</span>
                   </button>
                </div>
              </div>
            </div>
            
            <AnimatePresence>
              {isSaved && (
                <motion.div 
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  className="mt-6 flex items-center space-x-2 text-brand-primary bg-white px-6 py-3 rounded-full border-2 border-brand-primary shadow-neo font-black text-xs uppercase tracking-widest"
                >
                  <CheckCircle2 className="w-5 h-5" />
                  <span>Desain Tersimpan!</span>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Controls Area */}
          <div className="w-full lg:w-96 bg-white rounded-3xl border-2 border-slate-200 shadow-sm overflow-hidden self-stretch flex flex-col">
            {/* Tabs */}
            <div className="flex border-b-2 border-slate-100 bg-slate-50">
              <button 
                onClick={() => setActiveTab('background')}
                className={`flex-1 py-4 flex flex-col items-center justify-center space-y-1 transition-all ${activeTab === 'background' ? 'bg-white text-brand-primary border-b-4 border-brand-primary' : 'text-slate-400 hover:text-brand-dark'}`}
              >
                <Palette className="w-5 h-5" />
                <span className="text-[10px] uppercase font-black tracking-widest">BG</span>
              </button>
              <button 
                onClick={() => setActiveTab('props')}
                className={`flex-1 py-4 flex flex-col items-center justify-center space-y-1 transition-all ${activeTab === 'props' ? 'bg-white text-brand-secondary border-b-4 border-brand-secondary' : 'text-slate-400 hover:text-brand-dark'}`}
              >
                <Sparkles className="w-5 h-5" />
                <span className="text-[10px] uppercase font-black tracking-widest">Props</span>
              </button>
              <button 
                onClick={() => setActiveTab('text')}
                className={`flex-1 py-4 flex flex-col items-center justify-center space-y-1 transition-all ${activeTab === 'text' ? 'bg-white text-brand-purple border-b-4 border-brand-purple' : 'text-slate-400 hover:text-brand-dark'}`}
              >
                <Type className="w-5 h-5" />
                <span className="text-[10px] uppercase font-black tracking-widest">Teks</span>
              </button>
              <button 
                onClick={() => setActiveTab('filters')}
                className={`flex-1 py-4 flex flex-col items-center justify-center space-y-1 transition-all ${activeTab === 'filters' ? 'bg-white text-brand-yellow border-b-4 border-brand-yellow' : 'text-slate-400 hover:text-brand-dark'}`}
              >
                <Layers className="w-5 h-5" />
                <span className="text-[10px] uppercase font-black tracking-widest">Filter</span>
              </button>
            </div>

            {/* Tab Content */}
            <div className="p-6 overflow-y-auto max-h-[500px] bg-white flex-1">
              {activeTab === 'background' && (
                <div className="grid grid-cols-2 gap-4">
                  {BACKGROUNDS.map((bg) => (
                    <button 
                      key={bg.id}
                      onClick={() => handleBackgroundChange(bg.url)}
                      className="group relative rounded-2xl overflow-hidden aspect-video border-2 border-transparent hover:border-brand-primary transition-all shadow-sm"
                    >
                      <img src={bg.url} alt={bg.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform" />
                      <div className="absolute inset-0 bg-brand-dark/20 group-hover:bg-transparent transition-all" />
                      <span className="absolute bottom-2 left-2 text-[9px] text-white font-black uppercase tracking-widest drop-shadow-md">{bg.name}</span>
                    </button>
                  ))}
                </div>
              )}

              {activeTab === 'props' && (
                <div className="grid grid-cols-3 gap-4">
                  {PROPS.map((prop) => (
                    <button 
                      key={prop.id}
                      onClick={() => addProp(prop.url)}
                      className="flex flex-col items-center justify-center p-3 rounded-2xl border-2 border-slate-100 hover:bg-brand-accent hover:border-brand-secondary group transition-all"
                    >
                      <img src={prop.url} alt={prop.name} className="w-12 h-12 object-contain group-hover:scale-110 transition-transform mb-2" />
                      <span className="text-[10px] text-slate-500 uppercase font-black text-center tracking-tighter">{prop.name}</span>
                    </button>
                  ))}
                </div>
              )}

              {activeTab === 'text' && (
                <div className="space-y-6">
                  <div className="bg-slate-50 p-8 rounded-3xl text-center flex flex-col items-center border-2 border-dashed border-slate-200">
                    <Type className="w-12 h-12 text-brand-purple/40 mb-4" />
                    <h3 className="font-black text-lg mb-2 uppercase">Custom Text</h3>
                    <p className="text-[10px] font-bold text-slate-400 mb-6 uppercase tracking-widest">Tambahkan Pesan Pribadi Anda</p>
                    <button 
                      onClick={addText}
                      className="bg-brand-purple text-white px-8 py-3 rounded-full text-[10px] font-black uppercase tracking-widest shadow-neo hover:translate-x-0.5 hover:translate-y-0.5 transition-all"
                    >
                      Tambah Teks
                    </button>
                  </div>
                </div>
              )}

              {activeTab === 'filters' && (
                <div className="grid grid-cols-1 gap-3">
                  {FILTERS.map((f) => (
                    <button 
                      key={f.id}
                      className="flex items-center justify-between p-4 rounded-2xl border-2 border-slate-100 hover:border-brand-yellow hover:bg-yellow-50 transition-all group"
                      onClick={() => {
                        if (!canvas) return;
                        const canvasEl = canvas.getElement();
                        canvasEl.style.filter = f.filter;
                      }}
                    >
                      <span className="font-black text-[10px] uppercase tracking-widest group-hover:text-brand-dark">{f.name}</span>
                      <div 
                        className="w-12 h-8 rounded-lg overflow-hidden border-2 border-white shadow-sm" 
                        style={{ filter: f.filter }}
                      >
                         <img src="https://picsum.photos/seed/filterpreview/100/100" className="w-full h-full object-cover" />
                      </div>
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Bottom Info */}
            <div className="p-6 bg-brand-dark text-white">
               <div className="flex items-center justify-between">
                 <div>
                    <span className="text-[9px] text-white/40 uppercase font-black tracking-[0.2em] block mb-1">Status Editor</span>
                    <span className="text-xs font-black uppercase tracking-widest text-brand-cyan flex items-center gap-2">
                       <span className="w-2 h-2 rounded-full bg-brand-cyan animate-pulse" />
                       Mode Desain Aktif
                    </span>
                 </div>
                 <div className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center border border-white/20">
                    <ShoppingBag className="w-5 h-5 text-brand-primary" />
                 </div>
               </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
