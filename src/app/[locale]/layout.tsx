import { FC, ReactNode, ComponentProps } from 'react';
import type { Metadata } from 'next';
import { Jost } from 'next/font/google';
import '../globals.css';
import Link from 'next/link';
import { useTranslations } from 'next-intl';
import {
  xRootPaddingClasses,
  yRootPaddingClasses,
} from '@/src/constants/classes';
import ThemeButton from '@/src/components/ThemeButton/ThemeButton';
import { headers } from 'next/headers';
import MagnifierIcon from '@/src/components/icons/MagnifierIcon';
import RegionDropdown from '@/src/components/RegionDropdown/RegionDropdown';
import ColombianFlagIcon from '@/src/components/icons/ColombianFlagIcon';
import EarthGlobeIcon from '@/src/components/icons/EarthGlobeIcon';
import { navbarGapClasses } from '@/src/constants/classes';
import CategoryDropdown from '@/src/components/CategoryDropdown/CategoryDropdown';
import ArrowDownIcon from '@/src/components/icons/ArrowDownIcon';

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

  const categoriesTranslationKeys = [
    'for-my-style',
    'hoodies',
    'sweatshirts',
    't-shirts',
    'accessories',
    'for-my-setup',
    'keyboards',
    'stickers',
    'mouse-pads',
    'cases',
    'stands',
    'for-the-ambience',
    'plushes',
    'pillows',
    'posters',
  ] as const;
  const hrefPerCategory = {
    'for-my-style': '/products?subcategory=for-my-style',
    hoodies: '/products?subcategory=hoodies',
    sweatshirts: '/products?subcategory=sweatshirts',
    't-shirts': '/products?subcategory=t-shirts',
    accessories: '/products?subcategory=accessories',
    'for-my-setup': '/products?subcategory=for-my-setup',
    keyboards: '/products?subcategory=keyboards',
    stickers: '/products?subcategory=stickers',
    'mouse-pads': '/products?subcategory=mouse-pads',
    cases: '/products?subcategory=cases',
    stands: '/products?subcategory=stands',
    'for-the-ambience': '/products?subcategory=for-the-ambience',
    plushes: '/products?subcategory=plushes',
    pillows: '/products?subcategory=pillows',
    posters: '/products?subcategory=posters',
  };

  const categoryDropdownOptions: ComponentProps<
    typeof CategoryDropdown
  >['options'] = categoriesTranslationKeys.map((key) => {
    return {
      text: t.rich(`header.category-dropdown.options.${key}`) as string,
      href: hrefPerCategory[key],
    };
  });

  console.log('@@@@@locale', locale);

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
        className={`${jost.className} ${yRootPaddingClasses} flex flex-col gap-[25px] font-jost text-mid`}
      >
        <header
          className={`${xRootPaddingClasses} flex flex-row justify-between items-center`}
        >
          <Link href='/'>
            RAMZEIS <b>store</b>
          </Link>
          <div className={`flex flex-row items-baseline ${navbarGapClasses}`}>
            <CategoryDropdown
              placeholder={
                <>
                  {t('header.category-dropdown.placeholder')}
                  <ArrowDownIcon />
                </>
              }
              options={categoryDropdownOptions}
            />
            <div className='relative text-tiny'>
              <input
                className='input input-sm w-[300px] hover:w-[350px] focus:w-[350px] transition-all bg-base-200 outline-none'
                type='text'
                placeholder={t('header.search-bar.placeholder')}
              />
              <MagnifierIcon
                className='absolute top-[0.5rem] right-sm-control-padding text-base-content'
                style={{ pointerEvents: 'none' }}
              />
            </div>
          </div>
          <div className={`flex flex-row ${navbarGapClasses} items-center`}>
            <nav className={`flex flex-row ${navbarGapClasses}`}>
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
            <RegionDropdown
              placeholder={
                t.rich('header.region-dropdown.placeholder', {
                  ColombianFlagIcon: (_) => <ColombianFlagIcon />,
                  EarthGlobeIcon: (_) => <EarthGlobeIcon />,
                }) as ReactNode
              }
              options={[
                {
                  text: t.rich('header.region-dropdown.options.global', {
                    ColombianFlagIcon: (_) => <ColombianFlagIcon />,
                    EarthGlobeIcon: (_) => <EarthGlobeIcon />,
                  }) as string,
                  href: '/en',
                },
                {
                  text: t.rich('header.region-dropdown.options.colombia', {
                    ColombianFlagIcon: (_) => <ColombianFlagIcon />,
                    EarthGlobeIcon: (_) => <EarthGlobeIcon />,
                  }) as string,
                  href: '/es-CO',
                },
              ]}
            />
            <ThemeButton />
          </div>
        </header>
        <main className='flex flex-col'>{children}</main>
        <footer className=''></footer>
      </body>
    </html>
  );
};

export default RootLayout;
