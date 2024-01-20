import Link from 'next/link';
import { FC, ReactNode } from 'react';
interface Props {
  placeholder: ReactNode;
  options: Array<{ text: string; href: string }>;
}

const RegionDropdown: FC<Props> = ({ placeholder, options }) => {
  return (
    <details className='dropdown dropdown-bottom dropdown-end'>
      <summary
        tabIndex={0}
        role='button'
        className='btn btn-sm font-normal bg-base-200'
      >
        {placeholder}
      </summary>
      <ul
        tabIndex={0}
        className='dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-52'
      >
        {options.map((opt) => {
          return (
            <li key={opt.text}>
              <Link href={opt.href}>{opt.text}</Link>
            </li>
          );
        })}
      </ul>
    </details>
  );
};

export default RegionDropdown;
