import { FC, ReactNode } from 'react';
import { xRootPaddingClasses, navbarGapClasses } from '@/src/constants/classes';
import Link from 'next/link';
import CategoryDropdown from '../CategoryDropdown/CategoryDropdown';
import SearchBar from '../SearchBar/SearchBar';
import ArrowDownIcon from '../icons/ArrowDownIcon';
import { useTranslations } from 'next-intl';
import RegionDropdown from '../RegionDropdown/RegionDropdown';
import ColombianFlagIcon from '../icons/ColombianFlagIcon';
import EarthGlobeIcon from '../icons/EarthGlobeIcon';
import ThemeButton from '../ThemeButton/ThemeButton';
import AuthDropdown from '../AuthDropdown/AuthDropdown';

interface Props {}

const Header: FC<Props> = ({}) => {
  const t = useTranslations('');

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
        <AuthDropdown
          translations={{
            authenticated: {
              placeholder: t('header.auth-dropdown.authenticated.placeholder'),
            },
            unauthenticated: {
              placeholder: t(
                'header.auth-dropdown.unauthenticated.placeholder'
              ),
              'toggle-button-group': {
                options: {
                  login: t(
                    'header.auth-dropdown.unauthenticated.toggle-button-group.options.login'
                  ),
                  'sign-up': t(
                    'header.auth-dropdown.unauthenticated.toggle-button-group.options.sign-up'
                  ),
                },
              },
              'or-sign-up-text': t.rich(
                'header.auth-dropdown.unauthenticated.or-sign-up-text',
                {
                  link: (value) => (
                    <span className='link link-secondary'>{value}</span>
                  ),
                }
              ),
              'or-login-text': t.rich(
                'header.auth-dropdown.unauthenticated.or-login-text',
                {
                  link: (value) => (
                    <span className='link link-secondary'>{value}</span>
                  ),
                }
              ),
              'google-sign-up-text': t(
                'header.auth-dropdown.unauthenticated.google-sign-up-text'
              ),
              'google-login-text': t(
                'header.auth-dropdown.unauthenticated.google-login-text'
              ),
              'divider-text': t(
                'header.auth-dropdown.unauthenticated.divider-text'
              ),
              'email-input': {
                label: t(
                  'header.auth-dropdown.unauthenticated.email-input.label'
                ),
                placeholder: t(
                  'header.auth-dropdown.unauthenticated.email-input.placeholder'
                ),
                'error-text': t(
                  'header.auth-dropdown.unauthenticated.email-input.error-text'
                ),
              },
              'phone-input': {
                label: t(
                  'header.auth-dropdown.unauthenticated.phone-input.label'
                ),
                placeholder: t(
                  'header.auth-dropdown.unauthenticated.phone-input.placeholder'
                ),
                'error-text': t(
                  'header.auth-dropdown.unauthenticated.phone-input.error-text'
                ),
              },
              'password-input': {
                label: t(
                  'header.auth-dropdown.unauthenticated.password-input.label'
                ),
                placeholder: t(
                  'header.auth-dropdown.unauthenticated.password-input.placeholder'
                ),
                'error-text': t(
                  'header.auth-dropdown.unauthenticated.password-input.error-text'
                ),
              },
              'confirm-password-input': {
                label: t(
                  'header.auth-dropdown.unauthenticated.confirm-password-input.label'
                ),
                placeholder: t(
                  'header.auth-dropdown.unauthenticated.confirm-password-input.placeholder'
                ),
              },
              'terms-and-conditions-text': t.rich(
                'header.auth-dropdown.unauthenticated.terms-and-conditions-text',
                {
                  Link: (value) => (
                    <Link
                      className='link link-secondary'
                      href='/'
                    >
                      {value}
                    </Link>
                  ),
                }
              ),
              'login-button-text': t(
                'header.auth-dropdown.unauthenticated.login-button-text'
              ),
              'sign-up-button-text': t(
                'header.auth-dropdown.unauthenticated.sign-up-button-text'
              ),
              alert: {
                'passwords-mismatch-text': t(
                  'header.auth-dropdown.unauthenticated.alert.passwords-mismatch-text'
                ),
                'login-success-text': t(
                  'header.auth-dropdown.unauthenticated.alert.login-success-text'
                ),
                'sign-up-success-text': t(
                  'header.auth-dropdown.unauthenticated.alert.sign-up-success-text'
                ),
              },
            },
          }}
        />
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
