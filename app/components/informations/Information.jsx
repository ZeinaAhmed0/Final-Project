'use client'
import { UseEmpInformationStore } from "@/app/store/UseEmpInformationStore";
import React, { useEffect } from "react"


function Information() {
    const { userData, fetchUser } = UseEmpInformationStore();
    useEffect(() => {
        fetchUser();
    }, []);
    return (
        <div className="overflow-x-auto">
            <table className="min-w-full bg-white border border-gray-300">
                <thead>
                    <tr className="bg-gray-200 text-sky-700">
                        <th className="px-4 py-2 border border-gray-300">Employee ID</th>
                        <th className="px-4 py-2 border border-gray-300">Name</th>
                        <th className="px-4 py-2 border border-gray-300">Department</th>
                        <th className="px-4 py-2 border border-gray-300">Sub Department</th>
                        <th className="px-4 py-2 border border-gray-300">Location</th>
                        <th className="px-4 py-2 border border-gray-300">Job Title</th>
                    </tr>
                </thead>
                <tbody>
                    {userData?.map((emp, i) => (
                        <tr key={i} className="border border-gray-300">
                            <td className="px-4 py-2 border border-gray-300 text-center">{emp.id}</td>
                            <td className="px-4 py-2 border border-gray-300 text-center">{emp.fullName}</td>
                            <td className="px-4 py-2 border border-gray-300 text-center">{emp.department}</td>
                            <td className="px-4 py-2 border border-gray-300 text-center">{emp.subDepartment}</td>
                            <td className="px-4 py-2 border border-gray-300 text-center">{emp.location}</td>
                            <td className="px-4 py-2 border border-gray-300 text-center">{emp.jobTitle}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}

export default Information


