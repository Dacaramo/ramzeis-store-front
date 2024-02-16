import { FC, ReactNode } from 'react';
import { AbstractIntlMessages, useMessages } from 'next-intl';
import ProfilePageNav from '@/src/components/ProfilePageNav/ProfilePageNav';
import TranslationsProvider from '@/src/components/TranslationsProvider/TranslationsProvider';

interface Props {
  children: ReactNode;
  params: { locale: string };
}

const layout: FC<Props> = ({ children, params }) => {
  const messages = useMessages();
  const profilePageNavMessages = messages[
    'profile-page-nav'
  ] as AbstractIntlMessages;

  return (
    <main className={`min-h-[calc(100vh-82.5px)] flex flex-row border-t`}>
      <TranslationsProvider scopedMessages={profilePageNavMessages}>
        <ProfilePageNav />
      </TranslationsProvider>
      {children}
    </main>
  );
};

export default layout;
