'use client';

import { FC, ReactNode, useState, useEffect } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Amplify } from 'aws-amplify';
import { useStore } from '@/src/zustand/store';
import useLocalStorage from '@/src/hooks/useLocalStorage';
import { isTokenExpired } from '@/src/utils/tokens';

Amplify.configure({
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
});

interface Props {
  children: ReactNode;
}

const ProvidersWrapper: FC<Props> = ({ children }) => {
  const [queryClient] = useState(() => new QueryClient());

  const { getUserFromLocalStorage, removeUserFromLocalStorage } =
    useLocalStorage();
  const setUser = useStore((state) => {
    return state.setUser;
  });

  useEffect(() => {
    const user = getUserFromLocalStorage();
    if (user.isAuthenticated && user.tokens && user.tokens.accessToken) {
      if (!isTokenExpired(user.tokens.accessToken)) {
        setUser(user);
      } else {
        removeUserFromLocalStorage();
      }
    }
  }, []);

  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
};

export default ProvidersWrapper;
