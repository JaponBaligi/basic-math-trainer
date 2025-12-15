import type { Language } from '../types/language';
import { useLanguage } from '../contexts/LanguageContext';

const languages: { code: Language; label: string }[] = [
  { code: 'en', label: 'EN' },
  { code: 'tr', label: 'TR' },
];

export function LanguageSelector() {
  const { language, setLanguage } = useLanguage();

  return (
    <div className="language-selector">
      {languages.map((lang) => (
        <button
          key={lang.code}
          type="button"
          className={`language-button ${language === lang.code ? 'active' : ''}`}
          onClick={() => setLanguage(lang.code)}
        >
          {lang.label}
        </button>
      ))}
    </div>
  );
}

