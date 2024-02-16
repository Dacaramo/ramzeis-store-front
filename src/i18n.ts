import { createElement } from 'react';
import { getRequestConfig } from 'next-intl/server';
import { availableLocales } from './constants/locales';
import { notFound } from 'next/navigation';
import { ReactNode } from 'react';

export default getRequestConfig(async ({ locale }) => {
  if (!availableLocales.includes(locale)) notFound();
  return {
    messages: (await import(`../messages/${locale}.json`)).default,
    defaultTranslationValues: {
      strong: (value) => createElement('strong', null, value) as ReactNode,
      b: (value) => createElement('b', null, value) as ReactNode,
    },
  };
});
