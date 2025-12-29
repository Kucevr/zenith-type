
import React, { useEffect } from 'react';
import { X, Shield, FileText, Scale, HelpCircle } from 'lucide-react';
import { Language } from '../types';

export type LegalType = 'privacy' | 'terms' | 'eula' | 'faq' | null;

interface LegalModalProps {
  type: LegalType;
  language: Language;
  onClose: () => void;
}

const LegalModal: React.FC<LegalModalProps> = ({ type, language, onClose }) => {
  useEffect(() => {
    if (type) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [type]);

  if (!type) return null;

  const content = {
    en: {
      privacy: {
        title: 'Privacy Policy',
        icon: <Shield className="text-brand-accent" />,
        sections: [
          { title: 'Data Sovereignty', text: 'We believe your data belongs to you. Zenith Type Foundry collects only the essential telemetry required to validate your license key and ensure font security.' },
          { title: 'Encryption Standards', text: 'All transaction data is processed via 256-bit SSL encryption. We do not store credit card information on our servers.' },
          { title: 'Third-Party Disclosure', text: 'We never sell, trade, or otherwise transfer your personally identifiable information to outside parties.' }
        ]
      },
      terms: {
        title: 'Terms of Use',
        icon: <Scale className="text-brand-accent" />,
        sections: [
          { title: 'Intellectual Property', text: 'All font software, designs, and website content are the exclusive property of Zenith Type Foundry. Unauthorized reproduction is strictly prohibited.' },
          { title: 'User Conduct', text: 'Users are prohibited from attempting to reverse-engineer font software or bypass licensing restrictions.' },
          { title: 'Service Availability', text: 'We strive for 99.9% uptime for our font delivery CDN, but do not guarantee uninterrupted service during maintenance windows.' }
        ]
      },
      eula: {
        title: 'End User License Agreement',
        icon: <FileText className="text-brand-accent" />,
        sections: [
          { title: 'Permitted Installations', text: 'A standard license allows for installation on up to 5 devices owned by the licensee. For larger teams, please upgrade to a Corporate License.' },
          { title: 'Web Embedding', text: 'Self-hosting of WOFF2 files is permitted for the domains specified at the time of purchase. Third-party hosting is not allowed.' },
          { title: 'Derivative Works', text: 'You may not modify the font outlines or create derivative typefaces based on Zenith designs without a custom modification license.' }
        ]
      },
      faq: {
        title: 'Frequently Asked Questions',
        icon: <HelpCircle className="text-brand-accent" />,
        sections: [
          { title: 'Variable Font Support', text: 'All our latest releases include variable font files (.ttf) with axes for Weight, Width, and Slant.' },
          { title: 'Trial Fonts Policy', text: 'Trial fonts contain a limited character set (A-Z, a-z, 0-9) and are intended for internal testing and mockups only.' },
          { title: 'Global Language Support', text: 'Our Pro library supports over 100+ languages, including full Latin Extended, Cyrillic, and Greek character sets.' }
        ]
      }
    },
    ru: {
      privacy: {
        title: 'Конфиденциальность',
        icon: <Shield className="text-brand-accent" />,
        sections: [
          { title: 'Суверенитет данных', text: 'Мы считаем, что ваши данные принадлежат вам. Zenith собирает только необходимую телеметрию для проверки лицензионных ключей.' },
          { title: 'Стандарты шифрования', text: 'Все данные транзакций обрабатываются с использованием 256-битного SSL-шифрования. Мы не храним данные карт на наших серверах.' },
          { title: 'Раскрытие информации', text: 'Мы никогда не продаем и не передаем вашу личную информацию сторонним организациям.' }
        ]
      },
      terms: {
        title: 'Условия использования',
        icon: <Scale className="text-brand-accent" />,
        sections: [
          { title: 'Интеллектуальная собственность', text: 'Все программное обеспечение шрифтов и контент сайта являются исключительной собственностью Zenith Type Foundry.' },
          { title: 'Поведение пользователя', text: 'Пользователям запрещено пытаться декомпилировать шрифты или обходить лицензионные ограничения.' },
          { title: 'Доступность сервиса', text: 'Мы стремимся к аптайму 99.9% для нашей CDN доставки шрифтов, но не гарантируем отсутствие перерывов.' }
        ]
      },
      eula: {
        title: 'Лицензия (EULA)',
        icon: <FileText className="text-brand-accent" />,
        sections: [
          { title: 'Разрешенные установки', text: 'Стандартная лицензия позволяет установку на 5 устройств. Для больших команд требуется корпоративная лицензия.' },
          { title: 'Веб-встраивание', text: 'Разрешено самостоятельное размещение WOFF2 файлов на доменах, указанных при покупке.' },
          { title: 'Производные работы', text: 'Запрещено изменять контуры шрифта или создавать производные гарнитуры на основе дизайнов Zenith.' }
        ]
      },
      faq: {
        title: 'Частые вопросы',
        icon: <HelpCircle className="text-brand-accent" />,
        sections: [
          { title: 'Поддержка Variable Fonts', text: 'Все наши новые релизы включают вариативные файлы с осями веса, ширины и наклона.' },
          { title: 'Политика пробных шрифтов', text: 'Триальные версии содержат ограниченный набор знаков и предназначены только для внутреннего тестирования.' },
          { title: 'Языковая поддержка', text: 'Наша библиотека Pro поддерживает более 100 языков, включая расширенную латиницу, кириллицу и греческий.' }
        ]
      }
    }
  };

  const currentContent = content[language][type];

  const getTheme = () => {
    switch(type) {
      case 'privacy': return { accent: 'text-brand-accent', bg: 'bg-brand-accent/5', border: 'border-black', iconBg: 'bg-brand-accent' };
      case 'terms': return { accent: 'text-black', bg: 'bg-neutral-100', border: 'border-black', iconBg: 'bg-black' };
      case 'eula': return { accent: 'text-brand-accent', bg: 'bg-brand-light', border: 'border-black', iconBg: 'bg-black' };
      case 'faq': return { accent: 'text-black', bg: 'bg-brand-lime/20', border: 'border-black', iconBg: 'bg-brand-lime' };
      default: return { accent: 'text-brand-accent', bg: 'bg-brand-light', border: 'border-black', iconBg: 'bg-black' };
    }
  };

  const theme = getTheme();

  return (
    <div 
      className="fixed inset-0 z-[200] flex items-center justify-center p-2 md:p-8 bg-black/80 backdrop-blur-md animate-in fade-in duration-300"
      onClick={onClose}
    >
      <div 
        className={`bg-white text-black w-full max-w-4xl h-full md:h-auto md:max-h-[90vh] overflow-hidden flex flex-col rounded-none border-2 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] md:shadow-[16px_16px_0px_0px_rgba(0,0,0,1)] animate-in zoom-in-95 duration-300`}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className={`p-4 md:p-10 border-b-2 border-black flex justify-between items-center ${theme.bg} relative overflow-hidden`}>
          {/* Decorative Noise */}
          <div className="absolute inset-0 opacity-[0.03] pointer-events-none" style={{backgroundImage: "url('https://grainy-gradients.vercel.app/noise.svg')"}}></div>
          
          <div className="flex items-center gap-3 md:gap-6 relative z-10">
            <div className={`w-10 h-10 md:w-14 md:h-14 ${theme.iconBg} ${type === 'faq' ? 'text-black' : 'text-white'} flex items-center justify-center border-2 border-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] md:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]`}>
              {React.cloneElement(currentContent.icon as React.ReactElement, { 
                className: type === 'faq' ? "text-black" : "text-white", 
                size: 20,
                strokeWidth: 2.5
              })}
            </div>
            <div>
              <div className="hidden md:flex items-center gap-3 mb-1">
                <span className="text-[10px] font-bold uppercase tracking-[0.3em] opacity-50 font-mono">Protocol_v2.5</span>
                <div className="h-px w-8 bg-black/20"></div>
                <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-brand-accent font-mono">{type}</span>
              </div>
              <h2 className="text-2xl md:text-5xl font-bold uppercase tracking-tighter font-grotesk leading-none">{currentContent.title}</h2>
            </div>
          </div>
          
          <button 
            onClick={onClose}
            className="group flex items-center gap-4 relative z-10"
          >
            <span className="text-[10px] font-bold uppercase tracking-[0.3em] opacity-0 group-hover:opacity-40 transition-all duration-300 hidden md:block font-mono">Close_Window</span>
            <div className="w-12 h-12 border-2 border-black flex items-center justify-center hover:bg-black hover:text-white transition-all bg-white shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] group-hover:shadow-none translate-y-0 group-active:translate-y-1">
              <X size={24} strokeWidth={3} />
            </div>
          </button>
        </div>

        {/* Content Area */}
        <div className="flex-1 overflow-y-auto custom-scrollbar flex flex-col md:flex-row">
          {/* Sidebar Info */}
          <div className="w-full md:w-64 border-b md:border-b-0 md:border-r-2 border-black p-8 bg-neutral-50 space-y-8">
            <div>
              <h5 className="text-[10px] font-bold uppercase tracking-widest text-neutral-400 mb-4">Document Info</h5>
              <div className="space-y-3 font-mono text-[10px] uppercase">
                <div className="flex justify-between border-b border-black/5 pb-2">
                  <span className="opacity-50">ID:</span>
                  <span className="font-bold">ZT_{type?.toUpperCase()}</span>
                </div>
                <div className="flex justify-between border-b border-black/5 pb-2">
                  <span className="opacity-50">Issued:</span>
                  <span className="font-bold">2025.12.29</span>
                </div>
                <div className="flex justify-between border-b border-black/5 pb-2">
                  <span className="opacity-50">Status:</span>
                  <span className="text-brand-lime bg-black px-1 font-bold">Active</span>
                </div>
              </div>
            </div>

            <div className="pt-8 border-t border-black/10">
              <div className="aspect-square w-full bg-white border-2 border-black p-4 flex items-center justify-center">
                <div className="w-full h-full border border-black/5 flex flex-col items-center justify-center gap-2 opacity-20">
                   <div className="w-full h-1 bg-black"></div>
                   <div className="w-full h-1 bg-black"></div>
                   <div className="w-full h-1 bg-black"></div>
                   <div className="w-full h-1 bg-black"></div>
                   <span className="text-[8px] font-bold">STAMP_HERE</span>
                </div>
              </div>
            </div>
          </div>

          {/* Main Text */}
          <div className="flex-1 p-8 md:p-12 space-y-16">
            {currentContent.sections.map((section, idx) => (
              <div key={idx} className="relative">
                <div className="absolute -left-6 md:-left-10 top-0 text-[10px] font-mono font-bold opacity-20">
                  [{idx + 1}]
                </div>
                <div className="space-y-4">
                  <h4 className="text-lg font-bold uppercase tracking-tight font-grotesk flex items-center gap-3">
                    <span className="w-2 h-2 bg-brand-accent"></span>
                    {section.title}
                  </h4>
                  <p className="text-base md:text-lg leading-relaxed text-neutral-600 font-medium max-w-2xl">
                    {section.text}
                  </p>
                </div>
              </div>
            ))}
            
            <div className="pt-12 border-t-2 border-black flex flex-col md:flex-row justify-between items-start md:items-center gap-8">
              <div className="font-mono text-[10px] uppercase space-y-1">
                <p className="text-neutral-400">© 2025 Zenith Type Foundry / Legal Dept.</p>
                <p className="font-bold">All rights reserved. Zurich, Switzerland.</p>
              </div>
              <div className="flex gap-2">
                {[1,2,3].map(i => <div key={i} className="w-6 h-6 border border-black/10 flex items-center justify-center text-[8px] font-bold">{i}</div>)}
              </div>
            </div>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="p-6 md:p-8 border-t-2 border-black bg-white flex flex-col md:flex-row gap-4">
          <button 
            onClick={() => window.print()}
            className="px-8 py-4 border-2 border-black font-bold uppercase text-[10px] tracking-widest hover:bg-neutral-100 transition-all shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-none translate-y-0 active:translate-y-1"
          >
            {language === 'en' ? 'Download PDF' : 'Скачать PDF'}
          </button>
          <button 
            onClick={onClose}
            className="flex-1 py-4 bg-black text-white font-bold uppercase text-xs tracking-[0.2em] hover:bg-brand-accent transition-all shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-none translate-y-0 active:translate-y-1"
          >
            {language === 'en' ? 'I Accept These Terms' : 'Я принимаю условия'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default LegalModal;
