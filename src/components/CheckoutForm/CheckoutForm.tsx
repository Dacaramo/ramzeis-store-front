'use client';

import {
  CardElement,
  Elements,
  useElements,
  useStripe,
} from '@stripe/react-stripe-js';
import { FormEvent as ReactFormEvent, FC, useState } from 'react';

interface Props {}

import React from 'react';

const CheckoutForm: FC<Props> = ({}) => {
  const [error, setError] = useState<string>('');

  const stripe = useStripe();
  const elements = useElements();

  const handleSubmit = async (e: ReactFormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const paymentMethodResult = await stripe?.createPaymentMethod({
      type: 'card',
      card: elements?.getElement(CardElement)!,
    });

    if (paymentMethodResult) {
      if (paymentMethodResult.error) {
        setError(paymentMethodResult.error.message ?? '');
        return;
      } else if (paymentMethodResult.paymentMethod) {
        console.log(paymentMethodResult.paymentMethod);
      }
    }
  };

  return (
    <form
      className='card w-96 bg-base-100 shadow-xl'
      onSubmit={handleSubmit}
    >
      <div className='w-full card-body items-center text-center'>
        <h2 className='card-title'>Checkout</h2>
        <p>If a dog chews shoes whose shoes does he choose?</p>
        <CardElement className='w-full font-jost' />
        <div className='card-actions'>
          <button type='submit'>Submit</button>
        </div>
      </div>
    </form>
  );
};

export default CheckoutForm;
