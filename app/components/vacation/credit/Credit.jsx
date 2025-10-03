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
    if (!userData || userData.length === 0) {
        return (
            <div className="flex flex-col gap-2 rounded-lg shadow-md p-5 max-w-md mx-auto">
                <Title title='credit' />
                <p className="text-center text-gray-500">No user data available.</p>
            </div>
        );
    }
    const vacTypes = [
        {
            label: "Rest Day",
            total: userData[0]?.restDay || 0,
            used: userData[0]?.restDayTaken || 0,
        },
        {
            label: "Annual Vacation",
            total: userData[0]?.annualLeaves || 0,
            used: userData[0]?.annualLeavesTaken || 0,
        },
        {
            label: "Emergency Leave",
            total: userData[0]?.emergencyLeave || 0,
            used: userData[0]?.emergencyLeaveTaken || 0,
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
