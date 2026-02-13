import { getTranslations } from 'next-intl/server';
import { CheckCircle2, Cpu } from 'lucide-react';
import Button from '@/components/ui/Button';

export default async function GpuVmsSection() {
  const t = await getTranslations('gpuVms');
  const features = t.raw('features') as string[];

  return (
    <section className="py-16 bg-slate-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-2">
            {/* Left */}
            <div className="p-8 lg:p-12">
              <span className="inline-block bg-blue-600 text-white text-xs font-bold px-3 py-1 rounded-full mb-5 uppercase tracking-wide">
                {t('badge')}
              </span>
              <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-4 leading-tight">
                {t('heading')}
              </h2>
              <p className="text-gray-600 leading-relaxed mb-7">{t('description')}</p>
              <Button href="#contact" variant="primary">{t('cta')}</Button>
            </div>

            {/* Right */}
            <div className="bg-slate-50 p-8 lg:p-12 flex flex-col justify-center">
              <div className="flex items-center gap-3 mb-7">
                <div className="w-12 h-12 bg-blue-600 rounded-xl flex items-center justify-center flex-shrink-0">
                  <Cpu className="text-white" size={22} />
                </div>
                <div>
                  <p className="font-semibold text-gray-900">NVIDIA GPU Cloud</p>
                  <p className="text-sm text-gray-500">A100 · H100 · L40S</p>
                </div>
              </div>
              <ul className="space-y-3.5">
                {features.map((feature, idx) => (
                  <li key={idx} className="flex items-center gap-3 text-sm text-gray-700">
                    <CheckCircle2 size={18} className="text-blue-600 flex-shrink-0" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
