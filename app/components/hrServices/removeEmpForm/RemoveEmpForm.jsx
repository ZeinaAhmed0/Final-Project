"use client";
import Swal from "sweetalert2";
import React, { useEffect, useState } from "react";
import { useApisStore, endPoint } from "@/app/store/UseApisStore";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";
import { FaTrash } from "react-icons/fa";
import Title from "../../common/Title";
import OuterContainer from "../../common/OuterContainer";
import Table from "../../common/TableComponents/Table";
import TableTd from "../../common/TableComponents/TableTd";
import TableTh from "../../common/TableComponents/TableTh";

function RemoveEmpForm() {
    const { emp, fetchApi } = useApisStore();
    const [searchTerm, setSearchTerm] = useState("");
    useEffect(() => {
        fetchApi();
    }, [fetchApi]);
    const filteredEmp = emp?.filter(
        (employee) => employee.jobTitle.toLowerCase() !== "general manager"
    );
    const handleDelete = async (employeeId, employeeName) => { 
        const result = await Swal.fire({
            title: "are you sure?",
            text: `do you want to remove ${employeeName}`,
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#d33", 
            cancelButtonColor: "#3085d6",
            confirmButtonText: "Yes, remove",
            cancelButtonText: "cancel",
            reverseButtons: true, 
            allowOutsideClick: true,
        });
        if (result.isConfirmed) {
            const token = sessionStorage.getItem("token");
            try {
                await axios.delete(`${endPoint}employees/${employeeId}`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                toast.success("employee removed successfully.");
                await fetchApi();
            } catch (error) {
                toast.error("failed to delete employee. try again.");
            }
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
                        <input type="text" placeholder="Search by full name..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} className="mb-4 p-2 border border-gray-300 rounded w-full max-w-sm"/>
                        <Table>
                            <thead>
                                    <tr className="bg-[var(--color-primary)] text-white font-semibold">
                                        <TableTh> Full Name </TableTh> 
                                        <TableTh> Job Title </TableTh> 
                                        <TableTh> Location </TableTh> 
                                        <TableTh> Department </TableTh> 
                                        <TableTh> Manager </TableTh>
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
                                            <tr key={i} className={`text-center ${i % 2 === 0 ? "bg-white" : "bg-gray-50"}`}>
                                                <TableTd> 
                                                <div className="flex items-center justify-start lg:gap-4 sm:gap-2 gap-1">
                                                    <button onClick={() => handleDelete(employee.documentId, employee.fullName)}  title="Delete employee" className="text-red-600 hover:text-red-800 p-1 rounded transition-colors" aria-label={`Delete ${employee.fullName}`}>
                                                    <FaTrash />
                                                </button>
                                                {employee.fullName}
                                                </div>
                                            </TableTd>
                                                <TableTd> {employee.jobTitle} </TableTd>
                                                <TableTd> {employee.location} </TableTd>
                                                <TableTd> {employee.department} </TableTd>
                                                <TableTd> {employee.directManager} </TableTd>
                                            </tr>
                                        ))
                                    )}
                                </tbody>
                        </Table>
                    </div>
                </div>
            </OuterContainer>
        </>
    );
}

export default RemoveEmpForm;
