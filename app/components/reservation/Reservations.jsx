'use client'
import React, { useEffect} from 'react';
import Title from '../common/Title';
import { UseReservationstore } from '@/app/store/UseReservationStore';

function Reservation() {
    const { reservations, fetchReservation} = UseReservationstore();
    useEffect(() => {
        fetchReservation();
    }, []);

    return (
        <div className='col-span-12'>
            <div className='flex flex-col gap-4 shadow-lg p-6 bg-white'>
                <Title title='reservations requests' />
                <>
                    <div className="overflow-x-auto rounded-lg ">
                        <table className="min-w-full border-collapse border border-gray-300 text-(--color-primary) rounded-lg ">
                            <thead>
                                <tr className='bg-(--color-primary) text-white font-semibold'>
                                    <th className="border border-gray-300 px-4 py-2">emp name</th>
                                    <th className="border border-gray-300 px-4 py-2">insert date</th>
                                    <th className="border border-gray-300 px-4 py-2">visit station</th>
                                    <th className="border border-gray-300 px-4 py-2">accommodation place</th>
                                    <th className="border border-gray-300 px-4 py-2">purpose of stay</th>
                                    <th className="border border-gray-300 px-4 py-2">notes</th>
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
                                        <tr key={vac.documentId} className="text-center">
                                            <td className="border border-gray-300">{vac.empName || '-'}</td>
                                            <td className="border border-gray-300">{vac.insertDate}</td>
                                            <td className="border border-gray-300">{vac.visitStation}</td>
                                            <td className="border border-gray-300">{vac.accommodationPlace}</td>
                                            <td className="border border-gray-300">{vac.purposeOfStay || '-'}</td>
                                            <td className="border border-gray-300">{vac.notes || '-'}</td>
                                        </tr>
                                    ))
                                )}
                            </tbody>
                        </table>
                    </div>
                </>
            </div>
        </div>
    );
}

export default Reservation;