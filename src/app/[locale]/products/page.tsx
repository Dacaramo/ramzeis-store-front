import { useTranslations } from 'next-intl';
import { FC } from 'react';

interface Props {
  params: {
    locale: string;
  };
}

const ProductsPage: FC<Props> = ({ params: { locale } }) => {
  const t = useTranslations('');
  return <div>{t('reviews-text')}</div>;
};

export default ProductsPage;
