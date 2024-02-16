import ChangePasswordForm from '@/src/components/ChangePasswordForm/ChangePasswordForm';
import DeleteAccountForm from '@/src/components/DeleteAccountForm/DeleteAccountForm';
import TranslationsProvider from '@/src/components/TranslationsProvider/TranslationsProvider';
import { AbstractIntlMessages, useMessages, useTranslations } from 'next-intl';
import { FC } from 'react';

interface Props {
  params: {
    locale: string;
  };
}

const page: FC<Props> = ({ params: { locale } }) => {
  const t = useTranslations('manage-my-profile-page');
  const messages = useMessages();

  const changePasswordFormMessages = (
    messages['manage-my-profile-page'] as AbstractIntlMessages
  )['change-my-password-section'] as AbstractIntlMessages;
  const deleteAccountFormMessages = (
    (messages['manage-my-profile-page'] as AbstractIntlMessages)[
      'delete-my-account-section'
    ] as AbstractIntlMessages
  )['danger-zone-section'] as AbstractIntlMessages;
  const sectionClasses =
    'px-[30px] py-[15px] flex flex-col gap-[15px] text-tiny border-b';
  const h2Classes = 'font-bold';

  return (
    <div className={`w-full gap-[100px]`}>
      <section className={`${sectionClasses}`}>
        <h2 className={`${h2Classes}`}>
          {t('change-my-password-section.title-text')}
        </h2>
        <p>{t('change-my-password-section.description-text')}</p>
        <ul className='ml-[30px] list-disc'>
          <li>{t('change-my-password-section.criteria-list.twelve-chars')}</li>
          <li>
            {t('change-my-password-section.criteria-list.at-least-one-number')}
          </li>
          <li>
            {t('change-my-password-section.criteria-list.at-least-one-special')}
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
      <section className={`${sectionClasses}`}>
        <h2 className={`${h2Classes}`}>
          {t('delete-my-account-section.title-text')}
        </h2>
        <section className={`${sectionClasses} border rounded-md border-error`}>
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
    </div>
  );
};

export default page;
