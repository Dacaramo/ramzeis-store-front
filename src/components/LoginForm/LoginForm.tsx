'use client';

import { CSSProperties, FC } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import useTheme from '@/src/hooks/useTheme';
import { valibotResolver } from '@hookform/resolvers/valibot';
import { LoginFormData, loginFormDataSchema } from '@/src/model/otherSchemas';
import { colors } from '@/src/constants/colors';
import { errorSpanClasses, inputClasses } from '@/src/constants/classes';

interface Props {
  translations: {
    'email-input': {
      label: string;
      placeholder: string;
      'error-text': string;
    };
    'password-input': {
      label: string;
      placeholder: string;
      'error-text': string;
    };
    'login-button-text': string;
  };
}

const LoginForm: FC<Props> = ({ translations: t }) => {
  const theme = useTheme([]);
  const loginForm = useForm<LoginFormData>({
    resolver: valibotResolver(loginFormDataSchema),
  });

  const inputStyles: CSSProperties = {
    borderColor: colors[theme].error,
  };

  const handleLoginFormSubmit: SubmitHandler<LoginFormData> = (
    data: LoginFormData
  ) => {
    /**
     * TODO
     */
  };

  return (
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
          {t['email-input'].label}
        </label>
        <input
          {...loginForm.register('email')}
          id='login-email-input'
          style={loginForm.formState.errors.email ? inputStyles : {}}
          className={`${inputClasses}`}
          placeholder={t['email-input'].placeholder}
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
          {t['password-input'].label}
        </label>
        <input
          {...loginForm.register('password')}
          id='login-password-input'
          type='password'
          style={loginForm.formState.errors.password ? inputStyles : {}}
          className={`${inputClasses}`}
          placeholder={t['password-input'].placeholder}
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
      >
        {t['login-button-text']}
      </button>
    </form>
  );
};

export default LoginForm;
