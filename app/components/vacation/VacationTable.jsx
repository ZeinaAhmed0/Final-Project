'use client'
import React, { useEffect } from 'react'
import Title from '../common/Title';
import { UseVacationStore } from '@/app/store/UseVacationStore';
import { UseEmpInformationStore } from '@/app/store/UseEmpInformationStore';
import Table from '../common/TableComponents/Table';
import TableTd from '../common/TableComponents/TableTd';
import TableTh from '../common/TableComponents/TableTh';

function VacationTable() {
    const { fetchVac, approvedVacations } = UseVacationStore();
    const { userData, fetchUser  } = UseEmpInformationStore();
    useEffect(() => {
        fetchVac();
        fetchUser ();
    }, []);
    const myVac = approvedVacations.filter(
        (vac) => vac.empName === userData?.[0]?.fullName
    );
    return (
        <>
            <div className='flex flex-col gap-2 rounded-lg shadow-md p-5 mx-auto bg-white'>
                <div>
                    <Title title='vacations' />
                </div>
                <Table>
                    <thead>
                            <tr className="bg-[var(--color-primary)] text-white lg:font-semibold md:text-xl sm:text-sm font-normal text:xs">
                                <TableTh>From</TableTh>
                                <TableTh>To</TableTh>
                                <TableTh>Days</TableTh>
                                <TableTh>Type</TableTh>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                myVac.map((vac) => {
                                    const diffTime = new Date(vac.dateTo).getTime() - new Date(vac.dateFrom).getTime();
                                    const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24)) + 1;
                                    return (
                                        <tr key={vac.id} className='lg:font-semibold md:text-xl sm:text-sm font-normal text:xs'>
                                            <TableTd>{vac.dateFrom}</TableTd>
                                            <TableTd>{vac.dateTo}</TableTd>
                                            <TableTd>{diffDays}</TableTd>
                                            <TableTd>{vac.leavesType}</TableTd>
                                        </tr>
                                    )
                                })
                            }
                        </tbody>
                </Table>
            </div>
        </>
    )
}

export default VacationTable
