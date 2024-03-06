import {
  maxLength,
  object,
  optional,
  string,
  Input,
  partial,
  omit,
  special,
  regex,
  minLength,
} from 'valibot';
import { buyerEmailSchema } from './Buyer';
import { encodedExclusiveStartKeySchema, limitSchema } from './otherSchemas';

export const addressIdSchema = special<`address-${string}`>(
  (value) => (value as string).startsWith('address-'),
  "The addressId must starts with 'address-'"
);

export const addressSchema = object(
  {
    pk: buyerEmailSchema,
    sk: addressIdSchema,
    buyerAddress: string('The buyerAddress must be a string', [
      minLength(1, 'You did not provide an address'),
    ]),
    buyerCountry: string('The buyerCountry must be a string', [
      minLength(1, 'You did not provide a country'),
    ]),
    buyerAdministrativeDivision: string(
      'The buyerAdministrativeDivision must be a string',
      [minLength(1, 'You did not provide an administrative division')]
    ),
    buyerCity: string('The buyerCity must be a string', [
      minLength(1, 'You did not provide a city'),
    ]),
    buyerZipCode: string('The buyerZipCode must be a string', [
      minLength(1, 'You did not provide a zip code'),
    ]),
    buyerRecipientName: string('The buyerRecipientName must be a string', [
      minLength(1, "You did not provide a recipient's name"),
    ]),
    buyerPhoneNumber: string('The buyerPhoneNumber must be a string', [
      minLength(1, 'You did not provide a phone number'),
      regex(
        /^\+(?:[0-9] ?){6,14}[0-9]$/,
        'This does not look like a valid phone number'
      ),
    ]),
    buyerDeliveryInstructions: optional(
      string('The buyerDeliveryInstructions must be a string', [
        maxLength(
          2000,
          'The buyerDeliveryInstructions must have at most 2000 characters'
        ),
      ])
    ),
  },
  'The address must be an object'
);

export const addressFilterValuesSchema = partial(
  object({
    limit: limitSchema,
    encodedExclusiveStartKey: encodedExclusiveStartKeySchema,
  })
);

export const addressPatchSchema = partial(omit(addressSchema, ['pk', 'sk']));

export type Address = Input<typeof addressSchema>;
export type AddressId = Input<typeof addressIdSchema>;
export type AddressFilterValues = Input<typeof addressFilterValuesSchema>;
export type AddressPatch = Input<typeof addressPatchSchema>;
