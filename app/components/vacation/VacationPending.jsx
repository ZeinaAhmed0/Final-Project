'use client'
import { UseEmpInformationStore } from '@/app/store/UseEmpInformationStore';
import { UseVacationStore } from '@/app/store/UseVacationStore';
import React, { useEffect } from 'react'
import Title from '../common/Title';
import TableTd from '../common/TableComponents/TableTd';
import TableTh from '../common/TableComponents/TableTh';
import Table from '../common/TableComponents/Table';

function VacationPending() {
    const { pendedVacations } = UseVacationStore();
    const { empName, userData, fetchUser } = UseEmpInformationStore();
    useEffect(() => {
        fetchUser ();
    },[])
    const myVacations = pendedVacations.filter(vac => vac.empName === empName);
    if (userData?.[0]?.jobTitle?.toLowerCase() !== 'general manager') {
        return (
            <>
                <div className='col-span-12'>
                    <div className='flex flex-col gap-4 rounded-lg shadow-lg p-6 bg-white max-w-7xl mx-auto'>
                        <Title title='Vacation pending' />
                        <Table>
                            <thead>
                                    <tr className="bg-[var(--color-primary)] text-white lg:font-semibold md:text-xl sm:text-sm font-normal text:xs">
                                        <TableTh>Insert Date</TableTh>
                                        <TableTh>Manager</TableTh>
                                        <TableTh>Direct Manager</TableTh>
                                        <TableTh>Type</TableTh>
                                        <TableTh>Start Date</TableTh>
                                        <TableTh>End Date</TableTh>
                                        <TableTh>status</TableTh>
                                    </tr>
                                </thead>
                                <tbody>
                                    {myVacations.length === 0 ? (
                                        <tr>
                                            <td colSpan={12} className="text-center py-4 text-gray-500">
                                                No pending vacations found.
                                            </td>
                                        </tr>
                                    ) : (
                                        myVacations?.map((vac, i) => (
                                            <tr key={i} className={`text-center ${i % 2 === 0 ? 'bg-white' : 'bg-gray-50'} hover:bg-sky-100`}>
                                                <TableTd>{vac.insertDate}</TableTd>
                                                <TableTd>{vac.manager}</TableTd>
                                                <TableTd>{vac.directManager}</TableTd>
                                                <TableTd>{vac.leavesType}</TableTd>
                                                <TableTd>{vac.dateFrom}</TableTd>
                                                <TableTd>{vac.dateTo}</TableTd>
                                                <TableTd>{vac.approval === null ? 'Pending' : vac.approval === false ? 'Rejected' : 'Approved'}</TableTd>
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
}

export default VacationPending