import OuterContainer from '@/app/components/common/OuterContainer'
import Title from '@/app/components/common/Title'
import MyOrders from '@/app/components/workOrders/MyOrders'
import Orders from '@/app/components/workOrders/Orders'
import Link from 'next/link'
import React from 'react'

function WorkOrderPage() {
    return (
        <>
            <OuterContainer>
                <div className="w-full p-6 bg-white rounded-lg">
                <div className='flex justify-between items-center w-full'>
                    <Title title='work orders' />
                    <Link href="/WorkOrderForm">
                        <button className="btn rounded-2xl capitalize">order</button>
                    </Link>
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