import { useLayoutEffect, useEffect } from 'react';
import { useStore } from '../zustand/store';
import { useRouter } from 'next/navigation';

const usePrivateRoute = () => {
  const isAuthenticated = useStore((state) => {
    return state.user.isAuthenticated;
  });
  const router = useRouter();

  useEffect(() => {
    console.log('@@@@@isAuthenticated', isAuthenticated);
    if (!isAuthenticated) {
      router.push('/');
    }
  }, []);
};

export default usePrivateRoute;
