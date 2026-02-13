'use client';

import { useState, useEffect } from 'react';
import { useTranslations } from 'next-intl';
import Link from 'next/link';

const STORAGE_KEY = 'cloud-expert-cookie-accepted';

export default function CookieNotice() {
  const t = useTranslations('cookie');
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const accepted = localStorage.getItem(STORAGE_KEY);
    if (!accepted) setVisible(true);
  }, []);

  const handleAccept = () => {
    localStorage.setItem(STORAGE_KEY, 'true');
    setVisible(false);
  };

  if (!visible) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 bg-slate-900 border-t border-slate-700 shadow-2xl">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
          <p className="text-sm text-gray-300 flex-1 leading-relaxed">
            {t('text')}{' '}
            <Link href="/docs/cookie-policy.pdf" className="text-blue-400 hover:text-blue-300 underline underline-offset-2 transition-colors">
              {t('cookiePolicy')}
            </Link>
            {', '}
            <Link href="/docs/privacy-policy.pdf" className="text-blue-400 hover:text-blue-300 underline underline-offset-2 transition-colors">
              {t('privacyPolicy')}
            </Link>
            {', '}
            <Link href="/docs/data-processing.pdf" className="text-blue-400 hover:text-blue-300 underline underline-offset-2 transition-colors">
              {t('dataProcessing')}
            </Link>
            .
          </p>
          <button
            onClick={handleAccept}
            className="flex-shrink-0 bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold px-6 py-2.5 rounded-lg transition-colors duration-150 cursor-pointer"
          >
            {t('accept')}
          </button>
        </div>
      </div>
    </div>
  );
}
