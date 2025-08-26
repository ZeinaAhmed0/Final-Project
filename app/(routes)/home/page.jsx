import Birthday from '@/app/pages/birthday/Birthday'
import RiyadAssalihin from '@/app/pages/riyadAssalihin/RiyadAssalihin'
import React from 'react'

function HomePage() {
  return (
    <>
      <div className='bg-sky-700'>
        <h1 className='lg:text-4xl md:text-3xl text-2xl bg-blue-200 p-6'>home</h1>
        <RiyadAssalihin />
        <Birthday />
      </div>
    </>
  )
}

export default HomePage
