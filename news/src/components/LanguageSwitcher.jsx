import { useTranslation } from 'react-i18next';
import { FaGlobe } from 'react-icons/fa';

export default function LanguageSwitcher() {
  const { i18n } = useTranslation();

  const toggleLanguage = () => {
    const newLang = i18n.language === 'en' ? 'si' : 'en';
    i18n.changeLanguage(newLang);
  };

  return (
    <button
      onClick={toggleLanguage}
      className="flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl hover:bg-white/20 transition-all duration-300 text-white"
    >
      <FaGlobe className="text-lg" />
      <span className="font-medium">
        {i18n.language === 'en' ? 'සිංහල' : 'English'}
      </span>
    </button>
  );
}
