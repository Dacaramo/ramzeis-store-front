import { ResourcesConfig } from 'aws-amplify';
import { LegacyConfig } from 'aws-amplify/adapter-core';

export const amplifyConfig: ResourcesConfig | LegacyConfig = {
  Auth: {
    Cognito: {
      userPoolId: process.env.NEXT_PUBLIC_COGNITO_USER_POOL_ID!,
      userPoolClientId: process.env.NEXT_PUBLIC_COGNITO_USER_POOL_CLIENT_ID!,
      identityPoolId: process.env.NEXT_PUBLIC_COGNITO_IDENTITY_POOL_ID!,
      signUpVerificationMethod: 'code',
      loginWith: {
        oauth: {
          domain: process.env.NEXT_PUBLIC_COGNITO_DOMAIN!,
          scopes: ['email', 'phone', 'openid'],
          redirectSignIn: [
            process.env.NEXT_PUBLIC_COGNITO_REDIRECT_SIGN_IN_URL!,
          ],
          redirectSignOut: [
            process.env.NEXT_PUBLIC_COGNITO_REDIRECT_SIGN_OUT_URL!,
          ],
          responseType: 'code',
        },
      },
    },
  },
};
