
import React, { useState, useRef, useEffect } from 'react';
import { Scaling, Layers, MousePointer2, RefreshCw, Sliders, Activity } from 'lucide-react';
import { fonts } from '../data/fonts';
import { Language } from '../types';
import { translations } from '../data/translations';

interface VariableSandboxProps {
  language: Language;
}

const VariableSandbox: React.FC<VariableSandboxProps> = ({ language }) => {
  const t = translations[language].sandbox;
  const [weight, setWeight] = useState(400);
  const [tracking, setTracking] = useState(0);
  const [slant, setSlant] = useState(0);
  const [activeFontIndex, setActiveFontIndex] = useState(0);
  const [isFluidMode, setIsFluidMode] = useState(true);
  const containerRef = useRef<HTMLDivElement>(null);
  
  const currentFont = fonts[activeFontIndex];

  useEffect(() => {
    if (!isFluidMode) return;

    const handleMouseMove = (e: MouseEvent) => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      
      const x = (e.clientX - rect.left) / rect.width;
      const y = (e.clientY - rect.top) / rect.height;

      if (x >= 0 && x <= 1 && y >= 0 && y <= 1) {
        setWeight(Math.round(100 + x * 800));
        setTracking(Math.round(-5 + y * 30));
        setSlant(Math.round(x * 12));
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [isFluidMode]);

  const cycleFont = () => {
    setActiveFontIndex((prev) => (prev + 1) % fonts.length);
  };

  return (
    <section id="sandbox" className="bg-brand-black text-white border-b border-white/10 overflow-hidden py-24 px-6 md:px-12 relative group scroll-mt-20" ref={containerRef}>
      
      {/* UI Controls Overlay */}
      <div className="absolute top-8 left-8 flex flex-col gap-3 z-20">
         <div className="flex items-center gap-3 text-[10px] font-mono uppercase bg-brand-accent text-white px-4 py-2 shadow-lg">
            <Scaling size={12} /> {t.weight}: {weight}
         </div>
         <div className="flex items-center gap-3 text-[10px] font-mono uppercase bg-brand-lime text-black px-4 py-2 shadow-lg">
            <Layers size={12} /> {t.tracking}: {tracking}px
         </div>
         <button 
           onClick={cycleFont}
           aria-label={language === 'en' ? `Change typeface. Current: ${currentFont.name}` : `Сменить шрифт. Сейчас: ${currentFont.name}`}
           className="flex items-center gap-3 text-[10px] font-mono uppercase bg-white text-black px-4 py-2 hover:bg-brand-accent hover:text-white transition-colors cursor-pointer shadow-lg"
         >
            <RefreshCw size={12} aria-hidden="true" /> {t.typeface}: {currentFont.name}
         </button>
      </div>
      
      <div className="absolute bottom-8 right-8 flex flex-col items-end gap-3 z-20">
         <button 
           onClick={() => setIsFluidMode(!isFluidMode)}
           aria-pressed={isFluidMode}
           aria-label={isFluidMode ? (language === 'en' ? 'Turn off fluid mode' : 'Выключить живой режим') : (language === 'en' ? 'Turn on fluid mode' : 'Включить живой режим')}
           className={`flex items-center gap-3 text-[10px] font-mono uppercase px-4 py-2 border transition-all ${isFluidMode ? 'bg-brand-lime text-black border-brand-lime' : 'bg-transparent text-white border-white/20'}`}
         >
            <Activity size={12} className={isFluidMode ? "animate-pulse" : ""} aria-hidden="true" /> {isFluidMode ? (language === 'en' ? 'Fluid Mode On' : 'Живой режим: ВКЛ') : (language === 'en' ? 'Fluid Mode Off' : 'Живой режим: ВЫКЛ')}
         </button>
         <div className="text-[10px] font-mono uppercase text-neutral-500">
            <MousePointer2 size={12} className="inline mr-2" aria-hidden="true" /> {t.interactive}
         </div>
      </div>

      <div className="flex flex-col items-center justify-center min-h-[60vh] select-none text-center">
        <h2 
          className={`text-[12vw] md:text-[14vw] leading-[0.85] uppercase transition-all duration-150 ease-out ${currentFont.className}`}
          style={{ 
            fontWeight: weight,
            letterSpacing: `${tracking}px`,
            fontStyle: slant > 5 ? 'italic' : 'normal',
          }}
        >
          {language === 'en' ? (
            <>{currentFont.name.split(' ')[0]}<br/>FORMS</>
          ) : (
            <>ФОРМЫ<br/>{currentFont.name.split(' ')[0]}</>
          )}
        </h2>
        
        {!isFluidMode && (
          <div className="mt-12 w-full max-w-md space-y-6">
            <div className="space-y-2">
              <div className="flex justify-between text-[10px] uppercase font-mono opacity-50">
                <span id="sandbox-weight-label">{t.weight}</span>
                <span>{weight}</span>
              </div>
              <input 
                type="range" min="100" max="900" value={weight} 
                onChange={(e) => setWeight(Number(e.target.value))} 
                aria-labelledby="sandbox-weight-label"
                className="w-full accent-brand-accent h-1 bg-neutral-800 rounded-lg appearance-none cursor-pointer" 
              />
            </div>
            <div className="space-y-2">
              <div className="flex justify-between text-[10px] uppercase font-mono opacity-50">
                <span id="sandbox-tracking-label">{t.tracking}</span>
                <span>{tracking}px</span>
              </div>
              <input 
                type="range" min="-10" max="40" value={tracking} 
                onChange={(e) => setTracking(Number(e.target.value))} 
                aria-labelledby="sandbox-tracking-label"
                className="w-full accent-brand-lime h-1 bg-neutral-800 rounded-lg appearance-none cursor-pointer" 
              />
            </div>
          </div>
        )}

        <div className="mt-16 flex gap-12 items-center">
            <div className="flex flex-col items-center">
                <div className="text-[10px] font-mono uppercase text-neutral-500 mb-2">{t.structure}</div>
                <div className="w-32 h-0.5 bg-neutral-800 relative">
                    <div className="absolute top-0 left-0 h-full bg-brand-accent transition-all duration-300" style={{ width: `${(weight-100)/8}%` }}></div>
                </div>
            </div>
             <div className="flex flex-col items-center">
                <div className="text-[10px] font-mono uppercase text-neutral-500 mb-2">{t.rhythm}</div>
                <div className="w-32 h-0.5 bg-neutral-800 relative">
                    <div className="absolute top-0 left-0 h-full bg-brand-lime transition-all duration-300" style={{ width: `${(tracking+10)*2}%` }}></div>
                </div>
            </div>
        </div>
      </div>
    </section>
  );
};

export default VariableSandbox;
