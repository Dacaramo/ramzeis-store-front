'use client';

import {
  FC,
  useState,
  useRef,
  ChangeEvent as ReactChangeEvent,
  MouseEvent as ReactMouseEvent,
  KeyboardEvent as ReactKeyboardEvent,
} from 'react';
import MagnifierIcon from '../icons/MagnifierIcon';
import Link from 'next/link';

interface Props {
  placeholder: string;
}

const SearchBar: FC<Props> = ({ placeholder }) => {
  const [search, setSearch] = useState<string>('');
  const [isLinkHovered, setIsLinkHovered] = useState<boolean>(false);

  const linkRef = useRef<HTMLAnchorElement | null>(null);

  const handleChangeOnInput = (e: ReactChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  };

  const handleKeyDownOnInput = (e: ReactKeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && search !== '') {
      linkRef.current?.click();
      setSearch('');
    }
  };

  const handleClickOnLink = (e: ReactMouseEvent<HTMLAnchorElement>) => {
    setSearch('');
  };

  const handleMouseEnterOnLink = (e: ReactMouseEvent<HTMLAnchorElement>) => {
    setIsLinkHovered(true);
  };

  const handleMouseLeaveOnLink = (e: ReactMouseEvent<HTMLAnchorElement>) => {
    setIsLinkHovered(false);
  };

  return (
    <div className='relative text-tiny'>
      <input
        className='input input-sm pr-[100px] w-[250px] hover:w-[280px] focus:w-[280px] transition-all bg-base-200 outline-none'
        style={{
          paddingRight: 26,
          width: isLinkHovered ? 280 : undefined,
        }}
        type='text'
        placeholder={placeholder}
        value={search}
        onChange={handleChangeOnInput}
        onKeyDown={handleKeyDownOnInput}
      />
      <Link
        ref={linkRef}
        href={`/products?search=${encodeURIComponent(search)}`}
        style={search === '' ? { pointerEvents: 'none' } : undefined}
        onClick={handleClickOnLink}
        onMouseEnter={handleMouseEnterOnLink}
        onMouseLeave={handleMouseLeaveOnLink}
      >
        <MagnifierIcon className='absolute top-[0.5rem] right-sm-control-padding text-base-content hover:text-secondary transition-all' />
      </Link>
    </div>
  );
};

export default SearchBar;
