'use client';

import { errorSpanClasses, inputClasses } from '@/src/constants/classes';
import { colors } from '@/src/constants/colors';
import useTheme from '@/src/hooks/useTheme';
import {
  ChangePasswordData,
  changePasswordFormDataSchema,
} from '@/src/model/otherSchemas';
import { useTranslations } from 'next-intl';
import { CSSProperties, ComponentProps, FC, useState } from 'react';
import { useForm } from 'react-hook-form';
import Alert from '../Alert/Alert';
import { valibotResolver } from '@hookform/resolvers/valibot';
import { updatePassword } from 'aws-amplify/auth';
import { useStore } from '@/src/zustand/store';
interface Props {}

const ChangePasswordForm: FC<Props> = ({}) => {
  const [alertProps, setAlertProps] = useState<
    ComponentProps<typeof Alert> | undefined
  >(undefined);

  const t = useTranslations();

  const {
    reset,
    register,
    formState: { errors, isSubmitting },
    handleSubmit,
  } = useForm<ChangePasswordData>({
    defaultValues: {
      currentPassword: '',
      newPassword: '',
      confirmedNewPassword: '',
    },
    resolver: valibotResolver(changePasswordFormDataSchema),
  });
  const theme = useTheme([]);
  const setGlobalAlertProps = useStore((state) => {
    return state.setGlobalAlertProps;
  });

  const inputStyles: CSSProperties = {
    borderColor: colors[theme].error,
  };
  const divClasses = 'max-w-[280px]';
  const localInputClasses = 'min-w-[280px]';

  const handleFormSubmission = async (data: ChangePasswordData) => {
    try {
      await updatePassword({
        oldPassword: data.currentPassword,
        newPassword: data.newPassword,
      });

      reset();
      setGlobalAlertProps({
        type: 'alert-success',
        content: t('alert.change-password-success-text'),
      });
    } catch (error) {
      const e = error as Error;
      reset();
      setAlertProps({
        type: 'alert-error',
        content: t(`alert.exceptions.${e.name}`).startsWith('alert.exceptions')
          ? t('alert.exceptions.UnknownException', {
              exception: e.name,
            })
          : t(`alert.exceptions.${e.name}`),
      });
    }
  };

  return (
    <form
      className='flex flex-row justify-between items-stretch flex-wrap gap-4'
      onSubmit={handleSubmit(handleFormSubmission)}
    >
      <div className={`flex flex-col ${divClasses}`}>
        <label
          htmlFor='current-password-input'
          className='ml-sm-control-padding self-start text-tiny'
        >
          {t('current-password-input.label')}
        </label>
        <input
          {...register('currentPassword')}
          type='password'
          id='current-password-input'
          style={errors.currentPassword ? inputStyles : {}}
          className={`${inputClasses} ${localInputClasses}`}
          placeholder={t('current-password-input.placeholder')}
        />
        <span
          className={`${errorSpanClasses}`}
          style={{
            visibility: errors.currentPassword ? 'visible' : 'hidden',
          }}
        >
          {errors.currentPassword?.message ?? 'none'}
        </span>
      </div>
      <div className={`flex flex-col ${divClasses}`}>
        <label
          htmlFor='new-password-input'
          className='ml-sm-control-padding self-start text-tiny'
        >
          {t('new-password-input.label')}
        </label>
        <input
          {...register('newPassword')}
          type='password'
          id='new-password-input'
          style={errors.newPassword ? inputStyles : {}}
          className={`${inputClasses} ${localInputClasses}`}
          placeholder={t('new-password-input.placeholder')}
        />
        {errors.newPassword && (
          <span
            className={`${errorSpanClasses}`}
            style={{
              visibility: errors.newPassword ? 'visible' : 'hidden',
            }}
          >
            {errors.newPassword?.message ?? 'none'}
          </span>
        )}
      </div>
      <div className={`flex flex-col ${divClasses}`}>
        <label
          htmlFor='confirmed-new-password-input'
          className='ml-sm-control-padding self-start text-tiny'
        >
          {t('confirmed-new-password-input.label')}
        </label>
        <input
          {...register('confirmedNewPassword')}
          type='password'
          id='confirmed-new-password-input'
          style={errors.confirmedNewPassword ? inputStyles : {}}
          className={`${inputClasses} ${localInputClasses}`}
          placeholder={t('confirmed-new-password-input.placeholder')}
        />
        {errors.confirmedNewPassword && (
          <span
            className={`${errorSpanClasses}`}
            style={{
              visibility: errors.confirmedNewPassword ? 'visible' : 'hidden',
            }}
          >
            {errors.confirmedNewPassword?.message ?? 'none'}
          </span>
        )}
      </div>
      <div className='flex flex-col'>
        <span className='text-tiny invisible'>none</span>
        <button
          type='submit'
          className='w-[280px] btn btn-sm self-center'
          disabled={isSubmitting}
        >
          {isSubmitting ? (
            <span className='loading loading-infinity'></span>
          ) : (
            t('button-text')
          )}
        </button>
      </div>
      {alertProps && <Alert {...alertProps} />}
    </form>
  );
};

export default ChangePasswordForm;
