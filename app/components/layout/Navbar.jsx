import React from 'react'
import logo from '@/public/logo.png'
import ImgContainer from '../common/ImgContainer'
import { SlMenu } from "react-icons/sl";
import { RiArrowDownSFill } from "react-icons/ri";
import { VscPerson } from "react-icons/vsc";
import Link from 'next/link';
import Theme from '../theme/Theme';
function Navbar() {
  return (
    <>
      <nav className="navbar bg-blue-500 shadow-sm fixed top-0 w-screen p-3 z-40 capitalize flex items-center justify-between">
        <div className="container xl:w-full  md:w-3xl sm:w-2xl w-full px-2 py-1 mx-auto flex items-center justify-between">
          <div className='flex items-center gap-5 justify-center'>
            <div className="Aside-menu cursor-pointer text-2xl">
              <SlMenu />
            </div>
            <div className="img-container">
              <ImgContainer img={logo} imgAlt="logo" className='fill' width='40' />
            </div>
          </div>
          <div className='flex items-center gap-5 justify-center'>
            <div className="dropdown dropdown-center ">
              <div tabIndex={0} role="button" className="btn-blue m-1 rounded-2xl flex items-center justify-center gap-1">welcome <VscPerson />userName <RiArrowDownSFill /></div>
              <ul tabIndex={0} className="dropdown-content menu bg-base-100 rounded-box z-1 w-52 p-2 shadow-sm">
                <li><a>Item 1</a></li>
                <li><Link href="/myPage">my page</Link></li>
              </ul>
            </div>
            <Theme />
          </div>
        </div>
      </nav>
    </>
  )
}

export default Navbar