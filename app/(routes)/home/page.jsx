import Title from '@/app/components/common/Title'
import Birthday from '@/app/components/dashboard/birthday/Birthday'
import RiyadhAsSaaliheen from '@/app/components/dashboard/riyadhAsSaaliheen/RiyadhAsSaaliheen'
import React from 'react'

function HomePage() {
  return (
    <>
      <div className='bg-(--color-primary) h-full'>
        <Title title='home' bg='bg-(--color-secondary)'/>
        <RiyadhAsSaaliheen/>
        <Birthday />
      </div>
    </>
  )
}

export default HomePage
