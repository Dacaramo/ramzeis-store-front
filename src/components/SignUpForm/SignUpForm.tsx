'use client';

import 'react-international-phone/style.css';

import {
  CSSProperties,
  FC,
  ComponentProps,
  useState,
  ChangeEvent as ReactChangeEvent,
} from 'react';
import { errorSpanClasses, inputClasses } from '@/src/constants/classes';
import { colors } from '@/src/constants/colors';
import useTheme from '@/src/hooks/useTheme';
import { SignUpFormData, signUpFormDataSchema } from '@/src/model/otherSchemas';
import { valibotResolver } from '@hookform/resolvers/valibot';
import { SubmitHandler, useForm } from 'react-hook-form';
import ControlledPhoneInput from '../ControlledPhoneInput/ControlledPhoneInput';
import {
  autoSignIn,
  confirmSignUp,
  fetchAuthSession,
  signUp,
} from 'aws-amplify/auth';
import Alert from '../Alert/Alert';
import { useTranslations } from 'next-intl';
import Link from 'next/link';
import { useStore } from '@/src/zustand/store';
import { createBuyer } from '@/src/clients/axiosClient';
import { Buyer } from '@/src/model/Buyer';
import GoogleIcon from '../icons/GoogleIcon';

interface Props {}

const SignUpForm: FC<Props> = ({}) => {
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
  const signUpForm = useForm<SignUpFormData>({
    defaultValues: {
      areTermsAndConditionsAccepted: false,
    },
    resolver: valibotResolver(signUpFormDataSchema),
  });
  const setUser = useStore(({ setUser }) => {
    return setUser;
  });

  const inputStyles: CSSProperties = {
    borderColor: colors[theme].error,
  };

  const handleChangeOnConfirmationCodeInput = (
    e: ReactChangeEvent<HTMLInputElement>
  ) => {
    setConfirmationCode(e.target.value);
  };

  const handleClickOnConfirmCodeButton = async (
    signUpFormData: SignUpFormData
  ) => {
    try {
      setIsConfirmationLoading(true);
      const confirmationResponse = await confirmSignUp({
        username: signUpFormData.email,
        confirmationCode,
      });

      console.log('@@@@@confirmationResponse', confirmationResponse);

      if (
        confirmationResponse.nextStep.signUpStep === 'COMPLETE_AUTO_SIGN_IN'
      ) {
        setIsConfirmationLoading(false);
        const response = await autoSignIn();

        console.log('@@@@@autoSignInResponse', response);

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
        const buyer = await createBuyer(
          signUpFormData.email,
          [
            {
              documentName: 'Terms and conditions',
              documentVersion: '1.0.0',
              acceptanceTimestamp: new Date().toISOString(),
            },
          ] as Omit<Buyer['buyerAgreements'], 'acceptanceIP'>,
          JSON.parse(
            localStorage.getItem('cartDetails') ?? '{}'
          ) as Buyer['buyerCartDetails']
        );
        setUser({
          isAuthenticated: true,
          data: {
            email: signUpFormData.email,
            phone: signUpFormData.phone,
            name: 'none',
            picture: 'none',
            stripeCustomerId: buyer.buyerStripeCustomerId,
            agreements: buyer.buyerAgreements,
          },
          tokens: {
            idToken: tokens!.idToken!.toString(),
            accessToken: tokens!.accessToken.toString(),
          },
        });
        setAlertProps({
          type: 'alert-success',
          text: t('alert.sign-up-success-text'),
          icon: <span className='loading loading-ring loading-md'></span>,
        });
        setTimeout(() => {
          setAlertProps(undefined);
          signUpForm.reset();
        }, 3000);
      }
    } catch (error) {
      const e = error as Error;
      console.log(e);
      setAlertProps({
        type: 'alert-error',
        text: t(`alert.exceptions.${e.name}`).startsWith('alert.exceptions')
          ? t('alert.exceptions.UnknownException', {
              exception: e.name,
            })
          : t(`alert.exceptions.${e.name}`),
      });
      setIsConfirmationLoading(false);
    }
  };

  const handleSignUpFormSubmit: SubmitHandler<SignUpFormData> = async (
    data: SignUpFormData
  ) => {
    try {
      const signUpResponse = await signUp({
        username: data.email,
        password: data.password,
        options: {
          userAttributes: {
            name: 'none',
            picture: 'none',
            phone_number: data.phone,
          },
          autoSignIn: true,
        },
      });
      if (signUpResponse.nextStep.signUpStep === 'CONFIRM_SIGN_UP') {
        setAlertProps({
          type: 'alert-warning',
          text: t.rich('alert.confirm-account-text', {
            email: data.email,
          }),
        });
        setStep('confirmation-pending');
      }
    } catch (error) {
      const e = error as Error;
      setAlertProps({
        type: 'alert-error',
        text: t(`alert.exceptions.${e.name}`).startsWith('alert.exceptions')
          ? t('alert.exceptions.UnknownException', {
              exception: e.name,
            })
          : t(`alert.exceptions.${e.name}`),
      });
    }
  };

  const handleClickOnCheckBox = () => {
    signUpForm.setValue(
      'areTermsAndConditionsAccepted',
      !signUpForm.getValues().areTermsAndConditionsAccepted
    );
  };

  const handleClickOnGoogleButton = () => {
    /**
     * TODO
     */
  };

  return (
    <>
      {step === 'submit-pending' && (
        <form
          className='flex flex-col gap-sm-control-padding'
          onSubmit={signUpForm.handleSubmit(handleSignUpFormSubmit)}
          autoComplete='off'
        >
          <div className='flex flex-col'>
            <label
              htmlFor='sign-up-email-input'
              className='ml-sm-control-padding self-start text-tiny'
            >
              {t('email-input.label')}
            </label>
            <input
              {...signUpForm.register('email')}
              id='sign-up-email-input'
              style={signUpForm.formState.errors.email ? inputStyles : {}}
              className={`${inputClasses}`}
              placeholder={t('email-input.placeholder')}
            />
            {signUpForm.formState.errors.email && (
              <span className={`${errorSpanClasses}`}>
                {signUpForm.formState.errors.email.message}
              </span>
            )}
          </div>
          <div className='flex flex-col'>
            <label
              htmlFor='sign-up-phone-input'
              className='ml-sm-control-padding self-start text-tiny'
            >
              {t('phone-input.label')}
            </label>
            <ControlledPhoneInput
              name='phone'
              control={signUpForm.control}
              style={signUpForm.formState.errors.phone ? inputStyles : {}}
            />
            {signUpForm.formState.errors.phone && (
              <span className={`${errorSpanClasses}`}>
                {signUpForm.formState.errors.phone.message}
              </span>
            )}
          </div>
          <div className='flex flex-col'>
            <label
              htmlFor='sign-up-password-input'
              className='ml-sm-control-padding self-start text-tiny'
            >
              {t('password-input.label')}
            </label>
            <input
              {...signUpForm.register('password')}
              id='sign-up-password-input'
              type='password'
              style={signUpForm.formState.errors.password ? inputStyles : {}}
              className={`${inputClasses}`}
              placeholder={t('password-input.placeholder')}
            />
            {signUpForm.formState.errors.password && (
              <span className={`${errorSpanClasses}`}>
                {signUpForm.formState.errors.password.message}
              </span>
            )}
          </div>
          <div className='flex flex-col'>
            <label
              htmlFor='sign-up-confirm-password-input'
              className='ml-sm-control-padding self-start text-tiny'
            >
              {t('confirm-password-input.label')}
            </label>
            <input
              {...signUpForm.register('confirmedPassword')}
              id='sign-up-confirm-password-input'
              type='password'
              style={
                signUpForm.formState.errors.confirmedPassword ? inputStyles : {}
              }
              className={`${inputClasses}`}
              placeholder={t('confirm-password-input.placeholder')}
            />
            {signUpForm.formState.errors.confirmedPassword && (
              <span className={`${errorSpanClasses}`}>
                {signUpForm.formState.errors.confirmedPassword.message}
              </span>
            )}
          </div>
          <div className='form-control'>
            <label className='flex flex-row justify-center items-center gap-4'>
              <span className='ml-sm-control-padding label-text'>
                {t.rich('terms-and-conditions-text', {
                  Link: (value) => (
                    <Link
                      href='/'
                      className='link link-secondary'
                    >
                      {value}
                    </Link>
                  ),
                })}
              </span>
              <input
                type='checkbox'
                value={`${
                  signUpForm.getValues().areTermsAndConditionsAccepted
                }`}
                className='checkbox checkbox-xs checkbox-secondary'
                onClick={handleClickOnCheckBox}
              />
            </label>
          </div>
          {signUpForm.formState.errors.areTermsAndConditionsAccepted && (
            <span className={`${errorSpanClasses}`}>
              {
                signUpForm.formState.errors.areTermsAndConditionsAccepted
                  .message
              }
            </span>
          )}
          <button
            type='submit'
            className='w-full btn btn-sm'
            disabled={signUpForm.formState.isSubmitting}
          >
            {signUpForm.formState.isSubmitting ? (
              <span className='loading loading-infinity'></span>
            ) : (
              t('sign-up-button-text')
            )}
          </button>
        </form>
      )}
      {alertProps && <Alert {...alertProps} />}
      {step === 'confirmation-pending' && (
        <>
          <input
            type='text'
            placeholder='Your confirmation code'
            className={'w-full input input-sm bg-base-200 outline-none'}
            value={confirmationCode}
            onChange={handleChangeOnConfirmationCodeInput}
          />
          <button
            type='button'
            className='w-full btn btn-sm font-normal bg-base-200'
            onClick={() =>
              handleClickOnConfirmCodeButton(signUpForm.getValues())
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
      {step === 'submit-pending' && (
        <>
          <div className='divider m-0 text-tiny'>{t('divider-text')}</div>
          <button
            type='button'
            className='w-full btn btn-sm text-tiny'
            onClick={handleClickOnGoogleButton}
          >
            {t('google-sign-up-text')}
            <GoogleIcon />
          </button>
        </>
      )}
    </>
  );
};

export default SignUpForm;
