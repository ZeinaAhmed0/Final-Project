'use client'
import React, { useEffect } from 'react'
import Title from '../common/Title';
import { UseOrderStore } from '@/app/store/UseOrdersStore';
import { UseEmpInformationStore } from '@/app/store/UseEmpInformationStore';

function Orders() {
    const { userData, fetchUser } = UseEmpInformationStore();
    const { orders, fetchOrders } = UseOrderStore();
    useEffect(() => {
        fetchOrders();
        fetchUser();
    }, []);
    const myWork = orders.filter(ele => `${ele.department} manager` === userData?.[0]?.jobTitle);
    if (userData?.[0].department === 'management') {
        return (
            <div className="flex flex-col gap-4 rounded-lg shadow-lg p-6 bg-white max-w-7xl mx-auto">
                <Title title='orders' />
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
                            {myWork.length === 0 ? (
                                <tr>
                                    <td colSpan={12} className="text-center py-4 text-gray-500">
                                        No orders found.
                                    </td>
                                </tr>
                            ) : (
                                myWork.map((ele, i) => (
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

}

export default Orders