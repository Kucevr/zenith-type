
import React, { useEffect, useRef } from 'react';

const CustomCursor: React.FC = () => {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  
  const mousePos = useRef({ x: 0, y: 0 });
  const dotPos = useRef({ x: 0, y: 0 });
  const ringPos = useRef({ x: 0, y: 0 });
  const lastMousePos = useRef({ x: 0, y: 0 });
  
  const dotScale = useRef(1);
  const ringScale = useRef(1);
  const targetDotScale = useRef(1);
  const targetRingScale = useRef(1);

  const angle = useRef(0);
  const velocity = useRef(0);
  
  const magneticTarget = useRef<HTMLElement | null>(null);

  const lerp = (start: number, end: number, factor: number) => start + (end - start) * factor;

  useEffect(() => {
    const onMouseMove = (e: MouseEvent) => {
      mousePos.current = { x: e.clientX, y: e.clientY };
      
      const target = e.target as HTMLElement;
      if (!target) return;

      // Magnetic logic
      const magElement = target.closest('a, button, [data-magnetic]') as HTMLElement;
      if (magElement) {
        if (magneticTarget.current && magneticTarget.current !== magElement) {
          magneticTarget.current.style.transform = '';
        }
        magneticTarget.current = magElement;
        const rect = magElement.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;
        const dist = 0.2;
        const moveX = (e.clientX - centerX) * dist;
        const moveY = (e.clientY - centerY) * dist;
        magElement.style.transform = `translate3d(${moveX}px, ${moveY}px, 0)`;
        
        // Snap ring towards center of magnetic element
        mousePos.current.x = lerp(mousePos.current.x, centerX + moveX, 0.2);
        mousePos.current.y = lerp(mousePos.current.y, centerY + moveY, 0.2);
      } else if (magneticTarget.current) {
        magneticTarget.current.style.transform = '';
        magneticTarget.current = null;
      }

      // Hover status logic
      const isInput = target.closest('input, textarea, [contenteditable="true"], .cursor-text');
      const isInteractive = target.closest('a, button, [data-magnetic], .cursor-pointer');
      const isBlackBg = target.closest('.bg-brand-black, .bg-black, .dark, [data-theme="dark"]');
      
      if (isInput) {
        if (containerRef.current) containerRef.current.style.opacity = '0';
      } else {
        if (containerRef.current) containerRef.current.style.opacity = '1';

        if (isInteractive) {
          targetDotScale.current = 4;
          targetRingScale.current = 1.6;
          dotRef.current?.classList.add('opacity-40', 'blur-[2px]');
          ringRef.current?.classList.add('border-brand-accent', 'border-[3px]');
        } else {
          targetDotScale.current = 1;
          targetRingScale.current = 1;
          dotRef.current?.classList.remove('opacity-40', 'blur-[2px]');
          ringRef.current?.classList.remove('border-brand-accent', 'border-[3px]');
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
      // 1. Calculate velocity and angle for organic stretching
      const deltaX = mousePos.current.x - lastMousePos.current.x;
      const deltaY = mousePos.current.y - lastMousePos.current.y;
      
      lastMousePos.current = { x: mousePos.current.x, y: mousePos.current.y };
      
      const v = Math.sqrt(deltaX * deltaX + deltaY * deltaY);
      velocity.current = lerp(velocity.current, v, 0.1);
      
      if (v > 1) {
        angle.current = Math.atan2(deltaY, deltaX) * (180 / Math.PI);
      }

      // 2. Follow positions
      dotPos.current.x = lerp(dotPos.current.x, mousePos.current.x, 0.35);
      dotPos.current.y = lerp(dotPos.current.y, mousePos.current.y, 0.35);

      ringPos.current.x = lerp(ringPos.current.x, mousePos.current.x, 0.12);
      ringPos.current.y = lerp(ringPos.current.y, mousePos.current.y, 0.12);

      // 3. Animate scales
      dotScale.current = lerp(dotScale.current, targetDotScale.current, 0.15);
      ringScale.current = lerp(ringScale.current, targetRingScale.current, 0.15);

      // 4. Transform components
      // The dot stretches slightly based on velocity
      const stretch = 1 + velocity.current * 0.015;
      const squash = 1 / stretch;

      if (dotRef.current) {
        dotRef.current.style.transform = `
          translate3d(${dotPos.current.x}px, ${dotPos.current.y}px, 0) 
          translate(-50%, -50%) 
          rotate(${angle.current}deg)
          scale(${dotScale.current * stretch}, ${dotScale.current * squash})
        `;
      }
      
      if (ringRef.current) {
        ringRef.current.style.transform = `
          translate3d(${ringPos.current.x}px, ${ringPos.current.y}px, 0) 
          translate(-50%, -50%) 
          scale(${ringScale.current})
        `;
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
      className="hidden md:block pointer-events-none fixed inset-0 z-[9999] transition-opacity duration-500"
    >
      <div 
        ref={dotRef}
        className="absolute top-0 left-0 w-2.5 h-2.5 bg-brand-lime rounded-full mix-blend-difference"
        style={{ willChange: 'transform' }}
      />
      <div 
        ref={ringRef}
        className="absolute top-0 left-0 w-12 h-12 border-2 border-brand-black/20 rounded-full transition-colors duration-500"
        style={{ willChange: 'transform' }}
      />
    </div>
  );
};

export default CustomCursor;
