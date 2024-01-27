export const BASE_200 = '#e8e8e8';
export const BASE_300 = '#d1d1d1';
export const BASE_CONTENT = '#1f2937';

export type ColorName =
  | 'primary'
  | 'primary-content'
  | 'secondary'
  | 'secondary-content'
  | 'accent'
  | 'accent-content'
  | 'neutral'
  | 'neutral-content'
  | 'base-100'
  | 'base-200'
  | 'base-300'
  | 'base-content'
  | 'info'
  | 'info-content'
  | 'success'
  | 'success-content'
  | 'warning'
  | 'warning-content'
  | 'error'
  | 'error-content';

export type ColorTheme = 'fantasy' | 'night';

export const colors: Record<ColorTheme, Record<ColorName, `#${string}`>> = {
  fantasy: {
    primary: '#6d0076',
    'primary-content': '#e3cee4',
    secondary: '#0075c2',
    'secondary-content': '#cee4f5',
    accent: '#ff8600',
    'accent-content': '#180600',
    neutral: '#1f2937',
    'neutral-content': '#cdd0d3',
    'base-100': '#ffffff',
    'base-200': '#e8e8e8',
    'base-300': '#d1d1d1',
    'base-content': '#1f2937',
    info: '#00b5ff',
    'info-content': '#000000',
    success: '#00a96e',
    'success-content': '#000000',
    warning: '#ffbe00',
    'warning-content': '#000000',
    error: '#ff5861',
    'error-content': '#000000',
  },
  night: {
    primary: '#38bdf8',
    'primary-content': '#010d15',
    secondary: '#818cf8',
    'secondary-content': '#060715',
    accent: '#f471b5',
    'accent-content': '#14040c',
    neutral: '#1e293b',
    'neutral-content': '#cdd0d5',
    'base-100': '#0f172a',
    'base-200': '#0c1425',
    'base-300': '#0a1120',
    'base-content': '#c8cbd0',
    info: '#0ca5e9',
    'info-content': '#000000',
    success: '#2dd4bf',
    'success-content': '#01100d',
    warning: '#f4bf50',
    'warning-content': '#140d02',
    error: '#fb7085',
    'error-content': '#150406',
  },
};
