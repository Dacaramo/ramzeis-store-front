'use client';

import { CSSProperties, FC, useEffect, useRef, useState } from 'react';

import useElementRect from '@/src/hooks/useElementRect';
import {
  CountryIso2,
  FlagImage,
  defaultCountries,
  parseCountry,
} from 'react-international-phone';
import ArrowDownIcon from '../icons/ArrowDownIcon';

interface Props {
  value: CountryIso2;
  onValueChange: (selectedValue: CountryIso2) => void;
  style?: CSSProperties;
}

const CountryCodeDropdown: FC<Props> = ({
  value,
  onValueChange: handleChange,
  style,
}) => {
  const [areOptionsVisible, setAreOptionsVisible] = useState<boolean>(false);

  const buttonRef = useRef<HTMLButtonElement | null>(null);
  const ulRef = useRef<HTMLUListElement | null>(null);

  const ulRect = useElementRect(ulRef);

  const handleClickOnCountryCode = (selectedValue: CountryIso2) => {
    handleChange(selectedValue);
    setAreOptionsVisible(false);
  };

  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if (!buttonRef.current || !ulRef.current) {
        return;
      }

      if (
        areOptionsVisible &&
        !buttonRef.current.contains(e.target as Node) &&
        !ulRef.current.contains(e.target as Node)
      ) {
        setAreOptionsVisible(false);
      }
    };

    window.addEventListener('mousedown', handleClick);

    return () => {
      window.removeEventListener('mousedown', handleClick);
    };
  }, [areOptionsVisible]);

  return (
    <div className={`relative min-w-[75px] flex justify-center items-center`}>
      <button
        type='button'
        ref={buttonRef}
        style={style}
        className='btn btn-sm flex flex-row font-normal bg-base-200 rounded-r-none'
        onClick={() => setAreOptionsVisible((prev) => !prev)}
      >
        <FlagImage iso2={value} />
        <ArrowDownIcon />
      </button>
      <ul
        ref={ulRef}
        className='absolute left-0 z-10 p-sm-control-padding w-[254px] h-[254px] overflow-y-auto flex flex-col items-stretch rounded-md bg-base-100 shadow-classic-sm'
        style={{
          visibility: areOptionsVisible ? 'visible' : 'hidden',
          ...(ulRect ? { bottom: -ulRect.height } : {}),
        }}
      >
        {defaultCountries.map((country) => {
          const parsedCountry = parseCountry(country);
          return (
            <button
              type='button'
              role='listitem'
              key={parsedCountry.iso2}
              className={
                'btn btn-sm btn-ghost font-normal flex flex-row justify-start'
              }
              onClick={() => handleClickOnCountryCode(parsedCountry.iso2)}
            >
              <FlagImage iso2={parsedCountry.iso2} />
              {`(+${parsedCountry.dialCode})`}
            </button>
          );
        })}
      </ul>
    </div>
  );
};

export default CountryCodeDropdown;
