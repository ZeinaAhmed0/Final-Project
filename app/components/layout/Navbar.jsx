'use client'
import React from 'react'
import logo from '@/public/logo.png'
import ImgContainer from '../common/ImgContainer'
import { SlMenu } from "react-icons/sl";
import NavbarAcc from '../navbarAcc/NavbarAcc';
import useAuthStore from '@/app/store/AuthStore';
function Navbar() {
      const { isLogin } = useAuthStore();
  return (
    <>
    {
      isLogin && (
      <nav className="navbar bg-sky-600 shadow-sm w-full p-2 z-40 capitalize flex items-center justify-between">
        <div className="w-full px-6 py-1 mx-auto flex items-center justify-between">
          <div className='flex items-center gap-5 justify-center'>
            <div className="Aside-menu cursor-pointer text-2xl">
              <SlMenu />
            </div>
            <div className="logo">
              <ImgContainer img={logo} imgAlt="logo" className='fill' smWidth='w-8' mdWidth='w-10' height='h-15' />
            </div>
          </div>
          <div className='flex items-center gap-5 justify-center'>
            <NavbarAcc/>
          </div>
          </div>
      </nav>                  
        
      )
    }
    </>
  )
}

export default Navbar