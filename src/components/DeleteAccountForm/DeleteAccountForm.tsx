'use client';

import {
  ComponentProps,
  FC,
  useState,
  FormEvent as ReactFormEvent,
  ChangeEvent as ReactChangeEvent,
  ClipboardEvent as ReactClipboardEvent,
} from 'react';
import Alert from '../Alert/Alert';
import { useTranslations } from 'next-intl';
import { inputClasses } from '@/src/constants/classes';
import { deleteUser } from 'aws-amplify/auth';
import { CustomError } from '@/src/model/otherSchemas';
import { deleteBuyer } from '@/src/clients/axiosClient';
import { useStore } from '@/src/zustand/store';
import useLocalStorage from '@/src/hooks/useLocalStorage';
import { useRouter } from 'next/navigation';

interface Props {}

const DeleteAccountForm: FC<Props> = ({}) => {
  const [confirmationText, setConfirmationText] = useState<string>('');
  const [isDeletionLoading, setIsDeletionLoading] = useState<boolean>(false);
  const [alertProps, setAlertProps] = useState<
    ComponentProps<typeof Alert> | undefined
  >(undefined);

  const t = useTranslations();
  const [user, setUser] = useStore((state) => {
    return [state.user, state.setUser];
  });
  const { removeUserFromLocalStorage } = useLocalStorage();
  const router = useRouter();

  const isButtonDisabled = confirmationText !== 'I want to delete my account';

  const handleChangeOnConfirmationText = (
    e: ReactChangeEvent<HTMLInputElement>
  ) => {
    setConfirmationText(e.target.value);
  };

  const handleSubmit = async (e: ReactFormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsDeletionLoading(true);
    try {
      if (confirmationText !== 'I want to delete my account') {
        throw new CustomError('InvalidTextException');
      }
      await deleteUser();
      user.data && (await deleteBuyer(user.data.email));
      removeUserFromLocalStorage();
      setUser({
        isAuthenticated: false,
      });
      setIsDeletionLoading(false);
      router.push('/');
    } catch (error) {
      const e = error as Error;
      setAlertProps({
        type: 'alert-error',
        text: t(`alert.exceptions.${e.name}`).startsWith('alert.exceptions')
          ? t('alert.exceptions.UnknownException', {
              exception: e.name,
            })
          : t(`alert.exceptions.${e.name}`),
      });
    }
  };

  const handlePasteOnInput = (e: ReactClipboardEvent) => {
    e.preventDefault();
  };

  return (
    <form
      className='flex flex-row gap-4'
      onSubmit={handleSubmit}
    >
      {alertProps && <Alert {...alertProps} />}
      <input
        type='text'
        className={`${inputClasses} max-w-[280px] ml-auto`}
        placeholder={t('input-placeholder')}
        onChange={handleChangeOnConfirmationText}
        onPaste={handlePasteOnInput}
      />
      <button
        type='submit'
        className='w-[280px] btn btn-sm btn-error'
        disabled={isButtonDisabled || isDeletionLoading}
      >
        {isDeletionLoading ? (
          <span className='loading loading-infinity'></span>
        ) : (
          t('button-text')
        )}
      </button>
    </form>
  );
};

export default DeleteAccountForm;
