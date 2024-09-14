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
  count: number;
}

interface NavbarProps {
  onSearch: (
    result: SearchResult[],
    query: string,
    owners?: AggregationItem[],
    lawFirms?: AggregationItem[],
    attorneys?: AggregationItem[]
  ) => void;
}

const Navbar: React.FC<NavbarProps> = ({ onSearch }) => {
  const [query, setQuery] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSearch = async () => {
    setLoading(true);
    setError(null);

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

      if (!response.ok) {
        throw new Error(`Failed to fetch data: ${response.statusText}`);
      }

      const result = await response.json();

      const formattedMarkResults = result.body.hits.hits.map((item: ApiResponseItem) => ({
        name: item._source.mark_identification,
        company: item._source.current_owner,
        markId: item._source.registration_number,
        registration_date: format(fromUnixTime(item._source.registration_date), 'd MMM yyyy'),
        status_date: format(fromUnixTime(item._source.status_date), 'd MMM yyyy'),
        renewal_date: format(fromUnixTime(item._source.renewal_date), 'd MMM yyyy'),
        filing_date: format(fromUnixTime(item._source.filing_date), 'd MMM yyyy'),
        class: item._source.class_codes.join(', '),
      }));

      const owners = result.body.aggregations.current_owners?.buckets.map((bucket: { key: string; doc_count: number }) => ({
        name: bucket.key,
        count: bucket.doc_count,
      }));

      const lawFirms = result.body.aggregations.law_firms?.buckets.map((bucket: { key: string; doc_count: number }) => ({
        name: bucket.key,
        count: bucket.doc_count,
      }));

      const attorneys = result.body.aggregations.attorneys?.buckets.map((bucket: { key: string; doc_count: number }) => ({
        name: bucket.key,
        count: bucket.doc_count,
      }));

      onSearch(formattedMarkResults, query, owners, lawFirms, attorneys);
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
