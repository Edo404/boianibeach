import { useLanguage } from '../context/LanguageContext';
import FadeIn from './FadeIn';

export default function Restaurant() {
  const { t } = useLanguage();

  return (
    <section className="py-20 md:py-28 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="grid md:grid-cols-2 gap-8 md:gap-12 items-center">
          <FadeIn>
            <div className="grid grid-cols-2 gap-4">
              <img src="/images/piatto.jpg" alt="Piatto di pesce" className="rounded-xl h-64 w-full object-cover shadow-lg" />
              <img src="/images/piatto1.jpg" alt="Specialità" className="rounded-xl h-64 w-full object-cover shadow-lg mt-8" />
            </div>
          </FadeIn>
          <FadeIn>
            <p className="text-sea font-medium text-sm uppercase tracking-widest mb-3">
              {t('restaurant_label')}
            </p>
            <h2 className="text-3xl md:text-4xl font-heading font-bold text-gray-900 mb-6">
              {t('restaurant_title')}
            </h2>
            <p className="text-gray-600 leading-relaxed mb-6">{t('restaurant_text')}</p>
            <a
              href="tel:+393343538191"
              className="inline-flex items-center gap-2 bg-sea text-white px-6 py-3 rounded-full font-medium hover:bg-sea/90 transition-colors"
            >
              {t('restaurant_cta')}
            </a>
          </FadeIn>
        </div>
      </div>
    </section>
  );
}
