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
import { SubmitHandler, UseFormReturn, useForm } from 'react-hook-form';
import ControlledPhoneInput from '../ControlledPhoneInput/ControlledPhoneInput';
import { signOut as amplifySignOut } from 'aws-amplify/auth';
import Alert from '../Alert/Alert';
import { useTranslations } from 'next-intl';
import Link from 'next/link';
import GoogleIcon from '../icons/GoogleIcon';
import useAuth from '@/src/hooks/useAuth';

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
  const [step, setStep] = useState<'submit-pending' | 'confirmation-pending'>(
    'submit-pending'
  );
  const [confirmationCode, setConfirmationCode] = useState<string>('');
  const [isConfirmationLoading, setIsConfirmationLoading] =
    useState<boolean>(false);

  const t = useTranslations('unauthenticated');
  const theme = useTheme([]);
  // const signUpForm = useForm<SignUpFormData>({
  //   defaultValues: {
  //     areTermsAndConditionsAccepted: false,
  //   },
  //   resolver: valibotResolver(signUpFormDataSchema),
  // });
  const { signUp, confirmAccount } = useAuth();

  const inputStyles: CSSProperties = {
    borderColor: colors[theme].error,
  };

  const handleChangeOnConfirmationCodeInput = async (
    e: ReactChangeEvent<HTMLInputElement>
  ) => {
    setConfirmationCode(e.target.value);
  };

  // const handleClickOnConfirmCodeButton = async (
  //   signUpFormData: SignUpFormData
  // ) => {
  //   try {
  //     setIsConfirmationLoading(true);
  //     await confirmAccount(signUpFormData.email, confirmationCode);
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

  // const handleSignUpFormSubmit: SubmitHandler<SignUpFormData> = async (
  //   data: SignUpFormData
  // ) => {
  //   try {
  //     await signUp(data.email, data.phone, data.password);

  //     setAlertProps({
  //       type: 'alert-warning',
  //       text: t.rich('alert.confirm-account-text', {
  //         email: data.email,
  //       }),
  //     });
  //     setStep('confirmation-pending');
  //   } catch (error) {
  //     const e = error as Error;

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
  //   }
  // };

  const handleClickOnCheckBox = () => {
    form.setValue(
      'areTermsAndConditionsAccepted',
      !form.getValues().areTermsAndConditionsAccepted
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
      )}
      {alertProps && <Alert {...alertProps} />}
      {/* {step === 'confirmation-pending' && (
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
      )} */}
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
