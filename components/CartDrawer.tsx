
import React from 'react';
import { X, Trash2, ArrowRight, ShoppingCart } from 'lucide-react';
import { Font, Language } from '../types';
import { translations } from '../data/translations';

interface CartDrawerProps {
  language: Language;
  isOpen: boolean;
  onClose: () => void;
  cartItems: Font[];
  onRemove: (fontId: string) => void;
  onCheckout: () => void;
}

const CartDrawer: React.FC<CartDrawerProps> = ({ language, isOpen, onClose, cartItems, onRemove, onCheckout }) => {
  const t = translations[language].nav;
  const total = cartItems.reduce((acc, item) => acc + item.price, 0);

  return (
    <>
      <div className={`fixed inset-0 bg-black/40 backdrop-blur-sm z-[200] transition-opacity duration-500 ${isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`} onClick={onClose} aria-hidden="true" />
      <div 
        className={`fixed top-0 right-0 h-full w-full md:w-[450px] bg-brand-light z-[201] shadow-2xl transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${isOpen ? 'translate-x-0' : 'translate-x-full'}`}
        role="dialog"
        aria-modal="true"
        aria-label={t.cart}
      >
        <div className="flex flex-col h-full border-l border-black">
          <div className="p-8 border-b border-black flex justify-between items-center bg-white">
            <h2 className="text-2xl font-bold uppercase font-grotesk flex items-center gap-4">
              <ShoppingCart size={24} aria-hidden="true" /> {t.cart} ({cartItems.length})
            </h2>
            <button 
              onClick={onClose} 
              aria-label={language === 'en' ? 'Close cart' : 'Закрыть корзину'}
              className="w-10 h-10 border border-black rounded-full flex items-center justify-center hover:bg-black hover:text-white transition-colors"
            >
              <X size={20} />
            </button>
          </div>
          <div className="flex-1 overflow-y-auto p-8 space-y-6 bg-brand-light/50">
            {cartItems.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-center space-y-6">
                <div className="w-20 h-20 bg-neutral-200 rounded-full flex items-center justify-center text-neutral-400" aria-hidden="true"><ShoppingCart size={40} /></div>
                <div className="space-y-2">
                  <h3 className="text-xl font-bold uppercase font-grotesk">{language === 'en' ? 'Your cart is empty' : 'Ваша корзина пуста'}</h3>
                </div>
                <button onClick={onClose} className="px-8 py-3 bg-black text-white text-xs font-bold uppercase hover:bg-brand-accent transition-colors">{language === 'en' ? 'Browse Fonts' : 'Перейти к шрифтам'}</button>
              </div>
            ) : (
              cartItems.map((item, idx) => (
                <div key={`${item.id}-${idx}`} className="flex justify-between items-center p-6 bg-white border border-black group">
                  <div>
                    <h4 className="text-lg font-bold font-grotesk uppercase">{item.name}</h4>
                    <div className="mt-2 text-xl font-bold font-mono text-brand-accent">${item.price}</div>
                  </div>
                  <button 
                    onClick={() => onRemove(item.id)} 
                    aria-label={`${language === 'en' ? 'Remove' : 'Удалить'} ${item.name}`}
                    className="p-3 text-neutral-400 hover:text-red-500 transition-all"
                  >
                    <Trash2 size={18} />
                  </button>
                </div>
              ))
            )}
          </div>
          {cartItems.length > 0 && (
            <div className="p-8 border-t border-black bg-white space-y-6">
              <div className="flex justify-between text-3xl font-bold uppercase font-grotesk pt-2">
                <span>Total</span>
                <span className="text-brand-accent">${total}</span>
              </div>
              <button 
                onClick={onCheckout}
                className="w-full bg-brand-black text-white py-6 text-sm font-bold uppercase hover:bg-brand-accent transition-all flex items-center justify-center gap-4 group"
              >
                {t.checkout} <ArrowRight size={18} className="group-hover:translate-x-2 transition-transform" />
              </button>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default CartDrawer;
