import * as React from 'react';
import { memo, SVGProps } from 'react';
const SvgComponent = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns='http://www.w3.org/2000/svg'
    viewBox='0 0 281.85 381.35'
    width='1em'
    height='1em'
    fill='none'
    strokeWidth={5}
    stroke='currentColor'
    {...props}
  >
    <path d='M49.52.38h196.03l-191.07 371h186l5 9s.02 0 0 0l-206.31.6L229.35 10.32 54.48 9.38 49.5.41s0-.04.02-.04Z' />
    <path d='M49.46.42.48 135.38l138.19 51.7 3.55-6.91L49.5.42s-.03-.01-.04 0ZM245.51 380.27l35.96-124.53s0-.04-.02-.05l-133.84-64.75s-.08.02-.06.06l97.89 189.28s.07.03.08 0Z' />
  </svg>
);
const RamzeisLogoIcon = memo(SvgComponent);
export default RamzeisLogoIcon;
