'use client';

import { gapForBetweenFilterComponents } from '@/src/constants/classes';
import { FC, ReactNode, CSSProperties } from 'react';
import { colors } from '@/src/constants/colors';
import useTheme from '@/src/hooks/useTheme';

export interface ToggleButtonDefinition {
  key: string;
  value: ReactNode;
}

interface Props {
  containerClassName?: string;
  buttonsClassName?: string;
  buttons: Array<ToggleButtonDefinition>;
  selectedButtonKey?: string;
  onButtonClicked: (clickedButton: ToggleButtonDefinition) => void;
}

const ToggleButtonGroup: FC<Props> = ({
  containerClassName = '',
  buttonsClassName = '',
  buttons,
  selectedButtonKey,
  onButtonClicked: handleClickOnButton,
}) => {
  const getButtonStyles = (key: string): CSSProperties => {
    return {
      backgroundColor:
        key === selectedButtonKey ? colors[theme]['base-content'] : undefined,
      color: key === selectedButtonKey ? colors[theme]['base-200'] : undefined,
      borderColor:
        key === selectedButtonKey ? colors[theme]['base-content'] : undefined,
    };
  };

  const theme = useTheme([getButtonStyles]);

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
