import { runWithAmplifyServerContext } from '@/src/aws/amplifyServerUtils';
import PaymentMethodGrid from '@/src/components/PaymentMethodGrid/PaymentMethodGrid';
import TranslationsProvider from '@/src/components/TranslationsProvider/TranslationsProvider';
import { getQueryClient } from '@/src/utils/reactQuery';
import { fetchAuthSession } from 'aws-amplify/auth/server';
import { AbstractIntlMessages } from 'next-intl';
import { getMessages } from 'next-intl/server';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { FC } from 'react';

interface Props {
  params: {
    locale: string;
  };
}

const page: FC<Props> = async ({ params: { locale } }) => {
  const messages = await getMessages();
  const addressesPageMessages = messages[
    'payment-methods-page'
  ] as AbstractIntlMessages;
  const session = await runWithAmplifyServerContext({
    nextServerContext: { cookies },
    operation: (contextSpec) => fetchAuthSession(contextSpec),
  });
  const buyerEmail = session?.tokens?.idToken?.payload.email?.toString();
  const queryClient = getQueryClient();

  if (!buyerEmail) {
    redirect('/');
  }

  // await queryClient.prefetchQuery({
  //   queryKey: ['addresses', { limit: 5 }],
  //   queryFn: async () => {
  //     return await getAddresses(buyerEmail, { limit: 5 });
  //   },
  // });

  return (
    <>
      {/* <HydrationBoundary state={dehydrate(queryClient)}> */}
      <TranslationsProvider scopedMessages={addressesPageMessages}>
        <PaymentMethodGrid />
      </TranslationsProvider>
      {/* </HydrationBoundary> */}
    </>
  );
};

export default page;
