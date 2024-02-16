'use client';

import {
  CSSProperties,
  ComponentProps,
  FC,
  useState,
  ChangeEvent as ReactChangeEvent,
} from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import useTheme from '@/src/hooks/useTheme';
import { valibotResolver } from '@hookform/resolvers/valibot';
import { LoginFormData, loginFormDataSchema } from '@/src/model/otherSchemas';
import { colors } from '@/src/constants/colors';
import { errorSpanClasses, inputClasses } from '@/src/constants/classes';
import { useTranslations } from 'next-intl';
import Alert from '../Alert/Alert';
import {
  signIn,
  confirmSignUp,
  autoSignIn,
  fetchAuthSession,
  signOut,
} from 'aws-amplify/auth';
import { getBuyer } from '@/src/clients/axiosClient';
import { User, useStore } from '@/src/zustand/store';
import useLocalStorage from '@/src/hooks/useLocalStorage';

interface Props {}

const LoginForm: FC<Props> = ({}) => {
  const [step, setStep] = useState<'submit-pending' | 'confirmation-pending'>(
    'submit-pending'
  );
  const [alertProps, setAlertProps] = useState<
    ComponentProps<typeof Alert> | undefined
  >(undefined);
  const [confirmationCode, setConfirmationCode] = useState<string>('');
  const [isConfirmationLoading, setIsConfirmationLoading] =
    useState<boolean>(false);

  const t = useTranslations('unauthenticated');
  const theme = useTheme([]);
  const loginForm = useForm<LoginFormData>({
    resolver: valibotResolver(loginFormDataSchema),
  });
  const [setUser, setCartDetails] = useStore((state) => {
    return [state.setUser, state.setCartDetails];
  });
  const { setUserInLocalStorage } = useLocalStorage();

  const inputStyles: CSSProperties = {
    borderColor: colors[theme].error,
  };

  const handleChangeOnConfirmationCodeInput = async (
    e: ReactChangeEvent<HTMLInputElement>
  ) => {
    setConfirmationCode(e.target.value);
  };

  const finishLogin = async (data: LoginFormData) => {
    const { tokens } = await fetchAuthSession();
    if (!tokens) {
      setAlertProps({
        type: 'alert-error',
        text: t('alert.exceptions.SessionWithoutPreviousSignIn'),
      });
    } else if (!tokens.idToken) {
      setAlertProps({
        type: 'alert-error',
        text: t('alert.exceptions.MissingIdToken'),
      });
    }
    const buyer = await getBuyer(data.email);
    setAlertProps(undefined);
    setIsConfirmationLoading(false);
    const user: User = {
      isAuthenticated: true,
      data: {
        email: buyer.pk,
        stripeCustomerId: buyer.buyerStripeCustomerId,
        agreements: buyer.buyerAgreements,
      },
      tokens: {
        idToken: tokens!.idToken!.toString(),
        accessToken: tokens!.accessToken.toString(),
      },
    };
    setUser(user);
    setCartDetails(buyer.buyerCartDetails);
    setUserInLocalStorage(user);
    loginForm.reset();
  };

  const handleClickOnConfirmCodeButton = async (data: LoginFormData) => {
    try {
      setIsConfirmationLoading(true);
      const confirmationResponse = await confirmSignUp({
        username: data.email,
        confirmationCode,
      });
      if (
        confirmationResponse.nextStep.signUpStep === 'COMPLETE_AUTO_SIGN_IN'
      ) {
        await autoSignIn();
        await finishLogin(data);
      }
    } catch (error) {
      const e = error as Error;
      await signOut();
      setAlertProps({
        type: 'alert-error',
        text: t(`alert.exceptions.${e.name}`).startsWith(
          'unauthenticated.alert.exceptions'
        )
          ? t('alert.exceptions.UnknownException', {
              exception: e.name,
            })
          : t(`alert.exceptions.${e.name}`),
      });
      setIsConfirmationLoading(false);
    }
  };

  const handleLoginFormSubmit: SubmitHandler<LoginFormData> = async (
    data: LoginFormData
  ) => {
    try {
      const response = await signIn({
        username: data.email,
        password: data.password,
      });
      if (response.nextStep.signInStep === 'CONFIRM_SIGN_UP') {
        setAlertProps({
          type: 'alert-warning',
          text: t.rich('alert.confirm-account-text', {
            email: data.email,
          }),
        });
        setStep('confirmation-pending');
      } else if (response.nextStep.signInStep === 'DONE') {
        await finishLogin(data);
      }
    } catch (error) {
      const e = error as Error;
      await signOut();
      setAlertProps({
        type: 'alert-error',
        text: t(`alert.exceptions.${e.name}`).startsWith(
          'unauthenticated.alert.exceptions'
        )
          ? t('alert.exceptions.UnknownException', {
              exception: e.name,
            })
          : t(`alert.exceptions.${e.name}`),
      });
    }
  };

  return (
    <>
      {step === 'submit-pending' && (
        <form
          className='flex flex-col gap-sm-control-padding'
          onSubmit={loginForm.handleSubmit(handleLoginFormSubmit)}
          autoComplete='off'
        >
          <div className='flex flex-col'>
            <label
              htmlFor='login-email-input'
              className='ml-sm-control-padding self-start text-tiny'
            >
              {t('email-input.label')}
            </label>
            <input
              {...loginForm.register('email')}
              id='login-email-input'
              style={loginForm.formState.errors.email ? inputStyles : {}}
              className={`${inputClasses}`}
              placeholder={t('email-input.placeholder')}
            />
            {loginForm.formState.errors.email && (
              <span className={`${errorSpanClasses}`}>
                {loginForm.formState.errors.email.message}
              </span>
            )}
          </div>
          <div className='flex flex-col'>
            <label
              htmlFor='login-password-input'
              className='ml-sm-control-padding self-start text-tiny'
            >
              {t('password-input.label')}
            </label>
            <input
              {...loginForm.register('password')}
              id='login-password-input'
              type='password'
              style={loginForm.formState.errors.password ? inputStyles : {}}
              className={`${inputClasses}`}
              placeholder={t('password-input.placeholder')}
            />
            {loginForm.formState.errors.password && (
              <span className={`${errorSpanClasses}`}>
                {loginForm.formState.errors.password.message}
              </span>
            )}
          </div>
          <button
            type='submit'
            className='w-full btn btn-sm'
            disabled={loginForm.formState.isSubmitting}
          >
            {loginForm.formState.isSubmitting ? (
              <span className='loading loading-infinity'></span>
            ) : (
              t('login-button-text')
            )}
          </button>
        </form>
      )}
      {alertProps && <Alert {...alertProps} />}
      {step === 'confirmation-pending' && (
        <>
          <input
            type='text'
            placeholder={t('confirmation-code-input.placeholder')}
            className={'w-full input input-sm bg-base-200 outline-none'}
            value={confirmationCode}
            onChange={handleChangeOnConfirmationCodeInput}
          />
          <button
            type='button'
            className='w-full btn btn-sm font-normal bg-base-200'
            onClick={() =>
              handleClickOnConfirmCodeButton(loginForm.getValues())
            }
            disabled={isConfirmationLoading}
          >
            {isConfirmationLoading ? (
              <span className='loading loading-infinity'></span>
            ) : (
              t('alert.confirm-button')
            )}
          </button>
        </>
      )}
    </>
  );
};

export default LoginForm;
