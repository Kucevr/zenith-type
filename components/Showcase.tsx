
import React, { useState, useEffect, useRef } from 'react';
import { MoveRight, X, ArrowUpRight, ExternalLink, Info, Star, ChevronRight, ChevronLeft, Command, Globe } from 'lucide-react';
import { Language } from '../types';
import { translations } from '../data/translations';

interface Project {
  id: string;
  title: string;
  client: string;
  category: string;
  description: string;
  descriptionRu: string;
  color: string;
  font: string;
  year: string;
  content: string[];
  contentRu: string[];
  features: string[];
}

const projects: Project[] = [
  {
    id: 'tokyo',
    title: 'NEO TOKYO',
    client: 'Sony Music',
    category: 'Branding',
    description: 'A futuristic visual identity for Sony Music\'s experimental electronic label. We developed a custom variable weight system to match the high-tempo nature of the music.',
    descriptionRu: 'Футуристический визуальный стиль для экспериментального электронного лейбла Sony Music. Мы разработали кастомную вариативную систему весов для динамичной музыки.',
    color: 'bg-[#1a1a1a]',
    font: 'font-unbounded',
    year: '2024',
    content: ['Kinetic Typography', 'Interactive Posters', 'Digital Art Direction'],
    contentRu: ['Кинетическая типографика', 'Интерактивные постеры', 'Диджитал арт-дирекшн'],
    features: ['Weight Axis: 100-900', 'Optical Size: Auto', 'Custom Glyphs: 12']
  },
  {
    id: 'daily',
    title: 'The Daily Report',
    client: 'NY Times',
    category: 'Editorial',
    description: 'A complete typographic overhaul of the digital morning briefing. Focused on maximizing readability on small screens without losing the heritage of the publication.',
    descriptionRu: 'Полное типографическое обновление ежедневного цифрового брифинга. Фокус на максимальной читаемости на малых экранах при сохранении наследия издания.',
    color: 'bg-[#FF3300]',
    font: 'font-newsreader',
    year: '2023',
    content: ['Reading Experience', 'Variable Serif System', 'Mobile Optimization'],
    contentRu: ['Читательский опыт', 'Вариативная антиква', 'Мобильная оптимизация'],
    features: ['Grade Axis: -1 to 1', 'Contrast: High', 'Styles: 42']
  },
  {
    id: 'code',
    title: 'CODE SYSTEMS',
    client: 'Vercel',
    category: 'Digital',
    description: 'Engineering-led brand assets for Vercel\'s documentation platform. Every character was optimized for technical clarity and vertical rhythm.',
    descriptionRu: 'Бренд-активы для платформы документации Vercel. Каждый символ был оптимизирован для технической ясности и вертикального ритма.',
    color: 'bg-[#0A0A0A]',
    font: 'font-mono',
    year: '2024',
    content: ['Monospace Engineering', 'Documentation UI', 'Developer Tools'],
    contentRu: ['Моноширинный инжиниринг', 'UI документации', 'Инструменты разработчика'],
    features: ['Slashed Zero', 'Contextual Ligatures', 'Dotted Zero']
  },
  {
    id: 'organic',
    title: 'ORGANIC MATTER',
    client: 'Aesop',
    category: 'Packaging',
    description: 'Minimalist, wide-form typography for Aesop\'s limited edition sustainability range. The type reflects the raw and brutalist nature of the materials.',
    descriptionRu: 'Минималистичная широкоформатная типографика для лимитированной серии Aesop. Шрифт отражает сырую и бруталистскую природу материалов.',
    color: 'bg-[#D4FF00]',
    font: 'font-syne',
    year: '2023',
    content: ['Package Design', 'Material-Led Type', 'Minimalist Aesthetics'],
    contentRu: ['Дизайн упаковки', 'Материально-ориентированный шрифт', 'Минималистичная эстетика'],
    features: ['Ultra-Wide Width', 'Soft Geometry', 'Geometric Terminals']
  }
];

interface ShowcaseProps {
  language: Language;
}

