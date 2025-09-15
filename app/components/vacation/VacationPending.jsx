'use client'
import { UseEmpInformationStore } from '@/app/store/UseEmpInformationStore';
import { UseVacationStore } from '@/app/store/UseVacationStore';
import React from 'react'
import Title from '../common/Title';

function VacationPending() {
    const { pendedVacations } = UseVacationStore();
        const { empName } = UseEmpInformationStore();
        const myVacations = pendedVacations.filter(vac => vac.empName === empName);
    return (
        <>
        <div className='col-span-12'>
            <div className='flex flex-col gap-4 rounded-lg shadow-lg p-6 bg-white max-w-7xl mx-auto'>
                <Title title='Vacation pending' />
                <div className='overflow-x-auto'>
                    <table className='min-w-full border-collapse border border-gray-300 text-sky-700'>
                        <thead>
                            <tr className="bg-sky-700 text-white font-semibold">
                            <th className="border border-gray-300 px-4 py-2">Insert Date</th>
                            <th className="border border-gray-300 px-4 py-2">Manager</th>
                            <th className="border border-gray-300 px-4 py-2">Direct Manager</th>
                            <th className="border border-gray-300 px-4 py-2">Type</th>
                            <th className="border border-gray-300 px-4 py-2">Start Date</th>
                            <th className="border border-gray-300 px-4 py-2">End Date</th>
                            <th className="border border-gray-300 px-4 py-2">status</th>
                        </tr>
                        </thead>
                        <tbody>
                        {myVacations.length === 0 ? (
                            <tr>
                                <td colSpan={7} className="text-center py-4 text-gray-500">
                                    No pending vacations found.
                                </td>
                            </tr>
                        ) : (
                            myVacations?.map((vac, i) => (
                                <tr
                                    key={i}
                                    className={`text-center ${i % 2 === 0 ? 'bg-white' : 'bg-gray-50'} hover:bg-sky-100`}
                                >
                                    <td className="border border-gray-300 px-4 py-2">{vac.insertDate}</td>
                                    <td className="border border-gray-300 px-4 py-2">{vac.manager}</td>
                                    <td className="border border-gray-300 px-4 py-2">{vac.directManager}</td>
                                    <td className="border border-gray-300 px-4 py-2">{vac.leavesType}</td>
                                    <td className="border border-gray-300 px-4 py-2">{vac.dateFrom}</td>
                                    <td className="border border-gray-300 px-4 py-2">{vac.dateTo}</td>
                                    <td className="border border-gray-300 px-4 py-2">{vac.approval === null ? 'Pending' : vac.approval === false ? 'Rejected' : 'Approved'}</td>
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

export default VacationPending