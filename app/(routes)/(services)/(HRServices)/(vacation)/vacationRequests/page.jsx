import OuterContainer from '@/app/components/common/OuterContainer'
import VacationPage from '@/app/pages/vacation/VacationPage'
import React from 'react'
function VacationRequest() {
  return (
    <>
      <OuterContainer>
        <div className=" p-8 bg-white">
          <VacationPage />
        </div>
      </OuterContainer>
    </>
  )
}

export default VacationRequest