import React from 'react'
import logo from '@/public/logo.png'
import ImgContainer from '../common/ImgContainer'
import { SlMenu } from "react-icons/sl";
import { RiArrowDownSFill } from "react-icons/ri";
import { VscPerson } from "react-icons/vsc";
import Link from 'next/link';
import Theme from '../theme/Theme';
import Aside from './Aside';
function Navbar() {
  return (
    <>
      <nav className="navbar bg-blue-500 shadow-sm w-screen p-2 z-40 capitalize flex items-center justify-between">
        <div className="container xl:w-full  md:w-3xl sm:w-2xl w-full px-6 py-1 mx-auto flex items-center justify-between">
          <div className='flex items-center gap-5 justify-center'>
            <div className="Aside-menu cursor-pointer text-2xl">
              <div className='dropdown dropdown-left'>
                <label tabIndex={0} role="button" className="btn btn-circle bg-blue-500 border-0 shadow-none swap swap-rotate">
                <ul tabIndex={0} className="dropdown-content rounded-box z-1">
                  <li>
                    <Aside />
                  </li>
                </ul>
                <input type="checkbox" />
                <svg className="swap-off fill-current" xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 512 512"> <path d="M64,384H448V341.33H64Zm0-106.67H448V234.67H64ZM64,128v42.67H448V128Z" />
                </svg>
                <svg className="swap-on fill-current" xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 512 512"> <polygon points="400 145.49 366.51 112 256 222.51 145.49 112 112 145.49 222.51 256 112 366.51 145.49 400 256 289.49 366.51 400 400 366.51 289.49 256 400 145.49" />
                </svg>
              </label>
              </div>
            </div>
            <div className="logo">
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