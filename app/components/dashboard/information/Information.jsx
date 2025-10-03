'use client'
import { useApisStore } from "@/app/store/UseApisStore";
import { UseEmpInformationStore } from "@/app/store/UseEmpInformationStore";
import Image from "next/image";
import React, { useEffect } from "react"
import Title from "../../common/Title";
import Table from "../../common/TableComponents/Table";
import TableTd from "../../common/TableComponents/TableTd";
import TableTh from "../../common/TableComponents/TableTh";

function Information() {
    const { userData, fetchUser } = UseEmpInformationStore();
    const { fetchApi } = useApisStore();
    useEffect(() => {
        fetchUser();
        fetchApi();
    }, []);
    return (
        <>
            <div className="flex flex-col gap-2 rounded-lg shadow-md p-5 mx-auto bg-white">
                <div>
                    <Title title='user information' />
                </div>
                <Table>
                    <thead>
                        <tr className="bg-[var(--color-primary)] text-white">
                            <TableTh>Photo</TableTh>
                            <TableTh>Employee ID</TableTh>
                            <TableTh>Name</TableTh>
                            <TableTh>Department</TableTh>
                            <TableTh>Sub Department</TableTh>
                            <TableTh>Location</TableTh>
                            <TableTh>Job Title</TableTh>
                        </tr>
                    </thead>
                    <tbody>
                        {userData?.map((emp, i) => (
                            <tr key={i} className="border border-gray-300">
                                <td className="py-2 border border-gray-300 text-center">
                                    {emp?.employeeImg?.[0]?.formats?.thumbnail?.url && (
                                        <Image src={`http://localhost:1337${emp.employeeImg[0].formats.thumbnail.url}`} alt={emp.fullName} width={60} height={60} className="object-cover mx-auto" />
                                    )}
                                </td>
                                <TableTd>{emp.id}</TableTd>
                                <TableTd>{emp.fullName}</TableTd>
                                <TableTd>{emp.department}</TableTd>
                                <TableTd>{emp.subDepartment}</TableTd>
                                <TableTd>{emp.location}</TableTd>
                                <TableTd>{emp.jobTitle}</TableTd>
                            </tr>
                        ))}
                    </tbody>
                </Table>
            </div>
        </>
    )
}

export default Information;

