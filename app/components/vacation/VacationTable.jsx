'use client'
import React, { useEffect } from 'react'
import Title from '../common/Title';
import { UseVacationStore } from '@/app/store/UseVacationStore';
import { UseEmpInformationStore } from '@/app/store/UseEmpInformationStore';

function VacationTable() {
    const { fetchVac, approvedVacations } = UseVacationStore();
    const { userData, fetchUser  } = UseEmpInformationStore();

    useEffect(() => {
        fetchVac();
        fetchUser ();
    }, []);
    const myVac = approvedVacations.filter(
        (vac) => vac.empName === userData?.[0]?.fullName
    );
console.log(myVac);

    return (
        <>
            <div className='flex flex-col gap-2 rounded-lg shadow-md p-5 mx-auto bg-white'>
                <div>
                    <Title title='vacations' />
                </div>
                <div className="overflow-x-auto">
                    <table className="table-auto w-full border-collapse border border-gray-300 text-sky-700">
                        <thead>
                            <tr className="bg-sky-700 text-white">
                                <th className="border border-gray-300 px-4 py-2">From</th>
                                <th className="border border-gray-300 px-4 py-2">To</th>
                                <th className="border border-gray-300 px-4 py-2">Days</th>
                                <th className="border border-gray-300 px-4 py-2">Type</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                myVac.map((vac) => {
                                    const diffTime = new Date(vac.dateTo).getTime() - new Date(vac.dateFrom).getTime();
                                    const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24)) + 1;
                                    return (
                                        <tr key={vac.id}>
                                            <td className="border border-gray-300 px-4 py-2">{vac.dateFrom}</td>
                                            <td className="border border-gray-300 px-4 py-2">{vac.dateTo}</td>
                                            <td className="border border-gray-300 px-4 py-2">{diffDays}</td>
                                            <td className="border border-gray-300 px-4 py-2">{vac.leavesType}</td>
                                        </tr>
                                    )
                                })
                            }
                        </tbody>
                    </table>
                </div>
            </div>
        </>
    )
}

export default VacationTable
