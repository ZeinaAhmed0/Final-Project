import ImpPhoneNumbers from '@/app/pages/phoneNumbers/ImpPhoneNumbers'
import React from 'react'

function ImportantPhoneNumbers() {
  return (
    <>
    <div className="bg-white">
      <h1 className='text-xl font-semibold p-5 capitalize'>important phone numbers</h1>
    <hr opacity={20}/>
    <ImpPhoneNumbers/>
    </div>
    </>
  )
}

export default ImportantPhoneNumbers