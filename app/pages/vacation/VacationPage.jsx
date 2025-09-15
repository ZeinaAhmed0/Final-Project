'use client'
import Title from '@/app/components/common/Title'
import Credit from '@/app/components/credit/Credit'
import VacationApproval from '@/app/components/vacation/VacationApproval'
import React from 'react'
import VacationHistoryPage from './VacationHistoryPage'
import VacationArchivePage from './VacationArchivePage'
import VacationPending from '@/app/components/vacation/VacationPending'

function VacationPage() {
    return (
        <>
            <div>
                <div className='flex justify-between items-center'>
                    <Title title='vacations' />
                    <VacationHistoryPage />
                </div>
                <hr className='opacity-25' />
                <div className="grid grid-cols-12 gap-5 mt-10">
                    <VacationPending />
                    <VacationApproval />
                    <VacationArchivePage />
                    <div className="col-span-12">
                        <Credit />
                    </div>
                </div>
            </div>
        </>
    )
}

export default VacationPage