'use client';

import 'react-international-phone/style.css';

import { CSSProperties, FC, ComponentProps } from 'react';
import { errorSpanClasses, inputClasses } from '@/src/constants/classes';
import { colors } from '@/src/constants/colors';
import useTheme from '@/src/hooks/useTheme';
import { SignUpFormData } from '@/src/model/otherSchemas';
import { SubmitHandler, UseFormReturn, useForm } from 'react-hook-form';
import ControlledPhoneInput from '../ControlledPhoneInput/ControlledPhoneInput';
import Alert from '../Alert/Alert';
import { useTranslations } from 'next-intl';
import Link from 'next/link';
import GoogleIcon from '../icons/GoogleIcon';

interface Props {
  form: UseFormReturn<SignUpFormData>;
  alertProps?: ComponentProps<typeof Alert>;
  onSubmit: SubmitHandler<SignUpFormData>;
}

const SignUpForm: FC<Props> = ({
  form,
  alertProps,
  onSubmit: handleSubmit,
}) => {
  const t = useTranslations('unauthenticated');
  const theme = useTheme([]);

  const inputStyles: CSSProperties = {
    borderColor: colors[theme].error,
  };

  const handleClickOnCheckBox = () => {
    form.setValue(
      'areTermsAndConditionsAccepted',
      !form.getValues().areTermsAndConditionsAccepted
    );
  };

  return (
    <>
      <form
        className='flex flex-col gap-sm-control-padding'
        onSubmit={form.handleSubmit(handleSubmit)}
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
            {...form.register('email')}
            id='sign-up-email-input'
            style={form.formState.errors.email ? inputStyles : {}}
            className={`${inputClasses}`}
            placeholder={t('email-input.placeholder')}
          />
          {form.formState.errors.email && (
            <span className={`${errorSpanClasses}`}>
              {form.formState.errors.email.message}
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
            control={form.control}
            style={form.formState.errors.phone ? inputStyles : {}}
          />
          {form.formState.errors.phone && (
            <span className={`${errorSpanClasses}`}>
              {form.formState.errors.phone.message}
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
            {...form.register('password')}
            id='sign-up-password-input'
            type='password'
            style={form.formState.errors.password ? inputStyles : {}}
            className={`${inputClasses}`}
            placeholder={t('password-input.placeholder')}
          />
          {form.formState.errors.password && (
            <span className={`${errorSpanClasses}`}>
              {form.formState.errors.password.message}
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
            {...form.register('confirmedPassword')}
            id='sign-up-confirm-password-input'
            type='password'
            style={form.formState.errors.confirmedPassword ? inputStyles : {}}
            className={`${inputClasses}`}
            placeholder={t('confirm-password-input.placeholder')}
          />
          {form.formState.errors.confirmedPassword && (
            <span className={`${errorSpanClasses}`}>
              {form.formState.errors.confirmedPassword.message}
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
              value={`${form.getValues().areTermsAndConditionsAccepted}`}
              className='checkbox checkbox-xs checkbox-secondary'
              onClick={handleClickOnCheckBox}
            />
          </label>
        </div>
        {form.formState.errors.areTermsAndConditionsAccepted && (
          <span className={`${errorSpanClasses}`}>
            {form.formState.errors.areTermsAndConditionsAccepted.message}
          </span>
        )}
        <button
          type='submit'
          className='w-full btn btn-sm'
          disabled={form.formState.isSubmitting}
        >
          {form.formState.isSubmitting ? (
            <span className='loading loading-infinity'></span>
          ) : (
            t('sign-up-button-text')
          )}
        </button>
      </form>
      {alertProps && <Alert {...alertProps} />}
    </>
  );
};

export default SignUpForm;
