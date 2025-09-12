'use client'
import React, { useEffect } from 'react';
import Link from 'next/link';
import { UseVacationStore } from '@/app/store/UseVacationStore';
import { UseEmpInformationStore } from '@/app/store/UseEmpInformationStore';

function VacationHistoryPage() {
    const {userData } = UseEmpInformationStore();
    const { fetchVac } = UseVacationStore();

    useEffect(() => {
        fetchVac();
    }, []);

    if (!userData || userData.length === 0) {
        return null;
    }
    if (userData[0]?.jobTitle?.toLowerCase() === 'general manager') {
        return (
            <Link href="/VacationHistory">
                <button className="btn rounded-2xl capitalize">See All Vacations</button>
            </Link>
        );
    }
    return (
        <Link href="/VacationForm">
            <button className="btn rounded-2xl capitalize">Send Leave Request</button>
        </Link>
    );
}

export default VacationHistoryPage;
