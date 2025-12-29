
import React from 'react';
import { Instagram, Twitter, Mail } from 'lucide-react';
import { Language, LegalType } from '../types';
import { translations } from '../data/translations';

interface FooterProps {
  language: Language;
  onSubscribe: () => void;
  onOpenLegal: (type: LegalType) => void;
}

const Footer: React.FC<FooterProps> = ({ language, onSubscribe, onOpenLegal }) => {
  const t = translations[language].footer;
  const nav = translations[language].nav;

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    const element = document.getElementById(id);
    if (element) {
      const offset = 80;
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = element.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      const offsetPosition = elementPosition - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  return (
    <footer className="bg-white text-black">
         <div className="grid grid-cols-1 md:grid-cols-4 border-b border-black">
            <div className="p-10 border-b md:border-b-0 md:border-r border-black">
               <h4 className="font-bold uppercase mb-6 text-xs tracking-widest text-neutral-400">{t.sitemap}</h4>
               <ul className="space-y-4 text-sm font-bold uppercase">
                 <li><a href="#typefaces" onClick={(e) => handleNavClick(e, 'typefaces')} className="hover:text-brand-accent transition-colors block">{nav.typefaces}</a></li>
                 <li><a href="#licensing" onClick={(e) => handleNavClick(e, 'licensing')} className="hover:text-brand-accent transition-colors block">{nav.licensing}</a></li>
                 <li><a href="#showcase" onClick={(e) => handleNavClick(e, 'showcase')} className="hover:text-brand-accent transition-colors block">{nav.showcase}</a></li>
                 <li><a href="#services" onClick={(e) => handleNavClick(e, 'services')} className="hover:text-brand-accent transition-colors block">{nav.services}</a></li>
                 <li><a href="#about" onClick={(e) => handleNavClick(e, 'about')} className="hover:text-brand-accent transition-colors block">{nav.about}</a></li>
               </ul>
            </div>
            <div className="p-10 border-b md:border-b-0 md:border-r border-black">
               <h4 className="font-bold uppercase mb-6 text-xs tracking-widest text-neutral-400">{t.connect}</h4>
               <ul className="space-y-4 text-sm font-bold uppercase">
                 <li className="flex items-center gap-3"><Instagram size={18} /> <a href="https://www.instagram.com/kutsevstudio/" target="_blank" rel="noopener noreferrer" className="hover:text-brand-accent transition-colors">Instagram</a></li>
                 <li className="flex items-center gap-3"><Twitter size={18} /> <a href="#" className="hover:text-brand-accent transition-colors">Twitter</a></li>
                 <li className="flex items-center gap-3"><Mail size={18} /> <a href="#" className="hover:text-brand-accent transition-colors">Email</a></li>
               </ul>
            </div>
            <div className="col-span-1 md:col-span-2 p-10 bg-black text-white flex flex-col justify-between">
               <div>
                 <h4 className="font-bold uppercase mb-4 text-xs tracking-widest text-brand-lime">{t.newsletter}</h4>
                 <p className="text-sm text-neutral-400 mb-8 max-w-sm font-mono">{t.newsletterDesc}</p>
               </div>
               <div className="flex border-b border-white pb-2 group/input">
                 <input type="email" placeholder="EMAIL" className="bg-transparent w-full outline-none text-white placeholder-neutral-600 uppercase text-xl font-bold font-grotesk" />
                 <button onClick={onSubscribe} className="text-brand-lime font-bold uppercase text-sm hover:text-white transition-colors whitespace-nowrap">
                   {t.signup}
                 </button>
               </div>
            </div>
         </div>
         <div className="p-6 flex flex-col md:flex-row justify-between items-center text-[10px] uppercase font-bold tracking-widest bg-brand-light">
            <div className="flex flex-col md:flex-row items-center gap-4 md:gap-8">
                <div>© {new Date().getFullYear()} {t.rights}</div>
                <a 
                  href="https://kutsev.studio" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="hover:text-brand-accent transition-colors"
                >
                  Made with Kutsev Studio
                </a>
            </div>
            <div className="mt-2 md:mt-0 flex gap-6">
                <button onClick={() => onOpenLegal('privacy')} className="hover:text-brand-accent uppercase">{t.privacy}</button>
                <button onClick={() => onOpenLegal('terms')} className="hover:text-brand-accent uppercase">{t.terms}</button>
                <button onClick={() => onOpenLegal('eula')} className="hover:text-brand-accent uppercase">{t.eula}</button>
            </div>
         </div>
      </footer>
  );
};

export default Footer;
