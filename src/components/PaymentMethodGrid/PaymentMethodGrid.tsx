'use client';

import { Elements } from '@stripe/react-stripe-js';
import { PaymentMethod, loadStripe } from '@stripe/stripe-js';
import { ComponentProps, FC, useEffect, useState } from 'react';
import { useQueryClient } from '@tanstack/react-query';
import { gapForBetweenSectionsClasses } from '@/src/constants/classes';
import { useInfiniteQuery, useMutation } from '@tanstack/react-query';
import {
  detachPaymentMethod,
  getPaymentMethodsPerBuyer,
  getStripePublishableKey,
} from '@/src/clients/axiosClient';
import { doubleEncodeEsk } from '@/src/utils/encodeEsk';
import { useStore } from '@/src/zustand/store';
import {
  Address,
  AddressFilterValues,
  AddressPatch,
  addressPatchSchema,
  addressSchema,
} from '@/src/model/Address';
import { useTranslations } from 'next-intl';
import ReusableCard from '../ReusableCard/ReusableCard';
import Modal from '../Modal/Modal';
import PlusIcon from '../icons/PlusIcon';
import { valibotResolver } from '@hookform/resolvers/valibot';
import { SubmitHandler, useForm } from 'react-hook-form';
import { omit } from 'valibot';
import { displayError } from '@/src/utils/errors';
import Alert from '../Alert/Alert';
import TrashCanIcon from '../icons/TrashCanIcon';
import EditIcon from '../icons/EditIcon';
import { AxiosError } from 'axios';
import UpdateAddressForm from '../UpdateAddressForm/UpdateAddressForm';
import { Buyer } from '@/src/model/Buyer';
import { Stripe } from '@stripe/stripe-js';
import CreatePaymentMethodForm from '../CreatePaymentMethodForm/CreatePaymentMethodForm';
import Image from 'next/image';

type PaymentMethodModal =
  | 'create-payment-method-modal'
  | 'update-payment-method-modal'
  | 'delete-payment-method-modal';

type CardBrand =
  | 'amex'
  | 'diners'
  | 'discover'
  | 'eftpos_au'
  | 'jcb'
  | 'mastercard'
  | 'unionpay'
  | 'visa'
  | 'unknown';

interface Props {}

