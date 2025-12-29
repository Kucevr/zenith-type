
import React, { useState, useCallback, useMemo } from 'react';
import Header from './components/Header';
import FontGrid from './components/FontGrid';
import FontTester from './components/FontTester';
import Toast from './components/Toast';
import Hero from './components/Hero';
import ManifestoSection from './components/ManifestoSection';
import PosterStudio from './components/PosterStudio';
import Services from './components/Services';
import FilterBar from './components/FilterBar';
import Licensing from './components/Licensing';
import About from './components/About';
import Footer from './components/Footer';
import CustomCursor from './components/CustomCursor';
import FoundryLab from './components/FoundryLab';
import VariableSandbox from './components/VariableSandbox';
import CartDrawer from './components/CartDrawer';
import Showcase from './components/Showcase';
import LegalModal, { LegalType } from './components/LegalModal';

import { fonts } from './data/fonts';
import { Font, Language } from './types';
import { translations } from './data/translations';
import { Star } from 'lucide-react';

const App: React.FC = () => {
  const [language, setLanguage] = useState<Language>('en');
  const [selectedFont, setSelectedFont] = useState<Font>(fonts[0]);
  const [activeFilter, setActiveFilter] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [cartIds, setCartIds] = useState<string[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [legalModal, setLegalModal] = useState<LegalType>(null);
  const [toast, setToast] = useState<{ visible: boolean; message: string }>({ visible: false, message: '' });

  const t = translations[language];

  // Optimized derived data
  const cartItems = useMemo(() => 
    cartIds.map(id => fonts.find(f => f.id === id)!).filter(Boolean),
    [cartIds]
  );

  const filteredFonts = useMemo(() => {
    return fonts.filter(font => {
      const matchesFilter = activeFilter === 'All' || font.category === activeFilter;
      const matchesSearch = font.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                           font.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
      return matchesFilter && matchesSearch;
    });
  }, [activeFilter, searchQuery]);

  // Memoized handlers
  const handleAddToCart = useCallback((font: Font) => {
    if (cartIds.includes(font.id)) {
      setToast({ visible: true, message: language === 'en' ? `${font.name} is already in your cart` : `${font.name} уже в корзине` });
      setIsCartOpen(true);
      return;
    }
    setCartIds(prev => [...prev, font.id]);
    setToast({ visible: true, message: language === 'en' ? `Added ${font.name} to cart` : `Добавлено: ${font.name}` });
  }, [cartIds, language]);

  const handleRemoveFromCart = useCallback((fontId: string) => {
    setCartIds(prev => prev.filter(id => id !== fontId));
  }, []);

  const handleDownloadTrial = useCallback(() => {
    setToast({ visible: true, message: language === 'en' ? 'Trial fonts package downloaded' : 'Пакет пробных шрифтов скачан' });
  }, [language]);

  const handleApplyStudent = useCallback(() => setToast({ visible: true, message: language === 'en' ? 'Student Verification Portal Opened' : 'Портал верификации студентов открыт' }), [language]);
  const handleBuyFreelance = useCallback(() => setIsCartOpen(true), []);
  const handleContactEnterprise = useCallback(() => setToast({ visible: true, message: language === 'en' ? 'Contact Form Dispatched' : 'Форма обратной связи отправлена' }), [language]);
  const handleSubscribe = useCallback(() => setToast({ visible: true, message: language === 'en' ? 'Subscription Confirmed' : 'Подписка подтверждена' }), [language]);
  const handleBuyBundle = useCallback(() => handleAddToCart({ id: 'bundle', name: 'Zenith Bundle 2024', price: 250 } as Font), [handleAddToCart]);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "Zenith Type Foundry",
    "url": "https://zenith-type.com",
    "logo": "https://zenith-type.com/logo.png",
    "description": "Independent digital type foundry specializing in high-performance retail and custom typefaces.",
    "offers": fonts.map(font => ({
      "@type": "Offer",
      "itemOffered": {
        "@type": "Product",
        "name": font.name,
        "description": font.description,
        "brand": {
          "@type": "Brand",
          "name": "Zenith Type"
        }
      },
      "price": font.price,
      "priceCurrency": "USD"
    }))
  };

  return (
    <div className="min-h-screen flex flex-col font-sans bg-brand-light selection:bg-brand-lime selection:text-black">
      <script type="application/ld+json">
        {JSON.stringify(jsonLd)}
      </script>
      <CustomCursor />
      
      <Header 
        language={language}
        setLanguage={setLanguage}
        cartCount={cartIds.length} 
        onCartToggle={() => setIsCartOpen(!isCartOpen)} 
      />
      
      <CartDrawer 
        language={language}
        isOpen={isCartOpen} 
        onClose={() => setIsCartOpen(false)} 
        cartItems={cartItems}
        onRemove={handleRemoveFromCart}
      />
      
      <Toast 
        isVisible={toast.visible} 
        message={toast.message} 
        onClose={() => setToast({ ...toast, visible: false })} 
      />

      <main className="flex-1">
        <Hero 
          language={language}
          featuredFont={fonts[0]} 
          onAddToCart={handleAddToCart} 
          onDownloadTrial={handleDownloadTrial}
          totalFonts={fonts.length}
        />

        <ManifestoSection language={language} />

        <section id="typefaces" className="scroll-mt-20">
          <div className="flex flex-col bg-white">
             <FilterBar 
               language={language}
               activeFilter={activeFilter} 
               setActiveFilter={setActiveFilter} 
               searchQuery={searchQuery}
               setSearchQuery={setSearchQuery}
               count={filteredFonts.length} 
             />
             
             <FontGrid 
                 fonts={filteredFonts} 
                 selectedFontId={selectedFont.id}
                 onFontSelect={setSelectedFont} 
                 onAddToCart={handleAddToCart}
                 language={language}
             />
             
             <div className="bg-brand-black text-brand-light p-8 md:p-12 flex flex-col md:flex-row justify-between items-start md:items-end border-b border-neutral-800 gap-8">
                <div className="max-w-xl">
                   <h3 className="text-4xl md:text-5xl font-bold uppercase font-grotesk leading-none mb-6">
                     {language === 'en' ? 'Specimen Tester' : 'Тестировщик шрифтов'}
                   </h3>
                   <p className="text-neutral-400 text-sm md:text-base font-mono leading-relaxed">
                     {language === 'en' 
                        ? 'Live interaction with our core library. Adjust weight axes, optical sizing, and spatial tracking.' 
                        : 'Взаимодействие с нашей основной библиотекой. Настройка веса, оптических размеров и трекинга.'}
                   </p>
                </div>
                <div className="text-left md:text-right w-full md:w-auto p-6 border border-neutral-800 bg-neutral-900/50 backdrop-blur-sm">
                   <div className="text-xs uppercase text-neutral-500 mb-2 tracking-widest">
                     {language === 'en' ? 'Selected Specimen' : 'Выбранный образец'}
                   </div>
                   <div className="text-3xl font-bold text-brand-lime flex items-center justify-end gap-3 font-grotesk">
                      {selectedFont.name} <Star size={20} fill="#D4FF00" className="animate-spin-slow" />
                   </div>
                </div>
             </div>
             
             <FontTester language={language} activeFont={selectedFont} />
          </div>
        </section>

        <section id="showcase" className="scroll-mt-20">
          <Showcase language={language} />
        </section>

        <section id="sandbox" className="scroll-mt-20">
          <VariableSandbox language={language} />
        </section>

        <section id="studio" className="scroll-mt-20">
          <PosterStudio language={language} />
        </section>

        <FoundryLab language={language} />

        <section id="services" className="scroll-mt-20">
          <Services language={language} />
        </section>

        <section id="licensing" className="scroll-mt-20">
          <Licensing 
            language={language}
            onApplyStudent={handleApplyStudent}
            onBuyFreelance={handleBuyFreelance}
            onContactEnterprise={handleContactEnterprise}
            onOpenLegal={setLegalModal}
          />
        </section>

        <section id="about" className="scroll-mt-20">
          <About 
            language={language}
            fontCount={fonts.length} 
            onBuyBundle={handleBuyBundle} 
          />
        </section>

      </main>

      <Footer 
        language={language} 
        onSubscribe={handleSubscribe} 
        onOpenLegal={setLegalModal}
      />

      <LegalModal 
        type={legalModal} 
        language={language} 
        onClose={() => setLegalModal(null)} 
      />
    </div>
  );
};

export default App;
