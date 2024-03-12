import * as React from 'react';
import { SVGProps, memo } from 'react';
const SvgComponent = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns='http://www.w3.org/2000/svg'
    viewBox='0 0 256 512'
    width='1em'
    height='1em'
    fill='currentColor'
    {...props}
  >
    <path d='M9.4 278.6c-12.5-12.5-12.5-32.8 0-45.3l128-128c9.2-9.2 22.9-11.9 34.9-6.9s19.8 16.6 19.8 29.6v256c0 12.9-7.8 24.6-19.8 29.6s-25.7 2.2-34.9-6.9l-128-128z' />
  </svg>
);
const CaretLeftIcon = memo(SvgComponent);
export default CaretLeftIcon;
