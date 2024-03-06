import {
  gapForBetweenSectionsClasses,
  xRootPaddingClasses,
} from '@/src/constants/classes';
import { useTranslations } from 'next-intl';
import { FC } from 'react';

interface Props {}

const loading: FC<Props> = () => {
  const t = useTranslations('root-layout-loading-component');

  return (
    <main
      className={`min-h-[calc(100vh-82.5px)] flex justify-center items-center ${xRootPaddingClasses} ${gapForBetweenSectionsClasses}`}
    >
      <div className='flex flex-col items-center justify-center gap-4'>
        <span className='loading loading-infinity' />
        <span>{t('title-text')}</span>
      </div>
    </main>
  );
};

export default loading;
