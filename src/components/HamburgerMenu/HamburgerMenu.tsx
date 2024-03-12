'use client';

import { CSSProperties, FC, ReactNode, useRef } from 'react';
import HamburgerMenuIcon from '../icons/HamburgerMenuIcon';
import CaretLeftIcon from '../icons/CaretLeftIcon';
import RegionDropdown from '../RegionDropdown/RegionDropdown';
import { useTranslations } from 'next-intl';
import ColombianFlagIcon from '../icons/ColombianFlagIcon';
import EarthGlobeIcon from '../icons/EarthGlobeIcon';
import Link from 'next/link';
import { useStore } from '@/src/zustand/store';
import { usePathname, useRouter } from 'next/navigation';
import useTheme from '@/src/hooks/useTheme';
import useAuth from '@/src/hooks/useAuth';
import { displayError } from '@/src/utils/errors';
import { colors } from '@/src/constants/colors';
import ThemeButton from '../ThemeButton/ThemeButton';
import {
  gapForBetweenFilterComponents,
  xRootPaddingClasses,
} from '@/src/constants/classes';

interface Props {}

const HamburgerMenu: FC<Props> = ({}) => {
  const t = useTranslations('');
  const currentPathname = usePathname();
  const theme = useTheme([]);
  const { signOut } = useAuth();
  const router = useRouter();
  const [user, setGlobalAlertProps] = useStore((state) => {
    return [state.user, state.setGlobalAlertProps];
  });

  const backLinkRef = useRef<HTMLAnchorElement | null>(null);

  const currentPathnameParts = currentPathname.split('/');
  const currentPageName =
    currentPathnameParts.length === 2
      ? 'home'
      : currentPathnameParts[currentPathnameParts.length - 1];
  const hamburgerMenuLinkClasses = 'hover:text-secondary transition-all';
  const exceptionsNamespace = 'alert.exceptions';

  const getLinkStyles = (pageName: string): CSSProperties => {
    if (pageName === currentPageName) {
      return {
        color: colors[theme]['secondary'],
        fontWeight: 600,
      };
    }
    return {};
  };

  const handleClickOnHamburgerMenuLink = () => {
    const backLink = backLinkRef.current;
    if (!backLink) {
      return;
    }

    backLink.click();
  };

  const handleClickOnSignOutLink = async () => {
    try {
      await signOut();
      router.push('/');
      handleClickOnHamburgerMenuLink();
    } catch (error) {
      const e = error as Error;
      displayError(e, t, exceptionsNamespace, setGlobalAlertProps);
    }
  };

  return (
    <>
      <a
        href='#hamburger-menu'
        className='sm:hidden flex justify-center items-center transition-all text-[25px]'
      >
        <HamburgerMenuIcon />
      </a>
      <div
        id='hamburger-menu'
        className={`fixed w-[100vw] h-[100vh] z-[100] pt-[25px] top-0 left-[-100vw] flex flex-col justify-start items-start gap-4 target:left-0 bg-base-100 transition-all ${xRootPaddingClasses}`}
      >
        <div
          className={`w-full min-h-[7.5vh] flex flex-row justify-between items-center`}
        >
          <a
            href='#'
            ref={backLinkRef}
            className='text-[30px]'
          >
            <CaretLeftIcon />
          </a>
          <div
            className={`flex flex-row justify-center items-center ${gapForBetweenFilterComponents}`}
          >
            <ThemeButton />
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
          </div>
        </div>
        <nav className='flex flex-col justify-start items-start gap-4'>
          <Link
            className={`${hamburgerMenuLinkClasses}`}
            style={getLinkStyles('home')}
            href={'/'}
            onClick={handleClickOnHamburgerMenuLink}
          >
            {t('header.hamburger-menu.home-link-text')}
          </Link>
          {user.isAuthenticated && (
            <>
              <Link
                className={`${hamburgerMenuLinkClasses}`}
                style={getLinkStyles('manage-my-profile')}
                href={'/profile/manage-my-profile'}
                onClick={handleClickOnHamburgerMenuLink}
              >
                {t('profile-page-nav.manage-my-profile-link-text')}
              </Link>
              <Link
                className={`${hamburgerMenuLinkClasses}`}
                style={getLinkStyles('payment-methods')}
                href={'/profile/payment-methods'}
                onClick={handleClickOnHamburgerMenuLink}
              >
                {t('profile-page-nav.payment-methods-link-text')}
              </Link>
              <Link
                className={`${hamburgerMenuLinkClasses}`}
                style={getLinkStyles('addresses')}
                href={'/profile/addresses'}
                onClick={handleClickOnHamburgerMenuLink}
              >
                {t('profile-page-nav.addresses-link-text')}
              </Link>
              <Link
                className={`${hamburgerMenuLinkClasses}`}
                style={getLinkStyles('reviews')}
                href={'/profile/reviews'}
                onClick={handleClickOnHamburgerMenuLink}
              >
                {t('profile-page-nav.reviews-link-text')}
              </Link>
              <Link
                className={`${hamburgerMenuLinkClasses}`}
                style={getLinkStyles('orders')}
                href={'/profile/orders'}
                onClick={handleClickOnHamburgerMenuLink}
              >
                {t('profile-page-nav.orders-link-text')}
              </Link>
              <button
                type='button'
                className={`${hamburgerMenuLinkClasses} text-start text-error hover:text-error hover:font-bold`}
                onClick={handleClickOnSignOutLink}
              >
                {t('profile-page-nav.sign-out-link-text')}
              </button>
            </>
          )}
        </nav>
      </div>
    </>
  );
};

export default HamburgerMenu;
