import { existsSync } from 'fs';
import { join } from 'path';
import { getTranslations } from 'next-intl/server';
import Link from 'next/link';
import Logo from '@/components/layout/Logo';

export default async function Footer() {
  const t = await getTranslations('footer');
  const companyName = process.env.NEXT_PUBLIC_COMPANY_NAME ?? 'Cloud';
  const brandName = process.env.NEXT_PUBLIC_BRAND_NAME ?? 'Cloud';
  const year = new Date().getFullYear();

  const hasCookiePolicy = Boolean(process.env.GA_DATASTREAM_ID);
  const docsDir = join(process.cwd(), 'public', 'docs');
  const hasDataProcessing = existsSync(join(docsDir, 'data-processing.pdf'));
  const hasTermsOfService = existsSync(join(docsDir, 'terms-of-service.pdf'));

  return (
    <footer className="bg-slate-900 text-gray-400">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          {/* Logo */}
          <Logo companyName={brandName} nameClassName="text-white" />

          {/* Links */}
          <div className="grid grid-cols-2 gap-x-6 gap-y-2 text-sm">
            <Link href="/docs/privacy-policy.pdf" className="hover:text-white transition-colors duration-150">
              {t('privacyPolicy')}
            </Link>
            {hasCookiePolicy && (
              <Link href="/docs/cookie-policy.pdf" className="hover:text-white transition-colors duration-150">
                {t('cookiePolicy')}
              </Link>
            )}
            {hasDataProcessing && (
              <Link href="/docs/data-processing.pdf" className="hover:text-white transition-colors duration-150">
                {t('dataProcessing')}
              </Link>
            )}
            {hasTermsOfService && (
              <Link href="/docs/terms-of-service.pdf" className="hover:text-white transition-colors duration-150">
                {t('terms')}
              </Link>
            )}
          </div>

          {/* Copyright */}
          <p className="text-sm text-gray-500">© {year} {companyName}. {t('copyrightSuffix')}</p>
        </div>
      </div>
    </footer>
  );
}
