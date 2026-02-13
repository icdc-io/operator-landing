import { getTranslations } from 'next-intl/server';

interface StatItem {
  value: string;
  label: string;
}

export default async function ItSolutionsSection() {
  const t = await getTranslations('itSolutions');
  const stats = t.raw('stats') as StatItem[];

  const clientsCount = process.env.NEXT_PUBLIC_CLIENTS_COUNT;
  const networkSpeed = process.env.NEXT_PUBLIC_NETWORK_SPEED;

  const resolvedStats = stats.map((stat, idx) => {
    if (idx === 1 && clientsCount) return { ...stat, value: `${clientsCount}+` };
    if (idx === 3 && networkSpeed) return { ...stat, value: `${networkSpeed} Гбит/с` };
    return stat;
  });

  return (
    <section className="py-20 bg-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          <div>
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-6 leading-tight">
              {t('heading')}
            </h2>
            <p className="text-gray-300 text-lg leading-relaxed">{t('description')}</p>
          </div>

          <div className="grid grid-cols-2 gap-5">
            {resolvedStats.map((stat, idx) => (
              <div
                key={idx}
                className="text-center p-6 bg-slate-700/50 rounded-xl border border-slate-600/50 hover:border-blue-500/40 transition-colors duration-200"
              >
                <p className="text-3xl font-bold text-blue-400 mb-1.5">{stat.value}</p>
                <p className="text-gray-400 text-sm font-medium">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
