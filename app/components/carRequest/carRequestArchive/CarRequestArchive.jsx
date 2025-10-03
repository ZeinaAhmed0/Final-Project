'use client'
import { UseEmpInformationStore } from '@/app/store/UseEmpInformationStore';
import React, { useEffect } from 'react';
import Title from '../../common/Title';
import { UseCarRequestStore } from '@/app/store/UseCarRequestStore';
import Table from '../../common/TableComponents/Table';
import TableTd from '../../common/TableComponents/TableTd';
import TableTh from '../../common/TableComponents/TableTh';

function CarRequestArchive() {
    const { fetchUser, empName } = UseEmpInformationStore();
    const { approvedCarRequests, fetchReq } = UseCarRequestStore();
    useEffect(() => {
        fetchUser();
        fetchReq();
    }, [fetchUser, fetchReq]);
    const myCarRequests = approvedCarRequests.filter(req => req.empName === empName);
    return (
        <>
            <div className="flex flex-col gap-4 rounded-lg shadow-lg p-6 bg-white max-w-7xl mx-auto">
                <Title title='car request Archive' />
                <Table>
                    <thead>
                        <tr className="bg-[var(--color-primary)] text-white lg:font-semibold md:text-xl sm:text-sm font-normal text:xs">
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
                        {myCarRequests.length === 0 ? (
                            <tr>
                                <td colSpan={12} className="text-center py-4 text-gray-500">
                                    No old requests found.
                                </td>
                            </tr>
                        ) : (
                            myCarRequests.map((req, i) => (
                                <tr
                                    key={i}
                                    className={`text-center ${i % 2 === 0 ? 'bg-white' : 'bg-gray-50'} lg:font-semibold md:text-xl sm:text-sm font-normal text:xs`}
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
        </>
    );
}

export default CarRequestArchive;

