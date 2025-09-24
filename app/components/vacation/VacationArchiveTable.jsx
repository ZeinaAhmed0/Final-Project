'use client'
import { UseVacationStore } from '@/app/store/UseVacationStore';
import { UseEmpInformationStore } from '@/app/store/UseEmpInformationStore';
import React, { useEffect } from 'react';
import Title from '../common/Title';
import { UseLoadingStore } from '@/app/store/UseLoadingStore';
import LoadingPage from '@/app/pages/LoadingPage/LoadingPage';

function VacationArchiveTable() {
    const { approvedVacations, fetchVac} = UseVacationStore();
    const { fetchUser, empName } = UseEmpInformationStore();
    const {setLoading, loading} = UseLoadingStore();
    useEffect(() => {
        fetchUser ();
        fetchVac();
        setLoading(false);
    }, [fetchUser , fetchVac]);
    if (loading) {
        return <LoadingPage/>;
        
    }
    const myVacations = approvedVacations.filter(vac => vac.empName === empName);
    return (
        <div className="flex flex-col gap-4 rounded-lg shadow-lg p-6 bg-white max-w-7xl mx-auto">
            <Title title='Vacation Archive' />
            <div className="overflow-x-auto">
                <table className="min-w-full border-collapse border border-gray-300 text-sky-700">
                    <thead>
                        <tr className="bg-sky-700 text-white font-semibold">
                            <th className="border border-gray-300 px-4 py-2">Insert Date</th>
                            <th className="border border-gray-300 px-4 py-2">Approve Date</th>
                            <th className="border border-gray-300 px-4 py-2">Manager Approval</th>
                            <th className="border border-gray-300 px-4 py-2">Direct Manager Approval</th>
                            <th className="border border-gray-300 px-4 py-2">Type</th>
                            <th className="border border-gray-300 px-4 py-2">Start Date</th>
                            <th className="border border-gray-300 px-4 py-2">End Date</th>
                            <th className="border border-gray-300 px-4 py-2">status</th>
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
                                <tr
                                    key={i}
                                    className={`text-center ${i % 2 === 0 ? 'bg-white' : 'bg-gray-50'} hover:bg-sky-100`}
                                >
                                    <td className="border border-gray-300 px-4 py-2">{vac.insertDate}</td>
                                    <td className="border border-gray-300 px-4 py-2">{vac.approveDate}</td>
                                    <td className="border border-gray-300 px-4 py-2">{vac.manager}</td>
                                    <td className="border border-gray-300 px-4 py-2">{vac.directManager}</td>
                                    <td className="border border-gray-300 px-4 py-2">{vac.leavesType}</td>
                                    <td className="border border-gray-300 px-4 py-2">{vac.dateFrom}</td>
                                    <td className="border border-gray-300 px-4 py-2">{vac.dateTo}</td>
                                    <td className="border border-gray-300 px-4 py-2">{vac.approval === true ? 'Approved' : 'Rejected'}</td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default VacationArchiveTable;