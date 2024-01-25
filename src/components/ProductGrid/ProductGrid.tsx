import { Product } from '@/src/model/Product';
import { FC } from 'react';
import ProductCard from '../ProductCard/ProductCard';
import { gapForBetweenSectionsClasses } from '@/src/constants/classes';

interface Props {
  products: Array<Product>;
}

const ProductGrid: FC<Props> = ({ products }) => {
  return (
    <ul
      className={`grid grid-cols-[repeat(auto-fill,minmax(280px,1fr))] sm:grid-cols-[repeat(auto-fill,minmax(300px,1fr))] ${gapForBetweenSectionsClasses}`}
    >
      {products.map((product) => {
        return (
          <ProductCard
            key={product.pk}
            product={product}
          />
        );
      })}
    </ul>
  );
};

export default ProductGrid;
