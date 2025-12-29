import React, { useState, useEffect } from 'react';
import { Font } from '../types';
import { ArrowUpRight, ArrowRight, Plus, X, ShoppingCart, Download, Info, Type, Maximize2, MousePointer2 } from 'lucide-react';

interface FontGridProps {
  fonts: Font[];
  onFontSelect: (font: Font) => void;
  selectedFontId: string;
  onAddToCart: (font: Font) => void;
  language?: 'en' | 'ru';
}

const FontGrid: React.FC<FontGridProps> = ({ fonts, onFontSelect, selectedFontId, onAddToCart, language = 'en' }) => {
  const [hoveredFont, setHoveredFont] = useState<string | null>(null);
  const [modalFont, setModalFont] = useState<Font | null>(null);
  const [compareFont, setCompareFont] = useState<Font | null>(null);
  const [customText, setCustomText] = useState<string>('');
  const [modalFontSize, setModalFontSize] = useState<number>(120);
  const [modalTheme, setModalTheme] = useState<'light' | 'dark' | 'brand'>('light');
  const [activePangram, setActivePangram] = useState<number>(0);
  const [otFeatures, setOtFeatures] = useState({
    liga: true,
    tnum: false,
    case: false,
    ss01: false,
    ss02: false,
    frac: false,
    ordn: false,
    zero: false
  });

  const toggleFeature = (feature: keyof typeof otFeatures) => {
    setOtFeatures(prev => ({ ...prev, [feature]: !prev[feature] }));
  };

  const featureSettings = Object.entries(otFeatures)
    .filter(([_, active]) => active)
    .map(([feat]) => `"${feat}" 1`)
    .join(', ') || 'normal';

  const pangrams = {
    en: [
      "The quick brown fox jumps over the lazy dog.",
      "Pack my box with five dozen liquor jugs.",
      "How quickly daft jumping zebras vex.",
      "Sphinx of black quartz, judge my vow."
    ],
    ru: [
      "Съешь ещё этих мягких французских булок, да выпей чаю.",
      "Широкая электрификация южных губерний даст мощный толчок подъёму сельского хозяйства.",
      "В чащах юга жил бы цитрус? Да, но фальшивый экземпляр!",
      "Экс-граф путь вёл через дебри к зиккурату."
    ]
  };

  // Body scroll lock
  useEffect(() => {
    if (modalFont) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [modalFont]);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 border-b border-black">
      {fonts.map((font, index) => {
        const isSelected = selectedFontId === font.id;
        const isHovered = hoveredFont === font.id;
        
        return (
          <div 
            key={font.id} 
            className={`
              group relative flex flex-col border-b border-r border-black min-h-[450px] cursor-pointer transition-all duration-300
              ${index % 3 === 2 ? 'lg:border-r-0' : ''} 
              ${index % 2 === 1 ? 'md:border-r-0 lg:border-r' : ''}
              ${isSelected ? 'bg-brand-black text-white' : 'bg-white hover:bg-brand-light'}
            `}
            onClick={() => onFontSelect(font)}
            onMouseEnter={() => setHoveredFont(font.id)}
            onMouseLeave={() => setHoveredFont(null)}
          >
            {/* Header of Card */}
            <div className={`p-6 flex justify-between items-start border-b border-black/10 ${isSelected ? 'border-white/20' : ''}`}>
              <div>
                <h3 className="text-3xl font-bold leading-none tracking-tight">{font.name}</h3>
                <span className={`text-[10px] uppercase mt-2 block font-mono ${isSelected ? 'text-neutral-400' : 'text-neutral-500'}`}>
                    {font.styleCount} Styles • {font.designer}
                </span>
              </div>
              <button 
                onClick={(e) => {
                  e.stopPropagation();
                  setModalFont(font);
                }}
                className={`
                  group/btn relative p-2 -m-2 transition-all duration-500 
                  ${isHovered ? 'translate-x-1 -translate-y-1' : ''}
                `}
                title={language === 'en' ? 'View Details' : 'Подробнее'}
              >
                <div className="absolute inset-0 bg-brand-accent/20 rounded-full scale-0 group-hover/btn:scale-100 transition-transform duration-300"></div>
                <ArrowUpRight 
                  size={28} 
                  className={`
                    relative z-10 transition-colors duration-300
                    ${isHovered ? 'text-brand-accent' : isSelected ? 'text-white' : 'text-black'}
                  `} 
                />
              </button>
            </div>

            {/* Preview Area */}
            <div className="flex-1 p-4 flex items-center justify-center overflow-hidden relative">
               <span 
                 className={`
                   text-7xl md:text-8xl leading-[0.8] text-center break-words w-full transition-all duration-500 select-none
                   ${font.className}
                   ${isHovered ? 'scale-110' : 'scale-100'}
                 `}
               >
                 {isHovered ? (
                    <span className="text-brand-accent">Aa</span>
                 ) : (
                    <>
                        {font.name.split(' ')[0].substring(0, 2)}
                        <br />
                        {font.name.split(' ')[1] ? font.name.split(' ')[1].substring(0, 2) : font.id === '6' ? 'Gt' : 'Rg'}
                    </>
                 )}
               </span>
            </div>

            {/* Quick Add Button - Absolute Positioned */}
            <button 
              onClick={(e) => {
                e.stopPropagation();
                onAddToCart(font);
              }}
              className={`
                absolute bottom-20 right-6 w-10 h-10 rounded-full flex items-center justify-center border transition-all duration-300 z-10
                ${isSelected 
                  ? 'border-white text-white hover:bg-white hover:text-black' 
                  : 'border-black text-black hover:bg-black hover:text-white translate-y-4 opacity-0 group-hover:opacity-100 group-hover:translate-y-0'}
              `}
              title="Add to Cart"
            >
              <Plus size={20} />
            </button>

            {/* Footer of Card */}
            <div className={`p-6 border-t border-black/10 ${isSelected ? 'border-white/20' : ''} flex justify-between items-end`}>
               <div className="flex flex-wrap gap-1 max-w-[70%]">
                 {font.tags.map(tag => (
                   <span 
                    key={tag} 
                    className={`text-[9px] uppercase border px-2 py-1 rounded-full ${isSelected ? 'border-white/30 text-neutral-300' : 'border-black/20 text-neutral-600'}`}
                   >
                     {tag}
                   </span>
                 ))}
               </div>
               <div className="text-xl font-bold font-mono">
                 ${font.price}
               </div>
            </div>
            
            {/* Selection Indicator */}
             {isSelected && (
                <div className="absolute top-0 left-0 w-1.5 h-full bg-brand-lime"></div>
            )}
          </div>
        );
      })}

      {/* Font Detail Modal */}
      {modalFont && (
        <div 
          className="fixed inset-0 bg-black/95 backdrop-blur-2xl z-[100] flex items-center justify-center p-0 md:p-4 lg:p-8 animate-in fade-in duration-500"
          onClick={() => {
            setModalFont(null);
            setCustomText('');
          }}
        >
          <div 
            className="bg-white text-black w-full max-w-[1600px] h-full md:h-[95vh] overflow-hidden flex flex-col md:flex-row rounded-none md:rounded-2xl shadow-[0_0_100px_rgba(0,0,0,0.5)] animate-in zoom-in-95 slide-in-from-bottom-10 duration-500 relative border border-white/10"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Left Side: Interactive Specimen (Main Stage) */}
            <div className={`w-full md:w-[68%] flex flex-col border-b md:border-b-0 md:border-r transition-colors duration-500 overflow-hidden ${
              modalTheme === 'dark' ? 'bg-[#0A0A0A] border-white/10' : 
              modalTheme === 'brand' ? 'bg-[#CCFF00] border-black/10' : 
              'bg-[#FBFBFB] border-black/5'
            }`}>
              {/* Stage Header: Controls */}
              <div className={`px-8 py-4 border-b flex flex-wrap items-center justify-between gap-6 ${
                modalTheme === 'dark' ? 'border-white/10' : 'border-black/5'
              }`}>
                <div className="flex items-center gap-8 overflow-x-auto no-scrollbar py-2">
                  {/* Pangram Selector */}
                  <div className="flex items-center gap-3">
                    <span className={`text-[9px] uppercase tracking-[0.2em] font-bold opacity-40 ${modalTheme === 'dark' ? 'text-white' : 'text-black'}`}>Pangram</span>
                    <div className={`flex gap-1 p-1 rounded-full ${modalTheme === 'dark' ? 'bg-white/5' : 'bg-black/5'}`}>
                      {[1, 2, 3, 4].map((num, idx) => (
                        <button
                          key={num}
                          onClick={() => {
                            setActivePangram(idx);
                            setCustomText('');
                          }}
                          className={`w-7 h-7 rounded-full text-[10px] font-bold transition-all ${
                            activePangram === idx && !customText 
                              ? (modalTheme === 'dark' ? 'bg-white text-black' : 'bg-black text-white') 
                              : (modalTheme === 'dark' ? 'text-white/40 hover:text-white hover:bg-white/10' : 'text-black/40 hover:text-black hover:bg-black/10')
                          }`}
                        >
                          {num}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Font Size Slider */}
                  <div className="flex items-center gap-4 min-w-[180px]">
                    <span className={`text-[9px] uppercase tracking-[0.2em] font-bold opacity-40 ${modalTheme === 'dark' ? 'text-white' : 'text-black'}`}>Size</span>
                    <input 
                      type="range" 
                      min="12" 
                      max="300" 
                      value={modalFontSize}
                      onChange={(e) => setModalFontSize(parseInt(e.target.value))}
                      className={`w-24 accent-current cursor-pointer ${modalTheme === 'dark' ? 'text-white' : 'text-black'}`}
                    />
                    <span className={`text-[10px] font-mono w-8 font-bold ${modalTheme === 'dark' ? 'text-white' : 'text-black'}`}>{modalFontSize}px</span>
                  </div>

                  {/* Theme Switcher */}
                  <div className="flex items-center gap-3">
                    <span className={`text-[9px] uppercase tracking-[0.2em] font-bold opacity-40 ${modalTheme === 'dark' ? 'text-white' : 'text-black'}`}>Theme</span>
                    <div className="flex items-center gap-2">
                      <button 
                        onClick={() => setModalTheme('light')}
                        className={`w-5 h-5 rounded-full border transition-all ${modalTheme === 'light' ? 'ring-2 ring-offset-2 ring-black scale-110' : 'opacity-50 hover:opacity-100'} bg-white border-black/10`}
                      />
                      <button 
                        onClick={() => setModalTheme('dark')}
                        className={`w-5 h-5 rounded-full border transition-all ${modalTheme === 'dark' ? 'ring-2 ring-offset-2 ring-white scale-110' : 'opacity-50 hover:opacity-100'} bg-[#111] border-white/20`}
                      />
                      <button 
                        onClick={() => setModalTheme('brand')}
                        className={`w-5 h-5 rounded-full border transition-all ${modalTheme === 'brand' ? 'ring-2 ring-offset-2 ring-black scale-110' : 'opacity-50 hover:opacity-100'} bg-[#CCFF00] border-black/10`}
                      />
                    </div>
                  </div>
                </div>

                {/* OT Features */}
                <div className="flex items-center gap-2 overflow-x-auto no-scrollbar py-2">
                  {Object.entries(otFeatures).map(([feature, active]) => (
                    <button
                      key={feature}
                      onClick={() => toggleFeature(feature as keyof typeof otFeatures)}
                      className={`text-[9px] uppercase tracking-widest font-bold px-3 py-1.5 rounded-md border transition-all whitespace-nowrap ${
                        active 
                          ? (modalTheme === 'dark' ? 'bg-white text-black border-white' : 'bg-black text-white border-black') 
                          : (modalTheme === 'dark' ? 'border-white/10 text-white/30 hover:text-white hover:border-white/30' : 'border-black/10 text-black/30 hover:text-black hover:border-black/30')
                      }`}
                      title={feature === 'liga' ? 'Standard Ligatures' : 
                             feature === 'tnum' ? 'Tabular Figures' : 
                             feature === 'case' ? 'Case-Sensitive Forms' : 
                             feature === 'ss01' ? 'Stylistic Set 01' : 
                             feature === 'ss02' ? 'Stylistic Set 02' : 
                             feature === 'frac' ? 'Fractions' : 
                             feature === 'ordn' ? 'Ordinals' : 
                             feature === 'zero' ? 'Slashed Zero' : feature}
                    >
                      {feature}
                    </button>
                  ))}
                </div>
              </div>

              {/* Interactive Area */}
              <div className="flex-1 overflow-y-auto p-8 md:p-16 custom-scrollbar">
                <div className={`relative group min-h-[400px] ${compareFont ? 'grid grid-cols-1 lg:grid-cols-2 gap-12' : ''}`}>
                  <div className="flex flex-col gap-4">
                    {compareFont && (
                      <div className={`text-[10px] font-bold uppercase tracking-widest mb-2 ${modalTheme === 'dark' ? 'text-white/40' : 'text-black/40'}`}>
                        {modalFont.name}
                      </div>
                    )}
                    <textarea
                      value={customText || pangrams[language as keyof typeof pangrams][activePangram]}
                      onChange={(e) => setCustomText(e.target.value)}
                      spellCheck={false}
                      className={`w-full bg-transparent border-none focus:ring-0 resize-none p-0 leading-[0.9] tracking-tight overflow-hidden transition-all duration-300 ${
                        modalTheme === 'dark' ? 'text-white' : 'text-black'
                      }`}
                      style={{
                        fontFamily: modalFont.name,
                        fontSize: `${modalFontSize}px`,
                        fontFeatureSettings: featureSettings,
                        minHeight: compareFont ? '300px' : '400px'
                      }}
                    />
                  </div>

                  {compareFont && (
                    <div className="flex flex-col gap-4 border-t lg:border-t-0 lg:border-l border-black/10 pt-8 lg:pt-0 lg:pl-12">
                      <div className="flex items-center justify-between mb-2">
                        <div className={`text-[10px] font-bold uppercase tracking-widest ${modalTheme === 'dark' ? 'text-white/40' : 'text-black/40'}`}>
                          {compareFont.name}
                        </div>
                        <button 
                          onClick={() => setCompareFont(null)}
                          className={`p-1 rounded-full hover:bg-black/5 ${modalTheme === 'dark' ? 'text-white/40 hover:text-white' : 'text-black/40 hover:text-black'}`}
                        >
                          <X size={14} />
                        </button>
                      </div>
                      <textarea
                        value={customText || pangrams[language as keyof typeof pangrams][activePangram]}
                        onChange={(e) => setCustomText(e.target.value)}
                        spellCheck={false}
                        className={`w-full bg-transparent border-none focus:ring-0 resize-none p-0 leading-[0.9] tracking-tight overflow-hidden transition-all duration-300 ${
                          modalTheme === 'dark' ? 'text-white' : 'text-black'
                        }`}
                        style={{
                          fontFamily: compareFont.name,
                          fontSize: `${modalFontSize}px`,
                          fontFeatureSettings: featureSettings,
                          minHeight: '300px'
                        }}
                      />
                    </div>
                  )}
                </div>

                {/* Character Set Section (Only if not comparing) */}
                {!compareFont && (
                  <div className={`mt-32 pt-16 border-t ${
                    modalTheme === 'dark' ? 'border-white/10' : 'border-black/5'
                  }`}>
                    <div className="flex items-center justify-between mb-12">
                      <h4 className={`text-[10px] uppercase tracking-[0.4em] font-bold opacity-30 ${modalTheme === 'dark' ? 'text-white' : 'text-black'}`}>
                        Complete Character Set
                      </h4>
                      <span className={`text-[9px] font-mono opacity-20 ${modalTheme === 'dark' ? 'text-white' : 'text-black'}`}>
                        Latin Extended + Cyrillic Support
                      </span>
                    </div>
                    <div 
                      className={`grid grid-cols-6 md:grid-cols-10 lg:grid-cols-12 gap-2 text-2xl md:text-4xl ${
                        modalTheme === 'dark' ? 'text-white' : 'text-black'
                      }`}
                      style={{ fontFamily: modalFont.name }}
                    >
                      {"ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()_+-=[]{}|;':\",./<>?".split('').map((char, i) => (
                        <div key={i} className={`flex items-center justify-center aspect-square rounded-lg transition-all cursor-default hover:scale-125 ${
                          modalTheme === 'dark' ? 'hover:bg-white/10' : 'hover:bg-black/5'
                        }`}>
                          {char}
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Stage Footer */}
              <div className={`px-8 py-6 border-t flex items-center justify-between ${
                modalTheme === 'dark' ? 'bg-white/5 border-white/10 text-white' : 'bg-black/[0.02] border-black/5 text-black'
              }`}>
                <div className="flex items-center gap-10">
                  <div className="flex flex-col gap-1">
                    <span className="text-[8px] uppercase tracking-[0.2em] font-bold opacity-40">Format</span>
                    <span className="text-[10px] font-bold">OTF, WOFF2, Variable</span>
                  </div>
                  <div className="w-px h-6 bg-current opacity-10"></div>
                  <div className="flex flex-col gap-1">
                    <span className="text-[8px] uppercase tracking-[0.2em] font-bold opacity-40">Glyphs</span>
                    <span className="text-[10px] font-bold">840+ Characters</span>
                  </div>
                  <div className="w-px h-6 bg-current opacity-10"></div>
                  <div className="flex flex-col gap-1">
                    <span className="text-[8px] uppercase tracking-[0.2em] font-bold opacity-40">Language</span>
                    <span className="text-[10px] font-bold">90+ Supported</span>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  {!compareFont && (
                    <div className="relative group/compare">
                      <button 
                        className={`flex items-center gap-2 px-4 py-2 rounded-xl border text-[10px] font-bold uppercase tracking-widest transition-all ${
                          modalTheme === 'dark' ? 'border-white/10 hover:bg-white hover:text-black' : 'border-black/5 hover:bg-black hover:text-white'
                        }`}
                      >
                        <Type size={14} /> {language === 'en' ? 'Compare' : 'Сравнить'}
                      </button>
                      <div className={`absolute bottom-full right-0 mb-2 w-64 max-h-64 overflow-y-auto rounded-xl border shadow-2xl opacity-0 invisible group-hover/compare:opacity-100 group-hover/compare:visible transition-all z-50 ${
                        modalTheme === 'dark' ? 'bg-neutral-900 border-white/10' : 'bg-white border-black/10'
                      }`}>
                        <div className="p-3 border-b border-black/5 text-[9px] font-bold uppercase opacity-40">Select Font to Compare</div>
                        {fonts.filter(f => f.id !== modalFont.id).map(f => (
                          <button
                            key={f.id}
                            onClick={() => setCompareFont(f)}
                            className={`w-full text-left px-4 py-3 text-xs font-bold hover:bg-brand-lime hover:text-black transition-colors ${
                              modalTheme === 'dark' ? 'text-white' : 'text-black'
                            }`}
                          >
                            {f.name}
                          </button>
                        ))}
                      </div>
                    </div>
                  )}
                  <button className={`p-3 rounded-xl border transition-all hover:scale-110 ${
                    modalTheme === 'dark' ? 'border-white/10 hover:bg-white hover:text-black' : 'border-black/5 hover:bg-black hover:text-white'
                  }`}>
                    <Maximize2 size={16} />
                  </button>
                </div>
              </div>
            </div>

            {/* Right Side: Details & Purchase (Sidebar) */}
            <div className="w-full md:w-[32%] flex flex-col bg-white relative overflow-hidden">
              {/* Close Button */}
              <button 
                onClick={() => {
                  setModalFont(null);
                  setCustomText('');
                }}
                className="absolute top-6 right-6 p-3 hover:bg-black hover:text-white rounded-xl transition-all z-50 group shadow-sm border border-black/5 bg-white"
              >
                <X size={18} className="group-hover:rotate-90 transition-transform duration-500" />
              </button>

              <div className="flex-1 overflow-y-auto p-8 md:p-12 space-y-12 custom-scrollbar">
                {/* Header Info */}
                <div className="space-y-6">
                  <div className="flex flex-wrap gap-2">
                    {modalFont.tags.map(tag => (
                      <span key={tag} className="px-3 py-1 bg-black text-white text-[9px] font-bold uppercase tracking-widest rounded-full">
                        {tag}
                      </span>
                    ))}
                  </div>
                  <h2 className="text-6xl font-bold tracking-tighter leading-[0.8] py-2" style={{ fontFamily: modalFont.name }}>
                    {modalFont.name}
                  </h2>
                  <p className="text-sm text-neutral-500 leading-relaxed font-medium">
                    {modalFont.description}
                  </p>
                </div>

                {/* Styles & Weights Section */}
                <div className="space-y-6">
                  <div className="flex items-center justify-between">
                    <h4 className="text-[10px] font-bold uppercase tracking-[0.3em] opacity-30">Styles & Weights</h4>
                    <span className="text-[10px] font-mono opacity-20">{modalFont.styles?.length || 0} Styles</span>
                  </div>
                  <div className="grid grid-cols-1 gap-2">
                    {modalFont.styles?.map((style, idx) => (
                      <div 
                        key={idx} 
                        className="flex items-center justify-between p-4 rounded-xl border border-black/5 hover:border-black/20 hover:bg-neutral-50 transition-all group cursor-pointer"
                      >
                        <span className="text-lg" style={{ 
                          fontFamily: modalFont.name,
                          fontWeight: style.weight,
                          fontStyle: style.italic ? 'italic' : 'normal'
                        }}>
                          {style.name}
                        </span>
                        <div className="flex items-center gap-3">
                          <span className="text-[9px] font-mono opacity-0 group-hover:opacity-40 transition-opacity uppercase">
                            {style.weight} {style.italic ? 'Italic' : 'Regular'}
                          </span>
                          <div className="w-1.5 h-1.5 rounded-full bg-black/10 group-hover:bg-brand-accent transition-colors"></div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Meta Grid */}
                <div className="grid grid-cols-2 gap-8 pt-6 border-t border-black/5">
                  <div className="space-y-2">
                    <h4 className="text-[9px] font-bold uppercase tracking-[0.2em] opacity-30">Designer</h4>
                    <p className="font-bold text-sm">{modalFont.designer}</p>
                  </div>
                  <div className="space-y-2">
                    <h4 className="text-[9px] font-bold uppercase tracking-[0.2em] opacity-30">Category</h4>
                    <p className="font-bold text-sm">{modalFont.family}</p>
                  </div>
                  <div className="space-y-2">
                    <h4 className="text-[9px] font-bold uppercase tracking-[0.2em] opacity-30">Release</h4>
                    <p className="font-bold text-sm">Dec 2024</p>
                  </div>
                  <div className="space-y-2">
                    <h4 className="text-[9px] font-bold uppercase tracking-[0.2em] opacity-30">Version</h4>
                    <p className="font-bold text-sm">1.002</p>
                  </div>
                </div>
              </div>

              {/* Sticky Footer in Sidebar */}
              <div className="p-8 border-t border-black/5 bg-white/80 backdrop-blur-md">
                <div className="flex items-center justify-between mb-6">
                  <div>
                    <p className="text-[9px] uppercase tracking-widest font-bold opacity-30 mb-1">Full Family</p>
                    <p className="text-3xl font-bold tracking-tight">{modalFont.price}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-[9px] uppercase tracking-widest font-bold opacity-30 mb-1">License</p>
                    <p className="text-xs font-bold">Desktop + Web + App</p>
                  </div>
                </div>
                <button 
                  onClick={() => onAddToCart(modalFont)}
                  className="w-full bg-black text-white py-5 rounded-2xl font-bold text-sm hover:bg-[#CCFF00] hover:text-black transition-all duration-500 flex items-center justify-center gap-3 group shadow-xl shadow-black/10"
                >
                  <ShoppingCart size={18} />
                  <span>ADD TO CART</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default FontGrid;