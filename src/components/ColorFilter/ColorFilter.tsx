'use client';

import { ProductColor } from '@/src/model/Product';
import { CSSProperties, FC } from 'react';
import CheckIcon from '../icons/CheckIcon';
import { gapForBetweenFilterComponents } from '@/src/constants/classes';

interface Props {
  generalLabel: string;
  colors: Array<ProductColor>;
  selectedColorKey?: string;
  onColorClicked: (clickedColor: ProductColor) => void;
}

const ColorFilter: FC<Props> = ({
  generalLabel,
  colors,
  selectedColorKey,
  onColorClicked: handleClickOnColor,
}) => {
  const getStyles = (hexCode: ProductColor['hexCode']): CSSProperties => {
    return {
      backgroundColor: hexCode,
    };
  };

  return (
    <fieldset
      className={`max-w-[280px] flex flex-col ${gapForBetweenFilterComponents}`}
    >
      <span>{generalLabel}</span>
      <div className={`w-full flex flex-row ${gapForBetweenFilterComponents}`}>
        {colors.map((color) => {
          return (
            <button
              key={color.id}
              type='button'
              className='relative btn btn-sm p-0 w-[20px] border-base-content hover:border-base-content'
              style={getStyles(color.hexCode)}
              onClick={() => handleClickOnColor(color)}
            >
              {color.id === selectedColorKey && (
                <div className='absolute left-[-1px] bottom-[-1px] w-[20px] h-[50%] flex justify-center items-center bg-base-content border-base-content rounded-b-[0.5rem]'>
                  <CheckIcon className='text-base-200' />
                </div>
              )}
            </button>
          );
        })}
      </div>
    </fieldset>
  );
};

export default ColorFilter;
