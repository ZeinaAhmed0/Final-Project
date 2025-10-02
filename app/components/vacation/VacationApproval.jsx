'use client'
import { UseEmpInformationStore } from '@/app/store/UseEmpInformationStore';
import { UseVacationStore } from '@/app/store/UseVacationStore';
import React, { useEffect, useState } from 'react';
import toast, { Toaster } from 'react-hot-toast';
import Title from '../common/Title';
import { FaCheck, FaTimes } from 'react-icons/fa';

function VacationApproval() {
    const { empName, fetchUser } = UseEmpInformationStore();
    const { vacations, fetchVac, updateVacationStatus, updateEmployeeLeaveTakenByName } = UseVacationStore();
    const [selected, setSelected] = useState({});
    useEffect(() => {
        fetchVac();
        fetchUser();
    }, []);

    const filteredVacations = vacations.filter(vac => {
        return (vac.directManager === empName || vac.manager === empName)
            && vac.empName !== empName
            && (vac.approval === null);
    });
    const calculateDaysTaken = (dateFrom, dateTo) => {
        const from = new Date(dateFrom);
        const to = new Date(dateTo);
        const diffTime = Math.abs(to - from);
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)) + 1;
        return diffDays;
    };
    const getLeaveTypeField = (leaveType) => {
        const type = leaveType.toLowerCase().trim();
        switch (type) {
            case 'annual':
            case 'annual leave':
                return 'annualLeavesTaken';
            case 'emergency':
            case 'emergency leave':
                return 'emergencyLeaveTaken';
            case 'rest':
            case 'rest day':
                return 'restDayTaken';
            default:
                console.warn(`Unknown leave type: ${type}`);
                return null;
        }
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
                const vac = vacations.find(v => v.documentId === id);
                if (vac) {
                    const days = calculateDaysTaken(vac.dateFrom, vac.dateTo);
                    const field = getLeaveTypeField(vac.leavesType);
                    if (field && days > 0) {
                        await updateEmployeeLeaveTakenByName(vac.empName, field, days);
                    }
                }
            }
            toast.success('Approved successfully!');
            setSelected({});
            await fetchVac();
            await fetchUser();
        } catch (error) {
            toast.error('Failed to approve vacations.');
        }
    };

    const handleCheckboxChange = (documentId) => {
        setSelected(prev => ({
            ...prev,
            [documentId]: !prev[documentId],
        }));
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
            await fetchUser();
        } catch (error) {
            toast.error('Failed to reject vacations.');
        }
    };

    return (
        <div className='col-span-12'>
            <div className='flex flex-col gap-4 shadow-lg p-6 bg-white'>
                <Toaster />
                <Title title='vacations requests' />
                <>
                    <div className="overflow-x-auto rounded-lg ">
                        <table className="min-w-full border-collapse border border-gray-300 text-(--color-primary) rounded-lg ">
                            <thead>
                                <tr className='bg-(--color-primary) text-white font-semibold'>
                                    <th className="border border-gray-300 px-4 py-2">emp name</th>
                                    <th className="border border-gray-300 px-4 py-2">from</th>
                                    <th className="border border-gray-300 px-4 py-2">to</th>
                                    <th className="border border-gray-300 px-4 py-2">Type</th>
                                    <th className="border border-gray-300 px-4 py-2">notes</th>
                                    <th className="border border-gray-300 px-4 py-2">description</th>
                                    <th className="border border-gray-300 px-4 py-2">status</th>
                                    <th className="border border-gray-300 px-4 py-2">Select</th>
                                </tr>
                            </thead>
                            <tbody>
                                {filteredVacations.length === 0 ? (
                                    <tr>
                                        <td colSpan={12} className="text-center py-4 text-gray-500">
                                            No pending vacation requests.
                                        </td>
                                    </tr>
                                ) : (
                                    filteredVacations.map((vac) => (
                                        <tr key={vac.documentId} className="text-center">
                                            <td className="border border-gray-300">{vac.empName || '-'}</td>
                                            <td className="border border-gray-300">{vac.dateFrom}</td>
                                            <td className="border border-gray-300">{vac.dateTo}</td>
                                            <td className="border border-gray-300">{vac.leavesType}</td>
                                            <td className="border border-gray-300">{vac.notes || '-'}</td>
                                            <td className="border border-gray-300">{vac.description || '-'}</td>
                                            <td className="border border-gray-300">
                                                {vac.approval === true ? 'Approved' : vac.approval === false ? 'Rejected' : 'Pending'}
                                            </td>
                                            <td className="border border-gray-300">
                                                <input
                                                    type="checkbox"
                                                    checked={!!selected[vac.documentId]}
                                                    onChange={() => handleCheckboxChange(vac.documentId)}
                                                    disabled={vac.approval === true} />
                                            </td>
                                        </tr>
                                    ))
                                )}
                            </tbody>
                        </table>
                    </div>
                    <div className="mt-6 flex gap-3">
                        <button
                            className="flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white px-5 py-2 rounded-md shadow transition"
                            onClick={handleApprove}
                            disabled={Object.values(selected).every(v => !v)}>
                            <FaCheck /> Approve 
                        </button>
                        <button
                            className="flex items-center gap-2 bg-red-600 hover:bg-red-700 text-white px-5 py-2 rounded-md shadow transition"
                            onClick={handleRejectSelected}
                            disabled={Object.values(selected).every(v => !v)}>
                            <FaTimes /> Reject 
                        </button>
                    </div>
                </>
            </div>
        </div>
    );
}

export default VacationApproval;