import { useLanguage } from '../context/LanguageContext';
import FadeIn from './FadeIn';

const serviceIcons = {
  beach: (
    <svg className="w-8 h-8 text-sea" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
    </svg>
  ),
  restaurant: (
    <svg className="w-8 h-8 text-sea" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M6 2v7a3 3 0 006 0V2M9 12v10M18 2v20M15 2c0 4 3 6 3 6" />
    </svg>
  ),
  bar: (
    <svg className="w-8 h-8 text-sea" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M5 3h14L12 13v8M9 21h6" />
    </svg>
  ),
  boat: (
    <svg className="w-8 h-8 text-sea" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 2a3 3 0 100 6 3 3 0 000-6zm0 6v12M3 14h18M5 20c1.5-2 4-3 7-3s5.5 1 7 3" />
    </svg>
  ),
};

const services = [
  { icon: 'beach', titleKey: 'service_beach_title', descKey: 'service_beach_desc' },
  { icon: 'restaurant', titleKey: 'service_restaurant_title', descKey: 'service_restaurant_desc' },
  { icon: 'bar', titleKey: 'service_bar_title', descKey: 'service_bar_desc' },
  { icon: 'boat', titleKey: 'service_boat_title', descKey: 'service_boat_desc' },
];

export default function Services() {
  const { t } = useLanguage();

  return (
    <section id="services" className="py-20 md:py-28 bg-gray-50 px-4">
      <div className="max-w-7xl mx-auto">
        <FadeIn className="text-center mb-16">
          <p className="text-sea font-medium text-sm uppercase tracking-widest mb-3">
            {t('services_label')}
          </p>
          <h2 className="text-3xl md:text-4xl font-heading font-bold text-gray-900">
            {t('services_title')}
          </h2>
        </FadeIn>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {services.map((svc) => (
            <FadeIn key={svc.icon}>
              <div className="bg-white rounded-2xl p-8 shadow-sm hover:shadow-md transition-shadow text-center group h-full">
                <div className="w-16 h-16 bg-sand/50 rounded-full flex items-center justify-center mx-auto mb-5 group-hover:bg-sand transition-colors">
                  {serviceIcons[svc.icon]}
                </div>
                <h3 className="text-xl font-heading font-semibold text-gray-900 mb-3">
                  {t(svc.titleKey)}
                </h3>
                <p className="text-gray-600 text-sm leading-relaxed">{t(svc.descKey)}</p>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}
