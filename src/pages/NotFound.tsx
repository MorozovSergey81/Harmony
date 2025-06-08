import { Link } from 'react-router-dom';
import { useLanguage } from '../contexts/LanguageContext';

const NotFound = () => {
  const { t } = useLanguage();

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-teal-50 to-cyan-50 dark:from-gray-900 dark:via-gray-800 dark:to-emerald-900 flex items-center justify-center p-4">
      <div className="text-center">
        <h1 className="text-6xl font-bold text-emerald-600 dark:text-emerald-400 mb-4">404</h1>
        <p className="text-xl text-gray-600 dark:text-gray-300 mb-6">{t('pageNotFound')}</p>
        <Link
          to="/"
          className="inline-block bg-gradient-to-r from-emerald-500 to-teal-500 text-white px-6 py-3 rounded-xl font-medium hover:from-emerald-600 hover:to-teal-600 transition-all"
        >
          {t('backToHome')}
        </Link>
      </div>
    </div>
  );
};

export default NotFound;
