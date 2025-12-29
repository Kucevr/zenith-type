
import React, { useState } from 'react';
import { PenTool, Code, Gem, MoveRight, X, CheckCircle2, Zap, Target, Clock, Globe2, ArrowUpRight, Cpu, Microscope, Layers, Maximize, MousePointer2, FileCode, Scaling } from 'lucide-react';
import { Language } from '../types';
import { translations } from '../data/translations';

interface ServiceDetail {
  id: string;
  title: string;
  icon: React.ReactNode;
  description: string;
  process: { step: string; desc: string }[];
  deliverables: { label: string; icon: React.ReactNode }[];
  timeline: string;
  features: string[];
  stats: { label: string; value: string }[];
}

interface ServicesProps {
  language: Language;
}

const Services: React.FC<ServicesProps> = ({ language }) => {
  const tGlobal = translations[language].services;
  const [activeService, setActiveService] = useState<ServiceDetail | null>(null);
  const [hoveredStep, setHoveredStep] = useState<number | null>(null);

  const serviceDetails: Record<string, ServiceDetail> = {
    custom: {
      id: 'custom',
      title: tGlobal.s01.title,
      icon: <PenTool className="w-12 h-12" />,
      description: tGlobal.s01.desc,
      process: language === 'en' ? [
        { step: '01. Strategy', desc: 'Analyzing brand personality and use cases (UI, Print, Motion).' },
        { step: '02. Sketching', desc: 'Exploring unique DNA through manual and digital experiments.' },
        { step: '03. Development', desc: 'Drawing full character sets with meticulous attention.' },
        { step: '04. Engineering', desc: 'Generating variable axes and mastering the font.' }
      ] : [
        { step: '01. Стратегия', desc: 'Анализ личности бренда и сценариев использования (UI, Принт).' },
        { step: '02. Эскизы', desc: 'Поиск уникальной ДНК через аналоговые и цифровые опыты.' },
        { step: '03. Разработка', desc: 'Отрисовка полных наборов знаков с вниманием к деталям.' },
        { step: '04. Инжиниринг', desc: 'Создание вариативных осей и мастеринг шрифта.' }
      ],
      deliverables: language === 'en' ? [
        { label: 'Desktop & Web Fonts', icon: <Globe2 size={14} /> },
        { label: 'Variable Font Files', icon: <Layers size={14} /> },
        { label: 'Specimen PDF', icon: <FileCode size={14} /> },
        { label: 'Full Commercial License', icon: <Zap size={14} /> }
      ] : [
        { label: 'Десктоп и Веб файлы', icon: <Globe2 size={14} /> },
        { label: 'Вариативные шрифты', icon: <Layers size={14} /> },
        { label: 'Спецификация PDF', icon: <FileCode size={14} /> },
        { label: 'Коммерческая лицензия', icon: <Zap size={14} /> }
      ],
      timeline: language === 'en' ? '8–16 Weeks' : '8–16 недель',
      features: language === 'en' ? ['Unique DNA', 'Variable Tech', 'Global Support'] : ['Уникальная ДНК', 'Вариативность', 'Глобальная поддержка'],
      stats: [
        { label: language === 'en' ? 'Precision' : 'Точность', value: '0.001 units' },
        { label: language === 'en' ? 'Weight Axis' : 'Ось веса', value: '100-900' },
        { label: language === 'en' ? 'Lang Support' : 'Языки', value: '120+' }
      ]
    },
    engineering: {
      id: 'engineering',
      title: tGlobal.s02.title,
      icon: <Code className="w-12 h-12" />,
      description: tGlobal.s02.desc,
      process: language === 'en' ? [
        { step: '01. Audit', desc: 'Reviewing existing font data for technical errors.' },
        { step: '02. Optimization', desc: 'Applying hinting and curve simplification.' },
        { step: '03. Expansion', desc: 'Adding language support (Cyrillic, Greek).' },
        { step: '04. Mastering', desc: 'Final export and naming table optimization.' }
      ] : [
        { step: '01. Аудит', desc: 'Проверка шрифтовых данных на технические ошибки.' },
        { step: '02. Оптимизация', desc: 'Применение хинтинга и упрощение кривых.' },
        { step: '03. Расширение', desc: 'Поддержка языков (Кириллица, Греческий).' },
        { step: '04. Мастеринг', desc: 'Финальный экспорт и оптимизация таблиц.' }
      ],
      deliverables: language === 'en' ? [
        { label: 'Optimized OTF/TTF', icon: <Cpu size={14} /> },
        { label: 'Full Audit Report', icon: <Microscope size={14} /> },
        { label: 'Hinting Logic', icon: <Layers size={14} /> },
        { label: 'Interpolation Data', icon: <Maximize size={14} /> }
      ] : [
        { label: 'Оптимизированные файлы', icon: <Cpu size={14} /> },
        { label: 'Отчет об аудите', icon: <Microscope size={14} /> },
        { label: 'Логика хинтинга', icon: <Layers size={14} /> },
        { label: 'Данные интерполяции', icon: <Maximize size={14} /> }
      ],
      timeline: language === 'en' ? '3–6 Weeks' : '3–6 недель',
      features: language === 'en' ? ['Performance Hinting', 'Cross-Platform', 'Clean Geometry'] : ['Качественный хинтинг', 'Кросс-платформенность', 'Чистая геометрия'],
      stats: [
        { label: language === 'en' ? 'File Size' : 'Размер файла', value: '-35%' },
        { label: language === 'en' ? 'Rendering' : 'Рендеринг', value: '60 FPS' },
        { label: language === 'en' ? 'Hinting' : 'Хинтинг', value: 'Manual' }
      ]
    },
    refinement: {
      id: 'refinement',
      title: tGlobal.s03.title,
      icon: <Gem className="w-12 h-12" />,
      description: tGlobal.s03.desc,
      process: language === 'en' ? [
        { step: '01. Diagnosis', desc: 'Analyzing the logo for visual friction.' },
        { step: '02. Vector Cleanup', desc: 'Reducing anchor points and perfecting handles.' },
        { step: '03. Optical Balance', desc: 'Adjusting weight for legibility at all scales.' },
        { step: '04. Packaging', desc: 'Delivering pixel-perfect assets in all formats.' }
      ] : [
        { step: '01. Диагноз', desc: 'Анализ логотипа на предмет визуального трения.' },
        { step: '02. Очистка вектора', desc: 'Сокращение узлов и совершенствование кривых.' },
        { step: '03. Баланс', desc: 'Настройка веса для читаемости в любых масштабах.' },
        { step: '04. Упаковка', desc: 'Подготовка идеальных активов во всех форматах.' }
      ],
      deliverables: language === 'en' ? [
        { label: 'Refined Vector Set', icon: <Gem size={14} /> },
        { label: 'Construction Sheet', icon: <Target size={14} /> },
        { label: 'Optical Versions', icon: <Scaling size={14} /> },
        { label: 'Brand UI Assets', icon: <MousePointer2 size={14} /> }
      ] : [
        { label: 'Улучшенные векторы', icon: <Gem size={14} /> },
        { label: 'Чертеж конструкции', icon: <Target size={14} /> },
        { label: 'Оптические версии', icon: <Scaling size={14} /> },
        { label: 'Бренд-активы', icon: <MousePointer2 size={14} /> }
      ],
      timeline: language === 'en' ? '2–4 Weeks' : '2–4 недели',
      features: language === 'en' ? ['Subpixel Precision', 'Optical Versatility', 'Standardization'] : ['Высокая точность', 'Оптическая гибкость', 'Стандартизация'],
      stats: [
        { label: language === 'en' ? 'Nodes' : 'Узлы', value: '-60%' },
        { label: language === 'en' ? 'Symmetry' : 'Симметрия', value: '99.9%' },
        { label: language === 'en' ? 'Format' : 'Формат', value: 'SVG/EPS' }
      ]
    }
  };

  const openService = (service: ServiceDetail) => {
    setActiveService(service);
    document.body.style.overflow = 'hidden';
  };

  const closeService = () => {
    setActiveService(null);
    document.body.style.overflow = 'auto';
  };

  return (
    <section id="services" className="bg-white text-black border-b border-black scroll-mt-20">
      <div className="grid grid-cols-1 md:grid-cols-3">
        {Object.values(serviceDetails).map((service, index) => (
          <div 
            key={service.id}
            onClick={() => openService(service)} 
            className={`p-10 md:p-12 border-b md:border-b-0 border-black hover:bg-brand-light transition-all group flex flex-col justify-between min-h-[480px] cursor-pointer ${index < 2 ? 'md:border-r' : ''}`}
          >
            <div>
              <div className="text-4xl font-bold font-mono opacity-20 mb-8 group-hover:text-brand-accent transition-colors">0{index + 1}</div>
              {/* Fix: cast service.icon to any through React.ReactElement to avoid className/strokeWidth type mismatch */}
              {React.isValidElement(service.icon) && React.cloneElement(service.icon as React.ReactElement<any>, { className: 'w-12 h-12 mb-6 group-hover:scale-110 transition-transform origin-left', strokeWidth: 1.5 })}
              <h3 className="text-3xl lg:text-4xl font-bold uppercase font-grotesk mb-4 leading-none tracking-tighter">
                {service.title.split(' ').map((word, i) => <React.Fragment key={i}>{word}<br /></React.Fragment>)}
              </h3>
              <p className="text-neutral-600 font-mono text-[11px] md:text-xs leading-relaxed max-w-[280px] uppercase tracking-tight">
                {service.description}
              </p>
            </div>
            <button className="inline-flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest hover:text-brand-accent transition-colors mt-8">
              {index === 0 ? tGlobal.cta : index === 1 ? tGlobal.audit : tGlobal.cases} <MoveRight size={14} className="group-hover:translate-x-2 transition-transform" />
            </button>
          </div>
        ))}
      </div>

      {activeService && (
        <div className="fixed inset-0 z-[200] flex items-center justify-center animate-in fade-in duration-300">
          <div className="absolute inset-0 bg-black/90 backdrop-blur-xl" onClick={closeService}></div>
          
          <div className="relative w-full h-full md:h-[90dvh] md:w-[95vw] max-w-6xl bg-brand-light text-black flex flex-col overflow-hidden animate-in slide-in-from-bottom shadow-2xl border border-black">
            
            <div className="px-6 py-4 md:px-8 md:py-6 border-b border-black flex justify-between items-center bg-white sticky top-0 z-50">
              <div className="flex items-center gap-4 md:gap-6">
                <div className="p-3 md:p-4 bg-brand-lime text-black border border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
                  {/* Fix: cast activeService.icon to any through React.ReactElement to avoid type mismatch on size prop */}
                  {React.isValidElement(activeService.icon) && React.cloneElement(activeService.icon as React.ReactElement<any>, { size: 24 })}
                </div>
                <div className="flex flex-col">
                  <h2 className="text-xl md:text-4xl font-bold uppercase font-grotesk tracking-tighter leading-none">
                    <span className="opacity-20 text-[9px] md:text-xs block mb-1">SERVICE_PROTOCOL / {activeService.id.toUpperCase()}</span>
                    {activeService.title}
                  </h2>
                </div>
              </div>
              <button onClick={closeService} className="w-10 h-10 md:w-14 md:h-14 border border-black flex items-center justify-center hover:bg-black hover:text-white transition-all">
                <X size={24} />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto no-scrollbar bg-brand-light">
              <div className="grid grid-cols-1 lg:grid-cols-12 min-h-full">
                
                <div className="lg:col-span-5 p-8 md:p-14 border-b lg:border-b-0 lg:border-r border-black bg-brand-light/20 relative">
                  <div className="absolute inset-0 opacity-[0.03] pointer-events-none" style={{backgroundImage: "url('https://grainy-gradients.vercel.app/noise.svg')"}}></div>
                  
                  <div className="relative z-10 space-y-12 md:space-y-16">
                    <div>
                      <span className="text-[10px] font-bold text-brand-accent uppercase tracking-[0.4em] block mb-8">01 / {language === 'en' ? 'OBJECTIVE' : 'ЦЕЛЬ'}</span>
                      <p className="text-xl md:text-3xl font-bold leading-tight font-grotesk uppercase tracking-tighter">
                        {activeService.description}
                      </p>
                    </div>

                    <div className="grid grid-cols-2 gap-3 md:gap-4">
                       {activeService.stats.map((stat, i) => (
                         <div key={i} className="p-4 bg-white border border-black flex flex-col justify-between group hover:bg-black hover:text-white transition-all">
                           <span className="text-[9px] font-bold uppercase opacity-40 mb-2 group-hover:opacity-60">{stat.label}</span>
                           <span className="text-lg md:text-xl font-bold font-mono text-brand-accent group-hover:text-brand-lime transition-colors">{stat.value}</span>
                         </div>
                       ))}
                       <div className="p-4 bg-brand-lime border border-black flex flex-col justify-between">
                         <span className="text-[9px] font-bold uppercase opacity-60 mb-2">{language === 'en' ? 'TIMELINE' : 'СРОКИ'}</span>
                         <span className="text-lg md:text-xl font-bold font-mono">{activeService.timeline}</span>
                       </div>
                    </div>

                    <div>
                      <span className="text-[10px] font-bold text-neutral-400 uppercase tracking-[0.4em] block mb-8">02 / {language === 'en' ? 'DELIVERABLES' : 'РЕЗУЛЬТАТЫ'}</span>
                      <div className="grid grid-cols-1 gap-2">
                        {activeService.deliverables.map((item, i) => (
                          <div key={i} className="flex items-center justify-between p-4 md:p-5 bg-white border border-black group hover:pl-8 transition-all">
                             <div className="flex items-center gap-3 md:gap-4">
                               <div className="text-brand-accent">{item.icon}</div>
                               <span className="text-[10px] md:text-xs font-bold uppercase">{item.label}</span>
                             </div>
                             <CheckCircle2 size={16} className="text-brand-lime opacity-0 group-hover:opacity-100 transition-opacity" />
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

                <div className="lg:col-span-7 bg-white p-8 md:p-14 relative overflow-hidden">
                   <div className="absolute inset-0 opacity-[0.05] pointer-events-none grid grid-cols-6 grid-rows-6">
                      {[...Array(36)].map((_, i) => <div key={i} className="border border-black"></div>)}
                   </div>

                   <div className="relative z-10 h-full flex flex-col">
                      <div className="flex justify-between items-center mb-12">
                        <span className="text-[10px] font-bold text-neutral-400 uppercase tracking-[0.4em]">03 / {language === 'en' ? 'PROCESS_MAP' : 'ПРОЦЕСС'}</span>
                        <div className="flex items-center gap-2">
                           <Clock size={14} className="text-brand-accent" />
                           <span className="text-[9px] font-mono uppercase tracking-widest">{language === 'en' ? 'Iterative Methodology' : 'Методология'}</span>
                        </div>
                      </div>

                      <div className="space-y-4">
                        {activeService.process.map((p, i) => (
                          <div 
                            key={i} 
                            onMouseEnter={() => setHoveredStep(i)}
                            onMouseLeave={() => setHoveredStep(null)}
                            className={`
                              relative p-6 md:p-8 border transition-all duration-500 cursor-default
                              ${hoveredStep === i ? 'bg-brand-black text-white border-black translate-x-2 md:translate-x-4' : 'bg-brand-light/10 border-black/10 hover:border-black'}
                            `}
                          >
                            <div className="flex items-start gap-6 md:gap-8">
                              <div className={`text-3xl md:text-5xl font-bold font-mono leading-none ${hoveredStep === i ? 'text-brand-lime' : 'opacity-20'}`}>
                                {p.step.split('.')[0]}
                              </div>
                              <div className="space-y-2 md:space-y-3">
                                <h5 className={`text-base md:text-xl font-bold uppercase font-grotesk tracking-tight ${hoveredStep === i ? 'text-white' : 'text-black'}`}>
                                  {p.step.split('.')[1]}
                                </h5>
                                <p className={`text-[11px] md:text-sm leading-relaxed font-mono uppercase ${hoveredStep === i ? 'text-neutral-400' : 'text-neutral-500'}`}>
                                  {p.desc}
                                </p>
                              </div>
                            </div>
                            {i < activeService.process.length - 1 && (
                              <div className="absolute -bottom-4 left-10 md:left-12 w-px h-4 bg-black/20 z-0"></div>
                            )}
                          </div>
                        ))}
                      </div>

                      <div className="mt-12 pt-12 md:mt-auto md:pt-16 flex flex-col md:flex-row justify-between items-end gap-8">
                         <div className="space-y-3">
                           <div className="flex items-center gap-2">
                             <Target size={16} className="text-brand-accent" />
                             <span className="text-[10px] md:text-xs font-bold uppercase">{language === 'en' ? 'Technical Guarantee' : 'Гарантия качества'}</span>
                           </div>
                           <p className="text-[9px] font-mono text-neutral-400 max-w-sm uppercase leading-tight">
                             {language === 'en' 
                              ? 'All typographic assets are stress-tested across 48+ rendering environments and legacy systems.'
                              : 'Все активы проходят тестирование в более чем 48 средах рендеринга и старых системах.'}
                           </p>
                         </div>
                         <button className="w-full md:w-auto px-8 md:px-10 py-4 md:py-5 bg-brand-lime text-black border border-black font-bold uppercase text-xs flex items-center justify-center gap-3 hover:bg-black hover:text-white transition-all shadow-[6px_6px_0px_0px_rgba(0,0,0,1)]">
                           {language === 'en' ? 'Start Inquiry' : 'Начать проект'} <ArrowUpRight size={16} />
                         </button>
                      </div>
                   </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default Services;
