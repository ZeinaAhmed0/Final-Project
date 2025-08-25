'use client'
import React from 'react'
import { useImpPhoneNOStore } from '@/app/store/ImpPhoneNOStore'
function ImpPhoneNumbers() {
    const { impPhoneNO } = useImpPhoneNOStore()
    return (
        <div className='p-5'> 
            {impPhoneNO.map((phone) => (
                    <div className='flex items-center gap-2 p-1' key={phone.id}>
                        <p>{phone.title} : <span>{phone.number}</span></p>
                    </div>
            ))}
        </div>
    )
}

export default ImpPhoneNumbers
