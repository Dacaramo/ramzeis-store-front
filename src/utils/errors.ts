import { ComponentProps, Dispatch, SetStateAction } from 'react';
import Alert from '../components/Alert/Alert';
import { useTranslations } from 'next-intl';
import { AxiosError } from 'axios';

export const displayError = (
  error: Error | AxiosError,
  tFunc: ReturnType<typeof useTranslations>,
  tNamespace: string,
  alertDispatcher:
    | Dispatch<SetStateAction<ComponentProps<typeof Alert> | undefined>>
    | ((props?: ComponentProps<typeof Alert>) => void)
) => {
  const e =
    error instanceof AxiosError
      ? { name: error.response?.data?.name ?? 'UnknownException' }
      : error;

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
