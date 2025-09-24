import OuterContainer from '@/app/components/common/OuterContainer'
import Title from '@/app/components/common/Title'
import CarRequestPage from '@/app/pages/carRequestPage/CarRequestPage'
import Link from 'next/link'
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