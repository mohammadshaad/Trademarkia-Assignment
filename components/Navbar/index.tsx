import Image from 'next/image';
import React from 'react';
import logo from '@/public/logos/logo.svg';
import search from '@/public/icons/search.svg';

const Navbar = () => {
  return (
    <div className='bg-[#F8FAFE] border-b-4 border-[#EAF1FF] w-full flex items-center justify-start gap-6'>
      <div className='py-8 px-14'>
        <Image src={logo} alt="Logo" className="w-40" />
      </div>

      <div className='flex items-center justify-center gap-2'>
        <div className='flex items-center justify-center p-2 border border-[#D4D4D4] rounded-xl px-4 py-2 md:w-[600px]'>
          <div className='p-1'>
            <Image src={search} alt="Search" className='w-7' />
          </div>
          <input
            type="text"
            placeholder='Search Trademark Here eg. Mickey Mouse '
            className="w-full bg-transparent outline-none text-lg ml-2 gilroy-regular placeholder:text-[#636363] placeholder:text-sm font-medium"
          />
        </div>
        <button className="font-gilroySemibold bg-primary hover:bg-blue-900 transition-all duration-200 font-bold text-sm text-white rounded-xl px-10 py-4 ml-2 gilroy-bold">
          Search
        </button>
      </div>
    </div>
  );
};

export default Navbar;