const PaymentMethodGrid: FC<Props> = ({}) => {
  const [alertProps, setAlertProps] = useState<
    ComponentProps<typeof Alert> | undefined
  >(undefined);
  const [isPaymentMethodDeletionGoing, setIsPaymentMethodDeletionGoing] =
    useState<boolean>(false);
  const [currentPaymentMethodId, setCurrentPaymentMethodId] = useState<
    string | undefined
  >(undefined);
  const [stripeObj, setStripeObj] = useState<Stripe | null>(null);

  const t = useTranslations();
  const [user, setGlobalAlertProps] = useStore((state) => {
    return [state.user, state.setGlobalAlertProps];
  });
  const createAddressForm = useForm<Omit<Address, 'pk' | 'sk'>>({
    resolver: valibotResolver(omit(addressSchema, ['pk', 'sk'])),
  });
  const updateAddressForm = useForm<AddressPatch>({
    resolver: valibotResolver(addressPatchSchema),
  });

  const [paymentMethodFilterValues, setPaymentMethodFilterValues] = useState<
    Omit<AddressFilterValues, 'encodedExclusiveStartKey'>
  >({
    limit: 5,
  });
  const [doubleEncodedEsk, setDoubleEncodedEsk] = useState<string | undefined>(
    undefined
  );

  const queryClient = useQueryClient();
  const result = useInfiniteQuery({
    queryKey: ['payment-methods', paymentMethodFilterValues],
    queryFn: async () => {
      const listResponse = await getPaymentMethodsPerBuyer(
        user.data!.stripeCustomerId,
        {
          ...paymentMethodFilterValues,
          encodedExclusiveStartKey: doubleEncodedEsk,
        }
      );
      if (listResponse.lastEvaluatedKey) {
        setDoubleEncodedEsk(doubleEncodeEsk(listResponse.lastEvaluatedKey));
      }
      return listResponse;
    },
    initialPageParam: 0,
    getNextPageParam: (lastPage, _pages, lastPageParam) => {
      if (!lastPage.lastEvaluatedKey) {
        return null;
      } else {
        return lastPageParam + 1;
      }
    },
  });
  const { mutateAsync: deletePaymentMethodMutate } = useMutation({
    mutationKey: ['payment-method-deletion'],
    mutationFn: async (stripePaymentMethodId: string) => {
      await detachPaymentMethod(stripePaymentMethodId);

      await queryClient.invalidateQueries({
        queryKey: ['payment-methods'],
      });
    },
    onSuccess: async () => {
      closeModal('delete-payment-method-modal');
      setGlobalAlertProps({
        type: 'alert-success',
        content: t('alert.payment-method-deletion-success-text'),
      });
      setIsPaymentMethodDeletionGoing(false);
    },
  });
  const { mutateAsync: createPaymentMethodMutate } = useMutation({
    mutationKey: ['payment-method-creation'],
    mutationFn: async () => {
      await queryClient.invalidateQueries({
        queryKey: ['payment-methods'],
      });
    },
    onSuccess: async () => {
      closeModal('create-payment-method-modal');
      setGlobalAlertProps({
        type: 'alert-success',
        content: t('alert.payment-method-creation-success-text'),
      });
    },
  });

  const paymentMethods =
    result.data?.pages.reduce((acc: Array<PaymentMethod>, current) => {
      return [...acc, ...current.items] as Array<PaymentMethod>;
    }, []) ?? [];

  const openModal = (
    modalId: PaymentMethodModal,
    paymentMethod?: PaymentMethod
  ) => {
    setCurrentPaymentMethodId(paymentMethod?.id);

    (
      document.getElementById(modalId) as
        | (HTMLElement & { showModal: () => void })
        | null
    )?.showModal();
  };

  const closeModal = (modalId: PaymentMethodModal) => {
    setCurrentPaymentMethodId(undefined);
    (
      document.getElementById(modalId) as
        | (HTMLElement & { close: () => void })
        | null
    )?.close();
  };

  const handleCreatePaymentMethodFormSuccessfulSubmit = async () => {
    try {
      await createPaymentMethodMutate();
    } catch (error) {
      const e = error as Error;
      displayError(e, t, 'alert.exceptions', setAlertProps);
    }
  };

  const handleClickOnDeletePaymentMethod = async () => {
    try {
      setIsPaymentMethodDeletionGoing(true);
      await deletePaymentMethodMutate(currentPaymentMethodId!);
    } catch (error) {
      const e = error as AxiosError;
      displayError(e, t, 'alert.exceptions', setAlertProps);
      setIsPaymentMethodDeletionGoing(false);
    }
  };

  useEffect(() => {
    const getStripePK = async () => {
      const publishableKey = await getStripePublishableKey();
      setStripeObj(await loadStripe(publishableKey));
    };
    getStripePK();
  }, []);

  return (
    <>
      <div className={`flex flex-col ${gapForBetweenSectionsClasses}`}>
        <div
          className={`flex sm:flex-row flex-col sm:justify-between items-center gap-2`}
        >
          <h1 className=''>{t('title-text')}</h1>
          <button
            className='btn btn-sm btn-secondary'
            onClick={() => openModal('create-payment-method-modal')}
          >
            {t('create-payment-method-button-text')}
            <PlusIcon />
          </button>
        </div>
        <p className={`text-tiny sm:text-start text-center`}>
          {t('description-text')}
        </p>
        <ul
          className={`grid grid-cols-[repeat(auto-fill,minmax(280px,1fr))] sm:grid-cols-[repeat(auto-fill,minmax(300px,1fr))] ${gapForBetweenSectionsClasses} mb-[25px]`}
        >
          {result.isLoading &&
            [...new Array(5)].map((_, i) => {
              return (
                <li
                  key={i}
                  className='skeleton h-[200px] w-[280px]'
                />
              );
            })}
          {result.isFetched && paymentMethods.length === 0 && (
            <ReusableCard>
              <p className='text-center'>{t('no-payment-methods-p-text')}</p>
              <button
                className='btn btn-sm btn-secondary'
                onClick={() => openModal('create-payment-method-modal')}
              >
                {t('create-payment-method-button-text')}
                <PlusIcon />
              </button>
            </ReusableCard>
          )}
          {result.isFetched &&
            paymentMethods.length > 0 &&
            paymentMethods.map((paymentMethod) => {
              const cardBrandImage =
                !paymentMethod.card?.brand ||
                paymentMethod.card.brand === 'unknown'
                  ? undefined
                  : `/${paymentMethod.card?.brand}.png`;
              return (
                <ReusableCard key={paymentMethod.id}>
                  <div className='flex flex-row items-center gap-2'>
                    {cardBrandImage && (
                      <Image
                        className='w-[45px] self-end'
                        src={cardBrandImage}
                        alt='ca'
                        quality={100}
                        width={75}
                        height={75}
                        priority
                      />
                    )}
                    <span>
                      <strong>
                        {`${
                          (paymentMethod.card?.brand ?? 'unknown')
                            .charAt(0)
                            .toUpperCase() +
                          (paymentMethod.card?.brand ?? 'unknown').slice(1)
                        } ${paymentMethod.card?.funding} `}
                      </strong>
                      {t('card-details-bridge-span-text')}
                      <strong>{` ${paymentMethod.card?.last4}`}</strong>
                    </span>
                  </div>
                  <span>
                    {t('card-expiration-span-text')}
                    <em>{`${paymentMethod.card?.exp_month}/${paymentMethod.card?.exp_year}`}</em>
                  </span>
                  <span>
                    {t('payment-method-creation-date-span-text')}
                    <em>
                      {new Date(paymentMethod.created * 1000).toLocaleString()}
                    </em>
                  </span>
                  <button
                    type='button'
                    className={`absolute bottom-0 right-0 btn btn-sm btn-error btn-outline rounded-none rounded-br rounded-tl border-b-0 border-r-0 no-animation`}
                    onClick={() =>
                      openModal('delete-payment-method-modal', paymentMethod)
                    }
                  >
                    <TrashCanIcon fontSize={18} />
                  </button>
                </ReusableCard>
              );
            })}
        </ul>
      </div>
      <Modal id={'create-payment-method-modal'}>
        <div className='flex flex-col gap-6'>
          <h2 className='font-bold'>
            {t('create-payment-method-modal-title-text')}
          </h2>
          {stripeObj && (
            <Elements stripe={stripeObj}>
              <CreatePaymentMethodForm
                onSuccessfulSubmit={
                  handleCreatePaymentMethodFormSuccessfulSubmit
                }
              />
            </Elements>
          )}
        </div>
      </Modal>
      <Modal id={'delete-payment-method-modal'}>
        <div className='flex flex-col gap-6'>
          <h2 className='font-bold'>
            {t('delete-payment-method-modal-title-text')}
          </h2>
          <p>{t('delete-payment-method-modal-description-text')}</p>
          <button
            type='button'
            className='btn btn-sm btn-error'
            disabled={isPaymentMethodDeletionGoing}
            onClick={() => handleClickOnDeletePaymentMethod()}
          >
            {isPaymentMethodDeletionGoing ? (
              <span className='loading loading-infinity'></span>
            ) : (
              t('delete-payment-method-modal-confirm-button-text')
            )}
          </button>
          {alertProps && <Alert {...alertProps} />}
        </div>
      </Modal>
    </>
  );
};

export default PaymentMethodGrid;
