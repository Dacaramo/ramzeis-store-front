import {
  string,
  Input,
  picklist,
  regex,
  number,
  integer,
  minValue,
  maxValue,
  record,
  unknown,
} from 'valibot';

export const limitSchema = number('The limit must be a number', [
  integer('The limit must be an integer'),
  minValue(1, 'The limit must be greater than 0'),
  maxValue(100, 'The limit must be less or equal to 100'),
]);

export const exclusiveStartKeySchema = record(
  string(),
  unknown(),
  'The exclusiveStartKey must be of type Record<string, unknown>'
);

export const sortSchema = picklist(
  ['asc', 'desc'],
  'The sort must be one of the following values: asc, desc'
);

export const localeSchema = string('The locale must be a string', [
  regex(
    /^[a-z]{2}(-[A-Z]{2})?$/,
    'The locale must come in the format of an ISO 639-1 language code optionally followed by a hyphen and an ISO 3166-1 Alpha-2 country code (regex: /^[a-zA-Z]{2}-[a-zA-Z]{2}$/, example: en-US)'
  ),
]);

export type Sort = Input<typeof sortSchema>;
