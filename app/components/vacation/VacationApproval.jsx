'use client'
import { UseEmpInformationStore } from '@/app/store/UseEmpInformationStore';
import { UseVacationStore } from '@/app/store/UseVacationStore';
import React, { useEffect, useState } from 'react';
import toast, { Toaster } from 'react-hot-toast';
import Title from '../common/Title';
import { UseLoadingStore } from '@/app/store/UseLoadingStore';
import LoadingPage from '@/app/pages/LoadingPage/LoadingPage';

function VacationApproval() {
    const { empName, userData, fetchUser  } = UseEmpInformationStore();
    const { vacations, fetchVac, updateVacationStatus, updateEmployeeLeaveTakenByName } = UseVacationStore();
    const [selected, setSelected] = useState({});
    const { loading, setLoading } = UseLoadingStore();

    useEffect(() => {
        fetchVac();
        fetchUser ();
        setLoading(false);
    }, []);
    loading ? <LoadingPage/> : '';
    if (!userData?.[0] || userData[0]?.department !== "management") {
        return null;
    }

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
                    } else {
                        console.warn(`Invalid leave type or days for vacation ${id}`);
                    }
                }
            }
            toast.success('Approved successfully!');
            setSelected({});
            await fetchVac();
            await fetchUser ();
        } catch (error) {
            toast.error('Failed to approve vacations.');
            console.error(error);
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
            await fetchUser ();
        } catch (error) {
            toast.error('Failed to reject vacations.');
            console.error(error);
        }
    };

    return (
        <div className='col-span-12'>
            <div className='flex flex-col gap-4 rounded-lg shadow-lg p-6 bg-white max-w-7xl mx-auto'>
                <Toaster />
                <Title title='vacations requests' />
                {filteredVacations.length === 0 ? (
                    <p className="text-center text-gray-500 mt-4">No pending vacation requests.</p>
                ) : (
                    <>
                        <div className="overflow-x-auto">
                            <table className="min-w-full border-collapse border border-black bg-gray-100 text-sky-700">
                                <thead>
                                    <tr className='bg-sky-700 text-white font-semibold'>
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
                        </div>

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
        </div>
    );
}

export default VacationApproval;
// import { UseVacationStore } from '@/app/store/UseVacationStore';
// import React, { useEffect, useState } from 'react';
// import toast, { Toaster } from 'react-hot-toast';
// import Title from '../common/Title';

// function VacationApproval() {
//     const { empName, userData } = UseEmpInformationStore();
//     const { vacations, fetchVac, updateVacationStatus } = UseVacationStore();
//     const [selected, setSelected] = useState({});
//     const [loading, setLoading] = useState(true); // Added missing state for loading

//     useEffect(() => {
//         fetchUser (); // Assuming fetchUser  is defined elsewhere (e.g., in UseEmpInformationStore)
//         fetchVac();
//         setLoading(false);
//     }, [fetchUser , fetchVac]);

//     if (loading) {
//         return <LoadingPage />; // Assuming LoadingPage is imported/defined elsewhere
//     }

//     if (!userData || userData[0]?.department !== "management") {
//         return null;
//     }

//     const filteredVacations = vacations.filter(vac => {
//         return (vac.directManager === empName || vac.manager === empName)
//             && vac.empName !== empName
//             && (vac.approval === null);
//     });

//     const handleCheckboxChange = (documentId) => {
//         setSelected(prev => ({
//             ...prev,
//             [documentId]: !prev[documentId],
//         }));
//     };

//     const calculateDaysTaken = (dateFrom, dateTo) => {
//         const from = new Date(dateFrom);
//         const to = new Date(dateTo);
//         // Calculate inclusive days (e.g., from 2023-01-01 to 2023-01-03 = 3 days)
//         const diffTime = Math.abs(to - from);
//         const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)) + 1;
//         return diffDays;
//     };

//     const getLeaveTypeField = (leaveType) => {
//         const type = leaveType.toLowerCase().trim();
//         switch (type) {
//             case 'annual':
//             case 'annual leave':
//                 return 'annualLeavesTaken';
//             case 'emergency':
//             case 'emergency leave':
//                 return 'emergencyLeaveTaken';
//             case 'rest':
//             case 'rest day':
//                 return 'restDayTaken';
//             default:
//                 console.warn(`Unknown leave type: ${type}`);
//                 return null; // Or handle error
//         }
//     };

//     const handleApprove = async () => {
//         const selectedIds = Object.keys(selected).filter(id => selected[id]);
//         if (selectedIds.length === 0) {
//             toast.error('Please select at least one vacation to approve.');
//             return;
//         }
//         try {
//             for (const id of selectedIds) {
//                 // Update vacation status first
//                 await updateVacationStatus(id, true);

//                 // Now handle leave balance update
//                 const vac = vacations.find(v => v.documentId === id);
//                 if (vac) {
//                     const days = calculateDaysTaken(vac.dateFrom, vac.dateTo);
//                     const field = getLeaveTypeField(vac.leavesType);

//                     if (field && days > 0) {
//                         // TODO: Implement employee update logic here.
//                         // Assuming you have access to an employee store or API function like:
//                         // - UseEmployeeStore (if exists) with updateLeavesTaken(empName, field, days)
//                         // - Or an API call: await updateEmployeeLeaves(vac.empName, field, days);
//                         // Example placeholder (replace with actual implementation):
//                         // const { updateEmployeeLeaves } = UseEmployeeStore(); // Import if needed
//                         // await updateEmployeeLeaves(vac.empName, field, days);
                        
//                         // For now, logging as placeholder:
//                         console.log(`Update ${vac.empName}'s ${field} by +${days} days`);
                        
//                         // If you have the employee's current data (e.g., from API or store),
//                         // you can fetch it, increment, and update the document.
//                         // Example API structure from your snippet:
//                         // Fetch employee by empName or ID, then:
//                         // employee[field] = (employee[field] || 0) + days;
//                         // await updateEmployeeDocument(employee.id, { [field]: employee[field] });
//                     } else {
//                         console.warn(`Invalid leave type or days for vacation ${id}`);
//                     }
//                 }
//             }
//             toast.success('Approved successfully!');
//             setSelected({});
//             await fetchVac();
//             // Optionally, refetch employee data if needed to update UI
//         } catch (error) {
//             toast.error('Failed to approve vacations.');
//             console.error(error);
//         }
//     };

//     const handleRejectSelected = async () => {
//         const selectedIds = Object.keys(selected).filter(id => selected[id]);
//         if (selectedIds.length === 0) {
//             toast.error('Please select at least one vacation to reject.');
//             return;
//         }
//         try {
//             for (const id of selectedIds) {
//                 await updateVacationStatus(id, false);
//                 // No need to update leave balances on reject
//             }
//             toast.success('Rejected successfully!');
//             setSelected({});
//             await fetchVac();
//         } catch (error) {
//             toast.error('Failed to reject vacations.');
//             console.error(error);
//         }
//     };

//     return (
//         <div className='lg:col-span-8 col-span-12'>
//             <Toaster />
//             <Title title='vacations requests' />
//             {filteredVacations.length === 0 ? (
//                 <p className="text-center text-gray-500 mt-4">No pending vacation requests.</p>
//             ) : (
//                 <>
//                     <table className="min-w-full border-collapse border border-black bg-gray-100 text-sky-700">
//                         <thead>
//                             <tr>
//                                 <th className="border border-black px-4 py-2">emp name</th>
//                                 <th className="border border-black px-4 py-2">from</th>
//                                 <th className="border border-black px-4 py-2">to</th>
//                                 <th className="border border-black px-4 py-2">Type</th>
//                                 <th className="border border-black px-4 py-2">notes</th>
//                                 <th className="border border-black px-4 py-2">description</th>
//                                 <th className="border border-black px-4 py-2">status</th>
//                                 <th className="border border-black px-4 py-2">Select</th>
//                             </tr>
//                         </thead>
//                         <tbody>
//                             {filteredVacations.map((vac) => (
//                                 <tr key={vac.documentId} className="text-center">
//                                     <td className="border border-black">{vac.empName || '-'}</td>
//                                     <td className="border border-black">{vac.dateFrom}</td>
//                                     <td className="border border-black">{vac.dateTo}</td>
//                                     <td className="border border-black">{vac.leavesType}</td>
//                                     <td className="border border-black">{vac.notes || '-'}</td>
//                                     <td className="border border-black">{vac.description || '-'}</td>
//                                     <td className="border border-black">
//                                         {vac.approval === true ? 'Approved' : vac.approval === false ? 'Rejected' : 'Pending'}
//                                     </td>
//                                     <td className="border border-black">
//                                         <input
//                                             type="checkbox"
//                                             checked={!!selected[vac.documentId]}
//                                             onChange={() => handleCheckboxChange(vac.documentId)}
//                                             disabled={vac.approval === true} />
//                                     </td>
//                                 </tr>
//                             ))}
//                         </tbody>
//                     </table>

//                     <div className="mt-4 space-x-2">
//                         <button
//                             className="btn bg-sky-700 text-white px-4 py-2 rounded"
//                             onClick={handleApprove}
//                             disabled={Object.values(selected).every(v => !v)}>
//                             Approve Selected
//                         </button>
//                         <button
//                             className="btn bg-red-600 text-white px-4 py-2 rounded"
//                             onClick={handleRejectSelected}
//                             disabled={Object.values(selected).every(v => !v)}>
//                             Reject Selected
//                         </button>
//                     </div>
//                 </>
//             )}
//         </div>
//     );
// }

// export default VacationApproval;