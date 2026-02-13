import { setRequestLocale } from 'next-intl/server';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import CookieNotice from '@/components/layout/CookieNotice';
import HeroSection from '@/components/sections/HeroSection';
import TabsSection from '@/components/sections/TabsSection';
import GpuVmsSection from '@/components/sections/GpuVmsSection';
import MachineLearningSection from '@/components/sections/MachineLearningSection';
import GpuBenefitsSection from '@/components/sections/GpuBenefitsSection';
import ItSolutionsSection from '@/components/sections/ItSolutionsSection';
import CtaSection from '@/components/sections/CtaSection';
import ContactSection from '@/components/sections/ContactSection';
import SchemaOrg from '@/components/SchemaOrg';
import { parseList } from '@/lib/contact';

type Props = {
  params: Promise<{ locale: string }>;
};

export default async function HomePage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);

  const formId = process.env.FORMSPREE_FORM_ID ?? '';
  const consultationEmails = parseList(process.env.NEXT_PUBLIC_CONSULTATION_EMAILS);
  const consultationPhones = parseList(process.env.NEXT_PUBLIC_CONSULTATION_PHONES);
  const supportEmails = parseList(process.env.NEXT_PUBLIC_SUPPORT_EMAILS);
  const supportPhones = parseList(process.env.NEXT_PUBLIC_SUPPORT_PHONES);
  const socialLinks = parseList(process.env.NEXT_PUBLIC_SOCIAL_LINKS);

  return (
    <>
      <SchemaOrg />
      <Header />
      <main>
        <HeroSection />
        <TabsSection />
        <GpuVmsSection />
        <MachineLearningSection />
        <GpuBenefitsSection />
        <ItSolutionsSection />
        <CtaSection />
        <ContactSection
          formId={formId}
          consultationEmails={consultationEmails}
          consultationPhones={consultationPhones}
          supportEmails={supportEmails}
          supportPhones={supportPhones}
          socialLinks={socialLinks}
        />
      </main>
      <Footer />
      <CookieNotice />
    </>
  );
}
