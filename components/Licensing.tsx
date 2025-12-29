
import React from 'react';
import { Check, X, Star, Zap, ShieldCheck, ArrowRight } from 'lucide-react';
import { Language, LegalType } from '../types';
import { translations } from '../data/translations';

interface LicensingProps {
  language: Language;
  onApplyStudent: () => void;
  onBuyFreelance: () => void;
  onContactEnterprise: () => void;
  onOpenLegal: (type: LegalType) => void;
}

const Licensing: React.FC<LicensingProps> = ({ 
  language, 
  onApplyStudent, 
  onBuyFreelance, 
  onContactEnterprise,
  onOpenLegal
}) => {
  const t = translations[language].licensing;
  const p = t.plans;

  return (
    <section id="licensing" className="py-24 md:py-32 px-6 md:px-12 bg-white border-b border-black scroll-mt-20 overflow-hidden">
        <div className="max-w-7xl mx-auto">
            <div className="flex flex-col md:flex-row justify-between items-end mb-16 md:mb-24 gap-8">
                <div className="max-w-2xl">
                    <span className="text-[10px] font-bold uppercase tracking-[0.4em] text-brand-accent mb-4 block">
                      {language === 'en' ? 'TRANSPARENT_LICENSE_PROTOCOL' : 'ПРОТОКОЛ_ЛИЦЕНЗИРОВАНИЯ'}
                    </span>
                    <h2 className="text-5xl md:text-8xl font-bold uppercase font-grotesk leading-[0.8] tracking-tighter">{t.title}</h2>
                </div>
                <p className="text-sm md:text-base text-neutral-500 max-w-xs font-mono uppercase leading-relaxed border-l border-black/10 pl-6">
                  {t.desc}
                </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-stretch">
                {/* Student Plan */}
                <div className="p-8 md:p-10 border border-black bg-brand-light/30 flex flex-col hover:shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] transition-all group">
                    <div className="flex justify-between items-start mb-12">
                        <div className="text-[10px] font-bold uppercase border border-black/20 px-3 py-1 bg-white">{p.personal}</div>
                        <ShieldCheck size={20} className="text-neutral-400 group-hover:text-black transition-colors" />
                    </div>
                    
                    <h3 className="text-3xl font-bold font-grotesk uppercase tracking-tighter mb-2">{p.student}</h3>
                    <div className="text-6xl font-bold mb-10 font-grotesk tracking-tighter flex items-start">
                        <span className="text-2xl mt-2 mr-1">-%</span>50
                        <span className="text-xs uppercase font-mono mt-auto mb-2 ml-2 opacity-40">{p.off}</span>
                    </div>

                    <div className="flex-1 space-y-6 mb-12">
                        <div className="h-px bg-black/10 w-full"></div>
                        <ul className="space-y-4 text-[11px] font-bold uppercase tracking-wider">
                            <li className="flex items-center gap-3"><div className="w-1.5 h-1.5 bg-brand-accent rounded-full"></div> {language === 'en' ? 'Personal Projects' : 'Личные проекты'}</li>
                            <li className="flex items-center gap-3"><div className="w-1.5 h-1.5 bg-brand-accent rounded-full"></div> {language === 'en' ? 'Portfolio Use' : 'Для портфолио'}</li>
                            <li className="flex items-center gap-3"><div className="w-1.5 h-1.5 bg-brand-accent rounded-full"></div> {language === 'en' ? '1 User Seat' : '1 пользователь'}</li>
                            <li className="flex items-center gap-3 opacity-20"><X size={14} /> {language === 'en' ? 'Commercial Work' : 'Коммерческие работы'}</li>
                        </ul>
                    </div>

                    <button 
                        onClick={onApplyStudent} 
                        className="w-full py-5 bg-white border border-black font-bold uppercase text-[10px] tracking-widest hover:bg-black hover:text-white transition-all shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-none translate-y-0 active:translate-y-1"
                    >
                        {language === 'en' ? 'Verify Status' : 'Подтвердить статус'}
                    </button>
                </div>

                {/* Freelance / Commercial Plan (Featured) */}
                <div className="p-8 md:p-10 bg-brand-lime border border-black relative overflow-hidden flex flex-col z-20 shadow-[12px_12px_0px_0px_rgba(0,0,0,1)] hover:shadow-none transition-all">
                    {/* Decorative Background Noise */}
                    <div className="absolute inset-0 opacity-[0.05] pointer-events-none" style={{backgroundImage: "url('https://grainy-gradients.vercel.app/noise.svg')"}}></div>
                    
                    <div className="flex justify-between items-start mb-12 relative z-10">
                        <div className="text-[10px] font-bold uppercase bg-black text-brand-lime px-4 py-1">{p.popular}</div>
                        <Zap size={24} className="text-black fill-black" />
                    </div>
                    
                    <h3 className="text-4xl font-bold font-grotesk uppercase tracking-tighter mb-2 relative z-10">{p.freelance}</h3>
                    <div className="text-7xl font-bold mb-10 font-grotesk tracking-tighter relative z-10">
                        <span className="text-3xl mt-2 mr-1 font-sans">$</span>45
                        <span className="text-xs uppercase font-mono mt-auto mb-3 ml-2 text-black/40">{p.style}</span>
                    </div>

                    <div className="flex-1 space-y-6 mb-12 relative z-10">
                        <div className="h-px bg-black/20 w-full"></div>
                        <ul className="space-y-4 text-[11px] font-bold uppercase tracking-wider">
                            <li className="flex items-center gap-3"><Check size={16} strokeWidth={3} /> {language === 'en' ? 'Client Projects' : 'Клиентские проекты'}</li>
                            <li className="flex items-center gap-3"><Check size={16} strokeWidth={3} /> {language === 'en' ? 'Print, Web & Social' : 'Принт, Веб и Соцсети'}</li>
                            <li className="flex items-center gap-3"><Check size={16} strokeWidth={3} /> {language === 'en' ? 'Up to 5 Users' : 'До 5 пользователей'}</li>
                            <li className="flex items-center gap-3"><Check size={16} strokeWidth={3} /> {language === 'en' ? 'Embedding Allowed' : 'Встраивание разрешено'}</li>
                        </ul>
                    </div>

                    <button 
                        onClick={onBuyFreelance} 
                        className="w-full py-6 bg-black text-white font-bold uppercase text-xs hover:bg-brand-accent transition-all flex items-center justify-center gap-3 group relative z-10"
                    >
                        {language === 'en' ? 'Purchase License' : 'Купить лицензию'} 
                        <Star size={14} className="group-hover:rotate-180 transition-transform duration-500 fill-white" />
                    </button>
                </div>

                {/* Enterprise Plan */}
                <div className="p-8 md:p-10 border border-black bg-brand-light/30 flex flex-col hover:shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] transition-all group">
                    <div className="flex justify-between items-start mb-12">
                        <div className="text-[10px] font-bold uppercase border border-black/20 px-3 py-1 bg-white">{p.corporate}</div>
                        <div className="w-5 h-5 bg-black text-white flex items-center justify-center text-[10px] font-bold">∞</div>
                    </div>
                    
                    <h3 className="text-3xl font-bold font-grotesk uppercase tracking-tighter mb-2">{p.enterprise}</h3>
                    <div className="text-5xl lg:text-6xl font-bold mb-10 font-grotesk tracking-tighter uppercase">
                        {p.talk}
                    </div>

                    <div className="flex-1 space-y-6 mb-12">
                        <div className="h-px bg-black/10 w-full"></div>
                        <ul className="space-y-4 text-[11px] font-bold uppercase tracking-wider">
                            <li className="flex items-center gap-3"><div className="w-1.5 h-1.5 bg-black rounded-full"></div> {language === 'en' ? 'Unlimited Users' : 'Безлимитные пользователи'}</li>
                            <li className="flex items-center gap-3"><div className="w-1.5 h-1.5 bg-black rounded-full"></div> {language === 'en' ? 'App & Broadcasting' : 'Приложения и вещание'}</li>
                            <li className="flex items-center gap-3"><div className="w-1.5 h-1.5 bg-black rounded-full"></div> {language === 'en' ? 'Unlimited Pageviews' : 'Безлимитные просмотры'}</li>
                            <li className="flex items-center gap-3"><div className="w-1.5 h-1.5 bg-black rounded-full"></div> {language === 'en' ? 'Dedicated Support' : 'Выделенная поддержка'}</li>
                        </ul>
                    </div>

                    <button 
                        onClick={onContactEnterprise} 
                        className="w-full py-5 bg-white border border-black font-bold uppercase text-[10px] tracking-widest hover:bg-black hover:text-white transition-all shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-none translate-y-0 active:translate-y-1"
                    >
                        {language === 'en' ? 'Request Quote' : 'Запросить расчет'}
                    </button>
                </div>
            </div>

            <div className="mt-20 flex flex-col md:flex-row justify-between items-center p-8 border border-black bg-neutral-900 text-white gap-8 shadow-[12px_12px_0px_0px_rgba(212,255,0,1)]">
                <div className="flex items-center gap-6">
                    <div className="w-12 h-12 bg-brand-lime flex items-center justify-center text-black font-bold text-xl flex-shrink-0">!</div>
                    <div>
                        <div className="text-xs font-bold uppercase tracking-widest text-brand-lime">{language === 'en' ? 'Custom Agreements' : 'Индивидуальные соглашения'}</div>
                        <div className="text-[10px] font-mono text-neutral-400 mt-1 uppercase max-w-md">{language === 'en' ? 'Standard EULA applies to all purchases unless otherwise specified. Volume discounts available.' : 'Стандартное EULA применяется ко всем покупкам. Доступны объемные скидки.'}</div>
                    </div>
                </div>
                <div className="flex gap-8">
                    <button 
                      onClick={() => onOpenLegal('eula')}
                      className="group flex items-center gap-2 text-[10px] font-bold uppercase border-b border-brand-lime pb-1 hover:text-brand-lime transition-colors"
                    >
                      {language === 'en' ? 'Read EULA' : 'Читать EULA'} <ArrowRight size={10} className="group-hover:translate-x-1 transition-transform" />
                    </button>
                    <button 
                      onClick={() => onOpenLegal('faq')}
                      className="group flex items-center gap-2 text-[10px] font-bold uppercase border-b border-brand-lime pb-1 hover:text-brand-lime transition-colors"
                    >
                      {language === 'en' ? 'F.A.Q.' : 'Частые вопросы'} <ArrowRight size={10} className="group-hover:translate-x-1 transition-transform" />
                    </button>
                </div>
            </div>
        </div>
    </section>
  );
};

export default Licensing;
