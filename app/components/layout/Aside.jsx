'use client'
import React, { useEffect } from 'react'
import Link from 'next/link';
import FolderIcon from '../common/FolderIcon';
import { UseEmpInformationStore } from '@/app/store/UseEmpInformationStore';
import useAuthStore from '@/app/store/AuthStore';
import { AiOutlineClose } from 'react-icons/ai'; 
function Aside({ toggleAside }) {
  const { userData, fetchUser } = UseEmpInformationStore();
  const { isLogin } = useAuthStore();
  useEffect(() => {
    fetchUser();
  }, []);
  return (
    <>
      {
        isLogin && (<aside className='w-45 h-screen flex items-start justify-start relative'>
          <button 
              onClick={toggleAside} 
              className="text-white text-2xl mb-4 top-0 right-0 bg-(--color-primary) fixed lg:hidden md:block sm:block p-3 cursor-pointer"
              aria-label="Close menu"
            >
              <AiOutlineClose />
            </button>
          <ul className="menu menu-xs text-white rounded-b-lg max-w-xs w-full capitalize pt-6">
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
                        {
                          userData?.[0]?.jobTitle?.toLowerCase() === 'hr manager' &&
                          <li>
                            <Link href="/reservation"> <FolderIcon /> reservations</Link>
                          </li>
                        }
                        <li>
                          <Link href="/vacationRequests"> <FolderIcon /> vacation requests </Link>
                        </li>
                        {
                          userData?.[0]?.department?.toLowerCase() === 'management' &&
                          <li>
                            <Link href="/vacationApproval"> <FolderIcon /> vacation approval</Link>
                          </li>
                        }
                        {userData?.[0]?.jobTitle?.toLowerCase() === 'hr manager' &&
                          <>
                            <li>
                              <Link href="/addNewEmp"> <FolderIcon /> add new emp </Link>
                            </li>
                            <li>
                              <Link href="/removeEmp"> <FolderIcon /> remove emp </Link>
                            </li>
                          </>
                        }
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
                          <Link href="/WorkOrders"> <FolderIcon /> orders </Link>
                        </li>
                      </ul>
                    </details>
                  </li>
                  <li>
                    <details>
                      <summary> <FolderIcon /> transport services </summary>
                      <ul>
                        {
                          userData?.[0]?.jobTitle?.toLowerCase() !== 'driver' &&
                          <>
                            <li>
                              <Link href="/carRequests"> <FolderIcon />car request </Link>
                            </li>
                          </>
                        }
                        {
                          userData?.[0]?.department?.toLowerCase() === 'management' &&
                          <>
                            <li>
                              <Link href="/carRequestApproval"> <FolderIcon />car request approval </Link>
                            </li>
                          </>
                        }
                        {
                          userData?.[0]?.jobTitle?.toLowerCase() === 'driver' &&
                          <>
                            <li>
                              <Link href="/carOrder"> <FolderIcon />car orders </Link>
                            </li>
                          </>
                        }
                      </ul>
                    </details>
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
