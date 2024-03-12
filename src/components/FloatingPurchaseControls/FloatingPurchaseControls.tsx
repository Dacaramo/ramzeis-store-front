'use client';

import useCart from '@/src/hooks/useCart';
import { Product } from '@/src/model/Product';
import { FC, useState } from 'react';
import PlusIcon from '../icons/PlusIcon';
import { useTranslations } from 'next-intl';
import CaretRightIcon from '../icons/CaretRightIcon';
import CaretLeftIcon from '../icons/CaretLeftIcon';
import { closeDaisyUIDropdown } from '@/src/utils/js';
import { fromCentsToDollars } from '@/src/utils/price';
import AddToCartIcon from '../icons/AddToCartIcon';
import { useStore } from '@/src/zustand/store';
import { displayError } from '@/src/utils/errors';

const MIN_QUANTITY = 1;
const MAX_QUANTITY = 5;

interface Props {
  product: Product;
}

const FloatingPurchaseControls: FC<Props> = ({ product }) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [quantity, setQuantity] = useState<number>(1);
  const [size, setSize] = useState<string>(
    product.availableSizes !== undefined && product.availableSizes.length >= 1
      ? product.availableSizes[0]
      : ''
  );

  const t = useTranslations('');
  const { add } = useCart();
  const [cartDetails, setGlobalAlertProps] = useStore((state) => {
    return [state.cartDetails, state.setGlobalAlertProps];
  });

  let isAddToCartDisabled = false;
  let addToCartButtonText = t('add-to-cart-button-text');
  if (cartDetails[product.pk]) {
    addToCartButtonText = t('already-in-cart-text');
    isAddToCartDisabled = true;
  }
  if (product.stock === 0) {
    addToCartButtonText = t('out-of-stock-text');
    isAddToCartDisabled = true;
  }

  const handleClickOnAddProductToCart = async () => {
    try {
      setIsLoading(true);
      await add(product.pk, {
        quantity,
        size: size || undefined,
      });
      setGlobalAlertProps({
        type: 'alert-success',
        content: t('alert.product-added-success-text'),
      });
    } catch (error) {
      const e = error as Error;
      displayError(e, t, 'alert.exceptions', setGlobalAlertProps);
    } finally {
      setIsLoading(false);
    }
  };

  const handleClickOnIncrement = () => {
    setQuantity((prevQuantity) => {
      if (prevQuantity < MAX_QUANTITY) {
        return prevQuantity + 1;
      }
      return prevQuantity;
    });
  };

  const handleClickOnDecrement = () => {
    setQuantity((prevQuantity) => {
      if (prevQuantity > MIN_QUANTITY) {
        return prevQuantity - 1;
      }
      return prevQuantity;
    });
  };

  const handleClickOnDropdownSize = (clickedSize: string) => {
    setSize(clickedSize);
    closeDaisyUIDropdown();
  };

  return (
    <div
      className={`fixed bottom-0 right-0 p-[20px] flex flex-row justify-center items-end gap-4 rounded-t-2xl sm:rounded-tl-2xl sm:rounded-tr-none shadow-classic-sm bg-base-100 sm:w-auto w-full`}
    >
      {product.availableSizes !== undefined && (
        <div className='flex flex-col items-center'>
          <label className='sm:text-mid text-tiny'>
            {t('size-label-text')}
          </label>
          <div className='dropdown dropdown-top'>
            <div
              tabIndex={0}
              role='button'
              className='btn btn-sm font-normal bg-base-200'
            >
              {size}
            </div>
            <ul
              tabIndex={0}
              className='dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-[75px]'
            >
              {product.availableSizes.map((size) => {
                return (
                  <li key={size}>
                    <a onClick={() => handleClickOnDropdownSize(size)}>
                      {size}
                    </a>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
      )}
      <div className='flex flex-col items-center'>
        <label
          htmlFor='quantity-input'
          className='sm:text-mid text-tiny'
        >
          {t('quantity-label-text')}
        </label>
        <div className='flex flex-row justify-center items-center'>
          <button
            type='button'
            className='text-secondary'
            onClick={handleClickOnDecrement}
          >
            <CaretLeftIcon />
          </button>
          <input
            id='quantity-input'
            type='text'
            className='input input-sm w-[50px] bg-base-200 outline-none text-center'
            value={quantity}
            readOnly
          />
          <button
            type='button'
            className='text-secondary'
            onClick={handleClickOnIncrement}
          >
            <CaretRightIcon />
          </button>
        </div>
      </div>
      <div className='flex flex-col items-end'>
        <span className='text-end font-bold sm:text-mid text-tiny'>{`USD $${fromCentsToDollars(
          product.price
        )}`}</span>
        <button
          className='w-full btn btn-sm btn-secondary'
          disabled={isAddToCartDisabled || isLoading}
          onClick={handleClickOnAddProductToCart}
        >
          {isLoading ? (
            <span className='loading loading-infinity' />
          ) : (
            <>
              <div className='hidden sm:flex flex-row gap-2'>
                <span>{addToCartButtonText}</span>
                <PlusIcon />
              </div>
              <div className='flex sm:hidden text-lg'>
                <AddToCartIcon />
              </div>
            </>
          )}
        </button>
      </div>
    </div>
  );
};

export default FloatingPurchaseControls;
