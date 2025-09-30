'use client'
import { UseEmpInformationStore } from '@/app/store/UseEmpInformationStore';
import React, { useEffect, useState } from 'react';
import toast, { Toaster } from 'react-hot-toast';
import { UseCarRequestStore } from '@/app/store/UseCarRequestStore';
import Title from '../../common/Title';
import { FaCheck, FaTimes } from 'react-icons/fa';

function CarRequestApproval() {
    const { empName, userData } = UseEmpInformationStore();
    const { CarRequests, fetchReq, updateCarRequestStatus } = UseCarRequestStore();
    const [selected, setSelected] = useState({});
    useEffect(() => {
        fetchReq();
    }, []);
    const filteredCarRequests = CarRequests.filter((Req) => {
        if (Req.approval !== null) return false;
        switch (Req.serviceType) {
            case 'hr':
                return userData?.[0]?.jobTitle.toLowerCase() === 'hr manager' && Req.empName !== empName;
            case 'procurement and supply':
                return userData?.[0]?.jobTitle.toLowerCase() === 'procurement manager' && Req.empName !== empName;
            case 'transportation':
                return userData?.[0]?.jobTitle.toLowerCase() === 'project manager' && Req.empName !== empName;
            case 'operation':
                return userData?.[0]?.jobTitle.toLowerCase() === 'production manager' && Req.empName !== empName;
            default:
                return false;
        }
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
                await updateCarRequestStatus(id, true);
            }
            toast.success('Approved successfully!');
            setSelected({});
            await fetchReq();
        } catch (error) {
            toast.error('Failed to approve Requests.');
        }
    };
    const handleRejectSelected = async () => {
        const selectedIds = Object.keys(selected).filter(id => selected[id]);
        if (selectedIds.length === 0) {
            toast.error('Please select at least one request to reject.');
            return;
        }
        try {
            for (const id of selectedIds) {
                await updateCarRequestStatus(id, false);
            }
            toast.success('Rejected successfully!');
            setSelected({});
            await fetchReq();
        } catch (error) {
            toast.error('Failed to reject CarRequests.');
            console.error(error);
        }
    };

    return (
        <div className='lg:col-span-8 col-span-12 bg-white p-5 rounded-xl shadow-md'>
            <Toaster />
            <Title title='Car Requests Approval' />
            {filteredCarRequests.length === 0 ? (
                <p className="text-center text-gray-500 mt-4">No pending car requests.</p>
            ) : (
                <>
                    <div className="overflow-x-auto mt-4 rounded-lg bg-white">
                        <table className="min-w-full border border-gray-300 overflow-hidden ">
                            <thead className="bg-(--color-primary) text-white">
                                <tr>
                                    <th className="border border-gray-300 px-4 py-2">Emp Name</th>
                                    <th className="border border-gray-300 px-4 py-2">From</th>
                                    <th className="border border-gray-300 px-4 py-2">To</th>
                                    <th className="border border-gray-300 px-4 py-2">Location</th>
                                    <th className="border border-gray-300 px-4 py-2">Destination</th>
                                    <th className="border border-gray-300 px-4 py-2">Service Type</th>
                                    <th className="border border-gray-300 px-4 py-2">Reason</th>
                                    <th className="border border-gray-300 px-4 py-2">Description</th>
                                    <th className="border border-gray-300 px-4 py-2">Passengers</th>
                                    <th className="border border-gray-300 px-4 py-2">Car Type</th>
                                    <th className="border border-gray-300 px-4 py-2">Driver</th>
                                    <th className="border border-gray-300 px-4 py-2">Select</th>
                                </tr>
                            </thead>
                            <tbody>
                                {filteredCarRequests.map((req) => (
                                    <tr key={req.documentId} className="text-center hover:bg-gray-50">
                                        <td className="border border-gray-300 px-4 py-2">{req.empName || '-'}</td>
                                        <td className="border border-gray-300 px-4 py-2">{req.dateFrom}</td>
                                        <td className="border border-gray-300 px-4 py-2">{req.dateTo}</td>
                                        <td className="border border-gray-300 px-4 py-2">{req.yourLocation || '-'}</td>
                                        <td className="border border-gray-300 px-4 py-2">{req.destination || '-'}</td>
                                        <td className="border border-gray-300 px-4 py-2">{req.serviceType}</td>
                                        <td className="border border-gray-300 px-4 py-2">{req.reason || '-'}</td>
                                        <td className="border border-gray-300 px-4 py-2">{req.description || '-'}</td>
                                        <td className="border border-gray-300 px-4 py-2">{req.numberOfPassengers || '-'}</td>
                                        <td className="border border-gray-300 px-4 py-2">{req.carType || '-'}</td>
                                        <td className="border border-gray-300 px-4 py-2">{req.driverName || '-'}</td>
                                        <td className="border border-gray-300 px-4 py-2">
                                            <input
                                                type="checkbox"
                                                checked={!!selected[req.documentId]}
                                                onChange={() => handleCheckboxChange(req.documentId)}
                                                disabled={req.approval === true}
                                                className="h-4 w-4 text-sky-600 rounded"
                                            />
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                    <div className="mt-6 flex gap-3">
                        <button
                            className="flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white px-5 py-2 rounded-lg shadow transition"
                            onClick={handleApprove}
                            disabled={Object.values(selected).every(v => !v)}>
                            <FaCheck /> Approve
                        </button>
                        <button
                            className="flex items-center gap-2 bg-red-600 hover:bg-red-700 text-white px-5 py-2 rounded-lg shadow transition"
                            onClick={handleRejectSelected}
                            disabled={Object.values(selected).every(v => !v)}>
                            <FaTimes /> Reject
                        </button>
                    </div>
                </>
            )}
        </div>
    );
}

export default CarRequestApproval;
