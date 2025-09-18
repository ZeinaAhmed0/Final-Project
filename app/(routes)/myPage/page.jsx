import Calendar from '@/app/components/calender/Calender'
import Title from '@/app/components/common/Title'
import InCome from '@/app/components/incomeTable/InCome'
import Information from '@/app/components/information/Information'
import VacationTable from '@/app/components/vacation/VacationTable'
import React from 'react'

function MyPage() {
  return (
    <>
      <div className='bg-blue-200 p-3'>
        <Title title='my page' />
        <div className='m-4 space-y-4'>
          <div>
            <Information />
          </div>
          <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
            <div className='flex flex-col gap-3'>
              <div><InCome /></div>
              <div><Calendar /></div>
            </div>
            <div>
              <VacationTable />
            </div>
          </div>
        </div>
      </div>

    </>
  )
}

export default MyPage