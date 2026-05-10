import { useLanguage } from '../context/LanguageContext';
import FadeIn from './FadeIn';

export default function About() {
  const { t } = useLanguage();

  return (
    <section id="about" className="py-20 md:py-28 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="grid md:grid-cols-2 gap-12 md:gap-16 items-center">
          <FadeIn>
            <p className="text-sea font-medium text-sm uppercase tracking-widest mb-3">
              {t('about_label')}
            </p>
            <h2 className="text-3xl md:text-4xl font-heading font-bold text-gray-900 mb-6">
              {t('about_title')}
            </h2>
            <p className="text-gray-600 leading-relaxed mb-4">{t('about_text1')}</p>
            <p className="text-gray-600 leading-relaxed mb-6">{t('about_text2')}</p>
            <div className="flex items-center gap-4">
              <img
                src="/images/boia.jpg"
                alt="Il proprietario"
                className="w-14 h-14 rounded-full object-cover border-2 border-sand"
              />
              <div>
                <p className="font-semibold text-gray-900">{t('about_owner_name')}</p>
                <p className="text-sm text-gray-500">{t('about_owner_role')}</p>
              </div>
            </div>
          </FadeIn>
          <FadeIn>
            <img
              src="/images/history.jpg"
              alt="Storia di Boiani Beach"
              className="rounded-2xl shadow-xl w-full h-[400px] md:h-[500px] object-cover"
            />
          </FadeIn>
        </div>
      </div>
    </section>
  );
}
