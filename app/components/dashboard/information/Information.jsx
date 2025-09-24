'use client'
import { endPoint, useApisStore } from "@/app/store/UseApisStore";
import { UseEmpInformationStore } from "@/app/store/UseEmpInformationStore";
import Image from "next/image";
import React, { useEffect } from "react"
import Title from "../../common/Title";

function Information() {
    const { userData, fetchUser } = UseEmpInformationStore();
    useEffect(() => {
        fetchUser();
    }, []);
    const { fetchApi } = useApisStore();
    useEffect(() => {
        fetchApi();
    }, [fetchApi]);

    return (
        <>
        <div className="flex flex-col gap-2 rounded-lg shadow-md p-5 mx-auto bg-white">
            <div>
                <Title title='user information'/>
            </div>
        <div className="overflow-x-auto">
            <table className="min-w-full bg-white border border-gray-300">
                <thead>
                    <tr className="bg-sky-700 text-white">
                        <th className="px-4 py-2 border border-gray-300">Photo</th>
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
                            <td className="py-2 border border-gray-300 text-center">
                                {emp?.employeeImg?.[0]?.formats?.thumbnail?.url && (
                                    <Image
                                        src={`http://localhost:1337${emp.employeeImg[0].formats.thumbnail.url}`}
                                        alt={emp.fullName}
                                        width={60}
                                        height={60}
                                        className="object-cover mx-auto"
                                    />
                                )}
                            </td>
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
        </div>
        </>
    )
}

export default Information;

