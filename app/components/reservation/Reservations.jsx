'use client'
import React, { useEffect} from 'react';
import Title from '../common/Title';
import { UseReservationstore } from '@/app/store/UseReservationStore';
import Table from '../common/TableComponents/Table';
import TableTd from '../common/TableComponents/TableTd';
import TableTh from '../common/TableComponents/TableTh';

function Reservation() {
    const { reservations, fetchReservation} = UseReservationstore();
    useEffect(() => {
        fetchReservation();
    }, [fetchReservation()]);

    return (
        <div className='col-span-12'>
            <div className='flex flex-col gap-4 shadow-lg p-6 bg-white'>
                <Title title='reservations requests' />
                <>
                    <Table>
                        <thead>
                                <tr className='bg-[var(--color-primary)] text-white lg:font-semibold md:text-xl sm:text-sm font-normal text:xs'>
                                    <TableTh>emp name</TableTh>
                                    <TableTh>insert date</TableTh>
                                    <TableTh>visit station</TableTh>
                                    <TableTh>accommodation place</TableTh>
                                    <TableTh>purpose of stay</TableTh>
                                    <TableTh>notes</TableTh>
                                </tr>
                            </thead>
                            <tbody>
                                {reservations?.length === 0 ? (
                                    <tr>
                                        <td colSpan={12} className="text-center py-4 text-gray-500">
                                            No pending vacation requests.
                                        </td>
                                    </tr>
                                ) : (
                                    reservations.map((vac) => (
                                        <tr key={vac.documentId} className="text-center lg:font-medium md:text-xl sm:text-sm font-normal text:xs">
                                            <TableTd>{vac.empName || '-'}</TableTd>
                                            <TableTd>{vac.insertDate}</TableTd>
                                            <TableTd>{vac.visitStation}</TableTd>
                                            <TableTd>{vac.accommodationPlace}</TableTd>
                                            <TableTd>{vac.purposeOfStay || '-'}</TableTd>
                                            <TableTd>{vac.notes || '-'}</TableTd>
                                        </tr>
                                    ))
                                )}
                            </tbody>
                    </Table>
                </>
            </div>
        </div>
    );
}

export default Reservation;