import Title from '@/app/components/common/Title'
import CarRequestPage from '@/app/pages/carRequestPage/CarRequestPage'
import React from 'react'

function page() {
  return (
    <>
    <div>
      <div>
        <Title title='car requests'/>
        <hr className='opacity-20'/>
      </div>
      <CarRequestPage/>
    </div>
    </>
  )
}

export default page