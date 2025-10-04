'use client'
import { UseEmpInformationStore } from '@/app/store/UseEmpInformationStore';
import React, { useEffect} from 'react'; 
import Title from '../../common/Title';
import Table from '../../common/TableComponents/Table';
import TableTh from '../../common/TableComponents/TableTh';
import TableTd from '../../common/TableComponents/TableTd';

function Credit() {
    const { userData, fetchUser  } = UseEmpInformationStore();
    useEffect(() => {
        fetchUser();
    }, []);
    const vacTypes = [
        {
            label: "Rest Day",
            total: userData[0]?.restDay,
            used: userData[0]?.restDayTaken,
        },
        {
            label: "Annual Vacation",
            total: userData[0]?.annualLeaves,
            used: userData[0]?.annualLeavesTaken,
        },
        {
            label: "Emergency Leave",
            total: userData[0]?.emergencyLeave,
            used: userData[0]?.emergencyLeaveTaken,
        },
    ];
    return (
        <div className="flex flex-col gap-2 rounded-lg shadow-md p-5 max-w-md mx-auto">
            <div>
                <Title title='credit'/>
            </div>
            <Table>
                <thead>
                        <tr className='bg-[var(--color-primary)]  text-white lg:font-semibold md:text-sm sm:text-sm font-normal text:xs'>
                            <TableTh>Type</TableTh>
                            <TableTh>Total Available</TableTh>
                            <TableTh>Remaining</TableTh>
                            <TableTh>Used</TableTh>
                        </tr>
                    </thead>
                    <tbody>
                        {vacTypes.length === 0 ? (
            <tr>
                <td colSpan={4} className="text-center py-4 text-gray-500">
                    No vacation available.
                </td>
            </tr>
        ) : (
            vacTypes.map(({ label, total, used }, i) => (
                <tr key={i} className="bg-base-200"> 
                    <TableTd>{label}</TableTd> 
                    <TableTd>{total}</TableTd>
                    <TableTd>{Math.max(0, total - used)}</TableTd>
                    <TableTd>{used}</TableTd>
                </tr>
            ))
        )}
                    </tbody>
            </Table>
        </div>
    );
}

export default Credit;
