import { Product } from '@/src/model/Product';
import Image from 'next/image';
import { FC } from 'react';
import { borderRadiusClasses } from '@/src/constants/classes';
import Link from 'next/link';

interface Props {
  product: Product;
}

const ProductCard: FC<Props> = ({ product }) => {
  return (
    <Link
      href={{
        pathname: `/products/${product.pk}`,
        query: {
          data: JSON.stringify(product),
        },
      }}
      className='flex flex-col items-center gap-2 cursor-pointer'
    >
      <div
        className={`relative w-full h-[300px] shadow-classic-sm transition-all ${borderRadiusClasses}`}
      >
        <Image
          className={`absolute left-0 w-full h-[300px] p-[50px] object-contain bg-white transition-all ${borderRadiusClasses}`}
          width={400}
          height={400}
          src={product.previewImages[1]}
          alt={product.name}
          quality={100}
          priority
        />
        <Image
          className={`absolute left-0 w-full h-[300px] p-[50px] object-contain hover:opacity-0 bg-white transition-all ${borderRadiusClasses}`}
          width={400}
          height={400}
          src={product.previewImages[0]}
          alt={product.name}
          quality={100}
          priority
        />
      </div>
      {/* <Image
        className={`h-[300px] transition-all ${borderRadiusClasses} object-contain`}
        width={400}
        height={400}
        src={product.previewImages[0]}
        alt={product.name}
        quality={100}
        priority
      /> */}
      <div className='w-full flex flex-1 flex-row justify-between items-start gap-4 '>
        <h1 className='font-bold text-mid leading-tight'>{product.name}</h1>
        <span className='text-mid'>{`$${product.price}`}</span>
      </div>
    </Link>
  );
};

export default ProductCard;
