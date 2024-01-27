'use client';

import { gapForBetweenFilterComponents } from '@/src/constants/classes';
import { FC, ReactNode, CSSProperties, useEffect, useState, ComponentProps } from 'react';
import { ColorTheme } from '@/src/constants/colors';
import { colors } from '@/src/constants/colors';

export interface ToggleButtonDefinition  { key: string; value: ReactNode }

interface Props {
  containerClassName?: string;
  buttonsClassName?: string;
  buttons: Array<ToggleButtonDefinition>;
  selectedKey?: string;
  onButtonClicked: (clickedButton: ToggleButtonDefinition) => void;
}

const ToggleButtonGroup: FC<Props> = ({
  containerClassName = '',
  buttonsClassName = '',
  buttons,
  selectedKey,
  onButtonClicked: handleClickOnButton,
}) => {
  const [theme, setTheme] = useState<ColorTheme>('fantasy');

  const getButtonStyles = (key: string): CSSProperties => {
    return {
      backgroundColor:
        key === selectedKey ? colors[theme]['base-content'] : undefined,
      color: key === selectedKey ? colors[theme]['base-200'] : undefined,
      borderColor:
        key === selectedKey ? colors[theme]['base-content'] : undefined,
    };
  };

  useEffect(() => {
    const themeFromDocument =
      (document
        .querySelector('html')
        ?.getAttribute('data-theme') as ColorTheme) ?? 'fantasy';
    setTheme(themeFromDocument);
  }, [getButtonStyles]);

  useEffect(() => {
    const handleThemeChange = () => {
      const newTheme =
        (document
          .querySelector('html')
          ?.getAttribute('data-theme') as ColorTheme) ?? 'fantasy';
      setTheme(newTheme);
    };

    window.addEventListener('theme-change-event', handleThemeChange);

    return () => {
      window.removeEventListener('theme-change-event', handleThemeChange);
    };
  }, []);

  return (
    <div
      className={`w-full flex flex-row flex-wrap ${gapForBetweenFilterComponents} ${containerClassName}`}
    >
      {buttons.map((button) => {
        return (
          <button
            type='button'
            className={`flex-1 max-h-sm-control-height btn btn-sm text-xs ${buttonsClassName}`}
            style={getButtonStyles(button.key)}
            onClick={() => handleClickOnButton(button)}
          >
            {button.value}
          </button>
        );
      })}
    </div>
  );
};

export default ToggleButtonGroup;
