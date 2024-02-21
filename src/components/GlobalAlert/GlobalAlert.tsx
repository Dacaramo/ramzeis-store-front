'use client';

import { FC } from 'react';
import Alert from '../Alert/Alert';
import { useStore } from '@/src/zustand/store';
import { xRootPaddingClasses } from '@/src/constants/classes';
import { useTranslations } from 'next-intl';

interface Props {}

const GlobalAlert: FC<Props> = ({}) => {
  const t = useTranslations();
  const [globalAlertProps, setGlobalAlertProps] = useStore((state) => {
    return [state.globalAlertProps, state.setGlobalAlertProps];
  });

  return (
    <>
      {globalAlertProps && (
        <div
          className={`absolute left-0 top-[82.5px] z-[100] w-full ${xRootPaddingClasses}`}
        >
          <Alert
            {...globalAlertProps}
            isSkippable
            skipButtonText={t('skip-button-text')}
            setAlertProps={setGlobalAlertProps}
          />
        </div>
      )}
    </>
  );
};

export default GlobalAlert;
