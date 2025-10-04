'use client'
import OuterContainer from '@/app/components/common/OuterContainer';
import Title from '@/app/components/common/Title';
import { UseVacationStore } from '@/app/store/UseVacationStore';
import React, { useEffect } from 'react';
import Table from '../common/TableComponents/Table';
import TableTd from '../common/TableComponents/TableTd';
import TableTh from '../common/TableComponents/TableTh';

function HistoryTable() {
    const { vacations, fetchVac } = UseVacationStore();
    useEffect(() => {
        fetchVac();
    }, []);
    return (
        <OuterContainer>
            <div className="flex flex-col gap-4 rounded-lg shadow-lg p-6 bg-white max-w-7xl mx-auto overflow-x-auto">
                <Title title='Vacation History' />
                <hr className='opacity-30 my-2' />
                <Table>
                    <thead className="bg-[var(--color-primary)] text-white">
                            <tr className='lg:font-semibold md:text-xl sm:text-sm font-normal text:xs'>
                                <TableTh>Employee Name</TableTh>
                                <TableTh>From</TableTh>
                                <TableTh>To</TableTh>
                                <TableTh>Type</TableTh>
                                <TableTh>Status</TableTh>
                                <TableTh>Notes</TableTh>
                            </tr>
                        </thead>
                    {vacations.length === 0 ? (
                    <p className="text-center text-gray-500 py-4">No vacations found.</p>
                ) : (
                        <tbody>
                            {vacations.map((vac, i) => (
                                <tr key={vac.documentId} className={`text-[var(--color-primary)] ${i % 2 === 0 ? 'bg-sky-50' : 'bg-white'}`}>
                                    <td className="text-left px-6 py-3 font-medium">{vac.empName || '-'}</td>
                                    <TableTd>{vac.dateFrom}</TableTd>
                                    <TableTd>{vac.dateTo}</TableTd>
                                    <TableTd>{vac.leavesType}</TableTd>
                                    <TableTd>
                                        {vac.approval === true? 'Approved' : vac.approval === false? 'Rejected' : 'Pending'}
                                    </TableTd>
                                    <TableTd>{vac.notes || '-'}</TableTd>
                                </tr>
                            ))}
                        </tbody>
                )}
                </Table>
            </div>
        </OuterContainer>
    );
}

export default HistoryTable;
