'use client';

import 'react-international-phone/style.css';

import { errorSpanClasses, inputClasses } from '@/src/constants/classes';
import { colors } from '@/src/constants/colors';
import useTheme from '@/src/hooks/useTheme';
import { SignUpFormData, signUpFormDataSchema } from '@/src/model/otherSchemas';
import { valibotResolver } from '@hookform/resolvers/valibot';
import { CSSProperties, FC } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import ControlledPhoneInput from '../ControlledPhoneInput/ControlledPhoneInput';
import { signUp } from 'aws-amplify/auth';
import Alert from '../Alert/Alert';
import { useTranslations } from 'next-intl';
import Link from 'next/link';

interface Props {}

const SignUpForm: FC<Props> = ({}) => {
  const t = useTranslations('unauthenticated');
  const theme = useTheme([]);
  const signUpForm = useForm<SignUpFormData>({
    defaultValues: {
      areTermsAndConditionsAccepted: false,
    },
    resolver: valibotResolver(signUpFormDataSchema),
  });

  const inputStyles: CSSProperties = {
    borderColor: colors[theme].error,
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
            phone_number: data.phone,
          },
        },
      });
      if (signUpResponse.nextStep.signUpStep === 'CONFIRM_SIGN_UP') {
        signUpForm.setError('root', {
          message:
            'CONFIRM YOUR ACCOUNT: Go to your email and click on the link we sended to you to confirm your account',
        });
      } else if (signUpResponse.nextStep.signUpStep === 'DONE') {
        signUpForm.setError('root', {
          message: 'Account confirmed successfully!',
        });
      }
    } catch (error) {}
  };

  const handleClickOnCheckBox = () => {
    signUpForm.setValue(
      'areTermsAndConditionsAccepted',
      !signUpForm.getValues().areTermsAndConditionsAccepted
    );
  };

  return (
    <>
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
              value={`${signUpForm.getValues().areTermsAndConditionsAccepted}`}
              className='checkbox checkbox-xs checkbox-secondary'
              onClick={handleClickOnCheckBox}
            />
          </label>
        </div>
        {signUpForm.formState.errors.areTermsAndConditionsAccepted && (
          <span className={`${errorSpanClasses}`}>
            {signUpForm.formState.errors.areTermsAndConditionsAccepted.message}
          </span>
        )}
        <button
          type='submit'
          className='w-full btn btn-sm'
        >
          {t('sign-up-button-text')}
        </button>
      </form>
      {signUpForm.formState.errors.root && (
        <Alert
          text={signUpForm.formState.errors.root.message ?? ''}
          type='alert-error'
        />
      )}
    </>
  );
};

export default SignUpForm;
