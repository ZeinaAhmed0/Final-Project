'use client'
import CarPending from '@/app/components/carRequest/carPending/CarPending'
import CarRequestArchive from '@/app/components/carRequest/carRequestArchive/CarRequestArchive'
import Title from '@/app/components/common/Title'
import { UseEmpInformationStore } from '@/app/store/UseEmpInformationStore'
import Link from 'next/link'
import React, { useEffect } from 'react'

function CarRequestPage() {
  const { userData, fetchUser } = UseEmpInformationStore();
  useEffect(() => {
    fetchUser();
  }, [])
  return (
    <>
      <div className="w-full p-6 bg-background rounded-lg">
        <div className='flex justify-between items-center w-full'>
          <Title title='Car Request' />
          <div className='flex gap-4'>
            {
              userData?.[0]?.jobTitle !== 'driver'
              &&
              <Link href="/carRequestForm">
                <button className="btn rounded-2xl capitalize">car request</button>
              </Link>
            }
            {
              userData?.[0]?.jobTitle === 'general manager'
              &&
              <Link href="/AllCarRequests">
                <button className="btn rounded-2xl capitalize">see all request</button>
              </Link>
            }
          </div>
        </div>
        <hr opacity={20} />
        <div className="grid grid-cols-12 gap-5 mt-10">
          <div className="col-span-12">
            <CarPending />
          </div>
          <div className="col-span-12">
            <CarRequestArchive />
          </div>
        </div>
      </div>
    </>
  )
}

export default CarRequestPage