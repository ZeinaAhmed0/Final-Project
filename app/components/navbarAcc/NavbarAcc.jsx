'use client'
import React from 'react'
import { RiArrowDownSFill } from "react-icons/ri";
import { VscPerson } from "react-icons/vsc";
import Link from 'next/link';
import { UseEmpInformationStore } from '@/app/store/UseEmpInformationStore';
import { useEffect } from 'react';
function NavbarAcc() {
    const { empName, userData, fetchUser } = UseEmpInformationStore();
    // useEffect(() => {
    //     fetchUser();
    // }, [])
    return (
        <>
            <div className="dropdown dropdown-center ">
                <div tabIndex={0} role="button" className="btn-blue m-1 rounded-2xl flex items-center justify-center gap-1 cursor-pointer">
                    <VscPerson /><span>Welcome {empName}</span><RiArrowDownSFill />
                </div>
                <ul tabIndex={0} className="dropdown-content menu bg-base-100 rounded-box z-1 w-52 p-2 shadow-sm ">
                    <li><Link href="/myPage">my page</Link></li>
                    <li><Link href="/">home</Link></li>
                    {/* {
                        userData?.[0]?.department?.toLowerCase() === 'secretary' &&
                        <li><Link href="/managerAccount">manager account</Link></li>
                    } */}
                </ul>
            </div>
        </>
    )
}

export default NavbarAcc