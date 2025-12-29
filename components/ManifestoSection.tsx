
import React from 'react';
import Marquee from './Marquee';
import { Language } from '../types';
import { translations } from '../data/translations';

interface ManifestoSectionProps {
  language: Language;
}

const ManifestoSection: React.FC<ManifestoSectionProps> = ({ language }) => {
  const t = translations[language].manifesto;
  const marqueeText = t.join(' • ') + ' • ';

  return (
    <div className="bg-brand-accent text-black py-6 border-b border-black overflow-hidden font-grotesk text-5xl md:text-7xl font-bold uppercase leading-none">
        <Marquee text={marqueeText} repeat={4} />
    </div>
  );
};

export default React.memo(ManifestoSection);
