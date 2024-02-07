import Link from 'next/link';
import { FC, ReactNode } from 'react';
import testProductCategories from '@/src/data/testProductCategories';

interface Props {
  placeholder: ReactNode;
}

const CategoryDropdown: FC<Props> = ({ placeholder }) => {
  return (
    <div className='dropdown dropdown-hover'>
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
        {testProductCategories.map((category) => {
          return (
            <>
              <li key={category.id}>
                <Link
                  href={category.href}
                  className='font-bold'
                >
                  {category.name}
                </Link>
              </li>
              {category.subcategories.map((subcategory) => {
                return (
                  <li key={subcategory.id}>
                    <Link href={subcategory.href}>{subcategory.name}</Link>
                  </li>
                );
              })}
            </>
          );
        })}
      </ul>
    </div>
  );
};

export default CategoryDropdown;
