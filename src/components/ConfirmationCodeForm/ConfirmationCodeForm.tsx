'use client';

import {
  FC,
  useState,
  ChangeEvent as ReactChangeEvent,
  ComponentProps,
} from 'react';
import Alert from '../Alert/Alert';
import { useTranslations } from 'next-intl';
import { signOut as amplifySignOut } from 'aws-amplify/auth';
import useAuth from '@/src/hooks/useAuth';

interface Props {
  emailToConfirm: string;
}

const ConfirmationCodeForm: FC<Props> = ({ emailToConfirm }) => {
  const [confirmationCode, setConfirmationCode] = useState<string>('');
  const [isConfirmationLoading, setIsConfirmationLoading] =
    useState<boolean>(false);
  const [alertProps, setAlertProps] = useState<
    ComponentProps<typeof Alert> | undefined
  >(undefined);

  const t = useTranslations();
  const { confirmAccount } = useAuth();

  const handleChangeOnConfirmationCodeInput = async (
    e: ReactChangeEvent<HTMLInputElement>
  ) => {
    setConfirmationCode(e.target.value);
  };

  const handleClickOnConfirmCodeButton = async () => {
    try {
      setIsConfirmationLoading(true);
      await confirmAccount(emailToConfirm, confirmationCode);
    } catch (error) {
      const e = error as Error;

      await amplifySignOut();

      setAlertProps({
        type: 'alert-error',
        text: t(`unauthenticated.alert.exceptions.${e.name}`).startsWith(
          'unauthenticated.alert.exceptions'
        )
          ? t('unauthenticated.alert.exceptions.UnknownException', {
              exception: e.name,
            })
          : t(`unauthenticated.alert.exceptions.${e.name}`),
      });
      setIsConfirmationLoading(false);
    }
  };

  return (
    <>
      <Alert
        type='alert-warning'
        text={
          <>
            {t.rich('unauthenticated.alert.confirm-account-text', {
              strong: (value) => <strong>{value}</strong>,
            })}
            {' ' + emailToConfirm}
          </>
        }
      />
      <input
        type='text'
        placeholder={t('unauthenticated.confirmation-code-input.placeholder')}
        className={'w-full input input-sm bg-base-200 outline-none'}
        value={confirmationCode}
        onChange={handleChangeOnConfirmationCodeInput}
      />
      {alertProps && <Alert {...alertProps} />}
      <button
        type='button'
        className='w-full btn btn-sm font-normal bg-base-200'
        onClick={() => handleClickOnConfirmCodeButton()}
        disabled={isConfirmationLoading}
      >
        {isConfirmationLoading ? (
          <span className='loading loading-infinity'></span>
        ) : (
          t('unauthenticated.alert.confirm-button')
        )}
      </button>
    </>
  );
};

export default ConfirmationCodeForm;
