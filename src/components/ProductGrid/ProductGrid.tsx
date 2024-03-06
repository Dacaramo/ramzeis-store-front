'use client';

import { Product, ProductFilterValues, ProductSort } from '@/src/model/Product';
import { FC, useState } from 'react';
import ProductCard from '../ProductCard/ProductCard';
import {
  gapForBetweenFilterComponents,
  gapForBetweenSectionsClasses,
} from '@/src/constants/classes';
import PriceFilter from '../PriceFilter/PriceFilter';
import ToggleButtonGroup, {
  ToggleButtonDefinition,
} from '../ToggleButtonGroup/ToggleButtonGroup';
import { SliderValueChangeDetails } from '@ark-ui/react/slider';
import ColorFilter from '../ColorFilter/ColorFilter';
import { ProductColor } from '@/src/model/Product';
import { useSearchParams } from 'next/navigation';
import testProductColors from '@/src/data/testProductColors';
import { useInfiniteQuery } from '@tanstack/react-query';
import { getProducts } from '@/src/clients/axiosClient';
import { doubleEncodeEsk } from '@/src/utils/encodeEsk';

const minAllowedPrice = 0;
const maxAllowedPrice = 500;
const readyToClickRanges = [
  [0, 25],
  [25, 50],
  [50, 100],
  [100, 200],
  [200, 500],
];

interface Props {
  products: Array<Product>;
  filterSectionTranslations: {
    'price-filter': {
      'general-label': string;
      'min-price-label': string;
      'max-price-label': string;
      'min-price-placeholder': string;
      'max-price-placeholder': string;
    };
    'price-sort': {
      'general-label': string;
      'asc-button-text': string;
      'desc-button-text': string;
    };
    'color-filter': {
      'general-label': string;
    };
  };
}

const ProductGrid: FC<Props> = ({ products, filterSectionTranslations: t }) => {
  const [productFilterValuesFromHere, setProductFilterValuesFromHere] =
    useState<
      Omit<
        ProductFilterValues,
        'categoryId' | 'subcategoryId' | 'search' | 'encodedExclusiveStartKey'
      >
    >({
      sort: 'asc',
      minPrice: minAllowedPrice,
      maxPrice: maxAllowedPrice,
      limit: 20,
    });
  const [doubleEncodedEsk, setDoubleEncodedEsk] = useState<string | undefined>(
    undefined
  );

  const urlQueryStringParams = useSearchParams();

  const productFilterValuesFromOutside = Object.fromEntries(
    urlQueryStringParams.entries()
  ) as { categoryId?: string; subcategoryId?: string; search?: string };
  const allProductFilterValuesWithoutEsk: Omit<
    ProductFilterValues,
    'exclusiveStartKey'
  > = {
    ...productFilterValuesFromHere,
    ...productFilterValuesFromOutside,
  };

  const result = useInfiniteQuery({
    queryKey: ['products', allProductFilterValuesWithoutEsk],
    queryFn: async () => {
      const listResponse = await getProducts({
        ...allProductFilterValuesWithoutEsk,
        encodedExclusiveStartKey: doubleEncodedEsk,
      });
      if (listResponse.lastEvaluatedKey) {
        setDoubleEncodedEsk(doubleEncodeEsk(listResponse.lastEvaluatedKey));
      }
      return listResponse;
    },
    initialPageParam: 0,
    getNextPageParam: (lastPage, _pages, lastPageParam) => {
      if (!lastPage.lastEvaluatedKey) {
        return null;
      } else {
        return lastPageParam + 1;
      }
    },
  });

  const selectedRange = [
    productFilterValuesFromHere.minPrice!,
    productFilterValuesFromHere.maxPrice!,
  ];
  const selectedRangeButtonKey = JSON.stringify(selectedRange);
  const selectedSortButtonKey = productFilterValuesFromHere.sort!;
  const selectedColorKey = productFilterValuesFromHere.colorId;
  const sortButtonsDefinitions: Array<ToggleButtonDefinition> = [
    {
      key: 'asc',
      value: t['price-sort']['asc-button-text'],
    },
    {
      key: 'desc',
      value: t['price-sort']['desc-button-text'],
    },
  ];

  const handlePriceRangeValueChange = (details: SliderValueChangeDetails) => {
    setProductFilterValuesFromHere((prev) => {
      return {
        ...prev,
        minPrice: details.value[0],
        maxPrice: details.value[1],
      };
    });
  };

  const handleClickOnRangeButton = (clickedButton: ToggleButtonDefinition) => {
    if (selectedRangeButtonKey === clickedButton.key) {
      setProductFilterValuesFromHere((prev) => {
        return {
          ...prev,
          minPrice: minAllowedPrice,
          maxPrice: maxAllowedPrice,
        };
      });
    } else {
      const clickedPriceRange = JSON.parse(clickedButton.key) as Array<number>;
      setProductFilterValuesFromHere((prev) => {
        return {
          ...prev,
          minPrice: clickedPriceRange[0],
          maxPrice: clickedPriceRange[1],
        };
      });
    }
  };

  const handleClickOnSortButton = (clickedButton: ToggleButtonDefinition) => {
    if (selectedSortButtonKey !== clickedButton.key) {
      setProductFilterValuesFromHere((prev) => {
        return {
          ...prev,
          sort: clickedButton.key as ProductSort,
        };
      });
    }
  };

  const handleClickOnColor = (clickedColor: ProductColor) => {
    if (clickedColor.id === selectedColorKey) {
      const productFilterValuesCopy = { ...productFilterValuesFromHere };
      delete productFilterValuesCopy.colorId;
      setProductFilterValuesFromHere(productFilterValuesCopy);
    } else {
      setProductFilterValuesFromHere((prev) => {
        return {
          ...prev,
          colorId: clickedColor.id,
        };
      });
    }
  };

  return (
    <div className={`flex flex-col ${gapForBetweenSectionsClasses}`}>
      <form className='w-full flex flex-row justify-start text-tiny'>
        <PriceFilter
          generalLabel={t['price-filter']['general-label']}
          minAllowedPrice={minAllowedPrice}
          maxAllowedPrice={maxAllowedPrice}
          readyToClickRanges={readyToClickRanges}
          priceRangeValue={selectedRange}
          onPriceRangeValueChange={handlePriceRangeValueChange}
          onToggleButtonClick={handleClickOnRangeButton}
        />
        <div className='divider lg:divider-horizontal' />
        <fieldset
          className={`flex flex-col justify-between ${gapForBetweenFilterComponents}`}
        >
          <span>{t['price-sort']['general-label']}</span>
          <ToggleButtonGroup
            containerClassName='flex-col'
            buttons={sortButtonsDefinitions}
            selectedButtonKey={selectedSortButtonKey}
            onButtonClicked={handleClickOnSortButton}
          />
        </fieldset>
        <div className='divider lg:divider-horizontal' />
        <div
          className='divider lg:divider-horizontal'
          style={{
            marginLeft: 'auto',
          }}
        />
        <ColorFilter
          generalLabel={t['color-filter']['general-label']}
          colors={testProductColors}
          selectedColorKey={selectedColorKey}
          onColorClicked={handleClickOnColor}
        />
      </form>
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
    </div>
  );
};

export default ProductGrid;
