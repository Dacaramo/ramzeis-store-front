'use client';

import {
  gapForBetweenSectionsClasses,
  xRootPaddingClasses,
} from '@/src/constants/classes';
import { useStore } from '@/src/zustand/store';
import { FC, useEffect } from 'react';

interface Props {
  error: Error & { digest?: string };
  reset: () => void;
}

const error: FC<Props> = ({ error, reset }) => {
  const setGlobalAlertProps = useStore((state) => {
    return state.setGlobalAlertProps;
  });

  useEffect(() => {
    setGlobalAlertProps({
      type: 'alert-error',
      content: error.message,
      hasAction: true,
      actionButtonText: 'Try again',
      onActionButtonClick: reset,
    });
  }, [error]);

  return (
    <div
      className={`min-h-[calc(100vh-82.5px)] flex justify-center items-center ${xRootPaddingClasses} ${gapForBetweenSectionsClasses} text-[100px] text-base-300`}
    >
      Oooops!
    </div>
  );
};

export default error;
