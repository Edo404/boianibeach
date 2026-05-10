import { useLanguage } from '../context/LanguageContext';

export default function Hero() {
  const { t } = useLanguage();

  return (
    <section
      className="min-h-screen flex items-center justify-center text-center text-white px-4 bg-cover bg-center"
      style={{
        backgroundImage: `linear-gradient(to bottom, rgba(0,0,0,0.3), rgba(0,0,0,0.5)), url('/images/spiaggia4.jpg')`,
      }}
    >
      <div className="max-w-3xl">
        <img
          src="/images/logo-w.png"
          alt="Boiani Beach Logo"
          className="mx-auto mb-4 w-64 sm:w-80 md:w-[45rem] drop-shadow-xl"
        />
        {/* <h1 className="text-4xl sm:text-5xl md:text-6xl font-heading font-bold mb-6 leading-tight">
          {t('hero_title')}
          <br />
          {t('hero_title2')}
        </h1> */}
        <p className="text-lg sm:text-2xl font-light mb-10 text-white/90">
          {t('hero_title')+' '+t('hero_title2')}
        </p>
        <a
          href="tel:+393343538191"
          className="inline-block bg-sea hover:bg-sea/90 text-white font-semibold px-8 py-4 rounded-full text-lg shadow-lg hover:shadow-xl transition-all transform hover:-translate-y-0.5"
        >
          {t('hero_cta')}
        </a>
      </div>
    </section>
  );
}
