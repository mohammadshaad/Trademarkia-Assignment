import React, { useState, useEffect } from 'react';
import { Checkbox } from "@/components/ui/checkbox";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Image from 'next/image';
import searchIcon from '@/public/icons/search.svg';
import { SideFilterProps } from '@/types/SideFilterProps';

const statusOptions = [
  { label: 'All', value: 'all' },
  { label: 'Registered', value: 'registered' },
  { label: 'Pending', value: 'pending' },
  { label: 'Abandoned', value: 'abandoned' },
  { label: 'Others', value: 'other' },
];

const SideFilter: React.FC<SideFilterProps> = ({ owners, lawFirms, attorneys, onFilterChange, onViewChange }) => {
  const [selectedOption, setSelectedOption] = useState('Owners');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedFilters, setSelectedFilters] = useState<{ [key: string]: string[] }>({
    Owners: [],
    LawFirms: [],
    Attorneys: [],
    Status: []
  });

  useEffect(() => {
    onFilterChange(selectedFilters);
  }, [selectedFilters, onFilterChange]);

  const filterOptions = selectedOption === 'Owners'
    ? owners
    : selectedOption === 'Law Firms'
      ? lawFirms
      : attorneys;

  const handleCheckboxChange = (name: string) => {
    setSelectedFilters(prevFilters => {
      const updatedFilters = {
        ...prevFilters,
        [selectedOption]: prevFilters[selectedOption]?.includes(name)
          ? prevFilters[selectedOption].filter(filter => filter !== name)
          : [...(prevFilters[selectedOption] || []), name],
      };
      return updatedFilters;
    });
  };

  const handleStatusChange = (status: string) => {
    setSelectedFilters(prevFilters => {
      if (status === 'all') {
        return {
          ...prevFilters,
          Status: ['all'],
        };
      } else {
        const updatedStatus = prevFilters.Status.includes('all')
          ? [status]
          : prevFilters.Status.includes(status)
            ? prevFilters.Status.filter(item => item !== status)
            : [...prevFilters.Status, status];

        return {
          ...prevFilters,
          Status: updatedStatus,
        };
      }
    });
  };

  const filteredOptions = filterOptions.filter(option =>
    option.name_cleaned.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className='flex items-center justify-start w-full md:w-1/4 flex-col gap-2'>
      <div className='flex items-start justify-center flex-col gap-1 side-filter-shadow p-4 w-full rounded-2xl'>
        <div className='text-base font-gilroyBold text-textBlack'>Status</div>
        <div className='font-gilroySemibold text-base flex items-center justify-start gap-2 flex-wrap'>
          {statusOptions.map(({ label, value }) => (
            <div
              key={`${label}-${value}`}
              onClick={() => handleStatusChange(value)}
              className={`flex items-center justify-center gap-1 border px-4 py-2 rounded-2xl cursor-pointer ${selectedFilters.Status.includes(value)
                ? 'bg-[#EEF4FF] border-[#4380EC]'
                : 'border-[#D1D1D1]'
                }`}
            >
              <div
                className={`rounded-full w-2 h-2 ${value === 'registered' ? 'bg-[#52B649]' :
                  value === 'pending' ? 'bg-[#edab2c]' :
                    value === 'abandoned' ? 'bg-[#EC3C3C]' :
                      value === 'other' ? 'bg-[#4380EC]' :
                        'bg-[#D1D1D1]'
                  }`}
              ></div>
              {label}
            </div>
          ))}
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
            {filteredOptions.map((option, index) => (
              <div key={`${option}-${index}`} className="flex items-center space-x-2">
                <Checkbox
                  id={option.name_cleaned}
                  checked={selectedFilters[selectedOption]?.includes(option.name_cleaned) || false}
                  onCheckedChange={() => handleCheckboxChange(option.name_cleaned)}
                />
                <label htmlFor={option.name_cleaned} className="text-sm text-[#313131] font-medium leading-none">
                  {option.name_cleaned} ({option.count})
                </label>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className='mt-4 flex items-center justify-center flex-col gap-1 side-filter-shadow p-4 w-full rounded-2xl'>
        <div className='flex items-center justify-start w-full font-gilroyBold'>Display</div>
        <div className='flex items-center justify-center w-full'>
          <Tabs defaultValue="list" className="w-full font-gilroyBold">
            <TabsList>
              <TabsTrigger
                value="list"
                onClick={() => onViewChange('list')}
              >
                List View
              </TabsTrigger>
              <TabsTrigger
                value="grid"
                onClick={() => onViewChange('grid')}
              >
                Grid View
              </TabsTrigger>

            </TabsList>
          </Tabs>
        </div>
      </div>
    </div>
  );
};

export default SideFilter;
