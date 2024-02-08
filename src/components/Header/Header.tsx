import { FC, ReactNode, createElement } from 'react';
import { xRootPaddingClasses, navbarGapClasses } from '@/src/constants/classes';
import Link from 'next/link';
import CategoryDropdown from '../CategoryDropdown/CategoryDropdown';
import SearchBar from '../SearchBar/SearchBar';
import ArrowDownIcon from '../icons/ArrowDownIcon';
import {
  NextIntlClientProvider,
  useTranslations,
  useMessages,
  AbstractIntlMessages,
} from 'next-intl';
import RegionDropdown from '../RegionDropdown/RegionDropdown';
import ColombianFlagIcon from '../icons/ColombianFlagIcon';
import EarthGlobeIcon from '../icons/EarthGlobeIcon';
import ThemeButton from '../ThemeButton/ThemeButton';
import AuthDropdown from '../AuthDropdown/AuthDropdown';

interface Props {}

const Header: FC<Props> = ({}) => {
  const t = useTranslations('');
  const messages = useMessages();
  const headerMessages = messages?.header as AbstractIntlMessages | undefined;
  const authDropdownMessages = headerMessages?.['auth-dropdown'] as
    | AbstractIntlMessages
    | undefined;

  return (
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
        />
        <span className='text-tiny'>{t('header.separator-span')}</span>
        <SearchBar placeholder={t('header.search-bar.placeholder')} />
      </div>
      <div className={`flex flex-row ${navbarGapClasses} items-center`}>
        <NextIntlClientProvider
          messages={authDropdownMessages}
          defaultTranslationValues={{
            strong: async (value) => {
              'use server';
              return (await createElement('strong', null, value)) as ReactNode;
            },
            b: async (value) => {
              'use server';
              return (await createElement('b', null, value)) as ReactNode;
            },
          }}
        >
          <AuthDropdown />
        </NextIntlClientProvider>
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
  );
};

export default Header;
