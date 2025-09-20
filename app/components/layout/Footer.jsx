'use client'
import useAuthStore from '@/app/store/AuthStore';
import React from 'react'

function Footer() {
    const { isLogin } = useAuthStore();
  return (
    <>
    {
      isLogin && (
      <footer className="w-full bg-radial-[at_25%_25%] from-white to-zinc-100 to-75% shadow-sm p-3 capitalize">
        <div className='flex items-center justify-center gap-5 container xl:w-full  md:w-3xl sm:w-2xl px-2 py-1 mx-auto'>
          <span>release 1.0</span>
          <p className='text-blue-500'>set screen reader mood on</p></div>
      </footer>
      )
    }
    </>
  )
}

export default Footer