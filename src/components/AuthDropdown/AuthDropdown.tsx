'use client';

import { ComponentProps, FC, useState } from 'react';
import ToggleButtonGroup, {
  ToggleButtonDefinition,
} from '../ToggleButtonGroup/ToggleButtonGroup';
import LoginForm from '../LoginForm/LoginForm';
import SignUpForm from '../SignUpForm/SignUpForm';
import { useTranslations } from 'next-intl';
import { useStore } from '@/src/zustand/store';
import Link from 'next/link';
import { SubmitHandler, useForm } from 'react-hook-form';
import {
  LoginFormData,
  SignUpFormData,
  loginFormDataSchema,
  signUpFormDataSchema,
} from '@/src/model/otherSchemas';
import useAuth from '@/src/hooks/useAuth';
import { signOut as amplifySignOut } from 'aws-amplify/auth';
import Alert from '../Alert/Alert';
import ConfirmationCodeForm from '../ConfirmationCodeForm/ConfirmationCodeForm';
import { valibotResolver } from '@hookform/resolvers/valibot';

type AuthDropdownAction = 'login' | 'sign-up';

interface Props {}

const AuthDropdown: FC<Props> = ({}) => {
  const [action, setAction] = useState<AuthDropdownAction>('login');
  const [isConfirmationGoing, setIsConfirmationGoing] =
    useState<boolean>(false);
  const [alertProps, setAlertProps] = useState<
    ComponentProps<typeof Alert> | undefined
  >(undefined);

  const t = useTranslations();
  const isAuthenticated = useStore((state) => {
    return state.user.isAuthenticated;
  });
  const { signUp, signIn } = useAuth();
  const loginForm = useForm<LoginFormData>({
    resolver: valibotResolver(loginFormDataSchema),
  });
  const signUpForm = useForm<SignUpFormData>({
    defaultValues: {
      areTermsAndConditionsAccepted: false,
    },
    resolver: valibotResolver(signUpFormDataSchema),
  });

  const handleClickOnToggleButton = (clickedButton: ToggleButtonDefinition) => {
    if (clickedButton.key !== action) {
      setAction(clickedButton.key as AuthDropdownAction);
      setIsConfirmationGoing(false);
      loginForm.reset();
      signUpForm.reset();
    }
  };

  const handleClickOnGoogleButton = () => {
    /**
     * TODO
     */
  };

  const handleSignUpFormSubmit: SubmitHandler<SignUpFormData> = async (
    data: SignUpFormData
  ) => {
    try {
      await signUp(data.email, data.phone, data.password);

      setAlertProps({
        type: 'alert-warning',
        text: t.rich('unauthenticated.alert.confirm-account-text', {
          email: data.email,
        }),
      });
      setIsConfirmationGoing(true);
    } catch (error) {
      const e = error as Error;

      setAlertProps({
        type: 'alert-error',
        text: t(`unauthenticated.alert.exceptions.${e.name}`).startsWith(
          'unauthenticated.alert.exceptions'
        )
          ? t('unauthenticated.alert.exceptions.UnknownException', {
              exception: e.name,
            })
          : t(`unauthenticated.alert.exceptions.${e.name}`),
      });
    }
  };

  const handleLoginFormSubmit: SubmitHandler<LoginFormData> = async (
    data: LoginFormData
  ) => {
    try {
      const authStep = await signIn(data.email, data.password);

      if (authStep === 'CONFIRMATION_PENDING') {
        setIsConfirmationGoing(true);
      }
    } catch (error) {
      const e = error as Error;

      await amplifySignOut();

      setAlertProps({
        type: 'alert-error',
        text: t(`unauthenticated.alert.exceptions.${e.name}`).startsWith(
          'unauthenticated.alert.exceptions'
        )
          ? t('unauthenticated.alert.exceptions.UnknownException', {
              exception: e.name,
            })
          : t(`unauthenticated.alert.exceptions.${e.name}`),
      });
    }
  };

  return (
    <>
      {isAuthenticated ? (
        <Link
          href='/profile/manage-my-profile'
          className='text-tiny'
        >
          {t('authenticated.placeholder')}
        </Link>
      ) : (
        <details className='dropdown dropdown-end'>
          <summary
            role='button'
            className='flex justify-center items-center h-sm-control-height font-normal text-tiny hover:text-secondary'
          >
            {isAuthenticated
              ? t('authenticated.placeholder')
              : t('unauthenticated.placeholder')}
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
                  value: t('unauthenticated.toggle-button-group.options.login'),
                },
                {
                  key: 'sign-up',
                  value: t(
                    'unauthenticated.toggle-button-group.options.sign-up'
                  ),
                },
              ]}
              selectedButtonKey={action}
              onButtonClicked={handleClickOnToggleButton}
            />
            <div className='flex flex-col gap-sm-control-padding p-sm-control-padding w-full rounded-b-md border border-base-content'>
              {action === 'login' && !isConfirmationGoing && (
                <LoginForm
                  form={loginForm}
                  alertProps={alertProps}
                  onSubmit={handleLoginFormSubmit}
                />
              )}
              {action === 'sign-up' && !isConfirmationGoing && (
                <SignUpForm
                  form={signUpForm}
                  alertProps={alertProps}
                  onSubmit={handleSignUpFormSubmit}
                />
              )}
              {isConfirmationGoing && (
                <ConfirmationCodeForm
                  emailToConfirm={
                    loginForm.getValues().email ?? signUpForm.getValues().email
                  }
                />
              )}
            </div>
          </div>
        </details>
      )}
    </>
  );
};

export default AuthDropdown;
