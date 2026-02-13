import { getTranslations } from 'next-intl/server';
import Link from 'next/link';
import Logo from '@/components/layout/Logo';

export default async function Footer() {
  const t = await getTranslations('footer');
  const companyName = process.env.NEXT_PUBLIC_COMPANY_NAME ?? 'Cloud Expert';
  const year = new Date().getFullYear();

  return (
    <footer className="bg-slate-900 text-gray-400">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          {/* Logo */}
          <Logo companyName={companyName} nameClassName="text-white" />

          {/* Links */}
          <div className="flex items-center gap-6 text-sm">
            <Link href="/docs/privacy-policy.pdf" className="hover:text-white transition-colors duration-150">
              {t('privacyPolicy')}
            </Link>
            <Link href="/docs/data-processing.pdf" className="hover:text-white transition-colors duration-150">
              {t('terms')}
            </Link>
          </div>

          {/* Copyright */}
          <p className="text-sm text-gray-500">© {year} {companyName}. {t('copyrightSuffix')}</p>
        </div>
      </div>
    </footer>
  );
}
