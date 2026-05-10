import { useState, useEffect, useCallback } from 'react';
import { useLanguage } from '../context/LanguageContext';
import FadeIn from './FadeIn';

const images = [
  { src: '/images/spiaggia1.jpg', alt: 'Spiaggia' },
  { src: '/images/spiaggia2.jpg', alt: 'Vista mare' },
  { src: '/images/spiaggia3.jpg', alt: 'Tramonto' },
  { src: '/images/spiaggia4.jpg', alt: 'Spiaggia4' },
  { src: '/images/spiaggia5.jpg', alt: 'Spiaggia5' },
  //{ src: '/images/bar.jpg', alt: 'Bar' },
  { src: '/images/tavoli.jpg', alt: 'Tavoli' },
  { src: '/images/piatto.jpg', alt: 'Cucina' },
  { src: '/images/piatto1.jpg', alt: 'Ristorante1' },
  { src: '/images/piatto2.jpg', alt: 'Ristorante2' },
  { src: '/images/piatto3.jpg', alt: 'Ristorante3' },
  //{ src: '/images/piatto4.jpg', alt: 'Ristorante4' },
  //{ src: '/images/risto.jpg', alt: 'Ristorante' },
  { src: '/images/coperto.jpg', alt: 'Coperto' },
  { src: '/images/coperto1.jpg', alt: 'Coperto1' },
  { src: '/images/coperto2.jpg', alt: 'Coperto2' },
  { src: '/images/risto1.jpg', alt: 'Ristorante1' },
  { src: '/images/risto3.jpg', alt: 'Ristorante2' },
];

export default function Gallery() {
  const { t } = useLanguage();
  const [activeIndex, setActiveIndex] = useState(null);

  const openLightbox = (index) => setActiveIndex(index);
  const closeLightbox = () => setActiveIndex(null);

  const goNext = useCallback(() => {
    setActiveIndex((i) => (i + 1) % images.length);
  }, []);

  const goPrev = useCallback(() => {
    setActiveIndex((i) => (i - 1 + images.length) % images.length);
  }, []);

  useEffect(() => {
    if (activeIndex === null) return;
    const handleKey = (e) => {
      if (e.key === 'ArrowRight') goNext();
      if (e.key === 'ArrowLeft') goPrev();
      if (e.key === 'Escape') closeLightbox();
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [activeIndex, goNext, goPrev]);

  // Prevent body scroll when lightbox is open
  useEffect(() => {
    document.body.style.overflow = activeIndex !== null ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [activeIndex]);

  return (
    <section id="gallery" className="py-20 md:py-28 bg-gray-50 px-4">
      <div className="max-w-7xl mx-auto">
        <FadeIn className="text-center mb-16">
          <p className="text-sea font-medium text-sm uppercase tracking-widest mb-3">
            {t('gallery_label')}
          </p>
          <h2 className="text-3xl md:text-4xl font-heading font-bold text-gray-900">
            {t('gallery_title')}
          </h2>
        </FadeIn>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-6">
          {images.map((img, index) => (
            <img
              key={img.src}
              src={img.src}
              alt={img.alt}
              onClick={() => openLightbox(index)}
              className="rounded-xl h-48 md:h-64 w-full object-cover shadow-sm cursor-pointer transition-transform duration-300 hover:scale-[1.03] hover:opacity-90"
            />
          ))}
        </div>
      </div>

      {/* Lightbox */}
      {activeIndex !== null && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/90"
          onClick={closeLightbox}
        >
          {/* Close button */}
          <button
            onClick={closeLightbox}
            className="absolute top-4 right-4 text-white text-3xl leading-none hover:text-gray-300 focus:outline-none"
            aria-label="Close"
          >
            &times;
          </button>

          {/* Prev */}
          <button
            onClick={(e) => { e.stopPropagation(); goPrev(); }}
            className="absolute left-4 text-white text-4xl leading-none hover:text-gray-300 focus:outline-none select-none"
            aria-label="Previous"
          >
            &#8249;
          </button>

          {/* Image */}
          <img
            src={images[activeIndex].src}
            alt={images[activeIndex].alt}
            onClick={(e) => e.stopPropagation()}
            className="max-h-[85vh] max-w-[90vw] object-contain rounded-lg shadow-2xl"
          />

          {/* Next */}
          <button
            onClick={(e) => { e.stopPropagation(); goNext(); }}
            className="absolute right-4 text-white text-4xl leading-none hover:text-gray-300 focus:outline-none select-none"
            aria-label="Next"
          >
            &#8250;
          </button>

          {/* Dot indicators */}
          <div className="absolute bottom-4 flex gap-2">
            {images.map((_, i) => (
              <button
                key={i}
                onClick={(e) => { e.stopPropagation(); setActiveIndex(i); }}
                className={`w-2.5 h-2.5 rounded-full transition-colors ${i === activeIndex ? 'bg-white' : 'bg-white/40'}`}
                aria-label={`Go to image ${i + 1}`}
              />
            ))}
          </div>
        </div>
      )}
    </section>
  );
}
