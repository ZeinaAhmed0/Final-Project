"use client";
import React, { useEffect, useState } from "react";
import { useApisStore, endPoint } from "@/app/store/UseApisStore";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";
import { FaTrash } from "react-icons/fa";
import Title from "../../common/Title";
import OuterContainer from "../../common/OuterContainer";

function RemoveEmpForm() {
    const { emp, fetchApi } = useApisStore();
    const [loading, setLoading] = useState(false);
    const [searchTerm, setSearchTerm] = useState("");

    useEffect(() => {
        fetchApi();
    }, [fetchApi]);

    const filteredEmp = emp?.filter(
        (employee) => employee.jobTitle.toLowerCase() !== "general manager"
    );
    const handleDelete = async (employeeId) => {
        const token = sessionStorage.getItem("token");
        try {
            setLoading(true);
            await axios.delete(`${endPoint}employees/${employeeId}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            toast.success("Employee removed successfully!");
            await fetchApi();
        } catch (error) {
            toast.error("Failed to remove employee. Please try again.");
        } finally {
            setLoading(false);
        }
    };
    const searchFilteredEmp = filteredEmp?.filter((employee) =>
        employee.fullName.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <>
            <Toaster />
            <OuterContainer>
                <div className="col-span-12">
                    <div className="flex flex-col gap-4 rounded-lg shadow-lg p-6 bg-white max-w-7xl mx-auto">
                        <Title title="Remove Employees" />
                        <input
                            type="text"
                            placeholder="Search by full name..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="mb-4 p-2 border border-gray-300 rounded w-full max-w-sm"
                        />
                        <div className="overflow-x-auto">
                            <table className="min-w-full border-collapse border border-gray-300 text-(--color-primary)">
                                <thead>
                                    <tr className="bg-(--color-primary) text-white font-semibold">
                                        <th className="border border-gray-300 px-4 py-2"> Full Name </th> 
                                        <th className="border border-gray-300 px-4 py-2"> Job Title </th> 
                                        <th className="border border-gray-300 px-4 py-2"> Location </th> 
                                        <th className="border border-gray-300 px-4 py-2"> Department </th> 
                                        <th className="border border-gray-300 px-4 py-2"> Manager </th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {searchFilteredEmp && searchFilteredEmp.length === 0 ? (
                                        <tr>
                                            <td className="col-span-6 text-center py-4 text-gray-500">
                                                No employees found.
                                            </td>
                                        </tr>
                                    ) : (
                                        searchFilteredEmp?.map((employee, i) => (
                                            <tr
                                                key={i}
                                                className={`text-center ${i % 2 === 0 ? "bg-white" : "bg-gray-50"
                                                    } hover:bg-sky-100`}
                                            >
                                                <td className="border border-gray-300 px-4 py-2 flex items-center justify-start gap-4">
                                                    <button onClick={() => handleDelete(employee.documentId)} disabled={loading} title="Delete employee" className="text-red-600 hover:text-red-800"> <FaTrash />
                                                    </button>
                                                    {employee.fullName}
                                                </td>
                                                <td className="border border-gray-300 px-4 py-2"> {employee.jobTitle} </td>
                                                <td className="border border-gray-300 px-4 py-2"> {employee.location} </td>
                                                <td className="border border-gray-300 px-4 py-2"> {employee.department} </td>
                                                <td className="border border-gray-300 px-4 py-2"> {employee.directManager} </td>
                                            </tr>
                                        ))
                                    )}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </OuterContainer>
        </>
    );
}

export default RemoveEmpForm;
