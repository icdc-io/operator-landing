import { getTranslations } from 'next-intl/server';
import { Zap, Scale, Clock, Shield, Globe, Lock, BarChart3, DollarSign } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';

const ICON_MAP: Record<string, LucideIcon> = {
  Zap, Scale, Clock, Shield, Globe, Lock, BarChart3, DollarSign,
};

interface BenefitItem {
  icon: string;
  title: string;
  description: string;
}

export default async function GpuBenefitsSection() {
  const t = await getTranslations('gpuBenefits');
  const items = t.raw('items') as BenefitItem[];

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-14">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">{t('heading')}</h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto leading-relaxed">{t('description')}</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {items.map((item, idx) => {
            const Icon = ICON_MAP[item.icon] ?? Zap;
            return (
              <div
                key={idx}
                className="group p-6 rounded-xl border border-gray-100 hover:border-blue-200 hover:shadow-md bg-slate-50 hover:bg-white transition-all duration-200"
              >
                <div className="w-12 h-12 bg-blue-600/10 rounded-xl flex items-center justify-center mb-4 group-hover:bg-blue-600 transition-colors duration-200">
                  <Icon size={22} className="text-blue-600 group-hover:text-white transition-colors duration-200" />
                </div>
                <h3 className="font-semibold text-gray-900 mb-2 text-sm leading-snug">{item.title}</h3>
                <p className="text-sm text-gray-600 leading-relaxed">{item.description}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
