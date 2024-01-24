import { minLength, object, string, Input, special, maxLength } from 'valibot';

export const hexColorSchema = special<`#${string}`>(
  (value) => /^#[0-9a-fA-F]{6}$/i.test(value as string),
  'The hexColor must be a string representing a hexadecimal color'
);

export const colorSchema = object(
  {
    name: string('The name must be a string', [
      minLength(1, 'The name must have at least 1 character'),
      maxLength(200, 'The name must have at most 200 characters'),
    ]),
    hexColor: hexColorSchema,
  },
  'The color must be an object of type Record<string, {name: string; hexColor: string}>'
);

export type Color = Input<typeof colorSchema>;
export type HexColor = Input<typeof hexColorSchema>;
