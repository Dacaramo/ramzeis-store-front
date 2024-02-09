'use client';

import { FC, useState } from 'react';
import GoogleIcon from '../icons/GoogleIcon';
import ToggleButtonGroup, {
  ToggleButtonDefinition,
} from '../ToggleButtonGroup/ToggleButtonGroup';
import LoginForm from '../LoginForm/LoginForm';
import SignUpForm from '../SignUpForm/SignUpForm';
import { useTranslations } from 'next-intl';
import { useStore } from '@/src/zustand/store';
import Link from 'next/link';

interface Props {}

const AuthDropdown: FC<Props> = ({}) => {
  const [action, setAction] = useState<'login' | 'sign-up'>('login');

  const t = useTranslations();
  const isAuthenticated = useStore((state) => {
    return state.user.isAuthenticated;
  });

  const handleClickOnToggleButton = (clickedButton: ToggleButtonDefinition) => {
    if (clickedButton.key !== action) {
      setAction(clickedButton.key as 'login' | 'sign-up');
      // loginForm.reset();
      // signUpForm.reset();
    }
  };

  const handleClickOnGoogleButton = () => {
    /**
     * TODO
     */
  };

  console.log('@@@@@isAuthenticated', isAuthenticated);

  return (
    <details className='dropdown dropdown-end'>
      {isAuthenticated ? (
        <Link href='/profile'>{t('authenticated.placeholder')}</Link>
      ) : (
        <summary
          role='button'
          className='flex justify-center items-center h-sm-control-height font-normal text-tiny hover:text-secondary'
        >
          {isAuthenticated
            ? t('authenticated.placeholder')
            : t('unauthenticated.placeholder')}
        </summary>
      )}
      <div
        tabIndex={0}
        className='w-[280px] dropdown-content flex flex-col items-center z-[1] rounded-md bg-base-100'
      >
        <ToggleButtonGroup
          buttonsClassName='btn-ghost rounded-t-md rounded-b-none'
          buttons={[
            {
              key: 'login',
              value: t('unauthenticated.toggle-button-group.options.login'),
            },
            {
              key: 'sign-up',
              value: t('unauthenticated.toggle-button-group.options.sign-up'),
            },
          ]}
          selectedButtonKey={action}
          onButtonClicked={handleClickOnToggleButton}
        />
        <div className='flex flex-col gap-sm-control-padding p-sm-control-padding w-full rounded-b-md border border-base-content'>
          {action === 'login' ? <LoginForm /> : <SignUpForm />}
        </div>
      </div>
    </details>
  );
};

export default AuthDropdown;
