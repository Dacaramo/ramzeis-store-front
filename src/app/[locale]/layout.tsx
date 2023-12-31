import { FC, ReactNode } from 'react';
import type { Metadata } from 'next';
import { Jost } from 'next/font/google';
import '../globals.css';
import { availableLocales } from '@/src/constants/locales';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { useTranslations } from 'next-intl';
import { xPaddingClasses, yPaddingClasses } from '@/src/constants/classes';
import ThemeButton from '@/src/components/ThemeButton/ThemeButton';
import { headers } from 'next/headers';

const jost = Jost({ variable: '--font-jost', subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Create Next App',
  description: 'Generated by create next app',
};

interface Props {
  children: ReactNode;
  params: {
    locale: string;
  };
}

const RootLayout: FC<Props> = ({ children, params: { locale } }) => {
  const t = useTranslations('');

  if (!availableLocales.includes(locale)) notFound();

  const headersList = headers();
  const activePath = headersList.get('x-invoke-path');
  const linkClasses = 'hover:text-secondary';

  console.log(headersList);

  return (
    <html
      lang={locale}
      data-theme='fantasy'
    >
      <body
        className={`${jost.className} ${yPaddingClasses} flex flex-col gap-[25px] font-jost text-xl`}
      >
        <header
          className={`${xPaddingClasses} flex flex-row justify-between items-center`}
        >
          <Link href='/'>
            RAMZEIS <b>store</b>
          </Link>
          {activePath?.includes('products') && (
            <input
              className='input input-sm w-[300px] hover:w-[350px] focus:w-[350px] transition-all bg-base-200 outline-none'
              type='text'
              placeholder={t('header.search-bar.placeholder')}
            />
          )}
          <div className='flex flex-row gap-4 items-center'>
            <nav className='flex flex-row gap-4'>
              <Link
                href='/'
                className={`${linkClasses}`}
              >
                {t('header.navbar.home-link.text')}
              </Link>
              <Link
                href='/products'
                className={`${linkClasses}`}
              >
                {t('header.navbar.products-link.text')}
              </Link>
            </nav>
            <select
              className='select select-sm bg-base-200 text-l'
              placeholder={t('header.language-select.placeholder')}
            >
              <option>{t('header.language-select.options.english')}</option>
              <option>{t('header.language-select.options.spanish')}</option>
            </select>
            <ThemeButton />
          </div>
        </header>
        <main className='flex flex-col'>{children}</main>
        <footer className='flex flex-col sm:flex-row sm:space-between'></footer>
      </body>
    </html>
  );
};

export default RootLayout;
