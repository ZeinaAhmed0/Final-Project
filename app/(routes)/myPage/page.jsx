import Calendar from '@/app/components/calender/Calender'
import Title from '@/app/components/common/Title'
import InCome from '@/app/components/incomeTable/InCome'
import Information from '@/app/components/informations/Information'
import VacationTable from '@/app/components/vacation/VacationTable'
import React from 'react'

function MyPage() {
  return (
    <>
    <div className='bg-blue-200'>
      <Title title='my page'/>
      <div className='grid grid-cols-2 flex-col gap-4 m-4'>
        <div className='col-span-6'>
          <Information/>
        </div>
        <div className='col-span-6'><Calendar /></div>
        <div className='col-span-6 w-fit'>
          <InCome/>
        </div>
        
        <div className='col-span-6'>
          <Title title='vacations'/>
          <VacationTable/>
        </div>
      </div>
    </div>
    </>
  )
}

export default MyPage