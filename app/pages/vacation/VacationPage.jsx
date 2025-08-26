'use client'
import Credit from '@/app/components/credit/Credit'
import VacationForm from '@/app/components/vacationForm/VacationForm'
import React from 'react'

function VacationPage() {
    return (
        <>
            <div>
                <div className='mb-10'>
                    <h1 className='text-xl font-semibold p-5 capitalize'>vacation request</h1>
                <hr className='opacity-25'/>
                </div>
                <div className="grid grid-cols-12 gap-5">
                    <div className="lg:col-span-8 col-span-12">
                        <VacationForm />
                    </div>
                    <div className="lg:col-span-4 col-span-12">
                        <Credit/>
                    </div>
                </div>
            </div>
        </>
    )
}

export default VacationPage