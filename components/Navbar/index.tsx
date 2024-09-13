import Image from 'next/image'
import React from 'react'
import logo from '@/public/logos/logo.svg'
import search from '@/public/icons/search.svg'

const index = () => {
  return (
    <div className='bg-[#F8FAFE] border-b-4 border-[#EAF1FF] w-full flex items-center justify-start gap-6'>
      <div className='py-8 px-14'>
        <Image src={logo} alt="Logo" className="w-40" />
      </div>

      <div className='p-2'>
        <input
          type="text"
          className="border border-[#D4D4D4] rounded-xl p-2 w-[454.79px]"
        />
        <button className="bg-primary text-white rounded-full p-2 ml-2">
          
          Search
        </button>
      </div>
    </div>
  )
}

export default index