const Showcase: React.FC<ShowcaseProps> = ({ language }) => {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const [isClosing, setIsClosing] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);
  const t = translations[language].showcase;

  const activeProject = activeIndex !== null ? projects[activeIndex] : null;

  const openProject = (index: number) => {
    setActiveIndex(index);
    setIsClosing(false);
    document.body.style.overflow = 'hidden';
  };

  const closeProject = () => {
    setIsClosing(true);
    setTimeout(() => {
      setActiveIndex(null);
      setIsClosing(false);
      document.body.style.overflow = 'auto';
    }, 400);
  };

  const nextProject = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (activeIndex === null) return;
    const nextIdx = (activeIndex + 1) % projects.length;
    setActiveIndex(nextIdx);
    if (scrollRef.current) scrollRef.current.scrollTo(0, 0);
  };

  const prevProject = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (activeIndex === null) return;
    const prevIdx = (activeIndex - 1 + projects.length) % projects.length;
    setActiveIndex(prevIdx);
    if (scrollRef.current) scrollRef.current.scrollTo(0, 0);
  };

  return (
    <section id="showcase" className="border-b border-black bg-brand-black text-white scroll-mt-20 overflow-hidden relative">
      <div className="grid grid-cols-1 lg:grid-cols-12 min-h-[800px]">
        {/* Header Column */}
        <div className={`lg:col-span-4 border-b lg:border-b-0 lg:border-r border-neutral-800 flex flex-col justify-between bg-neutral-900 relative transition-all duration-500 ${
          language === 'en' ? 'p-8 md:p-16 lg:p-20' : 'p-8 md:p-8 lg:p-10'
        }`}>
          <div className="relative z-10">
            <div className="w-16 h-1 bg-brand-lime mb-10"></div>
            <h3 className={`font-bold uppercase mb-8 font-grotesk leading-[0.8] tracking-tighter transition-all duration-500 ${
              language === 'en' 
                ? 'text-5xl md:text-7xl lg:text-8xl' 
                : 'text-4xl md:text-5xl lg:text-[2.6rem] xl:text-[3.8rem]'
            }`}>
              {language === 'en' ? (
                <>Archive<br /><span className="text-brand-lime">Studio</span><br />Works</>
              ) : (
                <>Архив<br /><span className="text-brand-lime tracking-[-0.07em]">Студийных</span><br />Работ</>
              )}
            </h3>
            <p className="text-xs md:text-sm lg:text-base mb-12 max-w-xs font-mono text-neutral-400 leading-relaxed uppercase tracking-tight">
              {t.desc}
            </p>
          </div>
          
          <div className="space-y-6 relative z-10">
            <div className="flex gap-4">
              <button className="w-12 h-12 md:w-16 md:h-16 border border-neutral-700 flex items-center justify-center hover:bg-white hover:text-black transition-all rounded-full group">
                <ChevronLeft size={24} className="group-hover:-translate-x-1 transition-transform" />
              </button>
              <button className="w-12 h-12 md:w-16 md:h-16 border border-neutral-700 flex items-center justify-center hover:bg-white hover:text-black transition-all rounded-full group">
                <ChevronRight size={24} className="group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
            <div className="text-[9px] md:text-[10px] font-mono uppercase tracking-[0.3em] opacity-30">
              {language === 'en' ? 'SCROLL TO DISCOVER PROJECTS' : 'ЛИСТАЙТЕ ДЛЯ ПРОСМОТРА КЕЙСОВ'}
            </div>
          </div>
        </div>

        {/* Project Grid */}
        <div className="lg:col-span-8 grid grid-cols-1 md:grid-cols-2">
          {projects.map((project, index) => (
            <div
              key={project.id}
              onClick={() => openProject(index)}
              className={`
                group relative border-b border-neutral-800 ${project.color} 
                ${project.id === 'organic' ? 'text-black' : 'text-white'} 
                p-10 lg:p-16 flex flex-col justify-between min-h-[450px] md:min-h-[500px] lg:min-h-[600px] overflow-hidden cursor-pointer transition-all duration-700
                ${index % 2 === 0 ? 'md:border-r' : ''}
              `}
            >
              {/* Animated Background Noise */}
              <div className="absolute inset-0 opacity-[0.05] pointer-events-none group-hover:opacity-[0.1] transition-opacity duration-700 mix-blend-overlay" style={{backgroundImage: "url('https://grainy-gradients.vercel.app/noise.svg')"}}></div>
              
              <div className="relative z-10 flex justify-between items-start">
                <div className="flex flex-col gap-1">
                  <span className={`text-[9px] md:text-[10px] font-mono opacity-60`}>[{project.year}]</span>
                  <span className={`border ${project.id === 'organic' ? 'border-black/20' : 'border-white/20'} px-3 py-1 rounded-none text-[9px] font-bold uppercase tracking-widest backdrop-blur-md bg-black/5 group-hover:bg-brand-accent group-hover:text-white group-hover:border-brand-accent transition-all`}>
                    {language === 'en' ? project.category : (project.category === 'Branding' ? 'Брендинг' : project.category === 'Editorial' ? 'Издание' : project.category === 'Digital' ? 'Диджитал' : 'Упаковка')}
                  </span>
                </div>
                <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <span className="text-[9px] font-mono uppercase tracking-widest">{language === 'en' ? 'View Details' : 'Детали'}</span>
                  <Command size={12} className="animate-spin-slow" />
                </div>
              </div>

              <div className="relative z-10">
                <h4 className={`text-5xl md:text-6xl lg:text-7xl font-bold ${project.font} leading-[0.8] tracking-tighter transition-all duration-700 group-hover:pl-4 group-hover:scale-105 origin-left`}>
                  {project.title.split(' ').map((word, i) => (
                    <React.Fragment key={i}>
                      {word}
                      <br />
                    </React.Fragment>
                  ))}
                </h4>
              </div>

              <div className="relative z-10 flex justify-between items-end border-t border-current/10 pt-8">
                <div className="flex flex-col">
                  <span className="text-[10px] opacity-40 uppercase mb-1 font-mono tracking-tighter">
                    {language === 'en' ? 'Collaborator' : 'Партнер'}
                  </span>
                  <span className="text-sm lg:text-base font-bold uppercase tracking-widest group-hover:text-brand-accent transition-colors">{project.client}</span>
                </div>
                <div className={`w-14 h-14 rounded-none ${project.id === 'organic' ? 'bg-black text-white' : 'bg-brand-lime text-black'} flex items-center justify-center transition-all duration-500 transform translate-y-4 opacity-0 group-hover:opacity-100 group-hover:translate-y-0 shadow-2xl`}>
                  <ArrowUpRight size={24} />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Modern High-Fidelity Modal */}
      {activeProject && (
        <div className={`fixed inset-0 z-[200] flex items-center justify-center transition-all duration-500 ${isClosing ? 'opacity-0' : 'opacity-100'}`}>
          <div className="absolute inset-0 bg-black/95 backdrop-blur-[40px]" onClick={closeProject}></div>
          
          <div className={`relative w-full h-[100dvh] md:h-[95vh] md:w-[98vw] max-w-[1600px] bg-white text-black flex flex-col overflow-hidden transition-all duration-500 transform ${isClosing ? 'translate-y-20 scale-95 opacity-0' : 'translate-y-0 scale-100 opacity-100'}`}>
            
            {/* Modal Header */}
            <div className="px-6 py-4 md:px-12 md:py-6 border-b border-black flex justify-between items-center bg-white sticky top-0 z-50">
              <div className="flex items-center gap-6 md:gap-12">
                <div className="flex flex-col">
                  <div className="flex items-center gap-4">
                    <div className={`w-5 h-5 ${activeProject.color} border border-black shadow-[3px_3px_0px_0px_rgba(0,0,0,1)]`}></div>
                    <h2 className="text-lg md:text-2xl font-bold uppercase font-grotesk tracking-tighter flex items-center gap-2">
                      <span className="opacity-20 hidden md:inline">PROJECT_ARCHIVE /</span> {activeProject.title}
                    </h2>
                  </div>
                </div>
                <div className="hidden lg:flex items-center gap-4 text-[10px] font-mono text-neutral-400 uppercase tracking-widest">
                  <div className="flex items-center gap-1"><Info size={12} /> {language === 'en' ? 'Case Study' : 'Кейс'}</div>
                  <div className="w-1 h-1 bg-neutral-300 rounded-full"></div>
                  <div>ID: {activeProject.id.toUpperCase()}</div>
                </div>
              </div>
              
              <div className="flex items-center gap-2">
                <div className="hidden md:flex items-center gap-1 mr-4">
                  <button onClick={prevProject} className="p-2 hover:bg-neutral-100 rounded-full transition-colors"><ChevronLeft size={20} /></button>
                  <span className="text-xs font-mono font-bold">{(activeIndex ?? 0) + 1} / {projects.length}</span>
                  <button onClick={nextProject} className="p-2 hover:bg-neutral-100 rounded-full transition-colors"><ChevronRight size={20} /></button>
                </div>
                <button onClick={closeProject} className="w-10 h-10 md:w-14 md:h-14 border border-black flex items-center justify-center hover:bg-black hover:text-white transition-all">
                  <X size={24} />
                </button>
              </div>
            </div>

            {/* Scrollable Content Container */}
            <div ref={scrollRef} className="flex-1 overflow-y-auto no-scrollbar scroll-smooth">
              <div className="grid grid-cols-1 lg:grid-cols-12 min-h-full">
                
                {/* Sidebar Info */}
                <div className="lg:col-span-4 p-8 md:p-14 lg:p-16 border-b lg:border-b-0 lg:border-r border-black flex flex-col justify-between bg-brand-light/20 relative">
                  <div className="absolute inset-0 opacity-[0.03] pointer-events-none" style={{backgroundImage: "url('https://grainy-gradients.vercel.app/noise.svg')"}}></div>
                  
                  <div className="space-y-12 md:space-y-16 relative z-10">
                    <div>
                      <span className="text-[10px] font-bold text-brand-accent uppercase tracking-[0.4em] block mb-6">{t.challenge}</span>
                      <p className="text-xl md:text-2xl lg:text-3xl font-bold leading-[1.1] font-grotesk uppercase tracking-tighter text-neutral-900">
                        {language === 'en' ? activeProject.description : activeProject.descriptionRu}
                      </p>
                    </div>

                    <div className="grid grid-cols-2 gap-x-12 gap-y-12 border-t border-black/10 pt-12">
                      <div>
                        <span className="text-[9px] font-bold uppercase text-neutral-400 block mb-3 tracking-widest">{language === 'en' ? 'Partner / Client' : 'Партнер / Клиент'}</span>
                        <div className="font-bold uppercase text-lg lg:text-xl tracking-tighter leading-none">{activeProject.client}</div>
                      </div>
                      <div>
                        <span className="text-[9px] font-bold uppercase text-neutral-400 block mb-3 tracking-widest">{language === 'en' ? 'Release Year' : 'Год релиза'}</span>
                        <div className="font-bold font-mono text-lg lg:text-xl">{activeProject.year}</div>
                      </div>
                      <div className="col-span-2">
                        <span className="text-[9px] font-bold uppercase text-neutral-400 block mb-4 tracking-widest">{t.technical}</span>
                        <div className="space-y-1">
                           {activeProject.features.map((feature, i) => (
                             <div key={i} className="flex justify-between items-center py-3 border-b border-black/5 text-[11px] font-mono uppercase">
                               <span className="opacity-50">{feature.split(':')[0]}</span>
                               <span className="font-bold text-brand-accent">{feature.split(':')[1]}</span>
                             </div>
                           ))}
                        </div>
                      </div>
                    </div>

                    <div className="space-y-6 border-t border-black/10 pt-12">
                      <span className="text-[9px] font-bold uppercase text-neutral-400 block mb-6 tracking-widest">{t.deliverables}</span>
                      <div className="flex flex-wrap gap-2">
                        {(language === 'en' ? activeProject.content : activeProject.contentRu).map((item, i) => (
                          <div key={i} className="flex items-center gap-3 text-[10px] font-bold uppercase py-3 px-5 border border-black hover:bg-black hover:text-white transition-all cursor-default">
                             <div className="w-1.5 h-1.5 bg-brand-lime rounded-full"></div>
                             {item}
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="mt-20 space-y-4">
                    <button className="w-full py-6 bg-black text-white font-bold uppercase text-xs flex items-center justify-center gap-4 hover:bg-brand-accent transition-all group shadow-2xl">
                      {t.cta} <ExternalLink size={16} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                    </button>
                    <div className="flex justify-between items-center px-4 py-3 border border-black/10 text-[9px] font-mono uppercase tracking-widest opacity-40">
                      <span>Zenith_Archive_v4</span>
                      <span>{new Date().toLocaleDateString()}</span>
                    </div>
                  </div>
                </div>

                {/* Visual Content Column */}
                <div className="lg:col-span-8 bg-[#fdfdfd] p-0 relative overflow-hidden flex flex-col">
                  
                  {/* Dynamic Specimen Hero */}
                  <div className={`w-full min-h-[50vh] lg:min-h-[60vh] ${activeProject.color} relative flex items-center justify-center overflow-hidden`}>
                     <div className="absolute inset-0 opacity-10 mix-blend-overlay" style={{backgroundImage: "url('https://grainy-gradients.vercel.app/noise.svg')"}}></div>
                     
                     {/* Background Grid */}
                     <div className="absolute inset-0 opacity-[0.05] grid grid-cols-12 pointer-events-none">
                        {[...Array(12)].map((_, i) => <div key={i} className={`border-r ${activeProject.id === 'organic' ? 'border-black' : 'border-white'} h-full`}></div>)}
                     </div>

                     <div className="relative z-10 p-12 text-center transform transition-transform duration-[2s] hover:scale-105">
                        <h3 className={`text-[18vw] lg:text-[14vw] font-bold uppercase leading-[0.75] tracking-tighter ${activeProject.id === 'organic' ? 'text-black' : 'text-white'} ${activeProject.font}`}>
                           {activeProject.title.split(' ').map((word, i) => (
                             <div key={i} className={i === 1 ? 'ml-[0.5em] md:ml-[1em]' : ''}>{word}</div>
                           ))}
                        </h3>
                     </div>
                     
                     {/* Floating Labels */}
                     <div className={`absolute bottom-8 left-8 p-3 backdrop-blur-md border ${activeProject.id === 'organic' ? 'border-black/10 text-black' : 'border-white/10 text-white'} flex items-center gap-4 text-[9px] font-mono uppercase tracking-[0.2em] animate-pulse`}>
                        <div className="w-1.5 h-1.5 bg-brand-lime rounded-full"></div>
                        SPECIMEN_ACTIVE_VIEW / {activeProject.font.toUpperCase()}
                     </div>
                  </div>

                  {/* Additional Content Blocks */}
                  <div className="p-8 md:p-14 lg:p-20 grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-20">
                     <div className="space-y-8">
                        <div className="flex items-center gap-4">
                           <div className="w-12 h-px bg-black/10"></div>
                           <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-neutral-400">01 / Context</span>
                        </div>
                        <h4 className="text-3xl md:text-4xl font-bold uppercase font-grotesk tracking-tighter leading-none">
                           {language === 'en' ? 'The Visual Landscape' : 'Визуальный ландшафт'}
                        </h4>
                        <p className="text-sm md:text-base text-neutral-600 leading-relaxed font-mono uppercase">
                           {language === 'en' 
                            ? 'Our intervention focused on the intersection of technical performance and artistic intent. Every letterform was scrutinized for balance, legibility, and spirit.'
                            : 'Наше вмешательство было сосредоточено на пересечении технических характеристик и художественного замысла. Каждая буква была тщательно проанализирована.'}
                        </p>
                     </div>
                     <div className="bg-brand-light p-10 border border-black flex flex-col justify-between items-start group hover:bg-brand-lime transition-all duration-500">
                        <Star size={32} className="mb-10 text-brand-accent group-hover:rotate-45 transition-transform duration-700" />
                        <div className="space-y-4">
                           <h4 className="text-2xl font-bold uppercase font-grotesk tracking-tighter">
                             {language === 'en' ? 'Core Identity' : 'Ядро идентичности'}
                           </h4>
                           <div className="flex flex-col gap-2">
                              {activeProject.features.slice(0, 2).map((f, i) => (
                                <div key={i} className="text-[10px] font-bold uppercase flex items-center gap-2">
                                  <div className="w-1 h-1 bg-black rounded-full"></div>
                                  {f}
                                </div>
                              ))}
                           </div>
                        </div>
                     </div>
                  </div>

                  {/* Next Project Footer inside modal */}
                  <div className="mt-auto border-t border-black p-8 md:p-14 lg:p-20 bg-neutral-900 text-white flex flex-col md:flex-row justify-between items-center gap-12">
                     <div className="space-y-2">
                        <span className="text-[9px] font-bold uppercase text-neutral-500 tracking-[0.4em]">{language === 'en' ? 'CONTINUE EXPLORING' : 'ПРОДОЛЖИТЬ ОБЗОР'}</span>
                        <h4 className="text-3xl lg:text-5xl font-bold uppercase font-grotesk tracking-tighter">
                           {language === 'en' ? 'Next Project' : 'Следующий проект'}
                        </h4>
                     </div>
                     <button 
                       onClick={nextProject}
                       className="group flex items-center gap-8 text-3xl lg:text-5xl font-bold uppercase font-grotesk tracking-tighter hover:text-brand-lime transition-all"
                     >
                        {projects[(activeIndex ?? 0 + 1) % projects.length].title}
                        <div className="w-16 h-16 lg:w-20 lg:h-20 border border-white/20 rounded-full flex items-center justify-center group-hover:bg-brand-lime group-hover:text-black transition-all">
                           <MoveRight size={32} className="group-hover:translate-x-2 transition-transform" />
                        </div>
                     </button>
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

export default Showcase;
