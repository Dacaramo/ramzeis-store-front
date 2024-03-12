import { FC, ReactNode } from 'react';
import { AbstractIntlMessages, useMessages } from 'next-intl';
import ProfilePageNav from '@/src/components/ProfilePageNav/ProfilePageNav';
import TranslationsProvider from '@/src/components/TranslationsProvider/TranslationsProvider';
import {
  gapForBetweenSectionsClasses,
  xRootPaddingClasses,
  yRootProfilePageClasses,
} from '@/src/constants/classes';

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
    <main className={`sm:min-h-[calc(100vh-82.5px)] flex flex-row border-t`}>
      <TranslationsProvider scopedMessages={profilePageNavMessages}>
        <ProfilePageNav />
      </TranslationsProvider>
      <div
        className={`w-full flex flex-col ${xRootPaddingClasses} ${yRootProfilePageClasses} ${gapForBetweenSectionsClasses}`}
      >
        {children}
      </div>
    </main>
  );
};

export default layout;
