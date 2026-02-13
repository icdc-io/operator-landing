'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import { Server, Wrench, Network, HardDrive, Headphones, Building2 } from 'lucide-react';

const TAB_ICONS = {
  compute: Server,
  tools: Wrench,
  network: Network,
  storage: HardDrive,
  support: Headphones,
  infrastructure: Building2,
} as const;

type TabKey = keyof typeof TAB_ICONS;
const TAB_KEYS: TabKey[] = ['compute', 'tools', 'network', 'storage', 'infrastructure', 'support'];

interface ServiceItem {
  title: string;
  description: string;
}

export default function TabsSection() {
  const t = useTranslations('tabs');
  const [activeTab, setActiveTab] = useState<TabKey>('compute');

  const services = t.raw(`items.${activeTab}.services`) as ServiceItem[];

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">{t('heading')}</h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto leading-relaxed">{t('description')}</p>
        </div>

        {/* Tab buttons */}
        {/* Mobile: 2-col grid of pill buttons; sm+: horizontal underline bar */}
        <div className="sm:hidden grid grid-cols-2 gap-2 mb-6">
          {TAB_KEYS.map((tab) => {
            const Icon = TAB_ICONS[tab];
            const isActive = activeTab === tab;
            return (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`flex items-center justify-center gap-2 px-4 py-3 rounded-xl text-sm font-medium transition-all duration-200 cursor-pointer border ${
                  isActive
                    ? 'bg-blue-600 text-white border-blue-600'
                    : 'bg-white text-gray-500 border-gray-200 hover:border-blue-300 hover:text-blue-600'
                }`}
              >
                <Icon size={16} />
                {t(`items.${tab}.label`)}
              </button>
            );
          })}
        </div>
        <div className="hidden sm:flex flex-wrap gap-0 border-b border-gray-200 mb-8">
          {TAB_KEYS.map((tab) => {
            const Icon = TAB_ICONS[tab];
            const isActive = activeTab === tab;
            return (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`flex items-center gap-2 px-5 py-3.5 text-sm font-medium border-b-2 transition-all duration-200 -mb-px cursor-pointer ${
                  isActive
                    ? 'border-blue-600 text-blue-600 bg-blue-50/50'
                    : 'border-transparent text-gray-500 hover:text-gray-800 hover:border-gray-300'
                }`}
              >
                <Icon size={16} />
                {t(`items.${tab}.label`)}
              </button>
            );
          })}
        </div>

        {/* Content */}
        <div className="bg-slate-900 rounded-2xl p-6 sm:p-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {services.map((service, idx) => (
              <div
                key={idx}
                className="p-5 rounded-xl bg-slate-800/60 border border-slate-700/50 hover:border-blue-500/40 hover:bg-slate-800 transition-all duration-200 group"
              >
                <div className="w-2 h-2 rounded-full bg-blue-500 mb-3 group-hover:bg-blue-400 transition-colors" />
                <h3 className="text-white font-semibold mb-2 text-sm leading-snug">{service.title}</h3>
                <p className="text-gray-400 text-sm leading-relaxed">{service.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
