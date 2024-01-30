import { useState, useEffect, DependencyList } from 'react';
import { ColorTheme } from '../constants/colors';

const useTheme = (deps: DependencyList) => {
  const [theme, setTheme] = useState<ColorTheme>('fantasy');

  useEffect(() => {
    const themeFromDocument =
      (document
        .querySelector('html')
        ?.getAttribute('data-theme') as ColorTheme) ?? 'fantasy';
    setTheme(themeFromDocument);
  }, deps);

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

  return theme;
};

export default useTheme;
