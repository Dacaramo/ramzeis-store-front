'use client';

import CheckoutForm from '@/src/components/CheckoutForm/CheckoutForm';
import { Elements } from '@stripe/react-stripe-js';
import { FC } from 'react';
import { loadStripe } from '@stripe/stripe-js';

const stripePromise = loadStripe(
  'pk_test_51OUb1WKz3BRQVAxdITnxNlr4tjVPPbwRTYoeDNUoRYn0dvxKXgVeqWFNxogwfn96zIJjntQ2NFG86gIb9YHmlSnW00KM1OKxF4'
);

interface Props {
  params: {
    locale: string;
  };
}

const CheckoutPage: FC<Props> = ({ params: { locale } }) => {
  return (
    <Elements stripe={stripePromise}>
      <CheckoutForm />
    </Elements>
  );
};

export default CheckoutPage;
