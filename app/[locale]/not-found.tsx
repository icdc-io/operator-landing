import { getTranslations } from 'next-intl/server';
import Link from 'next/link';

export default async function NotFound() {
  const t = await getTranslations('notFound');

  return (
    <div className="min-h-screen bg-slate-900 flex items-center justify-center px-4">
      <div className="text-center">
        <p className="text-7xl font-bold text-blue-500 mb-4">{t('code')}</p>
        <h1 className="text-3xl sm:text-4xl font-bold text-white mb-4">{t('heading')}</h1>
        <p className="text-gray-400 text-lg mb-8 max-w-md mx-auto">{t('description')}</p>
        <Link
          href="/"
          className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-3 rounded-xl transition-colors duration-200"
        >
          {t('back')}
        </Link>
      </div>
    </div>
  );
}
