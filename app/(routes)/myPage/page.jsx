import Calendar from '@/app/components/dashboard/calender/Calender'
import Title from '@/app/components/common/Title'
import InCome from '@/app/components/dashboard/incomeTable/InCome'
import Information from '@/app/components/dashboard/information/Information'
import VacationTable from '@/app/components/vacation/VacationTable'
import React from 'react'

function MyPage() {
  return (
<>
  <div className="bg-blue-200 p-3 min-h-screen">
    <Title title="my page" />
    <div className="m-4 space-y-6">
      <Information />
      <div className="grid grid-cols-1 md:grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="flex flex-col gap-6 justify-start">
          <InCome />
          <Calendar />
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