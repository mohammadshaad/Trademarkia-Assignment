import Image from 'next/image';
import React, { useState } from 'react';
import logo from '@/public/logos/logo.svg';
import search from '@/public/icons/search.svg';
import Link from 'next/link';
import { SearchResult } from '@/types/SearchResult';
import { ApiResponseItem } from '@/types/ApiResponseItem';
import { format, fromUnixTime } from 'date-fns';

interface AggregationItem {
  name: string;
  name_cleaned: string;
  count: number;
}

interface NavbarProps {
  onSearch: (query: string) => void;
}

const Navbar: React.FC<NavbarProps> = ({ onSearch }) => {
  const [query, setQuery] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSearch = async () => {
    setLoading(true);
    setError(null);

    try {
      await onSearch(query);
    } catch (error) {
      if (error instanceof Error) {
        setError(error.message);
      } else {
        setError('An unknown error occurred');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className='bg-[#F8FAFE] border-b-4 border-[#EAF1FF] w-full flex md:flex-row flex-col items-center justify-start gap-6'>
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
          disabled={loading}
        >
          {loading ? 'Loading...' : 'Search'}
        </button>
      </div>

      {error && (
        <div className="text-red-500 mt-4">
          Error: {error}
        </div>
      )}
    </div>
  );
};

export default Navbar;
