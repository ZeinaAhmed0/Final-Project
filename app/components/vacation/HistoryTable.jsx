'use client'
import OuterContainer from '@/app/components/common/OuterContainer';
import Title from '@/app/components/common/Title';
import { UseVacationStore } from '@/app/store/UseVacationStore';
import React, { useEffect } from 'react';

function HistoryTable() {
    const { vacations, fetchVac } = UseVacationStore();

    useEffect(() => {
        fetchVac();
    }, [fetchVac]);

    return (
        <OuterContainer>
            <div className="flex flex-col gap-4 rounded-lg shadow-lg p-6 bg-white max-w-7xl mx-auto overflow-x-auto">
                <Title title='Vacation History' />
                <hr className='opacity-30 my-2' />
                {vacations.length === 0 ? (
                    <p className="text-center text-gray-500 py-4">No vacations found.</p>
                ) : (
                    <table className="min-w-full border border-gray-300 rounded-md overflow-hidden">
                        <thead className="bg-(--color-primary) text-white">
                            <tr>
                                <th className="px-6 py-3 text-left font-semibold">Employee Name</th>
                                <th className="px-6 py-3 text-center font-semibold">From</th>
                                <th className="px-6 py-3 text-center font-semibold">To</th>
                                <th className="px-6 py-3 text-center font-semibold">Type</th>
                                <th className="px-6 py-3 text-center font-semibold">Status</th>
                                <th className="px-6 py-3 text-center font-semibold">Notes</th>
                            </tr>
                        </thead>
                        <tbody>
                            {vacations.map((vac, i) => (
                                <tr
                                    key={vac.documentId}
                                    className={`text-(--color-primary) ${
                                        i % 2 === 0 ? 'bg-sky-50' : 'bg-white'
                                    }`}
                                >
                                    <td className="text-left px-6 py-3 font-medium">{vac.empName || '-'}</td>
                                    <td className="px-6 py-3 text-center">{vac.dateFrom}</td>
                                    <td className="px-6 py-3 text-center">{vac.dateTo}</td>
                                    <td className="px-6 py-3 text-center">{vac.leavesType}</td>
                                    <td className="px-6 py-3 text-center">
                                        {vac.approval === true
                                            ? 'Approved'
                                            : vac.approval === false
                                            ? 'Rejected'
                                            : 'Pending'}
                                    </td>
                                    <td className="px-6 py-3 text-center">{vac.notes || '-'}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                )}
            </div>
        </OuterContainer>
    );
}

export default HistoryTable;
