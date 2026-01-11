
import React, { useState, useEffect } from 'react';
import { Font, Language } from '../types';
import { translations } from '../data/translations';
import { AlignLeft, AlignCenter, AlignRight, Type, MoveVertical, RefreshCcw, Layers, Scaling } from 'lucide-react';

interface FontTesterProps {
  activeFont: Font;
  language: Language;
}

const FontTester: React.FC<FontTesterProps> = ({ activeFont, language }) => {
  const t = translations[language].lab;
  const defaultText = activeFont.previewText;
  const [text, setText] = useState(defaultText);
  const [fontSize, setFontSize] = useState(80);
  const [letterSpacing, setLetterSpacing] = useState(0);
  const [lineHeight, setLineHeight] = useState(1.0);
  const [weight, setWeight] = useState(400);
  const [align, setAlign] = useState<'left' | 'center' | 'right'>('center');
  const [darkMode, setDarkMode] = useState(true);

  // Reset text when font changes
  useEffect(() => {
    setText(activeFont.previewText);
  }, [activeFont]);

  const handleReset = () => {
    setFontSize(80);
    setLetterSpacing(0);
    setLineHeight(1.0);
    setWeight(400);
    setAlign('center');
    setText(activeFont.previewText);
  };

  return (
    <section id="tester" className={`border-b border-black transition-colors duration-500 ${darkMode ? 'bg-brand-black text-brand-light' : 'bg-white text-black'}`}>
      
      {/* Controls Header */}
      <div className="grid grid-cols-1 xl:grid-cols-12 border-b border-neutral-800">
        
        {/* Info Column */}
        <div className="xl:col-span-3 p-4 md:p-6 border-b xl:border-b-0 xl:border-r border-neutral-800 flex flex-col justify-center bg-neutral-900/10">
            <h2 className="text-[9px] md:text-[10px] uppercase font-mono mb-2 md:mb-3 opacity-60 tracking-widest flex items-center gap-2">
                <div className="w-1.5 h-1.5 md:w-2 md:h-2 bg-brand-lime rounded-full animate-pulse"></div>
                {t.title}
            </h2>
            <div className="text-2xl md:text-3xl font-bold font-grotesk">{activeFont.name}</div>
            <div className="text-xs md:text-sm opacity-60 mt-1 font-mono">
              {activeFont.styleCount} {language === 'en' ? 'Styles' : 'Начертаний'} • {activeFont.family}
            </div>
        </div>

        {/* Controls Column */}
        <div className="xl:col-span-9 p-4 md:p-6 flex flex-wrap gap-x-4 md:gap-x-8 gap-y-4 md:gap-y-6 items-center">
           
           {/* Size */}
           <div className="flex flex-col gap-1.5 md:gap-2 min-w-[120px] md:min-w-[140px] flex-1">
              <div className="flex justify-between text-[8px] md:text-[10px] uppercase opacity-60 font-mono tracking-wider">
                 <span className="flex items-center gap-1"><Scaling size={9} className="md:hidden" /><Scaling size={10} className="hidden md:block" /> {t.size}</span>
                 <span>{fontSize}px</span>
              </div>
              <input 
                type="range" min="12" max="300" value={fontSize} 
                onChange={(e) => setFontSize(Number(e.target.value))}
                aria-label={`${t.size}: ${fontSize}px`}
                className="w-full accent-brand-lime h-1 bg-neutral-700/50 rounded-lg appearance-none cursor-pointer hover:bg-neutral-600 transition-colors"
              />
           </div>

           {/* Weight */}
           <div className="flex flex-col gap-2 min-w-[140px] flex-1">
              <div className="flex justify-between text-[10px] uppercase opacity-60 font-mono tracking-wider">
                 <span className="flex items-center gap-1"><Layers size={10} /> {t.weight}</span>
                 <span>{weight}</span>
              </div>
              <input 
                type="range" min="100" max="900" step="100" value={weight} 
                onChange={(e) => setWeight(Number(e.target.value))}
                aria-label={`${t.weight}: ${weight}`}
                className="w-full accent-brand-lime h-1 bg-neutral-700/50 rounded-lg appearance-none cursor-pointer hover:bg-neutral-600 transition-colors"
              />
           </div>

           {/* Spacing */}
           <div className="flex flex-col gap-2 min-w-[140px] flex-1">
              <div className="flex justify-between text-[10px] uppercase opacity-60 font-mono tracking-wider">
                 <span className="flex items-center gap-1"><MoveVertical size={10} className="rotate-90" /> {t.tracking}</span>
                 <span>{letterSpacing}px</span>
              </div>
              <input 
                type="range" min="-10" max="20" step="0.5" value={letterSpacing} 
                onChange={(e) => setLetterSpacing(Number(e.target.value))}
                aria-label={`${t.tracking}: ${letterSpacing}px`}
                className="w-full accent-brand-lime h-1 bg-neutral-700/50 rounded-lg appearance-none cursor-pointer hover:bg-neutral-600 transition-colors"
              />
           </div>

           {/* Line Height */}
            <div className="flex flex-col gap-2 min-w-[140px] flex-1">
              <div className="flex justify-between text-[10px] uppercase opacity-60 font-mono tracking-wider">
                 <span className="flex items-center gap-1"><MoveVertical size={10} /> {t.leading}</span>
                 <span>{lineHeight}</span>
              </div>
              <input 
                type="range" min="0.8" max="2" step="0.1" value={lineHeight} 
                onChange={(e) => setLineHeight(Number(e.target.value))}
                aria-label={`${t.leading}: ${lineHeight}`}
                className="w-full accent-brand-lime h-1 bg-neutral-700/50 rounded-lg appearance-none cursor-pointer hover:bg-neutral-600 transition-colors"
              />
           </div>
            
            <div className="h-8 w-px bg-neutral-800 mx-2 hidden lg:block"></div>

            {/* Alignment */}
           <div className="flex items-center border border-neutral-700 rounded-md overflow-hidden bg-neutral-900" role="group" aria-label={language === 'en' ? 'Text alignment' : 'Выравнивание текста'}>
              <button 
                onClick={() => setAlign('left')} 
                aria-pressed={align === 'left'}
                aria-label={language === 'en' ? 'Align left' : 'По левому краю'}
                className={`p-2 transition-colors ${align === 'left' ? 'bg-brand-lime text-black' : 'text-neutral-400 hover:text-white'}`}
              >
                <AlignLeft size={16} />
              </button>
              <button 
                onClick={() => setAlign('center')} 
                aria-pressed={align === 'center'}
                aria-label={language === 'en' ? 'Align center' : 'По центру'}
                className={`p-2 transition-colors ${align === 'center' ? 'bg-brand-lime text-black' : 'text-neutral-400 hover:text-white'}`}
              >
                <AlignCenter size={16} />
              </button>
              <button 
                onClick={() => setAlign('right')} 
                aria-pressed={align === 'right'}
                aria-label={language === 'en' ? 'Align right' : 'По правому краю'}
                className={`p-2 transition-colors ${align === 'right' ? 'bg-brand-lime text-black' : 'text-neutral-400 hover:text-white'}`}
              >
                <AlignRight size={16} />
              </button>
           </div>

            {/* Toggles */}
           <div className="flex items-center gap-2 ml-auto">
             <button 
               onClick={() => setDarkMode(!darkMode)}
               className={`p-2 rounded-full transition-colors border ${darkMode ? 'border-neutral-700 text-neutral-400 hover:text-white' : 'border-neutral-300 text-neutral-600 hover:text-black'}`}
               aria-label={darkMode ? (language === 'en' ? 'Switch to light mode' : 'Переключить на светлую тему') : (language === 'en' ? 'Switch to dark mode' : 'Переключить на темную тему')}
               title={t.dark}
              >
               <RefreshCcw size={16} className={darkMode ? "" : "rotate-180"} />
             </button>
             
             <button 
               onClick={handleReset}
               aria-label={language === 'en' ? 'Reset controls' : 'Сбросить настройки'}
               className="text-[10px] uppercase font-bold tracking-widest hover:text-brand-accent transition-colors ml-4"
             >
               {t.reset}
             </button>
           </div>
        </div>
      </div>

      {/* Test Area */}
      <div className="min-h-[60vh] p-8 lg:p-12 flex items-center justify-center overflow-hidden relative">
        {/* Background Grid for precision feel */}
        <div className={`absolute inset-0 opacity-[0.05] pointer-events-none ${darkMode ? 'bg-[linear-gradient(to_right,#ffffff_1px,transparent_1px),linear-gradient(to_bottom,#ffffff_1px,transparent_1px)]' : 'bg-[linear-gradient(to_right,#000000_1px,transparent_1px),linear-gradient(to_bottom,#000000_1px,transparent_1px)]'}`} style={{backgroundSize: '40px 40px'}}></div>
        
        <textarea
            value={text}
            onChange={(e) => setText(e.target.value)}
            spellCheck={false}
            placeholder={t.typing}
            aria-label={language === 'en' ? 'Font preview test area' : 'Область тестирования шрифта'}
            className={`
                w-full h-full bg-transparent resize-none outline-none z-10 relative cursor-text
                ${activeFont.className} 
                ${darkMode ? 'placeholder-neutral-800' : 'placeholder-neutral-200'}
            `}
            style={{
                fontSize: `${fontSize}px`,
                letterSpacing: `${letterSpacing}px`,
                lineHeight: lineHeight,
                fontWeight: weight,
                textAlign: align,
            }}
        />
        
        {/* Helper overlay when empty */}
        {text === '' && (
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-20">
                <span className="font-mono text-xs uppercase tracking-[0.5em]">{t.typing}</span>
            </div>
        )}
      </div>
    </section>
  );
};

export default FontTester;
