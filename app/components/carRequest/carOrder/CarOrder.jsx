'use client'
import { UseEmpInformationStore } from '@/app/store/UseEmpInformationStore';
import React, { useEffect } from 'react';
import { UseLoadingStore } from '@/app/store/UseLoadingStore';
import LoadingPage from '@/app/pages/LoadingPage/LoadingPage';
import { UseCarRequestStore } from '@/app/store/UseCarRequestStore';
import Title from '../../common/Title';
function CarOrder() {
    const { empName, fetchUser } = UseEmpInformationStore();
    const { fetchReq, approvedCarRequests } = UseCarRequestStore();
    const { setLoading, loading } = UseLoadingStore();
    useEffect(() => {
        fetchUser();
        fetchReq();
        setLoading(false);
    }, [fetchUser, fetchReq]);
    console.log(approvedCarRequests);

    if (loading) {
        return <LoadingPage />;
    }
    const myOrders = approvedCarRequests.filter(req => req.driverName === empName);
    return (
        <>
            <div className="flex flex-col gap-4 rounded-lg shadow-lg p-6 bg-white max-w-7xl mx-auto">
                <Title title='car orders' />
                <div className="overflow-x-auto">
                    <table className="min-w-full border-collapse border border-gray-300 text-sky-700">
                        <thead>
                            <tr className="bg-sky-700 text-white font-semibold">
                                <th className="border border-black px-4 py-2">emp name</th>
                                <th className="border border-black px-4 py-2">from</th>
                                <th className="border border-black px-4 py-2">to</th>
                                <th className="border border-black px-4 py-2">location</th>
                                <th className="border border-black px-4 py-2">destination</th>
                                <th className="border border-black px-4 py-2">service type</th>
                                <th className="border border-black px-4 py-2">no. of passengers</th>
                                <th className="border border-black px-4 py-2">car type</th>
                            </tr>
                        </thead>
                        <tbody>
                            {myOrders.length === 0 ? (
                                <tr>
                                    <td colSpan={7} className="text-center py-4 text-gray-500">
                                        No approved Orders found.
                                    </td>
                                </tr>
                            ) : (
                                myOrders.map((req, i) => (
                                    <tr
                                        key={i}
                                        className={`text-center ${i % 2 === 0 ? 'bg-white' : 'bg-gray-50'} hover:bg-sky-100`}
                                    >
                                        <td className="border border-black">{req.empName || '-'}</td>
                                        <td className="border border-black">{req.dateFrom}</td>
                                        <td className="border border-black">{req.dateTo}</td>
                                        <td className="border border-black">{req.yourLocation || '-'}</td>
                                        <td className="border border-black">{req.destination || '-'}</td>
                                        <td className="border border-black">{req.serviceType}</td>
                                        <td className="border border-black">{req.numberOfPassengers || '-'}</td>
                                        <td className="border border-black">{req.carType || '-'}</td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </>
    )
}

export default CarOrder