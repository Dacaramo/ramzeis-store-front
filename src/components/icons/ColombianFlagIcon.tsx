import * as React from 'react';
import { SVGProps, memo } from 'react';
const SvgComponent = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns='http://www.w3.org/2000/svg'
    width='1em'
    height='1em'
    aria-hidden='true'
    className='iconify iconify--emojione'
    viewBox='0 0 64 64'
    {...props}
  >
    <path
      fill='#2a5f9e'
      d='M62 32H2c0 5.5 1.5 10.6 4 15h52c2.6-4.4 4-9.5 4-15'
    />
    <path
      fill='#ffe62e'
      d='M32 2C15.5 2 2 15.4 2 32h60C62 15.4 48.6 2 32 2z'
    />
    <path
      fill='#ed4c5c'
      d='M32 62c11.1 0 20.8-6 26-15H6c5.3 9 14.9 15 26 15'
    />
  </svg>
);
const ColombianFlagIcon = memo(SvgComponent);
export default ColombianFlagIcon;
