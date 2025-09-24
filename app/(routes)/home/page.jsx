import Title from '@/app/components/common/Title'
import Birthday from '@/app/components/dashboard/birthday/Birthday'
import RiyadAssalihin from '@/app/components/riyadAssalihin/RiyadAssalihin'
import React from 'react'

function HomePage() {
  return (
    <>
      <div className='bg-sky-700'>
        <Title title='home' bg='bg-blue-200'/>
        <RiyadAssalihin />
        <Birthday />
      </div>
    </>
  )
}

export default HomePage
