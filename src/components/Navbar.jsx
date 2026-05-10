import { useState, useEffect } from 'react';
import { useLanguage } from '../context/LanguageContext';

export default function Navbar() {
  const { t, toggleLang, lang } = useLanguage();
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const links = [
    { href: '#about', key: 'nav_about' },
    { href: '#services', key: 'nav_services' },
    { href: '#gallery', key: 'nav_gallery' },
    { href: '#reviews', key: 'nav_reviews' },
    { href: '#contact', key: 'nav_contact' },
  ];

  return (
    <nav className={`fixed top-0 w-full z-50 transition-all duration-300 ${scrolled ? 'bg-white/95 backdrop-blur-sm shadow-sm' : 'bg-transparent'}`}>
      <div className="w-full px-4 sm:px-6 lg:px-8">
        <div className="flex justify-end items-center h-16 md:h-20">

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-8">
            {links.map((link) => (
              <a
                key={link.key}
                href={link.href}
                className={`nav-link text-sm font-medium transition-colors ${scrolled ? 'text-gray-700 hover:text-sea' : 'text-white/90 hover:text-white'}`}
              >
                {t(link.key)}
              </a>
            ))}
            <button
              onClick={toggleLang}
              className={`ml-4 px-3 py-1.5 border-2 text-xs font-bold rounded-full transition-all cursor-pointer flex items-center gap-1.5 ${scrolled ? 'border-sea text-sea hover:bg-sea hover:text-white' : 'border-white text-white hover:bg-white hover:text-sea'}`}
            >
              <img
                src={lang === 'it' ? 'https://flagcdn.com/gb.svg' : 'https://flagcdn.com/it.svg'}
                alt={lang === 'it' ? 'English' : 'Italiano'}
                className="w-5 h-3.5 object-cover rounded-sm"
              />
              <span>{lang === 'it' ? 'ENG' : 'ITA'}</span>
            </button>
          </div>

          {/* Mobile Controls */}
          <div className="flex items-center gap-3 md:hidden">
            <button
              onClick={toggleLang}
              className={`px-2.5 py-1 border-2 text-xs font-bold rounded-full transition-all cursor-pointer flex items-center gap-1 ${scrolled ? 'border-sea text-sea hover:bg-sea hover:text-white' : 'border-white text-white hover:bg-white hover:text-sea'}`}
            >
              <img
                src={lang === 'it' ? 'https://flagcdn.com/gb.svg' : 'https://flagcdn.com/it.svg'}
                alt={lang === 'it' ? 'English' : 'Italiano'}
                className="w-5 h-3.5 object-cover rounded-sm"
              />
              <span>{lang === 'it' ? 'ENG' : 'ITA'}</span>
            </button>
            <button onClick={() => setMenuOpen(!menuOpen)} className={`p-1 cursor-pointer ${scrolled ? 'text-sea' : 'text-white'}`}>
              <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {menuOpen && (
          <div className="md:hidden pb-4 border-t border-gray-100">
            <div className="flex flex-col gap-3 pt-4 items-center">
              {links.map((link) => (
                <a
                  key={link.key}
                  href={link.href}
                  onClick={() => setMenuOpen(false)}
                  className="text-gray-700 hover:text-sea font-medium px-2 py-1"
                >
                  {t(link.key)}
                </a>
              ))}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
