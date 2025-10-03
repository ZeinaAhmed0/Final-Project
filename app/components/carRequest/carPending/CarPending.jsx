'use client'
import { UseEmpInformationStore } from '@/app/store/UseEmpInformationStore';
import React from 'react'
import { UseCarRequestStore } from '@/app/store/UseCarRequestStore';
import Title from '../../common/Title';
import Table from '../../common/TableComponents/Table';
import TableTd from '../../common/TableComponents/TableTd';
import TableTh from '../../common/TableComponents/TableTh';

function CarPending() {
    const { pendedCarRequests } = UseCarRequestStore();
    const { empName } = UseEmpInformationStore();
    const myRequests = pendedCarRequests.filter(req => req.empName === empName);
    return (
        <>
            <div className='col-span-12'>
                <div className='flex flex-col gap-4 rounded-lg shadow-lg p-6 bg-white max-w-7xl mx-auto'>
                    <Title title='car request pending' />
                    <Table>
                        <thead>
                                <tr className="bg-[var(--color-primary)] text-white font-semibold">
                                    <TableTh>insert date</TableTh>
                                    <TableTh>from</TableTh>
                                    <TableTh>to</TableTh>
                                    <TableTh>location</TableTh>
                                    <TableTh>destination</TableTh>
                                    <TableTh>service type</TableTh>
                                    <TableTh>no. of passengers</TableTh>
                                    <TableTh>car type</TableTh>
                                    <TableTh>status</TableTh>
                                </tr>
                            </thead>
                            <tbody>
                                {myRequests.length === 0 ? (
                                    <tr>
                                        <td colSpan={12} className="text-center py-4 text-gray-500">
                                            No pending requests found.
                                        </td>
                                    </tr>
                                ) : (
                                    myRequests?.map((req, i) => (
                                        <tr
                                            key={i}
                                            className={`text-center ${i % 2 === 0 ? 'bg-white' : 'bg-gray-50'} hover:bg-sky-100`}
                                        >
                                            <TableTd>{req.insertDate}</TableTd>
                                            <TableTd>{req.dateFrom}</TableTd>
                                            <TableTd>{req.dateTo}</TableTd>
                                            <TableTd>{req.yourLocation || '-'}</TableTd>
                                            <TableTd>{req.destination || '-'}</TableTd>
                                            <TableTd>{req.serviceType}</TableTd>
                                            <TableTd>{req.numberOfPassengers || '-'}</TableTd>
                                            <TableTd>{req.carType || '-'}</TableTd>
                                            <TableTd>{req.approval === null ? 'Pending' : req.approval === false ? 'Rejected' : 'Approved'}</TableTd>
                                        </tr>
                                    ))
                                )}
                            </tbody>
                    </Table>
                </div>
            </div>
        </>
    )
}

export default CarPending