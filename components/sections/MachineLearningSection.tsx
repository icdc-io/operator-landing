import { getTranslations } from 'next-intl/server';
import { Cpu, Zap, Layers, Activity } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';

const ICON_MAP: Record<string, LucideIcon> = { Cpu, Zap, Layers, Activity };

interface MLFeature {
  icon: string;
  label: string;
}

export default async function MachineLearningSection() {
  const t = await getTranslations('machineLearning');
  const features = t.raw('features') as MLFeature[];

  return (
    <section className="py-20 bg-slate-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          <div>
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-6 leading-tight">
              {t('heading')}
            </h2>
            <p className="text-gray-300 text-lg leading-relaxed">{t('description')}</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {features.map((feature, idx) => {
              const Icon = ICON_MAP[feature.icon] ?? Cpu;
              return (
                <div
                  key={idx}
                  className="flex items-center gap-4 bg-slate-800 rounded-xl p-5 border border-slate-700 hover:border-blue-500/50 transition-colors duration-200 group"
                >
                  <div className="w-10 h-10 bg-blue-600/20 rounded-lg flex items-center justify-center flex-shrink-0 group-hover:bg-blue-600/30 transition-colors">
                    <Icon size={20} className="text-blue-400" />
                  </div>
                  <span className="text-white font-medium text-sm leading-snug">{feature.label}</span>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
