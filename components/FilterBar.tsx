
import React from 'react';
import { Filter, Search, X } from 'lucide-react';
import { Language } from '../types';

interface FilterBarProps {
  language: Language;
  activeFilter: string;
  setActiveFilter: (filter: string) => void;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  count: number;
}

const FilterBar: React.FC<FilterBarProps> = ({ 
  language, 
  activeFilter, 
  setActiveFilter, 
  searchQuery,
  setSearchQuery,
  count 
}) => {
  const filtersEn = ['All', 'Sans Serif', 'Serif', 'Display', 'Monospace'];
  const filtersRu = ['Все', 'Sans Serif', 'Serif', 'Display', 'Monospace'];
  
  const filters = language === 'en' ? filtersEn : filtersRu;

  return (
    <div className="relative bg-white border-b border-black px-4 md:px-8 py-6 flex flex-col lg:flex-row items-center justify-between gap-4">
       <div className="flex flex-col md:flex-row items-center gap-4 w-full lg:w-auto">
          <div className="flex gap-2 overflow-x-auto w-full md:w-auto no-scrollbar items-center pb-2 md:pb-0">
            <span className="text-xs font-bold uppercase mr-2 flex items-center gap-2 text-neutral-500" aria-hidden="true">
              <Filter size={14} /> {language === 'en' ? 'Filter' : 'Фильтр'}
            </span>
            {filters.map((cat, i) => (
              <button 
                  key={cat}
                  onClick={() => setActiveFilter(filtersEn[i])}
                  aria-pressed={activeFilter === filtersEn[i]}
                  aria-label={`${language === 'en' ? 'Filter by' : 'Фильтр по'} ${cat}`}
                  className={`
                      whitespace-nowrap px-4 py-2 rounded-full text-[10px] md:text-xs font-bold uppercase transition-all
                      ${activeFilter === filtersEn[i] 
                          ? 'bg-black text-white border border-black shadow-md transform scale-105' 
                          : 'bg-transparent text-neutral-600 border border-neutral-300 hover:border-black hover:text-black'}
                  `}
              >
                  {cat}
              </button>
            ))}
          </div>

          <div className="relative w-full md:w-64">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-neutral-400" size={16} aria-hidden="true" />
            <input 
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder={language === 'en' ? 'Search fonts...' : 'Поиск шрифтов...'}
              aria-label={language === 'en' ? 'Search fonts' : 'Поиск шрифтов'}
              className="w-full pl-10 pr-10 py-2 bg-white border border-neutral-300 rounded-full text-xs font-bold uppercase focus:outline-none focus:border-black transition-colors"
            />
            {searchQuery && (
              <button 
                onClick={() => setSearchQuery('')}
                aria-label={language === 'en' ? 'Clear search' : 'Очистить поиск'}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-neutral-400 hover:text-black"
              >
                <X size={16} />
              </button>
            )}
          </div>
       </div>

       <div className="hidden lg:flex items-center gap-2 text-xs font-mono uppercase bg-white px-3 py-1 rounded-md border border-neutral-300">
         <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
         {count} {language === 'en' ? 'Families Found' : 'Семейств найдено'}
       </div>
    </div>
  );
};

export default FilterBar;
