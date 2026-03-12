import { getTranslations } from 'next-intl/server';
import Link from 'next/link';
import { existsSync } from 'fs';
import { join } from 'path';
import Logo from '@/components/layout/Logo';

const REQUIRED_DOCS = [
  { key: 'pravilaIspolzovaniya', href: '/docs/pravila-ispolzovaniya.pdf' },
  { key: 'cookiePolicy', href: '/docs/cookie-policy.pdf' },
  { key: 'privacyPolicy', href: '/docs/privacy-policy.pdf' },
  { key: 'dataProcessing', href: '/docs/data-processing.pdf' },
] as const;

const OPTIONAL_DOCS = [
  { key: 'priceList', file: 'price.pdf' },
  { key: 'publicAgreement', file: 'public-contract.pdf' },
  { key: 'serviceLevelAgreement', file: 'public-contract-sla.pdf' },
  { key: 'paymentOfServices', file: 'payment.pdf' },
  { key: 'positionOfPublicAgreement', file: 'public-contract-legal.pdf' },
] as const;

export default async function Footer() {
  const t = await getTranslations('footer');
  const companyName = process.env.NEXT_PUBLIC_COMPANY_NAME ?? 'Cloud';
  const brandName = process.env.NEXT_PUBLIC_BRAND_NAME ?? 'Cloud';
  const companyLink = process.env.NEXT_PUBLIC_COMPANY_LINK;
  const year = new Date().getFullYear();

  const docsDir = join(process.cwd(), 'public', 'docs');
  const availableOptional = OPTIONAL_DOCS.filter(({ file }) => existsSync(join(docsDir, file)));

  return (
    <footer className="bg-slate-900 text-gray-400">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        {/* Top row: logo left, documents right */}
        <div className="flex flex-col sm:flex-row items-start justify-between gap-8 mb-8">
          <Logo companyName={brandName} nameClassName="text-white" />

          {availableOptional.length > 0 ? (
            <div className="flex flex-col sm:flex-row gap-x-12 gap-y-6 text-sm">
              <div className="flex flex-col gap-y-3">
                {REQUIRED_DOCS.map(({ key, href }) => (
                  <Link key={key} href={href} className="hover:text-white transition-colors duration-150">
                    {t(key)}
                  </Link>
                ))}
              </div>
              <div className="flex flex-col gap-y-3">
                {availableOptional.map(({ key, file }) => (
                  <Link key={key} href={`/docs/${file}`} className="hover:text-white transition-colors duration-150">
                    {t(key)}
                  </Link>
                ))}
              </div>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-12 gap-y-3 text-sm">
              {REQUIRED_DOCS.map(({ key, href }) => (
                <Link key={key} href={href} className="hover:text-white transition-colors duration-150">
                  {t(key)}
                </Link>
              ))}
            </div>
          )}
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
