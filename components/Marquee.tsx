
import React from 'react';

interface MarqueeProps {
  text: string;
  reverse?: boolean;
  className?: string;
  repeat?: number;
}

const Marquee: React.FC<MarqueeProps> = ({ text, reverse = false, className = "", repeat = 10 }) => {
  return (
    <div className={`relative overflow-hidden whitespace-nowrap ${className}`}>
      <div className={`inline-block ${reverse ? 'animate-marquee-reverse' : 'animate-marquee'}`}>
        {Array.from({ length: repeat }).map((_, i) => (
          <span key={i} className="mx-4 inline-block">
            {text}
          </span>
        ))}
      </div>
      <div className={`inline-block absolute top-0 ${reverse ? 'animate-marquee-reverse' : 'animate-marquee'}`} aria-hidden="true">
         {Array.from({ length: repeat }).map((_, i) => (
          <span key={i} className="mx-4 inline-block">
            {text}
          </span>
        ))}
      </div>
    </div>
  );
};

export default React.memo(Marquee);
