'use client';

import { useTranslations } from 'next-intl';
import { FC, useId, useState } from 'react';
import ToggleButtonGroup, {
  ToggleButtonDefinition,
} from '../ToggleButtonGroup/ToggleButtonGroup';
import Image from 'next/image';
import { Product } from '@/src/model/Product';
import { useInfiniteQuery } from '@tanstack/react-query';
import { Review, ReviewFilterValues } from '@/src/model/Review';
import { getReviewsPerProduct } from '@/src/clients/axiosClient';
import { doubleEncodeEsk } from '@/src/utils/encodeEsk';
import { xRootPaddingClasses } from '@/src/constants/classes';

type ProductBottomSectionTab = 'details' | 'reviews';

interface Props {
  product: Product;
}

const ProductBottomSection: FC<Props> = ({ product }) => {
  const [selectedTab, setSelectedTab] =
    useState<ProductBottomSectionTab>('details');
  // const [reviewFilterValues, setReviewFilterValues] =
  //   useState<ReviewFilterValues>({
  //     limit: 5,
  //   });
  // const [doubleEncodedEsk, setDoubleEncodedEsk] = useState<string | undefined>(
  //   undefined
  // );

  const t = useTranslations('');
  // const result = useInfiniteQuery({
  //   queryKey: ['reviews', product.pk, reviewFilterValues],
  //   queryFn: async () => {
  //     const listResponse = await getReviewsPerProduct(product.pk, {
  //       ...reviewFilterValues,
  //       encodedExclusiveStartKey: doubleEncodedEsk,
  //     });
  //     if (listResponse.lastEvaluatedKey) {
  //       setDoubleEncodedEsk(doubleEncodeEsk(listResponse.lastEvaluatedKey));
  //     }
  //     return listResponse;
  //   },
  //   initialPageParam: 0,
  //   getNextPageParam: (lastPage, _pages, lastPageParam) => {
  //     if (!lastPage.lastEvaluatedKey) {
  //       return null;
  //     } else {
  //       return lastPageParam + 1;
  //     }
  //   },
  // });
  // const starId = useId();

  // const reviews =
  //   result.data?.pages.reduce((acc: Array<Review>, current) => {
  //     return [...acc, ...current.items] as Array<Review>;
  //   }, []) ?? [];

  const handleClickOnToggleButton = (clickedButton: ToggleButtonDefinition) => {
    setSelectedTab(clickedButton.key as ProductBottomSectionTab);
  };

  return (
    <section
      id='product-bottom-section'
      className='mb-[132px] w-full flex flex-col sm:gap-[100px] gap-[50px] justify-center items-center'
    >
      <ToggleButtonGroup
        containerClassName='border-b border-base-content'
        buttonsClassName='btn-md btn-ghost rounded-t-md rounded-b-none text-sm'
        buttons={[
          {
            key: 'details',
            value: t('details-button-text'),
          },
          {
            key: 'reviews',
            value: t('reviews-button-text'),
          },
        ]}
        selectedButtonKey={selectedTab}
        onButtonClicked={handleClickOnToggleButton}
      />
      {selectedTab === 'details' && (
        <ul
          className={`flex flex-col sm:gap-[100px] gap-[50px] ${xRootPaddingClasses}`}
        >
          {product.details.map((detail, i) => {
            if (i % 2 === 0) {
              return (
                <li
                  key={detail.title}
                  className='flex flex-row flex-wrap justify-center items-center text-mid gap-4'
                >
                  <div className='flex-1 flex flex-col gap-4 sm:items-end items-center sm:text-end text-center'>
                    <h2 className='font-bold'>{detail.title}</h2>
                    <p>{detail.description}</p>
                  </div>
                  <Image
                    className='flex-1 rounded-lg'
                    src={detail.image}
                    alt={detail.title}
                    width={600}
                    height={400}
                    quality={100}
                    priority
                  />
                </li>
              );
            } else {
              return (
                <li
                  key={detail.title}
                  className='flex flex-row flex-wrap-reverse justify-center items-center text-mid gap-4'
                >
                  <Image
                    className='flex-1 rounded-lg'
                    src={detail.image}
                    alt={detail.title}
                    width={600}
                    height={400}
                    quality={100}
                    priority
                  />
                  <div className='flex-1 flex flex-col gap-4 sm:items-start items-center sm:text-start text-center'>
                    <h2 className='font-bold'>{detail.title}</h2>
                    <p>{detail.description}</p>
                  </div>
                </li>
              );
            }
          })}
        </ul>
      )}
      {selectedTab === 'reviews' && (
        <>
          {/* <ul className={`flex flex-col gap-4 ${xRootPaddingClasses}`}>
            {reviews.map((review) => {
              return (
                <li
                  key={review.sk}
                  className='flex flex-row flex-wrap-reverse justify-center items-center text-mid'
                >
                  <h2 className='font-bold'>{review.reviewTitle}</h2>
                  <div className='rating rating-md'>
                    {[...new Array(review.reviewScore)].map((_, i) => {
                      return (
                        <input
                          key={starId}
                          type='radio'
                          name='rating-1'
                          className='mask mask-star pointer-events-none cursor-default'
                          onClick={(e) => e.preventDefault()}
                          {...(i === review.reviewScore - 1
                            ? { checked: true }
                            : { checked: false })}
                        />
                      );
                    })}
                  </div>
                  <p>{review.reviewDescription}</p>
                  {review.reviewImages !== undefined && (
                    <div className='flex flex-row flex-wrap gap-4'>
                      {review.reviewImages.map((image) => {
                        return (
                          <Image
                            key={image}
                            className='flex-1'
                            src={image}
                            alt={image}
                            width={600}
                            height={400}
                            quality={100}
                            priority
                          />
                        );
                      })}
                    </div>
                  )}
                  <div className='w-full flex flex-row flex-wrap justify-between items-center'>
                    <span>{`${t('review-written-by-text')} ${
                      review.reviewBuyerEmail
                    }`}</span>
                    <span>{review.reviewBuyerEmail}</span>
                  </div>
                </li>
              );
            })}
          </ul> */}
          <span className='text-center'>{t('reviews-coming-soon-text')}</span>
        </>
      )}
    </section>
  );
};

export default ProductBottomSection;
