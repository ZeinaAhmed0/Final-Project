'use client'
import { UseEmpInformationStore } from '@/app/store/UseEmpInformationStore';
import React, { useEffect } from 'react'
import Title from '../common/Title';
import { UseOrderStore } from '@/app/store/UseOrdersStore';
import Table from '../common/TableComponents/Table';
import TableTd from '../common/TableComponents/TableTd';
import TableTh from '../common/TableComponents/TableTh';

function MyOrders() {
    const { fetchUser, empName } = UseEmpInformationStore();
    const { orders, fetchOrders } = UseOrderStore();
    useEffect(() => {
        fetchUser ();
        fetchOrders();
    }, [fetchUser]);

    const myOrders = orders.filter(req => req.empName === empName);
    return (
        <div className="flex flex-col gap-4 rounded-lg shadow-lg p-6 bg-white max-w-7xl mx-auto">
            <Title title='my orders' />
            <Table>
                <thead>
                        <tr className="bg-[var(--color-primary)] text-white font-semibold">
                            <TableTh>Insert Date</TableTh>
                            <TableTh>emp name</TableTh>
                            <TableTh>service type</TableTh>
                            <TableTh>request field</TableTh>
                            <TableTh>service description</TableTh>
                            <TableTh>priority level</TableTh>
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
                                    <TableTd>{ele.insertDate}</TableTd>
                                    <TableTd>{ele.empName}</TableTd>
                                    <TableTd>{ele.serviceType}</TableTd>
                                    <TableTd>{ele.requestField}</TableTd>
                                    <TableTd>{ele.serviceDescription}</TableTd>
                                    <TableTd>{ele.priorityLevel}</TableTd>
                                </tr>
                            ))
                        )}
                    </tbody>
            </Table>
        </div>
    );
}

export default MyOrders