'use client';

import { useForm } from '@formspree/react';
import { useState } from 'react';
import { useTranslations } from 'next-intl';
import Button from '@/components/ui/Button';

interface FormErrors {
  email?: string;
  consent?: string;
}

export default function ContactFormFormspree({ formId }: { formId: string }) {
  const tf = useTranslations('contact.form');
  const [state, submit] = useForm(formId);
  const [consent1, setConsent1] = useState(false);
  const [consent2, setConsent2] = useState(false);
  const [errors, setErrors] = useState<FormErrors>({});

  const validate = (): boolean => {
    const newErrors: FormErrors = {};
    const emailInput = (document.getElementById('contact-email') as HTMLInputElement)?.value ?? '';
    if (!emailInput || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailInput)) {
      newErrors.email = tf('emailRequired');
    }
    if (!consent1 || !consent2) {
      newErrors.consent = tf('consentRequired');
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!validate()) return;
    await submit(e);
  };

  if (state.succeeded) {
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
          name="email"
          type="email"
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
          name="message"
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

      <Button
        type="submit"
        variant="primary"
        className="w-full justify-center"
        disabled={state.submitting}
      >
        {state.submitting ? '...' : tf('submit')}
      </Button>
    </form>
  );
}
