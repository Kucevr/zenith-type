
import React from 'react';
import { Globe, ArrowDown } from 'lucide-react';
import { Language } from '../types';
import { translations } from '../data/translations';

interface AboutProps {
  language: Language;
  fontCount: number;
  onBuyBundle: () => void;
}

const About: React.FC<AboutProps> = ({ language, fontCount, onBuyBundle }) => {
  const t = translations[language].about;

  return (
    <section id="about" className="grid grid-cols-1 md:grid-cols-2 border-b border-black scroll-mt-20">
       <div className="bg-black text-white p-12 md:p-24 flex flex-col justify-center items-start border-b md:border-b-0 md:border-r border-neutral-800 relative overflow-hidden group">
           <div className="absolute inset-0 bg-brand-accent opacity-0 group-hover:opacity-10 transition-opacity duration-700"></div>
           <h3 className="text-5xl md:text-8xl font-bold uppercase leading-[0.8] mb-8 font-grotesk relative z-10">
              {language === 'en' ? <>We are<br/><span className="text-brand-lime">Zenith</span></> : <>Мы —<br/><span className="text-brand-lime">Zenith</span></>}
           </h3>
           <p className="max-w-md text-lg font-medium mb-10 text-neutral-300 relative z-10 leading-relaxed">
             {t.desc}
           </p>
           <div className="grid grid-cols-3 gap-8 w-full relative z-10">
              <div>
                <div className="text-4xl font-bold text-brand-lime font-mono">{fontCount}</div>
                <div className="text-xs uppercase text-neutral-500 mt-2">{language === 'en' ? 'Families' : 'Семейств'}</div>
              </div>
              <div>
                <div className="text-4xl font-bold text-brand-lime font-mono">12k+</div>
                <div className="text-xs uppercase text-neutral-500 mt-2">{language === 'en' ? 'Downloads' : 'Загрузок'}</div>
              </div>
              <div>
                <div className="text-4xl font-bold text-brand-lime font-mono">85</div>
                <div className="text-xs uppercase text-neutral-500 mt-2">{language === 'en' ? 'Countries' : 'Стран'}</div>
              </div>
           </div>
       </div>
       
       <div className="bg-brand-light p-12 md:p-24 flex flex-col justify-center items-start relative overflow-hidden">
           <Globe className="mb-8 text-black" size={64} strokeWidth={1} />
           <h3 className="text-4xl md:text-5xl font-bold uppercase leading-none mb-6 text-black">{t.bundle}</h3>
           <p className="max-w-md text-neutral-600 mb-8 font-mono text-sm leading-relaxed">{t.bundleDesc}</p>
           <button onClick={onBuyBundle} className="bg-black text-white px-10 py-5 rounded-full uppercase font-bold text-sm hover:bg-brand-lime hover:text-black transition-all border border-black relative z-10 flex items-center gap-3">
             {t.full} ($250) <ArrowDown className="-rotate-90" size={16} />
           </button>
       </div>
    </section>
  );
};

export default About;
