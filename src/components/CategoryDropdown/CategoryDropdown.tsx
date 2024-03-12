'use client';

import Link from 'next/link';
import { FC, ReactNode, useState, useRef } from 'react';
import testProductCategories from '@/src/data/testProductCategories';
import cn from 'classnames';

interface Props {
  placeholder: ReactNode;
}

const CategoryDropdown: FC<Props> = ({ placeholder }) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const handleClickOnCategory = () => {
    setIsOpen(false);
  };

  return (
    <div className={'dropdown dropdown-hover'}>
      <div
        tabIndex={0}
        role='button'
        className='btn btn-sm max-w-[280px] font-normal bg-base-200'
        onMouseOver={() => setIsOpen(true)}
      >
        {placeholder}
      </div>
      <ul
        tabIndex={0}
        className={cn({
          'dropdown-content z-[1] menu p-2 max-w-[280px] bg-base-100 rounded-box shadow-classic-sm':
            true,
          hidden: !isOpen,
        })}
      >
        {testProductCategories.map((category) => {
          return (
            <>
              <li
                key={category.id}
                onClick={handleClickOnCategory}
              >
                <Link
                  href={category.href}
                  className='font-bold'
                >
                  {category.name}
                </Link>
              </li>
              {category.subcategories.map((subcategory) => {
                return (
                  <li
                    key={subcategory.id}
                    onClick={handleClickOnCategory}
                  >
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
