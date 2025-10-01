import VacationArchiveTable from '@/app/components/vacation/VacationArchiveTable';
import { UseEmpInformationStore } from '@/app/store/UseEmpInformationStore';
import React, { useEffect} from 'react';

function VacationArchivePage() {
    const { userData, fetchUser  } = UseEmpInformationStore();
    useEffect(() => {
        fetchUser ();
    }, [fetchUser ]);

    if (userData?.[0]?.jobTitle?.toLowerCase() === 'general manager') {
        return;
    }

    return (
        <div className='col-span-12'><VacationArchiveTable /></div>
    );
}

export default VacationArchivePage;
