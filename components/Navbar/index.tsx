import Image from 'next/image';
import React, { useState } from 'react';
import logo from '@/public/logos/logo.svg';
import search from '@/public/icons/search.svg';
import Link from 'next/link';

const Navbar = () => {
  const [query, setQuery] = useState(''); 

  const handleSearch = async () => {

    const data = {
      input_query: query,
      input_query_type: "",
      sort_by: "default",
      status: [],
      exact_match: false,
      date_query: false,
      owners: [],
      attorneys: [],
      law_firms: [],
      mark_description_description: [],
      classes: [],
      page: 1,
      rows: 10,
      sort_order: "desc",
      states: [],
      counties: []
    };

    try {
      const response = await fetch('https://vit-tm-task.api.trademarkia.app/api/v3/us', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      const result = await response.json();
      console.log('Search Results:', result);
    } catch (error) {
      console.error('Error during search:', error);
    }
  };

  return (
    <div className='bg-[#F8FAFE] border-b-4 border-[#EAF1FF] w-full flex items-center justify-start gap-6'>
      <div className='py-8 px-14'>
        <Image src={logo} alt="Logo" className="w-40" />
      </div>

      <div className='flex items-center justify-center gap-2'>
        <div className='flex items-center justify-center p-2 border border-[#D4D4D4] rounded-xl px-4 py-2 md:w-[600px]'>
          <Link href="/" className='p-1'>
            <Image src={search} alt="Search" className='w-7' />
          </Link>
          <input
            type="text"
            placeholder='Search Trademark Here eg. Mickey Mouse '
            className="w-full bg-transparent outline-none text-lg ml-2 gilroy-regular placeholder:text-[#636363] placeholder:text-sm font-medium"
            value={query}
            onChange={(e) => setQuery(e.target.value)} 
          />
        </div>
        <button
          onClick={handleSearch} 
          className="font-gilroySemibold bg-primary hover:bg-blue-900 transition-all duration-200 font-bold text-sm text-white rounded-xl px-10 py-4 ml-2 gilroy-bold"
        >
          Search
        </button>
      </div>
    </div>
  );
};

export default Navbar;
