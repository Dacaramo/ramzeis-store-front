'use client';

import { ComponentProps, FC, useState } from 'react';
import { useQueryClient } from '@tanstack/react-query';
import {
  borderRadiusClasses,
  gapForBetweenSectionsClasses,
} from '@/src/constants/classes';
import { useInfiniteQuery, useMutation } from '@tanstack/react-query';
import {
  createAddress,
  deleteAddress,
  getAddresses,
  updateAddress,
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
import { ListResponse } from '@/src/model/ListResponse';
import { useTranslations } from 'next-intl';
import ReusableCard from '../ReusableCard/ReusableCard';
import Modal from '../Modal/Modal';
import PlusIcon from '../icons/PlusIcon';
import CreateAddressForm from '../CreateAddressForm/CreateAddressForm';
import { valibotResolver } from '@hookform/resolvers/valibot';
import { SubmitHandler, useForm } from 'react-hook-form';
import { omit } from 'valibot';
import { displayError } from '@/src/utils/errors';
import Alert from '../Alert/Alert';
import TranslationsProvider from '../TranslationsProvider/TranslationsProvider';
import TrashCanIcon from '../icons/TrashCanIcon';
import EditIcon from '../icons/EditIcon';
import { AxiosError } from 'axios';
import UpdateAddressForm from '../UpdateAddressForm/UpdateAddressForm';
import { Buyer } from '@/src/model/Buyer';

const MAX_ADDRESSES = 5;

type AddressModal =
  | 'create-address-modal'
  | 'update-address-modal'
  | 'delete-address-modal';

interface Props {}

const AddressGrid: FC<Props> = ({}) => {
  const [alertProps, setAlertProps] = useState<
    ComponentProps<typeof Alert> | undefined
  >(undefined);
  const [isAddressDeletionGoing, setIsAddressDeletionGoing] =
    useState<boolean>(false);
  const [currentAddressId, setCurrentAddressId] = useState<
    Address['sk'] | undefined
  >(undefined);

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

  const [addressFilterValues, setAddressFilterValues] = useState<
    Omit<AddressFilterValues, 'encodedExclusiveStartKey'>
  >({
    limit: 5,
  });
  const [doubleEncodedEsk, setDoubleEncodedEsk] = useState<string | undefined>(
    undefined
  );

  const queryClient = useQueryClient();
  const result = useInfiniteQuery({
    queryKey: ['addresses', addressFilterValues],
    queryFn: async () => {
      const listResponse = await getAddresses(user.data!.email, {
        ...addressFilterValues,
        encodedExclusiveStartKey: doubleEncodedEsk,
      });
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
  const { mutateAsync: deleteAddressMutate } = useMutation({
    mutationKey: ['address-deletion'],
    mutationFn: async ({
      email,
      addressId,
    }: {
      email: Buyer['pk'];
      addressId: Address['sk'];
    }) => {
      await deleteAddress(email, addressId);

      setGlobalAlertProps({
        type: 'alert-success',
        content: t('alert.address-deletion-success-text'),
      });
      setIsAddressDeletionGoing(false);
      closeModal('delete-address-modal');
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: ['addresses'],
      });
    },
  });
  const { mutateAsync: updateAddressMutate } = useMutation({
    mutationKey: ['address-edition'],
    mutationFn: async ({
      email,
      addressId,
      patch,
    }: {
      email: Buyer['pk'];
      addressId: Address['sk'];
      patch: AddressPatch;
    }) => {
      await updateAddress(email, addressId!, patch);

      setGlobalAlertProps({
        type: 'alert-success',
        content: t('alert.address-edition-success-text'),
      });
      updateAddressForm.reset();
      closeModal('update-address-modal');
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: ['addresses'],
      });
    },
  });
  const { mutateAsync: createAddressMutate } = useMutation({
    mutationKey: ['address-creation'],
    mutationFn: async ({
      email,
      address,
    }: {
      email: Buyer['pk'];
      address: Omit<Address, 'pk' | 'sk'>;
    }) => {
      await createAddress(email, address);

      setGlobalAlertProps({
        type: 'alert-success',
        content: t('alert.address-creation-success-text'),
      });
      createAddressForm.reset();
      closeModal('create-address-modal');
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: ['addresses'],
      });
    },
  });

  const addresses =
    result.data?.pages.reduce((acc: Array<Address>, current) => {
      return [...acc, ...current.items] as Array<Address>;
    }, []) ?? [];

  const isAddressesLimitReached = addresses.length === MAX_ADDRESSES;

  const resetAllForms = () => {
    createAddressForm.reset();
    createAddressForm.clearErrors();
    updateAddressForm.reset();
    updateAddressForm.clearErrors();
  };

  const openModal = (modalId: AddressModal, address?: Address) => {
    setCurrentAddressId(address?.sk);
    resetAllForms();
    if (modalId === 'update-address-modal') {
      updateAddressForm.setValue('buyerPhoneNumber', address?.buyerPhoneNumber);
      updateAddressForm.setValue(
        'buyerRecipientName',
        address?.buyerRecipientName
      );
      updateAddressForm.setValue('buyerAddress', address?.buyerAddress);
      updateAddressForm.setValue('buyerZipCode', address?.buyerZipCode);
      updateAddressForm.setValue('buyerCity', address?.buyerCity);
      updateAddressForm.setValue(
        'buyerAdministrativeDivision',
        address?.buyerAdministrativeDivision
      );
      updateAddressForm.setValue('buyerCountry', address?.buyerCountry);
      updateAddressForm.setValue(
        'buyerDeliveryInstructions',
        address?.buyerDeliveryInstructions
      );
    }

    (
      document.getElementById(modalId) as
        | (HTMLElement & { showModal: () => void })
        | null
    )?.showModal();
  };

  const closeModal = (modalId: AddressModal) => {
    setCurrentAddressId(undefined);
    (
      document.getElementById(modalId) as
        | (HTMLElement & { close: () => void })
        | null
    )?.close();
  };

  const handleCreateAddressFormSubmit: SubmitHandler<
    Omit<Address, 'pk' | 'sk'>
  > = async (data: Omit<Address, 'pk' | 'sk'>) => {
    try {
      await createAddressMutate({
        email: user.data!.email,
        address: data,
      });
    } catch (error) {
      const e = error as Error;
      displayError(e, t, 'alert.exceptions', setAlertProps);
    }
  };

  const handleUpdateAddressFormSubmit: SubmitHandler<AddressPatch> = async (
    data: AddressPatch
  ) => {
    try {
      await updateAddressMutate({
        email: user.data!.email,
        addressId: currentAddressId!,
        patch: data,
      });
    } catch (error) {
      const e = error as Error;
      displayError(e, t, 'alert.exceptions', setAlertProps);
    }
  };

  const handleClickOnDeleteAddress = async () => {
    try {
      setIsAddressDeletionGoing(true);
      await deleteAddressMutate({
        email: user.data!.email,
        addressId: currentAddressId!,
      });
    } catch (error) {
      const e = error as AxiosError;
      displayError(e, t, 'alert.exceptions', setAlertProps);
      setIsAddressDeletionGoing(false);
    }
  };

  return (
    <>
      <div className={`flex flex-col ${gapForBetweenSectionsClasses}`}>
        <div className='flex sm:flex-row flex-col sm:justify-between items-center'>
          <h1 className=''>{t('title-text')}</h1>
          <button
            className='btn btn-sm btn-secondary'
            disabled={isAddressesLimitReached}
            onClick={() => openModal('create-address-modal')}
          >
            {t('create-address-button-text')}
            <PlusIcon />
          </button>
        </div>
        <p className={`text-tiny`}>{t('description-text')}</p>
        <ul
          className={`grid grid-cols-[repeat(auto-fill,minmax(280px,1fr))] sm:grid-cols-[repeat(auto-fill,minmax(300px,1fr))] ${gapForBetweenSectionsClasses}`}
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
          {result.isFetched && addresses.length === 0 && (
            <ReusableCard>
              <p className='text-center'>{t('no-addresses-p-text')}</p>
              <button
                className='btn btn-sm btn-secondary'
                onClick={() => openModal('create-address-modal')}
              >
                {t('create-address-button-text')}
                <PlusIcon />
              </button>
            </ReusableCard>
          )}
          {result.isFetched &&
            addresses.length > 0 &&
            addresses.map((address) => {
              return (
                <ReusableCard key={address.sk}>
                  <span>{`${address.buyerAddress}, ${address.buyerZipCode}, ${address.buyerCity}, ${address.buyerAdministrativeDivision}, ${address.buyerCountry}`}</span>
                  <span>{`${address.buyerRecipientName}, ${address.buyerPhoneNumber}`}</span>
                  {address.buyerDeliveryInstructions && (
                    <span>{address.buyerDeliveryInstructions}</span>
                  )}
                  <button
                    type='button'
                    className={`absolute bottom-[32px] right-0 btn btn-sm btn-secondary btn-outline ${borderRadiusClasses} rounded-none rounded-tl border-b-0 border-r-0 no-animation`}
                    onClick={() => openModal('update-address-modal', address)}
                  >
                    <EditIcon fontSize={18} />
                  </button>
                  <button
                    type='button'
                    className={`absolute bottom-0 right-0 btn btn-sm btn-error btn-outline rounded-none rounded-br border-b-0 border-r-0 no-animation`}
                    onClick={() => openModal('delete-address-modal', address)}
                  >
                    <TrashCanIcon fontSize={18} />
                  </button>
                </ReusableCard>
              );
            })}
        </ul>
      </div>
      <Modal id={'create-address-modal'}>
        <div className='flex flex-col gap-6'>
          <h2 className='font-bold'>{t('create-address-modal-title-text')}</h2>
          <CreateAddressForm
            form={createAddressForm}
            alertProps={alertProps}
            onSubmit={handleCreateAddressFormSubmit}
          />
        </div>
      </Modal>
      <Modal id={'update-address-modal'}>
        <div className='flex flex-col gap-6'>
          <h2 className='font-bold'>{t('update-address-modal-title-text')}</h2>
          <UpdateAddressForm
            form={updateAddressForm}
            alertProps={alertProps}
            onSubmit={handleUpdateAddressFormSubmit}
          />
          {alertProps && <Alert {...alertProps} />}
        </div>
      </Modal>
      <Modal id={'delete-address-modal'}>
        <div className='flex flex-col gap-6'>
          <h2 className='font-bold'>{t('delete-address-modal-title-text')}</h2>
          <p>{t('delete-address-modal-description-text')}</p>
          <button
            type='button'
            className='btn btn-sm btn-error'
            disabled={isAddressDeletionGoing}
            onClick={() => handleClickOnDeleteAddress()}
          >
            {isAddressDeletionGoing ? (
              <span className='loading loading-infinity'></span>
            ) : (
              t('delete-address-modal-confirm-button-text')
            )}
          </button>
          {alertProps && <Alert {...alertProps} />}
        </div>
      </Modal>
    </>
  );
};

export default AddressGrid;
