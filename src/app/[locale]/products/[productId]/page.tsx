import FloatingPurchaseControls from '@/src/components/FloatingPurchaseControls/FloatingPurchaseControls';
import ProductBottomSection from '@/src/components/ProductBottomSection/ProductBottomSection';
import TranslationsProvider from '@/src/components/TranslationsProvider/TranslationsProvider';
import {
  gapForBetweenSectionsClasses,
  xRootPaddingClasses,
} from '@/src/constants/classes';
import { Product } from '@/src/model/Product';
import { AbstractIntlMessages } from 'next-intl';
import { getMessages } from 'next-intl/server';
import Image from 'next/image';
import { FC } from 'react';

interface Props {
  params: {
    locale: string;
    productId: Product['pk'];
  };
  searchParams: {
    data: string;
  };
}

const getProduct = async (
  locale: string,
  productId: Product['pk']
): Promise<Product> => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL!}/${locale}/products/${productId}`
  );

  if (!res.ok) {
    throw new Error('Failed to fetch data!');
  }

  return res.json();
};

const ProductPage: FC<Props> = async ({
  params: { locale, productId },
  searchParams,
}) => {
  const messages = await getMessages();
  const productPageMessages = messages['product-page'] as AbstractIntlMessages;

  const product = JSON.parse(decodeURIComponent(searchParams.data)) as Product;
  // const product = await getProduct(locale, productId);

  return (
    <main
      className={`relative flex flex-col items-center sm:gap-[200px] gap-[50px]`}
    >
      <div className='min-h-[calc(100vh-282.5px)] flex flex-col justify-center items-center'>
        <h1
          className={`sm:text-giant text-mid font-light text-center ${xRootPaddingClasses}`}
        >
          {product.name}
        </h1>
      </div>
      {product.slides.map((slide) => {
        return (
          <div className='relative w-[100%]'>
            <div className='aspect-[16/9]'>
              <Image
                className='absolute inset-0 w-full h-full object-contain'
                key={slide.effectSlide}
                src={slide.effectSlide}
                alt={slide.effectSlide}
                quality={100}
                layout='fill'
                priority
              />
            </div>
            <div className='aspect-[16/9]'>
              <Image
                className='absolute inset-0 w-full h-full object-contain'
                key={slide.productSlide}
                src={slide.productSlide}
                alt={slide.productSlide}
                quality={100}
                layout='fill'
                priority
              />
            </div>
          </div>
        );
      })}
      <TranslationsProvider scopedMessages={productPageMessages}>
        <ProductBottomSection product={product} />
      </TranslationsProvider>
      <TranslationsProvider scopedMessages={productPageMessages}>
        <FloatingPurchaseControls product={product} />
      </TranslationsProvider>
    </main>
  );
};

export default ProductPage;
