import { getTranslations } from 'next-intl/server';
import Link from 'next/link';
import Logo from '@/components/layout/Logo';

export default async function Footer() {
  const t = await getTranslations('footer');
  const companyName = process.env.NEXT_PUBLIC_COMPANY_NAME ?? 'Cloud';
  const brandName = process.env.NEXT_PUBLIC_BRAND_NAME ?? 'Cloud';
  const companyLink = process.env.NEXT_PUBLIC_COMPANY_LINK;
  const year = new Date().getFullYear();

  return (
    <footer className="bg-slate-900 text-gray-400">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        {/* Top row: logo left, documents right */}
        <div className="flex flex-col sm:flex-row items-start justify-between gap-8 mb-8">
          <Logo companyName={brandName} nameClassName="text-white" />

          <div className="grid grid-cols-2 gap-x-12 gap-y-3 text-sm">
            <Link href="/docs/pravila-ispolzovaniya.pdf" className="hover:text-white transition-colors duration-150">
              {t('pravilaIspolzovaniya')}
            </Link>
            <Link href="/docs/cookie-policy.pdf" className="hover:text-white transition-colors duration-150">
              {t('cookiePolicy')}
            </Link>
            <Link href="/docs/data-processing.pdf" className="hover:text-white transition-colors duration-150">
              {t('dataProcessing')}
            </Link>
            <Link href="/docs/privacy-policy.pdf" className="hover:text-white transition-colors duration-150">
              {t('privacyPolicy')}
            </Link>
          </div>
        </div>

        {/* Bottom row: copyright */}
        <div className="border-t border-slate-700/60 pt-6">
          <p className="text-sm text-gray-500">
            © {year}{' '}
            {companyLink ? (
              <a href={companyLink} className="hover:underline" target="_blank" rel="noopener noreferrer">
                {companyName}
              </a>
            ) : (
              companyName
            )}
            . {t('copyrightSuffix')}
          </p>
        </div>
      </div>
    </footer>
  );
}
