import Image from 'next/image';
import React, { useState } from 'react';
import search from '@/public/icons/search.svg';
import { Checkbox } from "@/components/ui/checkbox"

const Index = () => {
  const [selectedOption, setSelectedOption] = useState('Owners'); 

  return (
    <div className='flex items-center justify-start w-1/4 flex-col gap-2'>
      {/* Status section */}
      <div className='flex items-center justify-center flex-col gap-1 side-filter-shadow p-4 w-full rounded-2xl'>
        <div className='flex items-start justify-center flex-col gap-2 w-full'>
          <div className='text-base font-gilroyBold text-textBlack'>Status</div>
          <div className='font-gilroySemibold text-base flex items-center justify-start gap-2 flex-wrap'>
            <div className='bg-[#EEF4FF] border border-[#4380EC] rounded-2xl px-4 py-2 text-center cursor-pointer'>
              All
            </div>
            <div className='flex items-center justify-center gap-1 border border-[#D1D1D1] px-4 py-2 rounded-2xl cursor-pointer'>
              <div className="bg-[#52B649] rounded-full w-2 h-2"></div>
              Registered
            </div>
            <div className='flex items-center justify-center gap-1 border border-[#D1D1D1] px-4 py-2 rounded-2xl cursor-pointer'>
              <div className="bg-[#ECC53C] rounded-full w-2 h-2"></div>
              Pending
            </div>
            <div className='flex items-center justify-center gap-1 border border-[#D1D1D1] px-4 py-2 rounded-2xl cursor-pointer'>
              <div className="bg-[#EC3C3C] rounded-full w-2 h-2"></div>
              Abandoned
            </div>
            <div className='flex items-center justify-center gap-1 border border-[#D1D1D1] px-4 py-2 rounded-2xl cursor-pointer'>
              <div className="bg-[#4380EC] rounded-full w-2 h-2"></div>
              Others
            </div>
          </div>
        </div>
      </div>

      {/* Search Section */}
      <div className='flex items-center justify-center flex-col gap-1 side-filter-shadow p-4 w-full rounded-2xl'>
        <div className='flex items-start justify-center flex-col gap-4 w-full'>
          <div className='flex items-center justify-start w-full gap-4'>
            {/* Owners */}
            <div
              onClick={() => setSelectedOption('Owners')}
              className={`${selectedOption === 'Owners' ? 'font-gilroyBold underline underline-offset-8' : 'font-gilroyMedium'} cursor-pointer text-base`}
            >
              Owners
            </div>
            {/* Law Firms */}
            <div
              onClick={() => setSelectedOption('Law Firms')}
              className={`${selectedOption === 'Law Firms' ? 'font-gilroyBold underline underline-offset-8' : 'font-gilroyMedium'} cursor-pointer text-base`}
            >
              Law Firms
            </div>
            {/* Attorneys */}
            <div
              onClick={() => setSelectedOption('Attorneys')}
              className={`${selectedOption === 'Attorneys' ? 'font-gilroyBold underline underline-offset-8' : 'font-gilroyMedium'} cursor-pointer text-base`}
            >
              Attorneys
            </div>
          </div>

          <div className='bg-[#FCFCFE] border border-[#000000]/10 px-4 py-3 rounded-2xl w-full flex items-center gap-2'>
            <Image src={search} alt='' className='w-8' />
            <input
              type='text'
              className='w-full focus:outline-none placeholder:text-[#313131] placeholder:text-sm placeholder:font-gilroyMedium font-gilroyMedium'
              placeholder={`Search ${selectedOption || '...'}`}
            />
          </div>

          <div className='flex flex-col items-start justify-center gap-2 p-2'>
            <div className="flex items-center space-x-2">
              <Checkbox
                id="terms"
                className='w-4' />
              <label
                htmlFor="terms"
                className="text-sm text-[#4380EC] font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                Tesla, Inc.
              </label>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Index;
