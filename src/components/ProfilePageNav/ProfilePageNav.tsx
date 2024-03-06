'use client';

import { FC, CSSProperties } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import useTheme from '@/src/hooks/useTheme';
import { xRootPaddingClasses } from '@/src/constants/classes';
import { colors } from '@/src/constants/colors';
import { useTranslations } from 'next-intl';
import useAuth from '@/src/hooks/useAuth';
import { useStore } from '@/src/zustand/store';
import { displayError } from '@/src/utils/errors';

interface Props {}

const ProfilePageNav: FC<Props> = ({}) => {
  const t = useTranslations();
  const currentPathname = usePathname();
  const theme = useTheme([]);
  const { signOut } = useAuth();
  const router = useRouter();
  const setGlobalAlertProps = useStore((state) => {
    return state.setGlobalAlertProps;
  });

  const currentPathnameParts = currentPathname.split('/');
  const currentPageName = currentPathnameParts[currentPathnameParts.length - 1];
  const linkClasses = `${xRootPaddingClasses} py-[15px] border-b hover:text-base-200 hover:bg-base-content transition-all`;
  const exceptionsNamespace = 'alert.exceptions';

  const getLinkStyles = (pageName: string): CSSProperties => {
    if (pageName === currentPageName) {
      return {
        color: colors[theme]['base-200'],
        backgroundColor: colors[theme]['base-content'],
      };
    }
    return {};
  };

  const handleClickOnSignOutLink = async () => {
    try {
      await signOut();
      router.push('/');
    } catch (error) {
      const e = error as Error;
      displayError(e, t, exceptionsNamespace, setGlobalAlertProps);
    }
  };

  return (
    <nav className={`min-w-[280px] flex flex-col border-r text-tiny font-bold`}>
      <Link
        href='/profile/manage-my-profile'
        style={getLinkStyles('manage-my-profile')}
        className={`${linkClasses}`}
      >
        {t('manage-my-profile-link-text')}
      </Link>
      <Link
        href='/profile/payment-methods'
        style={getLinkStyles('payment-methods')}
        className={`${linkClasses}`}
      >
        {t('payment-methods-link-text')}
      </Link>
      <Link
        href='/profile/addresses'
        style={getLinkStyles('addresses')}
        className={`${linkClasses}`}
      >
        {t('addresses-link-text')}
      </Link>
      <Link
        href='/profile/reviews'
        style={getLinkStyles('reviews')}
        className={`${linkClasses}`}
      >
        {t('reviews-link-text')}
      </Link>
      <Link
        href='/profile/orders'
        style={getLinkStyles('orders')}
        className={`${linkClasses}`}
      >
        {t('orders-link-text')}
      </Link>
      <button
        type='button'
        className={`${linkClasses} text-start text-error hover:bg-error hover:text-base-200`}
        onClick={handleClickOnSignOutLink}
      >
        {t('sign-out-link-text')}
      </button>
    </nav>
  );
};

export default ProfilePageNav;
