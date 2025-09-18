'use client'
import { UseEmpInformationStore } from '@/app/store/UseEmpInformationStore';
import { UseVacationStore } from '@/app/store/UseVacationStore';
import React, { useEffect } from 'react';
import Title from '../common/Title';

function Credit() {
    const { userData, fetchUser  } = UseEmpInformationStore();
    const { fetchVac} = UseVacationStore();
    useEffect(() => {
        fetchUser ();
        fetchVac();
    }, []);
    const vacTypes = [
        {
            label: "Rest Day",
            total: userData?.[0]?.restDay ,
            used: userData?.[0]?.restDayTaken,
        },
        {
            label: "Annual Vacation",
            total: userData?.[0]?.annualLeaves,
            used: userData?.[0]?.annualLeavesTaken,
        },
        {
            label: "Emergency Leave",
            total: userData?.[0]?.emergencyLeave,
            used: userData?.[0]?.emergencyLeaveTaken,
        },
    ];

    return (
        <div className="flex flex-col gap-2 rounded-lg shadow-md p-5 max-w-md mx-auto">
            <div>
                <Title title='credit'/>
            </div>
            <div className="overflow-x-auto">
                <table className="table-auto w-full border-collapse border border-gray-300 text-sky-700">
                    <thead>
                        <tr className='bg-sky-700 text-white'>
                            <th className="border border-gray-300 px-4 py-2">Type</th>
                            <th className="border border-gray-300 px-4 py-2">Your Vacations</th>
                            <th className="border border-gray-300 px-4 py-2">Remaining</th>
                            <th className="border border-gray-300 px-4 py-2">Used</th>
                        </tr>
                    </thead>
                    <tbody>
                        {vacTypes.map(({ label, total, used }, i) => (
                            <tr key={i} className="bg-base-200 text-center">
                                <th className="border border-gray-300 px-4 py-2">{label}</th>
                                <td className="border border-gray-300 px-4 py-2">{total}</td>
                                <td className="border border-gray-300 px-4 py-2">{total - used}</td>
                                <td className="border border-gray-300 px-4 py-2">{used}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default Credit;


