import ChangePasswordForm from '@/src/components/ChangePasswordForm/ChangePasswordForm';
import DeleteAccountForm from '@/src/components/DeleteAccountForm/DeleteAccountForm';
import TranslationsProvider from '@/src/components/TranslationsProvider/TranslationsProvider';
import { AbstractIntlMessages } from 'next-intl';
import { FC } from 'react';
import { cookies } from 'next/headers';
import { fetchAuthSession, getCurrentUser } from 'aws-amplify/auth/server';
import { runWithAmplifyServerContext } from '@/src/aws/amplifyServerUtils';
import { redirect } from 'next/navigation';
import { getMessages, getTranslations } from 'next-intl/server';

/* This page always dynamically renders per request. It is possible that on Next.js 14 this is not needed since Next.js will deduce if this page is dynamically render based on the used APIs*/
export const dynamic = 'force-dynamic';

interface Props {
  params: {
    locale: string;
  };
}

const ManageMyProfilePage: FC<Props> = async ({ params: { locale } }) => {
  const t = await getTranslations('manage-my-profile-page');
  const messages = await getMessages();

  const changePasswordFormMessages = (
    messages['manage-my-profile-page'] as AbstractIntlMessages
  )['change-my-password-section'] as AbstractIntlMessages;
  const deleteAccountFormMessages = (
    (messages['manage-my-profile-page'] as AbstractIntlMessages)[
      'delete-my-account-section'
    ] as AbstractIntlMessages
  )['danger-zone-section'] as AbstractIntlMessages;
  const sectionClasses = 'flex flex-col gap-[15px] text-tiny';
  const h2Classes = 'font-bold';
  const dividerClasses = ' border-b';

  const session = await runWithAmplifyServerContext({
    nextServerContext: { cookies },
    operation: (contextSpec) => fetchAuthSession(contextSpec),
  });

  if (!session.tokens) {
    redirect('/');
  }

  const user = await runWithAmplifyServerContext({
    nextServerContext: { cookies },
    operation: (contextSpec) => getCurrentUser(contextSpec),
  });
  const isUserAuthenticatedWithGoogle = user.username.startsWith('google');

  return (
    <div className={`flex flex-col w-full gap-10`}>
      {!isUserAuthenticatedWithGoogle && (
        <>
          <section className={`${sectionClasses}`}>
            <h2 className={`${h2Classes}`}>
              {t('change-my-password-section.title-text')}
            </h2>
            <p>{t('change-my-password-section.description-text')}</p>
            <ul className='ml-[30px] list-disc'>
              <li>
                {t('change-my-password-section.criteria-list.twelve-chars')}
              </li>
              <li>
                {t(
                  'change-my-password-section.criteria-list.at-least-one-number'
                )}
              </li>
              <li>
                {t(
                  'change-my-password-section.criteria-list.at-least-one-special'
                )}
              </li>
              <li>
                {t(
                  'change-my-password-section.criteria-list.at-least-one-uppercase'
                )}
              </li>
              <li>
                {t(
                  'change-my-password-section.criteria-list.at-least-one-lowercase'
                )}
              </li>
            </ul>
            <TranslationsProvider scopedMessages={changePasswordFormMessages}>
              <ChangePasswordForm />
            </TranslationsProvider>
          </section>
          <div className={`${dividerClasses}`} />
        </>
      )}
      <section className={`${sectionClasses}`}>
        <h2 className={`${h2Classes}`}>
          {t('delete-my-account-section.title-text')}
        </h2>
        <section
          className={`${sectionClasses} border rounded-md border-error px-[30px] py-[15px]`}
        >
          <h3 className={`${h2Classes} text-error`}>
            {t('delete-my-account-section.danger-zone-section.title-text')}
          </h3>
          <p>
            {t.rich(
              'delete-my-account-section.danger-zone-section.description-text'
            )}
          </p>
          <TranslationsProvider scopedMessages={deleteAccountFormMessages}>
            <DeleteAccountForm />
          </TranslationsProvider>
        </section>
      </section>
      <div className={`${dividerClasses}`} />
    </div>
  );
};

export default ManageMyProfilePage;
