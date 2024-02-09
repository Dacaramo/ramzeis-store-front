import { FC } from 'react';
import { useTranslations } from 'next-intl';

interface Props {
  params: {
    locale: string;
  };
}

const ProfilePage: FC<Props> = ({ params: { locale } }) => {
  const t = useTranslations('profile-page');

  return <>My-profile</>;
};

export default ProfilePage;
