
import React from 'react';
import { Font, Language } from '../types';
import { translations } from '../data/translations';
import { MoveRight, ArrowDown } from 'lucide-react';

interface HeroProps {
  language: Language;
  featuredFont: Font;
  onAddToCart: (font: Font) => void;
  onDownloadTrial: () => void;
  totalFonts: number;
}

const Hero: React.FC<HeroProps> = ({ language, featuredFont, onAddToCart, onDownloadTrial, totalFonts }) => {
  const t = translations[language].hero;

  return (
    <section id="hero" className="relative min-h-[85vh] md:min-h-[90vh] flex flex-col justify-between border-b border-black overflow-hidden bg-brand-light scroll-mt-14 md:scroll-mt-20">
      
      <div className="absolute inset-0 grid grid-cols-6 pointer-events-none opacity-[0.03]">
        {[...Array(6)].map((_, i) => (
            <div key={i} className="border-r border-black h-full"></div>
        ))}
        <div className="absolute inset-0 grid grid-rows-6">
            {[...Array(6)].map((_, i) => (
                <div key={i} className="border-b border-black w-full"></div>
            ))}
        </div>
      </div>

      <div className="relative z-10 p-4 md:p-12 flex flex-col md:flex-row justify-between items-start gap-6 md:gap-8 pt-6 md:pt-24">
         <div className="max-w-2xl animate-in slide-in-from-left duration-700">
            <div className="inline-flex items-center gap-2 px-2.5 py-1 border border-black bg-white mb-4 md:mb-6 shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] md:shadow-[3px_3px_0px_0px_rgba(0,0,0,1)]">
                <span className="w-1.5 h-1.5 md:w-2 md:h-2 bg-brand-accent rounded-full animate-pulse"></span>
                <span className="text-[8px] md:text-[10px] font-bold uppercase tracking-widest">{t.system}</span>
            </div>
            <h1 className={`font-bold uppercase tracking-tight leading-[0.85] font-grotesk mb-4 md:mb-6 ${language === 'ru' ? 'text-[2rem] sm:text-4xl md:text-6xl lg:text-7xl' : 'text-[2.5rem] sm:text-5xl md:text-7xl'}`}>
              {language === 'en' ? (
                <>Precision Tools<br/> for <span className="bg-brand-lime px-2 text-black inline-block transform -skew-x-6">Radical</span><br/>Designers</>
              ) : (
                <>Инструменты<br/> для <span className="bg-brand-lime px-2 text-black inline-block transform -skew-x-6">Смелого</span><br/>Дизайна</>
              )}
            </h1>
            <p className="max-w-md text-[10px] md:text-sm font-mono text-neutral-600 leading-relaxed uppercase tracking-tight">
               {t.desc}
            </p>
         </div>
         <div className="hidden md:flex flex-col items-end text-right animate-in slide-in-from-right duration-700">
            <div className="text-xs font-mono uppercase mb-1">{language === 'en' ? 'Berlin, DE' : 'Берлин, ГР'}</div>
            <div className="text-xs font-mono uppercase opacity-50">{language === 'en' ? 'Since 2024' : 'С 2024 года'}</div>
            <div className="mt-4 text-xs font-mono uppercase border border-black px-2 py-1 bg-brand-light">
               {totalFonts} {t.families}
            </div>
         </div>
      </div>

      <div className="relative z-10 w-full overflow-hidden flex items-center justify-center py-4 md:py-0">
         <h2 
           className="text-[20vw] md:text-[18vw] leading-[0.7] font-bold tracking-tighter text-center whitespace-nowrap text-brand-black select-none pointer-events-none opacity-90 will-change-transform"
           style={{ transform: `translateX(calc(var(--scroll-y) * -0.15))` }}
         >
           ZENITH®TYPE
         </h2>
      </div>

      <div className="relative z-10 p-6 md:p-12 flex flex-col md:flex-row justify-between items-end border-t border-transparent pb-10 md:pb-12 gap-6">
         <div className="flex flex-col gap-6 animate-in fade-in duration-1000 delay-300 w-full md:w-auto">
             <div>
                <span className="text-[10px] uppercase font-bold text-neutral-500 block mb-2 tracking-widest">{t.featured}</span>
                <span className={`font-unbounded leading-none block ${language === 'ru' ? 'text-2xl sm:text-3xl md:text-5xl' : 'text-3xl sm:text-4xl md:text-6xl'}`}>
                  {featuredFont.name}
                </span>
             </div>
             <div className="flex flex-col sm:flex-row gap-3 md:gap-4 w-full sm:w-auto">
                <button 
                  onClick={() => onAddToCart(featuredFont)}
                  className="bg-black text-white px-5 md:px-8 py-3 md:py-5 uppercase text-[9px] md:text-xs font-bold hover:bg-brand-accent transition-colors flex items-center justify-center gap-2 shadow-[2px_2px_0px_0px_rgba(212,255,0,1)] md:shadow-[3px_3px_0px_0px_rgba(212,255,0,1)] hover:shadow-none hover:translate-x-[1px] hover:translate-y-[1px] transition-all"
                >
                    {t.purchase} <MoveRight size={12} className="md:hidden" /><MoveRight size={14} className="hidden md:block" />
                </button>
                <button 
                  onClick={onDownloadTrial}
                  className="bg-transparent border border-black text-black px-5 md:px-8 py-3 md:py-5 uppercase text-[9px] md:text-xs font-bold hover:bg-white transition-colors"
                >
                    {t.trial}
                </button>
             </div>
         </div>
         
         <div className="hidden lg:flex items-center gap-2 text-xs font-bold uppercase animate-bounce">
            {t.scroll} <ArrowDown size={16} />
         </div>
      </div>
    </section>
  );
};

export default React.memo(Hero);
