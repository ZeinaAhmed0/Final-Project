'use client'
import { UseEmpInformationStore } from '@/app/store/UseEmpInformationStore';
import React, { useEffect, useState } from 'react';
import toast, { Toaster } from 'react-hot-toast';
import { UseCarRequestStore } from '@/app/store/UseCarRequestStore';
import Title from '../../common/Title';
import { FaCheck, FaTimes } from 'react-icons/fa';
import Table from '../../common/TableComponents/Table';
import TableTh from '../../common/TableComponents/TableTh';
import TableTd from '../../common/TableComponents/TableTd';

function CarRequestApproval() {
    const { empName, userData, fetchUser } = UseEmpInformationStore();
    const { CarRequests, fetchReq, updateCarRequestStatus } = UseCarRequestStore();
    const [selected, setSelected] = useState({});
    useEffect(() => {
        fetchReq();
        fetchUser();
    }, []);
    const filteredCarRequests = CarRequests.filter((Req) => {
        switch (Req.serviceType) {
            case 'hr':
                return userData?.[0]?.jobTitle.toLowerCase() === 'hr manager' && Req.empName !== empName;
            case 'procurement and supply':
                return userData?.[0]?.jobTitle.toLowerCase() === 'procurement manager' && Req.empName !== empName;
            case 'transportation':
                return userData?.[0]?.jobTitle.toLowerCase() === 'project manager' && Req.empName !== empName;
            case 'operation':
                return userData?.[0]?.jobTitle.toLowerCase() === 'production manager' && Req.empName !== empName;
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
        try {
            for (const id of selectedIds) {
                await updateCarRequestStatus(id, false);
            }
            toast.success('Rejected successfully!');
            setSelected({});
            await fetchReq();
        } catch (error) {
            toast.error('Failed to reject CarRequests.');
        }
    };
    return (
        <div className='lg:col-span-8 col-span-12 bg-white p-5 m-6 rounded-xl shadow-md'>
            <Toaster />
            <Title title='Car Requests Approval' />
            <>
                <Table>
                    <thead className="bg-[var(--color-primary)] text-white">
                        <tr>
                            <TableTh>Emp Name</TableTh>
                            <TableTh>From</TableTh>
                            <TableTh>To</TableTh>
                            <TableTh>Location</TableTh>
                            <TableTh>Destination</TableTh>
                            <TableTh>Service Type</TableTh>
                            <TableTh>Reason</TableTh>
                            <TableTh>Description</TableTh>
                            <TableTh>Passengers</TableTh>
                            <TableTh>Car Type</TableTh>
                            <TableTh>Driver</TableTh>
                            <TableTh>Select</TableTh>
                        </tr>
                    </thead>
                    {filteredCarRequests.length === 0 ?
                        (<p className="text-center text-gray-500 mt-4">No pending car requests.</p>) :
                        (<tbody>
                            {filteredCarRequests.map((req) => (
                                <tr key={req.documentId} className="text-center hover:bg-gray-50">
                                    <TableTd>{req.empName || '-'}</TableTd>
                                    <TableTd>{req.dateFrom}</TableTd>
                                    <TableTd>{req.dateTo}</TableTd>
                                    <TableTd>{req.yourLocation || '-'}</TableTd>
                                    <TableTd>{req.destination || '-'}</TableTd>
                                    <TableTd>{req.serviceType}</TableTd>
                                    <TableTd>{req.reason || '-'}</TableTd>
                                    <TableTd>{req.description || '-'}</TableTd>
                                    <TableTd>{req.numberOfPassengers || '-'}</TableTd>
                                    <TableTd>{req.carType || '-'}</TableTd>
                                    <TableTd>{req.driverName || '-'}</TableTd>
                                    <TableTd>
                                        <input
                                            type="checkbox"
                                            checked={!!selected[req.documentId]}
                                            onChange={() => handleCheckboxChange(req.documentId)}
                                            disabled={req.approval === true}
                                            className="h-4 w-4 text-sky-600 rounded"
                                        />
                                    </TableTd>
                                </tr>
                            ))}
                        </tbody>
                        )}
                </Table>
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
        </div>
    );
}

export default CarRequestApproval;
