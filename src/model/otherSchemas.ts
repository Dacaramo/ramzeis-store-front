import {
  string,
  minLength,
  number,
  integer,
  minValue,
  maxValue,
  regex,
  object,
  email,
  custom,
  startsWith,
  forward,
  Input,
  boolean,
  value,
} from 'valibot';

export const tableNameSchema = string(
  'The tableName coming from the env variable must de a defined string',
  [
    minLength(
      1,
      'The tableName coming from the env variable must have at least 1 character'
    ),
  ]
);

export const bucketNameSchema = string(
  'The S3_BUCKET_NAME environment variable must be a defined string',
  [
    minLength(
      1,
      'The S3_BUCKET_NAME environment variable must have at least 1 character'
    ),
  ]
);

export const indexNameSchema = string(
  'The OPENSEARCH_PRODUCTS_INDEX_NAME environment variable must be a defined string',
  [
    minLength(
      1,
      'The OPENSEARCH_PRODUCTS_INDEX_NAME environment variable must have at least 1 character'
    ),
  ]
);

export const limitSchema = number('The limit must be a number', [
  integer('The limit must be an integer'),
  minValue(1, 'The limit must be greater than 0'),
  maxValue(100, 'The limit must be less or equal to 100'),
]);

export const encodedExclusiveStartKeySchema = string(
  'The encodedExclusiveStartKey must be a string'
);

export const localeSchema = string('The locale must be a string', [
  regex(
    /^[a-z]{2}(-[A-Z]{2})?$/,
    'The locale must come in the format of an ISO 639-1 language code optionally followed by a hyphen and an ISO 3166-1 Alpha-2 country code (regex: /^[a-zA-Z]{2}-[a-zA-Z]{2}$/, example: en-US)'
  ),
]);

export const stripePaymentMethodIdSchema = string(
  'The stripePaymentMethodId must be a string'
);

export const emailSchema = string('You did not provide an email', [
  email('This does not look like a valid email format'),
]);

export const passwordSchema = string('You did not provide a password', [
  minLength(12, 'The password must have at least 12 characters'),
  custom(
    (value) => /\d/.test(value),
    'The password must have at least 1 number'
  ),
  custom(
    (value) => /[!@#$%^&*(),.?":{}|<>]/.test(value),
    'The password must have at least 1 special character'
  ),
  custom(
    (value) => /[A-Z]/.test(value),
    'The password must have at least 1 uppercase letter'
  ),
  custom(
    (value) => /[a-z]/.test(value),
    'The password must have at least 1 lowercase letter'
  ),
]);

export const signUpFormDataSchema = object(
  {
    email: emailSchema,
    phone: string('You did not provide a phone number', [
      regex(
        /^\+(?:[0-9] ?){6,14}[0-9]$/,
        'This does not look like a valid phone number'
      ),
    ]),
    password: passwordSchema,
    confirmedPassword: string('You did not confirm your password'),
    areTermsAndConditionsAccepted: boolean([
      value(
        true,
        'You must accept the terms and conditions in order to create an account'
      ),
    ]),
  },
  'signUpFormData must be an object',
  [
    forward(
      custom(
        (obj) => obj.password === obj.confirmedPassword,
        'The passwords did not match'
      ),
      ['confirmedPassword']
    ),
  ]
);

export const loginFormDataSchema = object({
  email: emailSchema,
  password: string('You did not provide a password'),
});

export const changePasswordFormDataSchema = object(
  {
    currentPassword: string('You did not provide the current password'),
    newPassword: passwordSchema,
    confirmedNewPassword: string('You did not confirm your new password'),
  },
  'changePasswordFormData must be an object',
  [
    forward(
      custom(
        (obj) => obj.newPassword === obj.confirmedNewPassword,
        'The passwords did not match'
      ),
      ['confirmedNewPassword']
    ),
  ]
);

export const forgotPasswordStep1FormDataSchema = object({
  email: emailSchema,
});

export const forgotPasswordStep2FormDataSchema = object({
  code: string('You did not provide the code that was sent to your email'),
  newPassword: string('You did not provide a  new password for your account'),
});

export class CustomError extends Error {
  name: string;

  constructor(name: string, message: string = '') {
    super(message);
    this.name = name;
    Object.setPrototypeOf(this, CustomError.prototype);
  }
}
export type SignUpFormData = Input<typeof signUpFormDataSchema>;
export type LoginFormData = Input<typeof loginFormDataSchema>;
export type ChangePasswordData = Input<typeof changePasswordFormDataSchema>;
export type ForgotPasswordStep1FormData = Input<
  typeof forgotPasswordStep1FormDataSchema
>;
export type ForgotPasswordStep2FormData = Input<
  typeof forgotPasswordStep2FormDataSchema
>;
