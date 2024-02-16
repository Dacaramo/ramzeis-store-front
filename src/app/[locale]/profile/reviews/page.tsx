import {
  xRootPaddingClasses,
  yRootProfilePageClasses,
} from '@/src/constants/classes';
import { FC } from 'react';

interface Props {
  params: {
    locale: string;
  };
}

const page: FC<Props> = ({ params: { locale } }) => {
  return (
    <div className={`${xRootPaddingClasses} ${yRootProfilePageClasses}`}>
      reviews
    </div>
  );
};

export default page;
