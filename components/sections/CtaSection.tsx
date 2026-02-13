import { getTranslations } from 'next-intl/server';
import Button from '@/components/ui/Button';

export default async function CtaSection() {
  const t = await getTranslations('cta');
  const companyName = process.env.NEXT_PUBLIC_COMPANY_NAME ?? 'Cloud Expert';

  return (
    <section className="relative min-h-[50vh] bg-gradient-to-br from-blue-600 via-blue-700 to-blue-900 flex items-center overflow-hidden">
      {/* Decorative circles */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-white/5 rounded-full -translate-x-1/2 -translate-y-1/2 pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-80 h-80 bg-white/5 rounded-full translate-x-1/3 translate-y-1/3 pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center w-full">
        <h2 className="text-4xl sm:text-5xl font-bold text-white mb-6 max-w-3xl mx-auto leading-tight tracking-tight">
          {t('heading')}
        </h2>
        <p className="text-blue-100 text-lg mb-10 max-w-2xl mx-auto leading-relaxed">
          {t('description', { companyName })}
        </p>
        <Button href="#contact" variant="white" className="text-base px-10 py-3.5">
          {t('button')}
        </Button>
      </div>
    </section>
  );
}
