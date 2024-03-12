import { gapForBetweenSectionsClasses } from '@/src/constants/classes';
import React from 'react';

const loading = () => {
  return (
    <div className='w-full flex flex-col gap-4'>
      <div className='flex sm:flex-row flex-col sm:justify-between items-center gap-2'>
        <div className='skeleton h-[30px] w-[120px]' />
        <div className='skeleton h-[32px] w-[120px]' />
      </div>
      <div className='skeleton h-[20px] w-full' />
      <ul
        className={`grid grid-cols-[repeat(auto-fill,minmax(280px,1fr))] sm:grid-cols-[repeat(auto-fill,minmax(300px,1fr))] ${gapForBetweenSectionsClasses}`}
      >
        {[...new Array(5)].map((_, i) => {
          return (
            <li
              key={i}
              className='skeleton h-[200px] w-[280px]'
            />
          );
        })}
      </ul>
    </div>
  );
};

export default loading;
