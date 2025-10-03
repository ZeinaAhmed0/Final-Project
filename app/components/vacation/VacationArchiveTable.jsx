'use client'
import { UseVacationStore } from '@/app/store/UseVacationStore';
import { UseEmpInformationStore } from '@/app/store/UseEmpInformationStore';
import React, { useEffect } from 'react';
import Title from '../common/Title';
import Table from '../common/TableComponents/Table';
import TableTh from '../common/TableComponents/TableTh';
import TableTd from '../common/TableComponents/TableTd';

function VacationArchiveTable() {
    const { approvedVacations, fetchVac,vacations} = UseVacationStore();
    const { fetchUser, empName } = UseEmpInformationStore();
    useEffect(() => {
        fetchUser ();
        fetchVac();
    }, []);
    console.log(vacations, approvedVacations);
    
    const myVacations = approvedVacations.filter(vac => vac.empName === empName);
    return (
        <div className="flex flex-col gap-4 rounded-lg shadow-lg p-6 bg-white max-w-7xl mx-auto">
            <Title title='Vacation Archive' />
            <Table>
                <thead>
                        <tr className="bg-[var(--color-primary)] text-white lg:font-semibold md:text-xl sm:text-sm font-normal text:xs">
                            <TableTh>Insert Date</TableTh>
                            <TableTh>Approve Date</TableTh>
                            <TableTh>Manager Approval</TableTh>
                            <TableTh>Direct Manager Approval</TableTh>
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
                                    No approved vacations found.
                                </td>
                            </tr>
                        ) : (
                            myVacations.map((vac, i) => (
                                <tr key={i} className={`text-center ${i % 2 === 0 ? 'bg-white' : 'bg-gray-50'}`}>
                                    <TableTd>{vac.insertDate}</TableTd>
                                    <TableTd>{vac.approveDate}</TableTd>
                                    <TableTd>{vac.manager}</TableTd>
                                    <TableTd>{vac.directManager}</TableTd>
                                    <TableTd>{vac.leavesType}</TableTd>
                                    <TableTd>{vac.dateFrom}</TableTd>
                                    <TableTd>{vac.dateTo}</TableTd>
                                    <TableTd>{vac.approval === true ? 'Approved' : 'Rejected'}</TableTd>
                                </tr>
                            ))
                        )}
                    </tbody>
            </Table>
        </div>
    );
}

export default VacationArchiveTable;