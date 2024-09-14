import React, { useState, useEffect } from 'react';
import { Checkbox } from "@/components/ui/checkbox";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { SideFilterProps } from '@/types/SideFilterProps';
import Image from 'next/image';
import searchIcon from '@/public/icons/search.svg';

const SideFilter: React.FC<SideFilterProps> = ({ owners, lawFirms, attorneys, onFilterChange }) => {
  const [selectedOption, setSelectedOption] = useState('Owners');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedFilters, setSelectedFilters] = useState<{ [key: string]: string[] }>({});

  const filterOptions = selectedOption === 'Owners'
    ? owners
    : selectedOption === 'Law Firms'
      ? lawFirms
      : attorneys;

  const handleCheckboxChange = (name: string) => {
    setSelectedFilters((prevFilters) => ({
      ...prevFilters,
      [selectedOption]: prevFilters[selectedOption]?.includes(name)
        ? prevFilters[selectedOption].filter((filter) => filter !== name)
        : [...(prevFilters[selectedOption] || []), name],
    }));
  };


  const filteredOptions = filterOptions.filter((option) =>
    option.name.toLowerCase().includes(searchQuery.toLowerCase())
  );


  useEffect(() => {
    onFilterChange(selectedFilters, searchQuery, selectedOption);
  }, [selectedFilters, searchQuery, selectedOption]);
  
  return (
    <div className='flex items-center justify-start w-1/4 flex-col gap-2'>

      <div className='flex items-center justify-center flex-col gap-1 side-filter-shadow p-4 w-full rounded-2xl'>
        <div className='flex items-start justify-center flex-col gap-2 w-full'>
          <div className='text-base font-gilroyBold text-textBlack'>Status</div>
          <div className='font-gilroySemibold text-base flex items-center justify-start gap-2 flex-wrap'>

            <div className='bg-[#EEF4FF] border border-[#4380EC] rounded-2xl px-4 py-2 text-center cursor-pointer'>All</div>
            <div className='flex items-center justify-center gap-1 border border-[#D1D1D1] px-4 py-2 rounded-2xl cursor-pointer'>
              <div className="bg-[#52B649] rounded-full w-2 h-2"></div> Registered
            </div>
            <div className='flex items-center justify-center gap-1 border border-[#D1D1D1] px-4 py-2 rounded-2xl cursor-pointer'>
              <div className="bg-[#ECC53C] rounded-full w-2 h-2"></div> Pending
            </div>
            <div className='flex items-center justify-center gap-1 border border-[#D1D1D1] px-4 py-2 rounded-2xl cursor-pointer'>
              <div className="bg-[#EC3C3C] rounded-full w-2 h-2"></div> Abandoned
            </div>
            <div className='flex items-center justify-center gap-1 border border-[#D1D1D1] px-4 py-2 rounded-2xl cursor-pointer'>
              <div className="bg-[#4380EC] rounded-full w-2 h-2"></div> Others
            </div>
          </div>
        </div>
      </div>


      <div className='flex items-center justify-center flex-col gap-1 side-filter-shadow p-4 w-full rounded-2xl'>
        <div className='flex items-start justify-center flex-col gap-4 w-full'>
          <div className='flex items-center justify-start w-full gap-4'>
            <div onClick={() => setSelectedOption('Owners')}
              className={`${selectedOption === 'Owners' ? 'font-gilroyBold underline underline-offset-8' : 'font-gilroyMedium'} cursor-pointer text-base`}>
              Owners
            </div>
            <div onClick={() => setSelectedOption('Law Firms')}
              className={`${selectedOption === 'Law Firms' ? 'font-gilroyBold underline underline-offset-8' : 'font-gilroyMedium'} cursor-pointer text-base`}>
              Law Firms
            </div>
            <div onClick={() => setSelectedOption('Attorneys')}
              className={`${selectedOption === 'Attorneys' ? 'font-gilroyBold underline underline-offset-8' : 'font-gilroyMedium'} cursor-pointer text-base`}>
              Attorneys
            </div>
          </div>


          <div className='bg-[#FCFCFE] border border-[#000000]/10 px-4 py-3 rounded-2xl w-full flex items-center gap-2'>
            <Image src={searchIcon} alt='Search Icon' className='w-8' />
            <input
              type='text'
              className='w-full focus:outline-none placeholder:text-[#313131] placeholder:text-sm placeholder:font-gilroyMedium font-gilroyMedium'
              placeholder={`Search ${selectedOption}`}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>

          <div className='flex flex-col items-start justify-center gap-2 px-2 py-1'>
            {filteredOptions.map((option) => (
              <div key={option.name} className="flex items-center space-x-2">
                <Checkbox
                  id={option.name}
                  checked={selectedFilters[selectedOption]?.includes(option.name) || false}
                  onCheckedChange={() => handleCheckboxChange(option.name)}
                />
                <label htmlFor={option.name} className="text-sm text-[#313131] font-medium leading-none">
                  {option.name} ({option.count})
                </label>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className='mt-4 flex items-center justify-center flex-col gap-1 side-filter-shadow p-4 w-full rounded-2xl'>
        <div className='flex items-center justify-start w-full font-gilroyBold'>Display</div>
        <div className='flex items-center justify-center w-full'>
          <Tabs defaultValue="grid" className="w-full font-gilroyBold">
            <TabsList>
              <TabsTrigger value="grid">Grid View</TabsTrigger>
              <TabsTrigger value="list">List View</TabsTrigger>
            </TabsList>
          </Tabs>
        </div>
      </div>
    </div>
  );
};

export default SideFilter;
