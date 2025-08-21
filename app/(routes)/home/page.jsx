import Birthday from '@/app/components/birthday/Birthday'
import RiyadAssalihin from '@/app/components/riyadAssalihin/RiyadAssalihin'
import React from 'react'

function Home() {
  return (
    <>
      <div>
        <h1 className='lg:text-4xl md:text-3xl text-2xl bg-blue-200 p-6'>home</h1>
        <RiyadAssalihin />
        <Birthday />
      </div>
    </>
  )
}

export default Home
