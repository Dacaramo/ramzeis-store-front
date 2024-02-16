import { FC, ReactNode, createElement } from 'react';
import {
  AbstractIntlMessages,
  NextIntlClientProvider,
  useMessages,
} from 'next-intl';

interface Props {
  children: ReactNode;
  scopedMessages?: AbstractIntlMessages;
}

const TranslationsProvider: FC<Props> = ({ children, scopedMessages }) => {
  const allMessages = useMessages();

  return (
    <NextIntlClientProvider
      messages={scopedMessages || allMessages}
      defaultTranslationValues={{
        strong: async (value) => {
          'use server';
          return (await createElement('strong', null, value)) as ReactNode;
        },
        b: async (value) => {
          'use server';
          return (await createElement('b', null, value)) as ReactNode;
        },
      }}
    >
      {children}
    </NextIntlClientProvider>
  );
};

export default TranslationsProvider;
