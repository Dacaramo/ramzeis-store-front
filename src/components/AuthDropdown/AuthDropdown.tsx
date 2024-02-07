'use client';

import { FC, ReactNode, useState } from 'react';
import GoogleIcon from '../icons/GoogleIcon';
import ToggleButtonGroup, {
  ToggleButtonDefinition,
} from '../ToggleButtonGroup/ToggleButtonGroup';
import LoginForm from '../LoginForm/LoginForm';
import SignUpForm from '../SignUpForm/SignUpForm';

interface Props {
  translations: {
    authenticated: {
      placeholder: string;
    };
    unauthenticated: {
      placeholder: string;
      'toggle-button-group': {
        options: {
          login: string;
          'sign-up': string;
        };
      };
      'or-login-text': ReactNode;
      'or-sign-up-text': ReactNode;
      'google-sign-up-text': string;
      'google-login-text': string;
      'divider-text': string;
      'email-input': {
        label: string;
        placeholder: string;
        'error-text': string;
      };
      'phone-input': {
        label: string;
        placeholder: string;
        'error-text': string;
      };
      'password-input': {
        label: string;
        placeholder: string;
        'error-text': string;
      };
      'confirm-password-input': {
        label: string;
        placeholder: string;
      };
      'terms-and-conditions-text': ReactNode;
      'login-button-text': string;
      'sign-up-button-text': string;
      alert: {
        'passwords-mismatch-text': string;
        'login-success-text': string;
        'sign-up-success-text': string;
      };
    };
  };
}

const AuthDropdown: FC<Props> = ({ translations: t }) => {
  const [action, setAction] = useState<'login' | 'sign-up'>('login');

  const isAuthenticated = true;

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

  return (
    <details className='dropdown dropdown-end'>
      <summary
        role='button'
        className='flex justify-center items-center h-sm-control-height font-normal text-tiny hover:text-secondary'
      >
        {isAuthenticated
          ? t['authenticated']['placeholder']
          : t['unauthenticated']['placeholder']}
      </summary>
      <div
        tabIndex={0}
        className='w-[280px] dropdown-content flex flex-col items-center z-[1] rounded-md bg-base-100'
      >
        <ToggleButtonGroup
          buttonsClassName='btn-ghost rounded-t-md rounded-b-none'
          buttons={[
            {
              key: 'login',
              value: t.unauthenticated['toggle-button-group'].options.login,
            },
            {
              key: 'sign-up',
              value:
                t.unauthenticated['toggle-button-group'].options['sign-up'],
            },
          ]}
          selectedButtonKey={action}
          onButtonClicked={handleClickOnToggleButton}
        />
        <div className='flex flex-col gap-sm-control-padding p-sm-control-padding w-full rounded-b-md border border-base-content'>
          {action === 'login' ? (
            <LoginForm
              translations={{
                'email-input': {
                  label: t.unauthenticated['email-input'].label,
                  placeholder: t.unauthenticated['email-input'].placeholder,
                  'error-text': t.unauthenticated['email-input']['error-text'],
                },
                'password-input': {
                  label: t.unauthenticated['password-input'].label,
                  placeholder: t.unauthenticated['password-input'].placeholder,
                  'error-text':
                    t.unauthenticated['password-input']['error-text'],
                },
                'login-button-text': t.unauthenticated['login-button-text'],
              }}
            />
          ) : (
            <SignUpForm
              translations={{
                'email-input': {
                  label: t.unauthenticated['email-input'].label,
                  placeholder: t.unauthenticated['email-input'].placeholder,
                  'error-text': t.unauthenticated['email-input']['error-text'],
                },
                'password-input': {
                  label: t.unauthenticated['password-input'].label,
                  placeholder: t.unauthenticated['password-input'].placeholder,
                  'error-text':
                    t.unauthenticated['password-input']['error-text'],
                },
                'phone-input': {
                  label: t.unauthenticated['phone-input'].label,
                  placeholder: t.unauthenticated['phone-input'].placeholder,
                  'error-text': t.unauthenticated['phone-input']['error-text'],
                },
                'confirm-password-input': {
                  label: t.unauthenticated['confirm-password-input'].label,
                  placeholder:
                    t.unauthenticated['confirm-password-input'].placeholder,
                },
                'sign-up-button-text': t.unauthenticated['sign-up-button-text'],
                'terms-and-conditions-text':
                  t.unauthenticated['terms-and-conditions-text'],
              }}
            />
          )}
          <div className='divider m-0 text-tiny'>
            {t.unauthenticated['divider-text']}
          </div>
          <button
            type='button'
            className='w-full btn btn-sm text-tiny'
            onClick={handleClickOnGoogleButton}
          >
            {action === 'login'
              ? t.unauthenticated['google-login-text']
              : t.unauthenticated['google-sign-up-text']}
            <GoogleIcon />
          </button>
        </div>
      </div>
    </details>
  );
};

export default AuthDropdown;
