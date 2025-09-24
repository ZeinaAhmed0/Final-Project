'use client'
import { UseEmpInformationStore } from '@/app/store/UseEmpInformationStore';
import React from 'react'
import { UseCarRequestStore } from '@/app/store/UseCarRequestStore';
import Title from '../../common/Title';

function CarPending() {
    const { pendedCarRequests } = UseCarRequestStore();
    const { empName } = UseEmpInformationStore();
    const myRequests = pendedCarRequests.filter(req => req.empName === empName);
    return (
        <>
            <div className='col-span-12'>
                <div className='flex flex-col gap-4 rounded-lg shadow-lg p-6 bg-white max-w-7xl mx-auto'>
                    <Title title='car request pending' />
                    <div className='overflow-x-auto'>
                        <table className='min-w-full border-collapse border border-gray-300 text-sky-700'>
                            <thead>
                                <tr className="bg-sky-700 text-white font-semibold">
                                    <th className="border border-gray-300 px-4 py-2">insert date</th>
                                    <th className="border border-gray-300 px-4 py-2">from</th>
                                    <th className="border border-gray-300 px-4 py-2">to</th>
                                    <th className="border border-gray-300 px-4 py-2">location</th>
                                    <th className="border border-gray-300 px-4 py-2">destination</th>
                                    <th className="border border-gray-300 px-4 py-2">service type</th>
                                    <th className="border border-gray-300 px-4 py-2">no. of passengers</th>
                                    <th className="border border-gray-300 px-4 py-2">car type</th>
                                    <th className="border border-gray-300 px-4 py-2">status</th>
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
                                            <td className="border border-gray-300 px-4 py-2">{req.insertDate}</td>
                                            <td className="border border-gray-300 px-4 py-2">{req.dateFrom}</td>
                                            <td className="border border-gray-300 px-4 py-2">{req.dateTo}</td>
                                            <td className="border border-gray-300 px-4 py-2">{req.yourLocation || '-'}</td>
                                            <td className="border border-gray-300 px-4 py-2">{req.destination || '-'}</td>
                                            <td className="border border-gray-300 px-4 py-2">{req.serviceType}</td>
                                            <td className="border border-gray-300 px-4 py-2">{req.numberOfPassengers || '-'}</td>
                                            <td className="border border-gray-300 px-4 py-2">{req.carType || '-'}</td>
                                            <td className="border border-gray-300 px-4 py-2">{req.approval === null ? 'Pending' : req.approval === false ? 'Rejected' : 'Approved'}</td>
                                        </tr>
                                    ))
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </>
    )
}

export default CarPending