import { ComponentProps, Dispatch, SetStateAction } from 'react';
import Alert from '../components/Alert/Alert';
import { useTranslations } from 'next-intl';
import { AxiosError } from 'axios';
import { StripeError } from '@stripe/stripe-js';

export const displayError = (
  error: Error | AxiosError | StripeError,
  tFunc: ReturnType<typeof useTranslations>,
  tNamespace: string,
  alertDispatcher:
    | Dispatch<SetStateAction<ComponentProps<typeof Alert> | undefined>>
    | ((props?: ComponentProps<typeof Alert>) => void)
) => {
  let e: Error;

  if (error instanceof AxiosError) {
    e = {
      name: error.response?.data?.name ?? 'UnknownException',
      message: error.message ?? '',
    };
  } else if ('type' in error) {
    const stripeError = error as StripeError;
    if (stripeError.type === 'card_error') {
      e = {
        name: stripeError?.decline_code ?? 'UnknownException',
        message: stripeError.message ?? '',
      };
    } else {
      e = {
        name: stripeError?.code ?? 'UnknownException',
        message: stripeError.message ?? '',
      };
    }
  } else {
    e = error;
  }

  alertDispatcher({
    type: 'alert-error',
    content: tFunc(`${tNamespace}.${e.name}` as never).startsWith(
      `${tNamespace}`
    )
      ? tFunc(`${tNamespace}.UnknownException` as never, {
          exception: e.name,
        })
      : tFunc(`${tNamespace}.${e.name}` as never),
  });
};
