'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import { Mail, Phone, MessageSquare } from 'lucide-react';
import Button from '@/components/ui/Button';
import ContactFormFormspree from './ContactFormFormspree';
import { getSocialMeta } from '@/lib/social';

interface ContactSectionProps {
  formId: string;
  consultationEmails: string[];
  consultationPhones: string[];
  supportEmails: string[];
  supportPhones: string[];
  socialLinks: string[];
}

interface FormErrors {
  email?: string;
  consent?: string;
}

function BasicContactForm() {
  const tf = useTranslations('contact.form');
  const [email, setEmail] = useState('');
  const [comment, setComment] = useState('');
  const [consent1, setConsent1] = useState(false);
  const [consent2, setConsent2] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [errors, setErrors] = useState<FormErrors>({});

  const validate = (): boolean => {
    const newErrors: FormErrors = {};
    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      newErrors.email = tf('emailRequired');
    }
    if (!consent1 || !consent2) {
      newErrors.consent = tf('consentRequired');
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!validate()) return;
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div className="flex items-center justify-center min-h-[300px]">
        <div className="text-center">
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg className="w-8 h-8 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <p className="text-lg font-semibold text-gray-900">{tf('success')}</p>
        </div>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} noValidate className="space-y-5">
      <div>
        <label htmlFor="contact-email" className="block text-sm font-medium text-gray-700 mb-1.5">
          {tf('email')} <span className="text-red-500">*</span>
        </label>
        <input
          id="contact-email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder={tf('emailPlaceholder')}
          className={`w-full px-4 py-3 border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors ${
            errors.email ? 'border-red-400 bg-red-50' : 'border-gray-200'
          }`}
        />
        {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
      </div>

      <div>
        <label htmlFor="contact-comment" className="block text-sm font-medium text-gray-700 mb-1.5">
          {tf('comment')}
        </label>
        <textarea
          id="contact-comment"
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          placeholder={tf('commentPlaceholder')}
          rows={4}
          className="w-full px-4 py-3 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors resize-none"
        />
      </div>

      <div className="space-y-3 pt-1">
        <label className="flex items-start gap-3 cursor-pointer">
          <input
            type="checkbox"
            checked={consent1}
            onChange={(e) => setConsent1(e.target.checked)}
            className="mt-0.5 w-4 h-4 text-blue-600 rounded border-gray-300 focus:ring-blue-500 flex-shrink-0 cursor-pointer"
          />
          <span className="text-xs text-gray-600 leading-relaxed">
            {tf('consent1')}{' '}
            <a href="/docs/privacy-policy.pdf" className="text-blue-600 hover:underline" target="_blank" rel="noopener noreferrer">
              {tf('privacyPolicy')}
            </a>
            {' '}и{' '}
            <a href="/docs/data-processing.pdf" className="text-blue-600 hover:underline" target="_blank" rel="noopener noreferrer">
              {tf('dataProcessing')}
            </a>.
          </span>
        </label>

        <label className="flex items-start gap-3 cursor-pointer">
          <input
            type="checkbox"
            checked={consent2}
            onChange={(e) => setConsent2(e.target.checked)}
            className="mt-0.5 w-4 h-4 text-blue-600 rounded border-gray-300 focus:ring-blue-500 flex-shrink-0 cursor-pointer"
          />
          <span className="text-xs text-gray-600 leading-relaxed">{tf('consent2')}</span>
        </label>

        {errors.consent && <p className="text-red-500 text-xs">{errors.consent}</p>}
      </div>

      <Button type="submit" variant="primary" className="w-full justify-center">
        {tf('submit')}
      </Button>
    </form>
  );
}

export default function ContactSection({
  formId,
  consultationEmails,
  consultationPhones,
  supportEmails,
  supportPhones,
  socialLinks,
}: ContactSectionProps) {
  const t = useTranslations('contact');
  const ti = useTranslations('contact.info');

  const hasConsultation = consultationEmails.length > 0 || consultationPhones.length > 0;
  const hasSupport = supportEmails.length > 0 || supportPhones.length > 0;
  const hasSocial = socialLinks.length > 0;

  return (
    <section id="contact" className="py-20 bg-slate-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">{t('heading')}</h2>
          <p className="text-lg text-gray-600">{t('subheading')}</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
          {/* Form */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8">
            {formId ? (
              <ContactFormFormspree formId={formId} />
            ) : (
              <BasicContactForm />
            )}
          </div>

          {/* Contact info */}
          <div className="space-y-8 lg:pl-4">
            {hasConsultation && (
              <div>
                <h3 className="font-semibold text-gray-900 mb-4 flex items-center gap-2">
                  <MessageSquare size={18} className="text-blue-600 flex-shrink-0" />
                  {ti('consultationLabel')}
                </h3>
                <div className="space-y-3">
                  {consultationEmails.map((email) => (
                    <a key={email} href={`mailto:${email}`} className="flex items-center gap-3 text-sm text-gray-600 hover:text-blue-600 transition-colors group">
                      <Mail size={16} className="text-gray-400 group-hover:text-blue-500 flex-shrink-0" />
                      {email}
                    </a>
                  ))}
                  {consultationPhones.map((phone) => (
                    <a key={phone} href={`tel:${phone.replace(/\s/g, '')}`} className="flex items-center gap-3 text-sm text-gray-600 hover:text-blue-600 transition-colors group">
                      <Phone size={16} className="text-gray-400 group-hover:text-blue-500 flex-shrink-0" />
                      {phone}
                    </a>
                  ))}
                </div>
              </div>
            )}

            {hasSupport && (
              <div>
                <h3 className="font-semibold text-gray-900 mb-4 flex items-center gap-2">
                  <MessageSquare size={18} className="text-blue-600 flex-shrink-0" />
                  {ti('supportLabel')}
                </h3>
                <div className="space-y-3">
                  {supportEmails.map((email) => (
                    <a key={email} href={`mailto:${email}`} className="flex items-center gap-3 text-sm text-gray-600 hover:text-blue-600 transition-colors group">
                      <Mail size={16} className="text-gray-400 group-hover:text-blue-500 flex-shrink-0" />
                      {email}
                    </a>
                  ))}
                  {supportPhones.map((phone) => (
                    <a key={phone} href={`tel:${phone.replace(/\s/g, '')}`} className="flex items-center gap-3 text-sm text-gray-600 hover:text-blue-600 transition-colors group">
                      <Phone size={16} className="text-gray-400 group-hover:text-blue-500 flex-shrink-0" />
                      {phone}
                    </a>
                  ))}
                </div>
              </div>
            )}

            {hasSocial && (
              <div>
                <h3 className="font-semibold text-gray-900 mb-4">{ti('socialLabel')}</h3>
                <div className="flex flex-wrap gap-3">
                  {socialLinks.map((url) => {
                    const { label, bgColor, icon } = getSocialMeta(url);
                    return (
                      <a
                        key={url}
                        href={url}
                        aria-label={label}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={`w-10 h-10 ${bgColor} rounded-lg flex items-center justify-center transition-colors duration-150`}
                      >
                        {icon}
                      </a>
                    );
                  })}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
