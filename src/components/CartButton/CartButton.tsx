'use client';

import { useStore } from '@/src/zustand/store';
import { FC } from 'react';
import CartIcon from '../icons/CartIcon';

interface Props {
  containerClasses?: string;
}

const CartButton: FC<Props> = ({ containerClasses }) => {
  const [cartDetails] = useStore((state) => {
    return [state.cartDetails];
  });

  const count = Object.keys(cartDetails).length;

  return (
    <button
      type='button'
      className={`indicator btn btn-square btn-sm border-2 border-secondary hover:bg-secondary hover:border-secondary text-secondary hover:text-base-300 ${containerClasses}`}
    >
      <CartIcon className='text-xl' />
      <span className='indicator-item indicator-bottom badge badge-secondary p-[4px]'>
        {count}
      </span>
    </button>
  );
};

export default CartButton;
