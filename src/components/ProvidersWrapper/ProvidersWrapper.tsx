'use client';

import { FC, ReactNode, useState } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Amplify } from 'aws-amplify';

Amplify.configure({
  Auth: {
    Cognito: {
      userPoolId: process.env.NEXT_PUBLIC_COGNITO_USER_POOL_ID!,
      userPoolClientId: process.env.NEXT_PUBLIC_COGNITO_USER_POOL_CLIENT_ID!,
      identityPoolId: process.env.NEXT_PUBLIC_COGNITO_IDENTITY_POOL_ID!,
      signUpVerificationMethod: 'link',
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
});

interface Props {
  children: ReactNode;
}

const ProvidersWrapper: FC<Props> = ({ children }) => {
  const [queryClient] = useState(() => new QueryClient());

  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
};

export default ProvidersWrapper;
