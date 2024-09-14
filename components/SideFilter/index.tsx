import React from 'react'

const index = () => {
  return (
    <div className='flex items-center justify-start  w-1/4'>
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
    </div>
  )
}

export default index
