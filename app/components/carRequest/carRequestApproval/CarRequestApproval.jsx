'use client'
import { UseEmpInformationStore } from '@/app/store/UseEmpInformationStore';
import React, { useEffect, useState } from 'react';
import toast, { Toaster } from 'react-hot-toast';
import { UseCarRequestStore } from '@/app/store/UseCarRequestStore';
import Title from '../../common/Title';

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
            toast.error('Failed to approve CarRequests.');
            console.error(error);
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
        <div className='lg:col-span-8 col-span-12 bg-white p-5'>
                <Toaster />
                <Title title='Car Requests Approval' />
                {filteredCarRequests.length === 0 ? (
                    <p className="text-center text-gray-500 mt-4">No pending car requests.</p>
                ) : (
                    <>
                        <table className="min-w-full border-collapse border border-black bg-gray-100 text-sky-700">
                            <thead>
                                <tr>
                                    <th className="border border-black px-4 py-2">emp name</th>
                                    <th className="border border-black px-4 py-2">from</th>
                                    <th className="border border-black px-4 py-2">to</th>
                                    <th className="border border-black px-4 py-2">location</th>
                                    <th className="border border-black px-4 py-2">destination</th>
                                    <th className="border border-black px-4 py-2">service type</th>
                                    <th className="border border-black px-4 py-2">reason</th>
                                    <th className="border border-black px-4 py-2">description</th>
                                    <th className="border border-black px-4 py-2">no. of passengers</th>
                                    <th className="border border-black px-4 py-2">car type</th>
                                    <th className="border border-black px-4 py-2">driver name</th>
                                    <th className="border border-black px-4 py-2">Select</th>
                                </tr>
                            </thead>
                            <tbody>
                                {filteredCarRequests.map((req) => (
                                    <tr key={req.documentId} className="text-center">
                                        <td className="border border-black">{req.empName || '-'}</td>
                                        <td className="border border-black">{req.dateFrom}</td>
                                        <td className="border border-black">{req.dateTo}</td>
                                        <td className="border border-black">{req.yourLocation || '-'}</td>
                                        <td className="border border-black">{req.destination || '-'}</td>
                                        <td className="border border-black">{req.serviceType}</td>
                                        <td className="border border-black">{req.reason || '-'}</td>
                                        <td className="border border-black">{req.description || '-'}</td>
                                        <td className="border border-black">{req.numberOfPassengers || '-'}</td>
                                        <td className="border border-black">{req.carType || '-'}</td>
                                        <td className="border border-black">{req.driverName || '-'}</td>
                                        <td className="border border-black">
                                            <input
                                                type="checkbox"
                                                checked={!!selected[req.documentId]}
                                                onChange={() => handleCheckboxChange(req.documentId)}
                                                disabled={req.approval === true} />
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

export default CarRequestApproval;