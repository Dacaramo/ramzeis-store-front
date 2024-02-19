'use client';

import {
  CSSProperties,
  ComponentProps,
  FC,
  useState,
  ChangeEvent as ReactChangeEvent,
} from 'react';
import { SubmitHandler, UseFormReturn, useForm } from 'react-hook-form';
import useTheme from '@/src/hooks/useTheme';
import { valibotResolver } from '@hookform/resolvers/valibot';
import { LoginFormData, loginFormDataSchema } from '@/src/model/otherSchemas';
import { colors } from '@/src/constants/colors';
import { errorSpanClasses, inputClasses } from '@/src/constants/classes';
import { useTranslations } from 'next-intl';
import Alert from '../Alert/Alert';
import { signOut as amplifySignOut } from 'aws-amplify/auth';
import useAuth from '@/src/hooks/useAuth';

interface Props {
  form: UseFormReturn<LoginFormData>;
  alertProps?: ComponentProps<typeof Alert>;
  onSubmit: SubmitHandler<LoginFormData>;
}

const LoginForm: FC<Props> = ({ form, alertProps, onSubmit: handleSubmit }) => {
  const [step, setStep] = useState<'submit-pending' | 'confirmation-pending'>(
    'submit-pending'
  );
  const [confirmationCode, setConfirmationCode] = useState<string>('');
  const [isConfirmationLoading, setIsConfirmationLoading] =
    useState<boolean>(false);

  const t = useTranslations('unauthenticated');
  const theme = useTheme([]);
  // const loginForm = useForm<LoginFormData>({
  //   resolver: valibotResolver(loginFormDataSchema),
  // });
  const { signIn, confirmAccount } = useAuth();

  const inputStyles: CSSProperties = {
    borderColor: colors[theme].error,
  };

  const handleChangeOnConfirmationCodeInput = async (
    e: ReactChangeEvent<HTMLInputElement>
  ) => {
    setConfirmationCode(e.target.value);
  };

  // const handleClickOnConfirmCodeButton = async (data: LoginFormData) => {
  //   try {
  //     setIsConfirmationLoading(true);
  //     await confirmAccount(data.email, confirmationCode);
  //   } catch (error) {
  //     const e = error as Error;

  //     await amplifySignOut();

  //     setAlertProps({
  //       type: 'alert-error',
  //       text: t(`alert.exceptions.${e.name}`).startsWith(
  //         'unauthenticated.alert.exceptions'
  //       )
  //         ? t('alert.exceptions.UnknownException', {
  //             exception: e.name,
  //           })
  //         : t(`alert.exceptions.${e.name}`),
  //     });
  //     setIsConfirmationLoading(false);
  //   }
  // };

  return (
    <>
      {step === 'submit-pending' && (
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
      )}
      {alertProps && <Alert {...alertProps} />}
      {/* {step === 'confirmation-pending' && (
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
      )} */}
    </>
  );
};

export default LoginForm;
