export default function SchemaOrg() {
  const companyName = process.env.NEXT_PUBLIC_COMPANY_NAME ?? 'Cloud Expert';
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: companyName,
    description:
      'Облачная платформа нового поколения для бизнеса. Виртуальные серверы, GPU-вычисления, безопасное хранилище и поддержка 24/7.',
    url: 'https://cloud-expert.by',
    logo: 'https://cloud-expert.by/images/logo.png',
    contactPoint: [
      {
        '@type': 'ContactPoint',
        telephone: '+375-17-388-00-00',
        contactType: 'sales',
        email: 'info@cloud-expert.by',
        availableLanguage: ['Russian', 'English'],
      },
      {
        '@type': 'ContactPoint',
        telephone: '+375-17-388-00-01',
        contactType: 'technical support',
        email: 'support@cloud-expert.by',
        availableLanguage: ['Russian', 'English'],
        hoursAvailable: 'Mo-Su 00:00-24:00',
      },
    ],
    sameAs: ['https://t.me/cloudexpert', 'https://linkedin.com/company/cloudexpert'],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
