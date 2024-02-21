'use client';

import { CSSProperties, ComponentProps, FC } from 'react';
import { SubmitHandler, UseFormReturn } from 'react-hook-form';
import useTheme from '@/src/hooks/useTheme';
import { ForgotPasswordStep1FormData } from '@/src/model/otherSchemas';
import { colors } from '@/src/constants/colors';
import { errorSpanClasses, inputClasses } from '@/src/constants/classes';
import { useTranslations } from 'next-intl';
import Alert from '../Alert/Alert';

interface Props {
  form: UseFormReturn<ForgotPasswordStep1FormData>;
  alertProps?: ComponentProps<typeof Alert>;
  onSubmit: SubmitHandler<ForgotPasswordStep1FormData>;
}

const ForgotPasswordStep1Form: FC<Props> = ({
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
        <Alert
          type='alert-info'
          content={t('forgot-password-alert-text')}
        />
        <div className='flex flex-col'>
          <label
            htmlFor='forgot-password-email-input'
            className='ml-sm-control-padding self-start text-tiny'
          >
            {t('email-input.label')}
          </label>
          <input
            {...form.register('email')}
            id='forgot-password-email-input'
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
        <button
          type='submit'
          className='w-full btn btn-sm'
          disabled={form.formState.isSubmitting}
        >
          {form.formState.isSubmitting ? (
            <span className='loading loading-infinity'></span>
          ) : (
            t('forgot-password-step-1-button')
          )}
        </button>
      </form>
      {alertProps && <Alert {...alertProps} />}
    </>
  );
};

export default ForgotPasswordStep1Form;
