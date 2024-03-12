'use client';

import { FC, useEffect, useState } from 'react';
import DarkIcon from '../icons/DarkIcon';
import LightIcon from '../icons/LightIcon';
import { ColorTheme } from '@/src/constants/colors';
import { themeChangeEvent } from '@/src/events/themeEvents';

interface Props {
  containerClasses?: string;
}

const ThemeButton: FC<Props> = ({ containerClasses = '' }) => {
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
      className={`btn btn-sm btn-circle ${containerClasses}`}
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
