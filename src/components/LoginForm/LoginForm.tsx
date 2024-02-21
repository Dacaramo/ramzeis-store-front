'use client';

import { CSSProperties, ComponentProps, FC, ReactNode } from 'react';
import { SubmitHandler, UseFormReturn } from 'react-hook-form';
import useTheme from '@/src/hooks/useTheme';
import { LoginFormData } from '@/src/model/otherSchemas';
import { colors } from '@/src/constants/colors';
import { errorSpanClasses, inputClasses } from '@/src/constants/classes';
import { useTranslations } from 'next-intl';
import Alert from '../Alert/Alert';
import GoogleIcon from '../icons/GoogleIcon';

interface Props {
  form: UseFormReturn<LoginFormData>;
  alertProps?: ComponentProps<typeof Alert>;
  forgotPasswordButtonText: ReactNode;
  onSubmit: SubmitHandler<LoginFormData>;
  onForgotPasswordButtonClick: () => void;
}

const LoginForm: FC<Props> = ({
  form,
  alertProps,
  forgotPasswordButtonText,
  onSubmit: handleSubmit,
  onForgotPasswordButtonClick: handleClickOnForgotPasswordButton,
}) => {
  const t = useTranslations('unauthenticated');
  const theme = useTheme([]);

  const inputStyles: CSSProperties = {
    borderColor: colors[theme].error,
  };

  const handleClickOnGoogleButton = () => {
    /**
     * TODO
     */
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
            htmlFor='login-email-input'
            className='ml-sm-control-padding self-start text-tiny'
          >
            {t('email-input.label')}
          </label>
          <input
            {...form.register('email')}
            id='login-email-input'
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
            htmlFor='login-password-input'
            className='ml-sm-control-padding self-start text-tiny'
          >
            {t('password-input.label')}
          </label>
          <input
            {...form.register('password')}
            id='login-password-input'
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
        <button
          type='submit'
          className='w-full btn btn-sm'
          disabled={form.formState.isSubmitting}
        >
          {form.formState.isSubmitting ? (
            <span className='loading loading-infinity'></span>
          ) : (
            t('login-button-text')
          )}
        </button>
      </form>
      {alertProps && <Alert {...alertProps} />}
      <button
        type='button'
        className='self-center link-secondary text-tiny'
        onClick={handleClickOnForgotPasswordButton}
      >
        {forgotPasswordButtonText}
      </button>
      <div className='divider m-0 text-tiny'>{t('divider-text')}</div>
      <button
        type='button'
        className='w-full btn btn-sm text-tiny'
        onClick={handleClickOnGoogleButton}
      >
        {t('google-login-text')}
        <GoogleIcon />
      </button>
    </>
  );
};

export default LoginForm;
