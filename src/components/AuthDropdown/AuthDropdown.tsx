'use client';

import { ComponentProps, FC, useState, useRef, useEffect } from 'react';
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
  ForgotPasswordStep1FormData,
  ForgotPasswordStep2FormData,
  LoginFormData,
  SignUpFormData,
  forgotPasswordStep1FormDataSchema,
  forgotPasswordStep2FormDataSchema,
  loginFormDataSchema,
  signUpFormDataSchema,
} from '@/src/model/otherSchemas';
import useAuth from '@/src/hooks/useAuth';
import {
  signOut as amplifySignOut,
  confirmResetPassword,
  resetPassword,
  signInWithRedirect,
  fetchUserAttributes,
} from 'aws-amplify/auth';
import Alert from '../Alert/Alert';
import ConfirmationCodeForm from '../ConfirmationCodeForm/ConfirmationCodeForm';
import { valibotResolver } from '@hookform/resolvers/valibot';
import ForgotPasswordStep1Form from '../ForgotPasswordStep1Form/ForgotPasswordStep1Form';
import ForgotPasswordStep2Form from '../ForgotPasswordStep2Form/ForgotPasswordStep2Form';
import GoogleIcon from '../icons/GoogleIcon';
import { Hub } from 'aws-amplify/utils';
import useLocalStorage from '@/src/hooks/useLocalStorage';
import { displayError } from '@/src/utils/errors';

type AuthAction = 'login' | 'sign-up';
type AuthProvider = 'Google';

interface Props {}

