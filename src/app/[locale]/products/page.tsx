import { FC } from 'react';
import testProducts from '@/src/data/testProducts';
import ProductGrid from '@/src/components/ProductGrid/ProductGrid';
import { useTranslations } from 'next-intl';

interface Props {
  params: {
    locale: string;
  };
}

const ProductsPage: FC<Props> = ({ params: { locale } }) => {
  const t = useTranslations('products-page.filter-section');
  return (
    <>
      <ProductGrid
        products={testProducts}
        filterSectionTranslations={{
          'price-filter': {
            'general-label': t('price-filter.general-label'),
            'max-price-label': t('price-filter.max-price-label'),
            'max-price-placeholder': t('price-filter.max-price-placeholder'),
            'min-price-label': t('price-filter.min-price-label'),
            'min-price-placeholder': t('price-filter.min-price-placeholder'),
          },
          'price-sort': {
            'general-label': t('price-sort.general-label'),
            'asc-button-text': t('price-sort.asc-button-text'),
            'desc-button-text': t('price-sort.desc-button-text'),
          },
          'color-filter': {
            'general-label': t('color-filter.general-label'),
          },
        }}
      />
    </>
  );
};

export default ProductsPage;
