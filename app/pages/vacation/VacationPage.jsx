'use client'
import Title from '@/app/components/common/Title'
import Credit from '@/app/components/credit/Credit'
import VacationArchive from '@/app/components/vacation/VacationArchive'
import Link from 'next/link'
import React from 'react'

function VacationPage() {
    return (
        <>
            <div>
                <div className='flex justify-between items-center'>
                    <Title title='vacations' />
                    <Link href="/VacationForm" >
                        <button className="btn rounded-2xl capitalize">send leave request</button>
                    </Link>
                </div>
                <hr className='opacity-25' />
                <div className="grid grid-cols-12 gap-5 mt-10">
                    <div className='lg:col-span-8 col-span-12'>
                        <Title title='vacations requests' />
                        
                    </div>
                    <div className='lg:col-span-8 col-span-12'>
                        <Title title='vacations archive' />
                        <VacationArchive />
                    </div>
                    <div className="lg:col-span-4 col-span-12">
                        <Credit />
                    </div>
                </div>
            </div>
        </>
    )
}

export default VacationPage