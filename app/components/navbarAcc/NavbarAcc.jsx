'use client'
import React, { useEffect } from 'react'
import { RiArrowDownSFill } from "react-icons/ri";
import { VscPerson } from "react-icons/vsc";
import Link from 'next/link';
import Theme from '../theme/Theme';
import { UseEmpInformationStore } from '@/app/store/UseEmpInformationStore';

function NavbarAcc() {
const { userData, fetchUser } = UseEmpInformationStore();
    useEffect(() => {
        fetchUser();
    }, []);
    return (
        <>
            <div className="dropdown dropdown-center ">
                <div tabIndex={0} role="button" className="btn-blue m-1 rounded-2xl flex items-center justify-center gap-1">
                    <VscPerson /><span>Welcome {userData?.[0]?.fullName}</span><RiArrowDownSFill />
                </div>
                <ul tabIndex={0} className="dropdown-content menu bg-base-100 rounded-box z-1 w-52 p-2 shadow-sm">
                    <li><Link href="/myPage">my page</Link></li>
                    <li><Link href="/">home</Link></li>
                </ul>
            </div>
            <Theme />
        </>
    )
}

export default NavbarAcc