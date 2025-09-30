import Title from '@/app/components/common/Title'
import Birthday from '@/app/components/dashboard/birthday/Birthday'
import RiyadAssalihin from '@/app/components/dashboard/riyadAssalihin/RiyadAssalihin'
import React from 'react'

function HomePage() {
  return (
    <>
      <div className='bg-(--color-primary) h-full'>
        <Title title='home' bg='bg-blue-200'/>
        <RiyadAssalihin />
        <Birthday />
      </div>
    </>
  )
}

export default HomePage
