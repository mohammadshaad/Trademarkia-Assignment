import React from 'react'

const index = () => {
  return (
    <div className='px-10 py-8 w-full flex items-start justify-center flex-col'>
      <div className='flex items-center justify-start font-gilroyBold text-grayText'>
        About {`x`} Trademarks found for "{`y`}"
      </div>
      <hr className='w-full border-[1px] my-6' />
      <div className='flex items-center justify-start gap-4 font-gilroyBold text-grayText'>
        Also try searching for 
        <div className='bg-tertiary px-6 py-1 border border-secondary text-secondary rounded-xl'>
          {` y`}
        </div>
      </div>
    </div>
  )
}

export default index
