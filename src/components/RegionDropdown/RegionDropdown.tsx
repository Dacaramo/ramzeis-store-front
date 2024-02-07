import Link from 'next/link';
import { FC, ReactNode } from 'react';
interface Props {
  placeholder: ReactNode;
  options: Array<{ text: string; href: string }>;
}

const RegionDropdown: FC<Props> = ({ placeholder, options }) => {
  return (
    <div className='dropdown dropdown-bottom dropdown-end dropdown-hover'>
      <div
        tabIndex={0}
        role='button'
        className='btn btn-sm max-w-[280px] font-normal bg-base-200'
      >
        {placeholder}
      </div>
      <ul
        tabIndex={0}
        className='dropdown-content z-[1] menu p-2 max-w-[280px] bg-base-100 rounded-box shadow-classic-sm'
      >
        {options.map((opt) => {
          return (
            <li key={opt.text}>
              <Link href={opt.href}>{opt.text}</Link>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default RegionDropdown;
