'use client';

import { FC, useEffect, useState } from 'react';
import DarkIcon from '../icons/DarkIcon';
import LightIcon from '../icons/LightIcon';
import { ColorTheme } from '@/src/constants/colors';
import { themeChangeEvent } from '@/src/events/themeEvents';

interface Props {}

const ThemeButton: FC<Props> = () => {
  const [theme, setTheme] = useState<ColorTheme>('fantasy');

  const handleClick = () => {
    setTheme((prevTheme) => {
      return prevTheme === 'fantasy' ? 'night' : 'fantasy';
    });
  };

  useEffect(() => {
    document.querySelector('html')?.setAttribute('data-theme', theme);
    window.dispatchEvent(themeChangeEvent);
  }, [theme]);

  return (
    <button
      className='btn btn-sm btn-circle'
      data-toggle-theme='fantasy,night'
      data-act-class='ACTIVECLASS'
    >
      <label className='w-full h-full swap swap-rotate text-xl'>
        <input
          type='checkbox'
          onClick={handleClick}
        />
        <DarkIcon className='swap-off' />
        <LightIcon className='swap-on' />
      </label>
    </button>
  );
};

export default ThemeButton;
