import { borderRadiusClasses } from '@/src/constants/classes';
import { FC, ReactNode } from 'react';

interface Props {
  children: ReactNode;
}

const ReusableCard: FC<Props> = ({ children }) => {
  return (
    <li
      className={`${borderRadiusClasses} relative p-10 flex flex-col gap-2 shadow-classic-sm text-tiny border border-secondary`}
    >
      {children}
    </li>
  );
};

export default ReusableCard;
