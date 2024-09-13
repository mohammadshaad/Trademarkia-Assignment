import React from 'react'
import Image from 'next/image'
import filter from '@/public/icons/filter.svg'
import share from '@/public/icons/share.svg'
import sort from '@/public/icons/sort.svg'

const index = () => {
  return (
    <div className='px-10 py-8 w-full flex items-start justify-center flex-col'>
      <div className='flex items-center justify-start font-gilroyBold text-grayText'>
        About {`x`} Trademarks found for &quot;{`y`}&quot;
      </div>
      <hr className='w-full border-[1px] my-6' />
      <div className='flex items-center justify-between w-full'>
        <div className='flex items-center justify-start gap-4 font-gilroyBold text-grayText'>
          Also try searching for
          <div className='bg-tertiary px-6 py-1 border border-secondary text-secondary rounded-xl'>
            {`y`}
          </div>
        </div>
        <div className='flex items-center justify-center gap-4'>
          <div className='flex gap-1 items-center justify-center text-xs font-gilroyMedium text-[#575757] border border-[#C8C8C8] rounded-xl px-5 py-3 cursor-pointer'>
            <Image src={filter} className='w-[18px]' alt='' />
            Filter
          </div>
          <div className='rounded-full border border-[#C8C8C8] p-3 cursor-pointer'>
            <Image src={share} className='w-[16px]' alt='' />
          </div>
          <div className='rounded-full border border-[#C8C8C8] p-3 cursor-pointer'>
            <Image src={sort} className='w-[16px]' alt='' />
          </div>
        </div>
      </div>
    </div>
  )
}

export default index
