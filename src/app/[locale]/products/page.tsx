import { useTranslations } from 'next-intl';
import { FC } from 'react';
import testProducts from '@/src/data/testProducts';
import ProductGrid from '@/src/components/ProductGrid/ProductGrid';

interface Props {
  params: {
    locale: string;
  };
}

const ProductsPage: FC<Props> = ({ params: { locale } }) => {
  const t = useTranslations('');
  return (
    <>
      <ProductGrid products={testProducts} />
    </>
  );
};

export default ProductsPage;
