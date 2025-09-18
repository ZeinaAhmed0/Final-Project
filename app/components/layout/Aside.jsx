'use client'
import React, { useEffect } from 'react'
import Link from 'next/link';
import FolderIcon from '../common/FolderIcon';
import { UseEmpInformationStore } from '@/app/store/UseEmpInformationStore';
import useAuthStore from '@/app/store/AuthStore';
function Aside() {
  const { userData, fetchUser } = UseEmpInformationStore();
  const { isLogin } = useAuthStore();
  useEffect(() => {
    fetchUser();
  }, []);
  return (
    <>
      {
        isLogin && (<aside className='w-45 h-screen flex items-start justify-start'>
          <ul className="menu menu-xs  text-white rounded-b-lg max-w-xs w-full capitalize">
            <li>
              <details open>
                <summary>
                  <FolderIcon />
                  home</summary>
                <ul>
                  <li>
                    <Link href="/myPage"> <FolderIcon />my page </Link>
                  </li>
                  <li>
                    <Link href="/about"> <FolderIcon />about </Link>
                  </li>
                  <li>
                    <Link href="/interestedSites"> <FolderIcon />interested sites </Link>
                  </li>
                </ul>
              </details>
            </li>
            <li>
              <details open>
                <summary> <FolderIcon /> services</summary>
                <ul>
                  <li>
                    <details open>
                      <summary> <FolderIcon /> HR services</summary>
                      <ul>
                        <li>
                          <Link href="/reservationRequest"> <FolderIcon /> reservation requests </Link>
                        </li>
                        <li>
                          <Link href="/vacationRequests"> <FolderIcon /> vacation requests </Link>
                        </li>
                        {userData?.[0]?.jobTitle?.toLowerCase() === 'hr manager' && <li>
                          <Link href="/addNewEmp"> <FolderIcon /> add new emp </Link>
                        </li>}
                      </ul>
                    </details>
                  </li>
                  <li>
                    <details>
                      <summary> <FolderIcon /> medical services</summary>
                      <ul>
                        <li>
                          <Link href="/hospitals"> <FolderIcon /> hospitals </Link>
                        </li>
                        <li>
                          <Link href="/medicalRequests"> <FolderIcon /> medical requests </Link>
                        </li>
                        <li>
                          <Link href="/doctors"> <FolderIcon /> doctors </Link>
                        </li>
                      </ul>
                    </details>
                  </li>
                  <li>
                    <Link href="/importantPhoneNumbers"> <FolderIcon /> important phone numbers </Link>
                  </li>
                  <li>
                    <details>
                      <summary> <FolderIcon /> works orders</summary>
                      <ul>
                        <li>
                          <Link href="/transportRequests"> <FolderIcon /> transport requests </Link>
                        </li>
                        <li>
                          <Link href="/doctors"> <FolderIcon /> doctors </Link>
                        </li>
                      </ul>
                    </details>
                  </li>
                  <li>
                    <details>
                      <summary> <FolderIcon /> transport services </summary>
                      <ul>
                        <li>
                          <Link href="/maintenanceCar"> <FolderIcon /> maintenance car </Link>
                        </li>
                        <li>
                          <Link href="/carRequests"> <FolderIcon /> car requests </Link>
                        </li>
                      </ul>
                    </details>
                  </li>
                </ul>
              </details>
            </li>
            <li>
              <details>
                <summary> <FolderIcon />  QHSE & en </summary>
                <ul>
                  <li>
                    <Link href="/"> <FolderIcon />  </Link>
                  </li>
                  <li>
                    <Link href="/ITServices"> <FolderIcon />  </Link>
                  </li>
                </ul>
              </details>
            </li>
            <li>
              <details>
                <summary> <FolderIcon />equipment catalogue </summary>
                <ul>
                  <li>
                    <Link href="/HRServices"> <FolderIcon />  </Link>
                  </li>
                  <li>
                    <Link href="/ITServices"> <FolderIcon />  </Link>
                  </li>
                </ul>
              </details>
            </li>
          </ul>
        </aside>)
      }
    </>
  )
}

export default Aside
