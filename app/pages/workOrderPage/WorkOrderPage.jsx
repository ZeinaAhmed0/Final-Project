'use client'
import OuterContainer from '@/app/components/common/OuterContainer'
import Title from '@/app/components/common/Title'
import MyOrders from '@/app/components/workOrders/MyOrders'
import Orders from '@/app/components/workOrders/Orders'
import { UseEmpInformationStore } from '@/app/store/UseEmpInformationStore'
import Link from 'next/link'
import React from 'react'
import { useEffect } from 'react'

function WorkOrderPage() {
    const { fetchUser, userData } = UseEmpInformationStore();
    useEffect(() => {
        fetchUser();
    }, [])
    return (
        <>
            <OuterContainer>
                <div className="w-full p-6 bg-white rounded-lg">
                    <div className='flex justify-between items-center w-full'>
                        <Title title='work orders' />
                        <div className='flex gap-4'>
                            <Link href="/WorkOrderForm">
                            <button className="btn rounded-2xl capitalize">order</button>
                        </Link>
                        {
                            userData?.[0]?.jobTitle === 'general manager' &&
                            <Link href="/AllWorkOrder">
                                <button className="btn rounded-2xl capitalize">see all orders</button>
                            </Link>
                        }
                        </div>
                    </div>
                    <hr opacity={20} />
                    <div className="grid grid-cols-12 gap-5 mt-10">
                        <div className="col-span-12">
                            <Orders />
                        </div>
                        <div className="col-span-12">
                            <MyOrders />
                        </div>
                    </div>
                </div>
            </OuterContainer>
        </>
    )
}

export default WorkOrderPage