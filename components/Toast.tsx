import React, { useEffect } from 'react';
import { X } from 'lucide-react';

interface ToastProps {
  message: string;
  isVisible: boolean;
  onClose: () => void;
}

const Toast: React.FC<ToastProps> = ({ message, isVisible, onClose }) => {
  useEffect(() => {
    if (isVisible) {
      const timer = setTimeout(() => {
        onClose();
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [isVisible, onClose]);

  if (!isVisible) return null;

  return (
    <div className="fixed bottom-6 right-6 z-50 animate-in slide-in-from-bottom duration-300">
      <div className="bg-black text-white px-6 py-4 shadow-2xl flex items-center gap-4 min-w-[300px] border border-brand-lime">
        <div className="w-2 h-2 bg-brand-lime rounded-full animate-pulse"></div>
        <span className="font-mono text-xs uppercase font-bold tracking-wider flex-1">{message}</span>
        <button onClick={onClose} className="hover:text-brand-lime transition-colors">
          <X size={14} />
        </button>
      </div>
    </div>
  );
};

export default Toast;