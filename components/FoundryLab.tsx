
import React, { useState, useEffect } from 'react';
import { Settings, FlaskConical, MoveRight, Cpu, Terminal, Layers, X, Info, Activity, ShieldCheck, Zap, Code2, Sparkles } from 'lucide-react';
import { Language } from '../types';

interface FoundryLabProps {
  language: Language;
}

interface LabProject {
  name: string;
  progress: number;
  type: string;
  status: string;
  tech: string;
  glyph: string;
  font: string;
  description: string;
  details: string[];
}

const FoundryLab: React.FC<FoundryLabProps> = ({ language }) => {
  const [hoveredProject, setHoveredProject] = useState<number | null>(null);
  const [selectedProject, setSelectedProject] = useState<LabProject | null>(null);

  // Body scroll lock
  useEffect(() => {
    if (selectedProject) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [selectedProject]);

  const labProjects: LabProject[] = [
    { 
      name: 'Zenith Display v0.8', 
      progress: 85, 
      type: 'WIP', 
      status: language === 'en' ? 'In Kerning' : 'Кернинг',
      tech: 'Variable Axis: Width, Weight',
      glyph: 'Z',
      font: 'font-unbounded',
      description: language === 'en' 
        ? 'A high-performance variable typeface designed for maximum impact. Zenith Display explores the boundaries of geometric construction and optical balance.'
        : 'Высокопроизводительный вариативный шрифт, разработанный для максимального воздействия. Zenith Display исследует границы геометрической конструкции и оптического баланса.',
      details: language === 'en'
        ? ['Variable Width (50-200)', 'Variable Weight (100-900)', 'Full Cyrillic Support', 'Advanced Kerning Pairs', 'Stylistic Alternates']
        : ['Переменная ширина (50-200)', 'Переменный вес (100-900)', 'Полная поддержка кириллицы', 'Улучшенные пары кернинга', 'Стилистические альтернативы']
    },
    { 
      name: 'Mono Grid', 
      progress: 40, 
      type: 'Beta', 
      status: language === 'en' ? 'Drawing Cyrillic' : 'Отрисовка кириллицы',
      tech: 'Monospaced System',
      glyph: 'g',
      font: 'font-mono',
      description: language === 'en'
        ? 'A technical monospaced system built for code clarity and architectural precision. Mono Grid features a unique rhythmic structure for long-form reading.'
        : 'Техническая моноширинная система, созданная для ясности кода и архитектурной точности. Mono Grid отличается уникальной ритмической структурой для длительного чтения.',
      details: language === 'en'
        ? ['Fixed Pitch Metrics', 'Coding Ligatures', 'Slashed Zero Options', 'Technical Symbols Set', 'Box Drawing Characters']
        : ['Метрики фиксированного шага', 'Лигатуры для кода', 'Варианты перечеркнутого нуля', 'Набор технических символов', 'Символы псевдографики']
    },
    { 
      name: 'Organic Sans', 
      progress: 15, 
      type: 'Concept', 
      status: language === 'en' ? 'Initial Sketches' : 'Наброски',
      tech: 'Optical Size: Display',
      glyph: 'O',
      font: 'font-syne',
      description: language === 'en'
        ? 'An exploration into fluid typography. Organic Sans mimics natural growth patterns through its unique stroke modulation and terminal treatments.'
        : 'Исследование текучей типографики. Organic Sans имитирует естественные паттерны роста через уникальную модуляцию штрихов и обработку окончаний.',
      details: language === 'en'
        ? ['Fluid Stroke Modulation', 'Natural Curve Logic', 'Experimental Terminals', 'Display-only Metrics', 'Contextual Alternates']
        : ['Текучая модуляция штриха', 'Логика естественных кривых', 'Экспериментальные окончания', 'Метрики только для заголовков', 'Контекстные альтернативы']
    },
  ];

  return (
    <section className="bg-brand-black text-white py-24 px-6 md:px-12 border-b border-neutral-800 relative overflow-hidden">
      <div className="max-w-7xl mx-auto relative z-10">
        <div className="flex flex-col md:flex-row justify-between items-end mb-20 gap-8 border-b border-neutral-800 pb-12">
          <div className="max-w-xl animate-in slide-in-from-left duration-700">
            <h2 className="text-xs font-bold uppercase tracking-[0.4em] text-brand-lime mb-6 flex items-center gap-3">
              <FlaskConical size={14} className="animate-pulse" /> {language === 'en' ? 'Experimental Division' : 'Экспериментальный отдел'}
            </h2>
            <h3 className="text-5xl md:text-7xl font-bold uppercase font-grotesk leading-[0.85] tracking-tighter">
              {language === 'en' ? <>The Lab /<br/><span className="text-neutral-500">Future Specimens</span></> : <>Лаборатория /<br/><span className="text-neutral-500">Будущие релизы</span></>}
            </h3>
          </div>
          <div className="flex flex-col items-end text-right">
             <div className="flex items-center gap-3 mb-4">
                <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></div>
                <span className="text-[10px] font-mono uppercase text-neutral-400">STATUS: {language === 'en' ? 'EXPERIMENTAL' : 'ЭКСПЕРИМЕНТАЛЬНО'}</span>
             </div>
             <p className="text-neutral-400 font-mono text-xs uppercase max-w-xs leading-relaxed">
               {language === 'en' ? 'Preview of upcoming releases. Subscribers get priority beta access.' : 'Предварительный просмотр будущих релизов. Подписчики получают приоритетный доступ.'}
             </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {labProjects.map((project, i) => (
            <div key={i} onMouseEnter={() => setHoveredProject(i)} onMouseLeave={() => setHoveredProject(null)} className="group flex flex-col justify-between border border-neutral-800 p-8 min-h-[450px] relative transition-all duration-500 hover:bg-neutral-900/50 hover:border-brand-lime">
              <div className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[15vw] md:text-[10vw] opacity-0 group-hover:opacity-5 transition-all duration-700 pointer-events-none ${project.font}`}>
                 {project.glyph}
              </div>
              <div>
                <div className="flex justify-between items-start mb-10">
                  <span className="text-[9px] font-bold px-3 py-1 bg-brand-lime text-black uppercase tracking-widest">{project.type}</span>
                  <button 
                    onClick={() => setSelectedProject(project)}
                    className="text-neutral-700 hover:text-brand-lime transition-all hover:scale-125 cursor-pointer p-2 -m-2"
                  >
                    <Terminal size={20} />
                  </button>
                </div>
                <h4 className="text-3xl font-bold font-grotesk mb-4 group-hover:text-brand-lime leading-none tracking-tight">{project.name}</h4>
                <div className="p-4 bg-black/50 border border-neutral-800 font-mono text-[10px] text-neutral-500 mb-8 opacity-0 group-hover:opacity-100 transition-opacity">
                   {`> STATUS: ${project.status.toUpperCase()}`}<br/>
                   {`> PROGRESS_VAL: ${project.progress}%`}<br/>
                   {`> ACCESS_LEVEL: ${language === 'en' ? 'BETA_TESTER_ONLY' : 'ТОЛЬКО_ТЕСТЕРЫ'}`}
                </div>
              </div>
              <div className="w-full space-y-4">
                <div className="flex justify-between text-[10px] uppercase font-mono">
                  <span className="opacity-40">{language === 'en' ? 'Evolution Stage' : 'Стадия разработки'}</span>
                  <span className="text-brand-lime font-bold">{project.progress}%</span>
                </div>
                <div className="w-full h-px bg-neutral-800 relative">
                  <div className="absolute top-0 left-0 h-full bg-brand-lime transition-all duration-[1500ms]" style={{ width: hoveredProject === i ? `${project.progress}%` : '0%' }}></div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Lab Project Modal */}
      {selectedProject && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-8">
          <div 
            className="absolute inset-0 bg-black/90 backdrop-blur-xl animate-in fade-in duration-300"
            onClick={() => setSelectedProject(null)}
          />
          
          <div className="relative w-full max-w-6xl h-[90vh] bg-[#0a0a0a] border border-white/10 rounded-2xl overflow-hidden flex flex-col md:flex-row animate-in zoom-in-95 duration-300 shadow-2xl">
            {/* Main Stage (Left) */}
            <div className="flex-1 overflow-y-auto custom-scrollbar bg-black/20">
              <div className="p-8 md:p-12">
                <div className="flex items-center gap-3 mb-8">
                  <div className="w-12 h-12 rounded-xl bg-white/5 flex items-center justify-center border border-white/10">
                    <FlaskConical className="w-6 h-6 text-white/60" />
                  </div>
                  <div>
                    <div className="text-[10px] uppercase tracking-[0.2em] text-white/40 mb-1">
                      {language === 'en' ? 'Experimental Project' : 'Экспериментальный проект'}
                    </div>
                    <h2 className="text-3xl font-medium tracking-tight">{selectedProject.name}</h2>
                  </div>
                </div>

                <div className="aspect-[16/9] w-full bg-white/[0.02] border border-white/5 rounded-2xl flex items-center justify-center mb-12 group relative overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-br from-white/[0.02] to-transparent opacity-50" />
                  <span className="text-[12vw] font-medium tracking-tighter text-white/10 group-hover:text-white/20 transition-colors duration-700 select-none" style={{ fontFamily: selectedProject.font }}>
                    {selectedProject.glyph}
                  </span>
                  <div className="absolute bottom-6 left-6 flex items-center gap-2 px-3 py-1.5 bg-black/40 backdrop-blur-md border border-white/10 rounded-full">
                    <Activity className="w-3 h-3 text-green-400 animate-pulse" />
                    <span className="text-[10px] uppercase tracking-widest text-white/60">
                      {language === 'en' ? 'Live Preview' : 'Живой просмотр'}
                    </span>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                  <div>
                    <h3 className="text-[10px] uppercase tracking-[0.2em] text-white/40 mb-6 flex items-center gap-2">
                      <Info className="w-3 h-3" /> {language === 'en' ? 'Project Overview' : 'Обзор проекта'}
                    </h3>
                    <p className="text-lg text-white/70 leading-relaxed font-light">
                      {selectedProject.description}
                    </p>
                  </div>
                  <div>
                    <h3 className="text-[10px] uppercase tracking-[0.2em] text-white/40 mb-6 flex items-center gap-2">
                      <Layers className="w-3 h-3" /> {language === 'en' ? 'Technical Specs' : 'Технические характеристики'}
                    </h3>
                    <div className="space-y-4">
                      {selectedProject.details.map((detail, idx) => (
                        <div key={idx} className="flex items-start gap-3 group">
                          <div className="mt-1.5 w-1 h-1 rounded-full bg-white/20 group-hover:bg-white/60 transition-colors" />
                          <span className="text-sm text-white/50 group-hover:text-white/80 transition-colors">{detail}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Lab Terminal Section */}
                <div className="mt-16 p-8 bg-black/40 border border-white/5 rounded-2xl font-mono">
                  <div className="flex items-center gap-2 mb-6 text-white/30">
                    <Terminal className="w-4 h-4" />
                    <span className="text-[10px] uppercase tracking-widest">System Diagnostics</span>
                  </div>
                  <div className="space-y-3">
                    <div className="flex justify-between text-[11px]">
                      <span className="text-white/40">Build Status</span>
                      <span className="text-green-400/80">STABLE</span>
                    </div>
                    <div className="flex justify-between text-[11px]">
                      <span className="text-white/40">Optimization</span>
                      <span className="text-white/60">98.4%</span>
                    </div>
                    <div className="flex justify-between text-[11px]">
                      <span className="text-white/40">Last Commit</span>
                      <span className="text-white/60">2h ago</span>
                    </div>
                    <div className="pt-4 border-t border-white/5">
                      <div className="text-[11px] text-white/30 mb-2">Active Modules:</div>
                      <div className="flex flex-wrap gap-2">
                        {['Kern-Engine', 'OT-Features', 'Hinting-v2', 'Variable-Core'].map(m => (
                          <span key={m} className="px-2 py-1 bg-white/5 rounded text-[9px] text-white/50">{m}</span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Sidebar (Right) */}
            <div className="w-full md:w-[320px] border-l border-white/10 bg-black/40 flex flex-col">
              <div className="p-8 flex-1">
                <div className="flex justify-between items-start mb-12">
                  <div className="px-3 py-1 bg-white/5 border border-white/10 rounded-full">
                    <span className="text-[10px] uppercase tracking-widest text-white/60">{selectedProject.status}</span>
                  </div>
                  <button 
                    onClick={() => setSelectedProject(null)}
                    className="p-2 hover:bg-white/5 rounded-full transition-colors group"
                  >
                    <X className="w-5 h-5 text-white/40 group-hover:text-white" />
                  </button>
                </div>

                <div className="space-y-10">
                  <div>
                    <div className="text-[10px] uppercase tracking-[0.2em] text-white/30 mb-4">
                      {language === 'en' ? 'Development Progress' : 'Прогресс разработки'}
                    </div>
                    <div className="flex items-end gap-3 mb-2">
                      <span className="text-4xl font-light tracking-tighter">{selectedProject.progress}%</span>
                      <span className="text-[10px] text-white/30 mb-2 uppercase tracking-widest">
                        {language === 'en' ? 'Complete' : 'Завершено'}
                      </span>
                    </div>
                    <div className="h-1 w-full bg-white/5 rounded-full overflow-hidden">
                      <div 
                        className="h-full bg-white/40 rounded-full transition-all duration-1000"
                        style={{ width: `${selectedProject.progress}%` }}
                      />
                    </div>
                  </div>

                  <div className="space-y-6">
                    <div className="flex items-center justify-between group">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center border border-white/10">
                          <Cpu className="w-4 h-4 text-white/40" />
                        </div>
                        <span className="text-xs text-white/40 uppercase tracking-widest">Engine</span>
                      </div>
                      <span className="text-xs text-white/80">{selectedProject.tech}</span>
                    </div>

                    <div className="flex items-center justify-between group">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center border border-white/10">
                          <ShieldCheck className="w-4 h-4 text-white/40" />
                        </div>
                        <span className="text-xs text-white/40 uppercase tracking-widest">License</span>
                      </div>
                      <span className="text-xs text-white/80">Lab-Only</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="p-8 border-t border-white/10 bg-black/20">
                <button className="w-full py-4 bg-white text-black rounded-xl text-xs uppercase tracking-[0.2em] font-bold hover:bg-white/90 transition-all flex items-center justify-center gap-2 group">
                  <Zap className="w-4 h-4 fill-current" />
                  {language === 'en' ? 'Request Access' : 'Запросить доступ'}
                </button>
                <p className="text-[9px] text-center text-white/30 mt-4 uppercase tracking-widest">
                  {language === 'en' ? 'Experimental builds are for testing only' : 'Экспериментальные сборки только для тестов'}
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default FoundryLab;
