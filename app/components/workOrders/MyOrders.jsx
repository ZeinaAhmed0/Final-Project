'use client'
import LoadingPage from '@/app/pages/LoadingPage/LoadingPage';
import { UseEmpInformationStore } from '@/app/store/UseEmpInformationStore';
import { UseLoadingStore } from '@/app/store/UseLoadingStore';
import React, { useEffect } from 'react'
import Title from '../common/Title';
import { UseOrderStore } from '@/app/store/UseOrdersStore';

function MyOrders() {
    const { fetchUser, empName } = UseEmpInformationStore();
    const {setLoading, loading} = UseLoadingStore();
    const { orders, fetchOrders } = UseOrderStore();
    useEffect(() => {
        fetchUser ();
        fetchOrders();
        setLoading(false);
    }, [fetchUser]);
    if (loading) {
        return <LoadingPage/>;
    }
    const myOrders = orders.filter(req => req.empName === empName);
    return (
        <div className="flex flex-col gap-4 rounded-lg shadow-lg p-6 bg-white max-w-7xl mx-auto">
            <Title title='my orders' />
            <div className="overflow-x-auto">
                <table className="min-w-full border-collapse border border-gray-300 text-(--color-primary)">
                    <thead>
                        <tr className="bg-(--color-primary) text-white font-semibold">
                            <th className="border border-gray-300 px-4 py-2">Insert Date</th>
                            <th className="border border-gray-300 px-4 py-2">emp name</th>
                            <th className="border border-gray-300 px-4 py-2">service type</th>
                            <th className="border border-gray-300 px-4 py-2">request field</th>
                            <th className="border border-gray-300 px-4 py-2">service description</th>
                            <th className="border border-gray-300 px-4 py-2">priority level</th>
                        </tr>
                    </thead>
                    <tbody>
                        {myOrders.length === 0 ? (
                            <tr>
                                <td colSpan={12} className="text-center py-4 text-gray-500">
                                    No orders found.
                                </td>
                            </tr>
                        ) : (
                            myOrders.map((ele, i) => (
                                <tr
                                    key={i}
                                    className={`text-center ${i % 2 === 0 ? 'bg-white' : 'bg-gray-50'} hover:bg-sky-100`}
                                >
                                    <td className="border border-gray-300 px-4 py-2">{ele.insertDate}</td>
                                    <td className="border border-gray-300 px-4 py-2">{ele.empName}</td>
                                    <td className="border border-gray-300 px-4 py-2">{ele.serviceType}</td>
                                    <td className="border border-gray-300 px-4 py-2">{ele.requestField}</td>
                                    <td className="border border-gray-300 px-4 py-2">{ele.serviceDescription}</td>
                                    <td className="border border-gray-300 px-4 py-2">{ele.priorityLevel}</td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default MyOrders