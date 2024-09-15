import React, { useState } from 'react';
import Image from 'next/image';
import filter from '@/public/icons/filter.svg';
import share from '@/public/icons/share.svg';
import sort from '@/public/icons/sort.svg';

interface TopFilterProps {
  onFilterClick: () => void;
  isSideFilterVisible: boolean;
  searchQuery: string;
  resultsCount: number;
  onSortChange: (order: string) => void; // Add onSortChange prop
}

const TopFilter: React.FC<TopFilterProps> = ({ onFilterClick, isSideFilterVisible, searchQuery, resultsCount, onSortChange }) => {

  const [order, setOrder] = useState<string>('default');

  const handleShareClick = () => {
    const url = window.location.href;
    const input = document.createElement('input');
    input.value = url;
    document.body.appendChild(input);
    input.select();
    document.execCommand('copy');
    document.body.removeChild(input);
    alert('Link copied to clipboard!');
  };

  // Function to handle sort click
  const handleSortClick = () => {
    const newOrder = order === 'asc' ? 'desc' : 'asc';
    setOrder(newOrder); // Update local state
    onSortChange(newOrder); // Notify parent component
  };

  return (
    <div className='px-10 py-8 w-full flex items-start justify-center flex-col'>
      <div className='flex items-center justify-start font-gilroyBold text-grayText'>
        About {resultsCount} Trademarks found for &quot;{searchQuery}&quot; {/* Display results count and search query */}
      </div>
      <hr className='w-full border-[1px] my-6' />
      <div className='flex items-center justify-between w-full'>
        <div className='flex items-center justify-start gap-4 font-gilroyBold text-grayText'>
          Also try searching for
          <div className='bg-tertiary px-6 py-1 border border-secondary text-secondary rounded-xl'>
            {searchQuery}
          </div>
        </div>
        <div className='flex items-center justify-center gap-4'>
          <div
            className={`${isSideFilterVisible ? 'bg-[#EEF4FF] !border !border-[#4380EC]  !font-gilroyBold' : ''
              } flex gap-1 items-center justify-center text-sm font-gilroyMedium text-[#575757] border border-[#C8C8C8] rounded-xl px-5 py-3 cursor-pointer`}
            onClick={onFilterClick}
          >
            <Image src={filter} className='w-[18px]' alt='' />
            Filter
          </div>
          <div
            className='rounded-full border border-[#C8C8C8] p-3 cursor-pointer'
            onClick={handleShareClick} // Attach click handler
          >
            <Image src={share} className='w-[16px]' alt='' />
          </div>
          <div className='rounded-full border border-[#C8C8C8] p-3 cursor-pointer' onClick={handleSortClick}>
            <Image src={sort} className='w-[16px]' alt='' />
          </div>
        </div>
      </div>
    </div>
  );
};

export default TopFilter;
