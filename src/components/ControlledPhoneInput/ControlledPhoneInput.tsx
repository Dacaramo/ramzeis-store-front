import { inputClasses } from '@/src/constants/classes';
import React, { CSSProperties } from 'react';
import { useController } from 'react-hook-form';
import {
  usePhoneInput,
  defaultCountries,
  CountryIso2,
} from 'react-international-phone';
import CountryCodeDropdown from '../CountryCodeDropdown/CountryCodeDropdown';

type Props = {
  control: any;
  name: string;
  style?: CSSProperties;
};

const ControlledPhoneInput: React.FC<Props> = ({ control, name, style }) => {
  const {
    field: { value, onChange, ref },
    fieldState: { error },
  } = useController({
    name,
    control,
    defaultValue: '',
  });
  const { inputValue, handlePhoneValueChange, country, setCountry } =
    usePhoneInput({
      defaultCountry: 'us',
      value,
      countries: defaultCountries,
      onChange: (data) => {
        onChange(data.phone);
      },
    });

  const handleChangeOnCountryCodeDropdown = (selectedCountry: CountryIso2) => {
    setCountry(selectedCountry);
  };

  return (
    <div className='flex flex-row gap-[1px] text-tiny'>
      <CountryCodeDropdown
        style={style}
        value={country.iso2}
        onValueChange={handleChangeOnCountryCodeDropdown}
      />
      <input
        style={style}
        className={`${inputClasses} rounded-l-none`}
        placeholder='Phone number'
        value={inputValue}
        onChange={handlePhoneValueChange}
        type='tel'
        ref={ref}
      />
    </div>
  );
};

export default ControlledPhoneInput;
