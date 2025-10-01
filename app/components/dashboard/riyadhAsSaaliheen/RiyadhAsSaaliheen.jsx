'use client'
import { useHadithStore } from '@/app/hooks/UseHadithStore'
import React, { useEffect, useState } from 'react'
function RiyadhAsSaaliheen(){
  const { data } = useHadithStore()
  const [randomItem, setRandomItem] = useState(null);

  useEffect(() => {
    const randomIndex = Math.floor(Math.random() * data.length);
    setRandomItem(data[randomIndex]);
  }, []);
  return (
    <>
    <div className='m-6 bg-white'>
        <h1 className='p-3'>رياض الصالحين</h1>
        <hr className='opacity-20'/>
        <div>
      {randomItem && (
        <div>
          <p className='p-3 flex flex-wrap w-full'>{randomItem.hadith}</p>
        </div>
      )}
    </div>
        <hr className='opacity-20'/>
        <p></p>
    </div>
    </>
  )
}

export default RiyadhAsSaaliheen