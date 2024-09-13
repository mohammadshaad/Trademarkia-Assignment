import Image from 'next/image'
import React from 'react'
import logo from '@/public/logos/logo.svg'

const index = () => {
  return (
    <div>
      <Image src={logo} alt="Logo" className="w-40" />
    </div>
  )
}

export default index
