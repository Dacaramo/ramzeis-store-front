'use client';

import { FC, ReactNode, useState } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

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