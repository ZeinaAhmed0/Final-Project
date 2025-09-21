'use client'
import { UseEmpInformationStore } from '@/app/store/UseEmpInformationStore';
import { UseVacationStore } from '@/app/store/UseVacationStore';
import React, { useEffect, useState } from 'react';
import toast, { Toaster } from 'react-hot-toast';
import Title from '../common/Title';

function VacationApproval() {
    const { empName, userData } = UseEmpInformationStore();
    const { vacations, fetchVac, updateVacationStatus } = UseVacationStore();
    const [selected, setSelected] = useState({});

    useEffect(() => {
        fetchVac();
    }, []);
    const filteredVacations = vacations.filter(vac => {
        return (vac.directManager === empName || vac.manager === empName)
            && vac.empName !== empName
            && (vac.approval === null);
    });
    const handleCheckboxChange = (documentId) => {
        setSelected(prev => ({
            ...prev,
            [documentId]: !prev[documentId],
        }));
    };

    const handleApprove = async () => {
        const selectedIds = Object.keys(selected).filter(id => selected[id]);
        if (selectedIds.length === 0) {
            toast.error('Please select at least one vacation to approve.');
            return;
        }
        try {
            for (const id of selectedIds) {
                await updateVacationStatus(id, true);
            }
            toast.success('Approved successfully!');
            setSelected({});
            await fetchVac();
        } catch (error) {
            toast.error('Failed to approve vacations.');
            console.error(error);
        }
    };

    const handleRejectSelected = async () => {
        const selectedIds = Object.keys(selected).filter(id => selected[id]);
        if (selectedIds.length === 0) {
            toast.error('Please select at least one vacation to reject.');
            return;
        }
        try {
            for (const id of selectedIds) {
                await updateVacationStatus(id, false);
            }
            toast.success('Rejected successfully!');
            setSelected({});
            await fetchVac();
        } catch (error) {
            toast.error('Failed to reject vacations.');
            console.error(error);
        }
    };
    // switch (leaveType) {
    //                 case "annualLeaves":
    //                     updatedEmployeeData.annualLeavesTaken = (userData.annualLeavesTaken || 0) + 1;
    //                     break;
    //                 case "emergencyLeave":
    //                     updatedEmployeeData.emergencyLeaveTaken = (userData.emergencyLeaveTaken || 0) + 1;
    //                     break;
    //                 case "restDay":
    //                     updatedEmployeeData.restDayTaken = (userData.restDayTaken || 0) + 1;
    //                     break;
    //                 default:
    //                     console.warn('Unknown leave type:', leaveType);
    //                     return;
    //             }

    if (!userData || userData[0]?.department !== "management") {
        return null;
    }

    return (
        <div className='lg:col-span-8 col-span-12'>
            <Toaster />
            <Title title='vacations requests' />
            {filteredVacations.length === 0 ? (
                <p className="text-center text-gray-500 mt-4">No pending vacation requests.</p>
            ) : (
                <>
                    <table className="min-w-full border-collapse border border-black bg-gray-100 text-sky-700">
                        <thead>
                            <tr>
                                <th className="border border-black px-4 py-2">emp name</th>
                                <th className="border border-black px-4 py-2">from</th>
                                <th className="border border-black px-4 py-2">to</th>
                                <th className="border border-black px-4 py-2">Type</th>
                                <th className="border border-black px-4 py-2">notes</th>
                                <th className="border border-black px-4 py-2">description</th>
                                <th className="border border-black px-4 py-2">status</th>
                                <th className="border border-black px-4 py-2">Select</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredVacations.map((vac) => (
                                <tr key={vac.documentId} className="text-center">
                                    <td className="border border-black">{vac.empName || '-'}</td>
                                    <td className="border border-black">{vac.dateFrom}</td>
                                    <td className="border border-black">{vac.dateTo}</td>
                                    <td className="border border-black">{vac.leavesType}</td>
                                    <td className="border border-black">{vac.notes || '-'}</td>
                                    <td className="border border-black">{vac.description || '-'}</td>
                                    <td className="border border-black">
                                        {vac.approval === true ? 'Approved' : vac.approval === false ? 'Rejected' : 'Pending'}
                                    </td>
                                    <td className="border border-black">
                                        <input
                                            type="checkbox"
                                            checked={!!selected[vac.documentId]}
                                            onChange={() => handleCheckboxChange(vac.documentId)}
                                            disabled={vac.approval === true} />
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>

                    <div className="mt-4 space-x-2">
                        <button
                            className="btn bg-sky-700 text-white px-4 py-2 rounded"
                            onClick={handleApprove}
                            disabled={Object.values(selected).every(v => !v)}>
                            Approve Selected
                        </button>
                        <button
                            className="btn bg-red-600 text-white px-4 py-2 rounded"
                            onClick={handleRejectSelected}
                            disabled={Object.values(selected).every(v => !v)}>
                            Reject Selected
                        </button>
                    </div>
                </>
            )}
        </div>
    );
}

export default VacationApproval;
