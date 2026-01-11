
import React, { useState, memo } from 'react';
import { Menu, ShoppingBag, X, Globe, Star } from 'lucide-react';
import Marquee from './Marquee';
import { Language } from '../types';
import { translations } from '../data/translations';

interface HeaderProps {
  language: Language;
  setLanguage: (lang: Language) => void;
  cartCount: number;
  onCartToggle: () => void;
}

const Header: React.FC<HeaderProps> = ({ language, setLanguage, cartCount, onCartToggle }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const t = translations[language].nav;

  const navItems = [
    { name: t.typefaces, id: 'typefaces' },
    { name: t.showcase, id: 'showcase' },
    { name: t.sandbox, id: 'sandbox' },
    { name: t.studio, id: 'studio' },
    { name: t.services, id: 'services' },
    { name: t.licensing, id: 'licensing' },
    { name: t.about, id: 'about' }
  ];

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    const element = document.getElementById(id);
    if (element) {
      const offset = 80; // Header height
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = element.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      const offsetPosition = elementPosition - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
      setIsMenuOpen(false);
    }
  };

  return (
    <>
      <div className="bg-brand-black text-brand-lime text-[9px] md:text-xs font-bold uppercase py-1.5 md:py-2 border-b border-white tracking-widest z-[60] relative overflow-hidden">
        <Marquee 
          text={language === 'en' 
            ? "• NEW RELEASE: ZENITH SANS v2.0 • 50% OFF STUDENT LICENSES • FREE TRIAL FONTS • WORLDWIDE USE • " 
            : "• НОВЫЙ РЕЛИЗ: ZENITH SANS v2.0 • СКИДКА 50% ДЛЯ СТУДЕНТОВ • БЕСПЛАТНЫЕ ТРИАЛЫ • МИРОВАЯ ЛИЦЕНЗИЯ • "} 
          repeat={6} 
        />
      </div>
      <header className="sticky top-0 z-50 bg-brand-light/90 backdrop-blur-md border-b border-black h-14 md:h-20">
        <div className="grid grid-cols-2 md:grid-cols-12 h-full items-center">
          
          <div className="col-span-1 md:col-span-3 h-full border-r border-black flex items-center px-3 md:px-6 bg-brand-light">
            <a 
              href="#" 
              onClick={(e) => { e.preventDefault(); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
              className="flex items-center gap-2 md:gap-3 group"
            >
              <div className="w-4 h-4 md:w-6 md:h-6 bg-brand-accent rounded-none group-hover:rotate-45 transition-transform duration-300"></div>
              <span className="font-bold text-base md:text-2xl tracking-tighter uppercase font-grotesk">
                Zenith®
              </span>
            </a>
          </div>

          <div className="hidden md:flex col-span-7 h-full items-center justify-center px-6 border-r border-black">
             <nav className="flex gap-6 lg:gap-10 text-[10px] font-bold uppercase tracking-widest">
               {navItems.map((item) => (
                 <a 
                    key={item.id}
                    href={`#${item.id}`}
                    onClick={(e) => handleNavClick(e, item.id)}
                    className="hover:text-brand-accent transition-colors relative group py-2"
                  >
                    {item.name}
                    <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-brand-accent group-hover:w-full transition-all duration-300"></span>
                 </a>
               ))}
             </nav>
          </div>

          <div 
            className="col-span-1 md:col-span-2 h-full flex items-center justify-end md:justify-between px-4 md:px-6 bg-white md:bg-brand-light hover:bg-white transition-colors cursor-pointer group"
          >
            <div className="flex items-center gap-4">
               {/* Language Switcher */}
               <div className="flex items-center border border-black/10 rounded-full overflow-hidden text-[10px] font-bold font-mono" role="group" aria-label={language === 'en' ? 'Select language' : 'Выбрать язык'}>
                  <button 
                    onClick={(e) => { e.stopPropagation(); setLanguage('en'); }}
                    aria-pressed={language === 'en'}
                    aria-label="English"
                    className={`px-3 py-1 transition-colors ${language === 'en' ? 'bg-black text-white' : 'hover:bg-neutral-100'}`}
                  >
                    EN
                  </button>
                  <button 
                    onClick={(e) => { e.stopPropagation(); setLanguage('ru'); }}
                    aria-pressed={language === 'ru'}
                    aria-label="Русский"
                    className={`px-3 py-1 transition-colors ${language === 'ru' ? 'bg-black text-white' : 'hover:bg-neutral-100'}`}
                  >
                    RU
                  </button>
               </div>

               <button 
                onClick={onCartToggle} 
                aria-label={`${t.cart} (${cartCount})`}
                className="hidden md:flex items-center gap-2 text-xs font-bold uppercase"
               >
                <span className="group-hover:text-brand-accent transition-colors whitespace-nowrap">{t.cart} ({cartCount})</span>
               </button>
            </div>

            <div className="flex md:hidden items-center gap-4">
               <div className="relative" onClick={(e) => { e.stopPropagation(); onCartToggle(); }} role="button" aria-label={`${t.cart} (${cartCount})`}>
                 <ShoppingBag size={20} aria-hidden="true" />
                 {cartCount > 0 && (
                   <span className="absolute -top-2 -right-2 bg-brand-accent text-white w-4 h-4 rounded-full text-[9px] flex items-center justify-center">
                     {cartCount}
                   </span>
                 )}
               </div>
               <button 
                onClick={(e) => { e.stopPropagation(); setIsMenuOpen(!isMenuOpen); }}
                aria-label={isMenuOpen ? (language === 'en' ? 'Close menu' : 'Закрыть меню') : (language === 'en' ? 'Open menu' : 'Открыть меню')}
                aria-expanded={isMenuOpen}
               >
                 {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
               </button>
            </div>
            <div className="hidden md:block">
                <Globe size={20} strokeWidth={1.5} className="group-hover:rotate-180 transition-transform duration-700" aria-hidden="true" />
            </div>
          </div>
        </div>
      </header>

      {isMenuOpen && (
        <div className="fixed inset-0 top-0 bg-brand-light z-[100] p-0 flex flex-col md:hidden animate-in slide-in-from-top duration-500" role="dialog" aria-modal="true">
            <div className="flex justify-between items-center p-6 border-b border-black">
                <span className="font-bold text-xl uppercase font-grotesk">{language === 'en' ? 'Menu' : 'Меню'}</span>
                <button 
                  onClick={() => setIsMenuOpen(false)}
                  aria-label={language === 'en' ? 'Close menu' : 'Закрыть меню'}
                >
                  <X size={24} />
                </button>
            </div>
            <div className="flex flex-col flex-1 overflow-y-auto">
                {navItems.map((item) => (
                  <a 
                    key={item.id}
                    href={`#${item.id}`} 
                    onClick={(e) => handleNavClick(e, item.id)}
                    className="text-4xl font-grotesk font-bold uppercase border-b border-black p-8 hover:bg-brand-lime hover:pl-12 transition-all flex justify-between items-center group"
                  >
                    {item.name}
                    <Star className="opacity-0 group-hover:opacity-100 transition-opacity" fill="black" />
                  </a>
                ))}
            </div>
            <div className="p-6 border-t border-black bg-white">
                <button 
                  onClick={() => { setIsMenuOpen(false); onCartToggle(); }}
                  className="w-full bg-black text-brand-lime py-5 text-xl font-bold uppercase hover:bg-brand-accent text-white transition-colors flex justify-between px-6 shadow-xl"
                >
                    <span>{t.checkout}</span>
                    <span>({cartCount})</span>
                </button>
            </div>
        </div>
      )}
    </>
  );
};

export default memo(Header);
