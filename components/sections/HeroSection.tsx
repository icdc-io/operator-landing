import { getTranslations } from 'next-intl/server';
import Image from 'next/image';
import Button from '@/components/ui/Button';

export default async function HeroSection() {
  const t = await getTranslations('hero');
  const docsUrl = process.env.NEXT_PUBLIC_DOCS_URL;

  return (
    <section className="min-h-screen bg-gradient-to-br from-white via-blue-50/40 to-slate-50 flex items-start">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-10 lg:pt-30 pb-16 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-start lg:items-center">
          {/* Left: text */}
          <div className="space-y-7">
            <div className="inline-flex items-center gap-2 bg-blue-50 text-blue-700 text-sm font-medium px-4 py-2 rounded-full border border-blue-100">
              <span className="w-2 h-2 rounded-full bg-blue-500 animate-pulse" />
              {t('subtitle')}
            </div>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 leading-tight tracking-tight">
              {t('title')}
            </h1>
            <p className="text-lg text-gray-600 max-w-lg leading-relaxed">
              {t('description')}
            </p>
            <div className="pt-2 flex flex-wrap gap-4">
              <Button href="#contact" variant="primary" className="text-base px-8 py-3.5">
                {t('cta')}
              </Button>
              {docsUrl && (
                <Button
                  href={docsUrl}
                  variant="outline"
                  className="text-base px-8 py-3.5"
                  external
                >
                  {t('documentation')}
                </Button>
              )}
            </div>
          </div>

          {/* Right: illustration */}
          <div className="flex justify-center lg:justify-end">
            <div className="relative w-full max-w-xl">
              <div className="absolute inset-0 bg-gradient-to-r from-blue-400 to-cyan-400 rounded-3xl blur-3xl opacity-10 scale-110 pointer-events-none" />
              <Image
                src="/images/hero-cloud.svg"
                alt="Cloud infrastructure diagram"
                width={600}
                height={500}
                className="relative w-full h-auto"
                priority
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
