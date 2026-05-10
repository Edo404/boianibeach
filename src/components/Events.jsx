import { useMemo } from 'react';
import FadeIn from './FadeIn';
import { useLanguage } from '../context/LanguageContext';

const PLACEHOLDER_ITEMS = [
  { id: 'event-1', img: '/images/vini.jpg', title: 'Evento 01', color: '#8FB1CD' },
  { id: 'event-2', img: '/images/crespaia.jpg', title: 'Evento 04', color: '#95B8D1' },
  { id: 'event-3', img: '/images/vini1.jpg', title: 'Evento 02', color: '#A7C7E3' },
  { id: 'event-4', img: '/images/crespaia1.jpg', title: 'Evento 05', color: '#7EA6C9' },
  { id: 'event-5', img: '/images/boiavino.jpg', title: 'Evento 06', color: '#A9C4DA' },
  { id: 'event-6', img: '/images/vini2.jpg', title: 'Evento 03', color: '#74A9CF' },
  { id: 'event-7', img: '/images/boiavino1.jpg', title: 'Evento 07', color: '#6F9AC0' },
];

function createPlaceholderSrc(color) {
  const svg = `<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 1200 1200'>
    <defs>
      <linearGradient id='g' x1='0' y1='0' x2='1' y2='1'>
        <stop offset='0%' stop-color='${color}'/>
        <stop offset='100%' stop-color='#4f708d'/>
      </linearGradient>
    </defs>
    <rect width='1200' height='1200' fill='url(#g)'/>
    <circle cx='980' cy='220' r='170' fill='rgba(255,255,255,0.16)'/>
    <circle cx='220' cy='980' r='190' fill='rgba(255,255,255,0.12)'/>
  </svg>`;

  return `data:image/svg+xml;utf8,${encodeURIComponent(svg)}`;
}

export default function Events() {
  const { t } = useLanguage();

  const marqueeItems = useMemo(
    () =>
      [...PLACEHOLDER_ITEMS, ...PLACEHOLDER_ITEMS].map((item, index) => ({
        ...item,
        renderId: `${item.id}-${index}`,
        src: item.img || createPlaceholderSrc(item.color),
      })),
    [],
  );

  return (
    <section id="events" className="py-20 md:py-24 px-4 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <FadeIn className="text-center mb-12 md:mb-14">
          <p className="text-sea font-medium text-sm uppercase tracking-widest mb-3">
            {t('events_label')}
          </p>
          <h2 className="text-3xl md:text-4xl font-heading font-bold text-gray-900">
            {t('events_title')}
          </h2>
        </FadeIn>

        <div className="events-marquee relative overflow-hidden md:w-screen md:left-1/2 md:-translate-x-1/2">
          <div className="pointer-events-none absolute left-0 top-0 bottom-0 z-10 w-10 md:w-16 bg-gradient-to-r from-white to-transparent" />
          <div className="pointer-events-none absolute right-0 top-0 bottom-0 z-10 w-10 md:w-16 bg-gradient-to-l from-white to-transparent" />

          <div className="events-marquee-track flex items-center w-max gap-4 md:gap-6 py-1 md:py-2">
            {marqueeItems.map((item) => (
              <article
                key={item.renderId}
                className="group relative shrink-0 w-[38vw] min-w-[140px] max-w-[220px] md:w-[18vw] md:max-w-[280px] aspect-square rounded-2xl overflow-hidden border border-gray-100 shadow-md bg-gray-100"
              >
                <img
                  src={item.src}
                  alt={item.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  loading="lazy"
                />
                <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/35 via-black/5 to-transparent" />
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}