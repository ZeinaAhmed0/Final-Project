import React from 'react'
import Link from 'next/link';
import FolderIcon from '../common/FolderIcon';
function Aside() {
  return (
    <>
      <aside className='w-45 flex items-start justify-start'>
        <ul className="menu menu-xs bg-sky-700 text-white rounded-b-lg max-w-xs w-full capitalize">
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
            <details>
              <summary> <FolderIcon /> services</summary>
              <ul>
                <li>
                  <details>
                    <summary> <FolderIcon /> HR services</summary>
                    <ul>
                      <li>
                        <Link href="/HRServices"> <FolderIcon /> hR services </Link>
                      </li>
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
                        <Link href="/reservationRequests"> <FolderIcon /> reservation requests </Link>
                      </li>
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
                <li>
                  <details>
                    <summary> <FolderIcon /> work orders </summary>
                    <ul>
                      <li>
                        <Link href="/ITWorkOrders"> <FolderIcon /> IT work orders </Link>
                      </li>
                      <li>
                        <Link href="/projectsWorkOrders"> <FolderIcon /> projects work orders </Link>
                      </li>
                      <li>
                        <Link href="/projectsWorkOrders"> <FolderIcon /> engineering work orders </Link>
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
                  <Link href="/"> <FolderIcon /> hR services </Link>
                </li>
                <li>
                  <Link href="/ITServices"> <FolderIcon /> iT services </Link>
                </li>
              </ul>
            </details>
          </li>
          <li>
            <details>
              <summary> <FolderIcon />  corona virus </summary>
              <ul>
                <li>
                  <Link href="/HRServices"> <FolderIcon /> hR services </Link>
                </li>
                <li>
                  <Link href="/ITServices"> <FolderIcon /> iT services </Link>
                </li>
              </ul>
            </details>
          </li>
          <li>
            <details>
              <summary> <FolderIcon />equipment catalogue </summary>
              <ul>
                <li>
                  <Link href="/HRServices"> <FolderIcon /> hR services </Link>
                </li>
                <li>
                  <Link href="/ITServices"> <FolderIcon /> iT services </Link>
                </li>
              </ul>
            </details>
          </li>
        </ul>
      </aside>
    </>
  )
}

export default Aside


{/* <li>
          <a>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className="h-4 w-4">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m2.25 0H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />
            </svg>
            Project-final.psd
          </a>
        </li> */}