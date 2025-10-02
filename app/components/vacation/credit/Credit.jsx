'use client'
import { UseEmpInformationStore } from '@/app/store/UseEmpInformationStore';
import React, { useEffect, useState } from 'react'; 
import Title from '../../common/Title';
import LoadingPage from '@/app/pages/LoadingPage/LoadingPage';

function Credit() {
    const { userData, fetchUser  } = UseEmpInformationStore();
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        fetchUser();
        setLoading(false);
    }, []);
        
    loading ? <LoadingPage/> : '';
    if (!userData || userData.length === 0) {
        return (
            <div className="flex flex-col gap-2 rounded-lg shadow-md p-5 max-w-md mx-auto">
                <Title title='credit' />
                <p className="text-center text-gray-500">No user data available.</p>
            </div>
        );
    }
    const vacTypes = [
        {
            label: "Rest Day",
            total: userData[0]?.restDay || 0,
            used: userData[0]?.restDayTaken || 0,
        },
        {
            label: "Annual Vacation",
            total: userData[0]?.annualLeaves || 0,
            used: userData[0]?.annualLeavesTaken || 0,
        },
        {
            label: "Emergency Leave",
            total: userData[0]?.emergencyLeave || 0,
            used: userData[0]?.emergencyLeaveTaken || 0,
        },
    ];
    return (
        <div className="flex flex-col gap-2 rounded-lg shadow-md p-5 max-w-md mx-auto">
            <div>
                <Title title='credit'/>
            </div>
            <div className="overflow-x-auto">
                <table className="table-auto w-full border-collapse border border-gray-300 text-(--color-primary)">
                    <thead>
                        <tr className='bg-(--color-primary)  text-white'>
                            <th className="border border-gray-300 px-4 py-2">Type</th>
                            <th className="border border-gray-300 px-4 py-2">Total Available</th>
                            <th className="border border-gray-300 px-4 py-2">Remaining</th>
                            <th className="border border-gray-300 px-4 py-2">Used</th>
                        </tr>
                    </thead>
                    <tbody>
                        {vacTypes.map(({ label, total, used }, i) => (
                            <tr key={i} className="bg-base-200 text-center"> 
                                <td className="border border-gray-300 px-4 py-2 font-medium">{label}</td> 
                                <td className="border border-gray-300 px-4 py-2">{total}</td>
                                <td className="border border-gray-300 px-4 py-2">{Math.max(0, total - used)}</td>
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
