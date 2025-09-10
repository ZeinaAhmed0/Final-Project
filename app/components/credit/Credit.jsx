'use client'
import { UseEmpInformationStore } from '@/app/store/UseEmpInformationStore';
import React, { useEffect } from 'react'

function Credit() {
    const { userData, fetchUser } = UseEmpInformationStore();
        useEffect(() => {
            fetchUser();
        }, []);
    return (
        <>
            <div className="flex flex-col gap-2 rounded shadow-md">
                <div>
                    <h1 className='text-xl p-5 capitalize'>credit</h1>
                    <hr className='opacity-25' />
                </div>
                <div className="overflow-x-auto">
                    <table className="table">
                        <thead>
                            <tr className='text-sky-700'>
                                <th>type</th>
                                <th>Your vacations</th>
                                <th>Remaining </th>
                                <th>Used</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr className="bg-base-200">
                                <th>Annual</th>
                                <td>{userData?.[0]?.leaves}</td>
                                <td>{userData?.[0]?.leaves - userData?.[0]?.leavesTaken} </td>
                                <td>{userData?.[0]?.leavesTaken}</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </>
    )
}

export default Credit