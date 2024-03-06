'use client';

import 'react-international-phone/style.css';

import { Address } from '@/src/model/Address';
import { CSSProperties, ComponentProps, FC } from 'react';
import { SubmitHandler, UseFormReturn } from 'react-hook-form';
import Alert from '../Alert/Alert';
import { useTranslations } from 'next-intl';
import { errorSpanClasses, inputClasses } from '@/src/constants/classes';
import useTheme from '@/src/hooks/useTheme';
import { colors } from '@/src/constants/colors';
import ControlledPhoneInput from '../ControlledPhoneInput/ControlledPhoneInput';

interface Props {
  form: UseFormReturn<Omit<Address, 'pk' | 'sk'>>;
  alertProps?: ComponentProps<typeof Alert>;
  onSubmit: SubmitHandler<Omit<Address, 'pk' | 'sk'>>;
}

const CreateAddressForm: FC<Props> = ({
  form,
  alertProps,
  onSubmit: handleSubmit,
}) => {
  const t = useTranslations();
  const theme = useTheme([]);

  const inputStyles: CSSProperties = {
    borderColor: colors[theme].error,
  };

  return (
    <>
      <form
        className='flex flex-col gap-4'
        onSubmit={form.handleSubmit(handleSubmit)}
        autoComplete='off'
      >
        <div className='flex flex-col'>
          <label className='ml-sm-control-padding self-start text-tiny'>
            {t('recipient-phone-number-input.label')}
          </label>
          <ControlledPhoneInput
            name='buyerPhoneNumber'
            control={form.control}
            style={form.formState.errors.buyerPhoneNumber ? inputStyles : {}}
          />
          {form.formState.errors.buyerPhoneNumber && (
            <span className={`${errorSpanClasses}`}>
              {form.formState.errors.buyerPhoneNumber.message}
            </span>
          )}
        </div>
        <div className='flex flex-col'>
          <label
            htmlFor='recipient-name-input'
            className='ml-sm-control-padding self-start text-tiny'
          >
            {t('recipient-name-input.label')}
          </label>
          <input
            {...form.register('buyerRecipientName')}
            id='recipient-name-input'
            style={form.formState.errors.buyerRecipientName ? inputStyles : {}}
            className={`${inputClasses}`}
            placeholder={t('recipient-name-input.placeholder')}
          />
          {form.formState.errors.buyerRecipientName && (
            <span className={`${errorSpanClasses}`}>
              {form.formState.errors.buyerRecipientName.message}
            </span>
          )}
        </div>
        <div className='flex flex-col'>
          <label
            htmlFor='address-input'
            className='ml-sm-control-padding self-start text-tiny'
          >
            {t('address-input.label')}
          </label>
          <input
            {...form.register('buyerAddress')}
            id='address-input'
            style={form.formState.errors.buyerAddress ? inputStyles : {}}
            className={`${inputClasses}`}
            placeholder={t('address-input.placeholder')}
          />
          {form.formState.errors.buyerAddress && (
            <span className={`${errorSpanClasses}`}>
              {form.formState.errors.buyerAddress.message}
            </span>
          )}
        </div>
        <div className='flex flex-col'>
          <label
            htmlFor='zip-code-input'
            className='ml-sm-control-padding self-start text-tiny'
          >
            {t('zip-code-input.label')}
          </label>
          <input
            {...form.register('buyerZipCode')}
            id='zip-code-input'
            style={form.formState.errors.buyerZipCode ? inputStyles : {}}
            className={`${inputClasses}`}
            placeholder={t('zip-code-input.placeholder')}
          />
          {form.formState.errors.buyerZipCode && (
            <span className={`${errorSpanClasses}`}>
              {form.formState.errors.buyerZipCode.message}
            </span>
          )}
        </div>
        <div className='flex flex-col'>
          <label
            htmlFor='city-input'
            className='ml-sm-control-padding self-start text-tiny'
          >
            {t('city-input.label')}
          </label>
          <input
            {...form.register('buyerCity')}
            id='city-input'
            style={form.formState.errors.buyerCity ? inputStyles : {}}
            className={`${inputClasses}`}
            placeholder={t('city-input.placeholder')}
          />
          {form.formState.errors.buyerCity && (
            <span className={`${errorSpanClasses}`}>
              {form.formState.errors.buyerCity.message}
            </span>
          )}
        </div>
        <div className='flex flex-col'>
          <label
            htmlFor='administrative-division-input'
            className='ml-sm-control-padding self-start text-tiny'
          >
            {t('administrative-division-input.label')}
          </label>
          <input
            {...form.register('buyerAdministrativeDivision')}
            id='administrative-division-input'
            style={
              form.formState.errors.buyerAdministrativeDivision
                ? inputStyles
                : {}
            }
            className={`${inputClasses}`}
            placeholder={t('administrative-division-input.placeholder')}
          />
          {form.formState.errors.buyerAdministrativeDivision && (
            <span className={`${errorSpanClasses}`}>
              {form.formState.errors.buyerAdministrativeDivision.message}
            </span>
          )}
        </div>
        <div className='flex flex-col'>
          <label
            htmlFor='country-input'
            className='ml-sm-control-padding self-start text-tiny'
          >
            {t('country-input.label')}
          </label>
          <input
            {...form.register('buyerCountry')}
            id='country-input'
            style={form.formState.errors.buyerCountry ? inputStyles : {}}
            className={`${inputClasses}`}
            placeholder={t('country-input.placeholder')}
          />
          {form.formState.errors.buyerCountry && (
            <span className={`${errorSpanClasses}`}>
              {form.formState.errors.buyerCountry.message}
            </span>
          )}
        </div>
        <div className='flex flex-col'>
          <label
            htmlFor='delivery-instructions-input'
            className='ml-sm-control-padding self-start text-tiny'
          >
            {t('delivery-instructions-input.label')}
          </label>
          <input
            {...form.register('buyerDeliveryInstructions')}
            id='delivery-instructions-input'
            style={
              form.formState.errors.buyerDeliveryInstructions ? inputStyles : {}
            }
            className={`${inputClasses}`}
            placeholder={t('delivery-instructions-input.placeholder')}
          />
          {form.formState.errors.buyerDeliveryInstructions && (
            <span className={`${errorSpanClasses}`}>
              {form.formState.errors.buyerDeliveryInstructions.message}
            </span>
          )}
        </div>
        <button
          type='submit'
          className='btn btn-sm btn-secondary'
          disabled={form.formState.isSubmitting}
        >
          {form.formState.isSubmitting ? (
            <span className='loading loading-infinity'></span>
          ) : (
            t('create-address-modal-confirm-button-text')
          )}
        </button>
      </form>
      {alertProps && <Alert {...alertProps} />}
    </>
  );
};

export default CreateAddressForm;