const AuthDropdown: FC<Props> = ({}) => {
  const [action, setAction] = useState<AuthAction>('login');
  const [isConfirmationGoing, setIsConfirmationGoing] =
    useState<boolean>(false);
  const [isForgotPasswordStep, setIsForgotPasswordStep] = useState<
    'unstarted' | 'step1' | 'step2'
  >('unstarted');
  const [alertProps, setAlertProps] = useState<
    ComponentProps<typeof Alert> | undefined
  >(undefined);

  const detailsRef = useRef<HTMLDetailsElement | null>(null);

  const t = useTranslations();
  const [isAuthenticated, setGlobalAlertProps, user, setUser] = useStore(
    (state) => {
      return [
        state.user.isAuthenticated,
        state.setGlobalAlertProps,
        state.user,
        state.setUser,
      ];
    }
  );
  const { signUp, signIn, concludeSignIn, signOut } = useAuth();
  const { removeUserFromLocalStorage } = useLocalStorage();
  const signUpForm = useForm<SignUpFormData>({
    defaultValues: {
      areTermsAndConditionsAccepted: false,
    },
    resolver: valibotResolver(signUpFormDataSchema),
  });
  const loginForm = useForm<LoginFormData>({
    resolver: valibotResolver(loginFormDataSchema),
  });
  const forgotPasswordStep1Form = useForm<ForgotPasswordStep1FormData>({
    resolver: valibotResolver(forgotPasswordStep1FormDataSchema),
  });
  const forgotPasswordStep2Form = useForm<ForgotPasswordStep2FormData>({
    resolver: valibotResolver(forgotPasswordStep2FormDataSchema),
  });

  const exceptionsNamespace = 'unauthenticated.alert.exceptions';

  const resetEverything = () => {
    setAlertProps(undefined);
    setIsConfirmationGoing(false);
    setIsForgotPasswordStep('unstarted');
    loginForm.reset();
    signUpForm.reset();
    forgotPasswordStep1Form.reset();
    forgotPasswordStep2Form.reset();
  };

  const handleClickOnSummary = () => {
    resetEverything();
  };

  const handleClickOnToggleButton = (clickedButton: ToggleButtonDefinition) => {
    if (clickedButton.key !== action) {
      setAction(clickedButton.key as AuthAction);
      resetEverything();
    }
  };

  const handleLoginFormSubmit: SubmitHandler<LoginFormData> = async (
    data: LoginFormData
  ) => {
    try {
      const authStep = await signIn(data.email, data.password);

      if (authStep === 'CONFIRMATION_PENDING') {
        setIsConfirmationGoing(true);
      } else {
        setGlobalAlertProps({
          type: 'alert-success',
          content: t('unauthenticated.alert.login-success-text'),
        });
      }
    } catch (error) {
      const e = error as Error;
      await amplifySignOut();
      displayError(e, t, exceptionsNamespace, setAlertProps);
    }
  };

  const handleClickOnForgotPasswordButton = async () => {
    setIsForgotPasswordStep('step1');
  };

  const handleSignUpFormSubmit: SubmitHandler<SignUpFormData> = async (
    data: SignUpFormData
  ) => {
    try {
      await signUp(data.email, data.phone, data.password);

      setAlertProps({
        type: 'alert-warning',
        content: t.rich('unauthenticated.alert.confirm-account-text', {
          email: data.email,
        }),
      });
      setIsConfirmationGoing(true);
    } catch (error) {
      const e = error as Error;
      displayError(e, t, exceptionsNamespace, setAlertProps);
    }
  };

  const handleClickOnAuthProviderButton = async (
    provider: AuthProvider,
    purpose: AuthAction
  ) => {
    try {
      await signInWithRedirect({
        provider,
        customState: purpose,
      });
    } catch (error) {
      const e = error as Error;

      await amplifySignOut();

      if (!detailsRef.current) return;
      detailsRef.current.removeAttribute('open');

      displayError(e, t, exceptionsNamespace, setGlobalAlertProps);
    }
  };

  const handleForgotPasswordStep1FormSubmit: SubmitHandler<
    ForgotPasswordStep1FormData
  > = async (data: ForgotPasswordStep1FormData) => {
    try {
      const response = await resetPassword({
        username: data.email,
      });

      if (
        response.nextStep.resetPasswordStep ===
        'CONFIRM_RESET_PASSWORD_WITH_CODE'
      ) {
        setIsForgotPasswordStep('step2');
      }
    } catch (error) {
      const e = error as Error;
      displayError(e, t, exceptionsNamespace, setAlertProps);
    }
  };

  const handleForgotPasswordStep2FormSubmit: SubmitHandler<
    ForgotPasswordStep2FormData
  > = async (data: ForgotPasswordStep2FormData) => {
    try {
      await confirmResetPassword({
        username: forgotPasswordStep1Form.getValues().email, // PUEDE NO SERVIR
        confirmationCode: data.code,
        newPassword: data.newPassword,
      });

      if (!detailsRef.current) return;
      detailsRef.current.removeAttribute('open');

      setGlobalAlertProps({
        type: 'alert-success',
        content: t('unauthenticated.alert.account-recovery-success-text'),
      });
    } catch (error) {
      const e = error as Error;
      displayError(e, t, exceptionsNamespace, setAlertProps);
    }
  };

  useEffect(() => {
    const unsubscribe = Hub.listen('auth', async ({ payload }) => {
      try {
        switch (payload.event) {
          case 'signInWithRedirect':
            /**
             * Will get here if the call to signInWithRedirect was successful and none custom state was passed to the function
             */
            break;
          case 'signInWithRedirect_failure':
            setGlobalAlertProps({
              type: 'alert-error',
              content: t(
                `unauthenticated.alert.exceptions.${payload.data.error?.name}`
              ).startsWith(exceptionsNamespace)
                ? t('unauthenticated.alert.exceptions.UnknownException', {
                    exception: payload.data.error?.name,
                  })
                : t(
                    `unauthenticated.alert.exceptions.${payload.data.error?.name}`
                  ),
            });
            break;
          case 'customOAuthState':
            /**
             * Will get here if the call to signInWithRedirect was successful and a custom state was passed to the function. the custom state value will be received inside payload.data
             */
            const attributes = await fetchUserAttributes();

            if (!attributes.email) {
              setGlobalAlertProps({
                type: 'alert-error',
                content: t(
                  `unauthenticated.alert.exceptions.EmailMissingFromAuthProviderException`
                ),
              });
            } else {
              await concludeSignIn(attributes.email);

              setGlobalAlertProps({
                type: 'alert-success',
                content: t('unauthenticated.alert.login-success-text'),
              });
            }
            break;
          case 'signedOut':
            /**
             * The signOut function coming from the useAuth hook, already makes what's coming below, but it's mandatory to also do it here, since for all users that are authenticated with an auth provider (e.g. Google) the browser will redirect the user to the redirect sign out url, so not all of the code that is inside signOut will be executed.
             */
            setUser({
              isAuthenticated: false,
            });
            removeUserFromLocalStorage();
            setGlobalAlertProps({
              type: 'alert-success',
              content: t('unauthenticated.alert.sign-out-success-text'),
            });
            break;
        }
      } catch (error) {
        const e = error as Error;

        await amplifySignOut();

        displayError(e, t, exceptionsNamespace, setGlobalAlertProps);
      }
    });

    return unsubscribe;
  }, []);

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
        <details
          ref={detailsRef}
          className='dropdown dropdown-end'
        >
          <summary
            role='button'
            className='flex justify-center items-center h-sm-control-height font-normal text-tiny hover:text-secondary'
            onClick={handleClickOnSummary}
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
              {action === 'login' &&
                !isConfirmationGoing &&
                isForgotPasswordStep === 'unstarted' && (
                  <>
                    <LoginForm
                      form={loginForm}
                      alertProps={alertProps}
                      forgotPasswordButtonText={t(
                        'unauthenticated.forgot-password-text'
                      )}
                      onSubmit={handleLoginFormSubmit}
                      onForgotPasswordButtonClick={
                        handleClickOnForgotPasswordButton
                      }
                    />
                    <div className='divider m-0 text-tiny'>
                      {t('unauthenticated.divider-text')}
                    </div>
                    <button
                      type='button'
                      className='w-full btn btn-sm text-tiny'
                      onClick={() =>
                        handleClickOnAuthProviderButton('Google', 'login')
                      }
                    >
                      {t('unauthenticated.google-login-text')}
                      <GoogleIcon />
                    </button>
                  </>
                )}
              {action === 'login' &&
                !isConfirmationGoing &&
                isForgotPasswordStep === 'step1' && (
                  <ForgotPasswordStep1Form
                    form={forgotPasswordStep1Form}
                    alertProps={alertProps}
                    onSubmit={handleForgotPasswordStep1FormSubmit}
                  />
                )}
              {action === 'login' &&
                !isConfirmationGoing &&
                isForgotPasswordStep === 'step2' && (
                  <ForgotPasswordStep2Form
                    form={forgotPasswordStep2Form}
                    alertProps={alertProps}
                    onSubmit={handleForgotPasswordStep2FormSubmit}
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
