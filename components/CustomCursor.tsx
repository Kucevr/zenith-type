
import React, { useEffect, useRef } from 'react';

const CustomCursor: React.FC = () => {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  
  const mousePos = useRef({ x: 0, y: 0 });
  const dotPos = useRef({ x: 0, y: 0 });
  const ringPos = useRef({ x: 0, y: 0 });
  const magneticTarget = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const onMouseMove = (e: MouseEvent) => {
      mousePos.current = { x: e.clientX, y: e.clientY };
      
      const target = e.target as HTMLElement;
      if (!target) return;

      // Magnetic logic
      const magElement = target.closest('a, button, [data-magnetic]') as HTMLElement;
      if (magElement) {
        magneticTarget.current = magElement;
        const rect = magElement.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;
        const dist = 0.15;
        const moveX = (e.clientX - centerX) * dist;
        const moveY = (e.clientY - centerY) * dist;
        magElement.style.transform = `translate3d(${moveX}px, ${moveY}px, 0)`;
      } else if (magneticTarget.current) {
        magneticTarget.current.style.transform = '';
        magneticTarget.current = null;
      }

      // Hover status logic combined in mousemove for maximum responsiveness
      const isInput = target.closest('input, textarea, [contenteditable="true"], .cursor-text');
      const isInteractive = target.closest('a, button, [data-magnetic], .cursor-pointer');
      const isBlackBg = target.closest('.bg-brand-black, .bg-black, .dark, [data-theme="dark"]');
      
      if (isInput) {
        if (containerRef.current) containerRef.current.style.opacity = '0';
      } else {
        if (containerRef.current) containerRef.current.style.opacity = '1';

        if (isInteractive) {
          dotRef.current?.classList.add('scale-[2.5]', 'opacity-20');
          ringRef.current?.classList.add('scale-[1.8]', 'border-brand-accent', 'border-[2px]');
        } else {
          dotRef.current?.classList.remove('scale-[2.5]', 'opacity-20');
          ringRef.current?.classList.remove('scale-[1.8]', 'border-brand-accent', 'border-[2px]');
        }

        if (isBlackBg) {
          ringRef.current?.classList.add('border-white/60');
        } else {
          ringRef.current?.classList.remove('border-white/60');
        }
      }
    };

    window.addEventListener('mousemove', onMouseMove, { passive: true });

    let rafId: number;
    const render = () => {
      const lerp = (start: number, end: number, factor: number) => start + (end - start) * factor;

      // High-precision snappy dot (0.95 is virtually instant)
      dotPos.current.x = lerp(dotPos.current.x, mousePos.current.x, 0.95);
      dotPos.current.y = lerp(dotPos.current.y, mousePos.current.y, 0.95);

      // Fast responsive ring (0.4 is snappy but has subtle weight)
      ringPos.current.x = lerp(ringPos.current.x, mousePos.current.x, 0.4);
      ringPos.current.y = lerp(ringPos.current.y, mousePos.current.y, 0.4);

      if (dotRef.current) {
        dotRef.current.style.transform = `translate3d(${dotPos.current.x}px, ${dotPos.current.y}px, 0) translate(-50%, -50%)`;
      }
      if (ringRef.current) {
        ringRef.current.style.transform = `translate3d(${ringPos.current.x}px, ${ringPos.current.y}px, 0) translate(-50%, -50%)`;
      }

      rafId = requestAnimationFrame(render);
    };

    rafId = requestAnimationFrame(render);

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      cancelAnimationFrame(rafId);
    };
  }, []);

  return (
    <div 
      ref={containerRef}
      className="hidden md:block pointer-events-none fixed inset-0 z-[9999] transition-opacity duration-200"
    >
      <div 
        ref={dotRef}
        className="absolute top-0 left-0 w-2.5 h-2.5 bg-brand-accent rounded-full will-change-transform"
      />
      <div 
        ref={ringRef}
        className="absolute top-0 left-0 w-11 h-11 border border-brand-black/30 rounded-full will-change-transform"
      />
    </div>
  );
};

export default CustomCursor;
