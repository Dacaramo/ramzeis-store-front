'use client';

import { FC, ReactNode, useState, useEffect } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Amplify } from 'aws-amplify';
import { useStore } from '@/src/zustand/store';
import useLocalStorage from '@/src/hooks/useLocalStorage';
import { isTokenExpired } from '@/src/utils/tokens';
import { amplifyConfig } from '@/src/aws/amplifyConfig';
import { signOut } from 'aws-amplify/auth';

Amplify.configure(amplifyConfig, {
  ssr: true,
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
        signOut();
      }
    }
  }, []);

  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
};

export default ProvidersWrapper;
