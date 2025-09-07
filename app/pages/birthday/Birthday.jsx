'use client'
import React, { useEffect, useState } from 'react'
import HBD from '@/public/happy-birthday.webp'
import ImgContainer from '../../components/common/ImgContainer'
import { useApisStore } from '@/app/store/UseApisStore';
import { UseLoadingStore } from '@/app/store/UseLoadingStore';
import LoadingPage from '../LoadingPage/LoadingPage';
import Image from 'next/image';

function Birthday() {
  const { loading } = UseLoadingStore();
  const { emp, fetchApi } = useApisStore();
  useEffect(() => {
    fetchApi();
  }, [fetchApi]);

  const [birthdayToday, setBirthdayToday] = useState([]);
  useEffect(() => {
    if (emp.length > 0) {
      const today = new Date();
      const todayDate = today.toISOString().slice(5, 10); 
      const filtered = emp.filter(employee => {
        const birthDate = new Date(employee.birthday);
        const empBirthDate = birthDate.toISOString().slice(5, 10);
        return empBirthDate === todayDate;
      });
      setBirthdayToday(filtered);
    }
  }, [emp]);

  return (
    <>
      {
        loading ? <LoadingPage /> : (
          <div className='m-6 bg-white'>
            <h1 className='p-3'>Today's Birthdays</h1>
            <hr className='opacity-20' />
            <div className="flex">
              <ImgContainer img={HBD} imgAlt="happy birthday" className='fill' mdWidth='w-55' smWidth='w-40' />
              <table className="table border border-base-content/5">
                <thead>
                  <tr>
                    <th className='w-30'>Name</th>
                    <th className='w-10'>Department</th>
                    <th className='w-5'>Job Title</th>
                  </tr>
                </thead>
                <tbody>
                  {
                    birthdayToday.length > 0 ? birthdayToday.map((emp, i) => (
                      <tr key={i}>
                        <td>
                          <div className="flex items-center lg:flex-row md:flex-col sm:flex-col gap-3">
                            <div className="avatar">
                              <div className="mask mask-squircle h-12 w-12 relative" >
                                <Image
                                  src={emp.employeeImg?.[0]?.formats?.thumbnail?.url ? `http://localhost:1337${emp.employeeImg[0].formats.thumbnail.url}` : '/default-avatar.png'}
                                  alt={emp.fullName}
                                  fill
                                  className='object-cover'
                                />
                              </div>
                            </div>
                            <div>
                              <div className="lg:font-bold md:font-semibold sm:font-semibold">{emp.fullName}</div>
                            </div>
                          </div>
                        </td>
                        <td className='flex justify-center flex-col flex-wrap'>
                          <span className='lg:text-sm sm:text-xs'>{emp.department}</span>
                          <br />
                          <span className="badge badge-ghost badge-sm">{emp.subDepartment}</span>
                        </td>
                        <td>{emp.jobTitle}</td>
                      </tr>
                    )) : (
                      <tr>
                        <td colSpan="3" className="text-center py-4">No birthdays today.</td>
                      </tr>
                    )
                  }
                </tbody>
              </table>
            </div>
          </div>
        )
      }
    </>
  )
}

export default Birthday;
