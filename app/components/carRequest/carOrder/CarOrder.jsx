'use client'
import { UseEmpInformationStore } from '@/app/store/UseEmpInformationStore';
import React, { useEffect } from 'react';
import { UseCarRequestStore } from '@/app/store/UseCarRequestStore';
import Title from '../../common/Title';
import Table from '../../common/TableComponents/Table';
import TableTh from '../../common/TableComponents/TableTh';
import TableTd from '../../common/TableComponents/TableTd';
function CarOrder() {
    const { empName, fetchUser } = UseEmpInformationStore();
    const { fetchReq, approvedCarRequests } = UseCarRequestStore();
    useEffect(() => {
        fetchUser();
        fetchReq();
    }, [fetchUser, fetchReq]);
    const myOrders = approvedCarRequests.filter(req => req.driverName === empName);
    return (
        <>
            <div className="flex flex-col gap-4 rounded-lg shadow-lg p-6 bg-white max-w-7xl mx-auto mt-6">
                <Title title='car orders' />
                <div className="overflow-x-auto">
                    <Table>
                        <thead>
                            <tr className="bg-[var(--color-primary)] text-white font-semibold">
                                <TableTh>emp name</TableTh>
                                <TableTh>from</TableTh>
                                <TableTh>to</TableTh>
                                <TableTh>location</TableTh>
                                <TableTh>destination</TableTh>
                                <TableTh>service type</TableTh>
                                <TableTh>no. of passengers</TableTh>
                                <TableTh>car type</TableTh>
                            </tr>
                        </thead>
                        <tbody>
                            {myOrders.length === 0 ? (
                                <tr>
                                    <td colSpan={12} className="text-center py-4 text-gray-500">
                                        No approved Orders found.
                                    </td>
                                </tr>
                            ) : (
                                myOrders.map((req, i) => (
                                    <tr
                                        key={i}
                                        className={`text-center ${i % 2 === 0 ? 'bg-white' : 'bg-gray-50'} hover:bg-sky-100`}
                                    >
                                        <TableTd>{req.empName || '-'}</TableTd>
                                        <TableTd>{req.dateFrom}</TableTd>
                                        <TableTd>{req.dateTo}</TableTd>
                                        <TableTd>{req.yourLocation || '-'}</TableTd>
                                        <TableTd>{req.destination || '-'}</TableTd>
                                        <TableTd>{req.serviceType}</TableTd>
                                        <TableTd>{req.numberOfPassengers || '-'}</TableTd>
                                        <TableTd>{req.carType || '-'}</TableTd>
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

export default CarOrder