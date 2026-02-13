import { getTranslations } from 'next-intl/server';
import Link from 'next/link';
import Button from '@/components/ui/Button';
import Logo from '@/components/layout/Logo';

export default async function Header() {
  const t = await getTranslations('header');
  const companyName = process.env.NEXT_PUBLIC_COMPANY_NAME ?? 'Cloud Expert';
  const loginUrl = process.env.NEXT_PUBLIC_HEADER_LOGIN_URL;

  return (
    <header className="bg-white border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Logo companyName={companyName} nameClassName="text-gray-900" />

          {/* Actions */}
          <div className="flex items-center gap-4">
            {loginUrl && (
              <Link
                href={loginUrl}
                className="text-sm font-medium text-gray-600 hover:text-blue-600 transition-colors duration-150"
              >
                {t('login')}
              </Link>
            )}
            <Button href="#contact" variant="primary">
              {t('order')}
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
}
