import OuterContainer from '@/app/components/common/OuterContainer'
import VacationPage from '@/app/pages/vacation/VacationPage'
import Link from 'next/link'
import React from 'react'
function VacationRequest() {
  return (
    <>
      <OuterContainer>
        <div className=" p-8 bg-white">
          طلبات الاجازة
          <button className='btn rounded-2xl'>form</button>
          <VacationPage />
        </div>
      </OuterContainer>
    </>
  )
}

export default VacationRequest