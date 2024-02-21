'use client';

import { CSSProperties, ComponentProps, FC } from 'react';
import { SubmitHandler, UseFormReturn } from 'react-hook-form';
import useTheme from '@/src/hooks/useTheme';
import { ForgotPasswordStep2FormData } from '@/src/model/otherSchemas';
import { colors } from '@/src/constants/colors';
import { errorSpanClasses, inputClasses } from '@/src/constants/classes';
import { useTranslations } from 'next-intl';
import Alert from '../Alert/Alert';

interface Props {
  form: UseFormReturn<ForgotPasswordStep2FormData>;
  alertProps?: ComponentProps<typeof Alert>;
  onSubmit: SubmitHandler<ForgotPasswordStep2FormData>;
}

const ForgotPasswordStep2Form: FC<Props> = ({
  form,
  alertProps,
  onSubmit: handleSubmit,
}) => {
  const t = useTranslations('unauthenticated');
  const theme = useTheme([]);

  const inputStyles: CSSProperties = {
    borderColor: colors[theme].error,
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
            htmlFor='forgot-password-new-password-input'
            className='ml-sm-control-padding self-start text-tiny'
          >
            {t('new-password-input.label')}
          </label>
          <input
            {...form.register('newPassword')}
            id='forgot-password-new-password-input'
            type='password'
            style={form.formState.errors.newPassword ? inputStyles : {}}
            className={`${inputClasses}`}
            placeholder={t('new-password-input.placeholder')}
          />
          {form.formState.errors.newPassword && (
            <span className={`${errorSpanClasses}`}>
              {form.formState.errors.newPassword.message}
            </span>
          )}
        </div>
        <div className='flex flex-col'>
          <label
            htmlFor='recovery-code-input'
            className='ml-sm-control-padding self-start text-tiny'
          >
            {t('recovery-code-input.label')}
          </label>
          <input
            {...form.register('code')}
            id='recovery-code-input'
            style={form.formState.errors.code ? inputStyles : {}}
            className={`${inputClasses}`}
            placeholder={t('recovery-code-input.placeholder')}
          />
          {form.formState.errors.code && (
            <span className={`${errorSpanClasses}`}>
              {form.formState.errors.code.message}
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
            t('forgot-password-step-2-button')
          )}
        </button>
      </form>
      {alertProps && <Alert {...alertProps} />}
    </>
  );
};

export default ForgotPasswordStep2Form;
