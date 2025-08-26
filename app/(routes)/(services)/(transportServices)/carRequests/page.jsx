import CarRequestPage from '@/app/pages/carRequestPage/CarRequestPage'
import React from 'react'

function page() {
  return (
    <>
    <div>
      <div>
        <h1 className='text-xl font-semibold p-5 capitalize'>car requests</h1>
        <hr className='opacity-20'/>
      </div>
      <CarRequestPage/>
    </div>
    </>
  )
}

export default page