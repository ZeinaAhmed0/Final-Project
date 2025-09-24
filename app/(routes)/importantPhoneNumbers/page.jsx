import Title from '@/app/components/common/Title'
import ImpPhoneNumbers from '@/app/components/phoneNumbers/ImpPhoneNumbers'
import React from 'react'

function ImportantPhoneNumbers() {
  return (
    <>
    <div className="bg-white">
      <Title title='important phone numbers'/>
    <hr opacity={20}/>
    <ImpPhoneNumbers/>
    </div>
    </>
  )
}

export default ImportantPhoneNumbers