
import React, { useState, useEffect, useRef } from 'react';
import { Layout, Palette, Type, Download, Edit3, Layers, Scaling, MoveVertical, AlignCenter, RefreshCw, Camera, Square, Grid, Columns, AlignLeft, AlignRight, Maximize, Minimize, Zap, Share2, Copy } from 'lucide-react';
import { fonts } from '../data/fonts';
import { Language } from '../types';
import { translations } from '../data/translations';

interface PosterStudioProps {
  language: Language;
}

const PosterStudio: React.FC<PosterStudioProps> = ({ language }) => {
  const t = translations[language].studio;
  const [activeLayout, setActiveLayout] = useState(0);
  const [activePalette, setActivePalette] = useState(1);
  const [activeFont, setActiveFont] = useState(fonts[0]);
  const [posterText, setPosterText] = useState(language === 'en' ? 'ZENITH\nSTUDIO' : 'ZENITH\nСТУДИЯ');
  const [fontSize, setFontSize] = useState(110);
  const [lineHeight, setLineHeight] = useState(0.8);
  const [tracking, setTracking] = useState(-6);
  const [fontWeight, setFontWeight] = useState(700);
  const [textTransform, setTextTransform] = useState<'uppercase' | 'none' | 'lowercase'>('uppercase');
  const [textAlign, setTextAlign] = useState<'left' | 'center' | 'right'>('center');
  const [showGrain, setShowGrain] = useState(true);
  const [showGrid, setShowGrid] = useState(false);
  const [showScanlines, setShowScanlines] = useState(false);
  const [isExporting, setIsExporting] = useState(false);
  const [flash, setFlash] = useState(false);
  const posterRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setPosterText(language === 'en' ? 'ZENITH\nSTUDIO' : 'ZENITH\nСТУДИЯ');
  }, [language]);

  const layouts = [
    { name: 'Focus', class: 'flex flex-col justify-center items-center text-center' },
    { name: 'Editorial', class: 'flex flex-col justify-between text-left items-start' },
    { name: 'Grid', class: 'grid grid-cols-2 gap-4 items-center justify-center text-left' },
    { name: 'Brutalist', class: 'flex flex-col items-end justify-start text-right' },
    { name: 'Swiss', class: 'flex flex-col items-start justify-end text-left' },
    { name: 'Diagonal', class: 'flex flex-col items-center justify-center text-center rotate-[-15deg] scale-125' }
  ];

  const palettes = [
    { name: 'Canvas', bg: 'bg-[#F5F5F3]', text: 'text-[#0A0A0A]', accent: 'bg-[#FF3C00]', border: 'border-black/10' },
    { name: 'Onyx', bg: 'bg-[#0A0A0A]', text: 'text-[#F5F5F3]', accent: 'bg-[#D4FF00]', border: 'border-white/10' },
    { name: 'Cobalt', bg: 'bg-[#0038FF]', text: 'text-[#FFFFFF]', accent: 'bg-[#FFFF00]', border: 'border-white/10' },
    { name: 'Lava', bg: 'bg-[#FF3C00]', text: 'text-[#FFFFFF]', accent: 'bg-black', border: 'border-white/10' },
    { name: 'Toxic', bg: 'bg-[#D4FF00]', text: 'text-[#0A0A0A]', accent: 'bg-white', border: 'border-black/10' },
    { name: 'Studio', bg: 'bg-white', text: 'text-[#000000]', accent: 'bg-neutral-100', border: 'border-black/5' },
    { name: 'Cyber', bg: 'bg-[#00FF41]', text: 'text-[#000000]', accent: 'bg-black', border: 'border-black/20' },
    { name: 'Deep', bg: 'bg-[#1A1A1A]', text: 'text-[#FF0055]', accent: 'bg-[#FF0055]', border: 'border-white/5' }
  ];

  const handleExport = () => {
    setIsExporting(true);
    setFlash(true);
    setTimeout(() => setFlash(false), 200);
    setTimeout(() => setIsExporting(false), 1200);
  };

  const randomize = () => {
    setActiveLayout(Math.floor(Math.random() * layouts.length));
    setActivePalette(Math.floor(Math.random() * palettes.length));
    setActiveFont(fonts[Math.floor(Math.random() * fonts.length)]);
    setFontSize(Math.floor(Math.random() * 100) + 70);
  };

  return (
    <div className="py-12 md:py-24 px-4 md:px-12 bg-white border-b border-black">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 md:gap-16">
          <div className="lg:col-span-4 space-y-6 order-2 lg:order-1">
            <div className="flex justify-between items-start">
              <div className="animate-in slide-in-from-left duration-500">
                <span className="text-[10px] font-bold uppercase tracking-[0.4em] text-brand-accent mb-2 block">{t.system}</span>
                <h2 className="text-4xl md:text-5xl font-bold font-grotesk uppercase leading-none tracking-tighter">{language === 'en' ? <>{'Specimen'}<br/>{'Studio'}</> : <>{'Студия'}<br/>{'Образцов'}</>}</h2>
              </div>
              <button onClick={randomize} className="w-10 h-10 border border-neutral-200 rounded-full flex items-center justify-center hover:bg-brand-accent hover:text-white transition-all hover:rotate-180 bg-white" title={t.randomize}>
                <RefreshCw size={16} />
              </button>
            </div>

            <div className="space-y-5 bg-brand-light/40 p-5 md:p-8 border border-black/10 rounded-none relative overflow-hidden">
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <h4 className="text-[10px] font-bold uppercase text-neutral-400 flex items-center gap-2"><Edit3 size={12} /> {t.text}</h4>
                  <div className="flex gap-1">
                    {['none', 'uppercase', 'lowercase'].map((t) => (
                      <button 
                        key={t} 
                        onClick={() => setTextTransform(t as any)}
                        className={`w-6 h-6 flex items-center justify-center text-[10px] border transition-all ${textTransform === t ? 'bg-black text-white border-black' : 'bg-white border-neutral-200 text-neutral-400'}`}
                      >
                        {t === 'none' ? 'Aa' : t === 'uppercase' ? 'AA' : 'aa'}
                      </button>
                    ))}
                  </div>
                </div>
                <textarea value={posterText} onChange={(e) => setPosterText(e.target.value)} className="w-full bg-white border border-neutral-200 p-4 font-bold text-sm md:text-base outline-none h-24 md:h-28 resize-none" style={{ textTransform }} />
              </div>

              <div className="space-y-5">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <div className="flex justify-between text-[9px] uppercase font-bold text-neutral-500">
                        <span className="flex items-center gap-1"><Scaling size={10}/> {translations[language].lab.size}</span>
                        <span>{fontSize}px</span>
                    </div>
                    <input type="range" min="40" max="300" value={fontSize} onChange={(e) => setFontSize(Number(e.target.value))} className="w-full accent-black h-1 bg-neutral-300 rounded-lg appearance-none cursor-pointer" />
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between text-[9px] uppercase font-bold text-neutral-500">
                        <span className="flex items-center gap-1"><Zap size={10}/> Weight</span>
                        <span>{fontWeight}</span>
                    </div>
                    <input type="range" min="100" max="900" step="100" value={fontWeight} onChange={(e) => setFontWeight(Number(e.target.value))} className="w-full accent-black h-1 bg-neutral-300 rounded-lg appearance-none cursor-pointer" />
                  </div>
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <div className="flex justify-between text-[9px] uppercase font-bold text-neutral-500">
                        <span className="flex items-center gap-1"><MoveVertical size={10}/> {translations[language].lab.leading}</span>
                        <span>{lineHeight}</span>
                    </div>
                    <input type="range" min="0.4" max="2.0" step="0.01" value={lineHeight} onChange={(e) => setLineHeight(Number(e.target.value))} className="w-full accent-black h-1 bg-neutral-300 rounded-lg appearance-none cursor-pointer" />
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between text-[9px] uppercase font-bold text-neutral-500">
                        <span className="flex items-center gap-1"><AlignCenter size={10} className="rotate-90"/> {translations[language].lab.tracking}</span>
                        <span>{tracking}px</span>
                    </div>
                    <input type="range" min="-50" max="50" value={tracking} onChange={(e) => setTracking(Number(e.target.value))} className="w-full accent-black h-1 bg-neutral-300 rounded-lg appearance-none cursor-pointer" />
                  </div>
                </div>
              </div>

              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <h4 className="text-[10px] font-bold uppercase text-neutral-400 flex items-center gap-2"><Layout size={12} /> {t.composition}</h4>
                  <div className="flex gap-1">
                    {(['left', 'center', 'right'] as const).map((a) => (
                      <button 
                        key={a} 
                        onClick={() => setTextAlign(a)}
                        className={`w-6 h-6 flex items-center justify-center border transition-all ${textAlign === a ? 'bg-black text-white border-black' : 'bg-white border-neutral-200 text-neutral-400'}`}
                      >
                        {a === 'left' ? <AlignLeft size={10} /> : a === 'center' ? <AlignCenter size={10} /> : <AlignRight size={10} />}
                      </button>
                    ))}
                  </div>
                </div>
                <div className="grid grid-cols-3 gap-1">
                  {layouts.map((l, i) => (
                    <button key={i} onClick={() => setActiveLayout(i)} className={`py-3 border text-[8px] font-bold uppercase transition-all ${activeLayout === i ? 'bg-black text-white border-black' : 'bg-white border-neutral-200 hover:border-black'}`}>
                      {l.name}
                    </button>
                  ))}
                </div>
              </div>

              <div className="space-y-3">
                <h4 className="text-[10px] font-bold uppercase text-neutral-400 flex items-center gap-2"><Type size={12} /> {t.library}</h4>
                <select value={activeFont.id} onChange={(e) => setActiveFont(fonts.find(f => f.id === e.target.value) || fonts[0])} className="w-full bg-white border border-neutral-200 p-3 font-bold uppercase text-xs outline-none cursor-pointer">
                  {fonts.map(f => <option key={f.id} value={f.id}>{f.name}</option>)}
                </select>
              </div>

              <div className="grid grid-cols-3 gap-1">
                <button onClick={() => setShowGrain(!showGrain)} className={`flex flex-col items-center justify-center p-2 bg-white border transition-all ${showGrain ? 'border-brand-accent text-brand-accent' : 'border-neutral-200 text-neutral-400'}`}>
                   <Layers size={12} className="mb-1" />
                   <span className="text-[7px] font-bold uppercase">Grain</span>
                </button>
                <button onClick={() => setShowGrid(!showGrid)} className={`flex flex-col items-center justify-center p-2 bg-white border transition-all ${showGrid ? 'border-black text-black' : 'border-neutral-200 text-neutral-400'}`}>
                   <Grid size={12} className="mb-1" />
                   <span className="text-[7px] font-bold uppercase">Grid</span>
                </button>
                <button onClick={() => setShowScanlines(!showScanlines)} className={`flex flex-col items-center justify-center p-2 bg-white border transition-all ${showScanlines ? 'border-blue-500 text-blue-500' : 'border-neutral-200 text-neutral-400'}`}>
                   <Columns size={12} className="mb-1" />
                   <span className="text-[7px] font-bold uppercase">Scan</span>
                </button>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
              <button onClick={handleExport} disabled={isExporting} className={`w-full py-6 text-xs font-bold uppercase flex items-center justify-between px-8 group relative border border-black ${isExporting ? 'bg-brand-lime text-black border-brand-lime' : 'bg-black text-white'}`} data-magnetic>
                 <span className="relative z-10 flex items-center gap-3">
                   {isExporting ? <Camera size={16} className="animate-pulse" /> : <Download size={16} />}
                   {isExporting ? t.rendering : t.capture}
                 </span>
                 <div className="relative z-10 font-mono opacity-50 text-[9px] hidden md:block">PNG_EXPORT</div>
              </button>
              <div className="grid grid-cols-2 gap-2">
                <button className="flex items-center justify-center bg-white border border-black/10 hover:bg-black hover:text-white transition-all group">
                  <Copy size={16} className="group-hover:scale-110 transition-transform" />
                </button>
                <button className="flex items-center justify-center bg-white border border-black/10 hover:bg-black hover:text-white transition-all group">
                  <Share2 size={16} className="group-hover:scale-110 transition-transform" />
                </button>
              </div>
            </div>
          </div>

          <div className="lg:col-span-8 order-1 lg:order-2">
            <div className="lg:sticky lg:top-24 space-y-4 self-start">
              <div 
                ref={posterRef}
                className={`relative w-full aspect-[4/5] md:aspect-[16/9] transition-all duration-700 shadow-2xl overflow-hidden ${palettes[activePalette].bg} ${palettes[activePalette].text}`}
              >
                <div className={`absolute inset-0 z-50 bg-white transition-opacity duration-300 pointer-events-none ${flash ? 'opacity-100' : 'opacity-0'}`}></div>
                
                {/* Effects Layer */}
                {showGrain && <div className="absolute inset-0 opacity-[0.15] pointer-events-none mix-blend-multiply z-10" style={{backgroundImage: "url('https://grainy-gradients.vercel.app/noise.svg')"}}></div>}
                {showGrid && <div className={`absolute inset-0 opacity-[0.1] pointer-events-none z-0 grid grid-cols-12 grid-rows-12`}>{[...Array(144)].map((_, i) => <div key={i} className={`border-[0.5px] ${palettes[activePalette].text.replace('text-', 'border-')}`}></div>)}</div>}
                {showScanlines && (
                  <div className="absolute inset-0 z-10 pointer-events-none opacity-[0.05]" style={{ background: 'linear-gradient(rgba(18, 16, 16, 0) 50%, rgba(0, 0, 0, 0.25) 50%), linear-gradient(90deg, rgba(255, 0, 0, 0.06), rgba(0, 255, 0, 0.02), rgba(0, 0, 255, 0.06))', backgroundSize: '100% 4px, 3px 100%' }}></div>
                )}

                <div className={`absolute inset-0 p-8 md:p-16 z-20 transition-all duration-700 ${layouts[activeLayout].class}`}>
                  <div className="w-full flex justify-between items-start mb-auto">
                    <div className="font-mono text-[9px] md:text-[11px] uppercase opacity-50 tracking-[0.3em] flex items-center gap-4">
                      <span className="flex items-center gap-2"><Zap size={10} className="text-brand-accent" /> STUDIO_MODE</span>
                      <span className="opacity-20">/</span>
                      <span>{activeFont.name}</span>
                      <span className="opacity-20">/</span>
                      <span>{palettes[activePalette].name}</span>
                    </div>
                    <div className="flex flex-col items-end gap-1">
                      <div className={`text-2xl md:text-4xl font-bold tracking-tighter leading-none ${activeFont.className}`}>Z.</div>
                    </div>
                  </div>

                  <div 
                    className={`transition-all duration-500 w-full whitespace-pre-wrap ${activeFont.className}`} 
                    style={{ 
                      fontSize: `${fontSize * (window.innerWidth < 768 ? 0.5 : 0.8)}px`, 
                      lineHeight: lineHeight, 
                      letterSpacing: `${tracking}px`,
                      fontWeight: fontWeight,
                      textTransform: textTransform,
                      textAlign: textAlign
                    }}
                  >
                    {posterText}
                  </div>

                  <div className="flex flex-col md:flex-row justify-between w-full items-end mt-auto gap-8 pt-8">
                      <div className="flex flex-col gap-6">
                          <div className="flex flex-wrap gap-2 max-w-md">
                              {activeFont.tags.map(t => (
                                <span key={t} className={`text-[10px] border px-5 py-2 font-mono uppercase tracking-widest ${palettes[activePalette].border} bg-current/5`}>
                                  {t}
                                </span>
                              ))}
                          </div>
                          <div className="font-mono text-[10px] opacity-40 tracking-widest">
                            © 2025 ZENITH TYPE FOUNDRY // ALL RIGHTS RESERVED
                          </div>
                      </div>
                      <div className={`hidden md:flex w-32 h-32 ${palettes[activePalette].accent} flex items-center justify-center text-black shadow-2xl rotate-3 hover:rotate-0 transition-transform duration-500`}>
                          <span className={`text-8xl font-bold ${activeFont.className}`}>{activeFont.name.charAt(0)}</span>
                      </div>
                  </div>
                </div>

                {/* Palette Quick Switcher */}
                <div className="absolute top-1/2 right-6 -translate-y-1/2 flex flex-col gap-3 z-40 bg-black/10 backdrop-blur-2xl p-2 rounded-full border border-white/10">
                    {palettes.map((p, i) => (
                      <button 
                        key={i} 
                        onClick={() => setActivePalette(i)} 
                        className={`w-5 h-5 rounded-full transition-all ${activePalette === i ? 'ring-2 ring-white scale-125' : 'opacity-40 hover:opacity-100'} ${p.bg} border border-white/20`} 
                        title={p.name}
                      />
                    ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PosterStudio;
