'use client';

import { FC } from 'react';

interface Props {
  params: {
    locale: string;
  };
}

const CheckoutPage: FC<Props> = ({ params: { locale } }) => {
  return <div>Checkout Page</div>;
};

export default CheckoutPage;
