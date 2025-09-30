import OuterContainer from '@/app/components/common/OuterContainer'
import CarRequestPage from '@/app/pages/carRequestPage/CarRequestPage'
import React from 'react'

function page() {
  return (
    <>
      <OuterContainer>
        <div className=" p-8 bg-white flex items-center justify-between">
          <CarRequestPage />
        </div>
      </OuterContainer>
    </>
  )
}

export default page