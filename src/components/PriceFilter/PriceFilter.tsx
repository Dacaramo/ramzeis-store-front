'use client';

import { FC, useMemo } from 'react';
import { Slider, SliderValueChangeDetails } from '@ark-ui/react';
import ToggleButtonGroup, {
  ToggleButtonDefinition,
} from '../ToggleButtonGroup/ToggleButtonGroup';
import { gapForBetweenFilterComponents } from '@/src/constants/classes';

interface Props {
  generalLabel: string;
  minAllowedPrice: number;
  maxAllowedPrice: number;
  readyToClickRanges: Array<Array<number>>;
  priceRangeValue: Array<number>;
  onPriceRangeValueChange: (details: SliderValueChangeDetails) => void;
  onToggleButtonClick: (clickedButton: ToggleButtonDefinition) => void;
}

const PriceFilter: FC<Props> = ({
  onPriceRangeValueChange: handlePriceRangeValueChange,
  onToggleButtonClick: handleClickOnToggleButton,
  ...p
}) => {
  const readyToClickRangeButtonDefinitions: Array<ToggleButtonDefinition> =
    useMemo(() => {
      return p.readyToClickRanges.map((range) => {
        return {
          key: JSON.stringify(range),
          value: `$${range[0]} - $${range[1]}`,
        };
      });
    }, []);

  return (
    <fieldset
      className={`sm:w-[280px] w-full flex flex-col items-start text-tiny ${gapForBetweenFilterComponents}`}
    >
      <Slider.Root
        className='w-full flex flex-col gap-2'
        min={p.minAllowedPrice}
        max={p.maxAllowedPrice}
        minStepsBetweenThumbs={20}
        defaultValue={[p.minAllowedPrice, p.maxAllowedPrice]}
        value={p.priceRangeValue}
        onValueChange={handlePriceRangeValueChange}
      >
        <div className='w-full flex flex-row justify-between'>
          <span>{p.generalLabel}</span>
          <span>{`$${p.priceRangeValue[0]} - $${p.priceRangeValue[1]}`}</span>
        </div>
        <Slider.Control>
          <Slider.Track className='flex-1 h-[5px] rounded-full bg-base-200'>
            <Slider.Range className='h-full rounded-full bg-secondary' />
          </Slider.Track>
          <Slider.Thumb
            className='bg-base-content w-[12px] h-[12px] rounded-full cursor-grabbing'
            key={0}
            index={0}
          />
          <Slider.Thumb
            className='bg-base-content w-[12px] h-[12px] rounded-full cursor-grabbing'
            key={1}
            index={1}
          />
        </Slider.Control>
      </Slider.Root>
      <ToggleButtonGroup
        containerClassName='mt-[3.5px]'
        buttonsClassName='basis-[75px]'
        buttons={readyToClickRangeButtonDefinitions}
        selectedButtonKey={JSON.stringify(p.priceRangeValue)}
        onButtonClicked={handleClickOnToggleButton}
      />
    </fieldset>
  );
};

export default PriceFilter;
