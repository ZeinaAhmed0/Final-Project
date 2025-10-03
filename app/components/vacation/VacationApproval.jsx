'use client'
import { UseEmpInformationStore } from '@/app/store/UseEmpInformationStore';
import { UseVacationStore } from '@/app/store/UseVacationStore';
import React, { useEffect, useState } from 'react';
import toast, { Toaster } from 'react-hot-toast';
import Title from '../common/Title';
import { FaCheck, FaTimes } from 'react-icons/fa';
import Table from '../common/TableComponents/Table';
import TableTh from '../common/TableComponents/TableTh';
import TableTd from '../common/TableComponents/TableTd';

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
                <Title title='vacations requests approval' />
                <>
                    <Table>
                        <thead>
                                <tr className='bg-[var(--color-primary)] text-white font-semibold'>
                                    <TableTh>emp name</TableTh>
                                    <TableTh>from</TableTh>
                                    <TableTh>to</TableTh>
                                    <TableTh>Type</TableTh>
                                    <TableTh>notes</TableTh>
                                    <TableTh>description</TableTh>
                                    <TableTh>status</TableTh>
                                    <TableTh>Select</TableTh>
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
                                            <TableTd>{vac.empName || '-'}</TableTd>
                                            <TableTd>{vac.dateFrom}</TableTd>
                                            <TableTd>{vac.dateTo}</TableTd>
                                            <TableTd>{vac.leavesType}</TableTd>
                                            <TableTd>{vac.notes || '-'}</TableTd>
                                            <TableTd>{vac.description || '-'}</TableTd>
                                            <TableTd>
                                                {vac.approval === true ? 'Approved' : vac.approval === false ? 'Rejected' : 'Pending'}
                                            </TableTd>
                                            <TableTd>
                                                <input
                                                    type="checkbox"
                                                    checked={!!selected[vac.documentId]}
                                                    onChange={() => handleCheckboxChange(vac.documentId)}
                                                    disabled={vac.approval === true} />
                                            </TableTd>
                                        </tr>
                                    ))
                                )}
                            </tbody>
                    </Table>
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