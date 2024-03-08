'use client';

import 'react-international-phone/style.css';

import {
  ComponentProps,
  FC,
  FormEvent as ReactFormEvent,
  useState,
} from 'react';
import { useTranslations } from 'next-intl';
import useTheme from '@/src/hooks/useTheme';
import { colors } from '@/src/constants/colors';
import {
  AffirmMessageElement,
  AfterpayClearpayMessageElement,
  AuBankAccountElement,
  CardElement,
  EpsBankElement,
  FpxBankElement,
  IbanElement,
  IdealBankElement,
  P24BankElement,
  useElements,
  useStripe,
} from '@stripe/react-stripe-js';
import {
  StripeCardElement,
  StripeElementStyle,
  StripeElements,
  StripeError,
} from '@stripe/stripe-js';
import { displayError } from '@/src/utils/errors';
import Alert from '../Alert/Alert';
import { useStore } from '@/src/zustand/store';
import { createSetupIntent } from '@/src/clients/axiosClient';

type PaymentMethodType =
  | 'card'
  | 'iban'
  | 'epsBank'
  | 'fpxBank'
  | 'p24Bank'
  | 'idealBank'
  | 'affirmMessage'
  | 'auBankAccount'
  | 'afterpayClearpayMessage';

interface Props {
  onSuccessfulSubmit: () => void;
}

const CreatePaymentMethodForm: FC<Props> = ({
  onSuccessfulSubmit: handleSuccessfulSubmit,
}) => {
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [paymentMethodType, setPaymentMethodType] =
    useState<PaymentMethodType>('card');
  const [alertProps, setAlertProps] = useState<
    ComponentProps<typeof Alert> | undefined
  >(undefined);

  const t = useTranslations();
  const theme = useTheme([]);
  const [user, setGlobalAlertProps] = useStore((state) => {
    return [state.user, state.setGlobalAlertProps];
  });
  const stripeObj = useStripe();
  const elements = useElements();

  const stripeElementStyles: StripeElementStyle = {
    base: {
      iconColor: colors[theme].secondary,
      color: colors[theme].secondary,
      fontWeight: '400',
      fontFamily: 'Roboto, Open Sans, Segoe UI, sans-serif',
      fontSize: '15px',
      fontSmoothing: 'antialiased',
      ':-webkit-autofill': {
        color: colors[theme].primary,
      },
      '::placeholder': {
        color: colors[theme]['neutral-content'],
      },
    },
    invalid: {
      iconColor: colors[theme].error,
      color: colors[theme].error,
    },
  };

  const handleSubmit = async (e: ReactFormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      if (!elements || !stripeObj) return;

      const paymentMethodCreationResult = await stripeObj.createPaymentMethod({
        type: 'card',
        card: elements.getElement('card') as StripeCardElement,
      });

      if (paymentMethodCreationResult && paymentMethodCreationResult.error) {
        displayError(
          paymentMethodCreationResult.error,
          t,
          'alert.exceptions',
          setAlertProps
        );
      } else if (
        paymentMethodCreationResult &&
        paymentMethodCreationResult.paymentMethod
      ) {
        const clientSecret = await createSetupIntent(
          user.data!.stripeCustomerId,
          paymentMethodCreationResult.paymentMethod.id
        );

        const paymentMethodConfirmationResult =
          await stripeObj.confirmCardSetup(clientSecret);

        if (
          paymentMethodConfirmationResult &&
          paymentMethodConfirmationResult.error
        ) {
          displayError(
            paymentMethodConfirmationResult.error,
            t,
            'alert.exceptions',
            setAlertProps
          );
        } else if (
          paymentMethodConfirmationResult &&
          paymentMethodConfirmationResult.setupIntent
        ) {
          setGlobalAlertProps({
            type: 'alert-success',
            content: t('alert.payment-method-creation-success-text'),
          });
          elements.getElement('card')?.clear();
          handleSuccessfulSubmit();
        }
      }
    } catch (error) {
      const e = error as StripeError;
      displayError(e, t, 'alert.exceptions', setAlertProps);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <form
        className='flex flex-col gap-4'
        onSubmit={handleSubmit}
      >
        {paymentMethodType === 'card' && (
          <CardElement
            options={{
              style: stripeElementStyles,
            }}
          />
        )}
        {paymentMethodType === 'iban' && <IbanElement />}
        {paymentMethodType === 'epsBank' && <EpsBankElement />}
        {paymentMethodType === 'fpxBank' && <FpxBankElement />}
        {paymentMethodType === 'p24Bank' && <P24BankElement />}
        {paymentMethodType === 'idealBank' && <IdealBankElement />}
        {paymentMethodType === 'affirmMessage' && <AffirmMessageElement />}
        {paymentMethodType === 'auBankAccount' && <AuBankAccountElement />}
        {paymentMethodType === 'afterpayClearpayMessage' && (
          <AfterpayClearpayMessageElement />
        )}
        <button
          type='submit'
          className='btn btn-sm btn-secondary'
          disabled={isSubmitting}
        >
          {isSubmitting ? (
            <span className='loading loading-infinity'></span>
          ) : (
            t('create-payment-method-modal-confirm-button-text')
          )}
        </button>
      </form>
      {alertProps && <Alert {...alertProps} />}
    </>
  );
};

export default CreatePaymentMethodForm;
