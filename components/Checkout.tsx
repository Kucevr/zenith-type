
import React, { useState } from 'react';
import { X, ArrowRight, CheckCircle2, CreditCard, User, Mail, ShieldCheck, Download } from 'lucide-react';
import { Font, Language } from '../types';
import { translations } from '../data/translations';

interface CheckoutProps {
  language: Language;
  isOpen: boolean;
  onClose: () => void;
  cartItems: Font[];
  onSuccess: () => void;
}

const Checkout: React.FC<CheckoutProps> = ({ language, isOpen, onClose, cartItems, onSuccess }) => {
  const [step, setStep] = useState<1 | 2 | 3>(1);
  const [formData, setFormData] = useState({
    email: '',
    firstName: '',
    lastName: '',
    cardNumber: '',
    expiry: '',
    cvv: ''
  });
  const [isProcessing, setIsProcessing] = useState(false);

  if (!isOpen) return null;

  const t = translations[language].checkout;
  const total = cartItems.reduce((acc, item) => acc + item.price, 0);

  const handleNext = () => {
    if (step === 1) setStep(2);
    else if (step === 2) {
      setIsProcessing(true);
      // Simulate payment processing
      setTimeout(() => {
        setIsProcessing(false);
        setStep(3);
        onSuccess();
      }, 2000);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  return (
    <div className="fixed inset-0 z-[300] bg-white overflow-y-auto font-sans selection:bg-brand-lime selection:text-black animate-fade-in">
      
      {/* Header */}
      <nav className="sticky top-0 bg-white border-b border-black h-16 md:h-20 flex items-center justify-between px-6 md:px-12 z-10">
        <div className="flex items-center gap-3">
          <div className="w-6 h-6 bg-brand-accent"></div>
          <span className="font-bold text-xl uppercase tracking-tighter font-grotesk">Zenith® Checkout</span>
        </div>
        <button 
          onClick={onClose}
          className="w-10 h-10 border border-black rounded-full flex items-center justify-center hover:bg-black hover:text-white transition-all"
        >
          <X size={20} />
        </button>
      </nav>

      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-0">
        
        {/* Left: Form Flow */}
        <div className="lg:col-span-7 p-6 md:p-12 lg:p-20 border-r border-black min-h-[calc(100vh-80px)]">
          
          {/* Progress Bar */}
          <div className="flex items-center gap-4 mb-16">
            {[1, 2, 3].map((s) => (
              <React.Fragment key={s}>
                <div className={`w-8 h-8 rounded-full border border-black flex items-center justify-center font-mono text-xs font-bold transition-colors ${step >= s ? 'bg-black text-white' : 'bg-transparent text-black'}`}>
                  {s}
                </div>
                {s < 3 && <div className={`flex-1 h-[1px] bg-black ${step > s ? 'opacity-100' : 'opacity-20'}`}></div>}
              </React.Fragment>
            ))}
          </div>

          {step === 1 && (
            <div className="space-y-10 animate-slide-in">
              <div className="space-y-4">
                <h2 className="text-4xl md:text-5xl font-bold uppercase font-grotesk tracking-tighter">{t.personal}</h2>
                <p className="text-neutral-500 font-mono text-sm max-w-md">Enter your professional details to generate the unique license certificate.</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-2">
                  <label className="text-[10px] font-bold uppercase tracking-widest text-neutral-400 font-mono">{t.email}</label>
                  <input 
                    name="email" value={formData.email} onChange={handleInputChange}
                    type="email" placeholder="design@studio.com"
                    className="w-full bg-transparent border-b border-black py-3 text-xl font-bold outline-none focus:border-brand-accent transition-colors uppercase font-grotesk"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-bold uppercase tracking-widest text-neutral-400 font-mono">{t.firstName}</label>
                  <input 
                    name="firstName" value={formData.firstName} onChange={handleInputChange}
                    type="text" placeholder="NAME"
                    className="w-full bg-transparent border-b border-black py-3 text-xl font-bold outline-none focus:border-brand-accent transition-colors uppercase font-grotesk"
                  />
                </div>
              </div>

              <button 
                onClick={handleNext}
                disabled={!formData.email || !formData.firstName}
                className="group flex items-center gap-6 bg-brand-black text-white px-10 py-6 text-sm font-bold uppercase hover:bg-brand-accent transition-all disabled:opacity-20 disabled:cursor-not-allowed"
              >
                Next Step <ArrowRight size={18} className="group-hover:translate-x-2 transition-transform" />
              </button>
            </div>
          )}

          {step === 2 && (
            <div className="space-y-10 animate-slide-in">
              <div className="space-y-4">
                <h2 className="text-4xl md:text-5xl font-bold uppercase font-grotesk tracking-tighter">{t.payment}</h2>
                <div className="flex items-center gap-2 text-brand-lime bg-black px-3 py-1 w-fit text-[10px] font-bold font-mono uppercase tracking-widest">
                  <ShieldCheck size={12} /> Encrypted Transaction
                </div>
              </div>

              <div className="space-y-8">
                <div className="space-y-2">
                  <label className="text-[10px] font-bold uppercase tracking-widest text-neutral-400 font-mono">{t.cardNumber}</label>
                  <div className="relative">
                    <input 
                      name="cardNumber" value={formData.cardNumber} onChange={handleInputChange}
                      type="text" placeholder="•••• •••• •••• ••••"
                      className="w-full bg-transparent border-b border-black py-3 text-xl font-bold outline-none focus:border-brand-accent transition-colors uppercase font-grotesk pr-12"
                    />
                    <CreditCard className="absolute right-0 top-1/2 -translate-y-1/2 opacity-20" size={24} />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-8">
                  <div className="space-y-2">
                    <label className="text-[10px] font-bold uppercase tracking-widest text-neutral-400 font-mono">{t.expiry}</label>
                    <input 
                      name="expiry" value={formData.expiry} onChange={handleInputChange}
                      type="text" placeholder="MM/YY"
                      className="w-full bg-transparent border-b border-black py-3 text-xl font-bold outline-none focus:border-brand-accent transition-colors uppercase font-grotesk"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-bold uppercase tracking-widest text-neutral-400 font-mono">{t.cvv}</label>
                    <input 
                      name="cvv" value={formData.cvv} onChange={handleInputChange}
                      type="password" placeholder="•••"
                      className="w-full bg-transparent border-b border-black py-3 text-xl font-bold outline-none focus:border-brand-accent transition-colors uppercase font-grotesk"
                    />
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <button 
                  onClick={() => setStep(1)}
                  className="px-8 py-6 text-sm font-bold uppercase hover:bg-neutral-100 transition-colors border border-black"
                >
                  Back
                </button>
                <button 
                  onClick={handleNext}
                  disabled={isProcessing}
                  className="flex-1 group flex items-center justify-center gap-6 bg-brand-black text-white py-6 text-sm font-bold uppercase hover:bg-brand-accent transition-all relative overflow-hidden"
                >
                  {isProcessing ? (
                     <span className="flex items-center gap-3"><div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div> Processing...</span>
                  ) : (
                    <>{t.placeOrder} <ArrowRight size={18} className="group-hover:translate-x-2 transition-transform" /></>
                  )}
                </button>
              </div>
            </div>
          )}

          {step === 3 && (
            <div className="space-y-10 animate-zoom-in">
               <div className="w-24 h-24 bg-brand-lime rounded-full flex items-center justify-center text-black">
                 <CheckCircle2 size={48} />
               </div>
               <div className="space-y-4">
                <h2 className="text-4xl md:text-5xl font-bold uppercase font-grotesk tracking-tighter">{t.success}</h2>
                <p className="text-neutral-500 font-mono text-sm max-w-lg leading-relaxed">
                  {t.successDesc}
                </p>
              </div>

              <div className="space-y-4">
                 <button className="w-full bg-brand-lime text-black py-10 text-xl font-bold uppercase hover:bg-black hover:text-white transition-all flex items-center justify-center gap-6 border-2 border-black">
                   <Download size={32} /> {t.download}
                 </button>
                 <button 
                  onClick={onClose}
                  className="w-full py-6 text-sm font-bold uppercase hover:underline transition-all"
                 >
                   {t.back}
                 </button>
              </div>
            </div>
          )}

        </div>

        {/* Right: Summary */}
        <div className="lg:col-span-5 bg-brand-light p-6 md:p-12 lg:p-20 flex flex-col justify-between overflow-hidden relative">
           
           {/* Decorative Background Text */}
           <div className="absolute inset-0 pointer-events-none opacity-[0.03] text-[20vw] font-bold font-grotesk flex flex-col leading-none select-none">
             <span>ZENITH</span>
             <span className="ml-[10vw]">TYPE</span>
             <span>STUDIO</span>
           </div>

           <div className="relative z-10 space-y-12">
             <div className="space-y-6">
                <h3 className="text-xs font-bold uppercase tracking-[0.3em] text-neutral-400 font-mono">Order Summary</h3>
                <div className="space-y-4">
                  {cartItems.map((item, i) => (
                    <div key={i} className="flex justify-between items-end border-b border-black/10 pb-4">
                      <div className="space-y-1">
                        <div className="font-bold text-xl font-grotesk uppercase">{item.name}</div>
                        <div className="text-[9px] font-mono text-neutral-400 uppercase tracking-widest">Retail License • Desktop + Web</div>
                      </div>
                      <div className="font-bold text-lg font-mono">${item.price}</div>
                    </div>
                  ))}
                </div>
             </div>

             <div className="space-y-6">
                <div className="flex justify-between items-end text-neutral-400 font-mono text-xs uppercase tracking-widest">
                  <span>Subtotal</span>
                  <span>${total}</span>
                </div>
                <div className="flex justify-between items-end text-neutral-400 font-mono text-xs uppercase tracking-widest">
                  <span>Vat (0%)</span>
                  <span>$0</span>
                </div>
                <div className="flex justify-between items-end pt-6 border-t border-black text-4xl md:text-5xl font-bold font-grotesk uppercase tracking-tighter">
                  <span>Total</span>
                  <span className="text-brand-accent">${total}</span>
                </div>
             </div>
           </div>

           <div className="relative z-10 mt-12 p-8 border border-black/10 bg-white/50 backdrop-blur-sm space-y-4">
              <div className="flex items-center gap-3 text-[10px] font-bold uppercase tracking-widest">
                <ShieldCheck size={16} /> Secure Foundry System
              </div>
              <p className="text-[8px] font-mono text-neutral-400 uppercase leading-relaxed">
                By completing this purchase, you agree to the Zenith Type Foundry EULA. Fonts are provided as digital downloads only. No physical distribution.
              </p>
           </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
