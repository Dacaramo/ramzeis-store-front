'use client';

import { ComponentProps, FC, useState, useRef } from 'react';
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
} from 'aws-amplify/auth';
import Alert from '../Alert/Alert';
import ConfirmationCodeForm from '../ConfirmationCodeForm/ConfirmationCodeForm';
import { valibotResolver } from '@hookform/resolvers/valibot';
import ForgotPasswordStep1Form from '../ForgotPasswordStep1Form/ForgotPasswordStep1Form';
import ForgotPasswordStep2Form from '../ForgotPasswordStep2Form/ForgotPasswordStep2Form';

type AuthDropdownAction = 'login' | 'sign-up';

interface Props {}

const AuthDropdown: FC<Props> = ({}) => {
  const [action, setAction] = useState<AuthDropdownAction>('login');
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
  const [isAuthenticated, setGlobalAlertProps] = useStore((state) => {
    return [state.user.isAuthenticated, state.setGlobalAlertProps];
  });
  const { signUp, signIn } = useAuth();
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
      setAction(clickedButton.key as AuthDropdownAction);
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

      setAlertProps({
        type: 'alert-error',
        content: t(`unauthenticated.alert.exceptions.${e.name}`).startsWith(
          'unauthenticated.alert.exceptions'
        )
          ? t('unauthenticated.alert.exceptions.UnknownException', {
              exception: e.name,
            })
          : t(`unauthenticated.alert.exceptions.${e.name}`),
      });
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

      setAlertProps({
        type: 'alert-error',
        content: t(`unauthenticated.alert.exceptions.${e.name}`).startsWith(
          'unauthenticated.alert.exceptions'
        )
          ? t('unauthenticated.alert.exceptions.UnknownException', {
              exception: e.name,
            })
          : t(`unauthenticated.alert.exceptions.${e.name}`),
      });
    }
  };

  const handleClickOnGoogleButton = () => {
    /**
     * TODO
     */
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

      setAlertProps({
        type: 'alert-error',
        content: t(`unauthenticated.alert.exceptions.${e.name}`).startsWith(
          'unauthenticated.alert.exceptions'
        )
          ? t('unauthenticated.alert.exceptions.UnknownException', {
              exception: e.name,
            })
          : t(`unauthenticated.alert.exceptions.${e.name}`),
      });
    }
  };

  const handleForgotPasswordStep2FormSubmit: SubmitHandler<
    ForgotPasswordStep2FormData
  > = async (data: ForgotPasswordStep2FormData) => {
    try {
      if (!detailsRef.current) return;

      await confirmResetPassword({
        username: forgotPasswordStep1Form.getValues().email, // PUEDE NO SERVIR
        confirmationCode: data.code,
        newPassword: data.newPassword,
      });

      detailsRef.current.removeAttribute('open');
      setGlobalAlertProps({
        type: 'alert-success',
        content: t('unauthenticated.alert.account-recovery-success-text'),
      });
    } catch (error) {
      const e = error as Error;

      setAlertProps({
        type: 'alert-error',
        content: t(`unauthenticated.alert.exceptions.${e.name}`).startsWith(
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
