'use client'
import CarPending from '@/app/components/carRequest/carPending/CarPending'
import CarRequestArchive from '@/app/components/carRequest/carRequestArchive/CarRequestArchive'
import Title from '@/app/components/common/Title'
import Link from 'next/link'
import React from 'react'

function CarRequestPage() {
  return (
    <>
      <div className="w-full p-6 bg-background rounded-lg">
        <div className='flex justify-between items-center w-full'>
          <Title title='Car Request' />
          <Link href="/carRequestForm">
            <button className="btn rounded-2xl capitalize">car request</button>
          </Link>
        </div>
        <hr opacity={20} />
        <div className="grid grid-cols-12 gap-5 mt-10">
          <div className="col-span-12">
            <CarPending />
          </div>
          <div className="col-span-12">
            <CarRequestArchive/>
          </div>
        </div>
      </div>
    </>
  )
}

export default CarRequestPage