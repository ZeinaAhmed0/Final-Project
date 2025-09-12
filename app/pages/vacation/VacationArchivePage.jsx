import VacationArchiveTable from '@/app/components/vacation/VacationArchiveTable';
import { UseEmpInformationStore } from '@/app/store/UseEmpInformationStore';
import React, { useEffect, useState } from 'react';
import LoadingPage from '../LoadingPage/LoadingPage';

function VacationArchivePage() {
    const { userData, fetchUser  } = UseEmpInformationStore();
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function loadData() {
            await fetchUser ();
            setLoading(false);
        }
        loadData();
    }, [fetchUser ]);

    if (loading) {
        return <LoadingPage/>;
    }

    if (userData?.[0]?.jobTitle?.toLowerCase() === 'general manager') {
        return;
    }

    return (
        <div className='lg:col-span-8 col-span-12'><VacationArchiveTable /></div>
    );
}

export default VacationArchivePage;
